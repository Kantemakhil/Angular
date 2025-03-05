import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdoobliService {
    constructor(private http: HttpService) { }
    /** This is description of the offDedExecuteQuery function*/
    offDedExecuteQuery(obj) {
        return this.http.post('ocdoobli/offDedExecuteQuery', obj);
    }
    /** This is description of the offDedCommit function*/
    offDedCommit(obj) {
        return this.http.post('ocdoobli/offDedCommit', obj);
    }
    /** This is description of the offBncExecuteQuery function*/
    offBncExecuteQuery(obj) {
        return this.http.post('ocdoobli/offBncExecuteQuery', obj);
    }
    /** This is description of the offBncCommit function*/
    offBncCommit(obj) {
        return this.http.post('ocdoobli/offBncCommit', obj);
    }
    /** This is description of the offDrExecuteQuery function*/
    offDrExecuteQuery(obj) {
        return this.http.post('ocdoobli/offDrExecuteQuery', obj);
    }
    /** This is description of the offDrCommit function*/
    offDrCommit(obj) {
        return this.http.post('ocdoobli/offDrCommit', obj);
    }
    /** This is description of the offDed1ExecuteQuery function*/
    offDed1ExecuteQuery(obj) {
        return this.http.post('ocdoobli/offDed1ExecuteQuery', obj);
    }
    /** This is description of the offDed1Commit function*/
    offDed1Commit(obj) {
        return this.http.post('ocdoobli/offDed1Commit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('ocdoobli/sysPflExecuteQuery', obj);
    }
    /** This is description of the sysPflCommit function*/
    sysPflCommit(obj) {
        return this.http.post('ocdoobli/sysPflCommit', obj);
    }
    /** This is description of the cgfkOffdeddeductiontypeRecordGroup function*/
    cgfkOffdeddeductiontypeRecordGroup(obj) {
        return this.http.get('ocdoobli/cgfk$offDedDeductionTypeRecordGroup');
    }
    /** This is description of the cgfkGroupoblgroupidRecordGroup function*/
    cgfkGroupoblgroupidRecordGroup(deductionType) {
        return this.http.get('ocdoobli/cgfkGroupOblGroupIdRecordGroup?deductionType=' + deductionType);
    }
    /** This is description of the cgfkOffdeddspdescriptionRecordGroup function*/
    cgfkOffdeddspdescriptionRecordGroup(obj) {
        return this.http.get('ocdoobli/cgfk$offDedDspDescriptionRecordGroup');
    }
    /** This is description of the cgfkOffded1adjustmentreasoRecordGroup function*/
    cgfkOffded1adjustmentreasoRecordGroup(obj) {
        return this.http.get('ocdoobli/cgfk$offDed1AdjustmentReasoRecordGroup');
    }
    /** This is description of the cgfkOffdrreceipttxntypeRecordGroup function*/
    cgfkOffdrreceipttxntypeRecordGroup(obj) {
        return this.http.get('ocdoobli/cgfk$offDrReceiptTxnTypeRecordGroup');
    }
    /** This is description of the cgfkOffdedcaseinfonumberRecordGroup function*/
    cgfkOffdedcaseinfonumberRecordGroup(obj) {
        return this.http.get('ocdoobli/cgfk$offDedCaseInfoNumberRecordGroup');
    }
    /** This is description of the cgfkOffbncpersonidRecordGroup function*/
    cgfkOffbncpersonidRecordGroup(obj) {
        return this.http.get('ocdoobli/cgfk$offBncPersonIdRecordGroup');
    }
    /** This is description of the cgfkOffbnccorporateidRecordGroup function*/
    cgfkOffbnccorporateidRecordGroup(obj) {
        return this.http.get('ocdoobli/cgfk$offBncCorporateIdRecordGroup');
    }
    /** This is description of the cgfkchkOffDedOffDedRef function*/
    cgfkchkOffDedOffDedRef(obj) {
        return this.http.get('ocdoobli/cgfkchkOffDedOffDedRef');
    }
    /** This is description of the cgfkchkOffDedOffDedCsld function*/
    cgfkchkOffDedOffDedCsld(deductionType) {
        return this.http.get('ocdoobli/cgfkchkOffDedOffDedCsld?deductionType=' + deductionType);
    }
    checkCrTpe(deductionType) {
        return this.http.get('ocdoobli/checkCrTpe?deductionType=' + deductionType);
    }
    gettCount(offenderId, caseloadId, deductionType, deductionPriority) {
        return this.http.get('ocdoobli/gettCount?offenderId=' + offenderId + '&caseloadId=' + caseloadId + '&deductionType='
         + deductionType + '&deductionPriority=' + deductionPriority);
    }
    getCaseId(rootOffenderId, informationNumb) {
        return this.http.get('ocdoobli/cgfklkpOffDedCaseNumber?rootOffenderId=' + rootOffenderId + '&informationNumb=' + informationNumb);

    }
    setJsCondition(caseId) {
        return this.http.get('ocdoobli/setJsCondition?caseId=' + caseId);

    }
    omsUtilcomareDateTime(effectiveDate , dspEffectiveDate) {
        return this.http.get('ocdoobli/omsUtilcomareDateTime?effectiveDate=' + effectiveDate + '&dspEffectiveDate=' + dspEffectiveDate);
    }
    displayErrorMessage() {
        return this.http.get('ocdoobli/displayErrorMessage');
    }
    profilePlanFlag() {
        return this.http.get('ocdoobli/profilePlanFlag');
    }
    getCheckOne(offenderId, informationNumber, groupId) {
        return this.http.get('ocdoobli/getCheckOne?offenderId=' + offenderId + '&informationNumber=' + informationNumber + '&groupId='
         + groupId );
    }

    getvsDamtCur(deductionId) {
        return this.http.get('ocdoobli/getvsDamtCur?deductionId=' + deductionId);
    }
    getDeductionAmnt (deductionId) {
        return this.http.get('ocdoobli/getDeductionAmnt?deductionId=' + deductionId);

    }
    getLastFirstNames(personId) {
        return this.http.get('ocdoobli/getLastFirstNames?personId=' + personId);

    }
    getPerExists(deductionId, personId) {
        return this.http.get('ocdoobli/getPerExists?deductionId=' + deductionId + '&personId=' + personId);
    }
    updateBenficiaryTransactions (obj) {
        return this.http.get('ocdoobli/updateBenficiaryTransactions' + obj);
    }
    getCorpExists(deductionId, corporateId) {
        return this.http.get('ocdoobli/getCorpExists?deductionId=' + deductionId + '&corporateId=' + corporateId);
    }
    getreciepttxnType(obj) {
        return this.http.get('ocdoobli/getreciepttxnType' + obj);

    }
    getMonths(vEffDate) {
        return this.http.get('ocdoobli/getMonths?vEffDate=' + vEffDate);
    }
    updateOffenders(oblFlg, rootOffenderId) {
        return this.http.get('ocdoobli/updateOffenders?rootOffenderId=' + rootOffenderId + '&oblFlg=' + oblFlg);
    }
    getDesc(code) {
        return this.http.get('ocdoobli/getDescriptionforReciptType?code=' + code);
    }
    cgfkchkOffDedOffDedT(deductionType, caseloadId) {
        return this.http.get('ocdoobli/cgfkchkOffDedOffDedT?deductionType=' + deductionType + '&caseloadId=' + caseloadId);
    }
    checkprevDedTxnAndCheckpreviousBenrcvied(obj) {
        return this.http.post('ocdoobli/checkprevDedTxnAndCheckpreviousBenrcvied', obj);
    }
    getcorpName (corpId) {
        return this.http.get('ocdoobli/getcorpName?corpId=' + corpId);
    }
    checkinformationandDeductionType (offId, dedType, info) {
        return this.http.get('ocdoobli/checkinformationandDeductionType?offId=' + offId +  '&dedType=' + dedType +
        '&info=' + info);
    }
    /** This is description of the cgfkGroupoblgroupidRecordGroup function*/
    getDisabledButton(parentId) {
        return this.http.get('ocdoobli/getDisabledButton?parentId=' + parentId);
    }
}
