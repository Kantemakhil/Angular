import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtmacprdService {
    constructor(private http: HttpService) { }
    /** This is description of the acPrdExecuteQuery function*/
    acPrdExecuteQuery(obj) {
        return this.http.post('otmacprd/acPrdExecuteQuery', obj);
    }
    /** This is description of the acPrdCommit function*/
    acPrdCommit(obj) {
        return this.http.post('otmacprd/acPrdCommit', obj);
    }
    overlapdates() {
        return this.http.get('otmacprd/overlapdates');
    }
    duplicateAccountperiodId(accountPeriodId) {
        return this.http.get('otmacprd/duplicateAccountperiodId?accountPeriodId=' + accountPeriodId);
    }
    duplicateOverlapDate (overlapDate) {
        return this.http.get('otmacprd/duplicateOverlapDate?overlapDate=' + overlapDate);
    }
}
