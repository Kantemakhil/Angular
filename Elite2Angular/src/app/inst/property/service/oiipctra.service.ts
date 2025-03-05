import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiipctraService {
constructor(private http: HttpService) {}
/** This is description of the offConExecuteQuery function*/
offConExecuteQuery(obj) {
return this.http.post('oiipctra/offConExecuteQuery', obj);
}
/** This is description of the conTxExecuteQuery function*/
conTxExecuteQuery(obj) {
return this.http.post('oiipctra/conTxExecuteQuery', obj);
}
/** This is description of the sysPflExecuteQuery function*/
sysPflExecuteQuery(obj) {
return this.http.post('oiipctra/sysPflExecuteQuery', obj);
}
}
