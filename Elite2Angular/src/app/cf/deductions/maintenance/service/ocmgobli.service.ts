import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmgobliService {
    constructor(private http: HttpService) { }
    /** This is description of the obGrpExecuteQuery function*/
    obGrpExecuteQuery(obj) {
        return this.http.post('ocmgobli/obGrpExecuteQuery', obj);
    }
    /** This is description of the obGrpCommit function*/
    obGrpCommit(obj) {
        return this.http.post('ocmgobli/obGrpCommit', obj);
    }
    /** This is description of the grpObExecuteQuery function*/
    grpObExecuteQuery(obj) {
        return this.http.post('ocmgobli/grpObExecuteQuery', obj);
    }
    /** This is description of the grpObCommit function*/
    grpObCommit(obj) {
        return this.http.post('ocmgobli/grpObCommit', obj);
    }
    /** This is description of the cgfkGrpobdeductiontypeRecordGroup function*/
    cgfkGrpobdeductiontypeRecordGroup(obj) {
        return this.http.get('ocmgobli/cgfkGrpObDeductionTypeRecordGroup');
    }
    /** This is description of the cgfkSanctionnoticesRecordGroup function*/
    cgfkSanctionnoticesRecordGroup(obj) {
        return this.http.get('ocmgobli/cgfkSanctionNoticesRecordGroup');
    }
}
