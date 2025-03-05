import {
  Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumwmenuService } from '@sa/admin/service/oumwmenu.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { WorkflowFolders } from '@sa/admin/beans/WorkflowFolders';
import { WorkflowScreens } from '@sa/admin/beans/WorkflowScreens';
import { WfFoldersCommitBean } from '@sa/admin/beans/WfFoldersCommitBean';
import { WfScreensCommitBean } from '@sa/admin/beans/WfScreensCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';


@Component({
  selector: 'app-oumwmenu',
  templateUrl: './oumwmenu.component.html'

})

export class OumwmenuComponent implements OnInit {
  @ViewChild('menuGrid', {static: true}) menuGrid: any;
  @ViewChild('screenGrid', {static: true}) screenGrid: any;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  wffoldersData: WorkflowFolders[] = [];
  workFlowRowData: WorkflowFolders[] = [];
  workScreenRowData: WorkflowScreens[] = [];
  workFlowactiveData: WorkflowFolders[] = [];
  wffoldersDataTemp: WorkflowFolders[] = [];
  wffoldersModel: WorkflowFolders = new WorkflowFolders();
  wffoldersSearchModel: WorkflowFolders = new WorkflowFolders();
  wffoldersIndex: number;
  wffoldersInsertList: WorkflowFolders[] = [];
  wffoldersUpdatetList: WorkflowFolders[] = [];
  wffoldersDeleteList: WorkflowFolders[] = [];
  wfscreensData: WorkflowScreens[] = [];
  wfscreensDataTemp: WorkflowScreens[] = [];
  wfscreensModel: WorkflowScreens = new WorkflowScreens();
  wfscreensIndex: number;
  wfscreensInsertList: WorkflowScreens[] = [];
  wfscreensUpdatetList: WorkflowScreens[] = [];
  wfscreensDeleteList: WorkflowScreens[] = [];
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable: boolean;
  wfFoldersColumnDef: any[];
  caldFpColumnDef: any[];
  wfScreensColumnDef: any[];
  caldFpReadOnly: boolean;
  wfFoldersReadOnly: boolean;
  wfScreensReadOnly: boolean;
  rgmenusnameRg: any[] = [];
  rgcaseloadtypeRg: any[] = [];
  rgscreensmodulenameRg: any[] = [];
  message: string;
  type: string;
  WfFoldersCommitBean: WfFoldersCommitBean = new WfFoldersCommitBean();
  WfScreensCommitBean: WfScreensCommitBean = new WfScreensCommitBean();
  caseLoadTitles = { code: this.translateService.translate('ocmnoque.caseLoadLovTitle') };
  caseLoadLink: string;
  menuLinkins: string;
  clearDisabled: boolean;
  retriveDisabled: boolean;
  tableIndex = -1;
  namesReadOnly: boolean;
  deleData: boolean;
  deleScreenData: boolean;
  enableInsert: boolean;
  enableWorkInsert: boolean;
  workDesc: string;
  caseLoadDesc: string;
  screenOptions: { code: string; description: string; }[];
  workSequence: number;
  modulesMap: Map<string, string> = new Map<string, string>();
  screenMap: Map<string, string> = new Map<string, string>();
  constructor(private oumwmenuFactory: OumwmenuService, public translateService: TranslateService,
    public sessionManager: UserSessionManager) {
    this.wfFoldersColumnDef = [];
    this.wfScreensColumnDef = [];

  }
  ngOnInit() {
    this.enableWorkInsert = true;
    this.enableInsert = false;
    this.deleData = true;
    this.deleScreenData = true;
    this.namesReadOnly = false;
    this.retriveDisabled = false;
    this.clearDisabled = true;
    this.menuLinkins = 'oumwmenu/rgMenusNameRecordGroup';
    const menuLinks = 'oumwmenu/rgMenusNameRecordGroup';
    const screenLink = 'oumwmenu/rgScreensModuleNameRecordGroup';
    this.wfFoldersExecuteQuery();
    this.screenOptions = [
      { code: 'COMM', description: 'COMM', },
      { code: 'INST', description: 'INST', },
    ];
    this.wfFoldersColumnDef = [
      {

        fieldName: this.translateService.translate('oumwmenu.nameId') + '*', field: 'workFlowCode', editable: true,
        datatype: 'lov', width: 150,domain:'WORKFLO_MENU'/* link: 'oumwmenu/rgMenusNameRecordGroup'*/, cellEditable: this.canCellEdit,
        titles: {  code: this.translateService.translate('common.code'),
        description: this.translateService.translate('common.description')}
      },
      {
        fieldName: this.translateService.translate('common.sequencename') + '*', field: 'workFlowSeq', editable: true,
        width: 150, maxValue: '999999', datatype: 'number',  whole: true
      },
      {
        fieldName: this.translateService.translate('oumwmenu.caseLoad') + '*', field: 'caseLoadType', editable: true, width: 100,
        datatype: 'lov',domain:'CLOAD_TYPE'/* link: 'oumwmenu/rgCaseloadTypeRecordGroup'*/, titles: this.caseLoadTitles
      },
      {
        fieldName: this.translateService.translate('common.active'), field: 'activeFlag',
        editable: true, width: 150, datatype: 'checkbox', maxlength: 1
      },
      {
        fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
        editable: false, width: 150, datatype: 'date', maxlength: 1
      },

    ];

    this.wfScreensColumnDef = [
      {
        fieldName: this.translateService.translate('oumwmenu.moduleId') + '*', field: 'moduleName', editable: true, width: 150,
        datatype: 'lov', link: 'oumwmenu/rgScreensModuleNameRecordGroup', cellEditable: this.canCellEdit,
        titles: {  code: this.translateService.translate('common.modulename'),
        description: this.translateService.translate('common.description')}
      },
      {
        fieldName: this.translateService.translate('common.sequencename') + '*', field: 'workFlowSeq', editable: true,
        width: 150, maxValue: '999999', datatype: 'number',  whole: true
      },
      {
        fieldName: this.translateService.translate('oumwmenu.tooltip')+ '*', field: 'toolTip', editable: true, width: 150,
        datatype: 'text', maxlength: 100, uppercase:'false'
    },

    ];

    const result = this.oumwmenuFactory.
      rgMenusNameRecordGroup();
    result.subscribe(data => {
      if (data.length === 0) {
      } else {
        data.forEach(ele => {
          this.modulesMap.set(ele.code, ele.description);
        });
      }
    });


    const results = this.oumwmenuFactory.
      rgScreensModuleNameRecordGroup();
    results.subscribe(data => {
      if (data.length === 0) {
      } else {
        data.forEach(ele => {
          this.screenMap.set(ele.code, ele.description);
        });
      }
    });






  }
  show(vldmsg, type?) {
    type = type ? type : 'warn';
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }




  canCellEdit = (data: any, index: number, field: string): boolean => {

    if (!data.createDatetime) {
      return true;
    } else {
      return false;
    }

  }
  get clearDisabledEvent() {

    if (this.workSequence || this.workSequence === 0 || this.workDesc || this.caseLoadDesc || this.wffoldersData.length > 0) {

      return false;
    }

    return true;
  }
  isInsertable() {
    if (this.wffoldersModel.workFlowCode || this.wffoldersModel.workFlowSeq ||
      this.wffoldersModel.caseLoadType) {
      this.clearDisabled = false;
    } else {
      this.clearDisabled = true;
    }

  }
  clear() {

    this.workSequence = undefined;
    this.workDesc = undefined;
    this.caseLoadDesc = undefined;
    this.enableInsert = false;
    this.clearDisabled = true;
    this.retriveDisabled = false;
    this.namesReadOnly = false;
    this.wffoldersData = [];
    this.wffoldersModel = new WorkflowFolders();
    this.wfscreensData = [];
    this.wfscreensModel = new WorkflowScreens();
    this.wffoldersModel = new WorkflowFolders();

  }
  workFlowBlur() {
    if (!this.wffoldersModel.workFlowCode) {
      this.wffoldersModel.workFlowCode = this.wffoldersModel.workFlowCode === '' ? undefined : '';
      this.workDesc = '';
    }
  }

  caseLoadBlur() {

    if (!this.wffoldersModel.caseLoadType) {
      this.wffoldersModel.caseLoadType = this.wffoldersModel.caseLoadType === '' ? undefined : '';
      this.caseLoadDesc = '';
      if (this.wffoldersModel.caseLoadType === undefined) {
        this.wffoldersModel.caseLoadType = undefined;
        this.caseLoadDesc = undefined;
      }
    }
  }
  wfFoldersExecuteQuery() {
    this.wffoldersModel = new WorkflowFolders();
    const serviceObj = this.oumwmenuFactory.
      wfFoldersExecuteQuery(this.wffoldersModel);
    this.deleData = true;
    serviceObj.subscribe(wfFolderList => {
      if (wfFolderList.length === 0) {
        this.wffoldersData = [];
        this.type = 'warn';
        this.show('oumwmenu.noRecord');
        this.workDesc = '';
        this.workSequence = undefined;
        this.caseLoadDesc = '';
        this.wffoldersModel = new WorkflowFolders();

      } else {
        wfFolderList.forEach(element => {
          element.activeFlag = element.activeFlag === 'Y' ? true : false;

        });
        this.enableWorkInsert = true;
        this.clearDisabled = false;
        this.retriveDisabled = true;
        this.namesReadOnly = true;
        this.wffoldersData = wfFolderList;
        this.tableIndex = 0;


      }
    });


  }
  wfFoldersCommit(event) {
    this.wffoldersInsertList = [];
    this.wffoldersUpdatetList = [];
    this.wffoldersDeleteList = [];
    this.wffoldersInsertList = event.added;
    this.wffoldersUpdatetList = event.updated;
    this.wffoldersDeleteList = event.removed;
    this.WfFoldersCommitBean.insertList = [];
    this.WfFoldersCommitBean.updateList = [];
    this.WfFoldersCommitBean.deleteList = [];
    if (this.wffoldersInsertList.length > 0 || this.wffoldersUpdatetList.length > 0) {
      for (let i = 0; i < this.wffoldersInsertList.length; i++) {
        if (!this.wffoldersInsertList[i].workFlowCode) {
          this.show(this.translateService.translate('oumwmenu.nameMenu'));
          return;
        }
         if (!this.wffoldersInsertList[i].workFlowSeq && this.wffoldersInsertList[i].workFlowSeq !== 0) {
          this.show(this.translateService.translate('common.sequencemustbeentered'));
          return;
        }
        if (!this.wffoldersInsertList[i].caseLoadType) {
          this.show(this.translateService.translate('common.caseLoadType'));
          return;
        }
        if (this.wffoldersInsertList[i].workFlowCode) {
          this.wffoldersInsertList[i].description = this.modulesMap.get(this.wffoldersInsertList[i].workFlowCode);
        }
        this.wffoldersInsertList[i].activeFlag = String(this.wffoldersInsertList[i].activeFlag) == 'true' ? 'Y' : 'N';
        this.WfFoldersCommitBean.insertList = this.wffoldersInsertList;
      }
      for (let i = 0; i < this.wffoldersUpdatetList.length; i++) {

        if (!this.wffoldersUpdatetList[i].workFlowSeq && this.wffoldersUpdatetList[i].workFlowSeq !== 0) {
          this.show(this.translateService.translate('common.sequencemustbeentered'));
          return;
        }
        if (!this.wffoldersUpdatetList[i].caseLoadType) {
          this.show(this.translateService.translate('common.caseLoadType'));
          return;
        }
        if (this.wffoldersUpdatetList[i].workFlowCode) {
          this.wffoldersUpdatetList[i].description = this.modulesMap.get(this.wffoldersUpdatetList[i].workFlowCode);
        }
        this.wffoldersUpdatetList[i].activeFlag = String(this.wffoldersUpdatetList[i].activeFlag) == 'true' ? 'Y' : 'N';
        this.WfFoldersCommitBean.updateList = this.wffoldersUpdatetList;
      }


    }
    if (this.wffoldersDeleteList.length > 0) {
      for (let i = 0; i < this.wffoldersDeleteList.length; i++) {
        if (!this.wffoldersDeleteList[i].workFlowSeq && this.wffoldersDeleteList[i].workFlowSeq !== 0) {
          this.show(this.translateService.translate('common.sequencemustbeentered'));
          return;
        }
        if (!this.wffoldersDeleteList[i].caseLoadType) {
          this.show(this.translateService.translate('common.caseLoadType'));
          return;
        }

        this.WfFoldersCommitBean.deleteList = this.wffoldersDeleteList;
      }

    }
    const wffoldersSaveData = this.oumwmenuFactory.wfFoldersCommit(this.WfFoldersCommitBean);
    wffoldersSaveData.subscribe(data => {
      if (data === 1) {
        this.type = 'info';
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
        this.wfFoldersExecuteQuery();
      } else if (data === 2) {
        this.show(this.translateService.translate('oumwmenu.sameRow'));
        this.wfFoldersExecuteQuery();
      } else if (data === 3) {
        this.show(this.translateService.translate('oumwmenu.parentDelete'));
        this.wfFoldersExecuteQuery();
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
        this.wfFoldersExecuteQuery();
      }
    });
  }



  wfScreensExecuteQuery() {
    if (this.wffoldersModel.workFlowCode) {
      this.wfscreensModel.workFlowCode = this.wffoldersModel.workFlowCode;
      this.wfscreensModel.description = this.wffoldersModel.description;
    }


    const wfscreensResult = this.oumwmenuFactory.

      wfScreensExecuteQuery(this.wfscreensModel);
    this.deleScreenData = true;
    wfscreensResult.subscribe(wfScreenList => {
      if (wfScreenList.length === 0) {
        this.wfscreensData = [];
      }
      this.enableInsert = true;
      this.wfscreensData = wfScreenList;

    });


  }

  onRowClickwffolders(event) {
    if (event) {
      if (event.createDatetime) {
        this.enableInsert = true;
      } else {
        this.enableInsert = false;
      }
      this.wffoldersModel = event;
      this.wfscreensModel = new WorkflowScreens();

      if (this.wffoldersModel.workFlowCode && event.createDatetime) {
        this.wfscreensModel.workFlowCode = this.wffoldersModel.workFlowCode;
        this.wfScreensExecuteQuery();
      } else {
        this.wfscreensData = [];
      }
      this.wffoldersModel = new WorkflowFolders();
    } else {
      this.enableInsert = false;
    }

  }
  wfScreensCommit(event) {

    this.wfscreensInsertList = [];
    this.wfscreensUpdatetList = [];
    this.wfscreensDeleteList = [];
    this.wfscreensInsertList = event.added;
    this.wfscreensUpdatetList = event.updated;
    this.wfscreensDeleteList = event.removed;
    this.WfScreensCommitBean.insertList = [];
    this.WfScreensCommitBean.updateList = [];
    this.WfScreensCommitBean.deleteList = [];

    if (this.wfscreensInsertList.length > 0 || this.wfscreensUpdatetList.length > 0) {
      this.WfScreensCommitBean.insertList = this.wfscreensInsertList;
      for (let j = 0; j < this.wfscreensInsertList.length; j++) {
        if (this.wfscreensModel.workFlowCode) {
          this.wfscreensInsertList[j].workFlowCode = this.wfscreensModel.workFlowCode;
          this.wfscreensInsertList[j].description = this.wfscreensModel.description;
        }

        if (!this.wfscreensInsertList[j].moduleName) {
          this.show(this.translateService.translate('oumwmenu.moduleName'));
          return;
        }
        if (!this.wfscreensInsertList[j].workFlowSeq && this.wfscreensInsertList[j].workFlowSeq !== 0) {
          this.show(this.translateService.translate('common.sequencemustbeentered'));
          return;
        }


        if (this.wfscreensInsertList[j].moduleName) {
          this.wfscreensInsertList[j].description = this.screenMap.get(this.wfscreensInsertList[j].moduleName);
        }

        this.WfScreensCommitBean.insertList = this.wfscreensInsertList;
      }
      for (let i = 0; i < this.wfscreensUpdatetList.length; i++) {
        if (!this.wfscreensUpdatetList[i].workFlowSeq  && this.wfscreensUpdatetList[i].workFlowSeq !== 0) {
          this.show(this.translateService.translate('common.sequencemustbeentered'));
          return;
        }
        if (this.wfscreensUpdatetList[i].moduleName) {
          this.wfscreensUpdatetList[i].description = this.screenMap.get(this.wfscreensUpdatetList[i].moduleName);
        }
        this.WfScreensCommitBean.updateList = this.wfscreensUpdatetList;
      }
    }

    if (this.wfscreensDeleteList.length > 0) {
      for (let i = 0; i < this.wfscreensDeleteList.length; i++) {
        if (!this.wfscreensDeleteList[i].workFlowSeq  && this.wfscreensDeleteList[i].workFlowSeq !== 0) {
          this.show(this.translateService.translate('common.sequencemustbeentered'));
          return;
        }
        this.WfScreensCommitBean.deleteList = this.wfscreensDeleteList;
      }

    }
    const wfscreensSaveData = this.oumwmenuFactory.wfScreensCommit(this.WfScreensCommitBean);
    wfscreensSaveData.subscribe(data => {
      if (data === 1) {
        this.type = 'info';
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
        this.wfScreensExecuteQuery();
      } else if (data === 2) {
        this.show(this.translateService.translate('oumwmenu.sameScreeRow'));
        this.wfScreensExecuteQuery();
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
      }
    });
  }


  onGridInsertWorkFlow = () => {
    this.deleData = false;
    this.workFlowRowData = [];
    this.menuGrid.addedMap.forEach(
      (v: any, k: number) => {
        this.workFlowRowData.push(v);
      }
    );
    this.menuGrid.updatedMap.forEach(
      (v: any, k: number) => {
        this.workFlowRowData.push(v);
      }
    );
    for (let i = 0; i < this.workFlowRowData.length; i++) {
      if (!this.workFlowRowData[i].workFlowCode) {
        this.show(this.translateService.translate('oumwmenu.nameMenu'));
        return;
      }
      if (!this.workFlowRowData[i].workFlowSeq && this.workFlowRowData[i].workFlowSeq !== 0) {
        this.show(this.translateService.translate('common.sequencemustbeentered'));
        return;
      }
      if (!this.workFlowRowData[i].caseLoadType) {
        this.show(this.translateService.translate('common.caseLoadType'));
        return;
      }
    }
    return { activeFlag: true };
  }


  onGridInsertWorkScreen = () => {
    this.deleScreenData = false;
    this.workScreenRowData = [];
    this.screenGrid.addedMap.forEach(
      (v: any, k: number) => {
        this.workScreenRowData.push(v);
      }
    );
    this.screenGrid.updatedMap.forEach(
      (v: any, k: number) => {
        this.workScreenRowData.push(v);
      }
    );

    for (let i = 0; i < this.workScreenRowData.length; i++) {
      if (!this.workScreenRowData[i].moduleName) {
        this.show(this.translateService.translate('oumwmenu.moduleName'));
        return;
      }
      if (!this.workScreenRowData[i].workFlowSeq && this.workScreenRowData[i].workFlowSeq !== 0) {
        this.show(this.translateService.translate('common.sequencemustbeentered'));
        return;
      }
    }
    return { activeFlag: true };
  }
  validateMenuRowData = (event) => {
    const rowIndex = event.rowIndex
    const rowdata = new ValidateRowReturn();

    if (event.field === 'activeFlag') {
      if (event.field === 'activeFlag' && !(event.data.activeFlag)) {
        this.menuGrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
      } else {
        this.menuGrid.setColumnData('expiryDate', rowIndex, undefined);
      }
    }
    rowdata.validated = true;
    return rowdata;
  }

  onGridClear = () => {
    this.wfFoldersExecuteQuery();
    return true;
  }

}
