import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiistgmiService {
    constructor(private http: HttpService) { }
    /** This is description of the vStgMembershipInquiryExecuteQuery function*/
    vStgMembershipInquiryExecuteQuery(obj) {
        return this.http.post('oiistgmi/vStgMembershipInquiryExecuteQuery', obj);
    }
    /** This is description of the getStgGroupDescription function*/
    getStgGroupDescription(obj) {
        return this.http.post('oiistgmi/getStgGroupDescription', obj);
    }
}
