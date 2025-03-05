import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcupaoffService {
	constructor(private http: HttpService) {}
	/** This is description of the vOffPrgProfilesExecuteQuery function*/
	vOffPrgProfilesExecuteQuery(obj) {
		return this.http.post('ocupaoff/vOffPrgProfilesExecuteQuery', obj);
	}
}
