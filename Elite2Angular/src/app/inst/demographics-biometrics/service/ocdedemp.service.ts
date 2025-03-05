import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdedempService {
    constructor(private http: HttpService) { }
    /** This is description of the offEducationsExecuteQuery function*/
    offEducationsExecuteQuery(obj) {
        return this.http.post('ocdedemp/offEducationsExecuteQuery', obj);
    }
    /** This is description of the offEducationsCommit function*/
    offEducationsCommit(obj) {
        return this.http.post('ocdedemp/offEducationsCommit', obj);
    }
    /** This is description of the vOffEduAddrExecuteQuery function*/
    vOffEduAddrExecuteQuery(obj) {
        return this.http.post('ocdedemp/vOffEduAddrExecuteQuery', obj);
    }
    /** This is description of the offEmploymentsExecuteQuery function*/
    offEmploymentsExecuteQuery(obj) {
        return this.http.post('ocdedemp/offEmploymentsExecuteQuery', obj);
    }
    /** This is description of the offEmploymentsCommit function*/
    offEmploymentsCommit(obj) {

        return this.http.post('ocdedemp/offEmploymentsCommit', obj);
    }
    /** This is description of the vOffEmpAddrExecuteQuery function*/
    vOffEmpAddrExecuteQuery(obj) {
        return this.http.post('ocdedemp/vOffEmpAddrExecuteQuery', obj);
    }
    /** This is description of the eduSchedRgRecordGroup function*/
    eduSchedRgRecordGroup(obj) {
        return this.http.get('ocdedemp/eduSchedRgRecordGroup');
    }
    /** This is description of the payPeriodRgRecordGroup function*/
    payPeriodRgRecordGroup(obj) {
        return this.http.get('ocdedemp/payPeriodRgRecordGroup');
    }
    /** This is description of the occupationRgRecordGroup function*/
    occupationRgRecordGroup(obj) {
        return this.http.get('ocdedemp/occupationRgRecordGroup');
    }
    /** This is description of the scheduleTypeRgRecordGroup function*/
    scheduleTypeRgRecordGroup(obj) {
        return this.http.get('ocdedemp/scheduleTypeRgRecordGroup');
    }
    /** This is description of the employStsRgRecordGroup function*/
    employStsRgRecordGroup(obj) {
        return this.http.get('ocdedemp/employStsRgRecordGroup');
    }
    /** This is description of the studyAreaRgRecordGroup function*/
    studyAreaRgRecordGroup(obj) {
        return this.http.get('ocdedemp/studyAreaRgRecordGroup');
    }
    /** This is description of the eduLevelRgRecordGroup function*/
    eduLevelRgRecordGroup(obj) {
        return this.http.get('ocdedemp/eduLevelRgRecordGroup');
    }
}
