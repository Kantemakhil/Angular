import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtusubadService {
   constructor(private http: HttpService) { }
   /** This is description of the vThaExecuteQuery function*/
   vThaExecuteQuery(obj) {
      return this.http.post('otusubad/vThaExecuteQuery', obj);
   }
   /** This is description of the offSasExecuteQuery function*/
   offSasExecuteQuery(obj) {
      return this.http.post('otusubad/offSasExecuteQuery', obj);
   }
   getRootOffenderId(obj) {
      return this.http.post('otusubad/getRootOffenderId', obj);
   }

}
