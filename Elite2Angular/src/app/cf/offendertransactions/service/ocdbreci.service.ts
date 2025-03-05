import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdbreciService {
    constructor(private http: HttpService) { }
    /** This is description of the offTxn1ExecuteQuery function*/
    offTxn1ExecuteQuery(obj) {
        return this.http.post('ocdbreci/offTxn1ExecuteQuery', obj);
    }
    /** This is description of the offTxn1Commit function*/
    offTxn1Commit(obj) {
        return this.http.post('ocdbreci/offTxnCommit', obj);
    }
    /** This is description of the offTxnExecuteQuery function*/
    offTxnExecuteQuery(obj) {
        return this.http.post('ocdbreci/offTxnExecuteQuery', obj);
    }
    /** This is description of the offTxnCommit function*/
    offTxnCommitRecipt(obj) {
        return this.http.post('ocdbreci/offTxnCommitRecipt', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('ocdbreci/sysPflExecuteQuery', obj);
    }
    /** This is description of the cgfkOfftxn1txntypeRecordGroup function*/
    cgfkOfftxn1txntypeRecordGroup(obj) {
        return this.http.get('ocdbreci/cgfk$offTxn1TxnTypeRecordGroup');
    }
    /** This is description of the cgfkOfftxndspinformationnRecordGroup function*/
    cgfkOffTxnDspInformationNRecordGroup(offenderId, caseloadType, txnType) {
        return this.http.post('ocdbreci/cgfkOffTxnDspInformationNRecordGroup?offenderId='
            + offenderId, '&caseloadType=' + caseloadType, '&txnType=' + txnType);
    }
    /** This is description of the whenValidateItem function*/
    whenValidateItem(obj) {
        return this.http.post('ocdbreci/whenValidateItem', obj);
    }
    /** This is description of the whenValidateItemAmountInfonumber function*/
    whenValidateItemAmountInfonumber(obj) {
        return this.http.post('ocdbreci/whenValidateItemAmountInfonumber', obj);
    }
    csldDbenExecuteQuery(obj) {
        return this.http.post('ocdbreci/cgfkOffTxnDspInformationNRecordGroupOne', obj);
    }

    getProfileValueDisableBtn(){
		return this.http.get('ocdbreci/getProfileValueDisableBtn');
	}
    offFeeExecuteQuery(obj) {
        return this.http.post('ocdbreci/offFeeExecuteQuery', obj);
    }
    /** This is description of the feeCommit function*/
    feeCommit(obj) {
        return this.http.post('ocdbreci/feeCommit', obj);
    }

    supervisionExpiryDate(obj){
        return this.http.get('ocdbreci/supervisionExpiryDate?offenderBookId='+obj);
    }

    cgfkOffTxnDspInformationNRecordGroupCount(obj) {
        return this.http.get('ocdbreci/cgfkOffTxnDspInformationNRecordGroupCount?offenderBookId='+obj);
    }


    getPaymentPlaneCount(obj){
		return this.http.get('ocdrecei/getPaymentPlaneCount?offenderId='+obj);
	}

    getFeeCodeRecordGroupOne(){
		return this.http.get('ocdbreci/getFeeCodeRecordGroupOne');
	}

    printReportSupv(obj) {
		return this.http.post('ocdbreci/printReportSupv', obj);
	}

    getProdFlagDetails(obj) {
        return this.http.post('ocdbreci/getProdFlagDetails', obj);
    }
}
