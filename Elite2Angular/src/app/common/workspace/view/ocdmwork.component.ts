import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdmworkService } from '../service/ocdmwork.service';
import { TagWorkflowBrowseQueue } from '@cm/teams-workflow/beans/TagWorkflowBrowseQueue';
import { TagWorkflowBrowseQueueCommitBean } from '@cm/teams-workflow/beans/TagWorkflowBrowseQueueCommitBean';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { Router } from '@angular/router';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ocdmwork',
  templateUrl: './ocdmwork.component.html'
})

export class OcdmworkComponent implements OnInit {
  @ViewChild('grid', {static: true}) grid: any;
  config: any[] = [];
  actionName: string;
  msgs: any[] = [];
  workData: TagWorkflowBrowseQueue[] = [];
  workDataTemp: TagWorkflowBrowseQueue[] = [];
  workModel: TagWorkflowBrowseQueue = new TagWorkflowBrowseQueue();
  workModelTemp: TagWorkflowBrowseQueue = new TagWorkflowBrowseQueue();
  workIndex = 0;
  workInsertList: TagWorkflowBrowseQueue[] = [];
  workUpdateList: TagWorkflowBrowseQueue[] = [];
  workDeleteList: TagWorkflowBrowseQueue[] = [];
  memoData: TagWorkflowBrowseQueue[] = [];
  memoDataTemp: TagWorkflowBrowseQueue[] = [];
  memoModel: TagWorkflowBrowseQueue = new TagWorkflowBrowseQueue();
  memoModelTemp: TagWorkflowBrowseQueue = new TagWorkflowBrowseQueue();
  memoIndex = 0;
  memoInsertList: TagWorkflowBrowseQueue[] = [];
  memoUpdateList: TagWorkflowBrowseQueue[] = [];
  memoDeleteList: TagWorkflowBrowseQueue[] = [];
  minDate: any;
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable = true;
  workColumnDef: any[];
  memoColumnDef: any[];
  rgreasonRg: any[] = [];
  rgtypeRg: any[] = [];
  rgworktypeRg: any[] = [];
  rgsubtypeRg: any[] = [];
  rgcompletedRg: any[] = [];
  rgseverityRg: any[] = [];
  workCommitModel: TagWorkflowBrowseQueueCommitBean = new TagWorkflowBrowseQueueCommitBean();
  type = 'error';
  msglist = [];
  message = ' Invalid.';
  memoCommitModel: TagWorkflowBrowseQueueCommitBean = new TagWorkflowBrowseQueueCommitBean();
  modulename: string;
  vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
  currentUrl: string;
  selectedTaskIndex: number;
  selectedMemoIndex: number;
  taskExitBtn: boolean;
  retrieveBtn: boolean;
  retrieveBtnOne: boolean;
  clearBtnOne: boolean;
  workReadOnly: boolean;
  memoReadOnly: boolean;
  gridupdate: boolean;
  namesReadOnly: boolean;
  namesReadOnlyOne: boolean;
  enableUpdate: boolean;
  enableUpdateOne: boolean;
  queryFlag: boolean;
  constructor(private ocdmworkFactory: OcdmworkService,
    public translateService: TranslateService,
    public dialogService: DialogService,
    private sessionManager: UserSessionManager,
    private osiosearFactory: OsiosearService,
    private router: Router,
    private location: Location) {
    this.workColumnDef = [];
    this.memoColumnDef = [];
  }
  ngOnInit() {
    this.gridupdate = true;
    this.taskExitBtn = true;
    this.retrieveBtn = false;
    this.namesReadOnlyOne = false;
    this.retrieveBtnOne = false;
    this.namesReadOnly = false;
    this.clearBtnOne = true;
    this.workReadOnly = true;
    this.memoReadOnly = true;
    this.selectedTaskIndex = 0;
    this.selectedMemoIndex = 0;
    this.enableUpdate = true;
    this.enableUpdateOne = true;
    this.config = this.router.config;
    this.modulename = undefined;
    this.workExecuteQuery();
    this.memoExecuteQuery();
    this.workColumnDef = [
      {
        fieldName: this.translateService.translate('common.assigned'), field: 'assignmentDate', editable: false, width: 150,
        datatype: 'date'
      },
      { fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false, width: 150 },
      { fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName', editable: false, width: 150 },
      { fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName', editable: false, width: 150 },
      {
        fieldName: this.translateService.translate('common.tasktype'), field: 'workType', editable: false, width: 150, datatype: 'lov',
        domain: 'TASK_TYPE'
      },
      {
        fieldName: this.translateService.translate('common.subtype'), field: 'workSubType', editable: false, width: 150, datatype: 'lov',
        domain: 'TASK_SUBTYPE'
      },
      { fieldName: this.translateService.translate('common.duedate'), field: 'dueDate', editable: false, width: 150, datatype: 'date' },
      {
        fieldName: this.translateService.translate('common.complete'), field: 'completeFlag', editable: true, width: 150,
        datatype: 'checkbox', cellEditable: this.completeFlagChange
      },
      {
        fieldName: '', field: 'dButton', editable: false, width: 150, datatype: 'launchbutton',
      },
      {
        fieldName: '', field: 'goButton', editable: true, width: 150, datatype: 'launchbutton', data: 'row', updateField: 'row',
        modal: true, dialogWidth: '70%', onLaunchClick: this.goBtnLaunchClick,
      }
    ];
    this.memoColumnDef = [
      {
        fieldName: this.translateService.translate('common.assigned'), field: 'assignmentDate', editable: false, width: 150,
        datatype: 'date'
      },
      { fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false, width: 150 },
      { fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName', editable: false, width: 150 },
      { fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName', editable: false, width: 150 },
      {
        fieldName: this.translateService.translate('common.memotype'), field: 'workType', editable: false, width: 150, datatype: 'lov',
        domain: 'TASK_TYPE'
      },
      {
        fieldName: this.translateService.translate('common.subtype'), field: 'workSubType', editable: false, width: 150, datatype: 'lov',
        domain: 'TASK_SUBTYPE'
      },
      { fieldName: this.translateService.translate('common.duedate'), field: 'dueDate', editable: false, width: 150, datatype: 'date' },
      {
        fieldName: this.translateService.translate('ocdmwork.Severity'), field: 'severityCode', editable: false, width: 150,
        datatype: 'lov', domain: 'MEMO_SEVTY'
      },
      {
        fieldName: this.translateService.translate('common.complete'), field: 'completeFlag', editable: true, width: 150,
        datatype: 'checkbox', cellEditable: this.completeFlagChangeOne
      },
      {
        fieldName: '', field: 'goButton', editable: true, width: 150, datatype: 'launchbutton', data: 'row', updateField: 'row',
        modal: true, dialogWidth: '70%', onLaunchClick: this.goBtnLaunchClick
      }

    ];
  }
  /**
    *  This function will be executed when we change the grid row data columns in Incoming Work block
    */
  completeFlagChange = (data: any, index: number, field: string): boolean => {
    if (!data.teamId) {
      if (!data.teamId) {
        this.type = 'warn';
        this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
        this.show();
        return false;
      }
      if (field === 'completeFlag' && data.manualCloseFlag === 'N' && data.workflowType === 'TASK') {
        this.type = 'warn';
        this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
        this.show();
        return false;
      }
      if (field === 'completeFlag' && data.manualCloseFlag === 'N') {
        this.type = 'warn';
        this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
        this.show();
        return false;
      }
    }
    return true;
  }
  /**
    *  This function will be executed when we change the grid row data columns in Incoming Memos block
    */
  completeFlagChangeOne = (data: any, index: number, field: string): boolean => {
    if (!data.teamId) {
      if (!data.teamId) {
        this.type = 'warn';
        this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
        this.show();
        return false;
      }
      if (field === 'completeFlag' && data.manualCloseFlag === 'N' && data.workflowType === 'TASK') {
        this.type = 'warn';
        this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
        this.show();
        return false;
      }
      if (field === 'completeFlag' && data.manualCloseFlag === 'N') {
        this.type = 'warn';
        this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
        this.show();
        return false;
      }
    }
    return true;
  }
  /**
   *  This function will be executed when we Click on the Go button in the Grid
   */
  goBtnLaunchClick = (event) => {
    if (event.moduleName) {
      if (this.grid.updatedMap.size > 0) {
        const data = {
          label: this.translateService.translate('common.doyouwanttosavechanges'), yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
          const list = this.config.filter(element => {
            return String(element['path']).toLocaleUpperCase() === String(event.moduleName).toLocaleUpperCase();
          });
          if (list.length > 1) {
            throw new Error('Invalid URL');
          } else if (list.length === 1) {
            this.ocdmworkFactory.exitFlag = true;
            const modNameOne = list[0].path;
            this.dialogService.openLinkDialog('/' + modNameOne, event, 80).subscribe(dataObj => { });
          } else {
            this.ocdmworkFactory.exitFlag = true;
            this.router.navigate(['/' + event.moduleName]);
          }
        });
      } else if (this.grid.updatedMap.size === 0) {
        const lists = this.config.filter(element => {
          return String(element['path']).toLocaleUpperCase() === String(event.moduleName).toLocaleUpperCase();
        });
        if (lists.length > 1) {
          throw new Error('Invalid URL');
        } else if (lists.length === 1) {
          this.ocdmworkFactory.exitFlag = true;
          const modName = lists[0].path;
          this.dialogService.openLinkDialog('/' + modName, event, 80).subscribe(data => { });
        } else {
          this.ocdmworkFactory.exitFlag = true;
          this.router.navigate(['/' + event.moduleName]);
        }
        return false;
      }
    } else {
      this.type = 'warn';
      this.message = this.translateService.translate('ocdmwork.noscreenassociated');
      this.show();
      return false;
    }
  }
  /**
   *  This function will be executed when we Click on Exit button
   */
  onButExitclick() {
    if (this.grid.updatedMap.size > 0) {
      const data = {
        label: this.translateService.translate('common.doyouwanttosavechanges'), yesBtn: true, noBtn: true
      };
      this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
        this.location.back();
      });
    } else {
      this.location.back();
    }
  }
  /**
   *  This function will be executed when we Click on the Incoming Memos grid row
   */
  onRowClickmemo(event) {
    if (event) {
      this.memoModelTemp = event;
      if (event.teamId) {
        this.memoReadOnly = false;
      } else {
        this.memoReadOnly = true;
      }
      if (event.moduleName) {
        this.vHeaderBlockModel = new VHeaderBlock();
        this.vHeaderBlockModel.offenderIdDisplay = event.offenderIdDisplay;
        this.vHeaderBlockModel.agyLocId = this.sessionManager.currentCaseLoad;
        const offbkgsResult = this.osiosearFactory.offbkgGlobalQuery(this.vHeaderBlockModel);
        offbkgsResult.subscribe(offbkgsResultList => {
          if (offbkgsResultList.length > 0) {
            this.ocdmworkFactory.vHeaderBlockServiceObj = offbkgsResultList[0];
          }
        });
      }
    } else {
      this.memoModel = new TagWorkflowBrowseQueue();
      this.memoModelTemp = new TagWorkflowBrowseQueue();
      this.memoReadOnly = true;
    }
  }
  /**
   *  This function will be executed when we change the Incoming Tasks grid row data
   */
  valueChangeEvent = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event.field === 'completeFlag' && event.data.completeFlag === true) {
      if (event.data.manualCloseFlag && event.data.manualCloseFlag === 'Y') {
        this.grid.setColumnData('completeFlag', rowIndex, false);
        this.type = 'warn';
        this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
        this.show();
      } else {
        this.dialogService.openLinkDialog('/ocdaworkdailog', this.workModelTemp, 50).subscribe(result => {
          if (result) {
            this.workExecuteQuery();
          } else {
            this.grid.setColumnData('completeFlag', rowIndex, false);
            this.workExecuteQuery();
          }
        });
      }
    }
    rowdata.validated = true;
    return rowdata;
  }
  /**
   *  This function will be executed when we change the Incoming Memos grid row data
   */
  memovalueChangeEvent = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event.field === 'completeFlag' && event.data.completeFlag === true) {
      if (event.data.manualCloseFlag === 'N') {
        this.grid.setColumnData('completeFlag', rowIndex, false);
        this.type = 'warn';
        this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
        this.show();
      }
    }
    rowdata.validated = true;
    return rowdata;
  }
  /**
  *  This function will be executed to display messages
  */
  show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
  }
  taskTypeBlur() {
    if (!this.workModel.workType) {
      this.workModel.workType = this.workModel.workType === '' ? undefined : '';
    }
  }
  subTypeBlur() {
    if (!this.workModel.workSubType) {
      this.workModel.workSubType = this.workModel.workSubType === '' ? undefined : '';
    }
  }
  memoTypeBlur() {
    if (!this.memoModel.severityCode) {
      this.memoModel.severityCode = this.memoModel.severityCode === '' ? undefined : '';
    }
  }
  severityBlur() {
    if (!this.memoModel.workType) {
      this.memoModel.workType = this.memoModel.workType === '' ? undefined : '';
    }
  }
  workSubTypeBlur() {
    if (!this.memoModel.workSubType) {
      this.memoModel.workSubType = this.memoModel.workSubType === '' ? undefined : '';
    }
  }

  /**
  *  This function will be executed To retrieve the Incoming Tasks block data
  */
  workExecuteQuery(date?, dateOne?) {
    if (date) {
      if (date.lastValue === '0_/__/____') {
        this.type = 'warn';
        this.message = this.translateService.translate('common.leapyearnotallowed');
        this.show();
        this.workModel.assignmentDate = undefined;
        return;
      }
      if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
        this.type = 'warn';
        this.message = this.translateService.translate('common.datemustbeentervalidformat');
        this.show();
        this.workModel.assignmentDate = undefined;
        return;
      }
    }
    if (dateOne) {
      if (dateOne.lastValue === '0_/__/____') {
        this.type = 'warn';
        this.message = this.translateService.translate('common.leapyearnotallowed');
        this.show();
        this.memoModel.dueDate = undefined;
        return;
      }
      if (String(dateOne.lastValue).indexOf('_') >= 0 && dateOne.value === null) {
        this.type = 'warn';
        this.message = this.translateService.translate('common.datemustbeentervalidformat');
        this.show();
        this.memoModel.dueDate = undefined;
        return;
      }
    }
    if (this.workModel.severityCode === '') {
      this.workModel.severityCode = undefined;
    }
    if (this.workModel.workType === '') {
      this.workModel.workType = undefined;
    }
    if (this.workModel.workSubType === '') {
      this.workModel.workSubType = undefined;
    }
    if (this.workModel.offenderIdDisplay) {
      this.workModel.offenderIdDisplay = this.workModel.offenderIdDisplay.trim();
      if (this.workModel.offenderIdDisplay === '') {
        this.workModel.offenderIdDisplay = undefined;
      } else {
        while (String(this.workModel.offenderIdDisplay).length < 10) {
          this.workModel.offenderIdDisplay = '0' + this.workModel.offenderIdDisplay;
        }
      }
    }
    const workResult = this.ocdmworkFactory.
      workExecuteQuery(this.workModel);
    workResult.subscribe(workResultList => {
      if (workResultList.length === 0) {
        this.workData = [];
        this.retrieveBtn = false;
        this.namesReadOnlyOne = false;
        this.enableUpdateOne = true;
        this.type = 'warn';
        this.message = this.translateService.translate('common.querycaused');
        this.show();
      } else {
        this.taskExitBtn = false;
        this.retrieveBtn = true;
        this.enableUpdateOne = false;
        this.namesReadOnlyOne = true;
        this.selectedTaskIndex = 0;
        this.workData = workResultList;
        for (let i = 0; i < this.workData.length; i++) {
          this.workData[i].dButton = 'D';
          this.workData[i].goButton = 'GO';
        }
      }
    });
  }
  /**
   *  This function will be executed when Incoming Tasks commit event is
   *    fired
  */
  ocdmworkSaveworkForm(event) {
    this.workInsertList = event.added;
    this.workUpdateList = event.updated;
    this.workDeleteList = event.removed;
    this.workCommitModel.insertList = [];
    this.workCommitModel.updateList = [];
    this.workCommitModel.deleteList = [];
    for (let i = 0; i < event.updated.length; i++) {
      if (event.updated[i].completeFlag) {
        this.workUpdateList.push(event.updated[i]);
      }
    }
    if (this.workUpdateList.length > 0) {
      this.workCommitModel.updateList = this.workUpdateList;
      const workSaveData = this.ocdmworkFactory.workCommit(this.workCommitModel);
      workSaveData.subscribe(data => {
        if (data === 1) {
          this.type = 'success';
          this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
          this.show();
          this.workExecuteQuery();
        } else {
          this.type = 'warn';
          this.message = this.translateService.translate('common.addupdateremoverecordfailed');
          this.show();
          this.workExecuteQuery();
        }
      });
    }
  }
  /**
   *  This function will be executed To retrieve the Incoming memos block data
   */
  memoExecuteQuery(dateTwo?, dateThree?) {
    if (dateTwo) {
      if (dateTwo.lastValue === '0_/__/____') {
        this.type = 'warn';
        this.message = this.translateService.translate('common.leapyearnotallowed');
        this.show();
        this.memoModel.assignmentDate = undefined;
        return;
      }
      if (String(dateTwo.lastValue).indexOf('_') >= 0 && dateTwo.value === null) {
        this.type = 'warn';
        this.message = this.translateService.translate('common.datemustbeentervalidformat');
        this.show();
        this.memoModel.assignmentDate = undefined;
        return;
      }
    }
    if (dateThree) {
      if (dateThree.lastValue === '0_/__/____') {
        this.type = 'warn';
        this.message = this.translateService.translate('common.leapyearnotallowed');
        this.show();
        this.memoModel.dueDate = undefined;
        return;
      }
      if (String(dateThree.lastValue).indexOf('_') >= 0 && dateThree.value === null) {
        this.type = 'warn';
        this.message = this.translateService.translate('common.datemustbeentervalidformat');
        this.show();
        this.memoModel.dueDate = undefined;
        return;
      }
    }
    this.memoModel.severityCode = this.memoModel.severityCode === '' ? undefined : this.memoModel.severityCode;
    this.memoModel.workType = this.memoModel.workType === '' ? undefined : this.memoModel.workType;
    this.memoModel.workSubType = this.memoModel.workSubType === '' ? undefined : this.memoModel.workSubType;
    this.memoModel.offenderIdDisplay = this.memoModel.offenderIdDisplay === '' ? undefined : this.memoModel.offenderIdDisplay;
    if (this.memoModel.offenderIdDisplay) {
      this.memoModel.offenderIdDisplay = this.memoModel.offenderIdDisplay.trim();
      this.memoModel.offenderIdDisplay = this.memoModel.offenderIdDisplay === '' ? undefined : this.memoModel.offenderIdDisplay;
      while (String(this.memoModel.offenderIdDisplay).length < 10) {
        this.memoModel.offenderIdDisplay = '0' + this.memoModel.offenderIdDisplay;
      }
    }
    const memoResult = this.ocdmworkFactory.
      memoExecuteQuery(this.memoModel);
    memoResult.subscribe(memoResultList => {
      if (memoResultList.length === 0) {
        this.memoData = [];
        this.retrieveBtnOne = false;
        this.namesReadOnly = false;
        this.enableUpdate = true;
        this.queryFlag = true;
        this.type = 'warn';
        this.message = this.translateService.translate('common.querycaused');
        this.show();
      } else {
        this.retrieveBtnOne = true;
        this.enableUpdate = false;
        this.namesReadOnly = true;
        this.clearBtnOne = false;
        this.selectedMemoIndex = 0;
        this.memoData = memoResultList;
        for (let i = 0; i < this.memoData.length; i++) {
          this.memoData[i].goButton = 'GO';
        }
      }
    });
  }
  /**
   *  This function will be executed when Incoming memos commit event is
   *   fired
   */
  ocdmworkSavememoForm(event) {
    this.memoInsertList = [];
    this.memoUpdateList = [];
    this.memoDeleteList = [];
    this.memoInsertList = event.added;
    this.memoDeleteList = event.removed;
    this.memoCommitModel.insertList = [];
    this.memoCommitModel.updateList = [];
    this.memoCommitModel.deleteList = [];
    for (let i = 0; i < event.updated.length; i++) {
      if (event.updated[i].completeFlag) {
        this.memoUpdateList.push(event.updated[i]);
      }
    }
    if (this.memoUpdateList.length > 0) {
      const updateCount = this.memoUpdateList.length;
      this.memoCommitModel.updateList = this.memoUpdateList;
      const memoSaveData = this.ocdmworkFactory.memoCommit(this.memoCommitModel);
      memoSaveData.subscribe(data => {
        if (data === 1) {
          this.type = 'success';
          this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
          this.show();
          this.memoExecuteQuery();
        } else {
          this.type = 'warn';
          this.message = this.translateService.translate('common.addupdateremoverecordfailed');
          this.show();
          this.memoExecuteQuery();
        }
      });
    }
  }
  /**
    *  This function will be executed when we select record on Incoming Task block
    */
  onRowClickTask(event) {
    if (event) {
      this.workModelTemp = event;
      if (this.workModel.queueName) {
        this.workReadOnly = false;
      } else {
        this.workReadOnly = true;
      }
    } else {
      this.workModel = new TagWorkflowBrowseQueue();
      this.workModelTemp = new TagWorkflowBrowseQueue();
      this.workReadOnly = true;
    }
  }
  /**
    *  This function will be executed when we Click on Clear button in  Incoming Memo block
    */
  onExitButEvent() {
    this.memoData = [];
    this.memoModel = new TagWorkflowBrowseQueue();
    const workTypeValue = this.memoModel.workType === undefined ? '' : undefined;
    this.memoModel.workType = workTypeValue;
    const workSubTypeValue = this.memoModel.workSubType === undefined ? '' : undefined;
    this.memoModel.workSubType = workSubTypeValue;
    const severityCode = this.memoModel.severityCode === undefined ? '' : undefined;
    this.memoModel.severityCode = severityCode;
    this.retrieveBtnOne = false;
    this.clearBtnOne = true;
    this.memoReadOnly = true;
    this.namesReadOnly = false;
    this.memoModelTemp = new TagWorkflowBrowseQueue();
    this.enableUpdate = true;
    this.queryFlag = true;
  }
  /**
    *  This function will be executed when we Click on Clear button in  Incoming Task block
    */
  onTaskExitButEvent() {
    this.workData = [];
    this.workModel = new TagWorkflowBrowseQueue();
    const workTypeValue = this.workModel.workType === undefined ? '' : undefined;
    this.workModel.workType = workTypeValue;
    const workSubTypeValue = this.workModel.workSubType === undefined ? '' : undefined;
    this.workModel.workSubType = workSubTypeValue;
    this.taskExitBtn = true;
    this.retrieveBtn = false;
    this.namesReadOnlyOne = false;
    this.workReadOnly = true;
    this.workModelTemp = new TagWorkflowBrowseQueue();
    this.enableUpdateOne = true;
  }
  taskChangeEvent() {
    if (this.workModel.assignmentDate || this.workModel.dueDate || this.workModel.workType
      || this.workModel.workSubType || this.workModel.offenderIdDisplay || this.namesReadOnlyOne) {
      this.taskExitBtn = false;
    } else {
      this.taskExitBtn = true;
    }
  }
  taskChangeEventMemo() {
    if (this.memoModel.assignmentDate || this.memoModel.offenderIdDisplay || this.memoModel.workType
      || this.memoModel.workSubType || this.memoModel.workSubType || this.memoModel.dueDate
      || this.memoModel.severityCode || this.namesReadOnly) {
      this.clearBtnOne = false;
    } else {
      this.clearBtnOne = true;
    }
  }

  setDialogClosed() {
    this.memoExecuteQuery();
  }
}
