import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service'

@Injectable({providedIn: 'root'})
export class OidverccService {
    constructor(private http: HttpService) { }
    /** This is description of the agencyCountTypesExecuteQuery function*/
    agencyCountTypesExecuteQuery(obj) {
        return this.http.post('oidvercc/agencyCountTypesExecuteQuery', obj);
    }
    /** This is description of the agencyCountTypesCommit function*/
    agencyCountTypesCommit(obj) {
        return this.http.post('oidvercc/agencyCountTypesCommit', obj);
    }
    /** This is description of the reportingLocationsExecuteQuery function*/
    reportingLocationsExecuteQuery(obj) {
        return this.http.post('oidvercc/reportingLocationsExecuteQuery', obj);
    }
    /** This is description of the reportingLocationsCommit function*/
    reportingLocationsCommit(obj) {
        return this.http.post('oidvercc/reportingLocationsCommit', obj);
    }
    /** This is description of the cgfkAgylocidRecordGroup function*/
    cgfkAgylocidRecordGroup() {
        return this.http.get('oidvercc/cgfk$agyLocIdRecordGroup');
    }
    /** This is description of the cgfkCounttypesRecordGroup function*/
    cgfkCounttypesRecordGroup() {
        return this.http.get('oidvercc/cgfk$countTypesRecordGroup');
    }
    /** This is description of the cgfkScheduledtimeRecordGroup function*/
    cgfkScheduledtimeRecordGroup() {
        return this.http.get('oidvercc/cgfk$scheduledTimeRecordGroup');
    }
    /** This is description of the updateAgencyLocationCounts function*/
    updateAgencyLocationCounts(obj) {
        return this.http.post('oidvercc/updateAgencyLocationCounts', obj);
    }
    getUserNameByCreatedUserId(createUserId){
        return this.http.get('oidvercc/getUserNameByCreatedUserId?createUserId=' + createUserId);
    }
}
