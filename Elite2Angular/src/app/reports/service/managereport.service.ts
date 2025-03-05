import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserSessionManager } from '@core/classes/userSessionManager';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class ManageReportService {
    
    
  constructor(private http: HttpService, private sessionManager: UserSessionManager, private httpClient: HttpClient) { }

    messageSubject = new Subject<any>();
    
	getBaseUrl(){
        var baseUrl = window.location.origin;
        if (!window.location.origin) {
            baseUrl = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
        }
        return baseUrl;
    }
  
	
	importReports(formData){
		const httpOptions = {
			headers: new HttpHeaders({
			  'Authorization': this.sessionManager.getTokenType()
			  + ' ' + this.sessionManager.getAccessToken() ,
			  'Accept' : '*/*'
			})
	    };
		return this.httpClient.post(this.getBaseUrl()+'/Elite2Web/api/oiimpjrp/importReports', formData, httpOptions);
	}
	
	viewAllJRReports() {
		return this.http.get('report/allJRReports');
	}
	
	exportReports(reportsList){
		let myHeaders = new HttpHeaders();
        myHeaders.append( 'Accept', '*/*' );
		return this.http.postBlob('/oiexpjrp/exportReports', reportsList, myHeaders);
	}
	
	getReportParameters(moduleName){
		return this.http.get('report/inputParams?moduleName='+moduleName);		
	}

	openReport(modelData){
	    let myHeaders = new HttpHeaders();
        myHeaders.append( 'Accept', '*/*' );
	     return this.http.postBlob('report/open', modelData, myHeaders);
	}
	
	openNonPdfReport(modelData) {
	    let myHeaders = new HttpHeaders();
        myHeaders.append( 'Accept', '*/*' );
		return this.http.postBlob('report/open/nonpdf', modelData, myHeaders);
	}
	
	conflictReport(moduleName){
		return this.http.get('report/conflictParameters?moduleName='+moduleName);	
	}
	
	updateParameters(parameterModel){
		return this.http.post('report/moduleparameters', parameterModel);
	}
	
	updateReports(commitReport){
		return this.http.post('report/commitReport', commitReport);
	}
	
	getAllAssets(){
		return this.http.get('oirmasset/report/assets');
	}
	
	getAssets(assetCode){
		return this.http.get('oirmasset/report/asset?asset_code=' + assetCode)
	}
	
	addUpdateAsset(formData){
		const httpOptions = {
			headers: new HttpHeaders({
			  'Authorization': this.sessionManager.getTokenType()
			  + ' ' + this.sessionManager.getAccessToken() ,
			  'Accept' : '*/*'
			})
	   };
		return this.httpClient.post(this.getBaseUrl()+'/Elite2Web/api/oirmasset/report/asset',formData,httpOptions);
}
	
}
