import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
@Injectable({ providedIn: 'root' })
export class OcdotrlvService {
  constructor(private http: HttpService) { }
  /** This is description of the acCodeExecuteQuery function*/
  offendertierLevelExecuteQuery(obj) {
    return this.http.post('ocdotrlv/offendertierLevelExecuteQuery', obj);
  }
  offendertierLevelCommit(obj) {
    return this.http.post('ocdotrlv/offendertierLevelCommit', obj);
  }

  offenderTierLevesRecordGroup(caseLoadId) {
    return this.http.get('ocdotrlv/offenderTierLevesRecordGroup?caseLoadId='+caseLoadId);
  }

  offTierLevesUserIdRecordGroup(userName) {
    return this.http.get('ocdotrlv/offTierLevesUserIdRecordGroup?userName='+userName);
  }



}