import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OweacplnService {
    
    constructor(private http: HttpService) {}    
    weeklyActivityCommit(object) {
      return this.http.post('oweacpln/weeklyActivityCommit', object);
    }

    getWeeklyActivity(obj) {
      return this.http.post('oweacpln/getWeeklyActivity', obj);
    }

    saveEmDetails(obj) {
      return this.http.post('oweacpln/saveEmDetails', obj);
    }
    retrieveEmDetails(obj) {
      return this.http.post('oweacpln/retrieveEmDetails', obj);
    }
    
    weeklyActivityHtyCommit(object) {
      return this.http.post('oweacpln/weeklyActivityHtyCommit', object);
    }
    getWeeklyActivityHtyData(object) {
      return this.http.post('oweacpln/getWeeklyActivityHty', object);
    }
    
    weeklyActivityCommentCommit(object) {
      return this.http.post('oweacpln/weeklyActivityCommentCommit', object);
    }
    printReportForStaff(object) {
      return this.http.post('oweacpln/printReportForStaff', object);
    }

    printReportForOffender(object) {
      return this.http.post('oweacpln/printReportForOffender', object);
    }

    amendWapComment(obj){
      return this.http.post('oweacpln/amendWapComment', obj);
    }

    getWeeklyActivityHtyMaxData(object) {
      return this.http.post('oweacpln/getWeeklyActivityHtyMaxData', object);
    }
    getMaxHtyVersion(obj) {
      return this.http.post('oweacpln/getMaxHtyVersion', obj);
    }

    copyOverPreviousWeekData(obj) {
      return this.http.post('oweacpln/copyOverPreviousWeekData', obj);
    }
    
    populateLoggedStaffName() {
      return this.http.get('oweacpln/populateLoggedStaffName');
  }

  getMaxHtyVersionData(obj) {
    return this.http.post('oweacpln/getMaxHtyVersionData', obj);
  }
  
}
