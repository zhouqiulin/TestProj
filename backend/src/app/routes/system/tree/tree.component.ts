import { Component, OnInit } from '@angular/core';
import { SystemService, Category } from '../../../services/system.service';
import { CommonService, TreeNodeInterface } from 'src/app/services/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';



@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  pageTitle = '分类管理';

  category: Category = Category.Article;
  listOfMapData: TreeNodeInterface[];
  mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};
  treeModalVisible = true;
  modalTitle = '添加类别';
  treeForm: FormGroup;
  getTreeList() {
    this.systemService.getTreeList(this.category).subscribe(res => {
      this.listOfMapData = this.commonService.toTreeNode(res.items, null);
      this.listOfMapData.forEach(item => {
        this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
      });
    });
  }

  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if (!$event) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.key === d.key);
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
    const stack: TreeNodeInterface[] = [];
    const array: TreeNodeInterface[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node: TreeNodeInterface, hashMap: { [key: string]: boolean }, array: TreeNodeInterface[]): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }

  addTree() {
    this.modalTitle = '添加类别';
    this.treeForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      category: [this.category],
      parentId: [null]
    });
    this.treeModalVisible = true;
  }
  submitForm() {
    for (const i of Object.keys(this.treeForm.controls)) {
      this.treeForm.controls[i].markAsDirty();
      this.treeForm.controls[i].updateValueAndValidity();
    }

    if (this.treeForm.status === 'VALID') {
      if (this.treeForm.value.id) {
        this.systemService.putTree(this.treeForm.value.id, this.treeForm.value).subscribe(res => {
          this.msg.success('修改成功');
          this.getTreeList();
          this.treeModalVisible = false;
        });
      } else {
        this.systemService.addTree(this.treeForm.value).subscribe(res => {
          this.msg.success('添加成功');
          this.getTreeList();
          this.treeModalVisible = false;
        });
      }
    }


  }

  constructor(
    private systemService: SystemService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.getTreeList();
    this.treeForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      category: [null],
      parentId: [null]
    });
  }

}
