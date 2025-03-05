import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcuoccupService {
    constructor(private http: HttpService) {}
    /** This is description of the rpOtherOccupantsExecuteQuery function*/
    rpOtherOccupantsExecuteQuery(obj) {
        return this.http.post('ocuoccup/rpOtherOccupantsExecuteQuery', obj);
    }
    /** This is description of the rpOtherOccupantsCommit function*/
    rpOtherOccupantsCommit(obj) {
        return this.http.post('ocuoccup/rpOtherOccupantsCommit', obj);
    }
    /** This is description of the rgContactedRecordGroup function*/
    rgContactedRecordGroup(obj) {
        return this.http.get( 'ocuoccup/rgContactedRecordGroup');
    }
    /** This is description of the rgPersonNameRecordGroup function*/
    rgPersonNameRecordGroup(offenderBookId) {
        return this.http.get( 'ocuoccup/rgPersonNameRecordGroup?offenderBookId=' + offenderBookId);
    }
    /** This is description of the rgContactTypesRecordGroup function*/
    rgContactTypesRecordGroup(obj) {
        return this.http.get( 'ocuoccup/rgContactTypesRecordGroup');
    }
    /** This is description of the rgRelationshipsRecordGroup function*/
    rgRelationshipsRecordGroup(obj) {
        return this.http.get( 'ocuoccup/rgRelationshipsRecordGroup');
    }
}
