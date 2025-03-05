import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidpawliService {
     constructor(private http: HttpService) {}

     getBookingDate(bookingId) {
          return this.http.get( 'oidpawli/getBookingDate?bookingId=' + bookingId);
     }

     ocdxprogOffPrgrefId() {
          return this.http.get('oidpawli/ocdxprogOffPrgrefId');

     }
     checkWaitList2(obj) {
          return this.http.post( 'oidpawli/checkWaitList2', obj);
     }
     /** This is description of the waitlistExecuteQuery function*/
     waitlistExecuteQuery(obj) {
          return this.http.post('oidpawli/waitlistExecuteQuery', obj);
     }
     /** This is description of the waitlistCommit function*/
     waitlistCommits(obj) {
          return this.http.post('oidpawli/waitlistCommits', obj);
     }

     checkAssignConflict(obj) {
          return this.http.post('oidpawli/checkAssignConflict', obj);
     }

     chkAllocated(obj) {
          return this.http.post('oidpawli/chkAllocated', obj);
     }
     backdateAttendances(obj) {
          return this.http.post('oidpawli/backdateAttendances', obj);

     }
     futureDays(obj) {
          return this.http.post('oidpawli/futureDays', obj);
     }
     /** This is description of the rgReasonRecordGroup function*/
     rgReasonRecordGroup(obj) {
          return this.http.get( 'oidpawli/rgReasonRecordGroup');
     }
     /** This is description of the rgPriorityRecordGroup function*/
     rgPriorityRecordGroup(obj) {
          return this.http.get( 'oidpawli/rgPriorityRecordGroup');
     }
     /** This is description of the rgServicesRecordGroup function*/
     rgServicesRecordGroup(obj) {
          return this.http.get( 'oidpawli/rgServicesRecordGroup');
     }
     /** This is description of the rgEstablishmentRecordGroup function*/
     rgEstablishmentRecordGroup(obj) {
          return this.http.get( 'oidpawli/rgEstablishmentRecordGroup');
     }
     /** This is description of the rgDecisionRecordGroup function*/
     rgDecisionRecordGroup(obj) {
          return this.http.get( 'oidpawli/rgDecisionRecordGroup');
     }
     /** This is description of the rgActDescRecordGroup function*/
     rgActDescRecordGroup(input) {
          return this.http.get( 'oidpawli/rgActDescRecordGroup?input=' + input);
     }

     getCourseActivity (obj) {

          return this.http.post('oidpawli/getCourseActivity', obj);
     }

     checkNonAssociations(obj) {
		return this.http.post('oidpawli/chkNonAssociation', obj);
	}
     /** This is description of the rgEstablishmentRecordGroup function*/
     rgEstablishmentRecordGroupOidpacti(caseloadId) {
          return this.http.get('oidpawli/rgEstablishmentRecordGroupOidpacti?caseloadId=' + caseloadId);
     }
     getServices() {
          return this.http.get('oidpawli/getServices');
     }

}
