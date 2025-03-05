import {Injectable} from '@angular/core';

import {HttpService} from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OumusersService {
  constructor(private http: HttpService) {}
  /** This is description of the staffExecuteQuery function*/
  staffExecuteQuery(obj) {
    return this.http.post('oumusers/staffExecuteQuery', obj);
  }
  /** This is description of the staffCommit function*/
  staffCommit(obj) {
    return this.http.post('oumusers/staffCommit', obj);
  }
  /** This is description of the staffAcExecuteQuery function*/
  staffAcExecuteQuery(obj) {
    return this.http.post('oumusers/staffAcExecuteQuery', obj);
  }
  /** This is description of the staffAcCommit function*/
  staffAcCommit(obj) {
    return this.http.post('oumusers/staffAcCommit', obj);
  }
  /** This is description of the staffMemberRolesExecuteQuery function*/
  staffMemberRolesExecuteQuery(obj) {
    return this.http.post('oumusers/staffMemberRolesExecuteQuery', obj);
  }
  /** This is description of the staffMemberRolesCommit function*/
  staffMemberRolesCommit(obj) {
    return this.http.post('oumusers/staffMemberRolesCommit', obj);
  }
  /** This is description of the calExecuteQuery function*/
  calExecuteQuery(obj) {
    return this.http.post('oumusers/calExecuteQuery', obj);
  }
  /** This is description of the calCommit function*/
  calCommit(obj) {
    return this.http.post('oumusers/calCommit', obj);
  }
  /** This is description of the rgStaffAssignedCaseloadRecordGroup function*/
  rgStaffAssignedCaseloadRecordGroup() {
    return this.http.get('oumusers/rgStaffAssignedCaseloadRecordGroup');
  }
  /** This is description of the rgStaffMemberRolesRoleRecordGroup function*/
  rgStaffMemberRolesRoleRecordGroup() {
    return this.http.get('oumusers/rgStaffMemberRolesRoleRecordGroup');
  }
  /** This is description of the rgStaffAcCaseloadIdRecordGroup function*/
  rgStaffAcCaseloadIdRecordGroup() {
    return this.http.get('oumusers/rgStaffAcCaseloadIdRecordGroup');
  }
  /** This is description of the calCommit function*/
  cgfkchkCalCsldAlAgyLoc(obj) {
    return this.http.post('oumusers/cgfkchkCalCsldAlAgyLoc', obj);
  }
  imageExecuteQuery(obj) {
    return this.http.post('oumusers/imageExecuteQuery', obj);
  }
  insightsExecuteQuery(obj) {
    return this.http.post('oumusers/insightsExecuteQuery', obj);
  }
  createInsightUser(obj) {
    return this.http.post('oumusers/createInsightsUser', obj);
  }
  resetPassword(obj) {
    return this.http.post('oumusers/resetPassword', obj);
  }
  updateUsersInsGroups(obj) {
    return this.http.post('oumusers/updateUsersInsGroups', obj);
  }
  removeInsightUser(obj) {
    return this.http.post('oumusers/removeInsightUser', obj);
  }
}
