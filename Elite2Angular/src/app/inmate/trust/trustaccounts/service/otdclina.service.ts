import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtdclinaService {
    constructor(private http: HttpService) { }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('otdclina/sysPflExecuteQuery', obj);
    }
    /** This is description of the sysPflCommit function*/
    sysPflCommit(obj) {
        return this.http.post('otdclina/sysPflCommit', obj);
    }
    /** This is description of the offTracExecuteQuery function*/
    offTracExecuteQuery(obj) {
        return this.http.post('otdclina/offTracExecuteQuery', obj);
    }
    /** This is description of the offTracCommit function*/
    offTracCommit(obj) {
        return this.http.post('otdclina/offTracCommit', obj);
    }
    /** This is description of the selectMethodRgRecordGroup function*/
    selectMethodRgRecordGroup(obj) {
        return this.http.get('otdclina/selectMethodRgRecordGroup');
    }
    /** This is description of the offTracCommit function*/
    whenButtonPressed(obj) {
        return this.http.post('otdclina/whenButtonPressed', obj);
    }
    /** This is description of the offTracCommit function*/
    checkLock() {
        return this.http.get('otdclina/checkLock');
    }
}
