import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdrlfccService {
   constructor(private http: HttpService) { }
   /** This is description of the offagyExecuteQuery function*/
   offagyExecuteQuery(obj) {
      return this.http.post('ocdrlfcc/offagyExecuteQuery', obj);
   }
   /** This is description of the offagy1ExecuteQuery function*/
   offagy1ExecuteQuery(obj) {
      return this.http.post('ocdrlfcc/offagy1ExecuteQuery', obj);
   }
   /** This is description of the offagyCommit function*/
   offagyCommit(obj) {
      return this.http.post('ocdrlfcc/offagyCommit', obj);
   }
   /** This is description of the navigationDummyRecordGroup function*/
   navigationDummyRecordGroup(obj) {
      return this.http.get('ocdrlfcc/navigationDummyRecordGroup');
   }
   /** This is description of the cgfkOffagy1dspdescriptionRecordGroup function*/
   cgfkOffagy1dspdescriptionRecordGroup(obj) {
      return this.http.get('ocdrlfcc/cgfk$offagy1DspDescriptionRecordGroup');
   }
}
