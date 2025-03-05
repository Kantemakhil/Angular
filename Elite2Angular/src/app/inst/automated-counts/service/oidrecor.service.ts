import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidrecorService {
	constructor(private http: HttpService) {}
	/** This is description of the agencyCountsExecuteQuery function*/
	agencyCountsExecuteQuery(obj) {
		return this.http.post('oidrecor/agencyCountsExecuteQuery', obj);
	}
	/** This is description of the agencyCountsCommit function*/
	agencyCountsCommit(obj) {
		return this.http.post('oidrecor/agencyCountsCommit', obj);
	}
	/** This is description of the cgfkRecountrsnRecordGroup function*/
	cgfkRecountrsnRecordGroup(obj) {
		return this.http.get( 'oidrecor/cgfk$recountRsnRecordGroup');
	}
}
