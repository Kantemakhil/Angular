import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';
import { CourseSchedules } from '../beans/CourseSchedules';

@Injectable({providedIn: 'root'})
export class OcmsoschService {

	constructor(private http: HttpService) { }
	/** This is description of the crsActExecuteQuery function*/
	crsActExecuteQuery(obj) {
		return this.http.post('ocmsosch/crsActExecuteQuery', obj);
	}
	/** This is description of the crsActCommit function*/
	crsActCommit(obj) {
		return this.http.post('ocmsosch/crsActCommit', obj);
	}
	/** This is description of the courseSchedExecuteQuery function*/
	courseSchedExecuteQuery(obj) {
		return this.http.post('ocmsosch/courseSchedExecuteQuery', obj);
	}
	/** This is description of the courseSchedCommit function*/
	courseSchedCommit(obj) {
		return this.http.post('ocmsosch/courseSchedCommit', obj);
	}

	clearSchedules(obj: CourseSchedules) {
		return this.http.post('ocmsosch/clearSchedules', obj);
	}
	getDate(obj: CourseSchedules) {
		return this.http.post('ocmsosch/getDate', obj);
	}
	getHolidayFlag(crsactModel: any) {
		return this.http.post('ocmsosch/getHolidayFlag', crsactModel);
	}

	crsschedulerulExecuteQuery(crsact: any) {
		return this.http.post('ocmsosch/crsScheduleRulExecuteQuery', crsact);
	}

	crsschedulerulCommit(crsschedulerulCommitModel: any) {
		return this.http.post('ocmsosch/crsScheduleRulCommit', crsschedulerulCommitModel);
	}

	buildRecurringSchedule(crsschedulerulModel: any) {
		return this.http.post('ocmsosch/buildSchedule', crsschedulerulModel);
	}

	getPrgSrvDetails(programId: any) {
		return this.http.post('ocmsosch/getPrgSrvDetails', programId);
	}

	getProfileValues() {
		return this.http.post('ocmsosch/getProfileValues', {});
	}
}
