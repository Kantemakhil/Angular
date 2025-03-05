import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';
@Injectable({providedIn: 'root'})
export class DmnModulerService {
    
    dmnRowData:any;
    constructor(private http: HttpService) { }
    saveDmn(obj) {
        return this.http.post('dmnmain/decisionCommit', obj);
    }
    getDmnDataByDmnDesc(obj){
        return this.http.post('dmnmain/getDmnDataByDmnDesc', obj);
    }
    
    }






