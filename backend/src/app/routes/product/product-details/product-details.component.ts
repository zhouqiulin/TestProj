import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  SettingsService,
  ImageForUse,
} from 'src/app/core/settings/settings.service';
import { CommonService } from 'src/app/services/common.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class DetailsComponent implements OnInit {
  pageTitle: string;
  id: string;

  // loading
  pageLoading = false;
  productForm: FormGroup;
  treeOptons = [];

  mainImageUrl: NzUploadFile[] = [];
  otherImageUrl: NzUploadFile[] = [];

  selectedTreeIds = [];

  model = {
    name: '',
    title: '',
    description: '',
    treeId: '',
    mainImageUrl: '',
    otherImageUrl: '',
    keywords: '',
    content: '',
    from: '',
  };

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
    private productSerive: ProductService,
    private msg: NzMessageService,
    private commonService: CommonService,
    private dataService: DataService
  ) {}

  beforeUploadMainImage = (file: File) => {
    return this.commonService.checkImage(file, ImageForUse.ProductMainImage);
  };

  beforeUploadOtherImage = (file: File) => {
    return this.commonService.checkImage(file, ImageForUse.ProductOtherImage);
  };

  removeMainImageUrl = (file: NzUploadFile) => {
    this.model.mainImageUrl = this.mainImageUrl
      .map((ele) => ele.url || ele.response.path)
      .join(',');
    return true;
  };
  removeOtherImageUrl = (file: NzUploadFile) => {
    this.model.otherImageUrl = this.otherImageUrl
      .map((ele) => ele.url || ele.response.path)
      .join(',');
    return true;
  };
  handlePreview = (file: NzUploadFile) => {
    this.previewImageUrl = file.url;
    this.previewImageVisivle = true;
  };

  private _setCascaderData(treeId?): void {
    this.dataService.getTreeList('', 'Product').subscribe((res) => {
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
  treeChange(val: any[]): void {
    this.model.treeId = val[val.length - 1];
  }

  handleChange(
    info: { file: NzUploadFile; fileList: NzUploadFile[] },
    type: string
  ): void {
    switch (info.file.status) {
      case 'uploading':
        break;
      case 'done':
        // Get this url from response in real world.
        this.model[type] = info.fileList
          .map((ele) => ele.url || ele.response.path)
          .join(',');

        this[type].forEach((ele) => {
          ele.url = ele.response.path;
        });
        break;
      case 'error':
        this.msg.error('上传失败');
        break;
    }
  }

  submitForm({ valid }): void {
    if (this.mainImageUrl.length === 0) {
      this.msg.error('请添加产品主图');
      return;
    }
    if (this.otherImageUrl.length === 0) {
      this.msg.error('请添加产品副图');
      return;
    }
    if (!this.model.content) {
      this.msg.error('请添加产品内容');
      return;
    }

    if (valid) {
      if (this.id) {
        this.dataService.putProduct(this.id, this.model).subscribe((res) => {
          this.msg.success('修改成功');
        });
      } else {
        this.dataService.addProduct(this.model).subscribe((res) => {
          this.msg.success('添加成功');
          this.router.navigate(['/products/list']);
        });
      }
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queyParams) => {
      this.id = queyParams.id;
      if (this.id) {
        this.pageTitle = '编辑产品';
        this.pageLoading = true;
        this.dataService.getProduct(queyParams.id).subscribe((res) => {
          this.pageLoading = false;

          this.model.name = res.name;
          this.model.description = res.description;
          this.model.title = res.title;
          this.model.keywords = res.keywords;
          this.model.content = res.content;
          this.model.treeId = res.treeId;
          this.model.mainImageUrl = res.mainImageUrl;
          this.model.otherImageUrl = res.otherImageUrl;

          this.mainImageUrl = res.mainImageUrl.split(',').map((ele) => {
            const uploadFile: NzUploadFile = {
              uid: '',
              name: '',
              status: 'done',
              size: 4,
              response: {},
              type: '',
              url: ele,
            };
            return uploadFile;
          });
          this.otherImageUrl = res.otherImageUrl.split(',').map((ele) => {
            const uploadFile: NzUploadFile = {
              uid: Math.random().toString(),
              name: '',
              status: 'done',
              size: 4,
              response: {},
              type: '',
              url: ele,
            };
            return uploadFile;
          });

          this._setCascaderData(this.model.treeId);
        });
      } else {
        this.pageTitle = '新增产品';
        this._setCascaderData();
      }
    });
  }
}
