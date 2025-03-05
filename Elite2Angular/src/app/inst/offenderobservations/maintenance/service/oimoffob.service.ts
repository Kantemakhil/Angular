import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OimoffobService {
    constructor(private http: HttpService) { }
    obserVationTypeCommit(obj) {
        return this.http.post('oimoffob/obserVationTypeCommit', obj);
    }

    observationTypesExecuteQuery() {
        return this.http.get('oimoffob/observationTypesExecuteQuery');
    }

    zoneDataSaveForm(obj) {
        return this.http.post('oimoffob/zoneDataSaveForm', obj);
    }
    
    getZoneDetailsExecuteQuery(obj) {
        return this.http.post('oimoffob/getZoneDetailsExecuteQuery', obj);
    }
    
    getZoneDetailsHousingExecuteQuery(obj) {
        return this.http.post('oimoffob/getZoneDetailsHousingExecuteQuery', obj);
    }
    
    zoneHousingDataCommitForm(obj) {
        return this.http.post('oimoffob/zoneHousingDataCommitForm', obj);
    }
    
    saveCharecterDetails(obj) {
        return this.http.post('oimoffob/saveCharecterDetails', obj);
    }

    /* observationCharecterExecuteQuery(obj) {
        return this.http.post('oimoffob/observationCharecterExecuteQuery', obj);
    } */

    observationCharecterExecuteQuery(obj) {
        return this.http.post('oimoffob/observationCharecterExecuteQuery', obj);
    }

    saveCommonDetails(obj) {
        return this.http.post('oimoffob/saveCommonDetails', obj);
    }

    rgAgyLocLovRecordGroup() {
        return this.http.get('oimoffob/rgunitTypeLov');
    }
    rgLevel1LovData(unitTypeValue, facility) {
        return this.http.get('oimoffob/rgLevel1LovData?unitTypeValue=' + unitTypeValue + '&facility=' + facility);
    }

    rgLevel2LovData(livigUnitId) {
        return this.http.get('oimoffob/rgLevel2LovData?livigUnitId=' + livigUnitId);
    }

    rgLevel3LovData(parentLivingUnitId) {
        return this.http.get('oimoffob/rgLevel3LovData?parentLivigUnitId=' + parentLivingUnitId);
    }

    rgLevel4LovData(parentLivingUnitId) {
        return this.http.get('oimoffob/rgLevel4LovData?parentLivigUnitId=' + parentLivingUnitId);
    }

    /** This is description of the ctlLstExecuteQuery function*/
    selectionQuery(obj) {
        return this.http.post('oimoffob/selectionQuery', obj);
    }

    oiuzohosExecuteQuery(obj) {
        return this.http.post('oimoffob/zonehousingSeleExecuteQuery', obj);
    }

    getZoneAssignedCount(obj) {
        return this.http.post('oimoffob/getZoneAssignedCount', obj);
    }

    getHousingLevels(caseloadId) {
        return this.http.get('oimoffob/getHousingLevels?caseloadId=' + caseloadId);
    }
    
}
