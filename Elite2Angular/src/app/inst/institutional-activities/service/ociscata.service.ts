import { Injectable } from '@angular/core';

import { VCourseActivities } from '@instinstitutionalactivitiesbeans/VCourseActivities';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OciscataService {
        vCourseActivities = new VCourseActivities();
    constructor(private http: HttpService) { }
    /** This is description of the vCrsActExecuteQuery function*/
    vCrsActExecuteQuery(obj) {
        return this.http.post('ociscata/vCrsActExecuteQuery', obj);
    }
    /** This is description of the vCrsActCommit function*/
    vCrsActCommit(obj) {
        return this.http.post('ociscata/vCrsActCommit', obj);
    }
    /** This is description of the rgAreasRecordGroup function*/
    rgAreasRecordGroup(environment, region) {
        return this.http.get('/ociscata/rgAreasRecordGroup?environment=' + environment + '&region=' + region);
    }
    /** This is description of the rgPsAgeRangeRecordGroup function*/
    rgPsAgeRangeRecordGroup() {
        return this.http.get('ociscata/rgPsAgeRangeRecordGroup');
    }
    /** This is description of the rgPsAvailRecordGroup function*/
    rgPsAvailRecordGroup() {
        return this.http.get('ociscata/rgPsAvailRecordGroup');
    }
    /** This is description of the rgPsCategoryRecordGroup function*/
    rgPsCategoryRecordGroup() {
        return this.http.get('ociscata/rgPsCategoryRecordGroup');
    }
    /** This is description of the rgPsNeedsRecordGroup function*/
    rgPsNeedsRecordGroup() {
        return this.http.get('ociscata/rgPsNeedsRecordGroup');
    }
    /** This is description of the rgPsOffGrpsRecordGroup function*/
    rgPsOffGrpsRecordGroup() {
        return this.http.get('ociscata/rgPsOffGrpsRecordGroup');
    }
    /** This is description of the rgPsProvTypeRecordGroup function*/
    rgPsProvTypeRecordGroup() {
        return this.http.get('ociscata/rgPsProvTypeRecordGroup');
    }
    /** This is description of the rgPsSexRecordGroup function*/
    rgPsSexRecordGroup() {
        return this.http.get('ociscata/rgPsSexRecordGroup');
    }
    /** This is description of the rgEthnicityRecordGroup function*/
    rgEthnicityRecordGroup() {
        return this.http.get('ociscata/rgEthnicityRecordGroup');
    }
    /** This is description of the rgRegionRecordGroup function*/
    rgRegionRecordGroup() {
        return this.http.get('ociscata/rgRegionRecordGroup');
    }
    /** This is description of the rgServicesRecordGroup function*/
    rgServicesRecordGroup(obj) {
        return this.http.get('ociscata/rgServicesRecordGroup?category=' + obj);
    }
    /** This is description of the rgCsldCodeRecordGroup function*/
    rgCsldCodeRecordGroup() {
        return this.http.get('ociscata/rgCsldCodeRecordGroup');
    }
    /** This is description of the rgTeamAgyLocsRecordGroup function*/
    rgTeamAgyLocsRecordGroup() {
        return this.http.get('ociscata/rgTeamAgyLocsRecordGroup');
    }
    /** This is description of the rgCorpLocsRecordGroup function*/
    rgCorpLocsRecordGroup(obj) {
        return this.http.get('ociscata/rgCorpLocsRecordGroup?category=' + obj);
    }
    /** This is description of the rgAgyLocsRecordGroup function*/
    rgAgyLocsRecordGroup() {
        return this.http.get('ociscata/rgAgyLocsRecordGroup');
    }
    /** This is description of the rgAgyLocClRecordGroup function*/
    rgAgyLocClRecordGroup() {
        return this.http.get('ociscata/rgAgyLocClRecordGroup');
    }
    /** This is description of the rgTeamUnpaidWkRecordGroup function*/
    rgTeamUnpaidWkRecordGroup() {
        return this.http.get('ociscata/rgTeamUnpaidWkRecordGroup');
    }
    /** This is description of the rgProviderDttoRecordGroup function*/
    rgProviderDttoRecordGroup() {
        return this.http.get('ociscata/rgProviderDttoRecordGroup');
    }
    /** This is description of the rgTeamAcpRecordGroup function*/
    rgTeamAcpRecordGroup() {
        return this.http.get('ociscata/rgTeamAcpRecordGroup');
    }
    /** This is description of the rgAcpProviderInstRecordGroup function*/
    rgAcpProviderInstRecordGroup(obj) {
        return this.http.get('ociscata/rgAcpProviderInstRecordGroup?caseloadId=' + obj);
    }
    /** This is description of the setupDefaults function*/
    setupDefaults(obj) {
        return this.http.get('ociscata/setupDefaults?listSeq=' + obj);
    }
    /** This is description of the getDefaultDomain function*/
    getDefaultDomain() {
        return this.http.get('ociscata/getDefaultDomain');
    }
    /** This is description of the getDefaultAgency function*/
    getDefaultAgency(obj) {
         return this.http.get('ociscata/getDefaultAgency?caseloadId=' + obj);
    }
/** This is description of the getDescCode function*/
    getDescCode(strCode, strDesc) {
           return this.http.get('/ociscata/getDescCode?strCode=' + strCode + '&strDesc=' + strDesc);
    }
       /** This is description of the getDefaultAgency function*/
    getAccProgram(obj) {
         return this.http.get('ociscata/getAccProgram?programId=' + obj);
    }
       /** This is description of the getProgramsNonAssTmp function*/
    getProgramsNonAssTmp(obj) {
         return this.http.post('ociscata/getProgramsNonAssTmp', obj);
    }
     /** This is description of the getCommDefaults function*/
    getCommDefaults(obj) {
         return this.http.get('ociscata/getCommDefaults?caseloadId=' + obj);
    }
    /** This is description of the getCommDefaults function*/
    vCrsActWhenNewRecordInstance(obj) {
        return this.http.get('ociscata/vCrsActWhenNewRecordInstance?crystalId=' + obj);
   }

   checkNonAssociationConflict(obj){
    return this.http.post('ociscata/checkNonAssociationConflict',obj);
   }

   checkNonAssociationConflictWithAllocatedOffenders(obj){
    return this.http.post('ociscata/checkNonAssociationConflictWithAllocatedOffenders',obj);
   }

   checkNonAssociationsOcdxprog(obj){
    return this.http.post('ociscata/checkNonAssociationsSpecializedPrg', obj);
   }
   
   checkNonAssociationConflictByIndAndGang(obj){
    return this.http.post('ociscata/checkNonAssociationConflictByIndAndGang',obj);
   }

   checkNonAssociationConflictWithAllocatedOffendersByIndAndGang(obj){
    return this.http.post('ociscata/checkNonAssociationConflictWithAllocatedOffendersByIndAndGang',obj);
   }

   checkNonAssociationsWorkRl(obj){
    return this.http.post('ociscata/checkNonAssociationsWorkRelease', obj);
   }

    vOffPrgProfilesExecuteQuery(obj) {
        return this.http.post('ociscata/vOffPrgProfilesExecuteQuery', obj);
    }
}
