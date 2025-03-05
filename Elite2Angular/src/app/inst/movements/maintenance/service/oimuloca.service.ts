import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OimulocaService {
    constructor(private http: HttpService) { }
    /** This is description of the usagesExecuteQuery function*/
    usagesExecuteQuery(obj) {
        return this.http.post('oimuloca/usagesExecuteQuery', obj);
    }
    /** This is description of the usagesCommit function*/
    usagesCommit(obj) {
        return this.http.post('oimuloca/usagesCommit', obj);
    }
    /** This is description of the intLocL1ExecuteQuery function*/
    intLocL1ExecuteQuery(obj) {
        return this.http.post('oimuloca/intLocL1ExecuteQuery', obj);
    }
    /** This is description of the intLocL1Commit function*/
    intLocL1Commit(obj) {
        return this.http.post('oimuloca/intLocL1Commit', obj);
    }
    /** This is description of the intLocL2ExecuteQuery function*/
    intLocL2ExecuteQuery(obj) {
        return this.http.post('oimuloca/intLocL2ExecuteQuery', obj);
    }
    /** This is description of the intLocL2Commit function*/
    intLocL2Commit(obj) {
        return this.http.post('oimuloca/intLocL2Commit', obj);
    }
    /** This is description of the intLocL3ExecuteQuery function*/
    intLocL3ExecuteQuery(obj) {
        return this.http.post('oimuloca/intLocL3ExecuteQuery', obj);
    }
    /** This is description of the intLocL3Commit function*/
    intLocL3Commit(obj) {
        return this.http.post('oimuloca/intLocL3Commit', obj);
    }
    /** This is description of the intLocL4ExecuteQuery function*/
    intLocL4ExecuteQuery(obj) {
        return this.http.post('oimuloca/intLocL4ExecuteQuery', obj);
    }
    /** This is description of the intLocL4Commit function*/
    intLocL4Commit(obj) {
        return this.http.post('oimuloca/intLocL4Commit', obj);
    }
    /** This is description of the rgLocationUsageRecordGroup function*/
    rgLocationUsageRecordGroup() {
        return this.http.get('oimuloca/rgLocationUsageRecordGroup');
    }
    /** This is description of the rgAgyLocRecordGroup function*/
    rgAgyLocRecordGroup() {
        return this.http.get('oimuloca/rgAgyLocRecordGroup');
    }
    /** This is description of the rgLevelTypeRecordGroup function*/
    rgLevelTypeRecordGroup() {
        return this.http.get('oimuloca/rgLevelTypeRecordGroup');
    }
    /** This is description of the rgLevelTypeRecordGroup function*/
    getInternalLocationRecords(intLocId) {
        return this.http.get('oimuloca/getInternalLocationRecords?intLocId=' + intLocId);
    }
}
