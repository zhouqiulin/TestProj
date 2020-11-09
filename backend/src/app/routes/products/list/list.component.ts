import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-articles-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: Router,
    private productsService: ProductsService,
    private modal: NzModalService,
    private msg: NzMessageService
  ) {}

  treeId = '';
  name = '';

  searchTreeId: string;
  searchName: string;

  totalCount = 0;
  list: any[];

  loading = true;

  pageIndex = 1;
  pageSize = 10;
  expandKeys = ['100', '1001'];
  value: string;
  nodes = [
    {
      title: 'parent 1',
      key: '100',
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          children: [
            { title: 'leaf 1-0-0', key: '10010', isLeaf: true },
            { title: 'leaf 1-0-1', key: '10011', isLeaf: true },
          ],
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }],
        },
      ],
    },
  ];

  getData() {
    this.loading = true;
    this.productsService
      .getProductList(this.pageIndex, this.pageSize, this.name, '')
      .subscribe((res) => {
        this.list = res.items;
        this.totalCount = res.totalCount;
        this.loading = false;
      });
  }
  searchData() {
    this.pageIndex = 1;
    this.searchTreeId = this.treeId;
    this.searchName = this.name;
    this.getData();
  }
  edit(data) {
    this.route.navigate(['/products/details'], {
      queryParams: {
        id: data.id,
      },
    });
  }
  delete(data) {
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

  onChange($event: string): void {
    console.log($event);
  }

  ngOnInit(): void {
    this.getData();
  }
}
