import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { LockedModules } from '@inst/automated-counts/maintenance/beans/LockedModules';
import { LockedModulesCommitBean } from '@sa/admin/beans/LockedModulesCommitBean';
import { OtmlockrService } from '@sa/admin/service/otmlockr.service';
// import required bean declarations

@Component({
   selector: 'app-otmlockr',
   templateUrl: './otmlockr.component.html'
})

export class OtmlockrComponent implements OnInit {
   // Variable declaration
   actionName: string;
   lovModel: any[];
   msgs: any[] = [];
   nameOfLovPage: string;
   listToCompare: any[] = [];
   lockmodData: LockedModules[] = [];
   lockmodDataTemp: LockedModules[] = [];
   // TODO angular.copy(this.lockmodData, thislockmodDataTemp);
   lockmodModel: LockedModules = new LockedModules();
   lockmodIndex = 0;
   lockmodInsertList: LockedModules[] = [];
   lockmodUpdatetList: LockedModules[] = [];
   lockmodDeleteList: LockedModules[] = [];
   minDate: Date;
   display: boolean;
   errorMessage: string;
   headerMessage: string;
   disabled: boolean;
   editable = true;
   lockModColumnDef: any[];
   lockModReadOnly = false;
   tableIndex = -1;
   lockmodCommitModel: LockedModulesCommitBean = new LockedModulesCommitBean();
   constructor(private otmlockrFactory: OtmlockrService,
      public translateService: TranslateService,
      public sessionManager: UserSessionManager) {
      // TODO initilize data members here..!
      this.lockModColumnDef = [];
   }
   ngOnInit() {
      this.lockModColumnDef = [
         {
            fieldName: this.translateService.translate('otmlockr.caseload') , field: 'caseloadId', editable: false,
            cellEditable: this.canCellEdit, width: 150, maxlength: '6', datatype: 'text', uppercase: 'false',
         },
         {
            fieldName: this.translateService.translate('otmlockr.modulename'), field: 'moduleName', editable: false,
            cellEditable: this.canCellEdit, width: 150, maxlength: '20', datatype: 'text', uppercase: 'true',
         },
         {
            fieldName: this.translateService.translate('otmlockr.user'), field: 'userId', editable: false, width: 150, maxlength: 32,
            datatype: 'text', uppercase: 'false',
         },
         {
            fieldName: this.translateService.translate('otmlockr.lockeddate') , field: 'lockedDate', datatype: 'date',
            editable: false, width: 150, maxlength: 10
         },
      ];
      // TODO all initializations here
      this.lockmodExecuteQuery();
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
   onRowClicklockmod(event) {
   }
   onGridClear = () => {
      this.lockmodExecuteQuery();
      return true;
   }
   onGridDelete = () => {
      return true;
   }
   otmlockrValidations() {
      const is = { valid: true };
      if (this.lockmodData.length > 0) {
         this.lockmodData.forEach(element => {
            if (!element.caseloadId || !element.caseloadId.trim()) {
               this.show(this.translateService.translate('otmlockr.caseloadmsg'), 'warn');
               is.valid = false;
               return;
            }
            if (!element.moduleName || !element.caseloadId.trim()) {
               this.show(this.translateService.translate('otmlockr.modulenamemsg'), 'warn');
               is.valid = false;
               return;
            }
            if (!element.userId || !element.caseloadId.trim()) {
               this.show(this.translateService.translate('otmlockr.usermsg'), 'warn');
               is.valid = false;
               return;
            }
            if (!element.lockedDate) {
               this.show(this.translateService.translate('otmlockr.lockeddatemsg'), 'warn');
               is.valid = false;
               return;
            }
         });
      }
      return is.valid;
   }
   onGridInsert = () => {
      if (!this.otmlockrValidations()) {
         return false;
      }
      return {};
   }
   canCellEdit = (data: any, index: number, field: string) => {
      if (data.createDatetime) {
         return false;
      }
      return true;
   }
   lockmodExecuteQuery() {
      const lockmodResult = this.otmlockrFactory.lockModExecuteQuery(this.lockmodModel);
      lockmodResult.subscribe(lockmodResultList => {
         if (lockmodResultList.length === 0) {
            this.lockmodData = [];
            this.show(this.translateService.translate('common.querycausednorecords'), 'warn');
         } else {
            this.tableIndex = 0;
            this.lockmodData = lockmodResultList;
            this.lockmodModel = lockmodResultList[0];
         }
      });
   }
   /**
    *  This function will be executed when commit event is
   * fired
   */
   otmlockrSavelockmodForm(event) {
      // TODO declare commit bean and add insert list to that object.
      if (!this.otmlockrValidations()) {
         return false;
      }
      this.lockmodInsertList = event.added;
      this.lockmodUpdatetList = event.updated;
      this.lockmodDeleteList = event.removed;
      this.lockmodCommitModel.insertList = [];
      this.lockmodCommitModel.updateList = [];
      this.lockmodCommitModel.deleteList = [];
      if (this.lockmodInsertList.length > 0 || this.lockmodUpdatetList.length > 0) {
         this.lockmodCommitModel.insertList = this.lockmodInsertList;
         this.lockmodCommitModel.updateList = this.lockmodUpdatetList;
      }
      if (this.lockmodDeleteList.length > 0) {
         this.lockmodCommitModel.deleteList = this.lockmodDeleteList;
      }
      const lockmodSaveData = this.otmlockrFactory.lockModCommit(this.lockmodCommitModel);
      lockmodSaveData.subscribe(data => {
         if (data === 1) {
            this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
            this.lockmodExecuteQuery();
         } else {
            this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
         }
      });

   }

}
