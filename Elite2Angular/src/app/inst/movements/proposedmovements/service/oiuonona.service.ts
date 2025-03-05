import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable()
export class OiuononaService {
	constructor(private http: HttpService) { }
	/** This is description of the offNonAssoExecuteQuery function*/
	offnonassoExecuteQuery(obj) {
		return this.http.post('oiuonona/offNonAssoExecuteQuery', obj);
	}
	/** This is description of the offNonAssoCommit function*/
	offnonassoCommit(obj) {
		return this.http.post('oiuonona/offNonAssoCommit', obj);
	}
	/** This is description of the stgRelationshipsExecuteQuery function*/
	stgrelationshipsExecuteQuery(obj) {
		return this.http.post('oiuonona/stgRelationshipsExecuteQuery', obj);
	}
}
