import { Injectable } from '@angular/core';
import { IDataService, BaseHttp } from './common';
import { TcpResult } from './models/TcpInfo';
import { Observable } from 'rxjs/Observable';
import { IConfig, Region, Product } from './models/IConfig';
import { convertDate } from '../../libs/fun';

@Injectable()
export class TcpdataService extends BaseHttp implements IDataService<TcpResult> {


  private configPath:string = '/data/base-info?file_type=pcap';

  private dataPath:string = '/data/pcap_analyze_info?';

  //private resultPath:string = '/data/tcp_analyze_info?'
  private resultPath:string = '/data/tcp?'

  // https://musically.byted.org/rack/data/tcp_analyze_info?from_date=2018-02-21&to_date=2018-02-28&region=IN&network=JIO&products=KWAI
  getConfig(): Observable<IConfig> {
    //let url = "/api/base-info.json";
    let url = this.baseUrl + this.configPath;
    //let url = "http://10.92.14.239:8000/rack/data/base-info?file_type=pcap";
    return this.httpClient.get<IConfig>(url);
  }

  getData(start: Date, end: Date): Observable<TcpResult> {
    //let url = this.dataPath;
    let url =this.baseUrl+this.dataPath + `from_date=${convertDate(start)}&to_date=${convertDate(end)}`
    //let url = "http://10.92.14.239:8000/rack/data/pcap_analyze_info?from_date=2018-01-20&to_date=2018-02-20"
    return this.httpClient.get<TcpResult>(url);
  }

  getResult(start:Date,end:Date,region:Region,network:string,products:Product[]):Observable<TcpResult>{
    let url = this.baseUrl 
    + this.resultPath
    + `from_date=${convertDate(start)}&to_date=${convertDate(end)}`
    + `&region=${region.name}&network=${network}&products=${products.map(p=>p.name).join(',')}`;

    return this.httpClient.get<TcpResult>(url);
  }


}
