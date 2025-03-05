import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
@Injectable({providedIn: 'root'})
export class OimtgoptService {
     constructor(private http: HttpService) { }
     /** This is description of the stgHtyExecuteQuery function*/
     stgHtyExecuteQuery(obj) {
          return this.http.post('oimtgopt/stgHtyExecuteQuery', obj);
     }
     /** This is description of the stgHtyCommit function*/
     stgHtyCommit(obj) {
          return this.http.post('oimtgopt/stgHtyCommit', obj);
     }
     /** This is description of the stgHty1ExecuteQuery function*/
     stgHty1ExecuteQuery(obj) {
          return this.http.post('oimtgopt/stgHty1ExecuteQuery', obj);
     }
     /** This is description of the lNationRecordGroup function*/
     lNationRecordGroup(parentStgId) {
          return this.http.get('oimtgopt/lNationRecordGroup?parentStgId=' + parentStgId);
     }
     /** This is description of the lGangRecordGroup function*/
     lGangRecordGroup() {
          return this.http.get('oimtgopt/lGangRecordGroup');
     }
     /** This is description of the cgtewhenRadioChanged function*/
     cgtewhenRadioChanged(obj) {
          return this.http.get(`oimtgopt/cgtewhenRadioChanged?stgId=${obj}`);
     }
}
