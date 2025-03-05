import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmspracService {
    constructor(private http: HttpService) { }
    /** This is description of the courseActivitiesExecuteQuery function*/
    courseActivitiesExecuteQuery(obj) {
        return this.http.post('ocmsprac/courseActivitiesExecuteQuery', obj);
    }
    /** This is description of the courseActivitiesCommit function*/
    courseActivitiesCommit(obj) {
        return this.http.post('ocmsprac/courseActivitiesCommit', obj);
    }
    /** This is description of the rgAgyLocRecordGroup function*/
    rgAgyLocRecordGroup(obj) {
        return this.http.get('ocmsprac/rgAgyLocRecordGroup');
    }
    /** This is description of the rgPrisonActivityRecordGroup function*/
    rgPrisonActivityRecordGroup(obj) {
        return this.http.get('ocmsprac/rgPrisonActivityRecordGroup');
    }
    /** This is description of the rgInternalLocationRecordGroup function*/
    rgInternalLocationRecordGroup(obj) {
        return this.http.get('ocmsprac/rgInternalLocationRecordGroup');
    }
    /** This is description of the rgIepLevelRecordGroup function*/
    rgIepLevelRecordGroup(obj) {
        return this.http.get('ocmsprac/rgIepLevelRecordGroup');
    }
    chkActyEndDate(obj) {
        return this.http.post('ocmsprac/chkActyEndDate', obj);
    }
}
