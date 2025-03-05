import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidtpconService {
    constructor(private http: HttpService) {}
    /** This is description of the offConExecuteQuery function*/
    offConExecuteQuery(obj) {
        return this.http.post('oidtpcon/offConExecuteQuery', obj);
    }
    /** This is description of the offConCommit function*/
    offConCommit(obj) {
        return this.http.post('oidtpcon/offConCommit', obj);
    }

    offPenPropConCommit(obj) {
        return this.http.post('oidtpcon/offPenPropConCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('oidtpcon/sysPflExecuteQuery', obj);
    }
    /** This is description of the cgfkOffcontrntoagylocidRecordGroup function*/
    cgfkOffcontrntoagylocidRecordGroup(agyLocId) {
        return this.http.get( 'oidtpcon/cgfkOffConTrnToAgyLocIdRecordGroup?agyLocId=' + agyLocId);
    }
    /** This is description of the rgSelectAllRecordGroup function*/
    rgSelectAllRecordGroup() {
        return this.http.get( 'oidtpcon/rgSelectAllRecordGroup');
    }
      /** This is description of the rgSelectAllRecordGroup function*/
      getItemStatus(obj) {
        return this.http.post('oidtpcon/getItemStatus', obj);
    }
    offPiSearchOffenderPptyItemsForcontainer(list) {
        return this.http.post('oidmpitm/offPiSearchOffenderPptyItemsForcontainer', list);
    }

    offPenPropContExecuteQuery(obj) {
        return this.http.post('oidtpcon/offPenPropConExecuteQuery', obj);
    }
}
