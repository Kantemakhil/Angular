import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmdedutService {
    constructor(private http: HttpService) { }
    /** This is description of the dedTypeExecuteQuery function*/
    dedTypeExecuteQuery(obj) {
        return this.http.post('ocmdedut/dedTypeExecuteQuery', obj);
    }
    /** This is description of the dedTypeCommit function*/
    dedTypeCommit(obj) {
        return this.http.post('ocmdedut/dedTypeCommit', obj);
    }
    /** This is description of the cgfkDedtypecaseloadcodeRecordGroup function*/
    cgfkDedtypecaseloadcodeRecordGroup(obj) {
        return this.http.get('ocmdedut/cgfk$dedTypeCaseloadCodeRecordGroup');
    }
    /** This is description of the cgfkDedtypedeductioncategoRecordGroup function*/
    cgfkDedtypedeductioncategoRecordGroup(obj) {
        return this.http.get('ocmdedut/cgfk$dedTypeDeductionCategoRecordGroup');
    }
    /** This is description of the cgfkDedtypefrombalancetypRecordGroup function*/
    cgfkDedtypefrombalancetypRecordGroup(obj) {
        return this.http.get('ocmdedut/cgfk$dedTypeFromBalanceTypRecordGroup');
    }
    /** This is description of the rgParentDeductionTypeRecordGroup function*/
    rgParentDeductionTypeRecordGroup(obj) {
        return this.http.get('ocmdedut/rgParentDeductionTypeRecordGroup');
    }
    /** This is description of the dedCodeValidation function*/
    dedCodeValidation(dedCode) {
        return this.http.get('ocmdedut/dedCodeValidation?dedCode=' + dedCode);
    }
    /** This is description of the deleteDedTypeValidation function*/
    deleteDedTypeValidation(dedCode) {
        return this.http.get('ocmdedut/deleteDedTypeValidation?dedCode=' + dedCode);
    }
    /** This is description of the deleteDedTypeValidation function*/
    dedTypeValidation(dedType) {
        return this.http.get('ocmdedut/dedTypeValidation?dedType=' + dedType);
    }
}
