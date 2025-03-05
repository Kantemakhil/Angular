import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcsprogrService {
   
    constructor(private http: HttpService) {}

    rgRefCodeRecordGroup(obj) {
        return this.http.get('ocsprogr/rgRefCodeRecordGroup');
      }

  offExecQuery(offPrgStatus: any, programId: string, intProviderPartyId: string, extProviderPartyId: string, currentCaseload: string) {
    return this.http.get('ocsprogr/offExecQuery?status=' + offPrgStatus + '&programId=' + programId + '&intProviderPartyId=' + intProviderPartyId
      + '&extProviderPartyId=' + extProviderPartyId + '&currentCaseload=' + currentCaseload);
  }

  rgOffenderSentencesRecordGroupComm(obj) {
    return this.http.post('ocsprogr/rgOffenderSentencesRecordGroupComm', obj);
}

}