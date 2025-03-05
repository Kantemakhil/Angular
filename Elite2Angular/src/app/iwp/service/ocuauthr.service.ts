import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcuauthrService {
constructor(private http: HttpService) {}
tskAssHtyExecuteQuery(obj) {
return this.http.post('ocuauthr/tskAssHtyExecuteQuery', obj);
}

rgStaffNameRecordGroup(obj) {
return this.http.get( 'ocuauthr/rgStaffNameRecordGroup');
}
}
