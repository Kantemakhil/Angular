import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OumcpassService {
  constructor(private http: HttpService) { }
  /** This is description of the staffExecuteQuery function*/
  staffExecuteQuery(obj) {
    return this.http.post('oumcpass/staffExecuteQuery', obj);
  }
  /** This is description of the staffCommit function*/
  staffCommit(userId) {
    return this.http.get('oumcpass/staffCommit?userId=' + userId);
  }
  /** This is description of the staffAcExecuteQuery function*/
  staffAcExecuteQuery(obj) {
    return this.http.post('oumcpass/staffAcExecuteQuery', obj);
  }
  /** This is description of the navigationDummyRecordGroup function*/
  navigationDummyRecordGroup(obj) {
    return this.http.get('oumcpass/navigationDummyRecordGroup');
  }
  validatePassword(newPassword) {
    return this.http.get('oumcpass/validatePassword?newPassword=' + newPassword);
  }
  changePassword(userName, oldPassword, newPassword) {
    return this.http.get('oumcpass/changePassword?userName=' + userName + '&oldPassword=' + oldPassword + '&newPassword=' + newPassword);
  }
  authenticate(userName, password) {
    return this.http.get('oumcpass/authenticate?userName=' + userName + '&password=' + password);
  }
}
