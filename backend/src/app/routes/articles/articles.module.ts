import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ArticlesListComponent } from './list/articles.list.component';
import  { ArticlesService} from '../../services/articles.service'





const routes: Routes = [
    { path: 'list', component: ArticlesListComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [ArticlesListComponent],
    exports: [
        RouterModule
    ],
    providers:[
        ArticlesService
    ]
})
export class ArtilcesModule { }
