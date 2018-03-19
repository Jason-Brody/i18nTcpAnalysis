import { Component, OnInit, SimpleChanges,Input,OnChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import {NgStyle} from '@angular/common'

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnChanges {


  @ViewChild(MatPaginator) paginator: MatPaginator;

  
  ngOnChanges(changes: SimpleChanges): void {
       
       this.createColumns();
       this.dataSource = new MatTableDataSource<any>(this.data);
       this.dataSource.paginator = this.paginator;
       this.paginator.pageSize = 10;
      //  setTimeout(()=>{
      //   this.dataSource = new MatTableDataSource<any>(this.data);
      //  },1000)
  }

  constructor() { }

  
  @Input()
  data:any[];

  columns:string[];

  @Input()
  selectedColumns:any;

  dataSource:MatTableDataSource<any>;

  createColumns(){
    this.columns = [];
    for(let item in this.selectedColumns){
        this.columns.push(item)
    }
  }

  setStyle(column:string){
    let style = this.selectedColumns[column].style
    return style
  }



  

}


