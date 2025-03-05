import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OuiauactService {
	constructor(private http: HttpService) {}
	/** This is description of the getUserDetailExecuteQuery function*/
	getUserDetailExecuteQuery(obj) {
		return this.http.post('ouiauact/getUserDetailExecuteQuery',obj);
	}
	/** This is description of the rgStfMemberRecordGroup function*/
	rgStfMemberRecordGroup(obj) {
		return this.http.get( 'ouiauact/rgStfMemberRecordGroup');
	}
}
