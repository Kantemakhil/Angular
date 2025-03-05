import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OymholidService {
	constructor(private http: HttpService) { }
	sysEventExecuteQuery(obj) {
		return this.http.post('oymholid/sysEventExecuteQuery', obj);
	}
	sysEventCommit(obj) {
		return this.http.post('oymholid/sysEventCommit', obj);
	}
	csldGhcExecuteQuery(obj) {
		return this.http.post('oymholid/csldGhcExecuteQuery', obj);
	}
	csldGhcCommit(obj) {
		return this.http.post('oymholid/csldGhcCommit', obj);
	}
	cgfkCsldghccompensationcodRecordGroup(obj) {
		return this.http.get('oymholid/cgfk$csldGhcCompensationCodRecordGroup');
	}
	cgfkCsldghcworkgroupidRecordGroup(obj) {
		return this.http.get('oymholid/cgfk$csldGhcWorkGroupIdRecordGroup');
	}
}
