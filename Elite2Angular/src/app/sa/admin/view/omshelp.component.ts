import {
  Component, OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OmshelpService } from '../service/omshelp.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OmsModulesHelp } from '../../usersystemsecurity/beans/OmsModulesHelp';
import { OmsModulesHelpCommitBean} from '../beans/OmsModulesHelpCommitBean';
import { BaseHelpUrl } from '../../usersystemsecurity/beans/BaseHelpUrl';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
// import required bean declarations

@Component({
  selector: 'app-omshelp',
  templateUrl: './omshelp.component.html'
})

export class OmshelpComponent implements OnInit {
  @ViewChild('modifyTab', {static: true}) modifyTab: any;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  baseUrl:string;
  modulehelpData: OmsModulesHelp[] = [];
  tempModulehelp :OmsModulesHelp=new OmsModulesHelp();
  modifytabIndex: Number = 0;
  moduleHelpInsertList:OmsModulesHelp[]=[];
  moduleHelpUpdateList:OmsModulesHelp[]=[];
  moduleHelpDeleteList:OmsModulesHelp[]=[];
  baseUrlFetch:BaseHelpUrl = new BaseHelpUrl(); 
  baseUrlCommit:BaseHelpUrl = new BaseHelpUrl();
  minDate: Date;
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable: Boolean = true;
  modifyTabColumnDef: any[];
  modifyTabReadOnly: Boolean = false;
  cgfkModifytabmovementtypeRg: any[] = [];
  cgfkModifytabmovementreasoRg: any[] = [];
  lovparenttableRg: any[] = [];
  lovtablenameRg: any[] = [];
  lovcolumnnameRg: any[] = [];
  lovseqnameRg: any[] = [];
  modulehelpcommitModel:OmsModulesHelpCommitBean=new OmsModulesHelpCommitBean();
  type: string;
  modulesColumnDef:any[];
  message: string;
  tableIndex: number;
  modifyTabDeleteEnable: boolean;
  constructor(private oumcdtabFactory: OmshelpService, public translateService: TranslateService,
    public sessionManager: UserSessionManager) {
    // TODO initilize data members here..!
    this.modifyTabColumnDef = [];
  }
  ngOnInit() {
    this.modifyTabDeleteEnable = false;
    this.urlExecuteQuery();
    this.modulesColumnDef = [
             {
                fieldName: this.translateService.translate('omshelp.moduleName'), field: 'moduleName',
                editable: true, width: 150,datatype: 'lov', link: 'omshelp/rgOmsModuleRecordGroup', required:true
             },
             {
                fieldName: this.translateService.translate('omshelp.helpType'), field: 'helpType', datatype: 'lov',
                editable: true, width: 300,domain:'HELP_TYPE',required:true
             },
             {
                 fieldName: this.translateService.translate('omshelp.helpUrl'), field: 'helpUrl', datatype: 'text',
                 editable: true, width: 300 ,uppercase: 'false',required:true
              },
              {
                  fieldName: this.translateService.translate('omshelp.helpDesc'), field: 'helpDesc', datatype: 'text',
                  editable: true, width: 300,uppercase: 'false'
               }
                  ];
    // TODO all initializations here
    this.moduleHelpExecuteQuery();
  }
  canAlertEdit = (data: any, index: number, field: string): boolean => {
    if (!data.createDatetime) {
      return true;
    } else {
      return false;
    }
  }
  onGridInsert = () => { // TODO implement on grid insert 
    try {
//      this.modifytabData.forEach((element) => {
//        if (element.movementType === null || element.movementType === undefined) {
//          this.show(this.translateService.translate('oumcdtab.typemandetory'), 'warn');
//          throw new Error();
//        }
//        if (element.movementReasonCode === null || element.movementReasonCode === undefined) {
//          this.show(this.translateService.translate('oumcdtab.reasonmandetory'), 'warn');
//          throw new Error();
//        }
//        if (element.tableName === null || element.tableName === undefined) {
//          this.show(this.translateService.translate('oumcdtab.tablemandetory'), 'warn');
//          throw new Error();
//        }
//        if (element.listSeq === null || element.listSeq === undefined) {
//          this.show(this.translateService.translate('oumcdtab.seqmandetory'), 'warn');
//          throw new Error();
//        }
//      });
    } catch (e) {
      return false;
    }
    return { activeFlag: true };
  }
  onGridClear = () => {
//    this.modifytabExecuteQuery();
    return true;
  }
  validateRow = (event) => {
    const rowdata = new ValidateRowReturn();
    return rowdata;
  }  /** 
  * This function displays the messages
  */
  show(vldmsg, type?) {
    type = type ? type : 'warn';
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }
  
  moduleHelpExecuteQuery(){
    const serve=this.oumcdtabFactory.moduleHelpExecuteQuery();
    serve.subscribe(observe=>{
       if(observe==null &&  observe.length==0){
           this.modulehelpData=[]; 
       }else{
           this.modulehelpData=observe;
       }
    });
      
  }
//  onRowClickmodifytab(event) {
//    if (event) {
//      this.modifytabModel = event;
//      if (this.modifytabModel.createDatetime) {
//        this.modifyTabDeleteEnable = true;
//      } else {
//        this.modifyTabDeleteEnable = false;
//      }
//    }
//  }
//  validateRowData = (event) => {
//    const rowIndex = this.modifytabData.indexOf(event.data);
//    const rowdata = new ValidateRowReturn();
//    if (event.field === 'activeFlag') {
//      if (event.data.activeFlag) {
//        this.modifyTab.setColumnData('expiryDate', rowIndex, undefined);
//        rowdata.validated = true;
//        return rowdata;
//      } else if (!event.data.activeFlag) {
//        this.modifyTab.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
//        rowdata.validated = true;
//        return rowdata;
//      }
//    }
//    rowdata.validated = true;
//    return rowdata;
//  }
//  modifytabExecuteQuery() {
//    const modifytabResult = this.oumcdtabFactory.modifyTabExecuteQuery(this.modifytabModel);
//    modifytabResult.subscribe(modifytabResultList => {
//      if (modifytabResultList.length === 0) {
//        this.modifytabData = [];
//      } else {
//        modifytabResultList.forEach(element => {
//          element.activeFlag = element.activeFlag === 'Y' ? true : false;
//        });
//        this.modifytabData = modifytabResultList;
//        this.modifytabModel = modifytabResultList[0];
//        this.tableIndex = 0;
//      }
//    });
//  }

  modifyMandatoryFieldsValidations(conditionData) {
    const is = { valid: true };
    conditionData.forEach(data => {
      if (is.valid) {
        if (!data.movementType) {
          this.show(this.translateService.translate('oumcdtab.typemandetory'), 'warn');
          is.valid = false;
          return;
        }
        if (!data.movementReasonCode) {
          this.show(this.translateService.translate('oumcdtab.reasonmandetory'), 'warn');
          is.valid = false;
          return;
        }
        if (!data.tableName) {
          this.show(this.translateService.translate('oumcdtab.tablemandetory'), 'warn');
          is.valid = false;
          return;
        }
        if (!data.listSeq) {
          this.show(this.translateService.translate('oumcdtab.seqmandetory'), 'warn');
          is.valid = false;
          return;
        }
      }
    });
    return is.valid;
  }
 urlExecuteQuery(){
     const serve=this.oumcdtabFactory.urlExecuteQuery();
     serve.subscribe(observer=>{
         
         this.baseUrlFetch=observer;
         if (observer== 1) {
             this.show('common.addupdateremoverecordsuccess', 'success');
             this.urlExecuteQuery();
             return;
           }
     }) ;
     
     }
  insertBaseUrl(){
     this.baseUrlCommit.baseHelpPdfUrl=this.baseUrlFetch.baseHelpPdfUrl;
     this.baseUrlCommit.baseHelpVideoUrl=this.baseUrlFetch.baseHelpVideoUrl;
     this.baseUrlCommit.baseHelpHtmlUrl=this.baseUrlFetch.baseHelpHtmlUrl;
     this.baseUrlCommit.status='Y';
     this.baseUrlCommit.pid=this.baseUrlFetch.id;
     const serve= this.oumcdtabFactory.insertBaseUrl(this.baseUrlCommit);
     serve.subscribe(observer=>{
         if (observer== 1) {
             this.show('common.addupdateremoverecordsuccess', 'success');
             this.urlExecuteQuery();
             return;
           }
     }) ;
     
      
  }
  
  verfiyDuplicate(){ 
    var tempmodule=[];
    tempmodule.push(new OmsModulesHelp());
    for (let i = 0; i < this.modulehelpData.length; i++) {
    if(!this.tempModulehelp.helpType){
      this.show('omshelp.Helptypeenter', 'warn');
      return;
    }
    if(!this.tempModulehelp.moduleName){
      this.show('omshelp.modulenameenter', 'warn');
      return;
    }
    if(!this.tempModulehelp.helpUrl){
      this.show('omshelp.helpurlenter', 'warn');
      return;
    }
    
      for (let j = 0; j < tempmodule.length; j++) {
      if((this.modulehelpData[i].moduleName==tempmodule[j].moduleName) && (this.modulehelpData[i].helpType==tempmodule[j].helpType )){
        this.show('omshelp.Duplicate', 'warn');
        return true;
      } else{
        tempmodule.push(this.modulehelpData[i]);
      }
    }
      

    }
}
  
  /**
   *  This function will be executed when commit event is
  * fired
  */
  oumcdtabSavemodifytabForm(event) {
    // TODO declare commit bean and add insert list to that object.
    
    this.moduleHelpInsertList = event.added;
    this.moduleHelpUpdateList = event.updated;
    this.moduleHelpDeleteList = event.removed;
    this.modulehelpcommitModel.insertList = [];
    this.modulehelpcommitModel.updateList = [];
    this.modulehelpcommitModel.deleteList = [];
    if (this.moduleHelpInsertList.length > 0 ) {
      for (let i = 0; i < this.moduleHelpInsertList.length; i++) {
          if(!this.moduleHelpInsertList[i].helpType){
          this.show('omshelp.Helptypeenter', 'warn');
          return;
          }
          if(!this.moduleHelpInsertList[i].moduleName){
              this.show('omshelp.modulenameenter', 'warn');
              return;
              }
          if(!this.moduleHelpInsertList[i].helpUrl){
              this.show('omshelp.helpurlenter', 'warn');
              return;
              }
      }
    }
    if( this.moduleHelpUpdateList.length > 0){
        for (let i = 0; i < this.moduleHelpUpdateList.length; i++) {
            if(!this.moduleHelpUpdateList[i].helpType){
                this.show('omshelp.Helptypeenter', 'warn');
                return;
                }
            if(!this.moduleHelpUpdateList[i].moduleName){
                this.show('omshelp.modulenameenter', 'warn');
                return;
                }
            if(!this.moduleHelpUpdateList[i].helpUrl){
                this.show('omshelp.helpurlenter', 'warn');
                return;
                }
        } 
    }
    if (this.moduleHelpDeleteList.length > 0) {
      for (let i = 0; i < this.moduleHelpDeleteList.length; i++) {
       
      }
    }
    this.modulehelpcommitModel.insertList = this.moduleHelpInsertList;
    this.modulehelpcommitModel.updateList = this.moduleHelpUpdateList;
    this.modulehelpcommitModel.deleteList = this.moduleHelpDeleteList;
    const modifytabSaveData = this.oumcdtabFactory.moduleHelpCommit(this.modulehelpcommitModel);
    modifytabSaveData.subscribe(data => {
      if (data== 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.moduleHelpExecuteQuery();
        return;
      } 
    });
  }
}
