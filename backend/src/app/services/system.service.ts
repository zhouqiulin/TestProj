import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { valueFunctionProp } from 'ng-zorro-antd';


export enum Category {
  Article = 'Article',
  Product = 'Product',
  Page = 'Page'
}

interface Tree {
  id: string;
  parentId: string;
  category: Category;
  name: string;
}

interface GetTreeListResDto {
  totalCount: number;
  items: Tree[];
}

interface CascaderTree {
  parentId: string;
  value: string;
  label: string;
  isLeaf: boolean;
  children: CascaderTree[];
}

interface Menu {
  Id: string;
  type: string;
  refId: string;
}


interface GetMenuListResDto {
  totalClunt: number;
  item: Menu[];
}

@Injectable()
export class SystemService {

  cascaderTree: CascaderTree;

  constructor(private http: HttpClient) { }

  // 获取Tree列表
  getTreeList(category: Category): Observable<GetTreeListResDto> {
    const url = '/api/app/tree';
    const params = new HttpParams()
      .append('Category', category);
    return this.http.get<GetTreeListResDto>(url, { params });
  }

  // 添加Tree
  addTree(tree: Tree): Observable<Tree> {
    const url = '/api/app/Tree';
    return this.http.post<Tree>(url, tree);
  }

  // 修改Tree
  putTree(id: string, tree: Tree): Observable<Tree> {
    const url = `/api/app/Tree/${id}`;
    return this.http.put<Tree>(url, tree);
  }

  // 获取Tree详情
  getTree(id: string): Observable<Tree> {
    const url = `/api/app/Tree/${id}`;
    return this.http.get<Tree>(url);
  }

  // 删除
  deleteTree(id: string): Observable<Tree> {
    const url = `/api/app/Tree/${id}`;
    return this.http.delete<Tree>(url);
  }

  // 获取tree级联数据
  getCascaderTree(category: Category): Observable<CascaderTree[]> {

    return Observable.create(observer => {
      this.getTreeList(category).subscribe(res => {

        const ids = res.items.map(ele => ele.id);

        let cascaderTree: CascaderTree[];

        cascaderTree = res.items.map(ele => {
          return {
            parentId: ele.parentId,
            value: ele.id,
            label: ele.name,
            isLeaf: res.items.every(item => ele.id !== item.parentId),
            children: []
          };
        });

        cascaderTree.forEach(ele => {
          ele.children = cascaderTree.filter(item => ele.value === item.parentId);
        });

        cascaderTree = cascaderTree.filter(ele => {
          return !ids.includes(ele.parentId);
        });
        observer.next(cascaderTree);
      });
    });

  }

  // 获取Menu列表
  getMenuList(): Observable<GetMenuListResDto> {
    const url = '/api/app/menu';
    return this.http.get<GetMenuListResDto>(url);
  }
}

