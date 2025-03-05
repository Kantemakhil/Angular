import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcsreceiService {
	constructor(private http: HttpService) {}
	/** This is description of the omsReqExecuteQuery function*/
	omsReqExecuteQuery(obj) {
		return this.http.post('ocsrecei/oms_reqExecuteQuery',obj);
	}
	/** This is description of the omsReqCommit function*/
	omsReqCommit(obj) {
		return this.http.post('ocsrecei/oms_reqCommit',obj);
	}
	/** This is description of the offTxnExecuteQuery function*/
	offTxnExecuteQuery(obj) {
		return this.http.post('ocsrecei/offTxnExecuteQuery', obj);
	}
	/** This is description of the offTxnCommit function*/
	offTxnCommit(obj) {
		return this.http.post('ocsrecei/offTxnCommit',obj);
	}
	/** This is description of the cgfkOmsReqPrinterIdRecordGroup function*/
	cgfkOmsReqPrinterIdRecordGroup(obj) {
		return this.http.get( 'ocsrecei/cgfk$oms_req_printer_idRecordGroup');
	}
	/** This is description of the cgfkOmsReqModuleNameRecordGroup function*/
	cgfkOmsReqModuleNameRecordGroup(obj) {
		return this.http.get( 'ocsrecei/cgfk$oms_req_module_nameRecordGroup');
	}
}
