import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmssvctService {
constructor(private http: HttpService) {}
/** This is description of the crsActPtyExecuteQuery function*/
crsActPtyExecuteQuery(obj) {
return this.http.post('ocmssvct/crsActPtyExecuteQuery',obj);
}
/** This is description of the crsActPtyCommit function*/
crsActPtyCommit(obj) {
return this.http.post('ocmssvct/crsActPtyCommit',obj);
}
/** This is description of the extConExecuteQuery function*/
extConExecuteQuery(obj) {
return this.http.post('ocmssvct/extConExecuteQuery',obj);
}
/** This is description of the extConCommit function*/
extConCommit(obj) {
return this.http.post('ocmssvct/extConCommit',obj);
}
/** This is description of the rgStaffNameInstRecordGroup function*/
rgStaffNameInstRecordGroup(caseloadType,providerPartyCode) {
return this.http.get( 'ocmssvct/rgStaffNameInstRecordGroup?caseloadType=' + caseloadType + '&providerPartyCode=' + providerPartyCode);
}
/** This is description of the rgStaffNameCommRecordGroup function*/
rgStaffNameCommRecordGroup(obj) {
return this.http.get( 'ocmssvct/rgStaffNameCommRecordGroup?providerId=' + obj);
}
/** This is description of the rgTeamMembersRecordGroup function*/
rgTeamMembersRecordGroup(obj) {
return this.http.get( 'ocmssvct/rgTeamMembersRecordGroup');
}
/** This is description of the rgStaffNameInstProgRecordGroup function*/
rgStaffNameInstProgRecordGroup(providerPartyCode, programId) {
return this.http.get( 'ocmssvct/rgStaffNameInstProgRecordGroup?providerPartyCode=' + providerPartyCode + '&programId=' + programId);
}
/** This is description of the rgStaffNameCommProgRecordGroup function*/
rgStaffNameCommProgRecordGroup(providerPartyId, programId) {
return this.http.get( 'ocmssvct/rgStaffNameCommProgRecordGroup?providerPartyId=' + providerPartyId + '&programId=' + programId);
}
}
