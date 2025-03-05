import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidoicusService {
    exitFlag: boolean;
    oicIncidentId: number;
    constructor(private http: HttpService) { }
    /** This is description of the vOicInciExecuteQuery function*/
    vOicInciExecuteQuery(obj) {
        return this.http.post('oidoicus/vOicInciExecuteQuery', obj);
    }
    /** This is description of the rgIncTypeRecordGroup function*/
    rgIncTypeRecordGroup() {
        return this.http.get('oidoicus/rgIncTypeRecordGroup');
    }
    /** This is description of the offBkgOnCheckDeleteMasterv_oic_inci_cur function*/
    offBkgOnCheckDeleteMastervoicincicur(obj) {
        return this.http.get('oidoicus/offBkgOnCheckDeleteMastervOicInciCur', obj);
    }
    findLocationList() {
        return this.http.get('oidoicus/findLocationList');
    }
    staffReportsData(obj){
                       return this.http.post('oidstfrppop/getStaffReportsHistory',obj);
                     }
}
