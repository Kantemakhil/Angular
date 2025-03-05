import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OuminoutService {
    constructor(private http: HttpService) {}
    /** This is description of the moveRsnExecuteQuery function*/
    moveRsnExecuteQuery(obj) {
        return this.http.post('ouminout/moveRsnExecuteQuery', obj);
    }
    /** This is description of the moveRsnCommit function*/
    moveRsnCommit(obj) {
        return this.http.post('ouminout/moveRsnCommit', obj);
    }
    /** This is description of the cgfkMoversninmovementreasRecordGroup function*/
    cgfkMoversninmovementreasRecordGroup(obj) {
        return this.http.get( 'ouminout/cgfk$moveRsnInMovementReasRecordGroup');
    }
    cgrichkMovementReasonsDeleteCheck(obj) {
        return this.http.post('/ouminout/cgrichkMovementReasonsDeleteCheck', obj);
      }


}