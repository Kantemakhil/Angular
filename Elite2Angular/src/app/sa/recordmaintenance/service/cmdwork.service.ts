import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class CmdworkService {
	constructor(private http: HttpService) { }
	workItemsExecuteQuery() {
		return this.http.get('cmdwork/workItemsExecuteQuery');
	}
	commitWorkItems(obj) {
		return this.http.post('cmdwork/commitWorkItems', obj);
	}
	getProcessLovDetail(){
		return this.http.get('cmdwork/rgProcessRecordGroup');
	}
	getTriggerLovDetail() {
		return this.http.get('cmdwork/rgModuleTriggersRecordGroup');
	}
	
}
