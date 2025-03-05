import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OumagencService {
    constructor(private http: HttpService) {}
    /** This is description of the corpExecuteQuery function*/
    corpExecuteQuery(obj) {
        return this.http.post('oumagenc/corpExecuteQuery', obj);
    }
    /** This is description of the corpCommit function*/
    corpCommit(obj) {
        return this.http.post('oumagenc/corpCommit', obj);
    }
    /** This is description of the addrExecuteQuery function*/
    addrExecuteQuery(obj) {
        return this.http.post('oumagenc/addrExecuteQuery', obj);
    }
    /** This is description of the addPhExecuteQuery function*/
    addPhExecuteQuery(obj) {
        return this.http.post('oumagenc/addPhExecuteQuery', obj);
    }
    /** This is description of the addPhCommit function*/
    addPhCommit(obj) {
        return this.http.post('oumagenc/addPhCommit', obj);
    }
    /** This is description of the corPhoneExecuteQuery function*/
    corPhoneExecuteQuery(obj) {
        return this.http.post('oumagenc/corPhoneExecuteQuery', obj);
    }
    /** This is description of the corPhoneCommit function*/
    corPhoneCommit(obj) {
        return this.http.post('oumagenc/corPhoneCommit', obj);
    }
    /** This is description of the iAddExecuteQuery function*/
    iAddExecuteQuery(obj) {
        return this.http.post('oumagenc/iAddExecuteQuery', obj);
    }
    /** This is description of the iAddCommit function*/
    iAddCommit(obj) {
        return this.http.post('oumagenc/iAddCommit', obj);
    }
    /** This is description of the addressesExecuteQuery function*/
    addressesExecuteQuery(obj) {
        return this.http.post('oumagenc/addressesExecuteQuery', obj);
    }
    /** This is description of the addressesCommit function*/
    addressesCommit(obj) {
        return this.http.post('oumagenc/addressesCommit', obj);
    }
    /** This is description of the rgCaseloadRecordGroup function*/
    rgCaseloadRecordGroup(obj) {
        return this.http.get( 'oumagenc/rgCaseloadRecordGroup');
    }
    /** This is description of the rgTypeRecordGroup function*/
    rgTypeRecordGroup(obj) {
        return this.http.get( 'oumagenc/rgTypeRecordGroup');
    }
    /** This is description of the rgIclassRecordGroup function*/
    rgIclassRecordGroup(obj) {
        return this.http.get( 'oumagenc/rgIclassRecordGroup');
    }
    getCorporateChilds(corporateId)    {
        return this.http.get(`oumagenc/getCorporateChilds?corporateId=${corporateId}`);
    }
}
