import { Injectable } from '@angular/core';
import { NzMessageService, NzInputNumberComponent } from 'ng-zorro-antd';
import { Observer, Observable } from 'rxjs';
import { SettingsService, ImageForUse } from '../core/settings/settings.service';


export interface TreeNodeInterface {
  key: number;
  name: string;
  age?: number;
  level?: number;
  expand?: boolean;
  address?: string;
  children?: TreeNodeInterface[];
  parent?: TreeNodeInterface;
}

const testList = [
  {
    parentId: 0,
    category: 1,
    name: '公司新闻',
    sort: 0,
    id: 'de167e08-cd91-2511-ae01-39f3f593d25a'
  },
  {
    parentId: 0,
    category: 1,
    name: '公司新闻',
    sort: 0,
    id: '43e36ba8-f67d-4a75-d12d-39f3f593d25a'
  },
  {
    parentId: 0,
    category: 1,
    name: '公司新闻',
    sort: 0,
    id: 'c5af2866-6466-bde9-f19c-39f3f593d27f'
  },
  {
    parentId: 0,
    category: 1,
    name: '公司新闻',
    sort: 0,
    id: '5ae60b04-bed7-120c-e860-39f3f593d328'
  },
  {
    parentId: 0,
    category: 1,
    name: '公司新闻',
    sort: 0,
    id: '84df5a4f-25bd-5847-3f7f-39f3f593d3c4'
  },
  {
    parentId: 0,
    category: 1,
    name: '公司新闻',
    sort: 0,
    id: 'ede0aa58-59c8-f3f0-b48c-39f3f593d45c'
  },
  {
    parentId: 0,
    category: 1,
    name: '公司新闻',
    sort: 0,
    id: '3b0aedf1-b109-688b-add6-39f3f593d4fa'
  },
  {
    parentId: 0,
    category: 1,
    name: '公司新闻',
    sort: 0,
    id: '3a57854f-e898-68cf-8a04-39f3f593d5b5'
  },
  {
    parentId: 0,
    category: 2,
    name: '产品发布',
    sort: 0,
    id: '2ad721ab-9b35-8e58-9630-39f3f5964a30'
  },
  {
    parentId: 0,
    category: 2,
    name: '产品发布',
    sort: 0,
    id: 'f309dc18-9eed-c571-ba05-39f3f5964b1d'
  },
  {
    parentId: 0,
    category: 2,
    name: '产品发布',
    sort: 0,
    id: '3d27e47b-33a0-dd0e-2c11-39f3f5964bd5'
  },
  {
    parentId: 0,
    category: 2,
    name: '产品发布',
    sort: 0,
    id: '8bbd7dd5-254a-b297-7962-39f3f5964cf1'
  },
  {
    parentId: 0,
    category: 2,
    name: '产品发布',
    sort: 0,
    id: 'b3057b5b-3d43-6328-b9c8-39f3f5964da6'
  },
  {
    parentId: 0,
    category: 2,
    name: '产品发布',
    sort: 0,
    id: 'c183ef77-4d4d-3069-1e94-39f3f5964e71'
  }
];


@Injectable()
export class CommonService {

  constructor(
    private settings: SettingsService,
    private msg: NzMessageService
  ) { }

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
      height: 300
    },
    ProductMainImage: {
      size: 1024 * 1024 * 2,
      width: 600,
      height: 600
    },
    ProductOtherImage: {
      size: 1024 * 1024 * 2,
      width: 600,
      height: 600
    }
  };


  // 检查图片(格式，大小)
  checkImage(file: File, imageForUse: string): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      const allowedImageType: string[] = this.imageConfig[imageForUse].type || this.imageConfig.common.type;
      const isAllowedImageType = allowedImageType.includes(file.type);

      if (!isAllowedImageType) {
        this.msg.error(`请上传${allowedImageType.join('/')}格式图片`);
        observer.complete();
        return;
      }

      const allowedImageSize: number = this.imageConfig[imageForUse].size || this.imageConfig.common.size;
      const isAllowedImageSize = file.size <= allowedImageSize;
      if (!isAllowedImageSize) {
        this.msg.error(`图片不能大于${Math.floor(allowedImageSize / 1024 / 1024)}M`);
        observer.complete();
        return;
      }

      const width = this.imageConfig[imageForUse].width || this.imageConfig.common.width;
      const height = this.imageConfig[imageForUse].height || this.imageConfig.common.height;

      this.checkImageDimension(file, width, height).then(dimensionRes => {
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

  checkImageDimension(file: File, width: number, height: number): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        resolve(width === naturalWidth && height === naturalHeight);
      };
    });
  }

  // 接口数据转换树表格数据格式
  toTreeNode(list, parentId) {
    return list.filter(item => item.parentId === parentId).map(item => ({
      ...item,
      key: item.id,
      children: this.toTreeNode(list, item.id),
    }));
  }
}
