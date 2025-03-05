import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcudpdisService {
	constructor(private http: HttpService) { }
	tbdExecuteQuery(obj) {
		return this.http.post('ocudpdis/tbdExecuteQuery', obj);
	}
	tbdCommit(obj) {
		return this.http.post('ocudpdis/tbdCommit', obj);
	}

}
