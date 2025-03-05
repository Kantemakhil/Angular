import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtdreceiService {
    constructor(private http: HttpService) {}
    /** This is description of the offTxn1ExecuteQuery function*/
    offTxn1ExecuteQuery(obj) {
        return this.http.post('otdrecei/offTxn1ExecuteQuery', obj);
    }
    /** This is description of the offTxn1Commit function*/
    offTxn1Commit(obj) {
        return this.http.post('otdrecei/offTxn1Commit', obj);
    }
    /** This is description of the offTxnExecuteQuery function*/
    offTxnExecuteQuery(obj) {
        return this.http.post('otdrecei/offTxnExecuteQuery', obj);
    }
    /** This is description of the offTxnCommit function*/
    offTxnCommit(obj) {
        return this.http.post('otdrecei/offTxnCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('otdrecei/sysPflExecuteQuery', obj);
    }
    /** This is description of the cgfkOfftxn1txntypeRecordGroup function*/
    cgfkOfftxn1txntypeRecordGroup(obj) {
        return this.http.get( 'otdrecei/cgfk$offTxn1TxnTypeRecordGroup');
    }

    otdreceiChkReceiptFlag(txnType, caseloadId) {
        return this.http.get(`otdrecei/otdreceiChkReceiptFlag?txnType=${txnType}&caseloadId=${caseloadId}`);
    }

    deductionsChkOffenderDeductions(caseloadId: string, offenderId: number, txnType: string, shadowId: number) {
        return this.http.get(
        `otdrecei/deductionsChkOffenderDeductions?caseloadId=${caseloadId}&offenderId=${offenderId}&txnType=${txnType}&shadowId=${shadowId}`
    );
    }
}
