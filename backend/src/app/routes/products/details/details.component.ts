import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
import { SettingsService, ImageForUse } from 'src/app/core/settings/settings.service';
import { CommonService } from 'src/app/services/common.service';

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

  // loading
  dataLoading = false;
  productForm: FormGroup;
  treeOptons = options;

  mainImageUrl: UploadFile[] = [];
  otherImageUrl: UploadFile[] = [];

  uploadFileUrl = '/api/app/file/uploadFile';
  showMore = false;
  editorConfig = this.settings.getEditorSetting();

  previewImageUrl: string | undefined = '';
  previewImageVisivle = false;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private settings: SettingsService,
    private fb: FormBuilder,
    private productssSerive: ProductsService,
    private msg: NzMessageService,
    private commonService: CommonService
  ) {

  }


  beforeUploadMainImage = (file: File) => {
    return this.commonService.checkImage(file, ImageForUse.ProductMainImage);
  }
  beforeUploadOtherImage = (file: File) => {
    return this.commonService.checkImage(file, ImageForUse.ProductOtherImage);
  }
  removeMainImageUrl = (file: UploadFile) => {
    this.productForm.patchValue({
      mainImageUrl: this.mainImageUrl.map(ele => ele.url || ele.response.path).join(',')
    });
    return true;
  }
  removeOtherImageUrl = (file: UploadFile) => {
    this.productForm.patchValue({
      otherImageUrl: this.otherImageUrl.map(ele => ele.url || ele.response.path).join(',')
    });
    return true;
  }
  handlePreview = (file: UploadFile) => {
    this.previewImageUrl = file.url;
    this.previewImageVisivle = true;
  }



  handleChange(info: { file: UploadFile, fileList: UploadFile[] }, type: string): void {
    switch (info.file.status) {
      case 'uploading':
        break;
      case 'done':
        // Get this url from response in real world.
        this.productForm.patchValue({
          [type]: info.fileList.map(ele => ele.url || ele.response.path).join(',')
        });

        this[type].forEach(ele => {
          ele.url = ele.response.path;
        });
        break;
      case 'error':
        this.msg.error('上传失败');
        break;
    }
  }

  submitForm() {
    for (const i of Object.keys(this.productForm.controls)) {
      this.productForm.controls[i].markAsDirty();
      this.productForm.controls[i].updateValueAndValidity();
    }

    if (this.mainImageUrl.length === 0) {
      this.msg.error('请添加产品主图');
      return;
    }
    if (this.otherImageUrl.length === 0) {
      this.msg.error('请添加产品副图');
      return;
    }
    if (!this.productForm.value.content) {
      this.msg.error('请添加产品内容');
      return;
    }

    if (this.productForm.status === 'VALID') {
      if (this.id) {
        this.productssSerive.putProduct(this.id, this.productForm.value).subscribe(res => {
          this.msg.success('修改成功');
        });

      } else {
        this.productssSerive.addProduct(this.productForm.value).subscribe(res => {
          this.msg.success('添加成功');
          this.router.navigate(['/products/list']);
        });
      }
    }
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [null, [Validators.required]],
      title: [null],
      description: [null, [Validators.required]],
      treeId: ['00000000-0000-0000-0000-000000000000', [Validators.required]],
      mainImageUrl: [null, [Validators.required]],
      otherImageUrl: [null, [Validators.required]],
      keywords: [null],
      content: [null],
    });

    this.activatedRoute.queryParams.subscribe(queyParams => {
      this.id = queyParams.id;
      if (this.id) {
        this.pageTitle = '编辑产品';
        this.dataLoading = true;
        this.productssSerive.getProduct(queyParams.id).subscribe(res => {
          this.dataLoading = false;
          this.productForm.setValue({
            name: res.name,
            title: res.title,
            description: res.description,
            treeId: '00000000-0000-0000-0000-000000000000',
            mainImageUrl: res.mainImageUrl,
            otherImageUrl: res.otherImageUrl,
            keywords: '22',
            content: res.content
          });

          this.mainImageUrl = res.mainImageUrl.split(',').map(ele => {
            const uploadFile: UploadFile = {
              uid: '',
              name: '',
              status: 'done',
              size: 4,
              response: {},
              type: '',
              url: ele
            };
            return uploadFile;
          });
          this.otherImageUrl = res.otherImageUrl.split(',').map(ele => {
            const uploadFile: UploadFile = {
              uid: Math.random().toString(),
              name: '',
              status: 'done',
              size: 4,
              response: {},
              type: '',
              url: ele
            };
            return uploadFile;
          });

        });
      } else {
        this.pageTitle = '新增产品';
      }
    });

  }

}
