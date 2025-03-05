import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable()
export class OumagyrgService {
	constructor(private http: HttpService) {}
	/** This is description of the agyLocExecuteQuery function*/
	agyLocExecuteQuery(obj) {
		return this.http.post('oumagyrg/agyLocExecuteQuery',obj);
	}
	/** This is description of the agyLocCommit function*/
	agyLocCommit(obj) {
		return this.http.post('oumagyrg/agyLocCommit',obj);
	}
	/** This is description of the agencyLocationTypeRgRecordGroup function*/
	agencyLocationTypeRgRecordGroup(obj) {
		return this.http.get( 'oumagyrg/agencyLocationTypeRgRecordGroup');
	}
	/** This is description of the geographicRegionRgRecordGroup function*/
	geographicRegionRgRecordGroup(obj) {
		return this.http.get( 'oumagyrg/geographicRegionRgRecordGroup');
	}
	/** This is description of the subAreaRgRecordGroup function*/
	subAreaRgRecordGroup(parentSubAreaType) {
		return this.http.get('oumagyrg/subAreaRgRecordGroup?parentSubAreaType=' +  parentSubAreaType);
	}
	/** This is description of the areaRgRecordGroup function*/
	areaRgRecordGroup(parentAreaCode) {
		return this.http.get('oumagyrg/areaRgRecordGroup?parentAreaCode=' + parentAreaCode);
	}
	/** This is description of the justiceAreaRgRecordGroup function*/
	justiceAreaRgRecordGroup(obj) {
		return this.http.get( 'oumagyrg/justiceAreaRgRecordGroup');
	}
	/** This is description of the nomsRegionRgRecordGroup function*/
	nomsRegionRgRecordGroup(obj) { 
		return this.http.get( 'oumagyrg/nomsRegionRgRecordGroup');
	}

	subAreaRgRecordGroupTot() {
		return this.http.get('oumagyrg/subAreaRgRecordGroupTot');
  }

	areaRgRecordGroupTot() {
		return this.http.get('oumagyrg/areaRgRecordGroupTot');
	}
}
