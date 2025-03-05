import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiurepinService {
    constructor(private http: HttpService) {}
    /** This is description of the agencyIncidentAssoTostgExecuteQuery function*/
    getReportDetailsExecuteQuery(obj) {
        return this.http.post('oiurepin/getReportDetailsExecuteQuery', obj);
    }
  
    reportableIncedentDetailsCommit(obj) {
        return this.http.post('oiurepin/reportableIncedentDetailsCommit', obj);
    }

    getUserNameLog() {
        return this.http.get( 'oiurepin/getUserNameLog');
    }
}
