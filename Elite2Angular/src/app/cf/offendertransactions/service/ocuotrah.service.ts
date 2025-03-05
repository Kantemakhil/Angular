import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcuotrahService {
	constructor(private http: HttpService) {}
	/** This is description of the offTxnExecuteQuery function*/
	offTxnExecuteQuery(obj) {
		return this.http.post('ocuotrah/offTxnExecuteQuery',obj);
	}
	/** This is description of the sysPflExecuteQuery function*/
	sysPflExecuteQuery(obj) {
		return this.http.post('ocuotrah/sysPflExecuteQuery',obj);
	}
}
