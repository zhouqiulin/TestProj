/*
 * @LastEditTime: 2020-11-25 20:20:26
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PagesService } from '../../services/pages.service';
import { ListComponent } from './page-list/page-list.component';
import { PageDetailsComponent } from './page-details/page-details.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'details', component: PageDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [ListComponent, PageDetailsComponent],
  exports: [RouterModule],
  providers: [PagesService],
})
export class PageModule {}
