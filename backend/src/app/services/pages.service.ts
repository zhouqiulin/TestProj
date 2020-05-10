import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Page {
  keywords: string;
  title: string;
  description: string;
  name: string;
  treeId: string;
  content: string;
}

interface GetPageListResDto {
  totalCount: number;
  items: Page[];
}



@Injectable()
export class PagesService {

  constructor(private http: HttpClient) { }

  // 获取Page列表
  getPageList(pageIndex: number, pageSize: number, name: string, sorting: string): Observable<GetPageListResDto> {
    const url = '/api/app/page';
    const params = new HttpParams()
      .append('Name', name)
      .append('Sorting', sorting)
      .append('SkipCount', `${(pageIndex - 1) * pageSize}`)
      .append('MaxResultCount', `${pageSize}`);
    return this.http.get<GetPageListResDto>(url, { params });
  }

  // 添加Page
  addPage(page: Page): Observable<Page> {
    const url = '/api/app/page';
    return this.http.post<Page>(url, page);
  }

  // 修改Page
  putPage(id: string, page: Page): Observable<Page> {
    const url = `/api/app/page/${id}`;
    return this.http.put<Page>(url, page);
  }

  // 获取page
  getPage(id: string): Observable<Page> {
    const url = `/api/app/page/${id}`;
    return this.http.get<Page>(url);
  }

  // 修改page
  deletePage(id: string): Observable<Page> {
    const url = `/api/app/page/${id}`;
    return this.http.delete<Page>(url);
  }


}
