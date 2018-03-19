import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './datatable.component';
import { MaterialDesignModule } from '../../material-design/material-design.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialDesignModule
  ],
  exports:[
    DatatableComponent
  ],
  declarations: [DatatableComponent]
})
export class DatatableModule { }
