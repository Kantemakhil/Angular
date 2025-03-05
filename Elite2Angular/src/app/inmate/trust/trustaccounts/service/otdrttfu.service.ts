import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtdrttfuService {
    constructor(private http: HttpService) {}
    /** This is description of the offTtExecuteQuery function*/
    offTtExecuteQuery(obj) {
        return this.http.post('otdrttfu/offTtExecuteQuery', obj);
    }
    /** This is description of the offTtCommit function*/
    offTtCommit(obj) {
        return this.http.post('otdrttfu/offTtCommit', obj);
    }
    /** This is description of the offTxnExecuteQuery function*/
    offTxnExecuteQuery(obj) {
        return this.http.post('otdrttfu/offTxnExecuteQuery', obj);
    }
    /** This is description of the offTxnCommit function*/
    offTxnCommit(obj) {
        return this.http.post('otdrttfu/offTxnCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('otdrttfu/sysPflExecuteQuery', obj);
    }
}
