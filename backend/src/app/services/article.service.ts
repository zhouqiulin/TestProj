import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Article {
  coverUrl: any;
  from: any;
  content: any;
  keywords: string;
  treeId: string;
  title: string;
  description: string;
}

interface GetArticleListResDto {
  totalCount: number;
  items: Article[];
}

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) {}

  // 获取Article列表
  getArticleList(
    pageIndex: number,
    pageSize: number,
    title: string,
    sorting: string
  ): Observable<GetArticleListResDto> {
    const url = '/api/app/article';
    const params = new HttpParams()
      .append('Title', title)
      .append('Sorting', sorting)
      .append('SkipCount', `${(pageIndex - 1) * pageSize}`)
      .append('MaxResultCount', `${pageSize}`);
    return this.http.get<GetArticleListResDto>(url, { params });
  }

  // 添加Article
  addArticle(article: Article): Observable<Article> {
    const url = '/api/app/article';
    return this.http.post<Article>(url, article);
  }

  // 修改
  putArticle(id: string, article: Article): Observable<Article> {
    const url = `/api/app/article/${id}`;
    return this.http.put<Article>(url, article);
  }

  // 获取article详情
  getArticle(id: string): Observable<Article> {
    const url = `/api/app/article/${id}`;
    return this.http.get<Article>(url);
  }

  // 修改
  deleteArticle(id: string): Observable<Article> {
    const url = `/api/app/article/${id}`;
    return this.http.delete<Article>(url);
  }
}
