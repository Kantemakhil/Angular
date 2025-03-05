import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiustgasService {
    constructor(private http: HttpService) {}
    /** This is description of the agencyIncidentAssoTostgExecuteQuery function*/
    agencyIncidentAssoTostgExecuteQuery(obj) {
        return this.http.post('oiustgas/agencyIncidentAssoTostgExecuteQuery', obj);
    }
    /** This is description of the agencyIncidentAssoTostgCommit function*/
    agencyIncidentAssoTostgCommit(obj) {
        return this.http.post('oiustgas/agencyIncidentAssoTostgCommit', obj);
    }
    /** This is description of the rgStgRecordGroup function*/
    rgStg2RecordGroup() {
        return this.http.get( 'oiustgas/rgStgRecordGroup');
    }
    /** This is description of the rgStgORecordGroup function*/
    rgStg1RecordGroup() {
        return this.http.get( 'oiustgas/rgStgORecordGroup');
    }
    /** This is description of the rgStgLRecordGroup function*/
    rgStg3RecordGroup() {
        return this.http.get( 'oiustgas/rgStgLRecordGroup');
    }
    /** This is description of the stgGrpRecordGroup function*/
    stgGrpRecordGroup() {
        return this.http.get( 'oiustgas/stgGrpRecordGroup');
    }
}
