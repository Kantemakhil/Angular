
import { SchedulerService } from './scheduler.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, ScheduleComponent, EventSettingsModel, PopupOpenEventArgs, EventRenderedArgs, WorkHoursModel, TimelineViewsService, TimelineMonthService, TimelineYearService, MonthAgendaService, ActionEventArgs } from '@syncfusion/ej2-angular-schedule';
import { UiCustomizeService } from '@core/service/ui-customize.service';
import { TimeFormat } from '../time/timeFormat';
import { MatDialog } from '@angular/material/dialog';
import { AddEditScheduleComponent } from '../../../inst/schedules/view/add-edit-schedule.component';
import { TranslateService } from '@common/translate/translate.service';
import { DialogService } from '../dialog/dialog.service';
import { DateFormat } from '../datepicker/dateFormat';
import { OcdclogsService } from '@iwp/service/ocdclogs.service';
import { OcmtidetService } from '@cm/communitysupervisiontiers/maintenance/service/ocmtidet.service';
import { AescheduleService } from '@inst/schedules/service/aeschedule.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OidcrtevService } from '@inst/legal/service/oidcrtev.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OcduprojService } from '@cm/programsservices/service/ocduproj.service';

@Component({
  selector: 'app-schedule',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, TimelineViewsService
    , TimelineMonthService, TimelineYearService, MonthAgendaService],
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})

export class SchedulerComponent implements OnInit {

  @ViewChild('scheduleObj', { static: true }) public scheduleObj: ScheduleComponent;
  public selectedDate: Date = new Date();
  public eventSettings: EventSettingsModel;
  public scheduleHours: WorkHoursModel;
  msgs: any[] = [];

  dataSource: any = [];
  @Input() calScheduleObj: any;

  calScheList: any = [];
  schedList: any = [];
  schedDisplayList: any = [];
  monthAgendaView = true;
  displayMap: any;
  remoteData: { dataSource: { Id: any; Subject: any; StartTime: any; EndTime: any; }[]; };
  defaultView: string;
  enableViewList: any;
  viewStart: string;
  viewEnd: string;
  scheduleTypes = [];
  editEntireSeriesBtn: boolean = false;
  terLevel: any;
  screenAcesscheck: boolean;
  defaultCanReason: string;
  currentSelectedViewClass = '';
  isDisableCalender: boolean = false;
  tapTimePeriod = [];

  constructor(public dialog: MatDialog, private schedularService: SchedulerService,public uiCustomizeService: UiCustomizeService,
    public translateService: TranslateService,public dialogService: DialogService, public ocdclogsService: OcdclogsService,public aescheduleService: AescheduleService,
    public sessionManager: UserSessionManager,private OidcrtevFactory: OidcrtevService, private router: Router, private ocduprojFactory: OcduprojService
    ) {
    this.schedDisplayList = [];
    this.enableViewList = this.uiCustomizeService.calConfig.enabledViews;
    this.viewStart = TimeFormat.format(new Date(this.uiCustomizeService.calConfig.viewStart));
    this.uiCustomizeService.calConfig.intEvntEndTime = TimeFormat.getTimeInMinutes(new Date(this.uiCustomizeService.calConfig.intEvntTime));
    this.uiCustomizeService.calConfig.extEvntEndTime = TimeFormat.getTimeInMinutes(new Date(this.uiCustomizeService.calConfig.extEvntTime));
    this.uiCustomizeService.calConfig.communityEndTime = TimeFormat.getTimeInMinutes(new Date(this.uiCustomizeService.calConfig.commEvntTime));
    this.viewEnd = TimeFormat.format(new Date(this.uiCustomizeService.calConfig.viewEnd));
    this.defaultView = this.uiCustomizeService.calConfig.defautView;

    // if (this.uiCustomizeService && this.uiCustomizeService.calConfig) {
    //   this.scheduleHours = {
    //     highlight: true,
    //     start: this.viewStart,
    //     end: this.viewEnd
    //   };
    // }

  }

  ngOnInit() {
    //this.calScheduleObj.profileMap = CalendarProfile.getProfilesValues();
    this.checkScreenAccess();
    this.getDefaultCancellationReason();
    this.ocdclogsService.rgScheduleTypeRecordGroup().subscribe(
      (res) => {
        this.scheduleTypes = res;
      }
    )
  }

  getDefaultCancellationReason() {
    const canReason = this.OidcrtevFactory.getDefaultCancellationReason();
    canReason.subscribe(data => {
      this.defaultCanReason = data;
    });

  }

  updateData(calScheduleObj) {
    this.tapTimePeriod = [];
    this.currentSelectedViewClass = 'custom-' + 'e-week-view';
    this.calScheduleObj = calScheduleObj;
    this.calScheduleObj.profileMap = this.uiCustomizeService.calConfig;
    this.calScheduleObj.currentSelectedViewClass = this.currentSelectedViewClass;
    this.dataSource = [];
    if (this.calScheduleObj && this.calScheduleObj.offenderBookId) {
      this.isDisableCalender = true;
      const schedData = this.schedularService.getData(this.calScheduleObj);
      schedData.subscribe(data => {
        if (data) {
          data.forEach(element => {
            element.startTime = new Date(element.startTime);
            element.endTime = new Date(element.endTime);
            if(element.eventClass === 'WAP_ACTIVITY' && element.eventType=== 'WAP_ACTIVITY'){
              if(element.departStartTime){
                let hours = DateFormat.getDate(element.departStartTime).getHours();
                let min = DateFormat.getDate(element.departStartTime).getMinutes();
                element.startTime = DateFormat.getDate(DateFormat.getDate(element.startTime).setHours(hours, min, 0));
              }
              if(element.returnTime){
                let hours = DateFormat.getDate(element.returnTime).getHours();
                let min = DateFormat.getDate(element.returnTime).getMinutes();
                element.endTime = DateFormat.getDate(DateFormat.getDate(element.endTime).setHours(hours, min, 0));
              }
            }

            if (element.eventType == 'TAP' && element.eventStatus == 'PEN') {
              //  Tap and Pending both -- transparent shade
              element['UniqueClass'] = 'tapwithpendingev';
              this.tapTimePeriod.push(JSON.parse(JSON.stringify(element)));
            }
            else if (element.eventType == 'TAP' && element.eventStatus == 'CANC') {
              // Tap and Cancel both -- strikeout and timePeriod should be block
              element['UniqueClass'] = 'tapwithcancelev';
              element['IsReadonly'] = true;
              this.tapTimePeriod.push(JSON.parse(JSON.stringify(element)));
            }
            else if (element.eventStatus == 'CANC') {
              // Only Cancel, not Tab -- StrikeOut & transparent shade
              element['UniqueClass'] = 'cancelev';
              element['IsReadonly'] = false;
            }
            else if (element.eventStatus == 'PEN') {
              // Only Cancel, not Tab -- StrikeOut & transparent shade
              element['UniqueClass'] = 'pendingev';
            }
            else if (element.eventType == 'TAP') {
              // Only TaP, not Cancel -- timePeriod should be block
              element['UniqueClass'] = 'tapev';
              this.tapTimePeriod.push(JSON.parse(JSON.stringify(element)));
            }
            else {
              element['UniqueClass'] = 'simpleev';
            }

          });
          this.schedList = data;
          data = this.keysToCamel(data);
          data.forEach((element, index) => {
            this.schedList.forEach((obj, ind) => {
              if (index === ind) {
                element.StartTime = new Date(obj.startTime);
                element.EndTime = new Date(obj.endTime);
                element.subject = obj.eventSubTypeDesc
              }
            });
          });
          this.eventSettings = { dataSource: data , enableTooltip: true };
        }
        this.isDisableCalender = false;
      });
    }
    else {
      this.eventSettings = { dataSource: [] };
    }
  }

  isReadOnlySchedule(eC) {
    if (eC == 'COMM') {
      return false;
    } else if (eC == 'DTE') {
      return false;
    }
    return true;
  }

  checkScreenAccess() {
    const serviceObj = this.aescheduleService.checkScreenAccess(this.sessionManager['userSession'].id);
    serviceObj.subscribe(data => {
      this.screenAcesscheck = data;
    });
  }


  formattedDate(dT){
    let dValue = dT.split("T")[0];
    let tValue = dT.split("T")[1];
		let dd = dValue.split('-')[2];
		let mm = dValue.split('-')[1] - 1;
		let yy = dValue.split('-')[0];
    let tArr = tValue.split(':');
    let hour = tArr[0];
		let min = tArr[1];
    let sec = tArr[2];
		return new Date(yy, mm, dd, hour, min, sec);
	}

  onPopupOpen(args: PopupOpenEventArgs): void {

    args.cancel = true; // stop syncfusion popup
    args.data["IsAllDay"] = false; // remove full day schedule
    args.data["isAllDay"] = false; // remove full day schedule

    let dat = args.data.StartTime;
    let bookingdate =  this.calScheduleObj.bookingDate;
    if (DateFormat.compareDate(DateFormat.getDate(new Date(dat)) ,DateFormat.getDate(bookingdate) ) === -1) {
      args.cancel = true;
      this.show(this.translateService.translate('calsch.backdatedvalidation'), 'warn');
      return;
  }
 
    for(let i=0;i<this.tapTimePeriod.length;i++){
      let sT = this.formattedDate(this.tapTimePeriod[i].startTime);
      let eT = this.formattedDate(this.tapTimePeriod[i].endTime);
      if (dat >= sT && dat <= eT) {
        break;
      }
    }

    let data = {
      action: '',
      data: args.data,
      currentView: this.scheduleObj.currentView,
      offenderBookId: this.calScheduleObj.offenderBookId,
      isUpdateReadOnly: false,
      screenAcesscheck: this.screenAcesscheck,
      defaultCanReason: this.defaultCanReason,
      agyLocId: this.calScheduleObj.agyLocId
    };
    
    data['indSchedEdit'] = true;
    data['internalAppointmentEdit'] = false;
    data['courtEventEdit'] = false;
    if (!this.calScheduleObj || !this.calScheduleObj.offenderBookId) {
      this.show(this.translateService.translate('common.pleasesearchforvalidoffender'), 'warn');
      return;
    }
    if(args.data['EventClass'] === 'COMM' && args.data['EventType'] === 'UW'){
      this.schedularService.backBtnFlag = true;
      this.router.navigate(["/OCDUPROJ"]);
      return;
    }
    else if((args.data['EventClass'] === 'COMM' || args.data['EventClass'] === 'INT_MOV' || args.data['EventClass'] === 'EXT_MOV') && args.data['EventType'] === 'ACP'){
      this.schedularService.backBtnFlag = true;
      this.router.navigate(["/OCDPROGR"]);
      return;
    }
    if(args.data['EventType'] === 'TAP'){
      this.schedularService.backBtnFlag = true;
      this.router.navigate(["/OIDSTABS"]);
      return;
    }
    if(args.data['EventType'] === 'WAP_ACTIVITY'){
      this.schedularService.backBtnFlag = true;
      this.router.navigate(["/OWEACPLN"]);
      return;
    }    
    if(args.data['EventClass'] === 'EXT_MOV' && args.data['EventType'] === 'TRN' && args.data['EventSubType'] !== 'OJ'){
      this.schedularService.backBtnFlag = true;
     this.router.navigate(["/OIDSTWJU"]);
      return;
    }  
    if(args.data['EventClass'] === 'EXT_MOV' && args.data['EventType'] === 'TRN' &&  args.data['EventSubType'] === 'OJ'){
      this.schedularService.backBtnFlag = true;
      this.router.navigate(["/OIDSTOJU"]);
      return;
    }

    if(args.data['EventClass'] === 'INT_MOV' && args.data['EventType'] === 'OIC'){
      this.schedularService.backBtnFlag = true;
      this.router.navigate(["/OIDOICUS"]);
      return;
    }

    if(args.data['EventClass'] === 'INT_MOV' && args.data['EventType'] === 'VISIT'){
      this.schedularService.backBtnFlag = true;
      this.router.navigate(["/OIDVISIT"]);
      return;
    }

    if(args.data['EventClass'] === 'INT_MOV' && args.data['EventType'] === 'INST_ACT'){
      this.schedularService.backBtnFlag = true;
      this.router.navigate(["/OIDPACTI"]);
      return;
    }

    if(args.data['EventClass'] === 'EXT_MOV' && args.data['EventSubType'] === 'WR'){
      this.schedularService.backBtnFlag = true;
      this.router.navigate(["/OIDOWREL"]);
      return;
    }
    else if(args.target && args.target.tagName && args.target.tagName == "DIV"){
      data["action"]= 'edit'; // edit operation
      let scheduleClass = args.data.EventClass; 
      data['isUpdateReadOnly'] = this.isReadOnlySchedule(scheduleClass);
      if (data.data['StartTime'] && DateFormat.compareDate(DateFormat.getDate(data.data['StartTime']), DateFormat.getDate()) < 0) {
        this.show(this.translateService.translate('calsch.pastschedulescannotbemodifiedordeleted'), 'warn');
        return;
      }
      if (data.data['SeriesId']) {
        const modelData = {
          label: this.translateService.translate('calsch.doyouwanttoeditsinglescheduleorseries')
          , yesBtn: true, noBtn: true, cancelBtn: true, yesLabel: this.translateService.translate('calsch.editonlythisschedule'), noLabel: this.translateService.translate('calsch.editentireseries')
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', modelData, 50).subscribe(result => {
          if (result) {
            data['isSeriesEdit'] = false;
          } else if (result == null) {
            return;
          } else {
            data['isSeriesEdit'] = true;
          }
          this.openSchedulePopUp(data, args);
        });
      } else if (args.data['EventClass'] === 'DTE') {

        if (data.data['StartTime'] && DateFormat.compareDate(DateFormat.getDate(data.data['StartTime']), DateFormat.getDate()) < 0) {
          this.show(this.translateService.translate('calsch.pastschedulescannotbemodifiedordeleted'), 'warn');
          return;
        }

        if (data.data['SealFlag'] && data.data['SealFlag'] === 'Y') {
          this.editEntireSeriesBtn = false;
        } else {
          this.editEntireSeriesBtn = true;
        }
        const modelData = {
          label: this.translateService.translate('calsch.doyouwanttoeditsinglescheduleorseries')
          , yesBtn: true, noBtn: true, editEntireSeriesBtn: this.editEntireSeriesBtn, cancelBtn: true, yesLabel: this.translateService.translate('calsch.editonlythisschedule'), noLabel: this.translateService.translate('calsch.editentireseries')
        };

        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', modelData, 50).subscribe(result => {
          if (result) {
            data['indSchedEdit'] = false;
          } else if (result == null) {
            return;
          } else {
            data['seriesEdit'] = false;
            data['editEntireSeriesBtn'] = this.editEntireSeriesBtn;
          }
          this.openSchedulePopUp(data, args);
        });
      } else if (args.data['EventClass'] === 'INT_MOV' && args.data['EventStatus'] === 'CANC') {

        data['internalAppointmentEdit'] = true;
        this.openSchedulePopUp(data, args);
      } else if (args.data['EventClass'] === 'INT_MOV') {
        const modelData = {
          label: this.translateService.translate('calsch.doyouwanttoeditsinglescheduleorseries')
          , yesBtn: true, noBtn: true, editEntireSeriesBtn: true, cancelBtn: true, yesLabel: this.translateService.translate('calsch.editonlythisschedule'), noLabel: this.translateService.translate('calsch.editentireseries')
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', modelData, 50).subscribe(result => {
          if (result) {
            data['internalAppointmentEdit'] = true;
          } else if (result == null) {
            return;
          } else {
            data['seriesEdit'] = false;
            data['editEntireSeriesBtn'] = this.editEntireSeriesBtn;
          }
          this.openSchedulePopUp(data, args);
        });
      } else if (args.data['EventType'] === 'CRT') {
        this.openSchedulePopUp(data, args);
      }
      else {
        data['isSeriesEdit'] = false;
        this.openSchedulePopUp(data, args);
      }
    }
    else if (args.target && args.target.tagName && args.target.tagName == "TD") {
      data["action"] = 'add';  // add operation
      this.openSchedulePopUp(data, args);
    }
    else {
      //console.log("No Action")
    }
  }

  openSchedulePopUp(data, args) {

    const dialogConfig = {
      disableClose: true,
      hasBackdrop: true,
      data: data,
      minWidth: '900px',
      height: 'auto',
      maxWidth: "85%",
      maxHeight: "100%",
      position: { top: '40px' }
    };
    let dialogRef = this.dialog.open(AddEditScheduleComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      dialogRef = null;
      if (result) {
        if (Object.keys(result).length == 1 && result.id) { // after delete schedule
          let currData = this.scheduleObj.eventSettings.dataSource;
          this.scheduleObj.eventSettings.dataSource = [];
          let newArr = [];
          for (const [key, value] of Object.entries(currData)) {
            if (value.Id !== result.id) {
              newArr.push(value)
            }
          }
          this.scheduleObj.eventSettings.dataSource = newArr;
        }
        else if (data.add) { // after add schedule
          let currData = this.scheduleObj.eventSettings.dataSource;
          this.scheduleObj.eventSettings.dataSource = [];
          let length = Object.keys(currData).length;
          currData[length] = result;
          this.scheduleObj.eventSettings.dataSource = currData;
        }
        else if (!data.add) {    // after update schedule
          let currData = this.scheduleObj.eventSettings.dataSource;
          this.scheduleObj.eventSettings.dataSource = [];
          let newArr = [];
          for (const [key, value] of Object.entries(currData)) {
            if (value.Id === args.data["Id"]) {
              newArr.push(result)
            }
            else {
              newArr.push(value)
            }
          }
          this.scheduleObj.eventSettings.dataSource = newArr;
        }
      } else {
        this.updateData(this.calScheduleObj);
      }
    });
  }

  onEventRendered(args: EventRenderedArgs): void {
    
    if (args.element && ['Agenda', 'MonthAgenda'].indexOf(this.defaultView) > -1) {
      const subject = args.element.querySelector('.e-subject');
      subject.textContent = subject.textContent.slice(0,subject.textContent.indexOf(','));
    }

    const categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    
   args.element.classList.add(args.data.UniqueClass)

    if (this.scheduleObj.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }

  toCamel(k: string) {
    return k.charAt(0).toUpperCase() + k.slice(1);
  }

  keysToCamel(o: any) {
    if (o === Object(o) && !Array.isArray(o) && typeof o !== 'function') {
      const n = {};
      Object.keys(o)
        .forEach((k) => {
          n[this.toCamel(k)] = this.keysToCamel(o[k]);
        });
      return n;
    } else if (Array.isArray(o)) {
      return o.map((i) => {
        return this.keysToCamel(i);
      });
    }
    return o;
  }

  show(vldmsg, type?) {
    type = type ? type : 'warn';
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
}

actionComplete (args: ActionEventArgs) {
	  if (args.requestType === 'viewNavigate') {
	   this.currentSelectedViewClass = 'custom-' + this.scheduleObj.activeView.viewClass;
	   this.updateViewClickData(this.calScheduleObj);
	  }
  }


  updateViewClickData(calScheduleObj) {
    this.tapTimePeriod = [];
    this.currentSelectedViewClass = 'custom-' + this.scheduleObj.activeView.viewClass;
    this.calScheduleObj = calScheduleObj;
    this.calScheduleObj.profileMap = this.uiCustomizeService.calConfig;
    this.calScheduleObj.currentSelectedViewClass = this.currentSelectedViewClass;
    this.dataSource = [];
    if (this.calScheduleObj && this.calScheduleObj.offenderBookId) {
      this.isDisableCalender = true;
      const schedData = this.schedularService.updateViewClickData(this.calScheduleObj);
      schedData.subscribe(data => {
        if (data) {
          data.forEach(element => {
            element.startTime = new Date(element.startTime);
            element.endTime = new Date(element.endTime);
            if(element.eventClass === 'WAP_ACTIVITY' && element.eventType=== 'WAP_ACTIVITY'){
              if(element.departStartTime){
                let hours = DateFormat.getDate(element.departStartTime).getHours();
                let min = DateFormat.getDate(element.departStartTime).getMinutes();
                element.startTime = DateFormat.getDate(DateFormat.getDate(element.startTime).setHours(hours, min, 0));
              }
              if(element.returnTime){
                let hours = DateFormat.getDate(element.returnTime).getHours();
                let min = DateFormat.getDate(element.returnTime).getMinutes();
                element.endTime = DateFormat.getDate(DateFormat.getDate(element.endTime).setHours(hours, min, 0));
              }
            }

            
            if (element.eventType == 'TAP' && element.eventStatus == 'PEN') {
              //  Tap and Pending both -- transparent shade
              element['UniqueClass'] = 'tapwithpendingev';
              this.tapTimePeriod.push(JSON.parse(JSON.stringify(element)));
            }
            else if (element.eventType == 'TAP' && element.eventStatus == 'CANC') {
              // Tap and Cancel both -- strikeout and timePeriod should be block
              element['UniqueClass'] = 'tapwithcancelev';
              element['IsReadonly'] = true;
              this.tapTimePeriod.push(JSON.parse(JSON.stringify(element)));
            }
            else if (element.eventStatus == 'CANC') {
              // Only Cancel, not Tab -- StrikeOut & transparent shade
              element['UniqueClass'] = 'cancelev';
              element['IsReadonly'] = false;
            }
            else if (element.eventStatus == 'PEN') {
              // Only Cancel, not Tab -- StrikeOut & transparent shade
              element['UniqueClass'] = 'pendingev';
            }
            else if (element.eventType == 'TAP') {
              // Only TaP, not Cancel -- timePeriod should be block
              element['UniqueClass'] = 'tapev';
              this.tapTimePeriod.push(JSON.parse(JSON.stringify(element)));
            }
            else {
              element['UniqueClass'] = 'simpleev';
            }


          });
          this.schedList = data;
          data = this.keysToCamel(data);
          data.forEach((element, index) => {
            this.schedList.forEach((obj, ind) => {
              if (index === ind) {
                element.StartTime = new Date(obj.startTime);
                element.EndTime = new Date(obj.endTime);
                element.subject = obj.eventSubTypeDesc
              }
            });
          });
          this.eventSettings = { dataSource: data , enableTooltip: true };
        }
        this.isDisableCalender = false;
      });
    }
    else {
      this.eventSettings = { dataSource: [] };
    }
  }

}
