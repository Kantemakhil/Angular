import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OiibooksService {


	checkFormAccess(obj) {
		return this.http.post('oiibooks/checkFormAccess', obj);
	}
	constructor(private http: HttpService) { }
	/** This is description of the offBooksExecuteQuery function*/
	offBooksExecuteQuery(obj) {
		return this.http.post('oiibooks/offBooksExecuteQuery', obj);
	}
	/** This is description of the bookDetailExecuteQuery function*/
	bookDetailExecuteQuery(obj) {
		return this.http.post('oiibooks/bookDetailExecuteQuery', obj);
	}

	onButSwitchclick(obj) {
		return this.http.post('oiibooks/getOffenderObject', obj);
	}
}
