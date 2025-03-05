import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service'

@Injectable({providedIn: 'root'})
export class OtidtaccService {
    constructor(private http: HttpService) {}
    /** This is description of the offTaExecuteQuery function*/
    offTaExecuteQuery(obj) {
        return this.http.post('otidtacc/offTaExecuteQuery', obj);
    }
    /** This is description of the offSubaExecuteQuery function*/
    offSubaExecuteQuery(obj) {
        return this.http.post('otidtacc/offSubaExecuteQuery', obj);
    }
    /** This is description of the offDedExecuteQuery function*/
    offDedExecuteQuery(obj) {
        return this.http.post('otidtacc/offDedExecuteQuery', obj);
    }
    /** This is description of the offTxnExecuteQuery function*/
    offTxnExecuteQuery(obj) {
        return this.http.post('otidtacc/offTxnExecuteQuery', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('otidtacc/sysPflExecuteQuery', obj);
    }
    /** This is description of the sysPflCommit function*/
    sysPflCommit(obj) {
        return this.http.post('otidtacc/sysPflCommit', obj);
    }
    /** This is description of the calcAccountBalancesRecordGroup function*/
    calcAccountBalancesRecordGroup() {
        return this.http.get( 'otidtacc/calcAccountBalancesRecordGroup');
    }
     /** This is description of the offDedExecuteQuery function*/
     populateCreditObligation(obj) {
        return this.http.post('otidtacc/populateCreditObligation', obj);
    }
}
