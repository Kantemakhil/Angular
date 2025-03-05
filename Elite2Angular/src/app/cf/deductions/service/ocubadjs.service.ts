import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OcubadjsService {
    constructor(private http: HttpService) { }
    
    billAdjustDetailsExecuteQuery(obj) {
        return this.http.post('ocubadjs/billAdjustDetailsExecuteQuery', obj);
    }
    
    saveBillAdjustdDetCommit(obj) {
        return this.http.post('ocubadjs/saveBillAdjustdDetCommit', obj);
    }
    
    getSelectedOverrideType(obj) {
        return this.http.post('ocubadjs/getSelectedOverrideType', obj);
    }
    
    
}
