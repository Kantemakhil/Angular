import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OimpldurService {
    constructor(private http: HttpService) { }
    /** This is description of the placementDurExecuteQuery function*/
    placementDurExecuteQuery(obj) {
        return this.http.post('oimpldur/placementDurExecuteQuery', obj);
    }
    /** This is description of the placementDurCommit function*/
    placementDurCommit(obj) {
        return this.http.post('oimpldur/placementDurCommit', obj);
    }
    /** This is description of the rgDurationTypeRecordGroup function*/
    rgDurationTypeRecordGroup(obj) {
        return this.http.get('oimpldur/rgDurationTypeRecordGroup');
    }
    /** This is description of the rgPlacementTypeRecordGroup function*/
    rgPlacementTypeRecordGroup(obj) {
        return this.http.get('oimpldur/rgPlacementTypeRecordGroup');
    }
}
