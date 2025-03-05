import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtdsdeduService {
    constructor(private http: HttpService) { }
    /** This is description of the susDedExecuteQuery function*/
    susDedExecuteQuery(obj) {
        return this.http.post('otdsdedu/susDedExecuteQuery', obj);
    }
    /** This is description of the susDedCommit function*/
    susDedCommit(obj) {
        return this.http.post('otdsdedu/susDedCommit', obj);
    }
    /** This is description of the susDtExecuteQuery function*/
    susDtExecuteQuery(obj) {
        return this.http.post('otdsdedu/susDtExecuteQuery', obj);
    }
    /** This is description of the susDtCommit function*/
    susDtCommit(obj) {
        return this.http.post('otdsdedu/susDtCommit', obj);
    }
    /** This is description of the cgfkSusdedcaseloadidRecordGroup function*/
    cgfkSusdedcaseloadidRecordGroup(obj) {
        return this.http.get('otdsdedu/cgfksusDedCaseloadIdRecordGroup');
    }
    /** This is description of the cgfkSusdtdeductiontypeRecordGroup function*/
    cgfkSusdtdeductiontypeRecordGroup(caseloadType) {
        return this.http.get('otdsdedu/cgfkSusDtDeductionTypeRecordGroup?caseloadType=' + caseloadType);
    }
    /** This is description of the chkOverlapDate function*/
    chkOverlapDate(pCaseloadId, pStartDate, pEndDate, pFlag) {
        const param = `caseloadId=${pCaseloadId}&startDate=${pStartDate}&endDate=${pEndDate}&flag=${pFlag}`;
        return this.http.get(`otdsdedu/chkOverlapDate?${param}`);
    }
}
