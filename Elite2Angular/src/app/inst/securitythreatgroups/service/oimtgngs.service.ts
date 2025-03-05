import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OimtgngsService {
    constructor(private http: HttpService) { }
    /** This is description of the secGrpExecuteQuery function*/
    secGrpExecuteQuery(obj) {
        return this.http.post('oimtgngs/secGrpExecuteQuery', obj);
    }
    /** This is description of the secGrpCommit function*/
    secGrpCommit(obj) {
        return this.http.post('oimtgngs/secGrpCommit', obj);
    }
    /** This is description of the secGrp1ExecuteQuery function*/
    secGrp1ExecuteQuery(obj) {
        return this.http.post('oimtgngs/secGrp1ExecuteQuery', obj);
    }
    /** This is description of the secGrp1Commit function*/
    secGrp1Commit(obj) {
        return this.http.post('oimtgngs/secGrp1Commit', obj);
    }
    /** This is description of the secGrp2ExecuteQuery function*/
    secGrp2ExecuteQuery(obj) {
        return this.http.post('oimtgngs/secGrp2ExecuteQuery', obj);
    }
    /** This is description of the secGrp2Commit function*/
    secGrp2Commit(obj) {
        return this.http.post('oimtgngs/secGrp2Commit', obj);
    }
    getDuplicateStgCode(stgCode) {
        return this.http.get('oimtgngs/getDuplicateStgCode?stgCode=' + stgCode);
    }
    getDuplicateGangsStgCode (stgCode) {
        return this.http.get('oimtgngs/getDuplicateGangsStgCode?stgCode=' + stgCode);

    }
    getDuplicateSetsStgCode (stgCode) {
        return this.http.get('oimtgngs/getDuplicateSetsStgCode?stgCode=' + stgCode);
    }
    offStgCur(stgId) {
        return this.http.get('oimtgngs/offStgCur?stgId=' + stgId);
    }
    offStgCurSecGrp(stgId) {
        return this.http.get('oimtgngs/offStgCurSecGrp?stgId=' + stgId);
    }

}
