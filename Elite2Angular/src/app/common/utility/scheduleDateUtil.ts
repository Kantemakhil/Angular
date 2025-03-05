import { Injectable } from '@angular/core';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import {WeekSchedule} from '../../workspace/inmate-summary/beans/weekschedule';
import { TranslateService } from '@common/translate/translate.service';


@Injectable({providedIn: 'root'})
export class ScheduleDateUtil {
  constructor(public translateService: TranslateService,) { }

  customizeName(firstName, lastName, middleName ) : string {return "";}
  
  
  initWeekSchedules(fromDate, daysLeftinWeek) {
      let weekSchedulesTemp = [];
      for(let i=0;  i<=daysLeftinWeek; i++) {
          let weekSchedule = new WeekSchedule();
          let toDate = DateFormat.getDate(fromDate);
          let currDate = toDate.getDate();
          toDate.setDate(currDate+i);
          weekSchedule.scheduleDateTime = toDate;
          weekSchedulesTemp[i]=weekSchedule;
      }
      return weekSchedulesTemp;
  }
  
  options() {
      return [
              { text: this.translateService.translate('offender.schedule.tw'), id: 1 },
              { text: this.translateService.translate('offender.schedule.nw'), id: 2 },
              { text: this.translateService.translate('offender.schedule.mw'), id: 3 }
          ];
  }
  
  dateFromCurrentDays(days) {
      let date = DateFormat.getDate();
      let todayDate = date.getDate();
      date.setDate(todayDate+days);
      return date;
  }
  
  currDateTime(day, hour, minute) {
      let fromAMtime = new Date();
      if(day) {
          fromAMtime.setDate(day);
      }
      fromAMtime.setHours(hour);
      fromAMtime.setMinutes(minute);
      fromAMtime.setSeconds(0);  
      return fromAMtime;
  }
  
  isMorningSchedule(schedule) {
      let scheduleStatrtDateTime = DateFormat.getDate(schedule.startTime);
      if(scheduleStatrtDateTime > this.currDateTime(scheduleStatrtDateTime.getDate(), 3,0) && scheduleStatrtDateTime < this.currDateTime(scheduleStatrtDateTime.getDate(), 12,0)) {
          return true;
      } else {
          return false;
      }
  }
  isAfterNoonSchedule(schedule) {
      let scheduleStatrtDateTime = DateFormat.getDate(schedule.startTime);
      if(scheduleStatrtDateTime > this.currDateTime(scheduleStatrtDateTime.getDate(), 12,0) && scheduleStatrtDateTime < this.currDateTime(scheduleStatrtDateTime.getDate(), 18,0)) {
          return true;
      } else {
          return false;
      }
  }
  isEveningSchedule(schedule) {
      let scheduleStatrtDateTime = DateFormat.getDate(schedule.startTime);
      if(scheduleStatrtDateTime > this.currDateTime(scheduleStatrtDateTime.getDate(), 18,0) && scheduleStatrtDateTime < this.currDateTime(scheduleStatrtDateTime.getDate()+1, 3, 0)) {
          return true;
      } else {
          return false;
      }
  }
  
  
  
  
}
