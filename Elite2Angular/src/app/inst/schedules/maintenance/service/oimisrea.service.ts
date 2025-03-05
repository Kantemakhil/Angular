import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OimisreaService {
    constructor(private http: HttpService) { }
    /** This is description of the intSrExecuteQuery function*/
    intSrExecuteQuery(obj) {
        return this.http.post('oimisrea/intSrExecuteQuery', obj);
    }
    /** This is description of the intSrCommit function*/
    intSrCommit(obj) {
        return this.http.post('oimisrea/intSrCommit', obj);
    }
    /** This is description of the rgIntSchRsnRecordGroup function*/
    rgIntSchRsnRecordGroup(obj) {
        return this.http.get('oimisrea/rgIntSchRsnRecordGroup');
    }
    /** This is description of the rgIntSchTypeRecordGroup function*/
    rgIntSchTypeRecordGroup(obj) {
        return this.http.get('oimisrea/rgIntSchTypeRecordGroup');
    }
    /** This is description of the rgIntSchTypeRecordGroup function*/
    intSrKeyDelrec(obj) {
        return this.http.post('oimisrea/intSrKeyDelrec', obj);
    }
}
