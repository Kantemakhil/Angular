import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidcountService {
    constructor(private http: HttpService) { }
    /** This is description of the cgfkAgylocidRecordGroup function*/
    cgfkAgylocidRecordGroup() {
        return this.http.get('oidcount/cgfk$agyLocIdRecordGroup');
    }
    /** This is description of the cgfkCounttypesRecordGroup function*/
    cgfkCountTypesRecordGroup(agyLocId) {
        return this.http.get('oidcount/cgfkCountTypesRecordGroup?agyLocId=' + agyLocId);
    }
    /** This is description of the cgfkScheduledtimeRecordGroup function*/
    cgfkScheduledtimeRecordGroup(agyLocId, code) {
        return this.http.get('oidcount/cgfkScheduledTimeRecordGroup?agyLocId=' + agyLocId + '&countTypeId=' + code);
    }
    /** This is description of the getGlobalSessionId function*/
    getGlobalSessionId() {
        return this.http.get('oidcount/getGlobalSessionId');
    }
    /** This is description of the getGlobalSessionId function*/
    countLockedMoulesCursor(obj) {
        return this.http.post('oidcount/countLockedMoulesCursor', obj);
    }
    /** This is description of the initiateCountSetup function*/
    initiateCountSetup(obj) {
        return this.http.post('oidcount/initiateCountSetup', obj);
    }
    /** This is description of the getCountTypeIdFromDb function*/
    getCountTypeIdFromDb(obj) {
        return this.http.post('oidcount/getCountTypeIdFromDb', obj);
    }
    /** This is description of the deleteInitiateRecords function*/
    deleteInitiateRecords(obj) {
        return this.http.post('oidcount/deleteInitiateRecords', obj);
    }
    /** This is description of the cgwhenNewFormInstanceCgPsessionId function*/
    cgwhenNewFormInstanceCgPsessionId(caseLoadId) {
        return this.http.get('oidcount/cgwhenNewFormInstanceCgPsessionId?caseloadId=' + caseLoadId);
    }
    /** This is description of the checkRemoveDeadJobsProcedure function*/
    checkRemoveDeadJobsProcedure(sessionId) {
        return this.http.get('oidcount/checkRemoveDeadJobsProcedure?sessionId=' + sessionId);
    }
    /** This is description of the cgwhenNewFormInstanceLockedModules function*/
    cgwhenNewFormInstanceLockedModules(sessionId, caseLoadId) {
        return this.http.get('oidcount/cgwhenNewFormInstanceLockedModules?sessionId=' + sessionId + '&caseLoadId=' + caseLoadId);
    }
      /** This is description of the checkExistingCountSession function*/
      checkExistingCountSession(sessionId, caseLoadId) {
        return this.http.get('oidcount/checkExistingCountSession?sessionId=' + sessionId + '&caseLoadId=' + caseLoadId);
    }
      /** This is description of the refreshCount function*/
      refreshCount(sessionId) {
        return this.http.get('oidcount/refreshCount?sessionId=' + sessionId);
    }
     /** This is description of the refreshCountOfTempOidCount function*/
     refreshCountOfTempOidCount(sessionId) {
        return this.http.get('oidcount/refreshCountOfTempOidCount?sessionId=' + sessionId);
    }
      /** This is description of the refreshCountUserCancelledCur function*/
      refreshCountUserCancelledCur(sessionId, userId) {
        return this.http.get('oidcount/refreshCountUserCancelledCur?sessionId=' + sessionId + '&userId=' + userId);
    }

    getTimerValue() {
        return this.http.get('oidcount/getTimerValue');
    }
}
