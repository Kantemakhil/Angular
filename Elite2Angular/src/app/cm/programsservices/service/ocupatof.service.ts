import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OcupatofService {
	offcrsattCommit(offcrsattCommitModel: any) {
		throw new Error('Method not implemented.');
	}
	constructor(private http: HttpService) {

	 }
	/** This is description of the offCrsAttExecuteQuery function*/
	offCrsAttExecuteQuery(obj) {
		return this.http.post('ocupatof/offCrsAttExecuteQuery', obj);
	}
	/** This is description of the offCrsAttCommit function*/
	offCrsAttCommit(obj) {
		return this.http.post('ocupatof/offCrsAttCommit', obj);
	}
	/** This is description of the rgAttendancesRecordGroup function*/
	rgAttendancesRecordGroup() {
		return this.http.get('ocupatof/rgAttendancesRecordGroup');
	}
	/** This is description of the rgAttendancyViewRecordGroup function*/
	rgAttendancyViewRecordGroup() {
		return this.http.get('ocupatof/rgAttendancyViewRecordGroup');
	}
	/** This is description of the rgEngagementRecordGroup function*/
	rgEngagementRecordGroup() {
		return this.http.get('ocupatof/rgEngagementRecordGroup');
	}
	/** This is description of the rgUnderstandingRecordGroup function*/
	rgUnderstandingRecordGroup() {
		return this.http.get('ocupatof/rgUnderstandingRecordGroup');
	}
	cancelFlagOutcomeList(obj) {
		return this.http.post('ocupatof/cancelFlagOutcomeList', obj);
	}
}
