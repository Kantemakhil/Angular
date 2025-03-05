import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OcuachisService {
    constructor(private http: HttpService) { }
    feeActExecuteQuery(obj) {
        return this.http.post('ocufovdt/feeActExecuteQuery', obj);
    }
    feeOverdDetExecuteQuery(obj) {
        return this.http.post('ocufovdt/feeOverdDetExecuteQuery', obj);
    }
    accountHistoryQuery(obj) {
        return this.http.post('ocuachis/accountHistoryQuery', obj);
    }

    
    feeOverCheckoverLapping(obj) {
        return this.http.post('ocufovdt/feeOverCheckoverLapping', obj);
    }
    feeOverdDetCommit(obj) {
        return this.http.post('ocufovdt/feeOverdDetCommit', obj);
    }

    sysPflExecuteQuery() {
        return this.http.get('ocufovdt/sysPflExecuteQuery');
    }

    getAddedByName() {
        return this.http.get('ocufovdt/getAddedByName');
    }

    getDescription(obj) {
        return this.http.post('ocuachis/getDescription', obj);
    }
    
}
