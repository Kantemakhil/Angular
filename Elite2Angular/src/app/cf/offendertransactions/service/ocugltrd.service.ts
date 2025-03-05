import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcugltrdService {
	constructor(private http: HttpService) {}
	/** This is description of the glTxnExecuteQuery function*/
	glTxnExecuteQuery(obj) {
		return this.http.post('ocugltrd/glTxnExecuteQuery',obj);
	}
}
