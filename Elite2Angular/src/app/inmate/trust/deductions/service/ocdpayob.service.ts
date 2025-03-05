import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';
@Injectable({providedIn: 'root'})
export class OcdpayobService {

    constructor(private http: HttpService) { }
    /** This is description of the offTxnExecuteQuery function*/
    offTxnExecuteQuery(obj) {
        return this.http.post('ocdpayob/offTxnExecuteQuery', obj);
    }
    /** This is description of the offTxnCommit function*/
    offTxnCommit(obj) {
        return this.http.post('ocdpayob/offTxnCommit', obj);
    }
    /** This is description of the offBncExecuteQuery function*/
    offBncExecuteQuery(obj) {
        return this.http.post('ocdpayob/offBncExecuteQuery', obj);
    }
    /** This is description of the offBncCommit function*/
    offBncCommit(obj) {
        return this.http.post('ocdpayob/offBncCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('ocdpayob/sysPflExecuteQuery', obj);
    }
    /** This is description of the cgfkOfftxnsubaccounttypeRecordGroup function*/
    cgfkOfftxnsubaccounttypeRecordGroup(caseLoadId) {
        return this.http.get('ocdpayob/cgfkOffTxnSubAccountTypeRecordGroup?caseLoadId=' + caseLoadId);
    }
    /** This is description of the getCurrentBalance function*/
    getCurrentBalance(obj) {
        return this.http.post('ocdpayob/getCurrentBalance' , obj);
    }
    /** This is description of the txnTyepOffTxns function*/
    txnTyepOffTxns(subAccountType, caseloadType, caseloadId) {
        return this.http.get('ocdpayob/txnTyepOffTxns?subAccountType=' + subAccountType +
            '&caseloadType=' + caseloadType + '&caseloadId=' + caseloadId);
    }

    getOffenderFeesEnableBtn(){
        return this.http.get('ocdpayob/getOffenderFeesEnableBtn');
    }

    offFeeExecuteQuery(obj) {
        return this.http.post('ocdbreci/offFeeExecuteQuery', obj);
    }

    offFeesCommit(obj) {
        return this.http.post('ocdpayob/offFeesCommit', obj);
    }

    /** This is description of the getbillEndDayPfVal function*/
	getbillEndDayPfVal() {
        return this.http.get('ocdrecei/getbillEndDayPfVal');
    }
    /** This is description of the getCasePlanId function*/
    getCasePlanId(obj) {
        return this.http.post('ocdadjus/getCasePlanId', obj);
    }
}