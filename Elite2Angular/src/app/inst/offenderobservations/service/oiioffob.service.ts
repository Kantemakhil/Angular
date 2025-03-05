import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OiioffobService {
    constructor(private http: HttpService) { }
    getOffenderPeriodInquiryQuery(obj) {
        return this.http.post('oiioffob/getOffenderPeriodInquiryQuery', obj);
    }   
}
