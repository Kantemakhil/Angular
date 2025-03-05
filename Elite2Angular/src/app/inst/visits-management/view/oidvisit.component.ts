import { Subject } from 'rxjs';
import {
  Component, OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidvisitService } from '../service/oidvisit.service';
import { Images } from '@common/beans/Images';
import { VOffenderVisitVisitors } from '@inst/visits-management/beans/VOffenderVisitVisitors';
import { VOffenderVisits } from '@inst/visits-management/beans/VOffenderVisits';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { OffenderVisitVisitors } from '@inst/visits-management/beans/OffenderVisitVisitors';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { VOffenderVisitsCommitBean } from '@inst/visits-management/beans/VOffenderVisitsCommitBean';
import { VOffenderVisitVisitorsCommitBean } from '@inst/visits-management/beans/VOffenderVisitVisitorsCommitBean';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { OcuavlocService } from '@inst/visits-management/service/ocuavloc.service';
import { VOcuavlocAvailable } from '@visitsbeans//VOcuavlocAvailable';
import { OffenderVisitVisitorsCommitBean } from '@inst/visits-management/beans/OffenderVisitVisitorsCommitBean';
import { OcuoichnService } from '@inst/incidents-oic/service/ocuoichn.service';
import { OicHearings } from '@instoicbeans/OicHearings';
import { VOcuavlocUnavailable } from '@inst/visits-management/beans/VOcuavlocUnavailable';

import { OmuaprisService } from '@inst/visits-management/service/omuapris.service';
import { VOffenderAuthorisedVisitors } from '@inst/visits-management/beans/VOffenderAuthorisedVisitors';
import { OcuavisnService } from '@inst/visits-management/service/ocuavisn.service';
import { VOffContactPersons } from '@inst/visits-management/beans/VOffContactPersons';
import { OcuvwarnService } from '@inst/visits-management/service/ocuvwarn.service';
import { ValidateVisitorBean } from '@inst/visits-management/beans/ValidateVisitorBean';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { ManageAppBarService } from '@core/service/manage-app-bar.service';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
import { Router } from '@angular/router';
import { SchedulerService } from '@core/ui-components/schedule/scheduler.service';

@Component({
  selector: 'app-oidvisit',
  templateUrl: './oidvisit.component.html',
  styleUrls: ['./oidvisit.component.scss']
})

export class OidvisitComponent implements OnInit, OnDestroy {
  ocuWarngMsg: any;
  ocuWarngFlag: boolean;
  overlapFlag: boolean;
  overlapVisitResData: any;
  visitorIsOffFlg: boolean;
  authVisitorFlg: boolean;
  offDuplicateFalg: boolean;
  isEditableVisitorId = true;
  visitorNotAuth: boolean;
  visitTypeLvLimitFlag: boolean;
  visitTypeLimit: any;
  gAgeLimit: number;
  vOffenderIdDisplay: any;
  vPersonId: any;
  voffauthvisitorModel: VOffContactPersons = new VOffContactPersons();
  omuaprisWrnFlg: any;
  offCount: number;
  visitorOffenderIdDisplay: any;
  numVisitorExdFlag: boolean;
  locationSlotBookFlf: boolean;
  perCount: number;
  oiuscingFlag: boolean;
  ocuvwarnFlag: boolean;
  vOffenderBookId: any;
  vOffenderId: any;
  perCommentText: any;
  offCommentText: any;
  vstCommentText: any;
  index: number;
  checkLocFlag: boolean;
  avllocData: VOcuavlocAvailable[] = [];
  avllocModelLocTemp: VOcuavlocAvailable = new VOcuavlocAvailable();
  recheckTimeSlotFlag: boolean;
  offVstPerUpdateFlag: boolean;
  offVstOffUpdateFlag: boolean;
  visitorList: string;
  insertGrid: boolean;
  oichearModelTemp: OicHearings = new OicHearings();
  disabledFlag: boolean;
  saveDiable: boolean;
  offvstoffCommitModel: OffenderVisitVisitorsCommitBean = new OffenderVisitVisitorsCommitBean();
  checkOffenders: boolean;
  @ViewChild('grid', {static: true}) grid: any;
  @ViewChild('visitPersonGrid', {static: true}) visitPersonGrid: any;
  @ViewChild('visitOffGrid', {static: true}) visitOffGrid: any;
  offvstpersCommitModel: VOffenderVisitVisitorsCommitBean = new VOffenderVisitVisitorsCommitBean();
  fieldEditableFlag: boolean;
  offvstCommitModel: VOffenderVisitsCommitBean = new VOffenderVisitsCommitBean();
  imageVisit: any;
  visitOffimage: any;
  imageVisitData: Images[] = [];
  imageModel: Images = new Images();
  timeSlotLink: any;
  vHeaderBlockModel: VHeaderBlock;
  actionName: boolean;
  lovModel: any[];
  msgs: any[] = [];
  type = 'error';
  msglist = [];
  message = ' Invalid.';
  nameOfLovPage: string;
  listToCompare: any[] = [];
  offvstData: VOffenderVisits[] = [];
  offvstDataTemp: VOffenderVisits[] = [];
  offvstModel: VOffenderVisits = new VOffenderVisits();
  offvstIndex = -1;
  offvstInsertList: VOffenderVisits[] = [];
  offvstUpdatetList: VOffenderVisits[] = [];
  offvstDeleteList: VOffenderVisits[] = [];
  offvstpersData: any[] = [];
  offvstpersDataTemp: VOffenderVisitVisitors[] = [];
  offvstpersModel: VOffenderVisitVisitors = new VOffenderVisitVisitors();
  offvstpersIndex = -1;
  offvstpersInsertList: VOffenderVisitVisitors[] = [];
  offvstpersUpdatetList: VOffenderVisitVisitors[] = [];
  offvstpersDeleteList: VOffenderVisitVisitors[] = [];
  Images1Data: Images[] = [];
  Images1DataTemp: Images[] = [];
  Images1Model: Images = new Images();
  Images1Index = 0;
  Images1InsertList: Images[] = [];
  Images1UpdatetList: Images[] = [];
  Images1DeleteList: Images[] = [];
  offvstoffData: OffenderVisitVisitors[] = [];
  offvstoffDataTemp: OffenderVisitVisitors[] = [];
  offvstoffModel: OffenderVisitVisitors = new OffenderVisitVisitors();
  offvstoffIndex = -1;
  offvstoffInsertList: OffenderVisitVisitors[] = [];
  offvstoffUpdatetList: OffenderVisitVisitors[] = [];
  offvstoffDeleteList: OffenderVisitVisitors[] = [];
  Images2Data: Images[] = [];
  Images2DataTemp: Images[] = [];
  Images2Model: Images = new Images();
  Images2Index = 0;
  Images2InsertList: Images[] = [];
  Images2UpdatetList: Images[] = [];
  Images2DeleteList: Images[] = [];
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  offVstOffColumnDef: any[];
  offVstColumnDef: any[];
  offVstPersColumnDef: any[];
  rgvisittypeRg: any[] = [];
  rgmovecancrsRg: any[] = [];
  rgvisittimeslotsRg: any[] = [];
  rgviscompleteRg: any[] = [];
  timeSlotMap: Map<string, string> = new Map();
  checkVisitors: boolean;
  avllocModelTemp: VOcuavlocAvailable = new VOcuavlocAvailable();
  conflictFlag: boolean;
  fbolocModelTemp: VOcuavlocUnavailable = new VOcuavlocUnavailable();
  validateVisitorBeanModel: ValidateVisitorBean = new ValidateVisitorBean();
  fbolocData: VOcuavlocUnavailable[] = [];
  visitLimitsFlag: boolean;
  visitExceedFlag: boolean;
  onUndefinedLimitFlag:boolean
  startTimeFlag: boolean;
  endTimeFlag: boolean;
  parentFieldObserval: Subject<any> = new Subject<any>();
  voffauthvisModel: VOffenderAuthorisedVisitors = new VOffenderAuthorisedVisitors();
  cameraButton: boolean;
  DaysMap: Map<number, string> = new Map();
  listEntries: any[] = [];
  listEntryMap: Map<any, any[]> = new Map();
  backButton: Boolean;
  maxVisitCount: number;
  visitTypeConfiguredData: any;
  visitSearchQueryParam: string;
  configuredValue: boolean;
  iepSecLevels: any;
  constructor(private appbarService:ManageAppBarService,private oidvisitFactory: OidvisitService, private ocuavisnFactory: OcuavisnService,
    public translateService: TranslateService,  private ocuvwarnFactory: OcuvwarnService,
    public dialogService: DialogService,
    private offenderSearchService: OffenderSearchService, private sessionManager: UserSessionManager,
    private ocuavlocFactory: OcuavlocService, private ocuoichnFactory: OcuoichnService,
    private omuaprisFactory: OmuaprisService, private osiosearchService: OsiosearService, private router: Router,private schedularService: SchedulerService,private eoffenderService: EoffenderService ) {
    this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
    this.offVstOffColumnDef = [];
    this.offVstColumnDef = [];
    this.offVstPersColumnDef = [];
    this.DaysMap.set(0, 'SUN');
    this.DaysMap.set(1, 'MON');
    this.DaysMap.set(2, 'TUE');
    this.DaysMap.set(3, 'WED');
    this.DaysMap.set(4, 'THU');
    this.DaysMap.set(5, 'FRI');
    this.DaysMap.set(6, 'SAT');
  }

  ngOnInit() {
    if (this.schedularService.backBtnFlag) {
			this.backButton = true;
		 } else {
			this.backButton = false;
		 }

    this.cameraButton = true;
    this.visitTypeLvLimitFlag = true;
    this.endTimeFlag = false;
    this.startTimeFlag = false;
    this.visitLimitsFlag = true;
    this.onUndefinedLimitFlag=false;
    this.visitExceedFlag = true;
    this.conflictFlag = false;
    this.checkVisitors = false;
    this.disabledFlag = true;
    this.insertGrid = false;
    if (!this.vHeaderBlockModel) {
      this.type = 'warn';
      this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
      this.show();
      this.disabledFlag = true;
    }
    this.offVstOffColumnDef = [
      {
        fieldName: this.translateService.translate('common.Orca2') + '*', field: 'offenderIdDisplay',
        editable: false, width: 150, datatype: 'text', maxlength: 10, /* cellEditable: this.canFieldOffenderEditable */
      },
      {
        fieldName: this.translateService.translate('oidvisit.view'), field: 'butOmuapris', datatype: 'hyperlink',
        editable: true, displayas: 'href', modal: true, dialogWidth: '80%', styleClass: 'search',
        data: 'row', updateField: 'row', link: '/OMUAPRIS', onLaunchClick: this.onOmuaprisDailogClick,
      },
      {
        fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName',
        editable: false, width: 150
      },
      {
        fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName',
        editable: false, width: 150
      },
      {
        fieldName: this.translateService.translate('common.facility'), field: 'agyLocId',
        editable: false, width: 150
      },
      {
        fieldName: this.translateService.translate('oidvisit.contacttype'), field: 'contactType',
        editable: false, width: 150
      },
      {
        fieldName: this.translateService.translate('oidvisit.relationship'), field: 'relationshipType',
        editable: false, width: 150
      },
      {
        fieldName: this.translateService.translate('oidvisit.restriction'), field: 'restriction',
        editable: false, width: 150
      },
      {
        fieldName: this.translateService.translate('oidvisit.view'), field: 'butOcuprest',datatype: 'hyperlink',
        editable: true, displayas: 'href', modal: true, dialogWidth: '80%', styleClass: 'search',
        data: 'row', updateField: 'row', link: '/OCUPREST'
      },
      {
        fieldName: this.translateService.translate('oidvisit.attended'), field: 'eventOutcome',
        datatype: 'checkbox', editable: true, width: 150, //cellEditable: this.canFieldOffEditable
      },
      { field: 'commentText', hide: true},
      { field: 'visitorOffenderId', hide: true}
    ];
    this.offVstColumnDef = [
      {
        fieldName: this.translateService.translate('common.date') + '*', field: 'visitDate', editable: false,
        datatype: 'date', width: 150, cellEditable: this.canFieldEditable
      },
      {
        fieldName: this.translateService.translate('oidvisit.timeslot') + '*', field: 'timeSlot', editable: true,
        datatype: 'lov', link: 'oidvisit/rgVisitTimeSlotsRecordGroup?parentField=', parentField: 'parentField',
        width: 200, cellEditable: this.canFieldEditable, titles: { description: 'Time Slot', stimetemp: 'Start Time', weekDay: 'End Time'},
        parentFieldObserval: this.parentFieldObserval,source:'OIMVDTSL'
      },
      {
        fieldName: this.translateService.translate('oidvisit.start') + '*', field: 'startTime', datatype: 'time', editable: false,
        width: 150, cellEditable: this.canFieldEditable
      },
      {
        fieldName: this.translateService.translate('oidvisit.end') + '*', field: 'endTime', datatype: 'time', editable: false,
        width: 150, cellEditable: this.canFieldEditable
      },
      {
        fieldName: this.translateService.translate('oidvisit.visittype') + '*', field: 'visitType', datatype: 'lov',
       domain: 'VISIT_TYPE',  editable: false, width: 150, cellEditable: this.canFieldEditable
      },
      /* link: 'oidvisit/rgVisitTypeRecordGroup?offenderDetails=', parentField: 'offenderDetails', */
      {
        fieldName: this.translateService.translate('common.location') + '*', datatype: 'text', field: 'description', editable: false,
        width: 150, wrapText: true, maxWidth: 500
      },
      {
        fieldName: this.translateService.translate('oidvisit.view'), field: 'butOcuavloc', datatype: 'hyperlink', link: '/OCUAVLOC',
        editable: true, displayas: 'href', modal: true, dialogWidth: '80%', styleClass: 'search',
        data: 'row', updateField: 'row', cellEditable: this.canFieldEditable, onLaunchClick: this.locationLaunchClick,
      },
      {
        fieldName: this.translateService.translate('common.cancelreason'), field: 'outcomeReasonCode',
        datatype: 'lov',domain:'MOVE_CANC_RS',// link: 'oidvisit/rgMoveCancRsRecordGroup',
        editable: true, width: 150, cellEditable: this.canFieldEditable
      },
      {
        fieldName: this.translateService.translate('oidvisit.completion'), field: 'visitStatus', datatype: 'lov',
       domain:'VIS_COMPLETE'/* link: 'oidvisit/rgVisCompleteRecordGroup'*/,
        editable: true, width: 150, cellEditable: this.canFieldEditable
      },
      {
        fieldName: this.translateService.translate('oidvisit.attended'), field: 'eventOutcome', editable: false,
        datatype: 'checkbox', width: 150,  cellEditable: this.canCellEditable
      },
      {
        fieldName: this.translateService.translate('oidvisit.comment'), 
        field: 'commentText', datatype: 'text', uppercase: 'false' ,editable: true, pinned: true, width:200 , maxlength: 240,tooltip: true
      },
      { field: 'offenderDetails', hide: true},
    ];

    this.offVstPersColumnDef = [
      {
        fieldName: this.translateService.translate('oidvisit.visitorid') + '*', field: 'personId', editable: false,
        width: 150, datatype: 'number', maxValue: '9999999999'
      },
      {
        fieldName: '', field: 'butOcuavisn', datatype: 'hyperlink',
        editable: true, displayas: 'href', modal: true, dialogWidth: '80%', styleClass: 'search',
        data: 'row', updateField: 'row', link: '/OCUAVISN', onLaunchClick: this.butOcuavisnClick
      },
      {
        fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName', editable: false,
        width: 150
      },
      {
        fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName',
        editable: false, width: 150
      },
      {
        fieldName: this.translateService.translate('oidvisit.contacttype'), field: 'contactTypeDesc',
        editable: false, width: 150
      },
      {
        fieldName: this.translateService.translate('oidvisit.relationship'), field: 'relationshipTypeDesc',
        editable: false, width: 150
      },
      {
        fieldName: this.translateService.translate('common.age'), field: 'age', editable: false,
        width: 150
      },
      {
        fieldName: this.translateService.translate('oidvisit.restriction'), field: 'restriction',
        editable: false, width: 150
      },
      {
        fieldName: this.translateService.translate('oidvisit.view'), field: 'butOiuovres', datatype: 'hyperlink',
        displayas: 'href', dialogWidth: '80%', styleClass: 'search',
        link: '/OIUOVRES', data: 'row', modal: true, editable: false,
        width: 150, onLaunchClick: this.butOiuovresClick
      },
      {
        fieldName: this.translateService.translate('oidvisit.visitban'), field: 'globalRestriction',
        editable: false, width: 150
      },
      {
        fieldName: this.translateService.translate('oidvisit.view'), field: 'butOmuvrest', datatype: 'hyperlink',
        displayas: 'href', dialogWidth: '80%', styleClass: 'search', link: '/OMUVRESTDIALOG',
        editable: false, width: 150, onLaunchClick: this.butOmuvrestClick, modal: true, data: 'row'
      },
      {
        fieldName: this.translateService.translate('oidvisit.attended'), field: 'eventOutcome',
         datatype: 'checkbox', width: 150,editable: true // cellEditable: this.canFieldPerEditable
      },
      {
        fieldName: this.translateService.translate('oidvisit.comment'), 
        field: 'commentText', datatype: 'text', uppercase: 'false' ,editable: true, width:200 , maxlength: 240,tooltip: true
      },
      {
        fieldName: '',
        field: 'cameraLaunchButton', editable: true, width: 220,datatype:'launchbutton',link:'/CAMDLG', modal:true,
        data: 'row',dialogWidth: '100%', height: '80%',updateField:'row'
    },
      { fieldName: '', field: 'contactType', hide: true },
      { fieldName: '', field: 'relationshipType', hide: true },
      { fieldName: '', field: 'screen', hide: true },
    ];

    this.gAgeLimit = 0;
    const systemProfileAge = this.oidvisitFactory.getProfileValues('CLIENT', 'VISIT_AGE');
    systemProfileAge.subscribe(visitorDetilsResultData => {
        if (visitorDetilsResultData) {
            this.gAgeLimit = visitorDetilsResultData.profileValue;
        }
    });

    this.oidvisitCheckListEntry();
  }
  butOcuavisnClick = (event) => {
    if (!(this.offvstModel.offenderVisitId)) {
    if (! (this.offvstModel.visitDate && this.offvstModel.timeSlot &&  this.offvstModel.startTime
      && this.offvstModel.endTime && this.offvstModel.visitType && this.offvstModel.description)) {
        this.type = 'warn';
        this.message = this.translateService.translate('common.youcannotcreatethisrecord');
        this.show();
        return false;
    }
  }
    if (this.offvstpersModel.personId) {
      return false;
    } else {
      this.dialogService.openLinkDialog('/OCUAVISN', event, 80).subscribe(result => {
        const index = this.offvstpersData.indexOf(event);
        this.isEditableVisitorId = false;
        if (result && result[0].personId) {
          this.addedRecordRestriction(result, index, index, 0);
          this.appbarService.manageIcon(true);
        } else {
          this.isEditableVisitorId = true;
          this.appbarService.manageIcon(true);
        }
    });
  }
    return false;
  }

  addedRecordRestriction(data, index , addedIndex, startAt) {
    const event = data[startAt];
    if (event && event.personId) {
      this.validateVisitorBeanModel = new ValidateVisitorBean();
      this.validateVisitorBeanModel.vPersonId = event.personId;
      this.validateVisitorBeanModel.vOffenderBookId = undefined;
      this.validateVisitorBeanModel.visitorList = this.offvstpersData;
      this.validateVisitorBeanModel.visitOfflist = this.offvstoffData;
      const validateService = this.oidvisitFactory.validateVisitor(this.validateVisitorBeanModel);
      validateService.subscribe(validateData => {
        if (index === addedIndex) {
          const toIndex = this.offvstpersData.length - 1;
          this.offvstpersData[toIndex].ocuvwarnFlag = true;
          this.visitPersonGrid.setColumnData('personId', toIndex, event.personId);
          this.visitPersonGrid.setColumnData('lastName', toIndex, event.lastName);
          this.visitPersonGrid.setColumnData('firstName', toIndex, event.firstName);
          this.visitPersonGrid.setColumnData('contactType', toIndex, event.contactType);
          this.visitPersonGrid.setColumnData('relationshipType', toIndex, event.relationshipType);
          this.visitPersonGrid.setColumnData('age', toIndex, event.age);
          this.visitPersonGrid.setColumnData('contactTypeDesc', index, event.contactTypeDescription);
          this.visitPersonGrid.setColumnData('relationshipTypeDesc', index, event.relationshipTypeDescription);
          this.visitPersonGrid.setColumnData('restriction', toIndex, event.restriction);
          this.visitPersonGrid.setColumnData('screen', toIndex, '/OIDVISIT');
          if (event.nbtGlobalRestriction) {
            this.visitPersonGrid.setColumnData('nbtGlobalRestriction', toIndex, event.nbtGlobalRestriction);
          }
          this.visitPersonGrid.setColumnData('eventOutcome', toIndex, this.offvstpersModel.eventOutcome);
          this.visitPersonGrid.setColumnData('globalRestriction', toIndex, event.globalRestriction);
         
          } else {
            this.visitPersonGrid.addRecord(null);
            this.visitPersonGrid.gridApi.setFocusedCell(index, 'butOcuavisn');
            this.offvstpersData[index].ocuvwarnFlag = true;
            this.visitPersonGrid.setColumnData('personId', index, event.personId);
            this.visitPersonGrid.setColumnData('lastName', index, event.lastName);
            this.visitPersonGrid.setColumnData('firstName', index, event.firstName);
            this.visitPersonGrid.setColumnData('contactType', index, event.contactType);
            this.visitPersonGrid.setColumnData('relationshipType', index, event.relationshipType);
            this.visitPersonGrid.setColumnData('age', index, event.age);
            this.visitPersonGrid.setColumnData('contactTypeDesc', index, event.contactTypeDescription);
            this.visitPersonGrid.setColumnData('relationshipTypeDesc', index, event.relationshipTypeDescription);
            this.visitPersonGrid.setColumnData('restriction', index, event.restriction);
             this.visitPersonGrid.setColumnData('screen', index, '/OIDVISIT');
            if (event.nbtGlobalRestriction) {
              this.visitPersonGrid.setColumnData('nbtGlobalRestriction', index, event.nbtGlobalRestriction);
            }
            this.visitPersonGrid.setColumnData('eventOutcome', index, this.offvstpersModel.eventOutcome);
            this.visitPersonGrid.setColumnData('globalRestriction', index, event.globalRestriction);
            
            
          }
        if (validateData && validateData !== 'NULL') {
          this.visitorList = validateData;
          this.printIsValidateVisitVisitor(this.visitorList);
        } else {
          this.visitorList = undefined;
          this.addedRecordRestriction(data, index + 1, addedIndex, startAt + 1);
        }
      });
    } else {
      this.isEditableVisitorId = true;
    }
  }

openConfirmationDialog() {
  const data = {
    label: this.translateService.translate('oidvisit.offendervisitlimitvalidation'), yesBtn: true, noBtn: true
  };
  this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
    if (typeof result === 'boolean' && result) {
      this.visitLimitsFlag = true;
    } else {
        if(!this.onUndefinedLimitFlag){
      this.visitLimitsFlag = false;
        }else
            this.visitLimitsFlag=true; 
    }
  });
  
}
openVisitExceedsDialog() {
  const data = {
    label: this.translateService.translate('oidvisit.visitexceedsthelimit'), yesBtn: true, noBtn: true
  };
  this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
    if (typeof result === 'boolean' && result) {
      this.visitExceedFlag = true;
    } else {
      this.visitExceedFlag = false;
    }
  });
}
  locationLaunchClick = (event) => {
    if (this.startTimeFlag) {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.starttimemaynotbebeforethetimeslotstarttime');
      this.show();
      return false;
    } else if (this.endTimeFlag) {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.endtimeshouldbegreaterthanstarttime');
      this.show();
      return false;
    }
    if (!this.visitExceedFlag) {
       this.openVisitExceedsDialog();
       return false;
    } else if (!this.visitLimitsFlag) {
      this.openConfirmationDialog();
      return false;
    } else if ( !event.checkFlag) {
      this.type = 'warn';
      this.message = this.translateService.translate('common.fieldisprotectedagainstupdate');
      this.show();
      return false;
    } else {
      if (this.conflictFlag) {
        const conflictData = { 'eventDate': event.visitDate, 'offenderBookId': this.vHeaderBlockModel.offenderBookId };
        this.dialogService.openLinkDialog('/oiuscinq', conflictData).subscribe(result => {
          if (result !== null) {
            this.conflictFlag = false;
          } else {
            this.conflictFlag = true;
          }
        });
        return false;
      } else if (!event.visitDate || !event.timeSlot) {
        this.type = 'warn';
        this.message = this.translateService.translate('oidvisit.mustenterboththeVisitdateandthetimeslot');
        this.show();
        return false;
      } else {
        return true;
      }
    }
  }

  onRowClickoffvst(event) {
    this.offvstpersModel = new VOffenderVisitVisitors();
    this.offvstpersData = [];
    this.offvstoffModel = new OffenderVisitVisitors();
    this.offvstoffData = [];
    if (event) {
      this.visitorList = undefined;
      this.offVstOffUpdateFlag = false;
      this.imageVisit = null;
      this.visitOffimage = null;
      this.offvstModel = new VOffenderVisits();
      this.offvstModel = event;
      this.eoffenderService.selectedRowData = event;
      this.vstCommentText = event.commentText;
      this.offvstModel.visitDate = this.offvstModel.visitDate ? DateFormat.getDate(this.offvstModel.visitDate) : undefined;
      this.offvstModel.startTime = this.offvstModel.startTime ? DateFormat.getDate(this.offvstModel.startTime) : undefined;
      this.offvstModel.endTime = this.offvstModel.endTime ? DateFormat.getDate(this.offvstModel.endTime) : undefined;
      this.offvstModel.cycleEnds = this.offvstModel.cycleEnds ? DateFormat.getDate(this.offvstModel.cycleEnds) : undefined;
      this.offvstpersModel = new VOffenderVisitVisitors();
      this.offvstpersData = [];
      this.offvstoffModel = new OffenderVisitVisitors();
      this.offvstoffData = [];
      if (this.offvstModel.offenderVisitId) {
        this.saveDiable = false;
      }
      this.offVstPersExecuteQuery();
      this.offVstOffExecuteQuery();
    } else {
      this.eoffenderService.selectedRowData =null;
      this.offvstpersModel = new VOffenderVisitVisitors();
      this.offvstoffModel = new OffenderVisitVisitors();
    }
    //this.getMaxVisitors();
  }

  allowNumbers(event) {
  }

  onRowClickoffvstpers(event) {
    this.offvstpersModel = new VOffenderVisitVisitors();
    if (event) {
      this.offvstpersModel = event;
      this.perCommentText = event.commentText;
      this.imagesVisitorsExecuteQuery(event);
    } else {
      this.imageVisit = null;
      this.perCommentText = undefined
    }
  }

  onFingerPrintclick() {
  }

  onRowClickoffvstoff(event) {
    if (event) {
      this.offCommentText = event.commentText;
      this.getOffenderDetails(event.offenderIdDisplay);
      this.imagesVisitingOffExecuteQuery(event);
    } else {
      this.visitOffimage = null;
    }
  }

  getOffenderDetails(offenderIdDisplay) {
    const offenderDetails = this.oidvisitFactory.getOffenderDetails(offenderIdDisplay);
    offenderDetails.subscribe(offenderDetailsData => {
      this.vOffenderId = offenderDetailsData.offenderId;
      this.vOffenderBookId = offenderDetailsData.offenderBookId;
    });
  }

  ok() {
  }

  no() {
  }

  cancel() {
  }

  butOiuovresClick = (data) => {
    if (!this.offvstpersModel.personId) {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.pleaseenteravisitorfirst');
      this.show();
      return false;
    }  else if (this.offvstpersModel.personId) {
     // if (this.visitPersonGrid.addedMap.size === 0 && this.visitPersonGrid.updatedMap.size === 0
      //    && this.visitPersonGrid.removedMap.size === 0) {
          this.dialogService.openLinkDialog('/OIUOVRES', data, 80).subscribe(dlgData => {
             // this.offVstPersExecuteQuery();
          });
     // }
  }
  return false;
  }

  butOmuvrestClick = (data) => {
    if (!this.offvstpersModel.personId) {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.pleaseenteravisitorfirst');
      this.show();
      return false;
    } else if (this.offvstpersModel.personId) {
    //  if (this.visitPersonGrid.addedMap.size === 0 && this.visitPersonGrid.updatedMap.size === 0
    //      && this.visitPersonGrid.removedMap.size === 0) {
          this.dialogService.openLinkDialog('/OMUVRESTDIALOG', data, 80).subscribe(dlgData => {
             // this.offVstPersExecuteQuery();
              this.appbarService.manageIcon(true); 
          });
    //  }
  }
  return false;
  }

  onOffenderChange(offender) {
    this.vHeaderBlockModel = new VHeaderBlock();
    this.conflictFlag = false;
    this.overlapFlag = false;
    if (offender) {
      
      this.visitLimitsFlag = true;
      this.visitExceedFlag = true;
      this.onUndefinedLimitFlag=true;
      this.vHeaderBlockModel = offender;
      this.offvstModel = new VOffenderVisits();
      this.offvstpersData = [];
      this.offvstoffData = [];
      this.offvstData = [];
      this.disabledFlag = false;
      if (this.vHeaderBlockModel.offenderBookId) {
        this.oidvisitexecuteQuery();
        // this.rgVisitTypeRecordGroup();
        this.getIepVisitLimis();
        this.insertGrid = true;
        this.oidvisitCheckListEntry();
      }
    } else {
      this.disabledFlag = true;
      this.offvstoffData = [];
      this.offvstData = [];
      this.offvstpersData = [];
      this.insertGrid = false;
      this.vHeaderBlockModel = new VHeaderBlock();
      this.visitLimitsFlag = true;
      this.visitExceedFlag = true;
      this.onUndefinedLimitFlag=false;
      this.imageVisit = undefined;
      this.perCommentText =undefined;
      this.visitOffimage = undefined;
    }
  }

  canTimeSlotEdit = (data: any, index: number, field: string): boolean => {
    return true;
  }
  canFieldOffenderEditable = (data: any, index: number, field: string, originalIndex: number): boolean => {
    if (data.createDatetime) {
      return false;
    } else {
      return true;
    }
  }
  // canFieldOffEditable = (data: any, index: number, field: string, originalIndex: number): boolean => {
  //   if (field === 'eventOutcome' && !this.offvstModel.checkFlag) {
  //     this.type = 'warn';
  //     this.message = this.translateService.translate('common.fieldisprotectedagainstupdate');
  //     this.show();
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
  /**
   * event is fired when try to edit attended field in the grid.
   */
  canCellEditable = (): boolean => {
    if (!this.visitLimitsFlag) {
      this.openConfirmationDialog();
      return false;
    } else if (!this.visitExceedFlag) {
      this.openVisitExceedsDialog();
      return false;
    } else {
      return true;
    }
  }
  // canFieldPerEditable = (data: any, index: number, field: string, originalIndex: number): boolean => {
  //   if (field === 'eventOutcome' && !this.offvstModel.checkFlag) {
  //     return false;
  //   }else if(field === 'eventOutcome' && this.offvstModel.visitStatus === 'CANC'){
  //     return false;
  //   } else if (field === 'personId' && data.eventId) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  canFieldEditable = (data: any, index: number, field: string, originalIndex: number): boolean => {
    if (this.startTimeFlag && field !== 'startTime') {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.starttimemaynotbebeforethetimeslotstarttime');
      this.show();
      return false;
    } else if (this.endTimeFlag && field !== 'endTime') {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.endtimeshouldbegreaterthanstarttime');
      this.show();
      return false;
    } else if (field === 'timeSlot') {
      this.timeSlotMap = new Map();
      const rAgyLocId = data.agyLocId ? data.agyLocId : '';
      this.offvstData[index]['parentField'] = 'visitDate : ' + DateFormat.format(data.visitDate)
        + ', hAgyLocId: ' + this.vHeaderBlockModel.agyLocId
        + ', rAgyLocId: ' + rAgyLocId;
        this.parentFieldObserval.next(this.offvstData[index]['parentField']);
      const timeSlotService = this.oidvisitFactory.rgVisitTimeSlotsRecordGroup(this.offvstData[index]['parentField']);
      timeSlotService.subscribe(timeSlotData => {
        this.timeSlotMap = new Map();
        for (const dataval of timeSlotData) {
          if (dataval.canDisplay) {
            this.timeSlotMap.set(dataval.code, dataval.description);
          }
        }
      });
      if (!this.isListExists(data)) {
        this.type = 'warn';
        this.message = this.translateService.translate('common.listofvalues');
        this.show();
        return false;
      }
    }
    if (this.conflictFlag) {
      const conflictData = { 'eventDate': data.visitDate, 'offenderBookId': this.vHeaderBlockModel.offenderBookId };
      this.dialogService.openLinkDialog('/oiuscinq', conflictData).subscribe(result => {
        if (result !== null) {
          this.conflictFlag = false;
          if (!this.visitExceedFlag) {
            this.openVisitExceedsDialog();
            return false;
         }
          if (!this.visitLimitsFlag) {
            this.openConfirmationDialog();
            return false;
          }
        } else {
          this.conflictFlag = true;
        }
      });
      return false;
    } else if (!this.visitExceedFlag) {
      this.openVisitExceedsDialog();
      return false;
   } else if (!this.visitLimitsFlag && field !== 'visitType' && !this.onUndefinedLimitFlag) {
      this.openConfirmationDialog();
      
      return false;
    }
    // if (!data.checkFlag) {
    //   this.type = 'warn';
    //   this.message = this.translateService.translate('common.fieldisprotectedagainstupdate');
    //   this.show();
    //   return false;
    // } else {
      if ( field === 'timeSlot' && !data.visitDate ) {
        this.type = 'warn';
        this.message = this.translateService.translate('oidvisit.pleaseenterthevisitdatefirst');
        this.show();
        return false;
      }  else if (field === 'visitType' && !data.visitDate ) {
        this.type = 'warn';
        this.message = this.translateService.translate('oidvisit.pleaseenterthevisitdatefirst');
        this.show();
        return false;
      // } else if ( (field === 'outcomeReasonCode' || field === 'visitStatus'  ) && !data.offenderVisitId) {
      //   this.type = 'warn';
      //   this.message = this.translateService.translate('common.fieldisprotectedagainstupdate');
      //   this.show();
      //   return false;
      } else if ( field === 'visitStatus' &&
        (DateFormat.compareDate(DateFormat.getDate(data.visitDate), DateFormat.getDate()) === 1 ) ) {
        this.type = 'warn';
        this.message = this.translateService.translate('common.fieldisprotectedagainstupdate');
        this.show();
        return false;
      }
      return true;
    //}
  }

  checkVal(event) {
    if (event && event.innerOptions) {
      if (event.innerOptions.length === 0) {
        this.type = 'warn';
        this.message = this.translateService.translate('common.listofvalues');
        this.show();
      }
    }
  }
/**
 * this methos is to validate the visits block
 */
  validateVisitsData = (event) => {
    const rowdata = new ValidateRowReturn();
    const index = event.rowIndex;
    // if(event.field ==='outcomeReasonCode'){
    //   this.grid.setColumnData('eventOutcome', index, (!event.data.outcomeReasonCode)?true:false);
    // }
    if (event.field === 'description' && event.newValue !== event.oldValue && event.data.description) {
      if (!event.data.visitDate || !event.data.timeSlot) {
        this.type = 'warn';
        this.message = this.translateService.translate('oidvisit.mustenterboththeVisitdateandthetimeslot');
        this.show();
        rowdata.validated = false;
        this.offvstData[index]['description'] = undefined;
        return rowdata;
      }
      this.avllocModelLocTemp = new VOcuavlocAvailable();
      this.avllocModelLocTemp.visitDate = DateFormat.getDate(event.data.visitDate);
      this.avllocModelLocTemp.agyLocId = event.data.agyLocId;
      this.avllocModelLocTemp.startTime = event.data.originalTimeSlot;
      if (event.data.offenderVisitId) {
      this.avllocModelLocTemp.offenderVisitId = event.data.offenderVisitId;
      }
      this.fbolocModelTemp = new VOcuavlocUnavailable();
      this.fbolocModelTemp.visitDate = DateFormat.getDate(event.data.visitDate);
      this.fbolocModelTemp.agyLocId = event.data.agyLocId;
      this.fbolocModelTemp.startTime = event.data.originalTimeSlot;
      this.fbolocModelTemp.offenderVisitId = event.data.offenderVisitId;
      this.chkVisitConflicts(event.data);
      const avllocResult = this.ocuavlocFactory.getOcuavlocAvailable(this.avllocModelLocTemp);
      avllocResult.subscribe(avllocResultList => {
        if (avllocResultList.length === 0) {
          this.avllocData = [];
        } else {
          this.avllocData = avllocResultList;
      }
        const fbolocResult = this.ocuavlocFactory.
        getOcuavlocUnAvailable(this.fbolocModelTemp);
        fbolocResult.subscribe(fbolocResultList => {
          if (fbolocResultList.length === 0) {
            this.fbolocData = [];
          } else {
          this.fbolocData = fbolocResultList;
        }
        this.checkLocFlag = false;
        if (this.avllocData.length > 0 || this.fbolocData.length > 0 ) {
          if (this.avllocData.length > 0) {
          for (let l = 0; l < this.avllocData.length; l++) {
            if (event.data.description === this.avllocData[l].description) {
              rowdata.validated = true;
              this.checkLocFlag = true;
              this.index = 0;
              this.index = this.offvstData.indexOf(event.data);
              this.offvstData[this.index].visitInternalLocationId = this.avllocData[l].internalLocationId;
              this.offvstData[this.index].agencyVisitSlotId =  this.avllocData[l].agencyVisitSlotId;
              rowdata.data = {
                description: this.avllocData[l].description,
              };
              return rowdata;
            }
          }
        }
        if (this.fbolocData.length > 0) {
          for (let l = 0; l < this.fbolocData.length; l++) {
            if (event.data.description === this.fbolocData[l].description) {
              rowdata.validated = true;
              this.checkLocFlag = true;
              this.index = 0;
              this.index = this.offvstData.indexOf(event.data);
              this.offvstData[this.index].visitInternalLocationId = this.fbolocData[l].internalLocationId;
              this.offvstData[this.index].agencyVisitSlotId =  this.fbolocData[l].agencyVisitSlotId;
              rowdata.data = {
                description: this.fbolocData[l].description,
              };
              return rowdata;
            }
          }
        }
         if ( !this.checkLocFlag ) {
          this.index = 0;
          this.index = this.offvstData.indexOf(event.data);
          this.dialogService.openLinkDialog( '/OCUAVLOC', event.data, 80 ).subscribe( result => {
              this.offvstData[this.index].description = result.description;
              this.offvstData[this.index].visitInternalLocationId = result.visitInternalLocationId;
              this.offvstData[this.index].agencyVisitSlotId =  result.agencyVisitSlotId;
          } );
          rowdata.validated = true;
         }
        }
      });
    });
      rowdata.validated = true;
      return rowdata;
    }
    if (event.field === 'visitDate' && DateFormat.compareDate(DateFormat.getDate(event.newValue), DateFormat.getDate(event.oldValue)) !== 0
      && event.data.visitDate) {
      const rAgyLocId = event.data.agyLocId ? event.data.agyLocId : '';
      this.offvstData[index]['parentField'] = 'visitDate : ' + DateFormat.format(event.data.visitDate)
        + ', hAgyLocId: ' + this.vHeaderBlockModel.agyLocId
        + ', rAgyLocId: ' + rAgyLocId;
        this.parentFieldObserval.next(this.offvstData[index]['parentField']);
      this.grid.setColumnData('timeSlot', index, undefined);
      this.grid.setColumnData('originalTimeSlot', index, undefined);
      this.grid.setColumnData('startTime', index, undefined);
      this.grid.setColumnData('endTime', index, undefined);
      this.grid.setColumnData('description', index, undefined);
      this.grid.setColumnData('agencyVisitSlotId', index, undefined);
      this.grid.setColumnData('visitInternalLocationId', index, undefined);
      const timeSlotService = this.oidvisitFactory.rgVisitTimeSlotsRecordGroup(this.offvstData[index]['parentField']);
      timeSlotService.subscribe(timeSlotData => {
        this.timeSlotMap = new Map();
        for (const dataval of timeSlotData) {
          if (dataval.canDisplay) {
            this.timeSlotMap.set(dataval.code, dataval.description);
          }
        }
      });
      rowdata.validated = true;
      return rowdata;
    }
    if (event.field === 'startTime' && event.newValue !== event.oldValue) {
      this.startTimeFlag = false;
      if (!this.offvstData[index].visitDate) {
        this.type = 'warn';
        this.message = this.translateService.translate('oidvisit.pleaseenteravisitdatefirst');
        this.show();
        rowdata.validated = false;
        this.offvstData[index]['startTime'] = undefined;
        return rowdata;
      }
      if (event.data.startTime && DateFormat.compareTime(event.data.startTime,
        TimeFormat.parse(event.data.originalTimeSlot, this.offvstData[index].visitDate)) === -1) {
          this.startTimeFlag = true;
        this.type = 'warn';
        this.message = this.translateService.translate('oidvisit.starttimemaynotbebeforethetimeslotstarttime');
        this.show();
        rowdata.validated = true;
        return rowdata;
      } else {
        this.chkVisitConflicts(event.data);
        this.startTimeFlag = false;
      }
    }
    if (event.field === 'endTime' && Number(event.newValue) !== Number(event.oldValue)) {
      this.endTimeFlag = false;
      if (!this.offvstData[index].visitDate) {
        this.type = 'warn';
        this.message = this.translateService.translate('oidvisit.pleaseenteravisitdatefirst');
        this.show();
        rowdata.validated = false;
        this.offvstData[index]['endTime'] = undefined;
        return rowdata;
      }
      if (!this.offvstData[index].offenderBookId) {
        this.offvstData[index].offenderBookId = this.vHeaderBlockModel.offenderBookId;
      }
      if (event.data.endTime && DateFormat.compareTime(event.data.endTime,
        event.data.startTime) === -1) {
          this.endTimeFlag = true;
        this.type = 'warn';
        this.message = this.translateService.translate('oidvisit.endtimeshouldbegreaterthanstarttime');
        this.show();
        rowdata.validated = true;
        return rowdata;
      } else {
        this.chkVisitConflicts(event.data);
        this.endTimeFlag = false;
      }
      const endTimeService = this.oidvisitFactory.endTimeValidateQuery(this.offvstData[index]);
      endTimeService.subscribe(remVisitsData => {
        if (remVisitsData) {
          rowdata.validated = true;
          if (remVisitsData.visitStatus === 'LV_LIMIT_NULL') {
            this.offvstData[index]['cycleEnds'] = undefined;
            this.offvstData[index]['totalRemainingVisits'] = undefined;
            this.offvstData[index]['remainingVisitsType'] = undefined;
            this.offvstData[index]['totalRemainingTime'] = undefined;
            this.offvstData[index]['remainingTimeType'] = undefined;
            const data = {
              label: this.translateService.translate('oidvisit.offendervisitlimitvalidation'), yesBtn: true, noBtn: true
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
              if (typeof result === 'boolean' && result) {
                this.visitLimitsFlag = true;
              } else {
                this.visitLimitsFlag = false;
              }
              rowdata.validated = true;
              return rowdata;
            });
          } else {
            if ((remVisitsData.totalRemainingVisits && remVisitsData.totalRemainingVisits <= 0) ||
              (remVisitsData.totalRemainingTime && remVisitsData.totalRemainingTime <= 0)) {
              const data = {
                label: this.translateService.translate('oidvisit.visitexceedsthelimit'), yesBtn: true, noBtn: true
              };
              this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                if (typeof result === 'boolean' && result) {
                  this.visitExceedFlag = true;
                this.offvstData[index]['cycleEnds'] = DateFormat.getDate(remVisitsData.cycleEnds);
                this.offvstData[index]['totalRemainingVisits'] = remVisitsData.totalRemainingVisits;
                this.offvstData[index]['remainingVisitsType'] = remVisitsData.remainingVisitsType;
                this.offvstData[index]['totalRemainingTime'] = remVisitsData.totalRemainingTime;
                this.offvstData[index]['remainingTimeType'] = remVisitsData.remainingTimeType;
                } else {
                  this.visitExceedFlag = false;
                }
              });
            } else {
              this.offvstData[index]['cycleEnds'] = DateFormat.getDate(remVisitsData.cycleEnds);
              this.offvstData[index]['totalRemainingVisits'] = remVisitsData.totalRemainingVisits;
              this.offvstData[index]['remainingVisitsType'] = remVisitsData.remainingVisitsType;
              this.offvstData[index]['totalRemainingTime'] = remVisitsData.totalRemainingTime;
              this.offvstData[index]['remainingTimeType'] = remVisitsData.remainingTimeType;
            }
            rowdata.validated = true;
            return rowdata;
          }
        }
      });
    }
    if (event.field === 'visitType' && event.newValue !== event.oldValue && event.data.visitType) {
      this.configuredValue =false;
      if (!this.offvstData[index].visitDate) {
        this.type = 'warn';
        this.message = this.translateService.translate('oidvisit.pleaseenteravisitdatefirst');
        this.show();
        rowdata.validated = false;
        this.offvstData[index]['visitType'] = undefined;
        return rowdata;
      }

      if (this.visitTypeConfiguredData) {
        this.visitTypeConfiguredData.forEach(element => {
          if(element.code === event.data.visitType){
           this.configuredValue=true;
          }         
        });
      }
        if(!this.configuredValue){
          const data = {
            label: this.translateService.translate('oidvisit.visitlimitsarenotdefinedforthesecuritylevelofthisoffender'),
            yesBtn: true, noBtn: true
          };
          this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
            if (result) {
              if (!event.data.offenderVisitId && !event.data.conflictFlag) {
              this.preDmlAction(event.data);
              }
            } else {
              this.grid.setColumnData('visitType', index, undefined);
            }
          });
          rowdata.validated = true;
          return rowdata;
        }
      this.ocuvwarnFlag = false;
      this.oiuscingFlag = false;
      if (!this.offvstData[index].offenderBookId) {
        this.offvstData[index].offenderBookId = this.vHeaderBlockModel.offenderBookId;
      }
      /*
      * finding the offender restrictions for visitdate and offenderBookId.
      */
      if (!event.data.offenderVisitId) {
        const offResService = this.oidvisitFactory.getOffenderRestrictions(this.offvstData[index]);
        offResService.subscribe(offRestData => {
          if (offRestData > 0) {
            this.ocuvwarnFlag = true;
            /*
            * call_form OCUVWARN to cover future visits
            */
            const offRestrictionsData = {
              personId: null, inVoke: 'OFFENDER', offenderId: this.vHeaderBlockModel.offenderId,
              offenderBookId: this.vHeaderBlockModel.offenderBookId, visitDate: this.offvstData[index].visitDate
            };
            this.dialogService.openLinkDialog('/OCUVWARN', offRestrictionsData, 50).subscribe(warnResult => {
              if (warnResult) {
                /*
                 * condition to ckeck offender visit limit base on system profile.
                 */
                if (!event.data.conflictFlag) {
                  this.preDmlAction(event.data);
                }
                event.data.warnFlag = false;
              } else {
                event.data.warnFlag = true;
                this.grid.setColumnData('visitType', index, undefined);
                rowdata.validated = true;
                return rowdata;
              }
            });
          } else {
            /*
                    * condition to ckeck offender visit limit base on system profile.
                    */
            if (!event.data.conflictFlag) {
              this.preDmlAction(event.data);
            }
          }
        });
      }
    }
    if (event.field === 'timeSlot' && event.newValue !== event.oldValue && event.data.timeSlot) {
      rowdata.validated = true;
      this.offvstData[index]['originalTimeSlot'] = event.data.timeSlot.substring(11, 16);
      this.grid.setColumnData('startTime', index, TimeFormat.parse(event.data.timeSlot.substring(11, 16), event.data.visitDate));
      this.grid.setColumnData('endTime', index, TimeFormat.parse(event.data.timeSlot.substring(20, 25), event.data.visitDate));
      this.grid.setColumnData('description', index, undefined);
      rowdata.validated = true;
      return rowdata;
    }
    if (event.field === 'visitStatus' && event.newValue !== event.oldValue) {
      if (event.data) {
        if(event.data.visitStatus==='CANC'){
          this.grid.requiredOn('outcomeReasonCode');
        } else {
          this.grid.requiredOff('outcomeReasonCode');
        }
        // if (event.data.visitStatus && event.data.outcomeReasonCode) {
        //   this.type = 'warn';
        //   this.message = this.translateService.translate('oidvisit.youcannotsetthecompletionwhenacancelreasonisgiven');
        //   this.show();
        //   rowdata.validated = true;
        //   this.grid.setColumnData('visitStatus', index, undefined);
        // } 
       
          rowdata.validated = true;
          return rowdata;
        
      }
    
    } else if (event.field === 'outcomeReasonCode' && event.newValue !== event.oldValue) {
      this.locationSlotBookFlf = false;
      if (event.data.outcomeReasonCode) {
        this.grid.setColumnData('visitStatus', index, 'CANC');
        this.grid.setColumnData('eventOutcome', index,false);
      } else { 
        this.grid.setColumnData('visitStatus', index, 'SCH');

      }
      if (event.data) {
        if (event.data.visitStatus.outcomeReasonCode && event.data.visitStatus) {
          /*
          * service call recheck_time_slot for alert
          */
          this.avllocModelTemp = new VOcuavlocAvailable();
          this.avllocModelTemp.visitDate = event.data.visitDate;
          this.avllocModelTemp.offenderVisitId = event.data.offenderVisitId;
          this.avllocModelTemp.agencyVisitSlotId = event.data.agencyVisitSlotId;
          const serviceObj1 = this.ocuavlocFactory.reCheckTimeSlot(this.avllocModelTemp);
          serviceObj1.subscribe(data => {
            if (data === 0) {
              this.locationSlotBookFlf = true;
              this.type = 'warn';
              this.message = this.translateService.translate('ocuavloc.locationslotisfullybooked');
              this.show();
              return;
            } else {
              this.locationSlotBookFlf = false;
            }
          });
          rowdata.validated = true;
          return rowdata;
        } else {
          rowdata.validated = true;
          return rowdata;
        }
      }
    } else {
      rowdata.validated = true;
      return rowdata;
    }
  }

  /**
   *  This function is onVisitsInsert
   *
   */
  onVisitsInsert = () => {
    if (this.vHeaderBlockModel.statusDisplay == 'Inactive') {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.visitcannotbecreatedforinactiveoffender');
      this.show();
      return false;
    }
    if (this.conflictFlag) {
      const conflictData = { 'eventDate': this.offvstModel.visitDate, 'offenderBookId': this.vHeaderBlockModel.offenderBookId };
      this.dialogService.openLinkDialog('/oiuscinq', conflictData).subscribe(result => {
        if (result !== null) {
          this.conflictFlag = false;
          if (!this.visitExceedFlag) {
            this.openVisitExceedsDialog();
            return false;
         }
          if (!this.visitLimitsFlag) {
            this.openConfirmationDialog();
            return false;
          }
        } else {
          this.conflictFlag = true;
        }
      });
      return;
    } else if (!this.visitExceedFlag) {
      this.openVisitExceedsDialog();
      return false;
   } else if (!this.visitLimitsFlag) {
      this.openConfirmationDialog();
      return false;
    }
    if (this.startTimeFlag) {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.starttimemaynotbebeforethetimeslotstarttime');
      this.show();
      return false;
    } else if (this.endTimeFlag) {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.endtimeshouldbegreaterthanstarttime');
      this.show();
      return false;
    }
    for (let i = 0; i < this.offvstData.length; i++) {
      if (!this.offvstData[i].visitDate) {
        this.type = 'warn';
        this.message = this.translateService.translate('common.datemustbeentereddate');
        this.show();
        return;
      }
      if (!this.offvstData[i].timeSlot) {
        this.type = 'warn';
        this.message = this.translateService.translate('oidvisit.timeslotmustbeentered');
        this.show();
        return;
      }
      if (!this.offvstData[i].startTime) {
        this.type = 'warn';
        this.message = this.translateService.translate('oidvisit.starttimemustbeentered');
        this.show();
        return;
      }
      if (!this.offvstData[i].endTime) {
        this.type = 'warn';
        this.message = this.translateService.translate('oidvisit.endtimemustbeentered');
        this.show();
        return;
      }
      if (!this.offvstData[i].visitType) {
        this.type = 'warn';
        this.message = this.translateService.translate('oidvisit.visittypemustbeentered');
        this.show();
        return;
      }
      if (!this.offvstData[i].description) {
        this.type = 'warn';
        this.message = this.translateService.translate('oiihisco.locationmustbe');
        this.show();
        return;
      }
    }
    this.saveDiable = false;
    this.vstCommentText = undefined;
    this.offvstModel =  new VOffenderVisits();
    this.offvstpersData = [];
    this.perCommentText = undefined;
    this.imageVisit = undefined;
    this.offvstoffData = [];
    this.offCommentText = undefined;
    this.visitOffimage = undefined;
    this.offvstpersData = [];
    this.offvstoffData = [];
    return {
      butOcuavloc: '..', description: null,
      visitInternalLocationId: undefined, agyLocId: this.vHeaderBlockModel.agyLocId, eventOutcome: true,
      checkFlag: true, agencyVisitSlotId: undefined, conflictFlag : false, warnflag: false, offenderDetails:this.vHeaderBlockModel.agyLocId  + ',' + this.vHeaderBlockModel.offenderBookId
    };
  }

  /**
  *  This function will be executed when commit event is
  *  fired
  */
  oidvisitSaveoffvstForm(event) {
    this.getMaxVisitors();
    if (this.conflictFlag) {
      const conflictData = { 'eventDate': this.offvstModel.visitDate, 'offenderBookId': this.vHeaderBlockModel.offenderBookId };
      this.dialogService.openLinkDialog('/oiuscinq', conflictData).subscribe(result => {
        if (result !== null) {
          this.conflictFlag = false;
        } else {
          this.conflictFlag = true;
        }
      });
      return;
    }
    if (this.startTimeFlag) {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.starttimemaynotbebeforethetimeslotstarttime');
      this.show();
      return;
    }
    if (this.endTimeFlag) {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.endtimeshouldbegreaterthanstarttime');
      this.show();
      return;
    }
    this.checkVisitors = false;
    this.checkOffenders = false;
    this.offvstInsertList = event.added;
    this.offvstUpdatetList = event.updated;
    this.offvstDeleteList = event.removed;
    this.offvstCommitModel.vOffenderVisitVisitorsList = [];
    this.offvstCommitModel.offenderVisitVisitorsList = [];

     // check duplicate Visiting Offenders
     if (this.offvstoffData.length > 1) {
      for (let m = 0; m < this.offvstoffData.length; m++) {
        var count = 0;
        for (let n = m + 1; n < this.offvstoffData.length; n++) {
          if (this.offvstoffData[m].offenderBookId === this.offvstoffData[n].offenderBookId) {
            count = 1;
            break;
          }
        }
        if (count == 1) {
          this.type = 'warn';
          this.message = this.translateService.translate('oidvisit.theoffenderhasalreadybeenassignedtosameoffender');
          this.show();
          return;
        }

      }
    }

     // check duplicate visitors
     
     if (this.offvstpersData.length > 1) {
      for (let m = 0; m < this.offvstpersData.length; m++) {
        var count = 0;
        for (let n = m + 1; n < this.offvstpersData.length; n++) {
          if (this.offvstpersData[m].personId === this.offvstpersData[n].personId) {
            count = 1;
            break;
          }
        }
        if (count == 1) {
          this.type = 'warn';
          this.message = this.translateService.translate('oidvisit.theoffenderhasalreadybeenassigned');
          this.show();
          return;
        }

      }
    }

    if (this.offvstInsertList.length > 0) {
      if (this.offvstpersData.length > 0) {
        if (this.offvstpersData[0].personId) {
          this.checkVisitors = true;
          this.offvstCommitModel.vOffenderVisitVisitorsList = this.offvstpersData;
          for (let i = 0; i < this.offvstpersData.length; i++) {
            // validations
            if (!this.offvstpersData[i].personId) {
              this.type = 'warn';
              this.message = this.translateService.translate('oidvisit.visitoridmustbeentered');
              this.show();
              return;
            }
            this.offvstpersData[i].eventOutcome = (String(this.offvstpersData[i].eventOutcome) === 'true' ||
             String(this.offvstpersData[i].eventOutcome) === 'ATT' ) ? 'ATT' : 'ABS';
          }
        }
      }
      /**
       *
       */
      if (this.offvstoffData.length > 0) {
        if (this.offvstoffData[0].offenderIdDisplay) {
          this.checkOffenders = true;
          this.offvstCommitModel.offenderVisitVisitorsList = this.offvstoffData;
          for (let i = 0; i < this.offvstoffData.length; i++) {
            // validations
            if (!this.offvstoffData[i].offenderIdDisplay) {
              this.type = 'warn';
              this.message = this.translateService.translate('common.idmustbeentered');
              this.show();
              return;
            }
            this.offvstoffData[i].eventOutcome = (String(this.offvstoffData[i].eventOutcome) === 'true' ||
            String(this.offvstoffData[i].eventOutcome) === 'ATT' ) ? 'ATT' : 'ABS';
          }
        }
      }
    }
     
    this.offvstCommitModel.insertList = [];
    this.offvstCommitModel.updateList = [];
    this.offvstCommitModel.deleteList = [];
    for (let i = 0; i < this.offvstData.length; i++) {
      if (this.offvstData[i].eventOutcome) {
        this.offvstData[i].eventOutcome = 'ATT';
      } else {
        this.offvstData[i].eventOutcome = 'ABS';
      }
      if (!this.offvstData[i].visitDate) {
        this.type = 'warn';
        this.message = this.translateService.translate('common.datemustbeentereddate');
        this.show();
        return;
      }
      if (!this.offvstData[i].timeSlot) {
        this.type = 'warn';
        this.message = this.translateService.translate('oidvisit.timeslotmustbeentered');
        this.show();
        return;
      }
      if (!this.offvstData[i].startTime) {
        this.type = 'warn';
        this.message = this.translateService.translate('oidvisit.starttimemustbeentered');
        this.show();
        return;
      }
      if (!this.offvstData[i].endTime) {
        this.type = 'warn';
        this.message = this.translateService.translate('oidvisit.endtimemustbeentered');
        this.show();
        return;
      }

      if (!this.offvstData[i].visitType) {
        this.type = 'warn';
        this.message = this.translateService.translate('oidvisit.visittypemustbeentered');
        this.show();
        return;
      }
      if (!this.offvstData[i].description) {
        this.type = 'warn';
        this.message = this.translateService.translate('oiihisco.locationmustbe');
        this.show();
        return;
      }
       if (this.offvstData[i].startTime && this.offvstData[i].endTime) {
        if (DateFormat.compareTime(DateFormat.getDate(this.offvstData[i].startTime),
        DateFormat.getDate(this.offvstData[i].endTime)) === 1) {
            this.type = 'warn';
            this.message = this.translateService.translate('oiiosced.endtimemustbegreaterthanstarttime');
            this.show();
            return;
        }
      }
    }
    if (!this.checkOffenders && !this.checkVisitors && this.offvstInsertList.length > 0) {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.onevisitororvisitingoffendermustbeentered');
      this.show();
      this.grid.btnSavebtnDisable = this.grid.isSaveDisabled();
      return;
    }
    if (this.offvstInsertList.length > 0 || this.offvstUpdatetList.length > 0) {
      for (let i = 0; i < this.offvstInsertList.length; i++) {
        if (this.offvstInsertList[i].offenderBookId === this.vHeaderBlockModel.offenderBookId) {
          if (this.offvstInsertList[i].visitStatus) {
            this.offvstInsertList[i].eventStatus = this.offvstInsertList[i].visitStatus;
          }
        }
        if(this.offvstInsertList[i].visitStatus === 'CANC' && !this.offvstInsertList[i].outcomeReasonCode){
          this.type = 'warn';
          this.message = this.translateService.translate('oidvisit.cancelreasonmustbeentered');
          this.show();
          return;
        }
        if (this.offvstInsertList[i].outcomeReasonCode) {
          this.offvstInsertList[i].visitStatus = 'CANC';
          this.offvstInsertList[i].eventStatus = this.offvstInsertList[i].visitStatus;
        }
        if ( !this.offvstInsertList[i].visitStatus) {
        this.offvstInsertList[i].visitStatus = 'SCH';
        }
        this.offvstInsertList[i].eventStatus = this.offvstInsertList[i].visitStatus;
        if (!this.offvstInsertList[i].agyLocId) {
          this.offvstInsertList[i].agyLocId = this.vHeaderBlockModel.agyLocId;
        }
        if (!this.offvstInsertList[i].offenderBookId) {
          this.offvstInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
        }
        if (!this.offvstInsertList[i].visitOffenderBookId) {
          this.offvstInsertList[i].visitOffenderBookId = this.vHeaderBlockModel.offenderBookId;
        }
        if (DateFormat.compareTime(this.offvstInsertList[i].startTime,
          DateFormat.getDate(this.offvstInsertList[i].originalTimeSlot)) === 1) {
          this.type = 'warn';
          this.message = this.translateService.translate('oidvisit.starttimemaynotbebeforethetimeslotstarttime');
          this.show();
          return;
        }
        if (DateFormat.compareTime(this.offvstInsertList[i].startTime,
          this.offvstInsertList[i].endTime) === 1) {
          this.type = 'warn';
          this.message = this.translateService.translate('oidvisit.endtimeshouldbegreaterthanstarttime');
          this.show();
          return;
        }
      }
      // update list
      for (let i = 0; i < this.offvstUpdatetList.length; i++) {
        /*
        * set_status
        */
        if (this.offvstUpdatetList[i].offenderBookId === this.vHeaderBlockModel.offenderBookId) {
          if (this.offvstUpdatetList[i].visitStatus) {
            this.offvstUpdatetList[i].eventStatus = this.offvstUpdatetList[i].visitStatus;
          }
        }
        if(this.offvstUpdatetList[i].visitStatus === 'CANC' && !this.offvstUpdatetList[i].outcomeReasonCode){
          this.type = 'warn';
          this.message = this.translateService.translate('oidvisit.cancelreasonmustbeentered');
          this.show();
          return;
        }
        if (this.offvstUpdatetList[i].outcomeReasonCode) {
         // this.offvstUpdatetList[i].visitStatus = 'CANC';
          this.offvstUpdatetList[i].eventStatus = this.offvstUpdatetList[i].visitStatus;
        }
        if ( !this.offvstUpdatetList[i].visitStatus) {
        this.offvstUpdatetList[i].visitStatus = 'SCH';
        }
        this.offvstUpdatetList[i].eventStatus = this.offvstUpdatetList[i].visitStatus;

        if (!this.offvstUpdatetList[i].agyLocId) {
          this.offvstUpdatetList[i].agyLocId = this.vHeaderBlockModel.agyLocId;
        }
        if (!this.offvstUpdatetList[i].offenderBookId) {
          this.offvstUpdatetList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
        }
        if (!this.offvstUpdatetList[i].visitOffenderBookId) {
          this.offvstUpdatetList[i].visitOffenderBookId = this.vHeaderBlockModel.offenderBookId;
        }
       
        if (DateFormat.compareTime(DateFormat.getDate(this.offvstUpdatetList[i].startTime),
          DateFormat.getDate(this.offvstUpdatetList[i].originalTimeSlot)) === 1) {
          this.type = 'warn';
          this.message = this.translateService.translate('oidvisit.starttimemaynotbebeforethetimeslotstarttime');
          this.show();
          return;
        }
        if (DateFormat.compareTime(DateFormat.getDate(this.offvstUpdatetList[i].startTime),
        DateFormat.getDate(this.offvstUpdatetList[i].endTime)) === 1) {
          this.type = 'warn';
          this.message = this.translateService.translate('oidvisit.endtimeshouldbegreaterthanstarttime');
          this.show();
          return;
        }
      }
      this.offvstCommitModel.insertList = this.offvstInsertList;
      this.offvstCommitModel.updateList = this.offvstUpdatetList;
    }
    if (this.offvstDeleteList.length > 0) {
      for (let i = 0; i < this.offvstDeleteList.length; i++) {
      }
      this.offvstCommitModel.deleteList = this.offvstDeleteList;
    }
    if (this.recheckTimeSlotFlag || this.offvstpersData.length > this.maxVisitCount) {
      const dialougeData = (this.recheckTimeSlotFlag ? {
        label: this.translateService.translate('oidvisit.thislocationslotfullbooked'), yesBtn: true, noBtn: true, cancelBtn: true
      } : {
        label: this.translateService.translate('oidvisit.thenumberofvisitorsexceedslimits'), yesBtn: true, noBtn: true, cancelBtn: true
      }
      );
      this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dialougeData, 50).subscribe(result => {
        if (result) {
          const crtEveSaveData = this.oidvisitFactory.nonAssocationOffendersData(this.offvstCommitModel);
          crtEveSaveData.subscribe(data => {
            if (data === "EMPTYDATA") {
              this.offVstCommit(this.offvstCommitModel);
            }
            else {
              const msgOne = this.translateService.translate('oidvisit.visitSchedule');
              const msgTwo = this.translateService.translate('oidvisit.indinonassocconflict');
              const msgThree = this.translateService.translate('oidvisit.gangnonassocconflict');
              data = data.replaceAll('oidvisit.visitSchedule', msgOne);
              data = data.replaceAll('oidvisit.indinonassocconflict', msgTwo);
              data = data.replaceAll('oidvisit.gangnonassocconflict', msgThree);
              const labelMsg = {
                label: this.translateService.translate(data), yesBtn: true, proceedWithNoConflictsBtn: false, cancelBtn: true,
                proceedBtnDisabled: true
              };
              this.dialogService.openLinkDialog('/OCUNAWRN', labelMsg, 50).subscribe(result => {
                if (result) {
                  this.offVstCommit(this.offvstCommitModel);
                } else {
                  return;
                }
              });
            }
          });
        } else {
          this.visitPersonGrid.btnSavebtnDisable = this.visitPersonGrid.isSaveDisabled();
          this.grid.btnSavebtnDisable = this.grid.isSaveDisabled();
        }
      });
    } else {
    const crtEveSaveData = this.oidvisitFactory.nonAssocationOffendersData(this.offvstCommitModel);
    crtEveSaveData.subscribe(data => {
      if (data === "EMPTYDATA") {
        this.offVstCommit(this.offvstCommitModel);
      }
      else {
        const msgOne  = this.translateService.translate('oidvisit.visitSchedule');
        const msgTwo  = this.translateService.translate('oidvisit.indinonassocconflict');
        const msgThree  = this.translateService.translate('oidvisit.gangnonassocconflict');
        data = data.replaceAll('oidvisit.visitSchedule',msgOne);
        data = data.replaceAll('oidvisit.indinonassocconflict',msgTwo);
        data = data.replaceAll('oidvisit.gangnonassocconflict',msgThree);
        const labelMsg = {
          label: this.translateService.translate(data), yesBtn: true, proceedWithNoConflictsBtn: false, cancelBtn: true,
          proceedBtnDisabled: true
        };
        this.dialogService.openLinkDialog('/OCUNAWRN', labelMsg, 50).subscribe(result => {
          if (result) {
            this.offVstCommit(this.offvstCommitModel);
          } else {
            return;
          }
        });
      }
    });
  }
}

  offVstCommit( event ) {
    const offvstSaveData = this.oidvisitFactory.offVstCommit(this.offvstCommitModel);
    offvstSaveData.subscribe(data => {
      if (data === 1) {
        this.recheckTimeSlotFlag = false;
        this.type = 'success';
        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
        this.show();
        this.oidvisitexecuteQuery();
      } else {
        this.type = 'warn';
        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
        this.show();
        this.oidvisitexecuteQuery();
      }
    });
  }
  /**
  *  This function is execute query
  *
  */
  oidvisitexecuteQuery() {
    this.offvstModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
    this.offvstModel.agyLocId = this.vHeaderBlockModel.agyLocId;
    if (this.offvstModel.offenderBookId) {
      const serviceObj = this.oidvisitFactory.offVstExecuteQuery(this.offvstModel);
      serviceObj.subscribe(data => {
        if (data.length === 0) {
          this.imageVisit = undefined;
          this.visitOffimage = undefined;
          this.perCommentText =undefined
        } else {
          data.forEach(element => {
            element['parentField'] = 'visitDate : ' + DateFormat.format(element.visitDate)
              + ', hAgyLocId: ' + this.vHeaderBlockModel.agyLocId
              + ', rAgyLocId: ' + element.agyLocId;
          });
          for (let i = 0; i < data.length; i++) {
            data[i].butOcuavloc = '..';
            data[i].offenderDetails = this.vHeaderBlockModel.agyLocId  + ',' + this.vHeaderBlockModel.offenderBookId
            data[i].eventOutcome = data[i].eventOutcome === 'ATT' ? 'true' : undefined;
            if (data[i].outcomeReasonCode || data[i].visitStatus) {
              if (data[i].outcomeReasonCode) {
                data[i].checkFlag = false;
              } else if (!data[i].visitStatus) {
                data[i].checkFlag = true;
              } else if (data[i].visitStatus === 'EXP' || data[i].visitStatus === 'CANC' ||
                data[i].visitStatus === 'COMP' || data[i].visitStatus === 'SCH') {
                data[i].checkFlag = true;
              } else if (data[i].visitStatus) {
                data[i].checkFlag = false;
              } else {
                data[i].checkFlag = true;
              }
            } else {
              data[i].checkFlag = false;
            }
          }
          this.offvstData = data;
          this.offvstData.sort(this.offenderSearchService.compare);
          this.insertGrid = true;
          this.offvstModel = this.offvstData[0];
          this.offvstIndex = 0;
        }
      });
    }
  }

  /**
  *  This function will be executed when commit event is
  *  fired
  */
  oidvisitSaveoffvstpersForm(event) {
    setTimeout(() => {
    this.offvstpersInsertList = event.added;
    this.offvstpersUpdatetList = event.updated;
    this.offvstpersDeleteList = event.removed;
    this.offvstpersCommitModel.insertList = [];
    this.offvstpersCommitModel.updateList = [];
    this.offvstpersCommitModel.deleteList = [];
    if ( this.visitorNotAuth ) {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.thisvisitorisnotactiveorapproved');
      this.show();
      return;
    }
    if (this.offVstOffUpdateFlag) {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.thisvisitorisnotauthorisedfor') +  this.visitorList + ' ' +
      this.translateService.translate('oidvisit.pleasevalidatebeforeproceeding');
      this.show();
      return;
    }
    if (this.overlapFlag) {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.thisoffenderhasanoverlappingvisitbookedwith') + ' ' +
        this.overlapVisitResData;
      this.show();
      return;
    }
    if (this.offvstpersInsertList.length > 0 || this.offvstpersUpdatetList.length > 0) {
      for (let i = 0; i < this.offvstpersInsertList.length; i++) {
        if (!this.offvstpersInsertList[i].personId) {
          this.type = 'warn';
          this.message = this.translateService.translate('oidvisit.visitoridmustbeentered');
          this.show();
          return;
        }
        this.offvstpersInsertList[i].eventOutcome = String(this.offvstpersInsertList[i].eventOutcome) === 'true' ? 'ATT' : 'ABS';
        if (!this.offvstpersInsertList[i].offenderVisitId) {
          if (this.offvstModel.offenderVisitId) {
            this.offvstpersInsertList[i].offenderVisitId = this.offvstModel.offenderVisitId;
          } else {
            this.type = 'warn';
            this.message = this.translateService.translate('oidvisit.pleasesavethevisitsfirst');
            this.show();
            return;
          }
        }
        if (this.offvstpersData.length > 0) {
          const updCount = { repeat: 0, invalid: false };
          this.offvstpersData.forEach(element => {
              if (this.offvstpersInsertList[i].personId === element.personId) {
                  updCount.repeat++;
              }
              if (updCount.repeat > 1) {
                  updCount.invalid = true;
                  return;
              }
          });
          if (updCount.invalid) {
                 this.type = 'warn';
                 this.message = this.translateService.translate('oidvisit.thepersonhasalreadybeenassignedtothevisit');
                 this.show();
                  return;
                }
          }
      }
      for (let i = 0; i < this.offvstpersUpdatetList.length; i++) {
        if (!this.offvstpersUpdatetList[i].personId) {
          this.type = 'warn';
          this.message = this.translateService.translate('oidvisit.visitoridmustbeentered');
          this.show();
          return;
        }
        this.offvstpersUpdatetList[i].eventOutcome = String(this.offvstpersUpdatetList[i].eventOutcome) === 'true' ? 'ATT' : 'ABS';
      }
      this.offvstpersCommitModel.insertList = this.offvstpersInsertList;
      this.offvstpersCommitModel.updateList = this.offvstpersUpdatetList;
    }
    if (this.offvstpersDeleteList.length > 0) {
      for (let i = 0; i < this.offvstpersDeleteList.length; i++) {
      }
      this.offvstpersCommitModel.deleteList = this.offvstpersDeleteList;
    }
    if ( this.recheckTimeSlotFlag  || this.offvstpersData.length > this.maxVisitCount) {
      if(this.offvstpersCommitModel.insertList.length > 0 || this.offvstpersCommitModel.updateList.length > 0 ){
      const dialougeData = ( this.recheckTimeSlotFlag ? {
        label: this.translateService.translate( 'oidvisit.thislocationslotfullbooked' ), yesBtn: true, noBtn: true, cancelBtn: true
    } : {
      label: this.translateService.translate( 'oidvisit.thenumberofvisitorsexceedslimits' ), yesBtn: true, noBtn: true, cancelBtn: true
    }
  );
    this.dialogService.openLinkDialog( '/ocucoffeconfirmbox', dialougeData, 50 ).subscribe( result => {
            if (result) {
              const offvstpersSaveData = this.oidvisitFactory.offVstPersCommit(this.offvstpersCommitModel);
              offvstpersSaveData.subscribe( data => {
                if (data === 1) {
                  this.recheckTimeSlotFlag = false;
                  this.type = 'success';
                  this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                  this.perCount = 0;
                  for ( let i = 0; i < this.offvstpersData.length ; i++ ) {
                    if (this.offvstpersData[i].eventOutcome !== 'ABS') {
                      this.perCount = this.perCount + 1;
                    }
                  }
                  if ( this.perCount ===  0 ) {
                    this.offvstData = [];
                    this.offvstpersData = [];
                    this.oidvisitexecuteQuery();
                    this.offVstPersExecuteQuery();
                  } 
                  else {
                    this.offVstPersExecuteQuery();
                  }
                  this.overlapFlag = false;
                  this.show();
                }  else if (data === 2130) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('oidvisit.thepersonhasalreadybeenassignedtothevisit');
                  this.show();
                  return;
                } else  {
                  this.type = 'warn';
                  this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                  this.offVstPersExecuteQuery();
                  this.show();
                }
              });
            } else {
              this.visitPersonGrid.btnSavebtnDisable = this.visitPersonGrid.isSaveDisabled();
            }
          });
        }
    } else {
      const offvstpersSaveData = this.oidvisitFactory.offVstPersCommit(this.offvstpersCommitModel);
      offvstpersSaveData.subscribe( data => {
        if (data === 1) {
          this.type = 'success';
          this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
          this.perCount = 0;
          for ( let i = 0; i < this.offvstpersData.length ; i++ ) {
            if (this.offvstpersData[i].eventOutcome !== 'ABS') {
              this.perCount = this.perCount + 1;
            }
          }
          if ( this.perCount ===  0 ) {
            this.offvstData = [];
            this.offvstpersData = [];   
          }
          else {
            this.offVstPersExecuteQuery();
          }
          this.oidvisitexecuteQuery();
          this.offVstPersExecuteQuery();
          this.overlapFlag = false;
          this.show();
        } else if (data === 2130) {
          this.type = 'warn';
          this.message = this.translateService.translate('oidvisit.thepersonhasalreadybeenassignedtothevisit');
          this.show();
          return;
        } else {
          this.type = 'warn';
          this.message = this.translateService.translate('common.addupdateremoverecordfailed');
          this.offVstPersExecuteQuery();
          this.show();
        }
      });
    }
  }, 2000);
  }

  /**
  * This function loads the data into the child Record and from its master record
  */
  offVstPersExecuteQuery() {
    // this.offvstpersIndex = -1;
    this.recheckTimeSlotFlag = false;
    this.offvstpersModel = new VOffenderVisitVisitors();
    this.offvstpersModel.offenderVisitId = this.offvstModel.offenderVisitId;
    this.offvstpersModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
    this.offvstpersModel.visitDate = this.offvstModel.visitDate;
    if (this.offvstpersModel.offenderVisitId && this.offvstpersModel.offenderBookId) {
      const serviceObj = this.oidvisitFactory.offVstPersExecuteQuery(this.offvstpersModel);
      serviceObj.subscribe(data => {
        if (data.length === 0) {
          this.offvstpersData = [];
          this.offvstpersIndex = -1;
          this.cameraButton = true;
          this.imageVisit = null;
          this.perCommentText = null;
        } else {
          for ( let rowdata of data ) {
            rowdata.butOmuvrest = '';
            rowdata.butOiuovres = '';
            rowdata.screen = '/OIDVISIT';
            rowdata.eventOutcome = rowdata.eventOutcome === 'ATT' ? 'true' : undefined;
          }
          this.offvstpersData = data;
          this.offvstpersData.sort(this.offenderSearchService.compare);
          this.offvstpersModel = this.offvstpersData[0];
          this.offvstpersIndex = 0;
          this.cameraButton = false;
        }
      });
    } else {
      this.offvstpersData = [];
      this.offvstpersIndex = -1;
    }
  }

  imagesVisitorsExecuteQuery(event) {
    this.imageModel.imageObjectId = event.personId;
    const images1Result = this.oidvisitFactory.imagesVisitorsExecuteQuery(this.imageModel);
    images1Result.subscribe(imageResultData => {
      if (imageResultData.length === 0) {
        this.imageVisitData = [];
        this.imageVisit = null;
      } else {
        this.imageVisitData = imageResultData;
        this.imageModel = imageResultData[0];
        if (this.imageModel && this.imageModel.imageThumbnail) {
          this.imageVisit = 'data:image/JPEG;base64,' + this.imageModel.imageThumbnail;
        }
      }
    });
  }

  /**
  * This function loads the data into the Master Record and its child records
  */
  imagesVisitingOffExecuteQuery(event) {
    this.imageModel.imageObjectId = event.offenderBookId;
    const serviceObj = this.oidvisitFactory.imagesVisitingOffExecuteQuery(this.imageModel);
    serviceObj.subscribe(imageResultData => {
      if (imageResultData.length === 0) {
        this.imageVisitData = [];
        this.visitOffimage = null;
      } else {
        this.imageVisitData = imageResultData;
        this.imageModel = imageResultData[0];
        if (this.imageModel && this.imageModel.imageThumbnail) {
          this.visitOffimage = 'data:image/JPEG;base64,' + this.imageModel.imageThumbnail;
        }
      }
    });
  }

  /**
  * This function will be executed when commit event is
  * fired
  */
  oidvisitSaveoffvstoffForm(event) {
    setTimeout(() => {
    this.offvstoffInsertList = event.added;
    this.offvstoffUpdatetList = event.updated;
    this.offvstoffDeleteList = event.removed;
    this.offvstoffCommitModel.insertList = [];
    this.offvstoffCommitModel.updateList = [];
    this.offvstoffCommitModel.deleteList = [];
    if (this.visitorIsOffFlg) {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.thisoffendervisitoristheoffender');
      this.show();
      return;
    }
    if (this.offDuplicateFalg) {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.theoffenderhasalreadybeenassigned');
      this.show();
      return;
    }
    if ( this.authVisitorFlg) {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.thisoffenderisnotauthorisedvisitor');
      this.show();
      return;
    }
    if (this.offVstOffUpdateFlag) {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.thisvisitorisnotauthorisedfor') +  this.visitorList + ' ' +
      this.translateService.translate('oidvisit.pleasevalidatebeforeproceeding');
      this.show();
      return;
    }
    if (this.overlapFlag) {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.thisoffenderhasanoverlappingvisitbookedwith') + ' ' +
        this.overlapVisitResData;
      this.show();
      return;
    }
    if (this.offvstoffInsertList.length > 0 || this.offvstoffUpdatetList.length > 0) {
      for (let i = 0; i < this.offvstoffInsertList.length; i++) {
        if (!this.offvstoffInsertList[i].offenderIdDisplay) {
          this.type = 'warn';
          this.message = this.translateService.translate('common.idmustbeentered');
          this.show();
          return;
        }
        if (!this.offvstoffInsertList[i].offenderVisitId) {
          if (this.offvstModel.offenderVisitId) {
            this.offvstoffInsertList[i].offenderVisitId = this.offvstModel.offenderVisitId;
          } else {
            this.type = 'warn';
            this.message = this.translateService.translate('oidvisit.pleasesavethevisitsfirst');
            this.show();
            return;
          }
        }
        this.offvstoffInsertList[i].eventOutcome = String(this.offvstoffInsertList[i].eventOutcome) === 'true' ? 'ATT' : 'ABS';
      }
      for (let i = 0; i < this.offvstoffUpdatetList.length; i++) {
        this.offvstoffUpdatetList[i].eventOutcome = String(this.offvstoffUpdatetList[i].eventOutcome) === 'true' ? 'ATT' : 'ABS';
      }
      this.offvstoffCommitModel.insertList = this.offvstoffInsertList;
      this.offvstoffCommitModel.updateList = this.offvstoffUpdatetList;
    }
    if (this.offvstoffData.length > 1) {
      for (let m = 0; m < this.offvstoffData.length; m++) {
        var count = 0;
        for (let n = m + 1; n < this.offvstoffData.length; n++) {
          if (this.offvstoffData[m].offenderBookId === this.offvstoffData[n].offenderBookId) {
            count = 1;
            break;
          }
        }
        if (count == 1) {
          this.type = 'warn';
          this.message = this.translateService.translate('oidvisit.theoffenderhasalreadybeenassignedtosameoffender');
          this.show();
          return;
        }

      }
    }

    if (this.offvstoffDeleteList.length > 0) {
      for (let i = 0; i < this.offvstoffDeleteList.length; i++) {
      }
      this.offvstoffCommitModel.deleteList = this.offvstoffDeleteList;
    }
    if (this.recheckTimeSlotFlag || this.numVisitorExdFlag) {
      const dialougeData = (this.recheckTimeSlotFlag ? {
        label: this.translateService.translate('oidvisit.thislocationslotfullbooked'), yesBtn: true, noBtn: true, cancelBtn: true
      } :
        {
          label: this.translateService.translate('oidvisit.thenumberofvisitorsexceedslimits'), yesBtn: true, noBtn: true, cancelBtn: true
        }
      );
      this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dialougeData, 50).subscribe(result => {
        if (result) {
          const offvstoffSaveData = this.oidvisitFactory.offVstOffCommit(this.offvstoffCommitModel);
          offvstoffSaveData.subscribe(data => {
            if (data === 1) {
              this.recheckTimeSlotFlag = false;
              this.numVisitorExdFlag = false;
              this.type = 'success';
              this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
              this.offCount = 0;
              for ( let i = 0; i < this.offvstoffData.length ; i++ ) {
                if (this.offvstoffData[i].eventOutcome !== 'ABS') {
                  this.offCount = this.offCount + 1;
                }
              }
              if ( this.offCount ===  0 ) {
                this.offvstData = [];
                this.offvstoffData = [];
                this.oidvisitexecuteQuery();
              } else {
                this.offVstOffExecuteQuery();
              }
              this.overlapFlag = false;
              this.show();
            } else if(data === 5) {
              this.type = 'warn';
              this.message = this.translateService.translate('oidvisit.theoffenderhasalreadybeenassigned');
              this.offVstOffExecuteQuery();
              this.show();
            }
            else {
              this.type = 'warn';
              this.message = this.translateService.translate('common.addupdateremoverecordfailed');
              this.offVstOffExecuteQuery();
              this.show();
            }
          });
        } else {
          this.visitOffGrid.btnSavebtnDisable = this.visitOffGrid.isSaveDisabled();
        }
      });
    } else {
      const offvstoffSaveData = this.oidvisitFactory.offVstOffCommit(this.offvstoffCommitModel);
      offvstoffSaveData.subscribe(data => {
        if (data === 1) {
          this.type = 'success';
          this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
          this.offCount = 0;
          for ( let i = 0; i < this.offvstoffData.length ; i++ ) {
            if (this.offvstoffData[i].eventOutcome !== 'ABS') {
              this.offCount = this.offCount + 1;
            }
          }
          if ( this.offCount ===  0 ) {
            this.offvstData = [];
            this.offvstoffData = [];
            this.oidvisitexecuteQuery();
          } else {
            this.offVstOffExecuteQuery();
          }
          this.overlapFlag = false;
          this.show();
        } else if(data === 5) {
          this.type = 'warn';
          this.message = this.translateService.translate('oidvisit.theoffenderhasalreadybeenassigned');
          this.offVstOffExecuteQuery();
          this.show();
        } else {
          this.type = 'warn';
          this.message = this.translateService.translate('common.addupdateremoverecordfailed');
          this.offVstOffExecuteQuery();
          this.show();
        }
      });
    }
  }, 2000);
  }

  /**
  * This function loads the data into the child Record and from its master record
  */
  offVstOffExecuteQuery() {
    this.offvstoffModel = new OffenderVisitVisitors();
    this.offvstoffModel.offenderVisitId = this.offvstModel.offenderVisitId;
    this.offvstoffModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
    this.offvstoffModel.visitDate = this.offvstModel.visitDate;
    if (this.offvstoffModel.offenderVisitId) {
      const serviceObj = this.oidvisitFactory.offVstOffExecuteQuery(this.offvstoffModel);
      serviceObj.subscribe(data => {
        if (data.length === 0) {
          this.offvstoffIndex = -1;
          this.offvstoffData = [];
          this.visitOffimage = null;
        } else {
          this.offvstoffData = [];
          for (let i = 0; i < data.length; i++) {
            data[i].butOcuprest = '';
            data[i].eventOutcome = data[i].eventOutcome === 'ATT' ? 'true' : undefined;
          }
          this.offvstoffData = data;
          this.offvstoffData.sort(this.offenderSearchService.compare);
          this.offvstoffModel = this.offvstoffData[0];
          this.offvstoffIndex = 0;
        }
      });
    } else {
      this.offvstoffData = [];
    }
  }
  onVisitOffInsert = () => {
    if (!this.offvstModel || !this.offvstModel.offenderVisitId) {
      if (!(this.offvstModel.visitDate && this.offvstModel.timeSlot && this.offvstModel.startTime
        && this.offvstModel.endTime && this.offvstModel.visitType && this.offvstModel.description)) {
        this.type = 'warn';
        this.message = this.translateService.translate('common.youcannotcreatethisrecord');
        this.show();
        return;
      }
    } else {
      this.saveDiable = false;
    }
    if (this.startTimeFlag) {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.starttimemaynotbebeforethetimeslotstarttime');
      this.show();
      return false;
    } else if (this.endTimeFlag) {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.endtimeshouldbegreaterthanstarttime');
      this.show();
      return false;
    }
    if (!this.offvstModel.checkFlag) {
        this.type = 'warn';
        this.message = this.translateService.translate('common.youcannotcreaterecordshere');
        this.show();
        return;
    } else {
      this.visitorList = undefined;
      return {
        butOmuapris: '', offenderIdDisplay: undefined, lastName: undefined, firstName: undefined, agyLocId: undefined,
        contactType: undefined, relationshipType: undefined, restriction: undefined, offenderBookId: this.vHeaderBlockModel.offenderBookId,
        eventOutcome: false, visitDate: this.offvstModel.visitDate, butOcuprest: '', personId: undefined, ocuvwarnFlag: false
      };
    }
  }

  onVstPersInsert = () => {
    this.getMaxVisitors();
    if (!this.offvstModel || !this.offvstModel.offenderVisitId) {
      // if (!(this.offvstModel.visitDate && this.offvstModel.timeSlot && this.offvstModel.startTime
      //   && this.offvstModel.endTime && this.offvstModel.visitType && this.offvstModel.description)) {
      //   this.type = 'warn';
      //   this.message = this.translateService.translate('common.youcannotcreatethisrecord');
      //   this.show();
      //   return;
      // }
    } else {
      this.saveDiable = false;
    }
    if (this.startTimeFlag) {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.starttimemaynotbebeforethetimeslotstarttime');
      this.show();
      return false;
    } else if (this.endTimeFlag) {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.endtimeshouldbegreaterthanstarttime');
      this.show();
      return false;
    }
    if (!this.offvstModel.checkFlag) {
        this.type = 'warn';
        this.message = this.translateService.translate('common.youcannotcreaterecordshere');
        this.show();
        return;
    } else {
      this.visitorList = undefined;
      for (let i = 0; i < this.offvstpersData.length; i++) {
        if (!this.offvstpersData[i].personId) {
          return;
        }
      }
      return {
        butOcuavisn: '', butOiuovres: '', butOmuvrest: '', visitDate: this.offvstModel.visitDate,
        eventOutcome: false, offenderVisitId: this.offvstModel.offenderVisitId
      };
    }
  }

  onPerClear = () => {
    this.saveDiable = false;
    return true;
  }

  onOffClear = () => {
    this.saveDiable = false;
    return true;
  }
  onGridClear = () => {
    this.conflictFlag = false;
    this.visitLimitsFlag = true;
    this.visitExceedFlag = true;
    this.startTimeFlag = false;
    return true;
  }

  /**
 * this methos is to validate the visiting offenders block
 */
  validateOffVstOffRowChange = (event) => {
    const rowdata = new ValidateRowReturn();
    const index = this.offvstoffData.indexOf(event.data);
    this.vPersonId = (this.offvstpersData.length > 0 && this.offvstpersModel.personId) ? this.offvstpersModel.personId : undefined;
    this.vOffenderIdDisplay = undefined;
    if (event.field === 'offenderIdDisplay' && Number(event.newValue) !== Number(event.oldValue)) {
      this.visitorOffenderIdDisplay = event.data.offenderIdDisplay;
      this.offDuplicateFalg = false;
      this.authVisitorFlg = false;
      this.visitorIsOffFlg = false;
      this.recheckTimeSlotFlag = false;
      if (Number(event.data.offenderIdDisplay) === Number(this.vHeaderBlockModel.offenderIdDisplay)) {
        this.visitorIsOffFlg = true;
        this.type = 'warn';
        this.message = this.translateService.translate('oidvisit.thisoffendervisitoristheoffender');
        this.show();
        rowdata.validated = false;
        return rowdata;
      }
      if (event.data.offenderIdDisplay.length > 0) {
        this.voffauthvisModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.voffauthvisModel.visitorOffenderIdDisplay = this.visitorOffenderIdDisplay;
        const visitingOffResult = this.oidvisitFactory.vOffAuthVisExecuteQuery(this.voffauthvisModel);
        visitingOffResult.subscribe(visitingOffData => {
          if (visitingOffData.length === 0) {
            const offenderDetails = this.oidvisitFactory.getOffenderDetails(event.data.offenderIdDisplay);
            offenderDetails.subscribe(offenderDetailsData => {
              this.vOffenderId = offenderDetailsData.offenderId;
              this.vOffenderBookId = offenderDetailsData.offenderBookId;
              const offvstModeltemp = new VOffenderVisits();
              offvstModeltemp.visitDate = this.offvstData[index].visitDate;
              offvstModeltemp.offenderBookId = this.vOffenderBookId;
              offvstModeltemp.offenderIdDisplay = event.data.offenderIdDisplay;
              this.visitingOffendersPreConditions(event.data);
            });
          } else {
            if (event.data.offenderIdDisplay === visitingOffData[0].visitorOffenderIdDisplay) {
              const offenderDetail = this.oidvisitFactory.getOffenderDetails(event.data.offenderIdDisplay);
              offenderDetail.subscribe(offenderDetailsData => {
                this.vOffenderId = offenderDetailsData.offenderId;
                this.vOffenderBookId = offenderDetailsData.offenderBookId;
                this.offvstoffData[index]['offenderBookId'] = this.vOffenderBookId;
                const offvstModeltemp = new VOffenderVisits();
                offvstModeltemp.visitDate = this.offvstData[index].visitDate;
                offvstModeltemp.offenderBookId = this.vOffenderBookId;
                offvstModeltemp.offenderIdDisplay = event.data.offenderIdDisplay;
                /*
              * finding the offender restrictions for visitdate and offenderBookId.
              */
                const offResService = this.oidvisitFactory.getOffenderRestrictions(offvstModeltemp);
                offResService.subscribe(offRestData => {
                  if (offRestData > 0) {
                    /*
                    * call_form OCUVWARN to cover future visits
                    */
                    const offRestrictionsData = {
                      personId: null, offenderIdDisplay: event.data.offenderIdDisplay,
                      inVoke: 'OFFENDER', offenderId: this.vOffenderId,
                      offenderBookId: this.vOffenderBookId, visitDate: this.offvstData[index].visitDate
                    };
                    if ( !event.data.ocuvwarnFlag) {
                    this.dialogService.openLinkDialog('/OCUVWARN', offRestrictionsData, 80).subscribe(warnResult => {
                      if (warnResult) {
                        this.setVisitingOffenders(index, visitingOffData[0]);
                          this.visitingOffendersPreConditions(event.data);
                      } else {
                        this.grid.setColumnData('offenderIdDisplay', index, undefined);
                        rowdata.validated = true;
                        return rowdata;
                      }
                    });
                  } else {
                    if (event.data.offenderIdDisplay) {
                      this.setVisitingOffenders(index, visitingOffData[0]);
                      this.visitingOffendersPreConditions(event.data);
                    }
                  }
                  } else {
                    this.setVisitingOffenders(index, visitingOffData[0]);
                      this.visitingOffendersPreConditions(event.data);
                  }
                });
              });
            } else {
              const offenderDetails = this.oidvisitFactory.getOffenderDetails(event.data.offenderIdDisplay);
              offenderDetails.subscribe(offenderDetailsData => {
                this.vOffenderId = offenderDetailsData.offenderId;
                this.vOffenderBookId = offenderDetailsData.offenderBookId;
                const offvstModeltemp = new VOffenderVisits();
                offvstModeltemp.visitDate = this.offvstData[index].visitDate;
                offvstModeltemp.offenderBookId = this.vOffenderBookId;
                offvstModeltemp.offenderIdDisplay = event.data.offenderIdDisplay;
                this.setVisitingOffenders(index, visitingOffData[0]);
                this.visitingOffendersPreConditions(event.data);
              });
            }
          }
        });
      }
    }
    rowdata.validated = true;
    return rowdata;
  }

  visitingOffendersPreConditions(event) {
    if (this.vOffenderBookId) {
      const index = this.offvstoffData.indexOf(event);
      this.offDuplicateFalg = false;
      if (index >= 0) {
        for (let i = 0; i < this.offvstoffData.length; i++) {
          if (i !== index && event.offenderIdDisplay === this.offvstoffData[i].offenderIdDisplay) {
            this.offDuplicateFalg = true;
            this.type = 'warn';
            this.message = this.translateService.translate('oidvisit.theoffenderhasalreadybeenassigned');
            this.show();
            return;
          }
        }
      }
      /*
     * cheking for authorised_offender
     */
    this.authVisitorFlg = false;
      const isAutherOff = this.oidvisitFactory.isAuthorisedOffender(this.vHeaderBlockModel.offenderBookId, this.vOffenderBookId);
      isAutherOff.subscribe(isAutherOffData => {
        if (!isAutherOffData) {
          this.authVisitorFlg = true;
          this.type = 'warn';
          this.message = this.translateService.translate('oidvisit.thisoffenderisnotauthorisedvisitor');
          this.show();
          return;
        }
        this.validateVisitor(event);
        event.startTime = this.offvstModel.startTime;
        event.endTime = this.offvstModel.endTime;
        this.overlapFlag = false;
        const preInsertData = this.oidvisitFactory.visitOffPreInsert(event);
        preInsertData.subscribe(preInsrtdata => {
          if (preInsrtdata === '3115') {
            this.offDuplicateFalg = true;
            this.type = 'warn';
            this.message = this.translateService.translate('oidvisit.theoffenderhasalreadybeenassigned');
            this.show();
            return;
          } else if (preInsrtdata === 'NULL') {
            /*
            * service call recheck_time_slot for alert
            */
            this.offvstModel.person = 1;
            this.offvstModel.adult = 1;
            this.offvstModel.group = 0;
            const serviceObj1 = this.oidvisitFactory.recheckTimeSlots(this.offvstModel);
            serviceObj1.subscribe(timeSlot => {
              if (timeSlot === 0) {
                this.recheckTimeSlotFlag = true;
                return;
              } else {
                /* service call checkVisitorLimit for alert */
                const recheckData = this.oidvisitFactory.checkVisitorLimit(this.offvstModel);
                recheckData.subscribe(recheck => {
                  if (recheck === 0) {
                    this.numVisitorExdFlag = true;
                  } else {
                    this.numVisitorExdFlag = false;
                  }
                });
              }
            });
          } else {
            this.overlapFlag = true;
            this.overlapVisitResData = preInsrtdata;
            this.type = 'warn';
            this.message = this.translateService.translate('oidvisit.thisoffenderhasanoverlappingvisitbookedwith') + ' ' +
            preInsrtdata;
              // event.offenderIdDisplay + ' - ' + event.lastName + ', ' + event.firstName;
            this.show();
            return;
          }
        });
      });
    } else {
      this.authVisitorFlg = true;
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.thisoffenderisnotauthorisedvisitor');
      this.show();
      return;
    }
  }
  /**
   * this methos is to validate the visitos block
   */
  validateOffVstPerRowChange = (event) => {
    const rowdata = new ValidateRowReturn();
    const index = event.rowIndex;
    this.vPersonId = undefined;
    this.vOffenderBookId = undefined;
    this.visitorNotAuth = false;
    this.vOffenderIdDisplay = (this.offvstoffData.length > 0 && this.offvstoffModel.offenderIdDisplay) ?
     this.offvstoffModel.offenderIdDisplay : undefined;
    if (event.field === 'personId' && Number(event.newValue) !== Number(event.oldValue)) {
      this.recheckTimeSlotFlag = false;
      if (event.data.personId ) { // && event.data.personId.length > 0
        const isPerAuthData = this.oidvisitFactory.isAuthorisedPerson(event.data.personId, this.vHeaderBlockModel.offenderBookId);
        isPerAuthData.subscribe(isPerAuthDataResult => {
          if ( !isPerAuthDataResult ) {
            this.visitorNotAuth = true;
            this.type = 'warn';
            this.message = this.translateService.translate('oidvisit.thisvisitorisnotactiveorapproved');
            this.show();
            rowdata.validated = false;
            return rowdata;
          } else {
            this.voffauthvisitorModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.voffauthvisitorModel.visitDate = event.data.visitDate;
            this.voffauthvisitorModel.personId = event.data.personId;
            const voffauthvisResult = this.ocuavisnFactory.vOffAuthVisExecuteQuery(this.voffauthvisitorModel);
            voffauthvisResult.subscribe(visitorsData => {
              if (visitorsData.length === 0) {
              } else {
                for (let i = 0; i < this.offvstpersData.length; i++) {
                  if (i !== index && event.data.personId === this.offvstpersData[i].personId) {
                    rowdata.validated = false;
                    return rowdata;
                  }
                }
                /**
                 * OCUVWARN to check future visitor restrictions.
                 */
                event.data.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                const visitorRes = this.oidvisitFactory.getVisitorRestrictions(event.data);
                visitorRes.subscribe(visitorResData => {
                  if (visitorResData > 0) {
                    if ( !event.data.ocuvwarnFlag) {
                    const offRestrictionsData = {
                      personId: event.data.personId, inVoke: 'VISITOR', offenderId: null,
                       visitDate: this.offvstData[index].visitDate
                    };
                    this.dialogService.openLinkDialog('/OCUVWARN', offRestrictionsData, 50).subscribe(warnResult => {
                      if (warnResult) {
                        if (Number(event.data.personId) === visitorsData[0].personId) {
                          this.setDataToVisitors(index, visitorsData[0]);
                          this.overlapVisitForVisitors(event.data);
                        }
                      } else {
                        this.offVstOffUpdateFlag = false;
                        this.visitPersonGrid.setColumnData('personId', index, undefined);
                        rowdata.validated = true;
                        return rowdata;
                      }
                    });
                  } else {
                    this.setDataToVisitors(index, visitorsData[0]);
                    this.overlapVisitForVisitors(event.data);
                  }
                  } else {
                   /**
                 * OCUVWARN to check future visitor restrictions.
                 */
                if (visitorsData[0].age && visitorsData[0].age < this.gAgeLimit &&  ( !event.data.ocuvwarnFlag) ) {
                  const offRestrictionsData = {
                      personId: event.data.personId, inVoke: 'VISITOR', offenderId: null,
                      offenderBookId: this.vHeaderBlockModel.offenderBookId, visitDate: this.offvstModel.visitDate
                  };
                  this.dialogService.openLinkDialog('/OCUVWARN', offRestrictionsData, 70).subscribe(result => {
                      if (result) {
                        if (Number(event.data.personId) === visitorsData[0].personId) {
                          this.setDataToVisitors(index, visitorsData[0]);
                          this.overlapVisitForVisitors(event.data);
                        }
                      } else {
                        this.offVstOffUpdateFlag = false;
                        this.visitPersonGrid.setColumnData('personId', index, undefined);
                        rowdata.validated = true;
                        return rowdata;
                      }
                  });
                  } else {
                    if (Number(event.data.personId) === visitorsData[0].personId) {
                      this.setDataToVisitors(index, visitorsData[0]);
                      this.overlapVisitForVisitors(event.data);
                    }
                  }
                  }
                });
              }
            });
          }
        });
      }
        rowdata.validated = true;
        return rowdata;
    } else if (event.field === 'eventOutcome' && event.newValue !== event.oldValue) {
      /**
       * to check if the contact record is active.
       */
        const checkContactActive = this.oidvisitFactory.checkContactActive(this.vHeaderBlockModel.offenderBookId, event.data.personId );
        checkContactActive.subscribe( chkConActiveData => {
          if ( !(chkConActiveData > 0) ) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidvisit.youcannotsetaninactivecontacttobeattended');
            this.show();
            rowdata.validated = false;
            return rowdata;
          } else {
            rowdata.validated = true;
            return rowdata;
          }
        });
    }
    rowdata.validated = true;
    return rowdata;
  }

  preDmlAction(event) {
    const index = this.offvstData.indexOf(event);
    this.oiuscingFlag = false;
    if (event.visitDate) { // and :off_vst.visit_date != nvl(:off_vst.nbt_visit_date,'31-DEC-2382')
    this.oichearModelTemp = new OicHearings();
    this.oichearModelTemp.offenderBookId = this.vHeaderBlockModel.offenderBookId;
    this.oichearModelTemp.hearingDate = event.visitDate;
      const schConflictServiceObj = this.ocuoichnFactory.
        oicHearCheckScheduleConflict(this.oichearModelTemp);
      schConflictServiceObj.subscribe(schConflictList => {
        if (schConflictList === 0) {
          if (!this.conflictFlag && this.visitTypeLimit === 'LV_LIMIT_NULL' && !this.visitTypeLvLimitFlag) {
            // this.openConfirmationDialog();
           }
           const remVisitsService = this.oidvisitFactory.visitTypeValidateQuery(this.offvstData[index]);
           remVisitsService.subscribe(remVisitsData => {
             if (remVisitsData) {
               this.visitTypeLvLimitFlag = false;
               this.visitTypeLimit = remVisitsData.visitStatus;  
               
             
                 /*
                 * Visit Remaining Time Calculation 
                 */

                if ((remVisitsData.remainingVisitsType !=null && remVisitsData.remainingVisitsType <= 0) || (remVisitsData.totalRemainingVisits !=null && remVisitsData.totalRemainingVisits<=0) ||
                (remVisitsData.remainingTimeType !=null &&  Number(((event.endTime-event.startTime)/3600000).toFixed(2)) > Number(Number(remVisitsData.remainingTimeTypeTemp).toFixed(2)))
                ||(remVisitsData.totalRemainingTimeTemp !=null && Number(((event.endTime-event.startTime)/3600000).toFixed(2)) > Number(Number(remVisitsData.totalRemainingTimeTemp).toFixed(2)))){
                   this.visitExceedFlag = false; 
                   this.openVisitExceedsDialog();
                   if (!remVisitsData.supLevel) {
                     this.offvstData[index]['totalRemainingVisits'] = undefined;
                     this.offvstData[index]['remainingVisitsType'] = undefined;
                     this.offvstData[index]['totalRemainingTime'] = undefined;
                     this.offvstData[index]['remainingTimeType'] = undefined;
                     this.offvstData[index]['cycleEnds'] = DateFormat.getDate(remVisitsData.cycleEnds);
                   } else {
                     this.offvstData[index]['cycleEnds'] = DateFormat.getDate(remVisitsData.cycleEnds);
                     this.offvstData[index]['totalRemainingVisits'] = 0;
                     this.offvstData[index]['remainingVisitsType'] = 0;
                     this.offvstData[index]['totalRemainingTime'] = 0;
                     this.offvstData[index]['remainingTimeType'] = 0;
                   }
                 } else {
                   this.offvstData[index]['cycleEnds'] = DateFormat.getDate(remVisitsData.cycleEnds);
                   this.offvstData[index]['totalRemainingVisits'] = remVisitsData.totalRemainingVisits;
                   this.offvstData[index]['remainingVisitsType'] = remVisitsData.remainingVisitsType;
                   this.offvstData[index]['totalRemainingTime'] = remVisitsData.totalRemainingTime;
                   this.offvstData[index]['remainingTimeType'] = remVisitsData.remainingTimeType;
                   this.visitLimitsFlag = true;
                 }
     
                 return ;
               
             }
           });

           this.offvstData[index].conflictFlag = false;
        } else {
          this.oiuscingFlag = true;
          const data = { 'eventDate': event.visitDate, 'offenderBookId': this.vHeaderBlockModel.offenderBookId };
          this.dialogService.openLinkDialog('/oiuscinq', data).subscribe(result => {
            if (result !== null) {
              const remVisitsService = this.oidvisitFactory.visitTypeValidateQuery(this.offvstData[index]);
      remVisitsService.subscribe(remVisitsData => {
        if (remVisitsData) {
          this.visitTypeLvLimitFlag = false;
          this.visitTypeLimit = remVisitsData.visitStatus;  
          this.visitTypeLvLimitFlag = false;
            /*
            * Visit Remaining Time Calculation 
            */
          

          if ((remVisitsData.remainingVisitsType != null && remVisitsData.remainingVisitsType <= 0) || (remVisitsData.totalRemainingVisits !=null && remVisitsData.totalRemainingVisits<=0) ||
            (remVisitsData.remainingTimeType != null && Number(((event.endTime - event.startTime) / 3600000).toFixed(2)) > Number(Number(remVisitsData.remainingTimeTypeTemp).toFixed(2))) 
            ||(remVisitsData.totalRemainingTimeTemp !=null && Number(((event.endTime-event.startTime)/3600000).toFixed(2)) > Number(Number(remVisitsData.totalRemainingTimeTemp).toFixed(2)))) {
              this.visitExceedFlag = false;
              this.openVisitExceedsDialog();              
              if (!remVisitsData.supLevel) {
                this.offvstData[index]['totalRemainingVisits'] = undefined;
                this.offvstData[index]['remainingVisitsType'] = undefined;
                this.offvstData[index]['totalRemainingTime'] = undefined;
                this.offvstData[index]['remainingTimeType'] = undefined;
                this.offvstData[index]['cycleEnds'] = DateFormat.getDate(remVisitsData.cycleEnds);
              } else {
                this.offvstData[index]['cycleEnds'] = DateFormat.getDate(remVisitsData.cycleEnds);
                this.offvstData[index]['totalRemainingVisits'] = 0;
                this.offvstData[index]['remainingVisitsType'] = 0;
                this.offvstData[index]['totalRemainingTime'] = 0;
                this.offvstData[index]['remainingTimeType'] = 0;
              }
            } else {
              this.offvstData[index]['cycleEnds'] = DateFormat.getDate(remVisitsData.cycleEnds);
              this.offvstData[index]['totalRemainingVisits'] = remVisitsData.totalRemainingVisits;
              this.offvstData[index]['remainingVisitsType'] = remVisitsData.remainingVisitsType;
              this.offvstData[index]['totalRemainingTime'] = remVisitsData.totalRemainingTime;
              this.offvstData[index]['remainingTimeType'] = remVisitsData.remainingTimeType;
              this.visitLimitsFlag = true;
            }

            return ;
          
        }
      });
               this.offvstData[index].conflictFlag = false;
              this.conflictFlag = false;
            } else {
              this.conflictFlag = true;
              this.offvstData[index].conflictFlag = false;
            }
          });
        }
      });
    }
  }

  validateVisitor(event) {
    this.omuaprisWrnFlg = event.ocuvwarnFlag ? true : false;
    if (event.personId) {
      this.validateVisitorBeanModel.vPersonId = event.personId;
      this.validateVisitorBeanModel.vOffenderBookId = undefined;
      this.validateVisitorBeanModel.visitorList = this.offvstpersData;
      this.validateVisitorBeanModel.visitOfflist = this.offvstoffData;
      const validateService = this.oidvisitFactory.validateVisitor(this.validateVisitorBeanModel);
      validateService.subscribe(validateData => {
        if (validateData !== 'NULL') {
          this.visitorList = validateData;
          this.printIsValidateVisitVisitor(this.visitorList);
        } else {
          this.visitorList = undefined;
          this.offVstOffUpdateFlag = false;
        }
      });
    }
    if (event.offenderIdDisplay) {
      this.validateVisitorBeanModel.vPersonId = undefined;
      this.validateVisitorBeanModel.vOffenderBookId = this.vOffenderBookId;
      this.validateVisitorBeanModel.visitorList = this.offvstpersData;
      this.validateVisitorBeanModel.visitOfflist = this.offvstoffData;
      const validateService = this.oidvisitFactory.validateVisitor(this.validateVisitorBeanModel);
      validateService.subscribe(validateData => {
        if (validateData !== 'NULL') {
          this.visitorList = validateData;
          this.printIsValidateVisitVisitor(this.visitorList);
        } else {
          this.visitorList = undefined;
          this.offVstOffUpdateFlag = false;
        }
      });
    }
  }

  printIsValidateVisitVisitor( event ) {
    if ( event && event !== 'NULL' ) {
      this.offVstOffUpdateFlag = true;
       this.type = 'warn';
       this.message = this.translateService.translate('oidvisit.thisvisitorisnotauthorisedfor') +  event +
         ' ' + this.translateService.translate('oidvisit.pleasevalidatebeforeproceeding');
         if (this.omuaprisWrnFlg) {
          this.show();
         }
       return;
      } else {
        this.offVstOffUpdateFlag = false;
      }
  }

  setDataToVisitors(index, event) {
    this.visitPersonGrid.setColumnData('personId', index, event.personId);
    this.visitPersonGrid.setColumnData('lastName', index, event.lastName);
    this.visitPersonGrid.setColumnData('firstName', index, event.firstName);
    this.visitPersonGrid.setColumnData('contactType', index, event.contactType);
    this.visitPersonGrid.setColumnData('relationshipType', index, event.relationshipType);
    this.visitPersonGrid.setColumnData('age', index, event.age);
    this.visitPersonGrid.setColumnData('restriction', index, event.restriction);
   // this.visitPersonGrid.setColumnData('nbtGlobalRestriction', index, event.nbtGlobalRestriction);
    this.visitPersonGrid.setColumnData('eventOutcome', index, this.offvstpersModel.eventOutcome);
    this.visitPersonGrid.setColumnData('globalRestriction', index, event.globalRestriction);
  }

  setVisitingOffenders(index, event) {
    this.visitOffGrid.setColumnData('offenderIdDisplay', index, event.visitorOffenderIdDisplay);
    this.visitOffGrid.setColumnData('lastName', index, event.visitorLastName);
    this.visitOffGrid.setColumnData('firstName', index, event.visitorFirstName);
    this.visitOffGrid.setColumnData('agyLocId', index, event.location);
    this.visitOffGrid.setColumnData('contactType', index, event.contactType);
    this.visitOffGrid.setColumnData('restriction', index, event.restriction);
    this.visitOffGrid.setColumnData('relationshipType', index, event.relationshipType);
    this.visitOffGrid.setColumnData('selectLength', index, event.length);
  }

  overlapVisitForVisitors(event) {
    const overlapData = new VOffenderVisits();
    overlapData.personId = event.personId;
    overlapData.visitDate = this.offvstModel.visitDate;
    overlapData.startTime = this.offvstModel.startTime;
    overlapData.endTime = this.offvstModel.endTime;
    overlapData.offenderVisitId = this.offvstModel.offenderVisitId;
    const overlapVisitRes = this.oidvisitFactory.overlapVisitForVisitors(overlapData);
    overlapVisitRes.subscribe(overlapVisitResData => {
      if ( overlapVisitResData && overlapVisitResData !== 'false' ) {
        this.overlapFlag = true;
        this.overlapVisitResData = overlapVisitResData;
        this.type = 'warn';
        this.message = this.translateService.translate('oidvisit.thisoffenderhasanoverlappingvisitbookedwith') + ' ' + overlapVisitResData;
        this.show();
        return;
      } else {
        this.overlapFlag = false;
        /*
            * service call recheck_time_slot for alert
            */
            this.offvstModel.person = 1;
            this.offvstModel.adult = 1;
            this.offvstModel.group = 0;
            const serviceObj1 = this.oidvisitFactory.recheckTimeSlots(this.offvstModel);
            serviceObj1.subscribe(timeSlot => {
              if (timeSlot === 0) {
                this.recheckTimeSlotFlag = true;
                return;
              } else {
                /* service call checkVisitorLimit for alert*/
                const recheckData = this.oidvisitFactory.checkVisitorLimit(this.offvstModel);
                recheckData.subscribe(recheck => {
                  if (recheck === 0 || (this.visitPersonGrid.addedMap.size > recheck)) {
                    this.numVisitorExdFlag = true;
                    // this.message = this.translateService.translate('oidvisit.thenumberofvisitorsexceedslimits');
                  } else {
                    this.numVisitorExdFlag = false;
                  }
                });
              }
            });
        this.validateVisitor(event);
      }
    });
  }

  isReadOnly(event) {
    if (event && event.length > 0 && this.offvstModel.checkFlag) {
      return false;
    }
    return true;
  }

  offVstBlur() {
    const index = this.offvstData.indexOf(this.offvstModel);
    this.grid.setColumnData('commentText', index, this.vstCommentText);
  }

  offVstPersBlur() {
    const index = this.offvstpersData.indexOf(this.offvstpersModel);
    this.visitPersonGrid.setColumnData('commentText', index, this.perCommentText);
  }

  offVstOffBlur() {
    const index = this.offvstoffData.indexOf(this.offvstoffModel);
    this.visitOffGrid.setColumnData('commentText', index, this.offCommentText);
  }

  /**
     * This function validates the delete visitors
     */
  onVstPersDelete = () => {
    if (this.offvstpersData.length === 1 && this.offvstoffData.length === 0 ) {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.onevisitororvisitingoffendermustbeentered');
      this.show();
      return false;
    } else {
      return true;
    }
  }

  /**
   * This function validates the delete visiting offender.
   */
  onVstOffDelete = () => {
    if (this.offvstpersData.length === 0 && this.offvstoffData.length === 1) {
      this.type = 'warn';
     // this.message = this.translateService.translate('common.youcannotdeletethisrecord');
     this.message = this.translateService.translate('oidvisit.onevisitororvisitingoffendermustbeentered');
      this.show();
      return false;
    } else {
      return true;
    }
  }

  /**
  * This function displays the messages
  */
  show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
  }

  isVisOffDis() {
    if (this.visitPersonGrid.addedMap.size === 0 && this.visitPersonGrid.updatedMap.size === 0 &&
      this.visitPersonGrid.removedMap.size === 0) {
      return false;
    }
    return true;
  }
  isVisitorDis() {
    if (this.visitOffGrid.addedMap.size === 0 && this.visitOffGrid.updatedMap.size === 0 &&
      this.visitOffGrid.removedMap.size === 0) {
      return false;
    }
    return true;
  }

  onCameraPcclick() {
    this.cameraButton = true;
    if (this.offvstpersModel.personId) {
      if (this.visitPersonGrid.addedMap.size !== 0 || this.visitPersonGrid.updatedMap.size !== 0 ||
        this.visitPersonGrid.removedMap.size !== 0) {
        this.type = 'warn';
        this.message = this.translateService.translate('oidvisit.pleasecommit');
        this.show();
        return false;
      }
      const captureImageData = this.osiosearchService.captureImageProcedure();
      captureImageData.subscribe(captureImage => {
        if (captureImage === 'OIUIMAGE') {
          this.oidvisitFactory.imagesDataTemp.imageObjectId = this.offvstpersModel.personId;
          this.oidvisitFactory.imagesDataTemp.imageObjectType = 'PERSON';
          this.oidvisitFactory.imagesDataTemp.imageViewType = 'FACE';
          this.oidvisitFactory.imagesDataTemp.personId = this.offvstpersModel.personId;
          this.oidvisitFactory.imagesDataTemp.lastName = this.offvstpersModel.lastName;
          this.oidvisitFactory.imagesDataTemp.firstName = this.offvstpersModel.firstName;
          this.dialogService.openLinkDialog('/oiuimagedialog', this.oidvisitFactory.imagesDataTemp, 80).subscribe(result => {
            this.offVstPersExecuteQuery();
            this.cameraButton = false;
          });
        } else {
          return;
        }
      });
    } else {
      this.type = 'warn';
      this.message = this.translateService.translate('oidvisit.visitoridcannotbenull');
      this.show();
      this.cameraButton = false;
      return;
    }
  }

  oidvisitCheckListEntry() {
    this.oidvisitFactory.oidvisitCheckListEntry().subscribe(data => {
      if (data && data.length > 0) {
        this.listEntries = data;
        this.listEntries.forEach(element => {
          const key = element.weekDay + ' ' + element.agyLocId;
          if (!this.listEntryMap.get(key.toUpperCase())) {
            this.listEntryMap.set(key.toUpperCase(), []);
          } else {
            this.listEntryMap.get(key.toUpperCase()).push(element);
          }
        });
      } else {
        this.listEntries = [];
        this.listEntryMap.clear();
      }
    });
  }

  isListExists(data) {
    if (data && data.visitDate) {
      const weekDay = this.DaysMap.get(DateFormat.getDate(data.visitDate).getDay());
      const agyLocId = data.agyLocId ? data.agyLocId : this.vHeaderBlockModel.agyLocId;
      const key = weekDay + ' ' + agyLocId;
      if (!this.listEntryMap.get(key.toUpperCase()) || this.listEntryMap.get(key.toUpperCase()).length === 0) {
        return false;
      }
    }
    return true;
  }
  /**
    * chkVisitConflicts
    */
  chkVisitConflicts(event) {
    this.ocuWarngFlag = false;
    if (event.visitDate && event.startTime && event.endTime && event.visitInternalLocationId) {
      const ocuvwarnModel = new VOffenderVisits();
      ocuvwarnModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
      ocuvwarnModel.offenderVisitId = event.offenderVisitId;
      ocuvwarnModel.visitDate = event.visitDate;
      ocuvwarnModel.startTime = event.startTime;
      ocuvwarnModel.endTime = event.endTime;
      ocuvwarnModel.visitInternalLocationId = event.visitInternalLocationId;
      const recheckData = this.oidvisitFactory.chkVisitConflicts(ocuvwarnModel);
      recheckData.subscribe(recheck => {
        if (recheck.warnResult) {
          this.ocuWarngMsg = recheck.warnResult;
          this.ocuWarngFlag = true;
        } else {
          this.ocuWarngFlag = false;
        }
      });
    } else {
      this.ocuWarngFlag = false;
    }
  }
  onOmuaprisDailogClick = (event) => {
    this.dialogService.openLinkDialog('OMUAPRIS', this.vHeaderBlockModel, 80).subscribe(res => {
      let i=0;
      if (res) {
        res.forEach(e => {
        const index = this.offvstoffData.indexOf(event);
        this.visitOffGrid.setColumnData('offenderIdDisplay', index+i, e.visitorOffenderIdDisplay);
        this.visitOffGrid.setColumnData('lastName',  index+i, e.visitorLastName);
        this.visitOffGrid.setColumnData('firstName',  index+i, e.visitorFirstName);
        this.visitOffGrid.setColumnData('agyLocId',  index+i, e.location);
        this.visitOffGrid.setColumnData('contactType',  index+i, e.contactType);
        this.visitOffGrid.setColumnData('restriction',  index+i, e.restriction);
        this.visitOffGrid.setColumnData('relationshipType',  index+i, e.relationshipType);
        this.visitOffGrid.setColumnData('visitorOffenderId',  index+i, e.contactRootOffenderId);
        // this.visitOffGrid.setColumnData('selectLength', index, res.selectLength);
        this.offvstoffData[ index+i].ocuvwarnFlag = e.ocuvwarnFlag;
          if (i < res.length-1) {
            this.visitOffGrid.addRecord();
          }
        i++;
      });
    }
    });
  }

  
  ngOnDestroy() {
    if(!this.router.url.includes('/EOFFENDER')){
      this.eoffenderService.selectedRowData=null;
  }
		this.schedularService.backBtnFlag = false;
	  }

      onBack() {
		if(this.schedularService.backBtnFlag){
			this.schedularService.backBtnFlag = false;
			this.router.navigate(['/CALSCH']);
		} 
	}

  getMaxVisitors(){
    this.offvstModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
    this.offvstModel.agyLocId = this.sessionManager.currentCaseLoad;
    const serviceObj = this.oidvisitFactory.getMaxVisitors(this.offvstModel);
      serviceObj.subscribe(data => {
        this.maxVisitCount = data;
      });
  }

  rgVisitTypeRecordGroup(iepSecLevels){
    if(this.vHeaderBlockModel.agyLocId&&this.vHeaderBlockModel.offenderBookId){
      this.visitSearchQueryParam = this.vHeaderBlockModel.agyLocId  + ',' + this.vHeaderBlockModel.offenderBookId + ',' +iepSecLevels + ',' +this.sessionManager.currentCaseLoadType;
      const serviceObj = this.oidvisitFactory.rgVisitTypeRecordGroup(this.visitSearchQueryParam);
        serviceObj.subscribe(data => {
          if(data){
            this.visitTypeConfiguredData=data;
          } else {
            this.visitTypeConfiguredData =[];
          }
        });
    }
    }
    getIepVisitLimis(){
      this.oidvisitFactory.getIepVisitLimis(this.vHeaderBlockModel.agyLocId).subscribe(data => {
        if (data) {
            this.iepSecLevels = data.visitConfigType;
                this.rgVisitTypeRecordGroup(this.iepSecLevels);
        }
       });
    }
   
}
