import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmsvassService {
	constructor(private http: HttpService) {}
	/** This is description of the prgQstExecuteQuery function*/
	prgQstExecuteQuery(obj) {
		return this.http.post('ocmsvass/prgQstExecuteQuery',obj);
	}
	/** This is description of the prgQstCommit function*/
	prgQstCommit(obj) {
		return this.http.post('ocmsvass/prgQstCommit',obj);
	}
	/** This is description of the rgAssessmentsRecordGroup function*/
	rgAssessmentsRecordGroup() {
		return this.http.get( 'ocmsvass/rgAssessmentsRecordGroup');
	}
}
