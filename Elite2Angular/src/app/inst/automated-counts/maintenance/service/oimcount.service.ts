import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OimcountService {
    constructor(private http: HttpService) { }
    /** This is description of the agencyLocationsExecuteQuery function*/
    agencyLocationsExecuteQuery(obj) {
        return this.http.post('oimcount/agencyLocationsExecuteQuery', obj);
    }
    /** This is description of the agencyCountTypesExecuteQuery function*/
    agencyCountTypesExecuteQuery(obj) {
        return this.http.post('oimcount/agencyCountTypesExecuteQuery', obj);
    }
    /** This is description of the agencyCountTypesCommit function*/
    agencyCountTypesCommit(obj) {
        return this.http.post('oimcount/agencyCountTypesCommit', obj);
    }
    /** This is description of the agencyReportingLocsHousExecuteQuery function*/
    agencyReportingLocsHousExecuteQuery(obj) {
        return this.http.post('oimcount/agencyReportingLocsHousExecuteQuery', obj);
    }
    /** This is description of the agencyReportingLocsHousCommit function*/
    agencyReportingLocsHousCommit(obj) {
        return this.http.post('oimcount/agencyReportingLocsHousCommit', obj);
    }
    /** This is description of the agencyReportingLocsInitExecuteQuery function*/
    agencyReportingLocsInitExecuteQuery(obj) {
        return this.http.post('oimcount/agencyReportingLocsInitExecuteQuery', obj);
    }
    /** This is description of the agencyReportingLocsInitCommit function*/
    agencyReportingLocsInitCommit(obj) {
        return this.http.post('oimcount/agencyReportingLocsInitCommit', obj);
    }
    /** This is description of the cgfkAgylocidRecordGroup function*/
    cgfkAgylocidRecordGroup(caseloadid) {
        return this.http.get('oimcount/caseloadid?caseloadid=' + caseloadid);
    }
    /** This is description of the cgfkCounttypesRecordGroup function*/
    cgfkCounttypesRecordGroup() {
        return this.http.get('oimcount/cgfk$countTypesRecordGroup');
    }
    /** This is description of the cgfkHousinglevel1RecordGroup function*/
    cgfkHousinglevel1RecordGroup(agyLocId) {
        return this.http.get('oimcount/cgfkHousingLevel1RecordGroup?agyLocId=' + agyLocId);
    }
    /** This is description of the cgfkHousinglevel2RecordGroup function*/
    cgfkHousinglevel2RecordGroup() {
        return this.http.get('oimcount/cgfk$housingLevel2RecordGroup');
    }
    /** This is description of the cgfkHousinglevel3RecordGroup function*/
    cgfkHousinglevel3RecordGroup() {
        return this.http.get('oimcount/cgfk$housingLevel3RecordGroup');
    }
    /** This is description of the cgfkInitloccodeRecordGroup function*/
    cgfkInitLocCodeRecordGroup(agyLocId) {
        return this.http.get('oimcount/cgfkInitLocCodeRecordGroup?agyLocId=' + agyLocId);
    }
    /** This is description of the agencyReportingLocsInitCommit function*/
    acctypeCheckboxChenged(obj) {
        return this.http.post('oimcount/acctypeCheckboxChenged', obj);
    }
    /** This is description of the agencyReportingLocsInitCommit function*/
    agencyReportingLocsHousWhenNewRecordInstance(obj) {
        return this.http.post('oimcount/agencyReportingLocsHousWhenNewRecordInstance', obj);
    }
    /** This is description of the cgfkHousinglevel1RecordGroup function*/
    livingUnitsQuery(agyLocId) {
        return this.http.get('oimcount/livingUnitsQuery?agyLocId=' + agyLocId);
    }
    /** This is description of the agencyReportingLocsInitCommit function*/
    agencyLocationsWhenNewRecordInstance(obj) {
        return this.http.post('oimcount/agencyLocationsWhenNewRecordInstance', obj);
    }
    agencyCountReportsCommit(obj) {
        return this.http.post('oimcount/agencyCountReportsCommit', obj);
    }
    livingUnitsQueryOne(agyLocId) {
        return this.http.get('oimcount/livingUnitsQueryOne?agyLocId=' + agyLocId);
    }
    livingUnitsQueryTwo(parentField) {
        return this.http.get('oimcount/livingUnitsQueryTwo?parentField=' + parentField);
    }
}
