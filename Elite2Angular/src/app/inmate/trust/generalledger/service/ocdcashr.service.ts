import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdcashrService {
    constructor(private http: HttpService) { }
    /** This is description of the glTxnExecuteQuery function*/
    glTxnExecuteQuery(obj) {
        return this.http.post('ocdcashr/glTxnExecuteQuery', obj);
    }
    /** This is description of the glTxnCommit function*/
    glTxnCommit(obj) {
        return this.http.post('ocdcashr/glTxnCommit', obj);
    }
    /** This is description of the glTxn1ExecuteQuery function*/
    glTxn1ExecuteQuery(obj) {
        return this.http.post('ocdcashr/glTxn1ExecuteQuery', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('ocdcashr/sysPflExecuteQuery', obj);
    }
    /** This is description of the sysPflCommit function*/
    sysPflCommit(obj) {
        return this.http.post('ocdcashr/sysPflCommit', obj);
    }
    /** This is description of the cgfkGltxnaccountcodeRecordGroup function*/
    cgfkGltxnaccountcodeRecordGroup(caseloadId, caseloadType) {
        return this.http.get('ocdcashr/cgfk$glTxnAccountCodeRecordGroup?caseloadId=' + caseloadId + '&caseloadType=' + caseloadType);
    }
    /** This is description of the cgfkGltxnaccountcodeRecordGroup function*/
    accountCodeChangeEvent(caseloadId, caseloadType, accountCode) {
        return this.http.get('ocdcashr/accountCodeChangeEvent?caseloadId=' + caseloadId + '&caseloadType=' +
            caseloadType + '&accountCode=' + accountCode);
    }
    /** This is description of the txnAmountDataSlashes function*/
    txnAmountDataSlashes(txnEntryAmount) {
        return this.http.get('ocdcashr/txnAmountDataSlashes?txnEntryAmount=' + txnEntryAmount);
    }
}
