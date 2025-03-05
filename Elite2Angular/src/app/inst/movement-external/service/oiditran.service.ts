import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service'

@Injectable({providedIn: 'root'})
export class OiditranService {
    constructor(private http: HttpService) { }
    /** This is description of the offEmExecuteQuery function*/
    offEmExecuteQuery(caseloadId) {
        return this.http.get('oiditran/offEmExecuteQueryVoffExm?caseloadId=' + caseloadId);
    }
    /** This is description of the offEmCommit function*/
    offEmCommit(obj) {
        return this.http.post('oiditran/offEmCommit', obj);
    }
    /** This is description of the moveRsnLovRecordGroup function*/
    moveRsnLovRecordGroup() {
        return this.http.get('oiditran/moveRsnLovRecordGroup');
    }
    /** This is description of the cgfkOffemtoagylocidRecordGroup function*/
    cgfkOffemtoagylocidRecordGroup(caseloadId) {
        return this.http.get('oiditran/cgfkOffEmToAgyLocIdRecordGroup?caseloadId=' + caseloadId);
    }
    /** This is description of the findToAgyLocIdList function*/
    findToAgyLocIdList() {
        return this.http.get('oiditran/findToAgyLocIdList');
    }
    /** This is description of the offEmCommit function*/
    offBkgCommit(obj) {
        return this.http.post('oiditran/offBkgCommit', obj);
    }
    /** This is description of the getCountOfAgyInCase function*/
    getCountOfAgyInCase(caseloadId) {
        return this.http.get('oiditran/getCountOfAgyInCase?caseloadId=' + caseloadId);
    }
    offExecuteQuery(obj) {
        return this.http.post('oiditran/offExecuteQuerydata',obj);
    }

    noOfBedAvailableInTheGivenLocation(livingUnitId) {
        return this.http.get('oiditran/noOfBedAvailableInTheGivenLocation?livingUnitId=' + livingUnitId);
    }

    cgfkOffEmDspDescriptionAgyLocIdRecordGroup() {
        return this.http.get('oiditran/cgfkOffEmDspDescriptionAgyLocIdRecordGroup');
    }

    checkNonIndGangConficts(obj){
        return this.http.post('oiditran/checkNonIndGangConficts', obj);
    }

    checkAllConficts(obj) {
        return this.http.post('oiditran/checkAllConficts', obj);
    }
}
