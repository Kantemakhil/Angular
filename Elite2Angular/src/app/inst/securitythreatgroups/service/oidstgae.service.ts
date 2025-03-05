import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidstgaeService {
    constructor(private http: HttpService) {}
    /** This is description of the stgRltExecuteQuery function*/
    stgRltExecuteQuery(obj) {
        return this.http.post('oidstgae/stgRltExecuteQuery', obj);
    }
    /** This is description of the stgRltCommit function*/
    stgRltCommit(obj) {
        return this.http.post('oidstgae/stgRltCommit', obj);
    }
    /** This is description of the stgRelationshipsExecuteQuery function*/
    stgRelationshipsExecuteQuery(obj) {
        return this.http.post('oidstgae/stgRelationshipsExecuteQuery', obj);
    }
    /** This is description of the stgRelationshipsCommit function*/
    stgRelationshipsCommit(obj) {
        return this.http.post('oidstgae/stgRelationshipsCommit', obj);
    }
    /** This is description of the rgStg2RecordGroup function*/
    rgStg2RecordGroup() {
        return this.http.get( 'oidstgae/rgStg2RecordGroup');
    }
    /** This is description of the rgStg1RecordGroup function*/
    rgStg1RecordGroup() {
        return this.http.get( 'oidstgae/rgStg1RecordGroup');
    }
    /** This is description of the rgStg3RecordGroup function*/
    rgStg3RecordGroup() {
        return this.http.get( 'oidstgae/rgStg3RecordGroup');
    }
    /** This is description of the recReason2RecordGroup function*/
    recReason2RecordGroup() {
        return this.http.get( 'oidstgae/recReason2RecordGroup');
    }
    /** This is description of the recStg2RecordGroup function*/
    recStg2RecordGroup() {
        return this.http.get( 'oidstgae/recStg2RecordGroup');
    }
    /** This is description of the recStgRecordGroup function*/
    recStgRecordGroup() {
        return this.http.get( 'oidstgae/recStgRecordGroup');
    }
    /** This is description of the recReasonRecordGroup function*/
    recReasonRecordGroup() {
        return this.http.get( 'oidstgae/recReasonRecordGroup');
    }
    /** This is description of the groupLovRecordGroupNumber function*/
    groupLovRecordGroupNumber() {
        return this.http.get( 'oidstgae/groupLovRecordGroupNumber');
    }
     /** This is description of the stgRltGroupPostChange function*/
    stgRltGroupPostChange(stg, rStg) {
        return this.http.get(`oidstgae/stgRltGroupPostChange?stgId=${stg}&relatedStgId=${rStg}`);
    }
     /** This is description of the stgRltCheckBoxChange function*/
    stgRltCheckBoxChange(stg, rStg) {
        return this.http.get(`oidstgae/stgRltCheckBoxChange?stgId=${stg}&relatedStgId=${rStg}`);
    }
     /** This is description of the stgRelationshipsCheckBoxChange function*/
    stgRelationshipsCheckBoxChange(stg, rStg) {
        return this.http.get(`oidstgae/stgRelationshipsCheckBoxChange?stgId=${stg}&relatedStgId=${rStg}`);
    }
}
