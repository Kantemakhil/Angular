import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtdttaccService {
    constructor(private http: HttpService) { }
    /** This is description of the csldTtExecuteQuery function*/
    csldTtExecuteQuery(obj) {
        return this.http.post('otdttacc/csldTtExecuteQuery', obj);
    }
    /** This is description of the csldTtCommit function*/
    csldTtCommit(obj) {
        return this.http.post('otdttacc/csldTtCommit', obj);
    }
    /** This is description of the acPrdExecuteQuery function*/
    acPrdExecuteQuery(obj) {
        return this.http.post('otdttacc/acPrdExecuteQuery', obj);
    }
    /** This is description of the acPrdCommit function*/
    acPrdCommit(obj) {
        return this.http.post('otdttacc/acPrdCommit', obj);
    }
    /** This is description of the offTxnExecuteQuery function*/
    offTxnExecuteQuery(obj) {
        return this.http.post('otdttacc/offTxnExecuteQuery', obj);
    }
    /** This is description of the offTxnCommit function*/
    offTxnCommit(obj) {
        return this.http.post('otdttacc/offTxnCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('otdttacc/sysPflExecuteQuery', obj);
    }
    /** This is description of the cgfkCsldtttxntypeRecordGroup function*/
    cgfkCsldtttxntypeRecordGroup(obj) {
        return this.http.get('otdttacc/cgfk$csldTtTxnTypeRecordGroup');
    }
    /** This is description of the cgfkOfftxnoffenderidRecordGroup function*/
    cgfkOfftxnoffenderidRecordGroup(obj) {
        return this.http.get('otdttacc/cgfk$offTxnOffenderIdRecordGroup');
    }
    /** This is description of the cgfkCsldttcaseloadidRecordGroup function*/
    cgfkCsldttcaseloadidRecordGroup(obj) {
        return this.http.get('otdttacc/cgfk$csldTtCaseloadIdRecordGroup');
    }
    getHoldClearFlag(caseloadId, offenderId, casaeloadType) {
        return this.http.get( 'otdttacc/getHoldClearFlag?caseloadId=' + caseloadId + '&offenderId=' + offenderId +
         '&casaeloadType=' + casaeloadType);

    }
    getHoldBal(caseloadId, offenderId, txnType) {
        return this.http.get( 'otdttacc/getHoldBal?caseloadId=' + caseloadId + '&offenderId=' + offenderId +
        '&txnType=' + txnType);
    }
    getDuplicateOffenders(offenderId) {
        return this.http.get( 'otdttacc/getDuplicateOffenders?offenderId=' + offenderId);
    }
    getCorporateidNames(toCaseload) {
        return this.http.get( 'otdttacc/getCorporateidNames?toCaseload=' + toCaseload);
    }
    checkTxnType(toCaseload, txnType, caseloadId) {
        return this.http.get( 'otdttacc/checkTxnType?toCaseload=' + toCaseload + '&txnType=' + txnType +
        '&caseloadId=' + caseloadId);
    }
    getRootOffenderId(casaeloadType, offenderIdDisplay) {
        return this.http.get( 'otdttacc/getRootOffenderId?casaeloadType=' + casaeloadType + '&offenderIdDisplay=' + offenderIdDisplay);

    }
    whenNewBlockInstanceRetrive(startDate, endDate , currentCaseload, toCaseload, txnType, caseloadType) {
        return this.http.get( 'otdttacc/whenNewBlockInstanceRetrive?startDate=' + startDate + '&endDate=' +
        endDate + '&currentCaseload=' + currentCaseload +
        '&toCaseload=' + toCaseload + '&txnType=' + txnType + '&caseloadType=' + caseloadType);
    }
    deleteOffacShads (caseloadId , offenderId) {
        return this.http.get( 'otdttacc/deleteOffacShads?caseloadId=' + caseloadId + '&offenderId=' + offenderId);
    }

}
