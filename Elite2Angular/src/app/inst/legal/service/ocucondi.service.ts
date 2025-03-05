import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OcucondiService {

    constructor(private http: HttpService) { }

    getConditionGridLov(obj) {
        return this.http.post('ocucondi/getConditionLov', obj);
    }

    getTypeGrid(obj) {
        return this.http.post('ocucondi/getConditionTypeGrid', obj);
    }

    getConditionGrid(obj) {
        return this.http.post('ocucondi/getConditionGrid', obj);
    }

    getCompleteConditionGrid(obj){
        return this.http.post('ocucondi/getCompleteConditionGrid', obj);
    }
    
    insertConditionData(obj) {
        return this.http.post('ocucondi/updateConditionData', obj);
    }

    insertConditionProgram(obj) {
        return this.http.post('ocucondi/updateProgramData', obj);
    }

    populateProgramComment(obj) {
        return this.http.post('ocucondi/populateConditionComment', obj);
    }

    populateCategoryLov() {
        return this.http.get('ocucondi/getCategory');
    }

    populateConditionType() {
        return this.http.get('ocucondi/populateSentencesCategory');
    }

    populateProhibitedLov() {
        return this.http.get('ocucondi/populateProhibitedLov');
    }
    getConditionTypeGrid(obj) {
        return this.http.post('ocucondi/getConditionTypeGrid', obj);
    }
    offSentConCommit(obj) {
        return this.http.post('ocucondi/offSentConCommit', obj);
    }
    getProgram() {
        return this.http.get('ocucondi/getProgram');
    }
    getDefaultConditions(obj) {
        return this.http.post('ocucondi/getDefaultConditions', obj);
    }
    getConditionsLov(condition, category) {
        return this.http.get('/ocucondi/getConditionsLov?condition=' + condition + '&category=' + category);
    }
    getCondCategory(userId, moduleName) {
        return this.http.get('getReferenceDomainCodes?domain=PS_CATEGORY&moduleName='+moduleName);
    }
    
    comCondFilteredData(obj){
    return this.http.post('ocucondi/comCondFilteredData', obj);
	}
}
