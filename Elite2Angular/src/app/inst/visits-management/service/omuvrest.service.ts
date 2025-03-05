import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OmuvrestService {
	dialogFlag: boolean;
	constructor(private http: HttpService) { }
	/** This is description of the perExecuteQuery function*/
	perExecuteQuery(obj) {
		return this.http.post('omuvrest/perExecuteQuery', obj);
	}
	/** This is description of the visrRestExecuteQuery function*/
	visrRestExecuteQuery(obj) {
		return this.http.post('omuvrest/visrRestExecuteQuery', obj);
	}
	/** This is description of the visrRestCommit function*/
	visrRestCommit(obj) {
		return this.http.post('omuvrest/visrRestCommit', obj);
	}
	/** This is description of the rgVisrRestVisitRestrictiRecordGroup function*/
	rgVisrRestVisitRestrictiRecordGroup(obj) {
		return this.http.get('omuvrest/rgVisrRestVisitRestrictiRecordGroup');
	}
}
