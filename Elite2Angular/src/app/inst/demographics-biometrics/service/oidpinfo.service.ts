import { Injectable } from '@angular/core';


import { HttpService } from '../../../core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidpinfoService {
    constructor(private http: HttpService) { }
    offNameExecuteQuery(obj) {
        return this.http.post('oidpinfo/offNameExecuteQuery', obj);
    }
    offNameCommit(obj) {
        return this.http.post('oidpinfo/offNameCommit', obj);
    }
    offPdExecuteQuery(obj) {
        return this.http.post('oidpinfo/offPdExecuteQuery', obj);
    }
    offPdCommit(obj) {
        return this.http.post('oidpinfo/offPdCommit', obj);
    }
    cgfkOffNameDspDescriptionRecordGroup() {
        return this.http.get('oidpinfo/cgfkOffNameDspDescriptionRecordGroup');
    }
    cgfkOffPdDspDescriptionRecordGroup(obj) {
        return this.http.get('oidpinfo/cgfkOffPdDspDescriptionRecordGroup', obj);
    }
    rgBirthStateRecordGroup() {
        return this.http.get('oidpinfo/rgBirthStateRecordGroup');
    }
    offBkgOnCheckDeleteMasteroffPdCur(obj) {
        return this.http.get('oidpinfo/offBkgOnCheckDeleteMasteroffPdCur');
    }
    offNamePostQuerycOffBirthState(obj) {
        return this.http.get('oidpinfo/offNamePostQuerycOffBirthState');
    }
    profileCodePostChange(obj) {
        return this.http.get('oidpinfo/profileCodePostChange');
    }
    dspDescriptionWhenValidateItemprofileTypes(obj) {
        return this.http.get('oidpinfo/dspDescriptionWhenValidateItemprofileTypes');
    }
    cgwhenNewFormInstancec(obj) {
        return this.http.post('oidpinfo/cgWhenNewFormInstancec', obj);
    }
    checkProfileDetails(offenderBookId , caseloadType, profileCategory) {
        return this.http.get('/oidpinfo/checkProfileDetails?offenderBookId=' + offenderBookId + '&caseloadType=' + caseloadType
                            + '&profileCategory=' + profileCategory);
    }
}
