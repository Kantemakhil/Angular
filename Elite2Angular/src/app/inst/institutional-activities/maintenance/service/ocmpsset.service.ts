import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmpssetService {
    constructor(private http: HttpService) {}
    /** This is description of the progServSettingExecuteQuery function*/
    progServSettingExecuteQuery() {
        return this.http.get('ocmpsset/progServSettingExecuteQuery');
    }
    prgSrvSettingCommit(commitBean) {
        return this.http.post('ocmpsset/prgSrvSettingCommit', commitBean);
    }
    getHours() {
		return this.http.get('ocmpsset/getHours');
	}
    getProgramServicePayFlag() {
		return this.http.get('ocmpsset/getProgramServicePayFlag');
	}
}
