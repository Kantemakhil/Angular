import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OimoicoiService {
	constructor(private http: HttpService) {}
	/** This is description of the oicOfnExecuteQuery function*/
	oicOfnExecuteQuery(obj) {
		return this.http.post('oimoicoi/oicOfnExecuteQuery', obj);
	}
	/** This is description of the oicOfnCommit function*/
	oicOfnCommit(obj) {
		return this.http.post('oimoicoi/oicOfnCommit',obj);
	}
	/** This is description of the oicOffenceIndicatorsExecuteQuery function*/
	oicOffenceIndicatorsExecuteQuery(obj) {
		return this.http.post('oimoicoi/oicOffenceIndicatorsExecuteQuery',obj);
	}
	/** This is description of the oicOffenceIndicatorsCommit function*/
	oicOffenceIndicatorsCommit(obj) {
		return this.http.post('oimoicoi/oicOffenceIndicatorsCommit',obj);
	}
	/** This is description of the rgOicOffenceCategRecordGroup function*/
	rgOicOffenceCategRecordGroup(obj) {
		return this.http.get( 'oimoicoi/rgOicOffenceCategRecordGroup');
	}
	/** This is description of the rgOicOffenceTypeRecordGroup function*/
	rgOicOffenceTypeRecordGroup(obj) {
		return this.http.get( 'oimoicoi/rgOicOffenceTypeRecordGroup');
	}
	/** This is description of the rgOicOffenceIndicatorsRecordGroup function*/
	rgOicOffenceIndicatorsRecordGroup(obj) {
		return this.http.get( 'oimoicoi/rgOicOffenceIndicatorsRecordGroup');
	}

	oicOfnCheckoverLapping(obj) {
		return this.http.post('oimoicoi/oicOfnCheckoverLapping', obj);
	}
}
