import { Component, OnInit, EventEmitter } from '@angular/core';
import { dateDiff } from '../../../libs/fun';
import { MatSlideToggleChange, MatTabChangeEvent, MatSelectChange } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Region, IConfig, Product } from '../../services/models/IConfig';
import { HarResult, HarInfo } from '../../services/models/HarInfo';
import { HardataService } from '../../services/hardata.service';

@Component({
  selector: 'app-har',
  templateUrl: './har.component.html',
  styleUrls: ['./har.component.css']
})
export class HarComponent implements OnInit {

  formControl = new FormControl();
  constructor(private dataService:HardataService) { }

  ngOnInit() {
    this.getData();
    
    this.dataService.getConfig().subscribe(d=>{
      
      this.config = d;
      this.selectedRegion = this.config.regions[0];
      this.selectedNetwork = this.selectedRegion.networks[0].index_name;
      this.selectedType = this.config.test_types[0];
      this.initTable();
    })
  }

  data:HarResult;

  config:IConfig;

  selectedRegion:Region;

  counterTypes:Array<string>;

  selectedType:string;

  selectedNetwork:string;

  selectedProduct:String[];

  disabled:boolean = true;

  startDate = new FormControl(this.addDays(-7));

  endDate = new FormControl(new Date());

  isLoading:boolean = false;

  dateList:string[];

  isShowDomain:boolean = false;

  productList:string[];

  onDateChange(){
    this.disabled = false;
  }

  selectChange(data:MatTabChangeEvent){
    this.selectedType = data.tab.textLabel;
  }

  addDays(diff:number):Date{
    let d = new Date();
    d.setDate(d.getDate()+diff)
    return d;
  }

  getData(){
    this.isLoading = true;
    
    let end:Date = this.endDate.value;
    let start:Date = this.startDate.value;
    this.dateList = dateDiff(start,end,c=>`${c.getFullYear()}-${c.getMonth()<9?0:''}${c.getMonth()+1}-${c.getDate()<10?0:''}${c.getDate()}`);
    

    this.dataService.getData(this.startDate.value,this.endDate.value).subscribe(d=>{
      this.data = d;
      this.disabled = true;
      this.isLoading = false;
      this.productList = Object.keys(d.data);
    });
    this.disabled = true;
  }

  onPageActivate(data:any){
    this.selectedRegion = data.country;
  }

  toggleChange(event:MatSlideToggleChange){
     this.isShowDomain = event.checked;
     if(!this.isShowDomain){
      this.selectedProduct = [];
     }
     this.formControl.reset();
  }

  onRegionChange(event:EventEmitter<MatSelectChange>){
    this.selectedNetwork = 'WIFI';
  }



  //#region 显示图表数据

  spliter:string = "->";

  onChartClick(event:any){
    let selectedProduct:string = event.seriesName;
    let selectedDate = event.name;
    let selectedDomain = null;
    if(this.productList && this.productList.length >0){
      let temp = selectedProduct.split(this.spliter);
      selectedProduct = temp[0];
      selectedDomain = temp[1];
      
    }
  
    let filter:(data:HarInfo)=>boolean = (d)=>
      d.country == this.selectedRegion.name
      && d.date == selectedDate
      && d.type == this.selectedType
      && d.network == this.selectedNetwork
      && (selectedDomain == null || d.domain == selectedDomain)
     
    

    let selectedData = this.data.data[selectedProduct].filter(filter);
    console.log(selectedData);
    this.table = selectedData;
  }

  onChartCreate(event:any){
    this.table = [];
  }


  
  table:any;

  columns:any;

  initTable(){
    this.table = [];
    this.columns = {};
    this.columns['date'] = "日期";
    this.columns['product'] = "产品";
    this.columns['domain'] = "域名";
    this.columns['count'] = "次数";
    this.config.index_types.forEach(i => this.columns[i.index_name.toLowerCase()] = i.description);
  }
  //#endregion

}