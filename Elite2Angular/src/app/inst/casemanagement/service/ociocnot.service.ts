import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service'

@Injectable({providedIn: 'root'})
export class OciocnotService {
    constructor(private http: HttpService) {}
    /** This is description of the caseNoteExecuteQuery function*/
    caseNoteExecuteQuery(obj) {
        return this.http.post('ociocnot/caseNoteExecuteQuery', obj);
    }
    /** This is description of the rgTypeRecordGroup function*/
    rgTypeRecordGroup() {
        return this.http.get( 'ociocnot/rgTypeRecordGroup');
    }
    /** This is description of the rgSubTypeRecordGroup function*/
    rgSubTypeRecordGroup() {
        return this.http.get( 'ociocnot/rgSubTypeRecordGroup');
    }
    /** This is description of the rgStaffNameRecordGroup function*/
    rgStaffNameRecordGroup() {
        return this.http.get( 'ociocnot/rgStaffNameRecordGroup');
    }
    /** This is description of the rgLocationRecordGroup function*/
    rgLocationRecordGroup() {
        return this.http.get( 'ociocnot/rgLocationRecordGroup');
    }
      /** This is description of the toGetStaffId function*/
      toGetStaffId() {
        return this.http.get( 'ociocnot/toGetStaffId');
    }
      /** This is description of the rgLocationRecordGroup function*/
      toGetFirstAndLastName(obj) {
        return this.http.get( 'ociocnot/toGetFirstAndLastName?staffId=' + obj);
    }
    checkPrevExists() {
        return this.http.get( 'ociocnot/checkPrevExists');
    }
}
