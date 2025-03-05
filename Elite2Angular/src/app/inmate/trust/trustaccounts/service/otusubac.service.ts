import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtusubacService {
    constructor(private http: HttpService) {}
    /** This is description of the offNameExecuteQuery function*/
    offNameExecuteQuery(obj) {
        return this.http.post('otusubac/offNameExecuteQuery', obj);
    }
    /** This is description of the offSubaExecuteQuery function*/
    offSubaExecuteQuery(obj) {
        return this.http.post('otusubac/offSubaExecuteQuery', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('otusubac/sysPflExecuteQuery', obj);
    }
}
