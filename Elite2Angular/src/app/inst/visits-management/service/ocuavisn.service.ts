import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcuavisnService {
    constructor(private http: HttpService) { }
    /** This is description of the vOffAuthVisExecuteQuery function*/
    vOffAuthVisExecuteQuery(obj) {
        return this.http.post('ocuavisn/vOffAuthVisExecuteQuery', obj);
    }
    /** This is description of the vOffAuthVisCommit function*/
    vOffAuthVisCommit(obj) {
        return this.http.post('ocuavisn/vOffAuthVisCommit', obj);
    }
    /** This is description of the rgContactTypeRecordGroup function*/
    rgContactTypeRecordGroup() {
        return this.http.get('ocuavisn/rgContactTypeRecordGroup');
    }
    /** This is description of the rgRelationshipTypeRecordGroup function*/
    rgRelationshipTypeRecordGroup() {
        return this.http.get('ocuavisn/rgRelationshipTypeRecordGroup');
    }
    getGlobalrestriction(personId, visitDate, offenderBookId) {
        return this.http.get('ocuavisn/getGlobalRestriction?personId=' + personId + '&visitDate=' +
         visitDate.getTime() + '&offenderBookId=' + offenderBookId);
    }

    rgRelationshipTypeTotalRecordGroup(){
        return this.http.get('ocuavisn/rgRelationshipTypeTotalRecordGroup');
    }
}
