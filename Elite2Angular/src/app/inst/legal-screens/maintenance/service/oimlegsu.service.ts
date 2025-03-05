import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OimlegsuService {
  constructor(private http: HttpService) { }
  /** This is description of the lglUpdUsagesExecuteQuery function*/
  lglUpdUsagesExecuteQuery(obj) {
    return this.http.post('oimlegsu/lglUpdUsagesExecuteQuery', obj);
  }
  /** This is description of the lglUpdUsagesCommit function*/
  lglUpdUsagesCommit(obj) {
    return this.http.post('oimlegsu/lglUpdUsagesCommit', obj);
  }
  /** This is description of the rgLegalClassRecordGroup function*/
  rgLegalClassRecordGroup(obj) {
    return this.http.get('oimlegsu/rgLegalClassRecordGroup');
  }
  /** This is description of the rgUpdateReasonCodeRecordGroup function*/
  rgUpdateReasonCodeRecordGroup(obj) {
    return this.http.get('oimlegsu/rgUpdateReasonCodeRecordGroup');
  }
  /** This is description of the rgUpdateReasonCodeRecordGroup function*/
  postQueryData(obj) {
    return this.http.get('oimlegsu/postQueryData?updateReasonCode=' + obj);
  }
  /** This is description of the rgUpdateReasonCodeRecordGroup function*/
  deleteKeyDelRec(obj) {
    return this.http.post('oimlegsu/deleteKeyDelRec', obj);
  }
}
