import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OcmfaproService {
    constructor(private http: HttpService) { }

    csldDpExecuteQuery(obj) {
        return this.http.post('ocmfapro/caseloadDedProfExecuteQuery', obj);
    }

    csldDpCommit(obj) {
        return this.http.post('ocmfapro/csldDpCommit', obj);
    }

    csldDbenCommit(obj) {
        return this.http.post('ocmfapro/csldDbCommit', obj);
    }

    cslddetCommit(obj) {
        return this.http.post('ocmfapro/csldDdCommit', obj);
    }

    cgfkchkCsldDbenCsldDben(personId) {
        return this.http.get(`ocmfapro/cgfkchkCsldDbenCsldDben?personId=${personId}`);
    }
    cgfkchkCsldDbenCsldDbenC(corporateId: any) {
        return this.http.get(`ocmfapro/cgfkchkCsldDbenCsldDbenCorp?corporateId=${corporateId}`);
    }
    csldDbenExecuteQuery(obj) {
        return this.http.post('ocmfapro/caseloadDedBenficExecuteQuery', obj);
    }

    csldDdExecuteQuery(obj) {
        return this.http.post('ocmfapro/caseloadDedDetExecuteQuery', obj);
    }

    singleCommit(obj) {
        return this.http.post('ocmfapro/singleCommit', obj);
    }

    sysPflExecuteQuery() {
        return this.http.get('ocmfapro/sysPflExecuteQuery');
    }

    sysPfl2ExecuteQuery() {
        return this.http.get('ocmfapro/sysPfl2ExecuteQuery');
    }

    calculateOn(deductionType) {
        return this.http.get(`ocmfapro/calculateOn?deductionType=${deductionType}`);
    }
}
