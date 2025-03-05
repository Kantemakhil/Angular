import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OumacaseService {
    constructor(private http: HttpService) { }
    /** This is description of the csldExecuteQuery function*/
    executeQuery(obj) {
        return this.http.post('oumacase/executeQuery', obj);
    }
    /** This is description of the csldCommit function*/
    csldCommit(obj) {
        return this.http.post('oumacase/csldCommit', obj);
    }
    /** This is description of the csldAlExecuteQuery function*/
    alExecuteQuery(obj) {
        return this.http.post('oumacase/alExecuteQuery', obj);
    }
    /** This is description of the csldAlCommit function*/
    alCommit(obj) {
        return this.http.post('oumacase/alCommit', obj);
    }
    /** This is description of the payrollTrustRgRecordGroup function*/
    payrollTrustRgRecordGroup() {
        return this.http.get('oumacase/payrollTrustRgRecordGroup');
    }
    /** This is description of the commissaryTrustRgRecordGroup function*/
    commissaryTrustRgRecordGroup() {
        return this.http.get('oumacase/commissaryTrustRgRecordGroup');
    }
    /** This is description of the trustCommissaryRgRecordGroup function*/
    trustCommissaryRgRecordGroup() {
        return this.http.get('oumacase/trustCommissaryRgRecordGroup');
    }
    /** This is description of the communityTrustRgRecordGroup function*/
    communityTrustRgRecordGroup() {
        return this.http.get('oumacase/communityTrustRgRecordGroup');
    }
    /** This is description of the caseloadTypeRgRecordGroup function*/
    typeRgRecordGroup() {
        return this.http.get('oumacase/typeRgRecordGroup');
    }
    /** This is description of the alAgyLocIdRgRecordGroup function*/
    alAgyLocIdRgRecordGroup() {
        return this.http.get('oumacase/alAgyLocIdRgRecordGroup');
    }
    /** This is description of the checkAgency function*/
    checkAgency(obj) {
        return this.http.post('oumacase/checkAgency', obj);
    }
}
