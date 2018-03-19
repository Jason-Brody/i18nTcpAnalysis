import { Component, OnInit, ViewChild } from '@angular/core';
import { FileService } from '../../services/file.service';
import { FileInfo } from '../../services/models/FileInfo';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormControl, NgModel } from '@angular/forms';

@Component({
  selector: 'app-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.css']
})
export class FileManagementComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private fileService: FileService) { }

  files: FileInfo[];

  filterFiles: FileInfo[]

  columns: any;

  displayedColumns: string[]

  isLoading: boolean = false;

  start = new FormControl(new Date());

  filter = new FormControl()

  filterStr =''



  ngOnInit() {
    this.getAllFiles();
    this.paginator.pageSize = 10;

    this.displayedColumns = ["id", "region", "file_type", "product", "create_time", "network", "status", "tos_address","info"];



    // this.columns = {
    //   "id":"id",
    //   "region":"国家",
    //   "product":"产品",
    //   "file_type":"文件类型",
    //   "status":"状态",
    //   "collect_time":"数据统计日期",
    //   "create_time":"文件上传日期",
    //   "modify_time":"最后更新",
    //   "network":"网络类型"
    // }
  }

  getFilterCondition() {
    let conditions = []
    for (let item of this.filterStr.split(';')) {
      let k = item.split('=')[0].trim()
      let v = item.split('=')[1].trim()
      conditions.push((o) => o[k] == v)
    }
    return conditions;
  }

  filterTest() {
    try {
      let conditions = this.getFilterCondition()
      this.filterFiles = this.files.filter(f => !conditions.some(c => c(f) == false))
    } catch (exception) {
      console.log(exception);
      this.filterFiles = this.files
    }
  }



  dataSource: MatTableDataSource<any>;

  onDateChange() {

    this.getAllFiles();
  }

  getAllFiles() {
    this.isLoading = true;
    this.fileService.getAllFiles(this.start.value).subscribe(f => {
      this.files = f;
      this.onChange(null);
      console.log(this.files);
    });
  }


  


  onChange(event: any) {
    this.filterTest();
    this.dataSource = new MatTableDataSource(this.filterFiles);
    this.paginator.firstPage();
    this.dataSource.paginator = this.paginator;
    setTimeout(()=>{
      this.dataSource.sort = this.sort;
    },100)
    
    this.isLoading = false;
  }

}
