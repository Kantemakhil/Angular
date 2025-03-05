import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidtrojuService {
    constructor(private http: HttpService) { }
    /** This is description of the offEmExecuteQuery function*/
    offEmExecuteQuery(obj) {
        return this.http.post('oidtroju/offEmExecuteQuery', obj);
    }
    /** This is description of the offEmCommit function*/
    offEmCommit(obj) {
        return this.http.post('oidtroju/offEmCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('oidtroju/sysPflExecuteQuery', obj);
    }
    /** This is description of the cgfkOffemtoprovstatcodeRecordGroup function*/
    cgfkOffemtoprovstatcodeRecordGroup() {
        return this.http.get('oidtroju/cgfkOffEmToProvStatCodeRecordGroup');
    }

    checkMovementDate(obj){
        return this.http.post('oidtroju/checkMovementDate', obj);
    }

}
