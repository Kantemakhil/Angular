import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiuvlcteService {
    constructor(private http: HttpService) { }
    addresExecuteQuery(obj) {
        return this.http.post('oiuvlcte/perExecuteQuery', obj);
    }
}
