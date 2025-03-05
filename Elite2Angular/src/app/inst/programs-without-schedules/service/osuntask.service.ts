import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';


@Injectable({providedIn: 'root'})
export class OsuntaskService {

	getDisplayAuto(offenderBookId) {
		return this.http.get('osunmemo/getDisplayAuto?offenderBookId=' + offenderBookId);

	}
	constructor(private http: HttpService) { }
	rgWorksRecordGroup(obj) {
		return this.http.get('osuntask/rgWorksRecordGroup');
	}
	rgStaffRecordGroup(workAndObId) {
		return this.http.get('osuntask/rgStaffRecordGroup?workAndObId=' + workAndObId);
	}

	rgTeamsRecordGroup(workAndObId) {
		return this.http.get('osuntask/rgTeamsRecordGroup?workAndObId=' + workAndObId);
	}
	getTeamemberId(teamMemberId) {
		return this.http.get('osuntask/getTeamemberId?teamMemberId=' + teamMemberId);
	}
	submitAdhocWorkflow(obj) {
		return this.http.post('osuntask/submitAdhocWorkflow', obj);
	}
}
