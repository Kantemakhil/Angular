import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OimallowService {
    constructor(private http: HttpService) { }
    
    allowancesCommit(obj) {
        return this.http.post('oimallow/saveAllowances', obj);
      }
    allowancesExecuteQuery(){
      return this.http.get('oimallow/getAllAllowances');
    }
    getUnit(){
      return this.http.get('oimallow/getUnit');
    }
}