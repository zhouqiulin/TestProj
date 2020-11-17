import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DataService } from 'src/app/services/data.service';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { CommonService } from 'src/app/services/common.service';

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
    private msg: NzMessageService,
    private dataService: DataService,
    private commonService: CommonService
  ) {}

  treeId = '';
  title = '';

  searchTreeId = '';
  searchTitle = '';

  totalCount = 0;
  list = [];

  loading = true;

  pageIndex = 1;
  pageSize = 10;
  expandKeys = ['100', '1001'];
  value: string;
  nodes: NzTreeNodeOptions[] = [];
  treeList = [];

  addArticle(): void {
    this.route.navigate(['/articles/details']);
  }

  setTreeSelector(): void {
    this.dataService.getTreeList('', 'Article').subscribe((res) => {
      this.treeList = res.items;
      this.nodes = this.commonService.getTreeSelectorData(res.items);
      this.getData();
    });
  }

  getData(): void {
    this.loading = true;

    this.dataService
      .getArticleList(
        this.searchTitle,
        this.treeId,
        this.pageIndex,
        this.pageSize
      )
      .subscribe(
        (res) => {
          this.list = res.items;
          this.list.forEach((ele) => {
            ele.fullTreeName = this.commonService.getFullTreeName(
              ele.treeId,
              this.treeList
            );
          });
          this.totalCount = res.totalCount;
          this.loading = false;
        },
        (err) => {
          this.loading = false;
        }
      );
  }
  searchData(): void {
    this.pageIndex = 1;
    this.searchTreeId = this.treeId ? this.treeId : '';
    this.searchTitle = this.title;
    this.getData();
  }
  edit(data): void {
    this.route.navigate(['/articles/details'], {
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
    this.setTreeSelector();
  }
}
