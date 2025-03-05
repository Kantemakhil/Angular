import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidsiappService {
    constructor(private http: HttpService) {}
    /** This is description of the offSchExecuteQuery function*/
    offSchExecuteQuery(obj) {
        return this.http.post('oidsiapp/offSchExecuteQuery', obj);
    }
    /** This is description of the offSchCommit function*/
    offSchCommit(obj) {
        return this.http.post('oidsiapp/offSchCommit', obj);
    }
    /** This is description of the rgInternalMoveLocationsRecordGroup function*/
    rgInternalMoveLocationsRecordGroup(agyLocId) {
        return this.http.get( 'oidsiapp/rgInternalMoveLocationsRecordGroup?agyLocId=' + agyLocId);
    }
    /** This is description of the rgSchInternalScheduleRecordGroup function*/
    rgSchInternalScheduleRecordGroup() {
        return this.http.get( 'oidsiapp/rgSchInternalScheduleRecordGroup');
    }
     /** Before inserting the record it verifying whether any other schedules are assigned to the offender*/
    checkScheduleConflict(obj) {
        return this.http.post('oidsiapp/checkScheduleConflict', obj);
    }

    oidsiappNonAssociationCheck(obj){
        return this.http.post('oidsiapp/checkNonAssociations', obj);
    }
}
