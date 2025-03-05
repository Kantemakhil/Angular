import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OicuccideService {
    
    constructor(private http: HttpService) {}   
    
    identifires(caseId){
        return this.http.get('ocuccide/caseIdentifiers?caseId='+caseId);
    } 
    
    identefireType(){
        return this.http.get('ocuccide/identifierType');
    }
    
    insertIdentifierData(obj){
        return this.http.post('ocuccide/updateIdentifierData',obj);
    }    
}