import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcuhvteaService {
constructor(private http: HttpService) { }
/** This is description of the offVteamHtyExecuteQuery function*/
offVteamHtyExecuteQuery(obj) {
return this.http.post('ocuhvtea/offVteamHtyExecuteQuery', obj);
}
/** This is description of the rgFunctionRecordGroup function*/
rgFunctionRecordGroup(obj) {
return this.http.get('ocuhvtea/rgFunctionRecordGroup');
}
}
