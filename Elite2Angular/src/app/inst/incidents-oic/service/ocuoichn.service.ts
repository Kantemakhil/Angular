import { Injectable } from '@angular/core';


import { HttpService } from '../../../core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcuoichnService {
    constructor(private http: HttpService) {}
    /** This is description of the oicHearExecuteQuery function*/
    oicHearExecuteQuery(obj) {
        return this.http.post('ocuoichn/oicHearExecuteQuery', obj);
    }
    /** This is description of the oicHearCommit function*/
    oicHearCommit(obj) {
        return this.http.post('ocuoichn/oicHearCommit', obj);
    }
    /** This is description of the oicHearNotiExecuteQuery function*/
    oicHearNotiExecuteQuery(obj) {
        return this.http.post('ocuoichn/oicHearNotiExecuteQuery', obj);
    }
    /** This is description of the oicHearNotiCommit function*/
    oicHearNotiCommit(obj) {
        return this.http.post('ocuoichn/oicHearNotiCommit', obj);
    }
    /** This is description of the rgAgyIncpStaffIdRecordGroup function*/
    rgAgyIncpStaffIdRecordGroup(obj) {
        return this.http.get( 'ocuoichn/rgAgyIncpStaffIdRecordGroup', obj);
    }
    /** This is description of the rgHearingTypeRecordGroup function*/
    rgHearingTypeRecordGroup() {
        return this.http.get( 'ocuoichn/rgHearingTypeRecordGroup');
    }
    /** This is description of the rgInternalLocationsRecordGroup function*/
    rgInternalLocationsRecordGroup(obj) {
        return this.http.get( 'ocuoichn/rgInternalLocationsRecordGroup?caseloadId=' + obj);
    }
    /** This is description of the oicHearOnCheckDeleteMasteroic_hear_noti_cur function*/
    oicHearOnCheckDeleteMasteroichearnoticur(obj) {
        return this.http.get( 'ocuoichn/oicHearOnCheckDeleteMasterOicHearNotiCur', obj);
    }
    /** This is description of the oicHearPreInsertget_event_id_cur function*/
    oicHearPreInsertgeteventidcur(obj) {
        return this.http.post('ocuoichn/oicHearPreInsertgetEventIdCur', obj);
    }
       /** This is description of the oicHearCheckScheduleConflict function*/
       oicHearCheckScheduleConflict(obj) {
        return this.http.post('ocuoichn/oicHearCheckScheduleConflict', obj);
    }
    /*  To get  non-association offender details on same date and same location */
    nonAssocationOffendersData(obj) {
        return this.http.post('ocuoichn/checkNonAssociations', obj);
      }

}
