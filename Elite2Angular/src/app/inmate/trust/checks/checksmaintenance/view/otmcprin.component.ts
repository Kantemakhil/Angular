import {
      Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtmcprinService } from '../service/otmcprin.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { BankChequeRegisters } from '@inmate/trust/checks/beans/BankChequeRegisters';
import { BankChequeBooks } from '@inmate/trust/checks/beans/BankChequeBooks';
import { BankChequeRegistersCommitBean } from '@inmate/trust/checks/beans/BankChequeRegistersCommitBean';
import { BankChequeBooksCommitBean } from '@inmate/trust/checks/beans/BankChequeBooksCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
// import required bean declarations

@Component({
      selector: 'app-otmcprin',
      templateUrl: './otmcprin.component.html'
})

export class OtmcprinComponent implements OnInit {
      // Variable declaration
      actionName: string;
      lovModel: any[];
      msgs: any[] = [];
      nameOfLovPage: string;
      listToCompare: any[] = [];
      bankcbData: BankChequeBooks[] = [];
      bankcbDataTemp: BankChequeBooks[] = [];
      bankcbModel: BankChequeBooks = new BankChequeBooks();
      newSeriesModel: BankChequeBooks = new BankChequeBooks();
      bankcbInsertList: BankChequeBooks[] = [];
      bankcbUpdatetList: BankChequeBooks[] = [];
      bankcbDeleteList: BankChequeBooks[] = [];
      bankcrData: BankChequeRegisters[] = [];
      bankcrDataTemp: BankChequeRegisters[] = [];
      bankcrModel: BankChequeRegisters = new BankChequeRegisters();
      bankcbCommitModel: BankChequeBooksCommitBean = new BankChequeBooksCommitBean();
      bankcrCommitModel: BankChequeRegistersCommitBean = new BankChequeRegistersCommitBean();
      bankcrInsertList: BankChequeRegisters[] = [];
      bankcrUpdatetList: BankChequeRegisters[] = [];
      bankcrDeleteList: BankChequeRegisters[] = [];
      display: boolean;
      errorMessage: string;
      headerMessage: string;
      disabled: boolean;
      acPrdColumnDef: any[];
      csldDdColumnDef: any[];
      bankCbColumnDef: any[];
      bankCrColumnDef: any[];
      cgfkBankcrchequestatusRg: any[] = [];
      cgfkBankcrcheqstatusvoidRg: any[] = [];
      type = 'error';
      msglist = [];
      message = ' Invalid.';
      isRetrieveDis: boolean;
      isClearDis: boolean;
      allocationIndex = -1;
      checkRegIndex = -1;
      link: string;
      isDownClearDis: boolean;
      checqueink: string;
      lastCheckNumber: number;
      nextCheckNumber: number;
      validaNextChecknum: any;
      lastCheck: boolean;
      nextSeries: boolean;
      nextCheckGreat: boolean;
      constructor(private otmcprinFactory: OtmcprinService, public translateService: TranslateService,
            public sessionManager: UserSessionManager) {
            this.bankCbColumnDef = [];
            this.bankCrColumnDef = [];
      }
      ngOnInit() {
            this.checqueink = 'otmcprin/cgfkBankCrCheqStatusVoidRecordGroup';
            this.isClearDis = true;
            this.isDownClearDis = true;
            this.bankCbColumnDef = [
                  {
                        fieldName: this.translateService.translate('otmcprin.csld'), field: 'caseloadId',
                        editable: false, width: 150
                  },
                  {
                        fieldName: this.translateService.translate('otmcprin.bankcode'), field: 'accountCode',
                        editable: false, width: 150
                  },
                  {
                        fieldName: this.translateService.translate('otmcprin.firstcheck'), field: 'firstCheckNumber',
                        editable: false, width: 150
                  },
                  {
                        fieldName: this.translateService.translate('otmcprin.lastcheck'), field: 'lastCheckNumber',
                        editable: true, width: 150, datatype: 'number', maxValue: 999999
                  },
                  {
                        fieldName: this.translateService.translate('otmcprin.nextcheck'), field: 'nextCheckNumber', editable: true,
                        width: 150, datatype: 'number', maxValue: 999999
                  },
            ];
            this.bankCrColumnDef = [
                  {
                        fieldName: this.translateService.translate('otmcprin.checkdate'), field: 'transactionDate', editable: false,
                        width: 150, datatype: 'date'
                  },
                  { fieldName: this.translateService.translate('otmcprin.checkhash'), field: 'chequeNumber', editable: false, width: 150 },
                  { fieldName: this.translateService.translate('otmcprin.transhash'), field: 'txnId', editable: false, width: 150 },
                  {
                        fieldName: this.translateService.translate('otmcprin.status') + '*',
                        field: 'chequeStatus', editable: false, width: 150
                  },
                  {
                        fieldName: this.translateService.translate('otmcprin.reason'), field: 'reasonText',
                        editable: true, width: 150, datatype: 'text'
                  },
            ];
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

      ok() {
            this.bankcbExecuteQuery();
      }
      no() {
      }
      cancel() {
            this.bankcbData = [];
            this.bankcrData = [];
            this.isRetrieveDis = false;
            this.isClearDis = true;
            this.isDownClearDis = true;
            this.lastCheckNumber = null;
            this.nextCheckNumber = null;
      }
      cancelGrid() {
            this.bankcrData = [];

      }
      onOffenderChange(offender) {
      }
      bankcbExecuteQuery() {
            this.bankcbModel = new BankChequeBooks();
            if (this.lastCheckNumber) {
                  this.bankcbModel.lastCheckNumber = this.lastCheckNumber;
            }
            if (this.nextCheckNumber) {
                  this.bankcbModel.nextCheckNumber = this.nextCheckNumber;
            }
            this.bankcbModel.caseloadId = this.sessionManager.currentCaseLoad;
            const bankcbResult = this.otmcprinFactory.bankCbExecuteQuery(this.bankcbModel);
            bankcbResult.subscribe(data => {
                  if (data.length === 0) {
                        this.bankcbData = [];
                        this.isClearDis = false;
                        this.show(this.translateService.translate('common.querycaused'));
                  } else {
                        this.bankcbData = data;
                        this.allocationIndex = 0;
                        this.isClearDis = false;
                        this.isRetrieveDis = true;
                  }
            });
      }
      onRowClickbankcb(event) {
            this.bankcbModel = new BankChequeBooks();
            if (event) {
                  this.bankcbModel = event;
                  this.bankcrModel.accountCode = this.bankcbModel.accountCode;
                  this.bankcrModel.firstCheckNumber = this.bankcbModel.firstCheckNumber;
                  this.bankcrModel.lastCheckNumber = this.bankcbModel.lastCheckNumber;
                  this.bankcrExecuteQuery();
            }
      }
      onRowClickbankcr(event) {
            if (event) {
                  this.bankcrModel = event;
            }
      }
      validateRowData = (event) => {
            const rowIndex = event.rowIndex;
            this.lastCheck = false;
            this.nextSeries = false;
            const rowdata = new ValidateRowReturn();
            if (event.field === 'lastCheckNumber' && event.oldValue !== event.newValue && event.newValue) {
                  if (event.data.firstCheckNumber && event.data.lastCheckNumber) {
                        if (event.data.lastCheckNumber < event.data.firstCheckNumber) {
                              this.lastCheck = true;
                              this.validaNextChecknum = event.data.nextCheckNumber;
                              this.show(this.translateService.translate('otmcprin.lastcheckmustbe') + event.data.nextCheckNumber);
                        }
                        this.newSeriesModel.lastCheckNumber = event.data.lastCheckNumber;
                        this.newSeriesModel.accountCode = event.data.accountCode;
                        this.newSeriesModel.caseloadId = event.data.caseloadId;
                        this.newSeriesModel.firstCheckNumber = event.data.firstCheckNumber;
                        this.newSeriesModel.rowId = event.data.rowId;
                        const checkIfNew = this.otmcprinFactory.checkIfNewSeries(this.newSeriesModel);
                        checkIfNew.subscribe(xList => {
                              if (xList.length > 0) {
                                    if (xList[0].X === 'X') {
                                          this.show(this.translateService.translate('otmcprin.seriesselected'));
                                    }
                                    if (xList[0].Y === 'Y') {
                                          this.show(this.translateService.translate('otmcprin.seriesduplicated'));
                                    }

                              }

                        });


                  }

            }
            if (event.field === 'nextCheckNumber' && event.oldValue !== event.newValue && event.newValue) {
                  this.nextCheckGreat = false;
                  const nChkNum = Number(event.data.nextCheckNumber);
                  const lChkNum = Number(event.data.lastCheckNumber);
                  const fChkNum = Number(event.data.firstCheckNumber);
                  if (!(nChkNum >= fChkNum && nChkNum <= lChkNum)) {
                        this.nextSeries = true;
                        this.show(this.translateService.translate('otmcprin.nextcheckmustbe'));
                  }
                  const bcrRow = this.otmcprinFactory.bcRowMaxChecqueNumber(event.data.caseloadId, event.data.accountCode,
                        event.data.firstCheckNumber, event.data.lastCheckNumber);
                  bcrRow.subscribe(nChkNumBcr => {
                        if (nChkNumBcr) {
                              if (nChkNum <= nChkNumBcr) {
                                    this.nextCheckGreat = true;
                                    this.show(this.translateService.translate('otmcprin.nextcheckmustbegreater') +
                                          nChkNum + '.');

                              }

                        }

                  });

            }


            rowdata.validated = true;
            return rowdata;

      }
      validateRowRegistersData = (event) => {
            const rowIndex = event.rowIndex;
            const rowdata = new ValidateRowReturn();
            if (event.field === 'chequeStatus' && event.oldValue !== event.newValue && event.newValue) {
                  const oldSts = event.data.chequeStatus;
                  if (oldSts === 'VOID' && event.data.chequeStatus !== 'VOID') {
                        this.show(this.translateService.translate('otmcprin.errorcheckcannot'));

                  }
                  if (oldSts !== 'VOID' && event.data.chequeStatus === 'VOID') {
                        const isTxnReversed = this.otmcprinFactory.isTransactionReversed(event.data.txnId, event.data.accountCode);
                        isTxnReversed.subscribe(lvTxnReversedFlag => {
                              if (oldSts === 'PRINTED' && lvTxnReversedFlag === 'Y') {
                              } else {
                                    this.show(this.translateService.translate('otmcprin.errorcheckcannot'));
                              }
                        });
                  }
            }
            rowdata.validated = true;
            return rowdata;

      }
      bankcrExecuteQuery() {
            this.bankcrModel.caseLoadId = this.sessionManager.currentCaseLoad;
            const bankcrResult = this.otmcprinFactory.bankCrExecuteQuery(this.bankcrModel);
            bankcrResult.subscribe(data => {
                  if (data.length === 0) {
                        this.bankcrData = [];
                  } else {
                        this.bankcrData = data;
                        this.checkRegIndex = 0;
                        this.isDownClearDis = false;
                  }
            });
      }
      canOffInvEdit = (data: any, index: number, field: string): boolean => {
            if (data.chequeStatus) {
                  this.link = 'otmcprin/cgfkBankCrChequeStatusRecordGroup?chequeStatus=' + data.chequeStatus;
                  return true;
            }
            return false;
      }
      // /**
      //  *  This function will be executed when commit event is
      // * fired
      // */
      otmcprinSavebankcbForm(event) {
            // TODO declare commit bean and add insert list to that object.
            this.bankcbInsertList = event.added;
            this.bankcbUpdatetList = event.updated;
            this.bankcbDeleteList = event.removed;
            this.bankcbCommitModel.insertList = [];
            this.bankcbCommitModel.updateList = [];
            this.bankcbCommitModel.deleteList = [];

            if (this.bankcbInsertList.length > 0) {
                  for (let i = 0; i < this.bankcbInsertList.length; i++) {
                  }
            }
            if (this.bankcbUpdatetList.length > 0) { }
            for (let i = 0; i < this.bankcbUpdatetList.length; i++) {
                  if (!this.bankcbUpdatetList[i].lastCheckNumber) {
                        this.show(this.translateService.translate('otmcprin.lastcheckmustbeentered'));
                        return;
                  }
                  if (!this.bankcbUpdatetList[i].nextCheckNumber) {
                        this.show(this.translateService.translate('otmcprin.nextcheckmustbeentered'));
                        return;
                  }
                  if (this.lastCheck) {
                        this.show(this.translateService.translate('otmcprin.lastcheckmustbe') + this.validaNextChecknum);
                        return;
                  }
                  if (this.nextSeries) {
                        this.show(this.translateService.translate('otmcprin.nextcheckmustbe'));
                        return;
                  }
                  if (this.nextCheckGreat) {
                        this.show(this.translateService.translate('otmcprin.nextcheckmustbegreater') +
                              this.bankcbUpdatetList[i].nextCheckNumber + this.translateService.translate('otmcprin.dot'));
                        return;
                  }
            }
            this.bankcbCommitModel.insertList = this.bankcbInsertList;
            this.bankcbCommitModel.updateList = this.bankcbUpdatetList;

            if (this.bankcbDeleteList.length > 0) {
                  for (let i = 0; i < this.bankcbDeleteList.length; i++) {
                  }
                  this.bankcbCommitModel.deleteList = this.bankcbDeleteList;
            }
            const bankcbSaveData = this.otmcprinFactory.bankCbCommit(this.bankcbCommitModel);
            bankcbSaveData.subscribe(data => {
                  if (data === 1) {
                        this.show('common.addupdateremoverecordsuccess', 'success');
                        this.bankcbExecuteQuery();
                  } else {
                        this.show('common.addupdateremoverecordfailed', 'warn');
                  }
            });
      }

      // /**
      //  *  This function will be executed when commit event is
      // * fired
      // */
      otmcprinSavebankcrForm(event) {
            // TODO declare commit bean and add insert list to that object.
            this.bankcrInsertList = event.added;
            this.bankcrUpdatetList = event.updated;
            this.bankcrDeleteList = event.removed;
            this.bankcrCommitModel.insertList = [];
            this.bankcrCommitModel.updateList = [];
            this.bankcrCommitModel.deleteList = [];
            if (this.bankcrInsertList.length > 0) {
                  for (let i = 0; i < this.bankcrInsertList.length; i++) {
                        if (this.bankcrModel.chequeStatus !== undefined ||
                              this.bankcrModel.chequeStatus != null) {
                              return;
                        }
                  }
                  this.bankcrCommitModel.insertList = this.bankcrInsertList;
            }
            if (this.bankcrUpdatetList.length > 0) {
                  for (let i = 0; i < this.bankcrUpdatetList.length; i++) {
                        this.bankcrUpdatetList[i].caseLoadId = this.bankcbModel.caseloadId;
                        this.bankcrUpdatetList[i].accountCode = this.bankcbModel.accountCode;
                        this.bankcrUpdatetList[i].firstCheckNumber = this.bankcbModel.firstCheckNumber;
                        this.bankcrUpdatetList[i].lastCheckNumber = this.bankcbModel.lastCheckNumber;
                        this.bankcrUpdatetList[i].nextCheckNumber = this.bankcbModel.nextCheckNumber;
                  }
                  this.bankcrCommitModel.updateList = this.bankcrUpdatetList;
            }
            if (this.bankcrDeleteList.length > 0) {
                  for (let i = 0; i < this.bankcrDeleteList.length; i++) {
                  }
                  this.bankcrCommitModel.deleteList = this.bankcrDeleteList;
            }
            const bankcrSaveData = this.otmcprinFactory.bankCrCommit(this.bankcrCommitModel);
            bankcrSaveData.subscribe(data => {
                  if (data === 1) {
                        this.show('common.addupdateremoverecordsuccess', 'success');
                        this.bankcrExecuteQuery();
                  } else {
                        this.show('common.addupdateremoverecordfailed', 'warn');
                  }
            });

      }

      isLastcheckValue() {
            if (this.lastCheckNumber || this.nextCheckNumber) {
                  this.isClearDis = false;
            } else {
                  this.isClearDis = true;
            }
      }
}
