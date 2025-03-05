import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtdofrezService {
	constructor(private http: HttpService) {}
	/** This is description of the offFdExecuteQuery function*/
	offfdExecuteQuery(obj) {
		return this.http.post('otdofrez/offFdExecuteQuery', obj);
	}
	/** This is description of the offFdCommit function*/
	offfdCommit(obj) {
		return this.http.post('otdofrez/offFdCommit', obj);
	}
	/** This is description of the cgfkOfffdfreezereasoncodeRecordGroup function*/
	cgfkOfffdfreezereasoncodeRecordGroup(obj) {
		return this.http.get( 'otdofrez/cgfk$offFdFreezeReasonCodeRecordGroup');
	}
}
