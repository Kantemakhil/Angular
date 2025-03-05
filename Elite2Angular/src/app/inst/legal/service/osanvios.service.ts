import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OsanviosService {

  constructor(private http: HttpService) { }


  retriveSentenceData(obj) {
    return this.http.post('osanvios/retriveSentenceData', obj);
  }

  offCourtEventsDataRetrieve(obj) {
    return this.http.post('osanvios/offCourtEventsDataRetrieve', obj);
  }
  appointMentsData(obj) {
    return this.http.post('osanvios/appointMentsData', obj);
  }


  hearingreasonRecordGroup(obj) {
    return this.http.get('osanvios/hearingreasonRecordGroup', obj);
  }

  crtEveCommit(obj) {
    return this.http.post('osanvios/courtEventCommit', obj);
  }

  crtEventAppointmentCommit(obj) {
    return this.http.post('osanvios/crtEventAppointmentCommit', obj);
  }

  getDefaultCancellationReason() {
    return this.http.get('osanvios/getDefaultCancellationReason');
  }
  progOutComeEecuteQuery(obj) {
    return this.http.post('osanvios/progOutComeEecuteQuery', obj);
  }
  progAppointmentEecuteQuery(obj) {
    return this.http.post('osanvios/progAppointmentEecuteQuery', obj);
  }
  comServiceEecuteQuery(obj) {
    return this.http.post('osanvios/comServiceEecuteQuery', obj);
  }

  populateLoggedStaffName() {
    return this.http.get('osanvios/populateLoggedStaffName');
}
}
