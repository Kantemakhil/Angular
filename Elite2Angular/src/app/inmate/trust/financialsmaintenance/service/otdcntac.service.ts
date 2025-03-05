import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtdcntacService {
    constructor(private http: HttpService) { }
    /** This is description of the offTxnExecuteQuery function*/
    offTxnExecuteQuery(obj) {
        return this.http.post('otdcntac/offTxnExecuteQuery', obj);
    }
    /** This is description of the offTxnCommit function*/
    offTxnCommit(obj) {
        return this.http.post('otdcntac/offTxnCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('otdcntac/sysPflExecuteQuery', obj);
    }
    /** This is description of the checkAccountSatus function*/
    checkAccountSatus(obj) {
        return this.http.post('otdcntac/checkAccountSatus', obj);
    }
    /** This is description of the getGroupPrivilege function*/
    getGroupPrivilege() {
        return this.http.get('otdcntac/getGroupPrivilege');
    }
}
