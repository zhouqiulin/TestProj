import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { SettingsService } from 'src/app/core/settings/settings.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { DataService } from 'src/app/services/data.service';
import * as Model from '../../..';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit {
  pageTitle: string;
  id: string;
  treeOptons = [];
  loading = false;
  coverUrlBase64: string;
  uploadFileUrl = '/api/app/file/uploadFile';
  showMore = false;
  uploadFile: NzUploadFile;
  editorConfig = this.settings.getEditorSetting();
  dataLoading = false;
  selectedTreeIds = [];

  model = {
    title: '',
    description: '',
    treeId: '',
    coverUrl: '',
    keywords: '',
    from: '',
    content: '',
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private settings: SettingsService,
    private fb: FormBuilder,
    private articlesSerive: ArticleService,
    private msg: NzMessageService,
    private dataService: DataService,
    private commonService: CommonService
  ) {}

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      // check height
      this.checkImageDimension(file).then((dimensionRes) => {
        if (!dimensionRes) {
          this.msg.error('Image only 300x300 above');
          observer.complete();
          return;
        }

        observer.next(isJPG && isLt2M && dimensionRes);
        observer.complete();
      });
    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        resolve(width === height && width >= 300);
      };
    });
  }

  private setCascaderData(treeId?): void {
    this.dataService.getTreeList('', 'Article').subscribe((res) => {
      this.treeOptons = this.commonService.getCascaderData(res.items);
      if (treeId) {
        this.selectedTreeIds = this.commonService.getNodePath(
          treeId,
          res.items
        ).parentIdList;
        this.selectedTreeIds.push(treeId);
      }
    });
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.coverUrlBase64 = img;
        });
        this.model.coverUrl = info.file.response.path;
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

  treeChange(val: any[]): void {
    this.model.treeId = val[val.length - 1];
  }

  submitForm({ value, valid }): void {
    if (!valid) {
      return;
    }

    if (this.id) {
      this.articlesSerive.putArticle(this.id, this.model).subscribe((res) => {
        this.msg.success('修改成功');
      });
    } else {
      this.articlesSerive.addArticle(this.model).subscribe((res) => {
        this.msg.success('添加成功');
        this.router.navigate(['/articles/list']);
      });
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queyParams) => {
      this.id = queyParams.id;
      if (this.id) {
        this.pageTitle = '编辑资讯';
        this.dataLoading = true;
        this.articlesSerive.getArticle(queyParams.id).subscribe((res) => {
          this.dataLoading = false;
          this.model.title = res.title;
          this.model.description = res.description;
          this.model.treeId = res.treeId;
          this.model.coverUrl = res.coverUrl;
          this.model.keywords = res.keywords;
          this.model.from = res.from;
          this.model.content = res.content;

          this.setCascaderData(this.model.treeId);
        });
      } else {
        this.pageTitle = '新增资讯';
        this.setCascaderData();
      }
    });
  }
}
