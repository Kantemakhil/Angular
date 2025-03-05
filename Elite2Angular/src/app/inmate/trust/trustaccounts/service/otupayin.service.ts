import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service'

@Injectable({providedIn: 'root'})
export class OtupayinService {
    constructor(private http: HttpService) { }
    /** This is description of the offDedExecuteQuery function*/
    offDedExecuteQuery(obj) {
        return this.http.post('otupayin/offDedExecuteQuery', obj);
    }
    /** This is description of the offTxnExecuteQuery function*/
    offTxnExecuteQuery(obj) {
        return this.http.post('otupayin/offTxnExecuteQuery', obj);
    }
}
