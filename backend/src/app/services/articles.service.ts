import { Injectable } from '@angular/core';
import { HttpClient,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

interface Article {
  title: string,
  description: string
}

interface getArticleListResDto {
  totalCount: number,
  items: Article[]
}



@Injectable()
export class ArticlesService {

  constructor(private http: HttpClient) { }

  private  getArticleListUrl = '/api/app/article';
  private  addArticleUrl='/api/app/article'


  //获取Article列表
  getArticleList(pageIndex:number,pageSize:number,title:string,sorting:string): Observable<getArticleListResDto> {
    let params = new HttpParams()
      .append('Title', title)
      .append('Sorting', sorting)
      .append('SkipCount', `${(pageIndex-1)*pageSize}`)
      .append('MaxResultCount', `${pageSize}`);
    return this.http.get<getArticleListResDto>(this.getArticleListUrl,{params})
  }

  //添加Article
  addArticle(article:Article):Observable<Article>{
   return  this.http.post<Article>(this.addArticleUrl,article)
  }


}
