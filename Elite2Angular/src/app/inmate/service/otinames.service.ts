import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtinamesService {
    dialogFlag: boolean;
    constructor(private http: HttpService) { }
    oiiflag: boolean;
    offenderRowData: any[] = [];
    public oiinamesflag = false;
    public offsearch: any;
    /** This is description of the vThaExecuteQuery function*/
    vThaExecuteQuery(obj) {
        return this.http.post('otinames/vThaExecuteQuery', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('otinames/sysPflExecuteQuery', obj);
    }
}
