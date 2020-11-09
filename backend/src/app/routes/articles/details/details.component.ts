import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../../../services/articles.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { SettingsService } from 'src/app/core/settings/settings.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
            isLeaf: true,
          },
        ],
      },
      {
        value: 'ningbo',
        label: 'Ningbo',
        isLeaf: true,
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
            isLeaf: true,
          },
        ],
      },
    ],
  },
];

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  pageTitle: string;
  id: string;
  articleForm: FormGroup;
  treeOptons = options;
  loading = false;
  coverUrl: string;
  uploadFileUrl = '/api/app/file/uploadFile';
  showMore = false;
  uploadFile: NzUploadFile;
  editorConfig = this.settings.getEditorSetting();
  dataLoading = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private settings: SettingsService,
    private fb: FormBuilder,
    private articlesSerive: ArticlesService,
    private msg: NzMessageService
  ) {}

  toggleMore() {
    this.showMore = !this.showMore;
    return false;
  }

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

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.coverUrl = img;
        });
        this.articleForm.patchValue({
          coverUrl: info.file.response.path,
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

  submitForm() {
    for (const i in this.articleForm.controls) {
      this.articleForm.controls[i].markAsDirty();
      this.articleForm.controls[i].updateValueAndValidity();
    }
    if (this.articleForm.status === 'VALID') {
      if (this.id) {
        this.articlesSerive
          .putArticle(this.id, this.articleForm.value)
          .subscribe((res) => {
            this.msg.success('修改成功');
          });
      } else {
        this.articlesSerive
          .addArticle(this.articleForm.value)
          .subscribe((res) => {
            this.msg.success('添加成功');
            this.router.navigate(['/articles/list']);
          });
      }
    }
  }

  ngOnInit(): void {
    this.articleForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      treeId: [null, [Validators.required]],
      coverUrl: [null],
      keywords: [null],
      from: [null],
      content: [null],
    });

    this.activatedRoute.queryParams.subscribe((queyParams) => {
      this.id = queyParams.id;
      if (this.id) {
        this.pageTitle = '编辑资讯';
        this.dataLoading = true;
        this.articlesSerive.getArticle(queyParams.id).subscribe((res) => {
          this.dataLoading = false;
          this.articleForm.setValue({
            title: res.title,
            description: res.description,
            treeId: '22',
            coverUrl: res.coverUrl,
            keywords: '22',
            from: res.from,
            content: res.content,
          });
          debugger;
          this.coverUrl = res.coverUrl;
        });
      } else {
        this.pageTitle = '新增资讯';
      }
    });
  }
}
