import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcittpowService {
	constructor(private http: HttpService) { }

	/** Loading of lov's  of the Ext_Ot_Dsp _DescriptionRecordGroup */
	dspDescriptionRecordGroup(obj) {
		return this.http.get('ocittpow/dspDescriptionRecordGroup');
	}

	/** Loading of lov's  of the Ext_Ot_Na_agyLocIdFromRecordGroup */
	agyLocIdFromRecordGroup(agyLocIdFrom) {
		return this.http.get('ocittpow/agyLocIdFromRecordGroup?agyLocIdFrom=' + agyLocIdFrom);
	}

	/** Execute Query  transferred Offenders ExecuteQuery */
	transferredOffendersExecuteQuery(code) {
		return this.http.get('ocittpow/transferredOffendersExecuteQuery?code=' + code);
	}

	/** Execute Query  agyLocIdTo ExecuteQuery 	*/
	agyLocIdToExecuteQuery(agyLocIdTo) {
		return this.http.get('ocittpow/agyLocIdToExecuteQuery?agyLocIdTo=' + agyLocIdTo);
	}

	/* whenCheckboxChanged */
	whenCheckboxChanged(obj) {
		return this.http.post('ocittpow/whenCheckboxChanged', obj);
	}

	/**  transferred Offenders Commint function*/
	transferredOffendersCommit(obj) {
		return this.http.post('ocittpow/transferredOffendersCommit', obj);
	}
}
