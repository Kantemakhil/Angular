
import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';


@Injectable({ providedIn: 'root' })
export class OcduatteService {
	constructor(private http: HttpService) { }
	/** This is description of the offCourseAttendExecuteQuery function*/
	offCourseAttendExecuteQuery(obj) {
		return this.http.post('ocduatte/offCourseAttendExecuteQuery', obj);
	}
	/** This is description of the offCourseAttendCommit function*/
	offCourseAttendCommit(obj) {
		return this.http.post('ocduatte/offCourseAttendCommit', obj);
	}
	/** This is description of the offCourseSkillsExecuteQuery function*/
	offCourseSkillsExecuteQuery(obj) {
		return this.http.post('ocduatte/offCourseSkillsExecuteQuery', obj);
	}
	/** This is description of the offCourseSkillsCommit function*/
	offCourseSkillsCommit(obj) {
		return this.http.post('ocduatte/offCourseSkillsCommit', obj);
	}
	/** This is description of the rgAttendanceRecordGroup function*/
	rgAttendanceRecordGroup(obj) {
		return this.http.get('ocduatte/rgAttendanceRecordGroup');
	}
	/** This is description of the rgSupervisorRecordGroup function*/
	rgSupervisorRecordGroup(obj) {
		return this.http.get('ocduatte/rgSupervisorRecordGroup');
	}
	/** This is description of the rgBehaviourRecordGroup function*/
	rgBehaviourRecordGroup(obj) {
		return this.http.get('ocduatte/rgBehaviourRecordGroup');
	}
	/** This is description of the rgWorkQualityRecordGroup function*/
	rgWorkQualityRecordGroup(obj) {
		return this.http.get('ocduatte/rgWorkQualityRecordGroup');
	}
	/** This is description of the rgProjectsRecordGroup function*/
	rgProjectsRecordGroup(obj) {
		return this.http.get('ocduatte/rgProjectsRecordGroup');
	}
	/** This is description of the rgProjects2RecordGroup function*/
	rgProjects2RecordGroup(obj) {
		return this.http.get('ocduatte/rgProjects2RecordGroup');
	}
	/** This is description of the rgSkillsRecordGroup function*/
	rgSkillsRecordGroup(obj) {
		return this.http.get('ocduatte/rgSkillsRecordGroup');
	}
	/** This is description of the rgStaffCheckRecordGroup function*/
	rgStaffCheckRecordGroup(obj) {
		return this.http.get('ocduatte/rgStaffCheckRecordGroup');
	}
	/** This is description of the rgTeamsRecordGroup function*/
	rgTeamsRecordGroup(obj) {
		return this.http.get('ocduatte/rgTeamsRecordGroup');
	}
	compareDateTime(obj) {
		return this.http.post('ocduatte/compareDateTime', obj);
	}
	checkUa(obj) {
		return this.http.post('ocduatte/checkUa', obj);
	}
	getStaffName(obj) {
		return this.http.post('ocduatte/getStaffName', obj);
	}
	cancelFlagOutcomeList(obj) {
		return this.http.post('ocduatte/cancelFlagOutcomeList', obj);
	}
}
