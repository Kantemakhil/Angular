import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidstojuService {
    constructor(private http: HttpService) {}
    /** This is description of the offSchExecuteQuery function*/
    offSchExecuteQuery(obj) {
        return this.http.post('oidstoju/offSchExecuteQuery', obj);
    }
    /** This is description of the offSchCommit function*/
    offSchCommit(obj) {
        return this.http.post('oidstoju/offSchCommit', obj);
    }
    /** This is description of the rgLocationRecordGroup function*/
    rgLocationRecordGroup() {
        return this.http.get( 'oidstoju/rgLocationRecordGroup');
    }
    /** This is description of the rgEscortRecordGroup function*/
    rgEscortRecordGroup() {
        return this.http.get( 'oidstoju/rgEscortRecordGroup');
    }
        /** Gets the System date */
    getCurrentDate() {
        return this.http.get('oidstoju/getCurrentDate');
    }
     /** Before inserting the record it verifying whether any other schedules are assigned to the offender*/
    offSchCheckScheduleConflict(obj) {
        return this.http.post('/oidstoju/offSchCheckScheduleConflict', obj);
    }
     /** This is description of the rgEventTypeSubTypeGroup function*/
    rgEventTypeSubTypeGroup() {
        return this.http.get( 'oidstoju/rgEventTypeSubTypeGroup');
    }
    /** Before inserting the record it verifying whether any other schedules are assigned to the offender*/
    offSchCheckScheduleConflictBeforeSave(obj) {
        return this.http.post( 'oidstoju/offSchCheckScheduleConflictBeforeSave', obj);
    }
}
