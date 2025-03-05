import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable()
export class OcuschprService {
	constructor(private http: HttpService) {}
	/** This is description of the vAcpSchedulesExecuteQuery function*/
	vAcpSchedulesExecuteQuery(obj) {
		return this.http.post('ocuschpr/vAcpSchedulesExecuteQuery',obj);
	}
}
