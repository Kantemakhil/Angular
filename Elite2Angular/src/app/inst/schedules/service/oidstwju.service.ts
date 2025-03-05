import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidstwjuService {
    constructor(private http: HttpService) {}
    /** This is description of the offSchExecuteQuery function*/
    offSchExecuteQuery(obj) {
        return this.http.post('oidstwju/offSchExecuteQuery', obj);
    }
    /** This is description of the offSchCommit function*/
    offSchCommit(obj) {
        return this.http.post('oidstwju/offSchCommit', obj);
    }
    /** This is description of the offSwlExecuteQuery function*/
    offSwlExecuteQuery(obj) {
        return this.http.post('oidstwju/offSwlExecuteQuery', obj);
    }
    /** This is description of the offSwlCommit function*/
    offSwlCommit(obj) {
        return this.http.post('oidstwju/offSwlCommit', obj);
    }
    /** This is description of the rgEscortRecordGroup function*/
    rgEscortRecordGroup() {
        return this.http.get( 'oidstwju/rgEscortRecordGroup');
    }
    /** This is description of the rgAgencyLocationRecordGroup function*/
    rgAgencyLocationRecordGroup(agyLocId) {
        return this.http.get( 'oidstwju/rgAgencyLocationRecordGroup?agyLocId=' + agyLocId);
    }
    /** This is description of the rgMoveReasonRecordGroup function*/
    rgMoveReasonRecordGroup() {
        return this.http.get( 'oidstwju/rgMoveReasonRecordGroup');
    }
    /** This is description of the rgStatusRecordGroup function*/
    rgStatusRecordGroup() {
        return this.http.get( 'oidstwju/rgStatusRecordGroup');
    }
    /** This is description of the rgPriorityRecordGroup function*/
    rgPriorityRecordGroup() {
        return this.http.get( 'oidstwju/rgPriorityRecordGroup');
    }
    /** This is description of the rgCancelReasonRecordGroup function*/
    rgCancelReasonRecordGroup() {
        return this.http.get( 'oidstwju/rgCancelReasonRecordGroup');
    }
    /** This is description of the rgApprovedByRecordGroup function*/
    rgApprovedByRecordGroup(caseLoadId) {
        return this.http.get( 'oidstwju/rgApprovedByRecordGroup?caseloadId=' + caseLoadId);
    }
    /** Gets the System date */
    getCurrentDate() {
        return this.http.get('oidstwju/getCurrentDate');
    }
    /** This is description of the rgCancelReasonRecordGroup function*/
    getParentCode(obj) {
        return this.http.post( 'oidstwju/getParentCode' , obj);
    }
    /** Gets the Staff ID */
    getStaffId() {
        return this.http.get('oidstwju/getStaffId');
    }
    /** Before inserting the record it verifying whether any other schedules are assigned to the offender*/
    checkScheduleConflict(obj) {
        return this.http.post('oidstwju/checkScheduleConflict', obj);
    }
    /** Verify Offender wait schedules before deleting Offender Schedule record*/
    offSchOnCheckDeleteMaster(obj) {
        return this.http.post('oidstwju/offSchOnCheckDeleteMaster', obj);
    }
     /** This is description of the rgCancelReasonRecordGroup function*/
    showApprovedDetails(obj) {
        return this.http.post( 'oidstwju/showApprovedDetails' , obj);
    }
     /** This is description of the chkNonAssociation function*/
     chkNonAssociation(obj) {
        return this.http.post('oidstwju/chkNonAssociation', obj);
    }
    chkNonAssociationDate(obj) {
        return this.http.post('oidstwju/chkNonAssociationDate', obj);
    }
    checkScheduleConflictmsg(obj) {
        return this.http.post('oidstwju/checkScheduleConflictmsg', obj);
    }
}
