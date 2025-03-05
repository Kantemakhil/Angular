import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmtransService {
    constructor(private http: HttpService) { }
    /** This is description of the txnTypeExecuteQuery function*/
    txnTypeExecuteQuery(obj) {
        return this.http.post('ocmtrans/txnTypeExecuteQuery', obj);
    }
    /** This is description of the txnTypeCommit function*/
    txnTypeCommit(obj) {
        return this.http.post('ocmtrans/txnTypeCommit', obj);
    }
    /** This is description of the csldTtExecuteQuery function*/
    csldTtExecuteQuery(obj) {
        return this.http.post('ocmtrans/csldTtExecuteQuery', obj);
    }
    /** This is description of the csldTtCommit function*/
    csldTtCommit(obj) {
        return this.http.post('ocmtrans/csldTtCommit', obj);
    }
    /** This is description of the txnPayeeExecuteQuery function*/
    txnPayeeExecuteQuery(obj) {
        return this.http.post('ocmtrans/txnPayeeExecuteQuery', obj);
    }
    /** This is description of the txnPayeeCommit function*/
    txnPayeeCommit(obj) {
        return this.http.post('ocmtrans/txnPayeeCommit', obj);
    }
    /** This is description of the cgfkTxntypecreditobligatioRecordGroup function*/
    cgfkTxntypecreditobligatioRecordGroup(obj) {
        return this.http.get('ocmtrans/cgfk$txnTypeCreditObligatioRecordGroup');
    }
    /** This is description of the cgfkTxnpayeepayeepersonidRecordGroup function*/
    cgfkTxnpayeepayeepersonidRecordGroup(obj) {
        return this.http.get('ocmtrans/cgfk$txnPayeePayeePersonIdRecordGroup');
    }
    /** This is description of the cgfkTxnpayeepayeecorporateRecordGroup function*/
    cgfkTxnpayeepayeecorporateRecordGroup(obj) {
        return this.http.get('ocmtrans/cgfk$txnPayeePayeeCorporateRecordGroup');
    }
    /** This is description of the cgfkCsldttcaseloadidRecordGroup function*/
    cgfkCsldttcaseloadidRecordGroup(obj) {
        return this.http.get('ocmtrans/cgfk$csldTtCaseloadIdRecordGroup');
    }
    /** This is description of the cgfkTxntypetxnusageRecordGroup function*/
    cgfkTxntypetxnusageRecordGroup(obj) {
        return this.http.get('ocmtrans/cgfk$txnTypeTxnUsageRecordGroup');
    }
    /** This is description of the cgfkTxntypetxnusageRecordGroup function*/
    cgfkchkTxnPayeeTxnPayeeCorporate(corporateId) {
        return this.http.get('ocmtrans/cgfkchkTxnPayeeTxnPayeeCorporate?corporateId=' + corporateId);
    }
    /** This is description of the cgfkTxntypetxnusageRecordGroup function*/
    cgfkchkTxnPayeeTxnPayeePerson(personId) {
        return this.http.get('ocmtrans/cgfkchkTxnPayeeTxnPayeePerson?personId=' + personId);
    }
    /** This is description of the cgfkTxntypetxnusageRecordGroup function*/
    txnTypeOnCheckDeleteMaster(txnType) {
        return this.http.get('ocmtrans/txnTypeOnCheckDeleteMaster?txnType=' + txnType);
    }
    /** This is description of the cgfkTxntypetxnusageRecordGroup function*/
    txnTypeValidation(txnType) {
        return this.http.get('ocmtrans/txnTypeValidation?txnType=' + txnType);
    }
}
