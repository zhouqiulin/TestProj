import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticlesService } from '../../../services/articles.service'

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles.list.component.html',
  styleUrls: ['./articles.list.component.scss']
})
export class ArticlesListComponent implements OnInit {

  constructor(private http: HttpClient, private articlesSerive: ArticlesService) { }

  treeId="";
  title="";

  searchTreeId: string
  searchTitle: string


  totalCount=0;
  list: any[]

  loading = true;

  pageIndex=1;
  pageSize=10;


  getData() {
    this.loading=true;
    this.articlesSerive.getArticleList(this.pageIndex, this.pageSize, this.title, '')
      .subscribe(res => {
        this.list = res.items;
        this.totalCount=res.totalCount;
        this.loading=false;
      })

  }
  searchData() {
    this.pageIndex=1;
    this.searchTreeId = this.treeId;
    this.searchTitle = this.searchTitle;
    this.getData();
  }

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
            { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
          ]
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }]
        }
      ]
    }
  ];

  onChange($event: string): void {
    console.log($event);
  }

  ngOnInit(): void {
   this.getData();
    


  }



}
