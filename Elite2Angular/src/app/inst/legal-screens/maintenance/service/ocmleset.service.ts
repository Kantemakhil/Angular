import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';



@Injectable({providedIn: 'root'})
export class OcmlesetService {
    constructor(private http: HttpService) { }

    legalsExecuteQuery() {
        return this.http.get('ocmleset/getLegalsData');
    }
    legalsCommit(obj) {
        return this.http.post('ocmleset/updateLegalsData', obj);
    }
}
