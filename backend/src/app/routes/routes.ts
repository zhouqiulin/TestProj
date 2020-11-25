/*
 * @LastEditTime: 2020-11-24 00:35:50
 */
import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'article',
        loadChildren: () =>
          import('./article/article.module').then((m) => m.ArtilceModule),
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./product/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'page',
        loadChildren: () =>
          import('./page/page.module').then((m) => m.PageModule),
      },
      {
        path: 'system',
        loadChildren: () =>
          import('./system/system.module').then((m) => m.SystemModule),
      },
    ],
  },

  // Not found
  { path: '**', redirectTo: 'home' },
];
