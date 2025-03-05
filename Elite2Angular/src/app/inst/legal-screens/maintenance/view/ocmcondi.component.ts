import {
   Component, OnInit,
   ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmcondiService } from '../service/ocmcondi.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CommunityConditions } from '../beans/CommunityConditions';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { CommunityConditionsCommitBean } from '../beans/CommunityConditionsCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';

// import required bean declarations

@Component({
   selector: 'app-ocmcondi',
   templateUrl: './ocmcondi.component.html'

})

export class OcmcondiComponent implements OnInit {
   @ViewChild('ocmConGrid') ocmConGrid: any;
   // Variable declaration
   actionName: string;
   lovModel: any[];
   msgs: any[] = [];
   nameOfLovPage: string;
   listToCompare: any[] = [];
   comcondData: CommunityConditions[] = [];
   comcondDataTemp: CommunityConditions[] = [];
   comcondModel: CommunityConditions = new CommunityConditions();
   comcondSearchModel: CommunityConditions = new CommunityConditions();
   comcondIndex: Number = 0;
   comcondInsertList: CommunityConditions[] = [];
   comcondUpdatetList: CommunityConditions[] = [];
   comcondDeleteList: CommunityConditions[] = [];
   minDate: Date;
   display: boolean;
   errorMessage: string;
   headerMessage: string;
   disabled: boolean;
   editable: Boolean = true;
   comCondColumnDef: any[];
   rgcatRg: any[] = [];
   rgtypeRg: any[] = [];
   rgunitRg: any[] = [];
   rgsvcoblRg: any[] = [];
   rgfunctiontypeRg: any[] = [];
   comcondCommitModel: CommunityConditionsCommitBean = new CommunityConditionsCommitBean();
   tableIndex: number;
   countData: any;
   enableInsertIfRowexist: boolean;
   enabledeleteRow: boolean;
   expiryDate: any;
   retriveDisabled: boolean;
   clearDisabled: boolean;
   namesReadOnly: boolean;
   clearDisable: boolean;
   message = ' Invalid.';
   categoryTitles: { code: string; description: string; };
   unitTypeTitles: { code: string; description: string; };
   assignTeamTitles: { code: string; description: string; };
   namesReadOnlyLeaglTxt: boolean;
   orderTypeTitle: { code: string; description: string; };
   saveDisabled: boolean;
   assesclearDisabled: boolean;
   constructor(private ocmcondiFactory: OcmcondiService,
      public translateService: TranslateService, public sessionManager: UserSessionManager) {

      this.comCondColumnDef = [];
   }
   ngOnInit() {
      this.saveDisabled = true;
      this.assesclearDisabled = true;
      this.enabledeleteRow = false;
      this.retriveDisabled = false;
      this.clearDisabled = true;
      this.namesReadOnly = false;
      this.namesReadOnlyLeaglTxt = false;
      this.categoryTitles = { code: this.translateService.translate('ocmcondi.lovReasonCategoryCode'),
      description: this.translateService.translate('ocmcondi.lovDescription') };
      this.unitTypeTitles = { code: this.translateService.translate('ocmcondi.lovUnitType'),
      description: this.translateService.translate('ocmcondi.lovDescription')};
      this.assignTeamTitles = { code: this.translateService.translate('ocmcondi.lovCode'),
      description: this.translateService.translate('ocmcondi.lovTeamFunction')};
      this.orderTypeTitle= { code: this.translateService.translate('ocmcondi.orderTypeCode'),
      description: this.translateService.translate('ocmcondi.lovDescription')};
      this.comCondColumnDef = [
         {
            fieldName: this.translateService.translate('ocmcondi.orderType') + '*',
            field: 'commConditionType', editable: true, width: 150, datatype: 'lov', domain: 'CATEGORY', cellEditable: this.canAlertEdit
            , titles: { code: this.translateService.translate('ocmcondi.orderTypeCode'),
             description: this.translateService.translate('ocmcondi.lovDescription') }
         },
         {
            fieldName: this.translateService.translate('ocmcondi.conditionCode') + '*',
            field: 'commConditionCode', editable: true, width: 150, cellEditable: this.canAlertEdit,
            datatype: 'text', maxlength: 12
         },
         {
            fieldName: this.translateService.translate('ocmcondi.description') + '*',
            field: 'description', editable: true, width: 150, datatype : 'text',
            uppercase: 'false',  maxlength: 40,  },
         {
            fieldName: this.translateService.translate('ocmcondi.category') + '*',
            field: 'categoryType', editable: true, width: 150, datatype: 'lov', domain: 'COM_CON_CAT', cellEditable: this.canAlertEdit
            , titles: { code: this.translateService.translate('ocmcondi.lovReasonCategoryCode'),
            description: this.translateService.translate('ocmcondi.lovDescription') }
         },
         {
            fieldName: this.translateService.translate('ocmcondi.unitOfLength'),
            field: 'conditionUnitType', editable: true, width: 150, datatype: 'lov', domain: 'COND_UNIT'
            , titles: { code: this.translateService.translate('ocmcondi.lovUnitType'),
            description: this.translateService.translate('ocmcondi.lovDescription')}
         },
         {
            fieldName: this.translateService.translate('ocmcondi.assignToTeam'),
            field: 'functionType', editable: true, width: 150, datatype: 'lov', domain: 'FUNCTION'
            , titles: {  code: this.translateService.translate('ocmcondi.lovCode'),
            description: this.translateService.translate('ocmcondi.lovTeamFunction')}
         },
         {
            fieldName: this.translateService.translate('ocmcondi.programDetail'),
            field: 'programMethod', editable: true, width: 150, datatype: 'lov', domain: 'PS_CATEGORY'
         },
         {
            fieldName: this.translateService.translate('ocmcondi.allowallocation'),
            field: 'allocationFlag', editable: true, width: 150, datatype: 'checkbox'
         },
         {
            fieldName: this.translateService.translate('ocmcondi.casePlan'),
            field: 'casePlanFlag', editable: true, width: 150, datatype: 'checkbox'
         },
         {
            fieldName: this.translateService.translate('common.active'),
            field: 'activeFlag', editable: true, width: 150, datatype: 'checkbox'
         },
         {
            fieldName: this.translateService.translate('common.sequence'),
            field: 'listSeq', editable: true, width: 150, maxValue: '999', strictFP: true, whole: true, datatype: 'number',
         },
         {
            fieldName: this.translateService.translate('common.expirydate'),
            field: 'expiryDate', datatype: 'date', editable: false, width: 150
         },
      ];
      // TODO all initializations here
      this.comcondExecuteQuery();
   }
/**
    * This function is for on to edit the cell or not in grid
    */
   canAlertEdit = (data: any, index: number, field: string): boolean => {
      if (!data.createDatetime) {
         return true;
      } else {
         return false;
      }
   }
 /**
 * This function is for to validate the row
 */
   validateRow = (event) => {
      const rowdata = new ValidateRowReturn();

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
* This function is for on row click event
*/
   onRowClickcomcond(event) {
      if (event) {
         this.saveDisabled = true;
         this.comcondModel = event;
         if (this.comcondModel.commConditionType && this.comcondModel.commConditionCode) {
            this.okToModifySentenceRecord();
         }
         if (this.comcondModel.createDatetime) {
            this.enabledeleteRow = true;
         } else {
            this.enabledeleteRow = false;
         }
         setTimeout(() => {
            this.saveDisabled = true;
            this.assesclearDisabled = true;
         }, 10);
      }
   }
   /**
    * This function is for on grid delte to validate any child records exist when deleting parent record
    */
   onGridCondesDelete = () => {
      if (this.countData > 0) {
         this.show(this.translateService.translate('ocmcondi.cancontDeleteRecord'));
         return false;
      }
      return true;
   }

   /**
    * This function is for validate Row data
    */
   validateRowData = (event) => {
      const rowIndex = event.rowIndex;
      const rowdata = new ValidateRowReturn();
      if (event.field === 'activeFlag') {
         if (event.data.activeFlag) {
            this.ocmConGrid.setColumnData('expiryDate', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
         } else if (!event.data.activeFlag) {
            this.ocmConGrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
            rowdata.validated = true;
            return rowdata;
         }
      }
      rowdata.validated = true;
      return rowdata;
   }

   /**
    * This function is for on insert to validate items when inserting new row in grid
    */
   comConInsert = () => {
      if (!this.comConditionValidations()) {
         return;
      }
      this.namesReadOnlyLeaglTxt = false;
      return { activeFlag: true };
   }
 /**
*  This function will be used to validate mandetory fields when cick on save
   * fired
   */
   comConditionValidations = () => {
      const is = { valid: true };
      if (this.comcondData && this.comcondData) {
         this.comcondData.forEach(element => {
            if (!element.commConditionType) {
               this.show(this.translateService.translate('ocmcondi.validOrderType'), 'warn');
               is.valid = false;
               return is.valid;
            }
            if (element.commConditionCode === undefined  || !element.commConditionCode.trim()) {
               this.show(this.translateService.translate('ocmcondi.validConditionCode'), 'warn');
               is.valid = false;
               return is.valid;
            }
            if (element.description === undefined || !element.description.trim()) {
               this.show(this.translateService.translate('ocmcondi.validDescription'), 'warn');
               is.valid = false;
               return is.valid;
            }
            if (!element.categoryType) {
               this.show(this.translateService.translate('ocmcondi.validateCategoryField'), 'warn');
               is.valid = false;
               return is.valid;
            }
         });
      }
      return is.valid;
   }
 /**
*  This function will be used to get the child record count when deleting
   * fired
   */
   okToModifySentenceRecord() {
      const deleteRecord = this.ocmcondiFactory.okToModifyRecord(this.comcondModel);
      deleteRecord.subscribe(data => {
         if (data > 0) {
            this.countData = data.deleteRecordCountData;
         } else {
            this.countData = data.deleteRecordCountData;
         }

      });
   }
 /**
*  This function will be used to disable the fields when entering in search fields
   * fired
   */
   isInsertable() {
      if (this.comcondSearchModel.commConditionType || this.comcondSearchModel.commConditionCode || this.comcondSearchModel.description
         || this.comcondSearchModel.categoryType || this.comcondSearchModel.conditionUnitType || this.comcondSearchModel.functionType
         || this.comcondSearchModel.programMethod || this.comcondSearchModel.activeFlag || this.comcondSearchModel.allocationFlag
         || this.comcondSearchModel.casePlanFlag || this.comcondSearchModel.listSeq || this.expiryDate) {
         this.clearDisable = false;
      } else {
         this.clearDisable = true;
      }
   }
   /**
*  This function will be used to clear the data when clicked on clear button
   * fired
   */
   clear() {
      this.comcondData = [];
      this.comcondSearchModel = new CommunityConditions();
      this.comcondModel = new CommunityConditions();
      this.retriveDisabled = false;
      this.clearDisabled = true;
      this.namesReadOnly = false;
      this.expiryDate = undefined;
      this.namesReadOnlyLeaglTxt = true;
      this.assesclearDisabled = true;
      this.saveDisabled = true;

   }
/**
*  This function will be executedto retrive the data in grids
   * fired
   */
   comcondExecuteQuery(date?) {
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
      if (this.expiryDate) {
         this.comcondSearchModel.expiryDate = this.expiryDate;
      } else {
         this.comcondSearchModel.expiryDate = null;
      }
      const comcondResult = this.ocmcondiFactory.comCondExecuteQuery(this.comcondSearchModel);
      comcondResult.subscribe(comcondResultList => {
         if (comcondResultList.length === 0) {
            this.comcondData = [];
            this.retriveDisabled = false;
            this.clearDisabled = true;
            this.namesReadOnly = false;
            this.show(this.translateService.translate('common.querycaused'));
            this.clear();
            this.namesReadOnlyLeaglTxt = true;
         } else {
            comcondResultList.forEach(element => {
               element.activeFlag = element.activeFlag === 'Y' ? true : false;
               element.allocationFlag = element.allocationFlag === 'Y' ? true : false;
               element.casePlanFlag = element.casePlanFlag === 'Y' ? true : false;
               element.conditionTextTemp = element.conditionText;
            });
            this.comcondData = comcondResultList;
            this.comcondModel = comcondResultList[0];
            this.tableIndex = 0;
            this.retriveDisabled = true;
            this.clearDisabled = false;
            this.namesReadOnly = true;
            this.namesReadOnlyLeaglTxt = false;

         }
      });
   }
   /**
   *This function will be executed when grid clear event is
   * fired
   */
   onGridClear = () => {
      this.comcondExecuteQuery();
      return true;
    }

/**
     * updation of Details Block
     */
    onButtonSave() {
      this.comcondInsertList = [];
      this.comcondUpdatetList = [];
      this.comcondDeleteList = [];

      this.comcondCommitModel.updateList = [];
      this.comcondCommitModel.insertList = [];
      this.comcondCommitModel.deleteList = [];

      this.comcondUpdatetList.push(this.comcondModel);
      for (let i = 0; i < this.comcondUpdatetList.length; i++) {
         this.comcondUpdatetList[i].activeFlag = this.comcondUpdatetList[i].activeFlag ? 'Y' : 'N';
         this.comcondUpdatetList[i].allocationFlag = this.comcondUpdatetList[i].allocationFlag ? 'Y' : 'N';
         this.comcondUpdatetList[i].casePlanFlag = this.comcondUpdatetList[i].casePlanFlag ? 'Y' : 'N';
         this.comcondCommitModel.updateList = this.comcondUpdatetList;
      }
      const comcondSaveData = this.ocmcondiFactory.comCondCommit(this.comcondCommitModel);
      comcondSaveData.subscribe(data => {
         if (String(data[0].errorMessage).indexOf('COM_COND_PK') > 0) {
            this.show(this.translateService.translate('ocmcondi.primaryKeyViolat'));
            this.comcondExecuteQuery();
            return;
         }
         if (data && data[0] && data[0].returnValue && data[0].returnValue === 1) {
            this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
            this.saveDisabled = true;
            this.assesclearDisabled = true;
            this.comcondExecuteQuery();
            return;
         } else if (data && data[0] && data[0].returnValue && data[0].returnValue === 0) {
            this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
            this.comcondExecuteQuery();
            return;
         } else {
            if (data[0] && data[0].sealFlag && data[0].serverCode === 2292) {
               this.message = this.translateService.translate('common.recordcannotbedeletedmodified');
               this.message = String(this.message).replace('%tablename%', data[0].sealFlag);
               this.show(this.message, 'warn');
               this.comcondExecuteQuery();
               return;
            }

         }
      });
   }


   clearAssesFields() {
      this.comcondModel.conditionText = this.comcondModel.conditionTextTemp;
      setTimeout(ele => {
         this.assesclearDisabled = true;
         this.saveDisabled = true;
      }, 5);
   }

   changeScreenCode(event) {
      if(event){
         if(this.comcondModel.createDatetime){
            this.assesclearDisabled = false;
            this.saveDisabled = false;
         } else{
            this.assesclearDisabled = true;
            this.saveDisabled = true;
         }

      } else{
         this.assesclearDisabled = true;
         this.saveDisabled = true;
      }
   }
   /**
*  This function will be executed when commit event is
   * fired
   */
   ocmcondiSavecomcondForm(event) {
      // TODO declare commit bean and add insert list to that object.
      if (!this.comConditionValidations()) {
         return;
      }
      this.comcondInsertList = event.added;
      this.comcondUpdatetList = event.updated;
      this.comcondDeleteList = event.removed;
      this.comcondCommitModel.insertList = [];
      this.comcondCommitModel.updateList = [];
      this.comcondCommitModel.deleteList = [];
      if (this.comcondInsertList.length > 0 || this.comcondUpdatetList.length > 0) {
         for (let i = 0; i < this.comcondInsertList.length; i++) {
            this.comcondInsertList[i].activeFlag = this.comcondInsertList[i].activeFlag ? 'Y' : 'N';
            this.comcondInsertList[i].allocationFlag = this.comcondInsertList[i].allocationFlag ? 'Y' : 'N';
            this.comcondInsertList[i].casePlanFlag = this.comcondInsertList[i].casePlanFlag ? 'Y' : 'N';
            this.comcondInsertList[i].provisoFlag = 'N';
            this.comcondInsertList[i].amountRequiredFlag = 'N';
            this.comcondInsertList[i].dueDateRequiredFlag = 'N';
            this.comcondInsertList[i].updateAllowedFlag = 'Y';
            this.comcondCommitModel.insertList = this.comcondInsertList;
         }
         for (let i = 0; i < this.comcondUpdatetList.length; i++) {
            this.comcondUpdatetList[i].activeFlag = this.comcondUpdatetList[i].activeFlag ? 'Y' : 'N';
            this.comcondUpdatetList[i].allocationFlag = this.comcondUpdatetList[i].allocationFlag ? 'Y' : 'N';
            this.comcondUpdatetList[i].casePlanFlag = this.comcondUpdatetList[i].casePlanFlag ? 'Y' : 'N';
            this.comcondCommitModel.updateList = this.comcondUpdatetList;
         }


      }
      if (this.comcondDeleteList.length > 0) {
         for (let i = 0; i < this.comcondDeleteList.length; i++) {
            this.comcondCommitModel.deleteList = this.comcondDeleteList;
         }

      }
      const comcondSaveData = this.ocmcondiFactory.comCondCommit(this.comcondCommitModel);
      comcondSaveData.subscribe(data => {
         if (String(data[0].errorMessage).indexOf('COM_COND_PK') > 0) {
            this.show(this.translateService.translate('ocmcondi.primaryKeyViolat'));
            this.comcondExecuteQuery();
            return;
         }
         if (data && data[0] && data[0].returnValue && data[0].returnValue === 1) {
            this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
            this.comcondExecuteQuery();
            return;
         } else if (data && data[0] && data[0].returnValue && data[0].returnValue === 0) {
            this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
            this.comcondExecuteQuery();
            return;
         } else {
            if (data[0] && data[0].sealFlag && data[0].serverCode === 2292) {
               this.message = this.translateService.translate('common.recordcannotbedeletedmodified');
               this.message = String(this.message).replace('%tablename%', data[0].sealFlag);
               this.show(this.message, 'warn');
               this.comcondExecuteQuery();
               return;
            }

         }
      });
   }
   /**
*  This function will be executed to call the order typr blurs
   * fired
   */
   onOrderTypeBlur() {
      if (!this.comcondSearchModel.commConditionType) {
        this.comcondSearchModel.commConditionType = this.comcondSearchModel.commConditionType === '' ? undefined : '';
      }
    }
    /**
*  This function will be executedto call the category blur
   * fired
   */
    onCategoryBlur() {
      if (!this.comcondSearchModel.categoryType) {
        this.comcondSearchModel.categoryType = this.comcondSearchModel.categoryType === '' ? undefined : '';
      }
    }
    /**
*  This function will be executed to call the unitof length blur
   * fired
   */
    onUnitOfLengthBlur() {
      if (!this.comcondSearchModel.conditionUnitType) {
        this.comcondSearchModel.conditionUnitType = this.comcondSearchModel.conditionUnitType === '' ? undefined : '';
      }
    }
    /**
*  This function will be executed to call the blur on function type
   * fired
   */
    onAssignTeamBlur() {
      if (!this.comcondSearchModel.functionType) {
        this.comcondSearchModel.functionType = this.comcondSearchModel.functionType === '' ? undefined : '';
      }
    }
    /**
*  This function will be executed to call the blur on program method
   * fired
   */
    onProgramDetailBlur() {
      if (!this.comcondSearchModel.programMethod) {
        this.comcondSearchModel.programMethod = this.comcondSearchModel.programMethod === '' ? undefined : '';
      }
    }
}


