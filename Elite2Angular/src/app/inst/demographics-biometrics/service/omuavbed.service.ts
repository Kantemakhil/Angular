import { Injectable } from '@angular/core';


import { HttpService } from '../../../core/service/http.service';

@Injectable({providedIn: 'root'})
export class OmuavbedService {
	constructor(private http: HttpService) { }
	/** This is description of the livingUnitsTypeExecuteQuery function*/
	livingUnitsTypeExecuteQuery(obj) {
		return this.http.post('omuavbed/livingUnitsTypeExecuteQuery', obj);
	}
	/** This is description of the livingUnitsTypeCommit function*/
	livingUnitsTypeCommit(obj) {
		return this.http.post('omuavbedLivingUnitsTypeCommit', obj);
	}
	/** This is description of the livuProfUforExecuteQuery function*/
	livuProfUforExecuteQuery(obj) {
		return this.http.post('omuavbedLivuProfUforExecuteQuery', obj);
	}
	/** This is description of the livuProfUforCommit function*/
	livuProfUforCommit(obj) {
		return this.http.post('omuavbedLivuProfUforCommit', obj);
	}
	/** This is description of the livuProfAttrExecuteQuery function*/
	livuProfAttrExecuteQuery(obj) {
		return this.http.post('omuavbedLivuProfAttrExecuteQuery', obj);
	}
	/** This is description of the livuProfAttrCommit function*/
	livuProfAttrCommit(obj) {
		return this.http.post('omuavbedLivuProfAttrCommit', obj);
	}
	/** This is description of the livingUnitsLevelsExecuteQuery function*/
	livingUnitsLevelsExecuteQuery(obj) {
		return this.http.post('omuavbedLivingUnitsLevelsExecuteQuery', obj);
	}
	/** This is description of the livingUnitsLevelsCommit function*/
	livingUnitsLevelsCommit(obj) {
		return this.http.post('omuavbedLivingUnitsLevelsCommit', obj);
	}
	/** This is description of the livingUnitsExecuteQuery function*/
	livingUnitsExecuteQuery(obj) {
		return this.http.post('omuavbed/livingUnitsExecuteQuery', obj);
	}
	/** This is description of the rgLivingUnitPagyRecordGroup function*/
	rgLivingUnitPagyRecordGroup(livingUnitId, level1Code) {
		return this.http.get('omuavbed/rgLivingUnitPagyRecordGroup?livingUnitId=' + livingUnitId + '&level1Code=' + level1Code);
	}
	/** This is description of the rgLivingUnitLocIdRecordGroup function*/
	rgLivingUnitLocIdRecordGroup(livingUnitId, level2Code) {
		return this.http.get('omuavbed/rgLivingUnitLocIdRecordGroup?livingUnitId=' + livingUnitId + '&level2Code=' + level2Code);
	}
	/** This is description of the rgLivingUnitLevelIdRecordGroup function*/
	rgLivingUnitLevelIdRecordGroup(livingUnitId, level3Code) {
		return this.http.get('omuavbed/rgLivingUnitLevelIdRecordGroup?livingUnitId=' + livingUnitId + '&level3Code=' + level3Code);
	}
	/** This is description of the rgLivingUnitRecordGroup function*/
	rgLivingUnitRecordGroup(agencyLocId) {
		return this.http.get('omuavbed/rgLivingUnitRecordGroup?agencyLocId=' + agencyLocId);
	}
	/** This is description of the rgLivingUnitTypeRecordGroup function*/
	rgLivingUnitTypeRecordGroup() {
		return this.http.get('omuavbed/rgLivingUnitTypeRecordGroup');
	}
	/** This is description of the rgUsedForRecordGroup function*/
	rgUsedForRecordGroup() {
		return this.http.get('omuavbedRgUsedForRecordGroup');
	}
	/** This is description of the rgAttributesRecordGroup function*/
	rgAttributesRecordGroup() {
		return this.http.get('omuavbedRgAttributesRecordGroup');
	}
	/** This is description of the livuProfUforKeyClrrec function*/
	livuProfUforKeyClrrec() {
		return this.http.get('omuavbedFmb.xmlLivuprofuforkeyclrrec');
	}
	/** This is description of the livuProfAttrKeyClrrec function*/
	livuProfAttrKeyClrrec() {
		return this.http.get('omuavbedLivuprofattrkeyclrrec');
	}
	/** This is description of the butSearchWhenButtonPressed function*/
	butSearchWhenButtonPressed() {
		return this.http.get('omuavbedButsearchwhenbuttonpressed');
	}
	/** This is description of the omuavbedWhenNewFormInstancelevel_cur function*/
	omuavbedWhenNewFormInstancelevel_cur() {
		return this.http.get('omuavbedOmuavbedwhennewforminstancelevelCur');
	}
	/** This is description of the omuavbedKeyExeqry function*/
	omuavbedKeyExeqry() {
		return this.http.get('omuavbedOmuavbedkeyexeqry');
	}
	/** This is description of the deleteBlanks function*/
	deleteBlanks() {
		return this.http.get('omuavbedDeleteblanks');
	}
	/** This is description of the gettingLabels function*/
	gettingLabels(agyLocId) {
		return this.http.get('omuavbed/gettingLabels?agyLocId=' + agyLocId);
	}

	checkAllConficts(obj) {
        return this.http.post('omuavbed/checkAllConficts', obj);
    }
}
