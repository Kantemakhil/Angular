import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({
  providedIn: 'root'
})
export class OidomailService {

  constructor(private http: HttpService) { }

  getOffenderMailLogsData(obj) {
    return this.http.get('oidomail/getOffenderMailLogsData?offenderBookId=' + obj);
  }

  getOffenderMailResrtrictions(obj) {
    return this.http.get('oidomail/getOffenderMailResrtrictions?offenderBookId=' + obj);
  }

  oidomailCommonSave(obj) {
    return this.http.post('/oidomail/mailAndRestrictionCommonSave', obj);
  }
}
