import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtmremitService {
    constructor( private http: HttpService ) { }
    /** This is description of the remExecuteQuery function*/
    remExecuteQuery( obj ) {
        return this.http.post( 'otmremit/remExecuteQuery', obj );
    }
    /** This is description of the remCommit function*/
    remCommit( obj ) {
        return this.http.post( 'otmremit/remCommit', obj );
    }
    /** This is description of the rem1ExecuteQuery function*/
    remitExecuteQuery( obj ) {
        return this.http.post( 'otmremit/remitExecuteQuery', obj );
    }
    /** This is description of the rem1Commit function*/
    rem1Commit( obj ) {
        return this.http.post( 'otmremit/rem1Commit', obj );
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery( obj ) {
        return this.http.post( 'otmremit/sysPflExecuteQuery', obj );
    }
    /** This is description of the sysPflCommit function*/
    sysPflCommit( obj ) {
        return this.http.post( 'otmremit/sysPflCommit', obj );
    }
    /** This is description of the cgfkRem1dspdescriptionRecordGroup function*/
    cgfkRem1dspdescriptionRecordGroup() {
        return this.http.get( 'otmremit/cgfk$rem1DspDescriptionRecordGroup' );
    }
    /** This is description of the cgfkRem1dspdescription3RecordGroup function*/
    cgfkRem1dspdescription3RecordGroup() {
        return this.http.get( 'otmremit/cgfk$rem1DspDescription3RecordGroup' );
    }
    getCodes() {
        return this.http.get( 'otmremit/getCodes' );
    }
}
