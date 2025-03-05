import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidrtconService {
    constructor(private http: HttpService) {}
    /** This is description of the offConExecuteQuery function*/
    offConExecuteQuery(obj) {
        return this.http.post('oidrtcon/offConExecuteQuery', obj);
    }
    /** This is description of the offConCommit function*/
    offConCommit(obj) {
        return this.http.post('oidrtcon/offConCommit', obj);
    }
}
