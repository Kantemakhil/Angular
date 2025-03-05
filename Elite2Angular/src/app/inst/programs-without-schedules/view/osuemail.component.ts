import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { EmailRecipients } from '@instprogramswithoutschedulesbeans/EmailRecipients';
import { ValidateRowReturn } from '../../booking/maintainence/view/oimprfca.component';
import { OsuemailService } from '../service/osuemail.service';
import { NewEmailCommitBean } from './../beans/NewEmailCommitBean';
// import required bean declarations

@Component({
   selector: 'app-osuemail',
   templateUrl: './osuemail.component.html'
})

export class OsuemailComponent implements OnInit {
   // Variable declaration
   actionName: string;
   lovModel: any[];
   msgs: any[] = [];
   nameOfLovPage: string;
   listToCompare: any[] = [];
   minDate: Date;
   display: boolean;
   errorMessage: string;
   headerMessage: string;
   disabled: boolean;
   editable = true;
   emailRecipientsColumnDef: any[];
   workItemReadOnly = false;
   emailRecipientsReadOnly = false;
   emailReturnReadOnly = false;
   emailReadOnly = false;
   buttonsReadOnly = false;
   rgworksRg: any[] = [];
   msglist: any[];
   message: any;
   type: any;
   @ViewChild('dialog', {static: true}) dialog: DialogComponent;
   @ViewChild('grid', {static: true}) grid: any;
   rgWorksRecord: string;
   caseLoadType: string;
   workSubType: any;
   emailModel: any;
   emailreturnModel: any;
   workitemModel: any;
   workId: any;
   internetAddress: string;
   emailRecipients: EmailRecipients = new EmailRecipients();
   newEmailCommitBean: NewEmailCommitBean = new NewEmailCommitBean();
   alertDelete: boolean;
   alertInsert: boolean;
   enableUpdate: boolean;
   recipentvldFlg: boolean;
   toAddressvldFlg: boolean;
   emailVldFlg: boolean;
   emaiTypeChange: boolean;
   workType: any;
   offenderBookId: any;
   offendersName: any;
   workTypeDesc: any;
   toEmailRecipients: EmailRecipients = new EmailRecipients();
   ccEmailRecipients: EmailRecipients = new EmailRecipients();
   bccEmailRecipients: EmailRecipients = new EmailRecipients();
   memoTypeTitles = {
      description: this.translateService.translate('osuemail.memoType'),
      code: this.translateService.translate('osuemail.memoSubType')
   }
   internetAddressvldFlg: boolean;
   workTypeReadOnly: boolean;
   selected = -1;
   selectedRow: EmailRecipients = new EmailRecipients();
   clearbtnDisable: boolean;
   constructor(
      private osuemailFactory: OsuemailService,
      public translateService: TranslateService,
      public sessionManager: UserSessionManager,
      public dialogService: DialogService) {
      // TODO initilize data members here..!
      this.emailRecipientsColumnDef = [];
   }
   ngOnInit() {
      this.alertInsert = true;
      this.enableUpdate = true;
      this.workTypeReadOnly = true;
      this.grid.btnSavebtnDisable = false;
      if (this.dialog && this.dialog.data && this.dialog.data.offenderBookId) {
         this.offenderBookId = this.dialog.data.offenderBookId;
      }
      this.emailRecipientsColumnDef = [
         {
            fieldName: this.translateService.translate('osuemail.toAddress'), field: 'internetAddress',
            editable: true, width: 150, datatype: 'email',
         },
         {
            fieldName: this.translateService.translate('osuemail.to'), field: 'nbtEmailTo',
            editable: true, width: 150, datatype: 'checkbox'
         },
         {
            fieldName: this.translateService.translate('osuemail.cc'), field: 'nbtEmailCc',
            editable: true, width: 150, datatype: 'checkbox'
         },
         {
            fieldName: this.translateService.translate('osuemail.bcc'), field: 'nbtEmailBcc',
            editable: true, width: 150, datatype: 'checkbox'
         },
      ];
      this.clearbtnDisable = true;
      this.getOffendersDetails();
      this.caseLoadType = this.sessionManager && this.sessionManager.currentCaseLoadType ?
         this.sessionManager.currentCaseLoadType : '';
      this.rgWorksRecord = 'osuemail/rgWorksRecordGroup?caseLoadType=' + this.caseLoadType;
      this.rgWorksRecordGroup();
      this.defaultEmptyRows();
   }

   changeEmailType(event) {
      if (!this.workType && this.workSubType) {
         this.emaiTypeChange = true;
      }
      if (event && event.code) {
         this.newEmailCommitBean = new NewEmailCommitBean();
         this.newEmailCommitBean.emailSubject = '';
         this.newEmailCommitBean.emailBody = '';
         this.defaultEmptyRows();
         this.workSubType = event.code;
         this.workId = event.workId;
         this.workTypeDesc = event.description;
         this.emaiTypeChange = false;
         this.osuemailExecuteQuery();
      }
      this.grid.btnSavebtnDisable = false;
      this.clearfun();
   }
   emailTypeBlur() {
      if (!this.workType) {
         this.workType = this.workType === undefined ? '' : undefined;
      }
      this.clearfun();
   }
   rgWorksRecordGroup() {
      const rgWorksRecordGroup = this.osuemailFactory.rgWorksRecordGroup(this.caseLoadType);
      rgWorksRecordGroup.subscribe(tasksResultList => {
         if (tasksResultList.length === 0) {
            this.workTypeReadOnly = true;
         } else {
            this.workTypeReadOnly = false;
         }
      });
   }
   osuemailExecuteQuery() {
      this.newEmailCommitBean.workId = this.workId;
      const tasksResult = this.osuemailFactory.osuemailExecuteQuery(this.newEmailCommitBean);
      tasksResult.subscribe(tasksResultList => {
         this.alertInsert = true;
         if (!tasksResultList || (tasksResultList && !tasksResultList.emailRecipientsList)) {
            this.newEmailCommitBean = new NewEmailCommitBean();
            this.newEmailCommitBean.emailRecipientsList = [];
            this.newEmailCommitBean.workId = this.workId;
            this.defaultEmptyRows();

            if (this.workSubType && this.workId && this.workTypeDesc) {
               this.newEmailCommitBean.emailSubject = this.workTypeDesc + '/' + this.workSubType + ' - ';
            }
         } else {
            this.newEmailCommitBean = tasksResultList;
            if (this.workSubType && this.workId && this.newEmailCommitBean.emailSubject) {
               this.newEmailCommitBean.emailSubject =
                  this.workTypeDesc + '/' + this.workSubType + ' - ' + this.newEmailCommitBean.emailSubject;
            } else if (this.workSubType && this.workId && this.workTypeDesc) {
               this.newEmailCommitBean.emailSubject = this.workTypeDesc + '/' + this.workSubType + ' - ';
            }
         }
      });
   }
   getOffendersDetails() {
      if (this.dialog && this.dialog.data && this.dialog.data.offenderBookId) {
         this.offenderBookId = this.dialog.data.offenderBookId;
      }
      const tasksResult = this.osuemailFactory.getOffendersDetails(this.offenderBookId);
      tasksResult.subscribe(tasksResultList => {
         if (tasksResultList) {
            this.offendersName = tasksResultList;
         }
      });
   }
   changeReturnAddress() {
      if (this.workType && this.emaiTypeChange) {
         this.osuemailExecuteQuery();
         this.emaiTypeChange = false;
      }
      this.clearfun();
   }
   changeSubject() {
      if (this.workType && this.emaiTypeChange) {
         this.osuemailExecuteQuery();
         this.emaiTypeChange = false;
      }
      this.clearfun();
   }
   changeBody() {
      if (this.workType && this.emaiTypeChange) {
         this.osuemailExecuteQuery();
         this.emaiTypeChange = false;
      }
      this.clearfun();
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
   onAssessGridInsert = () => {
      this.grid.btnSavebtnDisable = false;
      for (let i = 0; i < this.newEmailCommitBean.emailRecipientsList.length; i++) {
         if (!this.newEmailCommitBean.emailRecipientsList[i].internetAddress ||
            !this.newEmailCommitBean.emailRecipientsList[i].internetAddress.trim()) {
            this.show(this.translateService.translate('osuemail.internetAddressvldFlg'), 'warn');
            return;
         }
      }
      return { nbtEmailTo: true, nbtEmailCc: false, nbtEmailBcc: false, internetAddressClass: 'EMAIL_TO' };
   }
   onRowClickoffded(event) {
      if (event.ownerId) {
         this.alertDelete = true;
      } else {
         this.alertDelete = false;
      }

      if (!this.workType && this.workSubType) {
         this.clearScreen();
      }
      if (this.workType && this.emaiTypeChange) {
         this.defaultEmptyRows();
         this.osuemailExecuteQuery();
         this.emaiTypeChange = false;
      }
   }
   validateRowData = (event) => {
      const rowIndex = event.rowIndex;
      const rowdata = new ValidateRowReturn();
      this.clearfun();
      if (event.field === 'nbtEmailTo') {
         if (event.newValue === true) {
            this.grid.setColumnData('nbtEmailCc', rowIndex, false);
            this.grid.setColumnData('nbtEmailBcc', rowIndex, false);
            this.grid.setColumnData('nbtEmailTo', rowIndex, true);
         } else {
            this.grid.setColumnData('nbtEmailTo', rowIndex, false);
         }
         rowdata.validated = true;
         return rowdata;
      }
      if (event.field === 'nbtEmailCc') {
         if (event.newValue) {
            this.grid.setColumnData('nbtEmailCc', rowIndex, true);
            this.grid.setColumnData('nbtEmailBcc', rowIndex, false);
            this.grid.setColumnData('nbtEmailTo', rowIndex, false);
         } else {
            this.grid.setColumnData('nbtEmailCc', rowIndex, false);
         }
         rowdata.validated = true;
         return rowdata;
      }
      if (event.field === 'nbtEmailBcc') {
         if (event.newValue) {
            this.grid.setColumnData('nbtEmailCc', rowIndex, false);
            this.grid.setColumnData('nbtEmailBcc', rowIndex, true);
            this.grid.setColumnData('nbtEmailTo', rowIndex, false);
         } else {
            this.grid.setColumnData('nbtEmailBcc', rowIndex, false);
         }
         rowdata.validated = true;
         return rowdata;

      }
      rowdata.validated = true;
      return rowdata;
   }
   cancel() {
      this.dialog.close(null);
   }
   /**
       *  This function will be executed to validate the mandetory fields in Regions grid
      * fired
      */
   osuemailValidations() {
      const is = { valid: true };
      if (this.newEmailCommitBean && this.newEmailCommitBean.emailRecipientsList.length === 0) {
         this.show(this.translateService.translate('osuemail.toRecipientMsg'), 'warn');
         is.valid = false;
         return is.valid;
      }

      this.toAddressvldFlg = false;
      this.emailVldFlg = false;
      this.internetAddressvldFlg = false;
      this.newEmailCommitBean.emailRecipientsList.forEach(element => {
         if (((element.toAddress === 'Y' || element.nbtEmailTo === true) && element.internetAddress) ||
            (!element.internetAddress && element.nbtEmailTo === false && element.nbtEmailCc === false && element.nbtEmailBcc === false)) {
            this.toAddressvldFlg = true;
         }
      });
      if (!this.toAddressvldFlg) {
         this.show(this.translateService.translate('osuemail.toAddressvldFlgMsg'), 'warn');
         is.valid = false;
         return is.valid;
      }
      this.newEmailCommitBean.emailRecipientsList.forEach(element => {
         if (element.nbtEmailTo === false && element.nbtEmailCc === false && element.nbtEmailBcc === false && !element.internetAddress) {
            this.internetAddressvldFlg = true;
         }
         if ((element.toAddress === 'Y' || element.ccAddress === 'Y' || element.bccAddress === 'Y') && !element.internetAddress) {
            this.internetAddressvldFlg = true;
         }
         if (element.internetAddress && !element.internetAddress.match('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')) {
            this.emailVldFlg = true;
         }
      });
      if (this.internetAddressvldFlg) {
         this.show(this.translateService.translate('osuemail.internetAddressvldFlg'), 'warn');
         is.valid = false;
         return is.valid;
      }
      if (this.emailVldFlg) {
         this.show(this.translateService.translate('osuemail.emailVldMsg'), 'warn');
         is.valid = false;
         return is.valid;
      }
      if (this.newEmailCommitBean.returnAddress &&
         !this.newEmailCommitBean.returnAddress.match('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')) {
         this.show(this.translateService.translate('osuemail.emailPatternMsg'), 'warn');
         is.valid = false;
         return is.valid;
      }
      if (!this.newEmailCommitBean.returnAddress) {
         this.show(this.translateService.translate('osuemail.returnAddressMsg'), 'warn');
         is.valid = false;
         return is.valid;
      }
      if (!this.newEmailCommitBean.emailSubject) {
         this.show(this.translateService.translate('osuemail.emailSubjectMsg'), 'warn');
         is.valid = false;
         return is.valid;
      }

      if (!this.newEmailCommitBean.emailBody) {
         this.show(this.translateService.translate('osuemail.emailBodyMsg'), 'warn');
         is.valid = false;
         return is.valid;
      }
      return is.valid;
   }
   sendMail() {
      if (this.workType && this.emaiTypeChange) {
         this.clearEmailData();
         return;
      } else if (!this.workType && this.emaiTypeChange) {
         this.clearEmailData();
         return;
      }
      if (this.newEmailCommitBean && this.newEmailCommitBean.emailRecipientsList.length > 0) {
         this.newEmailCommitBean.emailRecipientsList.forEach(element => {
            element.toAddress = 'N';
            element.ccAddress = 'N';
            element.bccAddress = 'N';
            if (element.nbtEmailTo) {
               element.toAddress = 'Y';
               element.internetAddressClass = 'EMAIL_TO';
            }
            if (element.nbtEmailCc) {
               element.ccAddress = 'Y';
               element.internetAddressClass = 'EMAIL_CC';
            }
            if (element.nbtEmailBcc) {
               element.bccAddress = 'Y';
               element.internetAddressClass = 'EMAIL_BCC';
            }
         });
      }
      if (!this.osuemailValidations()) {
         return;
      }
      const data = {
         label: this.translateService.translate('osuemail.openLinkDialogMsgOne'),
         yesBtn: true, noBtn: true
      };

      this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
         if (result) {
            this.createAdhocEmailProcedure();
         }
      });
   }
   clearEmailData() {
      const data = {
         label: this.translateService.translate('osuemail.openLinkDialogMsgTWO'),
         yesBtn: true, noBtn: false, yesLabel: this.translateService.translate('common.ok')
      };

      this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
         if (result) {
            if (this.workType && this.emaiTypeChange) {
               this.osuemailExecuteQuery();
            } else if (!this.workType && this.emaiTypeChange) {
               this.newEmailCommitBean = new NewEmailCommitBean();
               this.clearScreen();
            }
            this.emaiTypeChange = false;
         }
      });
   }
   createAdhocEmailProcedure() {
      if (this.newEmailCommitBean.emailRecipientsList) {

      }
      this.newEmailCommitBean.workflowType = 'EMAIL';
      this.newEmailCommitBean.workId = this.workId;
      this.newEmailCommitBean.offenderBookId = this.offenderBookId;
      this.newEmailCommitBean.createUserId = this.sessionManager.getId();
      this.newEmailCommitBean.createDatetime = new Date();
      const createAdhocEmailData = this.osuemailFactory.osuemailCommit(this.newEmailCommitBean);
      createAdhocEmailData.subscribe(data => {
         if (data === 1) {
            this.show(this.translateService.translate('osuemail.successMsg'), 'info');
            this.clearScreen();
         } else if (data === 2) {
            this.show(this.translateService.translate('osuemail.administratorMsg'), 'warn');
         }
      });
   }

   onDevClick() {
      if (!this.workType && this.workSubType) {
         this.clearScreen();
      }
      if (this.workType && this.emaiTypeChange) {
         this.defaultEmptyRows();
         this.osuemailExecuteQuery();
         this.emaiTypeChange = false;
      }
   }
   clearScreen() {
      this.workType = '';
      this.workSubType = '';
      this.newEmailCommitBean = new NewEmailCommitBean();
      this.defaultEmptyRows();
      this.emaiTypeChange = false;
      this.clearfun();
   }
   defaultEmptyRows() {
      const emptyDataSet = [];
      this.newEmailCommitBean.emailRecipientsList = emptyDataSet;
   }
   clearfun() {
      if (this.workType || this.workSubType || (this.newEmailCommitBean && this.newEmailCommitBean.emailSubject)
         || (this.newEmailCommitBean && this.newEmailCommitBean.emailBody) ||
         (this.newEmailCommitBean && this.newEmailCommitBean.returnAddress) ||
         (this.newEmailCommitBean && this.newEmailCommitBean.emailRecipientsList.length > 0)) {
         this.clearbtnDisable = false;
      } else {
         this.clearbtnDisable = true;
      }
   }
   onGridClear = () => {
      if (this.workId && this.workType) {
         this.newEmailCommitBean.workId = this.workId;
         const tasksResult = this.osuemailFactory.osuemailExecuteQuery(this.newEmailCommitBean);
         tasksResult.subscribe(tasksResultList => {
            if (tasksResultList && tasksResultList.emailRecipientsList.length > 0) {
               this.newEmailCommitBean.emailRecipientsList = [];
               this.newEmailCommitBean.emailRecipientsList = tasksResultList.emailRecipientsList;
            }
         });
      }
      return true;
   }
}
