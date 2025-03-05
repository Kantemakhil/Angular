import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdcloseService {
    constructor(private http: HttpService) { }
    /** This is description of the obeExecuteQuery function*/
    obeExecuteQuery(obj) {
        return this.http.post('ocdclose/obeExecuteQuery', obj);
    }
    /** This is description of the obeCommit function*/
    obeCommit(obj) {
        return this.http.post('ocdclose/obeCommit', obj);
    }
    /** This is description of the navigationDummyRecordGroup function*/
    navigationDummyRecordGroup() {
        return this.http.get('ocdclose/navigationDummyRecordGroup');
    }
    /** This is description of the cgfkObedspdescriptionRecordGroup function*/
    cgfkObedspdescriptionRecordGroup() {
        return this.http.get('ocdclose/cgfk$obeDspDescriptionRecordGroup');
    }
    /** This is description of the cgfkObedspdescription2RecordGroup function*/
    cgfkObedspdescription2RecordGroup() {
        return this.http.get('ocdclose/cgfk$obeDspDescription2RecordGroup');
    }
    /** This is description of the obeCommit function*/
    checkInstitution(obj) {
        return this.http.post('ocdclose/checkInstitution', obj);
    }
    /** This is description of the obeCommit function*/
    checkMultyCaseload(obj) {
        return this.http.post('ocdclose/checkMultyCaseload', obj);
    }
    /** This is description of the cgfkObedspdescription2RecordGroup function*/
    getBokingBeginDate(obj) {
        return this.http.post('ocdclose/getBokingBeginDate', obj);
    }
    preInsert(obj) {
        return this.http.post('ocdclose/preInsert', obj);
    }
    tagTerminationChkTasks(obj) {
        return this.http.post('ocdclose/tagTerminationChkTasks', obj);
    }
    isActiveOrderPresent(offenderBookId) {
		return this.http.get('ocdclose/isActiveOrderPresent?offenderBookId=' + offenderBookId);
	}
}
