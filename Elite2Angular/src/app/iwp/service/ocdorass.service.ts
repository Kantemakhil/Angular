import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';


@Injectable({providedIn: 'root'})
export class OcdorassService {
	constructor(private http: HttpService) { }
	/** This is description of the offBkg1ExecuteQuery function*/
	offBkg1ExecuteQuery(obj) {
		return this.http.post('ocdorass/offBkg1ExecuteQuery', obj);
	}
	/** This is description of the offBkg1Commit function*/
	offBkg1Commit(obj) {
		return this.http.post('ocdorass/offBkg1Commit', obj);
	}
	/** This is description of the extOtExecuteQuery function*/
	extOtExecuteQuery(obj) {
		return this.http.post('ocdorass/extOtExecuteQuery', obj);
	}
	/** This is description of the extOtCommit function*/
	extOtCommit(obj) {
		return this.http.post('ocdorass/extOtCommit', obj);
	}
	/** This is description of the vOffDetExecuteQuery function*/
	vOffDetExecuteQuery(obj) {
		return this.http.post('ocdorass/vOffDetExecuteQuery', obj);
	}
	/** This is description of the vOffDetCommit function*/
	vOffDetCommit(obj) {
		return this.http.post('ocdorass/vOffDetCommit', obj);
	}
	/** This is description of the rgAgyLocIdRecordGroup function*/
	rgAgyLocIdRecordGroup(obj) {
		return this.http.get('ocdorass/rgAgyLocIdRecordGroup');
	}
	/** This is description of the rgPositionRecordGroup function*/
	rgPositionRecordGroup(obj) {
		return this.http.get('ocdorass/rgPositionRecordGroup');
	}
	/** This is description of the rgRoleRecordGroup function*/
	rgRoleRecordGroup(obj) {
		return this.http.get('ocdorass/rgRoleRecordGroup');
	}
	/** This is description of the rgScheduleTypeRecordGroup function*/
	rgScheduleTypeRecordGroup(obj) {
		return this.http.get('ocdorass/rgScheduleTypeRecordGroup');
	}
	/** This is description of the rgSexCodeRecordGroup function*/
	rgSexCodeRecordGroup(obj) {
		return this.http.get('ocdorass/rgSexCodeRecordGroup');
	}
	/** This is description of the rgTeamRecordGroup function*/
	rgTeamRecordGroup(sealFlag) {
		return this.http.get('ocdorass/rgTeamRecordGroup?sealFlag =' + sealFlag);
	}
	getCountOfTeamEnable() {
		return this.http.get('ocdorass/getCountOfTeamEnable');
	}
	vOExtDetCommit(obj) {
		return this.http.post('ocdorass/vOExtDetCommit', obj);
	}

	getProfileTrustValueDisabled() {
		return this.http.get('ocdorass/getProfileTrustValueDisabled');
	}

}
