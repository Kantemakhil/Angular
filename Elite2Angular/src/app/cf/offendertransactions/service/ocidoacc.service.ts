import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcidoaccService {
    constructor(private http: HttpService) { }
    /** This is description of the offSubaExecuteQuery function*/
    offSubaExecuteQuery(obj) {
        return this.http.post('ocidoacc/offSubaExecuteQuery', obj);
    }
    /** This is description of the paySchExecuteQuery function*/
    paySchExecuteQuery(obj) {
        return this.http.post('ocidoacc/paySchExecuteQuery', obj);
    }
    /** This is description of the offBncExecuteQuery function*/
    offBncExecuteQuery(obj) {
        return this.http.post('ocidoacc/offBncExecuteQuery', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(rootOffenderid) {
        return this.http.get('ocidoacc/sysPflExecuteQuery?rootOffenderid=' + rootOffenderid);
    }
    /** This is description of the sysPflExecuteQuery function*/
    getActClosedFlag(offenderId, caseloadid) {
        return this.http.get('ocidoacc/getActClosedFlag?offenderId=' + offenderId + '&caseloadid=' + caseloadid);
    }
    offFeeExecuteQuery(obj){
        return this.http.post('ocidoacc/offFeeExecuteQuery', obj);
    }
}
