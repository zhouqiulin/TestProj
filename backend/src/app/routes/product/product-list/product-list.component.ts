/*
 * @LastEditTime: 2020-11-23 20:32:52
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DataService } from 'src/app/services/data.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(
    private route: Router,
    private productsService: ProductService,
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

  loading = true;

  pageIndex = 1;
  pageSize = 10;
  expandKeys = ['100', '1001'];
  value: string;
  nodes = [];
  treeList = [];

  setTreeSelector(): void {
    this.dataService.getTreeList('', 'Product').subscribe((res) => {
      this.treeList = res.items;
      this.nodes = this.commonService.getTreeSelectorData(res.items);
    });
  }

  getData(): void {
    this.loading = true;
    this.dataService
      .getProductList(
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
    this.route.navigate(['/product/details'], {
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
        this.productsService.deleteProduct(data.id).subscribe((res) => {
          this.msg.success('删除成功');
          this.getData();
        }),
      nzOnCancel: () => console.log('Cancel'),
    });

    this.productsService.deleteProduct(data.id);
  }

  onChange(key: string): void {
    this.pageIndex = 1;
    this.searchTreeId = key || '';
    this.searchData();
  }
  addProduct(): void {
    this.route.navigate(['/product/details']);
  }

  ngOnInit(): void {
    this.setTreeSelector();
    this.getData();
  }
}
