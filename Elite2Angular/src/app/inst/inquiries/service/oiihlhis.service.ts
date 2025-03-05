import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OiihlhisService {
	constructor(private http: HttpService) { }
	bedAhExecuteQuery(obj) {
		return this.http.post('oiihlhis/bedAhExecuteQuery', obj);
	}
}
