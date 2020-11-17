import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { Observer, Observable } from 'rxjs';
import {
  SettingsService,
  ImageForUse,
} from '../core/settings/settings.service';
import * as Model from '../models/models';

export interface ITreeNode {
  key: number;
  name: string;
  age?: number;
  level?: number;
  expand?: boolean;
  address?: string;
  children?: ITreeNode[];
  parent?: ITreeNode;
}

@Injectable()
export class CommonService {
  constructor(
    private settings: SettingsService,
    private msg: NzMessageService
  ) {}

  imageConfig = {
    // 通用
    common: {
      type: ['image/jpeg', 'image/jpg', 'image/gif', 'image/bmp', 'image/png'],
      size: 1024 * 1024 * 1,
      width: 300,
      height: 300,
    },
    ArticleCover: {
      size: 1024 * 1024 * 2,
      width: 300,
      height: 300,
    },
    ProductMainImage: {
      size: 1024 * 1024 * 2,
      width: 600,
      height: 600,
    },
    ProductOtherImage: {
      size: 1024 * 1024 * 2,
      width: 600,
      height: 600,
    },
  };

  // 检查图片(格式，大小)
  checkImage(file: File, imageForUse: string): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      const allowedImageType: string[] =
        this.imageConfig[imageForUse].type || this.imageConfig.common.type;
      const isAllowedImageType = allowedImageType.includes(file.type);

      if (!isAllowedImageType) {
        this.msg.error(`请上传${allowedImageType.join('/')}格式图片`);
        observer.complete();
        return;
      }

      const allowedImageSize: number =
        this.imageConfig[imageForUse].size || this.imageConfig.common.size;
      const isAllowedImageSize = file.size <= allowedImageSize;
      if (!isAllowedImageSize) {
        this.msg.error(
          `图片不能大于${Math.floor(allowedImageSize / 1024 / 1024)}M`
        );
        observer.complete();
        return;
      }

      const width =
        this.imageConfig[imageForUse].width || this.imageConfig.common.width;
      const height =
        this.imageConfig[imageForUse].height || this.imageConfig.common.height;

      this.checkImageDimension(file, width, height).then((dimensionRes) => {
        if (!dimensionRes) {
          this.msg.error(`请上传${width}X${height}的图片`);
          observer.complete();
          return;
        }

        observer.next(isAllowedImageType && isAllowedImageSize && dimensionRes);
        observer.complete();
      });
    });
  }

  getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  checkImageDimension(
    file: File,
    width: number,
    height: number
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;
        window.URL.revokeObjectURL(img.src);
        resolve(width === naturalWidth && height === naturalHeight);
      };
    });
  }

  // 接口数据转换树表格数据格式
  toTreeNode(list): ITreeNode[] {
    // return list.filter(item => item.parentId === parentId).map(item => ({
    //   ...item,
    //   key: item.id,
    //   children: this.toTreeNode(list, item.id),
    // }));
    const ids = list.map((ele) => ele.id);

    list.forEach((ele) => {
      ele.key = ele.id;
      ele.children = list.filter((item) => ele.id === item.parentId);
    });

    list = list.filter((ele) => {
      return !ids.includes(ele.parentId);
    });

    return list;
  }

  getTreeSelectorData(list: Model.TreeDto[]): NzTreeNodeOptions[] {
    let tree: NzTreeNodeOptions[];

    const ids = list.map((ele) => ele.id);

    tree = list.map((ele) => {
      return {
        key: ele.id,
        title: ele.name,
        id: ele.id,
        parentId: ele.parentId,
      };
    });

    tree.forEach((ele) => {
      ele.children = tree.filter((item) => ele.id === item.parentId);
      if (ele.children.length === 0) {
        delete ele.children;
        ele.isLeaf = true;
      }
    });

    tree = tree.filter((ele) => {
      return !ids.includes(ele.parentId);
    });

    return tree;
  }

  getFullTreeName(
    treeId: string,
    list: Model.TreeDto[]
  ): {
    parentNameList: string[];
    selfName: string;
    childrenNameList: string[];
  } {
    const parentNameList: string[] = [];
    let selfName = '';
    const childrenNameList: string[] = [];

    const selfNode: Model.TreeDto = list.filter((ele) => {
      return ele.id === treeId;
    })[0];
    selfName = selfNode.name;

    const findParentNameList = (node: Model.TreeDto) => {
      list.forEach((ele) => {
        if (ele.id === node.parentId) {
          parentNameList.unshift(ele.name);
          findParentNameList(ele);
        }
      });
    };
    const findChildrenNameList = (node: Model.TreeDto) => {
      list.forEach((ele) => {
        if (ele.parentId === node.id) {
          childrenNameList.push(ele.name);
          findChildrenNameList(ele);
        }
      });
    };

    findParentNameList(selfNode);
    findChildrenNameList(selfNode);

    return {
      parentNameList,
      selfName,
      childrenNameList,
    };
  }
}
