import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';
import { OcdclistCourtListQuery } from '@instlegalscreensbeans/OcdclistCourtListQuery';

@Injectable({providedIn: 'root'})
export class OcdclistService {
    selectedRow: any;
    selectedRowIndex: number;
    courtListModel: OcdclistCourtListQuery = new OcdclistCourtListQuery();
    checkFlag: boolean;
    constructor(private http: HttpService) { }
    /** This is description of the ctlLstExecuteQuery function*/
    ctlLstExecuteQuery(obj) {
        return this.http.post('ocdclist/ctlLstExecuteQuery', obj);
    }
    /** This is description of the ctlLstCommit function*/
    ctlLstCommit(obj) {
        return this.http.post('ocdclist/ctlLstCommit', obj);
    }
    /** This is description of the ctlUnExecuteQuery function*/
    ctlUnExecuteQuery(obj) {
        return this.http.post('ocdclist/ctlUnExecuteQuery', obj);
    }
    /** This is description of the rgAgyLocRecordGroup function*/
    rgAgyLocRecordGroup() {
        return this.http.get('ocdclist/rgAgyLocRecordGroup');
    }
    /** This is description of the rgHearingRecordGroup function*/
    rgHearingRecordGroup() {
        return this.http.get('ocdclist/rgHearingRecordGroup');
    }
    /** This is description of the ctlLstCommit function*/
    ctlLstCommitQuery(obj) {
        return this.http.post('ocdclist/ctlLstCommitQuery', obj);
    }
}
