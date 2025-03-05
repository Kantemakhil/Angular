import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OimissueService {
constructor(private http: HttpService) { }
/** This is description of the grievanceTypesExecuteQuery function*/
grievanceTypesExecuteQuery(obj) {
return this.http.post('oimissue/grievanceTypesExecuteQuery', obj);
}
/** This is description of the grievanceTypesCommit function*/
grievanceTypesCommit(obj) {
return this.http.post('oimissue/grievanceTypesCommit', obj);
}
/** This is description of the grievanceReasonsExecuteQuery function*/
grievanceReasonsExecuteQuery(obj) {
return this.http.post('oimissue/grievanceReasonsExecuteQuery', obj);
}
/** This is description of the grievanceReasonsCommit function*/
grievanceReasonsCommit(obj) {
return this.http.post('oimissue/grievanceReasonsCommit', obj);
}
/** This is description of the grievanceTxnsExecuteQuery function*/
grievanceTxnsExecuteQuery(obj) {
return this.http.post('oimissue/grievanceTxnsExecuteQuery', obj);
}
/** This is description of the grievanceTxnsCommit function*/
grievanceTxnsCommit(obj) {
return this.http.post('oimissue/grievanceTxnsCommit', obj);
}
/** This is to check is record is deletable or not*/
cgrichkMovementReasonsDeleteCheck(obj) {
return this.http.post('oimissue/cgrichkMovementReasonsDeleteCheck', obj);
  }

  /** This is to check is record is deletable or not*/
  onDeleteReasons(obj) {
  return this.http.post('/oimissue/onDeleteReasons', obj);
    }
  
  getTabSecuityEnable() {
    return this.http.get('oimissue/getTabSecuityEnable');
}
}
