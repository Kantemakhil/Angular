import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OcmstatsService {
    constructor(private http: HttpService) { }
    ordersExecuteQuery() {
        return this.http.get('ocmstats/getOrdersData');
    }

    statusExecuteQuery(updateReasonCode) {
        return this.http.get('ocmstats/getStatuesData?updateReasonCode=' + updateReasonCode);
    }

    ordersCommit(obj) {
        return this.http.post('ocmstats/offreasondata', obj);
    }

    statusCommit(obj) {
        return this.http.post('ocmstats/offstatuesdata', obj);
    }
}
