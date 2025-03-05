import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdatpowService {
	constructor(private http: HttpService) {}
	/** This is description of the offBkg1ExecuteQuery function*/
	offBkg1ExecuteQuery(obj) {
		return this.http.post('ocdatpow/offBkg1ExecuteQuery',obj);
	}
	/** This is description of the offBkg1Commit function*/
	offBkg1Commit(obj) {
		return this.http.post('ocdatpow/offBkg1Commit',obj);
	}
	/** This is description of the vOffDetExecuteQuery function*/
	vOffDetExecuteQuery(obj) {
		return this.http.post('ocdatpow/vOffDetExecuteQuery',obj);
	}
	/** This is description of the vOffDetCommit function*/
	vOffDetCommit(obj) {
		return this.http.post('ocdatpow/vOffDetCommit',obj);
	}
	/** This is description of the rgPositionRecordGroup function*/
	rgPositionRecordGroup(obj) {
		return this.http.get( 'ocdatpow/rgPositionRecordGroup');
	}
	/** This is description of the rgRoleRecordGroup function*/
	rgRoleRecordGroup(obj) {
		return this.http.get( 'ocdatpow/rgRoleRecordGroup');
	}
	/** This is description of the rgSexCodeRecordGroup function*/
	rgSexCodeRecordGroup(obj) {
		return this.http.get( 'ocdatpow/rgSexCodeRecordGroup');
	}
	/** This is description of the rgScheduleTypeRecordGroup function*/
	rgScheduleTypeRecordGroup(obj) {
		return this.http.get( 'ocdatpow/rgScheduleTypeRecordGroup');
	}
	/** This is description of the rgTeamRecordGroup function*/
	rgTeamRecordGroup(obj) {
		return this.http.get( 'ocdatpow/rgTeamRecordGroup');
	}
	/** This is description of the cgfkStafflrdspdescriptionRecordGroup function*/
	cgfkStafflrdspdescriptionRecordGroup(obj) {
		return this.http.get( 'ocdatpow/cgfkstaffLrDspDescriptionRecordGroup');
	}
	/** This is description of the cgfkStafflrdsplastnameRecordGroup function*/
	cgfkStafflrdsplastnameRecordGroup(obj) {
		return this.http.get( 'ocdatpow/cgfkstaffLrDspLastNameRecordGroup');
	}
	rgTeamRecordGroupTotal(){
		return this.http.get( 'ocdatpow/rgTeamRecordGroupTotal');
	}
	omMandatoryGrid(){
		return this.http.get( 'ocdatpow/omMandatoryGrid');
	}
}
