import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OcdsupstService {
    constructor(private http: HttpService) { ;}
    /** This is description of the offagyExecuteQuery function*/
    offagyExecuteQuery(obj) {
        return this.http.post('ocdsupst/offBkgAgyLocExecuteQuery', obj);
    }
    supHistoryExecuteQuery(obj) {
        return this.http.post('ocdsupst/supHistoryExecuteQuery', obj);
    }
    getProfileValue() {
        return this.http.get('ocdsupst/getProfileValue'); 
    }
    getBillableFlag(code) {
        return this.http.get('ocdsupst/getBillableFlag?code=' + code); 
    }
    suphstyCommit(obj) {
        return this.http.post('ocdsupst/suphstyCommit', obj);  
    }
    getsupStartDate(obj) {
        return this.http.post('ocdsupst/getsupStartDate', obj)
    }
    getIntakeRevCount(obj) {
        return this.http.post('ocdsupst/getIntakeRevCount', obj)
    }
}
