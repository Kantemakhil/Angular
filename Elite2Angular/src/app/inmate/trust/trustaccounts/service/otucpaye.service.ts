import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtucpayeService {
    constructor(private http: HttpService) { }
    /** This is description of the corpExecuteQuery function*/
    corpExecuteQuery(obj) {
        return this.http.post('otucpaye/corpExecuteQuery', obj);
    }
}
