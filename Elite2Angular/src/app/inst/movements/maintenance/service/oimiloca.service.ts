import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OimilocaService {
  constructor(private http: HttpService) { }
  /** This is description of the intLocL1ExecuteQuery function*/
  intLocL1ExecuteQuery(obj) {
    return this.http.post('oimiloca/intLocL1ExecuteQuery', obj);
  }
  /** This is description of the intLocL1Commit function*/
  intLocL1Commit(obj) {
    return this.http.post('oimiloca/intLocL1Commit', obj);
  }
  /** This is description of the intLocL2ExecuteQuery function*/
  intLocL2ExecuteQuery(obj) {
    return this.http.post('oimiloca/intLocL2ExecuteQuery', obj);
  }
  /** This is description of the intLocL2Commit function*/
  intLocL2Commit(obj) {
    return this.http.post('oimiloca/intLocL2Commit', obj);
  }
  /** This is description of the intLocL3ExecuteQuery function*/
  intLocL3ExecuteQuery(obj) {
    return this.http.post('oimiloca/intLocL3ExecuteQuery', obj);
  }
  /** This is description of the intLocL3Commit function*/
  intLocL3Commit(obj) {
    return this.http.post('oimiloca/intLocL3Commit', obj);
  }
  /** This is description of the intLocL4ExecuteQuery function*/
  intLocL4ExecuteQuery(obj) {
    return this.http.post('oimiloca/intLocL4ExecuteQuery', obj);
  }
  /** This is description of the intLocL4Commit function*/
  intLocL4Commit(obj) {
    return this.http.post('oimiloca/intLocL4Commit', obj);
  }
  /** This is description of the rgAgyLocRecordGroup function*/
  rgAgyLocRecordGroup(obj) {
    return this.http.get('oimiloca/rgAgyLocRecordGroup');
  }
  /** This is description of the rgLevelTypeRecordGroup function*/
  rgLevelTypeRecordGroup(obj) {
    return this.http.get('oimiloca/rgLevelTypeRecordGroup');
  }
  /** This is description of the getResDescValues function*/
  getResDescValues(obj) {
    return this.http.post('oimiloca/getResDescValues', obj);
  }

  locationTypeLOVRecordGroup(obj) {
    return this.http.get('oimiloca/locationTypeLOVRecordGroup');
}
}
