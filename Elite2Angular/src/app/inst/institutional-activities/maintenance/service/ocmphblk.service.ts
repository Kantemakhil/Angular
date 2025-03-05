import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OcmphblkService {
	constructor(private http: HttpService) { }
	/** This is description of the prgSrvExecuteQuery function*/
	prgSrvExecuteQuery(obj) {
		return this.http.post('ocmphblk/prgSrvExecuteQuery', obj);
	}
	/** This is description of the prgSrvCommit function*/
	prgSrvCommit(obj) {
		return this.http.post('ocmphblk/prgSrvCommit', obj);
	}
	getNextPrgSrvListSeq(obj) {
		return this.http.post('ocmphblk/getNextPrgSrvListSeq', obj);
	}
}
