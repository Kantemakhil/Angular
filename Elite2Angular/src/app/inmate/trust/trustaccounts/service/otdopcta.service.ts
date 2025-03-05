import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtdopctaService {
    constructor(private http: HttpService) { }
    /** This is description of the offTaExecuteQuery function*/
    offTaExecuteQuery(obj) {
        return this.http.post('otdopcta/offTaExecuteQuery', obj);
    }
    /** This is description of the offTaCommit function*/
    offTaCommit(obj) {
        return this.http.post('otdopcta/offTaCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('otdopcta/sysPflExecuteQuery', obj);
    }
    /** This is description of the preInsert function*/
    preInsert() {
        return this.http.get('otdopcta/preInsert');
    }
    /** This is description of the cgrichkOffenderTrustAccoun function*/
    cgrichkOffenderTrustAccoun(obj) {
        return this.http.post('/otdopcta/cgrichkOffenderTrustAccoun', obj);
    }
}
