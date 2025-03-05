import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable()
export class OcussessService {
	constructor(private http: HttpService) {}
	/** This is description of the crsSchExecuteQuery function*/
	crsSchExecuteQuery(obj) {
		return this.http.post('ocussess/crsSchExecuteQuery',obj);
	}
}
