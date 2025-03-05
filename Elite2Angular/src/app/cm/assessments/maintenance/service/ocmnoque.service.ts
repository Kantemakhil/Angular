import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmnoqueService {
  constructor(private http: HttpService) { }
  /** This is description of the assessExecuteQuery function*/
  assessExecuteQuery(obj) {
    return this.http.post('ocmnoque/assessExecuteQuery', obj);
  }
  /** This is description of the assessCommit function*/
  assessCommit(obj) {
    return this.http.post('ocmnoque/assessCommit', obj);
  }
  /** This is description of the assSectExecuteQuery function*/
  assSectExecuteQuery(assessmentId) {
    return this.http.get(`ocmnoque/assSectExecuteQuery?assessmentId= ${assessmentId}`);
  }

  validateCaseLoad(assessmentId) {
    return this.http.get(`ocmnoque/validateCaseLoad?assessmentId= ${assessmentId}`);
  }

  /* checkAssesRelations(assessmentId) {
   return this.http.get(`ocmnoque/checkAssesRelations?assessmentId= ${assessmentId}`);
  } */
  assessKeyDeleteRec(assessmentId) {
    return this.http.get(`ocmnoque/assessKeyDeleteRec?assessmentId= ${assessmentId}`);
  }

  assessResKeyDeleteRec(obj) {
    return this.http.post('ocmnoque/assessKeyDeleteRec', obj);
  }

  /** This is description of the assQueExecuteQuery function*/
  assQueExecuteQuery(obj) {
    return this.http.post('ocmnoque/assQueExecuteQuery', obj);
  }
  /** This is description of the assAns2ExecuteQuery function*/
  assAnsExecuteQuery(obj) {
    return this.http.post('ocmnoque/assAnsExecuteQuery', obj);
  }
  /** This is description of the assResExecuteQuery function*/
  assResExecuteQuery(obj) {
    return this.http.post('ocmnoque/assResExecuteQuery', obj);
  }
  /** This is description of the assResCommit function*/
  assResCommit(obj) {
    return this.http.post('ocmnoque/assResCommit', obj);
  }
  /** This is description of the rgCaseloadTypeRecordGroup function*/
  rgCaseloadTypeRecordGroup(obj) {
    return this.http.get('ocmnoque/rgCaseloadTypeRecordGroup');
  }

  getDefaultAssessmentType() {
    return this.http.get('ocmnoque/getDefaultAssessmentType');
  }

  rgBookMarkRecordGroup(obj) {
    return this.http.get('ocmnoque/rgBookMarkRecordGroup');
  }
}
