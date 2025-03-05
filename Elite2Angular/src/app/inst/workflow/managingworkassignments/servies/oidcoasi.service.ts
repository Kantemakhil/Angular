import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidcoasiService {
	constructor(private http: HttpService) { }
	/** This is description of the offAsgnExecuteQuery function*/
	offAsgnExecuteQuery(obj) {
		return this.http.post('oidcoasi/offAsgnExecuteQuery', obj);
	}
	/** This is description of the offAsgnCommit function*/
	offAsgnCommit(obj) {
		return this.http.post('oidcoasi/offAsgnCommit', obj);
	}
	/** This is description of the rgAgyLocIdRecordGroup function*/
	rgAgyLocIdRecordGroup(obj) {
		return this.http.get('oidcoasi/rgAgyLocIdRecordGroup');
	}
	/** This is description of the rgLivingUnitCode1RecordGroup function*/
	rgLivingUnitCodeOneRecordGroup(agyLocId) {
		return this.http.get('oidcoasi/rgLivingUnitCodeOneRecordGroup?agyLocId=' + agyLocId);
	}
	/** This is description of the rgLivingUnitCode2RecordGroup function*/
	rgLivingUnitCodeTwoRecordGroup(agyLocId, livingUnitId) {
		return this.http.get('oidcoasi/rgLivingUnitCodeTwoRecordGroup?agyLocId=' + agyLocId + '&livingUnitId=' + livingUnitId);
	}
	/** This is description of the rgLivingUnitCode3RecordGroup function*/
	rgLivingUnitCodeThreeRecordGroup(agyLocId, livingUnitId) {
		return this.http.get('oidcoasi/rgLivingUnitCodeThreeRecordGroup?agyLocId=' + agyLocId + '&livingUnitId=' + livingUnitId);
	}
	/** This is description of the rgLivingUnitCode4RecordGroup function*/
	rgLivingUnitCodeFourRecordGroup(agyLocId, livingUnitId) {
		return this.http.get('oidcoasi/rgLivingUnitCodeFourRecordGroup?agyLocId=' + agyLocId + '&livingUnitId=' + livingUnitId);
	}
	/** This is description of the rgStaffIdRecordGroup function*/
	rgStaffIdRecordGroup(obj) {
		return this.http.get('oidcoasi/rgStaffIdRecordGroup');
	}

	getOfficerLovData(agyLocId) {
		return this.http.get('oidcoasi/rgStaffIdRecordGroup?agyLocId=' + agyLocId);
	}
}
