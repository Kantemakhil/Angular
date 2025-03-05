import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtmalproService {
	constructor(private http: HttpService) { }
	/** This is description of the csldDpExecuteQuery function*/
	csldDpExecuteQuery(obj) {
		return this.http.post('otmalpro/csldDpExecuteQuery', obj);
	}
	/** This is description of the csldDpCommit function*/
	csldDpCommit(obj) {
		return this.http.post('otmalpro/csldDpCommit', obj);
	}
	/** This is description of the csldDdExecuteQuery function*/
	csldDdExecuteQuery(obj) {
		return this.http.post('otmalpro/csldDdExecuteQuery', obj);
	}
	/** This is description of the csldDdCommit function*/
	csldDdCommit(obj) {
		return this.http.post('otmalpro/csldDdCommit', obj);
	}
	/** This is description of the cgfkCslddpaccountcodeRecordGroup function*/
	cgfkCslddpaccountcodeRecordGroup(obj) {
		return this.http.get('otmalpro/cgfk$csldDpAccountCodeRecordGroup');
	}
	/** This is description of the cgfkCsldddreceipttxntypeRecordGroup function*/
	cgfkCsldddreceipttxntypeRecordGroup(obj) {
		return this.http.get('otmalpro/cgfk$csldDdReceiptTxnTypeRecordGroup');
	}
	/** This is description of the cgfkCslddpdeductiontypeRecordGroup function*/
	cgfkCslddpdeductiontypeRecordGroup(obj) {
		return this.http.get('otmalpro/cgfk$csldDpDeductionTypeRecordGroup');
	}
	getfromBalDesc(deductionType) {
		return this.http.get('otmalpro/getfromBalDesc?deductionType=' + deductionType);
	}
	compareEffectiveDate (effectiveDate) {
		return this.http.get('otmalpro/compareEffectiveDate?effectiveDate=' + effectiveDate);
	}
	checkExists (caseloadId, deductionType) {
		return this.http.get('otmalpro/checkExists?caseloadId=' + caseloadId + '&deductionType=' + deductionType);
	}
	getfromBalType(deductionType) {
		return this.http.get('otmalpro/getfromBalDesc?deductionType=' + deductionType);
	}

	getfromBalTypes(deductionType) {
		return this.http.get('otmalpro/getfromBalDesc1?deductionType=' + deductionType);
	}

	allocTypeValidation(allocType, caseloadId) {
        return this.http.get('otmalpro/allocTypeValidation?allocType=' + allocType + '&caseloadId=' + caseloadId);
    }
	getAllocationType(caseLoadType){
		return this.http.get('otmalpro/cgfkCsldDpDeductionTypeRecordGroup?caseloadType=' + caseLoadType)
	}
}
