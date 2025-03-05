import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdpnoteService {
    constructor(private http: HttpService) { }
    /** This is description of the offenderCaseNotesExecuteQuery function*/
    offenderCaseNotesExecuteQuery(obj) {
        return this.http.post('ocdpnote/offenderCaseNotesExecuteQuery', obj);
    }
    /** This is description of the offenderCaseNotesCommit function*/
    offenderCaseNotesCommit(obj) {
        return this.http.post('ocdpnote/offenderCaseNotesCommit', obj);
    }
    /** This is description of the rgSubTypeRecordGroup function*/
    rgSubTypeRecordGroup(obj) {
        return this.http.get('ocdpnote/rgSubTypeRecordGroup');
    }

    ocdpnoteGlobalUserAndCaseloadtype() {
        return this.http.get('ocdpnote/ocdpnoteGlobalUserAndCaseloadtype');
    }

    getModuleName(obj) {
        return this.http.post('ocdpnote/getModuleName', obj);
    }
}
