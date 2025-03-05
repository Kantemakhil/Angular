import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiddecasService {
    constructor(private http: HttpService) {}

    deleteChildToCourtCases(deletedCourtCase) {
        return this.http.post('/oiddecas/deleteChildToCourtCases',deletedCourtCase);
    }
    
    deleteOffenderCourtCases(deletedCourtCase) {
        return this.http.post('/oiddecas/deleteOffenderCourtCases',deletedCourtCase);
    }
    
    deleteOffenderCourtEvents(deletedCourtEvent) {
        return this.http.post('/oiddecas/deleteOffenderCourtEvent',deletedCourtEvent);
    }
    
    isLinkedCaseExist(offenderChargeId) {
        return this.http.get('/oiddecas/isLinkedCaseExist?offenderChargeId='+offenderChargeId);
    }
    
    isSentenceAttached(obj) {
        return this.http.post('/oiddecas/isSentenceAttached',obj);
    }

    deleteOffenderOffenses(obj) {
        return this.http.post('/oiddecas/deleteOffenderOffenses',obj);
    }
    
    populateOffensesOnSentence(obj) {
        return this.http.post('oiddecas/populateOffensesOnSentence',obj);
    }
    
    populateConditionsData(obj) {
        return this.http.post('oiddecas/populateConditionsData',obj);
    }
    
    deleteConditionsRecord(deletedConditionsRecords) {
        return this.http.post('/oiddecas/deleteConditionsRecords',deletedConditionsRecords);
    }
    
    isConsecSentenceExists(sentCharges) {
        return this.http.post('/oiddecas/isConsecutiveSentenceExist',sentCharges);
    }
    
    isSentAdjustAttached(sentCharges) {
        return this.http.post('/oiddecas/isSentAdjustAttached',sentCharges);
    }
    
    deleteSentenceAdjustment(sentCharges) {
        return this.http.post('/oiddecas/deleteSentenceAdjustment',sentCharges);
    }
    
    deleteSentenceCharge(sentCharges) {
        return this.http.post('/oiddecas/deleteSentenceCharge',sentCharges);
    }
    
    deleteFineSentence(sentCharges) {
        return this.http.post('/oiddecas/deleteFineSentence',sentCharges);
    }
    
    
    deleteOffensesOnSentence(sentCharges) {
        return this.http.post('/oiddecas/deleteOffensesOnSentence',sentCharges);
    }
    
    okToDeleteRecord(keyCode,tableName,columnName,excludeTable,owner) {
        return this.http.get('/oiddecas/okToDeleteRecord?keyCode='+keyCode+'&tableName='+tableName+'&columnName='+columnName+'&excludeTable='+excludeTable+'&owner='+owner)
    }
    
    deleteSentenceData(sentenceDeleteList) {
        return this.http.post('oiddecas/deleteSentences',sentenceDeleteList);
    }
    
    okToModifyRecord(keyString,tableName,columnName,excludeTable,owner) {
        return this.http.get('/oiddecas/okToModifyRecord?keyString='+keyString+'&tableName='+tableName+'&columnName='+columnName+'&excludeTable='+excludeTable+'&owner='+owner)
    }
    
    deleteSentences(sentCharges) {
        return this.http.post('oiddecas/deleteSentencesProdc',sentCharges);
    }
    
    deleteSentenceCharges(sentCharges) {
        return this.http.post('/oiddecas/deleteSentenceCharges',sentCharges);
    }
    
}    