import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtmcoproService {
    constructor(private http: HttpService) { }
    /** This is description of the csldDpExecuteQuery function*/
    csldDpExecuteQuery(obj) {
        return this.http.post('otmcopro/csldDpExecuteQuery', obj);
    }
    /** This is description of the csldDpCommit function*/
    csldDpCommit(obj) {
        return this.http.post('otmcopro/csldDpCommit', obj);
    }
    /** This is description of the csldDdExecuteQuery function*/
    csldDdExecuteQuery(obj) {
        return this.http.post('otmcopro/csldDdExecuteQuery', obj);
    }
    /** This is description of the csldDdCommit function*/
    csldDdCommit(obj) {
        return this.http.post('otmcopro/csldDdCommit', obj);
    }
    /** This is description of the cgfkCslddppayeecorporateiRecordGroup function*/
    cgfkCslddppayeecorporateiRecordGroup(obj) {
        return this.http.get('otmcopro/cgfk$csldDpPayeeCorporateIRecordGroup');
    }
    /** This is description of the cgfkCsldddreceipttxntypeRecordGroup function*/
    cgfkCsldddreceipttxntypeRecordGroup(caseloadType) {
        return this.http.get(`otmcopro/cgfk$csldDdReceiptTxnTypeRecordGroup?caseloadType=${caseloadType}`);
    }
    /** This is description of the cgfkCslddpdeductiontypeRecordGroup function*/
    cgfkCslddpdeductiontypeRecordGroup(obj) {
        return this.http.get('otmcopro/cgfk$csldDpDeductionTypeRecordGroup');
    }
    /** This is description of the cgfkCslddpaccountcodeRecordGroup function*/
    cgfkCslddpaccountcodeRecordGroup(obj) {
        return this.http.get('otmcopro/cgfk$csldDpAccountCodeRecordGroup');
    }
    /** This is description of the cgfkCslddppayeepersonidRecordGroup function*/
    cgfkCslddppayeepersonidRecordGroup(obj) {
        return this.http.get('otmcopro/cgfk$csldDpPayeePersonIdRecordGroup');
    }
    /** This is description of the cgfkCslddppayeepersonidRecordGroup function*/
    preCommit(caseloadId, deductionType) {
        const params = `?caseloadId=${caseloadId}&deductionType=${deductionType}`;
        return this.http.get(`otmcopro/preCommit${params}`);
    }
    /** This is description of the chkDuplicate function*/
    chkDuplicate(caseloadId, deductionType) {
        const params = `?caseloadId=${caseloadId}&deductionType=${deductionType}`;
        return this.http.get(`otmcopro/chkDuplicate${params}`);
    }
    /** This is description of the getCalculateOnVal function*/
    getCalculateOnVal(deductionType) {
        const params = `?deductionType=${deductionType}`;
        return this.http.get(`otmcopro/getCalculateOnVal${params}`);
    }
    /** This is description of the getCalculateOnVal function*/
    cgfkchkCsldDbenCsldDbenC(corporateId) {
        const params = `?corporateId=${corporateId}`;
        return this.http.get(`otmcopro/cgfkchkCsldDbenCsldDbenC${params}`);
    }
}
