import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiiinrolService {
	constructor(private http: HttpService) {}
	/** This is description of the rollListExecuteQuery function*/
	rollListExecuteQuery(agyLocId: string, internalLocationId: number) {
		return this.http.get('oiiinrol/rollListExecuteQuery?agyLocId=' + agyLocId + '&internalLocationId=' + internalLocationId);
	}
}
