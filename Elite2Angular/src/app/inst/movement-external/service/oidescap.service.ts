import { Injectable } from '@angular/core';

import { OffenderEscapes } from '@instmovementexternalbeans/OffenderEscapes';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidescapService {
     data: OffenderEscapes = new OffenderEscapes();
    constructor(private http: HttpService) {}
    /** This is description of the offEscExecuteQuery function*/
    offEscExecuteQuery(obj) {
        return this.http.post('oidescap/offEscExecuteQuery', obj);
    }
    /** This is description of the offEscCommit function*/
    offEscCommit(obj) {
        return this.http.post('oidescap/offEscCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('oidescap/sysPflExecuteQuery', obj);
    }
    /** This is description of the cgfkOffescescapeagylocidRecordGroup function*/
    cgfkOffEscEscapeAgyLocIdRecordGroup() {
        return this.http.get( 'oidescap/cgfkOffEscEscapeAgyLocIdRecordGroup');
    }
    /** This is description of the cgfkOffescescapeescortcodRecordGroup function*/
    cgfkOffEscEscapeEscortCodRecordGroup() {
    return this.http.get( 'oidescap/cgfkOffEscEscapeEscortCodRecordGroup');
    }
    /** This is description of the cgfkOffescescapecircumstanRecordGroup function*/
    cgfkOffEscEscapeCircumstanRecordGroup() {
        return this.http.get( 'oidescap/cgfkOffEscEscapeCircumstanRecordGroup');
    }
     /** This is description of the cgfkOffescsecuritybreachcRecordGroup function*/
    cgfkOffEscSecurityBreachCRecordGroup() {
        return this.http.get( 'oidescap/cgfkOffEscSecurityBreachCRecordGroup');
    }
    /** This is description of the cgfkOffescarrestagycodeRecordGroup function*/
    cgfkOffEscArrestAgyCodeRecordGroup() {
        return this.http.get( 'oidescap/cgfkOffEscArrestAgyCodeRecordGroup');
    }
     /** This is description of the cgfkOffescarrestagycodeRecordGroup function*/
    getMaxEscapeDate(offenderBookId) {
        return this.http.get( 'oidescap/getMaxEscapeDate?offenderBookId=' + offenderBookId);
    }
}
