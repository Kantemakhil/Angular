import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable()
export class OumtrnbkService {
    constructor(private http: HttpService) {}
    /** This is description of the mrgProcExecuteQuery function*/
    mrgProcExecuteQuery(obj) {
        return this.http.post('oumtrnbk/mrgProcExecuteQuery', obj);
    }
    /** This is description of the mrgProcCommit function*/
    mrgProcCommit(obj) {
        return this.http.post('oumtrnbk/mrgProcCommit', obj);
    }
    chkOffendersForTransfer(obj) {
        return this.http.post('oumtrnbk/chkOffendersForTransfer', obj);
    }
    processTransferTransaction(obj) {
        return this.http.post('oumtrnbk/processTransferTransaction', obj);
    }
    mrgProcExecuteQueryRet(obj) {
        return this.http.post('oumtrnbk/mrgProcExecuteQueryRet', obj);
    }   
}
