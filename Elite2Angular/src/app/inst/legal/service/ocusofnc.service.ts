import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcusofncService {
    constructor(private http: HttpService) {}

    fetechOffensesdialogData(selectedSentenceData) {
        return this.http.post('/ocusofnc/fetechOffensesdialogData',selectedSentenceData);
    }

}    