import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtmoncoaService {
	constructor(private http: HttpService) {}
	/** This is description of the csldApExecuteQuery function*/
	csldApExecuteQuery(obj) {
		return this.http.post('otmoncoa/csldApExecuteQuery', obj);
	}
	/** This is description of the csldApCommit function*/
	csldApCommit(obj) {
		return this.http.post('otmoncoa/csldApCommit', obj);
	}
	/** This is description of the cgfkCsldapcaseloadidRecordGroup function*/
	cgfkCsldapcaseloadidRecordGroup(obj) {
		return this.http.get( 'otmoncoa/cgfk$csldApCaseloadIdRecordGroup');
	}
	/** This is description of the getTotalCount function*/
	getTotalCount(obj) {
		return this.http.get(`otmoncoa/getTotalCount?caseloadId=${obj}`);
	}

	getCaseloadLov(caseloadType){
		return this.http.get('otmoncoa/cgfkCsldApCaseloadIdRecordGroup?caseloadType='+caseloadType);
	}
}
