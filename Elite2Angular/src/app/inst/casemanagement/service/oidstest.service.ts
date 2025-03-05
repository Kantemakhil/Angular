import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidstestService {
    constructor(private http: HttpService) { }
    /** This is description of the subSamplExecuteQuery function*/
    subSamplExecuteQuery(obj) {
        return this.http.post('oidstest/subSamplExecuteQuery', obj);
    }
    /** This is description of the subSamplCommit function*/
    offSamplCommit(obj) {
        return this.http.post('oidstest/offSamplCommit', obj);
    }
    /** This is description of the subTestExecuteQuery function*/
    subTestExecuteQuery(obj) {
        return this.http.post('oidstest/subTestExecuteQuery', obj);
    }
    /** This is description of the subTestCommit function*/
    subTestCommit(obj) {
        return this.http.post('oidstest/subTestCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('oidstest/sysPflExecuteQuery', obj);
    }
    /** This is description of the rgWitnessRecordGroup function*/
    rgWitnessRecordGroup() {
        return this.http.get('oidstest/rgWitnessRecordGroup');
    }
    /** This is description of the rgSubTesRsltRecordGroup function*/
    rgSubTesRsltRecordGroup() {
        return this.http.get('oidstest/rgSubTesRsltRecordGroup');
    }
    /** This is description of the rgSubTesDispRecordGroup function*/
    rgSubTesDispRecordGroup() {
        return this.http.get('oidstest/rgSubTesDispRecordGroup');
    }
    /** This is description of the rgSubTesTypeRecordGroup function*/
    rgSubTesTypeRecordGroup() {
        return this.http.get('oidstest/rgSubTesTypeRecordGroup');
    }
    /** This is description of the rgSubTesRsnRecordGroup function*/
    rgSubTesRsnRecordGroup() {
        return this.http.get('oidstest/rgSubTesRsnRecordGroup');
    }
    /** This is description of the rgTakenByRecordGroup function*/
    rgTakenByRecordGroup() {
        return this.http.get('oidstest/rgTakenByRecordGroup');
    }
    /** This is description of the rgTestedByRecordGroup function*/
    rgTestedByRecordGroup() {
        return this.http.get('oidstest/rgTestedByRecordGroup');
    }
    /** This is description of the rgSubstanceRecordGroup function*/
    rgSubstanceRecordGroup() {
        return this.http.get('oidstest/rgSubstanceRecordGroup');
    }
    /** This is description of the offenderSampleSubstancesExecuteQuery function*/
    offenderSampleSubstancesExecuteQuery(obj) {
        return this.http.post('oidstest/offenderSampleSubstancesExecuteQuery', obj);
    }
    /** This is description of the setPositiveFlag function*/
    setPositiveFlag(obj) {
        return this.http.post('oidstest/setPositiveFlag', obj);
    }
    /** This is description of the getStaffId function*/
    getStaffId() {
        return this.http.get('oidstest/getStaffId');
    }

    checkDocumentDependency(obj) {
        return this.http.post('oidstest/checkDocumentDependency', obj);
    }
}
