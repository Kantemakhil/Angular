import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmorcodService {
    constructor(private http: HttpService) { }
    /** This is description of the resCodExecuteQuery function*/
    resCodExecuteQuery(obj) {
        return this.http.post('ocmorcod/resCodExecuteQuery', obj);
    }
    /** This is description of the resCodCommit function*/
    resCodCommit(obj) {
        return this.http.post('ocmorcod/resCodCommit', obj);
    }
    /** This is description of the rgResCodNbtDescriptionRecordGroup function*/
    rgResCodNbtDescriptionRecordGroup() {
        return this.http.get('ocmorcod/rgResCodNbtDescriptionRecordGroup');
    }
    /** This is description of the rgResCodChargeStatusRecordGroup function*/
    rgResCodChargeStatusRecordGroup() {
        return this.http.get('ocmorcod/rgResCodChargeStatusRecordGroup');
    }
}
