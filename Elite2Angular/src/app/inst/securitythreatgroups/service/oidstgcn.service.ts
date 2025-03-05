import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidstgcnService {
    constructor(private http: HttpService) { }
    /** This is description of the stgCaseNotesExecuteQuery function*/
    stgCaseNotesExecuteQuery(obj) {
        return this.http.post('oidstgcn/stgCaseNotesExecuteQuery', obj);
    }
    /** This is description of the stgCaseNotesCommit function*/
    stgCaseNotesCommit(obj) {
        return this.http.post('oidstgcn/stgCaseNotesCommit', obj);
    }
    /** This is description of the rgNoteTypeRecordGroup function*/
    rgNoteTypeRecordGroup() {
        return this.http.get('oidstgcn/rgNoteTypeRecordGroup');
    }
    /** This is description of the rgNoteReasonRecordGroup function*/
    rgNoteReasonRecordGroup() {
        return this.http.get('oidstgcn/rgNoteReasonRecordGroup');
    }
    /** This is description of the getParentCodes function*/
    getParentCodes() {
        return this.http.get('oidstgcn/getParentCodes');
    }
}
