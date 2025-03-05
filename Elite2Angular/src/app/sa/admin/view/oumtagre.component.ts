import {
   Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumtagreService } from '@sa/admin/service/oumtagre.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ModuleTables } from '@sa/admin/beans/ModuleTables';
import { ModuleTabColumns } from '@sa/admin/beans/ModuleTabColumns';
import { ModuleTablesCommitBean } from '@sa/admin/beans/ModuleTablesCommitBean';
import { ModuleTabColumnsCommitBean } from '@sa/admin/beans/ModuleTabColumnsCommitBean';
import { OmsModules } from '../../usersystemsecurity/beans/OmsModules';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';

@Component({
   selector: 'app-oumtagre',
   templateUrl: './oumtagre.component.html'
})

export class OumtagreComponent implements OnInit {
   actionName: string;
   lovModel: any[];
   msgs: any[] = [];
   msglist = [];
   @ViewChild('mtGrid', {static: true}) mtGrid: any;
   @ViewChild('mtcGrid', {static: true}) mtcGrid: any;
   type = 'error';
   message = ' Invalid.';
   nameOfLovPage: string;
   listToCompare: any[] = [];
   rleinarcIndex: number;
   moduletablesData: ModuleTables[] = [];
   aduitOnTablesData: ModuleTables[] = [];
   auditTablesModel: ModuleTables = new ModuleTables();
   moduletablesDataTemp: ModuleTables[] = [];
   moduletablesModel: ModuleTables = new ModuleTables();
   moduletablesIndex: number;
   moduletablesInsertList: ModuleTables[] = [];
   moduletablesUpdateList: ModuleTables[] = [];
   moduletablesDeleteList: ModuleTables[] = [];

   auditTablesInsertList: ModuleTables[] = [];
   auditTablesUpdateList: ModuleTables[] = [];
   auditTablesDeleteList: ModuleTables[] = [];

   moduletabcolumnsData: ModuleTabColumns[] = [];
   moduletabcolumnsDataTemp: ModuleTabColumns[] = [];
   moduletabcolumnsModel: ModuleTabColumns = new ModuleTabColumns();
   moduletabcolumnsIndex: number;
   moduletabcolumnsInsertList: ModuleTabColumns[] = [];
   moduletabcolumnsUpdateList: ModuleTabColumns[] = [];
   moduletabcolumnsDeleteList: ModuleTabColumns[] = [];
   tableName: string;
   moduleTablesColumnDef: any[];
   auditTablesColumnDef : any[];
   moduleTabColumnsColumnDef: any[];
   modulesColumnDef: any[];
   modulesIndex: number;
   rleInarcReadOnly: boolean;
   moduleTablesReadOnly: boolean;
   moduleTabColumnsReadOnly: boolean;
   mtcInsert: boolean;
   moduletablesCommitModel: ModuleTablesCommitBean = new ModuleTablesCommitBean();
   auditTablesCommitModel: ModuleTablesCommitBean = new ModuleTablesCommitBean();
   moduletabcolumnsCommitModel: ModuleTabColumnsCommitBean = new ModuleTabColumnsCommitBean();
   rleinarcModel: OmsModules = new OmsModules();
   rleinarcData: OmsModules[] = [];
   modtabcolEnableDelete: boolean;
   modtablesEnableDelete: boolean;
   moduleName : string;
   moduleTableInsert=false;
   tableMap: Map<string, string> = new Map<string, string>();
   tableTitle = { description: this.translateService.translate('oumtagre.tableName') };
   columnTitle = { description: this.translateService.translate('oumtagre.columnName') };
   setupTitle = {
      code: this.translateService.translate('oumtagre.moduleName'),
      moduleType: this.translateService.translate('common.description')
   };
   audittablesIndex: number;
   msg: string;
   viewAuditFlag : boolean = false;
   auditFlagUpdated : boolean = false;
   constructor(private oumtagreFactory: OumtagreService, public translateService: TranslateService,
      public sessionManager: UserSessionManager,public dialogService: DialogService) {
      this.moduleTablesColumnDef = [];
      this.moduleTabColumnsColumnDef = [];
      this.modulesColumnDef = [];
      this.auditTablesColumnDef=[];

   }
   ngOnInit() {
      this.modulesColumnDef = [
         {
            fieldName: this.translateService.translate('oumtagre.moduleName'), field: 'moduleName', datatype: 'text',
            editable: false, width: 250
         },
         {
            fieldName: this.translateService.translate('common.description'), field: 'description', datatype: 'text',
            editable: false, width: 300
         }
      ];

      this.moduleTablesColumnDef = [
         /* {
            fieldName: this.translateService.translate('oumtagre.block'), maxlength: 60,
            field: 'moduleBlock', uppercase: 'true', datatype: 'text', required : true ,editable: true
         }, */
         {
            fieldName: this.translateService.translate('oumtagre.tableNameMand'), field: 'objectName', datatype: 'lov',
            link: 'oumtagre/rgObjectNameRecordGroup', titles: this.tableTitle, cellEditable: this.canCellEdit, width: 300
         },
         {
            fieldName: this.translateService.translate('oumtagre.tablecomment'), field: 'tableComment', datatype: 'text',
            editable: false,wrapText: true, styleClass: 'cell-flow-wrap',width: 700
         },
         {
            fieldName: this.translateService.translate('oumtagre.audit'), field: 'auditFlag', editable: true,
            width: 150, datatype: 'checkbox'
          },
      ];

      this.auditTablesColumnDef = [
         {
            fieldName: this.translateService.translate('oumtagre.tableNameMand'), field: 'objectName', datatype: 'text',
             cellEditable: this.cantableAuditCellEdit, width: 300
         },
         {
            fieldName: this.translateService.translate('oumtagre.audit'), field: 'auditFlag', editable: true,
            width: 150, datatype: 'checkbox'
          }
      ];
      this.moduleTabColumnsColumnDef = [
         {
            fieldName: this.translateService.translate('oumtagre.columnNameMand'), field: 'columnName',
            datatype: 'lov', link: 'oumtagre/rgColumnNameRecordGroup?tableName=', parentField: 'tableName',
            titles: this.columnTitle, editable: true, width: 300
         },

         {
            fieldName: this.translateService.translate('oumtagre.lovItemName'), maxlength: 61,
            field: 'lovItemName', uppercase: 'true', datatype: 'text', editable: true, width: 300
         },

         {
            fieldName: this.translateService.translate('oumtagre.domain'), maxlength: 12, datatype: 'text',
            field: 'domain', uppercase: 'true', editable: true, width: 300
         },

         {
            fieldName: this.translateService.translate('oumtagre.refTables'), field: 'refTables', maxlength: 30,
            editable: true, width: 300
         },

         {
            fieldName: this.translateService.translate('oumtagre.setUpModule'), field: 'setupModule',
            datatype: 'lov', link: 'oumtagre/rgSetupModuleRecordGroup', titles: this.setupTitle, editable: true, width: 300
         },

         { fieldName: '', field: 'tableName', hide: true },
      ];
      this.mtcInsert = false;
      const tableDescription = this.oumtagreFactory.getTableDescriptions();
      tableDescription.subscribe(result => {
        if(result!=null && result.length>0){
         result.forEach(obj=>{
            this.tableMap.set(obj.objectName,obj.tableDescription);
            
         })
        }
      });
      //this.oumtagreexecuteQuery();


   }


   canCellEdit = (data: any, index: number, field: string) => {
      if (!data.moduleTabId) {
          return true;
      }
      return false;
  }

  cantableAuditCellEdit = (data: any, index: number, field: string) => {
  
   return true;
}
   show() {
      this.msglist = [];
      this.msglist.push({ message: this.message, type: this.type });
      this.msgs = [...this.msglist];
   }

   oumtagreexecuteQuery() {

      const serviceObj = this.oumtagreFactory.rleInarcExecuteQuery(this.moduletablesModel);
      serviceObj.subscribe(data => {
         if (data.length === 0) {
         } else if (data.length === 0) {
            this.rleinarcData = [];
         } else {
            this.rleinarcData = data;
            this.modulesIndex = 0;
         }
      });
   }
   onModuleNameChange(event){
      if(event){
         this.moduleTableInsert=true;
         this.moduletablesModel.moduleName=event.code;
         this.moduleTablesExecuteQuery();
         //this.auditTablesExecuteQuery();
      }else{
         this.moduletablesData = [];
         this.moduleTableInsert=false;
      }
      
   }

   moduleTablesExecuteQuery() {
      this.auditFlagUpdated = false;
      this.moduletablesModel.moduleName=this.moduleName;
      const serviceObj = this.oumtagreFactory.moduleTablesExecuteQuery(this.moduletablesModel);
      serviceObj.subscribe(data => {
         if (!data) {
            this.moduletablesData = [];
            this.moduletabcolumnsData = [];
            this.moduletablesModel = new ModuleTables();
            this.moduletabcolumnsModel = new ModuleTabColumns();
            this.mtcInsert = false;
         } else {
            if(data.moduleTableList.length !== 0){
               data.moduleTableList.forEach(element=>{
                  element.auditFlag = element.auditFlag === 'Y' ? true : false;
                  if (this.tableMap.size > 0) {
                  element.tableComment=this.tableMap.get(element.objectName);
                  }
               })
               this.moduletablesData = data.moduleTableList;
               this.moduletablesIndex = 0;
               this.mtcInsert = true;
            }
            this.viewAuditFlag = data.viewAuditFlag == 'Y' ? true : false;
         }
      });
   }

   moduleTabcolumnsExecuteQuery() {
      const serviceObj = this.oumtagreFactory.moduleTabColumnsExecuteQuery(this.moduletabcolumnsModel);
      serviceObj.subscribe(data => {
         if (data.length === 0) {
            this.moduletabcolumnsData = [];
         } else {
            data.forEach(element => {
               element.tableName = this.moduletablesModel.objectName + '-' + this.moduletablesModel.moduleTabId;
            });
            this.moduletabcolumnsData = data;
            this.moduletabcolumnsIndex = 0;
            this.mtcInsert = true;
         }
      });
   }

   onRowClickmodules(event) {
      if (event) {
         this.rleinarcModel = event;
         this.moduletablesModel.moduleName = this.rleinarcModel.moduleName;
      }
      if (this.moduletablesModel.moduleName) {
         this.moduleTablesExecuteQuery();
      }
   }

   onRowClickmoduletables(event) {
      if (event.createDatetime || event.createDatetime !== undefined) {
			this.modtablesEnableDelete = true;
		} else {
			this.modtablesEnableDelete = false;
		}
      if (event) {
         this.moduletablesModel = event;
         this.moduletabcolumnsModel.moduleTabId = this.moduletablesModel.moduleTabId;
      }
      /* if (this.moduletabcolumnsModel.moduleTabId) {
         this.moduleTabcolumnsExecuteQuery();
      } else {
         this.moduletabcolumnsData = [];
         this.mtcInsert = false;
      } */
   }
   onauditTablesRowClick(event) {
      if (event) {
         this.aduitOnTablesData = event;
      }
      /* if (this.moduletabcolumnsModel.moduleTabId) {
         this.moduleTabcolumnsExecuteQuery();
      } else {
         this.moduletabcolumnsData = [];
         this.mtcInsert = false;
      } */
   }

   onMTGridInsert = () => {
      if (!this.mtValidations()) {
         return false;
      }
      return {moduleName : this.moduleName};
   }

   
   onMTGridDelete = () => {
     /*  if (this.moduletabcolumnsData.length !== 0 || this.mtcGrid.removedMap.size > 0) {
         this.type = 'warn';
         this.message = this.translateService.translate('common.cannotdeletemaster');
         this.show();
         return;
      } */
      return true;
   }
   
   validateRowDataMT = (event) => {
      const rowdata = new ValidateRowReturn();
      const rowIndex = event.rowIndex;
      if (event.field === 'objectName') {
         if(event.newValue && event.newValue != event.oldValue){
            if (this.tableMap.size > 0) {
            this.mtGrid.setColumnData('tableComment',rowIndex,this.tableMap.get(event.newValue));
            }
            const serviceObj = this.oumtagreFactory.getAuditOnTable(event.newValue);
            serviceObj.subscribe(data => {
               if (data && data>0) {
                  this.mtGrid.setColumnData('auditFlag',rowIndex, true);
               }else{
                  this.mtGrid.setColumnData('auditFlag',rowIndex, false);
               }
      
            });
         }else if(!event.newValue){
            this.mtGrid.setColumnData('tableComment',rowIndex,null);
         }
        
        
     }

     
      rowdata.validated = true;
      return rowdata;
   }



   validateTriggerExist(tableName){
      const serviceObj = this.oumtagreFactory.validateTrigger(tableName);
      serviceObj.subscribe(data => {
         if (data !== 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('oumtagre.triggerExist');
            this.message = String(this.message).replace('&tableName&', tableName);
            this.show();
            return false;
         }

      });
      return true;

   }


   onModuleTableClear = () => {
      this.moduleTablesExecuteQuery();
      return true;
  }
   mtValidations() {
      const is = { valid: true };
      if (this.moduletablesData.length > 0) {
      for(let i = 0; i < this.moduletablesData.length; i++){
         for(let j = i+1; j < this.moduletablesData.length;j++){
              if(this.moduletablesData[i].objectName == this.moduletablesData[j].objectName){
               this.type = 'warn';
               this.message = this.translateService.translate('oumtagre.duplicatetableName');
               this.show();
               is.valid = false;
               return;
              }
         }
      }
      }

      return is.valid;
   }

   onRowClickmoduletabcolumns(event) {
      if (event.createDatetime || event.createDatetime !== undefined) {
			this.modtabcolEnableDelete = true;
		} else {
			this.modtabcolEnableDelete = false;
		}
   }

   onMTCGridInsert = () => {
      if (!this.mtcValidations()) {
         return false;
      }
      return {
         tableName: this.moduletablesModel.objectName + '-' + this.moduletablesModel.moduleTabId
      };
   }
   onMTCGridDelete = () => {
      return true;
   }
  
   validateRowDataMTC = (event) => {
      const rowdata = new ValidateRowReturn();
      const rowIndex = this.moduletabcolumnsData.indexOf(event.data);

      rowdata.validated = true;
      return rowdata;
   }

   mtcValidations() {
      const is = { valid: true };
      this.moduletabcolumnsDataTemp = [];
      this.mtcGrid.addedMap.forEach(
         (v: any, k: number) => {
            this.moduletabcolumnsDataTemp.push(v);
         });
      this.mtcGrid.updatedMap.forEach(
         (v: any, k: number) => {
            this.moduletabcolumnsDataTemp.push(v);
         });

      this.moduletabcolumnsDataTemp.forEach(data => {
         if (!data.columnName) {
            this.type = 'warn';
            this.message = this.translateService.translate('oumtagre.columnNamemustbeentered');
            this.show();
            is.valid = false;
            return;
         }
      });

      return is.valid;
   }
   moduletablesSave(event) {
      if (!this.mtValidations()) {
         return false;
      }
      this.moduletablesInsertList = event.added;
      this.moduletablesUpdateList = event.updated;
      this.moduletablesDeleteList = event.removed;
      this.moduletablesCommitModel.insertList = [];
      this.moduletablesCommitModel.updateList = [];
      this.moduletablesCommitModel.deleteList = [];
      this.moduletablesCommitModel.continueFlag='N';
      if (this.moduletablesInsertList.length > 0 || this.moduletablesUpdateList.length > 0) {
         for (let i = 0; i < this.moduletablesInsertList.length; i++) {
            this.moduletablesInsertList[i].moduleName = this.moduleName;
            this.moduletablesInsertList[i].createUserId = this.sessionManager.getId();
            this.moduletablesInsertList[i].createDatetime = DateFormat.getDate();
            this.moduletablesInsertList[i].auditFlag = this.moduletablesInsertList[i].auditFlag ? 'Y' : 'N';
         }
         for (let i = 0; i < this.moduletablesUpdateList.length; i++) {
            this.moduletablesUpdateList[i].modifyUserId = this.sessionManager.getId();
            this.moduletablesUpdateList[i].modifyDatetime = DateFormat.getDate();
            this.moduletablesUpdateList[i].auditFlag = this.moduletablesUpdateList[i].auditFlag ? 'Y' : 'N';
         }
         this.moduletablesCommitModel.insertList = this.moduletablesInsertList;
         this.moduletablesCommitModel.updateList = this.moduletablesUpdateList;
      }
      if (this.moduletablesDeleteList.length > 0) {
         for (let i = 0; i < this.moduletablesDeleteList.length; i++) {
            this.moduletablesDeleteList[i].auditFlag = this.moduletablesDeleteList[i].auditFlag ? 'Y' : 'N';
         }
         this.moduletablesCommitModel.deleteList = this.moduletablesDeleteList;
      }
      //To save the View Audit Flag in OMS_MODULES
      if(this.auditFlagUpdated){
         let auditBlock = {
            'viewAuditFlag' : this.viewAuditFlag? 'Y' : 'N' ,
            'moduleName' : this.moduleName
         }
         this.moduletablesCommitModel['auditLog'] = auditBlock;
      }
      this.saveModuleTableCommit();
   }

saveModuleTableCommit(){
   const moduletablesSaveData = this.oumtagreFactory.moduleTablesCommit(this.moduletablesCommitModel);
      moduletablesSaveData.subscribe(result => {
         if(result && result.warnMessage){
            this.msg= result.warnMessage+ ' '+(this.translateService.translate('oumtagre.tableassociationwarn'));
            const data = {
               label: this.msg, yesBtn: true, noBtn: true
             };
             this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
               if (result) {
                  this.moduletablesCommitModel.continueFlag='Y';
                  this.saveModuleTableCommit();
               } else {
                  this.moduleTablesExecuteQuery();
               }
       
             });
         
         } else if (result && result.sealFlag === '1') {
				this.type = 'success';
            this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
            this.show();
            this.moduleTablesExecuteQuery();
			} else if (result && result.sealFlag === '0') {
            this.type = 'warn';
            this.message = this.translateService.translate('common.addupdateremoverecordfailed');
            this.show();
			} else if(result && result.sealFlag){
            this.type = 'warn';
            this.message = result.sealFlag;
            this.show();
         }
        
      });
}

   
   oumtagreSavemoduletabcolumnsForm(event) {
      if (!this.mtcValidations()) {
         return false;
      }
      this.moduletabcolumnsInsertList = event.added;
      this.moduletabcolumnsUpdateList = event.updated;
      this.moduletabcolumnsDeleteList = event.removed;
      this.moduletabcolumnsCommitModel.insertList = [];
      this.moduletabcolumnsCommitModel.updateList = [];
      this.moduletabcolumnsCommitModel.deleteList = [];
      if (this.moduletabcolumnsInsertList.length > 0 || this.moduletabcolumnsUpdateList.length > 0) {
         for (let i = 0; i < this.moduletabcolumnsInsertList.length; i++) {
            this.moduletabcolumnsInsertList[i].moduleTabId = this.moduletablesModel.moduleTabId;
            this.moduletabcolumnsInsertList[i].createUserId = this.sessionManager.getId();
            this.moduletabcolumnsInsertList[i].createDatetime = DateFormat.getDate();
         }
         for (let i = 0; i < this.moduletabcolumnsUpdateList.length; i++) {
         }
         this.moduletabcolumnsCommitModel.insertList = this.moduletabcolumnsInsertList;
         this.moduletabcolumnsCommitModel.updateList = this.moduletabcolumnsUpdateList;
      }
      if (this.moduletabcolumnsDeleteList.length > 0) {
         for (let i = 0; i < this.moduletabcolumnsDeleteList.length; i++) {
         }
         this.moduletabcolumnsCommitModel.deleteList = this.moduletabcolumnsDeleteList;
      }
      const moduletabcolumnsSaveData = this.oumtagreFactory.moduleTabColumnsCommit(this.moduletabcolumnsCommitModel);
      moduletabcolumnsSaveData.subscribe(data => {
         if (data === 1) {
            this.type = 'success';
            this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
            this.show();
            this.moduleTabcolumnsExecuteQuery();
         } else {
            this.type = 'warn';
            this.message = this.translateService.translate('common.addupdateremoverecordfailed');
            this.show();
            this.oumtagreexecuteQuery();
         }
      });
   }

   viewAuditChange(event) { 
      if(event){
         this.auditFlagUpdated = true;
      }
   }

   onSave() {
      const gridSave = { added: [], updated: [], removed: [] };
      if (this.mtGrid) {
         const added = [];
         this.mtGrid.addedMap.forEach(key => {
             added.push(key);
         });
         const updated = [];
         this.mtGrid.updatedMap.forEach(value => {
             updated.push(value);
         });
         const removed = [];
         this.mtGrid.removedMap.forEach((value, keys) => {
             removed.push(value);
         });
         gridSave.added = JSON.parse(JSON.stringify(added));
         gridSave.updated = JSON.parse(JSON.stringify(updated));
         gridSave.removed = JSON.parse(JSON.stringify(removed));
     }
      this.moduletablesSave(gridSave);
   }

   get isSaveDisable() {
      if (this.auditFlagUpdated || this.mtGrid.addedMap.size > 0 || this.mtGrid.updatedMap.size > 0 || this.mtGrid.removedMap.size > 0) {
         return false;
      }
      return true;
   }
}
