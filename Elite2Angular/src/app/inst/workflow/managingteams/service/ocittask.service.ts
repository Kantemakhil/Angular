import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcittaskService {
   constructor(private http: HttpService) {}
   /** This is description of the tasksExecuteQuery function*/
   tasksExecuteQuery(obj) {
      return this.http.post('ocittask/tasksExecuteQuery', obj);
   }
   /** This is description of the tasksCommit function*/
   tasksCommit(obj) {
      return this.http.post('ocittask/tasksCommit', obj);
   }
   /** This is description of the rgStaffRecordGroup function*/
   rgStaffRecordGroup(obj) {
      return this.http.get( 'ocittask/rgStaffRecordGroup?teamCode=' + obj);
   }
    /** This is description of the rgStaffRecordGroup function*/
    getTeamId(obj) {
      return this.http.get( 'ocittask/getTeamId?teamCode=' + obj);
   }
   /** This is description of the rgCompleteStatusRecordGroup function*/
   rgCompleteStatusRecordGroup(obj) {
      return this.http.get( 'ocittask/rgCompleteStatusRecordGroup');
   }
   /** This is description of the rgTaskSubTypeRecordGroup function*/
   rgTaskSubTypeRecordGroup(obj) {
      return this.http.get('ocittask/rgTaskSubTypeRecordGroup?taskType=' + obj);
   }
   /** This is description of the rgTaskTypeRecordGroup function*/
   rgTaskTypeRecordGroup(obj) {
      return this.http.get( 'ocittask/rgTaskTypeRecordGroup');
   }
   /** This is description of the rgTeamRecordGroup function*/
   rgTeamRecordGroup(obj) {
      return this.http.get( 'ocittask/rgTeamRecordGroup');
   }
   getOffenderBookId(offenderIdDisplay, caseloadId) {
      return this.http.get( 'ocittask/getOffenderBookId?offenderIdDisplay=' + offenderIdDisplay + '&caseloadId=' + caseloadId);
   }
}
