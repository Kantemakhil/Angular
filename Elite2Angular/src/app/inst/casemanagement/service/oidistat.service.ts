import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidistatService {
    constructor(private http: HttpService) {}
    /** This is description of the offImpsExecuteQuery function*/
    offImpsExecuteQuery(obj) {
        return this.http.post('oidistat/offImpsExecuteQuery', obj);
    }
    /** This is description of the offImpsCommit function*/
    offImpsCommit(obj) {
        return this.http.post('oidistat/offImpsCommit', obj);
    }
    /** This is description of the rgImprisonmentStaRecordGroup function*/
    rgImprisonmentStaRecordGroup() {
        return this.http.get( 'oidistat/rgImprisonmentStaRecordGroup');
    }
    /** This is description of the rgAgyLocIdRecordGroup function*/
    rgAgyLocIdRecordGroup(caseloadId) {
        return this.http.get( 'oidistat/rgAgyLocIdRecordGroup?caseloadId=' + caseloadId);
    }
    /** This function verifies the date*/
    chkImpDate(obj) {
        return this.http.post('oidistat/chkImpDate', obj);
    }
     /** This function verifies the time*/
    chkImpDateEffectiveTime(obj) {
        return this.http.post('oidistat/chkImpDateEffectiveTime', obj);
    }
     /** This is description of the offImpsCommit function*/
    offImpsUpdateCommit(obj) {
        return this.http.post('oidistat/offImpsUpdateCommit', obj);
    }
}
