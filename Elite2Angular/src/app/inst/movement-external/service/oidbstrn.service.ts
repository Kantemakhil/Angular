import { Injectable } from '@angular/core';

import { VOffenderAllSchedules } from '@inst/schedules/beans/VOffenderAllSchedules';

import { HttpService } from '@core/service/http.service';
import { VNameSearch } from '@common/beans/VNameSearch';

@Injectable({providedIn: 'root'})
export class OidbstrnService {
     offallschModel: VOffenderAllSchedules = new VOffenderAllSchedules();
     batchUpdModel: VOffenderAllSchedules = new VOffenderAllSchedules();
     offSchRowData: any[] = [];
     nameLovData: VNameSearch = new VNameSearch();
     rowIndex: any;

     constructor(private http: HttpService) { }
     /** This is description of the offAllSchExecuteQuery function*/
     offAllSchExecuteQuery(caseLoad, obj) {
          return this.http.post('oidbstrn/offAllSchExecuteQuery?caseLoad=' + caseLoad, obj);
     }
     /** This is description of the offAllSchCommit function*/
     offAllSchCommit(obj) {
          return this.http.post('oidbstrn/offAllSchCommit', obj);
     }
     /** This is description of the rgReasonRecordGroup function*/
     rgReasonRecordGroup(obj) {
          return this.http.get('oidbstrn/rgReasonRecordGroup');
     }
     /** This is description of the rgAgyLocRecordGroup function*/
     rgAgyLocRecordGroup(obj) {
          return this.http.get('oidbstrn/rgAgyLocRecordGroup');
     }
     /** This is description of the rgAllAgyLocRecordGroup function*/
     rgAllAgyLocRecordGroup(agyLocId) {
          return this.http.get('oidbstrn/rgAllAgyLocRecordGroup?agyLocId='+agyLocId);
     }
     /** This is description of the rgEscortRecordGroup function*/
     rgEscortRecordGroup(obj) {
          return this.http.get('oidbstrn/rgEscortRecordGroup');
     }
     /** This is description of the rgCancelReasonRecordGroup function*/
     rgCancelReasonRecordGroup(obj) {
          return this.http.get('oidbstrn/rgCancelReasonRecordGroup');
     }
}
