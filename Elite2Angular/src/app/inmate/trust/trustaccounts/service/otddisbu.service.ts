import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';
@Injectable({providedIn: 'root'})
export class OtddisbuService {
    constructor(private http: HttpService) { }
    offTxn1TxnTypeRecordGroup(caseloadId, caseloadType) {
        return this.http.get('otddisbu/cgfkOffTxn1TxnTypeRecordGroup?caseloadId=' + caseloadId + '&caseloadType=' + caseloadType);
    }
    checkProductionFlag(txCode, caseloadId) {
        return this.http.get('otddisbu/checkproductionFlag?txCode=' + txCode + '&caseloadId=' + caseloadId);
    }
    getOffenderSependableBalance(offenderId: number, caseloadId: string, txnType: string) {
        const param = `?offenderId=${offenderId}&caseloadId=${caseloadId}&txnType=${txnType}`;
        return this.http.get(`otddisbu/getOffenderSependableBalance${param}`);
    }
    getCreditEligibility(obj) {
        return this.http.post(`otddisbu/getCreditEligibility`, obj);
    }
    offTxn1Commit(obj) {
        return this.http.post(`otddisbu/offTxn1Commit`, obj);
    }
    getVProValue() {
        return this.http.get(`otddisbu/getVProValue`);
    }
    chkDisbursementFreeze(obj) {
        return this.http.post(`otddisbu/chkDisbursementFreeze`, obj);
    }
}
