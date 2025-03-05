import {
      Component, OnInit, ViewChild, AfterViewInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtdsubatService } from '@inmate/trust/trustaccounts/service/otdsubat.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderTransactions } from '@inmatetrustaccountsbeans/OffenderTransactions';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OffenderTransactionsCommitBean } from '@inmatetrustaccountsbeans/OffenderTransactionsCommitBean';
import { eventNames } from 'cluster';
import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
import { OtinamesService } from '@inmate/service/otinames.service';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';


@Component({
      selector: 'app-otdsubat',
      templateUrl: './otdsubat.component.html'
})

export class OtdsubatComponent implements OnInit, AfterViewInit {
      @ViewChild('grid', { static: true }) grid: any;
      bookingNo: string;
      actionName: string;
      lovModel: any[];
      msg: string;
      msgsump: string;
      msgs: any[] = [];
      nameOfLovPage: string;
      listToCompare: any[] = [];
      offtxn1Data: any[] = [];
      offtxn2Data: OffenderTransactions[] = [];
      offtxn2DataTemp: OffenderTransactions[] = [];
      offtxn2Model: OffenderTransactions = new OffenderTransactions();
      offtxn2InsertList: OffenderTransactions[] = [];
      offtxn2UpdatetList: OffenderTransactions[] = [];
      offtxn2DeleteList: OffenderTransactions[] = [];
      offtxnData: OffenderTransactions[] = [];
      offtxnDataTemp: OffenderTransactions[] = [];
      offtxnModel: OffenderTransactions = new OffenderTransactions();
      offtxnInsertList: OffenderTransactions[] = [];
      offtxnUpdatetList: OffenderTransactions[] = [];
      offtxnDeleteList: OffenderTransactions[] = [];
      offtxn2CommitModel: OffenderTransactionsCommitBean = new OffenderTransactionsCommitBean();
      offTxn1ColumnDef: any[];
      cgfkOfftxn2subaccounttypeRg: any[] = [];
      cgfkOfftxnsubaccounttypeRg: any[] = [];
      fromSubAccountTitles = { code: 'From Sub Account:', description: 'Description' };
      toSubAccountTitles = { code: 'To Sub Account :', description: 'Description' };
      fromSubAccountTypeLink: any;
      toSubAccountLink: any;
      caseloadType: string;
      txnType: string;
      type = 'error';
      msglist = [];
      message = ' Invalid.';
      insertFlag: boolean;
      accountCode: number;
      updateFlag: boolean;
      txnEntryAmount: any;
      vthaModel: VTrustHeader = new VTrustHeader();
      vthaData: VTrustHeader[] = [];
      offenderIdDisplay: any;
      acCode: any;
      balFlag: boolean;
      closeFlag: string;
      balance: string;
      selected = -1;
      selectedRow: OffenderTransactions = new OffenderTransactions();
      txnAmount: any;
      constructor(private otdsubatFactory: OtdsubatService,
            public translateService: TranslateService,
            private sessionManager: UserSessionManager, public dialogService: DialogService, private otinamesFactory: OtinamesService,
            private amountFormat: AmountFormatUtil) {

            this.offTxn1ColumnDef = [];

      }
      ngOnInit() {
            this.txnAmount = undefined;
            this.insertFlag = true;
            this.updateFlag = true;
            this.caseloadType = this.sessionManager.currentCaseLoadType;
            if (this.caseloadType === 'INST') {
                  this.txnType = 'OT';
            } else {
                  this.txnType = 'OTC';
            }

            this.offtxnModel.offenderId = this.otdsubatFactory.offenderId;
            this.fromSubAccountTypeLink = 'otdsubat/cgfkOffTxn2SubAccountTypeRecordGroup?caseLoadId=' + this.sessionManager.currentCaseLoad;
            this.offTxn1ColumnDef = [
                  {
                        fieldName: this.translateService.translate('system-profile.off-id-code') + '*', field: 'offenderIdDisplay',
                        editable: false, width: 150, whole: 'true', datatype: 'number', maxValue: 9999999999
                  },
                  {
                        fieldName: '', field: 'button', datatype: 'launchbutton',
                        editable: true, width: 100, data: 'row',
                        onLaunchClick: this.goBtnLaunchClick
                  },
                  { fieldName: this.translateService.translate('common.lastname'), field: 'lastName', editable: false, width: 150 },
                  {
                        fieldName: this.translateService.translate('otdsubat.orignbalance'), field: 'preWithholdAmount',
                        editable: false, width: 150, datatype: 'number', format: '1.2-2', rightAlign: true,
                  },
                  {
                        fieldName: this.translateService.translate('otdsubat.transamount') + '*', field: 'txnEntryAmount',
                        editable: true, width: 150, datatype: 'number', format: '1.2-2', maxValue: 999999999.99,
                        strictFP: true, whole: true, cellEditable: this.cellEditableSubAccTranfer, rightAlign: true,
                  },
                  {
                        fieldName: this.translateService.translate('common.description') + '*', field: 'txnEntryDesc',
                        editable: false, width: 380,datatype:'text', maxlength: 40 ,wrapText:true
                  },
                  { fieldNam: '', field: 'offenderBookId', editable: false, width: 150, hide: true },
                  { fieldName: this.translateService.translate('otdsubat.txn'), field: 'txnId', editable: false, width: 150 },

            ];

      }
      ngAfterViewInit() {
            this.insertFlag = false;
            this.updateFlag = false;
      }
      show(vldmsg, type?) {
            type = type ? type : 'warn';
            vldmsg = this.translateService.translate(vldmsg);
            const msgval = [{ message: vldmsg, type: type }];
            this.msgs = [...msgval];
      }
      changeTheValueOfFromSubAccount(event) {
            if (event) {
                  this.toSubAccountLink = 'otdsubat/cgfkOffTxnSubAccountTypeRecordGroup?fromSubAccount=' + String(event.code) +
                        '&caseLoadId=' + this.sessionManager.currentCaseLoad;
                  // this.acCode = event.code;
                  const accountCode = this.otdsubatFactory.getacCode(event.code, this.caseloadType);
                  accountCode.subscribe(acCode => {
                        if (acCode) {
                              this.acCode = acCode;

                        }
                  });
                  const index = this.grid.gridOptions.api.getSelectedNodes()[0].rowIndex;
                  this.grid.setColumnData('offenderIdDisplay', index, this.vthaData[0].offenderIdDisplay.slice(0,-1));
                  this.grid.setColumnData('offenderIdDisplay', index, this.vthaData[0].offenderIdDisplay);
            }
      }

      onGridInsert = () => {
            if (!this.offtxnModel.fmSubAccountType) {
                  this.show(this.translateService.translate('otdsubat.accountfrommustbeentered'), 'warn');
                  return false;
            }
            if (!this.offtxnModel.toSubAccountType) {
                  this.show(this.translateService.translate('otdsubat.accountto'), 'warn');
                  return false;
            }
            if (!this.offtxnModel.txnEntryAmount) {
                  this.show(this.translateService.translate('otdsubat.controltotalmustbeentered'), 'warn');
                  return false;
            }
            if (this.offtxn1Data.length > 0) {
                  if (!this.offtxn1Data[this.offtxn1Data.length - 1].offenderIdDisplay) {
                        this.show(this.translateService.translate('otdsubat.offenderidmust'), 'warn');
                        return false;
                  }
                  if (!this.offtxn1Data[this.offtxn1Data.length - 1].txnEntryAmount &&
                        this.offtxn1Data[this.offtxn1Data.length - 1].txnEntryAmount !== 0) {
                        this.show(this.translateService.translate('otdsubat.transmustbe'), 'warn');
                        return;
                  }
                  if (this.offtxn1Data[this.offtxn1Data.length - 1].txnEntryAmount <= 0) {
                        this.show(this.translateService.translate('otdsubat.transamountcannot'), 'warn');
                        return;
                  }
            }
            return { button: '...', offenderIdDisplay: '', lastName: '', preWithholdAmount: '', txnEntryAmount: '', txnEntryDesc: '' };

      }
      goBtnLaunchClick = (event) => {
            if (!this.offtxnModel.fmSubAccountType) {
                  this.show(this.translateService.translate('otdsubat.accountfrommustbeentered'), 'warn');
                  return;
            }
            if (!this.offtxnModel.toSubAccountType) {
                  this.show(this.translateService.translate('otdsubat.accountto'), 'warn');
                  return;
            }
            if (!this.offtxnModel.txnEntryAmount) {
                  this.show(this.translateService.translate('otdsubat.controltotalmustbeentered'), 'warn');
                  return;
            }
            const index = this.offtxn1Data.indexOf(event);
            if (!this.offtxnModel.txnEntryAmount) {
                  return false;
            }
            this.dialogService.openLinkDialog('/OTINAMESDIALOG', null, 70).subscribe(result => {
                  if (Number(result.preWithholdAmount) === 0) {
                        if (this.offtxnModel.fmSubAccountType === 'REG') {
                              this.accountCode = 2101;
                        } else {
                              this.accountCode = 2102;
                        }
                  }
                  this.grid.setColumnData('offenderIdDisplay', index, result.offenderIdDisplay);
                  this.grid.setColumnData('lastName', index, result.lastName);
                  this.grid.setColumnData('preWithholdAmount', index, null);
                  this.grid.setColumnData('offenderBookId', index, result.offenderBookId);
                  const description = this.otdsubatFactory.getDescription(this.caseloadType, this.txnType);
                  description.subscribe(txnDesc => {
                        if (txnDesc) {
                              this.grid.setColumnData('txnEntryDesc', index, txnDesc);
                        }
                  });
            });
            return false;
      }

      offTxnValidate = (event) => {
            const rowIndex = event.rowIndex;
            const rowData = new ValidateRowReturn();
            if (event.field === 'offenderIdDisplay' && event.newValue && Number(event.newValue) !== Number(event.oldValue)) {
                  this.vthaModel.offenderIdDisplay = event.data.offenderIdDisplay;
                  const namesrchResult = this.otinamesFactory.vThaExecuteQuery(this.vthaModel);
                  namesrchResult.subscribe(data => {
                        if (data.length === 0) {
                              this.vthaData = [];
                              this.type = 'warn';
                              this.show(this.translateService.translate('otdsubat.offenderiddoesnot'), 'warn');
                              return;
                        } else {
                              this.vthaData = data;

                              if (data[0].bookingNo) {
                                    this.offtxn1Data[rowIndex]['bookingNo'] = data[0].bookingNo;
                              }

                              this.grid.setColumnData('offenderIdDisplay', rowIndex, data[0].offenderIdDisplay);
                              this.grid.setColumnData('lastName', rowIndex, this.vthaData[0].lastName);
                              this.offenderIdDisplay = event.data.offenderIdDisplay;
                              this.grid.gridOptions.api.clearFocusedCell();
                              this.grid.gridOptions.api.startEditingCell({
                                    rowIndex: rowIndex,
                                    colKey: 'txnEntryAmount'
                              });

                              const wviTempvarAcclosFlag = this.otdsubatFactory.checkAcntClose(this.vthaData[0].rootOffenderId,
                                    this.sessionManager.currentCaseLoad);
                              wviTempvarAcclosFlag.subscribe(closeFlag => {
                                    if (closeFlag === 'Y') {
                                          this.closeFlag = closeFlag;
                                          this.grid.setColumnData('txnEntryDesc', rowIndex, null);
                                          this.show(this.translateService.translate('otdsubat.thisoffender'), 'warn');
                                          rowData.validated = true;
                                          return rowData;

                                    } else {
                                          const currentbalance = this.otdsubatFactory.getBal(this.vthaData[0].rootOffenderId,
                                                this.sessionManager.currentCaseLoad,
                                                this.acCode);
                                          currentbalance.subscribe(balance => {
                                                if (balance === 0) {
                                                      this.balFlag = true;
                                                      const msgOne = this.translateService.translate('otdsubat.offenderhash');
                                                      const msgTwo = this.offenderIdDisplay;
                                                      const msgTh = this.translateService.translate('otdsubat.haszero');
                                                      const frMsg = this.acCode;
                                                      const fvMsg = this.translateService.translate('otdsubat.subacnt');
                                                      this.msg = `${msgOne} ${msgTwo} ${msgTh} ${frMsg} ${fvMsg}`;
                                                      this.show(this.msg);
                                                      this.grid.setColumnData('txnEntryDesc', rowIndex, '');
                                                      this.grid.setColumnData('preWithholdAmount', rowIndex, '');
                                                      return;
                                                } else {
                                                      this.balFlag = false;
                                                      this.balance = balance.toFixed(2);
                                                      this.grid.setColumnData('preWithholdAmount', rowIndex,
                                                            this.balance);
                                                }
                                          });
                                    }
                              });

                              if (this.closeFlag === 'N' || this.closeFlag === undefined) {
                                    const description = this.otdsubatFactory.getDescription(this.caseloadType, this.txnType);
                                    description.subscribe(txnDesc => {
                                          if (txnDesc) {
                                                this.grid.setColumnData('txnEntryDesc', rowIndex, txnDesc);
                                          }

                                    });
                              }
                        }
                  });
            }
            rowData.validated = true;
            return rowData;

      }
      valueChangeEvent(num) {
            if (num && num.value && this.txnAmount && this.offtxnModel.fmSubAccountType
                  && this.offtxnModel.toSubAccountType) {
                  this.amountFormat.amountFormatEvent(num);
                  this.offtxnModel.txnEntryAmount = JSON.parse(JSON.stringify(this.amountFormat.amountFormat(num)));
                  // num.value = Number(this.offtxnModel.txnEntryAmount).toFixed(2);
                  this.insertFlag = true;
                  this.updateFlag = true;

            } else {
                  this.insertFlag = false;
                  this.updateFlag = false;
            }
      }
      onControlTotalKeyDown(event) {
            if (!this.amountFormat.avoidKeys(event, this.txnAmount)) {
                  event.stopPropagation();
                  return false;
            }
      }
      clear() {
            this.offtxn1Data = [];
            this.offtxnModel = new OffenderTransactions();
            this.txnAmount = undefined;
      }
      offtxn2ExecuteQuery() {
      }
      /**
       *  This function will be executed when commit event is
      * fired
      */
      otdsubatSaveofftxn2Form(event) {
            this.offtxn2InsertList = this.offtxn1Data;
            this.offtxn2UpdatetList = event.updated;
            this.offtxn2DeleteList = event.removed;
            this.offtxn2CommitModel.insertList = [];
            this.offtxn2CommitModel.updateList = [];
            this.offtxn2CommitModel.deleteList = [];
            if (!this.offtxnModel.fmSubAccountType) {
                  this.show(this.translateService.translate('otdsubat.fromsubacntmust'), 'warn');
                  return;
            }
            if (!this.offtxnModel.toSubAccountType) {
                  this.show(this.translateService.translate('otdsubat.tosubacntmust'), 'warn');
                  return;
            }
            if (this.offtxn2InsertList.length > 0) {
                  for (let i = 0; i < this.offtxn2InsertList.length; i++) {
                        if (!this.offtxn2InsertList[i].offenderIdDisplay) {
                              this.show(this.translateService.translate('otdsubat.offenderidmust'), 'warn');
                              return;

                        }
                        if (typeof this.offtxn2InsertList[i].txnEntryAmount === 'number' &&
                              this.offtxn2InsertList[i].txnEntryAmount <= 0) {
                              this.show(this.translateService.translate('otdsubat.transamountcannot'), 'warn');
                              return;
                        }
                        if (!this.offtxn2InsertList[i].txnEntryAmount) {
                              this.show(this.translateService.translate('otdsubat.transmustbe'), 'warn');
                              return;

                        }
                        if (this.offtxn2InsertList[i].txnEntryAmount && this.offtxn2InsertList[i].preWithholdAmount) {
                              if (Number(this.offtxn2InsertList[i].preWithholdAmount) <
                                    Number(this.offtxn2InsertList[i].txnEntryAmount)) {
                                    this.show(this.translateService.translate('otdsubat.originatingbalance'), 'warn');
                                    return;

                              } else {
                                    const tot = { amount: 0 };
                                    this.offtxn2InsertList.forEach(ele => {
                                          tot.amount += Number(ele.txnEntryAmount);
                                    });
                                    if (Number(tot.amount) !== Number(this.offtxnModel.txnEntryAmount)) {
                                          const msgOne = this.translateService.translate('common.transactionisnotbalancedifferenceof');
                                          const constMsgTwo = tot.amount;
                                          var diffAmt = 0;
                                          if (Number(this.offtxnModel.txnEntryAmount)) {
                                                if (Number(this.offtxnModel.txnEntryAmount) > constMsgTwo) {
                                                      diffAmt = (Number(this.offtxnModel.txnEntryAmount) - Number(constMsgTwo));
                                                } else {
                                                      diffAmt = (Number(constMsgTwo) - Number(this.offtxnModel.txnEntryAmount));
                                                }
                                          } else {
                                                diffAmt = Number(constMsgTwo);
                                          }
                                          this.msgsump = `${msgOne} ${diffAmt.toFixed(2)}`;
                                          this.show(this.msgsump);
                                          return;
                                    }
                              }
                        }

                        if (this.balFlag) {
                              this.show(this.msg);
                              return;
                        }
                        if (this.closeFlag || this.closeFlag === 'Y') {
                              this.show(this.translateService.translate('otdsubat.thisoffender'), 'warn');
                              return;
                        }

                        /* this procedure calling in oracle forms but thers is no code in otdsubat.flush_offender_tab*/
                        this.offtxn2InsertList[i].fmSubAccountType = this.offtxnModel.fmSubAccountType;
                        this.offtxn2InsertList[i].toSubAccountType = this.offtxnModel.toSubAccountType;
                        this.offtxn2InsertList[i].moduleName = 'OTDSUBAT';
                        this.offtxn2InsertList[i].caseloadId = this.sessionManager.currentCaseLoad;
                        this.offtxn2InsertList[i].caseloadType = this.caseloadType;
                        this.offtxn2InsertList[i].txnType = this.txnType;
                  }

                  this.offtxn2CommitModel.insertList = this.offtxn2InsertList;
            }
            if (this.offtxn2UpdatetList.length > 0) {
                  for (let i = 0; i < this.offtxn2UpdatetList.length; i++) {
                  }
                  this.offtxn2CommitModel.updateList = this.offtxn2UpdatetList;
            }
            if (this.offtxn2DeleteList.length > 0) {
                  for (let i = 0; i < this.offtxn2DeleteList.length; i++) {
                  }
                  this.offtxn2CommitModel.deleteList = this.offtxn2DeleteList;
            }
            const offtxn2SaveData = this.otdsubatFactory.offTxn2Commit(this.offtxn2CommitModel);
            offtxn2SaveData.subscribe(data => {
                  if (data && data.length > 0 && !data[0].errorMessage) {
                        this.offtxn1Data = data;
                        this.insertFlag = false;
                        setTimeout(ele => {
                              this.clear();
                              this.insertFlag = false;
                        }, 1000);
                        this.show('common.addupdateremoverecordsuccess', 'success');

                  } else {
                        this.show('common.addupdateremoverecordfailed', 'warn');
                  }
            });
      }
      offtxnExecuteQuery() {
            const offtxnResult = this.otdsubatFactory.offtxnExecuteQuery(this.offtxnModel);
            offtxnResult.subscribe(data => {
                  if (data.length === 0) {
                        this.offtxnData = [];
                  } else {
                        this.offtxnData = data;
                        this.offtxnModel = data[0];
                  }
            });
      }
      onRowClickofftxn(event) {
            if (event) {
                  this.selectedRow = event;
            } else {
                  this.selectedRow = new OffenderTransactions();
            }
      }
      onGridClear = () => {
            const res = this.grid.gridOptions.api.applyTransaction({ remove: [this.selectedRow] });
            const index = this.offtxn1Data.indexOf(this.selectedRow);
            this.offtxn1Data.splice(index, 1);
            this.grid.btnSavebtnDisable = this.grid.isSaveDisabled();
            if (this.offtxn1Data.length === 0) {
                  return true;
            } if (this.offtxn1Data[index]) {
                  this.selected = index;
            } else {
                  this.selected = index - 1;
            }
            return false;
      }


      fromsubaccountBlur() {
            if (!this.offtxnModel.fmSubAccountType) {
                  this.offtxnModel.fmSubAccountType = this.offtxnModel.fmSubAccountType === '' ? undefined : '';
                  if (this.offtxnModel.toSubAccountType) {
                        this.offtxnModel.toSubAccountType = '';
                  }
            }
      }

      tosubaccountBlur() {
            if (!this.offtxnModel.toSubAccountType) {
                  this.offtxnModel.toSubAccountType = this.offtxnModel.toSubAccountType === '' ? undefined : '';
            }
      }

      cellEditableSubAccTranfer = (data: any, index: number, field: string): boolean => {
            if (data.offenderIdDisplay && data.lastName) {
                  return true;
            }
            return false;
      }

}
