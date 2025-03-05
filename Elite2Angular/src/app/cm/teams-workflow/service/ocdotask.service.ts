import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdotaskService {
    constructor(private http: HttpService) { }
    /** This is description of the tasksExecuteQuery function*/
    tasksExecuteQuery(obj) {
        return this.http.post('ocdotask/tasksExecuteQuery', obj);
    }
    /** This is description of the rgCompleteRsnRecordGroup function*/
    rgCompleteRsnRecordGroup() {
        return this.http.get('ocdotask/rgCompleteRsnRecordGroup');
    }
    /** This is description of the rgStaffRecordGroup function*/
    rgStaffRecordGroup() {
        return this.http.get('ocdotask/rgStaffRecordGroup');
    }
    /** This is description of the rgTeamRecordGroup function*/
    rgTeamRecordGroup() {
        return this.http.get('ocdotask/rgTeamRecordGroup');
    }
    /** This is description of the rgTaskSubTypeRecordGroup function*/
    rgTaskSubTypeRecordGroup() {
        return this.http.get('ocdotask/rgTaskSubTypeRecordGroup');
    }
    /** This is description of the rgTaskTypeRecordGroup function*/
    rgTaskTypeRecordGroup() {
        return this.http.get('ocdotask/rgTaskTypeRecordGroup');
    }
}
