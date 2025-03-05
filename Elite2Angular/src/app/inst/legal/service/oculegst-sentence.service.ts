import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OculegstSentenceService {
    constructor(private http: HttpService) {}
 
    getUpdateUser(){
        return this.http.get("oculegst/getUpdateUser");
    }
    
}