import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidmbrdtService {
    viewBtnFlag: boolean;
    assessmentFlag: boolean;
    constructor(private http: HttpService) { }
    /** This is description of the offenderAssessmentsExecuteQuery function*/
    offenderAssessmentsExecuteQuery(obj) {
        return this.http.post('oidmbrdt/offenderAssessmentsExecuteQuery', obj);
    }
    /** This is description of the offenderStgAffiliationsExecuteQuery function*/
    offenderStgAffiliationsExecuteQuery(obj) {
        return this.http.post('oidmbrdt/offenderStgAffiliationsExecuteQuery', obj);
    }
    /** This is description of the offenderStgAffiliationsCommit function*/
    offenderStgAffiliationsCommit(obj) {
        return this.http.post('oidmbrdt/offenderStgAffiliationsCommit', obj);
    }
    /** This is description of the offenderStgDetailsExecuteQuery function*/
    offenderStgDetailsExecuteQuery(obj) {
        return this.http.post('oidmbrdt/offenderStgDetailsExecuteQuery', obj);
    }
    /** This is description of the offenderStgDetailsCommit function*/
    offenderStgDetailsCommit(obj) {
        return this.http.post('oidmbrdt/offenderStgDetailsCommit', obj);
    }
    /** This is description of the formAccessibleFormsExecuteQuery function*/
    formAccessibleFormsExecuteQuery(offenderBookId, offenderId) {
        return this.http.get('oidmbrdt/formAccessibleFormsExecuteQuery?offenderBookId=' + offenderBookId + '&offenderId=' + offenderId);
    }
    /** This is description of the rgGroupRecordGroup function*/
    rgGroupRecordGroup() {
        return this.http.get('oidmbrdt/rgGroupRecordGroup');
    }
    /** This is description of the rgReasonRecordGroup function*/
    rgReasonRecordGroup() {
        return this.http.get('oidmbrdt/rgReasonRecordGroup');
    }
    /** This is description of the rgExpReasonRecordGroup function*/
    rgExpReasonRecordGroup() {
        return this.http.get('oidmbrdt/rgExpReasonRecordGroup');
    }
    /** This is description of the rgStg1RecordGroup function*/
    rgStg1RecordGroup() {
        return this.http.get('oidmbrdt/rgStg1RecordGroup');
    }
    /** This is description of the rgStg2RecordGroup function*/
    rgStg2RecordGroup() {
        return this.http.get('oidmbrdt/rgStg2RecordGroup');
    }
    /** This is description of the rgStg3RecordGroup function*/
    rgStg3RecordGroup() {
        return this.http.get('oidmbrdt/rgStg3RecordGroup');
    }
    /** This is description of the rgStg3RecordGroup function*/
    populateRg() {
        return this.http.get('oidmbrdt/populateRg');
    }
    /** This is description of the offenderStgDetailsCommit function*/
    checkGroupFlag(obj) {
        return this.http.post('oidmbrdt/checkGroupFlag', obj);
    }
}
