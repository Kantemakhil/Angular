import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidbutabService {
    constructor(private http: HttpService) { }
    /** This is description of the vhbExecuteQuery function*/
    vhbExecuteQuery(obj) {
        return this.http.post('oidbutab/vhbExecuteQuery', obj);
    }
    /** This is description of the vhbCommit function*/
    vhbCommit(obj) {
        return this.http.post('oidbutab/vhbCommit', obj);
    }
    /** This is description of the rgInstitutionRecordGroup function*/
    rgInstitutionRecordGroup(caseloadId) {
        return this.http.get('oidbutab/rgInstitutionRecordGroup?caseloadId=' + caseloadId);
    }
    /** This is description of the rgActiveAgencyRecordGroup function*/
    rgActiveAgencyRecordGroup(agylocId) {
        return this.http.get('/oidbutab/rgActiveAgencyRecordGroupGd?agylocId=' + agylocId);
    }
    /** This is description of the rgDirectionRecordGroup function*/
    rgDirectionRecordGroup(obj) {
        return this.http.get('oidbutab/rgDirectionRecordGroup');
    }
    /** This is description of the rgLuLevel1RecordGroup function*/
    rgLuLevel1RecordGroup(agylocId) {
        return this.http.get('oidbutab/rgLuLevel1RecordGroup?agylocId=' + agylocId);
    }
    /** This is description of the rgLuLevel2RecordGroup function*/
    rgLuLevel2RecordGroup(agylocId, livingUnitId) {
        return this.http.get('/oidbutab/rgLuLevel2RecordGroup?agylocId=' + agylocId + '&livingUnitId=' + livingUnitId);
    }
    /** This is description of the rgLuLevel3RecordGroup function*/
    rgLuLevel3RecordGroup(agylocId, livingUnitId) {
        return this.http.get('/oidbutab/rgLuLevel3RecordGroup?agylocId=' + agylocId + '&livingUnitId=' + livingUnitId);
    }
    /** This is description of the rgCityRecordGroup function*/
    rgCityRecordGroup() {
        return this.http.get('oidbutab/rgCityRecordGroup');
    }
    /** This is description of the rgReasonRecordGroup function*/
    rgReasonRecordGroup() {
        return this.http.get('oidbutab/rgReasonRecordGroup');
    }

    whenValidateItem(obj) {
        return this.http.post('oidbutab/whenValidateItem', obj);
    }
    hasLaterMovement(obj) {
        return this.http.post('oidbutab/hasLaterMovement', obj);
    }
}
