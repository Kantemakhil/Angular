import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OuisdireService {
constructor(private http: HttpService) {}
/** This is description of the vms1ExecuteQuery function*/
vms1ExecuteQuery(obj) {
return this.http.post('ouisdire/vms1ExecuteQuery',obj);
}
/** This is description of the vms1Commit function*/
vms1Commit(obj) {
return this.http.post('ouisdire/vms1Commit',obj);
}
/** This is description of the stskExecuteQuery function*/
stskExecuteQuery(obj) {
return this.http.post('ouisdire/stskExecuteQuery',obj);
}
/** This is description of the stskCommit function*/
stskCommit(obj) {
return this.http.post('ouisdire/stskCommit',obj);
}
/** This is description of the hmPhoneExecuteQuery function*/
hmPhoneExecuteQuery(obj) {
return this.http.post('ouisdire/hmPhoneExecuteQuery',obj);
}
/** This is description of the bsPhoneExecuteQuery function*/
bsPhoneExecuteQuery(obj) {
return this.http.post('ouisdire/bsPhoneExecuteQuery',obj);
}
/** This is description of the emailExecuteQuery function*/
emailExecuteQuery(obj) {
return this.http.post('ouisdire/emailExecuteQuery',obj);
}
/** This is description of the nomRegionRgRecordGroup function*/
nomRegionRgRecordGroup(obj) {
return this.http.get( 'ouisdire/nomRegionRgRecordGroup');
}
/** This is description of the cgfkStskskilltypeRecordGroup function*/
cgfkStskskilltypeRecordGroup(obj) {
return this.http.get( 'ouisdire/cgfk$stskSkillTypeRecordGroup');
}
/** This is description of the cgfkStsksubtypeRecordGroup function*/
cgfkStsksubtypeRecordGroup(subType) {
return this.http.get( 'ouisdire/cgfkStskSubTypeRecordGroup?subType=' + subType);
}
/** This is description of the navigationDummyRecordGroup function*/
navigationDummyRecordGroup(obj) {
return this.http.get( 'ouisdire/navigationDummyRecordGroup');
}
/** This is description of the cgfkVmssexcodeRecordGroup function*/
cgfkVmssexcodeRecordGroup(obj) {
return this.http.get( 'ouisdire/cgfk$vmsSexCodeRecordGroup');
}
/** This is description of the cgfkVmsagencylocationtypeRecordGroup function*/
cgfkVmsagencylocationtypeRecordGroup(obj) {
return this.http.get( 'ouisdire/cgfk$vmsAgencyLocationTypeRecordGroup');
}
/** This is description of the cgfkVmsagylocidRecordGroup function*/
cgfkVmsagylocidRecordGroup(obj) {
return this.http.get( 'ouisdire/cgfk$vmsAgyLocIdRecordGroup');
}
/** This is description of the cgfkVmscityRecordGroup function*/
cgfkVmscityRecordGroup(obj) {
return this.http.get( 'ouisdire/cgfk$vmsCityRecordGroup');
}
/** This is description of the cgfkVmsscheduletypeRecordGroup function*/
cgfkVmsscheduletypeRecordGroup(obj) {
return this.http.get( 'ouisdire/cgfk$vmsScheduleTypeRecordGroup');
}
/** This is description of the cgfkVmspositionRecordGroup function*/
cgfkVmspositionRecordGroup(obj) {
return this.http.get( 'ouisdire/cgfk$vmsPositionRecordGroup');
}
/** This is description of the cgfkVmsroleRecordGroup function*/
cgfkVmsroleRecordGroup(obj) {
return this.http.get( 'ouisdire/cgfk$vmsRoleRecordGroup');
}
}
