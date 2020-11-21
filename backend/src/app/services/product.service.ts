/*
 * @LastEditTime: 2020-11-21 01:05:55
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Product {
  [x: string]: any;
  mainImageUrl: string;
  coverUrl: any;
  from: any;
  content: any;
  keywords: string;
  treeId: string;
  title: string;
  description: string;
}

interface GetProductListResDto {
  totalCount: number;
  items: Product[];
}

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  // 获取列表
  getProductList(
    pageIndex: number,
    pageSize: number,
    name: string,
    sorting: string
  ): Observable<GetProductListResDto> {
    const url = '/api/app/Product';
    const params = new HttpParams()
      .append('Name', name)
      .append('Sorting', sorting)
      .append('SkipCount', `${(pageIndex - 1) * pageSize}`)
      .append('MaxResultCount', `${pageSize}`);
    return this.http.get<GetProductListResDto>(url, { params });
  }

  // 添加Product
  addProduct(product: Product): Observable<Product> {
    const url = '/api/app/Product';
    return this.http.post<Product>(url, product);
  }

  // 修改
  putProduct(id: string, product: Product): Observable<Product> {
    const url = `/api/app/Product/${id}`;
    return this.http.put<Product>(url, product);
  }

  // 获取Product详情
  getProduct(id: string): Observable<Product> {
    const url = `/api/app/Product/${id}`;
    return this.http.get<Product>(url);
  }

  // 修改
  deleteProduct(id: string): Observable<Product> {
    const url = `/api/app/Product/${id}`;
    return this.http.delete<Product>(url);
  }
}
