import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiitgdetService {
    constructor(private http: HttpService) {}
    /** This is description of the stgValidationsExecuteQuery function*/
    stgValidationsExecuteQuery(obj) {
        return this.http.post('oiitgdet/stgValidationsExecuteQuery', obj);
    }
    /** This is description of the stgRaceMakeupExecuteQuery function*/
    stgRaceMakeupExecuteQuery(obj) {
        return this.http.post('oiitgdet/stgRaceMakeupExecuteQuery', obj);
    }
    /** This is description of the stgLocationPresenceExecuteQuery function*/
    stgLocationPresenceExecuteQuery(obj) {
        return this.http.post('oiitgdet/stgLocationPresenceExecuteQuery', obj);
    }
    /** This is description of the fafExecuteQuery function*/
    fafExecuteQuery(obj) {
        return this.http.post('oiitgdet/fafExecuteQuery', obj);
    }
    /** This is description of the rgStg2RecordGroup function*/
    rgStg2RecordGroup() {
        return this.http.get( 'oiitgdet/rgStg2RecordGroup');
    }
    /** This is description of the rgStg1RecordGroup function*/
    rgStg1RecordGroup() {
        return this.http.get( 'oiitgdet/rgStg1RecordGroup');
    }
    /** This is description of the rgStg3RecordGroup function*/
    rgStg3RecordGroup() {
        return this.http.get( 'oiitgdet/rgStg3RecordGroup');
    }
    /** This is description of the stgDetailKeyExeqry function*/
    stgDetailKeyExeqry(obj) {
        return this.http.get(`oiitgdet/stgDetailKeyExeqry?stgId=${obj}`);
    }
    /** This is description of the oiitgdetWhenNewFormInstance function*/
    oiitgdetWhenNewFormInstance() {
        return this.http.get(`oiitgdet/oiitgdetWhenNewFormInstance`);
    }
    /** This is description of the oiitgdetPrimaryCur function*/
    oiitgdetPrimaryCur(obj) {
        return this.http.get(`oiitgdet/oiitgdetPrimaryCur?stgId=${obj}`);
    }
     /** This is description of the oiitgdetGetProfileValue function*/
    oiitgdetGetProfileValue(profileType, profileCode) {
        return this.http.get(`oiitgdet/oiitgdetGetProfileValue?profileType=${profileType}&profileCode=${profileCode}`);
    }
}
