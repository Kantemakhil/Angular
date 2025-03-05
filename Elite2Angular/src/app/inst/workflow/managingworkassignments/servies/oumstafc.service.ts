import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OumstafcService {
   constructor(private http: HttpService) {}
   /** This is description of the stskExecuteQuery function*/
   stskExecuteQuery(obj) {
      return this.http.post('oumstafc/stskExecuteQuery', obj);
   }
   /** This is description of the stskCommit function*/
   stskCommit(obj) {
      return this.http.post('oumstafc/stskCommit',obj);
   }
   /** This is description of the rgStaffSkillRecordGroup function*/
   rgStaffSkillRecordGroup(obj) {
      return this.http.get( 'oumstafc/rgStaffSkillRecordGroup');
   }
   /** This is description of the rgProgramRecordGroup function*/
   rgProgramRecordGroup(obj) {
      return this.http.get( 'oumstafc/rgProgramRecordGroup');
   }
   /** This is description of the rgSubTypeRecordGroup function*/
   rgSubTypeRecordGroup(obj) {
      return this.http.get( 'oumstafc/rgSubTypeRecordGroup');
   }
}
