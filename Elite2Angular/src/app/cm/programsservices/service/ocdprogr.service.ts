import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';
import { OffenderProgramProfiles } from '@instprogramswithoutschedulesbeans/OffenderProgramProfiles';
@Injectable({ providedIn: 'root' })
export class OcdprogrService {
    exitFlag: Boolean;
    vcrsactData: any[] = [];
    offpgmprofServiceBean: OffenderProgramProfiles = new OffenderProgramProfiles();
    constructor(private http: HttpService) { }
    /** This is description of the vOffPrgOblExecuteQuery function*/
    vOffPrgOblExecuteQuery(obj) {
        return this.http.post('ocdprogr/vOffPrgOblExecuteQuery', obj);
    }
    /** This is description of the vOffPrgOblCommit function*/
    vOffPrgOblCommit(obj) {
        return this.http.post('ocdprogr/vOffPrgOblCommit', obj);
    }
    /** This is description of the vAcpProgressExecuteQuery function*/
    vAcpProgressExecuteQuery(obj) {
        return this.http.post('ocdprogr/vAcpProgressExecuteQuery', obj);
    }
    /** This is description of the vAcpProgressCommit function*/
    vAcpProgressCommit(obj) {
        return this.http.post('ocdprogr/vAcpProgressCommit', obj);
    }
    /** This is description of the offPgmProfExecuteQuery function*/
    offPgmProfExecuteQuery(obj) {
        return this.http.post('ocdprogr/offPgmProfExecuteQuery', obj);
    }
    /** This is description of the offPgmProfCommit function*/
    offPgmProfCommit(obj) {
        return this.http.post('ocdprogr/offPgmProfCommit', obj);
    }
    /** This is description of the offCrsAppExecuteQuery function*/
    offCrsAppExecuteQuery(obj) {
        return this.http.post('ocdprogr/offCrsAppExecuteQuery', obj);
    }
    /** This is description of the offCrsAppCommit function*/
    offCrsAppCommit(obj) {
        return this.http.post('ocdprogr/offCrsAppCommit', obj);
    }
    /** This is description of the rgOffPrgStsRecordGroup function*/
    rgOffPrgStsRecordGroup(obj) {
        return this.http.get('ocdprogr/rgOffPrgStsRecordGroup');
    }
    /** This is description of the rgIntLocationRecordGroup function*/
    rgIntLocationRecordGroup(obj) {
        return this.http.get('ocdprogr/rgIntLocationRecordGroup');
    }
    /** This is description of the rgProgramServicesRecordGroup function*/
    rgProgramServicesRecordGroup(obj) {
        return this.http.get('ocdprogr/rgProgramServicesRecordGroup');
    }
    /** This is description of the rgPsPrgAvailRecordGroup function*/
    rgPsPrgAvailRecordGroup(obj) {
        return this.http.get('ocdprogr/rgPsPrgAvailRecordGroup');
    }
    /** This is description of the rgOffenderSentencesRecordGroup function*/
    rgOffenderSentencesRecordGroup(offenderBookId) {
        return this.http.get('ocdprogr/rgOffenderSentencesRecordGroup?offenderBookId=' + offenderBookId);
    }
    /** This is description of the rgEventSubTypesRecordGroup function*/
    rgEventSubTypesRecordGroup(obj) {
        return this.http.get('ocdprogr/rgEventSubTypesRecordGroup');
    }
    /** This is description of the rgOutcomeReasonsRecordGroup function*/
    rgOutcomeReasonsRecordGroup(obj) {
        return this.http.get('ocdprogr/rgOutcomeReasonsRecordGroup');
    }
    /** This is description of the rgAgyLocIdRecordGroup function*/
    rgAgyLocIdRecordGroup(obj) {
        return this.http.get('ocdprogr/rgAgyLocIdRecordGroup');
    }
    /** This is description of the rgPhasesRecordGroup function*/
    rgPhasesRecordGroup(obj) {
        return this.http.get('ocdprogr/rgPhasesRecordGroup');
    }
    /** This is description of the rgModulesRecordGroup function*/
    rgModulesRecordGroup(obj) {
        return this.http.get('ocdprogr/rgModulesRecordGroup');
    }
    /** This is description of the rgEngagementRecordGroup function*/
    rgEngagementRecordGroup(obj) {
        return this.http.get('ocdprogr/rgEngagementRecordGroup');
    }
    /** This is description of the rgUnderstandingRecordGroup function*/
    rgUnderstandingRecordGroup(obj) {
        return this.http.get('ocdprogr/rgUnderstandingRecordGroup');
    }
    /** This is description of the rgPsEndAllocRecordGroup function*/
    rgPsEndAllocRecordGroup(obj) {
        return this.http.get('ocdprogr/rgPsEndAllocRecordGroup');
    }
    /** This is description of the rgFutureAttendanceRecordGroup function*/
    rgFutureAttendanceRecordGroup(obj) {
        return this.http.get('ocdprogr/rgFutureAttendanceRecordGroup');
    }
    /** This is description of the rgFutureAttendanceRecordGroup function*/
    getOffenderDates(obj) {
        return this.http.get( 'ocdprogr/getOffenderDates?offenderBookId=' + obj);
    }
    rgObligationSource() {
        return this.http.get('ocdprogr/rgObligationSource');
    }
    checkScheduleConflict(obj) {
        return this.http.post('ocdprogr/checkScheduleConflict', obj);
    }
    checkUa(obj) {
        return this.http.post('ocdprogr/checkUa', obj);
    }
    validAllocationEndDate(obj) {
        return this.http.post('ocdprogr/validAllocationEndDate', obj);
    }
    checkAttendanceOutcomes(obj) {
         return this.http.post('ocdprogr/checkAttendanceOutcomes', obj);
    }
    checkAllocationExists(obj) {
        return this.http.post('ocdprogr/checkAllocationExists', obj);
   }

    /** This is description of the rgChecklistAnsRecordGroup function*/
    rpReadyForApproval(obj) {
        return this.http.post('ocdprogr/rpReadyForApproval', obj);
    }

    checkNonAssociations(obj) {
        return this.http.post('ocdprogr/checkNonAssociations', obj);
    }

    rgOffenderSentencesRecordGroupComm(offenderBookId) {
        return this.http.get('ocdxprog/rgOffenderSentencesRecordGroupComm?offenderBookId=' + offenderBookId);
    } // Need to verify

    checkInstNonAssociation(obj){
      return  this.http.post('ocdprogr/checkInstNonAssociation',obj);
    }

    checkInstNonAssociationsWhileScheduling(obj){
        return this.http.post('ocdprogr/checkInstNonAssociationsWhileScheduling',obj);
    }

    rgOffenderSentencesRecordGroupBothCustAndNonCust(offenderBookId) {
        return this.http.get('ocdxprog/rgOffenderSentencesRecordGroupBothCustAndNonCust?offenderBookId=' + offenderBookId);
    } // Need to verify
    //Moved from ocusmoduService
    vAcpSchExecuteQuery(obj) {
		return this.http.post('ocdprogr/vAcpSchExecuteQuery', obj);
	}
}
