import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidacselService {
   constructor(private http: HttpService) {}
   /** This is description of the scheduledActivitiesExecuteQuery function*/
   scheduledActivitiesExecuteQuery(obj) {
      return this.http.post('oidacsel/scheduledActivitiesExecuteQuery', obj);
   }
}
