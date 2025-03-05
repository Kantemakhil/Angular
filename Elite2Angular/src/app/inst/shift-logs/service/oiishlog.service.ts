import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiishlogService {
    constructor(private http: HttpService) {}
    /** This is description of the agyShilExecuteQuery function*/
    agyShilExecuteQuery(obj) {
        return this.http.post('oiishlog/agyShilExecuteQuery', obj);
    }
    /** This is description of the agyShilCommit function*/
    agyShilCommit(obj) {
        return this.http.post('oiishlog/agyShilCommit', obj);
    }
    /** This is description of the agyShil1ExecuteQuery function*/
    agyShil1ExecuteQuery(obj) {
        return this.http.post('oiishlog/agyShil1ExecuteQuery', obj);
    }
    /** This is description of the cgfkAgyShilAgyActivityCodRecordGroup function*/
    cgfkAgyShilAgyActivityCodRecordGroup(caseloadId) {
        return this.http.get( 'oiishlog/cgfkAgyShilAgyActivityCodRecordGroup?caseloadId=' + caseloadId);
    }
    /** This is description of the rgAgencyRecordGroup function*/
    rgAgencyRecordGroup(caseloadId) {
        return this.http.get( 'oiishlog/rgAgencyRecordGroup?caseloadId=' + caseloadId);
    }
    /** This is description of the rgLocationRecordGroup function*/
    rgLocationRecordGroup(caseloadId) {
        return this.http.get( 'oiishlog/rgLocationRecordGroup?agyLocId=' + caseloadId);
    }
    /** This is description of the rgStaffRecordGroup function*/
    rgStaffRecordGroup(caseloadId) {
        return this.http.get( 'oiishlog/rgStaffRecordGroup?caseloadId=' + caseloadId);
    }
}
