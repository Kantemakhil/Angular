import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidojoinService {
    constructor(private http: HttpService) {}
    populateGridData(obj){        
        return this.http.post('/oidojoin/populateGridData',obj);
    }
    newGridRecord(obj)
    {
        return this.http.post('/oidojoin/newGridRecord',obj); 
    }
    
}
