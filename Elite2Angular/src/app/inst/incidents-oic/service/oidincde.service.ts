import { Injectable } from '@angular/core';


import { VAgencyIncidents } from '@instincidentsbeans/VAgencyIncidents';
import { HttpService } from '../../../core/service/http.service';
import { AgencyIncidents } from '@instincidentsbeans/AgencyIncidents';
@Injectable({providedIn: 'root'})
export class OidincdeService {
     falg: boolean;
     incidentDate: any;
     staffDetails:any;
     vagyincDataRowData: any[] = [];
     statusOption: any[] = [];
     locationOption: any[] = [];
     chargeoicId: any;
     gender: any;
     selected: number;
     _selectedInvolvedOffender:any;
     vagyincModel: VAgencyIncidents = new VAgencyIncidents();
     agyincModelTemp: AgencyIncidents = new AgencyIncidents();
     agencyIncidentsModelTempModal: AgencyIncidents = new AgencyIncidents();
     staffId: any;
     rowIndex: number;
     indexValue: number;
     tableIndex: any;
    constructor(private http: HttpService) { }

    /** This is description of the rgIncidentTypesRecordGroup function*/
    rgIncidentTypesRecordGroup() {
        return this.http.get('oidincde/rgIncidentTypesRecordGroup');
    }
    /** This is description of the oidincdergagylocidsRecordGroup function*/
    rgAgyLocIdsRecordGroup(caseLoadId,caseLoadType) {
        return this.http.get('oidincde/rgAgyLocIdsRecordGroup?caseloadId=' + caseLoadId + '&caseLoadType=' + caseLoadType);
    }
    /** This is description of the glevelinternallocationidsRecordGroup function*/
    rgLevelInternalLocationIdsRecordGroup(agencyLocId) {
        return this.http.get('oidincde/rgLevelInternalLocationIdsRecordGroup?agyLocId=' + agencyLocId);
    }
    /** This is description of the rgreportedstaffidsRecordGroup function*/
    rgReportedStaffIdsRecordGroup(caseLoadId) {
        return this.http.get('oidincde/rgReportedStaffIdsRecordGroup?caseloadId=' + caseLoadId);
    }

    /** This is description of the oidincdergrepairtypesRecordGroup function*/
    oidincdergrepairtypesRecordGroup() {
        return this.http.get('/oidincde/rgRepairTypesRecordGroup');
    }
    /** This is description of the rgoffinvincidentrolesRecordGroup function*/
    rgoffinvincidentrolesRecordGroup() {
        return this.http.get('oidincde/rgOffInvIncidentRolesRecordGroup');
    }
    /** This is description of the oidincdergoffinvactioncodesRecordGroup function*/
    oidincdergoffinvactioncodesRecordGroup() {
        return this.http.get('/oidincde/rgOffInvActionCodesRecordGroup');
    }
    /** This is description of the oidincdergstaffinvincidentrolesRecordGroup function*/
    oidincdergstaffinvincidentrolesRecordGroup() {
        return this.http.get('/oidincde/rgStaffInvIncidentRolesRecordGroup');
    }
    /** This is description of the agencyIncidents function*/
    agencyIncidentsCommit(agencyBean) {
        return this.http.post('oidincde/agencyIncidentsCommit', agencyBean);
    }
    /** This is description of the agencyincidentrepairsCommit function*/
    agencyincidentrepairsCommit(obj) {
        return this.http.post('oidincde/agencyIncidentRepairsCommit', obj );
    }
    sigificantIncidentExecuteQuery(obj){
        return this.http.post('oidincde/sigificantIncidentExecuteQuery', obj);
    }
    sigificantIncidentCommmit(obj){
        return this.http.post('oidincde/sigificantIncidentCommit', obj );  
    }
    /** This is description of the agencyincidentpartiesCommit function*/
    agyincpartiesoffenderCommit(obj) {
        return this.http.post('oidincde/agyIncPartiesOffenderCommit', obj);
    }
    /** This is description of the agencyincidentpartiesCommit function*/
    agyincpartieStaffCommit(obj) {
        return this.http.post('oidincde/agyIncstaffCommit', obj);
    }
    
    /** This is description of the agencyincidentrepairsExecuteQuery function*/
    agencyincidentrepairsExecuteQuery(obj) {
        return this.http.post('oidincde/agencyIncidentRepairsExecuteQuery', obj);
    }
    /** This is description of the agencyincidentsExecuteQuery function*/
    agencyIncidentsExecuteQuery(obj) {
        return this.http.post('oidincde/agencyIncidentsExecuteQuery', obj);
    }
    /** This is description of the agencyincidentsChargesCommit function*/
    agencyincidentsChargesCommit(obj) {
        return this.http.post('/oidincde/agencyIncidentChargesCommit', obj);
    }
    /** This is description of the agyincpartiesoffenderExecuteQuery function*/
    agyincpartiesoffenderExecuteQuery(obj) {
        return this.http.post('oidincde/agyIncPartiesOffenderExecuteQuery', obj);
    }
    agyincpartiesstaffExecuteQuery(obj) {
        return this.http.post('oidincde/agyIncPartiesstaffExecuteQuery', obj);
    }
    /** This is description of the agencyincidentchargesExecuteQuery function*/
    agencyincidentchargesExecuteQuery(obj) {
        return this.http.post('oidincde/agencyIncidentChargesExecuteQuery', obj);
    }
 /** This is description of the agencyincidentsExecuteQuery function*/
    agencystaffModelExecuteQuery(userId) {
        return this.http.get('oidincde/agencystaffModelExecuteQuery?userId=' + userId);
    }
    getSignificantTypes(userId, moduleName) {
        return this.http.get('getReferenceDomainCodes?domain=SIG_INC_TYPE&moduleName='+moduleName);
    }
    
      oidincdergoicoffencecodesRecordGroup(startDate, endDate) {
        return this.http.get('oidincde/rgOicOffenceCodesRecordGroup?startDate='+startDate+'&endDate='+endDate);
    }
    getEnhancedStaffReporter(staffId) {
        return this.http.get('oidincde/getEnhancedStaffReporter?staffId=' + staffId);
    }


    incidentFollowUpcommit(obj) {
        return this.http.post('/oidincde/incidentFollowUpcommit', obj);
    }
    /** This is description of the agyincpartiesoffenderExecuteQuery function*/
    getIncidentFollowUpDetails(obj) {
        return this.http.post('oidincde/getIncidentFollowUpDetails', obj);
    }

    
    get selectedInvolvedOffender(): any {
        return this._selectedInvolvedOffender;
    }

    set selectedInvolvedOffender(offender: any) {
     this._selectedInvolvedOffender=offender;
    }

    checkPermisionForTabAccess() {
		return this.http.get('oidincde/checkPermisionForTabAccess');
	}

    getCountDownTime(obj){
        return this.http.post('oidistrfp/getCountDownTime',obj);
      }

    rgRoleStaffIdsRecordGroup(caseLoadId, agyLocId) {
        return this.http.get('oidincde/rgRoleStaffIdsRecordGroup?caseloadId=' + caseLoadId + '&agyLocId=' + agyLocId);
    }

    getReportDetailsExecuteQuery(obj) {
        return this.http.post('oidincde/getReportDetailsExecuteQuery', obj);
    }
  
    reportableIncedentDetailsCommit(obj) {
        return this.http.post('oidincde/reportableIncedentDetailsCommit', obj);
    }

    getUserNameLog() {
        return this.http.get( 'oidincde/getUserNameLog');
    }

    offbkgGlobalQuery(obj) {
        return this.http.post('oidincde/offbkgGlobalQuery', obj);
   }
}
