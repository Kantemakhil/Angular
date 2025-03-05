import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiuiwpgnService {
    constructor(private http: HttpService) {}
    /** This is description of the paramsExecuteQuery function*/
    paramsExecuteQuery(obj) {
        return this.http.post('oiuiwpgn/paramsExecuteQuery', obj);
    }
    /** This is description of the paramsCommit function*/
    paramsCommit(obj) {
        return this.http.post('oiuiwpgn/paramsCommit', obj);
    }
    /** This is description of the rgStatusRecordGroup function*/
    rgStatusRecordGroup() {
        return this.http.get( 'oiuiwpgn/rgStatusRecordGroup');
    }
}
