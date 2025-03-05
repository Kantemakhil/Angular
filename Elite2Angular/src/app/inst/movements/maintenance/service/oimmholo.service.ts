import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { LivingUnits } from '@inst/demographics-biometrics/beans/LivingUnits';

@Injectable({providedIn: 'root'})
export class OimmholoService {
    livunitsModel: LivingUnits = new LivingUnits();
    exitHistory: boolean;
    constructor(private http: HttpService) { }
    /** This is description of the livUnitsExecuteQuery function*/
    livUnitsExecuteQuery(obj) {
        return this.http.post('oimmholo/livUnitsExecuteQuery', obj);
    }
    /** This is description of the livUnitsDialogExecuteQuery function*/
    livUnitsDialogExecuteQuery(obj) {
        return this.http.post('oimmholo/livUnitsDialogExecuteQuery', obj);
    }
    /** This is description of the livUnitsCommit function*/
    livUnitsCommit(obj) {
        return this.http.post('oimmholo/livUnitsCommit', obj);
    }
    /** This is description of the usedForExecuteQuery function*/
    usedForExecuteQuery(obj) {
        return this.http.post('oimmholo/usedForExecuteQuery', obj);
    }
    /** This is description of the usedForCommit function*/
    usedForCommit(obj) {
        return this.http.post('oimmholo/usedForCommit', obj);
    }
    /** This is description of the unitAttrExecuteQuery function*/
    unitAttrExecuteQuery(obj) {
        return this.http.post('oimmholo/unitAttrExecuteQuery', obj);
    }
    /** This is description of the unitAttrCommit function*/
    unitAttrCommit(obj) {
        return this.http.post('oimmholo/unitAttrCommit', obj);
    }
    /** This is description of the luProfExecuteQuery function*/
    luProfExecuteQuery(obj) {
        return this.http.post('oimmholo/luProfExecuteQuery', obj);
    }
    /** This is description of the luProfCommit function*/
    luProfCommit(obj) {
        return this.http.post('oimmholo/luProfCommit', obj);
    }
    /** This is description of the nonAssocExecuteQuery function*/
    nonAssocExecuteQuery(obj) {
        return this.http.post('oimmholo/nonAssocExecuteQuery', obj);
    }
    /** This is description of the nonAssocCommit function*/
    nonAssocCommit(obj) {
        return this.http.post('oimmholo/nonAssocCommit', obj);
    }
    /** This is description of the secLvlExecuteQuery function*/
    secLvlExecuteQuery(obj) {
        return this.http.post('oimmholo/secLvlExecuteQuery', obj);
    }
    /** This is description of the secLvlCommit function*/
    secLvlCommit(obj) {
        return this.http.post('oimmholo/secLvlCommit', obj);
    }
    /** This is description of the rgAgyLocLovRecordGroup function*/
    rgAgyLocLovRecordGroup(obj) {
        return this.http.get('oimmholo/rgAgyLocLovRecordGroup');
    }
    /** This is description of the rgDeactLuRsnRecordGroup function*/
    rgDeactLuRsnRecordGroup(obj) {
        return this.http.get('oimmholo/rgDeactLuRsnRecordGroup');
    }
    /** This is description of the rgUsedForRecordGroup function*/
    rgUsedForRecordGroup(obj) {
        return this.http.get('oimmholo/rgUsedForRecordGroup');
    }
    /** This is description of the rgHouUnitAttRecordGroup function*/
    rgHouUnitAttRecordGroup(obj) {
        return this.http.get('oimmholo/rgHouUnitAttRecordGroup');
    }
    /** This is description of the rgNonAssoTypeRecordGroup function*/
    rgNonAssoTypeRecordGroup(obj) {
        return this.http.get('oimmholo/rgNonAssoTypeRecordGroup');
    }
    /** This is description of the rgSupLvlTypeRecordGroup function*/
    rgSupLvlTypeRecordGroup(obj) {
        return this.http.get('oimmholo/rgSupLvlTypeRecordGroup');
    }
    /** This is description of the rgHouUnTypeRecordGroup function*/
    rgHouUnTypeRecordGroup(obj) {
        return this.http.get('oimmholo/rgHouUnTypeRecordGroup');
    }
    /** This is description of the cellBlockData function*/
    cellBlockData(obj) {
        return this.http.post('oimmholo/cellBlockData', obj);
    }
    /** This is description of the getResDescValues function*/
    getResDescValues(obj) {
        return this.http.post('oimmholo/getResDescValues', obj);
    }
    /** This is description of the getResDescValues function*/
    getActiveFlagValidation(obj) {
        return this.http.get('oimmholo/getActiveFlagValidation?livingUintId=' + obj);
    }
    /** This is description of the getResDescValues function*/
    getFlagValidation(obj) {
        return this.http.get('oimmholo/getFlagValidation?livingUintId=' + obj);
    }
    /** This is description of the checkInheritAttributes function*/
    checkInheritAttributes(obj) {
        return this.http.get('oimmholo/checkInheritAttributes?livingUintId=' + obj);
    }
    /** This is description of the attributsData function*/
    attributsData(obj) {
        return this.http.get('oimmholo/attributsData?livingUintId=' + obj);
    }
    /** This is description of the nonAssociationData function*/
    nonAssociationData(obj) {
        return this.http.get('oimmholo/nonAssociationData?livingUintId=' + obj);
    }
    /** This is description of the butChangeEvent function*/
    butChangeEvent(obj) {
        return this.http.post('oimmholo/butChangeEvent', obj);
    }

    getIepLevelDescription(livingUnitId,agyLocId){
        return this.http.get(`oimmholo/getIepLevelDescription?livingUnitId=${livingUnitId}&agyLocId=${agyLocId}`);
    }

    ieplevelCommit(obj) {
        return this.http.post('oimmholo/iepLevelCommit', obj);
    }

    getIEPCodeExecuteQuery(internalLocationId,agyLocId){
        return this.http.get('oimmholo/getIEPCode?internalLocationId='+internalLocationId+'&agyLocId='+agyLocId);
    }

    getIEPCodeExecuteQueryOne(internalLocationId){
        return this.http.get('oimmholo/getIEPExcecuteQuery?internalLocationId='+internalLocationId);
    }

    facilityIepLevelExecuteQuery(agyLocId){
		return this.http.get( 'oimmholo/getFacilityIepLevel?agyLocId='+agyLocId);
	}
}
