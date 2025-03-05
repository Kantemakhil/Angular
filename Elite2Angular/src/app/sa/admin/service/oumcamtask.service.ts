import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OumcamtaskService {
  moduleName : string;
    constructor(private http: HttpService) { }
    /** This is description of the sysPflExecuteQuery function*/
    getTaskList(user,displayLoader) {
		return this.http.get('oumcamtask/getTask?assignee='+user,null,displayLoader);
  }
  setAssignee(obj) {
		return this.http.post('oumcamtask/setAssignee',obj);
  }
  
  unClaim(obj) {
		return this.http.post('oumcamtask/unclaim',obj);
  }

  completeTask(obj) {
		return this.http.post('oumcamtask/completeTask',obj);
  }
  
  getXml(){
    return this.http.get('oumcamtask/getXml');
  }

  getDiagarm(instanceId) {
		return this.http.get('oumcamtask/getDiagramForInstance?instanceId='+instanceId);
  }

  getModulesData(){
    return this.http.get('osuntask/rgModulesRecordGroup');
  }
  offbkgGlobalQuery(obj) {
    return this.http.post('oumcamtask/offbkgGlobalQuery', obj);
}
imageExecuteQuery(obj) {
  return this.http.post('oumcamtask/imageExecuteQuery', obj);
}
offbkgVPHeadGlobalQuery(obj) {
  return this.http.post('oumcamtask/offbkgVPHeadGlobalQuery', obj);
}
}
