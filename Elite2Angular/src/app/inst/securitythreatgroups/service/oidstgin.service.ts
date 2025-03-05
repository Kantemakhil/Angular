import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidstginService {
   constructor(private http: HttpService) { }
   /** This is description of the agyIncExecuteQuery function*/
   agyIncExecuteQuery(obj) {
      return this.http.post('oidstgin/agyIncExecuteQuery', obj);
   }
   /** This is description of the agencyIncidentPartiesExecuteQuery function*/
   agencyIncidentPartiesExecuteQuery(obj) {
      return this.http.post('oidstgin/agencyIncidentPartiesExecuteQuery', obj);
   }
   getBookingNo(obj) {
      return this.http.get(`oidstgin/getBookingNo?offenderIdDisplay=${obj}`);
   }
}
