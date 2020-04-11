import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SharedModule } from '../../shared/shared.module';
import  { ArticlesService} from '../../services/articles.service';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component'

const routes: Routes = [
    { path: 'list', component: ListComponent },
    { path: 'details', component: DetailsComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CKEditorModule,
        SharedModule
    ],
    declarations: [ListComponent, DetailsComponent],
    exports: [
        RouterModule
    ],
    providers:[
        ArticlesService
    ]
})
export class ArtilcesModule { }
