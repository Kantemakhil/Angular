import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdintakService {
    constructor(private http: HttpService) { }
    /** This is description of the offBkgExecuteQuery function*/
    offBkgExecuteQuery(obj) {
        return this.http.post('ocdintak/offBkgExecuteQuery', obj);
    }
    /** This is description of the offBkgsExecuteQuery function*/
    offBkgsExecuteQuery(obj) {
        return this.http.post('ocdintak/offBkgsExecuteQuery', obj);
    }
    /** This is description of the offBkgeExecuteQuery function*/
    offBkgeExecuteQuery(obj) {
        return this.http.post('ocdintak/offBkgeExecuteQuery', obj);
    }
    /** This is description of the offBkgeCommit function*/
    offBkgeCommit(obj) {
        return this.http.post('ocdintak/offBkgeCommit', obj);
    }
    /** This is description of the reportInExecuteQuery function*/
    reportInExecuteQuery(obj) {
        return this.http.post('ocdintak/reportInExecuteQuery', obj);
    }
    /** This is description of the reportInCommit function*/
    reportInCommit(obj) {
        return this.http.post('ocdintak/reportInCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('ocdintak/sysPflExecuteQuery', obj);
    }
    /** This is description of the rgToAgyLocRecordGroup function*/
    rgToAgyLocRecordGroup(obj) {
        return this.http.get('ocdintak/rgToAgyLocRecordGroup');
    }
    /** This is description of the rgIntakeTypeRecordGroup function*/
    rgIntakeTypeRecordGroup(obj) {
        return this.http.get('ocdintak/rgIntakeTypeRecordGroup');
    }
    /** This is description of the rgIntakeRsnRecordGroup function*/
    rgIntakeRsnRecordGroup(obj) {
        return this.http.get('ocdintak/rgIntakeRsnRecordGroup');
    }
    /** This is description of the rgFromAgyLocRecordGroup function*/
    rgFromAgyLocRecordGroup(obj) {
        return this.http.get('ocdintak/rgFromAgyLocRecordGroup');
    }
    checkPrevBooking(obj) {
        return this.http.post('ocdintak/checkPrevBooking', obj);
    }
    createBookingLocationRecExistCur(obj) {
        return this.http.post('ocdintak/createBookingLocationRecExistCur', obj);
    }
    wNewBlockInstanceintakeCase() {
        return this.http.get('ocdintak/wNewBlockInstanceintakeCase');
    }
    checkForActiveBooking(obj) {
        return this.http.post('ocdintak/checkForActiveBooking', obj);
    }
    setNewcontactFlag(obj) {
        return this.http.post('ocdintak/setNewcontactFlag', obj);
    }
    getDefaultIntakeValues(intakeType, intakeReason) {
        return this.http.get('ocdintak/getDefaultIntakeValues?intakeType=' + intakeType + '&intakeReason=' + intakeReason);
    }
    getTrustValues(client, intakeTrust) {
        return this.http.get('ocdintak/getTrustValues?client=' + client + '&intakeTrust=' + intakeTrust);
    }
    intakeCaseMultiple(obj) {
        return this.http.post('ocdintak/intakeCaseMultiple', obj);
    }
    getDspDescription() {
        return this.http.get('ocdintak/getDspDescription');
    }
    intakeCaseactBkgExistFlag(obj) {
        return this.http.post('ocdintak/intakeCaseactBkgExistFlag', obj);
    }
    toAgyLoc(obj) {
        return this.http.post('ocdintak/toAgyLoc', obj);
    }
    getProfileValueDisabled() {
        return this.http.get('ocdintak/getProfileValueDisabled');
    }

    getProfileTrustValueDisabled() {
        return this.http.get('ocdintak/getProfileTrustValueDisabled');
    }

    setNewcontact(obj) {
        return this.http.post('ocdintak/setNewcontact', obj);
    }

    getBackdatedAdmissionDate(){
        return this.http.get('ocdintak/getBackdatedAdmissionDate');
    }

}
