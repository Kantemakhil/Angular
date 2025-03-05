import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OmsysjntService {
  constructor(private http: HttpService) { }
  /** This is description of the tableRgRecordGroup function*/
  tableRgRecordGroup() {
    return this.http.get('omsysjnt/tableRgRecordGroup');
  }
  createOneTr(tableName, insertTrigger) {
    return this.http.get('omsysjnt/createOneTr?tableName=' + tableName + '&insertTrigger=' + insertTrigger);
  }
  createTr() {
    return this.http.get('omsysjnt/createTr');
  }
  tableNamesRgRecordGroup() {
    return this.http.get('omsysjnt/tableNamesRgRecordGroup');
  }
}
