import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OturnumbService {
	constructor(private http: HttpService) {}
	/** This is description of the offTxnExecuteQuery function*/
	offTxnExecuteQuery(obj) {
		return this.http.post('oturnumb/offTxnExecuteQuery',obj);
	}
	/** This is description of the offTxnCommit function*/
	offTxnCommit(obj) {
		return this.http.post('oturnumb/offTxnCommit',obj);
	}
}
