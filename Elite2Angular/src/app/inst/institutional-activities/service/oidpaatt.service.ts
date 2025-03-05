import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidpaattService {
    constructor(private http: HttpService) { }
    /** This is description of the vActAttExecuteQuery function*/
    vActAttExecuteQuery(obj) {
        return this.http.post('oidpaatt/vActAttExecuteQuery', obj);
    }
    /** This is description of the vActAttCommit function*/
    vActAttCommit(obj) {
        return this.http.post('oidpaatt/vActAttCommit', obj);
    }
    /** This is description of the rgPsActPerfRecordGroup function*/
    rgPsActPerfRecordGroup(obj) {
        return this.http.get('oidpaatt/rgPsActPerfRecordGroup');
    }
    /** This is description of the rgOutcomesRecordGroup function*/
    rgOutcomesRecordGroup(obj) {
        return this.http.get('oidpaatt/rgOutcomesRecordGroup');
    }
    /** This is description of the rgServicesRecordGroup function*/
    rgServicesRecordGroup(agyLocId) {
        return this.http.get('oidpaatt/rgServicesRecordGroup?agyLocId=' + agyLocId);
    }
    /** This is description of the rgAgyLocRecordGroup function*/
    rgAgyLocRecordGroup(obj) {
        return this.http.get('oidpaatt/rgAgyLocRecordGroup');
    }
    /** This is description of the rgAgyLocRecordGroup function*/
    getdefaultAttendanceData() {
        return this.http.get('oidpaatt/defaultAttendanceData');
    }
}
