import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidononaService {
    constructor(private http: HttpService) { }
    /** This is description of the offNaExecuteQuery function*/
    offNaExecuteQuery(obj) {
        return this.http.post('oidonona/offNaExecuteQuery', obj);
    }
    /** This is description of the offNaCommit function*/
    offNaCommit(obj) {
        return this.http.post('oidonona/offNaCommit', obj);
    }
    /** This is description of the offNadExecuteQuery function*/
    offNadExecuteQuery(obj) {
        return this.http.post('oidonona/offNadExecuteQuery', obj);
    }
    /** This is description of the offNadCommit function*/
    offNadCommit(obj) {
        return this.http.post('oidonona/offNadCommit', obj);
    }
    /** This is description of the stgRelationshipsExecuteQuery function*/
    stgRelationshipsExecuteQuery(obj) {
        return this.http.post('oidonona/stgRelationshipsExecuteQuery', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('oidonona/sysPflExecuteQuery', obj);
    }
    /** This is description of the sysPflCommit function*/
    sysPflCommit(obj) {
        return this.http.post('oidonona/sysPflCommit', obj);
    }
    /** This is description of the cgfkOffnadspoffenderiddiRecordGroup function*/
    cgfkOffnadspoffenderiddiRecordGroup() {
        return this.http.get('oidonona/cgfk$offNaDspOffenderIdDiRecordGroup');
    }
    /** This is description of the cgfkOffnaddspdescription3RecordGroup function*/
    cgfkOffnaddspdescription3RecordGroup() {
        return this.http.get('oidonona/cgfk$offNadDspDescription3RecordGroup');
    }
    /** This is description of the offNaDspRecipRsnRecordGroup function*/
    offNaDspRecipRsnRecordGroup() {
        return this.http.get('oidonona/offNaDspRecipRsnRecordGroup');
    }
    /** This is description of the cgfkOffnaddspdescriptionRecordGroup function*/
    cgfkOffnaddspdescriptionRecordGroup() {
        return this.http.get('oidonona/cgfkoffNadDspDescriptionRecordGroup');
    }
    compareEffectiveDate(effectiveDate) {
        return this.http.get('oidonona/compareEffectiveDate?effectiveDate=' + effectiveDate);
    }
    getMaxVal(rootOffenderId, nsOffenderId) {
        return this.http.get('oidonona/getMaxVal?rootOffenderId=' + rootOffenderId + '&nsOffenderId=' + nsOffenderId);
    }
    offNadRetriveExecuteQuery(obj) {
        return this.http.post('oidonona/offNadExecuteQuery', obj);
    }

    getlastFirstName(nsOffId, offId) {
        return this.http.get(`oidonona/getlastFirstName?nsOffId=${nsOffId}&offId=${offId}`);
    }
}
