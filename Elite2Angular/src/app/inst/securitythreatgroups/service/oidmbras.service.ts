import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidmbrasService {
   constructor(private http: HttpService) { }
   /** This is description of the offenderStgAssociationsExecuteQuery function*/
   offenderStgAssociationsExecuteQuery(obj) {
      return this.http.post('oidmbras/offenderStgAssociationsExecuteQuery', obj);
   }
   /** This is description of the offenderStgAssociationsCommit function*/
   offenderStgAssociationsCommit(obj) {
      return this.http.post('oidmbras/offenderStgAssociationsCommit', obj);
   }
   /** This is description of the rgReasonCodeRecordGroup function*/
   rgReasonCodeRecordGroup() {
      return this.http.get('oidmbras/rgReasonCodeRecordGroup');
   }
}
