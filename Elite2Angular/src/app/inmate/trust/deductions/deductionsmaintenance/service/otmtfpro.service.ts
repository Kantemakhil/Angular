import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtmtfproService {
    constructor(private http: HttpService) {}
    /** This is description of the csldDpExecuteQuery function*/
    csldDpExecuteQuery(obj) {
        return this.http.post('otmtfpro/csldDpExecuteQuery', obj);
    }
    /** This is description of the csldDpCommit function*/
    csldDpCommit(obj) {
        return this.http.post('otmtfpro/csldDpCommit', obj);
    }
    /** This is description of the csldDdExecuteQuery function*/
    csldDdExecuteQuery(obj) {
        return this.http.post('otmtfpro/csldDdExecuteQuery', obj);
    }
    /** This is description of the csldDdCommit function*/
    csldDdCommit(obj) {
        return this.http.post('otmtfpro/csldDdCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('otmtfpro/sysPflExecuteQuery', obj);
    }
    /** This is description of the cgfkCslddppayeecorporateiRecordGroup function*/
    cgfkCslddppayeecorporateiRecordGroup(obj) {
        return this.http.get( 'otmtfpro/cgfk$csldDpPayeeCorporateIRecordGroup');
    }
    /** This is description of the cgfkCsldddreceipttxntypeRecordGroup function*/
    cgfkCsldddreceipttxntypeRecordGroup(obj) {
        return this.http.get( 'otmtfpro/cgfk$csldDdReceiptTxnTypeRecordGroup');
    }
    /** This is description of the cgfkCslddpdeductiontypeRecordGroup function*/
    cgfkCslddpdeductiontypeRecordGroup(obj) {
        return this.http.get( 'otmtfpro/cgfk$csldDpDeductionTypeRecordGroup');
    }
    /** This is description of the cgfkCslddpaccountcodeRecordGroup function*/
    cgfkCslddpaccountcodeRecordGroup(obj) {
        return this.http.get( 'otmtfpro/cgfk$csldDpAccountCodeRecordGroup');
    }
    /** This is description of the omsUtilsDisplayUserMessage function*/
    omsUtilsDisplayUserMessage(msgNo, applnCode) {
        return this.http.get( `otmtfpro/omsUtilsDisplayUserMessage?msgNo=${msgNo}&applnCode=${applnCode}`);
    }
    /** This is description of the chkDuplicateDedType function*/
    chkDuplicateDedType(caseloadId, deductionType) {
        return this.http.get(`otmtfpro/chkDuplicateDedType?caseloadId=${caseloadId}&deductionType=${deductionType}`);
    }

    /** This is description of the cgfkchkCsldDpDedprofCorp function*/
    cgfkchkCsldDpDedprofCorp(obj) {
        return this.http.post(`otmtfpro/cgfkchkCsldDpDedprofCorp`, obj);
    }
}
