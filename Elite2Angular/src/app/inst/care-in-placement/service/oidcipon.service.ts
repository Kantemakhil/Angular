import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';
import { OffenderCipDetails } from '../beans/OffenderCipDetails';

@Injectable({providedIn: 'root'})
export class OidciponService {
    exitFlag: boolean;
    oiicponServiceModel: OffenderCipDetails = new OffenderCipDetails();
    constructor(private http: HttpService) { }
    /** This is description of the offCipDetailsExecuteQuery function*/
    offCipDetailsExecuteQuery(obj) {
        return this.http.post('oidcipon/offCipDetailsExecuteQuery', obj);
    }
    /** This is description of the offCipDetailsCommit function*/
    offCipDetailsCommit(obj) {
        return this.http.post('oidcipon/offCipDetailsCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('oidcipon/sysPflExecuteQuery', obj);
    }
    /** This is description of the rgPlacementReasonRecordGroup function*/
    rgPlacementReasonRecordGroup(placementType) {
        return this.http.get('oidcipon/rgPlacementReasonRecordGroup?placementType=' + placementType);
    }
    /** This is description of the rgPlacementTypeRecordGroup function*/
    rgPlacementTypeRecordGroup() {
        return this.http.get('oidcipon/rgPlacementTypeRecordGroup');
    }
    /** This is description of the rgAgyLocsRecordGroup function*/
    rgAgyLocsRecordGroup(caseloadId) {
        return this.http.get('oidcipon/rgAgyLocsRecordGroup?caseloadId=' + caseloadId);
    }
    /** This is description of the rgRequestedByRecordGroup function*/
    rgRequestedByRecordGroup() {
        return this.http.get('oidcipon/rgRequestedByRecordGroup');
    }
    /** This is description of the rgAuthorizedByRecordGroup function*/
    rgAuthorizedByRecordGroup() {
        return this.http.get('oidcipon/rgAuthorizedByRecordGroup');
    }
    /** This is description of the rgDurationTypeRecordGroup function*/
    rgDurationTypeRecordGroup(placementType) {
        return this.http.get('oidcipon/rgDurationTypeRecordGroup?placementType=' + placementType);
    }
    /** This is description of the rgReleasedByRecordGroup function*/
    rgReleasedByRecordGroup() {
        return this.http.get('oidcipon/rgReleasedByRecordGroup');
    }
    /** This is description of the dtValidationForInactiveOff function*/
    dtValidationForInactiveOff(obj) {
        return this.http.post('oidcipon/dtValidationForInactiveOff', obj);
    }
    /** This is description of the defaultDurationType function*/
    defaultDurationType(obj) {
        return this.http.post('oidcipon/defaultDurationType', obj);
    }
    checkDate(obj) {
        delete obj['image'];
        delete obj['imageThumbnail'];
        return this.http.post('oidcipon/checkDate', obj);
    }
}
