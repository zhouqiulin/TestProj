/*
 * @LastEditTime: 2020-11-21 00:39:13
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
        path: 'articles',
        loadChildren: () =>
          import('./article/article.module').then((m) => m.ArtilceModule),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./product/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
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
