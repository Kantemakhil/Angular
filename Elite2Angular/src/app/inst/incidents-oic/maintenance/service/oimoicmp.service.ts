import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';


@Injectable()
export class OimoicmpService {
	constructor(private http: HttpService) {}
	/** This is description of the oicSlExecuteQuery function*/
	oicSlExecuteQuery(obj) {
		return this.http.post('oimoicmp/oicSlExecuteQuery',obj);
	}
	/** This is description of the oicSlCommit function*/
	oicSlCommit(obj) {
		return this.http.post('oimoicmp/oicSlCommit',obj);
	}
	/** This is description of the sysPflExecuteQuery function*/
	sysPflExecuteQuery(obj) {
		return this.http.post('oimoicmp/sysPflExecuteQuery',obj);
	}
	/** This is description of the cgfkOicsloicsanctioncodeRecordGroup function*/
	cgfkOicsloicsanctioncodeRecordGroup(obj) {
		return this.http.get( 'oimoicmp/cgfk$oicSlOicSanctionCodeRecordGroup');
	}
	/** This is description of the cgfkOicsloichearingtypeRecordGroup function*/
	cgfkOicsloichearingtypeRecordGroup(obj) {
		return this.http.get( 'oimoicmp/cgfk$oicSlOicHearingTypeRecordGroup');
	}
}
