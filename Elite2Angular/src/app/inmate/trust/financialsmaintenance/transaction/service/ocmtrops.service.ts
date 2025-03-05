import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmtropsService {
    constructor(private http: HttpService) { }
    /** This is description of the txnTypeExecuteQuery function*/
    txnOprExecuteQuery(obj) {
        return this.http.post('ocmtrops/txnOperExecuteQuery', obj);
    }
    /** This is description of the offTxnCommit function*/
    txnOperCommit(obj) {
        return this.http.post('ocmtrops/txnOperCommit', obj);
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
    txnTypeValidation(txnType, moduleName, caseloadId, txnOperationSeq) {
        return this.http.get('ocmtrops/txnTypeValidation?txnType=' + txnType + '&moduleName='
            + moduleName + '&caseloadId=' + caseloadId + '&txnOperationSeq=' + txnOperationSeq);
    }
}
