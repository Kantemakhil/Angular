import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmserviService {
    constructor( private http: HttpService ) { }
    /** This is description of the prgSrvExecuteQuery function*/
    prgSrvExecuteQuery( obj ) {
        return this.http.post( 'ocmservi/prgSrvExecuteQuery', obj );
    }
    /** This is description of the prgSrvCommit function*/
    prgSrvCommit( obj ) {
        return this.http.post( 'ocmservi/prgSrvCommit', obj );
    }
    /** This is description of the rgPsCategoryRecordGroup function*/
    rgPsCategoryRecordGroup( ) {
        return this.http.get( 'ocmservi/rgPsCategoryRecordGroup' );
    }
    /** This is description of the rgFunctionTypeRecordGroup function*/
    rgFunctionTypeRecordGroup( ) {
        return this.http.get( 'ocmservi/rgFunctionTypeRecordGroup' );
    }
}
