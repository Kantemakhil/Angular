import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })

export class OcdpatteService {
	constructor(private http: HttpService) { }
	/** This is description of the offCourseAttendancesExecuteQuery function*/
	offCourseAttendancesExecuteQuery(obj) {
		return this.http.post('ocdpatte/offCourseAttendancesExecuteQuery', obj);
	}
	getcourseScheduleExecuteQuery(obj) {
		return this.http.post('ocdpatte/getcourseScheduleExecuteQuery', obj);
	}

	/** This is description of the offCourseAttendancesCommit function*/
	offCourseAttendancesCommit(obj) {
		return this.http.post('ocdpatte/offCourseAttendancesCommit', obj);
	}
	/** This is description of the courseScheduleStaffsExecuteQuery function*/
	courseScheduleStaffsExecuteQuery(obj) {
		return this.http.post('ocdpatte/courseScheduleStaffsExecuteQuery', obj);
	}
	/** This is description of the courseScheduleStaffsCommit function*/
	courseScheduleStaffsCommit(obj) {
		return this.http.post('ocdpatte/courseScheduleStaffsCommit', obj);
	}
	/** This is description of the deliveryDetailsExecuteQuery function*/
	deliveryDetailsExecuteQuery(obj) {
		return this.http.post('ocdpatte/deliveryDetailsExecuteQuery', obj);
	}
	/** This is description of the deliveryDetailsCommit function*/
	deliveryDetailsCommit(obj) {
		return this.http.post('ocdpatte/deliveryDetailsCommit', obj);
	}
	/** This is description of the rgScheduleTypeRecordGroup function*/
	rgScheduleTypeRecordGroup(obj) {
		return this.http.get('ocdpatte/rgScheduleTypeRecordGroup');
	}
	/** This is description of the rgServiceRecordGroup function*/
	rgServiceRecordGroup(obj) {
		return this.http.get('ocdpatte/rgServiceRecordGroup');
	}
	/** This is description of the rgEngagementRecordGroup function*/
	rgEngagementRecordGroup(obj) {
		return this.http.get('ocdpatte/rgEngagementRecordGroup');
	}
	/** This is description of the rgInstProviderRecordGroup function*/
	rgInstProviderRecordGroup(obj) {
		return this.http.get('ocdpatte/rgInstProviderRecordGroup');
	}
	/** This is description of the rgCommProviderRecordGroup function*/
	rgCommProviderRecordGroup(obj) {
		return this.http.get('ocdpatte/rgCommProviderRecordGroup');
	}
	/** This is description of the rgConfirmAttendanceRecordGroup function*/
	rgConfirmAttendanceRecordGroup(obj) {
		return this.http.get('ocdpatte/rgConfirmAttendanceRecordGroup');
	}
	/** This is description of the rgUnderstandingRecordGroup function*/
	rgUnderstandingRecordGroup(obj) {
		return this.http.get('ocdpatte/rgUnderstandingRecordGroup');
	}
	/** This is description of the rgStaffRoleRecordGroup function*/
	rgStaffRoleRecordGroup(obj) {
		return this.http.get('ocdpatte/rgStaffRoleRecordGroup');
	}
	/** This is description of the rgStaffNameRecordGroup function*/
	rgStaffNameRecordGroup(progInstId) {
		return this.http.get('ocdpatte/rgStaffNameRecordGroup?progInstId=' + progInstId);
	}

	checkUa(obj) {
		return this.http.post('ocdpatte/checkUa', obj);
	}
	getproviderType(caseloadId) {
		return this.http.get('ocdpatte/getproviderType?caseloadId=' + caseloadId);
	}
	
	getActOutcomeFlag(obj) {
		return this.http.post('ocdpatte/getActOutcomeFlag',obj);
	}
	getProgLocation(obj) {
		return this.http.post('ocdpatte/getProgLocation', obj);
	}

	ocdpatteCommitBean(obj) {
		return this.http.post('ocdpatte/ocdpatteCommitBean', obj);
	}
	cancelFlagOutcomeList(obj) {
		return this.http.post('ocdpatte/cancelFlagOutcomeList', obj);
	}
	vAcpSchedulesExecuteQuery(obj) {
		return this.http.post('ocdpatte/vAcpSchedulesExecuteQuery',obj);
	}
}
