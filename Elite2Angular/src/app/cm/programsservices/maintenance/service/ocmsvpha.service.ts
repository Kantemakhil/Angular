import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OcmsvphaService {
	constructor(private http: HttpService) { }
	/** This is description of the vPrgPhssExecuteQuery function*/
	vPrgPhssExecuteQuery(obj) {
		return this.http.post('ocmsvpha/vPrgPhssExecuteQuery', obj);
	}
	/** This is description of the vPrgPhssCommit function*/
	vPrgPhssCommit(obj) {
		return this.http.post('ocmsvpha/vPrgPhssCommit', obj);
	}
	/** This is description of the rgPsModTypeRecordGroup function*/
	rgPsModTypeRecordGroup(obj) {
		return this.http.get('ocmsvpha/rgPsModTypeRecordGroup');
	}
	/** This is description of the rgPsPhaseRecordGroup function*/
	rgPsPhaseRecordGroup(obj) {
		return this.http.get('ocmsvpha/rgPsPhaseRecordGroup');
	}
	getListSeqMaxCount(obj){
		return this.http.post('ocmsvpha/getListSeqMaxCount',obj);
	}
	getCourceActivityCount(obj){
		return this.http.post('ocmsvpha/getCourceActivityCount',obj);
	}

}
