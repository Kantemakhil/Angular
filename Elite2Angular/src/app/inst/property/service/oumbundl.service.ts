import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSessionManager } from '@core/classes/userSessionManager';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OumbundlService {
  
    constructor(private http: HttpService, private sessionManager: UserSessionManager, private httpClient: HttpClient) { }
    
    getPropertyBundles(){
		return this.http.get('oumbundl/getPropertyBundles');
	}
    
    getPropertyItems(groupId){
		return this.http.get('oumbundl/getPropertyItems?groupId='+groupId);
	}
	
	updatePropertyBundles(propertyModel){
		return this.http.post('oumbundl/updatePropertyBundles', propertyModel);
	}
	
	updatePropertyItems(itemsModel){
		return this.http.post('oumbundl/updatePropertyBundleItems', itemsModel);
	}
}    