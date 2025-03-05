import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidscexmService {
    constructor(private http: HttpService) { }
    /** This is description of the offSchExecuteQuery function*/
    offSchExecuteQuery(obj) {
        return this.http.post('oidscexm/offSchExecuteQuery', obj);
    }
    /** This is description of the offSchCommit function*/
    offSchCommit(obj) {
        return this.http.post('oidscexm/offSchCommit', obj);
    }
    /** This is description of the rgMoveTypeRecordGroup function*/
    rgMoveTypeRecordGroup(obj) {
        return this.http.get('oidscexm/rgMoveTypeRecordGroup', obj);
    }
    /** This is description of the rgBuildingRecordGroup function*/
    rgBuildingRecordGroup(obj) {
        return this.http.get('oidscexm/rgBuildingRecordGroup', obj);
    }
    /** This is description of the rgAgyIdRecordGroup function*/
    rgAgyIdRecordGroup(obj) {
        return this.http.get('oidscexm/rgAgyIdRecordGroup', obj);
    }
    /** This is description of the rgTierRecordGroup function*/
    rgTierRecordGroup(obj) {
        return this.http.get('oidscexm/rgTierRecordGroup', obj);
    }

    /** This is description of the schTripsExecuteQuery function*/
    schTripsExecuteQuery(obj) {
        return this.http.post('oiusstri/schTripsExecuteQuery', obj);
    }
    /** This is description of the getLastMovementDateTime function*/
    getLastMovementDateTime(obj) {
        return this.http.post('oidscexm/getLastMovementDateTime', obj);
    }
    /** This is description of the processExternalMovement function*/
    processExternalMovement(obj) {
        return this.http.post('oidscexm/processExternalMovement', obj);
    }
    /** This is description of the suspendAllocations function*/
    suspendAllocations(obj) {
        return this.http.post('oidscexm/suspendAllocations', obj);
    }
}
