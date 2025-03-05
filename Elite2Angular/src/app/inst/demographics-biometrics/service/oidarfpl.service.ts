import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';
@Injectable({providedIn: 'root'})
export class OidarfplService {
    offenderProfileDetails(offenderBookId: number, currentCaseLoadType: string) {
        throw new Error('Method not implemented.');
    }
    constructor(private http: HttpService) { }

    caseDetailsExecuteQuery(offenderBookId){
        return this.http.get('oidarfpl/getOffenderCaseDetails?offenderBookId='+offenderBookId);
    }

    findFacilityExecuteQuery( obj ) {
        return this.http.post( 'oidarfpl/findFacilityExecuteQuery' , obj );
    }

    getoffenderPesonalAttributes(offenderBookId){
        return this.http.get('oidarfpl/getOffenderPersonalAtt?offenderBookId='+offenderBookId);
    }

    getoffendersentDetails(offenderBookId){
        return this.http.get('/oidarfpl/getoffenderSentenceDetails?offenderBookId='+offenderBookId);
    }

    getMovementReasonCode(){
        return this.http.get('oidarfpl/getMovementReasonCode');
    }
     offenderAttributeExecuteQuery(obj){
        return this.http.post('oidarfpl/offenderAttributeExecuteQuery',obj);
    }
     offenderHousingExecuteQuery(obj){
         return this.http.post('oidarfpl/offenderHousingExecuteQuery', obj);
     }


     offenderPersonalDetails(offenderBookId , caseloadType) {
        return this.http.get('/oidarfpl/offenderPersonalDetails?offenderBookId=' + offenderBookId + '&caseloadType=' + caseloadType);
    }


}