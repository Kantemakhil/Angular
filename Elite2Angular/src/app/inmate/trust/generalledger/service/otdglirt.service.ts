import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtdglirtService {
    constructor(private http: HttpService) { }
    /** This is description of the glTxnExecuteQuery function*/
    glTxnExecuteQuery(obj) {
        return this.http.post('otdglirt/glTxnExecuteQuery', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('otdglirt/sysPflExecuteQuery', obj);
    }
    /** This is description of the sysPflCommit function*/
    sysPflCommit(obj) {
        return this.http.post('otdglirt/sysPflCommit', obj);
    }
    /** This is description of the glTxn1ExecuteQuery function*/
    glTxnOneExecuteQuery(obj) {
        return this.http.post('otdglirt/glTxnOneExecuteQuery', obj);
    }
    /** This is description of the glTxn2ExecuteQuery function*/
    glTxn2ExecuteQuery(obj) {
        return this.http.post('otdglirt/glTxn2ExecuteQuery', obj);
    }
    /** This is description of the glTxn2Commit function*/
    glTxnCommit(obj) {
        return this.http.post('otdglirt/glTxnCommit', obj);
    }
    /** This is description of the glTxn3ExecuteQuery function*/
    glTxn3ExecuteQuery(obj) {
        return this.http.post('otdglirt/glTxn3ExecuteQuery', obj);
    }
    /** This is description of the cgfkGltxn3reversalreasonRecordGroup function*/
    cgfkGlTxnReversalReasonRecordGroup(obj) {
        return this.http.get('otdglirt/cgfkGlTxnReversalReasonRecordGroup');
    }
    /** This is description of the txnReversedFlagData function*/
    txnReversedFlagData(txnId, txnEntrySeq) {
        return this.http.get('otdglirt/txnReversedFlagData?txnId=' + txnId + '&txnEntrySeq=' + txnEntrySeq);
    }
    /** This is description of the glTxn2ExecuteQuery function*/
    whenNextbuttonClick(obj) {
        return this.http.post('otdglirt/whenNextbuttonClick', obj);
    }
    /** This is description of the glTxn2ExecuteQuery function*/
    whenNextbuttonUpdates(obj) {
        return this.http.post('otdglirt/whenNextbuttonUpdates', obj);
    }

}
