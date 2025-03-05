import {
  Component, OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmxprogService } from '../service/ocmxprog.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CourseActivities } from '@instprogramswithoutschedulesbeans/CourseActivities';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { CourseActivitiesCommitBean } from '@inst/institutional-activities/maintenance/beans/CourseActivitiesCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';

@Component({
  selector: 'app-ocmxprog',
  templateUrl: './ocmxprog.component.html'

})

export class OcmxprogComponent implements OnInit {
  @ViewChild('grid') grid: any;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  crsactData: CourseActivities[] = [];
  crsactDataTemp: CourseActivities[] = [];
  crsactModel: CourseActivities = new CourseActivities();
  ctlblkModel: CourseActivities = new CourseActivities();
  crsactIndex: Number = 0;
  crsactInsertList: CourseActivities[] = [];
  crsactUpdatetList: CourseActivities[] = [];
  crsactDeleteList: CourseActivities[] = [];
  minDate: Date;
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: Boolean;
  editable: Boolean = true;
  crsActColumnDef: any[];
  ctlBlkReadOnly: Boolean = false;
  crsActReadOnly: Boolean = false;
  butCtrlReadOnly: Boolean = false;
  rgpsprovtypeRg: any[] = [];
  rgproviderRg: any[] = [];
  rgprogramtypeRg: any[] = [];
  rgintlocRg: any[] = [];
  agencyLocation: any;
  providerIdMap: Map<string, string> = new Map<string, string>();
  programTypeMap: Map<string, string> = new Map<string, string>();
  serviceTitles = {
    description: this.translateService.translate('common.description'),
    programCode: this.translateService.translate('common.code')
  };
  crsactCommitModel: CourseActivitiesCommitBean = new CourseActivitiesCommitBean();
  tableIndex: number;
  caseLoadId: string;
  description: string;
  caseLoadType: string;
  provideDescLink: string;
  addressLink: string;
  retriveDisabled: boolean;
  clearDisabled: boolean;
  namesReadOnly: boolean;
  intLocationLink: string;
  message: string;
  type: string;
  disableContactsButton: boolean;
  disableTargetsButton: boolean;
  disableInternalLocation: boolean;
  retriveClick: boolean;
  tempCode: any;
  providerId: string;
  nbtProviderDesc: any;
  providerSource:string;

  constructor(private ocmxprogFactory: OcmxprogService, public translateService: TranslateService,
    public sessionManager: UserSessionManager, private dialogService: DialogService) {
    this.crsActColumnDef = [];
  }
  ngOnInit() {
    this.providerSource=null
    this.retriveDisabled = false;
    this.clearDisabled = true;
    this.namesReadOnly = false;
    this.disableContactsButton = true;
    this.disableTargetsButton = true;
    this.disableInternalLocation = true;
    this.retriveClick = false;
    this.ctlblkModel.providerType = this.ctlblkModel.providerType === '' ? undefined : '';
    this.crsActColumnDef = [
      {
        fieldName: this.translateService.translate('ocmxprog.programtype'), field: 'programIdVal', editable: true, source:'OCMSERVI',
        width: 150, datatype: 'lov', link: 'ocmxprog/rgProgramTypeRecordGroup', cellEditable: this.canAlertEdit, titles: this.serviceTitles
      },
      {
        fieldName: this.translateService.translate('ocmxprog.code'), field: 'code', editable: true, width: 150,
        datatype: 'text', uppercase: true, maxlength: 20
      },
      {
        fieldName: this.translateService.translate('ocmxprog.description'), field: 'description', editable: true, width: 150,
        datatype: 'text', uppercase: 'false', maxlength: 40
      },
      {
        fieldName: this.translateService.translate('ocdvteam.active'), field: 'activeFlag',
        cellEditable: this.canActiveEdit, width: 150, datatype: 'checkbox'
      },
      {
        fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
        editable: false, width: 150, datatype: 'date'
      },

      { fieldName: this.translateService.translate('ocmxprog.comment'), field: 'commentText', editable: true, width: 150,  datatype: 'text', uppercase: 'false', maxlength: 240 },
      { fieldName: this.translateService.translate('ocmxprog.internallocation'), field: 'internalLocationIdVal', editable: true, width: 150, datatype: 'lov',
        link: 'ocmxprog/rgIntLocRecordGroup?agyLocId=',parentField: 'programCodeTemp', source: 'OUMAGENC' },
      { fieldName: '', field: 'test', hide: true, datatype: 'text', uppercase: 'false', maxlength: 240 },
      { fieldName: '', field: 'internalTest', hide: true },
    ];
    this.caseLoadId = this.sessionManager.currentCaseLoad;
    this.description = this.sessionManager.currentCaseLoadName;
    this.caseLoadType = this.sessionManager.currentCaseLoadType;
    const rgAccServiceObj = this.ocmxprogFactory.rgProgramTypeRecordGroup();
    rgAccServiceObj.subscribe(rgteamstaffList => {
      if (rgteamstaffList.length === 0) {
      } else {
        for (let i = 0; i < rgteamstaffList.length; i++) {
          this.programTypeMap.set(rgteamstaffList[i].code, rgteamstaffList[i].programCode);
        }
      }
    });
  }
  providerLovChange() {
    if (this.ctlblkModel.providerType === 'INT') {
      if (this.caseLoadType === 'INST') {
        this.providerSource='OUMAGLOC';
        this.provideDescLink = 'ocmxprog/rgProviderRecordGroup?caseLoadId=' + this.caseLoadId
          + '&caseLoadType=' + this.caseLoadType + '&providerType=' + this.ctlblkModel.providerType;
        this.ctlblkModel.providerPartyClass = 'AGY';
        const rgAccServiceObj = this.ocmxprogFactory.rgProviderRecordGroup
          (this.caseLoadId, this.caseLoadType, this.ctlblkModel.providerType);
        rgAccServiceObj.subscribe(rgteamstaffList => {
          if (rgteamstaffList.length === 0) {
          } else {
            for (let i = 0; i < rgteamstaffList.length; i++) {
              this.providerIdMap.set(rgteamstaffList[i].code, rgteamstaffList[i].code);
              this.providerIdMap.set(rgteamstaffList[i].description, rgteamstaffList[i].description);
            }
          }
        });
      } else {
        this.providerSource='OCMTEAMMAIN';
        this.ctlblkModel.providerPartyClass = 'TEAM';
        this.provideDescLink = 'ocmxprog/rgProviderRecordGroupTeam?caseLoadId=' + this.caseLoadId
          + '&caseLoadType=' + this.caseLoadType + '&providerType=' + this.ctlblkModel.providerType;
        const rgAccServiceObj = this.ocmxprogFactory.rgProviderRecordGroup
          (this.caseLoadId, this.caseLoadType, this.ctlblkModel.providerType);
        rgAccServiceObj.subscribe(rgteamstaffList => {
          if (rgteamstaffList.length === 0) {
          } else {
            for (let i = 0; i < rgteamstaffList.length; i++) {
              this.providerIdMap.set(rgteamstaffList[i].partyId, rgteamstaffList[i].partyId);
            }
          }
        });
      }
    } else {
      this.providerSource='OUMAGENC';
      this.ctlblkModel.providerPartyClass = 'CORP';
      this.provideDescLink = 'ocmxprog/rgProviderRecordGroupTeam?caseLoadId=' + this.caseLoadId
        + '&caseLoadType=' + this.caseLoadType + '&providerType=' + this.ctlblkModel.providerType;
      const rgAccServiceObj = this.ocmxprogFactory.rgProviderRecordGroup
        (this.caseLoadId, this.caseLoadType, this.ctlblkModel.providerType);
      rgAccServiceObj.subscribe(rgteamstaffList => {
        if (rgteamstaffList.length === 0) {
        } else {
          for (let i = 0; i < rgteamstaffList.length; i++) {
            this.providerIdMap.set(rgteamstaffList[i].partyId, rgteamstaffList[i].partyId);
          }
        }
      });
    }

  }
  canActiveEdit = (data: any, index: number, field: string): boolean => {
    if (data.createDatetime) {
        return true;
    } else {
        return false;
    }
}
  canAlertEdit = (data: any, index: number, field: string): boolean => {
    if (!data.createDatetime) {
      return true;
    } else {
      return false;
    }
  }
  onCommentChange() {
    if (this.crsactModel.commentText) {
      const index = this.crsactData.indexOf(this.crsactModel);
      this.crsactData[index].commentText = this.crsactModel.commentText;
        this.grid.setColumnData('test', index, this.crsactModel.commentText);
    }
  }
  onButContactLogsOffendersclick = () => {
    if (this.crsactModel.activeFlag) {
      this.crsactModel.pQueryOnly = 'N';
    } else {
      this.crsactModel.pQueryOnly = 'Y';
    }
    this.dialogService.openLinkDialog('/OCMSSVCT', this.crsactModel, 80).subscribe(result => {
    });
  }
  onButTargetOffendersclick = () => {
    this.dialogService.openLinkDialog('/OCMCTOFF', this.crsactModel, 80).subscribe(result => {
    });
  }
  onInternalLocationChange() {
    if (this.crsactModel.internalLocationIdVal) {
      const index = this.crsactData.indexOf(this.crsactModel);
      this.crsactData[index].internalLocationIdVal = this.crsactModel.internalLocationIdVal;
      if (this.crsactModel.internalLocationIdValTemp !== this.crsactModel.internalLocationIdVal) {
        this.grid.setColumnData('test', index, this.crsactModel.internalLocationIdVal);
      }
    }
  }
  isInsertable(date?) {
    if (this.ctlblkModel.providerType || this.ctlblkModel.programCode || this.ctlblkModel.description
      || this.ctlblkModel.code || this.ctlblkModel.expiryDate || this.ctlblkModel.programIdVal
    ) {
      this.clearDisabled = false;
    } else {
      this.clearDisabled = true;
    }
  }
  providerNameChange(event) {
    if(event && event.description){
      this.nbtProviderDesc = event.description;
    }else{
      this.nbtProviderDesc = undefined;
    }
    this.intLocationLink = 'ocmxprog/rgIntLocRecordGroup?agyLocId=' + this.ctlblkModel.programCode;
    if (this.ctlblkModel.providerType === 'INT') {
      this.providerId = event.partyId;
    }
    this.tempCode = this.ctlblkModel.programCode;
    const rgAccServiceObj = this.ocmxprogFactory.rgIntLocRecordGroup(this.ctlblkModel.programCode);
    rgAccServiceObj.subscribe(rgteamstaffList => {
      if (rgteamstaffList.length === 0) {
        this.disableInternalLocation = true;
      } else {
        this.disableInternalLocation = false;
        for (let i = 0; i < rgteamstaffList.length; i++) {
          this.programTypeMap.set(rgteamstaffList[i].code, rgteamstaffList[i].programCode);
        }
      }
    });
  }
  validateRowData = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event.field === 'activeFlag' && event.data.createDatetime) {
      if (event.data.activeFlag) {
        this.grid.setColumnData('expiryDate', rowIndex, undefined);
        rowdata.validated = true;
        return rowdata;
      } else if (!event.data.activeFlag) {
        this.grid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
        rowdata.validated = true;
        return rowdata;
      }
    } else if (event.field === 'activeFlag' && !event.data.createDatetime){
      this.grid.setColumnData('activeFlag', rowIndex, true);
      rowdata.validated = true;
      return rowdata;
    }
    rowdata.validated = true;
    return rowdata;
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
  onRowClickcrsact(event) {
    if (event) {
      this.crsactModel = event;
      this.crsactModel.programId = Number(this.crsactModel.programIdVal);
      this.crsactModel.pQueryOnly = 'Y';
      if (this.ctlblkModel.providerType === 'INT') {
        if (this.caseLoadType === 'INST') {
          this.crsactModel.providerPartyCode = this.ctlblkModel.programCode;
        } else {
          this.crsactModel.providerPartyId = Number(this.ctlblkModel.programCode);
        }

      } else {
        this.crsactModel.providerPartyId = Number(this.ctlblkModel.programCode);
      }
      if (this.crsactModel.createDatetime) {
        this.disableContactsButton = false;
        this.disableTargetsButton = false;
      } else {
        this.disableContactsButton = true;
        this.disableTargetsButton = true;
      }
    }
  }
  onGridClear = (event) => {
    this.crsactExecuteQuery(true);
    //this.crsactData = this.crsactDataTemp;
    return true;
  }
  ocmxprogUpdateValidations = () => {
    const is = { valid: true };
    if (this.crsactData && this.crsactData) {
      this.crsactData.forEach(element => {
        if (element.programIdVal === undefined || !element.programIdVal) {
          this.show(this.translateService.translate('ocmxprog.programtypemandatory'), 'warn');
          is.valid = false;
          return is.valid;
        }
        if (element.code === undefined || !element.code.trim()) {
          this.show(this.translateService.translate('ocmxprog.codemandatory'), 'warn');
          is.valid = false;
          return is.valid;
        }
        if (element.description === undefined || !element.description.trim()) {
          this.show(this.translateService.translate('ocmxprog.descriptionmandatory'), 'warn');
          is.valid = false;
          return is.valid;
        }
      });
    }
    return is.valid;
  }
  onGridInsert = () => {
    if (!this.ocmxprogUpdateValidations()) {
      return;
    }
    return { activeFlag: true };
  }
  clear() {
    this.retriveDisabled = false;
    this.clearDisabled = true;
    this.namesReadOnly = false;
    this.ctlblkModel = new CourseActivities();
    this.crsactModel = new CourseActivities();
    this.crsactData = [];
    this.disableContactsButton = true;
    this.disableTargetsButton = true;
    this.disableInternalLocation = true;
    this.retriveClick = false;
  }
  retriveBeforevlidations() {
    const is = { valid: true };
    if (!this.ctlblkModel.providerType || this.ctlblkModel.providerType === undefined) {
      this.type = 'warn';
      this.message = this.translateService.translate('ocmxprog.providertypemandatory');
      this.show(this.message);
      is.valid = false;
      return is.valid;
    }
    if (!this.ctlblkModel.programCode || this.ctlblkModel.programCode === undefined) {
      this.type = 'warn';
      this.message = this.translateService.translate('ocmxprog.providermandatory');
      this.show(this.message);
      is.valid = false;
      return is.valid;
    }
    return is.valid;
  }
  crsactExecuteQuery(data?) {
    if (!this.retriveBeforevlidations()) {
      return;
    }
    this.ctlblkModel.courseActivityType = 'PWS';
    if (this.ctlblkModel.providerType === 'INT') {
      if (this.caseLoadType === 'INST') {
        this.ctlblkModel.providerPartyCode = this.ctlblkModel.programCode;
      } else {
        this.ctlblkModel.providerPartyId = Number(this.providerId);
      }
    } else {
      this.ctlblkModel.providerPartyId = Number(this.ctlblkModel.programCode);
    }
    this.ctlblkModel.programId = Number(this.ctlblkModel.programIdVal);
    const crsactResult = this.ocmxprogFactory.
      crsActExecuteQuery(this.ctlblkModel);
    crsactResult.subscribe(crsactResultList => {
      if (crsactResultList.length === 0) {
        this.crsactData = [];
        this.retriveDisabled = false;
        this.namesReadOnly = false;
        if (!data) {
          this.show('common.querycaused');
        }
        this.retriveClick = true;
      } else {
        crsactResultList.forEach(element => {
          element.activeFlag = element.activeFlag === 'Y' ? true : false;
        });
        this.crsactData = crsactResultList;
        this.crsactDataTemp = JSON.parse(JSON.stringify(crsactResultList));
        this.crsactModel = crsactResultList[0];
        this.crsactData.forEach(e =>{
          e.programCodeTemp = this.tempCode;
        });
        this.tableIndex = 0;
        this.retriveDisabled = true;
        this.clearDisabled = false;
        this.namesReadOnly = true;
        this.retriveClick = true;
      }
    });
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  ocmxprogSavecrsactForm(event) {
    if (!this.ocmxprogUpdateValidations()) {
      return;
    }
    // TODO declare commit bean and add insert list to that object.
    this.crsactInsertList = event.added;
    this.crsactUpdatetList = event.updated;
    this.crsactDeleteList = event.removed;
    this.crsactCommitModel.insertList = [];
    this.crsactCommitModel.updateList = [];
    this.crsactCommitModel.deleteList = [];
    if (this.crsactInsertList.length > 0 || this.crsactUpdatetList.length > 0) {
      for (let i = 0; i < this.crsactInsertList.length; i++) {
        this.crsactInsertList[i].activeFlag = this.crsactInsertList[i].activeFlag ? 'Y' : 'N';
        this.crsactInsertList[i].caseloadId = this.caseLoadId;
        this.crsactInsertList[i].caseloadType = this.caseLoadType;
        this.crsactInsertList[i].courseActivityType = 'PWS';
        this.crsactInsertList[i].courseClass = 'COURSE';
        this.crsactInsertList[i].programId = Number(this.crsactInsertList[i].programIdVal);
        this.crsactInsertList[i].providerType = this.ctlblkModel.providerType;
        if (this.crsactInsertList[i].internalLocationIdVal) {
          this.crsactInsertList[i].internalLocationId = Number(this.crsactInsertList[i].internalLocationIdVal);
        }
        if (this.ctlblkModel.providerType === 'INT') {
          if (this.caseLoadType === 'INST') {
            this.crsactInsertList[i].providerPartyCode = this.ctlblkModel.programCode;
            this.crsactInsertList[i].providerPartyClass = 'AGY';

          } else {
            this.crsactInsertList[i].providerPartyId = Number(this.providerId);
            this.crsactInsertList[i].providerPartyClass = 'TEAM';
          }

        } else {
          this.crsactInsertList[i].providerPartyCode = this.ctlblkModel.programCode;
          this.crsactInsertList[i].providerPartyClass = 'CORP';
          this.crsactInsertList[i].nbtDescription = this.nbtProviderDesc;
        }
        this.crsactCommitModel.insertList = this.crsactInsertList;
      }
      for (let i = 0; i < this.crsactUpdatetList.length; i++) {
        const dupData = this.crsactData.filter(opt => this.crsactUpdatetList[i].code === opt.code);
        if (dupData && dupData.length > 1) {
          this.message = this.translateService.translate('ocmxprog.providertypeexist');
          this.show(this.message, 'warn');
          return;
        }
        this.crsactUpdatetList[i].activeFlag = this.crsactUpdatetList[i].activeFlag ? 'Y' : 'N';
        this.crsactUpdatetList[i].programId = Number(this.crsactUpdatetList[i].programIdVal);
        if (this.crsactUpdatetList[i].internalLocationIdVal) {
          this.crsactUpdatetList[i].internalLocationId = Number(this.crsactUpdatetList[i].internalLocationIdVal);
        }
        this.crsactCommitModel.updateList = this.crsactUpdatetList;
      }

    }
    if (this.crsactDeleteList.length > 0) {
      for (let i = 0; i < this.crsactDeleteList.length; i++) {
        this.crsactCommitModel.deleteList = this.crsactDeleteList;
      }
    }
    const crsactSaveData = this.ocmxprogFactory.crsActCommit(this.crsactCommitModel);
    crsactSaveData.subscribe(data => {
      if (String(data[0].errorMessage).indexOf('COURSE_ACTIVITIES_PK') > 0) {
        this.show(this.translateService.translate('ocmxprog.primarykeyviolation'), 'warn');
        return;
      }
      if (data[0] && data[0].sealFlag && data[0].sealFlag === 'E') {
        this.message = this.translateService.translate('ocmxprog.providertypeexist');
        this.show(this.message, 'warn');
        this.crsactExecuteQuery();
        return;
      }
      if (data[0] && data[0].returnValue === 1) {
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
        this.crsactExecuteQuery();
        return;
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
        this.crsactExecuteQuery();
        return;
      }
    });
  }
  onProviderTypeBlur() {
    if (!this.ctlblkModel.providerType) {
      this.ctlblkModel.providerType = this.ctlblkModel.providerType === '' ? undefined : '';
    }
  }
  onProviderBlur() {
    if (!this.ctlblkModel.programCode) {
      this.ctlblkModel.programCode = this.ctlblkModel.programCode === '' ? undefined : '';
    }
  }
  onProgramTypeBlur() {
    if (!this.ctlblkModel.programIdVal) {
      this.ctlblkModel.programIdVal = this.ctlblkModel.programIdVal === '' ? undefined : '';
    }
  }
  onInternalLocIdBlur() {
    if (!this.crsactModel.internalLocationIdVal) {
      this.crsactModel.internalLocationIdVal = this.crsactModel.internalLocationIdVal === '' ? undefined : '';
    }
  }
  get gridInsBtn() {
    if ((this.ctlblkModel.providerType ||  this.ctlblkModel.providerType !== undefined)
    && (this.ctlblkModel.programCode || this.ctlblkModel.programCode !== undefined) && this.retriveClick) {
      return true;
    }
    return false;
  }
}

