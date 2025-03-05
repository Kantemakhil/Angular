import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OimsenotService {
    constructor(private http: HttpService) {}
    /** This is description of the assessmentsExecuteQuery function*/
    assessmentsExecuteQuery(obj) {
        return this.http.post('oimsenot/assessmentsExecuteQuery',obj);
    }
    /** This is description of the assessSectionNotificationsExecuteQuery function*/
    assessSectionNotificationsExecuteQuery(obj) {
        return this.http.post('oimsenot/assessSectionNotificationsExecuteQuery',obj);
    }
    /** This is description of the assessSectionNotificationsCommit function*/
    assessSectionNotificationsCommit(obj) {
        return this.http.post('oimsenot/assessSectionNotificationsCommit',obj);
    }
    /** This is description of the cgfkNextsectionRecordGroup function*/
    cgfkNextSectionRecordGroup(parentField1) {
        return this.http.get( 'oimsenot/cgfkNextSectionRecordGroup?parentField1=' + parentField1);
    }

    cgfkNextsectionRecordGroupOne(parentField1,assmtId){

        return this.http.get('/oimsenot/cgfkNextsectionRecordGroupOne?parentField1=' + parentField1 + '&assmtId=' + assmtId);
    }

    /** This is description of the cgfkSectioncodeRecordGroup function*/
    cgfkSectioncodeRecordGroup(assessmentId) {
        return this.http.get( 'oimsenot/cgfkSectioncodeRecordGroup?assessmentId=' + assessmentId);
    }

    /** This is description of the cgfkScoretypeRecordGroup function*/
    cgfkScoretypeRecordGroup(obj) {
        return this.http.get( 'oimsenot/cgfkscoreTypeRecordGroup');
    }
    /** This is description of the cgfkNextsectionflagRecordGroup function*/
    cgfkNextsectionflagRecordGroup(obj) {
        return this.http.get( 'oimsenot/cgfknextSectionFlagRecordGroup');
    }
}
