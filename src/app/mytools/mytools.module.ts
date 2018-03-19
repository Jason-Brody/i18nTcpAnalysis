import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Map2wlComponent } from './map2wl/map2wl.component';
import { Routes, RouterModule } from '@angular/router';
import {DatatableModule} from '../components/datatable/datatable.module'
import {MaterialDesignModule} from '../material-design/material-design.module'
import {ShareModule} from '../shared/share.module'
const dashRoutes:Routes = [
  {path:'tools/map2wl',component:Map2wlComponent}
]

@NgModule({
  imports: [
    CommonModule,
    DatatableModule,
    MaterialDesignModule,
    ShareModule,
    RouterModule.forChild(dashRoutes)
  ],
  declarations: [
    Map2wlComponent,
    // DownloadDirective
  ]
})
export class MytoolsModule { }
