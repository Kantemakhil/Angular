import { LoginService } from './../../../common/login/service/login.service';
import {
   Component, OnInit,
   ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import {OumsyslabService} from '../service/oumsyslab.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OmsModules } from '../../usersystemsecurity/beans/OmsModules';
import  {SystemLable}from '@sa/admin/beans/SystemLable';
import {SystemLableCommitBean} from '@sa/admin/beans/SystemLableCommitBean';
import { ModulePrivileges } from '../../usersystemsecurity/beans/ModulePrivileges';
import { RoleInaccessibleRefCodes } from '@sa/admin/beans/RoleInaccessibleRefCodes';
import { RoleInaccessibleRefCodesCommitBean } from '@sa/admin/beans/RoleInaccessibleRefCodesCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OmsModulesCommitBean } from '@sa/admin/beans/OmsModulesCommitBean';
// import required bean declarations

@Component({
   selector: 'app-oumsyslab',
   templateUrl: './oumsyslab.component.html'
})

export class OumsyslabComponent implements OnInit {
   actionName: string;
   @ViewChild('grid', {static: true}) grid: any;
   lovModel: any[];
   msgs: any[] = [];
   msglist = [];
   type = 'error';
   message = ' Invalid.';
   tableIndex=0;
   nameOfLovPage: string;
   listToCompare: any[] = [];
   rleinarcData: OmsModules[] = [];
   rleinarcDataTemp: OmsModules[] = [];
   rleinarcModel: OmsModules = new OmsModules();
   rleinarcIndex: number;
   rleinarcInsertList: OmsModules[] = [];
   rleinarcUpdatetList: OmsModules[] = [];
   rleinarcDeleteList: OmsModules[] = [];
   modprivData: SystemLable[] = [];
   updateLabelData: SystemLable[] = [];
   LabelCommitBean:SystemLableCommitBean=new SystemLableCommitBean();
   modprivDataTemp: ModulePrivileges[] = [];
   modprivModel: SystemLable = new SystemLable();
   selectedTabIndex=0;
   modprivIndex: number;
   modprivInsertList: ModulePrivileges[] = [];
   modprivUpdatetList: ModulePrivileges[] = [];
   modprivDeleteList: ModulePrivileges[] = [];
   rleinarc1Index: number;
   systemlabelColumnDef: any[];
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
   profileBtnDisable:boolean;
   labelBtnDisable:boolean;
   modulesIndex: number;
   rleinarcRircEnableDelete: boolean;
   doaminTitle = { code: this.translateService.translate('oumresta.domain') };
   moduleTitle = {
      code: this.translateService.translate('common.modulename'),
      newCode: this.translateService.translate('common.description')
   };
   codeTitles = {
      code: this.translateService.translate('common.code'),
      description: this.translateService.translate('common.description')
   };
   constructor(private oumrestaFactory: OumsyslabService, public translateService: TranslateService,
      public sessionManager: UserSessionManager, private loginService: LoginService) {

      this.systemlabelColumnDef = [];
      this.modPrivColumnDef = [];
      this.modulesColumnDef = [];

   }
   ngOnInit() {
      this.modulesColumnDef = [
         {
            fieldName: this.translateService.translate('common.modulename'), field: 'moduleName', datatype: 'text',
            editable: false, width: 150,
         },
         {
            fieldName: this.translateService.translate('common.description'), field: 'description', datatype: 'text',
            editable: false, width: 300
         }
      ];

      this.systemlabelColumnDef = [
//         {
//            fieldName: this.translateService.translate('oumsylab.labelId'), field: 'labelId', editable: true, width: 150,
//            datatype: 'number', link: 'oumresta/cgfkRleInarc1DomainRecordGroup', titles: this.doaminTitle, cellEditable: this.canAlertEdit
//         },
         {
             fieldName: this.translateService.translate('oumsylab.moduleName'), field: 'moduleName', editable: true, width: 150,
             datatype: 'text', link: 'oumresta/cgfkRleInarc1DomainRecordGroup', titles: this.doaminTitle, cellEditable: this.canAlertEdit
             
         },
         {
             fieldName: this.translateService.translate('oumsylab.msgKey'), field: 'msgKey', editable: true, width: 150,
             datatype: 'text', link: 'oumresta/cgfkRleInarc1DomainRecordGroup', titles: this.doaminTitle, cellEditable: this.canAlertEdit
             
         },
         {
             fieldName: this.translateService.translate('oumsylab.msgValue'), field: 'msgValue', editable: true, width: 150,
             datatype: 'text', titles: this.doaminTitle, uppercase: 'false',tooltip:true
             
         },
         {
             fieldName: this.translateService.translate('oumsylab.msgType'), field: 'msgType', editable: true, width: 150,
             datatype: 'text', uppercase: 'false'
             
         }
      ];
      

      this.rleInarcExecuteQuery();
      this.countOfLabel();
      this.countOfProfile();
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

   onRowClickmodules(event) {
      if (event) {
         this.rleinarcModel = event;
      }
      if (this.rleinarcModel.moduleName) {
         this.modprivModel.moduleName = this.rleinarcModel.moduleName;
         this.LabelExecuteQuery();
      }
   }
   
    LabelExecuteQuery(){
        const serviceObj=this.oumrestaFactory.labelExecuteQuery(this.modprivModel)
        serviceObj.subscribe(data => {
            if (data.length === 0) {
               this.modprivData = [];
            } else {
               this.modprivData = data;
               this.modulesIndex = 0;
            }
         });
        
    }
    
    updateCache(){
      const serviceObj=this.oumrestaFactory.labelCacheUpdate();
      serviceObj.subscribe(data=>{
          if(data==1){
          this.reloadLanguage();
          
          
          }
      });

    }

    reloadLanguage() {
      this.loginService.getLoginMsgs(this.translateService.currentLang)
          .subscribe((data) => {
              this.translateService.loginmsgs = data.msgs;
              if (typeof (Storage) !== 'undefined') {
                  sessionStorage.setItem('langmsgs', JSON.stringify(data));
              }
          });
          this.loginService.getAppMsgs(this.translateService.currentLang).subscribe(data => {
            this.translateService.appmsgs = data;
            this.type = 'success';
            this.message = this.translateService.translate('oumsylab.cacheupdatesuccess');
             this.show();
        });
  }


    updatePropertyCommit(event){
       this.updateLabelData=event.updated;
       this.LabelCommitBean.updateList=[];
       if(this.updateLabelData.length>0){
           
       }
       this.LabelCommitBean.updateList=this.updateLabelData;
       const serviceObj=this.oumrestaFactory.updateSystemlabel(this.LabelCommitBean);
       
       serviceObj.subscribe(data=>{
           if(data==1){
           this.type = 'success';
           this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
           this.show();
           this.LabelExecuteQuery();
           }
       });
           
       
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
     
   }

   show() {
       this.msglist = [];
       this.msglist.push({ message: this.message, type: this.type });
       this.msgs = [...this.msglist];
   }
   setSystemLables(){
       this.oumrestaFactory.setSystemLables().subscribe(result=>{
           
           this.type = 'success';
           this.message = this.translateService.translate( 'oidincde.incidentdetailmustbeentered' );
           this.show();
           this.labelBtnDisable=true;
       });  
   }
   
   setSystemProfilesIntoSystemLables(){
       this.oumrestaFactory.setSystemProfilesIntoSystemLables().subscribe(result=>{
           
           this.type = 'success';
           this.message = this.translateService.translate( 'oidincde.incidentdetailmustbeentered' );
           this.show();
           this.profileBtnDisable=true;
       });  

   }
   countOfLabel(){
     this. oumrestaFactory.countOfLabel().subscribe(result=>{
         
         if(result > 0){
             this.labelBtnDisable=true;
         }else{
             this.labelBtnDisable=false; 
         }
     });  
   }
   
   countOfProfile(){
       this. oumrestaFactory.countOfProfile().subscribe(result=>{
           
           if(result > 0){
               this.profileBtnDisable=true;
           }else{
               this.profileBtnDisable=false; 
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
    
   }

}
