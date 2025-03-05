import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtstastaService {
    constructor(private http: HttpService) { }
    /** This is description of the acCodeExecuteQuery function*/
    acCodeExecuteQuery(obj) {
        return this.http.post('otstasta/acCodeExecuteQuery', obj);
    }
    /** This is description of the acCodeCommit function*/
    acCodeCommit(obj) {
        return this.http.post('otstasta/acCodeCommit', obj);
    }
    /** This is description of the offBkg1ExecuteQuery function*/
    offBkg1ExecuteQuery(obj) {
        return this.http.post('otstasta/offBkg1ExecuteQuery', obj);
    }
    /** This is description of the offBkg1Commit function*/
    offBkg1Commit(obj) {
        return this.http.post('otstasta/offBkg1Commit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('otstasta/sysPflExecuteQuery', obj);
    }
    /** This is description of the cgfkOmsreqprinteridRecordGroup function*/
    cgfkOmsreqprinteridRecordGroup(obj) {
        return this.http.get('otstasta/cgfk$omsReqPrinterIdRecordGroup');
    }
    /** This is description of the cgfkAccodesubaccounttypeRecordGroup function*/
    cgfkAccodesubaccounttypeRecordGroup(obj) {
        return this.http.get('otstasta/cgfk$acCodeSubAccountTypeRecordGroup');
    }
    /** This is description of the mainProcess function*/
    mainProcess (obj) {
        return this.http.post('otstasta/mainProcess', obj);
    }
    /** This is description of the mainProcess function*/
    mainReprtProcess (obj) {
        return this.http.post('otstasta/mainReprtProcess', obj);
    }
}
