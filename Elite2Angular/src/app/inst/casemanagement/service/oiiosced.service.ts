import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiioscedService {
    constructor(private http: HttpService) { }
    /** This is description of the vOffenderAllSchedulesExecuteQuery function*/
    vOffenderAllSchedulesExecuteQuery(obj) {
        return this.http.post('oiiosced/vOffenderAllSchedulesExecuteQuery', obj);
    }
    /** This is description of the rgSchFilterRecordGroup function*/
    rgSchFilterRecordGroup(obj) {
        return this.http.get('oiiosced/rgSchFilterRecordGroup');
    }
    /** This is description of the rgSchTypeRecordGroup function*/
    rgSchTypeRecordGroup(obj) {
        return this.http.get('oiiosced/rgSchTypeRecordGroup');
    }
    /** This is description of the rgSchReaExtRecordGroup function*/
    rgSchReaExtRecordGroup(obj) {
        return this.http.get('oiiosced/rgSchReaExtRecordGroup');
    }
    /** This is description of the rgSchReaIntRecordGroup function*/
    rgSchReaIntRecordGroup(obj) {
        return this.http.get('oiiosced/rgSchReaIntRecordGroup');
    }
}
