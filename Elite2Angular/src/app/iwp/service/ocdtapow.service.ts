import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdtapowService {
constructor(private http: HttpService) { }
/** This is description of the staffLrExecuteQuery function*/
staffLrExecuteQuery(obj) {
return this.http.post('ocdtapow/staffLrExecuteQuery', obj);
}
/** This is description of the staffLrCommit function*/
staffLrCommit(obj) {
return this.http.post('ocdtapow/staffLrCommit', obj);
}
/** This is description of the offBkg1ExecuteQuery function*/
offBkg1ExecuteQuery(obj) {
return this.http.post('ocdtapow/offBkg1ExecuteQuery', obj);
}
/** This is description of the offBkg1Commit function*/
offBkg1Commit(obj) {
return this.http.post('ocdtapow/offBkg1Commit', obj);
}
/** This is description of the cgfkStafflrdspdescriptionRecordGroup function*/
cgfkStafflrdspdescriptionRecordGroup(caseloadId) {
    return this.http.get('ocdtapow/cgfkStaffLrDspDescriptionRecordGroup?caseloadId=' + caseloadId);
    }
/** This is description of the cgfkVoffdetpositionRecordGroup function*/
cgfkVoffdetpositionRecordGroup(obj) {
return this.http.get('ocdtapow/cgfk$vOffDetPositionRecordGroup');
}
/** This is description of the cgfkVoffdetroleRecordGroup function*/
cgfkVoffdetroleRecordGroup(obj) {
return this.http.get('ocdtapow/cgfk$vOffDetRoleRecordGroup');
}
/** This is description of the cgfkVoffdetsexcodeRecordGroup function*/
cgfkVoffdetsexcodeRecordGroup(obj) {
return this.http.get('ocdtapow/cgfk$vOffDetSexCodeRecordGroup');
}
/** This is description of the cgfkVoffdetscheduletypeRecordGroup function*/
cgfkVoffdetscheduletypeRecordGroup(obj) {
return this.http.get('ocdtapow/cgfk$vOffDetScheduleTypeRecordGroup');
}
/** This is description of the cgfkVoffdetskilltypeRecordGroup function*/
cgfkVoffdetskilltypeRecordGroup(obj) {
return this.http.get('ocdtapow/cgfk$vOffDetSkillTypeRecordGroup');
}
/** This is description of the cgfkVoffdetskillsubtypeRecordGroup function*/
cgfkVoffdetskillsubtypeRecordGroup(obj) {
return this.http.get('ocdtapow/cgfk$vOffDetSkillSubTypeRecordGroup');
}
/** This is description of the cgfkStafflrdsplastnameRecordGroup function*/
cgfkStafflrdsplastnameRecordGroup(obj) {
return this.http.get('ocdtapow/cgfk$staffLrDspLastNameRecordGroup');
}

saveData(obj) {
return this.http.post('ocdtapow/saveData', obj);
}
}
