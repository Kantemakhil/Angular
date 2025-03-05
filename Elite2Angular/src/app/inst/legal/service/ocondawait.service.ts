import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcondawaitService {
   
    constructor(private http: HttpService) {}

    getSentenceData(data){
        return this.http.post('/ocondawait/getSentenceData',data);
    }

    getAwaitingConditions(data){
        return this.http.post('/ocondawait/getAwaitingConditions',data);
    }

    offenderCondTransferSaveForm(data){
        return this.http.post('/ocondawait/offenderCondTransferSaveForm',data);
    }

    getAssignedConditions(data){
        return this.http.post('/ocondawait/getAssignedConditions',data);
    }

    getAssignedCondOffenders(data){
        return this.http.post('/ocondawait/getAssignedCondOffenders',data);
    }

    getTransferredCondOffenders(data){
        return this.http.post('/ocondawait/getTransferredCondOffenders',data);
    }

    getTransferredConditons(data){
        return this.http.post('/ocondawait/getTransferredConditons',data);
    }
    
}