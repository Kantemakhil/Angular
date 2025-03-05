import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OuminsdbService {
    constructor(private http: HttpService) { }

    moduledbAssExecuteQuery() {
		return this.http.get('ouminsdb/getInsModDashboard');
	}
	commitModuledbAss(obj) {
		return this.http.post('ouminsdb/InsModDashboardCommit', obj);
    }
    
}