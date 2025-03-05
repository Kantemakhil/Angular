import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service'

@Injectable({providedIn: 'root'})
export class OmurmresService {
    constructor(private http: HttpService) { }
    /** This is description of the resBlExecuteQuery function*/
    resBlExecuteQuery(obj) {
        return this.http.post('omurmres/resBlExecuteQuery', obj);
    }
    /** This is description of the resBlCommit function*/
    resBlCommit(obj) {
        return this.http.post('omurmres/resBlCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('omurmres/sysPflExecuteQuery', obj);
    }
    /** This is description of the sysPflCommit function*/
    sysPflCommit(obj) {
        return this.http.post('omurmres/sysPflCommit', obj);
    }
    /** This is description of the cgfkResblremovereasonRecordGroup function*/
    cgfkResblremovereasonRecordGroup() {
        return this.http.get('omurmres/cgfk$resBlRemoveReasonRecordGroup');
    }
}
