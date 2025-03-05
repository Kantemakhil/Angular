import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable()
export class OiustinvService {
	constructor(private http: HttpService) { }
	/** This is description of the offenderGrievStaffsExecuteQuery function*/
	offenderGrievStaffsExecuteQuery(obj) {
		return this.http.post('oiustinv/offenderGrievStaffsExecuteQuery', obj);
	}
	/** This is description of the offenderGrievStaffsCommit function*/
	offenderGrievStaffsCommit(obj) {
		return this.http.post('oiustinv/offenderGrievStaffsCommit', obj);
	}
	/** This is description of the rgStaffRecordGroup function*/
	rgStaffRecordGroup(obj) {
		return this.http.get('oiustinv/rgStaffRecordGroup');
	}
	offenderGrievStaffsPostQuery(obj) {
		return this.http.post('oiustinv/offenderGrievStaffsPostQuery', obj);
	}
}
