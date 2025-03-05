import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidvtourService {
    constructor(private http: HttpService) { }
    /** This is description of the visitingGroupsExecuteQuery function*/
    visitingGroupsExecuteQuery(obj) {
        return this.http.post('oidvtour/visitingGroupsExecuteQuery', obj);
    }
    /** This is description of the visitingGroupsCommit function*/
    visitingGroupsCommit(obj) {
        return this.http.post('oidvtour/visitingGroupsCommit', obj);
    }
    /** This is description of the visitingMembersExecuteQuery function*/
    visitingMembersExecuteQuery(obj) {
        return this.http.post('oidvtour/visitingMembersExecuteQuery', obj);
    }
    /** This is description of the visitingMembersCommit function*/
    visitingMembersCommit(obj) {
        return this.http.post('oidvtour/visitingMembersCommit', obj);
    }
    /** This is description of the rgGroupPurposRecordGroup function*/
    rgGroupPurposRecordGroup() {
        return this.http.get('oidvtour/rgGroupPurposRecordGroup');
    }
    /** This is description of the rgIdTypeRecordGroup function*/
    rgIdTypeRecordGroup() {
        return this.http.get('oidvtour/rgIdTypeRecordGroup');
    }
    /** This is description of the rgStaffMembersRecordGroup function*/
    rgStaffMembersRecordGroup() {
        return this.http.get('oidvtour/rgStaffMembersRecordGroup');
    }
    /** This is description of the rgAgencyLocationsRecordGroup function*/
    rgAgencyLocationsRecordGroup(caseloadId, caseloadType) {
        return this.http.get('oidvtour/rgAgencyLocationsRecordGroup?caseloadId=' + caseloadId + '&caseloadType=' + caseloadType);
    }
}


