import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcupsrdeService {
    constructor(private http: HttpService) {}
    
    insertNewCourtReport(obj){
        return this.http.post('ocupsrde/insertUpdateDeleteCourtReport',obj);
    }
    
    insertAssignReport(obj) {
        return this.http.post('ocupsrde/create_team_assign_hty_new',obj);
    }
    
    populateAssignReport(obj) {
        return this.http.post('ocupsrde/populateAssignReport',obj);
    }
    
    isReportExist(obj) {
        return this.http.post('ocupsrde/isReportExist',obj);
    }
    
    generateOrderId() {
        return this.http.get('ocupsrde/generateOrderId');
    }
    
    getStatusDesc(status) {
        return this.http.get('ocupsrde/getStatusDesc?reportStatus='+status);
    }
}
