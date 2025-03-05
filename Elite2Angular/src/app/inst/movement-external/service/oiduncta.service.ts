import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidunctaService {
    constructor(private http: HttpService) { }
    /** This is description of the offEmExecuteQuery function*/
    offEmExecuteQuery(obj) {
        return this.http.post('oiduncta/offEmExecuteQuery', obj);
    }
    /** This is description of the offEmCommit function*/
    offEmCommit(obj) {
        return this.http.post('oiduncta/offEmCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('oiduncta/sysPflExecuteQuery', obj);
    }
    /** This is description of the cgfkOffemfromcityRecordGroup function*/
    cgfkOffemfromcityRecordGroup(obj) {
        return this.http.get('oiduncta/cgfk$offEmFromCityRecordGroup');
    }
    /** This is description of the cgfkOffemfromagylocidRecordGroup function*/
    cgfkOffemfromagylocidRecordGroup() {
        return this.http.get('oiduncta/cgfkOffEmFromAgyLocIdRecordGroup');
    }
    /** This is description of the cgfkOffemtoagylocidRecordGroup function*/
    cgfkOffemtoagylocidRecordGroup(obj) {
        return this.http.get('oiduncta/cgfk$offEmToAgyLocIdRecordGroup', obj);
    }
    /** This is description of the cgfkOffemmovementtypeRecordGroup function*/
    cgfkOffemmovementtypeRecordGroup() {
        return this.http.get('oiduncta/cgfkOffEmMovementTypeRecordGroup');
    }
    /** This is description of the cgfkOffemmovementreasoncoRecordGroup function*/
    cgfkOffemmovementreasoncoRecordGroup(movementType) {
        return this.http.get('oiduncta/cgfkOffEmMovementReasonCoRecordGroup?movementType=' + movementType);
    }
    /** This is description of the cgfkOffemtocityRecordGroup function*/
    cgfkOffemtocityRecordGroup() {
        return this.http.get('oiduncta/cgfkOffEmToCityRecordGroup');
    }

    cgfkchkOffEmOffEmAgyLoc() {
        return this.http.get('oiduncta/cgfkchkOffEmOffEmAgyLoc');
    }

    /** This is description of the rgInstitutionRecordGroup function*/
    rgInstitutionRecordGroup(caseloadId) {
        return this.http.get('oiduncta/rgInstitutionRecordGroup?caseloadId=' + caseloadId);
    }
}
