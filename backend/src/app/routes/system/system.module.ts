import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { SystemService } from '../../services/system.service';
import { TreeComponent } from './tree/tree.component';

const routes: Routes = [
  { path: 'tree', component: TreeComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [TreeComponent],
  exports: [
    RouterModule
  ],
  providers: [
    SystemService
  ]
})
export class SystemModule { }
