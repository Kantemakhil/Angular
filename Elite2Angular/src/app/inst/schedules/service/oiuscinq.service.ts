import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '@core/service/http.service'

@Injectable({providedIn: 'root'})
export class OiuscinqService {
    constructor(private http: HttpService,private router : Router) { }
    /** This is description of the offSchExecuteQuery function*/
    offSchExecuteQuery(obj) {
        return this.http.post('oiuscinq/offSchExecuteQuery', obj);
    }
    rgEventSubTypeQuery(code) {
        return this.http.get('oiuscinq/rgEventSubTypeQuery?code=' + code);
    }
	
	hearingData(){
	    return this.http.get('ocdccase/populateHearingTypeData');
	} 
}
