import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmcoactService {
  constructor(private http: HttpService) { }
  /** This is description of the acCodeExecuteQuery function*/
  acCodeExecuteQuery(obj) {
    return this.http.post('ocmcoact/acCodeExecuteQuery', obj);
  }
  /** This is description of the acCodeCommit function*/
  acCodeCommit(obj) {
    return this.http.post('ocmcoact/acCodeCommit', obj);
  }
  /** This is description of the csldAcd1ExecuteQuery function*/
  csldAcd1ExecuteQuery(obj) {
    return this.http.post('ocmcoact/csldAcd1ExecuteQuery', obj);
  }
  /** This is description of the csldAcdExecuteQuery function*/
  csldAcdExecuteQuery(obj) {
    return this.http.post('ocmcoact/csldAcdExecuteQuery', obj);
  }
  /** This is description of the csldAcdCommit function*/
  csldAcdCommit(obj) {
    return this.http.post('ocmcoact/csldAcdCommit', obj);
  }
  /** This is description of the cgfkAccoderecaccountcodeRecordGroup function*/
  cgfkAccoderecaccountcodeRecordGroup(obj) {
    return this.http.get('ocmcoact/cgfk$acCodeRecAccountCodeRecordGroup');
  }
  /** This is description of the cgfkAccodeparentcodeRecordGroup function*/
  cgfkAccodeparentcodeRecordGroup(obj) {
    return this.http.get('ocmcoact/cgfkAcCodeParentCodeRecordGroup');
  }
  /** This is description of the cgfkCsldacdcaseloadidRecordGroup function*/
  cgfkCsldacdcaseloadidRecordGroup(obj) {
    return this.http.get('ocmcoact/cgfk$csldAcdCaseloadIdRecordGroup');
  }
  /** This is description of the cgfkAccodeaccounttypeRecordGroup function*/
  cgfkAccodeaccounttypeRecordGroup(obj) {
    return this.http.get('ocmcoact/cgfk$acCodeAccountTypeRecordGroup');
  }
  /** This is description of the cgfkAccodetxnpostingtypeRecordGroup function*/
  cgfkAccodetxnpostingtypeRecordGroup(obj) {
    return this.http.get('ocmcoact/cgfk$acCodeTxnPostingTypeRecordGroup');
  }
  /** This is description of the cgfkAccodesubaccounttypeRecordGroup function*/
  cgfkAccodesubaccounttypeRecordGroup(obj) {
    return this.http.get('ocmcoact/cgfk$acCodeSubAccountTypeRecordGroup');
  }
  /** This is description of the cgfkGltxnaccountcodeRecordGroup function*/
  caselaodAccountCodes(accountCode, caseloadId) {
    return this.http.get('ocmcoact/caselaodAccountCodes?accountCode=' + accountCode + '&caseloadId=' + caseloadId);
  }
  /** This is description of the cgfkGltxnaccountcodeRecordGroup function*/
  chkSubAcTypeTxnCur(accountCode, caseloadId) {
    return this.http.get('ocmcoact/chkSubAcTypeTxnCur?accountCode=' + accountCode + '&caseloadId=' + caseloadId);
  }
  /** This is description of the cgfkGltxnaccountcodeRecordGroup function*/
  chkDupSubAcTypeCur(caseloadId, subAcType) {
    return this.http.get('ocmcoact/chkDupSubAcTypeCur?caseloadId=' + caseloadId + '&subAcType=' + subAcType);
  }
  /** This is description of the cgfkTxntypetxnusageRecordGroup function*/
  accountCodeValidation(accountCode) {
    return this.http.get('ocmcoact/accountCodeValidation?accountCode=' + accountCode);
  }
  /** This is description of the cgfkTxntypetxnusageRecordGroup function*/
  caseloadAccountCodeValidation(accountCode) {
    return this.http.get('ocmcoact/caseloadAccountCodeValidation?accountCode=' + accountCode);
  }
  /** This is description of the cgfkTxntypetxnusageRecordGroup function*/
  txnTypeOnCheckDeleteMaster(accountCode) {
    return this.http.get('ocmcoact/txnTypeOnCheckDeleteMaster?accountCode=' + accountCode);
  }
}
