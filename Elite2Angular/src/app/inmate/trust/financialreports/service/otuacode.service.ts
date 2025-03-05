import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtuacodeService {
   constructor(private http: HttpService) {}
   /** This is description of the acCodeExecuteQuery function*/
   acCodeExecuteQuery(obj) {
      return this.http.post('otuacode/acCodeExecuteQuery',obj);
   }
}
