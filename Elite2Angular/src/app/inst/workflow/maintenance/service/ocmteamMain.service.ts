import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmteamMainService {
    constructor(private http: HttpService) { }
    /** This is description of the teamsExecuteQuery function*/
    teamsExecuteQuery() {
        return this.http.get('ocmteammain/teamsExecuteQuery');
    }
    /** This is description of the teamsCommit function*/
    teamsCommit(obj) {
        return this.http.post('ocmteammain/teamsCommit', obj);
    }
   
   
    /** This is description of the teamMembersExecuteQuery function*/
    teamMembersExecuteQuery(obj) {
        return this.http.post('ocmteammain/teamMembersExecuteQuery', obj);
    }
    /** This is description of the teamMembersCommit function*/
    teamMembersCommit(obj) {
        return this.http.post('ocmteammain/teamMembersCommit', obj);
    }
    getAgyLocRecords() {
        return this.http.get('ocmteammain/getAgyLocRecords');
    }

    getStaffDetails(){
        return this.http.get('ocmteammain/getStaffDetails');
    }

    getFunctioTypeRecords() {
        return this.http.get('ocmteammain/rgFuctionTypeRecordGroup');
    }

    teamDataCommit(obj) {
        return this.http.post('ocmteammain/teamDataCommit', obj);
    }
    getAllTeams(){
    return this.http.get('ocmteammain/getAllTeams');
   }

   getEmailRefCode() {
    return this.http.post('ocmteammain/refCodeExecuteQuery', {"domain": "EMAIL_DOMAIN"});
   }

}
