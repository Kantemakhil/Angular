import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcuperprService {
    constructor(private http: HttpService) {}
    /** This is description of the profilesExecuteQuery function*/
    profilesExecuteQuery(obj) {
        return this.http.post('ocuperpr/profilesExecuteQuery', obj);
    }
    /** This is description of the profilesCommit function*/
    profilesCommit(obj) {
        return this.http.post('ocuperpr/profilesCommit', obj);
    }
    /** This is description of the rgProfileCodeRecordGroup function*/
    rgProfileCodeRecordGroup() {
        return this.http.get( 'ocuperpr/rgProfileCodeRecordGroup');
    }
    insertProfilesTypes(personId) {
        return this.http.get( 'ocuperpr/insertProfilesTypes?personId=' + personId);
    }
}
