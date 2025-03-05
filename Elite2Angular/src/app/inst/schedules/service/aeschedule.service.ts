import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({
  providedIn: 'root'
})
export class AescheduleService {

  constructor(private http: HttpService) { }

  calculateSchedules(obj){
    return this.http.post('calsch/calculateSchedules', obj);
  }

  getScheduleConflicts(obj){
    return this.http.post('calsch/getScheduleConflicts', obj);
  }

  saveRecurrSchedule(obj){
    return this.http.post('calsch/saveRecurrSchedule', obj);
  }

  getScheduleSeries(obj){
    return this.http.post('calsch/getScheduleSeries',obj);
  }

  commitScheduledEventDetails(obj){
    return this.http.post('calsch/commitScheduledEventDetails',obj);
  }

  courtEventsSave(obj){
    return this.http.post('calsch/courtEventsSave',obj);
  }

  checkScreenAccess(userId) {
    return this.http.get(`calsch/checkScreenAccess?userId=${userId}`);
  }

  getEmailSmsFlag(obj) {
		return this.http.post('calsch/getEmailSmsFlag', obj);
  }
  
  checkNonAssociationConflicts(obj) {
    return this.http.post('calsch/checkNonAssociationConflicts', obj);
  }

  getActiveTierEvent(obj){
    return this.http.get('calsch/getActiveTierEvent?offenederBookId='+obj);
  }

  tierdefaultEventsExecuteQuery(obj) {
    return this.http.post('calsch/tierdefaultEventsExecuteQuery', obj);
  }
}
