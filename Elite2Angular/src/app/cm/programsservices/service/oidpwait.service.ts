import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';
import { VOffenderPrgObligations } from '@cm/programsservices/beans/VOffenderPrgObligations';

@Injectable({ providedIn: 'root' })
export class OidpwaitService {
	exitFlag: boolean;
	fromOcdprog: boolean;
	vOffPrgOblModelService: VOffenderPrgObligations = new VOffenderPrgObligations();
	oidpwaitScreenObj: any;
	ocdprogrScreenObj: any;
	constructor(private http: HttpService) { }

	/** This is description of the rgProgramServicesRecordGroup function*/
	rgProgramServicesRecordGroup(obj) {
		return this.http.get('oidpwait/rgProgramServicesRecordGroup');
	}

	/** This is description of the rgRegionRecordGroup function*/
	rgRegionRecordGroup(obj) {
		return this.http.get('oidpwait/rgRegionRecordGroup');
	}

	/** This is description of the rgAreasRecordGroup function*/
	rgAreasRecordGroup(obj) {
		return this.http.get('oidpwait/rgAreasRecordGroup');
	}

	/** This is description of the rgAgyLocsRecordGroup function*/
	rgAgyLocsRecordGroup(obj) {
		return this.http.get('oidpwait/rgAgyLocsRecordGroup');
	}

	/** This is description of the rgAllTeamsRecordGroup function*/
	rgAllTeamsRecordGroup(obj) {
		return this.http.get('oidpwait/rgAllTeamsRecordGroup');
	}

	/** This is description of the rgRestrictTeamsRecordGroup function*/
	rgRestrictTeamsRecordGroup(obj) {
		return this.http.get('oidpwait/rgRestrictTeamsRecordGroup');
	}

	/** This is description of the vOffPrgOblExecuteQuery function*/
	vOffPrgOblExecuteQuery(vOffPrgOblModel) {
		return this.http.post('oidpwait/vOffPrgOblExecuteQuery', vOffPrgOblModel);
	}

	/** This is description of the vOffPrgOblCommit function*/
	vOffPrgOblCommit(obj) {
		return this.http.post('oidpwait/vOffPrgOblCommit', obj);
	}

	/** This is description of the rgPsPrgAvailRecordGroup function*/
	rgPsPrgAvailRecordGroup(obj) {
		return this.http.get('oidpwait/rgPsPrgAvailRecordGroup');
	}

	clearTempList() {
		return this.http.get('oidpwait/clearTempList');
	}

	//Check B C
	nonAssociation(vOffPrgOblModel) {
		return this.http.post('oidpwait/nonAssociation', vOffPrgOblModel);
	}

	assignServicesToOffenders(vOffPrgOblModel) {
		return this.http.post('oidpwait/assignServicesToOffenders', vOffPrgOblModel);
	}

	whenNewFormInstance(currentCaseLoad) {
		return this.http.get('oidpwait/whenNewFormInstance?currentCaseLoad=' + currentCaseLoad);
	}

	// getCommDefault(currentCaseLoad) {
	// 	return this.http.get('oidpwait/getCommDefault?currentCaseLoad='+ currentCaseLoad);
	// } 

	getcommareadefault(currentCaseLoad) {
		return this.http.get('oidpwait/getcommareadefault?currentCaseLoad=' + currentCaseLoad);
	}

	offbkgGlobalQuery(obj: any) {
        return this.http.post('osiosear/offbkgGlobalQuery', obj);
    }
}
