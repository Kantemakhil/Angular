import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtmcfeesService {
constructor(private http: HttpService) { }
/** This is description of the csldDpExecuteQuery function*/
csldDpExecuteQuery(obj) {
return this.http.post('otmcfees/csldDpExecuteQuery', obj);
}
/** This is description of the csldDpCommit function*/
csldDpCommit(obj) {
return this.http.post('otmcfees/csldDpCommit', obj);
}
/** This is description of the tranFdExecuteQuery function*/
tranFdExecuteQuery(obj) {
return this.http.post('otmcfees/tranFdExecuteQuery', obj);
}
/** This is description of the tranFdCommit function*/
tranFdCommit(obj) {
return this.http.post('otmcfees/tranFdCommit', obj);
}
getOverLapCount(obj) {
return this.http.post('otmcfees/getOverLapCount', obj);
}

/** This is description of the tierTfaExecuteQuery function*/
tierTfaExecuteQuery(obj) {
return this.http.post('otmcfees/tierTfaExecuteQuery', obj);
}
/** This is description of the tierTfaCommit function*/
tierTfaCommit(obj) {
return this.http.post('otmcfees/tierTfaCommit', obj);
}
/** This is description of the cgfkCslddppayeecorporateiRecordGroup function*/
cgfkCslddppayeecorporateiRecordGroup(obj) {
return this.http.get('otmcfees/cgfk$csldDpPayeeCorporateIRecordGroup');
}
/** This is description of the cgfkTranfdreceiptdeductionRecordGroup function*/
cgfkTranfdreceiptdeductionRecordGroup(obj) {
return this.http.get('otmcfees/cgfkTranFdReceiptDeductionRecordGroup?caseLoadType=' + obj);
}
/** This is description of the cgfkCslddpdeductiontypeRecordGroup function*/
cgfkCslddpdeductiontypeRecordGroup(obj) {
return this.http.get('otmcfees/cgfkCsldDpDeductionTypeRecordGroup?caseLoadType=' + obj);
}
/** This is description of the cgfkCslddpaccountcodeRecordGroup function*/
cgfkCslddpaccountcodeRecordGroup(obj) {
return this.http.get('otmcfees/cgfkCsldDpAccountCodeRecordGroup?caseLoadType=' + obj);
}
/** This is description of the tranFdCommit function*/
getCorporateName(obj) {
return this.http.post('otmcfees/getCorporateName', obj);
}
}
