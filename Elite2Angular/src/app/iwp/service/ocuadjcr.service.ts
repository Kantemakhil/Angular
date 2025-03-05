import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcuadjcrService {
	constructor(private http: HttpService) {}
	/** This is description of the ctlBlkExecuteQuery function*/
	ctlBlkExecuteQuery(obj) {
		return this.http.post('ocuadjcr/ctlBlkExecuteQuery',obj);
	}
	/** This is description of the ctlBlkCommit function*/
	ctlBlkCommit(obj) {
		return this.http.post('ocuadjcr/ctlBlkCommit', obj);
	}
	/** This is description of the offSenHtyExecuteQuery function*/
	offSenHtyExecuteQuery(obj) {
		return this.http.post('ocuadjcr/offSenHtyExecuteQuery',obj);
	}
	/** This is description of the rgReasonRecordGroup function*/
	rgReasonRecordGroup(obj) {
		return this.http.get( 'ocuadjcr/rgReasonRecordGroup');
	}

	getStaffName() {
		return this.http.get( 'ocuadjcr/staffName');
	}

	/** This is description of the ocdlegloSenHtyExecuteQuery function*/
	ocdlegloSenHtyExecuteQuery(obj) {
		return this.http.post('ocuadjcr/ocdlegloSenHtyExecuteQuery',obj);
	}

	/** This is description of the ocdlegloSentCommit function*/
	ocdlegloSentCommit(obj) {
		return this.http.post('ocuadjcr/ocdlegloSentCommit', obj);
	}

	
}
 