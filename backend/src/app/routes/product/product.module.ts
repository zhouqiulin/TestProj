/*
 * @LastEditTime: 2020-11-23 19:47:10
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ProductService } from '../../services/product.service';
import { ListComponent } from './product-list/product-list.component';
import { DetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'details', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [ListComponent, DetailsComponent],
  exports: [RouterModule],
  providers: [ProductService],
})
export class ProductModule {}
