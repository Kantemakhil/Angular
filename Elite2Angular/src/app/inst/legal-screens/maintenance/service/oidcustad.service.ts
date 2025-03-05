import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({
  providedIn: 'root'
})
export class OidcustadService {

  constructor(private http: HttpService) { }

  getbookingsdata(offenderBookId) {
    return this.http.get('oidcustad/fetchBookingsData?offenderBookId=' + offenderBookId);
  }

  bookingsCommit(commitModel) {
    return this.http.post('oidcustad/bookingsdata', commitModel);
  }

  getDebitorCreditCode(code) {
    return this.http.get('oidcustad/getDebitorCreditCode?code=' + code);
  }

  getSentencedata(offenderBookId, objectType) {
    return this.http.get(`oidcustad/getSentenceData?objectType=${objectType}&offenderBookId=${offenderBookId}`);
  }

  getBookingCodes() {
    return this.http.get('oidcustad/getBookingCodes');
  }
  getSentenceCodes() {
    return this.http.get('oidcustad/getSentnceCodes');
  }

  getusagecode(code) {
    return this.http.get('oidcustad/getUsagecode?code=' + code);
  }

  caluculatedays(obj) {
    return this.http.post('oidcustad/caluculatedays', obj);
  }

  getRemissionEligibility() {
    return this.http.get('oidcustad/getRemissionEligibility');
  }

  getIntakeDetails(offenderBookId) {
    return this.http.get('oidcustad/getIntakeDetails?offenderBookId='+offenderBookId);
  }

}