import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiipclocService {
    constructor(private http: HttpService) {}
    /** This is description of the offConExecuteQuery function*/
    offConExecuteQuery(obj) {
        return this.http.post('oiipcloc/offConExecuteQuery', obj);
    }
    /** This is description of the rgContainerCodeRecordGroup function*/
    rgContainerCodeRecordGroup() {
        return this.http.get( 'oiipcloc/rgContainerCodeRecordGroup');
    }
    /** This is description of the rgDescription2RecordGroup function*/
    rgDescriptionRecordGroup(caseloadId) {
        return this.http.get( 'oiipcloc/rgDescriptionRecordGroup?caseloadId=' + caseloadId);
    }
}
