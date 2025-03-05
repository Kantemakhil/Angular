import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmpfaccService {
    constructor(private http: HttpService) { }
    /** This is description of the accountCodesExecuteQuery function*/
    feeAccountsExecuteQuery() {
        return this.http.get('ocmpfacc/feeAccountsExecuteQuery')
    }
    /** This is description of the feeAccountCommit function*/
    feeAccountCommit(obj) {
        return this.http.post('ocmpfacc/feeAccountCommit', obj);
    }
     /** This is description of the accountCodesExecuteQuery function*/
     getAccCodes() {
        return this.http.get('ocmpfacc/getAccCodes');
    }

    getFeeCodes() {
        return this.http.get('ocmpfacc/getFeeCodes');
    }

}
