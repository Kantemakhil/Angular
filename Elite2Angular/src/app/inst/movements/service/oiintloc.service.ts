import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiintlocService {
    constructor(private http: HttpService) { }
    /** This is description of the intLocExecuteQuery function*/
    intLocExecuteQuery(obj) {
        return this.http.post('oiintloc/intLocExecuteQuery', obj);
    }
    /** This is description of the intLocCommit function*/
    intLocCommit(obj) {
        return this.http.post('oiintloc/intLocCommit', obj);
    }
    /** This is description of the rgUsagesRecordGroup function*/
    rgUsagesRecordGroup() {
        return this.http.get('oiintloc/rgUsagesRecordGroup');
    }
}
