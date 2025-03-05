import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OcumpvavService {
	constructor(private http: HttpService) { }
	crsActExecuteQuery(obj) {
		return this.http.post('ocumpvav/crsActExecuteQuery', obj);
	}
	crsScheduleRulExecuteQuery(obj) {
		return this.http.post('ocumpvav/crsScheduleRulExecuteQuery', obj);
	}
	crsScheduleRulCommit(obj) {
		return this.http.post('ocumpvav/crsScheduleRulCommit', obj);
	}
}
