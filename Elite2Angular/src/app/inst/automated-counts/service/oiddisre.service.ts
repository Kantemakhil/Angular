import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiddisreService {
    constructor(private http: HttpService) {}
    /** This is description of the agencyCountsExecuteQuery function*/
    agencyCountsExecuteQuery(obj) {
        return this.http.post('oiddisre/agency_countsExecuteQuery',obj);
    }
    /** This is description of the agencyCountsCommit function*/
    agencyCountsCommit(obj) {
        return this.http.post('oiddisre/agencyCountsCommit', obj);
    }
    /** This is description of the cgfkDiscrepRsnRecordGroup function*/
    cgfkDiscrepRsnRecordGroup(obj) {
        return this.http.get( 'oiddisre/cgfk$discrep_rsnRecordGroup');
    }
}
