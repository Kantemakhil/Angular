import { Injectable } from '@angular/core';

import { VHeaderBlock } from '@commonbeans/VHeaderBlock';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidcnoteService {
    launchFlag: boolean;
    exitFlag: boolean;
    vHeaderBlockServiceObj: VHeaderBlock = new VHeaderBlock();
    exitCaseNoteFlag: boolean;
    previousExitFlag: boolean;
    butExitFlag: boolean;
    tempFlag: boolean;
    butExitCasePlanFlag: boolean;
    backButton:boolean;
constructor(private http: HttpService) { }
/** This is description of the offNotesExecuteQuery function*/
offNotesExecuteQuery(obj) {
return this.http.post('oidcnote/offNotesExecuteQuery', obj);
}
/** This is description of the offNotesCommit function*/
offNotesCommit(obj) {
return this.http.post('oidcnote/offNotesCommit', obj);
}
/** This is description of the rgnoteSourceRecordGroup function*/
rgnoteSourceRecordGroup() {
return this.http.get('oidcnote/rgnoteSourceRecordGroup');
}
/** This is description of the rgCasenoteTypeRecordGroup function*/
rgCasenoteTypeRecordGroup(caseloadType ) {
return this.http.get('oidcnote/rgCasenoteTypeRecordGroup?caseloadType=' + caseloadType);
}
/** This is description of the rgCasenoteSubtypeRecordGroup function*/
rgCasenoteSubtypeRecordGroup(caseloadType, caseNoteType) {
return this.http.get(`oidcnote/rgCasenoteSubtypeRecordGroup?caseloadType=${caseloadType}&caseNoteType=${caseNoteType}`);
}
/** This is description of the rgStaffnameRecordGroup function*/
rgStaffnameRecordGroup() {
return this.http.get('oidcnote/rgStaffnameRecordGroup');
}
checkCasenoteSubType(caseNoteType, caseNoteSubType){
    return this.http.get(`oidcnote/checkCasenoteSubType?caseNoteType=${caseNoteType}&caseNoteSubType=${caseNoteSubType}`);
}
}
