import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidsenadService {
   
    constructor(private http: HttpService) {}
    
    offencesAgainstOrdersData() {
        return this.http.get('ocuoffen/offencesAgainstOrders');
    }
    
    populateSentAdjustment(obj) {
        return this.http.post('oidsenad/populateSentAdjustment',obj);
    }
    populateDebitCredit(obj)
    {
        return this.http.post('oidsenad/populateDebitCredit',obj);
    }
    insertDebitCreditRecord(obj)
    {
        return this.http.post('oidsenad/insertDebitCreditRecord',obj);
    }
    
    populateAdjustGrid(offenderBookId) {
        return this.http.get('oidsenad/populateAdjustData?offenderBookId='+offenderBookId);
    }
    
    updateAdjustRecord(obj)
    {
        return this.http.post('oidsenad/updateAdjustData',obj);
    }
    
}