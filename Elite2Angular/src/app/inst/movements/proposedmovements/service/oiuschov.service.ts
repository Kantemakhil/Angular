import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable()
export class OiuschovService {
	
	constructor(private http: HttpService) {}

	vOffSchOverviewExecuteQuery(obj) {
		return this.http.post('oiuschov/vOffSchOverviewExecuteQuery',obj);
	}
}