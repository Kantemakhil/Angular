import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OimsreqsService {
    constructor(private http: HttpService) { }
    /** This is description of the senCalcExecuteQuery function*/
    senCalcExecuteQuery(obj) {
        return this.http.post('oimsreqs/senCalcExecuteQuery', obj);
    }
    /** This is description of the senCalcCommit function*/
    senCalcCommit(obj) {
        return this.http.post('oimsreqs/senCalcCommit', obj);
    }
    /** This is description of the senTermsExecuteQuery function*/
    senTermsExecuteQuery(obj) {
        return this.http.post('oimsreqs/senTermsExecuteQuery', obj);
    }
    /** This is description of the senTermsCommit function*/
    senTermsCommit(obj) {
        return this.http.post('oimsreqs/senTermsCommit', obj);
    }
    /** This is description of the senUpdExecuteQuery function*/
    senUpdExecuteQuery(obj) {
        return this.http.post('oimsreqs/senUpdExecuteQuery', obj);
    }
    /** This is description of the senUpdCommit function*/
    senUpdCommit(obj) {
        return this.http.post('oimsreqs/senUpdCommit', obj);
    }
    /** This is description of the rgCatRecordGroup function*/
    rgCatRecordGroup(obj) {
        return this.http.get('oimsreqs/rgCatRecordGroup');
    }
    /** This is description of the rgSentRecordGroup function*/
    rgSentRecordGroup(obj) {
        return this.http.get('oimsreqs/rgSentRecordGroup');
    }
    /** This is description of the rgSvcOblRecordGroup function*/
    rgSvcOblRecordGroup(obj) {
        return this.http.get('oimsreqs/rgSvcOblRecordGroup');
    }
    /** This is description of the rgTermCodeRecordGroup function*/
    rgTermCodeRecordGroup(obj) {
        return this.http.get('oimsreqs/rgTermCodeRecordGroup');
    }
    /** This is description of the rgReasonRecordGroup function*/
    rgReasonRecordGroup(obj) {
        return this.http.get('oimsreqs/rgReasonRecordGroup');
    }
    /** This is description of the rgFunctionTypeRecordGroup function*/
    rgFunctionTypeRecordGroup(obj) {
        return this.http.get('oimsreqs/rgFunctionTypeRecordGroup');
    }
    getNbtStatusValue(obj) {
        return this.http.post('oimsreqs/getNbtStatusValue', obj);
    }
    senCalcKeyDelrec(obj) {
        return this.http.post('oimsreqs/senCalcKeyDelrec', obj);
    }
    
    custodyCommit(obj) {
        return this.http.post('oimsreqs/custodyCommit', obj);
    }
    fetchCustodyStatus(obj) {
        return this.http.post('oimsreqs/fetchCustodyStatus',obj);
    }
}
