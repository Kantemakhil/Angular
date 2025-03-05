import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdvteamService {
    exitFlag: boolean;
constructor(private http: HttpService) { }
/** This is description of the offTeamAssignExecuteQuery function*/
offTeamAssignExecuteQuery(obj) {
return this.http.post('ocdvteam/offTeamAssignExecuteQuery', obj);
}
/** This is description of the offTeamAssignCommit function*/
offTeamAssignCommit(obj) {
return this.http.post('ocdvteam/offTeamAssignCommit', obj);
}
/** This is description of the rgFunctionRecordGroup function*/
rgFunctionRecordGroup(obj) {
return this.http.get('ocdvteam/rgFunctionRecordGroup');
}
getTeamDetails(obj) {
    return this.http.post('ocdvteam/getTeamDetails', obj);
    }

}
