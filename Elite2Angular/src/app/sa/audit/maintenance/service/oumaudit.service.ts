import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OumauditService {
	constructor(private http: HttpService) { }
	/** This is description of the allAuditPoliciesExecuteQuery function*/
	allAuditPoliciesExecuteQuery(obj) {
		return this.http.post('oumaudit/allAuditPoliciesExecuteQuery', obj);
	}

	enableOrDisablePolicy(obj) {
		return this.http.post('oumaudit/enableOrDisablePolicy', obj);
	}

	createPolicy(obj) {
		return this.http.post('oumaudit/createPolicy', obj);
	}

	dropPolicy(obj) {
		return this.http.post('oumaudit/dropPolicy', obj);
	}

	/** This is description of the rgDbObjectsRecordGroup function*/
	getTableNameLovData() {
		return this.http.get('oumaudit/rgDbObjectsRecordGroup');
	}

	disableAll() {
		return this.http.get('oumaudit/disableAll');
	}

	dropAll() {
		return this.http.get('oumaudit/dropAll');
	}

	createAll() {
		return this.http.get('oumaudit/createAll');
	}

	enableAll() {
		return this.http.get('oumaudit/enableAll');
	}

}
