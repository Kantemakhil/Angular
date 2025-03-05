import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmdeftmService {
	constructor(private http: HttpService) { }
	/** This is description of the agyTmFnExecuteQuery function*/
	agyTmFnExecuteQuery(obj) {
		return this.http.post('ocmdeftm/agyTmFnExecuteQuery', obj);
	}
	/** This is description of the agyTmFnCommit function*/
	agyTmFnCommit(obj) {
		return this.http.post('ocmdeftm/agyTmFnCommit', obj);
	}
	/** This is description of the rgAgyLocRecordGroup function*/
	rgAgyLocRecordGroup(obj) {
		return this.http.get('ocmdeftm/rgAgyLocRecordGroup');
	}
	/** This is description of the rgAgyLocTypeRecordGroup function*/
	rgAgyLocTypeRecordGroup(obj) {
		return this.http.get('ocmdeftm/rgAgyLocTypeRecordGroup');
	}
	/** This is description of the rgFunctionRecordGroup function*/
	rgFunctionRecordGroup(obj) {
		return this.http.get('ocmdeftm/rgFunctionRecordGroup');
	}
	/** This is description of the rgYnRecordGroup function*/
	rgYnRecordGroup(obj) {
		return this.http.get('ocmdeftm/rgYnRecordGroup');
	}
}
