import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OiusanctService {
	constructor(private http: HttpService) { }
	/** This is description of the offenderOicSanctionsExecuteQuery function*/
	offenderOicSanctionsExecuteQuery(obj) {
		return this.http.post('oiusanct/offenderOicSanctionsExecuteQuery', obj);
	}
}
