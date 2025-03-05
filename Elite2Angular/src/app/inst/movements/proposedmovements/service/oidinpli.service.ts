import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OidinpliService {
	constructor(private http: HttpService) { }
	/** This is description of the extrMoveExecuteQuery function*/
	extrmoveExecuteQuery(obj) {
		return this.http.post('oidinpli/extrMoveExecuteQuery', obj);
	}
	/** This is description of the inmaDetCommit function*/
	inmadetCommit(obj) {
		return this.http.post('oidinpli/inmaDetCommit', obj);
	}
	/** This is description of the statDetExecuteQuery function*/
	statdetExecuteQuery(obj) {
		return this.http.post('oidinpli/statDetExecuteQuery', obj);
	}
	/** This is description of the statDetCommit function*/
	statdetCommit(obj) {
		return this.http.post('oidinpli/saveStatDetails', obj);
	}
	/** This is description of the transactCommitQuery function*/
	transactCommitQuery(obj) {
		return this.http.post('oidinpli/transactCommitQuery', obj);
	}
}
