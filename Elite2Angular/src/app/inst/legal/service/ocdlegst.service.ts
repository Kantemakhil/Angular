import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdlegstService {
    
    constructor(private http: HttpService) {}   
    
   updateSentencesData(obj){
        return this.http.post("ocdlegst/updateSetenceReason",obj);
    }
   
   getConditionData(obj){
       return this.http.post("ocdlegst/populateCondition",obj);
   }
   
   updateConditionData(obj){
       return this.http.post("ocdlegst/updateConditionData",obj);
   }
  
   getUpdateCaseReason(obj){
       return this.http.post("ocdlegst/updateCaseReason",obj);
   }
}