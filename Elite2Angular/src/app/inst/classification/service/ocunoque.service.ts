import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcunoqueService {
  constructor(private http: HttpService) {}
  /** This is description of the assessExecuteQuery function*/
  assessExecuteQuery(obj) {
    return this.http.post('ocunoque/assessExecuteQuery', obj);
  }
  /** This is description of the assess1ExecuteQuery function*/
  assessQuestionsExecuteQuery(obj) {
    return this.http.post('ocunoque/assessQuestionsExecuteQuery', obj);
  }
  /** This is description of the answersExecuteQuery function*/
  answersExecuteQuery(obj) {
    return this.http.post('ocunoque/answersExecuteQuery', obj);
  }
  /** This is description of the answersCommit function*/
  answersCommit(obj) {
    return this.http.post('ocunoque/answersCommit', obj);
  }
  /** This is description of the rgRankRecordGroup function*/
  rgRankRecordGroup(obj) {
    return this.http.get( 'ocunoque/rgRankRecordGroup');
  }
  /** This is description of the getCommentText function*/
  getCommentText(obj) {
    return this.http.post('ocunoque/getCommentText', obj);
  }
  /** This is description of the assessCommitExecuteQuery function*/
  assessCommitExecuteQuery(obj) {
    return this.http.post('ocunoque/assessCommitExecuteQuery', obj);
  }
  /** This is description of the getAssessmentScore function*/
  getAssessmentScore(obj) {
    return this.http.post('ocunoque/getAssessmentScore', obj);
  }
}
