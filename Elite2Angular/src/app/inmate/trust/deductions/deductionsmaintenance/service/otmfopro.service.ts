import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtmfoproService {
constructor(private http: HttpService) {}
/** This is description of the csldDpExecuteQuery function*/
csldDpExecuteQuery(obj) {
return this.http.post('otmfopro/csldDpExecuteQuery', obj);
}
/** This is description of the csldDpCommit function*/
csldDpCommit(obj) {
return this.http.post('otmfopro/csldDpCommit', obj);
}
/** This is description of the csldDbenExecuteQuery function*/
csldDbenExecuteQuery(obj) {
return this.http.post('otmfopro/csldDbenExecuteQuery', obj);
}
/** This is description of the csldDbenCommit function*/
csldDbenCommit(obj) {
return this.http.post('otmfopro/csldDbenCommit', obj);
}
/** This is description of the csldDdExecuteQuery function*/
csldDdExecuteQuery(obj) {
return this.http.post('otmfopro/csldDdExecuteQuery', obj);
}
/** This is description of the csldDdCommit function*/
csldDdCommit(obj) {
return this.http.post('otmfopro/csldDdCommit', obj);
}
/** This is description of the cgfkCsldddreceipttxntypeRecordGroup function*/
cgfkCsldddreceipttxntypeRecordGroup(obj) {
return this.http.get( 'otmfopro/cgfk$csldDdReceiptTxnTypeRecordGroup');
}
/** This is description of the rgConditionRecordGroup function*/
rgConditionRecordGroup(obj) {
return this.http.get( 'otmfopro/rgConditionRecordGroup');
}
/** This is description of the cgfkCslddpaccountcodeRecordGroup function*/
cgfkCslddpaccountcodeRecordGroup(obj) {
return this.http.get( 'otmfopro/cgfk$csldDpAccountCodeRecordGroup');
}
/** This is description of the rgCorpRecordGroup function*/
rgCorpRecordGroup(obj) {
return this.http.get( 'otmfopro/rgCorpRecordGroup');
}
/** This is description of the cgfkCslddpdeductiontypeRecordGroup function*/
cgfkCslddpdeductiontypeRecordGroup(obj) {
return this.http.get( 'otmfopro/cgfk$csldDpDeductionTypeRecordGroup');
}
/** This is description of the CgfkchkCsldDbenCsldDben function*/
cgfkchkCsldDbenCsldDben(personId) {
    return this.http.get(`otmfopro/cgfkchkCsldDbenCsldDben?personId=${personId}`);
}

/** This is description of the cgfkchkCsldDbenCsldDbenC function*/
cgfkchkCsldDbenCsldDbenC(corporateId) {
    return this.http.get(`otmfopro/cgfkchkCsldDbenCsldDbenC?corporateId=${corporateId}`);
}
calculateOn(deductionType) {
    return this.http.get(`otmfopro/calculateOn?deductionType=${deductionType}`);
}
countMinBalLogic(caseloadId, deductionType) {
    const params = `?caseloadId=${caseloadId}&deductionType=${deductionType}`;
    return this.http.get(`otmfopro/countMinBalLogic${params}`);
}

/** This is description of the singleCommit function*/
singleCommit(obj) {
    return this.http.post('otmfopro/singleCommit', obj);
    }

preCommit(caseloadId, deductionType) {
    const params = `?caseloadId=${caseloadId}&deductionType=${deductionType}`;
    return this.http.get(`otmfopro/preCommit${params}`);
}

}

