import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable()
export class OcmschprService {
	constructor(private http: HttpService) {}
	/** This is description of the crsActExecuteQuery function*/
	crsActExecuteQuery(obj) {
		return this.http.post('ocmschpr/crsActExecuteQuery',obj);
	}
	/** This is description of the crsActCommit function*/
	crsActCommit(obj) {
		return this.http.post('ocmschpr/crsActCommit',obj);
	}
	/** This is description of the vAcpSchedulesExecuteQuery function*/
	vAcpSchedulesExecuteQuery(obj) {
		return this.http.post('ocmschpr/vAcpSchedulesExecuteQuery', obj);
	}
	/** This is description of the vAcpSchedulesCommit function*/
	vAcpSchedulesCommit(obj) {
		return this.http.post('ocmschpr/vAcpSchedulesCommit',obj);
	}
	/** This is description of the crsScheduleRulExecuteQuery function*/
	crsScheduleRulExecuteQuery(obj) {
		return this.http.post('ocmschpr/crsScheduleRulExecuteQuery',obj);
	}
	/** This is description of the crsScheduleRulCommit function*/
	crsScheduleRulCommit(obj) {
		return this.http.post('ocmschpr/crsScheduleRulCommit',obj);
	}
	/** This is description of the rgRemainingRecordGroup function*/
	vAcpSchedulesInsertChecking(obj) {
		return this.http.get( '/ocmschpr/vAcpSchedulesInsertChecking?crsActyId=' + obj);
	}

	vAcpSchedulesDelete(obj) {
		return this.http.post('ocmschpr/vAcpSchedulesDelete',obj);
	}

	getWeekday(obj) {
		return this.http.post('ocmschpr/getWeekday' , obj);
	}

	vAcpSchedulesValidate(obj) {
		return this.http.post('ocmschpr/vAcpSchedulesValidate', obj);
	}

	ocsmchprCommit(obj) {
		return this.http.post('ocmschpr/ocsmchprCommit', obj);
	}

	chkAllocationExists(obj){
		return this.http.post('ocmschpr/chkAllocationExists', obj);
	}

	buildSchedule(obj){
		return this.http.post('ocmschpr/buildSchedule', obj);
	}
	defaultBuildParameters(obj){
		return this.http.post('ocmschpr/defaultBuildParameters', obj);
	}

	reSchedule(obj) {
		return this.http.post('ocmschpr/reSchedule', obj);
	}

	updateCrsActyChecksum(obj) {
		return this.http.get( '/ocmschpr/updateCrsActyChecksum?programInstanceId=' + obj);
	}

	


}
