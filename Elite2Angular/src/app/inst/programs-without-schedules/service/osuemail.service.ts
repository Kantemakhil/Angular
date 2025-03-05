import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';


@Injectable({providedIn: 'root'})
export class OsuemailService {
   constructor(private http: HttpService) { }
   rgWorksRecordGroup(obj) {
      return this.http.get('osuemail/rgWorksRecordGroup?caseLoadType=' + obj);
   }
   osuemailCommit(obj) {
      return this.http.post('osuemail/createAdhocEmail', obj);
   }
   osuemailExecuteQuery(obj) {
      return this.http.post('osuemail/osuemailExecuteQuery', obj);
   }
   getOffendersDetails(offenderBookId) {
      return this.http.get('osuemail/getOffendersDetails?offenderBookId=' + offenderBookId);
   }
}
