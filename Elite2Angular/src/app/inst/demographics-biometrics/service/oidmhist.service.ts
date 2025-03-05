import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidmhistService {
    constructor(private http: HttpService) { }
    /** This is description of the offMrExecuteQuery function*/
    offMrExecuteQuery(obj) {
        return this.http.post('oidmhist/offMrExecuteQuery', obj);
    }
    /** This is description of the offMrCommit function*/
    offMrCommit(obj) {
        return this.http.post('oidmhist/offMrCommit', obj);
    }
    /** This is description of the disActExecuteQuery function*/
    disActExecuteQuery(obj) {
        return this.http.post('oidmhist/disActExecuteQuery', obj);
    }
    /** This is description of the disActCommit function*/
    disActCommit(obj) {
        return this.http.post('oidmhist/disActCommit', obj);
    }
    /** This is description of the techSpecExecuteQuery function*/
    techSpecExecuteQuery(obj) {
        return this.http.post('oidmhist/techSpecExecuteQuery', obj);
    }
    /** This is description of the techSpecCommit function*/
    techSpecCommit(obj) {
        return this.http.post('oidmhist/techSpecCommit', obj);
    }
    /** This is description of the warZonesExecuteQuery function*/
    warZonesExecuteQuery(obj) {
        return this.http.post('oidmhist/warZonesExecuteQuery', obj);
    }
    /** This is description of the warZonesCommit function*/
    warZonesCommit(obj) {
        return this.http.post('oidmhist/warZonesCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('oidmhist/sysPflExecuteQuery', obj);
    }
    /** This is description of the rgWarZoneRecordGroup function*/
    rgWarZoneRecordGroup(obj) {
        return this.http.get('oidmhist/rgWarZoneRecordGroup');
    }
    /** This is description of the rgMltyTechRecordGroup function*/
    rgMltyTechRecordGroup(obj) {
        return this.http.get('oidmhist/rgMltyTechRecordGroup');
    }
    /** This is description of the rgMilitaryRankRecordGroup function*/
    rgMilitaryRankRecordGroup(obj) {
        return this.http.get('oidmhist/rgMilitaryRankRecordGroup');
    }
    /** This is description of the rgMilitaryDischargeRecordGroup function*/
    rgMilitaryDischargeRecordGroup(obj) {
        return this.http.get('oidmhist/rgMilitaryDischargeRecordGroup');
    }
    /** This is description of the rgMilitaryBranchRecordGroup function*/
    rgMilitaryBranchRecordGroup() {
        return this.http.get('oidmhist/rgMilitaryBranchRecordGroup');
    }
    /** This is description of the rgDisciplinaryActionRecordGroup function*/
    rgDisciplinaryActionRecordGroup(obj) {
        return this.http.get('oidmhist/rgDisciplinaryActionRecordGroup');
    }
    /** This is description of the rgHighstRankRecordGroup function*/
    rgHighstRankRecordGroup(obj) {
        return this.http.get('oidmhist/rgHighstRankRecordGroup');
    }
}
