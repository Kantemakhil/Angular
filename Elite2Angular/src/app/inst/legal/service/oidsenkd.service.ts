import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidsenkdService {
    constructor(private http: HttpService) {}
    
    populateSentenceAggregateData(offenderBookId){
        return this.http.get('oidsenkd/populateSentenceAggregateData?offenderBookId='+offenderBookId);
    }
    
    
}
