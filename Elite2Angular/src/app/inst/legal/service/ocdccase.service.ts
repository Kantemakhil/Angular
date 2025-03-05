import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdccaseService {
    exitFlag: boolean;
    constructor(private http: HttpService) {}
       
    searchCourtCases(obj) {
        return this.http.post('ocdccase/searchCourtCases',obj);
    }
    
    populateCaseStatus() {
        return this.http.get('ocdccase/populateCaseStatus');
    }
    
    searchCourtEvent(caseId) {           
        return this.http.get('ocdccase/searchCourtEvents?caseId='+caseId);
    }
    
    newCourtCase(obj) {
        return this.http.post('ocdccase/newcourtCase',obj);
    }
    
    getHearingTime() {
        return this.http.get('profile/propertyType/profileCode?profileType=CLIENT&profileCode=HEARING_TIME');
    }
    
   getPreInsertCaseType() {
        return this.http.get('ocdccase/getPreInsertCaseType');
    }
   
   preInsertCaseprefix(caseType) {
       return this.http.get('ocdccase/preInsertCasePrefixInfo?caseType='+caseType);
   }
    
    getPreInsertAgyLocation(offenderBookId) {
        return this.http.get('ocdccase/getPreInsertAgyLocation?offenderBookId='+offenderBookId);
    }
    
    populateSentencesData(obj)
    {   
        return this.http.post('ocdccase/populateSentencesData',obj);
    } 
    
    searchOffensesOutcome(obj)
    {
        return this.http.post('ocdccase/searchOffensesOutcome',obj);
        
    }
    
    populateTermsData(obj)
    {   
        return this.http.post('ocdccase/populateTermsData',obj);
    }
    
    populateOffenses(obj)
    {
        return this.http.post('ocdccase/populateOffenses',obj);
    }
    
    newCourtEvent(obj) {
        return this.http.post('ocdccase/newCourtEvent',obj)
    }
    
    offencesResultsCodes() {
        return this.http.get('oumorcod/offencesResultsCodes');
    }
    
    offencesAgainstOrdersData() {
        return this.http.get('ocuoffen/offencesAgainstOrders');
    }
    
    populateHoldsData(eventId) {
        return this.http.get('ocuholds/populateHoldsData?eventId='+eventId);
    }
    populateCourtReport(eventId) {
        return this.http.get('ocupsrde/populateReport?eventId='+eventId);
    }
    
    populateBailStatus(){        
        return this.http.get('ocdccase/bailStatus');
    }
    
    populateBondype(){       
        return this.http.get('ocdccase/bondType');
    }
    
    populateOffenderOffences(caseId){       
        return this.http.get('ocdccase/offenses?caseId='+caseId);
    }
    
    updateOffenderDetails(obj){ 
       
        return this.http.post('ocdccase/updateBailDetails',obj);
    }
    
    insestBailDetails(obj) {
        
        return this.http.post('ocdccase/insertDetails',obj)
    }
    
    insestBailBondDetails(obj) {
        
        return this.http.post('ocdccase/updateBailBondDetails',obj)
    }
    
    populateAllBailDetails(bookId, caseId){ 
        
        return this.http.get('ocdccase/getAllBailDetails?bookId='+bookId+'&caseId='+caseId);
    }
    
    insertOffenderSentenceDetails(obj) {
        return this.http.post('ocdccase/insertOffenderSentenceDetails',obj);
    }
    
    insertOffenderSentenceTermDetails(obj) {
        return this.http.post('ocdccase/insertOffenderSentenceTerms',obj);
    }
    
    insertOffensesOnSentencing(obj) {
        return this.http.post('ocdccase/insertOffensesOnSentencing',obj);
    }
    
    offenderOffences(offenderBookId) {
        return this.http.get('ocdccase/getOffenderOffences?offenderBookId='+offenderBookId);
    }
     
   //---------------------------------Offences Outcome-------------------------------------    
     /* insertOffenceOut(obj){
          return this.http.post('ocdcCases/newOffenceData',obj);
      }*/
      
      insertOffenceOutcome(obj){
      return this.http.post('ocdccase/insertUpdateOffense',obj);
      }
      
      isOffenceExist(obj){
          return this.http.post('ocdccase/isOffenceExist',obj);
      }
      
      updateOrder(obj) {
          return this.http.post('ocdccase/updateOrderDate',obj);
      }
      populateSentenceDateLov(courtCaseId)
      {
          return this.http.get('ocdccase/populateSentenceDate?caseId='+courtCaseId);
      }
      
       consecutiveToLine(offenderBookId,sentenceSeq){
          return this.http.get('ocdccase/populateConsecutiveToLineDate?offenderBookId='+offenderBookId+'&sentenceSeq='+sentenceSeq);
      
       }
       
       commitCases(courtcaseList) {
           return this.http.post('ocdccase/commitCases',courtcaseList);
       }
}
