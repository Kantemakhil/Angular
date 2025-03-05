import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OimcsummService {
	constructor(private http: HttpService) {}
	/** This is description of the assessmentsExecuteQuery function*/
	assessmentsExecuteQuery(obj) {
		return this.http.post('oimcsumm/assessmentsExecuteQuery',obj);
	}
	/** This is description of the vAssOffNeedsExecuteQuery function*/
	vAssOffNeedsExecuteQuery(obj) {
		return this.http.post('oimcsumm/vAssOffNeedsExecuteQuery',obj);
	}
	/** This is description of the vAssOffNeedsCommit function*/
	vAssOffNeedsCommit(obj) {
		return this.http.post('oimcsumm/vAssOffNeedsCommit',obj);
	}
	/** This is description of the vAssTreatProtsExecuteQuery function*/
	vAssTreatProtsExecuteQuery(obj) {
		return this.http.post('oimcsumm/vAssTreatProtsExecuteQuery',obj);
	}
	/** This is description of the vAssTreatProtsCommit function*/
	vAssTreatProtsCommit(obj) {
		return this.http.post('oimcsumm/vAssTreatProtsCommit',obj);
	}
	/** This is description of the rgCaseworkRecordGroup function*/
	rgCaseworkRecordGroup(obj) {
		return this.http.get( 'oimcsumm/rgCaseworkRecordGroup');
	}
	/** This is description of the rgProgramIdRecordGroup function*/
	rgProgramIdRecordGroup(obj) {
		return this.http.get( 'oimcsumm/rgProgramIdRecordGroup');
	}
	/** This is description of the rgCaseplanAssRecordGroup function*/
	rgCaseplanAssRecordGroup(obj) {
		return this.http.get( 'oimcsumm/rgCaseplanAssRecordGroup');
	}
	/** This is description of the cgfkNextsectionRecordGroup function*/
	cgfkNextsectionRecordGroup(obj) {
		return this.http.get( 'oimcsumm/cgfk$nextSectionRecordGroup');
	}
	/** This is description of the cgfkSectioncodeRecordGroup function*/
	// cgfkSectioncodeRecordGroup(obj) {
	// 	return this.http.get( 'oimcsumm/cgfk$sectionCodeRecordGroup');
	// }
	/** This is description of the cgfkScoretypeRecordGroup function*/
	cgfkScoretypeRecordGroup(obj) {
		return this.http.get( 'oimcsumm/cgfk$scoreTypeRecordGroup');
	}
	/** This is description of the rgPrgCategoryRecordGroup function*/
	rgPrgCategoryRecordGroup(obj) {
		return this.http.get( 'oimcsumm/rgPrgCategoryRecordGroup');
	}

	/** This is description of the cgfkSectioncodeRecordGroup function*/
    cgfkSectioncodeRecordGroup(assessmentId) {
        return this.http.get( 'oimcsumm/cgfkSectioncodeRecordGroup?assessmentId=' + assessmentId);
    }
}
