import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidsenhyService {
    constructor(private http: HttpService) {}
    populateSentenceHistoryData(obj){        
        return this.http.post('/oidsenhy/populateSentenceHistoryData',obj);
    }
    
    populateKeyDatesValues(keydatesLabels) {
        return this.http.post('oidsenhy/populateKeyDatesValues',keydatesLabels);
    }
   
}