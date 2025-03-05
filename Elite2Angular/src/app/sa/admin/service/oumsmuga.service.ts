import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OumsmugaService {
    constructor(private http: HttpService) { }
    omsRoleExecuteQuery(obj) {
        return this.http.post('oumsmuga/omsRoleExecuteQuery', obj);
    }
    staffRoleExecuteQuery(obj) {
        return this.http.post('oumsmuga/staffRoleExecuteQuery', obj);
    }
    staffRoleCommit(obj) {
        return this.http.post('oumsmuga/staffRoleCommit', obj);
    }
    cgfkStaffRoleDspUserIdRecordGroup() {
        return this.http.get('oumsmuga/cgfkStaffRoleDspUserIdRecordGroup');
    }
}
