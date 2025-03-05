import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidallowService {
   constructor(private http: HttpService) {}
   /** This is description of the scheduledActivitiesExecuteQuery function*/
   getOffenderAllowenceExecuteQuery(obj) {
      return this.http.post('oidallow/getOffenderAllowenceExecuteQuery', obj);
   }

   offenderAllowenceDataCommit(obj) {
    return this.http.post('oidallow/offenderAllowenceDataCommit',obj);
    }

    getRateVersionData(obj) {
      return this.http.get( 'oidallow/getRateVersionData?allowanceType=' + obj);
      }

   getLastPaidDate(offenderBookId, offAllowanceId) {
      return this.http.get('oidallow/getLastPaidDate?offenderBookId=' + offenderBookId + '&offAllowanceId=' + offAllowanceId);
   }
}
