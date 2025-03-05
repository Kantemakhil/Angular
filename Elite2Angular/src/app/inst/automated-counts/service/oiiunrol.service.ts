import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiiunrolService {
    constructor(private http: HttpService) { }
    /** This is description of the rollListExecuteQuery function*/
    rollListExecuteQuery(obj) {
        return this.http.post('oiiunrol/rollListExecuteQuery', obj);
    }
}
