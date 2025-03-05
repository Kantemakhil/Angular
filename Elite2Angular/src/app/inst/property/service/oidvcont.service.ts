import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidvcontService {
    constructor(private http: HttpService) { }
    /** This is description of the offConExecuteQuery function*/
    offConExecuteQuery(obj) {
        return this.http.post('oidvcont/offConExecuteQuery', obj);
    }
    /** This is description of the conTxExecuteQuery function*/
    conTxExecuteQuery(obj) {
        return this.http.post('oidvcont/conTxExecuteQuery', obj);
    }
    /** This is description of the conTxCommit function*/
    conTxCommit(obj) {
        return this.http.post('oidvcont/conTxCommit', obj);
    }
    /** This is description of the itmTxExecuteQuery function*/
    itmTxExecuteQuery(obj) {
        return this.http.post('oidvcont/itmTxExecuteQuery', obj);
    }
    /** This is description of the itmTxCommit function*/
    itmTxCommit(obj) {
        return this.http.post('oidvcont/itmTxCommit', obj);
    }
    /** This is description of the cgfkContxactioncodeRecordGroup function*/
    cgfkContxactioncodeRecordGroup(propertyContainerId) {
        return this.http.get('oidvcont/cgfkConTxActionCodeRecordGroup?propertyContainerId=' + propertyContainerId);
    }

    /** This is description of the itmTxExecuteQuery function*/
    offPItemExecuteQuery(obj) {
        return this.http.post('oidvcont/offPItemExecuteQuery', obj);
    }
    /** This is description of the itmTxExecuteQuery function*/
    updateOffenderPptyContainers(obj) {
        return this.http.post('oidvcont/updateOffenderPptyContainers', obj);
    }
}
