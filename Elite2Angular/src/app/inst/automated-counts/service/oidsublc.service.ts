import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidsublcService {
    constructor(private http: HttpService) { }
    /** This is description of the subLocCntExecuteQuery function*/
    subLocCntExecuteQuery(obj) {
        return this.http.post('oidsublc/subLocCntExecuteQuery', obj);
    }
    /** This is description of the subLocCntCommit function*/
    subLocCntCommit(obj) {
        return this.http.post('oidsublc/subLocCntCommit', obj);
    }
    /** This is description of the cgfkAgylocidRecordGroup function*/
    cgfkAgylocidRecordGroup(sessionId, caseloadId) {
        return this.http.get('oidsublc/cgfkAgyLocIdRecordGroup?sessionId=' + sessionId + '&caseloadId=' + caseloadId);
    }
    /** This is description of the cgfkCounttypesRecordGroup function*/
    cgfkCounttypesRecordGroup() {
        return this.http.get('oidsublc/cgfkCountTypesRecordGroup');
    }
    /** This is description of the cgfkSchtimeRecordGroup function*/
    cgfkSchtimeRecordGroup() {
        return this.http.get('oidsublc/cgfkSchTimeRecordGroup');
    }
    /** This is description of the cgfkHousinglevel1RecordGroup function*/
    cgfkHousinglevel1RecordGroup(countTypeCodeId) {
        return this.http.get('oidsublc/cgfkHousingLevel1RecordGroup?countTypeCodeId=' + countTypeCodeId);
    }
    /** This is description of the cgfkHousinglevel2RecordGroup function*/
    cgfkHousinglevel2RecordGroup(countTypeCodeId, livingUnitId) {
        return this.http.get('oidsublc/cgfkHousingLevel2RecordGroup?countTypeCodeId=' + countTypeCodeId + ' &livingUnitId=' + livingUnitId);
    }
    /** This is description of the cgfkHousinglevel3RecordGroup function*/
    cgfkHousinglevel3RecordGroup(countTypeCodeId, livingUnitId) {
        return this.http.get('oidsublc/cgfkHousingLevel3RecordGroup?countTypeCodeId=' + countTypeCodeId + ' &livingUnitId=' + livingUnitId);
    }
    /** This is description of the cgfkInitloccodeRecordGroup function*/
    cgfkInitloccodeRecordGroup(countTypeCodeId) {
        return this.http.get('oidsublc/cgfkInitLocCodeRecordGroup?countTypeCodeId=' + countTypeCodeId);
    }
    /** This is description of the cgfkConductedbyRecordGroup function*/
    cgfkConductedbyRecordGroup() {
        return this.http.get('oidsublc/cgfkConductedByRecordGroup');
    }
    /** This is description of the cgfkConductedby1RecordGroup function*/
    cgfkConductedby1RecordGroup() {
        return this.http.get('oidsublc/cgfkConductedByRecordGroup');
    }
    /** This is description of the cfgkRecountcodeRecordGroup function*/
    cfgkRecountcodeRecordGroup() {
        return this.http.get('oidsublc/cfgkRecountCodeRecordGroup');
    }
    /** This is description of the cgfkAgylocidRecordGroup function*/
    getHousingLevels(caseloadId) {
        return this.http.get('oidsublc/getHousingLevels?caseloadId=' + caseloadId);
    }
    /** This is description of the reSubLocCntCommit function*/
    reSubLocCntCommit(obj) {
        return this.http.post('oidsublc/reSubLocCntCommit', obj);
    }
    /** This is description of the reSubLocCntCommit function*/
    cancelReSubLocCntCommit(obj) {
        return this.http.post('oidsublc/cancelReSubLocCntCommit', obj);
    }
    getDefaultAgyLoc(caseloadId) {
        return this.http.get('oidsublc/getDefaultAgyLoc?caseloadId=' + caseloadId);
    }
}
