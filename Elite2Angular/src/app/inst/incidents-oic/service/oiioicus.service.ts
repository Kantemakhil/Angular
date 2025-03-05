import { Injectable } from '@angular/core';


import { HttpService } from '../../../core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiioicusService {
   constructor(private http: HttpService) {}
    /** This is description of the vOicInciExecuteQuery function*/
    vOicInciExecuteQuery(obj) {
        return this.http.post('oiioicus/vOicInciExecuteQuery', obj) ;
    }
    /** This is description of the vOicHearExecuteQuery function*/
    vOicHearExecuteQuery(obj) {
        return this.http.post('oiioicus/vOicHearSearchVOicHearings', obj);
    }
    /** This is description of the vOicHearResExecuteQuery function*/
    vOicHearResExecuteQuery(obj) {
        return this.http.post('oiioicus/vOicHearResSearchVOicHearingResults', obj);
    }
    /** This is description of the vOffOicSanctExecuteQuery function*/
    vOffOicSanctExecuteQuery(obj) {
        return this.http.post('oiioicus/vOffOicSanctSearchVOffenderOicSanctions', obj);
    }
    /** This is description of the rgOicHearingTypeRecordGroup function*/
    rgOicHearingTypeRecordGroup() {
        return this.http.get( 'oiioicus/rgOicHearingTypeRecordGroup');
    }
    /** This is description of the rgIncidentTypeRecordGroup function*/
    rgIncidentTypeRecordGroup() {
        return this.http.get( 'oiioicus/rgIncidentTypeRecordGroup');
    }
    /** This is description of the rgOffenceTypeRecordGroup function*/
    rgOffenceTypeRecordGroup(obj) {
        return this.http.get( 'oiioicus/rgOffenceTypeRecordGroup', obj);
    }
    /** This is description of the rgSanctionCodeRecordGroup function*/
    rgSanctionCodeRecordGroup() {
        return this.http.get( 'oiioicus/rgSanctionCodeRecordGroup');
    }
    /** This is description of the offBkgOnCheckDeleteMasterv_oic_inci_cur function*/
    offBkgOnCheckDeleteMasterv_oic_inci_cur(obj) {
        return this.http.get( 'oiioicus/offBkgOnCheckDeleteMastervOicInciCur', obj);
    }
    /** This is description of the vOicInciOnCheckDeleteMasterv_oic_hear_cur function*/
    vOicInciOnCheckDeleteMastervoichearcur(obj) {
        return this.http.get( 'oiioicus/vOicInciOnCheckDeleteMastervOicHearCur', obj);
    }
    /** This is description of the vOicHearOnCheckDeleteMasterv_oic_hear_res_cur function*/
    vOicHearOnCheckDeleteMastervoichearrescur(obj) {
        return this.http.get( 'oiioicus/vOicHearOnCheckDeleteMastervOicHearResCur', obj);
    }
    /** This is description of the vOicHearResOnCheckDeleteMasterv_off_oic_sanct_cur function*/
    vOicHearResOnCheckDeleteMastervoffoicsanctcur(obj) {
        return this.http.get( 'oiioicus/voichearresoncheckdeletemastervOffOicSanctCur', obj);
    }
    /** This is description of the getProfileValue2vsProfvalCur function*/
    getProfileValuevsProfvalCur(obj) {
        return this.http.post('oiioicus/getProfileValuevsProfvalCur', obj);
    }
    getHearingStaffNameList() {
        return this.http.get('oiioicus/getHearingStaffNameList');
    }
    getHearingResultsOicOffenceDes() {
        return this.http.get('oiioicus/getHearingResultsOicOffenceDes');
    }
    getHearingResultsType() {
        return this.http.get('oiioicus/getHearingResultsType');
    }
    getDiscOicSanctionDes() {
        return this.http.get('oiioicus/getDiscOicSanctionDes');
    }
    getDiscStatusDes() {
        return this.http.get('oiioicus/getDiscStatusDes');
    }
    findLocationList() {
        return this.http.get('oiioicus/findLocationList');
    }
    rgInternalLocationsRecordGroup(obj) {
        return this.http.get( 'oiioicus/rgInternalLocationsRecordGroup?caseloadId=' + obj);
    }
    rgFindingRecordGroup() {
        return this.http.get( 'oiioicus/rgFindingRecordGroup' );
    }
    rgPleaRecordGroup() {
        return this.http.get( 'oiioicus/rgPleaRecordGroup' );
    }
}
