import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OuimergeService {
    constructor(private http: HttpService) { }
    /** This is description of the transactionsExecuteQuery function*/
    transactionsExecuteQuery(obj) {
        return this.http.post('ouimerge/transactionsExecuteQuery', obj);
    }
    /** This is description of the rgStatusRecordGroup function*/
    rgStatusRecordGroup() {
        return this.http.get('ouimerge/rgStatusRecordGroup');
    }
    /** This is description of the rgSourceRecordGroup function*/
    rgSourceRecordGroup() {
        return this.http.get('ouimerge/rgSourceRecordGroup');
    }

    mergeLogExecuteQuery(obj) {
        return this.http.post('ouimerge/mergeLogExecuteQuery',obj);
        }

    mergTxnProcExecuteQuery(obj) {
		return this.http.post('ouimerge/mergTxnProcExecuteQuery',obj);
	}
}
