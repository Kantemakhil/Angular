import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdiplanService {
    routeUrl: any;
    oidcnoteExitFlag: boolean;
    previousExitFlag: boolean;
    butExitFlag: boolean;
    ocdnoqueFlag: boolean;
    butExitCasePlanFlag: boolean;
    constructor(private http: HttpService) {}
    /** This is description of the casPlnExecuteQuery function*/
    casPlnExecuteQuery(obj) {
        return this.http.post('ocdiplan/casPlnExecuteQuery', obj);
    }
    /** This is description of the casPlnCommit function*/
    casPlnCommit(obj) {
        return this.http.post('ocdiplan/casPlnCommit', obj);
    }
    /** This is description of the offCriNeedsExecuteQuery function*/
    offCriNeedsExecuteQuery(obj) {
        return this.http.post('ocdiplan/offCriNeedsExecuteQuery', obj);
    }
    /** This is description of the offCriNeedsCommit function*/
    offCriNeedsCommit(obj) {
        return this.http.post('ocdiplan/offCriNeedsCommit', obj);
    }
    /** This is description of the offActionPlansV1ExecuteQuery function*/
    offActionPlansV1ExecuteQuery(obj) {
        return this.http.post('ocdiplan/offActionPlansV1ExecuteQuery', obj);
    }
    /** This is description of the offActionPlansV1Commit function*/
    offActionPlansV1Commit(obj) {
        return this.http.post('ocdiplan/offActionPlansV1Commit', obj);
    }
    /** This is description of the offCaseCondsExecuteQuery function*/
    offCaseCondsExecuteQuery(obj) {
        return this.http.post('ocdiplan/offCaseCondsExecuteQuery', obj);
    }
    /** This is description of the offCaseCondsCommit function*/
    offCaseCondsCommit(obj) {
        return this.http.post('ocdiplan/offCaseCondsCommit', obj);
    }
    /** This is description of the offActionPlansV2ExecuteQuery function*/
    offActionPlansV2ExecuteQuery(obj) {
        return this.http.post('ocdiplan/offActionPlansV2ExecuteQuery', obj);
    }
    /** This is description of the offActionPlansV2Commit function*/
    offActionPlansV2Commit(obj) {
        return this.http.post('ocdiplan/offActionPlansV2Commit', obj);
    }
    /** This is description of the vSummaryCasePlanExecuteQuery function*/
    vSummaryCasePlanExecuteQuery(obj) {
        return this.http.post('ocdiplan/vSummaryCasePlanExecuteQuery', obj);
    }
    /** This is description of the rgCaseplanAssRecordGroup function*/
    rgCaseplanAssRecordGroup(obj) {
        return this.http.get( 'ocdiplan/rgCaseplanAssRecordGroup');
    }
    /** This is description of the rgCaseInfoRecordGroup function*/
    rgCaseInfoRecordGroup(obj) {
        return this.http.get( 'ocdiplan/rgCaseInfoRecordGroup');
    }
    /** This is description of the cgfkCasplndspdescriptionRecordGroup function*/
    cgfkCasplndspdescriptionRecordGroup(obj) {
        return this.http.get( 'ocdiplan/cgfk$casPlnDspDescriptionRecordGroup');
    }
    /** This is description of the cgfkCasplndspdescription4RecordGroup function*/
    cgfkCasplndspdescription4RecordGroup(obj) {
        return this.http.get( 'ocdiplan/cgfk$casPlnDspDescription4RecordGroup');
    }
    /** This is description of the cgfkCasplndspstaffnameRecordGroup function*/
    cgfkCasplndspstaffnameRecordGroup(obj) {
        return this.http.get( 'ocdiplan/cgfk$casPlnDspStaffNameRecordGroup');
    }
    /** This is description of the rgCrimNeedsStsRecordGroup function*/
    rgCrimNeedsStsRecordGroup(obj) {
        return this.http.get( 'ocdiplan/rgCrimNeedsStsRecordGroup');
    }
    /** This is description of the rgCaseworkRecordGroup function*/
    rgCaseworkRecordGroup(obj) {
        return this.http.get( 'ocdiplan/rgCaseworkRecordGroup');
    }
    /** This is description of the rgPrgCategoryRecordGroup function*/
    rgPrgCategoryRecordGroup(obj) {
        return this.http.get( 'ocdiplan/rgPrgCategoryRecordGroup');
    }
    /** This is description of the rgProgramIdRecordGroup function*/
    rgProgramIdRecordGroup(obj) {
        return this.http.get( 'ocdiplan/rgProgramIdRecordGroup');
    }
    /** This is description of the rgProgramId2RecordGroup function*/
    rgProgramId2RecordGroup(obj) {
        return this.http.get( 'ocdiplan/rgProgramId2RecordGroup');
    }
    /** This is description of the insertUpdateFlagQuery function*/
    insertUpdateFlagQuery(obj) {
        return this.http.post('ocdiplan/insertUpdateFlagQuery', obj);
    }

    workFlowExecuteQuery(obj) {
        return this.http.post('ocdiplan/workFlowExecuteQuery', obj);
    }

    getUserName(userId) {
        return this.http.get(`ocdiplan/getStaffName?userId=${userId}`);
    }
    getUserIdOfAssignedStaff(obj) {
        return this.http.post('ocdiplan/getUserIdOfAssignedStaff',obj);
    }
    getUserIdOfAssignedStaffForCpOwn(obj) {
        return this.http.post('ocdiplan/getUserIdOfAssignedStaffForCpOwn',obj);
    }
}
