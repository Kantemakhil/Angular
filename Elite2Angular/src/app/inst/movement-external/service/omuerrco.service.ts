import { Injectable } from '@angular/core';

import { OffenderEscapes } from '@instmovementexternalbeans/OffenderEscapes';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OmuerrcoService {
    data: OffenderEscapes = new OffenderEscapes();
    constructor(private http: HttpService) { }
    /**This is description of the offEscExecuteQuery function*/
    offEscExecuteQuery(obj) {
        return this.http.post('omuerrco/offEscExecuteQuery', obj);
    }
    /** This is description of the offEscCommit function*/
    offEscCommit(obj) {
        return this.http.post('omuerrco/offEscCommit', obj);
    }
    /** This is description of the cgfkOffescsecuritybreachcRecordGroup function*/
    cgfkOffEscSecurityBreachCRecordGroup() {
        return this.http.get('omuerrco/cgfkOffEscSecurityBreachCRecordGroup');
    }
    /** This is description of the cgfkOffescarrestagycodeRecordGroup function*/
    cgfkOffEscArrestAgyCodeRecordGroup() {
        return this.http.get('omuerrco/cgfkOffEscArrestAgyCodeRecordGroup');
    }
}
