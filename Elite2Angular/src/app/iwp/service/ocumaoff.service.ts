import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcumaoffService {
	constructor(private http: HttpService) {}
	addOfficerExecuteQuery(obj){
		return this.http.post('ocumaoff/addOfficerExecuteQuery',obj);
	}
	updateSupervosor(obj){
		return this.http.post('ocumaoff/updateSupervosor',obj);
	}
}
