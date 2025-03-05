import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidcapprService {
    constructor(private http: HttpService) {

    }
    /** This is description of the vOffAssExecuteQuery function*/
    vOffAssExecuteQuery(obj) {
        return this.http.post('oidcappr/offAssExecuteQuery', obj);
    }
    /** This is description of the offAss1ExecuteQuery function*/
    offAss1ExecuteQuery(obj) {
        return this.http.post('oidcappr/offAss1ExecuteQuery', obj);
    }
    /** This is description of the offAss1Commit function*/
    offAss1Commit(obj) {
        return this.http.post('oidcappr/offAss1Commit', obj);
    }
}
