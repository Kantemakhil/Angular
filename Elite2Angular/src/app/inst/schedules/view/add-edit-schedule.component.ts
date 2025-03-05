import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { AescheduleService } from '../service/aeschedule.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { VOffenderAllSchedulesCommitBean } from '@inst/schedules/beans/VOffenderAllSchedulesCommitBean';
import { VOffenderAllSchedules } from '@instschedulebeans/VOffenderAllSchedules';
import { OcdclogsService } from '@iwp/service/ocdclogs.service';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { ScheduleSeries } from '../beans/ScheduleSeries';
import { OcunawarnService } from '@common/offender-records/service/ocunawrn.service';
import { MaintainTierDefaultEvents } from '@cm/communitysupervisiontiers/maintenance/beans/MaintainTierDefaultEvents';
import { OcmtidetService } from '@cm/communitysupervisiontiers/maintenance/service/ocmtidet.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { MaintainTierLevelsCommitBean } from '@cm/communitysupervisiontiers/maintenance/beans/MaintainTierLevelsCommitBean';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CourtEvents } from '../beans/CourtEvents';

@Component({
  selector: 'app-add-edit-schedule',
  templateUrl: './add-edit-schedule.component.html',
  styleUrls: ['./add-edit-schedule.component.scss']
})
export class AddEditScheduleComponent implements OnInit {

  @ViewChild('dialog', { static: true }) dialog: DialogComponent;
  @ViewChild('gridOne', { static: true }) gridOne: any;
  msglist = [];
  message = ' Invalid.';
  type = 'error';
  msgs: any[] = [];
  heading = '';
  add: boolean = true;
  schedule: any = {};
  scheduleTemp: any = {};
  series: any = {};
  scheduleTypeApi = 'calsch/rgScheduleTypeRecordGroup';
  scheduleSubTypeApi = 'calsch/rgScheduleSubTypeRecordGroup';
  locationApi = 'calsch/rgLocationRecordGroup';
  scheduleReasonApi='calsch/rgSchInternalScheduleRecordGroup';
 

  isSeries = false;
  displayParameters = [
    { code: 'daily', description: 'Daily' },
    { code: 'weekly', description: 'Weekly' },
    { code: 'monthly', description: 'Monthly', disable: true }
  ];

  displayParametersone = ["daily", "weekly", "monthly"];

  FREQ = "weekly";
  BYDAY = [];
  interval = 1;
  daily = true;
  weekly = true;
  monthly = false;
  selectedEnd = "until";
  until = true;
  selectedEndDate = new Date();
  weekCollection = [
    { id: 'weekday-mon', name: 'M', checked: false, value: 'MONDAY' },
    { id: 'weekday-tue', name: 'T', checked: false, value: 'TUESDAY' },
    { id: 'weekday-wed', name: 'W', checked: false, value: 'WEDNESDAY' },
    { id: 'weekday-thu', name: 'T', checked: false, value: 'THURSDAY' },
    { id: 'weekday-fri', name: 'F', checked: false, value: 'FRIDAY' },
    { id: 'weekday-sat', name: 'S', checked: false, value: 'SATURDAY' },
    { id: 'weekday-sun', name: 'S', checked: false, value: 'SUNDAY' }
  ];
  excludeFlag: boolean = false;
  selectedTotalCount: number = 0;
  offschCommitModel: VOffenderAllSchedulesCommitBean = new VOffenderAllSchedulesCommitBean();
  offschInsertList: VOffenderAllSchedules[] = [];
  offschUpdateList: VOffenderAllSchedules[] = [];
  offschDeleteList: VOffenderAllSchedules[] = [];
  offschModel: VOffenderAllSchedules = new VOffenderAllSchedules();
  offschModeTemp: VOffenderAllSchedules = new VOffenderAllSchedules();
  seriesModel: ScheduleSeries = new ScheduleSeries();
  monthNumbers = [];
  selectedMonthDay = 1;
  totalcount: boolean = false;
  emailFlag: boolean = false;
  smsFlag: boolean = false;
  nonAssociationFlag: boolean = false;
  emailAddressCount: any;
  phoneNumberCount: any;
  movementType: any;
  movementOptions: { code: string; description: string; }[];
  endOptions: { code: string; description: string; }[];
  communitySchedule: boolean = false;
  eventType: boolean = true;
  scheduleReadOnly: boolean = false;
  isSeriesEnable: boolean = true;
  locationreadOnly: string;
  panelHeading: string;
  scheduleHeading: string;
  endTitles = { description: 'Range of Recurrence' };
  intervalLabelName  = 'Weekly';
  startDateReadOnly = false;
  deleteFlag = true;
  isEventOutComeSelected = false;
  seriesDisableFlag = false;
  scheduleTempData: any;
  saveBtnDisable:boolean = true;
  isUpdateReadOnly: boolean = false;
  recurrenceTitles = { description: 'Recurrence' };

  //Default Tier Events 
  defaultTierEventFlag: boolean = false;
  tierDefaultEvents: MaintainTierDefaultEvents = new MaintainTierDefaultEvents();
  defEventsRowData: MaintainTierDefaultEvents[] = [];
  selected = -1;
  tierLevelCode: string;
  tierLevelCodeDesc: string;
  offenderTierLevelLink : string;
  defEventsColumnDef: any[];
  maintainTierLevelsTempOne: MaintainTierDefaultEvents = new MaintainTierDefaultEvents();
  communitySchedules : String
  maintainDefSchedule : MaintainTierDefaultEvents = new MaintainTierDefaultEvents();
  defEventsRowDataTempData : MaintainTierDefaultEvents[] = [];
  defEventsRowDataTempDataFinal : MaintainTierDefaultEvents[] = [];
  defEventsRowDataTempDataSave : MaintainTierDefaultEvents[] = [];
  maintainTierLevelsCommitBean : MaintainTierLevelsCommitBean = new MaintainTierLevelsCommitBean();
  maintainTierLevelsTemp: MaintainTierDefaultEvents = new MaintainTierDefaultEvents();
  tempUiRules: string;
  defEventsRowDataTemp: MaintainTierDefaultEvents[] = [];
  indSchedEditFlag : boolean = true;
  scheduleSubType: string;
  maintainDefScheduleTemp : MaintainTierDefaultEvents = new MaintainTierDefaultEvents();
  tempEventSubType: any;
  editEntireSeriesBtn: boolean = false;
   //Internal Appointment
  internalAppointment: boolean = false;
  appointmentHeading:string;
  cancelFlag: string;
  disableCancelReason: boolean;
  locationApiInternalMov:string;
  cancelFlagData:boolean;
  readonlyScheduleReason:boolean
  readonlyStartDate:boolean;
  readonlyStartTime:boolean;
  readonlyToLoaction:boolean;
  readonlyCancelReason:boolean;
  readonlyComment:boolean;
  readonlyCancelFlag:boolean;
  movementOptionsInt: { code: string; description: string; }[];
  readonlyDelete: boolean;
  cancelFlagTemp: boolean=false;
  cancelFlagDataTemp: boolean;
  reqCancelReason: boolean;
  panelHeadingForCRT:string;
  courtEventsFalg:boolean;
  courtEvents : CourtEvents =new CourtEvents();
  courtslist:string;
  hearingreasonlist:string;
  apperancelocationlist:string;
  apperancelocationsource:string;
  apperancelocationMand:boolean;
  apperancelocationReadOnly:boolean;
  screenAcesscheck:boolean;
  courtEventEdit: boolean;
  outcomeReasonCodeEdit:boolean=true;
  defaultCanReason:string;
  cancelFlagRecheck:boolean;
  offenderAgyLocId:string;

  tempFlag : boolean = false;
  
  constructor(private addEditScheduleService: AescheduleService,private ocmtidetFactory: OcmtidetService,
    public translateService: TranslateService, private ocdclogsFactory: OcdclogsService, 
    public dialogService: DialogService,private ocunawarnService : OcunawarnService, public sessionManager: UserSessionManager,) { 
      this.defEventsColumnDef = [];
    }

  ngOnInit(): void {
    this.cancelFlagRecheck=true;
    this.apperancelocationMand=false;
    this.apperancelocationReadOnly=true;
    this.courtslist='calsch/populateCourtData';
    this.hearingreasonlist ='calsch/hearingreasonRecordGroup';
    this.locationApiInternalMov='calsch/rgInternalMoveLocationsRecordGroup?agyLocId=' + this.sessionManager.currentCaseLoad;
    
    //this.offenderTierLevelLink = 'ocmtidet/getActiveTierEvent?offenederBookId='+ this.dialog.data.offenderBookId;
    this.readonlyCancelReason=true;
    this.communitySchedules = "Scheduled Event Details";
    this.defEventsColumnDef = [
      { fieldName: this.translateService.translate('ocmtidet.scheduletype'), field: 'scheduleType', datatype: 'lov', editable: false, domain: 'EVENTS',  required: true },
      { fieldName: this.translateService.translate('ocmtidet.schedulesubtype'), field: 'scheduleSubType', datatype: 'lov', editable: false, domain: 'EVENTS', parentField: 'scheduleType', required: true },
      { fieldName: '', field: 'tierId', datatype: 'number', editable: true, hide: true },
      { fieldName: '', field: 'uiRules', datatype: 'text', editable: true, hide: true },

  ];
  this.screenAcesscheck=this.dialog.data.screenAcesscheck;
  this.offenderAgyLocId=this.dialog.data.agyLocId;
  this.defaultCanReason=this.dialog.data.defaultCanReason;
    if (!this.screenAcesscheck) {
      this.outcomeReasonCodeEdit = true;
    }

    this.endOptions = [
      { code: 'until', description: 'Date' },
      { code: 'totalcount', description: 'Number of Occurrences' }
    ];
    if (this.screenAcesscheck) {
      this.movementOptions = [
        { code: 'COMM', description: 'Community Offender Schedules' },
        { code: 'DTE', description: 'Default Tier Events' },
        { code: 'CRT', description: 'Court Events' },
      ];
    } else {
      this.movementOptions = [
        { code: 'COMM', description: 'Community Offender Schedules' },
        { code: 'DTE', description: 'Default Tier Events' }
      ];
    }

    this.movementOptionsInt = [
      { code: 'IAPP', description: 'Internal Appointment'},
      { code: 'CRT', description: 'Court Event'},
    ];
    
     
  

    for (let i = 1; i < 32; i++) {
      this.monthNumbers.push(i);
    }
   
    this.indSchedEditFlag = this.dialog.data['indSchedEdit'];
    this.internalAppointment = this.dialog.data['internalAppointmentEdit'];
    this.courtEventEdit = this.dialog.data['courtEventEdit'];
    let passedObj = this.dialog.data;
    this.add = passedObj.action == 'add' ? true : false ;
    let data = passedObj.data;
    this.isUpdateReadOnly = passedObj.isUpdateReadOnly;
    if(this.isUpdateReadOnly) {
      this.eventType = false;
      if(data && data.EventClass==='WAP_ACTIVITY'){
        this.locationreadOnly = data.ToAgyLocId;
      } else {
        this.locationreadOnly = data.Subject;
      }
      this.scheduleHeading = this.translateService.translate('calsch.schedule');
      this.scheduleReadOnly = true;
    } else {
      this.eventType = true;
      this.scheduleReadOnly = false;
    }
    if (this.add) {
      this.saveBtnDisable = false;
      this.heading = this.translateService.translate('calsch.addschedule')
      if (passedObj.currentView === "Month") {
        this.schedule = {
          type: null,
          subType: null,
          startDate: DateFormat.getDate(data.StartTime),
          startTime: new Date().getTime(),
          endTime: new Date().getTime() + (60 * 60 * 1000),
          location: null,
          commentText: '',
          staffName: '',
          emailFlag: false,
          smsFlag: false,
          nonAssociationFlag: false,
          emailScheduleHrsBefore: undefined,
          smsScheduleHrsBefore: undefined,
          seriesId: null,
          eventId: null
        }
      }
      else {
        this.schedule = {
          type: null,
          subType: null,
          startDate: DateFormat.getDate(data.StartTime),
          startTime: DateFormat.getDate(data.StartTime),
          endTime: DateFormat.getDate(data.EndTime),
          location: null,
          commentText: '',
          staffName: '',
          emailFlag: false,
          smsFlag: false,
          nonAssociationFlag: false,
          emailScheduleHrsBefore: undefined,
          smsScheduleHrsBefore: undefined,
          seriesId: null,
          eventId: null,
        }
      }
    }
    else if(data.EventClass === 'DTE'){
      this.heading = this.translateService.translate('calsch.updateschedule');
      this.movementType = data.EventClass;
      this.maintainDefSchedule.eventId = data.EventId;
      this.maintainDefSchedule.startTime = data.StartTime;
      this.maintainDefSchedule.endTime = data.EndTime;
      this.maintainDefSchedule.startDate = data.EventDate;
      this.maintainDefSchedule.scheduleType = data.EventType;
      this.maintainDefSchedule.scheduleSubType = data.EventSubType;
      this.tempEventSubType = data.EventSubType;
      this.maintainDefSchedule.commentText = data.Description;
      this.maintainDefSchedule.smsFlag = data.SmsFlag === 'Y' ? true : false;
      this.maintainDefSchedule.emailFlag = data.EmailFlag === 'Y' ? true : false;
      this.maintainDefSchedule.emailSchHoursBefore = data.EmailScheduleHoursBefore;
      this.maintainDefSchedule.smsSchHoursBefore = data.SmsScheduleHoursBefore;
      this.maintainDefSchedule.location = data.ToAgyLocId;
      this.maintainDefSchedule.staffName = data.InChargeStaffName;
      this.maintainDefSchedule.versionNo = data.VersionNo ? data.VersionNo : null;
      if(this.dialog.data['editEntireSeriesBtn'] === false){
        this.editEntireSeriesBtn = true;
        this.tierDefaultEvents.sealFlag = "Y";
      }else{
        this.tierDefaultEvents.sealFlag = "N";
      }
      this.tierDefaultEvents.offenderTierLevelId = data.OffenderTierLevelId;
      this.tierDefaultEvents.scheduleType =  data.EventType;
      this.tierDefaultEvents.scheduleSubType = data.EventSubType;
      this.tierDefaultEvents.versionNo = data.VersionNo ? data.VersionNo : null;
    }
    else if(data.EventClass === 'INT_MOV'){
      setTimeout(() => {
        this.readonlyDelete=true;
        this.offschModel.eventSubType = data.eventSubType
        this.offschModel.eventDate = data.EventDate;
        this.offschModel.startTime = data.StartTime;
        this.offschModel.eventSubType = data.EventSubType;
        this.offschModel.commentText = data.Description;
        this.offschModel.eventOutcome = data.EventOutCome;
        this.offschModel.toIntLocLevel1Code = data.ToIntLocLevel1Code;
        this.offschModel.eventId = data.EventId;
        this.cancelFlagData = data.EventStatus === 'CANC' ? true : false;
        this.cancelFlagDataTemp = data.EventStatus === 'CANC' ? true : false;
        this.offschModel.agyLocId=data.ToAgyLocId;
        this.offschModel.recordSource = data.RecordSource;
        this.offschModeTemp = JSON.parse(JSON.stringify(this.offschModel));
       
        if (this.cancelFlagData === true) {
          this.readonlyScheduleReason = true
          this.readonlyStartDate = true;
          this.readonlyStartTime = true;
          this.readonlyToLoaction = true;
          this.readonlyCancelReason = true;
          this.readonlyComment = true;
          this.readonlyCancelFlag = true;
          this.readonlyDelete = true;
        }
      }, 1000);
      this.scheduleReadOnly = false;
      this.movementType = 'IAPP';
      this.heading = this.translateService.translate('calsch.updateschedule');
      const event = { added: [], updated: [], removed: [] };
      this.offschUpdateList.push(this.offschModel);
      event.updated = this.offschUpdateList;
  
    } 
    else if(data.EventType === 'CRT') { 
      this.heading = this.translateService.translate('calsch.updateschedule');
      this.courtEventsFalg=false;
      this.isUpdateReadOnly=true;
      this.movementType = 'CRT';
      this.courtEventEdit=true;
      this.courtEvents.eventStatus = data.EventStatus;
      this.courtEvents.appearanceLocation = data.AppearanceLocation;
      this.courtEvents.appearanceType = data.AppearanceType;
      this.courtEvents.hearingReason = data.EventSubType;
      this.courtEvents.court = data.ToAgyLocId;
      this.courtEvents.eventOutcome = data.EventOutCome;
      this.courtEvents.commentText=data.Comment;
      this.courtEvents.eventDate=data.EventDate;
      this.courtEvents.startTime=data.StartTime;
      this.courtEvents.eventId=data.EventId;
      this.courtEvents.matter=data.Matter;
      this.courtEvents.outcomeReasonCode=data.CancelReason;
      this.courtEvents.linkData = data.LinkData;
      this.courtEvents.cancelFlag = ( data.EventStatus === 'CANC') ? true : false;
    }
    else {
      this.movementType = 'COMM';
      if(data.EventOutCome){
        this.isEventOutComeSelected = true;
      }
     
      this.heading = this.translateService.translate('calsch.updateschedule');
      this.scheduleSubTypeApi = 'calsch/rgScheduleSubTypeRecordGroup?eventType=' + data.EventType;

      if (passedObj.isSeriesEdit) {
        this.isSeries = true;
        this.isSeriesEnable = true;
        this.startDateReadOnly = true;
      } 
      else {
        this.isSeries = false;
        this.isSeriesEnable = false;
        this.startDateReadOnly = false;
      }
      
      if (data.SeriesId) {
        this.seriesDisableFlag = true;
        this.getScheduleSeries(data,passedObj);
      }
      else{
        this.proceedToEditSchedule(passedObj,data);
      }
    }

    if(this.movementType === 'DTE'){
      this.getActiveTierEvent();
    }

  }

  typeChange(event) {
    if (event && event.code && this.add) {
      this.scheduleSubTypeApi = 'calsch/rgScheduleSubTypeRecordGroup?eventType=' + event.code;
      this.schedule.subType = null;
    }
  }

  proceedToEditSchedule(passedObj, data) {
    let tempStartDate = passedObj.isSeriesEdit ? (DateFormat.compareDate(DateFormat.getDate(this.scheduleTempData.startDate), DateFormat.getDate()) < 0 ? DateFormat.getDate() : DateFormat.getDate(this.scheduleTempData.startDate)) : DateFormat.getDate(data.StartTime);
    this.schedule = {
      type: data.EventType,
      subType: data.EventSubType,
      startDate: DateFormat.getDate(DateFormat.getDate(tempStartDate).setHours(0, 0, 0, 0)),
      startTime: DateFormat.getDate(data.StartTime),
      endTime: data.ActualEndTime ? DateFormat.getDate(data.ActualEndTime) : null,
      location: data.ToAgyLocId,
      commentText: data.Description,
      staffName: data.InChargeStaffName,
      emailFlag: data.EmailFlag === 'Y' ? true : false,
      smsFlag: data.SmsFlag === 'Y' ? true : false,
      nonAssociationFlag: false,
      emailScheduleHrsBefore: data.EmailScheduleHoursBefore,
      smsScheduleHrsBefore: data.SmsScheduleHoursBefore,
      seriesId: data.SeriesId,
      eventId: data.EventId,
    }
    this.scheduleTemp = JSON.parse(JSON.stringify(this.schedule));
    this.deleteFlag = false;
    this.saveBtnDisable = false;
  }

  subTypeChange(event) {
    if (event) {
      const payLoad = {};
      payLoad['eventType'] = this.schedule.type;
      payLoad['eventSubType'] = this.schedule.subType;
      payLoad['offenderBookId'] = this.dialog.data.offenderBookId;
      const serviceObj = this.addEditScheduleService.getEmailSmsFlag(payLoad);
      serviceObj.subscribe(data => {
        if (data.length > 0) {
          data.forEach(ele => {
            if (ele.emailFlag === 'Y') {
              this.emailFlag = true;
              if(this.add){
                this.schedule.emailFlag = true;
              }
            } else {
              this.emailFlag = false;
              if(this.add){
                this.schedule.emailFlag = false;
              }
            }
            if (ele.smsFlag === 'Y') {
              this.smsFlag = true;
              if(this.add){
                this.schedule.smsFlag = true;
              }
            } else {
              this.smsFlag = false;
              if(this.add){
                this.schedule.smsFlag = false;
              }
            }
            if (ele.nonAssociationFlag === 'Y') {
              this.nonAssociationFlag = true;
              if(this.add){
                this.schedule.nonAssociationFlag = true;
              } 
            } else {
              this.nonAssociationFlag = false;
              if(this.add){
                this.schedule.nonAssociationFlag = false;
              }
            }
              this.emailAddressCount = ele.emailAddressCount;
              this.phoneNumberCount = ele.phoneNumberCount;
          });
        }
      });
    }
  }

  locationChange() { }


  show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
  }



  cancel(): void {
    this.dialog.close(null);
  }


  deleteSchedule() {
    this.deleteFlag = true;
    if(this.isEventOutComeSelected){
      this.type = 'warn';
			this.message = this.translateService.translate('common.youcannotdeletethisrecord');
			this.show();
      this.deleteFlag = false;
      return;
    }else if(DateFormat.compareDate(DateFormat.getDate(this.schedule.startDate),DateFormat.getDate()) < 0){
      this.type = 'warn';
			this.message = this.translateService.translate('common.youcannotdeletethisrecord');
			this.show();
      this.deleteFlag = false;
      return;
    }
    this.offschCommitModel.insertList = [];
    this.offschCommitModel.updateList = [];
    this.offschCommitModel.deleteList = [];
    this.offschDeleteList = [];
    this.offschModel = new VOffenderAllSchedules();
    this.offschModel.offenderBookId = this.dialog.data.offenderBookId;
    this.offschModel.eventDate = this.schedule.startDate;
    this.offschModel.eventDate = DateFormat.getDate(DateFormat.getDate(this.offschModel.eventDate).setHours(0,0,0,0));
    this.type = "success";
    this.message = this.translateService.translate('calsch.scheduledeletesuccess');
    if (this.schedule.seriesId) {
      const modelData = {
        label: this.translateService.translate('calsch.doyouwantdeleteentireseries')
        , yesBtn: true, noBtn: true,cancelBtn : true, yesLabel: this.translateService.translate('calsch.deleteonlythisschedule'), noLabel: this.translateService.translate('calsch.deleteentireseries')
      };
      this.dialogService.openLinkDialog('/ocucoffeconfirmbox', modelData, 50).subscribe(result => {
        if (result) {
          this.schedule['deleteEntireSeries'] = false;
          this.offschModel.seriesId = undefined;
          this.offschModel.eventId = this.schedule.eventId;
        }else if(result == null){
          this.deleteFlag = false;
					return;
				}  else {
          this.schedule['deleteEntireSeries'] = true;
          this.offschModel.seriesId = this.schedule.seriesId;
          this.offschModel.eventId = undefined;
        }
        this.offschDeleteList.push(this.offschModel);
        this.offschCommitModel.deleteList = this.offschDeleteList;
        this.saveRecurrSchedule(this.offschCommitModel);
      });
    } else {
      this.offschModel.seriesId = undefined;
      this.offschModel.eventId = this.schedule.eventId;
      this.offschDeleteList.push(this.offschModel);
      this.offschCommitModel.deleteList = this.offschDeleteList;
      this.saveRecurrSchedule(this.offschCommitModel);
    }
  }

  checkValidation(dateTime1, dateTime2) {
    let type = this.schedule.type;
    let subType = this.schedule.subType;
    let location = this.schedule.location;
    this.type = 'warn';
    if (type == null || type == undefined) {
      this.message = this.translateService.translate('calsch.pleaseselecttype');
      this.show();
      return false;
    }
    else if (subType == null || subType == undefined) {
      this.message = this.translateService.translate('calsch.pleaseselectsubtype');
      this.show();
      return false;
    } else if (!this.schedule.startDate) {
      this.message = this.translateService.translate('calsch.startdatemustbeentered');
      this.show();
      return false;
    } else if (!this.schedule.startTime) {
      this.message = this.translateService.translate('calsch.starttimemustbeentered');
      this.show();
      return false;
    }else if (location == null || location == undefined) {
      this.message = this.translateService.translate('calsch.pleaseselecttolocation');
      this.show();
      return false;
    } 
    
    if (this.schedule.emailFlag) {
      if (this.emailAddressCount === 0 || !this.emailAddressCount) {
        this.message = this.translateService.translate('calsch.offendderdoesnthaveemailconfiguration');
        this.show();
        return false;
      } else if (!this.schedule.emailScheduleHrsBefore) {
        this.message = this.translateService.translate('calsch.emailScheduleHrsBeforemust');
        this.show();
        return false;
      }
    } 
    if (this.schedule.smsFlag) {
      if (this.phoneNumberCount === 0 || !this.phoneNumberCount) {
        this.message = this.translateService.translate('calsch.offendderdoesnthavephonenumberconfiguration');
        this.show();
        return false;
      } else if (!this.schedule.smsScheduleHrsBefore) {
        this.message = this.translateService.translate('calsch.smsScheduleHrsBeforemust');
        this.show();
        return false;
      }
    }

    if(dateTime1 && dateTime2){
      if (DateFormat.compareDate(dateTime1, dateTime2) == 0) {
        let h1 = dateTime1.getHours();
        let h2 = dateTime2.getHours();
        let m1 = dateTime1.getMinutes();
        let m2 = dateTime2.getMinutes();
        if (h1 > h2) {
          this.message = this.translateService.translate('calsch.endtimeshouldgreaterthanstarttime');
          this.show();
          return false;
        }
        else if (h1 == h2 && (m1 > m2 || m1 == m2)) {
          this.message = this.translateService.translate('calsch.endtimeshouldgreaterthanstarttime');
          this.show();
          return false;
        }
      }
    }
    
    return true;
  }


  handleChange(evt) {
    this.FREQ = evt.toLowerCase();
    if (evt.toLowerCase() == "daily") {
      this.daily = true;
      this.monthly = false;
      this.weekly = false;
      this.intervalLabelName = 'Daily';
    }
    else if (evt.toLowerCase() == "weekly") {
      this.daily = false;
      this.monthly = false;
      this.weekly = true;
      this.intervalLabelName = 'Weekly';
    }
    else if (evt.toLowerCase() == "monthly") {
      this.daily = false;
      this.monthly = true;
      this.weekly = false;
      this.intervalLabelName = 'Monthly';
    }
  }


  onSelectEnd(ev) {
    if (ev) {
      if (ev.code == "never") {
        this.until = false;
        this.totalcount = false;
      }
      else if (ev.code == "until") {
        this.selectedTotalCount = 0;
        this.selectedEndDate = undefined;
        this.until = true;
        this.totalcount = false;
      } else if (ev.code == "totalcount") {
        this.selectedTotalCount = 0;
        this.selectedEndDate = new Date();
        this.totalcount = true;
        this.until = false;
      }
    } else {
      this.until = false;
      this.totalcount = false;
    }
  }

  saveSchedule() {

    this.saveBtnDisable = true;
    let type = this.schedule.type;
    let subType = this.schedule.subType;
    let commentText = this.schedule.commentText;
    let staffName = this.schedule.staffName;
    let location = this.schedule.location;
    let startDate = this.schedule.startDate;
    let startTime = this.schedule.startTime;
    let endDate;
    let endTime;
    if(this.schedule.endTime){
       endDate = this.schedule.startDate;
       endTime = this.schedule.endTime;
    }
    let startT =undefined;
    let endT =undefined;
    // setting startTime
    if(startDate){
      let startDay = startDate.getDate();
      let startMonth = startDate.getMonth();
      let startYear = startDate.getFullYear();
      let newDate1 = new Date()
      newDate1.setTime(startTime);
      let startHour = newDate1.getHours();
      let startMin = newDate1.getMinutes();
       startT = new Date(startYear, startMonth, startDay, startHour, startMin);
    }

    // setting endTime
    if(endDate){
      let endDay = endDate.getDate();
      let endMonth = endDate.getMonth();
      let endYear = endDate.getFullYear();
      let newDate2 = new Date()
      newDate2.setTime(endTime);
      let endHour = newDate2.getHours();
      let endMin = newDate2.getMinutes();
       endT = new Date(endYear, endMonth, endDay, endHour, endMin);
    }

    if (!this.checkValidation(startT, endT)) {
      this.saveBtnDisable = false;
      return;
    }


    if ((this.isSeries == true) && (!this.recurringValidation())) {
      this.saveBtnDisable = false;
      return;
    }

    // Api calling for add and update will start from here

    // By default taking id between 0 to 1000 for case of add operation
    let id = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;
    this.message = this.translateService.translate('calsch.schedulesavesuccess');

    if (!this.add) { // update operation
      id = this.dialog.data.data.Id;
      this.message = this.translateService.translate('calsch.scheduleupdatesuccess');
    }


    let obj = {
      Id: id,
      Subject: type,
      subType: subType,
      Location: location,
      StartTime: startT,
      EndTime: endT,
      CategoryColor: '#1aaa55',
      Description: commentText,
      staffName: staffName,
      endDate: this.until ? DateFormat.getDate(this.selectedEndDate) : null,
      startDate: DateFormat.getDate(this.schedule.startDate),
      excludeHoliday: this.excludeFlag ? 'Y' : 'N',
      repeatFrequency: this.interval,
      repeatType: this.FREQ.toUpperCase(),
      repeatOn: '',
      totalcount: this.selectedTotalCount === 0 ? null : this.selectedTotalCount,
      startTime: this.schedule.startTime,
      endTime: this.schedule.endTime,
      StartDate: DateFormat.getDate(this.schedule.startDate),
      eventId: this.schedule.eventId,
      seriesId: this.schedule.seriesId
    }


    if (this.add) {
      this.addSchedule(obj);
    } else {
      this.updateSchedule(obj);
    }
  }
  addSchedule(obj) {
    if (this.isSeries == true) {
      let RecurrenceRule = {};
      RecurrenceRule['FREQ'] = this.FREQ.toUpperCase();
      RecurrenceRule['INTERVAL'] = this.interval;
      let value = [];
      for (let i = 0; i < this.weekCollection.length; i++) {
        if (!!this.weekCollection[i].checked) {
          value.push(this.weekCollection[i].value)
        }
      }
      RecurrenceRule['BYDAY'] = value;
      if (this.monthly == true) {
        RecurrenceRule['BYMONTHDAY'] = this.selectedMonthDay;
      }
      if (this.selectedEnd.toUpperCase() == "UNTIL") {
        RecurrenceRule['UNTIL'] = DateFormat.getDate(this.selectedEndDate);
      }
      if (this.selectedEnd.toUpperCase() == "TOTALCOUNT") {
        RecurrenceRule['COUNT'] = this.selectedTotalCount;
      }
      obj["RecurrenceRule"] = JSON.stringify(RecurrenceRule);
      obj["uiRules"] = JSON.stringify(RecurrenceRule);

      //Calculate Schdules
      this.calculateSchedules(obj, this.selectedEnd.toUpperCase());
    } else {
      this.offschInsertList = [];
      this.offschModel = new VOffenderAllSchedules();
      this.offschModel.offenderBookId = this.dialog.data.offenderBookId;
      this.offschModel.eventStatus = 'SCH';
      this.offschModel.eventType = this.schedule.type;
      this.offschModel.eventSubType = this.schedule.subType;
      this.offschModel.eventDate = DateFormat.getDate(this.schedule.startDate);
      this.offschModel.eventDate = DateFormat.getDate(DateFormat.getDate(this.offschModel.eventDate).setHours(0,0,0,0));
      this.offschModel.startTime = DateFormat.getDate(this.schedule.startTime);
      this.offschModel.startTime = DateFormat.getDate(DateFormat.getDate(this.offschModel.startTime).setFullYear(DateFormat.getDate(this.offschModel.eventDate).getFullYear(),DateFormat.getDate(this.offschModel.eventDate).getMonth(),DateFormat.getDate(this.offschModel.eventDate).getDate()));

      /*this.offschModel.startTime = DateFormat.getDate(DateFormat.getDate(this.offschModel.startTime).setDate(DateFormat.getDate(this.offschModel.eventDate).getDate()));
      this.offschModel.startTime = DateFormat.getDate(DateFormat.getDate(this.offschModel.startTime).setMonth(DateFormat.getDate(this.offschModel.eventDate).getMonth()));
      this.offschModel.startTime = DateFormat.getDate(DateFormat.getDate(this.offschModel.startTime).setFullYear(DateFormat.getDate(this.offschModel.eventDate).getFullYear()));*/
      this.offschModel.eventClass = 'COMM';
      if (this.schedule.endTime) {
        this.offschModel.endTime = DateFormat.getDate(this.schedule.endTime);
        this.offschModel.endTime = DateFormat.getDate(DateFormat.getDate(this.offschModel.endTime).setFullYear(DateFormat.getDate(this.offschModel.eventDate).getFullYear(),DateFormat.getDate(this.offschModel.eventDate).getMonth(),DateFormat.getDate(this.offschModel.eventDate).getDate()));

        /*this.offschModel.endTime = DateFormat.getDate(DateFormat.getDate(this.offschModel.endTime).setDate(DateFormat.getDate(this.offschModel.eventDate).getDate()));
        this.offschModel.endTime = DateFormat.getDate(DateFormat.getDate(this.offschModel.endTime).setMonth(DateFormat.getDate(this.offschModel.eventDate).getMonth()));
        this.offschModel.endTime = DateFormat.getDate(DateFormat.getDate(this.offschModel.endTime).setFullYear(DateFormat.getDate(this.offschModel.eventDate).getFullYear()));*/
      } else {
        this.offschModel.endTime = null;
      }
      this.offschModel.toAgyLocId = this.schedule.location;
      this.offschModel.emailFlag = this.schedule.emailFlag ? 'Y' : 'N';
      this.offschModel.smsFlag = this.schedule.smsFlag ? 'Y' : 'N';
      this.offschModel.emailSentFlag = 'N';
      this.offschModel.smsSentFlag = 'N';
      this.offschModel.nonAssociationFlag = this.nonAssociationFlag ? 'Y' : 'N';
      this.offschModel.commentText = this.schedule.commentText;
      this.offschModel.inChargeStaffName = this.schedule.staffName;
      this.offschModel.emailScheduleHoursBefore = this.schedule.emailScheduleHrsBefore;
      this.offschModel.smsScheduleHoursBefore = this.schedule.smsScheduleHrsBefore;
      this.offschModel.recordSource = 'SCH';
      this.offschModel.eventId = this.schedule.eventId;
      this.seriesModel = new ScheduleSeries();
      this.seriesModel.uiRules = null;
      this.offschInsertList.push(this.offschModel);
      const event = { added: [], updated: [], removed: [] };
      event.added = this.offschInsertList;
      this.getScheduleConflicts(event);
    }
  }

  updateSchedule(obj) {
    this.offschInsertList = [];
    this.offschUpdateList = [];

    this.offschModel = new VOffenderAllSchedules();
    this.offschModel.offenderBookId = this.dialog.data.offenderBookId;
    this.offschModel.eventStatus = 'SCH';
    this.offschModel.eventType = this.schedule.type;
    this.offschModel.eventSubType = this.schedule.subType;
    this.offschModel.eventDate = DateFormat.getDate(this.schedule.startDate);
    this.offschModel.eventDate = DateFormat.getDate(DateFormat.getDate(this.offschModel.eventDate).setHours(0,0,0,0));
    this.offschModel.startTime = DateFormat.getDate(DateFormat.getDate(this.schedule.startTime).setFullYear(DateFormat.getDate(this.offschModel.eventDate).getFullYear(),DateFormat.getDate(this.offschModel.eventDate).getMonth(),DateFormat.getDate(this.offschModel.eventDate).getDate()));

   /* this.offschModel.startTime = DateFormat.getDate(DateFormat.getDate(this.offschModel.startTime).setDate(DateFormat.getDate(this.offschModel.eventDate).getDate()));
    this.offschModel.startTime = DateFormat.getDate(DateFormat.getDate(this.offschModel.startTime).setMonth(DateFormat.getDate(this.offschModel.eventDate).getMonth()));
    this.offschModel.startTime = DateFormat.getDate(DateFormat.getDate(this.offschModel.startTime).setFullYear(DateFormat.getDate(this.offschModel.eventDate).getFullYear()));*/

    this.offschModel.eventClass = 'COMM';
    if (this.schedule.endTime) {
      this.offschModel.endTime = DateFormat.getDate(this.schedule.endTime);
      this.offschModel.endTime = DateFormat.getDate(DateFormat.getDate(this.schedule.endTime).setFullYear(DateFormat.getDate(this.offschModel.eventDate).getFullYear(),DateFormat.getDate(this.offschModel.eventDate).getMonth(),DateFormat.getDate(this.offschModel.eventDate).getDate()));

      /*this.offschModel.endTime = DateFormat.getDate(DateFormat.getDate(this.offschModel.endTime).setDate(DateFormat.getDate(this.offschModel.eventDate).getDate()));
      this.offschModel.endTime = DateFormat.getDate(DateFormat.getDate(this.offschModel.endTime).setMonth(DateFormat.getDate(this.offschModel.eventDate).getMonth()));
      this.offschModel.endTime = DateFormat.getDate(DateFormat.getDate(this.offschModel.endTime).setFullYear(DateFormat.getDate(this.offschModel.eventDate).getFullYear()));*/
    } else {
      this.offschModel.endTime = null;
    }
    this.offschModel.toAgyLocId = this.schedule.location;
    this.offschModel.emailFlag = this.schedule.emailFlag ? 'Y' : 'N';
    this.offschModel.smsFlag = this.schedule.smsFlag ? 'Y' : 'N';
    this.offschModel.emailSentFlag = 'N';
    this.offschModel.smsSentFlag = 'N';
    this.offschModel.nonAssociationFlag = this.nonAssociationFlag ? 'Y' : 'N';
    this.offschModel.commentText = this.schedule.commentText;
    this.offschModel.inChargeStaffName = this.schedule.staffName;
    this.offschModel.emailScheduleHoursBefore = this.schedule.emailScheduleHrsBefore;
    this.offschModel.smsScheduleHoursBefore = this.schedule.smsScheduleHrsBefore;
    this.offschModel.recordSource = 'SCH';
    this.offschModel.eventId = this.schedule.eventId;

    const event = { added: [], updated: [], removed: [] };
    if (this.isSeriesEnable) {
      this.addSchedule(obj);
    } else {
      this.seriesModel = new ScheduleSeries();
      this.seriesModel.uiRules = null;
      this.offschUpdateList.push(this.offschModel);
      event.updated = this.offschUpdateList;
      this.getScheduleConflicts(event);
    }
  }


  trackByIndex(index: number, obj: any): any {
    return index;
  }

  recurringValidation() {

    if (this.interval < 1) {
      this.message = this.translateService.translate('calsch.repeateverycannotbelessthanone');
      this.show();
      return false;
    }

    if (!this.selectedEnd) {
      this.message = this.translateService.translate('calsch.rangeofrecurrencemustbeentered');
      this.show();
      return false;
    }

    if (this.selectedEnd == "until") {
      if (!this.selectedEndDate) {
        this.message = this.translateService.translate('calsch.untildatemustbeentered');
        this.show();
        return false;
      } else if (DateFormat.compareDate(DateFormat.getDate(this.selectedEndDate), DateFormat.getDate(this.schedule.startDate)) == -1) {
        this.message = this.translateService.translate('calsch.untildatecantlessthanschstartdate');
        this.show();
        return false;
      }
    }

    if (this.selectedEnd == "totalcount") {
      if (!this.selectedTotalCount) {
        this.message = this.translateService.translate('calsch.totalcountmustbeentered');
        this.show();
        return false;
      } else if (this.selectedTotalCount == 0) {
        this.message = this.translateService.translate('calsch.totalcountgreaterthanzero');
        this.show();
        return false;
      }
    }


    if (this.FREQ == "weekly") {
      let checked = false;
      for (let i = 0; i < this.weekCollection.length; i++) {
        if (this.weekCollection[i].checked && this.weekCollection[i].checked == true) {
          checked = this.weekCollection[i].checked;
          continue;
        }
      }
      if (checked == false) {
        this.message = this.translateService.translate('calsch.pleaseselectatleastoneweekday');
        this.show();
        return false;
      }
    }

    return true;
  }
  calculateSchedules(event, selectedEnd) {
    const serviceObj = this.addEditScheduleService.calculateSchedules(event);
    serviceObj.subscribe(data => {
      if (data && data.length > 0) {
        this.offschInsertList = [];
        this.offschUpdateList = [];
        data.forEach(e => {
          this.prepareSchInsertList(event, e);
        });
        this.seriesModel = new ScheduleSeries();
        this.seriesModel = event;
        this.seriesModel.active = 'Y';
        this.seriesModel.uiRules = event.RecurrenceRule;
        this.seriesModel.startTime = event.StartTime;
        this.seriesModel.endTime = this.seriesModel.endDate;
        const event1 = { added: [], updated: [], removed: [] };
        event1.added = this.offschInsertList;
        this.getScheduleConflicts(event1);
      } else {
        this.type = "warn";
        this.message = this.translateService.translate('calsch.noschedulesarecreatedforgivendetails');
        this.show();
        this.saveBtnDisable = false;
        return;
      }
    });
  }

  getScheduleConflicts(event) {
    let noConflictsList = [];
    if (event.added.length > 0) {
      noConflictsList = event.added;
    } else {
      noConflictsList = event.updated;
    }
    const conflictObj = this.addEditScheduleService.getScheduleConflicts(noConflictsList);
    conflictObj.subscribe(data => {
      if (data && data.length > 0) {
        let proceedBtnDisabled = (data.length === noConflictsList.length);
        let dailogData = { data: data, moduelName: 'CALSCH',proceedBtnDisabled : proceedBtnDisabled };
        this.dialogService.openLinkDialog('/oiuscinq', dailogData).subscribe(result => {

          if (result && result === 'WITH_NO_CONFLICTS') {
            data.forEach(e => {
              noConflictsList = noConflictsList.filter(obj => DateFormat.compareDate(DateFormat.getDate(obj.eventDate), DateFormat.getDate(e.eventDate)) != 0);
            });
            if (event.added.length > 0) {
              event.added = noConflictsList;
            } else {
              event.updated = noConflictsList;
            }
          } else if (!result) {
            this.saveBtnDisable = false;
            return;
          }
          if (event.added.length > 0 || event.updated.length > 0) {
            this.checkNonAssociations(event);
          } else {
            this.saveBtnDisable = false;
            return;
          }
        });
      } else {
        this.checkNonAssociations(event);
      }
    });
  }

  checkNonAssociations(event) {
    this.offschCommitModel.insertList = [];
    this.offschCommitModel.updateList = [];
    this.offschCommitModel.deleteList = [];
    this.offschCommitModel.seriesInsertList = new ScheduleSeries();
    this.offschCommitModel.insertList = event.added;
    this.offschCommitModel.updateList = event.updated;
    this.offschCommitModel.seriesInsertList = this.seriesModel;
    this.message = this.translateService.translate('calsch.schedulesavesuccess');
    const offschConflictData = this.addEditScheduleService.checkNonAssociationConflicts(this.offschCommitModel);
    offschConflictData.subscribe(data => {
      if (data && data.nonAssConflictMsg != 'EMPTYDATA') {
        let proceedBtnDisabled = false;
        if(data.insertList && data.insertList.length > 0){
          let tempData = data.insertList.filter(o => o.nonAssociationFlag === 'Y');
          if(tempData != null && tempData.length === data.insertList.length){
            proceedBtnDisabled = true;
          }
        }
        if(data.updateList && data.updateList.length > 0){
          let tempData = data.updateList.filter(o => o.nonAssociationFlag === 'Y');
          if(tempData != null && tempData.length === data.updateList.length){
            proceedBtnDisabled = true;
          }
        }
        const msgOne = this.translateService.translate('ocdclogs.nonassociationconflictmsg');
        const msgTwo = this.translateService.translate('ocdclogs.doyouwanttocontinue');
        data.nonAssConflictMsg = data.nonAssConflictMsg.replace('ocdclogs.nonassociationconflictmsg', msgOne);
        data.nonAssConflictMsg = data.nonAssConflictMsg.replace('ocdclogs.doyouwanttocontinue', msgTwo);
        const labelMsg = {
          label: this.translateService.translate(data.nonAssConflictMsg), yesBtn: true, proceedWithNoConflictsBtn: true,cancelBtn:true,
          proceedWithNoConflictsNoLabel:this.translateService.translate('calsch.proceedwithnoconlflicts'),proceedBtnDisabled: proceedBtnDisabled
        };
        this.dialogService.openLinkDialog('/OCUNAWRN', labelMsg, 50).subscribe(result => {
          if (result && result === 'WITH_NO_CONFLICTS') {
            if(this.offschCommitModel.insertList && this.offschCommitModel.insertList.length > 0){
              let withNoCflctInsrtLst = data.insertList.filter(e => e.nonAssociationFlag === 'N');
              this.offschCommitModel.insertList = [];
              this.offschCommitModel.insertList = withNoCflctInsrtLst;
            }
            if(this.offschCommitModel.updateList && this.offschCommitModel.updateList.length > 0){
              let withNoCflctUpdtLst = data.updateList.filter(e => e.nonAssociationFlag === 'N');
              this.offschCommitModel.updateList = [];
              this.offschCommitModel.updateList = withNoCflctUpdtLst;
            }
          } else if (!result) {
            this.saveBtnDisable = false;
            return;
          }
          this.saveRecurrSchedule(this.offschCommitModel);
        });
      } else {
        this.saveRecurrSchedule(this.offschCommitModel);
      }
    });
  }



  saveRecurrSchedule(event) {
    const serviceObj = this.addEditScheduleService.saveRecurrSchedule(event);
    serviceObj.subscribe(data => {
      if (data === 1) {
        this.type = "success";
        this.message = this.translateService.translate('calsch.schedulesavesuccess');
        this.show();
        this.dialog.close(null);
      } else {
        this.type = "warn";
        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
        this.show();
      }
    });
  }

  prepareSchInsertList(event, eventDate) {
    this.offschModel = new VOffenderAllSchedules();
    this.offschModel.offenderBookId = this.dialog.data.offenderBookId;
    this.offschModel.eventStatus = 'SCH';
    this.offschModel.eventType = event.Subject;
    this.offschModel.eventSubType = event.subType;
    this.offschModel.eventDate = eventDate;
    this.offschModel.eventDate = DateFormat.getDate(DateFormat.getDate(this.offschModel.eventDate).setHours(0,0,0,0));
    this.offschModel.startTime = DateFormat.getDate(event.startTime);
    this.offschModel.startTime = DateFormat.getDate(DateFormat.getDate(this.offschModel.startTime).setFullYear(DateFormat.getDate(this.offschModel.eventDate).getFullYear(),DateFormat.getDate(this.offschModel.eventDate).getMonth(),DateFormat.getDate(this.offschModel.eventDate).getDate()));
    /*this.offschModel.startTime = DateFormat.getDate(DateFormat.getDate(this.offschModel.startTime).setDate(DateFormat.getDate(this.offschModel.eventDate).getDate()));
    this.offschModel.startTime = DateFormat.getDate(DateFormat.getDate(this.offschModel.startTime).setMonth(DateFormat.getDate(this.offschModel.eventDate).getMonth()));
    this.offschModel.startTime = DateFormat.getDate(DateFormat.getDate(this.offschModel.startTime).setFullYear(DateFormat.getDate(this.offschModel.eventDate).getFullYear()));*/
    this.offschModel.eventClass = 'COMM';
    if (this.schedule.endTime) {
      this.offschModel.endTime = DateFormat.getDate(this.schedule.endTime);
      this.offschModel.endTime = DateFormat.getDate(DateFormat.getDate(this.offschModel.endTime).setFullYear(DateFormat.getDate(this.offschModel.eventDate).getFullYear(),DateFormat.getDate(this.offschModel.eventDate).getMonth(),DateFormat.getDate(this.offschModel.eventDate).getDate()));
      /*this.offschModel.endTime = DateFormat.getDate(DateFormat.getDate(this.offschModel.endTime).setDate(DateFormat.getDate(this.offschModel.eventDate).getDate()));
      this.offschModel.endTime = DateFormat.getDate(DateFormat.getDate(this.offschModel.endTime).setMonth(DateFormat.getDate(this.offschModel.eventDate).getMonth()));
      this.offschModel.endTime = DateFormat.getDate(DateFormat.getDate(this.offschModel.endTime).setFullYear(DateFormat.getDate(this.offschModel.eventDate).getFullYear()));*/
    } else {
      this.offschModel.endTime = null;
    }
    this.offschModel.toAgyLocId = this.schedule.location;
    this.offschModel.emailFlag = this.schedule.emailFlag ? 'Y' : 'N';
    this.offschModel.smsFlag = this.schedule.smsFlag ? 'Y' : 'N';
    this.offschModel.emailSentFlag = 'N';
    this.offschModel.smsSentFlag = 'N';
    this.offschModel.emailScheduleHoursBefore = this.schedule.emailScheduleHrsBefore;
    this.offschModel.smsScheduleHoursBefore = this.schedule.smsScheduleHrsBefore;
    this.offschModel.nonAssociationFlag = this.nonAssociationFlag ? 'Y' : 'N';
    this.offschModel.commentText = event.Description;
    this.offschModel.inChargeStaffName = this.schedule.staffName;
    this.offschModel.seriesId = this.schedule.seriesId ? this.schedule.seriesId : null;
    this.offschModel.eventId = this.schedule.eventId;
    this.offschModel.recordSource = 'SCH';
    this.offschInsertList.push(this.offschModel);
  }

  onEmailSmsFlagChange(event, name) {
    if (name === 'emailFlag') {
      this.schedule.emailScheduleHrsBefore = undefined;
    } else if (name === 'smsFlag') {
      this.schedule.smsScheduleHrsBefore = undefined;
    }
  }

  onstaffNameClick = () => {
    let data = { eventType: this.schedule.type, agyLocId: this.schedule.location }
    if (!this.validateOpenOrNotScreen(data)) {
      return;
    } else {
      this.dialogService.openLinkDialog('/OCUAOFFI', data, 80).subscribe(res => {
        if (res && Object.keys(res).length > 0) {
          const staffName = res.lastName + ', ' + res.firstName;
          this.schedule.staffName = staffName;
        } else {
          this.schedule.staffName = undefined;
        }
      });
    }
  }

  validateOpenOrNotScreen = (event) => {
    if (event.eventOutcome) {
      if ((event.eventType === "CRT" || event.eventType === "INTAKE" || event.eventType === "CCASE" || event.eventType === "PACT")) {
        return true;
      } else {
        return false;
      }

    } else {
      if ((event.eventType === "CRT" || event.eventType === "INTAKE" || event.eventType === "CCASE" || event.eventType === "PACT"
        || event.eventType === "ACP" || event.eventType === "UW" || event.eventType === "DRR" || event.eventType === "SA")) {
        return false;
      } else {
        return true;
      }

    }
  }

  getScheduleSeries(obj,passedObj) {
    let mySchedule = JSON.stringify(obj);
    obj["seriesId"] = obj.SeriesId;
    const serviceObj = this.addEditScheduleService.getScheduleSeries(obj);
    serviceObj.subscribe(data => {
      if (data) {
        this.seriesDisableFlag = true;
        this.excludeFlag = data.excludeHoliday ==='Y' ? true : false;
        let weekCollectionTemp = this.weekCollection;
        this.weekCollection = [];
        data.days.forEach(e => {
          weekCollectionTemp.forEach(obj => {
            if (e === obj.value) {
              obj.checked = true;
            }
          });
        });
        this.weekCollection = weekCollectionTemp;
        if (data.totalcount) {
          this.selectedEnd = 'totalcount';
          this.until = false;
          this.totalcount = true;
          this.selectedTotalCount = data.totalcount;
        } else {
          this.selectedEndDate = data.endDate;
          this.selectedEnd = 'until';
        }
        this.interval = data.repeatFrequency;
        this.FREQ = String(data.repeatType).toLowerCase();
        if (this.FREQ === 'weekly') {
          this.weekly = true;
        } else {
          this.weekly = false;
          this.monthly = false;
        }
        this.scheduleTempData = data;
        this.proceedToEditSchedule(passedObj,JSON.parse(mySchedule));
      }
    });
  }

  movementTypeChange(event) {
    this.communitySchedule = false;
    this.defaultTierEventFlag = false;
    this.courtEventsFalg = false;
    if (event && event.code === 'COMM') {
      this.panelHeading = this.translateService.translate('calsch.panelheading');
      this.communitySchedule = true;
    }
    if (event && event.code === 'DTE') {
      this.defaultTierEventFlag = true;
      this.getActiveTierEvent();
    }
    if (event && event.code === 'IAPP') {
      this.appointmentHeading = this.translateService.translate('Schedule Details');
      // this.internalAppointment = true;
    }
    if (event && event.code === 'CRT') {
      this.panelHeadingForCRT = this.translateService.translate('calsch.panelheadingForCRT');
      this.courtEventsFalg = true;
      this.courtEvents.eventDate=this.dialog.data.data.startTime;
     this.courtEvents.startTime=this.dialog.data.data.startTime;
    }
  }

  movementTypeChangeEdit(event){
    if (event && event.code === 'CRT') {
      this.panelHeadingForCRT = this.translateService.translate('calsch.panelheadingForCRT');
      this.courtEventsFalg = false;
    }
  }

  displayParameterLabel(event){
    if(event === 'weekly'){
      return 'Weekly';
    }else if(event == 'daily'){
      return 'Daily';
    }else if(event == 'monthly'){
      return 'Monthly';
    }else{
      return '';
    }

  }


  //=============================================== Default Tier Events ===========================================================
  //Offender Tier lov
  getActiveTierEvent() {
    const obj = this.addEditScheduleService.getActiveTierEvent(this.dialog.data.offenderBookId);
    obj.subscribe(data => {
      if (data) {
        this.tierDefaultEvents.offenderBookId = this.dialog.data.offenderBookId;
        this.tierDefaultEvents.tierLevelcode = data.code;
        this.tierLevelCode = data.code;
        this.tierLevelCodeDesc = data.description;
        this.tierdefaultEvents();
      } else {
        this.tierDefaultEvents.tierLevelcode = undefined;
        this.tierLevelCode = undefined;
        this.tierLevelCodeDesc = undefined;
        this.tierdefaultEvents();
      }
    });
  }

  onEmailSmsFlagChangeOne(event, name) {
    if (name === 'emailFlag') {
      this.maintainDefSchedule.emailSchHoursBefore = undefined;
    } else if (name === 'smsFlag') {
      this.maintainDefSchedule.smsSchHoursBefore = undefined;
    }
  }

  codeCellEdit = (data: any, index: number, field: string): boolean => {
    if (this.editEntireSeriesBtn) {
      return true;
    } else {
      return false;
    }
  }
  //Offender Tier Row click
  onRowClickDefEvents(event) {
    if (event) {
      this.maintainDefSchedule = event;
      this.maintainDefSchedule.startDate = DateFormat.getDate(event.startDate);
      this.maintainDefSchedule.endTime = DateFormat.getDate(event.endTime);
      this.maintainDefSchedule.startTime = DateFormat.getDate(event.startTime);
      this.maintainTierLevelsTempOne = event;
    } else {
      this.maintainTierLevelsTempOne = new MaintainTierDefaultEvents();
      this.maintainDefSchedule = new MaintainTierDefaultEvents();
    }

     if (event.uiRules) {
         this.tempUiRules = JSON.parse(event.uiRules);
         var data = JSON.parse(event.uiRules);
         var freq = data.FREQ;
         if (freq) {
             this.handleChange(freq.toLowerCase());
         }
         if (data.UNTIL) {
             this.selectedEnd = 'until';
             this.selectedEndDate = DateFormat.getDate(data.UNTIL);
         }
         if (data.COUNT) {
             this.selectedEnd = 'totalcount';
             this.selectedTotalCount = Number(data.COUNT);
         }
 
         this.interval = data.INTERVAL;
         this.weekCollection.forEach(e => {
             var element = data.BYDAY;
             e.checked = false;
             if (element) {
                 element.forEach(d => {
                     if (d && e && d === e.value) {
                         e.checked = true;
                     }
                 });
             }
         });
     } else {
         this.maintainTierLevelsTemp = new MaintainTierDefaultEvents();
         this.interval = 1;
         this.selectedEndDate = DateFormat.getDate();
         this.weekCollection.forEach(e => {
             if (e.value) {
                 e.checked = false;
             }
         })
     } 
  }
  //Offender Tier Exceute query
  tierdefaultEvents() {
    const obj = this.addEditScheduleService.tierdefaultEventsExecuteQuery(this.tierDefaultEvents);
    obj.subscribe(data => {
      if (data.length > 0) {
        this.defEventsRowData = data;
        data.forEach((e, index) => {
          e.tierId = index;
        });
        this.defEventsRowData.forEach(e => {
          e.versionNo = e.tierEventSchVersionId;
          if (!e.startDate) {
            e.startDate = DateFormat.getDate(this.schedule.startDate);
          }
          if (!e.startTime) {
            e.startTime = DateFormat.getDate(this.schedule.startTime);
          }
          if (!e.endTime) {
            e.endTime = DateFormat.getDate(this.schedule.endTime);
          }
          e.isSeriesFalg = true;
          if (e.smsFlag === 'Y' || (e.smsFlag !== 'N' && e.smsFlag)) {
            e.validSmsFlag = false;
            e.smsFlag = true;
          } else {
            e.validSmsFlag = true;
            e.smsFlag = false;
          }

          if (e.emailFlag === 'Y' || (e.emailFlag !== 'N' &&  e.emailFlag)) {
            e.validEmailFlag = false;
            e.emailFlag = true;
          } else {
            e.validEmailFlag = true;
            e.emailFlag = false;
          }
        });

        this.defEventsRowDataTempData = JSON.parse(JSON.stringify(this.defEventsRowData));
        this.defEventsRowDataTemp = data;
        JSON.parse(JSON.stringify(this.defEventsRowDataTemp));
        this.selected = 0;
        //this.validate =  this.defEventsRowDataTemp[0].sealFlag;
      } else {
        this.defEventsRowDataTempData = [];
        this.defEventsRowData = [];
        this.interval = 1;
        this.selectedEndDate = DateFormat.getDate();
        this.weekCollection.forEach(e => {
          if (e.value) {
            e.checked = false;
          }
        });
        this.selected = -1;
        //this.validate = undefined;
        //this.handleChange('weekly');
      }
    });
  }


  get saveBtnDisableTwo() {
    if ((this.gridOne.updatedMap.size > 0) || (this.gridOne.addedMap.size > 0) || (this.gridOne.removedMap.size > 0)) {
      return false;
    } else {
      return true;
    }
  }

  //Offender Tier Validaterow 
  validateRowData = (event) => {
    const rowdata = new ValidateRowReturn();
    const rowIndex = event.rowIndex;
    if (event.field === 'scheduleType') {
      if (!event.data.scheduleType) {
        this.gridOne.setColumnData('scheduleSubType', rowIndex, undefined);
        rowdata.validated = true;
        return rowdata;
      }
    }
    rowdata.validated = true;
    return rowdata;
  }

  //Staff Names
  onstaffNameClickOne = () => {
    let data = { eventType: this.maintainDefSchedule.scheduleType, agyLocId: this.maintainDefSchedule.location }
    this.dialogService.openLinkDialog('/OCUAOFFI', data, 80).subscribe(res => {
      if (res && Object.keys(res).length > 0) {
        const staffName = res.lastName + ', ' + res.firstName;
        this.maintainDefSchedule.staffName = staffName;
      } else {
        this.maintainDefSchedule.staffName = undefined;
      }
    });
    //}
  }

  //Validation
  validateDefaultEvents(data: any) {
    const is = { valid: true }
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {

        if (!data[i].scheduleType) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocmtidet.scheduletypemustbeentered');
          this.show();
          return;
      }
      if (!data[i].scheduleSubType) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocmtidet.schedulesubtypemustbeentered');
          this.show();
          return;
      }
        if (!data[i].startDate) {
          this.type = 'warn';
          this.message = this.translateService.translate('calsch.startdatemustbeentered');
          this.show();
          is.valid = false;
          return is.valid;
        }

        if (!data[i].startTime) {
          this.type = 'warn';
          this.message = this.translateService.translate('calsch.starttimemustbeentered');
          this.show();
          is.valid = false;
          return is.valid;
        }

        if (data[i].startTime && data[i].endTime) {
          if (DateFormat.compareDateTime(data[i].startTime, data[i].endTime) === 1) {
            this.type = 'warn';
            this.message = this.translateService.translate('calsch.endtimeshouldgreaterthanstarttime');
            this.show();
            is.valid = false;
            return is.valid;
          }
        }

        if (data[i].emailFlag === 'Y' || (data[i].emailFlag !== 'N' && data[i].emailFlag)) {
          if (!data[i].emailSchHoursBefore || data[i].emailSchHoursBefore === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('calsch.emailScheduleHrsBeforemust');
            this.show();
            is.valid = false;
            return is.valid;
          } else if (data[i].emailAddressCount === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('calsch.offendderdoesnthaveemailconfiguration');
            this.show();
            is.valid = false;
            return is.valid;
          }
        }

        if (data[i].smsFlag === 'Y' || (data[i].smsFlag !== 'N' && data[i].smsFlag)) {
          if (!data[i].smsSchHoursBefore || data[i].smsSchHoursBefore === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('calsch.smsScheduleHrsBeforemust');
            this.show();
            is.valid = false;
            return is.valid;
          } else if (data[i].phoneNumberCount === 0) {
            this.message = this.translateService.translate('calsch.offendderdoesnthavephonenumberconfiguration');
            this.type = 'warn';
            this.show();
            is.valid = false;
            return is.valid;
          }
        }

        if (!data[i].location) {
          this.type = 'warn';
          this.message = this.translateService.translate('calsch.pleaseselecttolocation');
          this.show();
          is.valid = false;
          return is.valid;
        }

        if(data[i].isSeriesFalg === 'Y' || (data[i].isSeriesFalg !== 'N' &&  data[i].isSeriesFalg)){
          var uiData = JSON.parse(data[i].uiRules);
          if(uiData['UNTIL']){
            if(DateFormat.compareDate(DateFormat.getDate(uiData['UNTIL']),DateFormat.getDate(data[i].startDate)) === -1 ){
                this.type = 'warn';
                this.message = this.translateService.translate('Start date cannot be greater than Schedule End Date');
                this.show();
                is.valid = false;
                return;
            }
        }
        }


      }
    }
    return is.valid;
  }



  //Offender Tier Save
  saveScheduleEventDetails() {
    this.maintainTierLevelsCommitBean.insertTierDefEvents = [];
    this.defEventsRowDataTempDataFinal = [];
    this.defEventsRowDataTempDataSave = []
    if (this.defEventsRowDataTempData.length > 0) {
      this.defEventsRowDataTempDataSave = JSON.parse(JSON.stringify(this.defEventsRowData));
      for (let i = 0; i < this.defEventsRowDataTempData.length; i++) {
        if (JSON.stringify(this.defEventsRowData[i]) !== JSON.stringify(this.defEventsRowDataTempData[i])) {
          this.defEventsRowDataTempDataSave[i].tierLevelcode = this.tierLevelCode;
          this.defEventsRowDataTempDataSave[i].offenderBookId = this.dialog.data.offenderBookId;
          this.defEventsRowDataTempDataSave[i].emailFlag = this.defEventsRowData[i].emailFlag ? 'Y' : 'N';
          this.defEventsRowDataTempDataSave[i].smsFlag = this.defEventsRowData[i].smsFlag ? 'Y' : 'N';
          this.defEventsRowDataTempDataSave[i].isSeriesFalg = this.defEventsRowData[i].isSeriesFalg ? 'Y' : 'N';
          this.defEventsRowDataTempDataSave[i].excludeFlag = this.defEventsRowData[i].excludeFlag ? 'Y' : 'N';
          this.defEventsRowDataTempDataSave[i].startDate = this.defEventsRowData[i].startDate ? DateFormat.getDate(DateFormat.getDate(this.defEventsRowData[i].startDate).setHours(0, 0, 0, 0)) : undefined;
          this.defEventsRowDataTempDataSave[i].startTime = this.defEventsRowData[i].startTime ? DateFormat.getDate(this.defEventsRowData[i].startTime) : undefined;
          this.defEventsRowDataTempDataSave[i].endTime = this.defEventsRowData[i].endTime ? DateFormat.getDate(this.defEventsRowData[i].endTime) : undefined;
          //this.defEventsRowData[i].startTime = this.defEventsRowData[i].startTime ? DateFormat.getDate(this.defEventsRowData[i].startTime) : undefined;
          //this.defEventsRowData[i].endTime = this.defEventsRowData[i].endTime ? DateFormat.getDate(this.defEventsRowData[i].endTime) : undefined;
          if (this.defEventsRowDataTempDataSave[i].startTime) {
            this.defEventsRowDataTempDataSave[i].startTime = DateFormat.getDate(DateFormat.getDate(this.defEventsRowDataTempDataSave[i].startTime).setFullYear(DateFormat.getDate(this.defEventsRowDataTempDataSave[i].startDate).getFullYear(),
              DateFormat.getDate(this.defEventsRowDataTempDataSave[i].startDate).getMonth(), DateFormat.getDate(this.defEventsRowDataTempDataSave[i].startDate).getDate()));
          }
          if (this.defEventsRowDataTempDataSave[i].endTime) {
            this.defEventsRowDataTempDataSave[i].endTime = DateFormat.getDate(DateFormat.getDate(this.defEventsRowDataTempDataSave[i].endTime).setFullYear(DateFormat.getDate(this.defEventsRowDataTempDataSave[i].startDate).getFullYear(),
              DateFormat.getDate(this.defEventsRowDataTempDataSave[i].startDate).getMonth(), DateFormat.getDate(this.defEventsRowDataTempDataSave[i].startDate).getDate()));
          }
          this.defEventsRowDataTempDataFinal.push(this.defEventsRowDataTempDataSave[i]);
        }
      }
    }

    if (this.defEventsRowDataTempDataFinal.length > 0) {
      if (!this.validateDefaultEvents(this.defEventsRowDataTempDataFinal)) {
        return;
      }
      this.maintainTierLevelsCommitBean.insertTierDefEvents = this.defEventsRowDataTempDataFinal;
      const obj = this.addEditScheduleService.commitScheduledEventDetails(this.maintainTierLevelsCommitBean);
      obj.subscribe(data => {
        if (data === 1) {
          this.type = "success";
          this.message = this.translateService.translate('calsch.schedulesavesuccess');
          this.show();
          this.dialog.close(null);
        } else {
          this.type = "warn";
          this.message = this.translateService.translate('common.addupdateremoverecordfailed');
          this.show();
        }
      });
    }else{
      this.type = "warn";
      this.message = this.translateService.translate('No Data is modified To save.');
      this.show();
      return ;
    }
  }

  onSelectEndOne(ev) {
    let RecurrenceRule = {};
    if (ev) {
        if (this.maintainTierLevelsTempOne.uiRules) {
            var data = JSON.parse(this.maintainTierLevelsTempOne.uiRules);
            RecurrenceRule = data;
        }
        if (ev.code == "never") {
            this.until = false;
            this.totalcount = false;
        }
        else if (ev.code == "until") {
            this.selectedTotalCount = 0;
            this.selectedEndDate = new Date();
            this.until = true;
            this.totalcount = false;
            if (RecurrenceRule['COUNT']) {
                RecurrenceRule['COUNT'] = undefined;
            }
            if (RecurrenceRule['UNTIL']) {
                this.selectedEndDate = RecurrenceRule['UNTIL'];
            } else {
                RecurrenceRule['UNTIL'] = this.selectedEndDate;
            }
            var objData = JSON.stringify(RecurrenceRule);
           this.gridOne.setColumnData('uiRules', this.maintainTierLevelsTempOne.tierId, objData);
        } else if (ev.code == "totalcount") {
            if (RecurrenceRule['COUNT']) {
                this.selectedTotalCount = RecurrenceRule['COUNT'];
            } else {
                this.selectedTotalCount = 1;
            }
            this.totalcount = true;
            this.until = false;
            this.selectedEndDate = undefined;
            RecurrenceRule['COUNT'] = this.selectedTotalCount;
            if (RecurrenceRule['UNTIL']) {
                RecurrenceRule['UNTIL'] = undefined;
            }
            var objData = JSON.stringify(RecurrenceRule);
            this.gridOne.setColumnData('uiRules', this.maintainTierLevelsTempOne.tierId, objData);
        }

    } else {
        this.until = false;
        this.totalcount = false;
    }
}

//Delete Sch
  dTeDeleteSchedule() {
    this.defEventsRowDataTempDataFinal = [];
    this.defEventsRowDataTempDataFinal.push(this.maintainDefSchedule);
    this.maintainTierLevelsCommitBean.deleteTierDefEvents = this.defEventsRowDataTempDataFinal;
    this.commonSave( this.maintainTierLevelsCommitBean);
    this.defEventsRowDataTempDataFinal = [];
    this.maintainTierLevelsCommitBean = new MaintainTierLevelsCommitBean();
  }

  //Update Sch
  dTesaveSchedule(){
    this.defEventsRowDataTempDataFinal = [];
    this.defEventsRowDataTempDataFinal.push(JSON.parse(JSON.stringify(this.maintainDefSchedule)));
    for (let i = 0; i < this.defEventsRowDataTempDataFinal.length; i++) {
      this.defEventsRowDataTempDataFinal[i].emailFlag = this.defEventsRowDataTempDataFinal[i].emailFlag ? 'Y':'N';
      this.defEventsRowDataTempDataFinal[i].smsFlag = this.defEventsRowDataTempDataFinal[i].smsFlag ? 'Y':'N';
      this.defEventsRowDataTempDataFinal[i].offenderBookId = this.dialog.data.offenderBookId;
      this.defEventsRowDataTempDataFinal[i].offenderTierLevelId = this.tierDefaultEvents.offenderTierLevelId;

      if (this.defEventsRowDataTempDataFinal[i].startDate) {
        this.defEventsRowDataTempDataFinal[i].startDate = DateFormat.getDate(this.defEventsRowDataTempDataFinal[i].startDate);
      }
      if (this.defEventsRowDataTempDataFinal[i].startTime) {
        this.defEventsRowDataTempDataFinal[i].startTime = DateFormat.getDate(this.defEventsRowDataTempDataFinal[i].startTime);
      }
      if (this.defEventsRowDataTempDataFinal[i].endTime) {
        this.defEventsRowDataTempDataFinal[i].endTime = DateFormat.getDate(this.defEventsRowDataTempDataFinal[i].endTime);
      }
      if(this.defEventsRowDataTempDataFinal[i].startDate &&  this.defEventsRowDataTempDataFinal[i].startTime){
        this.defEventsRowDataTempDataFinal[i].startTime =  DateFormat.getDate(DateFormat.getDate(DateFormat.getDate(this.defEventsRowDataTempDataFinal[i].startDate).setHours( this.defEventsRowDataTempDataFinal[i].startTime.getHours(), this.defEventsRowDataTempDataFinal[i].startTime.getMinutes(),0,0)).setDate(this.defEventsRowDataTempDataFinal[i].startDate.getDate()));
      }

      if(this.defEventsRowDataTempDataFinal[i].startDate &&  this.defEventsRowDataTempDataFinal[i].endTime){
        this.defEventsRowDataTempDataFinal[i].endTime =  DateFormat.getDate(DateFormat.getDate(DateFormat.getDate(this.defEventsRowDataTempDataFinal[i].startDate).setHours( this.defEventsRowDataTempDataFinal[i].endTime.getHours(), this.defEventsRowDataTempDataFinal[i].endTime.getMinutes(),0,0)).setDate(this.defEventsRowDataTempDataFinal[i].startDate.getDate()));
      }
      this.defEventsRowDataTempDataFinal[i].tierLevelcode = this.tierLevelCode;
      this.defEventsRowDataTempDataFinal[i].versionNo = this.tierDefaultEvents.versionNo;
    }
    this.maintainTierLevelsCommitBean.updateTierDefEvents =  JSON.parse(JSON.stringify(this.defEventsRowDataTempDataFinal));
    if (!this.validateDefaultEvents(this.defEventsRowDataTempDataFinal)) {
      return;
    }
    this.commonSave( this.maintainTierLevelsCommitBean);
    this.defEventsRowDataTempDataFinal = [];
    this.maintainTierLevelsCommitBean = new MaintainTierLevelsCommitBean();
  }

  typeChangeDte(event) {
    if (event && event.code) {
      this.scheduleSubType ='ocmtidet/rgScheduleTypeRecordGroup?scheduleType='+ event.code;
      this.maintainDefSchedule.scheduleSubType = null;
    }else{
      this.maintainDefSchedule.scheduleSubType = null;
    }
  }

  subTypeChangeDte(event){
    if(event && event.code){
      const payLoad = {};
      payLoad['eventType'] = this.maintainDefSchedule.scheduleType;
      payLoad['eventSubType'] = this.maintainDefSchedule.scheduleSubType;
      payLoad['offenderBookId'] = this.dialog.data.offenderBookId;

      if( this.tempEventSubType !== event.code){
      const serviceObj = this.addEditScheduleService.getEmailSmsFlag(payLoad);
      serviceObj.subscribe(data => {
        if (data.length > 0) {
          data.forEach(ele => {

            if (ele.emailFlag === 'Y') {
              this.maintainDefSchedule.validEmailFlag = false;
              this.maintainDefSchedule.emailFlag = true;
            } else {
              this.maintainDefSchedule.validEmailFlag = true;
              this.maintainDefSchedule.emailFlag = false;
            }

            if (ele.smsFlag === 'Y') {
              this.maintainDefSchedule.validSmsFlag = false;
              this.maintainDefSchedule.smsFlag = true;
            } else {
              this.maintainDefSchedule.validSmsFlag = true;
              this.maintainDefSchedule.smsFlag = false;
            }

            this.maintainDefSchedule.emailAddressCount = ele.emailAddressCount;
            this.maintainDefSchedule.phoneNumberCount = ele.phoneNumberCount;
          });
        }
      });
    }
    this.tempEventSubType = undefined;
    }
  }


  commonSave(event){
    const obj = this.addEditScheduleService.commitScheduledEventDetails(event);
    obj.subscribe(data => {
      if (data === 1) {
        this.type = "success";
        this.message = this.translateService.translate('calsch.schedulesavesuccess');
        this.show();
        this.dialog.close(null);
      }else if(data == 3){
        this.type = 'warn';
        this.message = this.translateService.translate('Start date cannot be greater than Schedule End Date');
        this.show();
        return;
      } else {
        this.type = "warn";
        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
        this.show();
      }
    });
  }

// Internal Appointment
  saveInternalAppointmentDetails() {
    this.offschCommitModel.updateList = [];
    this.offschCommitModel.deleteList = [];

    if (this.offschUpdateList.length > 0) {
      for (let i = 0; i < this.offschUpdateList.length; i++) {

        if (!this.offschUpdateList[i].eventDate) {
          this.type = 'warn';
          this.message = this.translateService.translate('calsch.scheduledatemustbeentered');
          this.show();
          return false;
        }
        if (!this.offschUpdateList[i].startTime) {
          this.type = 'warn';
          this.message = this.translateService.translate('calsch.scheduletimemustbeentered');
          this.show();
          return false;
        }
        if (!this.offschUpdateList[i].toIntLocLevel1Code) {
          this.type = 'warn';
          this.message = this.translateService.translate('calsch.pleaseselecttolocation');
          this.show();
          return false;
        }

        this.offschUpdateList[i].cancelFlag=this.cancelFlag;
        if (this.cancelFlag === 'Y') {
          if (!this.offschUpdateList[i].eventOutcome) {
            this.type = 'warn';
            this.message = this.translateService.translate('calsch.cancelreasonmustbeentered');
            this.show();
            return false;
          }
        }

        this.offschUpdateList[i].toInternalLocationId=Number(this.offschModel.toIntLocLevel1Code)
        let dateFormat = DateFormat.getDate(this.offschModel.startTime);
        dateFormat.setDate(DateFormat.getDate(this.offschModel.eventDate).getDate());
        dateFormat.setMonth(DateFormat.getDate(this.offschModel.eventDate).getMonth());
        dateFormat.setFullYear(DateFormat.getDate(this.offschModel.eventDate).getFullYear());
        this.offschUpdateList[i].startTime = dateFormat;
    

      }
      this.offschCommitModel.updateList = this.offschUpdateList;
      this.saveRecurrSchedule(this.offschCommitModel);
    }
  }


  cancelAppointmentCheckbox(event) {
    if (event) {
      if (event.checked) {
        this.cancelFlag = 'Y';
        this.cancelFlagTemp = true;
        this.readonlyCancelReason = false;
        this.reqCancelReason=true;
      } else {
        this.readonlyCancelReason = true;
        this.offschModel.eventOutcome = null;
        this.cancelFlag = null;
        this.cancelFlagTemp = false;
        this.reqCancelReason=false;
      }
    }

  }

  cancelCourtEventCheckbox(event) {
    if(this.courtEvents.linkData > 0){
      event.checked = false;
      event.source['checked']=false;
      this.courtEvents.cancelFlag = undefined;
      this.message = this.translateService.translate('calsch.thiscourteventhaslinkedappointmentoutcomes');
      this.show();
      return;
    }
    if (this.courtEvents.eventStatus === 'COMP') {
      event.checked = false;
      event.source['checked']=false;
      this.courtEvents.cancelFlag = undefined;
      this.type = 'warn';
      this.message = this.translateService.translate('calsch.eventCompleted');
      this.show();
      return;
    } else {
      if (event.checked) {
        this.outcomeReasonCodeEdit = false;
        this.courtEvents.outcomeReasonCode = this.defaultCanReason;
        this.courtEvents.eventStatus = 'CANC';
      }
      else {
        this.tempFlag = false;
        this.outcomeReasonCodeEdit = true;
        this.courtEvents.outcomeReasonCode = undefined;
        this.courtEvents.eventStatus = 'SCH';
        return;
      }
    }
  }

  get readonlySave() {
    if (!this.cancelFlagDataTemp) {
      if (((this.offschModel.eventSubType) !== (this.offschModeTemp.eventSubType)) || ((this.offschModel.eventDate) !== (this.offschModeTemp.eventDate))
        || JSON.stringify((this.offschModel.startTime)) !== JSON.stringify((this.offschModeTemp.startTime)) || ((this.offschModel.toIntLocLevel1Code) !== (this.offschModeTemp.toIntLocLevel1Code))
        || ((this.offschModel.eventOutcome) !== (this.offschModeTemp.eventOutcome)) || JSON.stringify((this.offschModel.commentText)) !== JSON.stringify((this.offschModeTemp.commentText))
        || ((this.cancelFlagTemp))) {
        return false;
      } else {
        return true
      }
    } else {
      return true;
    }
  }
  appearanceTypeChange(event) {
    if (event && (event.code === 'INP' || event.code === 'EXT') ) {
      this.apperancelocationsource = undefined;
      this.apperancelocationlist = 'calsch/apperancelocationRecordGroup?caseLoadId=' + null;
      this.apperancelocationMand = false;
      this.apperancelocationReadOnly = true;
    }
    else if (event && (event.code === 'OME' || event.code === 'VID' || event.code === 'INT')) {
      this.apperancelocationsource = 'OIMULOCA';
      this.apperancelocationMand = true;
      if (this.screenAcesscheck) {
        this.apperancelocationReadOnly = false;
      } else {
        this.apperancelocationReadOnly = true;
      }
      this.apperancelocationlist = 'oidcrtev/apperancelocationRecordGroup?caseLoadId=' + this.offenderAgyLocId;
    }
    else {
      this.apperancelocationsource = undefined;
      this.apperancelocationlist = undefined;
      this.apperancelocationMand = true;
      this.apperancelocationReadOnly = false;
    }
  }

  saveCourtEvents() {
    if (!this.courtEvents.eventDate) {
      this.type = 'warn';
      this.message = this.translateService.translate('calsch.eventDateMand');
      this.show();
      return;
    }
    if (!this.courtEvents.startTime) {
      this.type = 'warn';
      this.message = this.translateService.translate('calsch.startTimeMand');
      this.show();
      return;
    }
    if (!this.courtEvents.court) {
      this.type = 'warn';
      this.message = this.translateService.translate('calsch.courtMand');
      this.show();
      return;
    }
    if (!this.courtEvents.hearingReason) {
      this.type = 'warn';
      this.message = this.translateService.translate('calsch.hearingReasonMand');
      this.show();
      return;
    }
    if (!this.courtEvents.appearanceType) {
      this.type = 'warn';
      this.message = this.translateService.translate('calsch.appearanceTypeMand');
      this.show();
      return;
    }
    if (this.courtEvents.appearanceType && (this.courtEvents.appearanceType == 'VID' || this.courtEvents.appearanceType === 'OME' || this.courtEvents.appearanceType === 'INT') && !this.courtEvents.appearanceLocation) {
      this.type = 'warn';
      this.message = this.translateService.translate('calsch.appearanceLocationMand');
      this.show();
      return;
    }
    if(this.courtEvents.eventId && this.courtEvents.eventStatus==='CANC' && !this.courtEvents.outcomeReasonCode ){
      this.type = 'warn';
      this.message = this.translateService.translate('calsch.outcomeReasonCodeMand');
      this.show();
      return;
    }
    if (DateFormat.compareDate(DateFormat.getDate(this.courtEvents.eventDate), DateFormat.getDate()) < 0) {
      this.type = 'warn';
      this.message = this.translateService.translate('oidsiapp.eventdatevalidation');
      this.show();
      return;
    }

    if (!this.courtEvents.eventId) {
      this.courtEvents.eventStatus = 'SCH';
      this.courtEvents.createDatetime = DateFormat.getDate();
      this.courtEvents.createUserId = this.sessionManager['userSession'].id;
    } else {
      this.courtEvents.modifyDatetime = DateFormat.getDate();
      this.courtEvents.modifyUserId = this.sessionManager['userSession'].id;
    }
    this.courtEvents.offenderBookId = this.dialog.data.offenderBookId;
    this.courtEvents.directionCode = 'OUT';
    this.courtEvents.nextEventRequestFlag = 'N';
    this.courtEvents.orderRequestedFlag = 'N';
    this.courtEvents.holdFlag = 'N';

    let startHours = DateFormat.getDate(this.courtEvents.startTime).getHours();
    let startMinutes = DateFormat.getDate(this.courtEvents.startTime).getMinutes();
    this.courtEvents.startTime = DateFormat.getDate(DateFormat.getDate(this.courtEvents.eventDate).setHours(startHours, startMinutes, 0, 0));
    this.courtEvents.eventDate = DateFormat.getDate(DateFormat.getDate(this.courtEvents.eventDate).setHours(0, 0, 0, 0));

    this.courtEventsSave();
  }

  courtEventsSave() {
    const serviceObj = this.addEditScheduleService.courtEventsSave(this.courtEvents);
    serviceObj.subscribe(data => {
      if (data === 1) {
        this.type = "success";
        this.message = this.translateService.translate('calsch.schedulesavesuccess');
        this.show();
        this.dialog.close(null);
      } else {
        this.type = "warn";
        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
        this.show();
      }
    });
  }

 

}
