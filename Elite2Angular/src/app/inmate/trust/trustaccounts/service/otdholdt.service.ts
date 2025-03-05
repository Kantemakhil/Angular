import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtdholdtService {
    constructor(private http: HttpService) {}
    /** This is description of the offTxnExecuteQuery function*/
    offTxnExecuteQuery(obj) {
        return this.http.post('otdholdt/offTxnExecuteQuery', obj);
    }
    /** This is description of the offTxnCommit function*/
    offTxnCommit(obj) {
        return this.http.post('otdholdt/offTxnCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('otdholdt/sysPflExecuteQuery', obj);
    }
    /** This is description of the cgfkOfftxnsubaccounttypeRecordGroup function*/
    cgfkOffTxnSubAccountTypeRecordGroup(caseLoadId) {
        return this.http.get( 'otdholdt/cgfkOffTxnSubAccountTypeRecordGroup?caseLoadId=' + caseLoadId);
    }
    /** This is description of the getExistingHoldAmount function*/
    getExistingHoldAmount(obj) {
        return this.http.post( 'otdholdt/getExistingHoldAmount' , obj);
    }
    /** This is description of the getSubAccountBalance function*/
    getSubAccountBalance(obj) {
        return this.http.post( 'otdholdt/getSubAccountBalance' , obj);
    }
}
