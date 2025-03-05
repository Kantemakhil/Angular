import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
@Injectable({ providedIn: 'root' })
export class OcdonostService {

    constructor(private http: HttpService) { }

    getStaffName(obj) {
        return this.http.post('ocdonost/getStaffName',obj);
    }

    getNonOffenderSpecificTasks(obj) {
        return this.http.post('ocdonost/getNonOffenderSpecificTasks', obj);
    }

    offNonOffSpeTaskCommit(obj) {
        return this.http.post('ocdonost/offNonOffSpeTaskCommit', obj)
    }

}