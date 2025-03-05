import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtdaaccoService {
    constructor(private http: HttpService) { }
    /** This is description of the glTxn1ExecuteQuery function*/
    glTxn1ExecuteQuery(obj) {
        return this.http.post('otdaacco/glTxn1ExecuteQuery', obj);
    }
    /** This is description of the glTxn1Commit function*/
    glTxn1Commit(obj) {
        return this.http.post('otdaacco/glTxn1Commit', obj);
    }
    /** This is description of the glTxnExecuteQuery function*/
    glTxnExecuteQuery(obj) {
        return this.http.post('otdaacco/glTxnExecuteQuery', obj);
    }
    /** This is description of the glTxnCommit function*/
    glTxnCommit(obj) {
        return this.http.post('otdaacco/glTxnCommit', obj);
    }
    /** This is description of the systemProfilesExecuteQuery function*/
    systemProfilesExecuteQuery(obj) {
        return this.http.post('otdaacco/systemProfilesExecuteQuery', obj);
    }
    /** This is description of the systemProfilesCommit function*/
    systemProfilesCommit(obj) {
        return this.http.post('otdaacco/systemProfilesCommit', obj);
    }
    /** This is description of the cgfkGltxn1txntypeRecordGroup function*/
    cgfkGltxn1txntypeRecordGroup() {
        return this.http.get('otdaacco/cgfk$glTxn1TxnTypeRecordGroup');
    }
    /** This is description of the cgfkGltxnaccountcodeRecordGroup function*/
    cgfkGltxnaccountcodeRecordGroup() {
        return this.http.get('otdaacco/cgfk$glTxnAccountCodeRecordGroup');
    }
    /** This is description of the cgfkGltxn1accountcodeRecordGroup function*/
    cgfkGltxn1accountcodeRecordGroup() {
        return this.http.get('otdaacco/cgfk$glTxn1AccountCodeRecordGroup');
    }
    /** This is description of the checkNavigation function*/
    checkNavigation(accountCode) {
        return this.http.get('otdaacco/checkNavigation?accountCode=' + accountCode);
    }
    /** This is description of the chkOffAcnt function*/
    chkOffAcnt(accountCode) {
        return this.http.get(`otdaacco/chkOffAcnt?accountCode=${accountCode}`);
    }
    /** This is description of the glTxnExecuteQuery function*/
    whenValidateItem(obj) {
        return this.http.post('otdaacco/whenValidateItem', obj);
    }
    /** This is description of the chkInvalidAccounts function*/
    chkInvalidAccounts(accountCodeOne, accountCodeTwo, caseloadId) {
        return this.http.get('otdaacco/chkInvalidAccounts?accountCodeOne=' + accountCodeOne +
            '&accountCodeTwo=' + accountCodeTwo + '&caseloadId=' + caseloadId);
    }
    whenCheckBoxChecked(caseloadId, offfenderId, txnType) {
        return this.http.get('otdaacco/whenCheckBoxChecked?caseloadId=' + caseloadId +
            '&offfenderId=' + offfenderId + '&txnType=' + txnType);
    }
}
