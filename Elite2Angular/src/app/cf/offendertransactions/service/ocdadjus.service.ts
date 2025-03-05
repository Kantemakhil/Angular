import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdadjusService {
    constructor(private http: HttpService) { }
    /** This is description of the offFeeExecuteQuery function*/
    offFeeExecuteQuery(offenderBookId) {
        return this.http.get('ocdadjus/offFeeExecuteQuery?offenderBookId='+ offenderBookId);
    }
    /** This is description of the feeCommit function*/
    feeCommit(obj) {
        return this.http.post('ocdadjus/feeCommit', obj);
    }
     /** This is description of the adjustAmountCommit function*/
     adjustAmountCommit(obj) {
        return this.http.post('ocdadjus/adjustAmountCommit', obj);
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
