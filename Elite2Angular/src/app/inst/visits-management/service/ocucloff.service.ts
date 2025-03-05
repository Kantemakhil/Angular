import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcucloffService {
    constructor(private http: HttpService) { }
    /** This is description of the contactsExecuteQuery function*/
    contactsExecuteQuery(obj) {
        return this.http.post('ocucloff/contactsExecuteQuery', obj);
    }
    /** This is description of the rgRelationshipTypeRecordGroup function*/
    rgRelationshipTypeRecordGroup(obj) {
        return this.http.get('ocucloff/rgRelationshipTypeRecordGroup');
    }
    /** This is description of the rgContactTypeRecordGroup function*/
    rgContactTypeRecordGroup(obj) {
        return this.http.get('ocucloff/rgContactTypeRecordGroup');
    }
}
