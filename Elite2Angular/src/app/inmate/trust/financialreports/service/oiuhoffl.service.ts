import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OiuhofflService {
	constructor(private http: HttpService) { }
	/** This is description of the vOffBkgExecuteQuery function*/
	vOffBkgExecuteQuery(obj) {
		return this.http.post('oiuhoffl/vOffBkgExecuteQuery', obj);
	}
}
