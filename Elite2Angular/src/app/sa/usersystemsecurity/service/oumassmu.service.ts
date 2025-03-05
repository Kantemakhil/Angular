import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service'

@Injectable({providedIn: 'root'})
export class OumassmuService {
	roleIdTempValue: any;
	constructor(private http: HttpService) {}
	/** This is description of the omsRoleExecuteQuery function*/
	omsRoleExecuteQuery(obj) {
		return this.http.post('oumassmu/omsRoleExecuteQuery',obj);
	}
	/** This is description of the modPrivExecuteQuery function*/
	modPrivExecuteQuery(obj) {
		return this.http.post('oumassmu/modPrivExecuteQuery',obj);
	}
	/** This is description of the modPrivCommit function*/
	modPrivCommit(obj) {
		return this.http.post('oumassmu/modPrivCommit',obj);
	}
	/** This is description of the rgStaffMemberRolesRoleRecordGroup function*/
	rgStaffMemberRolesRoleRecordGroup() {
		return this.http.get( 'oumassmu/rgStaffMemberRolesRoleRecordGroup');
	}
	/** This is description of the cgfkModprivaccessprivilegeRecordGroup function*/
	cgfkModprivaccessprivilegeRecordGroup() {
		return this.http.get( 'oumassmu/cgfkmodPrivAccessPrivilegeRecordGroup');
	}
	/** This is description of the cgfkModprivmodulenameRecordGroup function*/
	cgfkModprivmodulenameRecordGroup() {
		return this.http.get( 'oumassmu/cgfkModPrivModuleNameRecordGroup');
	}

	omsRoleExecuteQry( obj ) {
        return this.http.post( 'oumassmu/omsRoleExecuteQry', obj );
    }
}
