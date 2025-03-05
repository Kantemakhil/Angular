import { Injectable } from '@angular/core';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';

import { HttpService } from '@core/service/http.service';
@Injectable({ providedIn: 'root' })
export class OcduprojService {
	backBtnEnable: boolean;
	vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
	ocduatteScreenObj: any;
	ocduprojScreenObj: any;
	ocduprojBackBtnFlag: boolean;
	ocduatteBackBtnFlag: boolean;
	constructor(private http: HttpService) { }
	/** This is description of the unpaidWkExecuteQuery function*/
	unpaidWkExecuteQuery(obj) {
		return this.http.post('ocduproj/unpaidWkExecuteQuery', obj);
	}
	/** This is description of the projAllocExecuteQuery function*/
	projAllocExecuteQuery(obj) {
		return this.http.post('ocduproj/projAllocExecuteQuery', obj);
	}
	projAllocOnDeleteQuery(obj) {
		return this.http.post('ocduproj/projAllocOnDeleteQuery', obj);
	}
	/** This is description of the projAllocCommit function*/
	projAllocCommit(obj) {
		return this.http.post('ocduproj/projAllocCommit', obj);
	}
	/** This is description of the attendanceExecuteQuery function*/
	attendanceExecuteQuery(obj) {
		return this.http.post('ocduproj/attendanceExecuteQuery', obj);
	}
	/** This is description of the attendanceCommit function*/
	attendanceCommit(obj) {
		return this.http.post('ocduproj/attendanceCommit', obj);
	}
	/** This is description of the skillsExecuteQuery function*/
	skillsExecuteQuery(obj) {
		return this.http.post('ocduproj/skillsExecuteQuery', obj);
	}
	/** This is description of the skillsCommit function*/
	skillsCommit(obj) {
		return this.http.post('ocduproj/skillsCommit', obj);
	}
	/** This is description of the creditAdjExecuteQuery function*/
	creditAdjExecuteQuery(obj) {
		return this.http.post('ocduproj/creditAdjExecuteQuery', obj);
	}
	/** This is description of the creditAdjCommit function*/
	creditAdjCommit(obj) {
		return this.http.post('ocduproj/creditAdjCommit', obj);
	}
	/** This is description of the rgViewRecordGroup function*/
	rgViewRecordGroup(obj) {
		return this.http.get('ocduproj/rgViewRecordGroup');
	}
	/** This is description of the rgAttendanceRecordGroup function*/
	rgAttendanceRecordGroup(obj) {
		return this.http.get('ocduproj/rgAttendanceRecordGroup');
	}
	/** This is description of the rgSupervisorRecordGroup function*/
	rgSupervisorRecordGroup(offenderBookId) {
		return this.http.get('ocduproj/rgSupervisorRecordGroup?offenderBookId=' + offenderBookId);
	}
	/** This is description of the rgBehaviourRecordGroup function*/
	rgBehaviourRecordGroup(obj) {
		return this.http.get('ocduproj/rgBehaviourRecordGroup');
	}
	/** This is description of the rgWorkQualityRecordGroup function*/
	rgWorkQualityRecordGroup(obj) {
		return this.http.get('ocduproj/rgWorkQualityRecordGroup');
	}
	/** This is description of the rgProjectCheckRecordGroup function*/
	rgProjectCheckRecordGroup(obj) {
		return this.http.get('ocduproj/rgProjectCheckRecordGroup');
	}
	/** This is description of the rgProjectRecordGroup function*/
	rgProjectRecordGroup(obj) {
		return this.http.get('ocduproj/rgProjectRecordGroup?offenderBookId=' + obj);
	}
	/** This is description of the rgSkillsRecordGroup function*/
	rgSkillsRecordGroup(obj) {
		return this.http.get('ocduproj/rgSkillsRecordGroup');
	}
	/** This is description of the rgStaffCheckRecordGroup function*/
	rgStaffCheckRecordGroup(obj) {
		return this.http.get('ocduproj/rgStaffCheckRecordGroup');
	}
	/** This is description of the rgDebitCreditRecordGroup function*/
	rgDebitCreditRecordGroup(obj) {
		return this.http.get('ocduproj/rgDebitCreditRecordGroup');
	}
	/** This is description of the rgAdjReasonRecordGroup function*/
	rgAdjReasonRecordGroup(obj) {
		return this.http.get('ocduproj/rgAdjReasonRecordGroup');
	}

	getActiveFlagCount(offenderId){
		return this.http.get('ocduproj/getActiveFlagCount?offenderId='+offenderId);
	}

	getLastAndFirstName(offenderId){
		return this.http.get('ocduproj/getLastAndFirstName?offenderId='+offenderId);
	}

	weeklyDefExecuteQuery(offPrgrefId){
		return this.http.get('ocduproj/weeklyDefExecuteQuery?offenderId='+offPrgrefId);
	}

	checkingNonAssociation(obj){
		return this.http.post('ocduproj/checkingNonAssociations',obj);
	}
	// To check condition is active or not
	rgOrderStatus() {
		return this.http.get('ocmpconf/rgOrderStatus');
	}
	cancelFlagOutcomeList(obj) {
		return this.http.post('ocduproj/cancelFlagOutcomeList', obj);
	}
}
