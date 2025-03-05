import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcuprestService {
    constructor( private http: HttpService ) { }
    /** This is description of the offExecuteQuery function*/
    offExecuteQuery( obj ) {
        return this.http.post( 'ocuprest/offExecuteQuery', obj );
    }
    /** This is description of the vOffRestExecuteQuery function*/
    vOffRestExecuteQuery( obj ) {
        return this.http.post( 'ocuprest/vOffRestExecuteQuery', obj );
    }
    /** This is description of the rgAuthorisedByRecordGroup function*/
    rgAuthorisedByRecordGroup() {
        return this.http.get( 'ocuprest/rgAuthorisedByRecordGroup' );
    }
    /** This is description of the rgRestrictionTypeRecordGroup function*/
    rgRestrictionTypeRecordGroup() {
        return this.http.get( 'ocuprest/rgRestrictionTypeRecordGroup' );
    }
}
