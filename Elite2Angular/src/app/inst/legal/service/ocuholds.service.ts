import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcuholdsService {
    constructor(private http: HttpService) {}
    
    insertHoldData(obj) {
        return this.http.post('ocuholds/updateHoldData',obj);
    }
    
}
 