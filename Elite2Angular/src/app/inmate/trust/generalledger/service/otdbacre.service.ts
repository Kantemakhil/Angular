import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtdbacreService {
    constructor(private http: HttpService) { }
    /** This is description of the glTxnExecuteQuery function*/
    glTxnExecuteQuery(obj) {
        return this.http.post('otdbacre/glTxnExecuteQuery', obj);
    }
    /** This is description of the glTxnCommit function*/
    glTxnCommit(obj) {
        return this.http.post('otdbacre/glTxnCommit', obj);
    }
    /** This is description of the bankRcExecuteQuery function*/
    bankRcExecuteQuery(obj) {
        return this.http.post('otdbacre/bankRcExecuteQuery', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('otdbacre/sysPflExecuteQuery', obj);
    }
    /** This is description of the sysPflCommit function*/
    sysPflCommit(obj) {
        return this.http.post('otdbacre/sysPflCommit', obj);
    }
    /** This is description of the bcrTmpExecuteQuery function*/
    bcrTmpExecuteQuery(obj) {
        return this.http.post('otdbacre/bcrTmpExecuteQuery', obj);
    }
    /** This is description of the bcrTmpCommit function*/
    bcrTmpCommit(obj) {
        return this.http.post('otdbacre/bcrTmpCommit', obj);
    }
    /** This is description of the glTxn1ExecuteQuery function*/
    glTxn1ExecuteQuery(obj) {
        return this.http.post('otdbacre/glTxn1ExecuteQuery', obj);
    }
    /** This is description of the glTxn2ExecuteQuery function*/
    glTxn2ExecuteQuery(obj) {
        return this.http.post('otdbacre/glTxn2ExecuteQuery', obj);
    }
    /** This is description of the glTxn3ExecuteQuery function*/
    glTxn3ExecuteQuery(obj) {
        return this.http.post('otdbacre/glTxn3ExecuteQuery', obj);
    }
    /** This is description of the cgfkGltxnaccountcodeRecordGroup function*/
    cgfkGltxnaccountcodeRecordGroup() {
        return this.http.get('otdbacre/cgfk$glTxnAccountCodeRecordGroup');
    }
     /** This is description of the getPmaxDate function*/
     getPmaxDate(caseloadId, accCode) {
        return this.http.get('otdbacre/getPmaxDate?caseloadId=' + caseloadId + '&accCode=' + accCode);
    }
    compareEffectiveDate (effDate, maxDate) {
        return this.http.get('otdbacre/compareEffectiveDate?effDate=' + effDate + '&maxDate=' + maxDate);

    }
    getchcqueFlag(txnId , txnEnterySeq, glEntrySeq, cgnbtBankStatementDate) {
        return this.http.get('otdbacre/getchcqueFlag?txnId=' + txnId + '&txnEnterySeq=' + txnEnterySeq +
        '&glEntrySeq=' + glEntrySeq + '&cgnbtBankStatementDate=' + cgnbtBankStatementDate);

    }
    updateGlTransactionswithN(txnId) {
        return this.http.get('otdbacre/updateGlTransactionswithN?txnId=' + txnId );
    }
    updateBankReconAudits (obj) {
            return this.http.post('otdbacre/updateBankReconAudits' , obj);
    }
    insertBankReconAudits (obj ) {
        return this.http.post('otdbacre/insertBankReconAudits', obj);
    }
    getTrustBal (accountCode, caseloadId) {
        return this.http.get('otdbacre/getTrustBal?accountCode=' + accountCode + '&caseloadId=' + caseloadId);
    }
}

