import { VPimsNameSearch } from '@cm/searchassaign/beans/VPimsNameSearch';
import { OcinamesService } from './../../../../cm/searchassaign/service/ocinames.service';
import { DialogService } from './../../../../core/ui-components/dialog/dialog.service';
import { ReferenceCodes } from './../../../../common/beans/ReferenceCodes';
import { StaffMembers } from './../../../incidents-oic/beans/StaffMembers';
import { Teams } from './../../../casemanagement/beans/Teams';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import {
   Component, OnInit, Input
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcittaskService } from '../service/ocittask.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { TagWorkflowAdmQueryTeamTasks } from '../beans/TagWorkflowAdmQueryTeamTasks';
import { TagWorkflowAdmQueryTeamTasksCommitBean } from '../beans/TagWorkflowAdmQueryTeamTasksCommitBean';
import { TaskAssignmentHty } from '@cm/teams-workflow/beans/TaskAssignmentHty';
// import required bean declarations

@Component({
   selector: 'app-ocittask',
   templateUrl: './ocittask.component.html'
})

export class OcittaskComponent implements OnInit {
   // Variable declaration
   @Input() selectedRow: any;
   actionName: string;
   lovModel: any[];
   msgs: any[] = [];
   nameOfLovPage: string;
   listToCompare: any[] = [];
   tasksData: TagWorkflowAdmQueryTeamTasks[] = [];
   tasksDataTemp: TagWorkflowAdmQueryTeamTasks[] = [];
   tasksModel: TagWorkflowAdmQueryTeamTasks = new TagWorkflowAdmQueryTeamTasks();
   tasksModelForDialogue: TagWorkflowAdmQueryTeamTasks = new TagWorkflowAdmQueryTeamTasks();
   tasksIndex = 0;
   tasksInsertList = new Array<TagWorkflowAdmQueryTeamTasks>();
   tasksUpdatetList = new Array<TagWorkflowAdmQueryTeamTasks>();
   tasksDeleteList = new Array<TagWorkflowAdmQueryTeamTasks>();
   minDate: Date;
   display: boolean;
   errorMessage: string;
   headerMessage: string;
   disabled: boolean;
   editable = true;
   tasksColumnDef: any[];
   ctrlReadOnly = false;
   tasksReadOnly = false;
   workDetailRedOnly: boolean;
   rgstaffRg: any[] = [];
   rgcompletestatusRg: any[] = [];
   rgtasksubtypeRg: any[] = [];
   rgtasktypeRg: any[] = [];
   rgteamRg: any[] = [];
   tasksinsertList: any[] = [];
   tasksupdateList: any[] = [];
   tasksdeleteList: any[] = [];
   tasksCommitModel: TagWorkflowAdmQueryTeamTasksCommitBean = new TagWorkflowAdmQueryTeamTasksCommitBean();
   staffMembersLov: string;
   subTaskTypeLov: string;
   teams: Teams = new Teams();
   staffMembers: StaffMembers = new StaffMembers();
   compStatus: ReferenceCodes = new ReferenceCodes();
   taskType: ReferenceCodes = new ReferenceCodes();
   subTaskType: ReferenceCodes = new ReferenceCodes();
   teamId: any;
   staffId: any;
   workDetails: any;
   rgCompleteStatus: string;
   nbtOffenderName: any;
   vnsearchModelData: VPimsNameSearch = new VPimsNameSearch();
   offenderIdDisplay: string;
   offenderBookId: number;
   textboxRedOnly = true;
   disabledTaskHistory: boolean;
   message: string;
   setDob: string;
   dateEvent: string;
   tableIndex = -1;
   taskAssignmentHty: TaskAssignmentHty = new TaskAssignmentHty();
   teamsLovTitles = {
      code: this.translateService.translate('ocittask.teamCode'),
      description: this.translateService.translate('ocittask.description')
   };
   officernameLovTitles = {
      description: this.translateService.translate('common.officername')
   };
   pDueToDate: any;
   pDueFromDate: any;
   fromDateFlag: boolean;
   pDueToDateFlag: boolean;
   subTaskTypeRedOnly: boolean;
   officernameRedOnly: boolean;
   clearDisabled: boolean;
   onloadFlag = true;
   constructor(
      private ocittaskFactory: OcittaskService,
      public translateService: TranslateService,
      public sessionManager: UserSessionManager,
      public dialogService: DialogService,
      private ocinamesFactory: OcinamesService) {
      this.tasksColumnDef = [];
   }
   ngOnInit() {
      this.subTaskTypeRedOnly = true;
      this.officernameRedOnly = true;
      this.disabledTaskHistory = true;
      this.onloadFlag = true;
      this.compStatus.code = 'ALL';
      this.tasksColumnDef = [
         { fieldName: this.translateService.translate('ocittask.assigned'), field: 'assignmentDate', editable: false, width: 200 },
         {
            fieldName: this.translateService.translate('ocittask.taskType'), field: 'workType',
            editable: false, width: 200, datatype: 'lov', link: 'ocittask/rgTaskTypeRecordGroup'
         },
         { fieldName: this.translateService.translate('ocittask.subType'), field: 'workTypeDesc', editable: false, width: 200 },
         { fieldName: this.translateService.translate('common.officername'), field: 'officerName', editable: false, width: 200 },
         { fieldName: this.translateService.translate('ocittask.aos'), field: 'offenderIdDisplay', editable: false, width: 200 },
         { fieldName: this.translateService.translate('common.name'), field: 'offenderName', editable: false, width: 200 },
         { fieldName: this.translateService.translate('common.duedate'), field: 'dueDate', editable: false, width: 200 },
         { fieldName: this.translateService.translate('ocittask.completiondate'), field: 'completionDate', editable: false, width: 200 },
         {
            fieldName: this.translateService.translate('ocittask.completionreaso'), field: 'completeReasonDesc',
            editable: false, width: 200
         },
      ];
      this.clearDisabled = true;
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
   onRowClicktasks(event) {
      // this.disabledTaskHistory = false;
      if (event) {
         this.taskAssignmentHty = event;
         this.taskAssignmentHty.officerName = event.offenderLastName;
         this.taskAssignmentHty.triggerName = event.offenderFirstName;
         this.taskAssignmentHty.staffId = event.offenderIdDisplay;
         this.taskAssignmentHty.workType = event.workTypeDescription;
         this.taskAssignmentHty.workSubType = event.workTypeDesc;
         this.taskAssignmentHty.dueDate = event.dueDate;
         this.taskAssignmentHty.details = event.details;
         this.taskAssignmentHty.completionDate = event.completionDate;
         this.taskAssignmentHty.completeReasonCode = event.completeReasonDesc;
         this.taskAssignmentHty.offenderBookId = event.offenderBookId;
         this.taskAssignmentHty.workflowHistoryId = event.workflowHistoryId;
         this.workDetails = event.details;
      }
   }

   openGo() {
      this.dialogService.openLinkDialog('/oiinamesdialog', event, 80).subscribe(result => {
         if (result && result.offenderFirstName && result.offenderLastName) {
            this.nbtOffenderName = result.offenderLastName + ', ' + result.offenderFirstName;
         }
         this.offenderIdDisplay = result.offenderIdDisplay;
         this.offenderBookId = result.offenderBookId;
         this.clearDisabled = false;
      });
   }
   taskHistorybtn = () => {
      this.dialogService.openLinkDialog('/OCUWKHTY', this.taskAssignmentHty, 80).subscribe(result => {
      });
   }
   onButTaskHistoryclick = () => {
      this.dialogService.openLinkDialog('/OCUWKHTY', this.taskAssignmentHty, 80).subscribe(result => {
      });
   }
   changeScreenCode(event) {
      this.disabledTaskHistory = true;
      this.tasksData = [];
      this.workDetails = '';
      if (event) {
         this.clearDisabled = false;
         this.getTeamId(event.code);
         this.staffMembersLov = 'ocittask/rgStaffRecordGroup?teamCode=' + event.code;
      }
      this.officernameRedOnly = false;
   }
   getTeamId(code) {
      const bookIdResult = this.ocittaskFactory.getTeamId(code);
      bookIdResult.subscribe(data => {
         if (data && data.teamId) {
            this.teamId = data.teamId;
         }
      });
   }
   changeOfficerName(event) {
      this.disabledTaskHistory = true;
      this.tasksData = [];
      this.workDetails = '';
      if (event) {
         this.clearDisabled = false;
      }
      const is = { valid: true };
      if (event && !this.teams.teamCode) {
         this.show(this.translateService.translate('ocittask.teamValidMsg'), 'warn');
         is.valid = false;
         return is.valid;
      }
      return is.valid;
   }
   changeDueDate(event) {
      if (event) {
         this.clearDisabled = false;
      }
      this.disabledTaskHistory = true;
      this.tasksData = [];
      this.workDetails = '';
   }
   changeToDate(event) {
      this.disabledTaskHistory = true;
      this.tasksData = [];
      this.workDetails = '';
      if (event) {
         this.clearDisabled = false;
      }
   }
   changeCompStatus(event) {
      if (!this.onloadFlag) {
         if (event) {
            this.clearDisabled = false;
         }
         this.disabledTaskHistory = true;
      }
      this.onloadFlag = false;
      this.tasksData = [];
      this.workDetails = '';
   }
   changesubTaskType(event) {
      this.disabledTaskHistory = true;
      if (event) {
         this.clearDisabled = false;
      }
      this.tasksData = [];
      this.workDetails = '';
      const is = { valid: true };
      if (event && !this.taskType.code) {
         this.show(this.translateService.translate('ocittask.taskValidMsg'), 'warn');
         is.valid = false;
         return is.valid;
      }
      return is.valid;
   }
   changeTask(event) {
      this.disabledTaskHistory = true;
      this.tasksData = [];
      this.workDetails = '';
      if (event) {
         this.clearDisabled = false;
         this.staffId = event.staffId;
         this.subTaskTypeLov = 'ocittask/rgTaskSubTypeRecordGroup?taskType=' + event.code;
         this.subTaskLoveVal(event.code);
      }
   }
   subTaskLoveVal(code) {
      const bookIdResult = this.ocittaskFactory.rgTaskSubTypeRecordGroup(code);
      bookIdResult.subscribe(tasksResultList => {
         if (tasksResultList.length === 0) {
            this.subTaskTypeRedOnly = true;
         } else {
            this.subTaskTypeRedOnly = false;
         }
      });
   }
   changeAos(offenderIdDisplay) {
      this.disabledTaskHistory = true;
      this.clearDisabled = false;
      this.tasksData = [];
      this.workDetails = '';
      this.nbtOffenderName = '';
      this.offenderBookId = new VPimsNameSearch().offenderBookId;
   }
   searchLaunchButtonClick(date?, dateOne?) {
      if (date) {
         if (date.lastValue === '0_/__/____') {
            this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
            return;
         }
         if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
            this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
            return;
         }
      }
      if (dateOne) {
         if (dateOne.lastValue === '0_/__/____') {
            this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
            return;
         }
         if (String(dateOne.lastValue).indexOf('_') >= 0 && dateOne.value === null) {
            this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
            return;
         }
      }
      if (this.tasksModel.pDueFromDate && this.tasksModel.pDueToDate) {
         if (DateFormat.compareDate(DateFormat.getDate(this.tasksModel.pDueFromDate),
            DateFormat.getDate(this.tasksModel.pDueToDate)) === 1) {
            this.show(this.translateService.translate('oiisched.fromdatelatermsg'), 'warn');
            return;
         }
      }
      if (!this.ocmssvasValidations()) {
         return;
      }
      this.disabledTaskHistory = true;
      this.tasksData = [];
      this.workDetails = '';
      this.tasksModel.caseloadId = this.sessionManager.currentCaseLoad;
      this.tasksModel.pCaseloadId = this.sessionManager && this.sessionManager.currentCaseLoadType ?
         this.sessionManager.currentCaseLoadType : '';
      this.tasksModel.pTeamId = Number(this.teamId);
      this.tasksModel.pStaffId = Number(this.staffMembers.code);
      this.tasksModel.pCompletionStatus = this.compStatus.code;
      this.tasksModel.pWorkType = this.taskType.code;
      this.tasksModel.pWorkSubType = this.subTaskType.code;
      this.tasksModel.offenderIdDisplay = this.offenderIdDisplay;
      this.tasksModel.pOffenderBookId = this.offenderBookId;
      this.clearDisabled = false;
      this.tasksExecuteQuery();
   }
   getOffenderBookId() {
      const bookIdResult = this.ocittaskFactory.getOffenderBookId(this.offenderIdDisplay, this.sessionManager.currentCaseLoad);
      bookIdResult.subscribe(data => {
         if (data && data.offenderBookId) {
            this.nbtOffenderName = data.firstName + ', ' + data.lastName;
            this.offenderIdDisplay = data.offenderIdDisplay;
            this.offenderBookId = data.offenderBookId;
            this.tasksModel.pOffenderBookId = data.offenderBookId;
            // this.tasksExecuteQuery();
         } else {
            this.show(this.translateService.translate('ocittask.offendersMsg'), 'warn');
            this.tasksData = [];
            return;
         }

      });
   }
   tasksExecuteQuery() {
      this.disabledTaskHistory = true;
      const tasksResult = this.ocittaskFactory.tasksExecuteQuery(this.tasksModel);
      tasksResult.subscribe(tasksResultList => {
         if (tasksResultList.length === 0) {
            this.disabledTaskHistory = true;
            this.tasksData = [];
            this.workDetails = '';
            this.show(this.translateService.translate('common.querycaused'), 'warn');
            return;
         } else {
            this.tasksData = tasksResultList;
            this.tasksModel = tasksResultList[0];
            this.tasksModelForDialogue = tasksResultList[0];
            this.tableIndex = 0;
            this.disabledTaskHistory = false;
            this.clearDisabled = false;
         }
         if (this.offenderIdDisplay) {
            this.getOffenderBookId();
         }
      });

   }

   /**
       *  This function will be executed to validate the mandetory fields in Regions grid
      * fired
      */
   ocmssvasValidations() {
      const is = { valid: true };
      if ((!this.teams.teamCode) || (this.staffMembers.code && !this.teams.teamCode)) {
         this.show(this.translateService.translate('ocittask.teamValidMsg'), 'warn');
         is.valid = false;
         return is.valid;
      }
      if (!this.compStatus.code) {
         this.show(this.translateService.translate('ocittask.compstatusmsg'), 'warn');
         is.valid = false;
         return is.valid;
      }
      if (this.subTaskType.code && !this.taskType.code) {
         this.show(this.translateService.translate('ocittask.taskValidMsg'), 'warn');
         is.valid = false;
         return is.valid;
      }
      return is.valid;
   }
   /**
    *  This function will be executed when commit event is
   * fired
   */
   ocittaskSavetasksForm(event) {
      // TODO declare commit bean and add insert list to that object.
      this.tasksinsertList = event.added;
      this.tasksupdateList = event.updated;
      this.tasksdeleteList = event.removed;
      this.tasksCommitModel.insertList = [];
      this.tasksCommitModel.updateList = [];
      this.tasksCommitModel.deleteList = [];
      if (this.tasksInsertList.length > 0 || this.tasksupdateList.length > 0) {
         for (let i = 0; i < this.tasksInsertList.length; i++) {
         }
         for (let i = 0; i < this.tasksupdateList.length; i++) {
         }
         this.tasksCommitModel.insertList = this.tasksInsertList;
         this.tasksCommitModel.updateList = this.tasksupdateList;
      }
      if (this.tasksDeleteList.length > 0) {
         for (let i = 0; i < this.tasksDeleteList.length; i++) {
         }
         this.tasksCommitModel.deleteList = this.tasksDeleteList;
      }
      const tasksSaveData = this.ocittaskFactory.tasksCommit(this.tasksCommitModel);
      tasksSaveData.subscribe(data => {
         if (data === 1) {
            this.show(this.translateService.translate('ocittask.sucessMessage'), 'info');
         } else {
            this.show(this.translateService.translate('ocittask.failedMessage'), 'warn');
         }
      });
   }
   clear() {
      this.clearDisabled = true;
      this.tasksModel = new TagWorkflowAdmQueryTeamTasks();
      this.teams = new Teams();
      this.teamId = '';
      this.staffMembers = new StaffMembers();
      this.compStatus = new ReferenceCodes();
      this.taskType = new ReferenceCodes();
      this.subTaskType = new ReferenceCodes();
      this.offenderIdDisplay = '';
      this.offenderBookId = new TagWorkflowAdmQueryTeamTasks().pOffenderBookId;
      this.tasksData = [];
      this.disabledTaskHistory = true;
      this.nbtOffenderName = '';
      this.workDetails = '';
      this.compStatus.code = 'ALL';
      this.subTaskTypeRedOnly = true;
      this.officernameRedOnly = true;
   }
   teamCodeBlur() {
      if (!this.teams.teamCode) {
         this.teams.teamCode = this.teams.teamCode === undefined ? '' : undefined;
      }
   }
   officernameBlur() {
      if (!this.staffMembers.code) {
         this.staffMembers.code = this.staffMembers.code === undefined ? '' : undefined;
      }
   }
   compStatusBlur() {
      if (!this.compStatus.code) {
         this.compStatus.code = this.compStatus.code === undefined ? '' : undefined;
      }
   }
   taskTypeBlur() {
      if (!this.taskType.code) {
         this.taskType.code = this.taskType.code === undefined ? '' : undefined;
      }
   }
   subTypeBlur() {
      if (!this.subTaskType.code) {
         this.subTaskType.code = this.subTaskType.code === undefined ? '' : undefined;
      }
   }
}
