import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtdcrvoiService {
    constructor(private http: HttpService) {}
    /** This is description of the bankCrExecuteQuery function*/
    bankCrExecuteQuery(obj) {
        return this.http.post('otdcrvoi/bankCrExecuteQuery', obj);
    }
    /** This is description of the bankCrCommit function*/
    bankCrCommit(obj) {
        return this.http.post('otdcrvoi/bankCrCommit', obj);
    }
    /** This is description of the bnkCdExecuteQuery function*/
    bnkCdExecuteQuery(obj) {
        return this.http.post('otdcrvoi/bnkCdExecuteQuery', obj);
    }
    /** This is description of the cgfkBankcrchequestatusRecordGroup function*/
    cgfkBankcrchequestatusRecordGroup() {
        return this.http.get( 'otdcrvoi/cgfk$bankCrChequeStatusRecordGroup');
    }
    /** This is description of the cgfkBankcraccountcodeRecordGroup function*/
    cgfkBankcraccountcodeRecordGroup() {
        return this.http.get( 'otdcrvoi/cgfk$bankCrAccountCodeRecordGroup');
    }
    /** This is description of the whenValidatingItem function*/
    whenValidatingItem(txnId) {
        return this.http.get(`otdcrvoi/whenValidatingItem?txnId=${txnId}`);
    }
     /** This is description of the whenValidatingItem function*/
     verifyTxnTypeCount(txnId) {
        return this.http.get(`otdcrvoi/verifyTxnTypeCount?txnId=${txnId}`);
    }

}
