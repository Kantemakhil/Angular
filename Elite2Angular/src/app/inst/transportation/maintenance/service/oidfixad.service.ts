
import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OidfixadService {

	constructor(private http: HttpService) { }
	/** This is description of the faExecuteQuery function*/
	faExecuteQuery(obj) {
		return this.http.post('oidfixad/faExecuteQuery', obj);
	}
	/** This is description of the faCommit function*/
	faCommit(obj) {
		return this.http.post('oidfixad/faCommit', obj);
	}
	/** This is description of the vehExecuteQuery function*/
	vehExecuteQuery(obj) {
		return this.http.post('oidfixad/vehExecuteQuery', obj);
	}
	/** This is description of the vehCommit function*/
	vehCommit(obj) {
		return this.http.post('oidfixad/vehCommit', obj);
	}
	// This function will hit the backend api (oidfixadCommonSave)
	oidfixadCommonSave(obj) {
		return this.http.post('oidfixad/oidfixadCommonSave', obj);
	}
}