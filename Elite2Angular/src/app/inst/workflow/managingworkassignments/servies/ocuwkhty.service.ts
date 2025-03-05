import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcuwkhtyService {
	constructor(private http: HttpService) { }
	/** This is description of the vWorkAssignmentHistoryExecuteQuery function*/
	vWorkAssignmentHistoryExecuteQuery(obj) {
		return this.http.post('ocuwkhty/vWorkAssignmentHistoryExecuteQuery', obj);
	}
}
