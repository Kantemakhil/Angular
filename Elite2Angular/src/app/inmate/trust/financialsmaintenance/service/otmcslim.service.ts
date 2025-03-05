import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtmcslimService {
  constructor(private http: HttpService) { }
  /** This is description of the csldLimExecuteQuery function*/
  csldLimExecuteQuery(obj) {
    return this.http.post('otmcslim/csldLimExecuteQuery', obj);
  }
  /** This is description of the csldLimCommit function*/
  csldLimCommit(obj) {
    return this.http.post('otmcslim/csldLimCommit', obj);
  }
  /** This is description of the cgfkCsldlimcaseloadidRecordGroup function*/
  cgfkCsldlimcaseloadidRecordGroup(obj) {
    return this.http.get('otmcslim/cgfk$csldLimCaseloadIdRecordGroup');
  }
  /** This is description of the cgfkCsldlimlimittypeRecordGroup function*/
  cgfkCsldlimlimittypeRecordGroup(obj) {
    return this.http.get('otmcslim/cgfk$csldLimLimitTypeRecordGroup');
  }
  /** This is description of the cgfkCsldlimperiodtypeRecordGroup function*/
  cgfkCsldlimperiodtypeRecordGroup(obj) {
    return this.http.get('otmcslim/cgfk$csldLimPeriodTypeRecordGroup');
  }
}
