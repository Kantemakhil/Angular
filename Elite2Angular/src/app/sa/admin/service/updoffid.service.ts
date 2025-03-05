import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class UpdoffidService {
    constructor(private http: HttpService) { }

    /** This is description of the rgCaseloadTypeRecordGroup function*/
    checkOffenderIdDisplay(offIdDisplay) {
        return this.http.get('/updoffid/checkOffenderIdDisplay?offIdDisplay=' + offIdDisplay);
    }
    /** This is description of the rgCaseloadTypeRecordGroup function*/
    updateOffIdDisplay(obj) {
        return this.http.post('/updoffid/updateOffIdDisplay', obj);
    }
}
