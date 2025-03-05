import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtdrdtfuService {
    constructor(private http: HttpService) { }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('otdrdtfu/sysPflExecuteQuery', obj);
    }
    /** This is description of the cgfkOfftxnpayeepersonidRecordGroup function*/
    cgfkOfftxnpayeepersonidRecordGroup() {
        return this.http.get('otdrdtfu/cgfk$offTxnPayeePersonIdRecordGroup');
    }
    /** This is description of the cgfkOfftxntxntypeRecordGroup function*/
    cgfkOfftxntxntypeRecordGroup(caseloadId) {
        return this.http.get('otdrdtfu/cgfk$offTxnTxnTypeRecordGroup?caseloadId=' + caseloadId);
    }
    /** This is description of the cgfkOfftxnpayeecorporateiRecordGroup function*/
    cgfkOfftxnpayeecorporateiRecordGroup() {
        return this.http.get('otdrdtfu/cgfk$offTxnPayeeCorporateIRecordGroup');
    }
    /** This is description of the cgfkOfftxnpayeecorporateiRecordGroup function*/
    txnTypeValidation(txnType, caseloadId) {
        return this.http.get('otdrdtfu/txnTypeValidation?txnType=' + txnType + '&caseloadId=' + caseloadId);
    }
    /** This is description of the cgfkOfftxnpayeecorporateiRecordGroup function*/
    checkCaseloadValidation(caseloadId, agyLocId) {
        return this.http.get('otdrdtfu/checkCaseloadValidation?caseloadId=' + caseloadId + '&agyLocId=' + agyLocId);
    }

    onAmountBlurValidation(obj) {
        return this.http.post('otdrdtfu/onAmountBlurValidation', obj);
    }
    /** This is description of the chkDisbursementFreeze function*/
    chkDisbursementFreeze(obj) {
        return this.http.post('otdrdtfu/chkDisbursementFreeze', obj);
    }
    /** This is description of the chkAccountStatus function*/
    chkAccountStatus(caseloadId: string, offenderId: number) {
        return this.http.get(`otdrdtfu/chkAccountStatus?caseloadId=${caseloadId}&offenderId=${offenderId}`);
    }

    /** This is description of the reopenOffenerTrustAccount function*/
    reopenOffenerTrustAccount(caseloadId: string, offenderId: number) {
        return this.http.get(`otdrdtfu/reopenOffenerTrustAccount?caseloadId=${caseloadId}&offenderId=${offenderId}`);
    }
    /** This is description of the otdrdtfugenerateotrdrecereport function*/
    otdrdtfugenerateotrdrecereport(obj) {
        return this.http.post('otdrdtfu/otdrdtfugenerateotrdrecereport', obj);
    }
    /** This is description of the otdrdtfugenerateOtrreceireport function*/
    otdrdtfugenerateOtrreceireport(obj) {
        return this.http.post('otdrdtfu/otdrdtfugenerateOtrreceireport', obj);
    }
    /** This is description of the mainProcess function*/
    mainProcess (obj) {
        return this.http.post('otdrdtfu/mainProcess', obj);
    }
    /** This is description of the mainProcessAutoSubmitting function*/
    mainProcessAutoSubmitting () {
        return this.http.get('otdrdtfu/mainProcessAutoSubmitting');
    }
    deductionsChkOffenderDeductions(caseloadId: string, offenderId: number, txnType: string, shadowId: number) {
        return this.http.get(
        `otdrdtfu/deductionsChkOffenderDeductions?caseloadId=${caseloadId}&offenderId=${offenderId}&txnType=${txnType}&shadowId=${shadowId}`
    );
}


}
