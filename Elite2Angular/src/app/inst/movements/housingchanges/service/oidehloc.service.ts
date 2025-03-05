import { Injectable } from '@angular/core';

import { VNameSearch } from '@common/beans/VNameSearch';
import { HttpService } from '@core/service/http.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
@Injectable({providedIn: 'root'})
export class OidehlocService {
    nameLovData: VNameSearch = new VNameSearch();
    voffbkgModel: VHeaderBlock = new VHeaderBlock();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    checkFlag: boolean;
    constructor(private http: HttpService) { }
    /** This is description of the vOffBkgExecuteQuery function*/
    vOffBkgExecuteQuery(obj) {
        return this.http.post('oidehloc/vOffBkgExecuteQuery', obj);
    }
    /** This is description of the vOffBkgCommit function*/
    vOffBkgCommit(obj) {
        return this.http.post('oidehloc/vOffBkgCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('oidehloc/sysPflExecuteQuery', obj);
    }
    /** This is description of the rgAssignmentReasonRecordGroup function*/
    rgAssignmentReasonRecordGroup() {
        return this.http.get('oidehloc/rgAssignmentReasonRecordGroup');
    }

    nonAssocationOffendersList(obj) {
        return this.http.post('oidehloc/nonAssocationOffendersList', obj);
    }
}
