import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdtworkService {
    constructor(private http: HttpService) {}
    /** This is description of the staffQueueExecuteQuery function*/
    staffQueueExecuteQuery(obj) {
        return this.http.post('ocdtwork/staffQueueExecuteQuery', obj);
    }
    /** This is description of the staffQueueCommit function*/
    staffQueueCommit(obj) {
        return this.http.post('ocdtwork/staffQueueCommit', obj);
    }
    /** This is description of the staffMemoQueueExecuteQuery function*/
    staffMemoQueueExecuteQuery(obj) {
        return this.http.post('ocdtwork/staffMemoQueueExecuteQuery', obj);
    }
    /** This is description of the staffMemoQueueCommit function*/
    staffMemoQueueCommit(obj) {
        return this.http.post('ocdtwork/staffMemoQueueCommit', obj);
    }
    /** This is description of the teamMembersExecuteQuery function*/
    teamMembersExecuteQuery(obj) {
        return this.http.post('ocdtwork/teamMembersExecuteQuery', obj);
    }
    /** This is description of the teamMembersCommit function*/
    teamMembersCommit(obj) {
        return this.http.post('ocdtwork/teamMembersCommit', obj);
    }
    /** This is description of the rgReasonRecordGroup function*/
    rgReasonRecordGroup(obj) {
        return this.http.get( 'ocdtwork/rgReasonRecordGroup');
    }
    /** This is description of the rgCompletedRecordGroup function*/
    rgCompletedRecordGroup(obj) {
        return this.http.get( 'ocdtwork/rgCompletedRecordGroup');
    }
    /** This is description of the cgfkCrtmvtmpagylocidRecordGroup function*/
    cgfkCrtmvtmpagylocidRecordGroup(obj) {
        return this.http.get( 'ocdtwork/cgfk$crtMvTmpAgyLocIdRecordGroup');
    }
    /** This is description of the rgSexRecordGroup function*/
    rgSexRecordGroup(obj) {
        return this.http.get( 'ocdtwork/rgSexRecordGroup');
    }
    /** This is description of the rgWorkTypeRecordGroup function*/
    rgWorkTypeRecordGroup(obj) {
        return this.http.get( 'ocdtwork/rgWorkTypeRecordGroup');
    }
    /** This is description of the rgWorkSubTypeRecordGroup function*/
    rgWorkSubTypeRecordGroup(obj) {
        return this.http.get( 'ocdtwork/rgWorkSubTypeRecordGroup');
    }
    /** This is description of the rgPositionRecordGroup function*/
    rgPositionRecordGroup(obj) {
        return this.http.get( 'ocdtwork/rgPositionRecordGroup');
    }
    /** This is description of the rgRoleRecordGroup function*/
    rgRoleRecordGroup(obj) {
        return this.http.get( 'ocdtwork/rgRoleRecordGroup');
    }
    /** This is description of the rgTeamStaffRecordGroup function*/
    rgTeamStaffRecordGroup(obj) {
        return this.http.get( 'ocdtwork/rgTeamStaffRecordGroup');
    }
    /** This is description of the rgStaffSearchRecordGroup function*/
    rgStaffSearchRecordGroup(obj) {
        return this.http.get( 'ocdtwork/rgStaffSearchRecordGroup');
    }
}
