import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { NgxEchartsModule } from 'ngx-echarts';
import {RouterModule,Routes} from '@angular/router'
import { DatatableModule } from '../components/datatable/datatable.module';
import { TcpComponent } from './tcp/tcp.component';
import { TcpDetailComponent } from './tcp/tcp-detail.component';
import { HarComponent } from './har/har.component';
import { HarDetailComponent } from './har/har-detail.component';
import { FileManagementComponent } from './file-management/file-management.component';
import { FileStatusPipe } from './file-management/file-status.pipe';
import { RegexPipe } from '../shared/regex.pipe';

const dashRoutes:Routes = [
  {path:'dashboard/har',component:HarComponent},
  {path:'dashboard/tcp',component:TcpComponent},
  {path:'dashboard/files',component:FileManagementComponent}
]

@NgModule({
  
  imports: [
    CommonModule,
    MaterialDesignModule,
    NgxEchartsModule,
    DatatableModule,
    RouterModule.forChild(dashRoutes)
  ],
  declarations: [RegexPipe, TcpComponent, TcpDetailComponent, HarComponent,HarDetailComponent, FileManagementComponent, FileStatusPipe]
})
export class DashboardModule { }
