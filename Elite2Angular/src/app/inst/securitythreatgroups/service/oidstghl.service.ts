import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidstghlService {
    constructor(private http: HttpService) { }
    /** This is description of the stgExecuteQuery function*/
    stgExecuteQuery(obj) {
        return this.http.post('oidstghl/stgExecuteQuery', obj);
    }
    /** This is description of the stgCommit function*/
    stgCommit(obj) {
        return this.http.post('oidstghl/stgCommit', obj);
    }
    /** This is description of the stgLocationsExecuteQuery function*/
    stgLocationsExecuteQuery(obj) {
        return this.http.post('oidstghl/stgLocationsExecuteQuery', obj);
    }
    /** This is description of the stgLocationsCommit function*/
    stgLocationsCommit(obj) {
        return this.http.post('oidstghl/stgLocationsCommit', obj);
    }
    /** This is description of the recCityRecordGroup function*/
    recCityRecordGroup(obj) {
        return this.http.get('oidstghl/recCityRecordGroup', obj);
    }
    /** This is description of the recStateRecordGroup function*/
    recStateRecordGroup(obj) {
        return this.http.get('oidstghl/recStateRecordGroup', obj);
    }
    /** This is description of the recCountryRecordGroup function*/
    recCountryRecordGroup(obj) {
        return this.http.get('oidstghl/recCountryRecordGroup', obj);
    }
    /** This is description of the stgOnCheckDeleteMaster function*/
    stgOnCheckDeleteMaster(obj) {
        return this.http.post('oidstghl/stgOnCheckDeleteMaster', obj);
    }
    /** This is description of the stgOnCheckDeleteMaster function*/
    cgwhenNewFormInstance() {
        return this.http.get('oidstghl/cgwhenNewFormInstance');
    }
}
