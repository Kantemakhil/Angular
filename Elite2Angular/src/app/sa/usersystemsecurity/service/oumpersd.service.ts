import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable()
export class OumpersdService {
	constructor(private http: HttpService) { }
	backBtn: boolean;
	
	/** This is description of the staffExecuteQuery function*/
	staffExecuteQuery(staffId) {
		return this.http.get('oumpersd/staffExecuteQuery?staffId='+staffId);
	}
	/** This is description of the staffCommit function*/
	staffCommit(obj) {
		return this.http.post('oumpersd/staffCommit', obj);
	}
	/** This is description of the cgfkStafflicensecodeRecordGroup function*/
	cgfkStafflicensecodeRecordGroup(obj) {
		return this.http.get('oumpersd/cgfk$staffLicenseCodeRecordGroup');
	}
}
