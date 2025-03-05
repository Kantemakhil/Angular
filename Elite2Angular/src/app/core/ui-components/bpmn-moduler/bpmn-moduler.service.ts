import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';
@Injectable({providedIn: 'root'})
export class BpmnModulerService {
    
    bpmnRowData:any;
    routeTo : string;
    constructor(private http: HttpService) { }
    saveBpmn(obj) {
        return this.http.post('prosmain/processCommit', obj);
    }
    getProcess(obj) {
        return this.http.post('prosmain/getProcess', obj);
    }
    getDmnFile(obj: any) {
        return this.http.post('dmnmain/getDmnFile', obj);
    }
    getQuickActions() {
        return this.http.get('apimain/getQuickActions'); 
    }
    getQuickActionParameters(obj) {
        return this.http.post('cmdaction/parametersExecuteQuery', obj);
    }
    
}






