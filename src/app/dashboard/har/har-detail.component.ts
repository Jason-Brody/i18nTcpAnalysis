import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Chart, Serie } from '../models/chartModels'
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { IConfig, Region } from '../../services/models/IConfig';
import { groupBy, dateDiff } from '../../../libs/fun';
import { HarResult, HarInfo } from '../../services/models/HarInfo';


@Component({
  selector: 'app-har-detail',
  template: `
  <div echarts [options] = "option" [loading]="isLoading" (chartClick)="onChartClick($event)"></div>
  `
})
export class HarDetailComponent implements OnInit, OnChanges {

  @Output()
  chartClick:EventEmitter<any> = new EventEmitter<any>();

  @Output()
  chartCreate:EventEmitter<any> = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    this.showChart();
  }

  constructor() { }

  ngOnInit() {
    this.option = new Chart();
  }

  showChart() {
    if (this.selectedType != this.type) {
      return;
    }
    if (this.data && this.country && this.type && this.counterType) {
      this.option = this.createChart();
    }
  }

  option: Chart

  isChartCreate: boolean = false;

  @Input()
  data: HarResult;

  @Input()
  country: Region;

  @Input()
  network: string;

  @Input()
  type: string;

  @Input()
  selectedType: string;

  @Input()
  counterType: string;

  @Input()
  isLoading: boolean = true;

  @Input()
  config: IConfig;

  @Input()
  dateList: string[];

  @Input()
  productList: string[];


  spliter:string = "->";

  private createChart(): Chart {
   
    let displayedData:Map<any,HarInfo[]> = new Map<any,HarInfo[]>();
    if (this.productList && this.productList.length > 0) {
     
      let data = new Array<HarInfo>();
      for (let product in this.data.data) {
        if (this.productList.indexOf(product) != -1) {
          
          data = data.concat(this.data.data[product].filter(d=>d.type==this.type))
        }
      }
      displayedData = groupBy(data, i => `${i.product}${this.spliter}${i.domain}`);
      return this.createChartTemplate(displayedData,this.country.name,this.type,this.counterType);
    }else{
      return this.createChartTemplate(this.data.data,this.country.name,this.type,this.counterType);
    }
  }

  private createChartTemplate(data: Map<any,HarInfo[]>, country: string, type: string, counterType: string): Chart {
    let chart = new Chart();
    chart.legend.data = Object.getOwnPropertyNames(data);
    counterType = counterType.toLocaleLowerCase();
    chart.series = [];
    for(let product in data){
      let filterData:HarInfo[] = data[product].filter(d=>d.country == country && d.type == type && d.network == this.network);
      let serial:Serie = {
        name : product,
        type : 'line',
        data: this.dateList.map(d=>{
          let myData = filterData.filter(i=>i.date == d);
          if(myData && myData.length>0){
            let result =  myData.reduce((p,c)=>{p.sum += c[counterType]*c.count;p.count+=c.count;return p;},{sum:0,count:0})
            return parseFloat((result.sum/result.count).toFixed(2));
          }else{
            return NaN;
          }
        })
      }

      chart.series.push(serial);
      chart.xAxis[0].data = this.dateList;
    }
    this.chartCreate.emit(null);
    return chart;
  }



  
  //点击图标显示数据
  onChartClick(event: any) {
    this.chartClick.emit(event);
    // let selectedProduct:string = event.seriesName;
    // let selectedDate = event.name;
    // let selectedDomain = null;
    // if(this.productList && this.productList.length >0){
    //   let temp = selectedProduct.split(this.spliter);
    //   selectedProduct = temp[0];
    //   selectedDomain = temp[1];
      
    // }
  
    // let filter:(data:HarInfo)=>boolean = (d)=>
    //   d.country == this.country.name
    //   && d.date == selectedDate
    //   && d.type == this.type
    //   && d.network == this.network
    //   && (selectedDomain == null || d.domain == selectedDomain)
    

    // let selectedData = this.data.data[selectedProduct].filter(filter);
    // console.log(selectedData);
    // this.table = selectedData;
  }
}

