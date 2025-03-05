import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtsreceiService {
    constructor( private http: HttpService ) { }
    /** This is description of the omsReqExecuteQuery function*/
    omsReqExecuteQuery( obj ) {
        return this.http.post( 'otsrecei/omsReqExecuteQuery', obj );
    }
    /** This is description of the omsReqCommit function*/
    omsReqCommit( obj ) {
        return this.http.post( 'otsrecei/omsReqCommit', obj );
    }
    /** This is description of the cgfkOmsreqprinteridRecordGroup function*/
    cgfkOmsreqprinteridRecordGroup() {
        return this.http.get( 'otsrecei/cgfk$omsReqPrinterIdRecordGroup' );
    }
    /** This is description of the cgfkOmsreqmodulenameRecordGroup function*/
    cgfkOmsreqmodulenameRecordGroup() {
        return this.http.get( 'otsrecei/cgfk$omsReqModuleNameRecordGroup' );
    }
    /** This is description of the cgfkCslddpagylocRecordGroup function*/
    cgfkCslddpagylocRecordGroup() {
        return this.http.get( 'otsrecei/cgfk$csldDpAgyLocRecordGroup' );
    }
    /** This is description of the cgfkRecptscreatedusersRecordGroup function*/
    cgfkRecptscreatedusersRecordGroup() {
        return this.http.get( 'otsrecei/cgfk$recptsCreatedUsersRecordGroup' );
    }
    /** This is description of the checkValidReceipts function*/
    checkValidReceipts( obj ) {
        return this.http.post( 'otsrecei/checkValidReceipts', obj );
    }
    /** This is description of the getDefaultCopies function*/
    getDefaultCopies() {
        return this.http.get( 'otsrecei/getDefaultCopies' );
    }
    /** This is description of the receiptNumExist function*/
    receiptNumExist(obj) {
        return this.http.post( 'otsrecei/receiptNumExist', obj);
    }
    /** This is description of the receiptNumExist function*/
    getReport(obj) {
        return this.http.post( 'otsrecei/getReport', obj);
    }
}

