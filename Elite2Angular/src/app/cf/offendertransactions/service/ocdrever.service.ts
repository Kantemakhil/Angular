import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdreverService {
    constructor(private http: HttpService) { }
    /** This is description of the offFeeTxnExecuteQuery function*/
    offFeeTxnExecuteQuery(offenderBookId) {
        return this.http.get('ocdrever/offFeeTxnExecuteQuery?offenderBookId='+ offenderBookId);
    }
     /** This is description of the adjustRevCommit function*/
     adjustRevCommit(obj) {
        return this.http.post('ocdrever/adjustRevCommit', obj);
    }
     /** This is description of the getbillEndDayPfVal function*/
     getbillEndDayPfVal() {
        return this.http.get('ocdadjus/getbillEndDayPfVal');
    }
     /** This is description of the getCasePlanId function*/
     getCasePlanId(obj) {
        return this.http.post('ocdadjus/getCasePlanId', obj);
    }
    
}
