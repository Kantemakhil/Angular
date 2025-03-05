import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcutrahiService {
    constructor(private http: HttpService) { }
    /** This is description of the benTxnExecuteQuery function*/
    benTxnExecuteQuery(obj) {
        return this.http.post('ocutrahi/benTxnExecuteQuery', obj);
    }
    /** This is description of the vBcBenExecuteQuery function*/
    vBcBenExecuteQuery(obj) {
        return this.http.post('ocutrahi/vBcBenExecuteQuery', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('ocutrahi/sysPflExecuteQuery', obj);
    }
}
