import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
@Injectable({providedIn: 'root'})
export class OidappndService {
    constructor(private http: HttpService) { }
    stgCommit(obj) {
        return this.http.post('oidappnd/stgCommit', obj);
    }
}
