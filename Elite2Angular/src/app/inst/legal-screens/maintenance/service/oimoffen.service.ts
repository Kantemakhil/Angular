import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OimoffenService {
	constructor(private http: HttpService) { }
	/** This is description of the statExecuteQuery function*/
	statExecuteQuery(obj) {
		return this.http.post('oimoffen/statExecuteQuery', obj);
	}
	/** This is description of the ofnExecuteQuery function*/
	ofnExecuteQuery(obj) {
		return this.http.post('oimoffen/ofnExecuteQuery', obj);
	}
	/** This is description of the ofnCommit function*/
	ofnCommit(obj) {
		return this.http.post('oimoffen/ofnCommit', obj);
	}
	/** This is description of the alwOtExecuteQuery function*/
	alwOtExecuteQuery(obj) {
		return this.http.post('oimoffen/alwOtExecuteQuery', obj);
	}
	/** This is description of the alwOtCommit function*/
	alwOtCommit(obj) {
		return this.http.post('oimoffen/alwOtCommit', obj);
	}
	/** This is description of the offIndExecuteQuery function*/
	offIndExecuteQuery(obj) {
		return this.http.post('oimoffen/offIndExecuteQuery', obj);
	}
	/** This is description of the offIndCommit function*/
	offIndCommit(obj) {
		return this.http.post('oimoffen/offIndCommit', obj);
	}
	/** This is description of the cgfkOfnseverityrankingRecordGroup function*/
	cgfkOfnseverityrankingRecordGroup(obj) {
		return this.http.get('oimoffen/cgfk$ofnSeverityRankingRecordGroup');
	}
	/** This is description of the cgfkAlwotoffencetypeRecordGroup function*/
	cgfkAlwotoffencetypeRecordGroup(obj) {
		return this.http.get('oimoffen/cgfk$alwOtOffenceTypeRecordGroup');
	}
	/** This is description of the offIndLovRecordGroup function*/
	offIndLovRecordGroup(obj) {
		return this.http.get('oimoffen/offIndLovRecordGroup');
	}
	/** This is description of the ofnHoOffSubclRecordGroup function*/
	ofnHoOffSubclRecordGroup(obj) {
		return this.http.get('oimoffen/ofnHoOffSubclRecordGroup');
	}
	/** This is description of the statStatutesCodeRecordGroup function*/
	statStatutesCodeRecordGroup(obj) {
		return this.http.get('oimoffen/statStatutesCodeRecordGroup');
	}
	/** This is description of the rgHoCodeRecordGroup function*/
	rgHoCodeRecordGroup(obj) {
		return this.http.get('oimoffen/rgHoCodeRecordGroup');
	}
	oimoffenStatOncheckdeletemasterOffences(obj) {
		return this.http.post('oimoffen/oimoffenStatOncheckdeletemasterOffences', obj);
	}
	isChgDependOnOffences(offenceId) {
		return this.http.get('oimoffen/isChgDependOnOffences?offenceId=' + offenceId);
	}
}
