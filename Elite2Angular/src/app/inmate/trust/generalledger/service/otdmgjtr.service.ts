import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service'

@Injectable({providedIn: 'root'})
export class OtdmgjtrService {
    constructor(private http: HttpService) { }
    /** This is description of the glTxnExecuteQuery function*/
    gltxnExecuteQuery(obj) {
        return this.http.post('otdmgjtr/glTxnExecuteQuery', obj);
    }
    /** This is description of the glTxnCommit function*/
    glTxnCommit(obj) {
        return this.http.post('otdmgjtr/glTxnCommit', obj);
    }
    /** This is description of the glTxn1ExecuteQuery function*/
    gltxn1ExecuteQuery(obj) {
        return this.http.post('otdmgjtr/glTxn1ExecuteQuery', obj);
    }
    /** This is description of the glTxn1Commit function*/
    glTxn1Commit(obj) {
        return this.http.post('otdmgjtr/glTxn1Commit', obj);
    }
    /** This is description of the cgfkGltxnpayeecorporateidRecordGroup function*/
    cgfkGltxnpayeecorporateidRecordGroup(obj) {
        return this.http.get('otdmgjtr/cgfk$glTxnPayeeCorporateIdRecordGroup');
    }
    /** This is description of the cgfkGltxn1accountcodeRecordGroup function*/
    cgfkGltxn1accountcodeRecordGroup(obj) {
        return this.http.get('otdmgjtr/cgfk$glTxn1AccountCodeRecordGroup');
    }
    /** This is description of the cgfkGltxnaccountcodeRecordGroup function*/
    cgfkGltxnaccountcodeRecordGroup(obj) {
        return this.http.get('otdmgjtr/cgfk$glTxnAccountCodeRecordGroup');
    }
    /** This is description of the cgfkGltxnpayeepersonidRecordGroup function*/
    cgfkGltxnpayeepersonidRecordGroup(obj) {
        return this.http.get('otdmgjtr/cgfk$glTxnPayeePersonIdRecordGroup');
    }
    getDescandType(code, caseloadType) {
        return this.http.get('otdmgjtr/getDescandType?code=' + code + '&caseloadType=' + caseloadType);
    }
    lvlLastclosedPeriod(caseloadId) {
        return this.http.get('otdmgjtr/lvlLastclosedPeriod?caseloadId=' + caseloadId);
    }
    lvAllowedReopenPeriod(caseloadId) {
        return this.http.get('otdmgjtr/lvAllowedReopenPeriod?caseloadId=' + caseloadId);
    }
    lvEnteraccountPeriodId(txnEntryDate) {
        return this.http.get('otdmgjtr/lvEnteraccountPeriodId?txnEntryDate=' + txnEntryDate.getTime());
    }
    isPeriodValid(caseloadId, lventerAccountPeriod) {
        return this.http.get('otdmgjtr/isPeriodValid?caseloadId=' + caseloadId + '&lventerAccountPeriod='
            + lventerAccountPeriod);
    }
    lvAccountStatus(obj) {
        return this.http.post('otdmgjtr/cStatus', obj);
    }
    getPeriodStartDate(lventerAccountPeriod) {
        return this.http.get('otdmgjtr/getPeriodStartDate?lventerAccountPeriod=' + lventerAccountPeriod);
    }
    getperiodEndDate(lvlastClosedPeriod) {
        return this.http.get('otdmgjtr/getperiodEndDate?lvlastClosedPeriod=' + lvlastClosedPeriod);
    }
    isAccountchecking(caseloadId, accountCode) {
        return this.http.get('otdmgjtr/isAccountchecking?caseloadId=' + caseloadId + '&accountCode=' + accountCode);
    }
    getCurrentBalance (caseloadId, accountCode) {
        return this.http.get('otdmgjtr/getCurrentBalance?caseloadId=' + caseloadId + '&accountCode=' + accountCode);
    }

}
