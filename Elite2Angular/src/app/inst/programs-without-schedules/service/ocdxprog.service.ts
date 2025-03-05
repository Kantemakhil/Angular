import { Injectable } from '@angular/core';

import { OffenderPrgObligations } from '@instprogramswithoutschedulesbeans/OffenderPrgObligations';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdxprogService {
    offprgobligationsModel: OffenderPrgObligations = new OffenderPrgObligations();
      vcrsactData: any[] = [];
    constructor(private http: HttpService) { }
    /** This is description of the offPrgObligationsExecuteQuery function*/
    offPrgObligationsExecuteQuery(obj) {
        return this.http.post('ocdxprog/offPrgObligationsExecuteQuery', obj);
    }
    /** This is description of the offPrgObligationsCommit function*/
    offPrgObligationsCommit(obj) {
        return this.http.post('ocdxprog/offPrgObligationsCommit', obj);
    }
    /** This is description of the offProgramProfilesExecuteQuery function*/
    offProgramProfilesExecuteQuery(obj) {
        return this.http.post('ocdxprog/offProgramProfilesExecuteQuery', obj);
    }
    /** This is description of the offProgramProfilesCommit function*/
    offProgramProfilesCommit(obj) {
        return this.http.post('ocdxprog/offProgramProfilesCommit', obj);
    }
    /** This is description of the rgAvailabilityCodeRecordGroup function*/
    rgAvailabilityCodeRecordGroup(obj) {
        return this.http.get('ocdxprog/rgAvailabilityCodeRecordGroup');
    }
    /** This is description of the rgProgramRecordGroup function*/
    rgProgramRecordGroup(obj) {
        return this.http.get('ocdxprog/rgProgramRecordGroup');
    }
    /** This is description of the rgEndReasonRecordGroup function*/
    rgEndReasonRecordGroup(obj) {
        return this.http.get('ocdxprog/rgEndReasonRecordGroup');
    }
    /** This is description of the currentCaseloadType function*/
    currentCaseloadType(caseloadId) {
        return this.http.get('ocdxprog/currentCaseloadType?caseloadId=' + caseloadId);
    }
    /** This is description of the offProgramPrflesUpdatePrgStatus function*/
    offProgramPrflesUpdatePrgStatus(offenderPrgObligationId, offenderBookId) {
        return this.http.get('ocdxprog/offProgramPrflesUpdatePrgStatus?offenderPrgObligationId=' + offenderPrgObligationId +
            '&offenderBookId=' + offenderBookId);
    }

    checkPrivilegeExists() {
        return this.http.get('ocdxprog/checkPrivilegeExists');
    }
    /** This is description of the offenderCaseNotesExecuteQuery function*/
    offenderCaseNotesExecuteQuery(obj) {
        return this.http.post('ocdxprog/offenderCaseNotesExecuteQuery', obj);
    }
    /** This is description of the offenderCaseNotesCommit function*/
    offenderCaseNotesCommit(obj) {
        return this.http.post('ocdxprog/offenderCaseNotesCommit', obj);
    }
    /** This is description of the rgSubTypeRecordGroup function*/
    rgSubTypeRecordGroup(obj) {
        return this.http.get('ocdxprog/rgSubTypeRecordGroup');
    }

    ocdpnoteGlobalUserAndCaseloadtype() {
        return this.http.get('ocdxprog/ocdpnoteGlobalUserAndCaseloadtype');
    }

    getModuleName(obj) {
        return this.http.post('ocdxprog/getModuleName', obj);
    }
}
