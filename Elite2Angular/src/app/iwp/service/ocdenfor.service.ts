import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdenforService {
	backButton: boolean;
	constructor(private http: HttpService) {}
	actionsExecuteQuery(obj) {
		return this.http.post('ocdenfor/actionsExecuteQuery', obj);
	}
	actionsCommit(obj) {
		return this.http.post('ocdenfor/actionsCommit', obj);
	}

	getcrtEvtsScheduleConflict(obj) {
		return this.http.post('ocdenfor/scheduleConflict', obj);
	}

	getConditionTypeGridData(obj) {
        return this.http.post('ocdenfor/getConditionTypeGridData', obj);
    }

	conditionProceedSave(obj) {
		return this.http.post('ocdenfor/conditionProceedSave', obj);
	}

	getPersutHideShowValue(obj) {
		return this.http.get( 'ocdenfor/getPersutHideShowValue?code=' + obj);
		}

	getCondCategory(userId, moduleName) {
		return this.http.get('getReferenceDomainCodes?domain=PS_CATEGORY&moduleName='+moduleName);

	 }

	 getProgram() {
		return this.http.get('ocdenfor/getProgram');
	  }
}
 