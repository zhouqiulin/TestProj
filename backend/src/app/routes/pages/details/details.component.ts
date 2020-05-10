import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from '../../../services/pages.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
import { SettingsService } from 'src/app/core/settings/settings.service';

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
            isLeaf: true
          }
        ]
      },
      {
        value: 'ningbo',
        label: 'Ningbo',
        isLeaf: true
      }
    ]
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
            isLeaf: true
          }
        ]
      }
    ]
  }
];

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  pageTitle: string;
  id: string;
  pageForm: FormGroup;
  treeOptons = options;
  loading = false;
  coverUrl: string;
  uploadFileUrl = '/api/app/file/uploadFile';
  showMore = false;
  uploadFile: UploadFile;
  editorConfig = this.settings.getEditorSetting();
  dataLoading = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private settings: SettingsService,
    private fb: FormBuilder,
    private pagesSerive: PagesService,
    private msg: NzMessageService
  ) {

  }

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
      this.checkImageDimension(file).then(dimensionRes => {
        if (!dimensionRes) {
          this.msg.error('Image only 300x300 above');
          observer.complete();
          return;
        }

        observer.next(isJPG && isLt2M && dimensionRes);
        observer.complete();
      });
    });
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
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

  handleChange(info: { file: UploadFile, }): void {
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
        this.pageForm.patchValue({
          coverUrl: info.file.response.path
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

  submitForm() {
    for (const i of Object.keys(this.pageForm.controls)) {
      this.pageForm.controls[i].markAsDirty();
      this.pageForm.controls[i].updateValueAndValidity();
    }

    if (!this.pageForm.value.content) {
      this.msg.error('请添加产品内容');
      return;
    }
    if (this.pageForm.status === 'VALID') {
      if (this.id) {
        this.pagesSerive.putPage(this.id, this.pageForm.value).subscribe(res => {
          this.msg.success('修改成功');
        });

      } else {
        this.pagesSerive.addPage(this.pageForm.value).subscribe(res => {
          this.msg.success('添加成功');
          this.router.navigate(['/pages/list']);
        });
      }
    }
  }

  ngOnInit(): void {
    this.pageForm = this.fb.group({
      name: [null, [Validators.required]],
      title: [null],
      description: [null],
      keywords: [null],
      treeId: ['00000000-0000-0000-0000-000000000000', [Validators.required]],
      content: [null],
    });

    this.activatedRoute.queryParams.subscribe(queyParams => {
      this.id = queyParams.id;
      if (this.id) {
        this.pageTitle = '编辑页面';
        this.dataLoading = true;
        this.pagesSerive.getPage(queyParams.id).subscribe(res => {
          this.dataLoading = false;
          this.pageForm.setValue({
            name: res.name,
            title: res.title,
            description: res.description,
            keywords: res.keywords,
            treeId: '00000000-0000-0000-0000-000000000000',
            content: res.content
          });
        });
      } else {
        this.pageTitle = '新增页面';
      }
    });

  }

}
