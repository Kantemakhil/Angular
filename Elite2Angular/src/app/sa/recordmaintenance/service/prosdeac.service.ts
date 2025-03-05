import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Injectable({providedIn: 'root'})
export class ProsdeacService {
	constructor(private http: HttpService, private sessionManager: UserSessionManager, private httpClient: HttpClient) { }
	processDeacExecuteQuery() {
		return this.http.get('prosdeac/processDeacExecuteQuery');
	}
	suspendProcess(obj) {
		return this.http.post('prosdeac/suspendProcess', obj);
	}
	activateProcess(obj) {
		return this.http.post('prosdeac/activateProcess', obj);
	}
	deleteProcess(obj) {
		return this.http.post('prosdeac/deleteProcess', obj);
	}
}
