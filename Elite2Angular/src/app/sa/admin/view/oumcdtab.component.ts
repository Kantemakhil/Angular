import {
  Component, OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumcdtabService } from '../service/oumcdtab.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CopyTables } from '../beans/CopyTables';
import { CopyTablesCommitBean } from '../beans/CopyTablesCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
// import required bean declarations

@Component({
  selector: 'app-oumcdtab',
  templateUrl: './oumcdtab.component.html'
})

export class OumcdtabComponent implements OnInit {
  @ViewChild('modifyTab', {static: true}) modifyTab: any;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  modifytabData: CopyTables[] = [];
  modifytabDataTemp: CopyTables[] = [];
  modifytabModel: CopyTables = new CopyTables();
  modifytabIndex: Number = 0;
  modifytabInsertList: CopyTables[] = [];
  modifytabUpdatetList: CopyTables[] = [];
  modifytabDeleteList: CopyTables[] = [];
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
  modifytabCommitModel: CopyTablesCommitBean = new CopyTablesCommitBean();
  type: string;
  message: string;
  tableIndex: number;
  modifyTabDeleteEnable: boolean;
  constructor(private oumcdtabFactory: OumcdtabService, public translateService: TranslateService,
    public sessionManager: UserSessionManager) {
    // TODO initilize data members here..!
    this.modifyTabColumnDef = [];
  }
  ngOnInit() {
    this.modifyTabDeleteEnable = false;
    this.modifyTabColumnDef = [
      {
        fieldName: this.translateService.translate('oumcdtab.type'), field: 'movementType', editable: true, width: 150, datatype: 'lov',
        domain:'MOVE_TYPE'/*link: 'oumcdtab/cgfkModifyTabMovementTypeRecordGroup'*/, cellEditable: this.canAlertEdit,
        titles: {
          description: this.translateService.translate('oumcdtab.typelov'),
          code: this.translateService.translate('oumcdtab.lovdescription')
        }
      },
      {
        fieldName: this.translateService.translate('oumcdtab.reason'), field: 'movementReasonCode', editable: true, width: 150,
        parentField: 'movementType', datatype: 'lov', link: 'oumcdtab/cgfkModifyTabMovementReasoRecordGroup?movementType=',
        cellEditable: this.canAlertEdit,source:'OUMEMOVE',
        titles: {
          description: this.translateService.translate('oumcdtab.rsnlov'),
          code: this.translateService.translate('oumcdtab.lovdescription')
        }
      },
      {
        fieldName: this.translateService.translate('oumcdtab.parent'), field: 'parentTable', editable: true, width: 150, datatype: 'lov',
        link: 'oumcdtab/lovParentTableRecordGroup', cellEditable: this.canAlertEdit,
        titles: {
          description: this.translateService.translate('oumcdtab.omstablename'),
        }
      },
      {
        fieldName: 'Table*', field: 'tableName', editable: true, width: 150, datatype: 'lov', link: 'oumcdtab/lovTableNameRecordGroup',
        cellEditable: this.canAlertEdit,
        titles: {
          description: this.translateService.translate('oumcdtab.omstablename'),
        }
      },
      {
        fieldName: this.translateService.translate('oumcdtab.column'), field: 'colName', editable: true, width: 150, datatype: 'lov',
        parentField: 'tableName', link: 'oumcdtab/lovColumnNameRecordGroup?tableName=', cellEditable: this.canAlertEdit,
        titles: {
          description: this.translateService.translate('oumcdtab.columnname'),
        }
      },
      {
        fieldName: this.translateService.translate('oumcdtab.seqname'), field: 'seqName', editable: true, width: 150, datatype: 'lov',
        link: 'oumcdtab/lovSeqNameRecordGroup', cellEditable: this.canAlertEdit,
        titles: {
          description: this.translateService.translate('oumcdtab.seqnamelov'),
        }
      },
      {
        fieldName: this.translateService.translate('oumcdtab.seq'), field: 'listSeq', editable: true, width: 150,
        minValue: '0', maxValue: '999999', strictFP: true, whole: true, datatype: 'number'
      },
      {
        fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 150,
        datatype: 'checkbox'
      },
      {
        fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false, width: 150,
        datatype: 'date'
      },

    ];
    // TODO all initializations here
    this.modifytabExecuteQuery();
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
      this.modifytabData.forEach((element) => {
        if (element.movementType === null || element.movementType === undefined) {
          this.show(this.translateService.translate('oumcdtab.typemandetory'), 'warn');
          throw new Error();
        }
        if (element.movementReasonCode === null || element.movementReasonCode === undefined) {
          this.show(this.translateService.translate('oumcdtab.reasonmandetory'), 'warn');
          throw new Error();
        }
        if (element.tableName === null || element.tableName === undefined) {
          this.show(this.translateService.translate('oumcdtab.tablemandetory'), 'warn');
          throw new Error();
        }
        if (element.listSeq === null || element.listSeq === undefined) {
          this.show(this.translateService.translate('oumcdtab.seqmandetory'), 'warn');
          throw new Error();
        }
      });
    } catch (e) {
      return false;
    }
    return { activeFlag: true };
  }
  onGridClear = () => {
    this.modifytabExecuteQuery();
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
  onRowClickmodifytab(event) {
    if (event) {
      this.modifytabModel = event;
      if (this.modifytabModel.createDatetime) {
        this.modifyTabDeleteEnable = true;
      } else {
        this.modifyTabDeleteEnable = false;
      }
    }
  }
  validateRowData = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event.field === 'activeFlag') {
      if (event.data.activeFlag) {
        this.modifyTab.setColumnData('expiryDate', rowIndex, undefined);
        rowdata.validated = true;
        return rowdata;
      } else if (!event.data.activeFlag) {
        this.modifyTab.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
        rowdata.validated = true;
        return rowdata;
      }
    }

    if (event.field === 'movementType') {
      if (event.newValue !== event.oldValue) {
        this.modifyTab.setColumnData('movementReasonCode', rowIndex, undefined);
        rowdata.validated = true;
        return rowdata;
      } 
    }
    rowdata.validated = true;
    return rowdata;
  }
  modifytabExecuteQuery() {
    const modifytabResult = this.oumcdtabFactory.modifyTabExecuteQuery(this.modifytabModel);
    modifytabResult.subscribe(modifytabResultList => {
      if (modifytabResultList.length === 0) {
        this.modifytabData = [];
      } else {
        modifytabResultList.forEach(element => {
          element.activeFlag = element.activeFlag === 'Y' ? true : false;
        });
        this.modifytabData = modifytabResultList;
        this.modifytabModel = modifytabResultList[0];
        this.tableIndex = 0;
      }
    });
  }

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
        if (data.listSeq === 0) {
          this.show(this.translateService.translate('common.seqrangebetween'), 'warn');
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
  /**
   *  This function will be executed when commit event is
  * fired
  */
  oumcdtabSavemodifytabForm(event) {
    // TODO declare commit bean and add insert list to that object.
    this.modifytabInsertList = event.added;
    this.modifytabUpdatetList = event.updated;
    this.modifytabDeleteList = event.removed;
    this.modifytabCommitModel.insertList = [];
    this.modifytabCommitModel.updateList = [];
    this.modifytabCommitModel.deleteList = [];
    if (this.modifytabInsertList.length > 0 || this.modifytabUpdatetList.length > 0) {
      for (let i = 0; i < this.modifytabInsertList.length; i++) {
        if (!this.modifyMandatoryFieldsValidations(this.modifytabInsertList)) {
          return;
        }
        this.modifytabInsertList[i].tableOperationCode = 'COP';
        this.modifytabInsertList[i].activeFlag = this.modifytabInsertList[i].activeFlag ? 'Y' : 'N';
        this.modifytabCommitModel.insertList = this.modifytabInsertList;
      }
      for (let i = 0; i < this.modifytabUpdatetList.length; i++) {
        if (!this.modifyMandatoryFieldsValidations(this.modifytabUpdatetList)) {
          return;
        }
        this.modifytabUpdatetList[i].tableOperationCode = 'COP';
        this.modifytabUpdatetList[i].activeFlag = this.modifytabUpdatetList[i].activeFlag ? 'Y' : 'N';
        this.modifytabCommitModel.updateList = this.modifytabUpdatetList;
      }
    }
    if (this.modifytabDeleteList.length > 0) {
      for (let i = 0; i < this.modifytabDeleteList.length; i++) {
        this.modifytabCommitModel.deleteList = this.modifytabDeleteList;
      }
    }
    const modifytabSaveData = this.oumcdtabFactory.modifyTabCommit(this.modifytabCommitModel);
    modifytabSaveData.subscribe(data => {
      if (String(data[0].errorMessage).indexOf('COPY_TABLES_PK') > 0) {
        this.show(this.translateService.translate('oumcdtab.primarykeyviolation'), 'warn');
        this.modifytabExecuteQuery();
        return;
      }
      if (data && data[0] && data[0].returnValue && data[0].returnValue === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.modifytabExecuteQuery();
        return;
      } else {
        this.show('common.addupdateremoverecordfailed', 'warn');
        this.modifytabExecuteQuery();
        return;
      }
    });
  }
}
