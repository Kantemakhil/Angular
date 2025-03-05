import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
@Injectable({ providedIn: 'root' })

export class OcmsvmodService {
	constructor(private http: HttpService) { }
	/** This is description of the vPrgMdlsExecuteQuery function*/
	vPrgMdlsExecuteQuery(obj) {
		return this.http.post('ocmsvmod/vPrgMdlsExecuteQuery', obj);
	}
	/** This is description of the vPrgMdlsCommit function*/
	vPrgMdlsCommit(obj) {
		return this.http.post('ocmsvmod/vPrgMdlsCommit', obj);
	}
	/** This is description of the valueSeq function*/
	valueSeq(obj) {
		return this.http.post('ocmsvmod/valueSeq', obj);
	}
}
