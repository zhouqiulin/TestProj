/*
 * @LastEditTime: 2020-11-14 13:22:11
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
    Name: string,
    Category: string
  ): Observable<IGetListDto<Model.TreeDto>> {
    const url = '/api/app/tree';
    const params = {
      Name,
      Category,
    };
    return this.get<IGetListDto<Model.TreeDto>>(url, { params });
  }
}
