import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidhwdetService {
    constructor(private http: HttpService) {}
    
    searchHoldWarrentDetainer(offenderBookId){
        return this.http.get('oidhwdet/searchHoldWarrentDetainer?offenderBookId='+offenderBookId);
    }
    searchCharges(hwdId) {
        return this.http.get('oidhwdet/searchCharges?hwdId='+hwdId);
    }
    getHistory(hwdId) {
        return this.http.get('oidhwdet/populateHistory?hwdId='+hwdId);
    }
    insertHwDetData(obj) {
        return this.http.post('oidhwdet/insertUpdateDeleteHwdet',obj);
    }
    
    insertUpdateDeleteHwdetCharges(obj) {
        return this.http.post('oidhwdet/insertUpdateDeleteHwdetCharges',obj);
    }
    
    insertUpdateDeleteHistoryRecord(obj) {
        return this.http.post('oidhwdet/updateHistory',obj);
    }    

    getBailMandatorySetting(code) {
        return this.http.get('oidhwdet/getBailMandatorySetting?code=' + code);
    }
    
}
