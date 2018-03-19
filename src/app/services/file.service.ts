import { Injectable } from '@angular/core';
import { BaseHttp } from './common';
import { FileInfo } from './models/FileInfo';
import { Observable } from 'rxjs/Observable';
import { convertDate } from '../../libs/fun';

@Injectable()
export class FileService extends BaseHttp {


   private url:string = '/data/files?date=';

   getAllFiles(start:Date):Observable<FileInfo[]>{
      
      return this.httpClient.get<FileInfo[]>(`${this.baseUrl}${this.url}${convertDate(start)}`);
   }

}
