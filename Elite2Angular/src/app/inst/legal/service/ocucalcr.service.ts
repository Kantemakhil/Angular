import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcucalcrService {
   
    constructor(private http: HttpService) {}

    populateStaffName() {
        return this.http.get('/ocucalcr/populateStaffName');
    }

    getCurrentUserId() {
        return this.http.get('/ocucalcr/getCurrentUserId');
    }
    
    calExpDate(obj) {
        return this.http.post('/ocucalcr/calExpDate',obj);
    }

    getStaffNameBasedOnUserId(userId) {
        return this.http.get('/ocucalcr/getStaffNameBasedOnUserId?userId=' + userId);
    }

    getIntakeDetails(offenderBookId) {
        return this.http.get('oidcustad/getIntakeDetails?offenderBookId=' + offenderBookId);
    }  

    getOffenderPendingEvents(data) {
        return this.http.post('ocipensc/getPendingSentenceCalcEvents', data);
    }

    getApplicationStatus() {
        return this.http.get('omss40/getApplicationStatus');
    }
    
}