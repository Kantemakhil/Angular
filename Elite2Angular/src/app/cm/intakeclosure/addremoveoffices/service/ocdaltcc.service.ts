import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdaltccService {
       constructor(private http: HttpService) { }
       /** This is description of the offagyExecuteQuery function*/
       offagyExecuteQuery(obj) {
              return this.http.post('ocdaltcc/offagyExecuteQuery', obj);
       }
       /** This is description of the offagyCommit function*/
       offagyCommit(obj) {
              return this.http.post('ocdaltcc/offagyCommit', obj);
       }
       /** This is description of the offagy1ExecuteQuery function*/
       offagy1ExecuteQuery(obj) {
              return this.http.post('ocdaltcc/offagy1ExecuteQuery', obj);
       }
       /** This is description of the offagy1Commit function*/
       offagy1Commit(obj) {
              return this.http.post('ocdaltcc/offagy1Commit', obj);
       }
       /** This is description of the offenderStatusRecordGroup function*/
       offenderStatusRecordGroup(obj) {
              return this.http.get('ocdaltcc/offenderStatusRecordGroup');
       }
       /** This is description of the navigationDummyRecordGroup function*/
       navigationDummyRecordGroup(obj) {
              return this.http.get('ocdaltcc/navigationDummyRecordGroup');
       }
       /** This is description of the cgfkOffagy1dspdescription22RecordGroup function*/
       cgfkOffagy1DspDescription22RecordGroup(offenderBookId) {
              return this.http.get('ocdaltcc/cgfkOffagy1DspDescription22RecordGroup?offenderBookId=' + offenderBookId);
       }
       /** This is description of the cgfkOffagy1dspdescriptionRecordGroup function*/
       cgfkOffagy1dspdescriptionRecordGroup(obj) {
              return this.http.get('ocdaltcc/cgfk$offagy1DspDescriptionRecordGroup');
       }
       evntDate (obj) {
              return this.http.post('ocdaltcc/evntDate', obj);

       }
       callSingleSearch (obj) {
              return this.http.post('ocdaltcc/offagyExecuteQuery', obj);

       }
}
