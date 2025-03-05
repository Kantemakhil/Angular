import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcupayplService {
    constructor(private http: HttpService) { }
    /** This is description of the payPlnExecuteQuery function*/
    payPlnExecuteQuery(obj) {
        return this.http.post('ocupaypl/payPlnExecuteQuery', obj);
    }/** This is description of the payPlnCommit function*/
    payPlnCommit(obj) {
        return this.http.post('ocupaypl/payPlnCommit', obj);
    }
    /** This is description of the paySchExecuteQuery function*/
    paySchExecuteQuery(obj) {
        return this.http.post('ocupaypl/paySchExecuteQuery', obj);
    }
    /** This is description of the ppTxnExecuteQuery function*/
    pptxnExecuteQuery(obj) {
        return this.http.post('ocupaypl/ppTxnExecuteQuery', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('ocupaypl/sysPflExecuteQuery', obj);
    }
    /** This is description of the cgfkPayplninformationnumbeRecordGroup function*/
    cgfkPayPlnInformationNumbeRecordGroup(offenderId, caseLoadId) {
        return this.http.get('ocupaypl/cgfkPayPlnInformationNumbeRecordGroup?offenderId=' + offenderId + '&caseLoadId=' + caseLoadId);
    }
    /** This is description of the cgfkPayplndspdescription4RecordGroup function*/
    cgfkPayplndspdescription4RecordGroup() {
        return this.http.get('ocupaypl/cgfkpayPlnDspDescription4RecordGroup');
    }
    /** This is description of the cgfkPayplndspdescription3RecordGroup function*/
    cgfkPayplndspdescription3RecordGroup() {
        return this.http.get('ocupaypl/cgfkpayPlnDspDescription3RecordGroup');
    }
    /** This is description of the cgfkPayplndspdescriptionRecordGroup function*/
    cgfkPayplndspdescriptionRecordGroup() {
        return this.http.get('ocupaypl/cgfkpayPlnDspDescriptionRecordGroup');
    }
    keyListVal(obj) {
        return this.http.post('ocupaypl/keyListVal', obj);
    }

    whenValidateItem(obj) {
        return this.http.post('ocupaypl/whenValidateItem', obj);
    }


    whenCheckboxChanged(obj) {
        return this.http.post('ocupaypl/whenCheckboxChanged', obj);
    }
    keyCommit(obj) {
        return this.http.post('ocupaypl/keyCommit', obj);
    }
    adjustForRoundoffs(obj) {
        return this.http.post('ocupaypl/adjustForRoundoffs', obj);
    }

    postBlockPlan(obj) {
        return this.http.post('ocupaypl/postBlockPlan', obj);
    }
    whenNewRecordInsatnce(obj) {
        return this.http.post('ocupaypl/whenNewRecordInsatnce', obj);
    }

    printPlan(obj) {
        return this.http.post('ocupaypl/printPlan', obj);
    }
    /** This is description of the gettingGroupId function*/
    gettingGroupId(obj) {
        return this.http.post('ocupaypl/gettingGroupId', obj);
    }
}
