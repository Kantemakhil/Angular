import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiuovresService {
    constructor(private http: HttpService) {}
    /** This is description of the perExecuteQuery function*/
    perExecuteQuery(obj) {
        return this.http.post('oiuovres/perExecuteQuery', obj);
    }
    /** This is description of the perCommit function*/
    perCommit(obj) {
        return this.http.post('oiuovres/perCommit', obj);
    }
    /** This is description of the offConRestExecuteQuery function*/
    offConRestExecuteQuery(obj) {
        return this.http.post('oiuovres/offConRestExecuteQuery', obj);
    }
    /** This is description of the offConRestCommit function*/
    offConRestCommit(obj) {
        return this.http.post('oiuovres/offConRestCommit', obj);
    }
    /** This is description of the rgOffRestrictionTypeRecordGroup function*/
    rgOffRestrictionTypeRecordGroup(obj) {
        return this.http.get( 'oiuovres/rgOffRestrictionTypeRecordGroup');
    }
}
