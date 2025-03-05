import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OculegstService {
    
    constructor(private http: HttpService) {} 
    
    getCaseUpdateReasons(){       
        return this.http.get('ocdlegst/reasonUpdateStatus');
    }
    
    getUpdateUser(){        
        return this.http.get('oculegst/getUpdateUser');
    }    
}