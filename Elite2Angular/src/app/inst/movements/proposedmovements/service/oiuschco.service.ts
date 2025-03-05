import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable()
export class OiuschcoService {
	constructor(private http: HttpService) { }
	/** This is description of the vOffSchOverviewExecuteQuery function*/
	voffschoverviewExecuteQuery(obj) {
		return this.http.post('oiuschco/vOffSchOverviewExecuteQuery', obj);
	}
}
