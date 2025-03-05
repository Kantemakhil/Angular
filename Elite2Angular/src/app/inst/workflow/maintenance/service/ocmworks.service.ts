import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmworksService {
    constructor(private http: HttpService) { }
    /** This is description of the wfWorkTypesExecuteQuery function*/
    wfWorkTypesExecuteQuery(obj) {
        return this.http.post('ocmworks/wfWorkTypesExecuteQuery', obj);
    }
    /** This is description of the wfWorkTypesCommit function*/
    wfWorkTypesCommit(obj) {
        return this.http.post('ocmworks/wfWorkTypesCommit', obj);
    }
    /** This is description of the wfIwpTemplatesExecuteQuery function*/
    wfIwpTemplatesExecuteQuery(obj) {
        return this.http.post('ocmworks/wfIwpTemplatesExecuteQuery', obj);
    }
    /** This is description of the wfIwpTemplatesCommit function*/
    wfIwpTemplatesCommit(obj) {
        return this.http.post('ocmworks/wfIwpTemplatesCommit', obj);
    }
    /** This is description of the wfTriggersExecuteQuery function*/
    wfTriggersExecuteQuery(obj) {
        return this.http.post('ocmworks/wfTriggersExecuteQuery', obj);
    }
    /** This is description of the wfTriggersCommit function*/
    wfTriggersCommit(obj) {
        return this.http.post('ocmworks/wfTriggersCommit', obj);
    }
    /** This is description of the wfFunctionsExecuteQuery function*/
    wfFunctionsExecuteQuery(obj) {
        return this.http.post('ocmworks/wfFunctionsExecuteQuery', obj);
    }
    /** This is description of the wfFunctionsCommit function*/
    wfFunctionsCommit(obj) {
        return this.http.post('ocmworks/wfFunctionsCommit', obj);
    }
    /** This is description of the wfEmailRecipientsExecuteQuery function*/
    wfEmailRecipientsExecuteQuery(obj) {
        return this.http.post('ocmworks/wfEmailRecipientsExecuteQuery', obj);
    }
    /** This is description of the wfEmailRecipientsCommit function*/
    wfEmailRecipientsCommit(obj) {
        return this.http.post('ocmworks/wfEmailRecipientsCommit', obj);
    }
    /** This is description of the wfEmailReturnExecuteQuery function*/
    wfEmailReturnExecuteQuery(obj) {
        return this.http.post('ocmworks/wfEmailReturnExecuteQuery', obj);
    }
    /** This is description of the wfEmailReturnCommit function*/
    wfEmailReturnCommit(obj) {
        return this.http.post('ocmworks/wfEmailReturnCommit', obj);
    }
    /** This is description of the wfWorkEmailExecuteQuery function*/
    wfWorkEmailExecuteQuery(obj) {
        return this.http.post('ocmworks/wfWorkEmailExecuteQuery', obj);
    }
    /** This is description of the wfWorkEmailCommit function*/
    wfWorkEmailCommit(obj) {
        return this.http.post('ocmworks/wfWorkEmailCommit', obj);
    }
    /** This is description of the rgWorkflowTypeRecordGroup function*/
    rgWorkflowTypeRecordGroup() {
        return this.http.get('ocmworks/rgWorkflowTypeRecordGroup');
    }
    /** This is description of the rgAgyLocTypeRecordGroup function*/
    rgAgyLocTypeRecordGroup() {
        return this.http.get('ocmworks/rgAgyLocTypeRecordGroup');
    }
    /** This is description of the rgWorkTypeRecordGroup function*/
    rgWorkTypeRecordGroup() {
        return this.http.get('ocmworks/rgWorkTypeRecordGroup');
    }
    /** This is description of the rgWorkSubTypeRecordGroup function*/
    rgWorkSubTypeRecordGroup() {
        return this.http.get('ocmworks/rgWorkSubTypeRecordGroup');
    }
    /** This is description of the rgModulesRecordGroup function*/
    rgModulesRecordGroup() {
        return this.http.get('ocmworks/rgModulesRecordGroup');
    }
    /** This is description of the rgTemplatesRecordGroup function*/
    rgTemplatesRecordGroup() {
        return this.http.get('ocmworks/rgTemplatesRecordGroup');
    }
    /** This is description of the rgTriggerNameRecordGroup function*/
    rgTriggerNameRecordGroup() {
        return this.http.get('ocmworks/rgTriggerNameRecordGroup');
    }
    /** This is description of the rgFunctionRecordGroup function*/
    rgFunctionRecordGroup() {
        return this.http.get('ocmworks/rgFunctionRecordGroup');
    }
    /** This is description of the rgYnRecordGroup function*/
    rgYnRecordGroup() {
        return this.http.get('ocmworks/rgYnRecordGroup');
    }
     /** This is description of the wfEmailReturnCommit function*/
     checkdays(obj) {
        return this.http.post('ocmworks/checkdays', obj);
    }
}
