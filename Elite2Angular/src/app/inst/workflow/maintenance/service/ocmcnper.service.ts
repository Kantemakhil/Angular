import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OcmcnperService {


    constructor(private http: HttpService) { }
    caseNotePermissionCommit(obj) {
        return this.http.post('ocmcnper/caseNotePermissionCommit', obj);
    }

    caseNotePermissionExecuteQuery(obj) {
        return this.http.post('ocmcnper/caseNotePermissionExecuteQuery', obj);
    }
    omsRoleExecuteQuery( obj ) {
        return this.http.post('ocmcnper/omsRoleExecuteQuery', obj );
    }
}
