import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';


@Injectable({providedIn: 'root'})
export class OiusmselService {
   constructor(private http: HttpService) { }
   /** This is description of the staffMembersExecuteQuery function*/
   staffMembersExecuteQuery(obj) {
      return this.http.post('oiusmsel/staffMembersExecuteQuery', obj);
   }
   /** This is description of the rgr01RecordGroup function*/
   rgr01RecordGroup(obj) {
      return this.http.get('oiusmsel/rgr01RecordGroup');
   }
}
