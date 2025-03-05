import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcunotcmService {
    constructor(private http: HttpService) { }
    /** This is description of the offCaseNrExecuteQuery function*/
    offCaseNrExecuteQuery(obj) {
        return this.http.post('ocunotcm/offCaseNrExecuteQuery', obj);
    }
    /** This is description of the offCaseNrCommit function*/
    offCaseNrCommit(obj) {
        return this.http.post('ocunotcm/offCaseNrCommit', obj);
    }
    /** This is description of the rgStaffDtlsRecordGroup function*/
    rgStaffDtlsRecordGroup() {
        return this.http.get('ocunotcm/rgStaffDtlsRecordGroup');
    }
}
