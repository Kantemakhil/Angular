import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';


@Injectable({providedIn: 'root'})
export class OimstatuService {
	constructor(private http: HttpService) { }
	/** This is description of the statExecuteQuery function*/
	statExecuteQuery(obj) {
		return this.http.post('oimstatu/statExecuteQuery', obj);
	}
	/** This is description of the statCommit function*/
	statCommit(obj) {
		return this.http.post('oimstatu/statCommit', obj);
	}
	/** This is description of the cgfkStatlegislatingbodycodRecordGroup function*/
	cgfkStatlegislatingbodycodRecordGroup(obj) {
		return this.http.get('oimstatu/cgfk$statLegislatingBodyCodRecordGroup');
	}
}
