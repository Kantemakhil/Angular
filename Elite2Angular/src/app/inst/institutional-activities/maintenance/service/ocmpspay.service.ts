import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OcmpspayService {
    constructor(private http: HttpService) { }

    prgCategoryExecuteQuery() {
        return this.http.get('ocmpspay/prgCategoryExecuteQuery');
    }
    prgCategoryCommit(commitBean) {
        return this.http.post('ocmpspay/prgCategoryCommit', commitBean);
    }
    prgCampensationExecuteQuery(obj) {
        return this.http.post('ocmpspay/prgCampensationExecuteQuery', obj);
    }
    prgCampensationCommit(commitBean) {
        return this.http.post('ocmpspay/prgCampensationCommit', commitBean);
    }
    listOfProgServices() {
        return this.http.get('ocmpspay/listOfProgServices');
    }
}
