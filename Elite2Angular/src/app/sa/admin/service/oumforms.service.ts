import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OumformsService {
	constructor(private http: HttpService) { }
	/** This is description of the omsModExecuteQuery function*/
	omsModExecuteQuery(obj) {
		return this.http.post('oumforms/omsModExecuteQuery', obj);
	}
	/** This is description of the fafExecuteQuery function*/
	fafExecuteQuery(obj) {
		return this.http.post('oumforms/fafExecuteQuery', obj);
	}
	/** This is description of the fafCommit function*/
	fafCommit(obj) {
		return this.http.post('oumforms/fafCommit', obj);
	}
	/** This is description of the accessTabExecuteQuery function*/
	accessTabExecuteQuery(obj) {
		return this.http.post('oumforms/accessTabExecuteQuery', obj);
	}
	/** This is description of the accessTabCommit function*/
	accessTabCommit(obj) {
		return this.http.post('oumforms/accessTabCommit', obj);
	}
	/** This is description of the rgModuleNameRecordGroup function*/
	rgModuleNameRecordGroup(obj) {
		return this.http.get('oumforms/rgModuleNameRecordGroup');
	}
	/** This is description of the rgTableNameRecordGroup function*/
	rgTableNameRecordGroup(obj) {
		return this.http.get('oumforms/rgTableNameRecordGroup');
	}
	/** This is description of the rgDestinationFormRecordGroup function*/
	rgDestinationFormRecordGroup(obj) {
		return this.http.get('oumforms/rgDestinationFormRecordGroup');
	}
}
