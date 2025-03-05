import {
      Component,
      OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtdaaccoService } from '../service/otdaacco.service';
import { GlTransactions } from '@inmate/trust/trustaccounts/beans/GlTransactions';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { AccountCodes } from '@inmate/trust/trustaccounts/beans/AccountCodes';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';
import { OtinamesService } from '@inmate/service/otinames.service';
import { GlTransactionsCommitBean } from '@inmate/trust/trustaccounts/beans/GlTransactionsCommitBean';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
@Component({
      selector: 'app-otdaacco',
      templateUrl: './otdaacco.component.html'
})

export class OtdaaccoComponent implements OnInit {
      message = ' Invalid.';
      type = 'error';
      msglist = [];
      msgs: any[] = [];
      gltxn1Data: GlTransactions[] = [];
      gltxn1DataTemp: GlTransactions[] = [];
      gltxn1Model: GlTransactions = new GlTransactions();
      accountCodesModel: AccountCodes = new AccountCodes();
      vthaModel: VTrustHeader = new VTrustHeader();
      gltxn1Index: number;
      gltxn1InsertList: GlTransactions[] = [];
      gltxn1UpdatetList: GlTransactions[] = [];
      gltxn1DeleteList: GlTransactions[] = [];
      gltxnData: GlTransactions[] = [];
      gltxnDataTemp: GlTransactions[] = [];
      gltxnModel: GlTransactions = new GlTransactions();
      glTxnDialogModel: GlTransactions = new GlTransactions();
      gltxnCommitModel: GlTransactionsCommitBean = new GlTransactionsCommitBean();
      gltxnIndex: number;
      gltxnInsertList: GlTransactions[] = [];
      gltxnUpdateList: GlTransactions[] = [];
      gltxnDeleteList: GlTransactions[] = [];
      display: boolean;
      errorMessage: string;
      headerMessage: string;
      disabled: boolean;
      editable: boolean;
      cgfkGltxn1txntypeRg: any[] = [];
      cgfkGltxnaccountcodeRg: any[] = [];
      cgfkGltxn1accountcodeRg: any[] = [];
      typeLink: any;
      debitAccountCodeLink: any;
      creditAccountCodeLink: any;
      typeTitles = { code: 'Type :', description: 'Description' };
      debitAccountCodeTitles = { code: 'Debit Account Code :', description: 'Account Name' };
      creditAccountCodeTitles = { code: 'Credit Account Code :', description: 'Account Name' };
      offenderId: any;
      firstLastName: any;
      lastFirstName: string;
      accountCodeOne: boolean;
      accountCodeTwo: boolean;
      offIdReadOnly: boolean;
      nbtOffIdReadOnly: boolean;
      clearFlag: boolean;
      nbtOffenderId: number;
      offId: boolean;
      nbtOffId: boolean;
      offenderExist: boolean;
      nbtOffenderExist: boolean;
      readOnlyData: boolean;
      creditReadOnly: boolean;
      getOffData: boolean;
      getOffNbtData: boolean;
      autoPoplate: boolean;
      accountCodeReadOnly: boolean;
      debitReadOnly: boolean;
      txnTypeData: string;
      accountCodeOneData: string;
      autoPoplateOne: boolean;
      accountCodeOneReadOnly: boolean;
      accountCodeTwoData: string;
      data: any;
      amountData: any;
      saveFlag: boolean;
      txnTypeReadOnly: boolean;
      checkReadOnly: boolean;
      readOnlyTextData: boolean;
      constructor(private otdaaccoFactory: OtdaaccoService,
            public translateService: TranslateService,
            private sessionManager: UserSessionManager,
            private otinamesFactory: OtinamesService,
            private amountFormat: AmountFormatUtil,
            public dialogService: DialogService) {

      }
      ngOnInit() {
            this.offIdReadOnly = true;
            this.debitReadOnly = true;
            this.clearFlag = true;
            this.nbtOffIdReadOnly = true;
            this.offenderId = undefined;
            this.firstLastName = undefined;
            this.accountCodeOne = false;
            this.accountCodeTwo = false;
            this.readOnlyData = true;
            this.accountCodeReadOnly = true;
            this.creditReadOnly = true;
            this.checkReadOnly = true;
            this.autoPoplateOne = true;
            this.autoPoplate = true;
            this.accountCodeOneReadOnly = true;
            this.saveFlag = false;
            this.readOnlyTextData = true;
            this.accountCodesModel = new AccountCodes();
            this.typeLink = 'otdaacco/cgfkGlTxn1TxnTypeRecordGroup?caseLoadId=' + this.sessionManager.currentCaseLoad +
                  '&caseLoadType=' + this.sessionManager.currentCaseLoadType;
            this.gltxnModel.caseloadId = this.sessionManager.currentCaseLoad;
      }

      cancel() {
            this.gltxnModel = new GlTransactions();
            this.glTxnDialogModel = new GlTransactions();
            this.lastFirstName = '';
            this.firstLastName = '';
            this.clearFlag = true;
            this.accountCodeOne = false;
            this.accountCodeTwo = false;
            this.readOnlyData = true;
            this.readOnlyTextData = true;
            this.accountCodeReadOnly = true;
            this.creditReadOnly = true;
            this.checkReadOnly = true;
            this.nbtOffIdReadOnly = true;
            this.getOffData = false;
            this.getOffNbtData = false;
            this.accountCodeOneReadOnly = true;
            this.offenderId = undefined;
            this.saveFlag = false;
            this.txnTypeReadOnly = false;
            this.txnTypeData = this.txnTypeData === undefined ? '' : undefined;
            this.accountCodeOneData = this.accountCodeOneData === undefined ? '' : undefined;
            this.accountCodeTwoData = this.accountCodeTwoData === undefined ? '' : undefined;
      }

      gltxn1ExecuteQuery() {
            const gltxn1Result = this.otdaaccoFactory.
                  glTxn1ExecuteQuery(this.gltxn1Model);
            gltxn1Result.subscribe(gltxn1ResultList => {
                  if (gltxn1ResultList.length === 0) {
                        this.gltxn1Data = [];
                  } else {
                        this.gltxn1Data = gltxn1ResultList;
                        this.gltxn1Model = gltxn1ResultList[0];
                  }
            });
      }
      /**
       * event is fired when change the value from LOV of Type.
       * @param event
       */
      changeTheValueOfType(event, txnType) {
            if (event) {
                  if (this.autoPoplate) {
                        this.autoPoplate = false;
                        setTimeout(ele => {
                              this.txnTypeData = null;
                              this.gltxnModel.txnType = null;
                        }, 5);
                        return;
                  } else {
                        this.gltxnModel.txnType = this.txnTypeData;
                        this.accountCodeOneReadOnly = false;
                        this.clearFlag = false;
                        this.debitAccountCodeLink = 'otdaacco/cgfkGlTxnAccountCodeRecordGroup?txnType=' + event.code +
                              '&caseLoadType=' + this.sessionManager.currentCaseLoadType + '&caseLoadId='
                              + this.sessionManager.currentCaseLoad;
                        this.clearFlag = false;
                        this.gltxnModel.accountCodeOne = Number(this.accountCodeOneData);
                  }
            } else {
                  this.accountCodeOneData = null;
                  this.gltxnModel.txnType = null;
                  this.gltxnModel.accountCodeOne = null;
                  this.accountCodeOneReadOnly = true;
                  this.offIdReadOnly = true;
                  this.debitReadOnly = true;
            }
      }
      changeValueAccountCode(event) {
            if (event) {
                  this.gltxnModel.accountCodeOne = event;
                  this.offIdReadOnly = false;
                  this.debitReadOnly = false;
            } else {
                  this.gltxnModel.offenderIdDisplay = null;
                  this.firstLastName = null;
                  this.offIdReadOnly = true;
                  this.debitReadOnly = true;
            }
      }
      changeValueAccountTypeTwo(event) {
            if (event) {
                  this.gltxnModel.accountCodeTwo = event;
                  this.creditReadOnly = false;
                  this.nbtOffIdReadOnly = false;
            } else {
                  this.gltxnModel.nbtOffenderIdDisplay = null;
                  this.lastFirstName = null;
                  this.gltxnModel.txnEntryAmount = null;
                  this.gltxnModel.txnReferenceNumber = null;
                  this.gltxnModel.txnEntryDesc = null;
                  this.readOnlyData = true;
                  this.readOnlyTextData = true;
                  this.creditReadOnly = true;
                  this.checkReadOnly = true;
                  this.nbtOffIdReadOnly = true;
            }
      }
      txnTypeBlurEvent() {
            if (!this.txnTypeData) {
                  this.txnTypeData = this.txnTypeData === undefined ? '' : undefined;
            }
      }
      accountCodeBlurOne(event) {
            if (!this.accountCodeOneData) {
                  this.accountCodeOneData = this.accountCodeOneData === undefined ? '' : undefined;
            }
            if (!this.accountCodeTwoData) {
                  this.accountCodeTwoData = this.accountCodeTwoData === undefined ? '' : undefined;
            }
            if (event) {
                  this.accountCodeOne = false;
                  this.accountCodeTwo = false;
                  this.offIdReadOnly = false;
                  this.debitReadOnly = false;
                  this.clearFlag = false;
                  if (this.gltxnModel.offenderId) {
                        if (event) {
                              this.gltxnModel.accountCode = Number(event);
                              this.chkNavigation();
                        }
                  }
                  if (event) {
                        this.gltxnModel.accountCode = Number(this.gltxnModel.accountCodeOne);
                        const accountCodeFlag = this.otdaaccoFactory.chkOffAcnt(this.gltxnModel.accountCode);
                        accountCodeFlag.subscribe(accountCodeOneFlag => {
                              if (accountCodeOneFlag !== 'Y') {
                                    this.accountCodeOne = true;
                              } else {
                                    this.accountCodeOne = false;
                              }
                        });
                        this.gltxnModel.accountCode = Number(this.gltxnModel.accountCodeTwo);
                        const accountCodeFlagTwo = this.otdaaccoFactory.chkOffAcnt(this.gltxnModel.accountCode);
                        accountCodeFlagTwo.subscribe(accountCodeTwoFlag => {
                              if (accountCodeTwoFlag !== 'Y') {
                                    this.accountCodeTwo = true;
                              } else {
                                    this.accountCodeTwo = false;
                              }
                        });
                        if (this.accountCodeOne && this.accountCodeTwo) {
                              event = null;
                              this.gltxnModel.accountCodeOne = null;
                              this.type = 'warn';
                              this.message = this.translateService.translate('otdaacco.adjustmentcannotbedone');
                              this.show();
                        }
                  }
                  this.chkInvalidAccounts();
            } else {
                  if (!this.accountCodeOneData) {
                        this.offIdReadOnly = true;
                        this.debitReadOnly = true;
                  }
                  if (this.debitReadOnly) {
                        this.gltxnModel.accountCodeTwo = null;
                        this.gltxnModel.nbtOffenderIdDisplay = null;
                        this.lastFirstName = null;
                        this.gltxnModel.txnEntryAmount = null;
                        this.gltxnModel.txnReferenceNumber = null;
                  }
            }
      }
      chkNavigation() {
            const accountCodeFlag = this.otdaaccoFactory.checkNavigation(this.gltxnModel.accountCode);
            accountCodeFlag.subscribe(accountCodeFlagData => {
                  if (accountCodeFlagData === 'N') {
                        this.gltxnModel.offenderId = null;
                        this.firstLastName = null;
                        this.offIdReadOnly = true;
                        this.nbtOffIdReadOnly = true;
                  } else {
                        this.offIdReadOnly = false;
                        this.nbtOffIdReadOnly = false;
                  }
            });
      }
      /**
       * Used to get lastName and firstName.
       * event is fired when focus out from ID# field,
       */
      getOffenderDetails(event, id) {
            if (id) {
                  if (id === 'drId') {
                        this.firstLastName = null;
                  }
            }
            if (event || event === 0) {
                  this.clearFlag = false;
                  this.vthaModel = new VTrustHeader();
                  this.vthaModel.offenderIdDisplay = this.gltxnModel.offenderIdDisplay;
                  if (this.vthaModel.offenderIdDisplay) {
                        for (let i = Number(String(this.vthaModel.offenderIdDisplay).length); i < 10; i++) {
                              this.vthaModel.offenderIdDisplay = '0' + this.vthaModel.offenderIdDisplay;
                        }
                  }
                  if (!this.chkCrDrOffId(this.vthaModel.offenderIdDisplay, this.gltxnModel.nbtOffenderIdDisplay)) {
                        this.gltxnModel.offenderIdDisplay = null;
                        this.firstLastName = null;
                        return false;
                  }
                  const vthaResult = this.otinamesFactory.vThaExecuteQuery(this.vthaModel);
                  vthaResult.subscribe(vthaResultList => {
                        if (vthaResultList.length === 0) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('otdaacco.offendernotexists');
                              this.show();
                              this.offenderExist = true;
                              this.gltxnModel.offenderIdDisplay = null;
                              this.firstLastName = null;
                              this.accountCodeReadOnly = true;
                              this.readOnlyData = true;
                              this.readOnlyTextData = true;
                              this.creditReadOnly = true;
                              this.checkReadOnly = true;
                              this.nbtOffIdReadOnly = true;
                              this.accountCodeTwoData = null;
                              this.gltxnModel.accountCodeTwo = null;
                              this.gltxnModel.nbtOffenderIdDisplay = null;
                              this.lastFirstName = null;
                              this.gltxnModel.txnEntryAmount = null;
                              this.gltxnModel.txnReferenceNumber = null;
                              this.saveFlag = true;
                              this.gltxnModel.nbtOffenderId = null;
                              this.nbtOffenderId = null;
                              this.gltxnModel.reconClearFlag = null;
                              return;
                        } else {
                              const lengthData = [];
                              this.vthaModel = vthaResultList[0];
                              if (this.vthaModel.accountClosedFlag === 'Y') {
                                    this.type = 'warn';
                                    this.message = this.translateService.translate('otdaacco.thisoffenderaccount');
                                    this.show();
                                    this.gltxnModel.offenderIdDisplay = null;
                                    this.firstLastName = null;
                                    this.getOffData = false;
                                    this.accountCodeReadOnly = true;
                                    this.readOnlyData = true;
                                    this.readOnlyTextData = true;
                                    this.creditReadOnly = true;
                                    this.checkReadOnly = true;
                                    this.nbtOffIdReadOnly = true;
                                    return;
                              }
                              this.gltxnModel.offenderIdDisplay = this.vthaModel.offenderIdDisplay;
                              this.gltxnModel.offenderId = this.vthaModel.rootOffenderId;
                              this.firstLastName = undefined;
                              this.offenderExist = false;
                              if (this.vthaModel.middleName) {
                                    this.vthaModel.middleName = this.vthaModel.middleName.charAt(0);
                                    this.firstLastName = this.vthaModel.lastName + ', ' + this.vthaModel.firstName +
                                          ', ' + this.vthaModel.middleName;
                              } else {
                                    this.firstLastName = this.vthaModel.lastName + ', ' + this.vthaModel.firstName;
                              }
                              this.offenderId = this.vthaModel.rootOffenderId;
                              this.offId = true;
                              this.nbtOffId = false;
                              this.accountCodeReadOnly = false;
                              if (this.readOnlyData) {
                                    this.readOnlyData = true;
                                    this.readOnlyTextData = true;
                                    this.checkReadOnly = true;
                                    this.nbtOffIdReadOnly = true;
                              }
                              if (this.txnTypeData) {
                                    this.creditAccountCodeLink = 'otdaacco/cgfkGlTxnAccountCodeRecordGroup?txnType='
                                          + this.txnTypeData + '&caseLoadType=' + this.sessionManager.currentCaseLoadType +
                                          '&caseLoadId=' + this.sessionManager.currentCaseLoad;
                              }
                              this.getOffData = true;
                              this.getOffNbtData = false;
                              this.saveFlag = false;
                              this.validateItem();
                        }
                  });
            } else {
                  if (!this.accountCodeOneData) {
                        this.accountCodeOneData = this.accountCodeOneData === undefined ? '' : undefined;
                  }
                  if (!this.debitReadOnly) {
                        this.firstLastName = null;
                  }
                  this.accountCodeTwoData = this.accountCodeTwoData === undefined ? '' : undefined;
                  this.accountCodeReadOnly = true;
                  this.accountCodeTwoData = null;
                  this.readOnlyData = true;
                  this.readOnlyTextData = true;
                  this.nbtOffIdReadOnly = true;
                  this.gltxnModel.nbtOffenderId = null;
                  this.nbtOffenderId = null;
                  this.gltxnModel.accountCodeTwo = null;
            }
      }
      chkCrDrOffId(id, nbtId) {
            if (id === nbtId) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('otdaacco.youcannotdebitandcredit');
                  this.show();
                  return false;
            }
            return true;
      }
      getNbtOffenderDetails(event, id) {
            if (id) {
                  if (id === 'crId') {
                        this.lastFirstName = null;
                  }
            }
            if (event || event === 0) {
                  if (event === 0) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('otdaacco.offendernotexists');
                        this.show();
                        this.nbtOffenderExist = true;
                        this.gltxnModel.nbtOffenderIdDisplay = null;
                        return;
                  }
                  this.vthaModel = new VTrustHeader();
                  this.vthaModel.offenderIdDisplay = this.gltxnModel.nbtOffenderIdDisplay;
                  if (this.vthaModel.offenderIdDisplay) {
                        for (let i = Number(String(this.vthaModel.offenderIdDisplay).length); i < 10; i++) {
                              this.vthaModel.offenderIdDisplay = '0' + this.vthaModel.offenderIdDisplay;
                        }
                  }
                  if (!this.chkCrDrOffId(this.vthaModel.offenderIdDisplay, this.gltxnModel.offenderIdDisplay)) {
                        this.gltxnModel.nbtOffenderIdDisplay = null;
                        this.lastFirstName = null;
                        return false;
                  }
                  const vthaResult = this.otinamesFactory.vThaExecuteQuery(this.vthaModel);
                  vthaResult.subscribe(vthaResultList => {
                        if (vthaResultList.length === 0) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('otdaacco.offendernotexists');
                              this.show();
                              this.nbtOffenderExist = true;
                              this.gltxnModel.nbtOffenderIdDisplay = null;
                              return;
                        } else {
                              const lengthData = [];
                              this.vthaModel = vthaResultList[0];
                              if (this.vthaModel.accountClosedFlag === 'Y') {
                                    this.type = 'warn';
                                    this.message = this.translateService.translate('otdaacco.thisoffenderaccount');
                                    this.show();
                                    this.gltxnModel.nbtOffenderIdDisplay = null;
                                    this.lastFirstName = null;
                                    this.getOffNbtData = false;
                                    return;
                              }
                              this.gltxnModel.nbtOffenderIdDisplay = this.vthaModel.offenderIdDisplay;
                              this.gltxnModel.nbtOffenderId = this.vthaModel.rootOffenderId;
                              this.lastFirstName = undefined;
                              this.nbtOffenderExist = false;
                              if (this.vthaModel.middleName) {
                                    this.vthaModel.middleName = this.vthaModel.middleName.charAt(0);
                                    this.lastFirstName = this.vthaModel.lastName + ', ' + this.vthaModel.firstName +
                                          ', ' + this.vthaModel.middleName;
                              } else {
                                    this.lastFirstName = this.vthaModel.lastName + ', ' + this.vthaModel.firstName;
                              }
                              this.nbtOffenderId = this.vthaModel.rootOffenderId;
                              this.offId = false;
                              this.nbtOffId = true;
                              this.getOffData = false;
                              this.getOffNbtData = true;
                              this.readOnlyData = false;
                              this.readOnlyTextData = true;
                              this.creditReadOnly = false;
                              this.checkReadOnly = true;
                              this.saveFlag = false;
                              this.validateItem();
                        }
                  });
            } else {
                  this.lastFirstName = null;
                  this.readOnlyData = true;
                  this.readOnlyTextData = true;
                  this.checkReadOnly = true;
                  this.gltxnModel.txnEntryAmount = null;
                  this.gltxnModel.reconClearFlag = null;
                  this.gltxnModel.txnReferenceNumber = null;
                  this.gltxnModel.txnEntryDesc = null;
            }
      }
      /**
      * event is fired when otinamesdialog closed.
      * @param event
      */
      afterNameSearchClosed(event) {
            if (event) {
                  if (!this.chkCrDrOffId(event.offenderIdDisplay, this.gltxnModel.nbtOffenderIdDisplay)) {
                        this.gltxnModel.offenderIdDisplay = null;
                        this.firstLastName = null;
                        return false;
                  }
                  if (event.accountClosedFlag === 'Y') {
                        this.type = 'warn';
                        this.message = this.translateService.translate('otdaacco.thisoffenderaccount');
                        this.show();
                        this.gltxnModel.offenderIdDisplay = null;
                        this.firstLastName = null;
                        this.getOffData = false;
                        this.accountCodeReadOnly = true;
                        this.readOnlyData = true;
                        this.readOnlyTextData = true;
                        this.creditReadOnly = true;
                        this.checkReadOnly = true;
                        this.nbtOffIdReadOnly = true;
                        return;
                  }
                  this.gltxnModel.offenderIdDisplay = event.offenderIdDisplay;
                  this.gltxnModel.offenderId = event.rootOffenderId;
                  this.offenderId = event.rootOffenderId;
                  if (event.middleName) {
                        event.middleName = event.middleName.charAt(0);
                        this.firstLastName = event.lastName + ', ' + event.firstName +
                              ', ' + event.middleName;
                  } else {
                        this.firstLastName = event.lastName + ', ' + event.firstName;
                  }
                  this.offId = true;
                  this.nbtOffId = false;
                  this.offenderExist = false;
                  this.accountCodeReadOnly = false;
                  this.readOnlyData = true;
                  this.readOnlyTextData = true;
                  this.creditReadOnly = true;
                  this.checkReadOnly = true;
                  this.nbtOffIdReadOnly = true;
                  if (this.txnTypeData) {
                        this.creditAccountCodeLink = 'otdaacco/cgfkGlTxnAccountCodeRecordGroup?txnType=' + this.txnTypeData +
                              '&caseLoadType=' + this.sessionManager.currentCaseLoadType + '&caseLoadId='
                              + this.sessionManager.currentCaseLoad;
                  }
                  this.getOffData = true;
                  this.getOffNbtData = false;
                  this.saveFlag = false;
                  this.validateItem();
            } else {
                  this.accountCodeReadOnly = true;
                  this.readOnlyData = true;
                  this.readOnlyTextData = true;
                  this.creditReadOnly = true;
                  this.checkReadOnly = true;
                  this.nbtOffIdReadOnly = true;
            }
      }
      /**
      * event is fired when otinamesdialog closed.
      * @param event
      */
      afterNameSearchClosedNbt(event) {
            if (event) {
                  if (!this.chkCrDrOffId(event.offenderIdDisplay, this.gltxnModel.offenderIdDisplay)) {
                        this.gltxnModel.nbtOffenderIdDisplay = null;
                        this.lastFirstName = null;
                        return false;
                  }
                  if (event.accountClosedFlag === 'Y') {
                        this.type = 'warn';
                        this.message = this.translateService.translate('otdaacco.thisoffenderaccount');
                        this.show();
                        this.gltxnModel.nbtOffenderIdDisplay = null;
                        this.lastFirstName = null;
                        this.getOffNbtData = false;
                        return;
                  }
                  this.gltxnModel.nbtOffenderIdDisplay = event.offenderIdDisplay;
                  this.gltxnModel.nbtOffenderId = event.rootOffenderId;
                  this.nbtOffenderId = event.rootOffenderId;
                  if (event.middleName) {
                        event.middleName = event.middleName.charAt(0);
                        this.lastFirstName = event.lastName + ', ' + event.firstName +
                              ', ' + event.middleName;
                  } else {
                        this.lastFirstName = event.lastName + ', ' + event.firstName;
                  }
                  this.offId = false;
                  this.nbtOffId = true;
                  this.nbtOffenderExist = false;
                  this.getOffData = false;
                  this.getOffNbtData = true;
                  this.saveFlag = false;
                  this.readOnlyData = false;
                  this.readOnlyTextData = true;
                  this.checkReadOnly = true;
                  this.validateItem();
            }
      }
      validateItem() {
            this.gltxnModel.caseloadId = this.sessionManager.currentCaseLoad;
            this.gltxnModel.accountCodeOne = Number(this.gltxnModel.accountCodeOne);
            this.gltxnModel.accountCodeTwo = Number(this.gltxnModel.accountCodeTwo);
            if (this.offId) {
                  this.nbtOffId = false;
                  this.gltxnModel.sealFlag = 'A';
            } else {
                  this.offId = false;
                  this.gltxnModel.sealFlag = 'Z';
            }
            if (this.gltxnModel.offenderId || this.gltxnModel.nbtOffenderId) {
                  const validateFlag = this.otdaaccoFactory.whenValidateItem(this.gltxnModel);
                  validateFlag.subscribe(validateFlagData => {
                        if (validateFlagData === 1) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('otdaacco.thisoffenderhas');
                              this.show();
                              return;
                        } else if (validateFlagData === 2) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('otdaacco.thisoffenderaccount');
                              this.show();
                              if (this.getOffData) {
                                    this.gltxnModel.offenderIdDisplay = null;
                                    this.firstLastName = null;
                                    this.getOffData = false;
                                    this.accountCodeReadOnly = true;
                                    this.readOnlyData = true;
                                    this.readOnlyTextData = true;
                                    this.creditReadOnly = true;
                                    this.checkReadOnly = true;
                                    this.nbtOffIdReadOnly = true;
                              }
                              if (this.getOffNbtData) {
                                    this.gltxnModel.nbtOffenderIdDisplay = null;
                                    this.lastFirstName = null;
                                    this.getOffNbtData = false;
                              }
                              return;
                        } else if (validateFlagData === 3) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('otdaacco.youcannotdebitandcredit');
                              this.show();
                              this.gltxnModel.nbtOffenderIdDisplay = null;
                              this.lastFirstName = null;
                              return;
                        } else if (validateFlagData === 4) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('otdaacco.thisoffenderhas');
                              this.show();
                              return;
                        } else if (validateFlagData === 5) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('otdaacco.forsubaccounttype');
                              this.show();
                              return;
                        }
                  });
            } else if (this.gltxnModel) {
                  if (!this.gltxnModel.accountCodeOne) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('otdaacco.debitaccountcodemust');
                        this.show();
                        return;
                  } else {
                        this.chkInvalidAccounts();
                  }
            } else if (this.gltxnModel) {
                  if (!this.gltxnModel.accountCodeTwo) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('otdaacco.creditaccountcodemustbeentered');
                        this.show();
                        return;
                  } else {
                        this.chkInvalidAccounts();
                  }
            } else if (!this.gltxnModel.txnEntryAmount) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('otdaacco.adjustmentamountmustbeentered');
                  this.show();
                  return;
            } else if (!this.gltxnModel.txnType) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('otdaacco.transactiontypemustbeentered');
                  this.show();
                  return;
            }
      }
      chkInvalidAccounts() {
            const chkInvalidAccount = this.otdaaccoFactory.chkInvalidAccounts(this.gltxnModel.accountCodeOne,
                  this.gltxnModel.accountCodeTwo, this.gltxnModel.caseloadId);
            chkInvalidAccount.subscribe(chkInvalidAcntFlag => {
                  if (chkInvalidAcntFlag === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('otdaacco.cannotcreditload');
                        this.show();
                  } else if (chkInvalidAcntFlag === 2) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('otdaacco.cannotdebitloan');
                        this.show();
                  } else if (chkInvalidAcntFlag === 3) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('otdaacco.movementoffunds');
                        this.show();
                  }
            });
      }
      amountBlur(amount) {
            this.amountFormat.precisionFlot(amount);
            if (!this.readOnlyData) {
                  this.amountData = false;
                  if (String(this.gltxnModel.txnEntryAmount) === '0' || String(this.gltxnModel.txnEntryAmount) === '0.00') {
                        this.amountData = true;
                        this.checkReadOnly = true;
                        this.readOnlyTextData = true;
                        this.gltxnModel.reconClearFlag = null;
                        this.gltxnModel.txnReferenceNumber = null;
                        this.gltxnModel.txnEntryDesc = null;
                        this.type = 'warn';
                        this.message = this.translateService.translate('otdaacco.mustbeinrange');
                        this.show();
                        return;
                  }
                  if (this.gltxnModel.txnEntryAmount) {
                        this.checkReadOnly = false;
                        this.readOnlyTextData = false;
                  } else {
                        this.checkReadOnly = true;
                        this.readOnlyTextData = true;
                  }
            }
      }
      /*
       * This method is used to show popup messages.
       */
      show() {
            this.msglist = [];
            this.msglist.push({ message: this.message, type: this.type });
            this.msgs = [...this.msglist];
      }
      /**
       *  This function will be executed when commit event is
      * fired
      */
      otdaaccoSavegltxnForm() {
            this.gltxnInsertList = [];
            this.gltxnUpdateList = [];
            this.gltxnDeleteList = [];
            this.gltxnCommitModel.insertList = [];
            this.gltxnCommitModel.updateList = [];
            this.gltxnCommitModel.deleteList = [];
            if (!this.txnTypeData) {
                  this.gltxnModel.txnType = null;
                  this.type = 'warn';
                  this.message = this.translateService.translate('otdaacco.insertofsecondblock');
                  this.message = this.translateService.translate('otdaacco.transactiontypemustbeentered');
                  this.show();
                  return;
            }
            if (!this.accountCodeOneData) {
                  this.gltxnModel.accountCodeOne = null;
                  this.type = 'warn';
                  this.message = this.translateService.translate('otdaacco.debitaccountcodemust');
                  this.show();
                  return;
            }
            if (this.gltxnModel.offenderIdDisplay === null ||
                  (!this.gltxnModel.offenderIdDisplay && Number(this.gltxnModel.offenderIdDisplay) !== 0)) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('otdaacco.forsubaccounttype');
                  this.show();
                  return;
            }
            if (this.offenderExist || !this.firstLastName) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('otdaacco.offendernotexists');
                  this.show();
                  return;
            }
            if (!this.accountCodeTwoData) {
                  this.gltxnModel.accountCodeTwo = null;
                  this.type = 'warn';
                  this.message = this.translateService.translate('otdaacco.creditaccountcodemustbeentered');
                  this.show();
                  return;
            }
            if (!this.gltxnModel.nbtOffenderIdDisplay && Number(this.gltxnModel.nbtOffenderIdDisplay) !== 0 ||
             this.gltxnModel.nbtOffenderIdDisplay === null) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('otdaacco.forsubaccounttype');
                  this.show();
                  return;
            }
            if (this.nbtOffenderExist || !this.lastFirstName) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('otdaacco.offendernotexists');
                  this.show();
                  return;
            }
            if (this.amountData) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('otdaacco.mustbeinrange');
                  this.show();
                  return;
            }
            if (!this.gltxnModel.txnEntryAmount) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('otdaacco.adjustmentamountmustbeentered');
                  this.show();
                  return;
            }
            this.gltxnModel.caseloadId = this.sessionManager.currentCaseLoad;
            this.gltxnModel.accountCode = null;
            this.gltxnModel.accountCodeOne = Number(this.gltxnModel.accountCodeOne);
            this.gltxnModel.accountCodeTwo = Number(this.gltxnModel.accountCodeTwo);
            this.gltxnModel.offenderId = this.offenderId;
            this.gltxnModel.nbtOffenderId = this.nbtOffenderId;
            this.gltxnInsertList.push(JSON.parse(JSON.stringify(this.gltxnModel)));
            this.gltxnInsertList.forEach(ele => {
                  ele.reconClearFlag = ele.reconClearFlag ? 'Y' : 'N';
            });
            this.gltxnCommitModel.insertList = this.gltxnInsertList;
            if (this.gltxnDeleteList.length > 0) {
                  for (let i = 0; i < this.gltxnDeleteList.length; i++) {
                        this.gltxnCommitModel.deleteList = this.gltxnDeleteList;
                  }
            }
            const gltxn1SaveData = this.otdaaccoFactory.glTxn1Commit(this.gltxnCommitModel);
            gltxn1SaveData.subscribe(data => {
                  if (data) {
                        if (data.sealFlag === 'A') {
                              this.type = 'warn';
                              this.message = this.translateService.translate('otdaacco.overdrawntransaction');
                              this.show();
                              return;
                        } else if (data.sealFlag === 'B') {
                              this.type = 'warn';
                              this.message = this.translateService.translate('otdaacco.offenderdoesnothave');
                              this.message = String(this.message).replace('%offId%', this.gltxnModel.offenderIdDisplay);
                              this.message = String(this.message).replace('%accountCode%', data.accountCode);
                              this.show();
                              return;
                        } else if (data.sealFlag === 'C') {
                              this.type = 'warn';
                              this.message = this.translateService.translate('otdaacco.norecordinoffendersubaccount');
                              this.message = String(this.message).replace('%offId%', this.gltxnModel.offenderIdDisplay);
                              this.message = String(this.message).replace('%caseloadId%', this.gltxnModel.caseloadId);
                              this.show();
                              return;
                        } else if (data.sealFlag === 'D') {
                              this.type = 'warn';
                              this.message = this.translateService.translate('otdaacco.unabletofindoffenderbookid');
                              this.show();
                              return;
                        } else if (data.sealFlag === 'E') {
                              this.type = 'warn';
                              this.message = this.translateService.translate('otdaacco.errorwheninserting');
                              this.show();
                              return;
                        } else if (data.sealFlag === 'F') {
                              this.type = 'warn';
                              this.message = this.translateService.translate('otdaacco.othererrorininsertgltransnew');
                              this.show();
                              return;
                        } else if (data.sealFlag === 'G') {
                              this.type = 'warn';
                              this.message = this.translateService.translate('otdaacco.errorwheninsertingcrgl');
                              this.show();
                              return;
                        } else if (data.sealFlag === 'H') {
                              this.type = 'warn';
                              this.message = this.translateService.translate('otdaacco.errorwheninsertingofftxns');
                              this.show();
                              return;
                        } else if (data.sealFlag === 'I') {
                              this.type = 'warn';
                              this.message = this.translateService.translate('otdaacco.errorwheninsertingdrofftxns');
                              this.show();
                              return;
                        } else if (data.sealFlag === 'J') {
                              this.type = 'warn';
                              this.message = this.translateService.translate('otdaacco.errorwheninsertingcrofftxns');
                              this.show();
                              return;
                        } else if (data.sealFlag === 'K') {
                              this.type = 'warn';
                              this.message = this.translateService.translate('otdaacco.errorwhencallinggetacandsetinddate');
                              this.show();
                              return;
                        } else if (data.sealFlag === 'Z') {
                              this.gltxnModel = new GlTransactions();
                              this.gltxnModel.txnId = data.txnId;
                              this.lastFirstName = '';
                              this.firstLastName = '';
                              this.clearFlag = false;
                              this.readOnlyData = true;
                              this.readOnlyTextData = true;
                              this.creditReadOnly = true;
                              this.checkReadOnly = true;
                              this.nbtOffIdReadOnly = true;
                              this.accountCodeReadOnly = true;
                              this.accountCodeTwoData = null;
                              this.accountCodeOneData = null;
                              this.txnTypeData = null;
                              this.txnTypeReadOnly = true;
                              this.saveFlag = true;
                              this.type = 'success';
                              this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                              this.show();
                              return;
                        } else {
                              this.type = 'warn';
                              this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                              this.show();
                              return;
                        }
                  }
            });
      }
      gltxnExecuteQuery() {
            const gltxnResult = this.otdaaccoFactory.
                  glTxnExecuteQuery(this.gltxnModel);
            gltxnResult.subscribe(gltxnResultList => {
                  if (gltxnResultList.length === 0) {
                        this.gltxnData = [];
                  } else {
                        this.gltxnData = gltxnResultList;
                        this.gltxnModel = gltxnResultList[0];
                  }
            });
      }
      amountKeyDown(event, comp) {
            if (!this.amountFormat.avoidKeys(event, this.gltxnModel.txnEntryAmount)) {
                  event.stopPropagation();
                  return false;
            }
      }
      whenCheckBoxChanged(event) {
            if (event === true) {
                  const reconClearFlagData = this.otdaaccoFactory.whenCheckBoxChecked(this.sessionManager.currentCaseLoad,
                        this.gltxnModel.nbtOffenderIdDisplay, this.txnTypeData);
                  reconClearFlagData.subscribe(reconClearFlag => {
                        if (reconClearFlag === 'Y') {
                              this.glTxnDialogModel.offenderId = this.nbtOffenderId;
                              this.glTxnDialogModel.caseloadId = this.sessionManager.currentCaseLoad;
                              this.glTxnDialogModel.txnType = this.txnTypeData;
                              this.glTxnDialogModel.moduleName = 'OTDAACCO';
                              this.dialogService.openLinkDialog('/OCUOVROB', this.glTxnDialogModel, 50).subscribe(result => {
                              });
                        }
                  });
            } else {
                  this.glTxnDialogModel = new GlTransactions();
            }
      }
}
