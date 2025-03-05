import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdpersoService {
    constructor(private http: HttpService) {}
    /** This is description of the offCntPerExecuteQuery function*/
    offCntPerExecuteQuery(obj) {
        return this.http.post('ocdperso/offCntPerExecuteQuery', obj);
    }
    /** This is description of the offCntPerCommit function*/
    offCntPerCommit(obj) {
        return this.http.post('ocdperso/offCntPerCommit', obj);
    }
    /** This is description of the perAddrExecuteQuery function*/
    perAddrExecuteQuery(obj) {
        return this.http.post('ocdperso/perAddrExecuteQuery', obj);
    }
    /** This is description of the perIdentExecuteQuery function*/
    perIdentExecuteQuery(obj) {
        return this.http.post('ocdperso/perIdentExecuteQuery', obj);
    }
    /** This is description of the perIdentCommit function*/
    perIdentCommit(obj) {
        return this.http.post('ocdperso/perIdentCommit', obj);
    }
    /** This is description of the perInfoExecuteQuery function*/
    perInfoExecuteQuery(obj) {
        return this.http.post('ocdperso/perInfoExecuteQuery', obj);
    }
    /** This is description of the perInfoCommit function*/
    perInfoCommit(obj) {
        return this.http.post('ocdperso/perInfoCommit', obj);
    }
    /** This is description of the perEmpExecuteQuery function*/
    perEmpExecuteQuery(obj) {
        return this.http.post('ocdperso/perEmpExecuteQuery', obj);
    }
    /** This is description of the perEmpCommit function*/
    perEmpCommit(obj) {
        return this.http.post('ocdperso/perEmpCommit', obj);
    }
    /** This is description of the rgContactTypeRecordGroup function*/
    rgContactTypeRecordGroup(obj) {
        return this.http.get( 'ocdperso/rgContactTypeRecordGroup');
    }
    /** This is description of the rgRelTypeRecordGroup function*/
    rgRelTypeRecordGroup(obj) {
        return this.http.get( 'ocdperso/rgRelTypeRecordGroup');
    }
    /** This is description of the rgLanguageCodeRecordGroup function*/
    rgLanguageCodeRecordGroup(obj) {
        return this.http.get( 'ocdperso/rgLanguageCodeRecordGroup');
    }
    /** This is description of the rgMaritalStatusRecordGroup function*/
    rgMaritalStatusRecordGroup(obj) {
        return this.http.get( 'ocdperso/rgMaritalStatusRecordGroup');
    }
    /** This is description of the rgSexCodeRecordGroup function*/
    rgSexCodeRecordGroup(obj) {
        return this.http.get( 'ocdperso/rgSexCodeRecordGroup');
    }
    /** This is description of the rgSearchTypeRecordGroup function*/
    rgSearchTypeRecordGroup(obj) {
        return this.http.get( 'ocdperso/rgSearchTypeRecordGroup');
    }
    /** This is description of the rgIdentifierTypeRecordGroup function*/
    rgIdentifierTypeRecordGroup(obj) {
        return this.http.get( 'ocdperso/rgIdentifierTypeRecordGroup');
    }
    /** This is description of the copyOffAddr function*/
    copyOffAddr(rootOffenderId, personId) {
        return this.http.get( 'ocdperso/copyOffAddr?rootOffId=' + rootOffenderId + '&personId=' + personId);
    }

    /** This is description of the checkChildRecords function*/
    checkChildRecords(offenderBookId, personId) {
        return this.http.get( 'ocdperso/checkChildRecords?offenderBookId=' + offenderBookId + '&personId=' + personId);
    }

    /** This is description of the checkFutureVisits function*/
    checkFutureVisits(offenderBookId, personId) {
        return this.http.get( 'ocdperso/checkFutureVisits?offenderBookId=' + offenderBookId + '&personId=' + personId);
    }

    /** This is description of the cancelFutureVisits function*/
    cancelFutureVisits(offenderBookId, personId) {
        return this.http.get( 'ocdperso/cancelFutureVisits?offenderBookId=' + offenderBookId + '&personId=' + personId);
    }
}
