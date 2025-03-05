import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdsmemoService {
	constructor(private http: HttpService) {}
	/** This is description of the rgWorkTypeRecordGroup function*/
	rgWorkTypeRecordGroup(caseloadType) {
		return this.http.get( 'ocdsmemo/rgWorkTypeRecordGroup?caseloadType=' + caseloadType);
	}
	/** This is description of the rgWorkSubTypeRecordGroup function*/
	rgWorkSubTypeRecordGroup(workType,caseloadType) {
		return this.http.get( 'ocdsmemo/rgWorkSubTypeRecordGroup?workType=' + workType +'&caseloadType=' + caseloadType);
	}
	/** This is description of the rgSeverityRecordGroup function*/
	rgSeverityRecordGroup(obj) {
		return this.http.get( 'ocdsmemo/rgSeverityRecordGroup');
	}
	/** This is description of the rgStaffRecordGroup function*/
	rgStaffRecordGroup(obj) {
		return this.http.get( 'ocdsmemo/rgStaffRecordGroup');
	}
	staffMemosExecuteQuery(obj) {
		return this.http.post('ocdsmemo/staffMemosExecuteQuery',obj);
	}
	staffMemoComitt(obj) {
		return this.http.post('ocdsmemo/staffMemoComitt',obj);
	}

	getStaffMessage(obj) {
		return this.http.post('ocdsmemo/getStaffMessage',obj);
	}
}
