import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';
import { CasePlans } from '@inst/casemanagement/beans/CasePlans';


@Injectable({providedIn: 'root'})
export class OciiplanService {
    constructor(private http: HttpService) {}
    caseplansModel: CasePlans = new CasePlans();
    caseplansData: CasePlans[] = [];
    selectedRow = 0;
    butExitCasePlanFlag: boolean;
    /** This is description of the casePlansExecuteQuery function*/
    casePlansExecuteQuery(obj) {
        return this.http.post('ociiplan/casePlansExecuteQuery', obj);
    }
    /** This is description of the rgInstAgyLocRecordGroup function*/
    rgInstAgyLocRecordGroup(obj) {
        return this.http.get( 'ociiplan/rgInstAgyLocRecordGroup');
    }
    /** This is description of the rgVerifiedFilterRecordGroup function*/
    rgVerifiedFilterRecordGroup(obj) {
        return this.http.get( 'ociiplan/rgVerifiedFilterRecordGroup');
    }
    /** This is description of the comInstAgyLocRecordGroup function*/
    comInstAgyLocRecordGroup(obj) {
        return this.http.get( 'ociiplan/comInstAgyLocRecordGroup');
    }
    offbkgGlobalQuery(obj: any) {
        return this.http.post('osiosear/offbkgGlobalQuery', obj);
    }
    ociiplanTagMainGetOffender(caseLoadId: string, caseLoadType: string, offenderIdDisplay: string) {
        return this.http.get( 'ociiplan/ociiplanTagMainGetOffender?caseLoadId=' + caseLoadId + '&caseLoadType=' + caseLoadType +
        '&offenderIdDisplay=' + offenderIdDisplay);
    }
}
