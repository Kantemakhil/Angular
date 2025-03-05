import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtdoalloService {
    constructor(private http: HttpService) { }
    /** This is description of the offDedExecuteQuery function*/
    offDedExecuteQuery(obj) {
        return this.http.post('otdoallo/offDedExecuteQuery', obj);
    }
    /** This is description of the offDedCommit function*/
    offDedCommit(obj) {
        return this.http.post('otdoallo/offDedCommit', obj);
    }
    /** This is description of the offDrExecuteQuery function*/
    offDrExecuteQuery(obj) {
        return this.http.post('otdoallo/offDrExecuteQuery', obj);
    }
    /** This is description of the offDrCommit function*/
    offDrCommit(obj) {
        return this.http.post('otdoallo/offDrCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('otdoallo/sysPflExecuteQuery', obj);
    }
    /** This is description of the cgfkOffdeddeductionstatusRecordGroup function*/
    cgfkOffdeddeductionstatusRecordGroup(obj) {
        return this.http.get('otdoallo/cgfk$offDedDeductionStatusRecordGroup');
    }
    /** This is description of the cgfkOffdrreceipttxntypeRecordGroup function*/
    cgfkOffdrreceipttxntypeRecordGroup(obj) {
        return this.http.get('otdoallo/cgfk$offDrReceiptTxnTypeRecordGroup');
    }
    /** This is description of the cgfkOffdeddeductiontypeRecordGroup function*/
    cgfkOffdeddeductiontypeRecordGroup(obj) {
        return this.http.get('otdoallo/cgfk$offDedDeductionTypeRecordGroup');
    }

    /** This is description of the offDrValidateRecieptTxnType function*/
    offDrValidateRecieptTxnType(obj) {
        return this.http.post('otdoallo/offDrValidateRecieptTxnType', obj);
    }

    /** This is description of the offDrValidateRecieptTxnType function*/
    offDedValidateDeductionType(obj) {
        return this.http.post('otdoallo/offDedValidateDeductionType', obj);
    }

    offDrKeyDelrec(caseloadId, offenderId, deductionType) {
        const url = `otdoallo/offDrKeyDelrec?caseloadId=${caseloadId}&offenderId=${offenderId}&deductionType=${deductionType}`;
        return this.http.get(url);
    }
    cntDedRcpt(offenderDeductionId) {
        return this.http.get(`otdoallo/cntDedRcpt?offenderDeductionId=${offenderDeductionId}`);
    }
    insertOnNotAvaliable(obj) {
        return this.http.post(`otdoallo/insertOnNotAvaliable`, obj);
    }
}
