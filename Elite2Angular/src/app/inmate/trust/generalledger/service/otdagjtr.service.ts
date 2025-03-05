import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtdagjtrService {
    constructor(private http: HttpService) {}
    /** This is description of the glTxnExecuteQuery function*/
    glTxnExecuteQuery(obj) {
        return this.http.post('otdagjtr/glTxnExecuteQuery', obj);
    }
    /** This is description of the glTxnCommit function*/
    glTxnCommit(obj) {
        return this.http.post('otdagjtr/glTxnCommit', obj);
    }
    /** This is description of the glTxn1ExecuteQuery function*/
    glTxn1ExecuteQuery(obj) {
        return this.http.post('otdagjtr/glTxn1ExecuteQuery', obj);
    }
    /** This is description of the glTxn1Commit function*/
    glTxn1Commit(obj) {
        return this.http.post('otdagjtr/glTxn1Commit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('otdagjtr/sysPflExecuteQuery', obj);
    }
    /** This is description of the sysPflCommit function*/
    sysPflCommit(obj) {
        return this.http.post('otdagjtr/sysPflCommit', obj);
    }
    /** This is description of the cgfkGltxntxntypeRecordGroup function*/
    cgfkGltxntxntypeRecordGroup(obj) {
        return this.http.get( 'otdagjtr/cgfk$glTxnTxnTypeRecordGroup');
    }
    /** This is description of the cgfkGltxnpayeepersonidRecordGroup function*/
    cgfkGltxnpayeepersonidRecordGroup(obj) {
        return this.http.get(`otdagjtr/cgfkGlTxnPayeePersonIdRecordGroup?personId=${obj}`);
    }
    /** This is description of the cgfkGltxnpayeecorporateidRecordGroup function*/
    cgfkGltxnpayeecorporateidRecordGroup(obj) {
        return this.http.get( `otdagjtr/cgfkGlTxnPayeeCorporateIdRecordGroup?corporateId=${obj}`);
    }
    onTxnEntryDateBlur(caseloadId, txnDate) {
        return this.http.get( `otdagjtr/onTxnEntryDateBlur?caseloadId=${caseloadId}&txnDate=${txnDate}`);
    }
    onTxnTypeValueChange(caseloadId,  caseloadType, txnType) {
        const url = `otdagjtr/onTxnTypeValueChange?caseloadId=${caseloadId}&caseloadType=${caseloadType}&txnType=${txnType}`;
        return this.http.get(url);
    }
    prGetOffsetAccounts(obj) {
        return this.http.post('otdagjtr/prGetOffsetAccounts', obj);
    }
}
