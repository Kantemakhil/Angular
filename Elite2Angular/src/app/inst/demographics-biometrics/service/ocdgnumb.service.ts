import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdgnumbService {
    constructor(private http: HttpService) { }
    /** This is description of the phonesExecuteQuery function*/
    phonesExecuteQuery(obj) {
        return this.http.post('ocdgnumb/phonesExecuteQuery', obj);
    }
    /** This is description of the phonesCommit function*/
    phonesCommit(obj) {
        return this.http.post('ocdgnumb/phonesCommit', obj);
    }
    /** This is description of the internetAddrExecuteQuery function*/
    internetAddrExecuteQuery(obj) {
        return this.http.post('ocdgnumb/internetAddrExecuteQuery', obj);
    }
    /** This is description of the internetAddrCommit function*/
    internetAddrCommit(obj) {
        return this.http.post('ocdgnumb/internetAddrCommit', obj);
    }
    /** This is description of the rgPhoneTypeRecordGroup function*/
    rgPhoneTypeRecordGroup(obj) {
        return this.http.get('ocdgnumb/rgPhoneTypeRecordGroup');
    }
    gettingEmailDomains() {
        return this.http.get('ocdgnumb/gettingEmailDomains');
    }
}
