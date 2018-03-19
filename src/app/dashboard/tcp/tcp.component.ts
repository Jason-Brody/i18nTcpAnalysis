import { Component, OnInit, Input, SimpleChanges, EventEmitter } from '@angular/core';
import { debug } from 'util';
import { MatTabChangeEvent, MatSlideToggleChange, MatSelectChange, MatChipInputEvent } from '@angular/material';
import { IConfig, Region, Product } from '../../services/models/IConfig';
import { FormControl } from '@angular/forms';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { groupBy, dateDiff } from '../../../libs/fun';
import { TcpResult, TcpInfo } from '../../services/models/TcpInfo';
import { TcpdataService } from '../../services/tcpdata.service';
import { Observable } from 'rxjs/Observable';
import {startWith,map} from 'rxjs/operators';

@Component({
  selector: 'app-tcp',
  templateUrl: './tcp.component.html',
  styleUrls: ['./tcp.component.css']
})
export class TcpComponent {

  formControl = new FormControl();
  constructor(private dataService: TcpdataService) { }

  ngOnInit() {
   
  }

  ngAfterViewInit(){
    this.init();
    
    this.dataService.getConfig().subscribe(d => {
      this.config = d;
      
      this.selectedRegion = this.config.regions[0];
      this.selectedNetwork = this.selectedRegion.networks[0].index_name;
      setTimeout(()=>{
        this.selectedProduct = [this.config.products[0]];
        this.getData();
      },5);
      
    });
  }

  private _selectedRegion: Region;

  get selectedRegion(): Region {
    return this._selectedRegion;
  }

  set selectedRegion(value: Region) {
    this._selectedRegion = value;
    this.onDataChange();
  }

  private _selectedNetwork:string;

  get selectedNetwork():string{
    return this._selectedNetwork;
  }

  set selectedNetwork(value:string){
    this._selectedNetwork = value;
    this.onDataChange();
  }

  private _selectedProduct:Product[];

  get selectedProduct():Product[]{
    return this._selectedProduct;
  }

  set selectedProduct(value:Product[]){
    this._selectedProduct = value;
    this.onDataChange();
  }


  data: TcpResult;

  config: IConfig;


  disabled: boolean = true;

  startDate = new FormControl(this.addDays(-7));

  endDate = new FormControl(new Date());

  isLoading: boolean = false;

  dateList: string[];

  isShowDomain: boolean = false;

  

  onDataChange(){
    this.getData();
    this.disabled = false;
  }

  addDays(diff: number): Date {
    let d = new Date();
    d.setDate(d.getDate() + diff)
    return d;
  }

  getData() {
   
    if(this.selectedRegion==null || this.selectedNetwork == null || this.selectedProduct == null || this.selectedProduct.length ==0)
      return;

    this.isLoading = true;

    let end: Date = this.endDate.value;
    let start: Date = this.startDate.value;
    this.dateList = dateDiff(start, end, c => `${c.getFullYear()}-${c.getMonth() < 9 ? 0 : ''}${c.getMonth() + 1}-${c.getDate() < 10 ? 0 : ''}${c.getDate()}`);
    console.log('invoke')
    this.dataService.getResult(this.startDate.value, this.endDate.value,this.selectedRegion,this.selectedNetwork,this.selectedProduct).subscribe(d => {
      this.data = d;
      this.disabled = true;
      this.isLoading = false;
      this.filterData();
    })
    this.disabled = true;
  }


  filterData() {
    this.selectedDomain = [];
    if (this.selectedProduct == null || this.selectedProduct.length == 0) {
      return;
    }

    let selectedData = this.data.data[this.selectedRegion.name][this.selectedNetwork]['DNS']
    let domainOptions = this.groupData(selectedData);
    this.domains = Object.keys(domainOptions);
    this.regTest();
  }

  regTest(){
    let regStr = []
    this.selectedProduct.forEach(p=>regStr=regStr.concat(p.domains));
    
    
    let regs = regStr.map(r=>new RegExp(r));

    
    this.domains.filter(d=>regs.some(r=>r.test(d))).forEach(d=>{
      if(!this.selectedDomain.includes(d)){
        this.selectedDomain.push(d);
      }
    })

  }


  groupData(data: TcpInfo[]) {
    return groupBy(data, i => {
      if (this.selectedProduct && this.selectedProduct.map(p=>p.name).includes(i.product)) {
        return `${i.domain}`;
      }
      return null;
    })
  }



  // onPageActivate(data:any){
  //   this.selectedRegion = data.country;
  //   this.selectedNetwork = data.network;
  // }

  toggleChange(event: MatSlideToggleChange) {
    this.isShowDomain = event.checked;
    if (!this.isShowDomain) {
      this.selectedProduct = [];
    }
    this.formControl.reset();
  }

  onRegionChange(event: EventEmitter<MatSelectChange>) {
    this.selectedNetwork = 'WIFI';
  }


  //#region 选择域名
  domains = new Array<string>();

  selectedDomain:string[] = [];

  

  removeDomain(domain: any): void {
    let index = this.selectedDomain.indexOf(domain);
    if(index>=0){
      this.selectedDomain.splice(index,1);
      this.selectedDomain = this.copyDomain(this.selectedDomain);
    }
  }

  copyDomain(domains: Array<string>): Array<string> {
    let newDomains = [];
    domains.forEach(i => newDomains.push(i));
    let v: string = newDomains.reduce((p, c) => p + c + ',', '');
    v = v.substr(0, v.length - 1);
    //this.setCookie(this.cookieName, v, 10);
    return newDomains;
  }

  cookieName = 'selectedDomains';

  init(): void {
    // let cookies = this.getCookie();
    // if (cookies[this.cookieName]) {
    //   this.selectedDomain = cookies[this.cookieName].split(',');
    // }
    this.filteredOptions = this.myControl.valueChanges.pipe(
      
      map(val=>{
        return this.domains.filter(d=> !this.selectedDomain.includes(d) && d.toLowerCase().indexOf(val.toLowerCase())!=-1)
      })
    )
  }

  getCookie(): any {
    let cookies = {};
    document.cookie.split(';').forEach(i => {
      let cookie = i.split('=');
      cookies[cookie[0]] = cookie[1];
    })
    return cookies;
  }

  setCookie(key: string, value: any, expires: number) {
    let now = new Date();
    let expire = now.getTime() + 1000 * 3600 * 24 * expires;
    let expireDate = new Date(expire);
    document.cookie = `${key}=${value};expires=${expireDate}`;
  }

  myControl:FormControl = new FormControl();


  filteredOptions:Observable<string[]>;

  onOptionSelect(event:any){
    let value = event.option.value;
    if ((value || '').trim()) {
      this.selectedDomain.push(value.trim());
      this.selectedDomain = this.copyDomain(this.selectedDomain);
      this.myControl.setValue('');
    }
  }

  addDomain(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;
  
    if (input) {
      input.value = '';
    }
  }

  onChipInputEnd(event:MatChipInputEvent){
    event.input.value = '';
  }

  //#endregion

}
