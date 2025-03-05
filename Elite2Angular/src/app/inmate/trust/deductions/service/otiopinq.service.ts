import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtiopinqService {
    constructor(private http: HttpService) { }
    /** This is description of the offDedExecuteQuery function*/
    offDedExecuteQuery(obj) {
        return this.http.post('otiopinq/offDedExecuteQuery', obj);
    }
    /** This is description of the offTxnExecuteQuery function*/
    offTxnExecuteQuery(obj) {
        return this.http.post('otiopinq/offTxnExecuteQuery', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('otiopinq/sysPflExecuteQuery', obj);
    }
}
