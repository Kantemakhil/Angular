import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcuovrobService {
    constructor(private http: HttpService) {}
    /** This is description of the offBncExecuteQuery function*/
    offBncExecuteQuery(obj) {
        return this.http.post('ocuovrob/offBncExecuteQuery', obj);
    }
    /** This is description of the offBncCommit function*/
    offBncCommit(obj) {
        return this.http.post('ocuovrob/offBncCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('ocuovrob/sysPflExecuteQuery', obj);
    }
    /** This is description of the sysPflCommit function*/
    sysPflCommit(obj) {
        return this.http.post('ocuovrob/sysPflCommit', obj);
    }
}
