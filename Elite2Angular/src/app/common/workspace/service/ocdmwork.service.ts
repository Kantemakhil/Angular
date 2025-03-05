import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';

@Injectable({providedIn: 'root'})
export class OcdmworkService {
    constructor(private http: HttpService) { }
    exitFlag: boolean;
    vHeaderBlockServiceObj: VHeaderBlock = new VHeaderBlock();
    /** This is description of the workExecuteQuery function*/
    workExecuteQuery(obj) {
        return this.http.post('ocdmwork/workExecuteQuery', obj);
    }
    /** This is description of the workCommit function*/
    workCommit(obj) {
        return this.http.post('ocdmwork/workCommit', obj);
    }
    /** This is description of the memoExecuteQuery function*/
    memoExecuteQuery(obj) {
        return this.http.post('ocdmwork/memoExecuteQuery', obj);
    }
    /** This is description of the memoCommit function*/
    memoCommit(obj) {
        return this.http.post('ocdmwork/memoCommit', obj);
    }
    /** This is description of the rgReasonRecordGroup function*/
    rgReasonRecordGroup() {
        return this.http.get('ocdmwork/rgReasonRecordGroup');
    }
    /** This is description of the rgTypeRecordGroup function*/
    rgTypeRecordGroup() {
        return this.http.get('ocdmwork/rgTypeRecordGroup');
    }
    /** This is description of the rgWorkTypeRecordGroup function*/
    rgWorkTypeRecordGroup() {
        return this.http.get('ocdmwork/rgWorkTypeRecordGroup');
    }
    /** This is description of the rgSubtypeRecordGroup function*/
    rgSubtypeRecordGroup() {
        return this.http.get('ocdmwork/rgSubtypeRecordGroup');
    }
    /** This is description of the rgCompletedRecordGroup function*/
    rgCompletedRecordGroup() {
        return this.http.get('ocdmwork/rgCompletedRecordGroup');
    }
    /** This is description of the rgSeverityRecordGroup function*/
    rgSeverityRecordGroup() {
        return this.http.get('ocdmwork/rgSeverityRecordGroup');
    }
}
