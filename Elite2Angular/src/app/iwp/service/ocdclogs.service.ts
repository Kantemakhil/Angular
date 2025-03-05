import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdclogsService {
	exitFlag: boolean;
	constructor(private http: HttpService) { }

	/** This is description of the rgCasenoteTypeRecordGroup function*/
	rgCasenoteTypeRecordGroup(caseloadType) {
		return this.http.get('ocdclogs/rgCasenoteTypeRecordGroup?caseloadType=' + caseloadType);
	}

	/** This is description of the rgCasenoteSubtypeRecordGroup function*/
	rgCasenoteSubtypeRecordGroup(caseNoteType) {
		return this.http.get('ocdclogs/rgCasenoteSubtypeRecordGroup?caseloadType=' + caseNoteType);
	}

	/** This is description of the rgCasenotestaffNameRecordGroup function*/
	rgCasenotestaffNameRecordGroup(tip) {
		return this.http.get('ocdclogs/rgCasenotestaffNameRecordGroup?tip=' + tip);
	}

	/** This is description of the offNotesExecuteQuery function*/
	offNotesExecuteQuery(obj) {
		return this.http.post('ocdclogs/offNotesExecuteQuery', obj);
	}
	/** This is description of the offNotesCommit function*/
	offNotesCommit(obj) {
		return this.http.post('ocdclogs/offNotesCommit', obj);
	}
	/** This is description of the offSchExecuteQuery function*/
	offSchExecuteQuery(obj) {
		return this.http.post('ocdclogs/offSchExecuteQuery', obj);
	}
	/** This is description of the offSchCommit function*/
	offSchCommit(obj) {
		return this.http.post('ocdclogs/offSchCommit', obj);
	}
	/** This is getting staff id lvLoginUserStaffId function*/
	lvLoginUserStaffId() {
		return this.http.get('ocdclogs/lvLoginUserStaffId');
	}
	/** This is description of the rgEventOutcomeRecordGroup function*/ 
	rgEventOutcomeRecordGroup(threeip) {
		return this.http.get('ocdclogs/rgEventOutcomeRecordGroup?threeip=' + threeip);
	}
	/** This is description of the rgLocationRecordGroup function*/
	rgLocationRecordGroup(obj) {
		return this.http.get('ocdclogs/rgLocationRecordGroup');
	}
	/** This is description of the rgScheduleTypeRecordGroup function*/
	rgScheduleTypeRecordGroup() {
		return this.http.get('ocdclogs/rgScheduleTypeRecordGroup');
	}
	/** This is description of the rgScheduleSubTypeRecordGroup function*/
	rgScheduleSubTypeRecordGroup(eventType) {
		return this.http.get('ocdclogs/rgScheduleSubTypeRecordGroup?eventType='+eventType);
	}
	/** This is description of the rgnoteSourceRecordGroup function*/
	rgnoteSourceRecordGroup(obj) {
		return this.http.get('ocdclogs/rgnoteSourceRecordGroup');
	}

	/** This is description of the rgStaffnameRecordGroup function*/
	rgStaffnameRecordGroup(obj) {
		return this.http.get('ocdclogs/rgStaffnameRecordGroup');
	}

	validateNoteTypeSubType(obj) {
		return this.http.post('ocdclogs/validateNoteTypeSubType', obj);
	}

	schExecuteQuery(offBooKID) {
		return this.http.post('ocdclogs/schExecuteQuery', offBooKID);
	}
	/* Getting Module Name */
	getModuleName(obj) {
		return this.http.post('ocdclogs/getModuleName', obj);
	}

	getStaffId(obj) {
		return this.http.get('ocdclogs/getStaffId?caseNoteId=' + obj);
	}

	caseNoteTextData(obj) {
		return this.http.post('ocdclogs/caseNoteTextData', obj);
	}

	checkNonAssociations(obj) {
		return this.http.post('ocdclogs/checkNonAssociations', obj);
	}
	
	checkUa(obj) {
		return this.http.post('ocdclogs/checkUa', obj);
	}

	getEmailSmsFlag(obj) {
		return this.http.post('ocdclogs/getEmailSmsFlag', obj);
	}

	getCancelFlag(obj) {
		return this.http.post('ocdclogs/getCancelFlag', obj);
	}

	checkCasenoteSubType(caseNoteType, caseNoteSubType){
		return this.http.get(`ocdclogs/checkCasenoteSubType?caseNoteType=${caseNoteType}&caseNoteSubType=${caseNoteSubType}`);
	}
	
}
