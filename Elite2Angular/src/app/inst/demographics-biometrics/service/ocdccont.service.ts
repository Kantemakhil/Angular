import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdccontService {
constructor(private http: HttpService) {}
/** This is description of the phonesExecuteQuery function*/
phonesExecuteQuery(obj) {
return this.http.post('ocdccont/phonesExecuteQuery', obj);
}
/** This is description of the phonesCommit function*/
phonesCommit(obj) {
return this.http.post('ocdccont/phonesCommit', obj);
}
/** This is description of the rgPhoneTypeRecordGroup function*/
rgPhoneTypeRecordGroup() {
return this.http.get( 'ocdccont/rgPhoneTypeRecordGroup');
}
}
