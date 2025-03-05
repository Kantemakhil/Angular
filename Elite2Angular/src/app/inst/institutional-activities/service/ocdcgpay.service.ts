import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdcgpayService {
    programId: number;
    constructor(private http: HttpService) { }
    /** This is description of the unpaidAttendanceExecuteQuery function*/
    unpaidAttendanceExecuteQuery(obj) {
        return this.http.post('ocdcgpay/unpaidAttendanceExecuteQuery', obj);
    }
    generatePay(updateList) {
        return this.http.post('ocdcgpay/generatePay', updateList);
    }
    getFromToDates() {
        return this.http.get('ocdcgpay/getFromToDates');
    }
    
}

