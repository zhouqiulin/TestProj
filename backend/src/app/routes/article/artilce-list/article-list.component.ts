import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-articles-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: Router,
    private articlesSerive: ArticleService,
    private modal: NzModalService,
    private msg: NzMessageService
  ) {}

  treeId = '';
  title = '';

  searchTreeId: string;
  searchTitle: string;

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

  addArticle(): void {
    this.route.navigate(['/articles/details']);
  }

  getData() {
    this.loading = true;
    this.articlesSerive
      .getArticleList(this.pageIndex, this.pageSize, this.title, '')
      .subscribe((res) => {
        this.list = res.items;
        this.totalCount = res.totalCount;
        this.loading = false;
      });
  }
  searchData() {
    this.pageIndex = 1;
    this.searchTreeId = this.treeId;
    this.searchTitle = this.title;
    this.getData();
  }
  edit(data) {
    this.route.navigate(['/articles/details'], {
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
        this.articlesSerive.deleteArticle(data.id).subscribe((res) => {
          this.msg.success('删除成功');
          this.getData();
        }),
      nzOnCancel: () => console.log('Cancel'),
    });

    this.articlesSerive.deleteArticle(data.id);
  }

  onChange($event: string): void {
    console.log($event);
  }

  ngOnInit(): void {
    this.getData();
  }
}
