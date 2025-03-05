import {
   Component, OnInit,
   ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtmalproService } from '../service/otmalpro.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CaseloadDeductionProfiles } from '@inmate/trust/checks/beans/CaseloadDeductionProfiles';
import { CaseloadDeductionDetails } from '@inmate/trust/checks/beans//CaseloadDeductionDetails';
import { CaseloadDeductionProfilesCommitBean } from '@inmate/trust/checks/beans/CaseloadDeductionProfilesCommitBean';
import { CaseloadDeductionDetailsCommitBean } from '@inmate/trust/checks/beans/CaseloadDeductionDetailsCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DeductionTypes } from '../beans/DeductionTypes';
// import required bean declarations

@Component({
   selector: 'app-otmalpro',
   templateUrl: './otmalpro.component.html'
})

export class OtmalproComponent implements OnInit {
   // Variable declaration
   @ViewChild('grid', { static: true }) grid: any;
   @ViewChild('grid', { static: true }) allocProfGrid: any;
   csldDpIndex: number;
   actionName: string;
   lovModel: any[];
   msgs: any[] = [];
   nameOfLovPage: string;
   listToCompare: any[] = [];
   cslddpData: CaseloadDeductionProfiles[] = [];
   cslddpDataTemp: CaseloadDeductionProfiles[] = [];
   cslddpModel: CaseloadDeductionProfiles = new CaseloadDeductionProfiles();
   savebtnupdatedModel: CaseloadDeductionProfiles = new CaseloadDeductionProfiles();
   cslddpInsertList: CaseloadDeductionProfiles[] = [];
   cslddpUpdatetList: CaseloadDeductionProfiles[] = [];
   cslddpDeleteList: CaseloadDeductionProfiles[] = [];
   cslddpCommitModel: CaseloadDeductionProfilesCommitBean = new CaseloadDeductionProfilesCommitBean();
   csldddCommitModel: CaseloadDeductionDetailsCommitBean = new CaseloadDeductionDetailsCommitBean();
   csldddData: CaseloadDeductionDetails[] = [];
   csldddDataModel: CaseloadDeductionDetails = new CaseloadDeductionDetails();
   csldddModel: CaseloadDeductionDetails = new CaseloadDeductionDetails();
   csldddInsertList: CaseloadDeductionDetails[] = [];
   csldddUpdatetList: CaseloadDeductionDetails[] = [];
   csldddDeleteList: CaseloadDeductionDetails[] = [];
   display: boolean;
   errorMessage: string;
   headerMessage: string;
   disabled: boolean;
   csldDdColumnDef: any[];
   cgfkCslddpaccountcodeRg: any[] = [];
   cgfkCsldddreceipttxntypeRg: any[] = [];
   cgfkCslddpdeductiontypeRg: any[] = [];
   deductionLink: string;
   accountCodelink: string;
   allocationTitles = { code: 'Allocation Type   :', description: 'Deduction Desc' };
   accountcodeTitles = { code: 'Credit Allocation to    :', description: 'Account Name' };
   gridTitles = { code: 'Allocate on Receipt Types', description: 'Description' };
   bothamount: boolean;
   effectiveDate: Date;
   mode: string;
   dialogFlg: string;
   allocationIndex = -1;
   forAlAllflg: boolean;
   acFlg: boolean;
   percentageExists: boolean;
   datevalid: boolean;
   rowAlreadyexists: boolean;
   saved: boolean;
   duplicateExists: boolean;
   dateDisabled: boolean;
   allocProfRowData: CaseloadDeductionProfiles[] = [];
   allocProfColumnDef: any[];
   deleteButton: boolean;
   tableIndex = -1;
   allocProfInsertList: CaseloadDeductionProfiles[] = [];
   allocProfUpdateList: CaseloadDeductionProfiles[] = [];
   allocProfDeleteList: CaseloadDeductionProfiles[] = [];
   allocProfCommitModel: CaseloadDeductionProfilesCommitBean = new CaseloadDeductionProfilesCommitBean();
   allocaProfCommitModel: CaseloadDeductionDetailsCommitBean = new CaseloadDeductionDetailsCommitBean();
   coCreditWhenIndigentFlag: string;
   expiryDate: Date;
   activeFlag: string;
   nbtModifyUserId: any;
   externalPriorityNo: any;
   listSeq: number;
   calculate: string;
   allocTypeValid: boolean;
   type = 'error';
   message = ' Invalid.';
   csldDdInsert: boolean;
   deductionTypesTemp: DeductionTypes[]=[];
   deductionTypesList: DeductionTypes []=[];
   constructor(private otmalproFactory: OtmalproService, public translateService: TranslateService,
      public sessionManager: UserSessionManager, public dialogService: DialogService) {
      this.csldDdColumnDef = [];
      this.allocProfColumnDef = [];
      this.allocProfRowData = [];

   }
   ngOnInit() {
      this.dateDisabled = false;
      this.saved = false;
      this.dialogFlg = 'N';
      this.csldDdInsert = false;
      this.deleteButton = false;
      this.deductionLink = 'otmalpro/cgfkCsldDpDeductionTypeRecordGroup?caseloadType=' + this.sessionManager.currentCaseLoadType;
      this.accountCodelink = 'otmalpro/cgfkCsldDpAccountCodeRecordGroup?caseloadType=' + this.sessionManager.currentCaseLoadType;

      this.allocProfColumnDef = [
         {
            fieldName: this.translateService.translate('otmalpro.allocatiotype'), datatype: 'lov', field: 'deductionType', editable: true, titles: this.allocationTitles,
            width: 150, required: true, readonly: "isAllLovDis", source: "OCMDEDUT", link: 'otmalpro/cgfkCsldDpDeductionTypeRecordGroup?caseloadType=' + this.sessionManager.currentCaseLoadType
         },
         {
            fieldName: this.translateService.translate('otmalpro.creditallocation'), datatype: 'lov', field: 'accountCode', editable: true, titles: this.accountcodeTitles,
            width: 150, required: true, source: "OCMCOACT", link: 'otmalpro/cgfkCsldDpAccountCodeRecordGroup?caseloadType=' + this.sessionManager.currentCaseLoadType
         },
         {
            fieldName: this.translateService.translate('otmalpro.monthlymax'), datatype: 'number', field: 'maxMonthlyAmount', readonly: "!isRetrieveDis",
            width: 150,  maxValue: 999999999.99,format: '1.2-2',strictFP: true, blur: "maxmontandTotlChange(numMonth)", whole: "true", editable: true
         },
         {
            fieldName: this.translateService.translate('otmalpro.totalmax'), datatype: 'number', field: 'maxTotalAmount', readonly: "!isRetrieveDis",
            width: 150,  maxValue: 999999999.99, format: '1.2-2',strictFP: true, blur: "maxmontandTotlChange(numMonth)", whole: "true", editable: true
         },
         {
            fieldName: this.translateService.translate('otmalpro.unlimited'), datatype: 'checkbox', field: 'coCreditWhenIndigentFlag', editable: false,
            width: 150, disabled: true
         },
         {
            fieldName: this.translateService.translate('otmalpro.foralloffenders'), datatype: 'checkbox', field: 'foAlAllOffenderFlag',
            width: 150, disabled: "forAlAllflg", editable: true
         },
         {
            fieldName: this.translateService.translate('otmalpro.calculate'), datatype: 'text', field: 'nbtModifyUserId',
            width: 150, maxlength: "32",editable: false
         },
         {
            fieldName: this.translateService.translate('common.active'), datatype: 'checkbox', field: 'activeFlag',
            width: 150, disabled: "acFlg", editable: true, change: 'changetheflg($event)'
         },
         {
            fieldName: this.translateService.translate('otmalpro.sequence'), datatype: 'number', field: 'listSeq',
            width: 150, max: "999", whole: "true", editable: true
         },
         {
            fieldName: this.translateService.translate('otmalpro.effective'), datatype: 'date', field: 'effectiveDate', editable: true,
            width: 150, maxlength: "10", required: "true", disabled: "dateDisabled"
         },
         {
            fieldName: this.translateService.translate('otmalpro.expiry'), datatype: 'date', field: 'expiryDate', editable: false,
            width: 150, readonly: "true"
         },
      ];


      this.csldDdColumnDef = [
         {
            fieldName: this.translateService.translate('otmalpro.allocateorreceipt') + '*', field: 'receiptTxnType', editable: true,
            width: 150, datatype: 'lov',
            link: 'otmalpro/cgfkCsldDdReceiptTxnTypeRecordGroup?caseloadType=' + this.sessionManager.currentCaseLoadType,
            titles: this.gridTitles, cellEditable: this.canCellEdit, source: 'OCMTRANS'
         },
         {
            fieldName: this.translateService.translate('otmalpro.percentage'), field: 'percentage', editable: true, width: 150,
            datatype: 'number', maxValue: 999,
            whole: true
         },
      ];
      this.otmalproexecuteQuery();
      this.getAllocationType();
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
   canCellEdit = (data: any, index: number, field: string) => {
      if (this.csldddDataModel.createDatetime) {
         return false;
      }
      return true;

   }
   onRowClickcslddd(event) {
      if (event) {
         this.csldddDataModel = event;
      } else {
         this.csldddDataModel = new CaseloadDeductionDetails();
      }
   }

   changetheflg(event) {
      if (event.checked === false) {
         this.expiryDate = DateFormat.getDate();
      } else {
         this.expiryDate = null;
      }

   }

   otmalproexecuteQuery() {
      this.csldDpIndex = 0;
      this.tableIndex = -1;
      if (this.saved) {
         this.cslddpModel = new CaseloadDeductionProfiles();
         this.savebtnupdatedModel = new CaseloadDeductionProfiles();

      }
      if (this.cslddpModel.deductionType) {
         this.cslddpModel.deductionType = this.cslddpModel.deductionType;
      }
      if (this.cslddpModel.deductionType && this.cslddpModel.accountCode) {
         this.cslddpModel.deductionType = this.cslddpModel.deductionType;
         this.cslddpModel.accountCode = this.cslddpModel.accountCode;
      }
      if (this.cslddpModel.listSeq) {
         this.cslddpModel.listSeq = this.cslddpModel.listSeq;
      }
      this.cslddpModel.caseloadId = this.sessionManager.currentCaseLoad;
      this.cslddpModel.caseloadType = this.sessionManager.currentCaseLoadType;
      const serviceObj = this.otmalproFactory.csldDpExecuteQuery(this.cslddpModel);
      serviceObj.subscribe(data => {
         if (data.length > 0) {
            data.forEach(element => {
               element.accountCode = String(element.accountCode);
               if (element.maxMonthlyAmount) {
                  element.maxMonthlyAmount = Number(element.maxMonthlyAmount).toFixed(2);
               }
               if (element.maxTotalAmount) {
                  element.maxTotalAmount = Number(element.maxTotalAmount).toFixed(2);
               }
               if (element.foAlAllOffenderFlag === 'Y') {
                  element.foAlAllOffenderFlag = 'Y';
               } else {
                  element.foAlAllOffenderFlag = null;
               }
               if (element.coCreditWhenIndigentFlag === 'Y') {
                  element.coCreditWhenIndigentFlag = 'Y';
               }
               if (element.coCreditWhenIndigentFlag === 'N') {
                  element.coCreditWhenIndigentFlag = null;
               }
               if (element.activeFlag === 'Y') {
                  element.activeFlag = 'Y';
               } else {
                  element.activeFlag = null;
               }
               element['isSaved'] = true;
            });
            this.cslddpData = data;
            this.allocProfRowData = data;
            this.tableIndex = 0;
            this.otmalproPopulateDetails(this.cslddpModel);
            this.acFlg = false;
            this.forAlAllflg = false;
            this.dateDisabled = false;
            this.cslddpModel = this.cslddpData[this.csldDpIndex];
            this.savebtnupdatedModel = JSON.parse(JSON.stringify(this.cslddpModel));
         }
         if (data.length === 0) {
            this.cslddpModel = new CaseloadDeductionProfiles();
            this.csldddData = [];
            this.allocProfRowData = [];
            //this.show(this.translateService.translate('common.querycaused'));
            return;
         }
      });
   }
   /**
   * This function loads the data into the Master Record and its child records
   */
   otmalproPopulateDetails(event) {
      this.cslddpModel.deductionType = this.cslddpModel.deductionType;
      this.cslddpModel.caseloadId = this.sessionManager.currentCaseLoad;
      const serviceObj = this.otmalproFactory.csldDdExecuteQuery(this.cslddpModel);
      serviceObj.subscribe(data => {
         if (data.length > 0) {
            this.csldddData = data;
            this.dialogFlg = 'N';
            this.allocationIndex = 0;
         } else {
            this.csldddData = [];
         }
      });
   }
   gridValidations1(data: any[]) {
      const validation = { isValid: true };
      data.forEach(ele => {
         if (!ele.deductionType) {
            this.show(this.translateService.translate('otmalpro.allocationtypemustbe'));
            return false;
         }
         if (!ele.accountCode) {
            this.show(this.translateService.translate('otmalpro.creditallocationmustbe'));
            return false;
         }
         if (!ele.effectiveDate) {
            this.show('otmalpro.eftedtemstbeentr');
            return false;
         }
      });

      if (this.datevalid) {
         this.show(this.translateService.translate('otmalpro.theeffective'));
         return;
      }
      if (this.rowAlreadyexists) {
         this.show(this.translateService.translate('otmalpro.rowalreadyexists'));
         return;
      }
      return validation.isValid;
   }

   isDuplicate() {
      this.duplicateExists = false;
      const rowData = this.csldddData;
      const validation = { isValid: true };
      rowData.forEach(ele => {
         const repeat = rowData.filter(dup => ele.receiptTxnType === dup.receiptTxnType);
         if (repeat && repeat.length > 1) {
            this.duplicateExists = true;
            const msg = this.translateService.translate('otmalpro.receipttype').replace('%csldDdreceiptTxnType%', ele.receiptTxnType)
               .replace('%csldDpdeductionType%', this.cslddpModel.deductionType).replace('%caseloadId%', this.sessionManager.currentCaseLoad);
            this.show(msg);
            validation.isValid = false;
            return;
         }
      });
      return validation.isValid;
   }
   onGridInsert = () => {
      this.dialogFlg = 'N';
      if (!this.cslddpModel['isSaved']) {
         this.show('otmtfpro.ucntcrtwoprnt');
         return null;
      }
      if (this.csldddData.length > 0) {
         if (!this.csldddData[this.csldddData.length - 1].receiptTxnType) {
            this.show(this.translateService.translate('otmalpro.allocationonreceiptmust'));
            return null;

         }
         if (!this.csldddData[this.csldddData.length - 1].percentage) {
            this.show(this.translateService.translate('otmalpro.percentagemustbeentered'));
            return null;

         }

      }
      return { receiptTxnType: '' };
   }
   validateRowData = (event) => {
      this.percentageExists = false;
      const rowdata = new ValidateRowReturn();
      const index = event.rowIndex;
      if (event.field === 'receiptTxnType' && event.newValue) {
         this.isDuplicate();

      }
      if (event.field === 'percentage' && event.newValue &&
         (Number(event.newValue) < 0 || Number(event.newValue) > 100)) {
         this.percentageExists = true;
         this.show('otmalpro.mstbeofform');
         this.grid.setColumnData('percentage', index, null);
         this.grid.setColumnData('csldddData', index, null);
      }
      rowdata.validated = true;

      if (event && event.field === 'activeFlag') {
         (event.data.activeFlag) ? this.allocProfGrid.setColumnData('expiryDate', index, null) :
            this.allocProfGrid.setColumnData('expiryDate', index, DateFormat.getDate());
      }

      if (event && event.field === 'deductionType') {
         this.rowAlreadyexists = false;
         this.saved = false;
         this.allocTypeChange(event);
         if (this.calculate === 'OB') {
            this.allocProfGrid.setColumnData('nbtModifyUserId', index, 'OB');
            this.allocProfGrid.setColumnData('effectiveDate', index, DateFormat.getDate());
            this.allocProfGrid.setColumnData('listSeq', index, 99);

         }
      }
      return rowdata;
   }

   //  /**
   //   *  This function will be executed when commit event is
   //  * fired
   //  */
   otmalproSavecslddpForm(event) {
      if (!this.gridValidations1(this.cslddpData)) {
         return null;
      }
      this.cslddpInsertList = event.added;
      this.cslddpUpdatetList = event.updated;
      this.cslddpDeleteList = event.removed;
      this.cslddpCommitModel.insertList = [];
      this.cslddpCommitModel.updateList = [];
      this.cslddpCommitModel.deleteList = [];
      if (this.bothamount) {
         if (this.cslddpModel.maxMonthlyAmount && this.cslddpModel.maxTotalAmount) {
            this.show(this.translateService.translate('otmalpro.amonthlymax'));
         }
         return;

      }
      for (let i = 0; i < this.cslddpData.length; i++) {
         for (let j = 0; j < this.cslddpData.length; j++) {
            if (i !== j && (this.cslddpData[i].deductionType.trim() === this.cslddpData[j].deductionType.trim())) {
               this.type = 'warn';
               this.message = this.translateService.translate('Transaction type %deductionType% already exist.');
               this.message = String(this.message).replace('%deductionType%', this.cslddpData[j].deductionType);
               this.show(this.message);
               return;
            }
         }
      }

      if (this.cslddpInsertList.length > 0) {
         for (let i = 0; i < this.cslddpInsertList.length; i++) {
            if (this.cslddpInsertList[i].effectiveDate && DateFormat.compareDate(DateFormat.getDate(this.cslddpInsertList[i].effectiveDate),DateFormat.getDate())===-1) {
               this.show(this.translateService.translate('otmalpro.theeffective'));
               return;
            }

            if (this.cslddpInsertList[i].expiryDate && this.cslddpInsertList[i].effectiveDate && DateFormat.compareDate(DateFormat.getDate(this.cslddpInsertList[i].effectiveDate),DateFormat.getDate(this.cslddpInsertList[i].expiryDate))===1) {
               this.show(this.translateService.translate('otmalpro.effectivedategreterthanexpirtdate'));
               return;
            }
            this.cslddpInsertList[i].caseloadId = this.sessionManager.currentCaseLoad;
            this.cslddpInsertList[i].fifoFlag = 'Y';
            this.cslddpInsertList[i].percentage = 0;
            this.cslddpInsertList[i].createUserId = this.sessionManager.getId();
            this.cslddpInsertList[i].createDatetime = DateFormat.getDate();
            this.cslddpInsertList[i].modifyDate = DateFormat.getDate();
            this.cslddpInsertList[i].activeFlag = this.cslddpInsertList[i].activeFlag ? 'Y' : 'N';
            this.cslddpInsertList[i].foAlAllOffenderFlag = this.cslddpInsertList[i].foAlAllOffenderFlag ? 'Y' : 'N';
            this.cslddpInsertList[i].coCreditWhenIndigentFlag = 'Y';
            if (this.cslddpInsertList[i].foAlAllOffenderFlag === null) {
               this.cslddpInsertList[i].foAlAllOffenderFlag = 'N';
            }
         }
         this.cslddpCommitModel.insertList = this.cslddpInsertList;
      }
      if (this.cslddpUpdatetList.length > 0) {
         for (let i = 0; i < this.cslddpUpdatetList.length; i++) {
            if (this.cslddpUpdatetList[i].effectiveDate && DateFormat.compareDate(DateFormat.getDate(this.cslddpUpdatetList[i].effectiveDate),DateFormat.getDate())==-1) {
               this.show(this.translateService.translate('otmalpro.theeffective'));
               return;
            }

            if (this.cslddpUpdatetList[i].expiryDate && this.cslddpUpdatetList[i].effectiveDate && DateFormat.compareDate(DateFormat.getDate(this.cslddpUpdatetList[i].effectiveDate),DateFormat.getDate(this.cslddpUpdatetList[i].expiryDate))===1) {
               this.show(this.translateService.translate('otmalpro.effectivedategreterthanexpirtdate'));
               return;
            }
            this.cslddpUpdatetList[i].activeFlag = this.cslddpUpdatetList[i].activeFlag ? 'Y' : 'N';
            this.cslddpUpdatetList[i].foAlAllOffenderFlag = this.cslddpUpdatetList[i].foAlAllOffenderFlag ? 'Y' : 'N';

            if (this.cslddpUpdatetList[i].foAlAllOffenderFlag === null) {
               this.cslddpUpdatetList[i].foAlAllOffenderFlag = 'N';
            }
            this.cslddpUpdatetList[i].coCreditWhenIndigentFlag = 'Y';
         }
         this.cslddpCommitModel.updateList = this.cslddpUpdatetList;
      }
      if (this.cslddpDeleteList.length > 0) {
         for (let i = 0; i < this.cslddpDeleteList.length; i++) {
         }
         this.cslddpCommitModel.deleteList = this.cslddpDeleteList;
      }
      this.saved = false;
      const cslddpSaveData = this.otmalproFactory.csldDpCommit(this.cslddpCommitModel);
      cslddpSaveData.subscribe(data => {
         if (String(data) === '1') {
            this.show('common.addupdateremoverecordsuccess', 'success');
            this.saved = true;
         }
         else if(String(data)==='101'){
            this.show('otmalpro.childRecordFound', 'warn');
            return;
         }
         else if (String(data) === '5') {
            this.show('otmalpro.offdedcsldddf1');
         } else if (String(data).includes('deduction_profiles_pk')) {
            this.show('otmalpro.rowalreadyexists');
         } else if (String(data).includes('?')) {
            this.show('common.addupdateremoverecordfailed', 'error');
         }
         this.cslddpModel = new CaseloadDeductionProfiles();
         this.cslddpModel.listSeq = 99;
         this.otmalproexecuteQuery();
      });
   }

   csldddExecuteQuery() {
      const csldddResult = this.otmalproFactory.csldDdExecuteQuery(this.csldddModel);
      csldddResult.subscribe(data => {
         if (data.length > 0) {
            this.csldddData = data;
         }

      });
   }
   /**
    *  This function will be executed when commit event is
   * fired
   */
   otmalproSavecsldddForm(event) {
      this.csldddInsertList = event.added;
      this.csldddUpdatetList = event.updated;
      this.csldddDeleteList = event.removed;
      this.csldddCommitModel.insertList = [];
      this.csldddCommitModel.updateList = [];
      this.csldddCommitModel.deleteList = [];

      if (this.percentageExists) {
         this.show('otmalpro.mstbeofform');
         return;

      }
      if (this.csldddInsertList.length > 0) {
         for (let i = 0; i < this.csldddInsertList.length; i++) {
            if (!this.csldddInsertList[i].receiptTxnType) {
               this.show(this.translateService.translate('otmalpro.allocationonreceiptmust'));
               return;
            }
            if (!this.csldddInsertList[i].percentage) {
               this.show(this.translateService.translate('otmalpro.percentagemustbeentered'));
               return;
            }
            if (this.duplicateExists) {
               const msg = this.translateService.translate('otmalpro.receipttype').replace('%csldDdreceiptTxnType%',
                  this.csldddInsertList[i].receiptTxnType)
                  .replace('%csldDpdeductionType%', this.cslddpModel.deductionType).replace('%caseloadId%',
                     this.sessionManager.currentCaseLoad);
               this.show(msg);
               return;
            }
            if (this.dialogFlg === 'Y') {
               this.csldddInsertList[i].dialogFlg = 'Y';
            }
            if (this.dialogFlg === 'N') {
               this.csldddInsertList[i].dialogFlg = 'N';

            }
            if (this.cslddpModel.foAlAllOffenderFlag === 'Y') {
               this.csldddInsertList[i].foFlag = 'Y';
            }
            if (this.cslddpModel.foAlAllOffenderFlag === null) {
               this.csldddInsertList[i].foFlag = null;

            }
            this.csldddInsertList[i].caseloadId = this.sessionManager.currentCaseLoad;
            this.csldddInsertList[i].deductionType = this.cslddpModel.deductionType;
            this.csldddInsertList[i].nbtModifyUserId = this.cslddpModel.nbtModifyUserId;
         }
         this.csldddCommitModel.insertList = this.csldddInsertList;
      }
      if (this.csldddUpdatetList.length > 0) {
         for (let i = 0; i < this.csldddUpdatetList.length; i++) {
            if (!this.csldddUpdatetList[i].receiptTxnType) {
               this.show(this.translateService.translate('otmalpro.allocationonreceiptmust'));
               return;
            }
            if (!this.csldddUpdatetList[i].percentage) {
               this.show(this.translateService.translate('otmalpro.percentagemustbeentered'));
               return;
            }
            if (this.cslddpModel.foAlAllOffenderFlag === 'Y') {
               this.csldddUpdatetList[i].foFlag = 'Y';
            }
            if (this.cslddpModel.foAlAllOffenderFlag) {
               this.csldddUpdatetList[i].foFlag = 'Y';
            } else {
               this.csldddUpdatetList[i].foFlag = null;
            }
            if (this.cslddpModel.foAlAllOffenderFlag === null) {
               this.csldddUpdatetList[i].foFlag = null;

            }
            if (this.dialogFlg === 'Y') {
               this.csldddUpdatetList[i].dialogFlg = 'Y';
            }
            if (this.dialogFlg === 'N') {
               this.csldddUpdatetList[i].dialogFlg = 'N';

            }
            this.csldddUpdatetList[i].nbtModifyUserId = this.cslddpModel.nbtModifyUserId;
         }
         this.csldddCommitModel.updateList = this.csldddUpdatetList;
      }
      if (this.csldddDeleteList.length > 0) {
         for (let i = 0; i < this.csldddDeleteList.length; i++) {
            if (this.dialogFlg === 'Y') {
               this.csldddDeleteList[i].dialogFlg = 'Y';
            }
            if (this.dialogFlg === 'N') {
               this.csldddDeleteList[i].dialogFlg = 'N';

            }
            if (this.cslddpModel.foAlAllOffenderFlag) {
               this.csldddDeleteList[i].foFlag = 'Y';
            } else {
               this.csldddDeleteList[i].foFlag = null;
            }
            if (this.cslddpModel.foAlAllOffenderFlag === null) {
               this.csldddDeleteList[i].foFlag = null;

            }
            this.csldddDeleteList[i].nbtModifyUserId = this.cslddpModel.nbtModifyUserId;
         }
         this.csldddCommitModel.deleteList = this.csldddDeleteList;
      }
      const csldddSaveData = this.otmalproFactory.csldDdCommit(this.csldddCommitModel);
      csldddSaveData.subscribe(data => {
         if (data === 1) {
            this.show('common.addupdateremoverecordsuccess', 'success');
            this.otmalproPopulateDetails(this.cslddpModel);
            return;
         }
         if (data === 6) {
            const dataB = {
               label: this.translateService.translate(
                  this.translateService.translate('otmalpro.percetagedialog')),
               yesBtn: true, noBtn: true
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dataB, 30).subscribe(result => {
               if (result) {
                  this.dialogFlg = 'Y';
                  this.otmalproSavecsldddForm(event);

               } else {
                  this.grid.setColumnData('percentage', this.csldddData.indexOf(event.updated), 40);
               }
            });
         } else {
            this.show('common.addupdateremoverecordfailed', 'warn');
            return;
         }
      });
   }

   onGridReady = () => {
      this.csldDdInsert = false;
      this.csldddData = [];
      return {
         activeFlag: true,
         coCreditWhenIndigentFlag: true,listSeq: 99
      }
   }

   onGridClear = () => {
      this.cslddpModel = new CaseloadDeductionProfiles();
      this.csldddData = [];
      this.allocProfRowData = [];
      this.acFlg = true;
      this.forAlAllflg = true;
      this.activeFlag = 'Y';
      this.coCreditWhenIndigentFlag = 'Y';
      this.dateDisabled = true;
      this.cslddpModel.listSeq = 99
      this.otmalproexecuteQuery();
      return true;
   }

   validateRowData1 = (event) => {
      this.percentageExists = false;
      const rowIndex = event.rowIndex;
      const rowdata = new ValidateRowReturn();
      rowdata.validated = true;
      if (event.field === 'deductionType' && (event.newValue !== event.oldValue || event.newValue.trim() === event.oldValue)) {
         this.allocProfGrid.setColumnData('nbtModifyUserId', rowIndex,(event.data.deductionType)?(this.deductionTypesList.filter(ele=>ele.deductionType===event.data.deductionType)[0].calculateON):undefined);
         const alloctypeSaveData = this.otmalproFactory.allocTypeValidation(event.data.deductionType.trim(), this.sessionManager.currentCaseLoad);
         alloctypeSaveData.subscribe(data => {
            if (data && data === 'Y') {
               this.allocTypeValid = true;
               this.type = 'warn';
               this.message = this.translateService.translate('Transaction type %deductionType% already exist.');
               this.message = String(this.message).replace('%deductionType%', event.data.deductionType);
               this.show(this.message);
               return;
            } else {
               this.allocTypeValid = false;
            }
         });
      }
      if (event.field === 'effectiveDate' && event.data.effectiveDate) {
         if (event.data.effectiveDate && DateFormat.compareDate(DateFormat.getDate(event.data.effectiveDate),DateFormat.getDate())===-1) {
            this.show(this.translateService.translate('otmalpro.theeffective'));
            rowdata.validated = true;
            return rowdata;
         }
         if (event.data.expiryDate && event.data.effectiveDate &&  DateFormat.compareDate(DateFormat.getDate(event.data.effectiveDate),DateFormat.getDate(event.data.expiryDate))===1) {
            this.show(this.translateService.translate('otmalpro.effectivedategreterthanexpirtdate'));
            rowdata.validated = true;
            return rowdata;
         }
      }


      if (event.field === 'maxMonthlyAmount') {
         if (event.data.maxMonthlyAmount) {
            this.allocProfGrid.setColumnData('maxTotalAmount', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
         }
      }
      if (event.field === 'maxTotalAmount') {
         if (event.data.maxTotalAmount) {
            this.allocProfGrid.setColumnData('maxMonthlyAmount', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
         }
      }
      if (event) {
         this.rowAlreadyexists = false;
         this.saved = false;
         const fromBal = this.otmalproFactory.getfromBalTypes(event.newValue);
         fromBal.subscribe(ob => {
            if (ob) {
               this.nbtModifyUserId = ob;
               this.effectiveDate = DateFormat.getDate();
               this.listSeq = 99;
            }
         });
      }
      if (event && event.field === 'activeFlag') {
         (event.data.activeFlag) ? this.allocProfGrid.setColumnData('expiryDate', rowIndex, null) :
            this.allocProfGrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate());
      }
      rowdata.validated = true;
      return rowdata;
   }

   allocTypeChange(event) {
      const fromBal = this.otmalproFactory.getfromBalTypes(event.newValue);
      fromBal.subscribe(ob => {
         if (ob) {
            this.calculate = ob;
         }
      });
   }

   onRowClickdata(event) {
      if (event && event.createUserId) {
         this.deleteButton = true;
         this.cslddpModel = new CaseloadDeductionProfiles();
         if (event && event.caseloadId && event.deductionType) {
            this.cslddpModel = event;
            if (this.cslddpModel.deductionType) {
               this.csldDdInsert = true;
            }
            this.otmalproPopulateDetails(this.cslddpModel);
         } else {
            this.cslddpData = [];
         }
      } else {
         this.deleteButton = false;
         this.csldDdInsert = false;
         this.csldddData = [];
      }
   }

   onGridDelete = () => {
      if (this.csldddData && this.csldddData.length > 0) {
          this.show(this.translateService.translate('otmalpro.childRecordFound'));
          return;
      }
      return true;
  }
   getAllocationType() {
      const allocationData = this.otmalproFactory.getAllocationType(this.sessionManager.currentCaseLoadType);
      allocationData.subscribe(data => {
         if(data.length>0)
         this.deductionTypesList=data;
      });
   }
}
