/*
 * @LastEditTime: 2020-11-25 22:56:45
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
  /******************************类别模块**********************************/
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

  /******************************资讯模块**********************************/

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

  /******************************产品模块**********************************/
  /**
   * @description: 获取产品详情
   * @param id 产品Id
   */
  getProduct(id: string): Observable<Model.ProductDto> {
    const url = `/api/app/Product/${id}`;
    return this.http.get<Model.ProductDto>(url);
  }

  /**
   * @description: 获取产品列表
   * @param name 产品名称
   * @param treeId 分类
   * @param pageIndex 页码
   * @param pageSize 页大小
   */
  getProductList(
    name: string,
    treeId: string,
    pageIndex: number,
    pageSize: number
  ): Observable<IGetListDto<Model.ProductDto>> {
    const url = '/api/app/Product';
    const params = {
      Name: name,
      TreeId: treeId,
      SkipCount: ((pageIndex - 1) * pageSize).toString(),
      MaxResultCount: pageSize.toString(),
    };
    return this.get<IGetListDto<Model.ProductDto>>(url, { params });
  }

  /**
   * @description: 添加产品
   * @param product 产品
   */
  addProduct(product): Observable<Model.ProductDto> {
    const url = '/api/app/Product';
    return this.http.post<Model.ProductDto>(url, product);
  }

  /**
   * @description: 修改产品
   * @param id 产品Id
   * @param product 产品
   */
  putProduct(id: string, product): Observable<Model.ProductDto> {
    const url = `/api/app/Product/${id}`;
    return this.http.put<Model.ProductDto>(url, product);
  }

  /**
   * @description: 删除产品
   * @param id 产品Id
   */
  deleteProduct(id: string): Observable<number> {
    const url = `/api/app/Product/${id}`;
    return this.http.delete<number>(url);
  }

  /******************************单页模块**********************************/
  /**
   * @description: 获取单页列表
   * @param name 页面名称
   * @param treeId 分类
   * @param pageIndex 页码
   * @param pageSize 页大小
   */
  getPageList(
    name: string,
    treeId: string,
    pageIndex: number,
    pageSize: number
  ): Observable<IGetListDto<Model.PageDto>> {
    const url = '/api/app/Page';
    const params = {
      Name: name,
      TreeId: treeId,
      SkipCount: ((pageIndex - 1) * pageSize).toString(),
      MaxResultCount: pageSize.toString(),
    };
    return this.http.get<IGetListDto<Model.PageDto>>(url, { params });
  }

  // 添加Page
  addPage(page): Observable<Model.PageDto> {
    const url = '/api/app/page';
    return this.http.post<Model.PageDto>(url, page);
  }

  // 修改Page
  putPage(id: string, page): Observable<Model.PageDto> {
    const url = `/api/app/page/${id}`;
    return this.http.put<Model.PageDto>(url, page);
  }

  // 获取page
  getPage(id: string): Observable<Model.PageDto> {
    const url = `/api/app/page/${id}`;
    return this.http.get<Model.PageDto>(url);
  }

  // 修改page
  deletePage(id: string): Observable<number> {
    const url = `/api/app/page/${id}`;
    return this.http.delete<number>(url);
  }
}
