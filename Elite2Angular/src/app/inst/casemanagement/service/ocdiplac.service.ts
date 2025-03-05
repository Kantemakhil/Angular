import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OcdiplacService {
    constructor(private http: HttpService) { }

    insertUpdateCasePlanStaffMemberDetails(obj) {
        return this.http.post('ocdiplac/insertUpdateCasePlanStaffMemberDetails', obj);
    }

    staffMemebersListByAgyLocId(agyLocId) {
        return this.http.get('ocdiplac/staffMemebersListByAgyLocId?agyLocId=' + agyLocId);
    }
    getAllStaffMembersList(offenderBookId, casePlanId) {
        return this.http.get(`ocdiplac/getAllStaffMembersList?offenderBookId=${offenderBookId}&casePlanId=${casePlanId}`);
    }

    childDataCarry(offenderBookId) {
        return this.http.get('ocdiplac/childDataCarry?offenderBookId=' + offenderBookId);
    }

}