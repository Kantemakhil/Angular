import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidschacService {
    constructor(private http: HttpService) {}
    /** This is description of the schActExecuteQuery function*/
    schActExecuteQuery(obj) {
        return this.http.post('oidschac/schActExecuteQuery', obj);
    }
}
