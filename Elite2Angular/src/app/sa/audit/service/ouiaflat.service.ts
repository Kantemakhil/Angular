import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OuiaflatService {
	constructor(private http: HttpService) {}
	/** This is description of the loginAlertsBlkExecuteQuery function*/
	loginAlertsBlkExecuteQuery(obj) {
		return this.http.post('ouiaflat/loginAlertsBlkExecuteQuery',obj);
	}
}
