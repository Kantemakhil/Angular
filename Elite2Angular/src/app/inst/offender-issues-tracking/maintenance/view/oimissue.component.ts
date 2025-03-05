import {
   Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OimissueService } from '../service/oimissue.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { GrievanceTypes } from '../beans/GrievanceTypes';
import { GrievanceReasons } from '../beans/GrievanceReasons';
import { GrievanceTxns } from '../beans/GrievanceTxns';
import { GrievanceTypesCommitBean } from '../beans/GrievanceTypesCommitBean';
import { GrievanceReasonsCommitBean } from '../beans/GrievanceReasonsCommitBean';
import { GrievanceTxnsCommitBean } from '../beans/GrievanceTxnsCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';


@Component({
   selector: 'app-oimissue',
   templateUrl: './oimissue.component.html'
})

export class OimissueComponent implements OnInit {
   gridReaDel = true;
   @ViewChild('grivetypesgrid') grivetypesgrid: any;
   @ViewChild('grivereasongrid') grivereasongrid: any;
   @ViewChild('grivetxngrid') grivetxngrid: any;

   actionName: string;
   lovModel: any[];
   msgs: any[] = [];
   nameOfLovPage: string;
   listToCompare: any[] = [];
   grievancetypesData: GrievanceTypes[] = [];
   grievancetypesDataTemp: GrievanceTypes[] = [];
   grievancetypesModel: GrievanceTypes = new GrievanceTypes();
   grievancetypesSearchModel: GrievanceTypes = new GrievanceTypes();
   grievancetypesIndex: Number = 0;
   grievancetypesInsertList: GrievanceTypes[] = [];
   grievancetypesUpdatetList: GrievanceTypes[] = [];
   grievancetypesDeleteList: GrievanceTypes[] = [];
   grievancereasonsData: GrievanceReasons[] = [];
   grievancereasonsDataTemp: GrievanceReasons[] = [];
   grievancereasonsModel: GrievanceReasons = new GrievanceReasons();
   grievancereasonsIndex: Number = 0;
   grievancereasonsInsertList: GrievanceReasons[] = [];
   grievancereasonsUpdatetList: GrievanceReasons[] = [];
   grievancereasonsDeleteList: GrievanceReasons[] = [];
   grievancetxnsData: GrievanceTxns[] = [];
   grievancetxnsDataTemp: GrievanceTxns[] = [];
   grievancetxnsModel: GrievanceTxns = new GrievanceTxns();
   tabSecurityEnable: GrievanceTxns = new GrievanceTxns();
   grievancetxnsIndex: Number = 0;
   grievancetxnsInsertList: GrievanceTxns[] = [];
   grievancetxnsUpdatetList: GrievanceTxns[] = [];
   grievancetxnsDeleteList: GrievanceTxns[] = [];
   minDate: Date;
   display: boolean;
   errorMessage: string;
   headerMessage: string;
   disabled: boolean;
   editable: Boolean = true;
   grievanceTypesColumnDef: any[];
   grievanceReasonsColumnDef: any[];
   grievanceTxnsColumnDef: any[];
   grievanceTypesReadOnly: Boolean = false;
   grievanceReasonsReadOnly: Boolean = false;
   grievanceTxnsReadOnly: Boolean = false;
   grievancetypesCommitModel: GrievanceTypesCommitBean = new GrievanceTypesCommitBean();
   grievancereasonsCommitModel: GrievanceReasonsCommitBean = new GrievanceReasonsCommitBean();
   grievancetxnsCommitModel: GrievanceTxnsCommitBean = new GrievanceTxnsCommitBean();
   tableIndex: number;
   tableIndexReason: number;
   tableIndexTxn: number;
   retriveDisabled: boolean;
   clearDisabled: boolean;
   namesReadOnly: boolean;
   childRecordCount: any;
   reasonGridDelete: boolean;
   enableIfRowDatExist: boolean;
   txnGridDelete: boolean;
   reasonTabEnable: boolean;
   txnTabEnable: boolean;
   updateReasonGrid: boolean;
   updateTxnGrid: boolean;
   offChekEnable: any;
   childRecordCountReason: any;
   constructor(private oimissueFactory: OimissueService, public translateService: TranslateService,
         public sessionManager: UserSessionManager) {
         this.grievanceTypesColumnDef = [];
         this.grievanceReasonsColumnDef = [];
         this.grievanceTxnsColumnDef = [];
   }
   ngOnInit() {
         this.retriveDisabled = false;
         this.clearDisabled = true;
         this.namesReadOnly = false;
         this.enableIfRowDatExist = false;
         this.reasonGridDelete = false;
         this.txnGridDelete = false;
         this.updateTxnGrid = true;
         this.updateReasonGrid = true;
         this.grievanceTypesColumnDef = [
               {
                     fieldName: this.translateService.translate('oimissue.issuetype') + '*', field: 'grievType', editable: true,
                     width: 150, datatype: 'text', uppercase: 'false', maxlength: 12, cellEditable: this.canAlertEdit,
               },
               {
                     fieldName: this.translateService.translate('common.description') + '*', field: 'description',
                      editable: true, width: 150, datatype: 'text', uppercase: 'false', maxlength: 24
               },
               { fieldName: this.translateService.translate('oimissue.staffinvolved') , field: 'staffInvolvedFlag', editable: true, width: 150, datatype: 'checkbox' },
               {
                     fieldName: this.translateService.translate('common.sequencename'), field: 'listSeq', editable: true, width: 150
                     , maxValue: '999', strictFP: true, whole: true, datatype: 'number'
               },
               { fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true,
                width: 150, datatype: 'checkbox' },
               { fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
                width: 150, datatype: 'date' },
         ];
         this.grievanceReasonsColumnDef = [
               {
                     fieldName: this.translateService.translate('oimissue.issuereason') + '*', field: 'grievReasonCode',
                      editable: true, width: 150,
                     datatype: 'text', uppercase: 'false', maxlength: 12, cellEditable: this.canAlertEdit,
               },
               {
                     fieldName: this.translateService.translate('common.description') + '*', field: 'description', editable: true,
                     width: 150
                     , datatype: 'text', uppercase: 'false', maxlength: 24, cellEditable: this.canAlertEditTabSecReason,
               },
               {
                     fieldName: this.translateService.translate('common.sequencename'), field: 'listSeq', editable: true, width: 150
                     , maxValue: '999', strictFP: true, whole: true, datatype: 'number',
                     cellEditable: this.canAlertEditTabSecReason,
               },
               {
                     fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 150,
                     datatype: 'checkbox', cellEditable: this.canAlertEditTabSecReasonFlag,
               },
               {
                     fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false, width: 150,
                     datatype: 'date'
               },
         ];
         this.grievanceTxnsColumnDef = [
               {
                     fieldName: this.translateService.translate('oimissue.transaction') + '*', field: 'txnType',
                      editable: true, width: 150
                     , datatype: 'text', uppercase: 'false', maxlength: 12, cellEditable: this.canAlertEdit,
               },
               {
                     fieldName: this.translateService.translate('common.description') + '*', field: 'description', editable: true,
                      width: 150 , datatype: 'text', uppercase: 'false', maxlength: 24, cellEditable: this.canAlertEditTabSecTxn,
               },
               {
                     fieldName: this.translateService.translate('oimissue.daystorespond'), field: 'daysRespond', editable: true,
                     width: 150, minValue: '0', maxValue: '99', strictFP: true, whole: true, datatype: 'number',
                      cellEditable: this.canAlertEditTabSecTxn,
               },
               {
                     fieldName: this.translateService.translate('oimissue.offender'), field: 'offRspFlag', editable: true, width: 150,
                     datatype: 'checkbox', cellEditable: this.canAlertEditTabSecTxn,
               },
               {
                     fieldName: this.translateService.translate('oimissue.agency'), field: 'docRspFlag', editable: true, width: 150,
                     datatype: 'checkbox', cellEditable: this.canAlertEditTabSecTxn,
               },
               {
                     fieldName: this.translateService.translate('oimissue.supervisor'), field: 'igRspFlag', editable: true, width: 150,
                     datatype: 'checkbox', cellEditable: this.canAlertEditTabSecTxn,
               },
               {
                     fieldName: this.translateService.translate('common.sequencename'), field: 'listSeq', editable: true, width: 150
                     , maxValue: '999', strictFP: true, whole: true, datatype: 'number',
                      cellEditable: this.canAlertEditTabSecTxn,
               },
               {
                     fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 150,
                     datatype: 'checkbox', cellEditable: this.canAlertEditTabSecTxn,
               },
               {
                     fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false, width: 150,
                     datatype: 'date'
               },
         ];
         this.getTabSecuityEnable();
         this.oimissueexecuteQuery();
   }

   /**
    * This function is called to is this cell in the grid is deletable or not
    */
   canAlertEditTabSecReason = (data: any, index: number, field: string): boolean => {
         if (this.reasonTabEnable) {
               return true;
         } else {
               return false;
         }
   }

   canAlertEditTabSecReasonFlag = (data: any, index: number, field: string): boolean => {
         if (this.reasonTabEnable) {
               return true;
         } else {
               return false;
         }
   }

   canAlertEditTabSecTxn = (data: any, index: number, field: string): boolean => {
         if (this.txnTabEnable) {
               return true;
         } else {
               return false;
         }
   }
   get allowEdit() {
         if (!this.reasonTabEnable) {
               this.enableIfRowDatExist = false;
               this.reasonGridDelete = false;
               return true;
         }
         this.reasonGridDelete = true;
         return false;
   }
   get allowEditTxns() {
         if (!this.txnTabEnable) {
               this.enableIfRowDatExist = false;
               this.txnGridDelete = false;
               return true;
         }
         this.txnGridDelete = true;
         return false;
   }
   getTabSecuityEnable() {
         const serviceObj = this.oimissueFactory.getTabSecuityEnable();
         serviceObj.subscribe(data => {
               this.tabSecurityEnable = data;
               if (this.tabSecurityEnable.reasonsTabSecurity === null) {
                     this.show(this.translateService.translate('oimissue.tabsecuritynull'), 'warn');
               } else {
                     if (this.tabSecurityEnable.reasonsTabSecurity === 'A') {
                           this.reasonTabEnable = true;
                     } else {
                           this.reasonTabEnable = false;
                     }
               }
               if (this.tabSecurityEnable.txnTabSecurity === null) {
                     this.show(this.translateService.translate('oimissue.tabsecuritynull'), 'warn');
               } else {
                     if (this.tabSecurityEnable.txnTabSecurity === 'A') {
                           this.txnTabEnable = true;
                     } else {
                           this.txnTabEnable = false;
                     }
               }
               this.oimissueexecuteQuery();
         });
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
    * This function is caled when clicked on the grievence type grid
    */
   onRowClickgrievancetypes(event) {
         if (event) {
               this.grievancetypesModel = event;
               if (this.grievancetypesModel.grievType) {
                     this.grievancereasonsModel.grievType = this.grievancetypesModel.grievType;
                     this.grievancetxnsModel.grievType = this.grievancetypesModel.grievType;
                     this.grievancereasonsExecuteQuery();

               }
               if (this.grievancetypesModel.createDatetime) {
                     this.enableIfRowDatExist = true;
               } else {
                     this.enableIfRowDatExist = false;
                     this.grievancereasonsData = [];
                     this.grievancereasonsModel = new GrievanceReasons();
                     this.grievancetxnsData = [];
                     this.grievancetxnsModel = new GrievanceTxns();
               }
         }
   }
   /**
    * This function is caled when clicked on the clear button to clear the data in grids and search fields
    */
   clear() {
         this.grievancetypesData = [];
         this.grievancetypesModel = new GrievanceTypes();
         this.grievancetypesSearchModel = new GrievanceTypes();
         this.grievancereasonsData = [];
         this.grievancereasonsModel = new GrievanceReasons();
         this.grievancetxnsData = [];
         this.grievancetxnsModel = new GrievanceTxns();
         this.retriveDisabled = false;
         this.clearDisabled = true;
         this.namesReadOnly = false;
         this.enableIfRowDatExist = false;
   }
   /**
    * This function is caled when entered data in the search fields to validate the fields is insertable or not
    */
   isInsertable(date?) {
         if (this.grievancetypesSearchModel.grievType || this.grievancetypesSearchModel.description) {
               this.clearDisabled = false;
         } else {
               this.clearDisabled = true;
         }
         if (date) {
               this.clearDisabled = false;
         }
   }
   /** 
    * This function is caled when clicked on the grievence Reasons grid
    */
   onRowClickgrievancereasons(event) {
         if (event) {
               this.grievancereasonsModel = event;
               this.grievancereasonsModel.grievType = this.grievancetypesModel.grievType;
         }
         if (this.grievancereasonsModel.grievType && this.grievancereasonsModel.grievReasonCode) {
               this.keyDeleteReasonValidation();
         }

         if (this.reasonTabEnable && this.grievancereasonsModel.createDatetime) {
               this.reasonGridDelete = true;
               this.updateReasonGrid = true;
         } else {
               this.reasonGridDelete = false;
               this.updateReasonGrid = false;
         }
         if (!this.reasonTabEnable) {
               this.enableIfRowDatExist = false;
         }
   }

   /**
    * This function is caled when clicked on transaction grid delete button to vaidate the record is deletable or not
    */
   onGridReasonDelete = () => {
         if (this.childRecordCountReason > 0) {
               this.show(this.translateService.translate('common.cannotdeletemaster'), 'warn');
               return false;
         }
         return true;
   }

   /**
    * This function is caled when clicked on the grivence transaction rowo in the grid to get parent data infos
    */
   keyDeleteReasonValidation() {
         const serviceObj = this.oimissueFactory.onDeleteReasons(this.grievancereasonsModel);
         serviceObj.subscribe(data => {
               if (data > 0) {
                     this.childRecordCountReason = data.deleteCountRecord;
               } else {
                     this.childRecordCountReason = data.deleteCountRecord;
               }
         });
   }

   /**
    * This function is caled when clicked on the grievence Transactions grid
    */
   onRowClickgrievancetxns(event) {
         if (event) {
               this.grievancetxnsModel = event;
               this.grievancetxnsModel.grievType = this.grievancetypesModel.grievType;
         }
         if (this.grievancetxnsModel.grievType && this.grievancetxnsModel.txnType) {
               this.keyDeleteRecordValidation();
         }
         if (this.txnTabEnable && this.grievancetxnsModel.createDatetime) {
               this.txnGridDelete = true;
               this.updateTxnGrid = true;
         } else {
               this.txnGridDelete = false;
               this.updateTxnGrid = false;
         }

         if (!this.txnTabEnable) {
               this.enableIfRowDatExist = false;
         }
   }
   /**
    * This function is caled when clicked on the grivence transaction rowo in the grid to get parent data infos
    */
   keyDeleteRecordValidation() {
         const serviceObj = this.oimissueFactory.cgrichkMovementReasonsDeleteCheck(this.grievancetxnsModel);
         serviceObj.subscribe(data => {
               if (data > 0) {
                     this.childRecordCount = data.deleteRecordCount;
               } else {
                     this.childRecordCount = data.deleteRecordCount;
               }
         });
   }
   /**
    * This function is caled when clicked on transaction grid delete button to vaidate the record is deletable or not
    */
   onGridDelete = () => {
         if (this.childRecordCount > 0) {
               this.show(this.translateService.translate('common.cannotdeletemaster'), 'warn');
               return false;
         }
         return true;
   }
   /**
    * This function is called to is this cell in the grid is deletable or not
    */
   canAlertEdit = (data: any, index: number, field: string): boolean => {
         if (!data.createDatetime) {
               return true;
         } else {
               return false;
         }
   }

   /**
    * This function is called to validate the row data in Grievence Types Grid
    */
   validateRowData = (event) => {
         const rowIndex = event.rowIndex;
         const rowdata = new ValidateRowReturn();
         if (event.field === 'activeFlag') {
               if (event.data.activeFlag) {
                     this.grivetypesgrid.setColumnData('expiryDate', rowIndex, undefined);
                     rowdata.validated = true;
                     return rowdata;
               } else if (!event.data.activeFlag) {
                     this.grivetypesgrid.setColumnData('expiryDate', rowIndex,
                      DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                     rowdata.validated = true;
                     return rowdata;
               }
         }


         rowdata.validated = true;
         return rowdata;
   }
   /**
    * This function is called to validate the row data in Grievence Reasons Grid
    */
   validateRowDataReason = (event) => {
         const rowIndex = event.rowIndex;
         const rowdata = new ValidateRowReturn();
         if (event.field === 'activeFlag' && !this.reasonTabEnable && event.data.checkFlag !== event.newValue)  {
               this.grivereasongrid.setColumnData('activeFlag', rowIndex, event.data.checkFlag);
               rowdata.validated = true;
               return rowdata;
         }

         if (event.field === 'activeFlag') {
               if (event.data.activeFlag) {
                     this.grivereasongrid.setColumnData('expiryDate', rowIndex, undefined);
                     rowdata.validated = true;
                     return rowdata;
               } else if (!event.data.activeFlag) {
                     this.grivereasongrid.setColumnData('expiryDate', rowIndex,
                      DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                     rowdata.validated = true;
                     return rowdata;
               }
         }
         rowdata.validated = true;
         return rowdata;
   }
   /**
    * This function is called to validate the row data in Grievence Transactions Grid
    */
   validateRowDataTxn = (event) => {
         const rowIndex = event.rowIndex;
         const rowdata = new ValidateRowReturn();
         if (event.field === 'activeFlag' && !this.txnTabEnable && event.data.checkFlag !== event.newValue)  {
               this.grivetxngrid.setColumnData('activeFlag', rowIndex, event.data.checkFlag);
               rowdata.validated = true;
               return rowdata;
         } else if (event.field === 'offRspFlag' && !this.txnTabEnable && event.data.offFlag !== event.newValue)  {
               this.grivetxngrid.setColumnData('offRspFlag', rowIndex, event.data.offFlag);
               rowdata.validated = true;
               return rowdata;
         } else if (event.field === 'docRspFlag' && !this.txnTabEnable && event.data.agyFlag !== event.newValue)  {
               this.grivetxngrid.setColumnData('docRspFlag', rowIndex, event.data.agyFlag);
               rowdata.validated = true;
               return rowdata;
         } else if (event.field === 'igRspFlag' && !this.txnTabEnable && event.data.supFlag !== event.newValue)  {
               this.grivetxngrid.setColumnData('igRspFlag', rowIndex, event.data.supFlag);
               rowdata.validated = true;
               return rowdata;
         } else if (!this.txnTabEnable) {
               rowdata.validated = true;
               return rowdata;
         }
         if (event.field === 'activeFlag') {
               if (event.data.activeFlag) {
                     this.grivetxngrid.setColumnData('expiryDate', rowIndex, undefined);
                     rowdata.validated = true;
                     return rowdata;
               } else if (!event.data.activeFlag) {
                     this.grivetxngrid.setColumnData('expiryDate', rowIndex,
                      DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                     rowdata.validated = true;
                     return rowdata;
               }
         }
         if (event.field === 'offRspFlag' || event.field === 'docRspFlag' || event.field === 'igRspFlag') {
               let count = 0;
               if (event.data.offRspFlag) {
                     count = count + 1;
               }
               if (event.data.docRspFlag) {
                     count = count + 1;
               }
               if (event.data.igRspFlag) {
                     count = count + 1;
               }
               if (Number(count) > Number(1)) {
                     this.show(this.translateService.translate('oimissue.onecheckboxcheck'));
                     if (event.field === 'offRspFlag') {
                           this.grivetxngrid.setColumnData('offRspFlag', rowIndex, undefined);
                     }
                     if (event.field === 'docRspFlag') {
                           this.grivetxngrid.setColumnData('docRspFlag', rowIndex, undefined);
                     }
                     if (event.field === 'igRspFlag') {
                           this.grivetxngrid.setColumnData('igRspFlag', rowIndex, undefined);
                     }
                     rowdata.validated = true;
                     return rowdata;
               }
         }
         if (event.field === 'offRspFlag' || event.field === 'listSeq') {
               if (!event.data.offRspFlag && Number(event.data.listSeq) === 1) {
                     this.show(this.translateService.translate('oimissue.transseqone'));
                     rowdata.validated = true;
                     return rowdata;
               }
         }
         rowdata.validated = true;
         return rowdata;
   }
   /**
    * This function is called to when inserting the new record in Grivence Types grid to validate the fields
    */
   onGridInsert = () => {
         this.grievancereasonsData = [];
         this.grievancereasonsModel = new GrievanceReasons();
         this.grievancetxnsData = [];
         this.grievancetxnsModel = new GrievanceTxns();
         if (!this.oimissueTypesValidations()) {
               return;
         }
         return { activeFlag: true };
   }
   /**
    *This function will be executed when Types grid clear event is
    * fired
    */
   onGridClear = () => {
         this.oimissueexecuteQuery();
         return true;
   }
   /**
      *This function will be executed when Reasons grid clear event is
      * fired
      */
   onGridClearReason = () => {
         this.grievancereasonsExecuteQuery();
         return true;
   }
   /**
      *This function will be executed when Transactions grid clear event is
      * fired
      */
   onGridClearTxn = () => {
         this.grievancetxnsExecuteQuery();
         return true;
   }
   /**
    * This function is called to when inserting the new record in Grivence reasons grid to validate the fields
    */
   onGridInsertReason = () => {
         if (!this.oimissueRasonalidations()) {
               return;
         }
         return { activeFlag: true };
   }
   /**
    * This function is called to when inserting the new record in Grivence Transactions grid to validate the fields
    */
   onGridInsertTxn = () => {
         if (!this.oimissueTxnValidations()) {
               return false;
         }
         return {
               activeFlag: true,
               offRspFlag: true,
         };
   }
   /**
    * This function is used to validate the mandetory fields in the grid
    * while saving or inserting new row in Grivence Type Grid
    */
   oimissueTypesValidations() {
         const is = { valid: true };
         if (this.grievancetypesData && this.grievancetypesData) {
               this.grievancetypesData.forEach(element => {
                     if (element.grievType === undefined || !element.grievType.trim()) {
                           this.show(this.translateService.translate('oimissue.issuetypemandetory'), 'warn');
                           is.valid = false;
                           return is.valid;
                     }
                     if (element.description === undefined || !element.description.trim()) {
                           this.show(this.translateService.translate('oimissue.descriptionmandetory'), 'warn');
                           is.valid = false;
                           return is.valid;
                     }
               });
         }
         return is.valid;
   }
   /**
    * This function is used to validate the mandetory fields in the grid
    * while saving or inserting new row in Grivence Reasons Grid
    */
   oimissueRasonalidations() {
         const is = { valid: true };
         if (this.grievancereasonsData && this.grievancereasonsData) {
               this.grievancereasonsData.forEach(element => {
                     if (element.grievReasonCode === undefined || !element.grievReasonCode.trim()) {
                           this.show(this.translateService.translate('oimissue.issuereasonmandetory'), 'warn');
                           is.valid = false;
                           return is.valid;
                     }
                     if (element.description === undefined || !element.description.trim()) {
                           this.show(this.translateService.translate('oimissue.descriptionmandetory'), 'warn');
                           is.valid = false;
                           return is.valid;
                     }
               });
         }
         return is.valid;
   }
   /**
    * This function is used to validate the mandetory fields in the grid
    * while saving or inserting new row in Grivence Transactions Grid
    */
   oimissueTxnValidations() {
         const is = { valid: true };
         if (this.grievancetxnsData && this.grievancetxnsData) {
               this.grievancetxnsData.forEach(element => {
                     if (element.txnType === undefined || !element.txnType.trim()) {
                           this.show(this.translateService.translate('oimissue.transactionmandetory'), 'warn');
                           is.valid = false;
                           return is.valid;
                     }
                     if (element.description === undefined || !element.description.trim()) {
                           this.show(this.translateService.translate('oimissue.descriptionmandetory'), 'warn');
                           is.valid = false;
                           return is.valid;
                     }
               });
         }
         return is.valid;
   }
   /**
    *  This function will be executed when commit event is
   * fired
   */
   oimissueSavegrievancetypesForm(event) {
         if (!this.oimissueTypesValidations()) {
               return;
         }
         // TODO declare commit bean and add insert list to that object.
         this.grievancetypesInsertList = event.added;
         this.grievancetypesUpdatetList = event.updated;
         this.grievancetypesDeleteList = event.removed;
         this.grievancetypesCommitModel.insertList = [];
         this.grievancetypesCommitModel.updateList = [];
         this.grievancetypesCommitModel.deleteList = [];
         if (this.grievancetypesInsertList.length > 0 || this.grievancetypesUpdatetList.length > 0) {
               for (let i = 0; i < this.grievancetypesInsertList.length; i++) {
                     this.grievancetypesInsertList[i].modifiedUserId = this.sessionManager.getId();
                     this.grievancetypesInsertList[i].modifiedDatetime = DateFormat.getDate();
                     this.grievancetypesInsertList[i].activeFlag = this.grievancetypesInsertList[i].activeFlag ? 'Y' : 'N';
                     this.grievancetypesInsertList[i].staffInvolvedFlag = this.grievancetypesInsertList[i].staffInvolvedFlag ? 'Y' : 'N';
                     this.grievancetypesCommitModel.insertList = this.grievancetypesInsertList;
               }
               for (let i = 0; i < this.grievancetypesUpdatetList.length; i++) {
                     this.grievancetypesUpdatetList[i].modifiedDatetime = DateFormat.getDate();
                     this.grievancetypesUpdatetList[i].modifiedUserId = this.sessionManager.getId();
                     this.grievancetypesUpdatetList[i].staffInvolvedFlag = this.grievancetypesUpdatetList[i].staffInvolvedFlag ? 'Y' : 'N';
                     this.grievancetypesUpdatetList[i].activeFlag = this.grievancetypesUpdatetList[i].activeFlag ? 'Y' : 'N';
                     this.grievancetypesCommitModel.updateList = this.grievancetypesUpdatetList;
               }


         }
         if (this.grievancetypesDeleteList.length > 0) {
               for (let i = 0; i < this.grievancetypesDeleteList.length; i++) {
                     this.grievancetypesCommitModel.deleteList = this.grievancetypesDeleteList;
               }

         }
         const grievancetypesSaveData = this.oimissueFactory.grievanceTypesCommit(this.grievancetypesCommitModel);
         grievancetypesSaveData.subscribe(data => {
               if (String(data[0].errorMessage).indexOf('GRIEVANCE_TYPES_PK') > 0) {
                     this.show(this.translateService.translate('oimissue.primarykeyviolation'), 'warn');
                     this.oimissueexecuteQuery();
                     return;
               }
               if (data[0] && data[0].returnValue === 1) {
                     this.show('common.addupdateremoverecordsuccess', 'success');
                     this.oimissueexecuteQuery();
                     return;
               } else {
                     this.show('common.addupdateremoverecordfailed', 'warn');
                     this.oimissueexecuteQuery();
                     return;
               }
         });
   }
   /**
    * This function is used to retrive the information in Grivence Types Grid
    */
   oimissueexecuteQuery() {
         this.grivetxngrid.prepareAgColumnDef();
         const serviceObj = this.oimissueFactory.grievanceTypesExecuteQuery(this.grievancetypesSearchModel);
         serviceObj.subscribe(data => {
               if (data.length === 0) {
                     this.retriveDisabled = false;
                     this.namesReadOnly = false;
                     this.show('common.querycaused');
                     this.grievancereasonsData = [];
                     this.grievancereasonsModel = new GrievanceReasons();
                     this.grievancetxnsData = [];
                     this.grievancetxnsModel = new GrievanceTxns();
                     this.clear();
               } else {
                     data.forEach(element => {
                           element.activeFlag = element.activeFlag === 'Y' ? true : false;
                           element.staffInvolvedFlag = element.staffInvolvedFlag === 'Y' ? true : false;
                     });
                     this.grievancetypesData = data;
                     this.grievancetypesModel = this.grievancetypesData[0];
                     this.tableIndex = 0;
                     this.retriveDisabled = true;
                     this.clearDisabled = false;
                     this.namesReadOnly = true;
               }
         });
   }
   /**
    * This function is used to retrive the information in Grivence Reasons Grid
    */
   grievancereasonsExecuteQuery() {
         const grievancereasonsResult = this.oimissueFactory.grievanceReasonsExecuteQuery(this.grievancereasonsModel);
         grievancereasonsResult.subscribe(grievancereasonsResultList => {
               if (grievancereasonsResultList.length === 0) {
                     this.grievancereasonsData = [];
                     this.reasonGridDelete = false;
               } else {
                  if (this.grievancetypesModel && this.grievancetypesModel.grievType){
                     grievancereasonsResultList.forEach(element => {
                           element.activeFlag = element.activeFlag === 'Y' ? true : false;
                           element.checkFlag = element.checkFlag === 'Y' ? true : false;

                     });
                     this.grievancereasonsData = grievancereasonsResultList;
                     this.grievancereasonsModel = grievancereasonsResultList[0];
                     this.tableIndexReason = 0;
               }
            }
               this.grievancetxnsExecuteQuery();
         });
   }
   /**
    *  This function will be executed when commit event is
   * fired
   */
   oimissueSavegrievancereasonsForm(event) {
         if (!this.oimissueRasonalidations()) {
               return;
         }
         // TODO declare commit bean and add insert list to that object.
         this.grievancereasonsInsertList = event.added;
         this.grievancereasonsUpdatetList = event.updated;
         this.grievancereasonsDeleteList = event.removed;
         this.grievancereasonsCommitModel.insertList = [];
         this.grievancereasonsCommitModel.updateList = [];
         this.grievancereasonsCommitModel.deleteList = [];
         if (this.grievancereasonsInsertList.length > 0 || this.grievancereasonsUpdatetList.length > 0) {
               for (let i = 0; i < this.grievancereasonsInsertList.length; i++) {
                     this.grievancereasonsInsertList[i].grievType = this.grievancetypesModel.grievType;
                     this.grievancereasonsInsertList[i].modifiedUserId = this.sessionManager.getId();
                     this.grievancereasonsInsertList[i].modifiedDatetime = DateFormat.getDate();
                     this.grievancereasonsInsertList[i].activeFlag = this.grievancereasonsInsertList[i].activeFlag ? 'Y' : 'N';
                     this.grievancereasonsCommitModel.insertList = this.grievancereasonsInsertList;
               }
               for (let i = 0; i < this.grievancereasonsUpdatetList.length; i++) {
                     this.grievancereasonsUpdatetList[i].modifiedUserId = this.sessionManager.getId();
                     this.grievancereasonsUpdatetList[i].modifiedDatetime = DateFormat.getDate();
                     this.grievancereasonsUpdatetList[i].activeFlag = this.grievancereasonsUpdatetList[i].activeFlag ? 'Y' : 'N';
                     this.grievancereasonsCommitModel.updateList = this.grievancereasonsUpdatetList;
               }


         }
         if (this.grievancereasonsDeleteList.length > 0) {
               for (let i = 0; i < this.grievancereasonsDeleteList.length; i++) {
                     this.grievancereasonsCommitModel.deleteList = this.grievancereasonsDeleteList;
               }

         }
         const grievancereasonsSaveData = this.oimissueFactory.grievanceReasonsCommit(this.grievancereasonsCommitModel);
         grievancereasonsSaveData.subscribe(data => {
               if (String(data[0].errorMessage).indexOf('GRIEVANCE_REASONS_PK') > 0) {
                     this.show(this.translateService.translate('oimissue.primarykeyviolation'), 'warn');
                     this.grievancereasonsExecuteQuery();
                     return;
               }
               if (data[0] && data[0].returnValue === 1) {
                     this.show('common.addupdateremoverecordsuccess', 'success');
                     this.grievancereasonsExecuteQuery();
                     return;
               } else {
                     this.show('common.addupdateremoverecordfailed', 'warn');
                     this.grievancereasonsExecuteQuery();
                     return;
               }
         });
   }
   /**
    * This function is used to retrive the information in Grivence Transactions Grid
    */

   grievancetxnsExecuteQuery() {
         const grievancetxnsResult = this.oimissueFactory.grievanceTxnsExecuteQuery(this.grievancetxnsModel);
         grievancetxnsResult.subscribe(grievancetxnsResultList => {
               if (grievancetxnsResultList.length === 0) {
                     this.grievancetxnsData = [];
                     this.txnGridDelete = false;
               } else {
                  if (this.grievancetypesModel && this.grievancetypesModel.grievType){
                     grievancetxnsResultList.forEach(element => {
                           element.activeFlag = element.activeFlag === 'Y' ? true : false;
                           element.offRspFlag = element.offRspFlag === 'Y' ? true : false;
                           element.docRspFlag = element.docRspFlag === 'Y' ? true : false;
                           element.igRspFlag = element.igRspFlag === 'Y' ? true : false;
                           element.checkFlag = element.checkFlag === 'Y' ? true : false;
                           element.offFlag = element.offFlag === 'Y' ? true : false;
                           element.agyFlag = element.agyFlag === 'Y' ? true : false;
                           element.supFlag = element.supFlag === 'Y' ? true : false;
                     });
                     this.grievancetxnsData = grievancetxnsResultList;
                     this.grievancetxnsModel = grievancetxnsResultList[0];
                     this.tableIndexTxn = 0;
               }
            }
         });
   }
   /**
    *  This function will be executed when commit event is
   * fired
   */
   oimissueSavegrievancetxnsForm(event) {
         if (!this.oimissueTxnValidations()) {
               return;
         }
         // TODO declare commit bean and add insert list to that object.
         this.grievancetxnsInsertList = event.added;
         this.grievancetxnsUpdatetList = event.updated;
         this.grievancetxnsDeleteList = event.removed;
         this.grievancetxnsCommitModel.insertList = [];
         this.grievancetxnsCommitModel.updateList = [];
         this.grievancetxnsCommitModel.deleteList = [];
         if (this.grievancetxnsInsertList.length > 0 || this.grievancetxnsUpdatetList.length > 0) {
               for (let i = 0; i < this.grievancetxnsInsertList.length; i++) {
                     let count = 0;
                     if (this.grievancetxnsInsertList[i].offRspFlag) {
                           count = count + 1;
                     }
                     if (this.grievancetxnsInsertList[i].docRspFlag) {
                           count = count + 1;
                     }
                     if (this.grievancetxnsInsertList[i].igRspFlag) {
                           count = count + 1;
                     }
                     if (Number(count) > Number(1)) {
                           this.show(this.translateService.translate('oimissue.onecheckboxcheck'));
                           return;
                     }
                     if (!this.grievancetxnsInsertList[i].offRspFlag && Number(this.grievancetxnsInsertList[i].listSeq) === 1) {
                           this.show(this.translateService.translate('oimissue.transseqone'));
                           return;
                     }
                     this.grievancetxnsInsertList[i].activeFlag = this.grievancetxnsInsertList[i].activeFlag ? 'Y' : 'N';
                     this.grievancetxnsInsertList[i].grievType = this.grievancetypesModel.grievType;
                     this.grievancetxnsInsertList[i].activeFlag = this.grievancetxnsInsertList[i].activeFlag ? 'Y' : 'N';
                     this.grievancetxnsInsertList[i].offRspFlag = this.grievancetxnsInsertList[i].offRspFlag ? 'Y' : 'N';
                     this.grievancetxnsInsertList[i].docRspFlag = this.grievancetxnsInsertList[i].docRspFlag ? 'Y' : 'N';
                     this.grievancetxnsInsertList[i].igRspFlag = this.grievancetxnsInsertList[i].igRspFlag ? 'Y' : 'N';
                     this.grievancetxnsCommitModel.insertList = this.grievancetxnsInsertList;
               }
               for (let i = 0; i < this.grievancetxnsUpdatetList.length; i++) {
                     let count = 0;
                     if (this.grievancetxnsUpdatetList[i].offRspFlag) {
                           count = count + 1;
                     }
                     if (this.grievancetxnsUpdatetList[i].docRspFlag) {
                           count = count + 1;
                     }
                     if (this.grievancetxnsUpdatetList[i].igRspFlag) {
                           count = count + 1;
                     }
                     if (Number(count) > Number(1)) {
                           this.show(this.translateService.translate('oimissue.onecheckboxcheck'));
                           return;
                     }
                     if (!this.grievancetxnsUpdatetList[i].offRspFlag && Number(this.grievancetxnsUpdatetList[i].listSeq) === 1) {
                           this.show(this.translateService.translate('oimissue.transseqone'));
                           return;

                     }
                     this.grievancetxnsUpdatetList[i].activeFlag = this.grievancetxnsUpdatetList[i].activeFlag ? 'Y' : 'N';
                     this.grievancetxnsUpdatetList[i].offRspFlag = this.grievancetxnsUpdatetList[i].offRspFlag ? 'Y' : 'N';
                     this.grievancetxnsUpdatetList[i].docRspFlag = this.grievancetxnsUpdatetList[i].docRspFlag ? 'Y' : 'N';
                     this.grievancetxnsUpdatetList[i].igRspFlag = this.grievancetxnsUpdatetList[i].igRspFlag ? 'Y' : 'N';
                     this.grievancetxnsCommitModel.updateList = this.grievancetxnsUpdatetList;
               }
         }
         if (this.grievancetxnsDeleteList.length > 0) {
               for (let i = 0; i < this.grievancetxnsDeleteList.length; i++) {
                     this.grievancetxnsCommitModel.deleteList = this.grievancetxnsDeleteList;
               }
         }
         const grievancetxnsSaveData = this.oimissueFactory.grievanceTxnsCommit(this.grievancetxnsCommitModel);
         grievancetxnsSaveData.subscribe(data => {
               if (String(data[0].errorMessage).indexOf('GRIEVANCE_TXNS_PK') > 0) {
                     this.show(this.translateService.translate('oimissue.primarykeyviolation'), 'warn');
                     this.grievancetxnsExecuteQuery();
                     return;
               }
               if (data[0] && data[0].returnValue === 1) {
                     this.show('common.addupdateremoverecordsuccess', 'success');
                     this.grievancetxnsExecuteQuery();
                     return;
               } else {
                     this.show('common.addupdateremoverecordfailed', 'warn');
                     this.grievancetxnsExecuteQuery();
                     return;
               }
         });
   }


}

