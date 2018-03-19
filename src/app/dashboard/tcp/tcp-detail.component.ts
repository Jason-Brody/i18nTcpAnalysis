import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { IConfig, Product } from '../../services/models/IConfig';
import { groupBy, dateDiff } from '../../../libs/fun';
import { collectExternalReferences } from '@angular/compiler/src/output/output_ast';
import { Chart, Serie } from '../models/chartModels';
import { TcpByNetwork, TcpInfo, TcpResult } from '../../services/models/TcpInfo';

// <app-datatable [data]='table' [selectedColumns]='columns'></app-datatable>
@Component({
  selector: 'app-tcp-detail',
  template: `
  <div class='echarts' echarts [options] = "option" [loading]="isLoading" (chartClick)="onChartClick($event)"></div>
  `,
  styles:[
    `
    div.echarts{
      width:98%;
    }
    `
  ]
})
export class TcpDetailComponent implements OnInit {

  ngOnChanges(changes: SimpleChanges){
    if(changes['country'] || changes['network'] || changes['data'] ||changes['selectedDomain'] || changes['productList']){
      this.showChart();
    }    
  }

  constructor() { }

  ngOnInit() {

    this.option = new Chart();
  }

  async showChart() {
   
    if (this.country && this.network && this.counterType && this.data) {
      this.isLoading = true;
      this.option =await this.createChart();
      this.isLoading = false;
      this.table = [];
      this.columns = {};
      this.columns['COLLECT_TIME'] = "日期";
      this.columns['PRODUCT'] = "产品";
      this.columns['ip'] = "IP地址";
      this.columns['domain'] = "域名";
      this.columns['port'] = "端口号"
      this.columns['value'] = this.counterType;
      this.columns['count'] = "次数"
      //this.config.index_types.forEach(i => this.columns[i.index_name] = i.description);
    }
    
  }


  columns: any;

  option: Chart

  isChartCreate: boolean = false;



  @Input()
  data: TcpByNetwork;

  @Input()
  country: string;

  @Input()
  network: string;

  @Input()
  counterType: string;

  @Input()
  isLoading: boolean;

  @Input()
  config: IConfig;

  @Input()
  dateList: string[];

  @Input()
  productList: Product[];

  @Input()
  selectedDomain = new Array<string>();


  table: any;

  spliter: string = "->";

  private createChart(): Promise<Chart> {
    console.log('show chart')
    if(this.data && this.data.data[this.country] && this.data.data[this.country][this.network] && this.data.data[this.country][this.network][this.counterType]){
      let result:TcpInfo[] = this.data.data[this.country][this.network][this.counterType]
      if(result && result.length > 0){
        let data :Map<any, TcpInfo[]> = new Map<any, TcpInfo[]>();
        if(this.productList && this.productList.length > 0){
           result = result.filter(r=> this.productList.map(p=>p.name).includes(r.product)&& (this.selectedDomain == null || this.selectedDomain.length == 0 || this.selectedDomain.includes(r.domain)) );
           data = groupBy(result,t=>`${t.product}${this.spliter}${t.domain}`)
        }else{
           data = groupBy(result,t=>t.product);
        }
        return this.createChartTemplate(data);
      }
    }
    return new Promise<Chart>((resolve,reject)=>resolve(new Chart()));
  }

  domainFilter:(d:TcpInfo)=>boolean = d=>{
    if(this.selectedDomain == null){
      return true;
    }
    return this.selectedDomain.includes(d.domain);
  }

  private createChartTemplate(data: Map<any, TcpInfo[]>): Promise<Chart> {

    return new Promise<Chart>((resolve,reject)=>{
      let chart = new Chart();
      chart.legend.data = Object.getOwnPropertyNames(data);
      chart.series = [];
      for (let product in data) {
        let displayData: TcpInfo[] = data[product];
        let serial: Serie = {
          name: product,
          type: 'line',
          data: this.dateList.map(d => {
            let myData = displayData.filter(d1 => d1.date == d )
            if (myData && myData.length > 0) {
              let result = myData.reduce((p, c) => {
                p.sum += c.value * c.count;
                p.count += c.count;
                return p
              }, { sum: 0,count:0 });
              return parseFloat((result.sum / result.count).toFixed(2));
            }else{
              return NaN;
            }
          })
        }
        chart.series.push(serial);
        chart.xAxis[0].data = this.dateList;
      }
      resolve(chart);
    })

    
  }

  onChartClick(event: any) {
    let selectedProduct: string = event.seriesName;
    let selectedDate = event.name;
    let selectedIp = null;
    if (this.productList && this.productList.length > 0) {
      let temp = selectedProduct.split(this.spliter);
      selectedProduct = temp[0];
      selectedIp = temp[1];
    }

    let filter: (data: TcpInfo) => boolean = (d) =>
      d.product == selectedProduct
      && d.date == selectedDate
      && (selectedIp == null || d.ip == selectedIp)
    
    let selectedData:TcpInfo[] = this.data.data[this.country][this.network][this.counterType].filter(filter);
    selectedData.forEach(d=>{
      d["COLLECT_TIME"] = selectedDate
      d["PRODUCT"] = selectedProduct
    });
    let value = selectedData.reduce((p,c)=>{
      p.sum += c.value * c.count
      p.count += c.count
      return p
    },{sum:0,count:0})
    this.table = selectedData
  }
}
