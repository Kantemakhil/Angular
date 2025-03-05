import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtmcnserService } from '../service/otmcnser.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CaseloadCurrentAccounts } from '@inmate/trust/checks/beans/CaseloadCurrentAccounts';
import { BankChequeBooks } from '@inmate/trust/checks/beans/BankChequeBooks';
import { BankChequeBooksCommitBean } from '@inmate/trust/checks/beans/BankChequeBooksCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';

@Component({
  selector: 'app-otmcnser',
  templateUrl: './otmcnser.component.html'
})

export class OtmcnserComponent implements OnInit {
  @ViewChild('grid', {static: true}) grid: any;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  csldcaData: CaseloadCurrentAccounts[] = [];
  csldcaDataColumnDef : any[];
  csldcaDataTemp: CaseloadCurrentAccounts[] = [];
  csldcaModel: CaseloadCurrentAccounts = new CaseloadCurrentAccounts();
  csldcaInsertList: CaseloadCurrentAccounts[] = [];
  csldcaUpdatetList: CaseloadCurrentAccounts[] = [];
  csldcaDeleteList: CaseloadCurrentAccounts[] = [];
  bankcbData: BankChequeBooks[] = [];
  bankcbDataTemp: BankChequeBooks[] = [];
  bankcbModel: BankChequeBooks = new BankChequeBooks();
  bankcbCommitModel: BankChequeBooksCommitBean = new BankChequeBooksCommitBean();
  bankcbInsertList: BankChequeBooks[] = [];
  bankcbUpdatetList: BankChequeBooks[] = [];
  bankcbDeleteList: BankChequeBooks[] = [];
  bankCbColumnDef: any[];
  isRetrieveDis: boolean;
  isClearDis: boolean;
  firstCheckNumber: number;
  lastCheckNumber: number;
  isGridRetrieveDis: boolean;
  isGridClearDis: boolean;
  tableIndex = -1;
  codeReadonly: boolean;
  removedFlag: boolean;
  csldDpIndex: number;
  flag: boolean;
  isNumberData: boolean;
  enableInsert: boolean;
  csldcaIndex = -1;
  constructor(private otmcnserFactory: OtmcnserService, public translateService: TranslateService,
    public sessionManager: UserSessionManager) {
    this.bankCbColumnDef = [];
    this.csldcaDataColumnDef = [];
  }
  ngOnInit() {
    this.codeReadonly = false;
    this.isRetrieveDis = false;
    this.isClearDis = true;
    this.isGridRetrieveDis = true;
    this.isGridClearDis = true;
    this.isNumberData = true;
    this.enableInsert = false;
    this.bankCbColumnDef = [
      {
        fieldName: this.translateService.translate('otmcnser.firstcheckno') + '*', field: 'firstCheckNumber', editable: true, width: 150,
        datatype: 'number',
        whole: true, cellEditable: this.canCellEdit, maxValue: 999999
      },
      {
        fieldName: this.translateService.translate('otmcnser.lastcheckno') + '*', field: 'lastCheckNumber',
        editable: true, width: 150, datatype: 'number',
        whole: true, cellEditable: this.canCellEdit, maxValue: 999999
      },
      {
        fieldName: this.translateService.translate('otmcnser.nextavaiablecheck'), field: 'nextCheckNumber',
        editable: false, width: 150, datatype: 'number'
      },
    ];
    this.csldcaDataColumnDef =[
        {
          fieldName: this.translateService.translate('common.code') + '*', field: 'accountCode', datatype: 'number',editable: true, width: 150
        },
        {
          field: 'accountName',datatype: 'text', editable: true, width: 150
        }
    ];
    this.ok();
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
  isValid() {
    if (this.firstCheckNumber || this.lastCheckNumber) {
      this.isGridClearDis = false;
      this.isGridRetrieveDis = false;
    } else {
      this.isGridClearDis = true;
    }
  }

  canCellEdit = (data: any, index: number, field: string) => {
    if (this.bankcbModel.createDatetime) {
      return false;
    }
    return true;
  }

  onRowClickbankcb(event) {
    if (event) {
      this.bankcbModel = event;
    } else {
      this.bankcbModel = new BankChequeBooks();
    }
  }
  onRowClickbankAccount(event){
    if (event) {
      this.csldcaModel = event;
      this.bankcbExecuteQuery();
    }
  }
  ok() {
    this.otmcnserexecuteQuery();
  }
  no() {
  }
  isInsertable() {
    if (this.csldcaModel.accountCode || this.csldcaModel.accountName) {
        this.isClearDis = false;
        this.isRetrieveDis = false;
    } else {
        this.isClearDis = true;
    }
}
  cancel() {
    this.bankcbData = [];
    this.csldcaData = [];
    this.firstCheckNumber = null;
    this.lastCheckNumber = null;
    this.isRetrieveDis = false;
    this.isClearDis = true;
    this.codeReadonly = false;
    this.isNumberData = true;
    this.isGridRetrieveDis = true;
    this.isGridClearDis = true;
    this.enableInsert = false;
    this.csldcaModel = new CaseloadCurrentAccounts();
  }
  clearDownGrid() {
    this.firstCheckNumber = null;
    this.lastCheckNumber = null;
    this.bankcbData = [];
    this.isGridClearDis = true;
    this.enableInsert = false;
    this.isGridRetrieveDis = false;
  }
  /**
  * This function loads the data into the Master Record and its child records
  */
  otmcnserPopulateDetails() {
    const serviceObj = this.otmcnserFactory.bankCbExecuteQuery(this.csldcaModel);
    serviceObj.subscribe(data => {
      if (data.length > 0) {
        this.bankcbData = data;
      }
    });
  }

  next() {
    this.csldDpIndex++;
    this.csldcaModel = this.csldcaData[this.csldDpIndex];
    this.bankcbExecuteQuery();
  }
  previous() {
    this.csldDpIndex--;
    this.csldcaModel = this.csldcaData[this.csldDpIndex];
    this.bankcbExecuteQuery();
  }
  get nextbtnFlag() {
    if (this.csldcaData.length === 0) {
      return true;
    }
    if (this.csldDpIndex >= this.csldcaData.length - 1) {
      return true;
    }
    return false;
  }
  get prebtnFlag() {
    if (this.csldcaData.length === 0) {
      return true;
    }
    if (this.csldDpIndex <= 0) {
      return true;
    }
    return false;
  }
  otmcnserexecuteQuery() {
    this.csldDpIndex = 0;
    if (this.csldcaModel.accountCode) {
      this.csldcaModel.accountCode = this.csldcaModel.accountCode;
    }
    this.csldcaModel.caseloadId = this.sessionManager.currentCaseLoad;
    this.csldcaModel.globalCaseloadType = this.sessionManager.currentCaseLoadType;
    const serviceObj = this.otmcnserFactory.csldCaExecuteQuery(this.csldcaModel);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.bankcbData = [];
        this.isNumberData = true;
        this.isGridRetrieveDis = true;
        this.isGridClearDis = true;
        this.enableInsert = false;
        this.csldcaModel = new CaseloadCurrentAccounts();
        this.show(this.translateService.translate('common.querycaused'));

      } else {
        this.csldcaData = data;
        this.csldcaModel = this.csldcaData[this.csldDpIndex];
        this.isGridRetrieveDis = false;
        this.codeReadonly = true;
        this.isNumberData = false;
        this.enableInsert = true;
        this.csldcaIndex = 0;
        // this.bankcbExecuteQuery();
      }
    });
  }

  bankcbExecuteQuery() {
    this.bankcbModel = new BankChequeBooks();
    this.flag = false;
    if (this.csldcaModel.accountCode) {
      this.bankcbModel.accountCode = this.csldcaModel.accountCode;
    }
    if (this.firstCheckNumber) {
      this.flag = true;
      this.bankcbModel.firstCheckNumber = this.firstCheckNumber;
    }
    if (this.lastCheckNumber) {
      this.bankcbModel.lastCheckNumber = this.lastCheckNumber;
      this.flag = true;
    }
    this.bankcbModel.caseloadId = this.sessionManager.currentCaseLoad;
    const bankcbResult = this.otmcnserFactory.bankCbExecuteQuery(this.bankcbModel);
    bankcbResult.subscribe(data => {
      if (data.length === 0) {
        this.bankcbData = [];
        this.isGridRetrieveDis = false;
        this.isGridClearDis = true;
        this.enableInsert = true;
        if (this.flag) {
          this.isGridClearDis = false;
          this.show(this.translateService.translate('common.querycaused'));
        }
      } else {
        this.bankcbData = data;
        this.isClearDis = false;
        this.isGridClearDis = false;
        this.isGridRetrieveDis = true;
        this.codeReadonly = true;
        this.tableIndex = 0;
        this.enableInsert = true;
      }
    });
  }
  validateRowData = (event) => {
    const rowdata = new ValidateRowReturn();
    const index = event.rowIndex;
    if (event.field === 'firstCheckNumber' && event.oldValue !== event.newValue && event.newValue) {
      if (event.data.firstCheckNumber) {
        this.grid.setColumnData('nextCheckNumber', index, event.data.firstCheckNumber);
      }
      if (event.data.firstCheckNumber && event.data.lastCheckNumber) {
        if (Number(event.data.firstCheckNumber) >= Number(event.data.lastCheckNumber)) {
          this.show(this.translateService.translate('otmcnser.firstcheckcannot'));
        }
      }

      if (event.data.firstCheckNumber) {
        const chkcheQueBook = this.otmcnserFactory.checkChecqueBooks(event.data.firstCheckNumber,
          this.csldcaModel.accountCode, this.sessionManager.currentCaseLoad);
        chkcheQueBook.subscribe(chk => {
          if (chk === 'Y') {
            this.grid.setColumnData('nextCheckNumber', index, null);
            this.grid.setColumnData('firstCheckNumber', index, null);
            this.show(this.translateService.translate('otmcnser.seriesalreadyexists'));
          }
        });
      }
    }
    if (event.field === 'lastCheckNumber' && event.oldValue !== event.newValue && event.newValue) {
      if (event.data.firstCheckNumber && event.data.lastCheckNumber) {
        if (Number(event.data.lastCheckNumber) <= Number(event.data.firstCheckNumber)) {
          this.show(this.translateService.translate('otmcnser.lastcheckcannot'));
          this.grid.setColumnData('lastCheckNumber', index, null);
        } else {
          if (event.data.lastCheckNumber && event.data.firstCheckNumber
            && this.csldcaModel.accountCode && this.sessionManager.currentCaseLoad) {
            const chkcheQueBookslastChk = this.otmcnserFactory.checkChecqueBooksLastCheck(event.data.lastCheckNumber,
              event.data.firstCheckNumber, this.csldcaModel.accountCode, this.sessionManager.currentCaseLoad);
            chkcheQueBookslastChk.subscribe(chk => {
              if (chk === 'X') {
                this.show(this.translateService.translate('otmcnser.warning'));
              }
            });
          }
        }
      }
    }
    rowdata.validated = true;
    return rowdata;
  }
  onGridInsert = () => {
    if (!this.csldcaModel.accountCode) {
      this.show(this.translateService.translate('otmcnser.codemust'));
      return false;
    }
    if (this.bankcbData.length > 0) {
      if (!this.bankcbData[this.bankcbData.length - 1].firstCheckNumber) {
        this.show(this.translateService.translate('otmcnser.firstcheckmustbe'));
        return false;
      }
      if (!this.bankcbData[this.bankcbData.length - 1].lastCheckNumber) {
        this.show(this.translateService.translate('otmcnser.lastcheckmustbe'));
        return false;
      }
    }
    return { firstCheckNumber: '', lastCheckNumber: '', nextCheckNumber: '' };
  }

  onGridDelete = (list) => {
    const data = list && Array.isArray(list) && list.length > 0 ? list[0] : {};
    const firstCheckNum = Number(data.firstCheckNumber);
    const nextCheckNum = Number(data.nextCheckNumber);
    if (firstCheckNum === nextCheckNum) {
      return true;
    } else {
      this.show(this.translateService.translate('otmcnser.cannotdeleteaused'));
      return false;
    }
  }
  bankChequeBooks(firsrtCheckNum, lastCheckNum) {
    const checs = this.otmcnserFactory.checkChecqueBooksLastCheck(lastCheckNum, firsrtCheckNum, this.csldcaModel.accountCode,
      this.sessionManager.currentCaseLoad);
    checs.subscribe(flg => {
      if (flg === 'X') {
        this.show(this.translateService.translate('otmcnser.cannotdeleteaused'));
        return;
      }
    });
  }
  checkIfNewSeries(firstCheckNum) {
    const chekNewSeries = this.otmcnserFactory.checkChecqueBooks(firstCheckNum, this.csldcaModel.accountCode,
      this.sessionManager.currentCaseLoad);
    chekNewSeries.subscribe(newSer => {
      if (newSer === 'Y') {
        this.show(this.translateService.translate('otmcnser.seriesalreadyexists'));
        return;
      }
    });
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  otmcnserSavebankcbForm(event) {
    this.bankcbInsertList = event.added;
    this.bankcbUpdatetList = event.updated;
    this.bankcbDeleteList = event.removed;
    this.bankcbCommitModel.insertList = [];
    this.bankcbCommitModel.updateList = [];
    this.bankcbCommitModel.deleteList = [];
    if (this.removedFlag) {
      this.bankcbDeleteList = event.removed.push(event);
    }
    if (this.bankcbInsertList.length > 0) {
      for (let i = 0; i < this.bankcbInsertList.length; i++) {
        if (!this.bankcbInsertList[i].firstCheckNumber) {
          this.show(this.translateService.translate('otmcnser.firstcheckmustbe'));
          return false;
        }
        if (!this.bankcbInsertList[i].lastCheckNumber) {
          this.show(this.translateService.translate('otmcnser.lastcheckmustbe'));
          return false;
        }
        this.bankChequeBooks(this.bankcbInsertList[i].lastCheckNumber, this.bankcbInsertList[i].firstCheckNumber);
        this.checkIfNewSeries(this.bankcbInsertList[i].firstCheckNumber);
        this.bankcbInsertList[i].accountCode = this.csldcaModel.accountCode;
        this.bankcbInsertList[i].caseloadId = this.sessionManager.currentCaseLoad;
        this.bankcbInsertList[i].modifyDate = DateFormat.getDate();
        this.bankcbInsertList[i].modifyUserId = this.sessionManager.getId();
        this.bankcbInsertList[i].txnEntryDate = DateFormat.getDate();
      }
      this.bankcbCommitModel.insertList = this.bankcbInsertList;
    }
    if (this.bankcbUpdatetList.length > 0) {
      for (let i = 0; i < this.bankcbUpdatetList.length; i++) {

        if (!this.bankcbUpdatetList[i].firstCheckNumber) {
          this.show(this.translateService.translate('otmcnser.firstcheckmustbe'));
          return false;
        }
        if (!this.bankcbUpdatetList[i].lastCheckNumber) {
          this.show(this.translateService.translate('otmcnser.lastcheckmustbe'));
          return false;
        }
      }
      this.bankcbCommitModel.updateList = this.bankcbUpdatetList;
    }
    if (this.bankcbDeleteList.length > 0) {
      for (let i = 0; i < this.bankcbDeleteList.length; i++) {
      }
      this.bankcbCommitModel.deleteList = this.bankcbDeleteList;
    }
    const bankcbSaveData = this.otmcnserFactory.bankCbCommit(this.bankcbCommitModel);
    bankcbSaveData.subscribe(data => {
      if (data === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.bankcbExecuteQuery();
      }else if (data === 3){
        this.show('otmcnser.seriesalreadyexists', 'warn');
        return;
      }else {
        this.show('common.addupdateremoverecordfailed', 'warn');
        this.bankcbExecuteQuery();
      }
    });
  }
}
