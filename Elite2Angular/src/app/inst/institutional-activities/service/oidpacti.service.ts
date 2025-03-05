import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidpactiService {
    programId: number;
    constructor(private http: HttpService) { }
    /** This is description of the offProgProfExecuteQuery function*/
    offProgProfExecuteQuery(obj) {
        return this.http.post('oidpacti/offProgProfExecuteQuery', obj);
    }
    /** This is description of the offProgProfCommit function*/
    offProgProfCommit(obj) {
        return this.http.post('oidpacti/offProgProfCommit', obj);
    }
    /** This is description of the vOffCourseEvntsExecuteQuery function*/
    vOffCourseEvntsExecuteQuery(obj) {
        return this.http.post('oidpacti/vOffCourseEvntsExecuteQuery', obj);
    }
    /** This is description of the vOffCourseEvntsCommit function*/
    vOffCourseEvntsCommit(obj) {
        return this.http.post('oidpacti/vOffCourseEvntsCommit', obj);
    }
    /** This is description of the offenderProgramProfiles2ExecuteQuery function*/
    offenderProgramProfileswaitExecuteQuery(obj) {
        return this.http.post('oidpacti/offenderProgramProfileswaitExecuteQuery', obj);
    }
    /** This is description of the offenderProgramProfiles2Commit function*/
    offenderProgramProfiles2Commit(obj) {
        return this.http.post('oidpacti/offenderProgramProfiles2Commit', obj);
    }
    /** This is description of the rgEstablishmentRecordGroup function*/
    rgEstablishmentRecordGroup(caseloadId) {
        return this.http.get('oidpacti/rgEstablishmentRecordGroup?caseloadId=' + caseloadId);
    }
    /** This is description of the rgServicesRecordGroup function*/
    rgServicesRecordGroup(caseloadId: string ): any {
        return this.http.get( 'oidpacti/rgServicesRecordGroup?caseloadId=' + caseloadId );
    }
    /** This is description of the rgEndReasonRecordGroup function*/
    rgEndReasonRecordGroup(obj) {
        return this.http.get('oidpacti/rgEndReasonRecordGroup');
    }
    /** This is description of the pgPsRejRsnRecordGroup function*/
    pgPsRejRsnRecordGroup(obj) {
        return this.http.get('oidpacti/pgPsRejRsnRecordGroup');
    }
    /** This is description of the rgPerformanceRecordGroup function*/
    rgPerformanceRecordGroup(obj) {
        return this.http.get('oidpacti/rgPerformanceRecordGroup');
    }
    /** This is description of the rgFilterRecordGroup function*/
    rgFilterRecordGroup(obj) {
        return this.http.get('oidpacti/rgFilterRecordGroup');
    }
    /** This is description of the rgPriorityRecordGroup function*/
    rgPriorityRecordGroup(obj) {
        return this.http.get('oidpacti/rgPriorityRecordGroup');
    }
    /** This is description of the rgDecisionRecordGroup function*/
    rgDecisionRecordGroup(obj) {
        return this.http.get('oidpacti/rgDecisionRecordGroup');
    }
    /** This is description of the rgAttendenceRecordGroup function*/
    rgAttendenceRecordGroup(obj) {
        return this.http.get('oidpacti/rgAttendenceRecordGroup');
    }
    /** This is description of the lovServices2RecordGroup function*/
    lovServices2RecordGroup(obj) {
        return this.http.get('oidpacti/lovServices2RecordGroup');
    }
    getServices() {
        return this.http.get('oidpacti/getServices');
    }
    getCourseActivity(obj) {
        return this.http.post('oidpacti/getCourseActivity', obj);
    }
    checkWaitList2(obj) {
        return this.http.post('oidpacti/checkWaitList2', obj);
    }
    checkConflict(obj) {
        return this.http.post('oidpacti/checkConflict', obj);
    }
    courseVacancy(obj) {
        return this.http.post('oidpacti/courseVacancy', obj);
    }
    getAdmissionDate(obj) {
        return this.http.post('oidpacti/getAdmissionDate', obj);
    }
    cntAsnCur(obj) {
        return this.http.post('oidpacti/cntAsnCur', obj);
    }
    assignCommit(obj) {
        return this.http.post('oidpacti/assignCommit', obj);
    }
    getProfileValue() {
        return this.http.get('oidpacti/getProfileValue');
    }
    getBookingDate(obj) {
        return this.http.post('oidpacti/getBookingDate', obj);
    }
    checkNonAssociationsData(obj) {
		return this.http.post('oidpacti/checkNonAssociationsData', obj);
	}
}
