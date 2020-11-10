import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ArticleService } from '../../services/article.service';
import { ArticleListComponent } from './artilce-list/article-list.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';

const routes: Routes = [
  { path: 'list', component: ArticleListComponent },
  { path: 'details', component: ArticleDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [ArticleListComponent, ArticleDetailsComponent],
  exports: [RouterModule],
  providers: [ArticleService],
})
export class ArtilceModule {}
