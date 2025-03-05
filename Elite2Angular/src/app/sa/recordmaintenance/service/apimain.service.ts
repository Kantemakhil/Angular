import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Injectable({providedIn: 'root'})
export class ApimainService {
	constructor(private http: HttpService, private sessionManager: UserSessionManager, private httpClient: HttpClient) { }
	apimainExecuteQuery() {
		return this.http.get('apimain/apimainExecuteQuery');
	}
	apimainCommit(obj) {
		return this.http.post('apimain/apimainCommit', obj);
	}

	exportApiAndAction(List){
		let myHeaders = new HttpHeaders();
        myHeaders.append( 'Accept', '*/*' );
		return this.http.postBlob('cmdaction/exportActions', List, myHeaders);
	}


	getBaseUrl(){
        var baseUrl = window.location.origin;
        if (!window.location.origin) {
            baseUrl = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
        }
        return baseUrl;
    }

	importQuickActions(formData){
		const httpOptions = {
			headers: new HttpHeaders({
			  'Authorization': this.sessionManager.getTokenType()
			  + ' ' + this.sessionManager.getAccessToken() ,
			  'Accept' : '*/*'
			})
	    };
		return this.httpClient.post(this.getBaseUrl()+'/Elite2Web/api/cmdaction/importActions', formData, httpOptions);
	}

	deployQuickActions(obj) {
		return this.http.post('cmdaction/commitActions', obj);
	}
	
}
