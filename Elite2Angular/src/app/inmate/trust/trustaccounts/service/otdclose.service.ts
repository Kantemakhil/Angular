import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtdcloseService {
    constructor(private http: HttpService) { }
    /** This is description of the offSubaExecuteQuery function*/
    offSubaExecuteQuery(obj) {
        return this.http.post('otdclose/offSubaExecuteQuery', obj);
    }
    /** This is description of the offSubaCommit function*/
    offSubaCommit(obj) {
        return this.http.post('otdclose/offSubaCommit', obj);
    }
    /** This is description of the offTxnExecuteQuery function*/
    offTxnExecuteQuery(obj) {
        return this.http.post('otdclose/offTxnExecuteQuery', obj);
    }
    /** This is description of the offTxnCommit function*/
    offTxnCommit(obj) {
        return this.http.post('otdclose/offTxnCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('otdclose/sysPflExecuteQuery', obj);
    }
    /** This is description of the cgfkOfftxnpayeecodeRecordGroup function*/
    cgfkOfftxnpayeecodeRecordGroup() {
        return this.http.get('otdclose/cgfk$offTxnPayeeCodeRecordGroup');
    }
    /** This is description of the getRegBal function*/
    getRegBal(offenderId, caseloadId) {
        return this.http.get('otdclose/getRegBal?offenderId=' + offenderId + '&caseloadId=' + caseloadId);
    }
    /** This is description of the accountNameForValidation function*/
    accountNameForValidation() {
        return this.http.get('otdclose/accountNameForValidation');
    }
    /** This is description of the accountClosedFlagValidation function*/
    accountClosedFlagValidation(offenderId, caseloadId) {
        return this.http.get('otdclose/accountClosedFlagValidation?offenderId=' + offenderId + '&caseloadId=' + caseloadId);
    }
    /** This is description of the chkAccountClosedFlag function*/
    chkAccountClosedFlag(offenderId, caseloadId) {
        return this.http.get('otdclose/chkAccountClosedFlag?offenderId=' + offenderId + '&caseloadId=' + caseloadId);
    }
    /** This is description of the freezDisbursement function*/
    freezDisbursement(caseloadId, offenderId, pTxnType, caseloadType) {
        return this.http.get('otdclose/freezDisbursement?caseloadId=' + caseloadId + '&offenderId=' +
            offenderId + '&pTxnType=' + pTxnType + '&caseloadType=' + caseloadType);
    }
    /** This is description of the chkSubAccountFlag function*/
    chkSubAccountFlag(offenderId, caseloadId) {
        return this.http.get('otdclose/chkAccountClosedFlag?offenderId=' + offenderId + '&caseloadId=' + caseloadId);
    }
}
