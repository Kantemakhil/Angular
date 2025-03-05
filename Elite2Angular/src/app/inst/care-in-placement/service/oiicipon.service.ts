import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiiciponService {
    constructor(private http: HttpService) { }

    offCipDetailsExecuteQuery(obj) {
        return this.http.post('oiicipon/offCipDetailsExecuteQuery', obj);
    }

}
