import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtmmbalaService {
    constructor(private http: HttpService) { }
    /** This is description of the offSubaExecuteQuery function*/
    offSubaExecuteQuery(obj) {
        return this.http.post('otmmbala/offSubaExecuteQuery', obj);
    }
    /** This is description of the offSubaCommit function*/
    offSubaCommit(obj) {
        return this.http.post('otmmbala/offSubaCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('otmmbala/sysPflExecuteQuery', obj);
    }
    /** This is description of the cgfkOffsubatrustaccountcoRecordGroup function*/
    cgfkOffsubatrustaccountcoRecordGroup(obj) {
        return this.http.get('otmmbala/cgfk$offSubaTrustAccountCoRecordGroup');
    }
}
