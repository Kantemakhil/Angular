import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiddpropService {
    constructor(private http: HttpService) { }
    /** This is description of the itmTxExecuteQuery function*/
    itmTxExecuteQuery(obj) {
         return this.http.post('oiddprop/itmTxExecuteQuery', obj);
    }
    /** This is description of the itmTxCommit function*/
    itmTxCommit(obj) {
        return this.http.post('oiddprop/itmTxCommit', obj);
    }
    /** This is description of the offPiExecuteQuery function*/
    offPiExecuteQuery(obj) {
        return this.http.post('oiddprop/offPiExecuteQuery', obj);
    }
    offConPiExecuteQuery(obj){
        return this.http.post('oiddprop/offConPiExecuteQuery', obj);    
    }
    /** This is description of the offPiCommit function*/
    offPiCommit(obj) {
        return this.http.post('oiddprop/offPiCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('oiddprop/sysPflExecuteQuery', obj);
    }
    /** This is description of the cgfkItmtxpropertycontainerRecordGroup function*/
    cgfkItmtxpropertycontainerRecordGroup(caseLoadId, offenderBookId) {
         return this.http.get('oiddprop/cgfkItmTxPropertyContainerRecordGroup?caseloadId=' +
         caseLoadId + '&offenderBookId=' + offenderBookId);
    }
    /** This is description of the rgDspCorporateNameRecordGroup function*/
    rgDspCorporateNameRecordGroup() {
        return this.http.get('oiddprop/rgDspCorporateNameRecordGroup');
    }
    /** This is description of the rgDisposedToPersonRecordGroup function*/
    rgDisposedToPersonRecordGroup() {
        return this.http.get('oiddprop/rgDisposedToPersonRecordGroup');
    }
    /** This is description of the cgfkItmtxfromstatuscodeRecordGroup function*/
    cgfkItmtxfromstatuscodeRecordGroup() {
        return this.http.get('oiddprop/cgfk$itmTxFromStatusCodeRecordGroup');
    }
    offConUpdateSeal(obj) {
        return this.http.post('/oidmpcon/offConUpdateSeal', obj);
    }
    offConUpdateMultipleSeal(arr) {
        return this.http.post('/oidmpcon/offConUpdateMultipleSeal', arr);
    }
    getDisposedToPersonsGroup(offenderBookId) {
        return this.http.get('oiddprop/getDisposedToPersonsGroup?offenderBookId=' +
        offenderBookId);
    }
}
