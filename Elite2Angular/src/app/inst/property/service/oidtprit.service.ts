import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service'
import { OffenderPptyItemTxns } from '@instproperty/OffenderPptyItemTxns';

@Injectable({providedIn: 'root'})
export class OidtpritService {
    offenderBookId: any;
    flag: boolean;
    checkExitFlag: boolean;
    offPptyItmTxnModel: OffenderPptyItemTxns = new OffenderPptyItemTxns();
    constructor(private http: HttpService) { }
    /** This is description of the itmTxExecuteQuery function*/
    itmTxExecuteQuery(obj) {
        return this.http.post('oidtprit/itmTxExecuteQuery', obj);
    }
    /** This is description of the itmTxCommit function*/
    itmTxCommit(obj) {
        return this.http.post('oidtprit/itmTxCommit', obj);
    }
    /** This is description of the offPiExecuteQuery function*/
    offPiExecuteQuery(obj) {
        return this.http.post('oidtprit/offPiExecuteQuery', obj);
    }
    /** This is description of the offPiCommit function*/
    offPiCommit(obj) {
        return this.http.post('oidmpitm/offPiOidtpritCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('oidtprit/sysPflExecuteQuery', obj);
    }
    /** This is description of the cgfkItmtxfromstatuscodeRecordGroup function*/
    cgfkItmtxfromstatuscodeRecordGroup() {
        return this.http.get('oidtprit/cgfk$itmTxFromStatusCodeRecordGroup');
    }
    /** This is description of the cgfkItmtxtostatuscodeRecordGroup function*/
    cgfkItmtxtostatuscodeRecordGroup() {
        return this.http.get('oidtprit/cgfk$itmTxToStatusCodeRecordGroup');
    }
    /** This is description of the cgfkItmtxpropertycontainerRecordGroup function*/
    cgfkItmtxpropertycontainerRecordGroup(caseLoadId, offBookId) {
        return this.http.get('oiddprop/cgfkItmTxPropertyContainerRecordGroup?caseloadId=' + caseLoadId + '&offenderBookId=' + offBookId);
    }
    itmTxWhenValidateRecordregItems(obj) {
        return this.http.post('oidtprit/itmtxwhenvalidaterecordregitems', obj);
    }
}

