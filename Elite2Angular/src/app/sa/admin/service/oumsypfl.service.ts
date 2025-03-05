import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OumsypflService {
    constructor(private http: HttpService) { }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('oumsypfl/sysPflExecuteQuery', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflGetInsightMode() {
        return this.http.get('oumsypfl/getInsightMode');
    }
    /** This is description of the sysPflCommit function*/
    sysPflCommit(obj) {
         return this.http.post('oumsypfl/sysPflCommit', obj);
    }
    /** This is description of the cgfkSyspflprofiletypeRecordGroup function*/
    cgfkSyspflprofiletypeRecordGroup(obj) {
         return this.http.get('oumsypfl/cgfk$sysPflProfileTypeRecordGroup');
    }
    /** This is description of the sysPflExecuteQuery function*/
    getSystemProfileRecords(obj) {
        return this.http.post('oumsypfl/getSystemProfileRecords', obj);
    }

    systemProfileDataUpdate(){
        return this.http.get('oumsypfl/updateSystemProfileCache'); 
       }
}
