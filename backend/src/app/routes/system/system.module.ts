import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { SystemService } from '../../services/system.service';
import { TreeComponent } from './tree/tree.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: 'tree', component: TreeComponent },
  { path: 'menu', component: MenuComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [TreeComponent, MenuComponent],
  exports: [
    RouterModule
  ],
  providers: [
    SystemService
  ]
})
export class SystemModule { }
