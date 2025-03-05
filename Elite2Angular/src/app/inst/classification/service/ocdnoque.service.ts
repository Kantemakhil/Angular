import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdnoqueService {
    constructor(private http: HttpService) { }
    /** This is description of the offAssExecuteQuery function*/
    offAssExecuteQuery(obj) {
        return this.http.post('ocdnoque/offAssExecuteQuery', obj);
    }
    /** This is description of the offAss1ExecuteQuery function*/
    offAss1ExecuteQuery(obj) {
        return this.http.post('ocdnoque/offAss1ExecuteQuery', obj);
    }
    /** This is description of the offAss1Commit function*/
    offAss1Commit(obj) {
        return this.http.post('ocdnoque/offAss1Commit', obj);
    }
    /** This is description of the rgAssessmentTypeIdRecordGroup function*/
    rgAssessmentTypeIdRecordGroup(programid) {
        return this.http.get('ocdnoque/rgAssessmentTypeIdRecordGroup?programid=' + programid);
    }
    /** This is description of the rgAssessCommitteCodeRecordGroup function*/
    rgAssessCommitteCodeRecordGroup() {
        return this.http.get('ocdnoque/rgAssessCommitteCodeRecordGroup');
    }
    /** This is description of the rgAgencyLocationsRecordGroup function*/
    rgAgencyLocationsRecordGroup() {
        return this.http.get('ocdnoque/rgAgencyLocationsRecordGroup');
    }
    /** This is description of the rgStaffMembersRecordGroup function*/
    rgStaffMembersRecordGroup() {
        return this.http.get('ocdnoque/rgStaffMembersRecordGroup');
    }
    /** This is description of the rgOverridedSupLevelTypeRecordGroup function*/
    rgOverridedSupLevelTypeRecordGroup(assessmentId) {
        return this.http.get('ocdnoque/rgOverridedSupLevelTypeRecordGroup?assessmentId=' + assessmentId);
    }
    /** This is description of the rgPlaceAgyLocIdRecordGroup function*/
    rgPlaceAgyLocIdRecordGroup() {
        return this.http.get('ocdnoque/rgPlaceAgyLocIdRecordGroup');
    }
    /** This is description of the rgOverrideReasonRecordGroup function*/
    rgOverrideReasonRecordGroup() {
        return this.http.get('ocdnoque/rgOverrideReasonRecordGroup');
    }
    /** This is description of the offAss1PreInsert function*/
    offAss1PreInsert(obj) {
        return this.http.post('ocdnoque/offAss1PreInsert', obj);
    }
    /** This is description of the getMaxAssessmentDateCur function*/
    getMaxAssessmentDateCur(obj) {
        return this.http.post('ocdnoque/getMaxAssessmentDateCur', obj);
    }
    rgAssessmentTypeId() {
        return this.http.get('ocdnoque/rgAssessmentTypeId');
    }
    rgAssessmentTypeIdRecordGroupWithoutProgramid() {
        return this.http.get('ocdnoque/rgAssessmentTypeIdRecordGroupWithoutProgramid');
    }
    offAssPostQuery(obj) {
        return this.http.post('ocdnoque/offAssPostQuery', obj);
    }
    scoreRange() {
        return this.http.get('ocdnoque/scoreRange');
    }
    getUserNameByCreatedUserId(createUserId){
        return this.http.get('oidvercc/getUserNameByCreatedUserId?createUserId=' + createUserId);
    }

 //   copied from OcunoqueService.ts 

     /** This is description of the assessExecuteQuery function*/
  assessExecuteQuery(obj) {
    return this.http.post('ocdnoque/assessExecuteQuery', obj);
  }
  /** This is description of the assess1ExecuteQuery function*/
  assessQuestionsExecuteQuery(obj) {
    return this.http.post('ocdnoque/assessQuestionsExecuteQuery', obj);
  }
  /** This is description of the answersExecuteQuery function*/
  answersExecuteQuery(obj) {
    return this.http.post('ocdnoque/answersExecuteQuery', obj);
  }
  /** This is description of the answersCommit function*/
  answersCommit(obj) {
    return this.http.post('ocdnoque/answersCommit', obj);
  }
  /** This is description of the rgRankRecordGroup function*/
  rgRankRecordGroup(obj) {
    return this.http.get( 'ocdnoque/rgRankRecordGroup');
  }
  /** This is description of the getCommentText function*/
  getCommentText(obj) {
    return this.http.post('ocdnoque/getCommentText', obj);
  }
  /** This is description of the assessCommitExecuteQuery function*/
  assessCommitExecuteQuery(obj) {
    return this.http.post('ocdnoque/assessCommitExecuteQuery', obj);
  }
  /** This is description of the getAssessmentScore function*/
  getAssessmentScore(obj) {
    return this.http.post('ocdnoque/getAssessmentScore', obj);
  }
}
