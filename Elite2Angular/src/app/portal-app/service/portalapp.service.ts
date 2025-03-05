import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class PortalAppService {
    
    private messageSubject = new Subject<any>();
    private rowSubject = new Subject<any>();

  constructor(private http: HttpService) { }

  getAllNewBookings() {
      return this.http.get('portalapp/allbookings');
  }
  
  getAllScheduleNewBookings() {
      return this.http.get('portalapp/allSchedulebookings');
  }
  getAllNonPendingBookings() {
      return this.http.get('portalapp/nonPendingBookings');
  }
  
  getAllNonPendingLegals() {
      return this.http.get('portalapp/failedLegals');
  }
  
  
  getOffenderHeaders(offendrIds) {
      return this.http.get('portalapp/offenderInfo?offenderId='+offendrIds);
  }
  
  rejectPersonAdmit(rejectionReason) {
      return this.http.post('portalapp/rejectPerson', rejectionReason);
  }
  
  updatePersonStatus(offenderInfo) {
      return this.http.post('portalapp/updatePersonStatus',offenderInfo);
  }
  
  updateScheduleStatus(courtSchedule) {
      return this.http.post('portalapp/scheduleOffender',courtSchedule);
  }
  
  searchMatchedPerson(offenderInfo) {
      return this.http.post('portalapp/searchMatches', offenderInfo)
  }
  
  get messageObservable(): Observable<any> {
      return this.messageSubject.asObservable();
  }

  set showMessage(message: any) {
      this.messageSubject.next(message);
  }
  
  get rowUpdateObservable(): Observable<any> {
      return this.rowSubject.asObservable();
  }

  set showUpdatedRow(gridUpdate: any) {
      this.rowSubject.next(gridUpdate);
  }

}
