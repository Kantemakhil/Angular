import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';
import { TagSearchGetOffenderRecords } from '@commonbeans/TagSearchGetOffenderRecords';

@Injectable({providedIn: 'root'})
export class OcucoffeService {
  data: TagSearchGetOffenderRecords = new TagSearchGetOffenderRecords();
  offidCommit(arg0: any): any {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpService) { }
  /** This is description of the offExecuteQuery function*/
  offExecuteQuery(obj) {
    return this.http.post('ocucoffe/offExecuteQuery', obj);

  }
  /** This is description of the offCommit function*/
  offCommit(obj) {
    return this.http.post('ocucoffe/offCommit', obj);
  }
  /** This is description of the aliasExecuteQuery function*/
  aliasExecuteQuery(obj) {
    return this.http.post('ocucoffe/aliasExecuteQuery', obj);
  }
  /** This is description of the offidExecuteQuery function*/
  offidExecuteQuery(obj) {
    return this.http.post('ocucoffe/offIdExecuteQuery', obj);
  }
  /** This is description of the offIdCommit function*/
  offIdCommit(obj) {
    return this.http.post('ocucoffe/offIdCommit', obj);
  }
  /** This is description of the offIdAllExecuteQuery function*/
  offIdAllExecuteQuery(obj) {
    return this.http.post('ocucoffe/offIdAllExecuteQuery', obj);
  }
  /** This is description of the rgAliasNameTypeRecordGroup function*/
  rgAliasNameTypeRecordGroup(obj) {
    return this.http.get('ocucoffe/rgAliasNameTypeRecordGroup');
  }
  /** This is description of the rgIdentifierTypeRecordGroup function*/
  rgIdentifierTypeRecordGroup(obj) {
    return this.http.get('ocucoffeRgIdentifierTypeRecordGroup').toPromise()
      .then(response => {
        return <any[]>response['_body'];
      });
  }
  /** This is description of the rgOffSuffixRecordGroup function*/
  rgOffSuffixRecordGroup(obj) {
    return this.http.get('ocucoffe/rgOffSuffixRecordGroup');
  }
  /** This is description of the rgOffSexRecordGroup function*/
  rgOffSexRecordGroup(obj) {
    return this.http.get('ocucoffe/rgOffSexRecordGroup');
  }
  /** This is description of the rgOffRaceRecordGroup function*/
  rgOffRaceRecordGroup(obj) {
    return this.http.get('ocucoffe/rgOffRaceRecordGroup');
  }
  /** This is description of the rgIdSourceRecordGroup function*/
  rgIdSourceRecordGroup(obj) {
    return this.http.get('ocucoffe/rgIdSourceRecordGroup');
  }
  /** This is description of the offOnCheckDeleteMasteroff_id_all_cur function*/
  offOnCheckDeleteMasterAliasCur(obj) {
    return this.http.post('ocucoffe/offOnCheckDeleteMasteraliasCur', obj);
  }
  /** This is description of the validatealiasescheckdupnamecur function*/
  validatealiasescheckdupnamecur(obj) {
    return this.http.post('ocucoffe/validateAliasescheckDupNameCur', obj);
  }

  /** This is getOffenderMinAge function*/
  getOffenderMinAge(obj) {
    return this.http.get('ocucoffe/getOffenderMinAge?caseload=' + obj);
  }
  checkOffenderIdDisplay(obj) {
    return this.http.get('ocucoffe/checkOffenderIdDisplay?offenderIdDisplay=' + obj);
  }
  agevalidationvsagecur(obj) {
    return this.http.post('ocucoffe/ageValidationvsAgecur', obj);
  }
  ocucoffeGetCurrentDate() {
    return this.http.get('ocucoffe/ocucoffeGetCurrentDate');
  }
  
  ageValidationvsRangecur() {
    return this.http.get('ocucoffe/ageValidationvsRangecur');
  }
}
