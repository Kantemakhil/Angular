import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service'

@Injectable({providedIn: 'root'})
export class OumaglocService {
	constructor(private http: HttpService) {}
	/** This is description of the agyLocExecuteQuery function*/
	agyLocExecuteQuery(obj) {
		return this.http.post('oumagloc/agyLocExecuteQuery',obj);
	}
	/** This is description of the agyLocCommit function*/
	agyLocCommit(obj) {
		return this.http.post('oumagloc/agyLocCommit',obj);
	}
	/** This is description of the vAgyAddrExecuteQuery function*/
	vAgyAddrExecuteQuery(obj) {
		return this.http.post('oumagloc/vAgyAddrExecuteQuery',obj);
	}
	/** This is description of the phonesExecuteQuery function*/
	phonesExecuteQuery(obj) {
		return this.http.post('oumagloc/phonesExecuteQuery',obj);
	}
	/** This is description of the phonesCommit function*/
	phonesCommit(obj) {
		return this.http.post('oumagloc/phonesCommit',obj);
	}
	/** This is description of the agyLocEstExecuteQuery function*/
	agyLocEstExecuteQuery(obj) {
		return this.http.post('oumagloc/agyLocEstExecuteQuery',obj);
	}
	/** This is description of the agyLocEstCommit function*/
	agyLocEstCommit(obj) {
		return this.http.post('oumagloc/agyLocEstCommit',obj);
	}
	/** This is description of the rgPhoneTypeRecordGroup function*/
	rgPhoneTypeRecordGroup() {
		return this.http.get( 'oumagloc/rgPhoneTypeRecordGroup');
	}
	/** This is description of the rgYnFlagRecordGroup function*/
	rgYnFlagRecordGroup() {
		return this.http.get( 'oumagloc/rgYnFlagRecordGroup');
	}
	/** This is description of the rgAgencyLocationTypeRecordGroup function*/
	rgAgencyLocationTypeRecordGroup() {
		return this.http.get( 'oumagloc/rgAgencyLocationTypeRecordGroup');
	}
	/** This is description of the rgJurisdictionRecordGroup function*/
	rgJurisdictionRecordGroup() {
		return this.http.get( 'oumagloc/rgJurisdictionRecordGroup');
	}
	/** This is description of the rgDisabilityAccessCodeRecordGroup function*/
	rgDisabilityAccessCodeRecordGroup() {
		return this.http.get( 'oumagloc/rgDisabilityAccessCodeRecordGroup');
	}
	/** This is description of the rgHousingLevelCodesRecordGroup function*/
	rgHousingLevelCodesRecordGroup() {
		return this.http.get( 'oumagloc/rgHousingLevelCodesRecordGroup');
	}
	/** This is description of the rgEstablishmentTypeRecordGroup function*/
	rgEstablishmentTypeRecordGroup() {
		return this.http.get( 'oumagloc/rgEstablishmentTypeRecordGroup');
	}

	ieplevelCommit(obj){
		return this.http.post('oumagloc/iepLevelCommit',obj);
	}

	iepLevelExecuteQuery(agyLocId){
		return this.http.get( 'oumagloc/getIepDetails?agyLocId='+agyLocId);
	}
}
