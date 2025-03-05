import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service'

@Injectable({providedIn: 'root'})
export class OcucnperService {
    constructor( private http: HttpService ) { }
    /** This is description of the personsExecuteQuery function*/
    personsExecuteQuery( obj ) {
        return this.http.post( 'ocucnper/personsExecuteQuery', obj );
    }
    /** This is description of the personsCommit function*/
    personsCommit( obj ) {
        return this.http.post( 'ocucnper/personsCommit', obj );
    }
    /** This is description of the rgSexCodeRecordGroup function*/
    rgSexCodeRecordGroup(  ) {
        return this.http.get( 'ocucnper/rgSexCodeRecordGroup' );
    }
}
