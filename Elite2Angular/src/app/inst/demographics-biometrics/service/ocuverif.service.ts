import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcuverifService {
    constructor(private http: HttpService) { }
    /** This is description of the workFlExecuteQuery function*/
    workFlExecuteQuery(obj) {
        return this.http.post('ocuverif/workFlExecuteQuery', obj);
    }
    /** This is description of the workFlCommit function*/
    workFlCommit(obj) {
        return this.http.post('ocuverif/workFlCommit', obj);
    }

    workFlVerificationCommit(obj) {
        return this.http.post('ocuverif/workFlVerifyCommit', obj);
    }
}
