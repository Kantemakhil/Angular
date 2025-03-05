import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiiemoveService {
    constructor(private http: HttpService) {}
    /** This is description of the offEmExecuteQuery function*/
    offEmExecuteQuery(obj) {
        return this.http.post('oiiemove/offEmExecuteQuery', obj);
    }
    /** This is description of the offEm1ExecuteQuery function*/
    offEm1ExecuteQuery(obj) {
        return this.http.post('oiiemove/offEm1ExecuteQuery', obj);
    }
    /** This is description of the rgOffEmMovementReasonCoRecordGroup function*/
    rgOffEmMovementReasonCoRecordGroup() {
        return this.http.get( 'oiiemove/rgOffEmMovementReasonCoRecordGroup');
    }
    /** This is description of the rgOffEmMovementTypeRecordGroup function*/
    rgOffEmMovementTypeRecordGroup() {
        return this.http.get( 'oiiemove/rgOffEmMovementTypeRecordGroup');
    }
    /** This is description of the rgOffEm1DirectionCodeRecordGroup function*/
    rgOffEm1DirectionCodeRecordGroup() {
        return this.http.get( 'oiiemove/rgOffEm1DirectionCodeRecordGroup');
    }
    /** This is description of the rgOffEm1MovementTypeRecordGroup function*/
    rgOffEm1MovementTypeRecordGroup() {
        return this.http.get( 'oiiemove/rgOffEm1MovementTypeRecordGroup');
    }
    /** This is description of the rgOffEm1MovementReasonCRecordGroup function*/
    rgOffEm1MovementReasonCRecordGroup() {
        return this.http.get( 'oiiemove/rgOffEm1MovementReasonCRecordGroup');
    }
    /** This is description of the rgOffEmDirectionCodeRecordGroup function*/
    rgOffEmDirectionCodeRecordGroup() {
        return this.http.get( 'oiiemove/rgOffEmDirectionCodeRecordGroup');
    }
     /** This is description of the alAgyLocIdRgRecordGroup function*/
    alAgyLocIdRgRecordGroup() {
        return this.http.get( 'oiiemove/alAgyLocIdRgRecordGroup' );
    }
}
