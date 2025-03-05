import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuwkhtyService } from '@inst/workflow/managingworkassignments/servies/ocuwkhty.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { TaskAssignmentHty } from '@cm/teams-workflow/beans/TaskAssignmentHty';
import { VWorkAssignmentHistory } from '@inst/workflow/managingworkassignments/beans/VWorkAssignmentHistory';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
// import required bean declarations

@Component({
   selector: 'app-ocuwkhty',
   templateUrl: './ocuwkhty.component.html'
})

export class OcuwkhtyComponent implements OnInit {
   // Variable declaration
   @ViewChild('ocuwkhtyDialog', {static: true}) ocuwkhtyDialog: DialogComponent;
   msgs: any[] = [];
   taskModel: TaskAssignmentHty = new TaskAssignmentHty();
   vworkassignmenthistoryData: VWorkAssignmentHistory[] = [];
   vworkassignmenthistoryModel: VWorkAssignmentHistory = new VWorkAssignmentHistory();
   vWorkAssignmentHistoryColumnDef: any[];
   msglist: any[];
   message: any;
   type: any;
   tableIndex = -1;
   constructor(private ocuwkhtyFactory: OcuwkhtyService, public translateService: TranslateService,
      public sessionManager: UserSessionManager) {
      // TODO initilize data members here..!
      this.vWorkAssignmentHistoryColumnDef = [];
   }
   ngOnInit() {
      this.vWorkAssignmentHistoryColumnDef = [
         {
            fieldName: this.translateService.translate('common.assigndate'), field: 'assignmentDate', editable: false,
            width: 150, datatype: 'date'
         },
         { fieldName: this.translateService.translate('common.officername'), field: 'staffLastName', editable: false, width: 150 },
         { fieldName: this.translateService.translate('common.firstname'), field: 'staffName', editable: false, width: 150 },
         { fieldName: this.translateService.translate('common.position'), field: 'staffPosition', editable: false, width: 150 },
         { fieldName: this.translateService.translate('common.role'), field: 'staffRole', editable: false, width: 150 },
         { fieldName: this.translateService.translate('common.description'), field: 'teamDescription', editable: false, width: 150 },
      ];

      this.taskModel = this.ocuwkhtyDialog.data;
      this.vworkassignmenthistoryModel.workId = this.taskModel.workId;
      this.vworkassignmenthistoryModel.offenderBookId = this.taskModel.offenderBookId;
      this.vworkassignmenthistoryModel.workflowHistoryId = this.taskModel.workflowHistoryId;
      this.vWorkAssignmentHistoryExecuteQuery();
   }

   /** 
     * This function displays the messages
     */
   show() {
      this.msglist = [];
      this.msglist.push({ message: this.message, type: this.type });
      this.msgs = [...this.msglist];
   }

   vWorkAssignmentHistoryExecuteQuery() {
      const vworkassignmenthistoryResult = this.ocuwkhtyFactory.
         vWorkAssignmentHistoryExecuteQuery(this.vworkassignmenthistoryModel);
      vworkassignmenthistoryResult.subscribe(vworkassignmenthistoryResultList => {
         if (vworkassignmenthistoryResultList.length === 0) {
            this.vworkassignmenthistoryData = [];
         } else {
            this.tableIndex = 0;
            this.vworkassignmenthistoryData = vworkassignmenthistoryResultList;
         }
      });
   }

   onButExitclick() {
      this.ocuwkhtyDialog.close(null);
   }
}
