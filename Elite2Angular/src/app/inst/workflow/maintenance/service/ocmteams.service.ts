import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmteamsService {
    constructor(private http: HttpService) { }
    /** This is description of the teamsExecuteQuery function*/
    teamsExecuteQuery(obj) {
        return this.http.post('ocmteams/teamsExecuteQuery', obj);
    }
    /** This is description of the teamsCommit function*/
    teamsCommit(obj) {
        return this.http.post('ocmteams/teamsCommit', obj);
    }
    /** This is description of the teamFunctionsExecuteQuery function*/
    teamFunctionsExecuteQuery(obj) {
        return this.http.post('ocmteams/teamFunctionsExecuteQuery', obj);
    }
    /** This is description of the teamFunctionsCommit function*/
    teamFunctionsCommit(obj) {
        return this.http.post('ocmteams/teamFunctionsCommit', obj);
    }
    /** This is description of the availTeamExecuteQuery function*/
    availTeamExecuteQuery(obj) {
        return this.http.post('ocmteams/availTeamExecuteQuery', obj);
    }
    availTeamActiveExecuteQuery(obj) {
        return this.http.post('ocmteams/availTeamActiveExecuteQuery', obj);
    }
    /** This is description of the teamMembersExecuteQuery function*/
    teamMembersExecuteQuery(obj) {
        return this.http.post('ocmteams/teamMembersExecuteQuery', obj);
    }
    /** This is description of the teamMembersCommit function*/
    teamMembersCommit(obj) {
        return this.http.post('ocmteams/teamMembersCommit', obj);
    }
    /** This is description of the rgTeamAreaRecordGroup function*/
    rgTeamAreaRecordGroup(obj) {
        return this.http.get('ocmteams/rgTeamAreaRecordGroup?areaType=' + obj);
    }
    /** This is description of the rgTeamsTeamCodeRecordGroup function*/
    rgTeamsTeamCodeRecordGroup() {
        return this.http.get('ocmteams/rgTeamsTeamCodeRecordGroup');
    }
    /** This is description of the rgTeamsTeamCategoryRecordGroup function*/
    rgTeamsTeamCategoryRecordGroup(obj) {
        return this.http.get('ocmteams/rgTeamsTeamCategoryRecordGroup');
    }
    /** This is description of the rgTeamsActiveFlagRecordGroup function*/
    rgTeamsActiveFlagRecordGroup(obj) {
        return this.http.get('ocmteams/rgTeamsActiveFlagRecordGroup');
    }
    /** This is description of the rgAreaTypeRecordGroup function*/
    rgAreaTypeRecordGroup(obj) {
        return this.http.get('ocmteams/rgAreaTypeRecordGroup');
    }
    /** This is description of the rgFuctionTypeRecordGroup function*/
    rgFuctionTypeRecordGroup(obj) {
        return this.http.get('ocmteams/rgFuctionTypeRecordGroup');
    }
    /** This is description of the rgAvailTeamTeamCodeRecordGroup function*/
    rgAvailTeamTeamCodeRecordGroup(obj) {
        return this.http.get('ocmteams/rgAvailTeamTeamCodeRecordGroup');
    }
    /** This is description of the rgPositionRecordGroup function*/
    rgPositionRecordGroup(obj) {
        return this.http.get('ocmteams/rgPositionRecordGroup');
    }
    /** This is description of the rgRoleRecordGroup function*/
    rgRoleRecordGroup(obj) {
        return this.http.get('ocmteams/rgRoleRecordGroup');
    }
    /** This is description of the rgAgyLocIdRecordGroup function*/
    rgAgyLocIdRecordGroup(obj) {
        return this.http.get('ocmteams/rgAgyLocIdRecordGroup');
    }
    /** This is description of the rgAdmAgyLocRecordGroup function*/
    rgAdmAgyLocRecordGroup(obj) {
        return this.http.get('ocmteams/rgAdmAgyLocRecordGroup?areaCode=' + obj);
    }
    validateTeamCode(obj) {
        return this.http.post('ocmteams/validateTeamCode', obj);
    }
    verifyTeamMembersData(obj) {
        return this.http.post('ocmteams/verifyTeamMembersData', obj);
    }
    updateAllowedCheck(caseloadId, agyLocId) {
        return this.http.get('ocmteams/updateAllowedCheck?caseloadId=' + caseloadId + '&agyLocId=' + agyLocId);
    }
    validateFunctionCode(obj) {
        return this.http.post('ocmteams/validateFunctionCode', obj);
    }
    availTeamOnCheckDeleteMaster(obj) {
        return this.http.post('ocmteams/availTeamOnCheckDeleteMaster', obj);
    }
}
