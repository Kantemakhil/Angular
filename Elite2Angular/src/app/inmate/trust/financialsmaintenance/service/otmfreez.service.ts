import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtmfreezService {
    constructor(private http: HttpService) { }
    /** This is description of the freDisExecuteQuery function*/
    freDisExecuteQuery(obj) {
        return this.http.post('otmfreez/freDisExecuteQuery', obj);
    }
    /** This is description of the freDisCommit function*/
    freDisCommit(obj) {
        return this.http.post('otmfreez/freDisCommit', obj);
    }
    /** This is description of the cgfkFredistxntypeRecordGroup function*/
    cgfkFredistxntypeRecordGroup(obj) {
        return this.http.get('otmfreez/cgfk$freDisTxnTypeRecordGroup');
    }
    /** This is description of the cgfkFredisaccountcodeRecordGroup function*/
    cgfkFredisaccountcodeRecordGroup(obj) {
        return this.http.get('otmfreez/cgfk$freDisAccountCodeRecordGroup');
    }
    txnUsageCode(txnCode, caseloadType) {
        return this.http.get('otmfreez/getTxnUage?txnCode=' + txnCode + '&caseloadType=' + caseloadType);
    }
    accountCodeLov(caseloadType) {
        return this.http.get('otmfreez/cgfkFreDisAccountCodeRecordGroup?caseloadType=' + caseloadType);
    }
}
