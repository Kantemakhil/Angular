import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OuimtstpService {
	constructor(private http: HttpService) {}
	/** This is description of the mergTxnProcExecuteQuery function*/
	mergTxnProcExecuteQuery(obj) {
		return this.http.post('ouimtstp/mergTxnProcExecuteQuery',obj);
	}
}
