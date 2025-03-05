import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiiiscouService {
   constructor(private http: HttpService) {}
   /** This is description of the vPrisnCtExecuteQuery function*/
   vPrisnCtExecuteQuery(obj) {
      return this.http.get('oiiiscou/vPrisnCtExecuteQuery?agyLocId=' + obj);
   }
   /** This is description of the vPrisnTotExecuteQuery function*/
   vPrisnTotExecuteQuery(obj) {
      return this.http.get('oiiiscou/vPrisnTotExecuteQuery?agyLocId=' + obj);
   }
   /** This is description of the cgfkAgylocagylocidRecordGroup function*/
   cgfkAgylocagylocidRecordGroup(obj) {
      return this.http.get( 'oiiiscou/cgfk$agyLocAgyLocIdRecordGroup');
   }
}
