import {
   Component, OnInit,
   ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumrestaService } from '../service/oumresta.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OmsModules } from '../../usersystemsecurity/beans/OmsModules';
import { ModulePrivileges } from '../../usersystemsecurity/beans/ModulePrivileges';
import { RoleInaccessibleRefCodes } from '@sa/admin/beans/RoleInaccessibleRefCodes';
import { RoleInaccessibleRefCodesCommitBean } from '@sa/admin/beans/RoleInaccessibleRefCodesCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OmsModulesCommitBean } from '@sa/admin/beans/OmsModulesCommitBean';
import { LovService } from '@core/ui-components/lov/lov.service';
import { ReferenceDomainService } from '@core/ui-components/lov/reference-domain.service';
// import required bean declarations

@Component({
   selector: 'app-oumresta',
   templateUrl: './oumresta.component.html'
})

export class OumrestaComponent implements OnInit {
   actionName: string;
   @ViewChild('grid', {static: true}) grid: any;
   lovModel: any[];
   msgs: any[] = [];
   msglist = [];
   type = 'error';
   message = ' Invalid.';
   nameOfLovPage: string;
   listToCompare: any[] = [];
   rleinarcData: OmsModules[] = [];
   rleinarcDataTemp: OmsModules[] = [];
   rleinarcModel: OmsModules = new OmsModules();
   rleinarcIndex: number;
   rleinarcInsertList: OmsModules[] = [];
   rleinarcUpdatetList: OmsModules[] = [];
   rleinarcDeleteList: OmsModules[] = [];
   modprivData: ModulePrivileges[] = [];
   modprivDataTemp: ModulePrivileges[] = [];
   modprivModel: ModulePrivileges = new ModulePrivileges();
   modprivIndex: number;
   modprivInsertList: ModulePrivileges[] = [];
   modprivUpdatetList: ModulePrivileges[] = [];
   modprivDeleteList: ModulePrivileges[] = [];
   rleinarc1Index: number;
   rleInarcRircColumnDef: any[];
   modPrivColumnDef: any[];
   rleInarcReadOnly: boolean;
   modPrivReadOnly: boolean;
   rleInarc1ReadOnly: boolean;
   rleinarcCommitModel: OmsModulesCommitBean = new OmsModulesCommitBean();
   rleinarcRircCommitModel: RoleInaccessibleRefCodesCommitBean = new RoleInaccessibleRefCodesCommitBean();
   rleinarcRircModel: RoleInaccessibleRefCodes = new RoleInaccessibleRefCodes();
   rleinarcRircData: RoleInaccessibleRefCodes[] = [];
   rleinarcRircDataTemp: RoleInaccessibleRefCodes[] = [];
   rleinarcRircInsertList: RoleInaccessibleRefCodes[] = [];
   rleinarcRircUpdatetList: RoleInaccessibleRefCodes[] = [];
   rleinarcRirc1DeleteList: RoleInaccessibleRefCodes[] = [];
   modulesColumnDef: any[];
   modulesIndex: number;
   rleinarcRircEnableDelete: boolean;
   doaminTitle = { code: this.translateService.translate('oumresta.domain') };
   moduleTitle = {
      code: this.translateService.translate('oumresta.moduleName'),
      newCode: this.translateService.translate('common.description')
   };
   codeTitles = {
      description: this.translateService.translate('common.description'),
      code: this.translateService.translate('common.code'),
   };
   constructor(private oumrestaFactory: OumrestaService, public translateService: TranslateService,
      public sessionManager: UserSessionManager,private referenceDomainService: ReferenceDomainService,
      private lovService: LovService) {

      this.rleInarcRircColumnDef = [];
      this.modPrivColumnDef = [];
      this.modulesColumnDef = [];

   }
   ngOnInit() {
      this.modulesColumnDef = [
         {
            fieldName: this.translateService.translate('oumresta.moduleName'), field: 'moduleName', datatype: 'text',
            editable: false, width: 150,
         },
         {
            fieldName: this.translateService.translate('common.description'), field: 'description', datatype: 'text',
            editable: false, width: 300
         }
      ];

      this.rleInarcRircColumnDef = [
         {
            fieldName: this.translateService.translate('oumresta.domainMand'), field: 'domain', editable: true, width: 150,
            datatype: 'lov', link: 'oumresta/cgfkRleInarc1DomainRecordGroup', titles: this.doaminTitle, cellEditable: this.canAlertEdit
         },

         {
            fieldName: this.translateService.translate('common.codemandatory'), field: 'code', editable: true, width: 150,
            datatype: 'lov', link: 'oumresta/cgfkRleInarc1CodeRecordGroup?codeInput=', titles: this.codeTitles, parentField: 'codeInput',
            cellEditable: this.canAlertEdit,
         },

         { fieldName: '', field: 'codeInput', hide: true },
      ];
      this.modPrivColumnDef = [
         { fieldName: this.translateService.translate('oumresta.id'), field: 'roleId', editable: false, width: 150 },
         { fieldName: this.translateService.translate('oumresta.roleName'), field: 'dspRoleName', editable: false, width: 150 },
         { fieldName: this.translateService.translate('oumresta.privileges'), field: 'accessPrivilege', editable: false, width: 150 }
      ];

      this.rleInarcExecuteQuery();
   }

   show() {
      this.msglist = [];
      this.msglist.push({ message: this.message, type: this.type });
      this.msgs = [...this.msglist];
   }

   canAlertEdit = (data: any, index: number, field: string): boolean => {
      const indexVal = this.rleinarcRircData.indexOf(data);
      if (field === 'code' && data.domain && !data.createDatetime) {
         return true;
      } else if (field === 'domain' && !data.createDatetime) {
         return true;
      } else {
         return false;
      }
   }

   onRowClickmodules(event) {
      if (event) {
         this.rleinarcModel = event;
      }
      if (this.rleinarcModel.moduleName) {
         this.modprivModel.moduleName = this.rleinarcModel.moduleName;
         this.modprivExecuteQuery();
      }
   }
   onRowClickmodpriv(event) {
      if (event) {
         this.modprivModel = event;
      }
      if (this.modprivModel.moduleName && this.modprivModel.roleId) {
         this.rleinarcRircModel.moduleName = this.modprivModel.moduleName;
         this.rleinarcRircModel.roleId = this.modprivModel.roleId;
         this.rleInarcRcriExecuteQuery();
      }
   }
   onRowClickrleinarcRirc(event) {
      if (event.createDatetime || event.createDatetime !== undefined) {
			this.rleinarcRircEnableDelete = true;
		} else {
			this.rleinarcRircEnableDelete = false;
		}
   }
   onGridInsert = () => {
      if (!this.rdValidations()) {
         return false;
      }
      return {};
   }
   onGridDelete = () => {
      return true;
   }
   onGridClear = () => {
      this.rleInarcExecuteQuery();
      return true;
   }
   validateRowData = (event) => {
      const rowdata = new ValidateRowReturn();
      const rowIndex = this.rleinarcRircData.indexOf(event.data);
      if (event.field === 'domain') {
         if (event.data.domain) {
            this.grid.setColumnData('codeInput', rowIndex, event.data.domain);
            rowdata.validated = true;
            return rowdata;
         }
      }
      rowdata.validated = true;
      return rowdata;
   }

   rdValidations() {
      const is = { valid: true };
      this.rleinarcRircDataTemp = [];
      this.grid.addedMap.forEach(
         (v: any, k: number) => {
            this.rleinarcRircDataTemp.push(v);
         });
      this.grid.updatedMap.forEach(
         (v: any, k: number) => {
            this.rleinarcRircDataTemp.push(v);
         });


         if (this.modprivData.length === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.youcannotcreatethisrecord');
            this.show();
            is.valid = false;
            return;
         }

      this.rleinarcRircDataTemp.forEach(data => {
         if (!data.domain) {
            this.type = 'warn';
            this.message = this.translateService.translate('oumresta.domainmustbeentered');
            this.show();
            is.valid = false;
            return;
         }
         if (!data.code) {
            this.type = 'warn';
            this.message = this.translateService.translate('oumresta.codemustbeentered');
            this.show();
            is.valid = false;
            return;
         }
      });

      return is.valid;

   }

   rleInarcExecuteQuery() {
      const serviceObj = this.oumrestaFactory.rleInarcExecuteQuery(this.rleinarcModel);
      serviceObj.subscribe(data => {
         if (data.length === 0) {
            this.rleinarcData = [];
         } else {
            this.rleinarcData = data;
            this.modulesIndex = 0;
         }
      });
   }
   oumrestaSaverleinarcForm(event) {
      this.rleinarcInsertList = event.added;
      this.rleinarcUpdatetList = event.updated;
      this.rleinarcDeleteList = event.removed;
      this.rleinarcCommitModel.insertList = [];
      this.rleinarcCommitModel.updateList = [];
      this.rleinarcCommitModel.deleteList = [];
      if (this.rleinarcInsertList.length > 0 || this.rleinarcUpdatetList.length > 0) {
         for (let i = 0; i < this.rleinarcInsertList.length; i++) {
            this.rleinarcInsertList[i].createUserId = this.sessionManager.getId();
            this.rleinarcInsertList[i].createDatetime = DateFormat.getDate();
         }
         for (let i = 0; i < this.rleinarcUpdatetList.length; i++) {
         }
         this.rleinarcCommitModel.insertList = this.rleinarcInsertList;
         this.rleinarcCommitModel.updateList = this.rleinarcUpdatetList;
      }
      if (this.rleinarcDeleteList.length > 0) {
         for (let i = 0; i < this.rleinarcDeleteList.length; i++) {
         }
         this.rleinarcCommitModel.deleteList = this.rleinarcDeleteList;
      }
      const rleinarcSaveData = this.oumrestaFactory.rleInarcCommit(this.rleinarcCommitModel);
      rleinarcSaveData.subscribe(data => {
         if (data === 1) {
            this.type = 'success';
            this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
            this.show();
            this.rleInarcExecuteQuery();
            return;
         }
         if (data === 2) {
            this.type = 'warn';
            this.message = this.translateService.translate('oumresta.rowexistsalreadywithsameRoleIdDomainCodeModuleName');
            this.show();
            this.rleInarcExecuteQuery();
            return;
         } else {
            this.type = 'warn';
            this.message = this.translateService.translate('common.addupdateremoverecordfailed');
            this.show();
            this.rleInarcExecuteQuery();
            return;
         }
      });
   }

   modprivExecuteQuery() {
      const serviceObj = this.oumrestaFactory.modPrivExecuteQuery(this.modprivModel);
      serviceObj.subscribe(data => {
         if (data.length === 0) {
            this.modprivData = [];
         } else {
            this.modprivData = data;
            this.modprivIndex = 0;
         }
      });
   }


   rleInarcRcriExecuteQuery() {
      const serviceObj = this.oumrestaFactory.rleInarcRcriExecuteQuery(this.rleinarcRircModel);
      serviceObj.subscribe(data => {
         if (data.length === 0) {
            this.rleinarcRircData = [];
         } else {
            data.forEach(element => {
               element.codeInput = element.domain;
            });
            this.rleinarcRircData = data;
            this.rleinarc1Index = 0;
         }
      });
   }

   rleInarcRircCommit(event) {
      if (!this.rdValidations()) {
         return false;
      }
      this.rleinarcRircInsertList = event.added;
      this.rleinarcRircUpdatetList = event.updated;
      this.rleinarcRirc1DeleteList = event.removed;
      this.rleinarcRircCommitModel.insertList = [];
      this.rleinarcRircCommitModel.updateList = [];
      this.rleinarcRircCommitModel.deleteList = [];
      if (this.rleinarcRircInsertList.length > 0 || this.rleinarcRircUpdatetList.length > 0) {
         for (let i = 0; i < this.rleinarcRircInsertList.length; i++) {
            this.rleinarcRircInsertList[i].moduleName = this.rleinarcModel.moduleName;
            this.rleinarcRircInsertList[i].roleId = this.modprivModel.roleId;
            this.rleinarcRircInsertList[i].createUserId = this.sessionManager.getId();
            this.rleinarcRircInsertList[i].createDatetime = DateFormat.getDate();
         }
         for (let i = 0; i < this.rleinarcRircUpdatetList.length; i++) {
         }
         this.rleinarcRircCommitModel.insertList = this.rleinarcRircInsertList;
         this.rleinarcRircCommitModel.updateList = this.rleinarcRircUpdatetList;
      }
      if (this.rleinarcRirc1DeleteList.length > 0) {
         for (let i = 0; i < this.rleinarcRirc1DeleteList.length; i++) {
         }
         this.rleinarcRircCommitModel.deleteList = this.rleinarcRirc1DeleteList;
      }
      const rleinarc1SaveData = this.oumrestaFactory.rleInarcRircCommit(this.rleinarcRircCommitModel);
      rleinarc1SaveData.subscribe(data => {
         if (data === 1) {
            this.type = 'success';
            this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
            this.show();
            this.referenceDomainService.clearCache();
            this.lovService.clearCache();
            this.rleInarcRcriExecuteQuery();
            return;
         }
         if (data === 2) {
            this.type = 'warn';
            this.message = this.translateService.translate('oumresta.rowexistsalreadywithsameRoleIdDomainCodeModuleName');
            this.show();
            this.rleInarcRcriExecuteQuery();
            return;
         } else {
            this.type = 'warn';
            this.message = this.translateService.translate('common.addupdateremoverecordfailed');
            this.show();
            this.rleInarcRcriExecuteQuery();
            return;
         }
      });
   }

}
