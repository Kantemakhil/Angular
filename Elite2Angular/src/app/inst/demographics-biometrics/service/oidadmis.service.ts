import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidadmisService {
    constructor(private http: HttpService) { }
    /** This is description of the offBkgExecuteQuery function*/
    offBkgExecuteQuery(obj) {
        return this.http.post('oidadmis/offbkgExecuteQuery', obj);
    }
    /** This is description of the offBkgsExecuteQuery function*/
    offBkgsExecuteQuery(obj) {
        return this.http.post('oidadmis/offBkgsExecuteQuery', obj);
    }
    /** This is description of the offEmExecuteQuery function*/
    offEmExecuteQuery(obj) {
        return this.http.post('oidadmis/offemExecuteQuery', obj);
    }
    /** This is description of the offEmCommit function*/
    offEmCommit(obj) {
        return this.http.post('oidadmis/offemCommit', obj);
    }
    /** This is description of the bedAhExecuteQuery function*/
    bedAhExecuteQuery(obj) {
        return this.http.post('oidadmis/bedAhExecuteQuery', obj);
    }
    /** This is description of the bedAhCommit function*/
    offBookingCommit(obj) {
        return this.http.post('oidadmis/offBookingCommit', obj);
    }
    /** This is description of the offTxnExecuteQuery function*/
    offTxnExecuteQuery(obj) {
        return this.http.post('oidadmis/offTxnExecuteQuery', obj);
    }
    /** This is description of the offTxnCommit function*/
    offTxnCommit(obj) {
        return this.http.post('oidadmis/offTxnCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('oidadmis/sysPflExecuteQuery', obj);
    }
    /** This is description of the sysPflCommit function*/
    sysPflCommit(obj) {
        return this.http.post('oidadmis/sysPflCommit', obj);
    }
    /** This is description of the cgfkOffemdspdescriptionRecordGroup function*/
    cgfkOffemdspdescriptionRecordGroup(systemMode) {
        return this.http.get('oidadmis/cgfkOffEmDspDescriptionRecordGroup?systemMode=' + systemMode);
    }
    /** This is description of the cgfkBedahdspdescriptionRecordGroup function*/
    cgfkBedahdspdescriptionRecordGroup() {
        return this.http.get('oidadmis/cgfk$bedAhDspDescriptionRecordGroup');
    }

    /** This is description of the cgfkOffEmDspDescriptionAgyLocIdRecordGroup function*/
    cgfkOffEmDspDescriptionAgyLocIdRecordGroup() {
        return this.http.get('oidadmis/cgfkOffEmDspDescriptionAgyLocIdRecordGroup');
    }
    /** This is description of the cgfkOffEmDspDescriptionMrRecordGroup function*/
    cgfkOffEmDspDescriptionMrRecordGroup(movementReasonCode) {
        return this.http.get('oidadmis/cgfkOffEmDspDescriptionMrRecordGroup?movementReasonCode=' + movementReasonCode);
    }
    /** This is description of the cgfkOffEmDspDescriptionCaseloadIdRecordGroup function*/
    cgfkOffEmDspDescriptionCaseloadIdRecordGroup(caseloadId) {
        return this.http.get('oidadmis/cgfkOffEmDspDescriptionCaseloadIdRecordGroup?caseloadId=' + caseloadId);
    }
    /** This is description of the cgfkOffEmDspDescriptionRcRecordGroup function*/
    cgfkOffEmDspDescriptionRcRecordGroup(const0) {
        return this.http.get('oidadmis/cgfkOffEmDspDescriptionRcRecordGroup?const0=' + const0);
    }
    /** This is description of the cgfkchkOffBkgsOffBkgStafc function*/
    cgfkchkOffBkgsOffBkgStafc(assignedStaffId) {
        return this.http.get('oidadmis/cgfkchkOffBkgsOffBkgStafc?assignedStaffId=' + assignedStaffId);
    }
    /** This is description of the cgfkchkOffBkgsOffBkgRef function*/
    cgfkchkOffBkgsOffBkgRef(bookingStatus) {
        return this.http.get('oidadmis/cgfkchkOffBkgsOffBkgRef?bookingStatus=' + bookingStatus);
    }
    /** This is description of the rgReferenceCodesStatus function*/
    rgReferenceCodesStatus() {
        return this.http.get('oidadmis/rgReferenceCodesStatus');
    }
    /** This is description of the getSaffmembersDescription function*/
    getSaffmembersDescription() {
        return this.http.get('oidadmis/getSaffmembersDescription');
    }
    /** This is description of the offBkgExecuteQuery function*/
    cgfkOffEmDspDescriptionRGroup(obj) {
        return this.http.post('oidadmis/cgfkOffEmDspDescriptionRGroup', obj);
    }
    /** This is description of the caseloadIdValue function*/
    caseloadIdValue(offenderId) {
        return this.http.get('oidadmis/caseloadIdValue?offenderId=' + offenderId);
    }
    /** This is description of the caseloadIdValue function*/
    validateMovementDatemaxDate(offenderBookId) {
        return this.http.get('oidadmis/validateMovementDatemaxDate?offenderBookId=' + offenderBookId);
    }
    /** This is description of the cgfkOffEmDspDescriptionCaseloadIdRecordGroup function*/
    dafaultLocationData(caseloadId) {
        return this.http.get('oidadmis/dafaultLocationData?caseloadId=' + caseloadId);
    }
    getAdmissionType(obj) { 
        return this.http.post('oidadmis/getAdmissionType', obj);
    }
    offEmWhenNewBlockInstancecasAgyCur(caseloadId) {
        return this.http.get('oidadmis/offEmWhenNewBlockInstancecasAgyCur?caseloadId=' + caseloadId);
    }
    getConflictEvent(obj){
        return this.http.post('oidadmis/getConflictEvent', obj);   
    }
    /** This is description of the chkTrustFlag function*/
    chkTrustFlag(caseloadId) {
        return this.http.get('oidadmis/chkTrustFlag?caseloadId=' + caseloadId);
    }
    chkOffenderDeductions(obj) {
        return this.http.post('oidadmis/chkOffenderDeductions', obj);
    }
    getFromLocationList(){
        return this.http.get('oidadmis/cgfkOffEmDspDescriptionAgyLocIdRecordGroup');
    } 

    getOffenderAlertMsg(obj) {
        return this.http.post('oidadmis/getOffenderAlertMsg' , obj);
    }

    checkAllConficts(obj) {
        return this.http.post('oidadmis/checkAllConficts', obj);
    }
}
