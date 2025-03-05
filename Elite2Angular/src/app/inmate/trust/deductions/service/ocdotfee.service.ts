import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdotfeeService {
	constructor(private http: HttpService) {}
	/** This is description of the offDedExecuteQuery function*/
	offDedExecuteQuery(obj) {
		return this.http.post('ocdotfee/offDedExecuteQuery', obj);
	}
	/** This is description of the offDedCommit function*/
	offDedCommit(obj) {
		return this.http.post('ocdotfee/offDedCommit', obj);
	}
	/** This is description of the offDrExecuteQuery function*/
	offDrExecuteQuery(obj) {
		return this.http.post('ocdotfee/offDrExecuteQuery', obj);
	}
	/** This is description of the offDrCommit function*/
	offDrCommit(obj) {
		return this.http.post('ocdotfee/offDrCommit', obj);
	}
	/** This is description of the sysPflExecuteQuery function*/
	sysPflExecuteQuery(obj) {
		return this.http.post('ocdotfee/sysPflExecuteQuery', obj);
	}
	/** This is description of the cgfkOffdeddspdescriptionRecordGroup function*/
	cgfkOffdeddspdescriptionRecordGroup(obj) {
		return this.http.get( 'ocdotfee/cgfk$offDedDspDescriptionRecordGroup');
	}
	/** This is description of the cgfkOffdeddeductiontypeRecordGroup function*/
	cgfkOffdeddeductiontypeRecordGroup(obj) {
		return this.http.get( 'ocdotfee/cgfk$offDedDeductionTypeRecordGroup');
	}
	/** This is description of the cgfkOffdrreceipttxntypeRecordGroup function*/
	cgfkOffdrreceipttxntypeRecordGroup(obj) {
		return this.http.get( 'ocdotfee/cgfk$offDrReceiptTxnTypeRecordGroup');
	}
	/** This is description of the getPercentageAndFlatRate function*/
	getPercentageAndFlatRate(deductionType, caseloadId, receiptTxnType) {
		const params = `deductionType=${deductionType}&caseloadId=${caseloadId}&receiptTxnType=${receiptTxnType}`;
		return this.http.get(`ocdotfee/getPercentageAndFlatRate?${params}`);
	}
}
