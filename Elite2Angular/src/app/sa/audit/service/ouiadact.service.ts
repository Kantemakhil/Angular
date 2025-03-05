import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OuiadactService {
	constructor(private http: HttpService) {}
	/** This is description of the getTableDetailExecuteQuery function*/
	getTableDetailExecuteQuery(obj) {
		return this.http.post('ouiadact/getTableDetailExecuteQuery',obj);
	}
	/** This is description of the rgTableNameRecordGroup function*/
	rgTableNameRecordGroup(obj) {
		return this.http.get( 'ouiadact/rgTableNameRecordGroup');
	}
	getStaffName(obj) {
		return this.http.post('ouiadact/getStaffName',obj);
	}
}
