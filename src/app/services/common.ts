import { Observable } from "rxjs/Observable";
import { IConfig } from "./models/IConfig";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface IDataService<T> {
    getConfig(): Observable<IConfig>

    getData(start: Date, end: Date): Observable<T>
}

@Injectable()
export class BaseHttp{
    constructor(protected httpClient:HttpClient){

    }

    protected baseUrl:string = 'https://musically.byted.org/rack'
}
