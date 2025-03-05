import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcipbeneService {
    constructor(private http: HttpService) { }
    /** This is description of the perExecuteQuery function*/
    perExecuteQuery(obj) {
        return this.http.post('ocipbene/perExecuteQuery', obj);
    }
    /** This is description of the perCommit function*/
    perCommit(obj) {
        return this.http.post('ocipbene/perCommit', obj);
    }
    /** This is description of the offBncExecuteQuery function*/
    offBncExecuteQuery(obj) {
        return this.http.post('ocipbene/offBncExecuteQuery', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('ocipbene/sysPflExecuteQuery', obj);
    }
}
