import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';
@Injectable({providedIn: 'root'})
export class OcdalertService {
    vctRcrdIndexVal: number;
    linkedOffIndexVal : number;
    constructor(private http: HttpService) { }

    /** This is description of the alertExecuteQuery function*/
    alertExecuteQuery(obj) {
        return this.http.post('ocdalert/alertExecuteQuery', obj);
    }

    /** This is description of the alertCommit function*/
    alertCommit(obj) {
        return this.http.post('ocdalert/alertCommit', obj);
    }

    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('ocdalert/sysPflSearchSystemProfiles', obj);
    }

    /** This is description of the cgfkAlertdspdescription3RecordGroup function*/
    cgfkAlertdspdescription3RecordGroup() {
        return this.http.get('ocdalert/cgfklkpAlertAlertRefAlertc');
    }

    /** This is description of the cgfkAlertdspdescriptionRecordGroup function*/
    cgfkAlertdspdescriptionRecordGroup() {
        return this.http.get('ocdalert/cgfklkpAlertAlertRefAlertc');
    }

    /** This is description of the navigationDummyRecordGroup function*/
    navigationDummyRecordGroup() {
        return this.http.get('ocdalert/navigationDummyRecordGroup');
    }

    /** This is description of the alertPreInsertc function*/
    alertPreInsertc() {
        return this.http.get('ocdalert/alertPreInsertc');
    }

    /** This is description of the alertPostQueryvarification_curr function*/
    alertPostQueryvarification_curr(obj) {
        return this.http.post('ocdalert/alertPostQueryvarificationCurr', obj);
    }

    /** This is description of the cgwhenNewFormInstancec function*/
    cgwhenNewFormInstancec() {
        return this.http.get('ocdalert/cgwhenNewFormInstancec');
    }

    /** This is description of the cgfkchkAlertAlertRefAlertc function*/
    cgfkchkAlertAlertRefAlertc() {
        return this.http.get('ocdalert/findDescriptionbyDomain');
    }

    /** This is description of the cgfklkpAlertAlertRefAlertc function*/
    cgfklkpAlertAlertRefAlertc() {
        return this.http.get('ocdalert/cgfklkpAlertAlertRefAlertc');
    }

    /** This is description of the cgfkchkAlertAlertRefAl2c function*/
    cgfkchkAlertAlertRefAl2c() {
        return this.http.get('ocdalert/getAlertReferencesTable');
    }

    /** This is description of the cgfklkpAlertAlertRefAl2c function*/
    cgfklkpAlertAlertRefAl2c() {
        return this.http.get('ocdalert/cgfklkpAlertAlertRefAlertc');
    }

    /** This is description of the cguvchkOffAlertUk1c function*/
    cguvchkOffAlertUk1c(obj) {
        return this.http.post('ocdalert/cguvchkOffAlertUkc', obj);
    }

    /** This is description of the getBookingBeginDate function*/
    getBookingBeginDate() {
        return this.http.get('ocdalert/getBookingBeginDate');
    }

    alertDataTableQuery(vHeaderBlock) {
        return this.http.get('ocdalert/alertSearchOffenderAlerts?offenderBookId=' + vHeaderBlock);
    }

    /** This is description of the offbkgsExecuteQuery function*/
    executeQuery(offenderId) {
        return this.http.post('ocdalert/offbkgsExecuteQuery', offenderId);
    }

    /** This is description of the findAlertStatusList function*/
    findAlertStatusList() {
        return this.http.get('ocdalert/findAlertStatusList');
    }

     /** This is description of the workFlCommit function*/
    workFlCommit(obj) {
        return this.http.post('ocdalert/workFlCommit', obj);
    }
    alertDeleteChecking(){
        return this.http.get('ocdalert/alertDeleteChecking');  
    }
    alertCodechecking(){
        return this.http.get('ocdalert/alertCodeChecking');  
    }
}
