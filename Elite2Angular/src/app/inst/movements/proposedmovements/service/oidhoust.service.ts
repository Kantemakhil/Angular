import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';


@Injectable()
export class OidhoustService {
	constructor(private http: HttpService) { }
	/** This is description of the housMoveExecuteQuery function*/
	housMoveExecuteQuery(obj) {
		return this.http.post('oidhoust/housMoveExecuteQuery', obj);
	}
	inmateCommit(obj) {
		return this.http.post('oidhoust/inmateCommit', obj);
	}
	populatestatDetDetails(obj) {
		return this.http.post('oidhoust/populatestatDetDetails', obj);
	}
	statDetCommit(obj) {
		return this.http.post('oidhoust/statDetCommit', obj);
	}
	getCurInmAppStatus(obj) {
		return this.http.post('oidhoust/getCurInmAppStatus', obj);
	}
	vOffSchOverviewExecuteQuery(obj) {
		return this.http.post('oiuschov/vOffSchOverviewExecuteQuery', obj);
	}
	offnonassoExecuteQuery(obj) {
		return this.http.post('oiuonona/offNonAssoExecuteQuery', obj);
	}

}
