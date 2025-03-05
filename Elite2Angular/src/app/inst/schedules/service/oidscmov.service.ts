import { Injectable } from '@angular/core';

import { CourtEvents } from '@instschedulebeans/CourtEvents';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidscmovService {
    ctrEveModelTemp: CourtEvents = new CourtEvents();
    gridIndex: any;
    crtEveUpdateList: any[] = [];
    crtEveDeleteList: any[] = [];
    constructor(private http: HttpService) { }
    /** This is description of the crtEveExecuteQuery function*/
    crtEveExecuteQuery(obj) {
     return this.http.post('oidscmov/crtEveExecuteQuery', obj);
    }
    /** This is description of the crtEveCommit function*/
    crtEveCommit(obj) {
        return this.http.post('oidscmov/crtEveCommit', obj);
    }
    /** This is description of the rgCtrlInstRecordGroup function*/
    rgCtrlInstRecordGroup(caseLoadId) {
        return this.http.get('oidscmov/rgCtrlInstRecordGroup?caseloadId=' + caseLoadId);
    }
    /** This is description of the rgCtrlReasonRecordGroup function*/
    rgCtrlReasonRecordGroup() {
        return this.http.get('oidscmov/rgCtrlReasonRecordGroup');
    }
    /** This is description of the rgCtrlCourtRecordGroup function*/
    rgCtrlCourtRecordGroup() {
        return this.http.get('oidscmov/rgCtrlCourtRecordGroup');
    }
    /** This is description of the rgCourtReaRecordGroup function*/
    rgCourtReaRecordGroup() {
        return this.http.get('oidscmov/rgCourtReaRecordGroup');
    }
    getCurrentDate() {
        return this.http.get('oidscmov/getCurrentDate');
    }
    /** Before inserting the record it verifying whether any other schedules are assigned to the offender*/
    checkScheduleConflict(obj) {
        return this.http.post('oidscmov/checkScheduleConflict', obj);
    }
    /** Retrieves offender details for the given offender display Id , global caseload id & agyloc id */
    getOffenderDetails(nbtOffDisplayId, agyLocId, caseloadId) {
        return this.http.get('oidscmov/getOffenderDetails?nbtOffDisplayId=' + nbtOffDisplayId +
         '&agyLocId=' + agyLocId + '&caseloadId=' + caseloadId);
    }


    getChkNaConflictFlag(obj) {
        return this.http.post('oidscmov/getChkNaConflictFlag',obj);
    }

    getNonAssociationWarnings(obj) {
        return this.http.post('oidscmov/checkNonAssociations',obj);
    }


}
