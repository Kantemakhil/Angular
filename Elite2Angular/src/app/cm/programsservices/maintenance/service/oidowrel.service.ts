import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OidowrelService {
	constructor(private http: HttpService) {}
	/** This is description of the offPrgObligationsExecuteQuery function*/
	offPrgObligationsExecuteQuery(obj) {
		return this.http.post('oidowrel/offPrgObligationsExecuteQuery',obj);
	}
	/** This is description of the offPrgObligationsCommit function*/
	offPrgObligationsCommit(obj) {
		return this.http.post('oidowrel/offPrgObligationsCommit',obj);
	}
	/** This is description of the offProgramProfilesExecuteQuery function*/
	offProgramProfilesExecuteQuery(obj) {
		return this.http.post('oidowrel/offProgramProfilesExecuteQuery',obj);
	}
	/** This is description of the offProgramProfilesCommit function*/
	offProgramProfilesCommit(obj) {
		return this.http.post('oidowrel/offProgramProfilesCommit',obj);
	}
	/** This is description of the vOffenderCourseEventsExecuteQuery function*/
	vOffenderCourseEventsExecuteQuery(obj) {
		return this.http.post('oidowrel/vOffenderCourseEventsExecuteQuery',obj);
	}
	/** This is description of the vOffenderCourseEventsCommit function*/
	vOffenderCourseEventsCommit(obj) {
		return this.http.post('oidowrel/vOffenderCourseEventsCommit',obj);
	}
	/** This is description of the offenderCaseNotesExecuteQuery function*/
	offenderCaseNotesExecuteQuery(obj) {
		return this.http.post('oidowrel/offenderCaseNotesExecuteQuery',obj);
	}
	/** This is description of the offenderCaseNotesCommit function*/
	offenderCaseNotesCommit(obj) {
		return this.http.post('oidowrel/offenderCaseNotesCommit',obj);
	}
	/** This is description of the rgPriorityRecordGroup function*/
	rgPriorityRecordGroup(obj) {
		return this.http.get( 'oidowrel/rgPriorityRecordGroup');
	}
	/** This is description of the rgProgramRecordGroup function*/
	rgProgramRecordGroup(obj) {
		return this.http.get( 'oidowrel/rgProgramRecordGroup');
	}
	/** This is description of the rgEndReasonRecordGroup function*/
	rgEndReasonRecordGroup(obj) {
		return this.http.get( 'oidowrel/rgEndReasonRecordGroup');
	}
	/** This is description of the rgViewRecordGroup function*/
	rgViewRecordGroup(obj) {
		return this.http.get( 'oidowrel/rgViewRecordGroup');
	}
	/** This is description of the rgCancelReasonRecordGroup function*/
	rgCancelReasonRecordGroup(obj) {
		return this.http.get( 'oidowrel/rgCancelReasonRecordGroup');
	}
	/** This is description of the rgSubTypeRecordGroup function*/
	rgSubTypeRecordGroup(obj) {
		return this.http.get( 'oidowrel/rgSubTypeRecordGroup');
	}

	staffNameExcecuteQuery() {
		return this.http.get( 'oidowrel/staffNameExcecuteQuery');
	}

	getModuleName(obj) {
        return this.http.post('oidowrel/getModuleName', obj);
    }
}
