import { Component, OnInit } from '@angular/core';
import { SystemService, Category } from '../../../services/system.service';
import { CommonService, ITreeNode } from 'src/app/services/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  pageTitle = '分类管理';

  category: Category = Category.Article;
  listOfMapData: ITreeNode[];
  mapOfExpandedData: { [key: string]: ITreeNode[] } = {};
  treeModalVisible = false;
  modalTitle = '添加类别';
  treeForm: FormGroup;
  nzOptions;
  ParentId;
  getTreeList(): void {
    this.dataService.getTreeList('', this.category).subscribe((res) => {
      this.listOfMapData = this.commonService.toTreeNode(res.items);
      this.listOfMapData.forEach((item) => {
        this.mapOfExpandedData[item.key] = this._convertTreeToList(item);
      });
    });
  }

  collapse(array: ITreeNode[], data: ITreeNode, $event: boolean): void {
    if (!$event) {
      if (data.children) {
        data.children.forEach((d) => {
          const target = array.find((a) => a.key === d.key);
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  private _convertTreeToList(root: ITreeNode): ITreeNode[] {
    const stack: ITreeNode[] = [];
    const array: ITreeNode[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop();
      this._visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({
            ...node.children[i],
            level: node.level + 1,
            expand: false,
            parent: node,
          });
        }
      }
    }

    return array;
  }

  private _visitNode(
    node: ITreeNode,
    hashMap: { [key: string]: boolean },
    array: ITreeNode[]
  ): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }

  addTree(): void {
    this.modalTitle = '添加类别';
    this.treeForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      category: [this.category],
      parentId: [null],
    });
    this.treeModalVisible = true;
  }

  addSubTree(data): void {
    this.modalTitle = '添加子类别';
    this.treeForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      category: [this.category],
      parentId: [data.id],
    });
    this.treeModalVisible = true;
  }
  edit(data): void {
    this.modalTitle = '编辑类别';

    const parentId = [];
    let parent = data.parent;
    while (parent && parent.id) {
      parentId.unshift(parent.id);
      parent = parent.parent;
    }
    this.treeForm = this.fb.group({
      id: [data.id],
      name: [data.name, [Validators.required]],
      category: [this.category],
      parentId: [null],
      tempParentId: [parentId],
    });
    this.systemService.getCascaderTree(this.category).subscribe((res) => {
      this.nzOptions = res;
    });
    this.treeModalVisible = true;
  }
  onParentIdChanges(event): void {
    this.treeForm.patchValue({ parentId: event[event.length - 1] });
  }
  delete(data): void {
    this.modal.confirm({
      nzTitle: '确定删除?',
      nzContent: '<b style="color: red;">删除后无法再恢复！</b>',
      nzOkType: 'danger',
      nzOnOk: () =>
        this.systemService.deleteTree(data.id).subscribe((res) => {
          this.msg.success('删除成功');
          this.getTreeList();
          this.treeModalVisible = false;
        }),
      nzOnCancel: () => console.log('Cancel'),
    });
  }
  submitForm(): void {
    for (const i of Object.keys(this.treeForm.controls)) {
      this.treeForm.controls[i].markAsDirty();
      this.treeForm.controls[i].updateValueAndValidity();
    }

    if (this.treeForm.status === 'VALID') {
      if (this.treeForm.value.id) {
        this.systemService
          .putTree(this.treeForm.value.id, this.treeForm.value)
          .subscribe((res) => {
            this.msg.success('修改成功');
            this.getTreeList();
            this.treeModalVisible = false;
          });
      } else {
        this.systemService.addTree(this.treeForm.value).subscribe((res) => {
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
    private dataService: DataService,
    private fb: FormBuilder,
    private msg: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.getTreeList();
    this.treeForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      category: [null],
      parentId: [null],
    });
  }
}
