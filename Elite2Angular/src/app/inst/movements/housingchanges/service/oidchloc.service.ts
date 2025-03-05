import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidchlocService {
    exitFlag: boolean;
    checkWarnFlag: boolean;
    constructor(private http: HttpService) { }
    /** This is description of the bedAhExecuteQuery function*/
    bedAhExecuteQuery(obj) {
        return this.http.post('oidchloc/bedAhExecuteQuery', obj);
    }
    /** This is description of the bedAhCommit function*/
    bedAhCommit(obj) {
        return this.http.post('oidchloc/bedAhCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('oidchloc/sysPflExecuteQuery', obj);
    }
    /** This is description of the rgAssignmentReasonRecordGroup function*/
    rgAssignmentReasonRecordGroup() {
        return this.http.get('oidchloc/rgAssignmentReasonRecordGroup');
    }
    /** This is description of the offBookingUpdate function*/
    offBkgCommit(obj) {
        return this.http.post('oidchloc/offBookingUpdate', obj);
    }
    /** This is description of the getMovementDateAndTime function*/
    getMovementDateAndTime(obj) {
        return this.http.post('oidchloc/getMovementDateAndTime', obj);
    }
    /** This is description of the getMovementDateAndTime function*/
    getDescriptionOfLivingUnitId(obj) {
        return this.http.post('oidchloc/cgfkchkBedAhBedAhVLiv', obj);
    }
    /** This is description of the checkAllConficts function*/
    checkAllConficts(obj) {
        return this.http.post('oidchloc/checkAllConficts', obj);
    }
}
