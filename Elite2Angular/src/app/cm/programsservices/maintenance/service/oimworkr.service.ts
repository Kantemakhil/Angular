import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OimworkrService {
	constructor(private http: HttpService) {}
	/** This is description of the crsActyExecuteQuery function*/
	crsActyExecuteQuery(obj) {
		return this.http.post('oimworkr/crsActyExecuteQuery',obj);
	}
	/** This is description of the crsActyCommit function*/
	crsActyCommit(obj) {
		return this.http.post('oimworkr/crsActyCommit',obj);
	}
	/** This is description of the rgProjectTypeRecordGroup function*/
	rgProjectTypeRecordGroup(obj) {
		return this.http.get( 'oimworkr/rgProjectTypeRecordGroup');
	}
	/** This is description of the rgProviderRecordGroup function*/
	rgProviderRecordGroup(obj) {
		return this.http.get( 'oimworkr/rgProviderRecordGroup');
	}
	/** This is description of the rgProjectLocationRecordGroup function*/
	rgProjectLocationRecordGroup(obj) {
		return this.http.get( 'oimworkr/rgProjectLocationRecordGroup?providerPartyId='+obj);
	}
	/** This is description of the rgAgencyLocationRecordGroup function*/
	rgAgencyLocationRecordGroup(obj) {
		return this.http.get( 'oimworkr/rgAgencyLocationRecordGroup');
	}
}
