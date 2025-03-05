import {
  Component, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidpactiService } from '@inst/institutional-activities/service/oidpacti.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VOffenderCourseEvents } from '@inst/institutional-activities/beans/VOffenderCourseEvents';
import { VOffenderCourseEventsCommitBean } from '@inst/institutional-activities/beans/VOffenderCourseEventsCommitBean';
import { OffenderProgramProfiles } from '@instprogramswithoutschedulesbeans/OffenderProgramProfiles';
import { OffenderProgramProfilesCommitBean } from '@instprogramswithoutschedulesbeans/OffenderProgramProfilesCommitBean';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { Router } from '@angular/router';
import { OiischedService } from '@inst/inquiries/service/oiisched.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OidcnoteService } from '@inst/casemanagement/service/oidcnote.service';
import { OcmpssetService } from '@inst/institutional-activities/maintenance/service/ocmpsset.service';
import { ProgramPaySettingsBean } from '@inst/institutional-activities/maintenance/beans/ProgramPaySettingsBean';
import { SchedulerService } from '@core/ui-components/schedule/scheduler.service';
// import required bean declarations

@Component({
  selector: 'app-oidpacti',
  templateUrl: './oidpacti.component.html'
})

export class OidpactiComponent implements OnInit, OnDestroy {
  assesFlag = false;
  assLaunchBtnFlg = true;
  rejReasonFlag: boolean;
  bookingDate: Date;
  griddelbtn: boolean;
  waitgridDelBtn: boolean;
  courseInsBtn: boolean;
  clrBtnFlag = true;
  view: any;
  assignSaveFlag = false;
  waitextSave: boolean;
  profileValue: string;
  savBtnflag: boolean;
  extSave: boolean;
  readonly: boolean;
  rejReadonly: boolean;
  rejReason: string;
  selectedTabIndex: number;
  vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
  @ViewChild('grid', {static: true}) grid: any;
  @ViewChild('waitgrid', {static: true}) waitgrid: any;
  @ViewChild('coursegrid', {static: true}) coursegrid: any;
  @ViewChild('dialog', {static: true}) dialog: DialogComponent;
  assBtnFlg = true;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  offprogprofData: OffenderProgramProfiles[] = [];
  offprogprofRowData: OffenderProgramProfiles[] = [];
  offprogprofModel: OffenderProgramProfiles = new OffenderProgramProfiles();
  offprogprofBean: OffenderProgramProfiles = new OffenderProgramProfiles();
  offprogprofIndex = 0;
  offprogprofInsertList: OffenderProgramProfiles[] = [];
  offprogprofUpdateList: OffenderProgramProfiles[] = [];
  offprogprofDeleteList: OffenderProgramProfiles[] = [];
  offprogprofCommitModel: OffenderProgramProfilesCommitBean = new OffenderProgramProfilesCommitBean();
  voffcourseevntsData: VOffenderCourseEvents[] = [];
  voffcourseevntsDataTemp: VOffenderCourseEvents[] = [];
  voffcourseevntsModel: VOffenderCourseEvents = new VOffenderCourseEvents();
  voffcourseevntsBean: VOffenderCourseEvents = new VOffenderCourseEvents();
  voffcourseevntsIndex = 0;
  voffcourseevntsInsertList: VOffenderCourseEvents[] = [];
  voffcourseevntsUpdateList: VOffenderCourseEvents[] = [];
  voffcourseevntsDeleteList: VOffenderCourseEvents[] = [];
  offenderprogramprofiles2Data: OffenderProgramProfiles[] = [];
  offenderprogramprofilesWaitRowData: OffenderProgramProfiles[] = [];
  offenderprogramprofiles2Model: OffenderProgramProfiles = new OffenderProgramProfiles();
  offprgWaitModel: OffenderProgramProfiles = new OffenderProgramProfiles();
  offenderprogramprofiles2Index = 0;
  offenderprogramprofiles2InsertList: OffenderProgramProfiles[] = [];
  offenderprogramprofiles2UpdateList: OffenderProgramProfiles[] = [];
  offenderprogramprofiles2DeleteList: OffenderProgramProfiles[] = [];
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable = true;
  recipientStaffColumnDef: any[];
  wfEmailRecipientsColumnDef: any[];
  crPrfRcColumnDef: any[];
  crPrfXgColumnDef: any[];
  offenderProgramProfiles2ColumnDef: any[];
  wfFunctionsColumnDef: any[];
  wfIwpTemplatesColumnDef: any[];
  vOffCourseEvntsColumnDef: any[];
  wfWorkTypesColumnDef: any[];
  offProgProfColumnDef: any[];
  recipientTeamsColumnDef: any[];
  wfTriggersColumnDef: any[];
  crPrfAgColumnDef: any[];
  crPrfGdColumnDef: any[];
  crPrfIgColumnDef: any[];
  crPrfFaColumnDef: any[];
  rgestablishmentRg: any[] = [];
  rgservicesRg: any[] = [];
  rgendreasonRg: any[] = [];
  pgpsrejrsnRg: any[] = [];
  rgperformanceRg: any[] = [];
  rgfilterRg: any[] = [];
  rgpriorityRg: any[] = [];
  rgdecisionRg: any[] = [];
  rgattendenceRg: any[] = [];
  lovservices2Rg: any[] = [];
  agyLocLink: string;
  saveDisabled:boolean;
  saveFlag:boolean;
  serviceTitles = {
    description: this.translateService.translate('common.description'),
    programCode: this.translateService.translate('common.code')

  };
  reasonTitles = {
    description: this.translateService.translate('common.reason'),
    code: this.translateService.translate('common.code')
  };
  agyLocIdMap: Map<string, string> = new Map<string, string>();
  serviceMap: Map<string, string> = new Map<string, string>();
  checkFlag = true;
  options: any[];
  voffcourseevntsCommitModel: VOffenderCourseEventsCommitBean = new VOffenderCourseEventsCommitBean();
  maxHours: any;
  maxHoursDate: any;
  backButton: Boolean;
  prgSrvSetModel: ProgramPaySettingsBean = new ProgramPaySettingsBean();
  hideDelBtn: any;
  constructor(private oidpactiFactory: OidpactiService, public translateService: TranslateService,
    public sessionManager: UserSessionManager, private offenderSearchService: OffenderSearchService,
    public dialogService: DialogService, public oiischedFactory: OiischedService, private router: Router, private oidcnoteFactory: OidcnoteService
    ,private ocmpssetService: OcmpssetService, private schedularService: SchedulerService
    ) {
    this.recipientStaffColumnDef = [];
    this.wfEmailRecipientsColumnDef = [];
    this.crPrfRcColumnDef = [];
    this.crPrfXgColumnDef = [];
    this.offenderProgramProfiles2ColumnDef = [];
    this.wfFunctionsColumnDef = [];
    this.wfIwpTemplatesColumnDef = [];
    this.vOffCourseEvntsColumnDef = [];
    this.wfWorkTypesColumnDef = [];
    this.offProgProfColumnDef = [];
    this.recipientTeamsColumnDef = [];
    this.wfTriggersColumnDef = [];
    this.crPrfAgColumnDef = [];
    this.crPrfGdColumnDef = [];
    this.crPrfIgColumnDef = [];
    this.crPrfFaColumnDef = [];
  }
  ngOnInit() {
    if (this.schedularService.backBtnFlag) {
			this.backButton = true;
		 } else {
			this.backButton = false;
		 }
    this.progServicesExecuteQuery();
    this.selectedTabIndex = 0;
    this.rejReason = this.translateService.translate('oidpacti.rejectionreason');
    this.readonly = false;
    this.rejReadonly = false;
    this.savBtnflag = true;
    /* this.options = [
      { code: 'CONFIRMED', description: 'CONFIRMED', listSeq: 1, },
      { code: 'OUTSTANDING1', description: 'OUTSTANDING', listSeq: 2, },
    ]; */
    this.view = 'CONFIRMED';
    this.agyLocLink = `oidpacti/rgEstablishmentRecordGroup?caseloadId=${this.sessionManager.currentCaseLoad}`;
    this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
    if (!this.offenderSearchService.selectedOffender || this.offenderSearchService.selectedOffender.offenderBookId === undefined) {
      this.show('common.pleasesearchforvalidoffender');
      this.assBtnFlg = true;
      this.readonly = true;
      this.rejReadonly = true;
    } else {
      this.assBtnFlg = false;
      this.readonly = false;
      this.rejReadonly = false;
    }
    this.offenderProgramProfiles2ColumnDef = [
      {
        fieldName: this.translateService.translate('oidpacti.referraldate'), field: 'referralDate', editable: true, width: 150, datatype: 'date',
        cellEditable: this.canWaitCellEdit
      },
      {
        fieldName: this.translateService.translate('oidpacti.priority') + this.translateService.translate('common.mandatory'), field: 'referralPriority', editable: true, width: 150, datatype: 'lov',
        domain: 'PS_PRIORITY', cellEditable: this.canWaitCellEdit,
        titles: {
          description: this.translateService.translate('oidpacti.priority'),
          code: this.translateService.translate('common.code')
        }
      },
      {
        fieldName: this.translateService.translate('system-profile.inst-agency') + this.translateService.translate('common.mandatory')
        , field: 'agyLocId', editable: true, width: 150, datatype: 'lov', link: this.agyLocLink,
        cellEditable: this.canWaitCellEdit,source:'OCMSPRAC',
        titles: {
          description: this.translateService.translate('system-profile.inst-agency'),
          code: this.translateService.translate('common.code')
        }
      },
      {
        fieldName: this.translateService.translate('oidpacti.service'), field: 'programId',
        editable: true, width: 150, datatype: 'lov', cellEditable: this.canWaitCellEdit,
        parentField: 'agyLocId', link: 'oidpacti/rgServicesRecordGroup?agyLocId=',source:'OCMSPRAC',
        titles: {
          description: this.translateService.translate('common.description'),
          programCode: this.translateService.translate('common.code')
        }
      },
      {
        fieldName: this.translateService.translate('oidpacti.activitydescription'),
        field: 'activityDescription', editable: true, width: 150,
        cellEditable: this.canWaitCellEdit
      },
      {
        fieldName: '', field: 'button', datatype: 'launchbutton', link: '/OIDACSEL', editable: true, width: 100,
        data: 'row', updateField: 'row', modal: true, dialogWidth: 80, onLaunchClick: this.oidacselClick,
        cellEditable: this.canWaitCellEdit
      },
      { fieldName: this.translateService.translate('oidpacti.vacancy'), field: 'vacancy', editable: false, width: 150 },
      {
        fieldName: this.translateService.translate('oidpacti.decision') + this.translateService.translate('common.mandatory'),
        field: 'waitlistDecisionCode', editable: true, width: 150, datatype: 'lov',/*  parentField: 'systemMode' */domain:'PS_ACT_DEC'
        // link: 'oidpacti/rgDecisionRecordGroup?systemMode='
        , cellEditable: this.canWaitCellEdit
      },
      { fieldName: '', field: 'crsActyId', hide: true },
      { fieldName: '', field: 'scheduleStartDate', hide: true },
      { fieldName: '', field: 'scheduleEndDate', hide: true },
      { fieldName: '', field: 'referralCommentText', hide: true },
      { fieldName: '', field: 'rejectReasonCode', hide: true, cellEditable: this.canWaitCellEdit },
      { fieldName: '', field: 'rejectDate', hide: true },
      { fieldName: '', field: 'waittest', hide: true },
      { fieldName: '', field: 'startDateValidation', hide: true },
      { fieldName: '', field: 'offenderStartDate', hide: true },
      { fieldName: '', field: 'offenderEndDate', hide: true },
      { fieldName: '', field: 'systemMode', hide: true },
      { fieldName: '', field: 'dateChanged', hide: true },
    ];
    this.vOffCourseEvntsColumnDef = [
      { fieldName: this.translateService.translate('common.date'), field: 'eventDate', editable: true, width: 150, datatype: 'date',
       cellEditable: this.canVoffCellEdit },
      {
        fieldName: this.translateService.translate('oidpacti.confirmattendance'),cellEditable: this.canVoffCellEdit ,
        field: 'eventOutcome', editable: true, width: 150, datatype: 'lov',domain:'PS_PA_OC'
        // link: 'oidpacti/rgAttendenceRecordGroup?pshowoutcome=', parentField: 'pshowoutcome',
        // titles: {
        //   description: this.translateService.translate('oidpacti.attendence'),
        //   code: this.translateService.translate('common.code')
        // }
      },
      {
        fieldName: this.translateService.translate('oidpacti.offenderstarttime'), field: 'startTime', editable: true, width: 150,
        datatype: 'time', cellEditable: this.canVoffCellEdit
      },
      {
        fieldName: this.translateService.translate('oidpacti.offenderendtime'), field: 'endTime', editable: true, width: 150, datatype: 'time',
        cellEditable: this.canVoffCellEdit
      },
      {
        fieldName: 'Hours', field: 'nbtHours', editable: false, width: 150, datatype: 'time'
      },
      {
        fieldName: this.translateService.translate('oidpacti.performance'), field: 'performanceCode', editable: true, width: 150, datatype: 'lov',
        domain: 'PERFORMANCE', titles: this.reasonTitles, cellEditable: this.canVoffCellEdit
      },
      { fieldName: this.translateService.translate('common.comment'), field: 'commentText', editable: true, width: 150,
      datatype: 'text', uppercase: 'false' , cellEditable: this.canVoffCellEdit, maxlength: 240 },
      { fieldName: '', field: 'pshowoutcome', hide: true },
      { fieldName: '', field: 'paySystemRate', hide: true },
      { fieldName: '', field: 'paySystemAmount', hide: true },
      { fieldName: '', field: 'paySystemUnit', hide: true },
      { fieldName: '', field: 'line', hide: true },
      {
        fieldName: 'Pay Flag', field: 'payFlag', editable: false, width: 150, datatype: 'checkbox', hide: true
      },
      {
        fieldName: 'Batch #', field: 'payBatchId', editable: false, width: 150,  hide: true
      },
    ];
    this.offProgProfColumnDef = [
      {
        fieldName: this.translateService.translate('system-profile.inst-agency') + this.translateService.translate('common.mandatory')
        , field: 'agyLocId', editable: true, width: 150, datatype: 'lov', link: this.agyLocLink,
        cellEditable: this.canCellEdit,source:'OCMSPRAC',
        titles: {
          description: this.translateService.translate('system-profile.inst-agency'),
          code: this.translateService.translate('common.code')
        }
      },
      {
        fieldName: this.translateService.translate('oidpacti.service'), field: 'programId',
        editable: true, width: 150, datatype: 'lov', parentField: 'agyLocId',source:'OCMSPRAC',
        link: 'oidpacti/rgServicesRecordGroup?agyLocId=', cellEditable: this.canCellEdit,
        titles: {
          description: this.translateService.translate('common.description'),
          programCode: this.translateService.translate('common.code')
        }
      },
      {
        fieldName: this.translateService.translate('oidpacti.activitydescription') + this.translateService.translate('common.mandatory'),
        field: 'activityDescription', editable: true, width: 150,
        cellEditable: this.canCellEdit
      },
      {
        fieldName: '', field: 'button', datatype: 'launchbutton', link: '/OIDACSEL', editable: true, width: 100,
        data: 'row', updateField: 'row', modal: true, dialogWidth: 80, onLaunchClick: this.oidacselClick,
        isDisable: this.disableCell,
      },
      {
        fieldName: this.translateService.translate('oidpacti.offenderstartdatemandatory'),
        field: 'offenderStartDate', editable: true, width: 150, datatype: 'date', cellEditable: this.canCellEdit
      },
      {
        fieldName: this.translateService.translate('oidpacti.offenderenddate'),
        field: 'offenderEndDate', editable: true, width: 150, datatype: 'date', cellEditable: this.canCellEdit
      },
      { fieldName: this.translateService.translate('oidpacti.suspended'), field: 'suspendedFlag', editable: true, width: 150, datatype: 'checkbox' },
      { fieldName: '', field: 'offenderEndReason', hide: true },
      { fieldName: '', field: 'offenderEndCommentText', hide: true },
      { fieldName: '', field: 'scheduleStartDate', hide: true },
      { fieldName: '', field: 'scheduleEndDate', hide: true },
      { fieldName: '', field: 'test', hide: true },
      { fieldName: '', field: 'startDateValidation', hide: true },
      { fieldName: '', field: 'crsActyId', hide: true },
    ];
    const serviceObj = this.oidpactiFactory.
      rgEstablishmentRecordGroup(this.sessionManager.currentCaseLoad);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
      } else {
        data.forEach(ele => {
          this.agyLocIdMap.set(ele.code, ele.description);
        });
      }
    });
    const serviceObject = this.oidpactiFactory.
      getServices();
    serviceObject.subscribe(data => {
      if (data.length === 0) {
      } else {
        data.forEach(ele => {
          this.serviceMap.set(ele.code, ele.description);
        });
      }
    });
    const prfValue = this.oidpactiFactory.
      getProfileValue();
      prfValue.subscribe(profileValue => {
      if (profileValue) {
        this.profileValue = profileValue;
      }
    });
    this.setvCourseColHeaders();
  }
  /**
* This function displays the messages
*/
  show(vldmsg, type?) {
    type = type ? type : 'warn';
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }
  onRowClickoffprogprof(event) {
    if (event) {
      this.offprogprofBean = event;
      this.offprogprofModel = event;
      if (this.offprogprofBean.offPrgrefId) {
        this.voffcourseevntsModel = new VOffenderCourseEvents();
        this.voffcourseevntsModel.offPrgrefId = this.offprogprofBean.offPrgrefId;
        this.voffcourseevntsModel.eventOutcome = this.view;
        if (this.offprogprofBean.offPrgrefId) {
          this.voffcourseevntsExecuteQuery();
        }
        this.courseInsBtn = true;
        this.griddelbtn = true;
        // this.oidpactiFactory.programId = this.offprogprofBean.programId;
        this.assLaunchBtnFlg = false;
      } else {
        this.griddelbtn = false;
        this.voffcourseevntsModel = new VOffenderCourseEvents();
        this.voffcourseevntsData = [];
        this.assLaunchBtnFlg = true;
      }
    } else {
      this.courseInsBtn = false;
      // this.oidpactiFactory.programId = undefined;
      this.assLaunchBtnFlg = true;
      this.voffcourseevntsModel = new VOffenderCourseEvents();
      this.voffcourseevntsData = [];
    }
  }
  allowNumbers(event) {
  }

  onUpdatedMapsDataCourseGrid(event,gridName?: string) {
    if (event && gridName == "courseGrid") {
      if(event.updated.eventOutcome === 'ATT'){
        //this.coursegrid.requiredOn('performanceCode');
      }
      else{
        //this.coursegrid.requiredOff('performanceCode');
      }
    }
  }

  onRowClickvoffcourseevnts(event) {
    if (event) {
      this.voffcourseevntsBean = event;
      if(this.voffcourseevntsData[0].line === 'false'){
        this.valueChange(this.voffcourseevntsData[0]);
      }
      this.setvCourseColHeaders();
    } else {
      this.setvCourseColHeaders();
    }
  }
  valueChange(bean) {
    if(bean.eventId === null && bean.eventOutcome !== null){
      this.coursegrid.setColumnData('line',0,'true')
    }
  }
  setvCourseColHeaders() {
    if (this.voffcourseevntsBean.eventOutcome === 'ATT') {
      //this.coursegrid.requiredOn('performanceCode');
      this.coursegrid.requiredOn('startTime');
      this.coursegrid.requiredOn('endTime');
    } else {
     // this.coursegrid.requiredOff('performanceCode');
      this.coursegrid.requiredOff('startTime');
      this.coursegrid.requiredOff('endTime');
    }
   
  }
  onRowClickoffenderprogramprofiles2(event) {
    if (event) {
      this.offprgWaitModel = new OffenderProgramProfiles();
      this.offprgWaitModel = event;
      if (this.offprgWaitModel.offPrgrefId) {
        this.waitgridDelBtn = true;
      } else {
        this.waitgridDelBtn = false;
      }
      if (this.offprgWaitModel.waitlistDecisionCode === 'REJ') {
        this.assBtnFlg = true;
        this.rejReasonFlag = true;
        this.rejReason = this.translateService.translate('oidpacti.rejectionreason') +
          this.translateService.translate('common.mandatory');
        // this.readonly = true;
      } else {
        this.rejReason = this.translateService.translate('oidpacti.rejectionreason');
        this.assBtnFlg = false;
        this.rejReasonFlag = false;
        // this.readonly = false;
      }
      if (this.offprgWaitModel.decision === 'REJ' && this.offprgWaitModel.offPrgrefId) {
        this.readonly = true;
      } else {
        this.readonly = false;
      }
      if (this.offprgWaitModel.waitlistDecisionCode === 'REJ' && !this.offprgWaitModel.offPrgrefId) {
        this.rejReadonly = false;
      } else if (this.offprgWaitModel.decision === 'REJ' && this.offprgWaitModel.offPrgrefId) {
        this.rejReadonly = true;
      } else if (this.offprgWaitModel.waitlistDecisionCode === 'REJ' && this.offprgWaitModel.offPrgrefId
        && this.offprgWaitModel.decision !== 'REJ') {
        this.rejReadonly = false;
      } else {
        this.rejReadonly = true;
      }
    } else {
      this.rejReasonFlag = false;
      this.assBtnFlg = true;
      this.readonly = true;
      this.offprgWaitModel = new OffenderProgramProfiles();
    }
  }
  disableCell = (data: any, index: number, field: string): boolean => {
    if (!data.createDatetime) {
        return false;
    } else {
        return true;
    }
}
  canCellEdit = (data: any, index: number, field: string): boolean => {
    if ((field === 'programId' || field === 'agyLocId' ||
      field === 'activityDescription') && data.offPrgrefId) {
      return false;
    }
    if (field === 'activityDescription' && data.crsActyId) {
    return false;
  }
    if (field === 'offenderEndDate' || field === 'offenderStartDate') {
      if (field === 'offenderEndDate' && data.offenderProgramStatus === 'END') {
        return false;
      }
      if (data.offEndDate) {
        return false;
      }
    }
    return true;
  }
  canWaitCellEdit = (data: any, index: number, field: string): boolean => {
    if (this.offprgWaitModel.decision === 'REJ' && this.offprgWaitModel.offPrgrefId) {
      return false;
    }
    if (field === 'activityDescription' && data.crsActyId) {
      return false;
    }
    if (field === 'agyLocId' && this.offprgWaitModel.offPrgrefId) {
      return false;
    }
    return true;
  }
  canVoffCellEdit = (data: any, index: number, field: string): boolean => {
    if(data.payBatchId) {
      this.show('oidpacti.attendancerecordhasalreadypaid','warn');
      return false;
    }
    // if ((field === 'startTime' || field === 'endTime') && data.eventOutcome !== 'ATT') {
    //   return false;
    // }
    if (data.eventFlag && DateFormat.compareDate(DateFormat.getDate(data.eventDate),
      DateFormat.getDate()) === 1) {
      if (field === 'eventOutcome' || field === 'eventDate' || field === 'startTime' || field === 'endTime' || field === 'performanceCode' || field === 'commentText') {
        return false;
      }
    }
    return true;
  }
  oidacselClick = (event) => {
    if (this.selectedTabIndex === 0) {
      const index = this.offprogprofData.indexOf(event);
      if (event.offPrgrefId) {
        return;
      }
      if (event.crsActyId) {
        return;
      }
      if (!event.programId) {
        this.show(this.translateService.translate('oidpacti.noservicehasbeenselected'));
        return;
      }
    } else {
      if (this.offprgWaitModel.decision === 'REJ' && this.offprgWaitModel.offPrgrefId) {
        return;
      }
      if (!event.programId) {
        this.show(this.translateService.translate('oidpacti.anservicemustbechosenbeforeselectinganactivity'));
        return;
      }
      const rowindex = this.offenderprogramprofiles2Data.indexOf(event);
    }
    event.programDescription = this.serviceMap.get(event.programId);
    event.facilityDescription = this.agyLocIdMap.get(event.agyLocId);
    event.moduleName = 'OIDPACTI';
    this.dialogService.openLinkDialog('/OIDACSEL', event, 80).subscribe(result => {
      if (result) {
        if (this.selectedTabIndex === 0) {
          const index = this.offprogprofData.indexOf(event);
          this.grid.setColumnData('activityDescription', index, result.activity);
          this.grid.setColumnData('scheduleStartDate', index, DateFormat.getDate(result.scheduleStartDate));
          this.grid.setColumnData('scheduleEndDate', index, DateFormat.getDate(result.scheduleEndDate));
          this.grid.setColumnData('crsActyId', index, result.crsActyId);
          if (DateFormat.compareDate(DateFormat.getDate(event.scheduleStartDate),
          DateFormat.getDate()) === 1) {
            this.grid.setColumnData('offenderStartDate', index, DateFormat.getDate(result.scheduleStartDate));
          } else {
            this.grid.setColumnData('offenderStartDate', index, DateFormat.getDate());
          }
        } else {
          const index = this.offenderprogramprofiles2Data.indexOf(event);
          this.waitgrid.setColumnData('activityDescription', index, result.activity);
          this.waitgrid.setColumnData('scheduleStartDate', index, DateFormat.getDate(result.scheduleStartDate));
          this.waitgrid.setColumnData('scheduleEndDate', index, DateFormat.getDate(result.scheduleEndDate));
          this.waitgrid.setColumnData('crsActyId', index, result.crsActyId);
          event.crsActyId = result.crsActyId;
          if (DateFormat.compareDate(DateFormat.getDate(event.scheduleStartDate),
          DateFormat.getDate()) === 1) {
            this.waitgrid.setColumnData('offenderStartDate', index, DateFormat.getDate(result.scheduleStartDate));
          } else {
            this.waitgrid.setColumnData('offenderStartDate', index, DateFormat.getDate());
          }
        }
        event.crsActyId = result.crsActyId;
        event.activityDescription = result.activity;
        // event.offenderStartDate = DateFormat.getDate();
        event.scheduleStartDate = DateFormat.getDate(result.scheduleStartDate);
        event.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        event.offenderId = this.vHeaderBlockModel.offenderId;
        if (result.scheduleEndDate) {
        event.scheduleEndDate = DateFormat.getDate(result.scheduleEndDate);
        } else {
          event.scheduleEndDate = undefined;
        }
        const lDate = DateFormat.getDate(DateFormat.getDate().setDate(DateFormat.getDate().getDate() + 30));
        if (DateFormat.compareDate(DateFormat.getDate(event.scheduleStartDate),
          DateFormat.getDate(lDate)) === 1) {
          const h = Math.abs(DateFormat.getDate(event.scheduleStartDate).getTime() -
            DateFormat.getDate().getTime()) / 36e5;
          const lvNoOfDays = Math.round(h / 24);
          this.show(this.translateService.translate('oidpacti.theassignedactivitystartsafter') + lvNoOfDays);
        }
        if (this.selectedTabIndex === 0) {
          this.checkConflict(event);
        } else {
         this.validateActivity(event);
        }
        this.checkFlag = false;
      } else {
        if (this.selectedTabIndex === 0) {
          const index = this.offprogprofData.indexOf(event);
          this.grid.setColumnData('activityDescription', index, undefined);
          this.grid.setColumnData('offenderStartDate', index, undefined);
          this.grid.setColumnData('crsActyId', index, undefined);
        } else {
          const index = this.offenderprogramprofiles2Data.indexOf(event);
          this.waitgrid.setColumnData('activityDescription', index, undefined);
          this.waitgrid.setColumnData('crsActyId', index, undefined);
        }
      }
    });
  }
  /**
   *  This function will be executed when we select the offender in header block
   */
  onOffenderChange(offender) {
    this.vHeaderBlockModel = offender;
    if (offender) {
      this.offprogprofModel = new OffenderProgramProfiles();
      this.offenderprogramprofiles2Model = new OffenderProgramProfiles();
      this.offprogprofModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
      this.offenderprogramprofiles2Model.offenderBookId = this.vHeaderBlockModel.offenderBookId;
      this.offprogprofBean = new OffenderProgramProfiles();
      this.offprogprofData = [];
      this.offenderprogramprofiles2Data = [];
      this.offprgWaitModel = new OffenderProgramProfiles();
      this.voffcourseevntsBean = new VOffenderCourseEvents();
      this.voffcourseevntsData = [];
      this.oidpactiexecuteQuery();
      this.offenderprogramprofiles2ExecuteQuery();
      this.view = 'CONFIRMED';
      this.savBtnflag = true;
      this.clrBtnFlag = true;
      this.assBtnFlg = false;
      this.readonly = false;
      this.rejReadonly = false;
      this.setvCourseColHeaders();
      this.bookingDate = undefined;
      this.getBookingDate();
      this.assLaunchBtnFlg = true;
    } else {
      this.maxHours = undefined;
      this.maxHoursDate = undefined;
      this.offprogprofModel = new OffenderProgramProfiles();
      this.view = 'CONFIRMED';
      this.savBtnflag = true;
      this.clrBtnFlag = true;
      this.assBtnFlg = true;
      this.offprogprofBean = new OffenderProgramProfiles();
      this.offprogprofData = [];
      this.offenderprogramprofiles2Data = [];
      this.offprgWaitModel = new OffenderProgramProfiles();
      this.voffcourseevntsBean = new VOffenderCourseEvents();
      this.voffcourseevntsData = [];
      this.courseInsBtn = false;
      this.readonly = true;
      this.rejReadonly = true;
      this.setvCourseColHeaders();
      this.offprogprofBean.offenderEndCommentText = undefined;
      this.bookingDate = undefined;
      this.assLaunchBtnFlg = true;
    }
  }
  getBookingDate() {
    const getbkgdate = this.oidpactiFactory.getBookingDate(this.vHeaderBlockModel);
    getbkgdate.subscribe(bkgDate => {
      if (bkgDate) {
        this.bookingDate = DateFormat.getDate(bkgDate);
      } else {
        this.bookingDate = undefined;
      }
    });
  }

  /**
   *  This function will be executed when commit event is
  * fired
  */
  oidpactiSaveoffprogprofForm(event) {
    this.assignSaveFlag = false;
    this.offprogprofInsertList = [];
    this.offprogprofUpdateList = [];
    this.offprogprofDeleteList = [];
    this.offprogprofInsertList = event.added;
    this.offprogprofUpdateList = event.updated;
    this.offprogprofDeleteList = event.removed;
    this.offprogprofCommitModel.insertList = [];
    this.offprogprofCommitModel.updateList = [];
    this.offprogprofCommitModel.deleteList = [];
    if (this.offprogprofInsertList.length > 0 || this.offprogprofUpdateList.length > 0) {
      for (let i = 0; i < this.offprogprofInsertList.length; i++) { 
          if(DateFormat.compareDate(DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate ),
          DateFormat.getDate(this.offprogprofBean.scheduleStartDate)) == 0){
           if(DateFormat.compareDate(DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate ),
           DateFormat.getDate(this.offprogprofInsertList[i].offenderStartDate)) == 1){
             this.show(this.translateService.translate('oidpacti.offstartdateearlierthanadmissiondate'));
             return true;
           }
       }
       if(DateFormat.compareDate(DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate ),
          DateFormat.getDate(this.offprogprofBean.scheduleStartDate)) == 1){
           if(DateFormat.compareDate(DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate ),
           DateFormat.getDate(this.offprogprofInsertList[i].offenderStartDate)) == 1){
             this.show(this.translateService.translate('oidpacti.offstartdateearlierthanadmissiondate'));
             return true;
           }
       }
       if(DateFormat.compareDate(DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate ),
         DateFormat.getDate(this.offprogprofBean.scheduleStartDate)) == -1){
           if(DateFormat.compareDate(DateFormat.getDate(this.offprogprofBean.scheduleStartDate),
           DateFormat.getDate(this.offprogprofInsertList[i].offenderStartDate)) == 1){
             this.show(this.translateService.translate('oidpacti.offstartdateearlierthanprogramschstartdate'));
             return true;
           }
       }   
        if (this.assignValidations(this.offprogprofInsertList[i])) {
          return;
        }
        this.offprogprofInsertList[i].offenderId = this.vHeaderBlockModel.rootOffenderId;
        this.offprogprofInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.offprogprofInsertList[i].offenderProgramStatus = 'ALLOC';
        this.offprogprofInsertList[i].holidayFlag = 'Y';
        this.offprogprofInsertList[i].neededFlag = 'Y';
        this.offprogprofInsertList[i].profileClass = 'PRG';
        this.offprogprofInsertList[i].suspendedFlag = this.offprogprofInsertList[i].suspendedFlag ? 'Y' : 'N';
      }
      for (let i = 0; i < this.offprogprofUpdateList.length; i++) {
        this.offprogprofUpdateList[i].suspendedFlag = this.offprogprofUpdateList[i].suspendedFlag ? 'Y' : 'N';
        if (this.assignValidations(this.offprogprofUpdateList[i])) {
          return;
        }
          if(DateFormat.compareDate(DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate ),
          DateFormat.getDate(this.offprogprofBean.scheduleStartDate)) == 0){
  
            if(DateFormat.compareDate(DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate ),
            DateFormat.getDate(this.offprogprofUpdateList[i].offenderStartDate)) == 1){
              this.show(this.translateService.translate('oidpacti.offstartdateearlierthanadmissiondate'));
              return true;
            }
       }
  
       if(DateFormat.compareDate(DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate ),
       DateFormat.getDate(this.offprogprofBean.scheduleStartDate)) == -1){
  
        if(DateFormat.compareDate(DateFormat.getDate(this.offprogprofBean.scheduleStartDate ),
          DateFormat.getDate(this.offprogprofUpdateList[i].offenderStartDate)) == 1){
            this.show(this.translateService.translate('oidpacti.offstartdateearlierthanprogramschstartdate'));
            return true;
          }
  
     }
     
       if(DateFormat.compareDate(DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate ),
          DateFormat.getDate(this.offprogprofBean.scheduleStartDate)) == 1){
  
            if(DateFormat.compareDate(DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate),
            DateFormat.getDate(this.offprogprofUpdateList[i].offenderStartDate)) == 1){
              this.show(this.translateService.translate('oidpacti.offstartdateearlierthanadmissiondate'));
              return true;
            }
  
       }

      }
      this.offprogprofCommitModel.insertList = this.offprogprofInsertList;
      this.offprogprofCommitModel.updateList = this.offprogprofUpdateList;
    }
    if (this.offprogprofDeleteList.length > 0) {
      if (this.profileValue === 'Y') {
        const data = {
          label: this.translateService.translate(
            'oidpacti.doyouwishtodeleteallexistingschedulesandttendancerecords')
          , yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
          if (result) {
            this.offprogprofCommitModel.deleteList = this.offprogprofDeleteList;
            this.saveQuery(this.offprogprofCommitModel);
          } else {
            this.oidpactiexecuteQuery();
          }
        });
      } else {
        this.offprogprofCommitModel.deleteList = this.offprogprofDeleteList;
        this.saveQuery(this.offprogprofCommitModel);
      }
    } else {
      this.saveQuery(this.offprogprofCommitModel);  
    }
  }
  saveQuery(event) {
    const offprogprofSaveData = this.oidpactiFactory.offProgProfCommit(event);
    offprogprofSaveData.subscribe(data => {
      if (data !== undefined && data.sealFlag === 'success') {
        this.oidpactiexecuteQuery();
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
        if (this.offprogprofBean.offPrgrefId) {
          this.voffcourseevntsExecuteQuery();
        }
      } else if (data !== undefined && data.sealFlag === '2') {
        this.show(this.translateService.translate('oidpacti.theoffenderhasalreadybeenassignedtotheactivity'));
        return;
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
      }
    });
  }
  // execute query
  oidpactiexecuteQuery() {
    this.offprogprofModel = new OffenderProgramProfiles();
    this.offprogprofModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
    const serviceObj = this.oidpactiFactory.
      offProgProfExecuteQuery(this.offprogprofModel);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.offprogprofData = []; 
        this.savBtnflag = true;
        this.clrBtnFlag = true;
        this.courseInsBtn = false;
        this.assLaunchBtnFlg = true;
        this.maxHours =  undefined;
      } else {
        this.maxHours =  this.prgSrvSetModel.instActMaxScheduledHours ;
        data.forEach(elemnt => {
          elemnt.programId = String(elemnt.programId);
          elemnt.button = '..';
          elemnt.suspendedFlag = elemnt.suspendedFlag === 'Y' ? true : false;
        });
        this.offprogprofData = data;
        this.offprogprofModel = this.offprogprofData[0];
        this.offprogprofIndex = 0;
        this.savBtnflag = true;
        this.clrBtnFlag = true;
      }
    });
  }

  get assignmentsDeleteBtn() {
    if(this.hideDelBtn){
      return !this.hideDelBtn;
    }
   else if (this.offprogprofData?.length > 0) {
      if (this.voffcourseevntsData?.length > 0) {
        if (this.offprogprofModel && this.offprogprofModel['payflagCount'] > 0) {
          return false;
        } else {
          return true;
        }

      } else {
        return true;
      }
    }
    return false;
  }
  assignValidations(event) {
    if (!event.agyLocId) {
      this.show(this.translateService.translate('oidpacti.agencymustbeentered').replace('%location%', this.translateService.translate('system-profile.inst-agency')));
      return true;
    }
    if (!event.programId) {
      this.show(this.translateService.translate('oidpacti.servicemustbeentered'));
      return true;
    }
    if (!event.activityDescription) {
      this.show(this.translateService.translate('oidpacti.activitydescriptionmustbeentered'));
      return true;
    }
    if (!event.offenderStartDate) {
      this.show(this.translateService.translate('oidpacti.offenderstartdatemustbeentered'));
      return true;
    }
    if (event.offenderStartDate && event.offenderEndDate) {
      if (DateFormat.compareDate(DateFormat.getDate(event.offenderStartDate),
        DateFormat.getDate(event.offenderEndDate)) === 1) {
        this.show(this.translateService.translate('oidpacti.offenderenddatemustnotbebeforeoffenderstartdate'));
        return true;
      }
    }
    if (!event.offPrgrefId) {
      const lDate = DateFormat.getDate(DateFormat.getDate().setDate(DateFormat.getDate().getDate() + 30));
      if (DateFormat.compareDate(DateFormat.getDate(event.scheduleStartDate),
        DateFormat.getDate(lDate)) === 1) {
        const h = Math.abs(DateFormat.getDate(event.scheduleStartDate).getTime() -
          DateFormat.getDate().getTime()) / 36e5;
        const lvNoOfDays = Math.round(h / 24);
        this.show(this.translateService.translate('oidpacti.theassignedactivitystartsafter') + lvNoOfDays);
        }
      }
    if (event.startDateValidation) {
      this.show(event.startDateValidation);
      return true;
    }
  }
  /*
      *  This event is used to insert the data in HousingLocations Block.
      */
  onGridInsert = () => {
    this.offprogprofRowData = [];
    this.grid.addedMap.forEach(
      (v: any, k: number) => {
        this.offprogprofRowData.push(v);
      }
    );
    this.grid.updatedMap.forEach(
      (v: any, k: number) => {
        this.offprogprofRowData.push(v);
      }
    );
    for (let i = 0; i < this.offprogprofRowData.length; i++) {
      if (this.assignValidations(this.offprogprofRowData[i])) {
        return;
      }
    }
    if(this.vHeaderBlockModel.statusDisplay == 'Inactive'){
      this.show(this.translateService.translate('oidpacti.inactiveoffenderscannotbeassignedtoInstitutionalActivities'));
      return;
    }
    return { button: '..', offenderStartDate: DateFormat.getDate(),crsActyId: '' };
  }
  validateRowData = (event) => {
    const index = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event.field === 'programId') {
      this.grid.setColumnData('activityDescription', index, undefined);
      this.grid.setColumnData('crsActyId', index, undefined);
      event.data.crsActyId = undefined;
      rowdata.validated = true;
      return rowdata;
    }
    if (event.field === 'activityDescription' && event.data.activityDescription && !event.data.crsActyId) {
      const getdata = this.oidpactiFactory.
        getCourseActivity(event.data);
      getdata.subscribe(data => {
        if (data.crsActyId) {
          this.grid.setColumnData('activityDescription', index, data.activityDescription);
          this.grid.setColumnData('crsActyId', index, data.crsActyId);
          event.data.crsActyId = data.crsActyId;
          this.checkConflict(event.data);
          rowdata.validated = true;
          return rowdata;
        } else {
          event.programDescription = this.serviceMap.get(event.data.programId);
          event.facilityDescription = this.agyLocIdMap.get(event.data.agyLocId);
          event.programId = event.data.programId;
          event.agyLocId = event.data.agyLocId;
          event.moduleName = 'OIDPACTI';
          this.dialogService.openLinkDialog('/OIDACSEL', event, 80).subscribe(result => {
            if (result) {
              this.grid.setColumnData('activityDescription', index, result.activity);
              this.grid.setColumnData('offenderStartDate', index, DateFormat.getDate(result.scheduleStartDate));
              this.grid.setColumnData('crsActyId', index, result.crsActyId);
              event.data.crsActyId = result.crsActyId;
              this.checkConflict(event.data);
              rowdata.validated = true;
              return rowdata;
            } else {
              this.grid.setColumnData('activityDescription', index, undefined);
              this.grid.setColumnData('offenderStartDate', index, undefined);
              this.grid.setColumnData('crsActyId', index, undefined);
              event.data.crsActyId = undefined;
              rowdata.validated = true;
              return rowdata;
            }
          });
        }
      });
    }
    if (event.field === 'offenderStartDate' && event.data.offenderStartDate) {
      if (event.data.offenderStartDate && event.data.offenderEndDate) {
        if (DateFormat.compareDate(DateFormat.getDate(event.data.offenderStartDate),
          DateFormat.getDate(event.data.offenderEndDate)) === 1) {
          this.show(this.translateService.translate('oidpacti.offenderenddatemustnotbebeforeoffenderstartdate'));
          rowdata.validated = true;
          return rowdata;
        }
      }
      this.assignSaveFlag = false;
      this.validateOffenderStartDate(event.data);
    }
    if (event.field === 'suspendedFlag' && event.data.offPrgrefId ) {
      if (event.data.offenderEndDate) {
        if (DateFormat.compareDate(DateFormat.getDate(),
        DateFormat.getDate(event.data.offenderEndDate)) === 1) {
          this.grid.setColumnData('suspendedFlag', index, false);
        }
      }
    }
    rowdata.validated = true;
    return rowdata;

  }

  validateActivity(event) {
    event.offenderBookId = this.vHeaderBlockModel.offenderBookId;
    event.offenderId = this.vHeaderBlockModel.offenderId;
    const checkWaitlist = this.oidpactiFactory.checkWaitList2(event);
    checkWaitlist.subscribe(data => {
      if (this.selectedTabIndex === 0) {
        const index = this.offprogprofData.indexOf(event);
        if (data.P_EXISTS_PEN >= 1) {
          this.show(this.translateService.translate('oidpacti.offenderexistsonwaitinglistforthisactivity'));
          this.grid.setColumnData('activityDescription', index, undefined);
          this.grid.setColumnData('offenderStartDate', index, undefined);
          this.grid.setColumnData('crsActyId', index, undefined);
          return;
        } else if (data.P_EXISTS_APP >= 1) {
          this.show(this.translateService.translate('oidpacti.offenderhasalreadybeenapprovedfortheactivitiy'));
          this.grid.setColumnData('activityDescription', index, undefined);
          this.grid.setColumnData('offenderStartDate', index, undefined);
          this.grid.setColumnData('crsActyId', index, undefined);
          return;
        } else {
          this.courseVacancy(event);
          // this.checkConflict(event);
        }
      } else {
        const waitindex = this.offenderprogramprofiles2Data.indexOf(event);
        if (data.P_EXISTS_PEN >= 1) {
          this.show(this.translateService.translate('oidpacti.offenderexistsonwaitinglistforthisactivity'));
          this.waitgrid.setColumnData('activityDescription', waitindex, undefined);
          this.waitgrid.setColumnData('offenderStartDate', waitindex, undefined);
          this.waitgrid.setColumnData('crsActyId', waitindex, undefined);
          return;
        } else if (data.P_EXISTS_APP >= 1) {
          this.show(this.translateService.translate('oidpacti.offenderhasalreadybeenapprovedfortheactivitiy'));
          this.waitgrid.setColumnData('activityDescription', waitindex, undefined);
          this.waitgrid.setColumnData('offenderStartDate', waitindex, undefined);
          this.waitgrid.setColumnData('crsActyId', waitindex, undefined);
          return;
        } else if (data.P_EXISTS_ALLOC >= 1) {
          const dataa = {
            label: this.translateService.translate('oidpacti.theoffenderhasalreadybeenassigned')
            , yesBtn: true, noBtn: true
          };
          this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dataa, 50).subscribe(result => {
            if (result) {
              this.courseVacancy(event);
            } else {
              this.waitgrid.setColumnData('waitlistDecisionCode', waitindex, 'PEN');
              this.waitgrid.setColumnData('vacancy', waitindex, undefined);
              this.waitgrid.setColumnData('crsActyId', waitindex, undefined);
              this.waitgrid.setColumnData('rejectReasonCode', waitindex, undefined);
              this.waitgrid.setColumnData('rejectDate', waitindex, undefined);
              this.waitgrid.setColumnData('activityDescription', waitindex, undefined);
            }
          });
        } else {
        this.courseVacancy(event);
        }
      }
    });
  }
  checkConflict(event) {
    event.offenderId = this.vHeaderBlockModel.rootOffenderId;
    event.offenderBookId = this.vHeaderBlockModel.offenderBookId;
    event.lastName=this.vHeaderBlockModel.lastName;
    event.firstName=this.vHeaderBlockModel.firstName;
    event.offenderIdDisplay=this.vHeaderBlockModel.offenderIdDisplay;
    const chkNaPrgConflict = this.oidpactiFactory.checkNonAssociationsData(event);
    chkNaPrgConflict.subscribe(data => {
      if(data && data != 'EMPTYDATA'){
        const msgOne  = this.translateService.translate('oidpacti.selectedoffender') +" "+event.lastName+" "+event.firstName+" "+event.offenderIdDisplay+" "+this.translateService.translate('oidpacti.nonassociationwithoffender');
        const msgTwo = this.translateService.translate('oidpacti.doyouwanttocontinue');
        const msgThree = this.translateService.translate('oidpacti.indinonassocconflict');
        const msgFour = this.translateService.translate('oidpacti.gangnonassocconflict');
        data = data.replaceAll(('oidpacti.selectedoffender') +" "+event.lastName+" "+event.firstName+" "+event.offenderIdDisplay+" "+('oidpacti.nonassociationwithoffender'),msgOne);
        data = data.replaceAll('oidpacti.doyouwanttocontinue',msgTwo);
        data = data.replaceAll('oidpacti.indinonassocconflict',msgThree);
        data = data.replaceAll('oidpacti.gangnonassocconflict',msgFour);
        const labelMsg = {
            label: this.translateService.translate(data), yesBtn: true, proceedWithNoConflictsBtn: false,cancelBtn:true,
                proceedBtnDisabled: true
            };
        this.dialogService.openLinkDialog('/OCUNAWRN', labelMsg, 50).subscribe(result => {
          if (result) {
            if (this.selectedTabIndex === 0) {
              this.validateActivity(event);
           } else if (this.assignSaveFlag) {
              this.saveAssignCommit();
            }
          } else {
            if (this.selectedTabIndex === 0) {
              const index = this.offprogprofData.indexOf(event);
              this.grid.setColumnData('activityDescription', index, undefined);
              this.grid.setColumnData('offenderStartDate', index, undefined);
              this.grid.setColumnData('crsActyId', index, undefined);
              event.crsActyId = undefined;
              this.offprogprofData[index].crsActyId = undefined;
              this.oidacselClick(this.offprogprofBean);
           }
            return;
          }
        });
      } else {
        if (this.selectedTabIndex === 0) {
           this.validateActivity(event);
        } else if (this.assignSaveFlag) {
          this.saveAssignCommit();
        }
        return;
      }
      this.checkFlag = true;
    });
  }
  validateOffenderStartDate(event) {
    let lOffAdmDate;
    if (this.selectedTabIndex === 0) {
      const index = this.offprogprofData.indexOf(event);
      this.grid.setColumnData('startDateValidation', index, undefined);
    } else {
      const waitIndex = this.offenderprogramprofiles2Data.indexOf(event);
      this.waitgrid.setColumnData('startDateValidation', waitIndex, undefined);
    }
    if (event.offenderBookId && event.offenderStartDate) {
      const getData = this.oidpactiFactory.
        getAdmissionDate(event);
      getData.subscribe(data => {
        if (data) {
          // const lDate = DateFormat.getDate(DateFormat.getDate().setDate(DateFormat.getDate().getDate() + 30));
          // if (DateFormat.compareDate(DateFormat.getDate(event.scheduleStartDate),
          //   DateFormat.getDate(lDate)) === 1) {
          //   const h = Math.abs(DateFormat.getDate(event.scheduleStartDate).getTime() -
          //     DateFormat.getDate().getTime()) / 36e5;
          //   const lvNoOfDays = Math.round(h / 24);
          //   this.show(this.translateService.translate('oidpacti.theassignedactivitystartsafter') + lvNoOfDays);
          //   // this.startDateValSetTogrid(this.translateService.translate('oidpacti.theassignedactivitystartsafter'));
          //   // return true;
          // }
          if (this.assignSaveFlag) {
            if (!event.offPrgrefId) {
            const lDate = DateFormat.getDate(DateFormat.getDate().setDate(DateFormat.getDate().getDate() + 30));
            if (DateFormat.compareDate(DateFormat.getDate(event.scheduleStartDate),
              DateFormat.getDate(lDate)) === 1) {
              const h = Math.abs(DateFormat.getDate(event.scheduleStartDate).getTime() -
                DateFormat.getDate().getTime()) / 36e5;
              const lvNoOfDays = Math.round(h / 24);
              this.show(this.translateService.translate('oidpacti.theassignedactivitystartsafter') + lvNoOfDays);
              }
            }
            this.checkConflict(event);
          }
        }
      });
    }
  }
  startDateValSetTogrid(event) {
    if (this.selectedTabIndex === 0) {
      const index = this.offprogprofData.indexOf(this.offprogprofBean);
      this.grid.setColumnData('startDateValidation', index, event);
    } else {
      const waitIndex = this.offenderprogramprofiles2Data.indexOf(this.offprgWaitModel);
      this.waitgrid.setColumnData('startDateValidation', waitIndex, event);
    }
  }
  validatewaitRowData = (event) => {
    const index = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event.field === 'programId') {
      this.waitgrid.setColumnData('activityDescription', index, undefined);
      this.waitgrid.setColumnData('crsActyId', index, undefined);
      event.data.crsActyId = undefined;
      rowdata.validated = true;
      return rowdata;
    }
    if (event.field === 'waitlistDecisionCode') {
      if (event.data.waitlistDecisionCode === 'REJ') {
        this.assBtnFlg = true;
        this.rejReasonFlag = true;
      } else {
        this.assBtnFlg = false;
        this.rejReasonFlag = false;
      }
      if (event.field = 'waitlistDecisionCode' && event.data.waitlistDecisionCode === 'APP') {
        if (!event.data.crsActyId) {
          this.waitgrid.setColumnData('waitlistDecisionCode', index, undefined);
          this.rejReadonly = true;
          this.show(this.translateService.translate('oidpacti.cannotcreaterecordwithoutselectingactivity'));
          rowdata.validated = true;
          return rowdata;
        }

      }
      if (event.data.waitlistDecisionCode === 'REJ' && !event.data.offPrgrefId) {
        this.rejReadonly = false;
      } else if (event.data.offPrgrefId && event.data.decision === 'REJ') {
        this.rejReadonly = true;
      } else if (event.data.waitlistDecisionCode === 'REJ' && event.data.offPrgrefId && event.data.decision !== 'REJ') {
        this.rejReadonly = false;
      } else {
        this.rejReadonly = true;
      }
      if (event.data.waitlistDecisionCode === 'REJ' || event.data.waitlistDecisionCode === 'APP') {
        this.offprgWaitModel.rejectDate = DateFormat.getDate();
        event.data.rejectDate = DateFormat.getDate();
        this.offprgWaitModel.offenderStartDate = DateFormat.getDate();
        this.offprgWaitModel.offenderEndDate = event.data.scheduleEndDate;
      } else {
        this.offprgWaitModel.rejectDate = undefined;
        event.data.rejectDate = undefined;
      }
      rowdata.validated = true;
      return rowdata;
    }
    if (event.field === 'activityDescription' && event.data.activityDescription && !event.data.crsActyId) {
      const getdata = this.oidpactiFactory.
        getCourseActivity(event.data);
      getdata.subscribe(data => {
        if (data.crsActyId) {
          this.waitgrid.setColumnData('activityDescription', index, data.activityDescription);
          this.waitgrid.setColumnData('crsActyId', index, data.crsActyId);
          event.data.crsActyId = data.crsActyId;
          this.courseVacancy(event.data);
          this.validateActivity(event.data);
          rowdata.validated = true;
          return rowdata;
        } else {
          event.programDescription = this.serviceMap.get(event.data.programId);
          event.facilityDescription = this.agyLocIdMap.get(event.data.agyLocId);
          event.programId = event.data.programId;
          event.agyLocId = event.data.agyLocId;
          event.moduleName = 'OIDPACTI';
          this.dialogService.openLinkDialog('/OIDACSEL', event, 80).subscribe(result => {
            if (result) {
              this.waitgrid.setColumnData('activityDescription', index, result.activity);
              this.waitgrid.setColumnData('crsActyId', index, result.crsActyId);
              event.data.crsActyId = result.crsActyId;
              this.validateActivity(event.data);
              rowdata.validated = true;
              return rowdata;
            } else {
              this.waitgrid.setColumnData('activityDescription', index, undefined);
              this.waitgrid.setColumnData('crsActyId', index, undefined);
              event.data.crsActyId = undefined;
              rowdata.validated = true;
              return rowdata;
            }
          });
        }
      });
    }

    rowdata.validated = true;
    return rowdata;

  }
  voffcourseevntsExecuteQuery() {
    this.voffcourseevntsModel.offPrgrefId = this.offprogprofBean.offPrgrefId;
    this.voffcourseevntsModel.eventOutcome = this.view;
    const voffcourseevntsResult = this.oidpactiFactory.
      vOffCourseEvntsExecuteQuery(this.voffcourseevntsModel);
    voffcourseevntsResult.subscribe(voffcourseevntsResultList => {
      if (voffcourseevntsResultList.length === 0) {
        this.voffcourseevntsData = [];
        this.voffcourseevntsIndex = -1;
      } else {
        voffcourseevntsResultList.forEach(elemnt => {
          // if (elemnt.eventOutcome !== 'ATT' && this.view === 'CONFIRMED') {
          //   elemnt.startTime = undefined;
          //   elemnt.endTime = undefined;
          // }
          if (DateFormat.compareDate(DateFormat.getDate(elemnt.eventDate),
            DateFormat.getDate()) === 1) {
            elemnt.pshowoutcome = 'CANC';
            elemnt.eventFlag = true;
          } else {
            elemnt.pshowoutcome = '';
            elemnt.eventFlag = false;
          }
          if(elemnt.startTime && elemnt.endTime) {
            elemnt.nbtHours  = this.caluculateTime(elemnt.startTime , elemnt.endTime);
          }
          elemnt.payFlag = elemnt.payBatchId > 0 ? true : false;
          elemnt.view = elemnt.payFlag;
          elemnt.line = 'false';
        });
        this.voffcourseevntsData = voffcourseevntsResultList;
        this.voffcourseevntsModel = voffcourseevntsResultList[0];
        this.voffcourseevntsIndex = 0;
      }
    });
  }
    /**
   *  This function will be executed when commit event is
  * fired
  */
  oidpactiSavevoffcourseevntsForm(event) {
    this.voffcourseevntsInsertList = [];
    this.voffcourseevntsUpdateList = [];
    this.voffcourseevntsDeleteList = [];
    this.voffcourseevntsUpdateList = event.updated;
    this.voffcourseevntsDeleteList = event.removed;
    this.voffcourseevntsCommitModel.insertList = [];
    this.voffcourseevntsCommitModel.updateList = [];
    this.voffcourseevntsCommitModel.deleteList = [];
    if (this.voffcourseevntsUpdateList.length > 0) {
      for (let i = 0; i < this.voffcourseevntsUpdateList.length; i++) {
        if (!this.voffcourseevntsUpdateList[i].eventOutcome) {
          this.show(this.translateService.translate('oidpacti.confirmattendenceisamandatoryfield'));
          return;
        }
        if (this.voffcourseevntsUpdateList[i].eventOutcome === 'ATT') {
          if (!this.voffcourseevntsUpdateList[i].startTime) {
            this.show(this.translateService.translate('oidpacti.thestarttimefieldismandatory'));
            return;
          }
          if (!this.voffcourseevntsUpdateList[i].endTime) {
            this.show(this.translateService.translate('oidpacti.theendtimefieldismandatory'));
            return;
          }
          if (DateFormat.compareDate(DateFormat.getDate(this.voffcourseevntsUpdateList[i].startTime),
          DateFormat.getDate(this.voffcourseevntsUpdateList[i].endTime)) === 1) {
            this.show(this.translateService.translate('oidpacti.starttimecannotbegreaterthanendtime'));
            return;
          }
          if (!this.voffcourseevntsUpdateList[i].performanceCode) {
            this.show(this.translateService.translate('oidpacti.theperformancefieldismandatory'));
            return;
          } 
        }
          if(this.voffcourseevntsUpdateList[i].startTime && this.voffcourseevntsUpdateList[i].endTime) {
            if (DateFormat.compareTime(DateFormat.getDate(this.voffcourseevntsUpdateList[i].startTime),
            DateFormat.getDate(this.voffcourseevntsUpdateList[i].endTime)) === 1) {
              this.show(this.translateService.translate('oidpacti.starttimecannotbegreaterthanendtime'));
              return;
            }
            if (DateFormat.compareTime(DateFormat.getDate(this.voffcourseevntsUpdateList[i].nbtHours),
             DateFormat.getDate(this.maxHoursDate)) === 1) {
              this.show('oidpacti.durationexceedsmaxhors', 'warn');
              const rowIndex = this.voffcourseevntsData.indexOf(this.voffcourseevntsUpdateList[i]);
              this.coursegrid.setColumnData('endTime', rowIndex, this.voffcourseevntsUpdateList[i].dbEndTime);
              this.coursegrid.setColumnData('startTime', rowIndex, this.voffcourseevntsUpdateList[i].dbStartTime);
              return;
            }

          }
        
        this.voffcourseevntsCommitModel.updateList = this.voffcourseevntsUpdateList;
      }
    }
    if (this.voffcourseevntsDeleteList.length > 0) {
      for (let i = 0; i < this.voffcourseevntsDeleteList.length; i++) {
      }
      this.voffcourseevntsCommitModel.deleteList = this.voffcourseevntsDeleteList;
    }
    const voffcourseevntsSaveData = this.oidpactiFactory.vOffCourseEvntsCommit(this.voffcourseevntsCommitModel);
    voffcourseevntsSaveData.subscribe(data => {
      if (data === 1) {
        this.oidpactiexecuteQuery(); 
          this.voffcourseevntsExecuteQuery();     
        
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
      }
            else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
      }
    });
  }
  validateVoofCourseRowData = (event) => {
    const index = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event.field === 'eventOutcome' && event.data.eventOutcome !== 'ATT') {
      this.coursegrid.setColumnData('startTime', index, event.data.dbStartTime);
      this.coursegrid.setColumnData('endTime', index, event.data.dbEndTime);
      this.coursegrid.setColumnData('performanceCode', index, undefined);
      //this.coursegrid.requiredOff('performanceCode');
      this.coursegrid.requiredOff('startTime');
      this.coursegrid.requiredOff('endTime');
      if (event.data.dbStartTime && event.data.dbEndTime) {
        const durationVal = this.caluculateTime(event.data.dbStartTime, event.data.dbEndTime);;
        this.coursegrid.setColumnData('nbtHours', index, durationVal);
      }
      rowdata.validated = true;
      return rowdata;
    } else if (event.field === 'eventOutcome' && event.data.eventOutcome === 'ATT') {
      this.coursegrid.setColumnData('startTime', index, event.data.dbStartTime);
      this.coursegrid.setColumnData('endTime', index, event.data.dbEndTime);
      this.coursegrid.setColumnData('performanceCode', index, undefined);
        //this.coursegrid.requiredOn('performanceCode');
        this.coursegrid.requiredOn('startTime');
        this.coursegrid.requiredOn('endTime');
      rowdata.validated = true;
      return rowdata;
    }
    if (event.field === 'eventDate' && event.data.eventDate) {
      if (DateFormat.compareDate(DateFormat.getDate(event.data.eventDate),
        DateFormat.getDate()) === 1) {
        this.coursegrid.setColumnData('pshowoutcome', index, 'CANC');
      } else {
        this.coursegrid.setColumnData('pshowoutcome', index, '');
      }
}
    if (event.field === 'startTime' || event.field === 'endTime'){
      if (event.data.startTime && event.data.endTime) {
      const durationVal = this.caluculateTime(event.data.startTime, event.data.endTime);;
      this.coursegrid.setColumnData('nbtHours', index, durationVal);
      } else {
        this.coursegrid.setColumnData('nbtHours', index, undefined);
      }
      
    }
    rowdata.validated = true;
    return rowdata;
  }
  offenderprogramprofiles2ExecuteQuery() {
    this.offenderprogramprofiles2Model.offenderBookId = this.vHeaderBlockModel.offenderBookId;
    const offenderprogramprofiles2Result = this.oidpactiFactory.
      offenderProgramProfileswaitExecuteQuery(this.offenderprogramprofiles2Model);
    offenderprogramprofiles2Result.subscribe(offenderprogramprofiles2ResultList => {
      if (offenderprogramprofiles2ResultList.length === 0) {
        this.offenderprogramprofiles2Data = [];
        this.offprgWaitModel = new OffenderProgramProfiles();
        this.assBtnFlg = true;
      } else {
        offenderprogramprofiles2ResultList.forEach(elemnt => {
          elemnt.programId = String(elemnt.programId);
          elemnt.button = '..';
          elemnt.systemMode = '';
        });
        this.offenderprogramprofiles2Data = offenderprogramprofiles2ResultList;
        this.offenderprogramprofiles2Model = offenderprogramprofiles2ResultList[0];
        this.offenderprogramprofiles2Index = 0;
      }
    });
  }
  onGridWaitInsert = () => {
    this.rejReadonly = true;
    this.offenderprogramprofilesWaitRowData = [];
    this.waitgrid.addedMap.forEach(
      (v: any, k: number) => {
        this.offenderprogramprofilesWaitRowData.push(v);
      }
    );
    this.waitgrid.updatedMap.forEach(
      (v: any, k: number) => {
        this.offenderprogramprofilesWaitRowData.push(v);
      }
    );
    for (let i = 0; i < this.offenderprogramprofilesWaitRowData.length; i++) {
      if (this.waitValidations(this.offenderprogramprofilesWaitRowData[i])) {
        return;
      }
    }
    if(this.vHeaderBlockModel.statusDisplay == 'Inactive'){
      this.show(this.translateService.translate('oidpacti.inactiveoffenderscannotbeassignedtoInstitutionalActivities'));
      return;
    }
    return {
      button: '..', referralDate: DateFormat.getDate(), waitlistDecisionCode: 'PEN', systemMode: 'ENTER-QUERY',
      agyLocId: this.vHeaderBlockModel.agyLocId
    };
  }
  /**
   *  This function will be executed when we click on validation button
   *
   */
  onbutLaunchClick = () => {
    // if (this.grid.addedMap.size > 0 || this.grid.updatedMap.size > 0) {
    //   return false;
    // }
    this.oiischedFactory.oidpactiFlag = true;
    this.oiischedFactory.exitFlag = true;
    this.oiischedFactory.vHeaderBlockModel = this.vHeaderBlockModel;
    this.router.navigate(['/OIISCHED']);
    return true;
  }
  onAssbutLaunchClick = () => {
      const programId = this.offprogprofBean.programId;
      this.oidpactiFactory.programId = programId;
      this.oidcnoteFactory.exitFlag = true;
      this.assesFlag = true;
      this.router.navigate(['/OCDNOQUE']);
      return true;
  }
  get reasonReadOnly() {
    if (!this.vHeaderBlockModel) {
      return true;
    } else if (!this.offprogprofBean.offenderEndDate) {
      return true;
    }
    return false;
  }
  onReasonChange(event) {
    const rowIndex = this.offprogprofData.indexOf(this.offprogprofBean);
    if (event) {
      if (this.offprogprofBean.offEndReasonVal !== this.offprogprofBean.offenderEndReason) {
        this.grid.setColumnData('offenderEndReason', rowIndex, this.offprogprofBean.offenderEndReason);
        this.grid.setColumnData('test', rowIndex, this.offprogprofBean.offenderEndReason);
        this.extSave = true;
        this.savBtnflag = false;
      }
    }
  }
  onCommentChange() {
    const rowIndex = this.offprogprofData.indexOf(this.offprogprofBean);
    if (this.offprogprofBean.offEndCommentVal !== this.offprogprofBean.offenderEndCommentText) {
      this.extSave = true;
      this.savBtnflag = false;
      this.grid.setColumnData('test', rowIndex, this.offprogprofBean.offenderEndCommentText);
      this.grid.setColumnData('offenderEndCommentText', rowIndex, this.offprogprofBean.offenderEndCommentText);
    }
  }
  courseVacancy(event) {
    const waitindex = this.offenderprogramprofiles2Data.indexOf(this.offprgWaitModel);
    const index = this.offprogprofData.indexOf(this.offprogprofBean);
    const getvacany = this.oidpactiFactory.courseVacancy(event);
    getvacany.subscribe(data => {
        if (data <= 0) {
          const dataa = {
            label: this.translateService.translate('oidpacti.thereisnovacancyforthiscourse')
            , yesBtn: true, noBtn: true
          };
          this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dataa, 50).subscribe(result => {
            if (result) {
              if (this.selectedTabIndex !== 0) {
              this.waitgrid.setColumnData('vacancy', waitindex, data);
              }
            } else {
              if (this.selectedTabIndex === 0) {
                this.grid.setColumnData('activityDescription', index, undefined);
                this.grid.setColumnData('crsActyId', index, undefined);
                this.offprogprofBean.crsActyId = undefined;
              } else {
                this.waitgrid.setColumnData('vacancy', waitindex, undefined);
                this.waitgrid.setColumnData('crsActyId', waitindex, undefined);
                this.waitgrid.setColumnData('rejectReasonCode', waitindex, undefined);
                this.waitgrid.setColumnData('rejectDate', waitindex, undefined);
                this.waitgrid.setColumnData('activityDescription', waitindex, undefined);
                this.offprgWaitModel.crsActyId = undefined;
              }
            }
          });
        } else {
          this.waitgrid.setColumnData('vacancy', waitindex, data);
        }
    });
  }
  assignBtnClickEvent(startDate?,endDate?) {
    if (startDate) {
			if (startDate.lastValue === '0_/__/____') {
				this.show(this.translateService.translate('common.leapyearnotallowed'),'warn');
				return;
			}
			if (String(startDate.lastValue).indexOf('_') >= 0 && startDate.value === null) {
				this.show(this.translateService.translate('ocdclogs.dateformate'),'warn');
				return;
			}
    }

      if (endDate) {
			if (endDate.lastValue === '0_/__/____') {
				this.show(this.translateService.translate('common.leapyearnotallowed'),'warn');
				return;
			}
			if (String(endDate.lastValue).indexOf('_') >= 0 && endDate.value === null) {
				this.show(this.translateService.translate('ocdclogs.dateformate'),'warn');
				return;
			}
      }
    const getallocCount = this.oidpactiFactory.cntAsnCur(this.offprgWaitModel);
    getallocCount.subscribe(lCnt => {

      if (this.offprgWaitModel.offenderStartDate && this.offprgWaitModel.offenderEndDate) {
      if (DateFormat.compareDate(DateFormat.getDate(this.offprgWaitModel.offenderStartDate),
        DateFormat.getDate(this.offprgWaitModel.offenderEndDate)) === 1) {
        this.show(this.translateService.translate('oidpacti.offenderenddatemustnotbebeforeoffenderstartdate'));
        return;
      }
    }
      if (this.offprgWaitModel.waitlistDecisionCode === 'REJ' ||
        this.offprgWaitModel.waitlistDecisionCode === 'PEN' ||
        this.offprgWaitModel.waitlistDecisionCode === undefined) {
        this.show(this.translateService.translate('oidpacti.cannotassignanactivitythathasnotbeenapproved'));
        return;
      }
      if (!this.offprgWaitModel.offenderStartDate) {
        this.show(this.translateService.translate('oidpacti.cannotassignwithoutastartdate'));
        return;
      }
      if (!this.offprgWaitModel.crsActyId) {
        this.show(this.translateService.translate('oidpacti.cannotassignserviceasanactivityhasnotbeenselected'));
        return;
      }

      if (lCnt > 0) {
        this.show(this.translateService.translate('oidpacti.thisoffenderhasalreadybeenassignedtothisactivitiy'));
        return;
      }
      this.assignSaveFlag = true;
      this.offprgWaitModel.offenderId = this.vHeaderBlockModel.offenderId;
      this.offprgWaitModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
      this.validateOffenderStartDate(this.offprgWaitModel);
    });
  }
  saveAssignCommit() {
    if (!this.offprgWaitModel.offPrgrefId) {
      this.offprgWaitModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
      this.offprgWaitModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
      this.offprgWaitModel.offenderProgramStatus = 'WAIT';
      this.offprgWaitModel.holidayFlag = 'Y';
      this.offprgWaitModel.neededFlag = 'Y';
      this.offprgWaitModel.suspendedFlag = 'N';
      this.offprgWaitModel.profileClass = 'PRG';
    } else {
      this.offprgWaitModel.offenderProgramStatus = 'ALLOC';
    }
    this.offprgWaitModel.suspendedFlag = 'N';
    if (this.waitValidations(this.offprgWaitModel)) {
      return;
    }
    this.offprgWaitModel.suspendedFlag = 'N';  this.offprgWaitModel.suspendedFlag = 'N';
    this.offprgWaitModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
    const commitObj = this.oidpactiFactory.assignCommit(this.offprgWaitModel);
    commitObj.subscribe(data => {
      if (data !== undefined && data.sealFlag === 'success') {
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
        this.selectedTabIndex = 0;
        this.oidpactiexecuteQuery();
        this.offenderprogramprofiles2ExecuteQuery();
        this.assignSaveFlag = false;
      } else if (data !== undefined && data.sealFlag === '2') {
        this.show(this.translateService.translate('oidpacti.offenderalreadyisonwaitinglistforthisservice'));
        return;
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
      }
    });
  }
  // rejReasonChange() {
  //   if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId) {
  //     const rowIndex = this.offenderprogramprofiles2Data.indexOf(this.offprgWaitModel);
  //     if (this.offprgWaitModel.waitlistDecisionCode !== 'REJ') {
  //       this.show(this.translateService.translate('oidpacti.arejectionreasoncanonlybeenteredoncethedecisionisrejected'));
  //       this.waitgrid.setColumnData('rejectReasonCode', rowIndex, undefined);
  //       return;
  //     }
  //   }
  // }
  rejBlur() {
    if (!this.offprgWaitModel.rejectReasonCode) {
      this.offprgWaitModel.rejectReasonCode = this.offprgWaitModel.rejectReasonCode === '' ? undefined : '';
    }
  }
  onRejReasonChange(event) {
    const rowIndex = this.offenderprogramprofiles2Data.indexOf(this.offprgWaitModel);
    if (event) {
      if (this.offprgWaitModel.waitlistDecisionCode !== 'REJ') {
        this.show(this.translateService.translate('oidpacti.arejectionreasoncanonlybeenteredoncethedecisionisrejected'));
        this.waitgrid.setColumnData('rejectReasonCode', rowIndex, undefined);
        this.offprgWaitModel.rejectReasonCode = '';
        this.offprgWaitModel.rejectReasonCode = this.offprgWaitModel.rejectReasonCode === '' ? undefined : '';
        return;
      }
      if (this.offprgWaitModel.rejReason !== this.offprgWaitModel.rejectReasonCode &&
        this.offprgWaitModel.waitlistDecisionCode === 'REJ') {
        this.waitgrid.setColumnData('rejectReasonCode', rowIndex, this.offprgWaitModel.rejectReasonCode);
        this.waitgrid.setColumnData('waittest', rowIndex, this.offprgWaitModel.offenderEndReason);
        this.waitextSave = true;
      } else {
        this.offprgWaitModel.rejectReasonCode = this.offprgWaitModel.rejectReasonCode === '' ? undefined : '';
      }
    }
  }
  decisionDateEvent(event) {
    const rowIndex = this.offenderprogramprofiles2Data.indexOf(this.offprgWaitModel);
    if (DateFormat.compareDate(DateFormat.getDate(this.offprgWaitModel.referralDate),
      DateFormat.getDate(this.offprgWaitModel.rejectDate)) === 1) {
      this.show(this.translateService.translate('oidpacti.thedecisiondatemustbeafterthereferraldate'));
      return;
    }
      this.waitextSave = true;
      this.waitgrid.setColumnData('waittest', rowIndex, this.offprgWaitModel.rejectDate);
      this.waitgrid.setColumnData('rejectDate', rowIndex, this.offprgWaitModel.rejectDate);
  }
  

  onlyAlphabetallowed(event:any){
    const rowIndex = this.offenderprogramprofiles2Data.indexOf(this.offprgWaitModel);
    this.waitgrid.setColumnData('dateChanged', rowIndex, '');
    
}
  onblur(){
  }
  save(event) {
    const offprogprofSaveData = this.oidpactiFactory.offProgProfCommit(event);
    offprogprofSaveData.subscribe(data => {
      if (data !== undefined && data.sealFlag === 'success') {
        this.oidpactiexecuteQuery();
        this.extSave = false;
        this.savBtnflag = true;
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
      }
    });
  }
  onButClear() {
    this.offprogprofBean.offenderEndReason = undefined;
    this.offprogprofBean.offenderEndCommentText = undefined;
    this.extSave = false;
    this.savBtnflag = true;
  }
  whenTabChangedTrigger(event) {
    this.selectedTabIndex = event.index;
  }
  onRefCommentChange() {
    const rowIndex = this.offenderprogramprofiles2Data.indexOf(this.offprgWaitModel);
    if (this.offprgWaitModel.refCommentVal !== this.offprgWaitModel.referralCommentText) {
      this.waitextSave = true;
      this.waitgrid.setColumnData('waittest', rowIndex, this.offprgWaitModel.referralCommentText);
      this.waitgrid.setColumnData('referralCommentText', rowIndex, this.offprgWaitModel.referralCommentText);
    }
  }
  onButWaitClear() {
    this.offprgWaitModel.rejectReasonCode = undefined;
    this.offprgWaitModel.referralCommentText = undefined;
    this.waitextSave = false;
  }
  saveOffPrgwaitData(rDate?) {
    this.offenderprogramprofiles2InsertList = [];
    this.offenderprogramprofiles2UpdateList = [];
    this.offenderprogramprofiles2DeleteList = [];
    if (rDate) {
			if (rDate.lastValue === '0_/__/____') {
				this.show(this.translateService.translate('common.leapyearnotallowed'),'warn');
				return;
			}
			if (String(rDate.lastValue).indexOf('_') >= 0 && rDate.value === null) {
				this.show(this.translateService.translate('ocdclogs.dateformate'),'warn');
				return;
			}
    }
    this.waitgrid.addedMap.forEach(
      (v: any, k: number) => {
        this.offenderprogramprofiles2InsertList.push(v);
      }
    );
    this.waitgrid.updatedMap.forEach(
      (v: any, k: number) => {
        this.offenderprogramprofiles2UpdateList.push(v);
        this.offenderprogramprofiles2UpdateList.push(this.offprgWaitModel);
      }
    );
    this.waitgrid.removedMap.forEach(
      (v: any, k: number) => {
        this.offenderprogramprofiles2DeleteList.push(v);
      }
    );
    this.offprogprofCommitModel.insertList = [];
    this.offprogprofCommitModel.updateList = [];
    this.offprogprofCommitModel.deleteList = [];
    if (this.offenderprogramprofiles2InsertList.length > 0 || this.offenderprogramprofiles2UpdateList.length > 0) {
      for (let i = 0; i < this.offenderprogramprofiles2InsertList.length; i++) {
        if (this.waitValidations(this.offenderprogramprofiles2InsertList[i])) {
          return;
        }
        this.offenderprogramprofiles2InsertList[i].offenderId = this.vHeaderBlockModel.rootOffenderId;
        this.offenderprogramprofiles2InsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.offenderprogramprofiles2InsertList[i].offenderProgramStatus = 'WAIT';
        this.offenderprogramprofiles2InsertList[i].holidayFlag = 'Y';
        this.offenderprogramprofiles2InsertList[i].neededFlag = 'Y';
        this.offenderprogramprofiles2InsertList[i].offenderStartDate=null;
        if (this.offenderprogramprofiles2InsertList[i].waitlistDecisionCode === 'APP') {
          this.offenderprogramprofiles2InsertList[i].suspendedFlag = 'N';
        } else {
          this.offenderprogramprofiles2InsertList[i].suspendedFlag = 'Y';
        }
        this.offenderprogramprofiles2InsertList[i].profileClass = 'PRG';
      }
      for (let i = 0; i < this.offenderprogramprofiles2UpdateList.length; i++) {
        if (this.waitValidations(this.offenderprogramprofiles2UpdateList[i])) {
          return;
        }
      }
      this.offprogprofCommitModel.insertList = this.offenderprogramprofiles2InsertList;
      this.offprogprofCommitModel.updateList = this.offenderprogramprofiles2UpdateList;
    }
    if (this.offenderprogramprofiles2DeleteList.length > 0) {
      for (let i = 0; i < this.offenderprogramprofiles2DeleteList.length; i++) {
      }
      this.offprogprofCommitModel.deleteList = this.offenderprogramprofiles2DeleteList;
    }
    if (this.offprogprofCommitModel.insertList.length === 0 && this.offprogprofCommitModel.updateList.length === 0 &&
      this.offprogprofCommitModel.deleteList.length === 0) {
      return;
    }
    const offenderprogramprofiles2SaveData = this.oidpactiFactory.offenderProgramProfiles2Commit(this.offprogprofCommitModel);
    offenderprogramprofiles2SaveData.subscribe(data => {
      if (data !== undefined && data.sealFlag === 'success') {
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
        this.offenderprogramprofiles2ExecuteQuery();
      } else if (data !== undefined && data.sealFlag === '2') {
        this.show(this.translateService.translate('oidpacti.offenderalreadyisonwaitinglistforthisservice'));
        return;
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
      }
    });
  }
  waitValidations(event) {
    if (!event.referralDate) {
      this.show(this.translateService.translate('oidpacti.referraldatemustbeentered'));
      return true;
    }
    if (event.referralDate && this.bookingDate) {
      if (DateFormat.compareDate(DateFormat.getDate(this.bookingDate),
        DateFormat.getDate(event.referralDate)) === 1) {
        this.show(this.translateService.translate('oidpati.thereferraldatemustbeafterthebookingstartdate'));
        return true;
      }
    }
    if (DateFormat.compareDate(DateFormat.getDate(event.referralDate),
      DateFormat.getDate()) === 1) {
      this.show(this.translateService.translate('oidpacti.referraldatecannotbeinthefuture'));
      return true;
    }
    if (!event.referralPriority) {
      this.show(this.translateService.translate('oidpacti.prioritymustbeentered'));
      return true;
    }
    if (!event.agyLocId) {
      this.show(this.translateService.translate('oidpacti.agencymustbeentered').replace('%location%', this.translateService.translate('system-profile.inst-agency')));
      return true;
    }
    if (!event.programId) {
      this.show(this.translateService.translate('oidpacti.servicemustbeentered'));
      return true;
    }
    if (!event.waitlistDecisionCode) {
      this.show(this.translateService.translate('oidpacti.decisionmustbeentered'));
      return true;
    }
    if (event.waitlistDecisionCode === 'REJ' &&
      (!event.rejectDate || !event.rejectReasonCode)) {
      this.show(this.translateService.translate('oidpacti.pleaseenterbothdecisiondateandrejectreason'));
      return true;
    }
    if (event.referralDate && event.rejectDate) {
      if (DateFormat.compareDate(DateFormat.getDate(event.referralDate),
        DateFormat.getDate(event.rejectDate)) === 1) {
        this.show(this.translateService.translate('oidpacti.thedecisiondatemustbeafterthereferraldate'));
        return true;
      }
    }
    if (!event.offPrgrefId) {
    const lDate = DateFormat.getDate(DateFormat.getDate().setDate(DateFormat.getDate().getDate() + 30));
    if (DateFormat.compareDate(DateFormat.getDate(event.scheduleStartDate),
      DateFormat.getDate(lDate)) === 1) {
      const h = Math.abs(DateFormat.getDate(event.scheduleStartDate).getTime() -
        DateFormat.getDate().getTime()) / 36e5;
      const lvNoOfDays = Math.round(h / 24);
      this.show(this.translateService.translate('oidpacti.theassignedactivitystartsafter') + lvNoOfDays);
    }
  }
    if (event.startDateValidation) {
      this.show(event.startDateValidation);
      return true;
    }
  }
  viewChange(event) {
    if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && this.offprogprofBean &&
      this.offprogprofBean.offPrgrefId) {
      this.voffcourseevntsExecuteQuery();
    }
  }
  offStartDateEvent(event) {
    const rowIndex = this.offenderprogramprofiles2Data.indexOf(this.offprgWaitModel);
    this.assignSaveFlag = false;
    this.validateOffenderStartDate(this.offprgWaitModel);
    this.waitgrid.setColumnData('waittest', rowIndex, this.offprgWaitModel.offenderStartDate);
    this.waitgrid.setColumnData('offenderStartDate', rowIndex, this.offprgWaitModel.offenderStartDate);
  }
  offEndDateEvent(event) {
    const rowIndex = this.offenderprogramprofiles2Data.indexOf(this.offprgWaitModel);
    this.waitgrid.setColumnData('waittest', rowIndex, this.offprgWaitModel.offenderEndDate);
    this.waitgrid.setColumnData('offenderEndDate', rowIndex, this.offprgWaitModel.offenderEndDate);
  }
  get waitsavBtnflag() {
    if (this.waitgrid.addedMap.size > 0 || this.waitgrid.updatedMap.size > 0 ||
      this.waitgrid.removedMap.size > 0) {
      return false;
    }
    return true;
  }
  
  onGridClear = () => {
    this.offprgWaitModel.rejectDate = undefined;
    this.offenderprogramprofiles2ExecuteQuery();
    return true;
  }
  get gridInsBtn() {
    if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId) {
      return true;
    }
    return false;
  }
  get commentFlag() {
    if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && this.offprogprofData.length !== 0) {
      return false;
    }
    return true;
  }
  get launchBtnFlg() {
    if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId) {
      return false;
    }
    return true;
  }
  ngOnDestroy(): void {
    if (!this.assesFlag) {
    this.oidpactiFactory.programId = undefined;
    }
    this.schedularService.backBtnFlag = false;
}
onButAssclick() {
  this.oidpactiFactory.programId = undefined;
}
// getMaxHours() {
//   const hoursvalue = this.ocmpssetService.
//     getHours();
//   hoursvalue.subscribe(hourVal => {
//     this.maxHours = hourVal;
//     if (hourVal) {
//       this.maxHoursDate = DateFormat.getDate(DateFormat.getDate().setHours(hourVal, 0, 0, 0));
//     } else {
//       this.maxHoursDate = undefined
//     }
//   });
// }
// getProgramServicePayFlag() {
//   const payFlag = this.ocmpssetService.
//     getProgramServicePayFlag();
//   payFlag.subscribe(data => {
//     if (data === 'Y') {
//       this.vOffCourseEvntsColumnDef[this.vOffCourseEvntsColumnDef.length - 1].hide = 'false';
//       this.vOffCourseEvntsColumnDef[this.vOffCourseEvntsColumnDef.length - 2].hide = 'false';
//       this.coursegrid.prepareAgColumnDef();
//     }
//   });
// }
progServicesExecuteQuery() {
  const searchResult = this.ocmpssetService.progServSettingExecuteQuery();
  searchResult.subscribe(data => {
      if (data.length === 0) {
          this.prgSrvSetModel = new ProgramPaySettingsBean();
      } else {
          this.prgSrvSetModel = data[0];
          this.hideDelBtn=this.prgSrvSetModel.instActDelFlag === 'Y' ? true : false;
          if ( this.prgSrvSetModel.payFlag === 'Y') {
            this.vOffCourseEvntsColumnDef[this.vOffCourseEvntsColumnDef.length - 1].hide = 'false';
            this.vOffCourseEvntsColumnDef[this.vOffCourseEvntsColumnDef.length - 2].hide = 'false';
            this.coursegrid.prepareAgColumnDef();
          }
          if ( this.prgSrvSetModel.instActMaxScheduledHours) {
            this.maxHoursDate = DateFormat.getDate(DateFormat.getDate().setHours( this.prgSrvSetModel.instActMaxScheduledHours, 0, 0, 0));
          } else {
            this.maxHoursDate = undefined
          }
      }
  });
}
caluculateTime(startTime, endTime) {
  const h = Math.abs(DateFormat.getDate(startTime).getTime() -
    DateFormat.getDate(endTime).getTime()) / 36e5;
  var n = new Date(0, 0);
  n.setSeconds(+h * 60 * 60);
  const hours = n.getHours();
  const minutes = n.getMinutes();
  const  datval = DateFormat.getDate(DateFormat.getDate().setHours(hours, minutes, 0, 0));
  return datval;
}
  get gridDelBtn() {  
    if(this.hideDelBtn){
      return !this.hideDelBtn;
    }  
    else if (this.view ==='CONFIRMED') {
      if (this.voffcourseevntsData.length > 0 && this.offprogprofModel['payflagCount'] > 0) {
        return false;
      }
    }else if(this.view !=='CONFIRMED' && this.voffcourseevntsData.length > 0 ) {      
             if(this.offprogprofModel['confirmedRecord'] > 0 && this.offprogprofModel['payflagCount'] > 0){
      return false 
    }
    } 
      else if (this.voffcourseevntsData.length === 0) {
      return false;
    }

    return true;
  }
  

      onBack() {
		if(this.schedularService.backBtnFlag){
			this.schedularService.backBtnFlag = false;
			this.router.navigate(['/CALSCH']);
		} 
	}

  onGridDelete = () => {
    if (this.view !== 'CONFIRMED' && this.offprogprofModel['confirmedRecord'] > 0 ) {   
          this.show(this.translateService.translate('oidpacti.deleteisnotpermittedasattendancehasalreadyrecorded'));
          return false;
    
      } else {
      if (this.view === 'CONFIRMED' && this.voffcourseevntsData.length > 0) {
        this.show(this.translateService.translate('oidpacti.deleteisnotpermittedasattendancehasalreadyrecorded'));
        return false;
      }
      
    }
    return true;
  };
  
  
  
  
}
