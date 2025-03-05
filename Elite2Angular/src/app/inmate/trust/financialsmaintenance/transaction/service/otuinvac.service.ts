import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtuinvacService {
    constructor(private http: HttpService) { }
    /** This is description of the txnInvExecuteQuery function*/
    txnInvExecuteQuery(obj) {
        return this.http.post('otuinvac/txnInvExecuteQuery', obj);
    }
    /** This is description of the txnInvCommit function*/
    txnInvCommit(obj) {
        return this.http.post('otuinvac/txnInvCommit', obj);
    }
    /** This is description of the cgfkTxninvinvalidaccountcRecordGroup function*/
    cgfkTxninvinvalidaccountcRecordGroup(obj) {
        return this.http.get('otuinvac/cgfkTxnInvInvalidAccountCRecordGroup');
    }
}
