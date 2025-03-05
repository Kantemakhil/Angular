import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OimslevlService {
    constructor(private http: HttpService) { }
    /** This is description of the assTypeExecuteQuery function*/
    assTypeExecuteQuery(obj) {
        return this.http.post('oimslevl/assTypeExecuteQuery', obj);
    }
    /** This is description of the typeAssSupExecuteQuery function*/
    typeAssSupExecuteQuery(obj) {
        return this.http.post('oimslevl/typeAssSupExecuteQuery', obj);
    }
    assTypeAssSectExecuteQuery(obj) {
        return this.http.post('oimslevl/assTypeAssSectExecuteQuery', obj);
    }

    /** This is description of the typeAssSupCommit function*/
    typeAssSupCommit(obj) {
        return this.http.post('oimslevl/typeAssSupCommit', obj);
    }
    /** This is description of the assSectExecuteQuery function*/
    assSectExecuteQuery(obj) {
        return this.http.post('oimslevl/assSectExecuteQuery', obj);
    }
    /** This is description of the secAssSupExecuteQuery function*/
    secAssSupExecuteQuery(obj) {
        return this.http.post('oimslevl/secAssSupExecuteQuery', obj);
    }
    /** This is description of the secAssSupCommit function*/
    secAssSupCommit(obj) {
        return this.http.post('oimslevl/secAssSupCommit', obj);
    }
    /** This is description of the rgAssessmentSectionsRecordGroup function*/
    rgAssessmentSectionsRecordGroup(obj) {
        return this.http.get('oimslevl/rgAssessmentSectionsRecordGroup');
    }
    /** This is description of the rgAssessmentTypesRecordGroup function*/
    rgAssessmentTypesRecordGroup(obj) {
        return this.http.get('oimslevl/rgAssessmentTypesRecordGroup');
    }
    /** This is description of the rgAssessmentResultsRecordGroup function*/

    rgAssessmentResultsRecordGroup(assessmentId) {
        return this.http.get('oimslevl/rgAssessmentResultsRecordGroup?assessmentId=' + assessmentId);
    }

    checkLovData(assessmentId) {
        return this.http.get('oimslevl/checkLovData?assessmentId=' + assessmentId);
    }
    getEnforcementFlag(assessmentId){
        return this.http.get('oimslevl/getEnforcementFlag?assessmentId='+ assessmentId);
    }
    updateEnforcementFlag(assessmentId,enforcementFalg:string){
        return this.http.get(`oimslevl/updateEnforcementFlag?assessmentId=${assessmentId}&enforcementFalg=${enforcementFalg}`);        
    }
    updateSectionsDetails(obj){
    return this.http.post('oimslevl/updateSectionsDetails', obj);
    }

    // copied from  OimcsummService for securities reason 

    /** This is description of the assessmentsExecuteQuery function*/
	assessmentsExecuteQuery(obj) {
		return this.http.post('oimslevl/assessmentsExecuteQueryass',obj);
	}
	/** This is description of the vAssOffNeedsExecuteQuery function*/
	vAssOffNeedsExecuteQuery(obj) {
		return this.http.post('oimslevl/vAssOffNeedsExecuteQuery',obj);
	}
	/** This is description of the vAssOffNeedsCommit function*/
	vAssOffNeedsCommit(obj) {
		return this.http.post('oimslevl/vAssOffNeedsCommit',obj);
	}
	/** This is description of the vAssTreatProtsExecuteQuery function*/
	vAssTreatProtsExecuteQuery(obj) {
		return this.http.post('oimslevl/vAssTreatProtsExecuteQuery',obj);
	}
	/** This is description of the vAssTreatProtsCommit function*/
	vAssTreatProtsCommit(obj) {
		return this.http.post('oimslevl/vAssTreatProtsCommit',obj);
	}
	/** This is description of the rgCaseworkRecordGroup function*/
	rgCaseworkRecordGroup(obj) {
		return this.http.get( 'oimslevl/rgCaseworkRecordGroup');
	}
	/** This is description of the rgProgramIdRecordGroup function*/
	rgProgramIdRecordGroup(obj) {
		return this.http.get( 'oimslevl/rgProgramIdRecordGroup');
	}
	/** This is description of the rgCaseplanAssRecordGroup function*/
	rgCaseplanAssRecordGroup(obj) {
		return this.http.get( 'oimslevl/rgCaseplanAssRecordGroup');
	}
	/** This is description of the cgfkNextsectionRecordGroup function*/
	cgfkNextsectionRecordGroup(obj) {
		return this.http.get( 'oimslevl/cgfk$nextSectionRecordGroup');
	}
	
	/** This is description of the cgfkScoretypeRecordGroup function*/
	cgfkScoretypeRecordGroup(obj) {
		return this.http.get( 'oimslevl/cgfk$scoreTypeRecordGroup');
	}
	/** This is description of the rgPrgCategoryRecordGroup function*/
	rgPrgCategoryRecordGroup(obj) {
		return this.http.get( 'oimslevl/rgPrgCategoryRecordGroup');
	}

	/** This is description of the cgfkSectioncodeRecordGroup function*/
    cgfkSectioncodeRecordGroup(assessmentId) {
        return this.http.get( 'oimslevl/cgfkSectioncodeRecordGroup?assessmentId=' + assessmentId);
    }
  
    // copied from OimsenotService

    assessmentsExecuteQueryOimsenot(obj) {
        return this.http.post('oimslevl/assessmentsExecuteQueryOimsenot',obj);
    }
    /** This is description of the assessSectionNotificationsExecuteQuery function*/
    assessSectionNotificationsExecuteQueryOimsenot(obj) {
        return this.http.post('oimslevl/assessSectionNotificationsExecuteQueryOimsenot',obj);
    }
    /** This is description of the assessSectionNotificationsCommit function*/
    assessSectionNotificationsCommitOimsenot(obj) {
        return this.http.post('oimslevl/assessSectionNotificationsCommitOimsenot',obj);
    }
    /** This is description of the cgfkNextsectionRecordGroup function*/
    cgfkNextSectionRecordGroupOimsenot(parentField1) {
        return this.http.get( 'oimslevl/cgfkNextSectionRecordGroupOimsenot?parentField1=' + parentField1);
    }

    cgfkNextsectionRecordGroupOneOimsenot(parentField1,assmtId){

        return this.http.get('/oimslevl/cgfkNextsectionRecordGroupOneOimsenot?parentField1=' + parentField1 + '&assmtId=' + assmtId);
    }

    /** This is description of the cgfkSectioncodeRecordGroup function*/
    cgfkSectioncodeRecordGroupOimsenot(assessmentId) {
        return this.http.get( 'oimslevl/cgfkSectioncodeRecordGroupOimsenot?assessmentId=' + assessmentId);
    }

    /** This is description of the cgfkScoretypeRecordGroup function*/
    cgfkScoretypeRecordGroupOimsenot(obj) {
        return this.http.get( 'oimslevl/cgfkscoreTypeRecordGroupOimsenot');
    }
    /** This is description of the cgfkNextsectionflagRecordGroup function*/
    cgfkNextsectionflagRecordGroupOimsenot(obj) {
        return this.http.get( 'oimslevl/cgfknextSectionFlagRecordGroupOimsenot');
    }
    
}
