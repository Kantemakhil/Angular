import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OcdofaccService {

    getLongSupvDate(caseloadId) {
		return this.http.get(`ocdofacc/getlongSupvDate?caseloadId=${caseloadId}`);
    }
	constructor(private http: HttpService) { }
	ocmofaccPersons(personId) {
		return this.http.get(`ocdofacc/ocmofaccPersons?personId=${personId}`);
	}

	ocmofaccCorporates(corporateId) {
		return this.http.get(`ocdofacc/ocmofaccCorporates?corporateId=${corporateId}`);
	}
	ocmofaccCommit(obj) {
		return this.http.post('ocdofacc/ocmofaccCommit', obj);
	}
	

	
	offDedExecuteQuery(obj) {
		return this.http.post('ocdofacc/offDedExecuteQuery', obj);
	}

	csldDpExecuteQuery(obj) {
		return this.http.post('ocdofacc/caseloadDedProfExecuteQuery', obj);
	}


	csldDbenExecuteQuery(obj) {
		return this.http.post('ocdofacc/caseloadDedBenficExecuteQuery', obj);
	}

	csldDdExecuteQuery(obj) {
		return this.http.post('ocdofacc/caseloadDedDetExecuteQuery', obj);
	}

	feeOverrideDetailsExecuteQuery(feeId) {
		return this.http.get(`ocdofacc/feeOverrideDetailsExecuteQuery?feeId=${feeId}`);
	}
	alAgyLocIdRgRecordGroup(obj) {
        return this.http.get('ocdofacc/alAgyLocIdRgRecordGroup');
    }

	caseloadFeeDetExecuteQuery(obj) {
		return this.http.post('ocdofacc/caseloadFeeDetExecuteQuery', obj);
	}


	caseloadFeeDedBenficExecuteQuery(obj) {
		return this.http.post('ocdofacc/caseloadFeeDedBenficExecuteQuery', obj);
	}
	

	ocdofaccFeeAccountCommit(obj) {
		return this.http.post('ocdofacc/ocdofaccFeeAccountCommit', obj);
	}

	ocdofaccDeductionCommit(obj) {
		return this.http.post('ocdofacc/ocdofaccDeductionCommit', obj);
	}

	ocdofaccBenficiaryCommit(obj) {
		return this.http.post('ocdofacc/ocdofaccBenficiaryCommit', obj);
	}

	getFeeIdForPreInsert() {
		return this.http.get('ocdofacc/offdedPreInsert');
	}

	offdedPrevExecteQuery(obj) {
		return this.http.post('ocdofacc/offdedPrevExecteQuery', obj);
	}

	caseloadFeeDetPrevExecuteQuery(obj) {
		return this.http.post('ocdofacc/caseloadFeeDetExecuteQuery', obj);
	}

	sysPflExecuteQuery() {
        return this.http.get('ocdofacc/sysPflExecuteQuery');
    }
	sysLongSupPflExecuteQuery(obj) {
        return this.http.post('ocdofacc/sysLongSupPflExecuteQuery',obj);
    }
	
	sysPflDedExecuteQuery() {
        return this.http.get('ocdofacc/sysPflDedExecuteQuery');
    }

	getOffenderEventDate(obj){
		return this.http.get('ocdofacc/getOffenderEventDate?offenderBookId='+obj);
	}
	
}
