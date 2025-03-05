import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtiglbalService {
    constructor(private http: HttpService) { }
    /** This is description of the csldCaExecuteQuery function*/
    csldCaExecuteQuery(obj) {
        return this.http.post('otiglbal/csldCaExecuteQuery', obj);
    }
}
