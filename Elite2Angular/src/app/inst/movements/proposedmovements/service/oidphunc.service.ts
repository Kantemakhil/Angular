import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OidphuncService {
	constructor(private http: HttpService) { }
	/** This is description of the propMoveExecuteQuery function*/
	propMoveExecuteQuery(obj) {
		return this.http.post('oidphunc/propMoveExecuteQuery', obj);
	}
	/** This is description of the offenderLocChngDtlsExecuteQuery function*/
	offenderLocChngDtlsExecuteQuery(obj) {
		return this.http.post('oidphunc/offenderLocChngDtlsExecuteQuery', obj);
	}
	/** This is description of the propMoveCommit function*/
	propmoveCommit(obj) {
		return this.http.post('oidphunc/propMoveCommit', obj);
	}
	/** This is description of the rgFromLivUnitRecordGroup function*/
	rgFromLivUnitRecordGroup(obj) {
		return this.http.get('oidphunc/rgfromlivunitRecordGroup');
	}
	/** This is description of the rgLevel1RecordGroup function*/
	rgLevel1RecordGroup(livingUnitId) {
		return this.http.get('oidphunc/rgLevel1RecordGroup?livingUnitId=' + livingUnitId);
	}
	/** This is description of the rgLevel2RecordGroup function*/
	rgLevel2RecordGroup(obj) {
		return this.http.get('oidphunc/rglevel2RecordGroup', obj);
	}
	/** This is description of the rgLevel3RecordGroup function*/
	rgLevel3RecordGroup(obj) {
		return this.http.get('oidphunc/rglevel3RecordGroup', obj);
	}
	/** This is description of the rgLevel4RecordGroup function*/
	rgLevel4RecordGroup(obj) {
		return this.http.get('oidphunc/rglevel4RecordGroup', obj);
	}
	checkNonAssociationAndSecurity(obj) {
		return this.http.post('oidphunc/checkNonAssociationAndSecurity', obj);
	}
}
