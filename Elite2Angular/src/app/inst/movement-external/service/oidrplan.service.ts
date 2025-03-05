import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidrplanService {
    launchFlag: boolean;
    exitFlag: boolean;
    constructor(private http: HttpService) { }
    /** This is description of the releasePlansExecuteQuery function*/
    releasePlansExecuteQuery(obj) {
        return this.http.post('oidrplan/releasePlansExecuteQuery', obj);
    }
    /** This is description of the releasePlansCommit function*/
    releasePlansCommit(obj) {
        return this.http.post('oidrplan/releasePlansCommit', obj);
    }
    /** This is description of the offChecklistDetExecuteQuery function*/
    offChecklistDetExecuteQuery(obj) {
        return this.http.post('oidrplan/offChecklistDetExecuteQuery', obj);
    }
    /** This is description of the offChecklistDetCommit function*/
    offChecklistDetCommit(obj) {
        return this.http.post('oidrplan/offChecklistDetCommit', obj);
    }
    /** This is description of the rgCaseManagersRecordGroup function*/
    rgCaseManagersRecordGroup(obj) {
        return this.http.get('oidrplan/rgCaseManagersRecordGroup');
    }
    /** This is description of the rgParoleAgentsRecordGroup function*/
    rgParoleAgentsRecordGroup(obj) {
        return this.http.get('oidrplan/rgParoleAgentsRecordGroup');
    }
    /** This is description of the rgPlanStatusRecordGroup function*/
    rgPlanStatusRecordGroup(obj) {
        return this.http.get('oidrplan/rgPlanStatusRecordGroup');
    }
    /** This is description of the rgEmploymentStatusRecordGroup function*/
    rgEmploymentStatusRecordGroup(obj) {
        return this.http.get('oidrplan/rgEmploymentStatusRecordGroup');
    }
    /** This is description of the rgProposedHousingRecordGroup function*/
    rgProposedHousingRecordGroup(rootOffenderId) {
        return this.http.get('oidrplan/rgProposedHousingRecordGroup?rootOffenderId=' + rootOffenderId);
    }
    /** This is description of the rgProposedEmploymentRecordGroup function*/
    rgProposedEmploymentRecordGroup(offenderBookId) {
        return this.http.get('oidrplan/rgProposedEmploymentRecordGroup?offenderBookId=' + offenderBookId);
    }
    /** This is description of the rgChecklistAnsRecordGroup function*/
    rgChecklistAnsRecordGroup(profileType) {
        return this.http.get('oidrplan/rgChecklistAnsRecordGroup?profileType=' + profileType);
    }
    /** This is description of the rgChecklistAnsRecordGroup function*/
    rpReadyForApproval(obj) {
        return this.http.post('oidrplan/rpReadyForApproval', obj);
    }

   // copied  from OcuoccupService 

    rpOtherOccupantsExecuteQuery(obj) {
        return this.http.post('oidrplan/rpOtherOccupantsExecuteQuery', obj);
    }
    /** This is description of the rpOtherOccupantsCommit function*/
    rpOtherOccupantsCommit(obj) {
        return this.http.post('oidrplan/rpOtherOccupantsCommit', obj);
    }
    /** This is description of the rgContactedRecordGroup function*/
    rgContactedRecordGroup(obj) {
        return this.http.get( 'oidrplan/rgContactedRecordGroup');
    }
    /** This is description of the rgPersonNameRecordGroup function*/
    rgPersonNameRecordGroup(offenderBookId) {
        return this.http.get( 'oidrplan/rgPersonNameRecordGroup?offenderBookId=' + offenderBookId);
    }
    /** This is description of the rgContactTypesRecordGroup function*/
    rgContactTypesRecordGroup(obj) {
        return this.http.get( 'oidrplan/rgContactTypesRecordGroup');
    }
    /** This is description of the rgRelationshipsRecordGroup function*/
    rgRelationshipsRecordGroup(obj) {
        return this.http.get( 'oidrplan/rgRelationshipsRecordGroup');
    }
}
