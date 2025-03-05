import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmsnotiService {
	constructor(private http: HttpService) {}
	/** This is description of the sanNotExecuteQuery function*/
	sanNotExecuteQuery(obj) {
		return this.http.post('ocmsnoti/sanNotExecuteQuery',obj);
	}
	/** This is description of the sanNotCommit function*/
	sanNotCommit(obj) {
		return this.http.post('ocmsnoti/sanNotCommit',obj);
	}
}
