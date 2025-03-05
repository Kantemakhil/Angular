import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '@core/service/http.service';


@Injectable()
export class OiuselveService {
	constructor(private http: HttpService) {}

	selectvehiclesExecuteQuery(obj) {
		return this.http.post('oiuselve/selectVehiclesExecuteQuery',obj);
	}
}