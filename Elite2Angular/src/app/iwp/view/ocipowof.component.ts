import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcipowofService } from '../service/ocipowof.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { StaffMembers } from '@inst/incidents-oic/beans/StaffMembers';
import { StaffWorkAssignmentsV1 } from '@inst/legals/au/beans/StaffWorkAssignmentsV1';
import { VAssignedOffenders } from '../beans/VAssignedOffenders';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { OcdmworkService } from '@common/workspace/service/ocdmwork.service';
import { TagWorkflowBrowseQueue } from '@cm/teams-workflow/beans/TagWorkflowBrowseQueue';
import { TagWorkflowBrowseQueueCommitBean } from '@cm/teams-workflow/beans/TagWorkflowBrowseQueueCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';



@Component({
   selector: 'app-ocipowof',
   templateUrl: './ocipowof.component.html'
})

export class OcipowofComponent implements OnInit {


   msgs: any[] = [];
   @ViewChild('grid', {static: true}) grid: any;
   staffData: StaffMembers[] = [];
   staffModel: StaffMembers = new StaffMembers();
   staffIndex: 0;
   vassoffData: StaffWorkAssignmentsV1[] = [];
   vassoffModel: VAssignedOffenders = new VAssignedOffenders();
   vassoffIndex: 0;
   vswaData: StaffWorkAssignmentsV1[] = [];
   vswaModel: StaffWorkAssignmentsV1 = new StaffWorkAssignmentsV1();
   vswaIndex: 0;
   editable: true;
   vassoffColumnDef: any[];
   workColumnDef: any[];
   vAssOfftableIndex: number;
   image: any;
   workData: TagWorkflowBrowseQueue[] = [];
   workModel: TagWorkflowBrowseQueue = new TagWorkflowBrowseQueue();
   workModelTemp: TagWorkflowBrowseQueue = new TagWorkflowBrowseQueue();
   workInsertList: TagWorkflowBrowseQueue[] = [];
  workUpdateList: TagWorkflowBrowseQueue[] = [];
  workDeleteList: TagWorkflowBrowseQueue[] = [];
  workCommitModel: TagWorkflowBrowseQueueCommitBean = new TagWorkflowBrowseQueueCommitBean();
   selectedTaskIndex: number;
   workReadOnly: boolean;
   type: string;
   message: string;
 
   constructor(private ocipowofFactory: OcipowofService, public translateService: TranslateService,
      public sessionManager: UserSessionManager, private osiosearFactory: OsiosearService, public dialogService: DialogService,
      private ocdmworkFactory: OcdmworkService) {

      this.vassoffColumnDef = [];
      this.workColumnDef = [];
   }
   ngOnInit() {
      this.vassoffColumnDef = [
         {
            fieldName: this.translateService.translate('ocipowof.lastname'), field: 'lastName', editable: false, width: 150,
            datatype: 'text'
         },

         {
            fieldName: this.translateService.translate('ocipowof.firstname'), field: 'firstName', editable: false, width: 150,
            datatype: 'text'
         },

         {
            fieldName: this.translateService.translate('ocipowof.middlename'), field: 'middleName', editable: false, width: 150,
            datatype: 'text'
         },

         {
            fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay',
            editable: false, width: 150, datatype: 'text'
         },

         {
            fieldName: this.translateService.translate('ocipowof.gender'), field: 'sexCode', editable: false, width: 150,
            datatype: 'text'
         },

         {
            fieldName: this.translateService.translate('ocipowof.supervisionlevel'), field: 'supervisionLevel', editable: false, width: 150,
            datatype: 'text'
         },

        /*  { fieldName: this.translateService.translate('ocipowof.casetype'), field: 'dspCaseType', editable: false, width: 150 }, */

         {
            fieldName: this.translateService.translate('ocipowof.status'), field: 'offenderStatus', editable: false, width: 150,
            datatype: 'text'
         },

         {
            fieldName: this.translateService.translate('ocipowof.assigndate'), field: 'startDate', editable: false, width: 150,
            datatype: 'date'
         },


      ];
      this.workColumnDef = [
         {
            fieldName: this.translateService.translate('common.assigned'), field: 'assignmentDate', editable: false, width: 150,
            datatype: 'date'
          },
          { fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay', 
          editable: false, width: 150 },

          { fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName', editable: false, width: 150 },

          { fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName', editable: false, width: 150 },
          {
            fieldName: this.translateService.translate('common.tasktype'), field: 'workType', editable: false, width: 150, datatype: 'lov',
            domain: 'TASK_TYPE'
          },

          {
            fieldName: this.translateService.translate('common.subtype'), field: 'workSubType', editable: false, width: 150, 
            datatype: 'lov', domain: 'TASK_SUBTYPE'
          },
          { fieldName: this.translateService.translate('common.duedate'), field: 'dueDate', editable: false, width: 150, datatype: 'date' },
          {
            fieldName: this.translateService.translate('common.complete'), field: 'completeFlag', editable: true, width: 150,
            datatype: 'checkbox', cellEditable: this.completeFlagChange
          },
          {
            fieldName: '', field: 'dButton',  editable: false, width: 150, datatype: 'launchbutton',
          },
          {
            fieldName: '', field: 'goButton', editable: false, width: 150, datatype: 'launchbutton', data: 'row', updateField: 'row',
            modal: true, dialogWidth: '70%', onLaunchClick:  this.goBtnLaunchClick,
          }
      ];
      this.staffExecuteQuery();
     // this.vassoffExecuteQuery();
      this.workExecuteQuery();

   }
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
    goBtnLaunchClick = (event) => {
      this.message = this.translateService.translate('ocdmwork.noscreenassociated');
      this.show( this.message , this.type);
      return false;
    }

   show(vldmsg, type?) {
      type = type ? type : 'warn';
      vldmsg = this.translateService.translate(vldmsg);
      const msgval = [{ message: vldmsg, type: type }];
      this.msgs = [...msgval];
   }

   onRowClickvassoff(event) {
      if (event) {
         this.image = event.imageData ? 'data:image/JPEG;base64,' + event.imageData : null;
      } else {
         this.image = null;
      }
   }

   staffExecuteQuery() {
      //this.staffModel.staffId = 1;
      const staffResult = this.ocipowofFactory.staffExecuteQuery(this.staffModel);
      staffResult.subscribe(data => {
         if (data.length === 0) {
            this.staffData = [];
         } else {
            this.staffData = data;
            this.staffModel = this.staffData[0];
           this.vassoffExecuteQuery();
         }
      });
   }
   isImageContent(): boolean {
    return this.image ? true : false;
   }
   vassoffExecuteQuery() { 
      this.vassoffModel.sacStaffId =this.staffModel.staffId;
      const vassoffResult = this.ocipowofFactory.vAssOffExecuteQuery(this.vassoffModel); 
      vassoffResult.subscribe(data => { 
         if (data.length === 0) {
            this.vassoffData = [];
         } else {
            this.vassoffData = data;
            this.vAssOfftableIndex = 0; 
         }
      });
   }
   workExecuteQuery() {
      const vswaResult = this.ocdmworkFactory.workExecuteQuery(this.vswaModel);
      vswaResult.subscribe(data => {
         if (data.length === 0) {
            this.workData = [];
            this.staffModel.totalWorkload=this.workData.length;
         } else {
            this.workData = data;
            this.staffModel.totalWorkload=this.workData.length;
            this.selectedTaskIndex = 0;
            for (let i = 0; i < this.workData.length; i++) {
               this.workData[i].dButton = 'D';
               this.workData[i].goButton = 'GO';
             }
         }
      });
   }
   completeFlagChange = (data: any, index: number, field: string): boolean => {
      if (!data.teamId) {
        if (!data.teamId) {
          this.type = 'warn';
          this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
          this.show(this.message,   this.type);
          return false;
        }
        if (field === 'completeFlag' && data.manualCloseFlag === 'N' && data.workflowType === 'TASK') {
          this.type = 'warn';
          this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
          this.show(this.message,   this.type);
          return false;
        }
        if (field === 'completeFlag' && data.manualCloseFlag === 'N') {
          this.type = 'warn';
          this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
          this.show(this.message,   this.type);
          return false;
        }
      }
      return true;
    }

     /**
   *  This function will be executed when we change the Incoming Tasks grid row data
   */
  valueChangeEvent = (event) => {
   const rowdata = new ValidateRowReturn();
   if (event.field === 'completeFlag' && event.data.completeFlag === true) {
     if (event.data.manualCloseFlag && event.data.manualCloseFlag === 'Y') {
       this.grid.setColumnData('completeFlag', this.workData.indexOf(event.data), false);
       this.type = 'warn';
       this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
       this.show(this.message,   this.type);
     } else {
       this.dialogService.openLinkDialog('/ocdaworkdailog', this.workModelTemp, 50).subscribe(result => {
         if (result) {
           this.workExecuteQuery();
         } else {
           this.grid.setColumnData('completeFlag', this.workData.indexOf(event.data), false);
           this.workExecuteQuery();
         }
       });
     }
   }
   rowdata.validated = true;
   return rowdata;
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
         this.show('common.addupdateremoverecordsuccess', 'success');
         this.workExecuteQuery();
       } else {
         this.show('common.addupdateremoverecordfailed');
         this.workExecuteQuery();
       }
     });
   }
 }

}
