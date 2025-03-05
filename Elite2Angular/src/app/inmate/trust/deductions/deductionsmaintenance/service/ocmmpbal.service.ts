import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmmpbalService {
    constructor(private http: HttpService) { }
    /** This is description of the minPbExecuteQuery function*/
    minPbExecuteQuery(obj) {
        return this.http.post('ocmmpbal/minPbExecuteQuery', obj);
    }
    /** This is description of the minPbCommit function*/
    minPbCommit(obj) {
        return this.http.post('ocmmpbal/minPbCommit', obj);
    }
    /** This is description of the cgfkMinpbaccountcodeRecordGroup function*/
    cgfkMinpbaccountcodeRecordGroup(obj) {
        return this.http.get('ocmmpbal/minPbAccountCodeRecordGroup?caseloadType='+obj);
    }
}
