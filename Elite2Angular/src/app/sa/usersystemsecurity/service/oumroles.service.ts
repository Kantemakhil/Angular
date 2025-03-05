import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service'

@Injectable({providedIn: 'root'})
export class OumrolesService {
    roleIdTempValue: any;
    constructor( private http: HttpService ) { }
    /** This is description of the omsRoleExecuteQuery function*/
    omsRoleExecuteQuery( obj ) {
        return this.http.post( 'oumroles/omsRoleExecuteQuery', obj );
    }
    /** This is description of the omsRoleCommit function*/
    omsRoleCommit( obj ) {
        return this.http.post( 'oumroles/omsRoleCommit', obj );
    }
}
