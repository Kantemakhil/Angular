import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OcicnsrcService {

	constructor(private http: HttpService) { }


	casenoteexecuteQuery(obj) {
		return this.http.post('ocicnsrc/casenoteexecuteQuery', obj);
	}

	getstaffId() {
		return this.http.get('ocicnsrc/getStaffId');
	}

	checkPermisionForLov() {
		return this.http.get('ocicnsrc/checkPermisionForLov');
	}
}

