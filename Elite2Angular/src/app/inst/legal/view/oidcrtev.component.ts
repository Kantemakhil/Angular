import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '@common/login/service/login.service';
import { TranslateService } from '@common/translate/translate.service';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { OidcrtevService } from '../service/oidcrtev.service';
import { CourtEvents } from '../../schedules/beans/CourtEvents';
import { CourtEventsCommitBean } from '../../schedules/beans/CourtEventsCommitBean';
import { TimeFormat } from '@core/ui-components/time/timeFormat';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';
import { VOffenderAllSchedules } from '../../schedules/beans/VOffenderAllSchedules';
import { OcdenforService } from '@iwp/service/ocdenfor.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-oidcrtev',
  templateUrl: './oidcrtev.component.html',
  styleUrls: ['./oidcrtev.component.scss']
})
export class OidcrtevComponent implements OnInit {

  @ViewChild('courteventsgrid', { static: true }) courteventsgrid: any;
  message = ' Invalid.';
  msglist = [];
  type = 'error';
  courtEventsColDefs: any[] = [];
  courtEventsGridData: CourtEvents[] = [];
  courtEventsDataTemp1: CourtEvents[] = [];
  courtEventsGridDataTemp: CourtEvents[] = [];
  courtEventModel: CourtEvents = new CourtEvents();
  crtEveCommitModel: CourtEventsCommitBean = new CourtEventsCommitBean();
  crtEveInsertList: CourtEvents[] = [];
  crtEveUpdateList: CourtEvents[] = [];
  msgs: any[];
  vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
  dataId: any;
  screenName = 'oidcrtev';
  singleSaveBtnText = 'Save'

  enableInsertInCourtEvents: boolean = false;
  pageData: any;
  selectedRow: any;
  appearanceTypeData: any[];
  enableSelection = true;
  vCtrEveModelModelTemp: CourtEvents = new CourtEvents();
  courtEventsTemp: CourtEvents = new CourtEvents();
  enable: boolean = false;
  offschIndex = 0;
  voffschModel: VOffenderAllSchedules = new VOffenderAllSchedules();
  isProceed: boolean = true;
  oldDate: any;
  res: String;
  datesFlag = false;
  conflictList: any[];
  hearingGroup: Map<string, string> = new Map<string, string>();
  parentField: string;
  caseloadId:string;
  defaultCanReason:string;
  eventId:number;
  eventStatus:number;
  backButtonEnable: boolean = false;
  screenId ='OIDCRTEV';
  condiLegalText = '';
  readonly:boolean;
  constructor(private OidcrtevFactory: OidcrtevService, public translateService: TranslateService,
    public loginService: LoginService, private dialogService: DialogService, public sessionManager: UserSessionManager, private location: Location,
    private ocdenforFactory: OcdenforService) {
    this.loadColDefData();
  }

  ngOnInit(): void {
    this.readonly=true;
    this.caseloadId = this.sessionManager.currentCaseLoad;
    this.getDefaultCancellationReason();
    this.courtEventsColDefs = [
      {
        fieldName: this.translateService.translate('oidcrtev.eventdate'), required: true, editable: true, cellEditable: this.commCellEditable,
        field: 'eventDate', width: 150, datatype: 'date'
      },
      {
        fieldName: this.translateService.translate('oidcrtev.time'), required: true, cellEditable: this.commCellEditable,
        field: 'startTime', editable: true, width: 100, datatype: 'time',
      },
      {
        fieldName: this.translateService.translate('oidcrtev.court'), required: true, source: 'OUMAGLOC', cellEditable: this.commCellEditable,
        field: 'court', editable: true, width: 150, datatype: 'lov', link: 'ocdccase/populateCourtData'
      },

      {
        fieldName: this.translateService.translate('oidcrtev.hearingreason'), required: true, editable: true, link: 'oidcrtev/hearingreasonRecordGroup', source: 'OUMEMOVE',
        field: 'hearingReason', datatype: 'lov', width: 130, cellEditable: this.commCellEditable,
      },

      {
        fieldName: this.translateService.translate('oidcrtev.apperancetype'), required: true, editable: true, domain: 'CRT_APP_TYPE',
        field: 'appearanceType', datatype: 'lov', width: 130, cellEditable: this.commCellEditable,
      },

      {
        fieldName: this.translateService.translate('oidcrtev.apperancelocation'), required: false, editable: true, source: 'OIMULOCA',
        link: 'oidcrtev/apperancelocationRecordGroup?caseLoadId=' ,parentField: 'parentField',
        field: 'appearanceLocation', datatype: 'lov', width: 130, cellEditable: this.commCellEditable,
      },
      {
        fieldName: this.translateService.translate('oidcrtev.matters'), required: false, editable: true,
        field: 'matter', datatype: 'text', width: 130, maxlength: 255, uppercase: 'false', hide: true, externalColumn:true
      },
      {
        fieldName: this.translateService.translate('oidcrtev.comment'), uppercase: 'false',
        field: 'commentText', datatype: 'text', editable: true, width: 130, maxlength: 240
      },
      {
        fieldName: this.translateService.translate('oidcrtev.cancel'),
        field: 'cancelFlag', datatype: 'checkbox',width: 130, cellEditable: this.callEditableCancelField,
      },
      {
        fieldName: this.translateService.translate('oidcrtev.outcomeReason'),
        field: 'outcomeReasonCode', datatype: 'lov', width: 130, domain: 'CRT_CAN_RSN',cellEditable: this.cellEditableReason,
      },
      {
        fieldName: this.translateService.translate('oidcrtev.intParties'),
        field: 'intParties', datatype: 'hyperlink', editable: true, width: 140, link: '/OCDINTPA',
        dialogWidth: '80', data: 'row', modal: true, updateField: 'row', displayas: 'image', onLaunchClick: this.onIntPartyClick
      },
      {
				fieldName: this.translateService.translate('common.iwpdocument')
				, field: 'butIwp', datatype: 'hyperlink',link: '/EOFFENDER',
				editable: true, displayas: 'href', styleClass: 'file_copy',
				width: 50, data: 'row', updateField: 'row', modal: false,queryparam: 'SCREEN'
			},
      {
        fieldName: '', field: 'conflictFlag', hide: true,
      },
      {
        fieldName: '', field: 'originalEventDate', hide: true,
      },
      {
        fieldName: '', field: 'parentField', hide: true,
      },
      {
        fieldName: '', field: 'eventStatus', hide: true,datatype:'text'
      },
      {
        fieldName: ' ', field: 'rembutton', datatype: 'launchbutton', editable: true, width: 100,
        data: 'row', updateField: 'row', modal: true, onLaunchClick: this.onConflictLaunchEdit
    }
    ];
    this.OidcrtevFactory.getAppearanceTypeData(this.sessionManager.getId(),'OIDCRTEV').subscribe(data => {
      if (data) {
        this.appearanceTypeData = data;
      }
    })
    const serviceObject = this.OidcrtevFactory.hearingreasonRecordGroup();
  serviceObject.subscribe(data => {
    if (data.length === 0) {
    } else {
        data.forEach(ele => {
            this.hearingGroup.set(ele.code, ele.description);
        });
    }
});

if (this.ocdenforFactory.backButton) {
  this.backButtonEnable = true;
  this.ocdenforFactory.backButton = false;
}
  }
  onIntPartyClick = (data) => {
    let inputData = {};
    inputData['recordId'] = data.eventId;
    inputData['recordType'] = 'CEVT';
    inputData['offenderBookId'] = data.offenderBookId;
    this.dialogService.openLinkDialog('/OCDINTPA', inputData, 50).subscribe(result => { });
  }
  show(vldmsg, type) {
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }
  onOffenderChange(offender) {
    this.vHeaderBlockModel = new VHeaderBlock();
    this.readonly =true;
    this.isProceed = true
    if (offender) {
      this.vHeaderBlockModel = offender;
      this.parentField =this.vHeaderBlockModel.agyLocId;
      if (this.vHeaderBlockModel.offenderBookId) {
        this.courtEventModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.enableInsertInCourtEvents = true;
        this.crtEveExecuteQuery();
      }
    }
    else {
      this.courtEventModel = new CourtEvents();
      this.enableInsertInCourtEvents = false;
      this.courtEventsGridData = [];
      this.datesFlag = false;
    }
  }

  crtEveExecuteQuery() {
    this.readonly = true;
    this.courtEventModel.agyLocId=this.vHeaderBlockModel.agyLocId
    const objdata = this.OidcrtevFactory.courtEveExecuteQuery(this.courtEventModel);
    objdata.subscribe(data => {
      if (data) {
        this.courtEventsGridData = data;
        this.courtEventsGridData.forEach(obj => {
          obj.cancelFlag=(obj.eventStatus==='CANC')?true:false;
          obj.originalEventDate = obj.eventDate;
          obj['intParties'] = "assets/images/legal-launch-btn-icon.png";
          obj['parentField']= this.parentField;
          obj['butIwp']= '';
          obj['matter']= obj.matter;
          obj['SCREEN'] = this.screenId + "~" + "true" + "~" + obj['eventId'];
          obj['rembutton'] = (this.sessionManager.currentCaseLoadType === 'COMM') ? (this.translateService.translate('oidcrtev.reminder')) : '';

        })
        this.condiLegalText = '';
        this.courtEventsDataTemp1 = JSON.parse(JSON.stringify(data));
        this.courtEventsGridDataTemp = JSON.parse(JSON.stringify(data));
      } else {
        this.courtEventsGridData = [];
        this.courtEventsDataTemp1 = [];
      }
    })
  }

  commCellEditable = (data: any, index: number, field: string): boolean => {
    if (field !== 'eventDate' || (field === 'eventDate' && this.offschIndex != index)) {
      if (this.datesFlag) {
        this.show(this.translateService.translate('oidsiapp.eventdatevalidation'), 'warn');
        return false;
      }
      if (!this.isProceed) {
        var obj={'scheduleModel':this.voffschModel,
            'conflictList': this.conflictList};
        this.dialogService.openLinkDialog('/oiuscinq', obj).subscribe(result => {
          if (!result) {
            this.isProceed = false;
            return false;
          } else {
            this.isProceed = true;
            return true;
          }
        });
        return false;
      }
    }

    if (field == 'appearanceLocation') {
      if (data.eventDate && DateFormat.compareDate(DateFormat.getDate(data.eventDate), DateFormat.getDate()) === -1) {
        return false;
      } else if (this.appearanceTypeData.length) {
        let filterData = this.appearanceTypeData.filter(obj => obj.code == data.appearanceType);
        if (filterData.length && filterData[0].parentCode == 'EXT') {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }


    }
    if (data) {
      if (data.eventId && DateFormat.compareDate(DateFormat.getDate(data.originalEventDate), DateFormat.getDate()) === 0) {
        return true;
      } else if ((data.eventId && DateFormat.compareDate(DateFormat.getDate(data.originalEventDate), DateFormat.getDate()) === 1) || !data.eventId && DateFormat.compareDate(DateFormat.getDate(data.eventDate), DateFormat.getDate()) === 1) {
        return true;
      } else if ((!data.eventId && DateFormat.compareDate(DateFormat.getDate(data.eventDate), DateFormat.getDate()) === -1) || (!data.eventId && DateFormat.compareDate(DateFormat.getDate(data.eventDate), DateFormat.getDate()) === 0)) {
        return true;
      }
    } else {
      return false;
    }
  }

  cellEditableReason = (data: any, index: number, field: string): boolean => {
    return (data && data.cancelFlag) ? true : false;
  }
  callEditableCancelField = (data: any, index: number, field: string): boolean => {
    if (data && data.eventId) {
      return true
    } else {
      return false;
    }
  }
  onSave(event) {
    this.crtEveInsertList = [];
    this.crtEveUpdateList = [];
    this.crtEveCommitModel.insertList = [];
    this.crtEveCommitModel.updateList = [];
    // this.crtEveUpdateList = event.updated;
    // this.crtEveInsertList = event.added;

    // this.courseschedulestaffsInsertList = [];
		// this.courseschedulestaffsUpdatetList = [];
		// this.courseschedulestaffsDeleteList = [];
		// this.courseschedulestaffsCommitModel.insertList = [];
		// this.courseschedulestaffsCommitModel.updateList = [];
		// this.courseschedulestaffsCommitModel.deleteList = [];

    this.courteventsgrid.addedMap.forEach(
        (v: any, k: number) => {
            this.crtEveInsertList.push(v);
        }
    );
    this.courteventsgrid.updatedMap.forEach(
        (v: any, k: number) => {
            this.crtEveUpdateList.push(v);
        }
    );
    // this.courteventsgrid.removedMap.forEach(
    //     (v: any, k: number) => {
    //         this.courseschedulestaffsDeleteList.push(v);
    //     }
    // );
    if (!this.validateConflict()) {
      return;
    }
    if (!this.offdetValidate(this.crtEveUpdateList)) {
      return;
    }

    if (!this.offdetValidate(this.crtEveInsertList)) {
      return;
    }
    if (this.crtEveInsertList.length > 0) {
      for (let i = 0; i < this.crtEveInsertList.length; i++) {
        this.crtEveInsertList[i].eventStatus = 'SCH';
        this.crtEveInsertList[i].nextEventRequestFlag = 'N';
        this.crtEveInsertList[i].orderRequestedFlag = 'N';
        this.crtEveInsertList[i].directionCode = 'OUT';
        this.crtEveInsertList[i].holdFlag = 'N';
        this.crtEveInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.crtEveInsertList[i].courtEventType = this.sessionManager.currentCaseLoadType;
        this.crtEveInsertList[i].startTime = TimeFormat.parse(TimeFormat.format(this.crtEveInsertList[i].startTime),
          this.crtEveInsertList[i].eventDate);
          this.crtEveInsertList[i].caseLoad=this.caseloadId ;
      }
      this.crtEveCommitModel.insertList = this.crtEveInsertList;
    }
    if (this.crtEveUpdateList.length > 0) {
      for (let i = 0; i < this.crtEveUpdateList.length; i++) {
        this.crtEveUpdateList[i].startTime = TimeFormat.parse(TimeFormat.format(this.crtEveUpdateList[i].startTime),
          this.crtEveUpdateList[i].eventDate);
          this.crtEveUpdateList[i].caseLoad=this.caseloadId;
        if (this.crtEveUpdateList[i].eventStatus === 'CANC') {
          this.crtEveUpdateList[i].emailFlag = 'N';
          this.crtEveUpdateList[i].smsFlag = 'N';
          this.crtEveUpdateList[i].emailScheduleHoursBefore = null;
          this.crtEveUpdateList[i].smsScheduleHoursBefore = null;
        }
      }
      this.crtEveCommitModel.updateList = this.crtEveUpdateList;
    }
    
    const crtEveSaveData = this.OidcrtevFactory.nonAssocationOffendersData(this.crtEveCommitModel);
    crtEveSaveData.subscribe(data => {
      if (data === "EMPTYDATA") {
        this.courtEventSave();
      }
      else {
        const msgOne  = this.translateService.translate('oidcrtev.inPersonCourtData');
				const msgTwo = this.translateService.translate('oidcrtev.cctvORonline');
				const msgThree = this.translateService.translate('oidcrtev.doyouwanttocontinue');
				const msgFour = this.translateService.translate('oidcrtev.indinonassocconflict');
				const msgFive = this.translateService.translate('oidcrtev.gangnonassocconflict');
        data = data.replaceAll('oidcrtev.inPersonCourtData',msgOne);
        data = data.replaceAll('oidcrtev.cctvORonline',msgTwo);
		data = data.replaceAll('oidcrtev.doyouwanttocontinue',msgThree);
		data = data.replaceAll('oidcrtev.indinonassocconflict',msgFour);
		data = data.replaceAll('oidcrtev.gangnonassocconflict',msgFive);
        const labelMsg = {
          label: this.translateService.translate(data), yesBtn: true, proceedWithNoConflictsBtn: false, cancelBtn: true,
          proceedBtnDisabled: true
        };
        this.dialogService.openLinkDialog('/OCUNAWRN', labelMsg, 50).subscribe(result => {
          if (result) {
            this.courtEventSave();
          } else {
            return;
          }
        });
      }

    });
  }

  validateConflict() {
    if (!this.isProceed) {
      var obj={'scheduleModel':this.voffschModel,
            'conflictList': this.conflictList};
      this.dialogService.openLinkDialog('/oiuscinq', obj).subscribe(result => {
        if (!result) {
          this.isProceed = false;
          return false;
        } else {
          this.isProceed = true;
          return true;
        }
      });
    } else {
      return true;
    }
  }

  courtEventSave() {
    const crtEveSaveData = this.OidcrtevFactory.crtEveCommit(this.crtEveCommitModel);
    crtEveSaveData.subscribe(data => {
      if (data === 1) {
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
        this.crtEveExecuteQuery();
      } 
      else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
        this.crtEveExecuteQuery();
      }
    });
  }



  offdetValidate(courtEvents: any) {
    const is = { valid: true }
    for (let i = 0; i < courtEvents.length; i++) {

      if (!courtEvents[i].eventId && DateFormat.compareDate(DateFormat.getDate(courtEvents[i].eventDate), DateFormat.getDate()) === -1) {
        this.show(this.translateService.translate('oidcrtev.eventdatemustbefuture'), 'warn');
        is.valid = false;
        return is.valid;
      } else {
        for (let j = 0; j < this.courtEventsGridDataTemp.length; j++) {
          if ((this.courtEventsGridDataTemp[j].eventId == courtEvents[i].eventId) && DateFormat.compareDate(DateFormat.getDate(courtEvents[i].eventDate), DateFormat.getDate(this.courtEventsGridDataTemp[j].eventDate)) != 0) {
            if (DateFormat.compareDate(DateFormat.getDate(courtEvents[i].eventDate), DateFormat.getDate()) === -1) {
              this.show(this.translateService.translate('oidcrtev.eventdatemustbefuture'), 'warn');
              is.valid = false;
              return is.valid;
            }
          }
        }

      }
      if (!courtEvents[i].eventDate) {
        this.show(this.translateService.translate('oidcrtev.eventdatemusteentered'), 'warn');
        is.valid = false;
        return is.valid;
      }
      if (!courtEvents[i].startTime) {
        this.show(this.translateService.translate('oidcrtev.timemusteentered'), 'warn');
        is.valid = false;
        return is.valid;
      }
      if (!courtEvents[i].court) {
        this.show(this.translateService.translate('oidcrtev.courtmusteentered'), 'warn');
        is.valid = false;
        return is.valid;
      }
      if (!courtEvents[i].hearingReason) {
        this.show(this.translateService.translate('oidcrtev.hearingreasonmusteentered'), 'warn');
        is.valid = false;
        return is.valid;
      }
      if (!courtEvents[i].appearanceType) {
        this.show(this.translateService.translate('oidcrtev.apperencetypemustentered'), 'warn');
        is.valid = false;
        return is.valid;
      }
      if (courtEvents[i].appearanceType === 'OME' || courtEvents[i].appearanceType === 'VID' || courtEvents[i].appearanceType === 'INT') {
        if (!courtEvents[i].appearanceLocation) {
          this.show(this.translateService.translate('oidcrtev.apperenceLocationmustentered'), 'warn');
          is.valid = false;
          return is.valid;
        }
      }
      if (courtEvents[i].eventId && courtEvents[i].eventStatus === 'CANC' && !courtEvents[i].outcomeReasonCode) {
        this.show(this.translateService.translate('oidcrtev.reasonmustbeentered'), 'warn');
        is.valid = false;
        return is.valid;
      }
    }
    return is.valid;
  }



  onCourtEventsGridInsert = () => {
    this.readonly=false;
    const node = this.courteventsgrid.gridOptions.api.getSelectedNodes()[0];
    if (node && this.selectedRow){

      this.condiLegalText = null;
    }
    if (this.datesFlag) {
      return false;
    }

    if (!this.isProceed) {
      var obj = {
        'scheduleModel': this.voffschModel,
        'conflictList': this.conflictList
      };
      this.dialogService.openLinkDialog('/oiuscinq', obj).subscribe(result => {
        if (!result) {
          this.isProceed = false;
          return false;
        } else {
          this.isProceed = true;
          return {
            'offenderBookId': this.vHeaderBlockModel.offenderBookId, 'idbutton': '',
            'rembutton': ''
          }
        }
      });
    } else {
      return {
        'offenderBookId': this.vHeaderBlockModel.offenderBookId, 'parentField': this.vHeaderBlockModel.agyLocId, 'idbutton': '',
        'rembutton': ''
      }
    }

  }

  onMapsData(event, gridName?: string) { }

  onUpdatedMapsData(event, gridName?: string) { }

  onRowClicked(event) {
    if (event) {
      this.readonly = false;
      if (this.datesFlag) {
        return false;
      }

      const node = this.courteventsgrid.gridOptions.api.getSelectedNodes().length && this.courteventsgrid.gridOptions.api.getSelectedNodes()[0];
      if (node) {
        if (!this.isProceed && this.offschIndex != node.childIndex) {
          var obj={'scheduleModel':this.voffschModel,
            'conflictList': this.conflictList};
          this.dialogService.openLinkDialog('/oiuscinq', obj).subscribe(result => {
            if (!result) {
              this.isProceed = false;
              return false;
            } else {
              this.isProceed = true;
              return true;
            }
          });
        }
        if(node && node.data){
          if(node.data.matter){
            this.condiLegalText = node.data.matter;
          } else {
            this.condiLegalText = '';
          }
        }
      }
    }
    if (this.isProceed) {
      if (event) {
        this.selectedRow = event;
        this.offschIndex = event.rowIndex;
        return true;
      }
    }

  }

  onclearedData(event, gridName?: string) { }

  loadJsonData() {
    const form_identifiers = {};
    form_identifiers['offenderid'] = this.vHeaderBlockModel.offenderId + '';
    const retData = {
      formName: this.screenName,
      id: this.dataId ? this.dataId : 0,
      searchString: JSON.stringify(form_identifiers)
    }
    this.OidcrtevFactory.loadData().subscribe((data: any) => {
      if (data) {
        this.courtEventsGridData = data;
      }
    })
  }

  loadColDefData() {
    this.OidcrtevFactory.loadDataTypes().subscribe((data: any) => {
      if (data) {
        this.courtEventsColDefs = data;
      }
    })

  }

  prepareColDef(coldefJson) {
    let colDefs = [];
    coldefJson.forEach(type => {
      if (type.dataType === 'lov' && type.source === 'link') {
        colDefs.push({ datatype: type.dataType, field: type.field, fieldName: type.fieldName, cellEditable: this.courtEventsGridEdit, source: type.sourceType, suppressMenu: true, link: type.url, editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
      }
      else if (type.dataType === 'lov' && type.source === 'domain') {
        colDefs.push({ datatype: type.dataType, field: type.field, fieldName: type.fieldName, domain: type.url, suppressMenu: true, editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
      }
      else if (type.dataType === 'text') {
        colDefs.push({ datatype: type.dataType, field: type.field, fieldName: type.fieldName, editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
      } else if (type.dataType === 'date') {
        colDefs.push({ datatype: type.dataType, field: type.field, fieldName: type.fieldName, editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required, width: 150 })
      }
      else if (type.dataType === 'time') {
        colDefs.push({ datatype: type.dataType, field: type.field, fieldName: type.fieldName, editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
      }
    });
    return colDefs;
  }



  onGridRowDelete = (row) => {
    return true;
  }

  isOffenderSelected() {
    if (this.vHeaderBlockModel) return true;
    return false;
  }

  courtEventsGridEdit = (data: any, index: number, field: string) => {
    return true;
  }

  onValidateRow = (event) => {
    
    if(event.data.appearanceType==='OME' || event.data.appearanceType==='VID'){
      this.courteventsgrid.requiredOn('appearanceLocation');
    }else{
      this.courteventsgrid.requiredOff('appearanceLocation');
    }
    const rowdata = new ValidateRowReturn();
    const rowIndex = event.rowIndex;
   
    if (this.datesFlag && this.offschIndex !== event.rowIndex) {
      rowdata.data = {
        eventDate: event.data.eventDate, court: event.data.court,
        startTime: event.data.startTime,
        hearingReason: event.data.hearingReason, appearanceType: event.data.appearanceType,
        appearanceLocation: event.data.appearanceLocation, matter: event.data.matter,
        commentText: event.data.commentText, conflictFlag: event.data.conflictFlag, originalEventDate: event.data.originalEventDate
      };
      rowdata.validated = true;
      return rowdata;
    }
    if (event.field === 'cancelFlag') {
      if (event.data.eventStatus === 'COMP') {
        this.courteventsgrid.setColumnData('cancelFlag', rowIndex, false);
        this.show(this.translateService.translate('oidcrtev.cannotCancelEvent'), 'warn');
        rowdata.validated = true;
        return rowdata;
      }
      else if(event.data.linkData > 0){
        this.courteventsgrid.setColumnData('cancelFlag', rowIndex, false);
        this.show(this.translateService.translate('oidcrtev.thiscourteventhaslinkedappointmentoutcomes'), 'warn');
        rowdata.validated = true;
        return rowdata;
      }
      else if (event.data.cancelFlag) {
        this.courteventsgrid.requiredOn('outcomeReasonCode');
        this.courteventsgrid.setColumnData('outcomeReasonCode', rowIndex, this.defaultCanReason !== null ? this.defaultCanReason : undefined);
        this.courteventsgrid.setColumnData('eventStatus', rowIndex, 'CANC');
      }
      else {
        this.courteventsgrid.requiredOff('outcomeReasonCode');
        this.courteventsgrid.setColumnData('outcomeReasonCode', rowIndex, undefined);
        this.courteventsgrid.setColumnData('eventStatus', rowIndex, 'SCH');
      }
    }
    if (event.field === 'eventDate') {
      if (event.data.eventDate) {
        if (DateFormat.compareDate(DateFormat.getDate(event.data.eventDate), DateFormat.getDate()) < 0) {
          this.datesFlag = true;
          this.isProceed = true;
          this.offschIndex = event.rowIndex;
          rowdata.data = {
            eventDate: event.data.eventDate, court: event.data.court,
            startTime: event.data.startTime,
            hearingReason: event.data.hearingReason, appearanceType: event.data.appearanceType,
            appearanceLocation: event.data.appearanceLocation, matter: event.data.matter,
            commentText: event.data.commentText, conflictFlag: event.data.conflictFlag, originalEventDate: event.data.originalEventDate
          };
          rowdata.validated = true;
          return rowdata;
        }

        if (!event.data.eventId ||
          (DateFormat.compareDate(DateFormat.getDate(event.oldValue), DateFormat.getDate(event.newValue)) !== 0 && DateFormat.compareDate(DateFormat.getDate(event.data.originalEventDate), DateFormat.getDate(event.newValue)) !== 0)) {
          this.voffschModel = new VOffenderAllSchedules();
          this.offschIndex = event.rowIndex;
          this.voffschModel.eventDate = event.data.eventDate;
          this.voffschModel.offenderBookId = event.data.offenderBookId;
          var conflictList=this.checkConflict();
          const offschCheckConflit = this.OidcrtevFactory.checkScheduleConflict(this.voffschModel);
          offschCheckConflit.subscribe(checkConflict => {
            var obj={'scheduleModel':this.voffschModel,
            'conflictList': conflictList};
            if (checkConflict > 0) {
              this.voffschModel.conflictFlag=true;
              this.dialogService.openLinkDialog('/oiuscinq', obj).subscribe(result => {
                if (!result) {
                  this.isProceed = false;
                  return false;
                } else {
                  this.isProceed = true;
                }
              });
            } else {
              this.voffschModel.conflictFlag=false;
              if(conflictList.length >0){
                obj.scheduleModel=null;
                this.dialogService.openLinkDialog('/oiuscinq', obj).subscribe(result => {
                  if (!result) {
                    this.isProceed = false;
                    return false;
                  } else {
                    this.isProceed = true;
                  }
                });
              }else{
                this.isProceed = true;
              }
              
            }
          });
        } else if ((DateFormat.compareDate(DateFormat.getDate(event.data.originalEventDate), DateFormat.getDate(event.newValue)) === 0)) {
          this.isProceed = true;
        }
      }
    }


    if (event.newValue != event.oldValue) {
      if (event.field === 'appearanceType') {
        this.enableSelection = true;
        if (this.appearanceTypeData.length) {
          let filterData = this.appearanceTypeData.filter(obj => obj.code == event.newValue);
          if (filterData.length && filterData[0].parentCode == 'EXT') {
            this.enableSelection = false;
            rowdata.data = { appearanceLocation: '' };
          }
        } else {
          this.enableSelection = false;
          rowdata.data = { appearanceLocation: '' };
        }
        rowdata.validated = true;
        return rowdata;
      }
    }
    this.datesFlag = false;
    rowdata.validated = true;
    return rowdata;
  }
  onClear = () => {
    this.isProceed = true;
    this.datesFlag = false;
    this.condiLegalText = '';
     this.crtEveExecuteQuery();
    return true;
  }
  checkConflict(){
    var insertUpdateData=[];
    this.conflictList=[];
    this.courteventsgrid.addedMap.forEach(
      (v: any, k: number) => {
        insertUpdateData.push(v);
      }
  );
  this.courteventsgrid.updatedMap.forEach(
      (v: any, k: number) => {
        insertUpdateData.push(v);
      }
  );
  insertUpdateData.forEach(obj=>{
    if(obj.court && (DateFormat.compareDate(DateFormat.getDate(obj.eventDate), DateFormat.getDate(this.voffschModel.eventDate)) == 0)){
      obj.hearingReasonDesc=this.hearingGroup.get(obj.hearingReason);
      this.conflictList.push(obj);
    }
  })
  return this.conflictList;
  }
  getDefaultCancellationReason() {
    const canReason = this.OidcrtevFactory.getDefaultCancellationReason();
    canReason.subscribe(data => {
      this.defaultCanReason = data;
    });

  }

  onBackBtnClick = () => {
    this.location.back();
  }
  onConflictLaunchEdit = (event) => {
    event.screenId = 'OIDCRTEV';

    if (event.eventDate && event.startTime) {
      let startHours = DateFormat.getDate(event.startTime).getHours();
      let startMinutes = DateFormat.getDate(event.startTime).getMinutes();
      const eventDate1 = DateFormat.getDate(DateFormat.getDate(event.eventDate).setHours(startHours, startMinutes, 0, 0));
      const eventDate2 = DateFormat.getDate(DateFormat.getDate().setHours(DateFormat.getDate().getHours(), DateFormat.getDate().getMinutes(), 0, 0));
      if (DateFormat.compareDateTime(eventDate1, eventDate2) === -1) {
        this.show(this.translateService.translate('oidcrtev.pastevents'), 'warn');
        return;
      }
    }
    if (event.eventStatus === 'CANC') {
      this.show(this.translateService.translate('oidcrtev.cancelevents'), 'warn');
      return;
    }
    this.dialogService.openLinkDialog('/OCUREMIN', event, 25).subscribe(result => {
      if(result){
        this.crtEveExecuteQuery();
      }
    });
  }
  isInsertable(event) {
    const index = this.courtEventsGridData.indexOf(this.selectedRow);
    this.courteventsgrid.setColumnData('matter', index, event);

  }
  get isSingleSaveBtnDisable() {
    if ((this.courteventsgrid.addedMap.size > 0 || this.courteventsgrid.updatedMap.size > 0 || this.courteventsgrid.removedMap.size > 0))
      return false;
    else if (JSON.stringify(this.courtEventsGridDataTemp) !== JSON.stringify(this.courtEventsGridData))
      return false;
    else return true;
  }

  
}
