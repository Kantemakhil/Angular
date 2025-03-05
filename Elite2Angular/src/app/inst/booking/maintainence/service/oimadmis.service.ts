import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';


@Injectable()
export class OimadmisService {
	constructor(private http: HttpService) { }
	/** This is description of the caseloadAdmAlertProfilesExecuteQuery function*/
	caseloadAdmAlertProfilesExecuteQuery(obj) {
		return this.http.post('oimadmis/caseloadAdmAlertProfilesExecuteQuery', obj);
	}
	/** This is description of the caseloadAdmAlertProfilesCommit function*/
	caseloadAdmAlertProfilesCommit(obj) {
		return this.http.post('oimadmis/caseloadAdmAlertProfilesCommit', obj);
	}
	/** This is description of the caseloadAdmOtherProfilesExecuteQuery function*/
	caseloadAdmOtherProfilesExecuteQuery(obj) {
		return this.http.post('oimadmis/caseloadAdmOtherProfilesExecuteQuery', obj);
	}
	/** This is description of the caseloadAdmOtherProfilesCommit function*/
	caseloadAdmOtherProfilesCommit(obj) {
		return this.http.post('oimadmis/caseloadAdmOtherProfilesCommit', obj);
	}
	/** This is description of the rgSystemMsgRecordGroup function*/
	rgSystemMsgRecordGroup(obj) {
		return this.http.get('oimadmis/rgSystemMsgRecordGroup');
	}
	/** This is description of the rgOtherSystemMsgRecordGroup function*/
	rgOtherSystemMsgRecordGroup(obj) {
		return this.http.get('oimadmis/rgOtherSystemMsgRecordGroup');
	}
	/** This is description of the rgAgencyLocationsRecordGroup function*/
	rgAgencyLocationsRecordGroup(obj) {
		return this.http.get('oimadmis/rgAgencyLocationsRecordGroup');
	}
	/** This is description of the rgLivingUnitsRecordGroup function*/
	rgLivingUnitsRecordGroup(obj) {
		return this.http.get('oimadmis/rgLivingUnitsRecordGroup');
	}
	/** This is description of the rgAlertRecordGroup function*/
	rgAlertRecordGroup(obj) {
		return this.http.get('oimadmis/rgAlertRecordGroup');
	}
	/** This is description of the rgAlertCodeRecordGroup function*/
	rgAlertCodeRecordGroup(obj) {
		return this.http.get('oimadmis/rgAlertCodeRecordGroup');
	}
}
