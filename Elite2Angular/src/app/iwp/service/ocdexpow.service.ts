import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdexpowService {
	constructor(private http: HttpService) { }
	/** This is description of the extOtExecuteQuery function*/
	extOtExecuteQuery(obj) {
		return this.http.post('ocdexpow/extOtExecuteQuery', obj);
	}
	/** This is description of the extOtCommit function*/
	extOtCommit(obj) {
		return this.http.post('ocdexpow/extOtCommit', obj);
	}
	/** This is description of the vOffenderAssignedExecuteQuery function*/
	vOffenderAssignedExecuteQuery(obj) {
		return this.http.post('/ocdexpow/vOffenderAssignedExecuteQuery', obj);
	}
	/** This is description of the vOffenderAssignedCommit function*/
	vOffenderAssignedCommit(obj) {
		return this.http.post('/ocdexpow/vOffenderAssignedCommit', obj);
	}
	/** This is description of the cgfkExtotagylocidtoRecordGroup function*/
	cgfkExtotagylocidtoRecordGroup(obj) {
		return this.http.get('/ocdexpow/cgfkExtOtAgyLocIdToRecordGroup');
	}
	/** This is description of the rgStaffMembersRecordGroup function*/
	rgStaffMembersRecordGroup(obj) {
		return this.http.get('/ocdexpow/rgStaffMembersRecordGroup');
	}
	/** This is description of the cgfkExtotagylocidfromRecordGroup function*/
	cgfkExtotagylocidfromRecordGroup(obj) {
		return this.http.get('/ocdexpow/cgfkExtOtAgyLocIdToRecordGroup');
	}
}
