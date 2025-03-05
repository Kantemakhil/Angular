import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtdhiremService {
     constructor(private http: HttpService) { }
     /** This is description of the offTxnExecuteQuery function*/
     offTxnExecuteQuery(obj) {
          return this.http.post('otdhirem/offTxnExecuteQuery', obj);
     }
     /** This is description of the sysPflExecuteQuery function*/
     sysPflExecuteQuery(obj) {
          return this.http.post('otdhirem/sysPflExecuteQuery', obj);
     }
}
