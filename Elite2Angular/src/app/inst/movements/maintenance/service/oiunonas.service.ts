import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiunonasService {
    constructor(private http: HttpService) { }
    /** This is description of the intLocProfExecuteQuery function*/
    intLocProfExecuteQuery(obj) {
        return this.http.post('oiunonas/intLocProfExecuteQuery', obj);
    }
    /** This is description of the intLocProfCommit function*/
    intLocProfCommit(obj) {
        return this.http.post('oiunonas/intLocProfCommit', obj);
    }
    /** This is description of the rgNonAssoTypeRecordGroup function*/
    rgNonAssoTypeRecordGroup(obj) {
        return this.http.get('oiunonas/rgNonAssoTypeRecordGroup');
    }
}
