import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiidmoveService {
	constructor(private http: HttpService) {}
	/** This is description of the offEmExecuteQuery function*/
	offEmExecuteQuery(obj) {
		return this.http.post('oiidmove/offEmExecuteQuery', obj);
	}
	/** This is description of the offEmCommit function*/
	offEmCommit(obj) {
		return this.http.post('oiidmove/offEmCommit', obj);
	}
	/** This is description of the cgfkOffemmovementreasoncoRecordGroup function*/
	cgfkOffemmovementreasoncoRecordGroup() {
		return this.http.get( 'oiidmove/cgfkOffEmMovementReasonCoRecordGroup');
	}
	/** This is description of the cgfkOffemmovementtypeRecordGroup function*/
	cgfkOffemmovementtypeRecordGroup() {
		return this.http.get( 'oiidmove/cgfkOffEmMovementTypeRecordGroup');
	}
}
