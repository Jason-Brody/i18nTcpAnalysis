import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IConfig } from './models/IConfig';
import { BaseHttp, IDataService } from './common';
import { HarResult } from './models/HarInfo';
import { convertDate } from '../../libs/fun';

@Injectable()
export class HardataService extends BaseHttp implements IDataService<HarResult> {


  private configPath:string = '/data/base-info?file_type=har';

  private dataPath:string = '/data/analyze_info?';

  getConfig(): Observable<IConfig> {
    let url = this.baseUrl + this.configPath;
    //let url = '/api/har-info.json';
    //let url = "http://10.92.14.239:8000/rack/data/base-info"
    return this.httpClient.get<IConfig>(url);
  }
  getData(start: Date, end: Date): Observable<HarResult> {

    //let url = `http://10.92.14.239:8000/rack/data/analyze_info?from_date=${convertDate(start)}&to_date=${convertDate(end)}`;
    let url =this.baseUrl+this.dataPath + `from_date=${convertDate(start)}&to_date=${convertDate(end)}`;
    return this.httpClient.get<HarResult>(url);
  }

  

}




