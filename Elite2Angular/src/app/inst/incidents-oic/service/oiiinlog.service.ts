import { Injectable } from '@angular/core';

import { VAgencyIncidents } from '@instincidentsbeans/VAgencyIncidents';
import { HttpService } from '../../../core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiiinlogService {
        checkedfalg: boolean;
        vagyincDataRowData: any[] = [];
        statusOption: any[] = [];
        locationOption: any[] = [];
        vagyincModel: VAgencyIncidents = new VAgencyIncidents();
        agencyincidentId: any;
        selected: number;
        //// this.http.post('osiosear/offbkgGlobalQuery', obj).subscribe(result => {
//            this.recordsRetrieved = result;
//        });
     vagyincModelTemp: any;
     private innerRecordsRetrieved: any[];
   // private recordsRetrieved: any[];
   clear() {
    this.vagyincModel = undefined;
    this.agencyincidentId=null;
    this.selected=null;
    this.vagyincModelTemp=null;
    this.vagyincDataRowData=null;
    }
    constructor(private http: HttpService) { }

      set recordsRetrieved(data: any[]) {
        this.innerRecordsRetrieved = data;
        // this.recordsSubject.next(this.innerRecordsRetrieved);
    }
      get recordsRetrieved(): any[] {
        return this.innerRecordsRetrieved;
    }
    /** This is description of the vAgyIncExecuteQuery function*/
    vAgyIncExecuteQuery(obj) {
        return this.http.post('oiiinlog/vAgyIncExecuteQuery', obj);
    }
    /** This is description of the rgOccurTypeRecordGroup function*/
    rgOccurTypeRecordGroup() {
        return this.http.get('oiiinlog/rgOccurTypeRecordGroup');
    }
    /** This is description of the rgAgyLocRecordGroup function*/
    rgAgyLocRecordGroup(caseLoadId,caseLoadType) {
        return this.http.get('oiiinlog/rgAgyLocRecordGroup?caseloadId=' + caseLoadId + '&caseLoadType=' + caseLoadType);
    }
    /** This is description of the rgLevelLocRecordGroup function*/
    rgLevelLocRecordGroup(obj) {
        return this.http.get('oiiinlog/rgLevelLocRecordGroup?agyLocId=' + obj);
    }
    /** This is description of the rgStaffRecordGroup function*/
    rgStaffRecordGroup(caseloadId) {
        return this.http.get('oiiinlog/rgStaffRecordGroup?caseloadId=' + caseloadId);
    }
    
    /** This is description of the findIncidentTypeDescList function*/
    findIncidentTypeDescList() {
        return this.http.get('oiiinlog/findIncidentTypeDescList');
    }
    
    /** This is description of the findIntLocationsList function*/
    findIntLocationsList() {
        return this.http.get('oiiinlog/findIntLocationsList');
    }
    /** This is description of the agencyIncidentsCallModuleOidincde function*/
    agencyIncidentsCallModuleOidincde() {
        return this.http.get('oiiinlog/agencyIncidentsCallModuleOidincde');
    }
    /** This is description of the agencyIncidentsCallModuleOiuincrp function*/
    agencyIncidentsCallModuleOiuincrp() {
        return this.http.get('oiiinlog/agencyIncidentsCallModuleOiuincrp');
    }
}
