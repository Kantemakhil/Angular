import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OummenusService {
    constructor(private http: HttpService) {}
    /** This is description of the vMenuSecsExecuteQuery function*/
    vMenuSecsExecuteQuery(obj) {
        return this.http.post('oummenus/vMenuSecsExecuteQuery', obj);
    }
    /** This is description of the vMenuSecsCommit function*/
    vMenuSecsCommit(obj) {
        return this.http.post('oummenus/vMenuSecsCommit', obj);
    }
    /** This is description of the rgMenuSecDescRecordGroup function*/
    rgMenuSecDescRecordGroup() {
        return this.http.get( 'oummenus/rgMenuSecDescRecordGroup');
    }
}
