import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OcusmoduService {
	constructor(private http: HttpService) { }
	/** This is description of the vAcpSchExecuteQuery function*/
	vAcpSchExecuteQuery(obj) {
		return this.http.post('ocusmodu/vAcpSchExecuteQuery', obj);
	}
	/** This is description of the vAcpSchCommit function*/
	vAcpSchCommit(obj) {
		return this.http.post('ocusmodu/vAcpSchCommit', obj);
	}
}
