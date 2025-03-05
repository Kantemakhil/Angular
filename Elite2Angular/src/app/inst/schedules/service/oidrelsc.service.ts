import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidrelscService {
    public isRedirect: boolean;
    public offreldetSearchModel : any;
    commentCode: any;
    constructor(private http: HttpService) { }
    /** This is description of the offRelDetExecuteQuery function*/
    offRelDetExecuteQuery(obj) {
        return this.http.post('oidrelsc/offRelDetLegalExecuteQuery', obj);
        //return this.http.post('oidrelsc/offRelDetExecuteQuery', obj);
    }
    /** This is description of the offRelDetCommit function*/
    offRelDetCommit(obj) {
        return this.http.post('oidrelsc/offRelDetCommit', obj);
    }
    /** This is description of the rgAgyLocationsRecordGroup function*/
    rgAgyLocationsRecordGroup(obj) {
        return this.http.get('oidrelsc/rgAgyLocationsRecordGroup?caseloadId=' + obj);
    }
    /** This is description of the rgDateTypeRecordGroup function*/
    rgDateTypeRecordGroup(obj) {
        return this.http.get('oidrelsc/rgDateTypeRecordGroup');
    }
    /** This is description of the rgMovementReasonsRecordGroup function*/
    rgMovementReasonsRecordGroup(obj) {
        return this.http.get('oidrelsc/rgMovementReasonsRecordGroup');
    }
    validateOffenderDisplayId(obj) {
        return this.http.post('oidrelsc/validateOffenderDisplayId', obj);
    }

    InsetWorkFlow(obj) {
        return this.http.post('oidrelsc/InsertWorkFlowId', obj);
    }

    verifyButton(obj) {
        return this.http.post('oidrelsc/verifyButton', obj);
    }
    getSelectedOffender(obj) {
        return this.http.post('oidrelsc/getOffenderList', obj);
    }


    getKeyDatesDataLovData(obj) {
        return this.http.get('oidrelsc/getKeyDatesDataLovData?domainName=' + obj);
    }
    offbkgGlobalQuery(obj) {
        return this.http.post('oidrelsc/offbkgGlobalQuery', obj);
    }
    /** This is description of the workFlCommit function*/
    workFlCommit(obj) {
        return this.http.post('oidrelsc/workFlCommit', obj);
    }

    getErdHideShowValue(obj) {
        return this.http.get( 'oidrelsc/getErdHideShowValue?code=' + obj);
        }
        updateCommentText(obj) {
            return this.http.post('oidrelsc/updatecommenttext', obj);
        }
}
