import { HttpService } from '@core/service/http.service';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class OcmssvasService {
    constructor(private http: HttpService) { }
    /** This is description of the cActAExecuteQuery function*/
    cActAExecuteQuery(obj) {
        return this.http.post('ocmssvas/cActAExecuteQuery', obj);
    }
    /** This is description of the cActACommit function*/
    cActACommit(obj) {
        return this.http.post('ocmssvas/cActACommit', obj);
    }
    /** This is description of the rgAreaClassRecordGroup function*/
    rgAreaClassRecordGroup() {
        return this.http.get('ocmssvas/rgAreaClassRecordGroup');
    }
    /** This is description of the rgAreaRegionRecordGroup function*/
    rgAreaRegionRecordGroup(caseLoadType, areaClass) {
        return this.http.get('ocmssvas/rgAreaRegionRecordGroup?caseLoadType=' + caseLoadType + '&areaClass=' + areaClass);
    }
}
