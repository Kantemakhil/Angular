import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiistgmbService {
  constructor(private http: HttpService) {}
  /** This is description of the livingUnitsExecuteQuery function*/
  livingUnitsExecuteQueryService(obj) {
    return this.http.post('oiistgmb/livingUnitsExecuteQuery', obj);
  }
  /** This is description of the vStgLocationMembersExecuteQuery function*/
  vStgLocationMembersExecuteQuery(obj) {
    return this.http.post('oiistgmb/vStgLocationMembersExecuteQuery', obj);
  }
  /** This is description of the GetLocationDescription function*/
  GetLocationDescription(obj) {
    return this.http.post('oiistgmb/GetLocationDescription', obj);
  }

}
