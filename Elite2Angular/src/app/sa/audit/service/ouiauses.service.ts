import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OuiausesService {
   constructor(private http: HttpService) {}
  getSessionDetailExecuteQuery(obj) {
      return this.http.post('ouiauses/getSessionDetailExecuteQuery', obj);
    }
}
