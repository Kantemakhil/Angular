import { HttpService } from '@core/service/http.service';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class OcmphmodService {
   constructor(private http: HttpService) {}
   /** This is description of the courseActivitiesExecuteQuery function*/
   courseActivitiesExecuteQuery(obj) {
      return this.http.post('ocmphmod/courseActivitiesExecuteQuery', obj);
   }
   /** This is description of the courseActivitiesCommit function*/
   courseActivitiesCommit(obj) {
      return this.http.post('ocmphmod/courseActivitiesCommit', obj);
   }
}
