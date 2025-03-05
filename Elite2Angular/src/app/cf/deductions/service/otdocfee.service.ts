import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtdocfeeService {
	constructor(private http: HttpService) {}
	/** This is description of the offDedExecuteQuery function*/
	offDedExecuteQuery(obj) {
		return this.http.post('otdocfee/offDedExecuteQuery',obj);
	}
	/** This is description of the offDedCommit function*/
	offDedCommit(obj) {
		return this.http.post('otdocfee/offDedCommit',obj);
	}
	/** This is description of the offTfdExecuteQuery function*/
	offTfdExecuteQuery(obj) {
		return this.http.post('otdocfee/offTfdExecuteQuery',obj);
	}
	/** This is description of the offTfdCommit function*/
	offTfdCommit(obj) {
		return this.http.post('otdocfee/offTfdCommit',obj);
	}
	/** This is description of the offTtfExecuteQuery function*/
	offTtfExecuteQuery(obj) {
		return this.http.post('otdocfee/offTtfExecuteQuery',obj);
	}
	/** This is description of the offTtfCommit function*/
	offTtfCommit(obj) {
		return this.http.post('otdocfee/offTtfCommit',obj);
	}
	/** This is description of the sysPflExecuteQuery function*/
	sysPflExecuteQuery(obj) {
		return this.http.post('otdocfee/sysPflExecuteQuery',obj);
	}
	/** This is description of the cgfkOffdeddspdescriptionRecordGroup function*/
	cgfkOffdeddspdescriptionRecordGroup(obj) {
		return this.http.get( 'otdocfee/cgfk$offDedDspDescriptionRecordGroup');
	}
	/** This is description of the cgfkOfftfdreceiptdeductionRecordGroup function*/
	cgfkOfftfdreceiptdeductionRecordGroup(caseloadType) {
		return this.http.get( 'otdocfee/cgfkOffTfdReceiptDeductionRecordGroup?caseloadType=' + caseloadType);
	}
	/** This is description of the cgfkOffdeddeductiontypeRecordGroup function*/
	cgfkOffdeddeductiontypeRecordGroup(caseloadId, caseloadType) {
		return this.http.get( 'otdocfee/cgfkOffDedDeductionTypeRecordGroup?caseloadId=' + caseloadId
		+ 'caseloadType=' + caseloadType);
	}
	otdocfeePopulateDetails(obj) {
		return this.http.post('otdocfee/otdocfeePopulateDetailsData',obj);
	}
	getOverLapCount(obj) {
		return this.http.post('otdocfee/getOverLapCount', obj);
		}
}
