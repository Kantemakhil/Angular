import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { GrievanceTypesCommitBean } from '../beans/GrievanceTypesCommitBean';


@Injectable({ providedIn: 'root' })
export class OimiitpsService {
    grievencePermissionCommit(obj) {
        return this.http.post('oimiitps/grievencePermissionCommit', obj);
    }
    constructor(private http: HttpService) { }


    grievencePermissionExecuteQuery(obj) {
        return this.http.post('oimiitps/grievencePermissionExecuteQuery', obj);
    }

    omsRoleExecuteQuery( obj ) {
        return this.http.post( 'oimiitps/omsRoleExecuteQuery', obj );
    }
}