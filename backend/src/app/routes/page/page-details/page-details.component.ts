import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from '../../../services/pages.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { SettingsService } from 'src/app/core/settings/settings.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
  styleUrls: ['./page-details.component.scss'],
})
export class PageDetailsComponent implements OnInit {
  pageTitle: string;
  id: string;
  treeOptons = [];
  pageLoading = false;
  loading = false;
  coverUrl: string;
  uploadFileUrl = '/api/app/file/uploadFile';
  showMore = false;
  uploadFile: NzUploadFile;
  editorConfig = this.settings.getEditorSetting();

  selectedTreeIds = [];

  model = {
    name: '',
    treeId: '',
    title: '',
    description: '',
    keywords: '',
    content: '',
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private settings: SettingsService,
    private pagesSerive: PagesService,
    private msg: NzMessageService,
    private commonService: CommonService,
    private dataService: DataService
  ) {}

  toggleMore(): void {
    this.showMore = !this.showMore;
  }

  private _setCascaderData(treeId?): void {
    this.dataService.getTreeList('', 'Page').subscribe((res) => {
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

  submitForm({ valid }): void {
    if (!this.model.content) {
      this.msg.error('请添加产品内容');
      return;
    }
    if (valid) {
      if (this.id) {
        this.dataService.putPage(this.id, this.model).subscribe((res) => {
          this.msg.success('修改成功');
        });
      } else {
        this.dataService.addPage(this.model).subscribe((res) => {
          this.msg.success('添加成功');
          this.router.navigate(['/page/list']);
        });
      }
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queyParams) => {
      this.id = queyParams.id;
      if (this.id) {
        this.pageTitle = '编辑页面';
        this.pageLoading = true;

        this.pagesSerive.getPage(queyParams.id).subscribe((res) => {
          this.pageLoading = false;
          this.model.name = res.name;
          this.model.treeId = res.treeId;
          this.model.title = res.title;
          this.model.description = res.description;
          this.model.keywords = res.keywords;
          this.model.content = res.content;
          this._setCascaderData(this.model.treeId);
        });
      } else {
        this.pageTitle = '新增页面';
        this._setCascaderData();
      }
    });
  }
}
