import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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



@Injectable()
export class SystemService {

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


}
