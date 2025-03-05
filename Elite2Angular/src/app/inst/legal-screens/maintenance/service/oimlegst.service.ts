import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OimlegstService {
    constructor(private http: HttpService) { }
    /** This is description of the updateReasonsExecuteQuery function*/
    updateReasonsExecuteQuery(obj) {
        return this.http.post('oimlegst/updateReasonsExecuteQuery', obj);
    }
    /** This is description of the updateReasonsCommit function*/
    updateReasonsCommit(obj) {
        return this.http.post('oimlegst/updateReasonsCommit', obj);
    }
    /** This is description of the rgCatRecordGroup function*/
    rgCatRecordGroup(obj) {
        return this.http.get('oimlegst/rgCatRecordGroup');
    }
    /** This is description of the rgStatRecordGroup function*/
    rgStatRecordGroup(obj) {
        return this.http.get('oimlegst/rgStatRecordGroup');
    }
    getDeleteRecordOrNot(obj) {
        return this.http.post('oimlegst/getDeleteRecordOrNot', obj);
    }
}
