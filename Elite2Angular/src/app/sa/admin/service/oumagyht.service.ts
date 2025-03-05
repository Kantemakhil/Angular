import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable()
export class OumagyhtService {
	constructor(private http: HttpService) { }
	/** This is description of the agyLocExecuteQuery function*/
	agyLocExecuteQuery() {
		return this.http.get('oumagyht/agyLocExecuteQuery');
	}
	/** This is description of the agyLocAmExecuteQuery function*/
	agyLocAmExecuteQuery(obj) {
		return this.http.post('oumagyht/agyLocAmExecuteQuery', obj);
	}
}
