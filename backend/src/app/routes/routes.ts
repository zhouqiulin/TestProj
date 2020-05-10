import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';

export const routes: Routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
            { path: 'articles', loadChildren: () => import('./articles/articles.module').then(m => m.ArtilcesModule) },
            { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
            { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) }



        ]
    },

    // Not found
    { path: '**', redirectTo: 'home' }

];
