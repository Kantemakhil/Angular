import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtmcprinService {
	constructor(private http: HttpService) { }
	/** This is description of the bankCbExecuteQuery function*/
	bankCbExecuteQuery(obj) {
		return this.http.post('otmcprin/bankCbExecuteQuery', obj);
	}
	/** This is description of the bankCbCommit function*/
	bankCbCommit(obj) {
		return this.http.post('otmcprin/bankCbCommit', obj);
	}
	/** This is description of the bankCrExecuteQuery function*/
	bankCrExecuteQuery(obj) {
		return this.http.post('otmcprin/bankCrExecuteQuery', obj);
	}
	/** This is description of the bankCrCommit function*/
	bankCrCommit(obj) {
		return this.http.post('otmcprin/bankCrCommit', obj);
	}
	/** This is description of the cgfkBankcrchequestatusRecordGroup function*/
	cgfkBankcrchequestatusRecordGroup(obj) {
		return this.http.get('otmcprin/cgfk$bankCrChequeStatusRecordGroup');
	}
	/** This is description of the cgfkBankcrcheqstatusvoidRecordGroup function*/
	cgfkBankcrcheqstatusvoidRecordGroup(obj) {
		return this.http.get('otmcprin/cgfk$bankCrCheqStatusVoidRecordGroup');
	}
	checkIfNewSeries(obj) {
		return this.http.post('otmcprin/checkIfNewSeries', obj);
	}
	bcRowMaxChecqueNumber(caseloadId, accountCode, firstCheckNumber, lastCheckNumber) {
		return this.http.get('otmcprin/bcRowMaxChecqueNumber?caseloadId=' + caseloadId + '&accountCode=' + accountCode +
			'&firstCheckNumber=' + firstCheckNumber + '&lastCheckNumber=' + lastCheckNumber);
	}
	isTransactionReversed (txnId, accountCode) {
		return this.http.get('otmcprin/isTransactionReversed?txnId=' + txnId + '&accountCode=' + accountCode);
	}
}
