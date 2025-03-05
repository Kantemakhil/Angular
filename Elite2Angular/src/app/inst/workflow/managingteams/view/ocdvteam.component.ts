import {
  Component, OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdvteamService } from '@inst/workflow/managingteams/service/ocdvteam.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderTeamAssignments } from '@inst/workflow/managingteams/beans/OffenderTeamAssignments';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OffenderTeamAssignmentsCommitBean } from '@inst/workflow/managingteams/beans/OffenderTeamAssignmentsCommitBean';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { Router } from '@angular/router';
// import required bean declarations

@Component({
  selector: 'app-ocdvteam',
  templateUrl: './ocdvteam.component.html'
})

export class OcdvteamComponent implements OnInit {
  @ViewChild('grid') grid: any;
  // Variable declaration
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  offteamassignData: OffenderTeamAssignments[] = [];
  offteamassignDataTemp: OffenderTeamAssignments[] = [];
  offteamassignModel: OffenderTeamAssignments = new OffenderTeamAssignments();
  offteamassignIndex: Number = 0;
  offteamassignInsertList: OffenderTeamAssignments[] = [];
  offteamassignUpdatetList: OffenderTeamAssignments[] = [];
  offteamassignDeleteList: OffenderTeamAssignments[] = [];
  vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
  childRecordObject: VHeaderBlock = new VHeaderBlock();
  minDate: Date;
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable: Boolean = true;
  offTeamAssignColumnDef: any[];
  offTeamAssignReadOnly: Boolean = false;
  buttonBlkReadOnly: Boolean = false;
  rgfunctionRg: any[] = [];
  offteamassignCommitModel: OffenderTeamAssignmentsCommitBean = new OffenderTeamAssignmentsCommitBean();
  validAssignDate: boolean;
  tableIndex: number;
  message: string;
  insertGrid: boolean;
  isLoading: boolean;
  isshowing: Boolean = false;
  disableHistoryButton: boolean;
  disableCaseNoteButton: boolean;
  constructor(private ocdvteamFactory: OcdvteamService, public translateService: TranslateService, private router: Router,
    public sessionManager: UserSessionManager, private offenderSearchService: OffenderSearchService, public dialogService: DialogService) {
    this.offTeamAssignColumnDef = [];
  }
  
  ngOnInit() {
    this.ocdvteamFactory.exitFlag = false;
    this.isshowing = false;
    this.insertGrid = false;
    this.disableHistoryButton = true;
    this.disableCaseNoteButton = true;
    if (this.sessionManager.currentCaseLoadType === 'COMM') {
      this.isshowing = false;
    } else {
      this.isshowing = true;
    }
    this.vHeaderBlockModel = new VHeaderBlock();
    this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
    if (!this.offenderSearchService.selectedOffender || this.offenderSearchService.selectedOffender.offenderBookId === undefined) {
      this.show('common.pleasesearchforvalidoffender');
    }
    this.offTeamAssignColumnDef = [
      {
        fieldName: this.translateService.translate('ocdvteam.functiontype'), field: 'functionType', editable: true,
         width: 150, datatype: 'lov', domain:'FUNCTION',
         link: 'ocdvteam/rgFunctionRecordGroup', 
         cellEditable: this.canAlertEdit
      },
      {
        fieldName: this.translateService.translate('ocdvteam.teamresponsible'), field: 'teamCode', editable: false,
        width: 150, datatype: 'text', maxlength: 20, uppercase: 'true'
      },
      {
        fieldName: '', field: 'button', datatype: 'launchbutton',  editable: true,
        width: 100, data: 'row', updateField: 'row', modal: true, onLaunchClick: this.caGoBtnClick,
        isDisable : this.disableCell
      },
      {
        fieldName: this.translateService.translate('ocdvteam.teamdescription'), field: 'teamIdDesc', editable: false,
        width: 150
      },
      {
        fieldName: this.translateService.translate('ocdvteam.assigndate'), field: 'assignmentDate', editable: true,
        width: 150, datatype: 'date', cellEditable: this.canAlertEdit
      },
      { fieldName: this.translateService.translate('ocdvteam.active'), field: 'nbtActiveFlag',
       editable: true, width: 150, datatype: 'checkbox' },
      { fieldName: '', field: 'teamId', editable: false, width: 10, hide: true }
    ];
  }
  disableCell = (data: any, index: number): boolean => {
    if (data.createDatetime) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * This Function is used for cell editable purpose
   */
  canAlertEdit = (data: any, index: number, field: string): boolean => {
    if (!data.createDatetime) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * This Function is used for on offender search functionality
   */
  onOffenderChange(offender) {
    this.vHeaderBlockModel = offender;
    this.childRecordObject = offender;
    if (offender) {
      this.offteamassignModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
      this.offteamassignExecuteQuery();
    } else {
      this.offteamassignData = [];
      this.insertGrid = false;
      this.disableHistoryButton = true;
      this.disableCaseNoteButton = true;
    }
  }
  /**
   * This Function is used for cell editable purpose
   */
  ocdvteamUpdateValidations() {
    const is = { valid: true };
    if (this.offteamassignData && this.offteamassignData) {
      this.offteamassignData.forEach(element => {
        if (element.functionType === undefined) {
          this.show(this.translateService.translate('ocdvteam.functionmandatory'), 'warn');
          is.valid = false;
          return is.valid;
        }
        if (element.teamCode === undefined) {
          this.show(this.translateService.translate('ocdvteam.teamresponsemandatorys'), 'warn');
          is.valid = false;
          return is.valid;
        }
      });
    }
    return is.valid;
  }
  /**
   * This Function is used for ongrid insert to validate mandetory
   */
  onGridInsert = () => {
    if (!this.ocdvteamUpdateValidations()) {
      return;
    }
    return {
      button: '..', teamCode: '', teamIdDesc: '', teamId: '', nbtActiveFlag: true,
      assignmentDate: DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)),
    };

  }
  /**
   * This Function is used for launch button click in grid
   */
  caGoBtnClick = (data) => {
    if (!this.validateTeamButton(data)) {
      return;
    }
    this.isLoading = true;
    this.dialogService.openLinkDialog('/OCUTASAT', this.offteamassignModel, 80).subscribe(res => {
      if (res) {
        this.isLoading = false;
        this.grid.setColumnData('teamId', this.offteamassignData.indexOf(data), res.teamId);
        this.grid.setColumnData('teamIdDesc', this.offteamassignData.indexOf(data), res.teamIdDesc);
        this.grid.setColumnData('teamCode', this.offteamassignData.indexOf(data), res.teamCode);

      }
    });
  }
  validateTeamButton(data) {
    if (!data.createDatetime) {
      if (!data.functionType || !data.functionType.trim()) {
        this.show(this.translateService.translate('ocdvteam.functiontypeselectvalidation'), 'warn');
        return false;
      }
    } else {
      return false;
    }
    return true;


  }

  /**
   * This Function is used for Contact logs screen button validation
   */
  onContactLogsClick = () => {
    this.ocdvteamFactory.exitFlag = false;
    if (this.offteamassignModel.createDatetime === undefined || !this.offteamassignModel.nbtActiveFlag) {
      this.show(this.translateService.translate('ocdvteam.contactlogbuttonvalid'), 'warn');
      return false;
    } else {
      if (this.offteamassignModel.createDatetime) {
      //   this.dialogService.openLinkDialog('/OIDCNOTEDIA', this.vHeaderBlockModel, 80).subscribe(result => {
      //     if (result) {
      //     }
      // });
      this.ocdvteamFactory.exitFlag = true;
      return this.router.navigate(['/OIDCNOTE']);
      }
    }
  }
  /**
   * This Function is used for History screen button validation
   */
  onHistoryClick = () => {
    if (this.offteamassignModel.createDatetime === undefined || !this.offteamassignModel.nbtActiveFlag) {
      this.show(this.translateService.translate('ocdvteam.historybuttonvalid'), 'warn');
      return false;
    } else {
      if (this.offteamassignModel.createDatetime) {
        this.dialogService.openLinkDialog('/OCUHVTEA', this.offteamassignModel, 80).subscribe(result => {
          if (result) {
          }
      });
      return true;
      }
    }
  }

  validateRow = (event) => {
    const rowdata = new ValidateRowReturn();
    return rowdata;
  }
  /**
   * This Function is used for validate the grid row data
   */
  validateRowData = (event) => {
    const rowIndex = this.offteamassignData.indexOf(event.data);
    const rowdata = new ValidateRowReturn();
    if (event.field === 'assignmentDate') {
      if (event.data.assignmentDate) {
        if (DateFormat.compareDate(event.data.assignmentDate, DateFormat.getDate()) > 0) {
          this.show(this.translateService.translate('ocdvteam.assignmentdatevalid'), 'warn');
          return;
        }
      }
    }
    if (event.field === 'teamCode' && !event.data.teamId ) {
      const offteamassignResult = this.ocdvteamFactory.getTeamDetails(event.data);
      offteamassignResult.subscribe(data => {
        if (data && data.teamId) {
         this.grid.setColumnData('teamId', rowIndex, data.teamId);
         this.grid.setColumnData('teamIdDesc', rowIndex, data.teamIdDesc);
        } else {
          this.show(this.translateService.translate('ocdvteam.invalidteamresponsible'), 'warn');
          this.grid.setColumnData('teamId', rowIndex, undefined);
          this.grid.setColumnData('teamIdDesc', rowIndex, undefined);
          this.grid.setColumnData('teamCode', rowIndex, undefined);
        }
      });
    }
    if (event.field === 'nbtActiveFlag' && !event.data.createDatetime){
      this.grid.setColumnData('nbtActiveFlag', rowIndex, true);
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
  /**
   * This Function is used for Row click in the grid
   */
  onRowClickoffteamassign(event) {
    if (event) {
      this.offteamassignModel = event;
      this.offteamassignModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
      if (this.offteamassignModel.createDatetime) {
        this.disableHistoryButton = false;
        this.disableCaseNoteButton = false;
      } else {
        this.disableHistoryButton = true;
        this.disableCaseNoteButton = true;
      }
    }
  }
  /**
   * This Function is used for retrive the grid data
   */

  offteamassignExecuteQuery() {
    const offteamassignResult = this.ocdvteamFactory.offTeamAssignExecuteQuery(this.offteamassignModel);
    offteamassignResult.subscribe(offteamassignResultList => {
      this.insertGrid = true;
      if (offteamassignResultList.length === 0) {
        this.offteamassignData = [];
      } else {
        this.tableIndex = 0;
        this.offteamassignData = offteamassignResultList;
        this.offteamassignModel = offteamassignResultList[0];
        offteamassignResultList.forEach(element => {
          element['button'] = '..';
          element.nbtActiveFlag = element.nbtActiveFlag === 'Y' ? true : true;
        });
      }
    });
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  ocdvteamSaveoffteamassignForm(event) {
    // TODO declare commit bean and add insert list to that object.
    this.offteamassignInsertList = event.added;
    this.offteamassignUpdatetList = event.updated;
    this.offteamassignDeleteList = event.removed;
    this.offteamassignCommitModel.insertList = [];
    this.offteamassignCommitModel.updateList = [];
    this.offteamassignCommitModel.deleteList = [];
    if (this.offteamassignInsertList.length > 0 || this.offteamassignUpdatetList.length > 0) {
      for (let i = 0; i < this.offteamassignInsertList.length; i++) {
        if (this.offteamassignInsertList[i].functionType === undefined) {
          this.show(this.translateService.translate('ocdvteam.functionmandatory'), 'warn');
          return;
        }
        if (!this.offteamassignInsertList[i].teamCode) {
          this.show(this.translateService.translate('ocdvteam.teamresponsiblemandatory'), 'warn');
          return;
        }
        if (this.offteamassignInsertList[i].assignmentDate === undefined || this.offteamassignInsertList[i].assignmentDate === null) {
          this.show(this.translateService.translate('ocdvteam.assignmentdatemadatory'), 'warn');
          return;
        }
        this.offteamassignInsertList[i].offenderBookId = this.offteamassignModel.offenderBookId;
        if (DateFormat.compareDate(this.offteamassignInsertList[i].assignmentDate, DateFormat.getDate()) > 0) {
          this.show(this.translateService.translate('ocdvteam.assignmentdatevalid'), 'warn');
          return;
        }
        this.offteamassignCommitModel.insertList = this.offteamassignInsertList;
      }
      for (let i = 0; i < this.offteamassignUpdatetList.length; i++) {
        this.offteamassignUpdatetList[i].nbtActiveFlag = this.offteamassignUpdatetList[i].nbtActiveFlag ? 'Y' : 'N';
        this.offteamassignUpdatetList[i].offenderBookId = this.offteamassignModel.offenderBookId;
        this.offteamassignUpdatetList[i].expiryDate = DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0));
        this.offteamassignCommitModel.updateList = this.offteamassignUpdatetList;
      }
    }
    if (this.offteamassignDeleteList.length > 0) {
      for (let i = 0; i < this.offteamassignDeleteList.length; i++) {
      }
      this.offteamassignCommitModel.deleteList = this.offteamassignDeleteList;
    }
    const offteamassignSaveData = this.ocdvteamFactory.offTeamAssignCommit(this.offteamassignCommitModel);
    offteamassignSaveData.subscribe(data => {
      if (String(data[0].errorMessage).indexOf('OFFENDER_TEAM_ASSIGNMENTS_PK') > 0) {
        this.show(this.translateService.translate('ocdvteam.primarykeyviolation'), 'warn');
        this.offteamassignExecuteQuery();
        return;
      }
      if (data[0] && data[0].sealFlag && data[0].serverCode === 2292) {
        this.message = this.translateService.translate('common.recordcannotbedeletedmodified');
        this.message = String(this.message).replace('%tablename%', data[0].sealFlag);
        this.show(this.message, 'warn');
        this.offteamassignExecuteQuery();
        return;
      }
      if (data[0] && data[0].returnValue === 1) {
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
        this.offteamassignExecuteQuery();
        return;
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
        this.offteamassignExecuteQuery();
        return;
      }
    });

  }
}
