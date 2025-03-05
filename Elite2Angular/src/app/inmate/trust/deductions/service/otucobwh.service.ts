import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtucobwhService {
    constructor(private http: HttpService) {}
    /** This is description of the cowohExecuteQuery function*/
    cowohExecuteQuery(obj) {
        return this.http.post('otucobwh/cowohExecuteQuery', obj);
    }
}
