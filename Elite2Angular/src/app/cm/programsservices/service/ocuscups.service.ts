import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable()
export class OcuscupsService {
	constructor(private http: HttpService) {}
	/** This is description of the offCrsAttendExecuteQuery function*/
	offCrsAttendExecuteQuery(obj) {
		return this.http.post('ocuscups/offCrsAttendExecuteQuery',obj);
	}
	/** This is description of the offCrsAttendCommit function*/
	offCrsAttendCommit(obj) {
		return this.http.post('ocuscups/offCrsAttendCommit',obj);
	}
}
