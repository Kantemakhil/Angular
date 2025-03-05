import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtuholdrService {
    constructor(private http: HttpService) {}
    /** This is description of the offTxnExecuteQuery function*/
    offTxnExecuteQuery(obj) {
        return this.http.post('otuholdr/offTxnExecuteQuery', obj);
    }
    /** This is description of the offTxnCommit function*/
    offTxnCommit(obj) {
        return this.http.post('otuholdr/offTxnCommit', obj);
    }
    /** This is description of the getVHoldClearFlag function*/
    getVHoldClearFlag(obj) {
        return this.http.post('otuholdr/getVHoldClearFlag', obj);
    }
    /** This is description of the onInsert function*/
    onInsert (obj) {
        return this.http.post('otuholdr/onInsert', obj);
    }
}
