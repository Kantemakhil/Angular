import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcucorptService {
    constructor(private http: HttpService) { }
    /** This is description of the corporateTypesExecuteQuery function*/
    corporateTypesExecuteQuery(obj) {
        return this.http.post('ocucorpt/corporateTypesExecuteQuery', obj);
    }
    /** This is description of the corporateTypesCommit function*/
    corporateTypesCommit(obj) {
        return this.http.post('ocucorpt/corporateTypesCommit', obj);
    }
    /** This is description of the rgCorpTypeRecordGroup function*/
    rgCorpTypeRecordGroup(obj) {
        return this.http.get('ocucorpt/rgCorpTypeRecordGroup');
    }
    /** This is description of the prevCaseloadCorpExists function*/
    prevCaseloadCorpExists(obj) {
        return this.http.post('ocucorpt/prevCaseloadCorpExists', obj);
    }
}
