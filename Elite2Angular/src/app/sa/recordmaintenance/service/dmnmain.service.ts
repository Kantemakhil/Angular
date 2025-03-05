import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';


@Injectable({providedIn: 'root'})
export class DmnmainService {
   constructor(private http: HttpService) { }
   dmnsExecuteQuery() {
		return this.http.get('dmnmain/dmnExecuteQuery');
	}
	dmnCommit(obj) {
		return this.http.post('dmnmain/decisionCommit', obj);
	}
	deployeDmn(obj) {
		return this.http.post('dmnmain/deployeDmn', obj);
	}
}
