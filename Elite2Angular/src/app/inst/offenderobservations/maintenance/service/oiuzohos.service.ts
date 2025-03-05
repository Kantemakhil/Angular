import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OiuzohosService {
    constructor(private http: HttpService) { }
    rgAgyLocLovRecordGroup() {
        return this.http.get('oiuzohos/rgunitTypeLov');
    }
    rgLevel1LovData(unitTypeValue, facility) {
        return this.http.get('oiuzohos/rgLevel1LovData?unitTypeValue=' + unitTypeValue + '&facility=' + facility);
    }

    rgLevel2LovData(livigUnitId) {
        return this.http.get('oiuzohos/rgLevel2LovData?livigUnitId=' + livigUnitId);
    }

    rgLevel3LovData(parentLivingUnitId) {
        return this.http.get('oiuzohos/rgLevel3LovData?parentLivigUnitId=' + parentLivingUnitId);
    }

    rgLevel4LovData(parentLivingUnitId) {
        return this.http.get('oiuzohos/rgLevel4LovData?parentLivigUnitId=' + parentLivingUnitId);
    }

    /** This is description of the ctlLstExecuteQuery function*/
    selectionQuery(obj) {
        return this.http.post('oiuzohos/selectionQuery', obj);
    }

    oiuzohosExecuteQuery(obj) {
        return this.http.post('oiuzohos/zonehousingSeleExecuteQuery', obj);
    }

    getZoneAssignedCount(obj) {
        return this.http.post('oiuzohos/getZoneAssignedCount', obj);
    }
    
}
