import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcucstafService {
	constructor(private http: HttpService) {}
	/** This is description of the staffDetailsExecuteQuery function*/
	staffDetailsExecuteQuery(obj) {
		return this.http.post('ocucstaf/staffDetailsExecuteQuery', obj);
	}
	/** This is description of the rgAgencyTypeRecordGroup function*/
	rgAgencyTypeRecordGroup(obj) {
		return this.http.get( 'ocucstaf/rgAgencyTypeRecordGroup');
	}
	/** This is description of the rgAreaRecordGroup function*/
	rgAreaRecordGroup(obj) {
		return this.http.get( 'ocucstaf/rgAreaRecordGroup?areaType=' + obj);
	}
	/** This is description of the rgStaffStatusRecordGroup function*/
	rgStaffStatusRecordGroup(obj) {
		return this.http.get( 'ocucstaf/rgStaffStatusRecordGroup');
	}
	/** This is description of the rgLocationRecordGroup function*/
	rgLocationRecordGroup(obj) {
		return this.http.get( 'ocucstaf/rgLocationRecordGroup');
	}
	/** This is description of the rgRoleRecordGroup function*/
	rgRoleRecordGroup(obj) {
		return this.http.get( 'ocucstaf/rgRoleRecordGroup');
	}
	/** This is description of the rgPositionRecordGroup function*/
	rgPositionRecordGroup(obj) {
		return this.http.get( 'ocucstaf/rgPositionRecordGroup');
	}
}
