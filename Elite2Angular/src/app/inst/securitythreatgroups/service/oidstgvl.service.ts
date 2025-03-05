import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidstgvlService {
      constructor(private http: HttpService) {}
      /** This is description of the stgValidationsExecuteQuery function*/
      stgValidationsExecuteQuery(obj) {
            return this.http.post('oidstgvl/stgValidationsExecuteQuery', obj);
      }
      /** This is description of the stgValidationsCommit function*/
      stgValidationsCommit(obj) {
            return this.http.post('oidstgvl/stgValidationsCommit', obj);
      }
      /** This is description of the rgActionRecordGroup function*/
      rgActionRecordGroup() {
            return this.http.get( 'oidstgvl/rgActionRecordGroup');
      }
      /** This is description of the rgDesignationRecordGroup function*/
      rgDesignationRecordGroup() {
            return this.http.get( 'oidstgvl/rgDesignationRecordGroup');
      }
      /** This is description of the rgReasonRecordGroup function*/
      rgReasonRecordGroup() {
            return this.http.get( 'oidstgvl/rgReasonRecordGroup');
      }
      /** This is description of the rgReasonRecordGroup function*/
      reviewDateData(stgId) {
            return this.http.get( 'oidstgvl/reviewDateData?stgId=' + stgId);
      }
}
