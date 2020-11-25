/*
 * @LastEditTime: 2020-11-26 01:12:13
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PagesService } from '../../../services/pages.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DataService } from 'src/app/services/data.service';
import { CommonService } from 'src/app/services/common.service';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

@Component({
  selector: 'app-articles-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: Router,
    private modal: NzModalService,
    private msg: NzMessageService,
    private dataService: DataService,
    private commonService: CommonService
  ) {}

  treeId = '';
  name = '';

  searchTreeId = '';
  searchName = '';

  totalCount = 0;
  list: any[];
  treeList = [];
  nodes: NzTreeNodeOptions[] = [];

  loading = true;

  pageIndex = 1;
  pageSize = 10;
  expandKeys = ['100', '1001'];
  value: string;

  addPage(): void {
    this.route.navigate(['/page/details']);
  }
  setTreeSelector(): void {
    this.dataService.getTreeList('', 'Page').subscribe((res) => {
      this.treeList = res.items;
      this.nodes = this.commonService.getTreeSelectorData(res.items);
    });
  }

  getData(): void {
    this.loading = true;
    this.dataService
      .getPageList(
        this.searchName,
        this.searchTreeId,
        this.pageIndex,
        this.pageSize
      )
      .subscribe((res) => {
        this.list = res.items;
        this.list.forEach((ele) => {
          ele.nodePath = this.commonService.getNodePath(
            ele.treeId,
            this.treeList
          );
        });
        this.totalCount = res.totalCount;
        this.loading = false;
      });
  }
  searchData(): void {
    this.pageIndex = 1;
    this.searchName = this.name;
    this.getData();
  }
  edit(data): void {
    this.route.navigate(['/page/details'], {
      queryParams: {
        id: data.id,
      },
    });
  }
  delete(data): void {
    this.modal.confirm({
      nzTitle: '确定删除?',
      nzContent: '<b style="color: red;">删除后无法再恢复！</b>',
      nzOkType: 'danger',
      nzOnOk: () =>
        this.dataService.deletePage(data.id).subscribe((res) => {
          this.msg.success('删除成功');
          this.getData();
        }),
      nzOnCancel: () => console.log('Cancel'),
    });

    this.dataService.deletePage(data.id);
  }

  onChange(key: string): void {
    this.pageIndex = 1;
    this.searchTreeId = key || '';
    this.searchData();
  }

  ngOnInit(): void {
    this.setTreeSelector();
    this.getData();
  }
}
