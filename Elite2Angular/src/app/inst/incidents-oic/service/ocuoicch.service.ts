import { Injectable } from '@angular/core';



import { HttpService } from '../../../core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcuoicchService {
    constructor(private http: HttpService) {}
    /** This is description of the agyInciChgExecuteQuery function*/
    agyInciChgExecuteQuery(obj) {
        return this.http.post('ocuoicch/agyInciChgExecuteQuery', obj);
    }
    /** This is description of the agyInciChgCommit function*/
    agyInciChgCommit(obj) {
        return this.http.post('ocuoicch/agyInciChgCommit', obj);
    }
    /** This is description of the rgOffenceCodeRecordGroup function*/
    rgOffenceCodeRecordGroup(obj) {
        return this.http.post( 'ocuoicch/rgOffenceCodeRecordGroup', obj);
    }
    /** This is description of the agyInciChgExecuteQuery function*/
    oichearResultsExecuteQuery(obj) {
        return this.http.post('ocuoicch/oichearingSearchResults', obj);
    }
}
