import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcuwarngService {
    constructor(private http: HttpService) { }

    /** This is description of the allowOverrideQuery function*/
    allowOverrideQuery() {
        return this.http.get('ocuwarng/allowOverrideQuery');
    }
}
