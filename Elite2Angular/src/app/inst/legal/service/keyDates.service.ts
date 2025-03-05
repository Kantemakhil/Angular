import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class KeyDatesService {
   
    constructor(private http: HttpService) {}
    
    fetchKeyDates(parentScreenId){
           return this.http.get(parentScreenId+"/fetchKeyDates");
    }
    
    populateKeyDates(parentScreenId,keydatesLabels){
           return this.http.post(parentScreenId+"/populateKeyDates",keydatesLabels);
    }

    updateKeyDates(parentScreenId,keyDatesUpdateList){
           return this.http.post(parentScreenId+"/updateKeyDates",keyDatesUpdateList);
    }
    
}