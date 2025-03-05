import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OmuavlocService {
    constructor(private http: HttpService) { }
    /** This is description of the livUnitExecuteQuery function*/
    livUnitExecuteQuery(obj) {
        return this.http.post('omuavloc/livUnitExecuteQuery', obj);
    }
}
