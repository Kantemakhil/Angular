import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OumhlhisService {
    exitHistory: boolean;
    constructor(private http: HttpService) { }
    /** This is description of the vAgyIntLocAmendExecuteQuery function*/
    vAgyIntLocAmendExecuteQuery(obj) {
        return this.http.post('oumhlhis/vAgyIntLocAmendExecuteQuery', obj);
    }
    /** This is description of the livingUnit1RgRecordGroup function*/
    livingUnit1RgRecordGroup(obj) {
        return this.http.get('oumhlhis/livingUnit1RgRecordGroup');
    }
    /** This is description of the livingUnit2RgRecordGroup function*/
    livingUnit2RgRecordGroup(livingUnitId, level1Code) {
        return this.http.get('oumhlhis/livingUnit2RgRecordGroup?livingUnitId=' + livingUnitId + '&level1Code=' + level1Code);
    }
    /** This is description of the livingUnit3RgRecordGroup function*/
    livingUnit3RgRecordGroup(livingUnitId,level2Code) {
        return this.http.get('oumhlhis/livingUnit3RgRecordGroup?livingUnitId=' + livingUnitId + '&level2Code=' + level2Code);
    }
    /** This is description of the livingUnit4RgRecordGroup function*/
    livingUnit4RgRecordGroup(livingUnitId,level3Code) {
        return this.http.get('oumhlhis/livingUnit4RgRecordGroup?livingUnitId=' + livingUnitId + '&level3Code=' + level3Code);
    }
    /** This is description of the livingUnit4RgRecordGroup function*/
    getAgyLocIdDescReturn() {
        return this.http.get('oumhlhis/getAgyLocIdDescReturn');
    }
    /** This is description of the livingUnit2RgRecordGroup function*/
    getLivingunitId(agyLocId) {
        return this.http.get('oumhlhis/getLivingunitId?agyLocId=' + agyLocId);
    }
}
