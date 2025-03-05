import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OumsmalaService {
	constructor(private http: HttpService) {}
	/** This is description of the smExecuteQuery function*/
	smExecuteQuery(obj) {
		return this.http.post('oumsmala/smExecuteQuery',obj);
	}
	/** This is description of the calExecuteQuery function*/
	calExecuteQuery(obj) {
		return this.http.post('oumsmala/calExecuteQuery', obj);
	}
	/** This is description of the slrExecuteQuery function*/
	slrExecuteQuery(obj) {
		return this.http.post('oumsmala/slrExecuteQuery',obj);
	}
	/** This is description of the slrCommit function*/
	slrCommit(obj) {
		return this.http.post('oumsmala/slrCommit',obj);
	}
	/** This is description of the navigationDummyRecordGroup function*/
	navigationDummyRecordGroup(obj) {
		return this.http.get( 'oumsmala/navigationDummyRecordGroup');
	}
	/** This is description of the cgfkSlrpositionRecordGroup function*/
	cgfkSlrpositionRecordGroup(obj) {
		return this.http.get( 'oumsmala/cgfkSslrPositionRecordGroup');
	}
	/** This is description of the cgfkSlrroleRecordGroup function*/
	cgfkSlrroleRecordGroup(obj) {
		return this.http.get( 'oumsmala/cgfkSslrRoleRecordGroup');
	}
	/** This is description of the cgfkSlrstaffunitRecordGroup function*/
	cgfkSlrstaffunitRecordGroup(obj) {
		return this.http.get( 'oumsmala/cgfkSslrStaffUnitRecordGroup');
	}
	/** This is description of the cgfkSlrscheduletypeRecordGroup function*/
	cgfkSlrscheduletypeRecordGroup(obj) {
		return this.http.get( 'oumsmala/cgfkSslrScheduleTypeRecordGroup');
	}
	/** This is description of the cgfkCalagylocidRecordGroup function*/
	cgfkCalagylocidRecordGroup(obj) {
		return this.http.get( 'oumsmala/cgfkCalAgyLocIdRecordGroup');
		 
	}
	/** This is description of the cgfkSaccaseloadidRecordGroup function*/
	cgfkSaccaseloadidRecordGroup(obj) {
		return this.http.get( 'oumsmala/cgfkSsacCaseloadIdRecordGroup');
	}

	/** This is description of the cgfkSaccaseloadidRecordGroup function*/
	cguvchkSlrPk(obj) {
		return this.http.post('oumsmala/cguvchkSlrPk', obj);
	}
}
