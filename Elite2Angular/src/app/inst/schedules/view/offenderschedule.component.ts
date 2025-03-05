import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@common/translate/translate.service';
import { VOffenderAllSchedules } from '@inst/schedules/beans/VOffenderAllSchedules';
import { OiioscedService } from '@inst/casemanagement/service/oiiosced.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import {InjectOffenderService} from '@core/service/inject-offender.service';
import { ScheduleDateUtil } from '@common/utility/scheduleDateUtil';
import {WeekSchedule} from '../../../workspace/inmate-summary/beans/weekschedule';
import {addHours} from 'date-fns';
import {CalendarEvent} from 'angular-calendar';


@Component({
  
  templateUrl: './offenderschedule.component.html',
  providers: [],
  selector: 'offenderScheduleComponent'
})
export class OffenderScheduleComponent implements OnInit {
    
    weekSchedules : WeekSchedule[] = [];
    weekSchedulesTemp : WeekSchedule[] = [];
    voffenderallschedulesModel: VOffenderAllSchedules = new VOffenderAllSchedules();
    vHeaderBlockModel: VHeaderBlock;
    morningAMList: VOffenderAllSchedules[] = [];
    afterNoonPMList: VOffenderAllSchedules[] = [];
    eveningEDList: VOffenderAllSchedules[] = [];
    options = [];
    seelectedOption = 1;
    colors: any = {
            red: {
              primary: '#ad2121',
              secondary: '#FAE3E3'
            },
            blue: {
              primary: '#1e90ff',
              secondary: '#D1E8FF'
            },
            yellow: {
              primary: '#e3bc08',
              secondary: '#FDF1BA'
            }
          };
    scheduleEvents : CalendarEvent[] = null;

    constructor(private oiioscedFactory: OiioscedService,  public translateService: TranslateService,
            private offenderSearchService: OffenderSearchService,
            private activatedRoute: ActivatedRoute, private injectOffenderService: InjectOffenderService,
            private scheduleDateUtil: ScheduleDateUtil) {
    }

    ngOnInit() {
        this.options=this.scheduleDateUtil.options();
        this.injectOffenderService.injectOffender(this.activatedRoute);
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.currentWeekSchedule();
    }
    
    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        this.seelectedOption = 1;
        this.currentWeekSchedule();
    }
    
    changeView($event) {
        if($event.value==1) {
            this.currentWeekSchedule();
        } else if($event.value==2) {
            this.nextWeekSchedule();
        } else if($event.value==3) {
            this.voffenderallschedulesExecuteQuery();
        }
    }
    
    initMonthParams() {
        this.voffenderallschedulesModel.offenderBookId=this.vHeaderBlockModel.offenderBookId;
        this.voffenderallschedulesModel.fromDate = this.scheduleDateUtil.dateFromCurrentDays(-1);
        this.voffenderallschedulesModel.toDate =  this.scheduleDateUtil.dateFromCurrentDays(30);
    }
    currentWeekParams() {
        this.voffenderallschedulesModel.offenderBookId=this.vHeaderBlockModel.offenderBookId;
        this.voffenderallschedulesModel.fromDate = this.scheduleDateUtil.dateFromCurrentDays(-1);
        this.voffenderallschedulesModel.toDate =  this.scheduleDateUtil.dateFromCurrentDays(7);
        this.weekSchedulesTemp = this.scheduleDateUtil.initWeekSchedules(DateFormat.getDate(), 6);
    }
    nextWeekParams() {
        this.voffenderallschedulesModel.offenderBookId=this.vHeaderBlockModel.offenderBookId;
        this.voffenderallschedulesModel.fromDate = this.scheduleDateUtil.dateFromCurrentDays(7);
        this.voffenderallschedulesModel.toDate =  this.scheduleDateUtil.dateFromCurrentDays(14);
        this.weekSchedulesTemp =  this.scheduleDateUtil.initWeekSchedules(this.scheduleDateUtil.dateFromCurrentDays(7), 6);
    }
    
    updateList(schedule, morningAMList, afterNoonPMList, eveningEDList) {
        if(this.scheduleDateUtil.isMorningSchedule(schedule)) {
            morningAMList.push(schedule);
        } else if(this.scheduleDateUtil.isAfterNoonSchedule(schedule)) {
            afterNoonPMList.push(schedule);
        } else if(this.scheduleDateUtil.isEveningSchedule(schedule)) {
            eveningEDList.push(schedule);
        }
    }
    currentWeekSchedule() {
        this.currentWeekParams();
        this.executeWeekSchedule();
    }
    nextWeekSchedule() {
        this.nextWeekParams();
        this.executeWeekSchedule();
    } 
    executeWeekSchedule() {
        let prevDate :any;
        let weekSchedule:any;
        const voffenderallschedulesResult = this.oiioscedFactory.vOffenderAllSchedulesExecuteQuery(this.voffenderallschedulesModel);
            voffenderallschedulesResult.subscribe(data => {
                if (data.length === 0) {
                    //No Recors to show.
                    this.weekSchedules = this.weekSchedulesTemp;
                } else {
                    for ( let i = 0; i < data.length; i++) {
                        let date = (DateFormat.getDate(data[i].startTime)).getDate();
                        if(prevDate !== date) {
                            if(prevDate) {
                                weekSchedule.morningAMList=this.morningAMList;
                                weekSchedule.afterNoonPMList = this.afterNoonPMList; 
                                weekSchedule.eveningEDList = this.eveningEDList;
                            }
                            prevDate = date;
                            weekSchedule =  this.getWeekDay(date);
                            this.morningAMList=[];
                            this.afterNoonPMList=[];
                            this.eveningEDList=[];
                            this.updateList(data[i], this.morningAMList, this.afterNoonPMList, this.eveningEDList);
                        } else {
                            this.updateList(data[i], this.morningAMList, this.afterNoonPMList, this.eveningEDList);
                        }
                        if(i==data.length-1) {
                            weekSchedule.morningAMList=this.morningAMList; 
                            weekSchedule.afterNoonPMList = this.afterNoonPMList;
                            weekSchedule.eveningEDList = this.eveningEDList;
                        }
                    }
                    this.weekSchedules = this.weekSchedulesTemp;
                }
        });
    }
    
    getWeekDay(date) {
        for(let i=0;  i<this.weekSchedulesTemp.length; i++) {
            if((DateFormat.getDate(this.weekSchedulesTemp[i].scheduleDateTime)).getDate() === date) {
                return this.weekSchedulesTemp[i];
            }
        }
    }
    
    voffenderallschedulesExecuteQuery() {
        this.initMonthParams();
        const voffenderallschedulesResult = this.oiioscedFactory.vOffenderAllSchedulesExecuteQuery(this.voffenderallschedulesModel);
            voffenderallschedulesResult.subscribe(data => {
                if (data.length === 0) {
                    this.scheduleEvents = [];
                } else {
                    this.scheduleEvents = data.map((d)=>{return {
                        start: d.startTime,
                        end: addHours(d.startTime, 1),
                        title: d.toAgyLocDesc,
                        color: this.colors.blue,
                        };});
               }
      });
    }
      
      

}