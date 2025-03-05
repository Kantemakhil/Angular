import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiihiscoService {
    constructor(private http: HttpService) { }
    /** This is description of the agencyCountsExecuteQuery function*/
    agencyCountsExecuteQuery(obj) {
        return this.http.post('oiihisco/agencyCountsExecuteQuery', obj);
    }
    /** This is description of the agencyLocationCountsExecuteQuery function*/
    agencyLocationCountsExecuteQuery(obj) {
        return this.http.post('oiihisco/agencyLocationCountsExecuteQuery', obj);
    }
    /** This is description of the cgfkAgylocidRecordGroup function*/
    cgfkAgylocidRecordGroup(caseloadId) {
        return this.http.get('oiihisco/cgfkAgyLocIdRecordGroup?caseloadId=' + caseloadId);
    }
    /** This is description of the cgfkCounttypesRecordGroup function*/
    cgfkCounttypesRecordGroup() {
        return this.http.get('oiihisco/cgfk$countTypesRecordGroup');
    }
    /** This is description of the cgfkSchtimeRecordGroup function*/
    cgfkSchtimeRecordGroup() {
        return this.http.get('oiihisco/cgfk$schTimeRecordGroup');
    }
}
