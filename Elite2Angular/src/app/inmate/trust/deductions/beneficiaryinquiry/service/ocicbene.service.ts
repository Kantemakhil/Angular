import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcicbeneService {
    constructor(private http: HttpService) {}
    /** This is description of the vCorpExecuteQuery function*/
    vCorpExecuteQuery(obj) {
        return this.http.post('ocicbene/vCorpExecuteQuery', obj);
    }
    /** This is description of the offBncExecuteQuery function*/
    offBncExecuteQuery(obj) {
        return this.http.post('ocicbene/offBncExecuteQuery', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('ocicbene/sysPflExecuteQuery', obj);
    }
     /** This is description of the vCorpCommit function*/
     vCorpCommit(obj) {
        return this.http.post('ocicbene/vCorpCommit', obj);
    }
}
