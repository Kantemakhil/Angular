import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidremcsService {
    constructor(private http: HttpService) { }
    /** This is description of the subRemCntExecuteQuery function*/
    subRemCntExecuteQuery(obj) {
        return this.http.post('oidremcs/subRemCntExecuteQuery', obj);
    }
    /** This is description of the subRemCntCommit function*/
    subRemCntCommit(obj) {
        return this.http.post('oidremcs/subRemCntCommit', obj);
    }
    /** This is description of the cgfkHousinglevel1RecordGroup function*/
    cgfkHousinglevel1RecordGroup(countTypeId) {
        return this.http.get('oidremcs/cgfkHousingLevel1RecordGroup?countTypeId=' + countTypeId);
    }
    /** This is description of the cgfkHousinglevel2RecordGroup function*/
    cgfkHousinglevel2RecordGroup() {
        return this.http.get('oidremcs/cgfk$housingLevel2RecordGroup');
    }
    /** This is description of the cgfkHousinglevel3RecordGroup function*/
    cgfkHousingLevel3RecordGroup(countTypeId, livingUnitId) {
        return this.http.get('oidremcs/cgfkHousingLevel3RecordGroup?countTypeId=' + countTypeId + '&livingUnitId=' + livingUnitId);
    }
    /** This is description of the cgfkInitloccodeRecordGroup function*/
    cgfkInitloccodeRecordGroup(countTypeId) {
        return this.http.get('oidremcs/cgfkInitLocCodeRecordGroup?countTypeId=' + countTypeId);
    }
    /** This is description of the cgfkConductedbyRecordGroup function*/
    cgfkConductedbyRecordGroup() {
        return this.http.get('oidremcs/cgfk$conductedByRecordGroup');
    }
     /** This is description of the cgfkConductedbyRecordGroup function*/
     changeHousingLevelOne(livingUnitId) {
        return this.http.get('oidremcs/changeHousingLevelOne?livingUnitId=' + livingUnitId);
    }

    changeHousingLevelTwo(livingUnitIdOne, livingUnitIdTwo) {
        return this.http.get('oidremcs/changeHousingLevelTwo?livingUnitIdOne=' + livingUnitIdOne + '&livingUnitIdTwo=' + livingUnitIdTwo);
    }
    getInternalLocationCount(livingUnitId) {
        return this.http.get('oidremcs/getInternalLocationCount?livingUnitId=' + livingUnitId);
    }

    cgfkHousingLevel2RecordGroup(countTypeId, livingUnitId) {
        return this.http.get('oidremcs/cgfkHousingLevel2RecordGroup?countTypeId=' + countTypeId + '&livingUnitId=' + livingUnitId);
    }

    getHousingLocationLovNames(countTypeId) {
        return this.http.get('oidremcs/getHousingLocationLovNames?countTypeId=' + countTypeId);
    }

    calculateActualCount(livingUnitId) {
        return this.http.get('oidremcs/calculateActualCount?livingUnitId=' + livingUnitId);
    }
}
