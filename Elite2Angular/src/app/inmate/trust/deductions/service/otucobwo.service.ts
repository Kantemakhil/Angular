import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtucobwoService {
	constructor(private http: HttpService) {}
	/** This is description of the cgfkCobwoadjustmentreasoRecordGroup function*/
	cgfkCobwoadjustmentreasoRecordGroup(obj) {
		return this.http.get( 'otucobwo/cgfkcobwoAdjustmentReasoRecordGroup');
	}
	save(obj) {
        return this.http.post('otucobwo/save', obj);
	}
	offenderDeductionCur(deductionId) {
		return this.http.get('otucobwo/offenderDeductionCur?deductionId=' + deductionId);
	}
}
