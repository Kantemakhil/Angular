import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidissueService {
  constructor(private http: HttpService) { }
  serviceData: any;
  /** This is description of the offenderGrievancesExecuteQuery function*/
  offenderGrievancesExecuteQuery(obj) {
    return this.http.post('oidissue/offenderGrievancesExecuteQuery', obj);
  }
  /** This is description of the offenderGrievancesCommit function*/
  offenderGrievancesCommit(obj) {
    return this.http.post('oidissue/offenderGrievancesCommit', obj);
  }
  /** This is description of the offenderGrievanceTxnsExecuteQuery function*/
  offenderGrievanceTxnsExecuteQuery(obj) {
    return this.http.post('oidissue/offenderGrievanceTxnsExecuteQuery', obj);
  }
  /** This is description of the offenderGrievanceTxnsCommit function*/
  offenderGrievanceTxnsCommit(obj) {
    return this.http.post('oidissue/offenderGrievanceTxnsCommit', obj);
  }
  /** This is description of the rgAgyLocRecordGroup function*/
  rgAgyLocRecordGroup(obj) {
    return this.http.get('oidissue/rgAgyLocRecordGroup');
  }
  /** This is description of the rgAgyLocAllRecordGroup function*/
  rgAgyLocAllRecordGroup(obj) {
    return this.http.get('oidissue/rgAgyLocAllRecordGroup');
  }
  /** This is description of the rgGrievTypeRecordGroup function*/
  rgGrievTypeRecordGroup(obj) {
    return this.http.get('oidissue/rgGrievTypeRecordGroup');
  }
  /** This is description of the rgGrievReasonRecordGroup function*/
  rgGrievReasonRecordGroup(grieveType) {
    return this.http.get('oidissue/rgGrievReasonRecordGroup?grieveType=' + grieveType);
  }
  /** This is description of the rgGrievReasonAllRecordGroup function*/
  rgGrievReasonAllRecordGroup(obj) {
    return this.http.get('oidissue/rgGrievReasonAllRecordGroup');
  }
  /** This is description of the rgTxnTypeRecordGroup function*/
  rgTxnTypeRecordGroup(grieveType) {
    return this.http.get('oidissue/rgTxnTypeRecordGroup?grieveType=' + grieveType);
  }
  /** This is description of the rgTxnTypeAllRecordGroup function*/
  rgTxnTypeAllRecordGroup(grievType) {
    return this.http.get('oidissue/rgTxnTypeAllRecordGroup?grievType=' + grievType);
  }
  /** This is description of the rgStaffRecordGroup function*/
  rgStaffRecordGroup(obj) {
    return this.http.get('oidissue/rgStaffRecordGroup');
  }
  /** This is description of the rgStaffAllRecordGroup function*/
  rgStaffAllRecordGroup(obj) {
    return this.http.get('oidissue/rgStaffAllRecordGroup');
  }
  /** This is description of the rgFindingRecordGroup function*/
  rgFindingRecordGroup(obj) {
    return this.http.get('oidissue/rgFindingRecordGroup');
  }
  /** This is description of the rgFindingAllRecordGroup function*/
  rgFindingAllRecordGroup(obj) {
    return this.http.get('oidissue/rgFindingAllRecordGroup');
  }
  /** This is description of the rgLevelRecordGroup function*/
  rgLevelRecordGroup(obj) {
    return this.http.get('oidissue/rgLevelRecordGroup');
  }
  /** This is description of the rgLevelAllRecordGroup function*/
  rgLevelAllRecordGroup(obj) {
    return this.http.get('oidissue/rgLevelAllRecordGroup');
  }
  /** This is description of the rgStatusRecordGroup function*/
  rgStatusRecordGroup(obj) {
    return this.http.get('oidissue/rgStatusRecordGroup');
  }
  /** This is description of the offbkgGlobalQuery function*/
  offbkgGlobalQuery(obj) {
    return this.http.post('oidissue/offbkgGlobalQuery', obj);
  }
  /** This is description of the offbkgCommGlobalQuery function*/
  offbkgCommGlobalQuery(obj) {
    return this.http.post('oidissue/offbkgCommGlobalQuery', obj);
  }
  /** This is description of the offenderGrievancesPostQueryReportDate function*/
  /** This is description of the rgTxnTypeRecordGroup function*/
  offenderGrievancesPostQueryReportDate(agyLocId) {
    return this.http.get('oidissue/offenderGrievancesPostQueryReportDate?agyLocId=' + agyLocId);
  }
  /** This is description of the daysRespondData function*/
  daysRespondData(grieveType, txnType) {
    return this.http.get('oidissue/daysRespondData?grieveType=' + grieveType + '&txnType=' + txnType);
  }
  /** This is description of the maxGrievanceIdComparison function*/
  maxGrievanceIdComparison(grievanceId) {
    return this.http.get('oidissue/maxGrievanceIdComparison?grievanceId=' + grievanceId);
  }
  /** This is description of the maxGrievanceIdComparison function*/
  validationStaff(grievanceId) {
    return this.http.get('oidissue/validationStaff?grievanceId=' + grievanceId);
  }
  oidissueWhenNewFormInstance() {
    return this.http.get('oidissue/oidissueWhenNewFormInstance');
  }

  getUserNameByCreatedUserId(createUserId){
    return this.http.get('oidissue/getUserNameByCreatedUserId?createUserId=' + createUserId);
  }
  offenderGrievStaffsExecuteQuery(obj) {
		return this.http.post('oidissue/offenderGrievStaffsExecuteQuery', obj);
  }
  agencyIncidentsExecuteQuery(rootOffenderId) {
    return this.http.get('oidissue/agencyIncidentsExecuteQuery?rootOffenderId=' + rootOffenderId);
  }
  prresExecuteQuery(obj) {
    return this.http.post('oidissue/prresExecuteQuery', obj);
 }
/** This is description of the prresCommit function*/
 prresCommit(obj) {
    return this.http.post('oidissue/prresCommit', obj);
  } 
  /** This is description of the offenderGrievStaffsCommit function*/
	offenderGrievStaffsCommit(obj) {
		return this.http.post('oidissue/offenderGrievStaffsCommit', obj);
	}
	/** This is description of the rgStaffRecordGroup function*/
	rgStaffRecordGroupOne(obj) {
		return this.http.get('oidissue/rgStaffRecordGroupone');
	}
	offenderGrievStaffsPostQuery(obj) {
		return this.http.post('oidissue/offenderGrievStaffsPostQuery', obj);
	}

}
