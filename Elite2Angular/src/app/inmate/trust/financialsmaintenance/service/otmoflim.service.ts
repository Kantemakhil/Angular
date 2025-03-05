import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtmoflimService {
    constructor(private http: HttpService) { }
    /** This is description of the offLimExecuteQuery function*/
    offLimExecuteQuery(obj) {
        return this.http.post('otmoflim/offLimExecuteQuery', obj);
    }
    /** This is description of the offLimCommit function*/
    offLimCommit(obj) {
        return this.http.post('otmoflim/offLimCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('otmoflim/sysPflExecuteQuery', obj);
    }
    /** This is description of the cgfkOfflimlimittypeRecordGroup function*/
    cgfkOfflimlimittypeRecordGroup(obj) {
        return this.http.get('otmoflim/cgfk$offLimLimitTypeRecordGroup');
    }
}
