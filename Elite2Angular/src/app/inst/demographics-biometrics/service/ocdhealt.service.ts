import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OcdhealtService {
    constructor(private http: HttpService) { }
    getUserRoleForHealUser() {
        return this.http.get('ocdhealt/getUserRoleForHealUser');
    }

    getUserRoleForHealAdvUser() {
        return this.http.get('ocdhealt/getUserRoleForHealAdvUser');
    }

    getHealthDetailExecuteQuery(obj) {
        return this.http.post('ocdhealt/getHealthDetailExecuteQuery', obj);
    }

    getOffenderRowHealthExecuteQuery(obj) {
        return this.http.post('ocdhealt/getOffenderRowHealthExecuteQuery', obj);
    }


    healthRecordDetailDataCommit(obj) {
        return this.http.post('ocdhealt/healthRecordDetailDataCommit', obj);
    }
    offenderRowHealthDataCommit(obj) {
        return this.http.post('ocdhealt/offenderRowHealthDataCommit', obj);
    }
}
