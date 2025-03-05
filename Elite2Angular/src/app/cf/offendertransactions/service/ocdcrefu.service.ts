import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable()
export class OcdcrefuService {
	constructor(private http: HttpService) { }
	/** This is description of the offTxnExecuteQuery function*/
	offTxnExecuteQuery(obj) {
		return this.http.post('ocdcrefu/offTxnExecuteQuery', obj);
	}
	/** This is description of the offTxnCommit function*/
	offTxnCommit(obj) {
		return this.http.post('ocdcrefu/offTxnCommit', obj);
	}
	onValidateTxnEntryAmount(obj) {
		return this.http.post('ocdcrefu/onValidateTxnEntryAmount', obj);
	}
}
