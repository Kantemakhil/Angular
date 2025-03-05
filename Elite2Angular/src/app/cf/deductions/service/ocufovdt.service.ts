import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OcufovdtService {
    constructor(private http: HttpService) { }
    feeActExecuteQuery(obj) {
        return this.http.post('ocufovdt/feeActExecuteQuery', obj);
    }
    feeOverdDetExecuteQuery(obj) {
        return this.http.post('ocufovdt/feeOverdDetExecuteQuery', obj);
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
    
    feeOverdDetHtyExecuteQuery(obj) {
        return this.http.post('ocufovdt/feeOverdDetHtyExecuteQuery', obj);
    }

    getbillEndDayPfVal() {
        return this.http.get('ocdrecei/getbillEndDayPfVal');
    }

}
