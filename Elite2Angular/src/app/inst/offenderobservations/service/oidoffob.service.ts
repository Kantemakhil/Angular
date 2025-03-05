import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';
import { OffenderObservationInquiry } from '../beans/OffenderObservationInquiry';

@Injectable({ providedIn: 'root' })
export class OidoffobService {
     backButton :Boolean;
     searchParam:  OffenderObservationInquiry=new OffenderObservationInquiry();
     
    constructor(private http: HttpService) { }
    getOffenderPeriodExecuteQuery(obj) {
        return this.http.post('oidoffob/getOffenderPeriodExecuteQuery', obj);
    }
    offenderObservationPeriodDataCommit(obj) {
        return this.http.post('oidoffob/offenderObservationPeriodDataCommit', obj);
    }

    getObservatioTypeData(obj) {
        return this.http.post('oidoffob/getObservatioTypeData', obj);
    }

    getOffenderPeriodCheckExecuteQuery(obj) {
        return this.http.post('oidoffob/getOffenderPeriodCheckExecuteQuery', obj);
    }
    offenderObservationCheckDataCommit(obj) {
        return this.http.post('oidoffob/offenderObservationCheckDataCommit', obj);
    }
    
    additionalCheckCharxecuteQuery(obj) {
        return this.http.post('/oidoffob/additionalCheckCharxecuteQuery', obj);
    }
   
    saveAdditionalCharecterData(obj) {
        return this.http.post('oidoffob/saveAdditionalCharecterData', obj);
    }

    saveOffenderObservationCheckComment(obj) {
        return this.http.post('oidoffob/saveOffenderObservationCheckComment', obj);
    }
    getCommentExecuteQuery(obj) {
        return this.http.post('oidoffob/getCommentExecuteQuery', obj);
    }

    getOffenderLivningUnitIdCount(obj) {
        return this.http.get('oidoffob/getOffenderLivningUnitIdCount?offenderBookId='+obj);
    }

    getOffenderLivningUnitIdCountNotInLocation(obj,obj2) {
        return this.http.get('oidoffob/getOffenderLivningUnitIdCountNotInLocation?offenderBookId=' + obj+ '&agyLocId=' + obj2);
    }

    getCurrentStaffId() {
        return this.http.get('oidoffob/getCurrentStaffId');
    }

    sysPflExecuteQuery (){
        return this.http.get('oidoffob/sysPflExecuteQuery');
    }
}
