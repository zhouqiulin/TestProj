import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';

export const routes: Routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
            { path: 'articles', loadChildren: () => import('./articles/articles.module').then(m => m.ArtilcesModule) }

        ]
    },

    // Not found
    { path: '**', redirectTo: 'home' }

];
