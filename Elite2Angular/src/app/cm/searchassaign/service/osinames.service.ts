import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service'

@Injectable({providedIn: 'root'})
export class OsinamesService {
    public offsearch: any;
    offenderRowData: any[] = [];
    public oiinamesflag = false;
    routUrl: string;
    oiiflag: boolean;
 constructor(private http: HttpService) { }
 /** This is description of the nameSrchExecuteQuery function*/
 nameSrchExecuteQuery(obj) {
 return this.http.post('/osinames/nameSrchExecuteQuery', obj);
 }
}
