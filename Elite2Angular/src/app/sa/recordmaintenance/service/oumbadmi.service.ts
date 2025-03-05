import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable()
export class OumbadmiService {
	constructor(private http: HttpService) { }
	/** This is description of the vBookAdmExecuteQuery function*/
	vBookAdmExecuteQuery(obj) {
		return this.http.post('oumbadmi/vBookAdmExecuteQuery', obj);
	}
	/** This is description of the offContactsExecuteQuery function*/
	offContactsExecuteQuery(obj) {
		return this.http.post('oumbadmi/offContactsExecuteQuery', obj);
	}
	/** This is description of the offContactsCommit function*/
	offContactsCommit(obj) {
		return this.http.post('oumbadmi/offContactsCommit', obj);
	}
	/** This is description of the cgfkOffcontactsbookingstatRecordGroup function*/
	cgfkOffcontactsbookingstatRecordGroup(obj) {
		return this.http.get('oumbadmi/cgfk$offContactsBookingStatRecordGroup');
	}
}
