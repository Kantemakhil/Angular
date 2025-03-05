import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OimprfcoService {
	checkProfileCodes(profileCode: String) {
		return this.http.get('oimprfco/checkProfileCodes?profileCode=' + profileCode);
	}
	constructor(private http: HttpService) {}
	/** This is description of the pflTypeExecuteQuery function*/
	pflTypeExecuteQuery(obj) {
		return this.http.post('oimprfco/pflTypeExecuteQuery',obj);
	}
	/** This is description of the pflCodeExecuteQuery function*/
	pflCodeExecuteQuery(obj) {
		return this.http.post('oimprfco/pflCodeExecuteQuery',obj);
	}
	/** This is description of the pflCodeCommit function*/
	pflCodeCommit(obj) {
		return this.http.post('oimprfco/pflCodeCommit',obj);
	}
}
