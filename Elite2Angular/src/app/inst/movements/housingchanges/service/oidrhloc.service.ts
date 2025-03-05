import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidrhlocService {
    constructor(private http: HttpService) { }
    /** This is description of the resBlExecuteQuery function*/
    resBlExecuteQuery(obj) {
        return this.http.post('oidrhloc/resBlExecuteQuery', obj);
    }
    /** This is description of the resBlCommit function*/
    resBlCommit(obj) {
        return this.http.post('oidrhloc/resBlCommit', obj);
    }
    /** This is description of the cgfkResblagylocidRecordGroup function*/
    cgfkResblagylocidRecordGroup() {
        return this.http.get('oidrhloc/cgfk$resBlAgyLocIdRecordGroup');
    }
    /** This is description of the validateLivingUnitId function*/
    validateLivingUnitId(obj) {
        return this.http.post('oidrhloc/validateLivingUnitId', obj);
    }
    /** This is description of the getCbQuery function*/
    getCbQuery(offenderId, caseloadId) {
        return this.http.get('oidrhloc/getCbQuery?offenderId=' + offenderId + '&caseloadId=' + caseloadId);
    }
    /** This is description of the getOcFlagValue function*/
    getOcFlagValue(obj) {
        return this.http.post('oidrhloc/getOcFlagValue', obj);
    }

}
