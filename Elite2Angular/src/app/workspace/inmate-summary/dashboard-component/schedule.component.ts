import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { TranslateService } from '@common/translate/translate.service';
import { VOffenderAllSchedules } from '@inst/schedules/beans/VOffenderAllSchedules';
import { OiioscedService } from '@inst/casemanagement/service/oiiosced.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';


@Component({
  
  templateUrl: './schedule.component.html',
  providers: [],
    selector: 'scheduleComponent'
})
export class ScheduleComponent implements OnInit {

    voffenderallschedulesModel: VOffenderAllSchedules = new VOffenderAllSchedules();
    vHeaderBlockModel: VHeaderBlock;
    voffenderallschedulesData: VOffenderAllSchedules [] = [];
    voffenderallschedulesDataTemp: VOffenderAllSchedules[] = [];

    morningAMList: VOffenderAllSchedules[] = [];
    afterNoonPMList: VOffenderAllSchedules[] = [];
    eveningEDList: VOffenderAllSchedules[] = [];
    modelData={
        'defaultView' : "Week"
    }

    constructor(private oiioscedFactory: OiioscedService,  public translateService: TranslateService,
            private offenderSearchService: OffenderSearchService) {
    }

  ngOnInit() {
      
    }
  
      initParams() {
          const datePipe = new DatePipe('en-US');
          let todayDate = DateFormat.getDate();
          this.voffenderallschedulesModel.offenderBookId=this.vHeaderBlockModel.offenderBookId;
          let currDate = todayDate.getDate();
          todayDate.setDate(currDate-1);
          this.voffenderallschedulesModel.fromDate = todayDate;
          this.voffenderallschedulesModel.toDate =  DateFormat.getDate();
          //this.voffenderallschedulesModel.eventClass = 'All';//this.cntrlblkModel.toDate;
      }
      
      @Input()
      set selectedOffender(v:any) {
          if (v !== undefined && v !== this.vHeaderBlockModel) {
              this.vHeaderBlockModel = v;
              this.voffenderallschedulesExecuteQuery();
          }
      }
      
      currDateTime(hour, minute) {
          let fromAMtime = new Date();
          fromAMtime.setHours(hour);
          fromAMtime.setMinutes(minute);
          fromAMtime.setSeconds(0);  
          return fromAMtime;
          /*let toAMtime = new Date();
          fromAMtime.setHours(12);
          fromAMtime.setMinutes(0);
          fromAMtime.setSeconds(0);*/
      }
      
      voffenderallschedulesExecuteQuery() {
          this.initParams();
          const voffenderallschedulesResult = this.oiioscedFactory.vOffenderAllSchedulesExecuteQuery(this.voffenderallschedulesModel);
              voffenderallschedulesResult.subscribe(data => {
                  if (data.length === 0) {
                      this.voffenderallschedulesData = [];
                  } else {
                      this.voffenderallschedulesDataTemp = data;
                      this.voffenderallschedulesDataTemp.forEach((obj)=>{
                        obj.nbtEventDate= DateFormat.format(obj.eventDate);
                      })
                      this.morningAMList = data.filter((schedule)=> {
                          let scheduleStatrtDateTime = DateFormat.getDate(schedule.startTime);
                          if(scheduleStatrtDateTime > this.currDateTime(3,0) && scheduleStatrtDateTime < this.currDateTime(12,0)) {
                              return true;
                          } else {
                              return false;
                          }
                      });
                      this.afterNoonPMList = data.filter((schedule)=> {
                          let scheduleStatrtDateTime = DateFormat.getDate(schedule.startTime);
                          if(scheduleStatrtDateTime > this.currDateTime(12,0) && scheduleStatrtDateTime < this.currDateTime(18,0)) {
                              return true;
                          } else {
                              return false;
                          }
                      });
                      this.eveningEDList = data.filter((schedule)=> {
                          let scheduleStatrtDateTime = DateFormat.getDate(schedule.startTime);
                          if(scheduleStatrtDateTime > this.currDateTime(18,0) && scheduleStatrtDateTime < this.currDateTime(24,0)) {
                              return true;
                          } else {
                              return false;
                          }
                      });
                      for ( let i = 0; i < data.length; i++) {
                          if ( data[i].toAgyLocDesc ) {
                              this.voffenderallschedulesDataTemp[i].toAgyLocDesc = data[i].toAgyLocDesc;
                          } else if ( data[i].toCityName) {
                              this.voffenderallschedulesDataTemp[i].toAgyLocDesc = data[i].toCityName;
                          } else if ( data[i].toInternalLocationDesc) {
                              this.voffenderallschedulesDataTemp[i].toAgyLocDesc = data[i].toInternalLocationDesc;
                          } else if ( data[i].toAddressOwnerClass) {
                              this.voffenderallschedulesDataTemp[i].toAgyLocDesc = data[i].toAddressOwnerClass;
                          }
                      }
                      this.voffenderallschedulesData = this.voffenderallschedulesDataTemp;
                      this.voffenderallschedulesData = this.voffenderallschedulesData.filter(ele => ele.eventStatus !== 'CANC');
                 }
        });
  }

}