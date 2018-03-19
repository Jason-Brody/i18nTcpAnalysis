import { Component, OnInit } from '@angular/core';
import { MappingAnalysis,Field } from './mappingAnalysis'
import {NgModel, FormControl} from '@angular/forms'

@Component({
  selector: 'app-map2wl',
  templateUrl: './map2wl.component.html',
  styleUrls: ['./map2wl.component.css']
})
export class Map2wlComponent implements OnInit {

  constructor() { }

  mapAnalysis: MappingAnalysis;

  fields: Field[] = [];

  sourceFields: Field[] = [];

  filterFields_V:any[];

  filterFields_C:any[];

  ngOnInit() {
    this.mapAnalysis = new MappingAnalysis();
  }

  selectedColumns_V = {
    'key': { 
      'desc': '字段名(提取字段)',
      'style':{
        'flex': '0 0 80%;'
      }
    },
    'type': { 
      'desc': '字段类型',
      'style':{
        'flex': '0 0 20%'
      }
    }
  }

  selectedColumns_C = {
    'key': { 
      'desc': '字段名(原始字段)',
      'style':{
        'flex': '0 0 90%;'
      }
    },
    'type': { 
      'desc': '字段类型',
      'style':{
        'flex': '0 0 10%'
      }
    }
  }

  filterStr:string = ''

  filter = new FormControl()

  change(event:any){
    this.filterFields_V = this.fields.filter(c=>c.key.indexOf(this.filterStr) != -1)
    this.filterFields_C = this.sourceFields.filter(c=>c.key.indexOf(this.filterStr) != -1)
    this.downloadStr = this.getDownloadStr();
  }

  showJsonData = false;

  jsonData = "";

  downloadStr = "";

  showJson(event:any){
    this.showJsonData = !this.showJsonData;
    if(!this.showJsonData){
      try{
        let obj = JSON.parse(this.jsonData);
        this.mapAnalysis.analysis(obj);
        this.fields = [];
        this.sourceFields = [];

        for (let item in this.mapAnalysis.fieldList) {
          let fieldItem = this.mapAnalysis.fieldList[item]
          this.fields.push({'key':fieldItem.key,'type':fieldItem.type})
          fieldItem.keyPaths.forEach(f => {
            this.sourceFields.push(f)
          });
        }
        this.filterFields_C = this.sourceFields
        this.filterFields_V = this.fields;
        
      }catch(exception){
        console.log(exception)
      }
      
    }
    setTimeout(() => {
      this.change(null)
    }, 50);
    
  }

  getDownloadStr():string{
    let header = "field,type\n";
    this.fields.forEach(d=>{
      let body = [d.key,d.type].join(',')
      header += body+'\n';
    })
    header += "\nsourceField,type\n";
    this.sourceFields.forEach(d=>{
      let body = [d.key,d.type].join(',')
      header += body+'\n';
    })
    return header;
  }
}




