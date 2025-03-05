import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcipphisService {
constructor(private http: HttpService) {}
/** This is description of the vPaymentPlanHistoriesExecuteQuery function*/
vPaymentPlanHistoriesExecuteQuery(obj) {
return this.http.post('ocipphis/vPaymentPlanHistoriesExecuteQuery',obj);
}
}
