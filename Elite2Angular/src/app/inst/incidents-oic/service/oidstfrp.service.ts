import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OidstfrpService {

  constructor(private http: HttpService) { }
  staffReportCommitData(obj) {
    return this.http.post('oidistrfp/commitStaffReportData', obj);
  }

  staffReportExecuteQuery(obj) {
    return this.http.post('oidstfrp/getStaffReportIncident', obj);
  }

  staffforceCommitData(obj) {
    return this.http.post('ocuincfe/commitStaffforceData', obj);
  }

  staffforceExecuteQuery(obj) {
    return this.http.post('ocuincfe/getStaffforceIncident', obj);
  }

  staffEquipementCommitData(obj) {
    return this.http.post('ocuincfe/commitStaffEquipementData', obj);
  }

  staffEquipementExecuteQuery(obj) {
    return this.http.post('ocuincfe/getStaffEquipementIncident', obj);
  }

  staffReportCommonSave(obj) {
    return this.http.post('oidistrfp/staffReportCommonSave', obj);
  }

  getCountDownTime(obj){
    return this.http.post('oidistrfp/getCountDownTime',obj);
  }
  updateLockflag(obj) {
    return this.http.post('oidistrfp/updateLockFlag',obj);
  }  
}

