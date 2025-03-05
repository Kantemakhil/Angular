import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service'

@Injectable({providedIn: 'root'})
export class OcdaworkService {
    constructor(private http: HttpService) { }
    /** This is description of the teamQueueExecuteQuery function*/
    teamQueueExecuteQuery(obj) {
        return this.http.post('ocdawork/teamQueueExecuteQuery', obj);
    }
    /** This is description of the teamQueueCommit function*/
    teamQueueCommit(obj) {
        return this.http.post('ocdawork/teamQueueCommit', obj);
    }
    /** This is description of the teamMembersExecuteQuery function*/
    teamMembersExecuteQuery(obj) {
        return this.http.post('ocdawork/teamMembersExecuteQuery', obj);
    }
    /** This is description of the teamMembersCommit function*/
    teamMembersCommit(obj) {
        return this.http.post('ocdawork/teamMembersCommit', obj);
    }
    /** This is description of the rgReasonRecordGroup function*/
    rgReasonRecordGroup() {
        return this.http.get('ocdawork/rgReasonRecordGroup');
    }
    /** This is description of the rgSexRecordGroup function*/
    rgSexRecordGroup() {
        return this.http.get('ocdawork/rgSexRecordGroup');
    }
    /** This is description of the rgWorkTypeRecordGroup function*/
    rgWorkTypeRecordGroup() {
        return this.http.get('ocdawork/rgWorkTypeRecordGroup');
    }
    /** This is description of the rgWorkSubTypeRecordGroup function*/
    rgWorkSubTypeRecordGroup() {
        return this.http.get('ocdawork/rgWorkSubTypeRecordGroup');
    }
    /** This is description of the rgWorkflowTypeRecordGroup function*/
    rgWorkflowTypeRecordGroup() {
        return this.http.get('ocdawork/rgWorkflowTypeRecordGroup');
    }
    /** This is description of the rgPositionRecordGroup function*/
    rgPositionRecordGroup() {
        return this.http.get('ocdawork/rgPositionRecordGroup');
    }
    /** This is description of the rgRoleRecordGroup function*/
    rgRoleRecordGroup() {
        return this.http.get('ocdawork/rgRoleRecordGroup');
    }
    /** This is description of the rgTeamStaffRecordGroup function*/
    rgTeamStaffRecordGroup(agyLocId) {
        return this.http.get('ocdawork/rgTeamStaffRecordGroup?agyLocId='+agyLocId);
    }
    /** This is description of the rgTeamMembersRecordGroup function*/
    rgTeamMembersRecordGroup() {
        return this.http.get('ocdawork/rgTeamMembersRecordGroup');
    }
    /** This is description of the getCompleteTask function*/
    getCompleteTask(obj) {
        return this.http.post('ocdawork/getCompleteTask', obj);
    }
}
