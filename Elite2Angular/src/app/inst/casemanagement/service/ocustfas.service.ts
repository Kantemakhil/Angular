import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcustfasService {
    constructor(private http: HttpService) { }
    /** This is description of the casePlansExecuteQuery function*/
    casePlansExecuteQuery(obj) {
        return this.http.post('ocustfas/casePlansExecuteQuery', obj);
    }
    /** This is description of the casePlansCommit function*/
    casePlansCommit(obj) {
        return this.http.post('ocustfas/casePlansCommit', obj);
    }
    /** This is description of the rgStaffNameRecordGroup function*/
    rgStaffNameRecordGroup(caseLoadId) {
        return this.http.get('ocustfas/rgStaffNameRecordGroup?caseLoadId=' + caseLoadId);
    }
    /** This is description of the rgStaffNameRecordGroup function*/
    agencyLocations(agyLocId) {
        return this.http.get('ocustfas/agencyLocations?agyLocId=' + agyLocId);
    }
}
