import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdreceiService {
	constructor(private http: HttpService) { }
	/** This is description of the offTxnExecuteQuery function*/
	offTxnExecuteQuery(obj) {
		return this.http.post('ocdrecei/offTxnExecuteQuery', obj);
	}
	/** This is description of the offTxnCommit function*/
	offTxnCommit(obj) {
		return this.http.post('ocdrecei/offTxnCommit', obj);
	}
	/** This is description of the sysPflExecuteQuery function*/
	sysPflExecuteQuery(obj) {
		return this.http.post('ocdrecei/sysPflExecuteQuery', obj);
	}
	/** This is description of the cgfkOfftxndspinformationnRecordGroup function*/
	cgfkOffTxnDspInformationNRecordGroup(offenderId, caseloadType, txnType) {
		return this.http.post('ocdrecei/cgfkOffTxnDspInformationNRecordGroup?offenderId='
			+ offenderId, '&caseloadType=' + caseloadType, '&txnType=' + txnType);
	}

	getDocketLovData(obj) {
		return this.http.post('ocdrecei/getDocketLovData', obj);
	}
	/** This is description of the cgfkOfftxndspdescriptionRecordGroup function*/
	cgfkOfftxndspdescriptionRecordGroup() {
		return this.http.get('ocdrecei/cgfkOfftxndspdescriptionRecordGroup');
	}
	whenValidateItem(obj) {
		return this.http.post('ocdrecei/whenValidateItem', obj);
	}

	validateDspInfoNumber(obj) {
		return this.http.post('ocdrecei/validateDspInfoNumber', obj);
	}

	/** This is description of the keyCommitTwo function*/
	keyCommitTwo(obj) {
		return this.http.post('ocdrecei/keyCommitTwo', obj);
	}

	printReport(obj) {
		return this.http.post('ocdrecei/printReport', obj);
	}

	getSystemProfileValue(){
        return this.http.get('ocdrecei/getSystemProfileValue');
    }

	getOffenederFeeSectionQuery(obj){
		return this.http.get('ocdrecei/getOffenederFeeSectionQuery?offenderIdDisplay='+obj);
	}

	getCfPaymentSystemProfileValue(){
        return this.http.get('ocdrecei/getCfPaymentSystemProfileValue');
    }

	getLongestSupervisionExpireDate(obj){
		return this.http.get('ocdrecei/getLongestSupervisionExpireDate?offenderBookId='+obj);
	}

	getPaymentObligationCount(obj){
		return this.http.get('ocdrecei/getPaymentObligationCount?offenderId='+obj);
	}

	printReportSupv(obj) {
		return this.http.post('ocdrecei/printReportSupv', obj);
	}

	/** This is description of the getbillEndDayPfVal function*/
	getbillEndDayPfVal() {
        return this.http.get('ocdrecei/getbillEndDayPfVal');
    }

	 /** This is description of the getCasePlanId function*/
     getCasePlanId(obj) {
        return this.http.post('ocdadjus/getCasePlanId', obj);
    }
	
}
