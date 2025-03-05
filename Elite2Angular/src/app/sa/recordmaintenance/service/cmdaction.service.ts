import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class CmdactionService {
	constructor(private http: HttpService) { }
	quickActionsExecuteQuery() {
		return this.http.get('cmdaction/quickActionsExecuteQuery');
	}
	parametersExecuteQuery(obj) {
		return this.http.post('cmdaction/parametersExecuteQuery', obj);
	}
	commitQuickActions(obj) {
		return this.http.post('cmdaction/commitQuickActions', obj);
	}
	commitParameters(obj) {
		return this.http.post('cmdaction/commitParameters', obj);
	}
}
