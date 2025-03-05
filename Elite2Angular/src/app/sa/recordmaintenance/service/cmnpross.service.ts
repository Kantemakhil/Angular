import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Injectable({providedIn: 'root'})
export class CmnprossService {
	constructor(private http: HttpService, private sessionManager: UserSessionManager, private httpClient: HttpClient) { }
	processExecuteQuery() {
		return this.http.get('prosmain/processExecuteQuery');
	}
	processCommit(obj) {
		return this.http.post('prosmain/processCommit', obj);
	}
	deployeBpmn(obj) {
		return this.http.post('prosmain/deployeBpmn', obj);
	}
	getRelatedDto(obj) {
		return this.http.post('prosmain/getRelatedDto', obj);
	}
	validateDeploy(data: any) {
		return this.http.post('cmdwork/validateDeploy', data);
	}
	deleteTrigger(triggerId: any) {
		return this.http.post('cmdwork/deleteTrigger', triggerId);
	}

	getProcessData(processId : string){
		return this.http.get('prosmain/getProcessData?processId='+processId);
	}
	
	getProcessInstance(processId : number){
		return this.http.get('prosmain/getProcessInstance?processId='+processId);
	}

	exportProcesses(processList){
		let myHeaders = new HttpHeaders();
        myHeaders.append( 'Accept', '*/*' );
		return this.http.postBlob('prosmain/exportProcesses', processList, myHeaders);
	}

	getBaseUrl(){
        var baseUrl = window.location.origin;
        if (!window.location.origin) {
            baseUrl = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
        }
        return baseUrl;
    }

	importProcesses(formData){
		const httpOptions = {
			headers: new HttpHeaders({
			  'Authorization': this.sessionManager.getTokenType()
			  + ' ' + this.sessionManager.getAccessToken() ,
			  'Accept' : '*/*'
			})
	    };
		return this.httpClient.post(this.getBaseUrl()+'/Elite2Web/api/prosmain/importProcesses', formData, httpOptions);
	}


	deployProcesses(list) {
		return this.http.post('cmdaction/commitProcesses', list);
	}
	
}
