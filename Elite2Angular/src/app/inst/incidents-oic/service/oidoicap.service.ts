import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/service/http.service';


@Injectable()
export class OidoicapService {
	constructor(private http: HttpService) {}
	/** This is description of the offOicaExecuteQuery function*/
	offOicaExecuteQuery(obj) {
		return this.http.post('oidoicap/offOicaExecuteQuery',obj);
	}
	/** This is description of the offOicaCommit function*/
	offOicaCommit(obj) {
		return this.http.post('oidoicap/offOicaCommit',obj);
	}
	/** This is description of the offOicaiExecuteQuery function*/
	offOicaiExecuteQuery(obj) {
		return this.http.post('oidoicap/offOicaiExecuteQuery',obj);
	}
	/** This is description of the offOicaiCommit function*/
	offOicaiCommit(obj) {
		return this.http.post('oidoicap/offOicaiCommit',obj);
	}
	/** This is description of the offOicapExecuteQuery function*/
	offOicapExecuteQuery(obj) {
		return this.http.post('oidoicap/offOicapExecuteQuery',obj);
	}
	/** This is description of the offOicapCommit function*/
	offOicapCommit(obj) {
		return this.http.post('oidoicap/offOicapCommit',obj);
	}
	/** This is description of the rgHearingResultCodeRecordGroup function*/
	rgHearingResultCodeRecordGroup(obj) {
		return this.http.get( 'oidoicap/rgHearingResultCodeRecordGroup');
	}
	/** This is description of the rgAppealReasonCodeRecordGroup function*/
	rgAppealReasonCodeRecordGroup(obj) {
		return this.http.get( 'oidoicap/rgAppealReasonCodeRecordGroup');
	}
	/** This is description of the rgHearingOffencesRecordGroup function*/
	rgHearingOffencesRecordGroup(obj) {
		return this.http.get( 'oidoicap/rgHearingOffencesRecordGroup?offenderBookingId='+obj);
	}
	/** This is description of the rgOicPenaltyTypeRecordGroup function*/
	rgOicPenaltyTypeRecordGroup(obj) {
		return this.http.get( 'oidoicap/rgOicPenaltyTypeRecordGroup');
	}
	/** This is description of the rgOicSeqLogRecordGroup function*/
	rgOicSeqLogRecordGroup(obj) {
		return this.http.post( 'oidoicap/rgOicSeqLogRecordGroup',obj);
	}
	/** This is description of the rgOicStatusRecordGroup function*/
	rgOicStatusRecordGroup(obj) {
		return this.http.get( 'oidoicap/rgOicStatusRecordGroup');
	}
	/** This is description of the rgHeardByRecordGroup function*/
	rgHeardByRecordGroup(obj) {
		return this.http.get( 'oidoicap/rgHeardByRecordGroup');
	}

	butOriginalPenalty(obj) {
		return this.http.post( 'oidoicap/butOriginalPenalty',obj);
	}

	getoffencedetails(obj) {
		return this.http.post( 'oidoicap/getoffencedetails',obj);
	}

	getOicOffenceCodeCur(obj){
		return this.http.get( 'oidoicap/getOicOffenceCodeCur?oicOffenceId='+obj);
	}
}
