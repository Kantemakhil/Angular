import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidtrwjuService {
    constructor(private http: HttpService) {}
    /** This is description of the offEmExecuteQuery function*/
    offEmExecuteQuery(obj) {
        return this.http.post('oidtrwju/offEmExecuteQuery', obj);
    }
    /** This is description of the offEmCommit function*/
    offEmCommit(obj) {
        return this.http.post('oidtrwju/offEmCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('oidtrwju/systemPflExecuteQuery', obj);
    }
    /** This is description of the cgfkOffemmovementreasoncoRecordGroup function*/
    cgfkOffemmovementreasoncoRecordGroup(obj) {
        return this.http.get( 'oidtrwju/cgfkOffEmMovementReasonCoRecordGroup');
    }
    /** This is description of the cgfkOffemtoagylocidRecordGroup function*/
    cgfkOffemtoagylocidRecordGroup(obj) {
        return this.http.get( 'oidtrwju/cgfkOffEmToAgyLocIdRecordGroup');
    }
    checkWaitListAndLocations(obj) {
        return this.http.post('/oidtrwju/checkWaitListAndLocations', obj);
    }
    suspendAllocations(obj) {
        return this.http.post('/oidtrwju/suspendAllocations', obj);
    }
    endWaitlistAndAllocations(obj) {
        return this.http.post('/oidtrwju/endWaitlistAndAllocations', obj);
    }
    /** This is description of the offEmCommit function*/
    offBookingCommit( obj ) {
        return this.http.post( 'oidtrwju/offBookingCommit', obj );
    }
}
