import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtmisambService {
    constructor(private http: HttpService) {}
    /** This is description of the instMnbalExecuteQuery function*/
    instMnbalExecuteQuery(obj) {
        return this.http.post('otmisamb/instMnbalExecuteQuery', obj);
    }
    /** This is description of the instMnbalCommit function*/
    instMnbalCommit(obj) {
        return this.http.post('otmisamb/instMnbalCommit', obj);
    }
    /** This is description of the cgfkInstmnbalcaseloadidRecordGroup function*/
    cgfkInstmnbalcaseloadidRecordGroup(obj) {
        return this.http.get( 'otmisamb/cgfk$instMnbalCaseloadIdRecordGroup');
    }
    /** This is description of the cgfkInstmnbalaccountcodeRecordGroup function*/
    cgfkInstmnbalaccountcodeRecordGroup(obj) {
        return this.http.get( 'otmisamb/cgfk$instMnbalAccountCodeRecordGroup');
    }
    /** This is description of the cgfkInstmnbalagylocidRecordGroup function*/
    cgfkInstmnbalagylocidRecordGroup(obj) {
        return this.http.get( 'otmisamb/cgfk$instMnbalAgyLocIdRecordGroup');
    }
}
