import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcusrepsService {
    constructor(private http: HttpService) { }
    /** This is description of the omsModulesExecuteQuery function*/
    omsModulesExecuteQuery(obj) {
        return this.http.post('ocusreps/omsModulesExecuteQuery', obj);
    }
    /** This is description of the omsModulesCommit function*/
    omsModulesCommit(obj) {
        return this.http.post('ocusreps/omsModulesCommit', obj);
    }
}
