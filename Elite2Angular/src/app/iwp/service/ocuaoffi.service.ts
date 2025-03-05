import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcuaoffiService {
constructor(private http: HttpService) { }

addStaffExecuteQuery(obj) {
return this.http.post('ocuaoffi/addStaffExecuteQuery', obj);
}


}
