import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
@Injectable({ providedIn: 'root' })
export class OcmcprevService {
	constructor(private http: HttpService) { }
	/** This is description of the caseReviewPeriodsExecuteQuery function*/
	caseReviewPeriodsExecuteQuery(obj) {
		return this.http.post('ocmcprev/caseReviewPeriodsExecuteQuery', obj);
	}
	/** This is description of the caseReviewPeriodsCommit function*/
	caseReviewPeriodsCommit(obj) {
		return this.http.post('ocmcprev/caseReviewPeriodsCommit', obj);
	}
	/** This is description of the rgSupLevelRecordGroup function*/
	rgSupLevelRecordGroup(obj) {
		return this.http.get('ocmcprev/rgSupLevelRecordGroup');
	}
}
