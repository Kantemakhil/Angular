import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable()
export class OcumultiService {
	constructor(private http: HttpService) {}
	/** This is description of the offBlockExecuteQuery function*/
	offBlockExecuteQuery(obj) {
		return this.http.post('ocumulti/offBlockExecuteQuery',obj);
	}
	/** This is description of the offBlockCommit function*/
	offBlockCommit(obj) {
		return this.http.post('ocumulti/offBlockCommit',obj);
	}
	/** This is description of the rgYnFlagRecordGroup function*/
	rgYnFlagRecordGroup(obj) {
		return this.http.get( 'ocumulti/rgYnFlagRecordGroup');
	}
}
