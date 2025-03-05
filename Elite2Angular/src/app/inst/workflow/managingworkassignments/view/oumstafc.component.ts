import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { StaffSkills } from '@sa/usersystemsecurity/beans/StaffSkills';
import { StaffSkillsCommitBean } from '@sa/usersystemsecurity/beans/StaffSkillsCommitBean';
import { OumstafcService } from '../servies/oumstafc.service';
import { DialogComponent } from './../../../../core/ui-components/dialog/dialog.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { Router } from '@angular/router';
// import required bean declarations

@Component({
   selector: 'app-oumstafc',
   templateUrl: './oumstafc.component.html'
})

export class OumstafcComponent implements OnInit {
   // Variable declaration
   @ViewChild('grid', { static: true}) grid: any;
   actionName: string;
   lovModel: any[];
   msgs: any[] = [];
   nameOfLovPage: string;
   listToCompare: any[] = [];
   stskData: StaffSkills[] = [];
   stskDataTemp: StaffSkills[] = [];
   // TODO angular.copy(this.stskData, thisstskDataTemp);
   stskModel: StaffSkills = new StaffSkills();
   staffSkillsSearch: StaffSkills = new StaffSkills();
   stskIndex = 0;
   stskInsertList: StaffSkills[] = [];
   stskUpdatetList: StaffSkills[] = [];
   stskDeleteList: StaffSkills[] = [];
   stskCommitModel: StaffSkillsCommitBean = new StaffSkillsCommitBean();
   @ViewChild('dialog', {static: true}) dialog: DialogComponent;
   minDate: Date;
   display: boolean;
   errorMessage: string;
   headerMessage: string;
   disabled: boolean;
   editable = true;
   stskColumnDef: any[];
   stskReadOnly = false;
   rgstaffskillRg: any[] = [];
   rgprogramRg: any[] = [];
   rgsubtypeRg: any[] = [];
   stskinsertList: any;
   stskdeleteList: any;
   stskupdateList: any;
   programIdstring: string;
   staffId: DialogComponent;
   staffSkillsData: StaffSkills = new StaffSkills();
   asOfDate: any;
   date: Date;
   retriveDisabled: boolean;
   clearDisabled: boolean;
   subTypeList: any;
   subTypeRedOnly: boolean;
   typeLovTitles = {
      description: this.translateService.translate('oumstafc.description'),
      code: this.translateService.translate('oumstafc.typeCode')
   };
   subTypeLovTitles = {
      description: this.translateService.translate('oumstafc.description'),
      code: this.translateService.translate('oumstafc.subTypeCode')
   };
   programLovTitles = {
      description: this.translateService.translate('oumstafc.description'),
      code: this.translateService.translate('oumstafc.subTypeCode')
   };
   skillTypeValid: boolean;
   subTypeFlg: boolean;
   asOfDateFlg: boolean;
   checkActiveFlag = false;
   validmsg: boolean;
   screenName: string;
   stskInsert: boolean;
   
   constructor(
      private oumstafcFactory: OumstafcService,private router: Router,
      public translateService: TranslateService,
      public sessionManager: UserSessionManager) {
      // TODO initilize data members here..!
      this.stskColumnDef = [];
   }
   ngOnInit() {
      
      this.screenName = this.router.url.replace('/', '');
      if (this.screenName === 'OUMPERSO') {
         this.stskInsert = true;
      }
      this.subTypeRedOnly = true;
      this.validmsg = false;
      this.stskColumnDef = [
         {
            fieldName: this.translateService.translate('oumstafc.type'), field: 'skillType', cellEditable: this.canEdit,
            width: 150, datatype: 'lov', link: 'oumstafc/rgStaffSkillRecordGroup'
         },
         {
            fieldName: this.translateService.translate('oumstafc.subType'), cellEditable: this.canEdit, field: 'subType', parentField: 'skillType',
            width: 150, datatype: 'lov', link: 'oumstafc/rgSubTypeRecordGroup?skillType='
         },
         {
            fieldName: this.translateService.translate('oumstafc.program'), cellEditable: this.canEdit, field: 'progId'
            , width: 150, datatype: 'lov', link: 'oumstafc/rgProgramRecordGroup'
         },
         {
            fieldName: this.translateService.translate('oumstafc.comments'), cellEditable: this.canEdit, field: 'stskComment',
            width: 150, datatype: 'text', maxlength :'240'
         },
         {
            fieldName: this.translateService.translate('oumstafc.asOfDate'), cellEditable: this.canEdit, field: 'asOfDate',
            width: 150, datatype: 'date'
         },
         {
            fieldName: this.translateService.translate('oumstafc.active'), cellEditable: this.canEdit, field: 'activeFlag',
            width: 150, datatype: 'checkbox'
         },
         {
            fieldName: this.translateService.translate('oumstafc.expiryDate'), field: 'expiryDate',
            editable: false, width: 150, datatype: 'date'
         },

      ];
      this.stskExecuteQuery();
      /* if (this.stskData.length > 0) {
         this.stskModel.asOfDate = DateFormat.getDate();
         this.stskData.push(this.stskModel);
      } */
   }

   canEdit = (data: any, index: number, field: string): boolean => {
      if (this.screenName === 'OUMPERSO') {
         return true;
      } else {
         return false;
      }

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
   // onRowClickstsk(event) {
   // }

   validateRowData = (event) => {
      const rowdata = new ValidateRowReturn();
      const rowIndex = this.stskData.indexOf(event.data);
      if (event.field === 'activeFlag') {
         if (event.data.activeFlag) {
            this.grid.setColumnData('expiryDate', rowIndex, undefined);
         } else {
            this.grid.setColumnData('expiryDate', rowIndex, DateFormat.getDate());
         }

      }

      if (event.field === 'asOfDate') {
         if (event.data.asOfDate && ((DateFormat.compareDate(DateFormat.getDate(event.data.asOfDate), DateFormat.getDate()) === 1))) {
           this.show("As of date must be less than or equal to today's date.", 'warn');
           rowdata.validated = true;
			  return rowdata;
         }

      }

      if(event.field === 'skillType'){
         this.grid.setColumnData('subType', event.rowIndex, undefined);
      }



      rowdata.validated = true;
      return rowdata;
   }

   onClear = () => {
      this.stskExecuteQuery();
        return true;
	}

   cancel() {
      this.dialog.close(null);
   }
   stskExecuteQuery() {
      this.stskModel = new StaffSkills();
      this.stskModel.staffId = this.dialog.data.staffId;

      const stskResult = this.oumstafcFactory.stskExecuteQuery(this.stskModel);
      stskResult.subscribe(stskResultList => {
         if (stskResultList.length === 0) {
            this.stskData = [];
           
           /*  this.staffSkillsData = new StaffSkills();
            this.staffSkillsData.asOfDate = DateFormat.getDate();
            this.staffSkillsData.activeFlag = 'Y';
            this.stskData.push(this.staffSkillsData); */
           /*  if (this.validmsg) {
               const is = { valid: true };
               this.show(this.translateService.translate('oumstafc.noRecord'), 'warn');
               is.valid = false;
               return is.valid;
            } */
         } else {
            stskResultList.forEach(element => {
               element.activeFlag = element.activeFlag === 'Y' ? true : false;
            });
           
            this.retriveDisabled = true;
            this.subTypeRedOnly = true;
            this.stskData = stskResultList;
           // this.stskModel = stskResultList[0];
         }
      });
     
   }
   oumstafcValidations(data:any) {
      this.asOfDateFlg = false;
      this.skillTypeValid = false;
      const is = { valid: true };
      this.subTypeFlg = false;
      data.forEach(element => {
         if (!element.skillType) {
            this.show(this.translateService.translate('oumstafc.typeValidMsg'), 'warn');
            is.valid = false;
            return is.valid;
         } else if (!element.subType) {
            this.show(this.translateService.translate('oumstafc.subTypeValidMsg'), 'warn');
            is.valid = false;
            return is.valid;
         } else if (!element.asOfDate) {
            this.show(this.translateService.translate('oumstafc.asOfDateMsg'), 'warn');
            is.valid = false;
            return is.valid;
         } else if (element.asOfDate && ((DateFormat.compareDate(DateFormat.getDate(element.asOfDate), DateFormat.getDate()) === 1))) {
            this.show("As of date must be less than or equal to today's date.", 'warn');
            is.valid = false;
            return is.valid;
         }

         for (let i = 0; this.stskData.length > i; i++) {
            const index = this.stskData.indexOf(element);
            if (index !== i && (this.stskData[i].skillType === element.skillType && this.stskData[i].subType === element.subType)) {
                this.show(this.translateService.translate('This Staff Skill is not unique'), 'warn');
                is.valid = false;
                return is.valid;
            }
        }
      });
      // if (this.skillTypeValid) {
      //    this.show(this.translateService.translate('oumstafc.typeValidMsg'), 'warn');
      //    is.valid = false;
      //    return is.valid;
      // }
      // if (this.subTypeFlg) {
      //    this.show(this.translateService.translate('oumstafc.subTypeValidMsg'), 'warn');
      //    is.valid = false;
      //    return is.valid;
      // }
      // if (this.asOfDateFlg) {
      //    this.show(this.translateService.translate('oumstafc.asOfDateMsg'), 'warn');
      //    is.valid = false;
      //    return is.valid;
      // }
      return is.valid;
   }
   /**
    *  This function will be executed when commit event is
   * fired
   */
   oumstafcSavestskForm(event) {
      
      // TODO declare commit bean and add insert list to that object.
      this.stskinsertList = event.added;
      this.stskupdateList = event.updated;
      this.stskdeleteList = event.removed;
      this.stskCommitModel.insertList = [];
      this.stskCommitModel.updateList = [];
      this.stskCommitModel.deleteList = [];
      if (this.stskinsertList.length > 0 || this.stskupdateList.length > 0) {
         this.stskCommitModel.insertList = this.stskinsertList;
         this.stskCommitModel.updateList = this.stskupdateList;
         if (this.stskCommitModel.insertList.length > 0) {
            if (!this.oumstafcValidations(this.stskCommitModel.insertList)) {
               return;
            }
         }

         if (this.stskCommitModel.updateList.length > 0) {
            if (!this.oumstafcValidations(this.stskCommitModel.updateList)) {
               return;
            }
         }

         this.stskCommitModel.updateList.forEach(element => {
            element.activeFlag = element.activeFlag ? 'Y' : 'N';
            element.staffId = this.dialog.data.staffId;
            element.programId = Number(element.progId);
         });
         this.stskCommitModel.insertList.forEach(element => {
            element.activeFlag = element.activeFlag ? 'Y' : 'N';
            element.staffId = this.dialog.data.staffId;
            element.programId = Number(element.progId);
         });
      }
      const stskSaveData = this.oumstafcFactory.stskCommit(this.stskCommitModel);
      stskSaveData.subscribe(data => {
         if (data === 1) {
            this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
            this.stskModel  = new StaffSkills();
            this.stskExecuteQuery();
         } else {
            this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
            this.stskModel  = new StaffSkills();
            this.stskExecuteQuery();
         }
      });
   }
   clearScreen() {
      this.stskData = [];
      this.asOfDate = this.date;
      this.validmsg = false;
      this.stskModel = new StaffSkills();
      this.staffSkillsSearch = new StaffSkills();
      this.staffSkillsSearch.skillType = '';
      this.retriveDisabled = false;
      this.checkActiveFlag = false;
      this.staffSkillsData = new StaffSkills();
      this.staffSkillsData.asOfDate = DateFormat.getDate();
      this.staffSkillsData.activeFlag = 'Y';
      //this.stskData.push(this.staffSkillsData);

   }
   retrivebtn(date?, dateOne?) {
      const is = { valid: true };
      if (!this.staffSkillsSearch.skillType && this.staffSkillsSearch.subType) {
         this.show(this.translateService.translate('oumstafc.selectType'), 'warn');
         is.valid = false;
         return is.valid;
      }
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
      this.validmsg = true;
      this.stskModel = this.staffSkillsSearch;
      this.stskExecuteQuery();
      this.retriveDisabled = true;
      this.subTypeRedOnly = true;
      this.clearDisabled = false;
   }
   changeAsOfDate(event) {
      if (event) {
         this.stskModel.asOfDate = event;
      }
   }
   changeExpiryDate(event) {
      if (event) {
         this.stskModel.expiryDate = event;
      }
   }
   changeProgId(progId) {
      if (progId) {
         this.stskModel.programId = progId;
         this.stskModel.progId = progId;
      }
   }
   changeSkillType(event) {
      if (event && event.code) {
         this.subTypeList = 'oumstafc/rgSubTypeRecordGroup?skillType=' + event.code;
         this.subTypeRedOnly = false;
         this.stskModel.skillType = event.code;
         this.staffSkillsSearch.skillType = event.code;
      }
   }
   changeSkillTypeBlur() {
      if (!this.staffSkillsSearch.skillType) {
         this.staffSkillsSearch.skillType = this.staffSkillsSearch.skillType === undefined ? '' : undefined;
      }
   }
   subTypeBlur() {
      if (!this.staffSkillsSearch.subType) {
         this.staffSkillsSearch.subType = this.staffSkillsSearch.subType === undefined ? '' : undefined;
      }
   }
   progIdBlur() {
      if (!this.staffSkillsSearch.progId) {
         this.staffSkillsSearch.progId = this.staffSkillsSearch.progId === undefined ? '' : undefined;
      }
   }
   changeSkillSubType(event) {
      if (event) {
         this.stskModel.subType = event;
         this.staffSkillsSearch.subType = event;
      }
   }
   changeActiveFlag(checkActiveFlag) {

      if (checkActiveFlag === true) {
         this.stskModel.activeFlag = 'Y';
         this.staffSkillsSearch.activeFlag = 'Y';
      } else {
         this.stskModel.activeFlag = 'N';
         this.staffSkillsSearch.activeFlag = 'N';
      }
   }
   onAssessGridInsert = () => {
      for (let i = 0; i < this.stskData.length; i++) {
         if (!this.stskData[i].skillType || !this.stskData[i].skillType.trim()) {
            this.show(this.translateService.translate('oumstafc.typeValidMsg'), 'warn');
            return;
         }
         if (!this.stskData[i].subType || !this.stskData[i].subType.trim()) {
            this.show(this.translateService.translate('oumstafc.subTypeValidMsg'), 'warn');
            return;
         }
         if (!this.stskData[i].asOfDate) {
            this.stskData[i].asOfDate = DateFormat.getDate();
         }
      }
      return { asOfDate: DateFormat.getDate() , activeFlag: true };
   }
}