import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';


@Injectable({ providedIn: 'root' })
export class OcuwarniService {
	constructor(private http: HttpService) { }
	/** This is description of the offCaseNotesExecuteQuery function*/
	offCaseNotesExecuteQuery(obj) {
		return this.http.post('ocuwarni/offCaseNotesExecuteQuery', obj);
	}
	/** This is description of the rgConSubTypeRecordGroup function*/
	rgConSubTypeRecordGroup(obj) {
		return this.http.get('ocuwarni/rgConSubTypeRecordGroup');
	}
	/** This is description of the rgStaffNameRecordGroup function*/
	rgStaffNameRecordGroup(obj) {
		return this.http.get('ocuwarni/rgStaffNameRecordGroup');
	}
}
