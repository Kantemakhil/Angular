import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service'

@Injectable({providedIn: 'root'})
export class OiiprollService {
	constructor(private http: HttpService) { }
	/** This is description of the lvUntSmExecuteQuery function*/
	lvUntSmExecuteQuery(obj, type) {
		return this.http.post('oiiproll/lvUntSmExecuteQuery?type=' + type, obj);
	}
	/** This is description of the itLcSmExecuteQuery function*/
	itLcSmExecuteQuery(obj, type) {
		return this.http.post('oiiproll/itLcSmExecuteQuery?type=' + type, obj);
	}
	/** This is description of the rgAgyLocRecordGroup function*/
	rgAgyLocRecordGroup(caseloadId) {
		return this.http.get('oiiproll/rgAgyLocRecordGroup?caseloadId=' + caseloadId);
	}
	/** This is description of the lvUntSmExecuteQuery function*/
	lvUntSmTotalCount(obj, type) {
		return this.http.post('oiiproll/lvUntSmTotalCount?type=' + type, obj);
	}
	itLcSmTotalCount(obj, type) {
		return this.http.post('oiiproll/itLcSmTotalCount?type=' + type, obj);
	}
	whenNewRecordInstance() {
        return this.http.get( 'oiiproll/whenNewRecordInstance');
	}
	// copied  OiiprollService.ts 
	rollListExecuteQuery(obj) {
        return this.http.post('oiiproll/rollListExecuteQuery', obj);
    }
	/** This is description of the rollListExecuteQuery function*/
	rollListExecuteQuery1(agyLocId: string, internalLocationId: number) {
		return this.http.get('oiiproll/rollListExecuteQuery1?agyLocId=' + agyLocId + '&internalLocationId=' + internalLocationId);
	}
}
