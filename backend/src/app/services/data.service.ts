/*
 * @LastEditTime: 2020-11-17 19:44:34
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as Model from '../models/models';

interface IGetListDto<T> {
  totalCount: number;
  items: T[];
}

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}
  get<T>(
    url: string,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe?: 'body';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this.http.get<T>(url, options);
  }

  /**
   * @description: 获取分类
   * @param Name 分类名称
   * @param Category 类别种类
   *
   */
  getTreeList(
    name: string,
    category: string
  ): Observable<IGetListDto<Model.TreeDto>> {
    const url = '/api/app/tree';
    const params = {
      Name: name,
      Category: category,
    };
    return this.get<IGetListDto<Model.TreeDto>>(url, { params });
  }

  /**
   * @description: 获取文章列表
   * @param title 文章标题
   * @param treeId 分类
   * @param pageIndex 页码
   * @param pageSize 页大小
   */
  getArticleList(
    title: string,
    treeId: string,
    pageIndex: number,
    pageSize: number
  ): Observable<IGetListDto<Model.ArticleDto>> {
    const url = '/api/app/article';
    const params = {
      Title: title,
      TreeId: treeId,
      SkipCount: ((pageIndex - 1) * pageSize).toString(),
      MaxResultCount: pageSize.toString(),
    };

    return this.get<IGetListDto<Model.ArticleDto>>(url, { params });
  }
}
