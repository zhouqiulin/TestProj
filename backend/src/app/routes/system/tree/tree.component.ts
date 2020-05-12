import { Component, OnInit } from '@angular/core';
import { SystemService, Category } from '../../../services/system.service';
import { CommonService, TreeNodeInterface } from 'src/app/services/common.service';



@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  pageTitle = '分类管理';

  category: Category = Category.Article;
  listOfMapData: TreeNodeInterface[];

  getTreeList() {
    this.systemService.getTreeList(this.category).subscribe(res => {
      // this.listOfMapData = this.commonService.toTreeNode(res.items, null);
    });
  }

  constructor(private systemService: SystemService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.getTreeList();
  }

}
