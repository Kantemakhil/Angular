import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmeventService {
	constructor(private http: HttpService) { }
	scheduleExecuteQuery() {
		return this.http.get('ocmevent/scheduleExecuteQuery');
	}
	scheduleCommit(obj) {
		return this.http.post('ocmevent/scheduleCommit', obj);
	}
	outcomeExecuteQuery(obj) {
		return this.http.post('ocmevent/outcomeExecuteQuery', obj);
	}
	outcomeCommit(obj) {
		return this.http.post('ocmevent/outcomeCommit', obj);
	}
}
