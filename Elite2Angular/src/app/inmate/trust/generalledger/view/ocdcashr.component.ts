import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdcashrService } from '../service/ocdcashr.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { GlTransactions } from '@inmate/trust/trustaccounts/beans/GlTransactions';
import { GlTransactionsCommitBean } from '@inmate/trust/trustaccounts/beans/GlTransactionsCommitBean';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';
import { DialogService } from '@ui-components/dialog/dialog.service';

@Component({
  selector: 'app-ocdcashr',
  templateUrl: './ocdcashr.component.html'
})

export class OcdcashrComponent implements OnInit {
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  readonly: boolean;
  gltxnData: GlTransactions[] = [];
  @ViewChild('accCodeLov') accCodeLov: any;
  gltxnModel: GlTransactions = new GlTransactions();
  gltxnCommitModel: GlTransactionsCommitBean = new GlTransactionsCommitBean();
  gltxnInsertList: GlTransactions[] = [];
  gltxnUpdateList: GlTransactions[] = [];
  gltxnDeleteList: GlTransactions[] = [];
  gltxn1Data: GlTransactions[] = [];
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  glTxn1ColumnDef: any[];
  cgfkGltxnaccountcodeRg: any[] = [];
  cgnbtPayeeNameText: string;
  codeTitle: any;
  caseLoadId: string;
  caseLoadType: string;
  codeTitlesData = { 'code': this.trMsg('common.code'), 'description': this.trMsg('common.accountname') };
  savedisabled: any;
  autoPoplate: boolean;
  txnEntryAmount: string;
  amountDisabled: boolean;
  clearDisable: boolean;
  clearFlag: boolean;
  txnId: any;
  slashFlag: boolean;
  viewDisabled: boolean;
  txnAmount: any;
  acntCodeDisabled: boolean;
  constructor(private ocdcashrFactory: OcdcashrService,
    public translateService: TranslateService,
    private sessionManager: UserSessionManager,
    private amountFormat: AmountFormatUtil,
    public dialogService: DialogService) {
    this.glTxn1ColumnDef = [];
  }
  ngOnInit() {
    this.acntCodeDisabled = false;
    this.savedisabled = false;
    this.clearDisable = true;
    this.savedisabled = true;
    this.amountDisabled = true;
    this.autoPoplate = true;
    this.caseLoadId = this.sessionManager.currentCaseLoad;
    this.caseLoadType = this.sessionManager.currentCaseLoadType;
    this.codeTitle = 'ocdcashr/cgfkGlTxnAccountCodeRecordGroup?caseloadId=' + this.caseLoadId
      + '&caseloadType=' + this.caseLoadType;
    this.glTxn1ColumnDef = [
      { fieldName: this.trMsg('ocdcashr.rev'), field: 'txnReversedFlag', editable: false, datatype: 'checkbox', width: 150 },
      { fieldName: this.trMsg('ocdcashr.txndate'), field: 'txnEntryDate', editable: false, datatype: 'date', width: 150 },
      { fieldName: this.trMsg('ocdcashr.txntime'), field: 'txnEntryTime', editable: false, datatype: 'time', width: 150 },
      { fieldName: this.trMsg('ocdcashr.glslash'), field: 'txnId', editable: false, width: 150 },
      { fieldName: this.trMsg('common.seq'), field: 'txnEntrySeq', editable: false, width: 100 },
      { fieldName: this.trMsg('common.Orca2'), field: 'offenderIdDisplay', editable: false, width: 200 },
      { fieldName: this.trMsg('common.description'), field: 'txnEntryDesc', editable: false, width: 150 },
      { fieldName: this.trMsg('ocdcashr.dr'), field: 'accountCodeOne', editable: false, width: 150 },
      { fieldName: this.trMsg('ocdcashr.cr'), field: 'accountCodeTwo', editable: false, width: 150 },
      { fieldName: this.trMsg('common.amount'), field: 'txnEntryAmount', editable: false, width: 150 },
      { fieldName: this.trMsg('ocdcashr.receiptslash'), field: 'receiptNumber', editable: false, width: 150 },
    ];
    this.cgnbtPayeeNameText = this.sessionManager.getId();
  }
  allowNumbers(event) {
  }
  onCgnbtTxnEntryDesc2click() {
  }
  onRowClickgltxn1(event) {
  }
  ok() {
  }
  no() {
  }
  cancel() {
    this.gltxnData = [];
    this.gltxnModel = new GlTransactions();
    this.txnEntryAmount = null;
    this.clearDisable = true;
    this.savedisabled = true;
    this.txnId = null;
    this.acntCodeDisabled = false;
  }
  onOffenderChange(offender) {
  }

  gltxnExecuteQuery() {
    if (!this.viewDisabled) {
      if (!this.gltxnModel.accountCode) {
        this.show('ocdcashr.codemustbeentered');
        return;
      }
      if (!this.gltxnModel.cgnbtPayeeNameTextOne) {
        this.show('ocdcashr.balanceamountcannotbeblank');
        return;
      }
      this.gltxnModel.caseloadId = this.caseLoadId;
      this.gltxnModel.caseloadType = this.caseLoadType;
      const gltxnResult = this.ocdcashrFactory.glTxnExecuteQuery(this.gltxnModel);
      gltxnResult.subscribe(gltxnResultList => {
        if (gltxnResultList.length === 0) {
          this.gltxnData = [];
          this.show('common.querycaused');
          this.viewDisabled=false;
          this.acntCodeDisabled=false;
          this.amountDisabled=false;
          return;
        } else {
          gltxnResultList.forEach(element => {
            element.txnReversedFlag = element.txnReversedFlag === 'Y' ? true : false;
            element.txnEntryAmount = Number(element.txnEntryAmount).toFixed(2);
          });
          this.viewDisabled=true;
          this.acntCodeDisabled=true;
          this.amountDisabled=true;
          this.gltxnData = gltxnResultList;
        }
      });
    }
  }

  onButSave() {
    this.gltxnInsertList = [];
    this.gltxnCommitModel.updateList = [];
    this.gltxnCommitModel.insertList = [];
    this.gltxnModel.caseloadId = this.caseLoadId;
    this.gltxnModel.caseloadType = this.caseLoadType;
    this.gltxnModel.payeeNameText = this.cgnbtPayeeNameText;
    this.gltxnModel.payeeNameText = this.cgnbtPayeeNameText;
    this.gltxnInsertList.push(this.gltxnModel);
    this.gltxnCommitModel.insertList = this.gltxnInsertList;
    if (!this.savedisabled) {
      const alertSaveData = this.ocdcashrFactory.glTxnCommit(this.gltxnCommitModel);
      alertSaveData.subscribe(alertSaveResult => {
        if (alertSaveResult && alertSaveResult.sealFlag === 'X') {
          if (!String(alertSaveResult.txnPostUsage).startsWith('#')) {
            this.txnAmount = '$' + alertSaveResult.txnPostUsage;
          } else {
            this.txnAmount = alertSaveResult.txnPostUsage;
          }
          this.gltxnModel.accountCodeOne = alertSaveResult.accountCodeOne;
          this.gltxnModel.txnEntryDesc = alertSaveResult.txnEntryDesc;
          const data = {
            label: this.translateService.
              translate('ocdcashr.thistransactionwillpostacashreconciliationoverage').replace('%txnAmount%', this.txnAmount),
            yesBtn: true, noBtn: true, yesLabel: 'OK', noLabel: 'Cancel'
          };
          this.txnAmount = null;
          this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
            if (result) {
              this.gltxnModel.reconClearFlag = 'Y';
              this.gltxnInsertList.push(this.gltxnModel);
              this.gltxnCommitModel.insertList = this.gltxnInsertList;
              const alertSaveDataTwo = this.ocdcashrFactory.glTxnCommit(this.gltxnCommitModel);
              alertSaveDataTwo.subscribe(alertSaveResultTwo => {
                if (alertSaveResultTwo && alertSaveResultTwo.txnId) {
                  const txnIdVal = alertSaveResultTwo.txnId;
                  const msgg = this.trMsg('ocdcashr.transactioncomplete')
                    .replace('%txnid%', txnIdVal);
                  this.show(msgg, 'success');
                  this.txnId = txnIdVal;
                  this.gltxnModel = new GlTransactions();
                  this.clearDisable = false;
                  this.clearFlag = true;
                  this.savedisabled = true;
                  this.amountDisabled = true;
                  this.acntCodeDisabled = true;
                  if (!this.gltxnModel.accountCodeOne && !this.gltxnModel.txnEntryDesc) {
                    this.gltxnModel = new GlTransactions();
                    this.txnEntryAmount = null;
                  }
                  return;
                } else if (alertSaveResultTwo && alertSaveResultTwo.sealFlag === 'A') {
                  this.show('ocdcashr.twomanyrowsintransactionoperations', 'warn');
                  return;
                } else if (alertSaveResultTwo && alertSaveResultTwo.sealFlag === 'B') {
                  this.show('ocdcashr.nosetupintransactionoperations', 'warn');
                  return;
                } else if (alertSaveResultTwo && alertSaveResultTwo.sealFlag === 'C') {
                  this.show('ocdcashr.whenothersinkeycommit', 'warn');
                  return;
                } else if (alertSaveResultTwo && alertSaveResultTwo.sealFlag === 'D') {
                  const accCode = String(this.gltxnModel.accountCode);
                  const msggg = this.trMsg('ocdcashr.accountcodeaccodedoesnotexist').replace('%accode%', accCode);
                  this.show(msggg);
                  return;
                } else if (alertSaveResultTwo && alertSaveResultTwo.sealFlag === 'E') {
                  this.show('ocdcashr.othererrorintrustinsertgltransnew', 'warn');
                  return;
                } else if (alertSaveResultTwo && String(alertSaveResultTwo.sealFlag).includes('GL_TXN_OFF_NAME_F6')) {
                  this.show('ocdcashr.thisoffenderiddoesnotexist', 'warn');
                  return;
                } else if (alertSaveResultTwo && String(alertSaveResultTwo.sealFlag).includes('GL_TXN_GL_TXN_F1')) {
                  this.show('ocdcashr.thisreversedtxnidreversedtxnentryseq', 'warn');
                  return;
                } else if (alertSaveResultTwo && String(alertSaveResultTwo.sealFlag).includes('GL_TXN_AC_CODE_F1')) {
                  this.show('ocdcashr.thiscodedoesnotexist', 'warn');
                  return;
                } else if (alertSaveResultTwo && String(alertSaveResultTwo.sealFlag).includes('GL_TRANSACTIONS_PK')) {
                  this.show('ocdcashr.rowexistsalreadywithsametransactionnotxnentryseq', 'warn');
                  return;
                } else if (alertSaveResultTwo && String(alertSaveResultTwo.sealFlag).includes('SYSTEM_PROFILES_PK')) {
                  this.show('ocdcashr.errorsystemprofileexisted', 'warn');
                  return;
                } else {
                  this.show('common.addupdateremoverecordfailed', 'warn');
                  return;
                }
              });
            }
          });
        }
        if (alertSaveResult && alertSaveResult.sealFlag === 'Z') {
          this.txnAmount = alertSaveResult.txnPostUsage;
          if (!String(alertSaveResult.txnPostUsage).startsWith('#')) {
            this.txnAmount = '$' + alertSaveResult.txnPostUsage;
          } else {
            this.txnAmount = alertSaveResult.txnPostUsage;
          }
          this.gltxnModel.accountCodeOne = alertSaveResult.accountCodeOne;
          this.gltxnModel.txnEntryDesc = alertSaveResult.txnEntryDesc;
          const data = {
            label: this.translateService.translate('ocdcashr.thistransactionwillpostacashreconciliationshortage')
              .replace('%txnAmount%', this.txnAmount), yesBtn: true, noBtn: true, yesLabel: 'OK', noLabel: 'Cancel'
          };
          this.txnAmount = null;
          this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
            if (result) {
              this.gltxnModel.reconClearFlag = 'Y';
              this.gltxnInsertList.push(this.gltxnModel);
              this.gltxnCommitModel.insertList = this.gltxnInsertList;
              const alertSaveDataOne = this.ocdcashrFactory.glTxnCommit(this.gltxnCommitModel);
              alertSaveDataOne.subscribe(alertSaveResultOne => {
                if (alertSaveResultOne && alertSaveResultOne.txnId) {
                  const txnIdVal = alertSaveResultOne.txnId;
                  const msgg = this.trMsg('ocdcashr.transactioncomplete')
                    .replace('%txnid%', txnIdVal);
                  this.show(msgg, 'success');
                  this.txnId = txnIdVal;
                  this.gltxnModel = new GlTransactions();
                  if (!this.gltxnModel.accountCodeOne && !this.gltxnModel.txnEntryDesc) {
                    this.gltxnModel = new GlTransactions();
                    this.txnEntryAmount = null;
                  }
                  this.clearDisable = false;
                  this.clearFlag = true;
                  this.savedisabled = true;
                  this.amountDisabled = true;
                  this.acntCodeDisabled = true;
                  return;
                } else if (alertSaveResultOne && alertSaveResultOne.sealFlag === 'A') {
                  this.show('ocdcashr.twomanyrowsintransactionoperations', 'warn');
                  return;
                } else if (alertSaveResultOne && alertSaveResultOne.sealFlag === 'B') {
                  this.show('ocdcashr.nosetupintransactionoperations', 'warn');
                  return;
                } else if (alertSaveResultOne && alertSaveResultOne.sealFlag === 'C') {
                  this.show('ocdcashr.whenothersinkeycommit', 'warn');
                  return;
                } else if (alertSaveResultOne && alertSaveResultOne.sealFlag === 'D') {
                  const accCode = String(this.gltxnModel.accountCode);
                  const msggg = this.trMsg('ocdcashr.accountcodeaccodedoesnotexist').replace('%accode%', accCode);
                  this.show(msggg);
                  return;
                } else if (alertSaveResultOne && alertSaveResultOne.sealFlag === 'E') {
                  this.show('ocdcashr.othererrorintrustinsertgltransnew', 'warn');
                  return;
                } else if (alertSaveResultOne && alertSaveResultOne.sealFlag === 'GL_TXN_OFF_NAME_F6') {
                  this.show('ocdcashr.thisoffenderiddoesnotexist', 'warn');
                  return;
                } else if (alertSaveResultOne && alertSaveResultOne.sealFlag === 'GL_TXN_GL_TXN_F1') {
                  this.show('ocdcashr.thisreversedtxnidreversedtxnentryseq', 'warn');
                  return;
                } else if (alertSaveResultOne && alertSaveResultOne.sealFlag === 'GL_TXN_AC_CODE_F1') {
                  this.show('ocdcashr.thiscodedoesnotexist', 'warn');
                  return;
                } else if (alertSaveResultOne && alertSaveResultOne.sealFlag === 'GL_TRANSACTIONS_PK') {
                  this.show('ocdcashr.rowexistsalreadywithsametransactionnotxnentryseq', 'warn');
                  return;
                } else if (alertSaveResultOne && alertSaveResultOne.sealFlag === 'SYSTEM_PROFILES_PK') {
                  this.show('ocdcashr.errorsystemprofileexisted', 'warn');
                  return;
                } else {
                  this.show('common.addupdateremoverecordfailed', 'warn');
                  return;
                }
              });
            }
          });
        }
        if (alertSaveResult && alertSaveResult.txnId) {
          const txnIdVal = alertSaveResult.txnId;
          const msgg = this.trMsg('ocdcashr.transactioncomplete')
            .replace('%txnid%', txnIdVal);
          this.show(msgg, 'success');
          this.txnId = txnIdVal;
          this.gltxnModel = new GlTransactions();
          if (!this.gltxnModel.accountCodeOne && !this.gltxnModel.txnEntryDesc) {
            this.gltxnModel = new GlTransactions();
            this.txnEntryAmount = null;
          }
          this.clearDisable = false;
          this.clearFlag = true;
          this.savedisabled = true;
          this.amountDisabled = true;
          this.acntCodeDisabled = true;
          return;
        } else if (alertSaveResult && alertSaveResult.sealFlag === 'A') {
          this.show('ocdcashr.twomanyrowsintransactionoperations', 'warn');
          return;
        } else if (alertSaveResult && alertSaveResult.sealFlag === 'B') {
          this.show('ocdcashr.nosetupintransactionoperations', 'warn');
          return;
        } else if (alertSaveResult && alertSaveResult.sealFlag === 'C') {
          this.show('ocdcashr.whenothersinkeycommit', 'warn');
          return;
        } else if (alertSaveResult && alertSaveResult.sealFlag === 'D') {
          const accCode = String(this.gltxnModel.accountCode);
          const msggg = this.trMsg('ocdcashr.accountcodeaccodedoesnotexist').replace('%accode%', accCode);
          this.show(msggg);
          return;
        } else if (alertSaveResult && alertSaveResult.sealFlag === 'E') {
          this.show('ocdcashr.othererrorintrustinsertgltransnew', 'warn');
          return;
        } else if (alertSaveResult && alertSaveResult.sealFlag === 'GL_TXN_OFF_NAME_F6') {
          this.show('ocdcashr.thisoffenderiddoesnotexist', 'warn');
          return;
        } else if (alertSaveResult && alertSaveResult.sealFlag === 'GL_TXN_GL_TXN_F1') {
          this.show('ocdcashr.thisreversedtxnidreversedtxnentryseq', 'warn');
          return;
        } else if (alertSaveResult && alertSaveResult.sealFlag === 'GL_TXN_AC_CODE_F1') {
          this.show('ocdcashr.thiscodedoesnotexist', 'warn');
          return;
        } else if (alertSaveResult && alertSaveResult.sealFlag === 'GL_TRANSACTIONS_PK') {
          this.show('ocdcashr.rowexistsalreadywithsametransactionnotxnentryseq', 'warn');
          return;
        } else if (alertSaveResult && alertSaveResult.sealFlag === 'SYSTEM_PROFILES_PK') {
          this.show('ocdcashr.errorsystemprofileexisted', 'warn');
          return;
        }
      });
    }
  }
  show(vldmsg, type?) {
    type = type ? type : 'warn';
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }
  trMsg(msg, astr?) {
    return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
  }

  accountCodeChangeEvent(event) {
    if (event && event.code) {
      this.amountDisabled = false;
      if (this.autoPoplate && (this.accCodeLov && this.accCodeLov.innerOptions.length < 0)) {
        this.autoPoplate = false;
        setTimeout(ele => {
          this.gltxnModel.accountCode = null;
          this.gltxnModel.cgnbtPayeeNameTextTwo = null;
        }, 5);
        return;
      } else {
        this.gltxnModel.cgnbtPayeeNameTextOne = null;
        this.txnEntryAmount = null;
        const amountData = this.ocdcashrFactory.accountCodeChangeEvent(this.caseLoadId, this.caseLoadType, event.code);
        amountData.subscribe(amountResult => {
          if (amountResult === 0) {
            this.gltxnModel.cgnbtPayeeNameTextTwo = amountResult.toFixed(2);
            this.slashFlag = false;
          } else if (amountResult !== 'Y') {
            if (String(amountResult).startsWith('#')) {
              this.gltxnModel.cgnbtPayeeNameTextTwo = amountResult;
              this.slashFlag = false;
            } else {
              this.gltxnModel.cgnbtPayeeNameTextTwo = amountResult.toFixed(2);
              this.slashFlag = false;
              this.viewDisabled = false;
            }
          } else {
            this.gltxnModel.cgnbtPayeeNameTextTwo = null;
            this.slashFlag = true;
            this.viewDisabled = false;
            this.gltxnData = [];
          }
        });
      }
    } else {
      this.amountDisabled = true;
    
    }
  }

  amountKeyDown(event, comp) {
    if (!this.amountFormat.avoidKeys(event, this.gltxnModel.cgnbtPayeeNameTextOne, true)) {
      event.stopPropagation();
      return false;
    }
  }

  onBlurEvent(amount) {
    this.amountFormat.precisionFlot(amount);
    if (this.gltxnModel.cgnbtPayeeNameTextOne && this.gltxnModel.cgnbtPayeeNameTextTwo) {
      const lvBalance = Number(this.gltxnModel.cgnbtPayeeNameTextOne).toFixed(2);
      const lvAmount = Number(this.gltxnModel.cgnbtPayeeNameTextTwo).toFixed(2);
      const amountOne = Number(lvBalance) - Number(lvAmount);
      if (amountOne < 0) {
        this.txnEntryAmount = '<' + Math.abs(amountOne).toFixed(2) + '>';
      } else {
        const amountData = this.ocdcashrFactory.txnAmountDataSlashes(amountOne);
        amountData.subscribe(amountResult => {
          if (String(amountResult).startsWith('#')) {
            this.txnEntryAmount = amountResult;
          } else {
            this.txnEntryAmount = amountResult.toFixed(2);
          }
        });
      }
    } else {
      this.txnEntryAmount = null;
    }
  }

  isInsertable() {
    if (this.gltxnModel.accountCode) {
      this.clearDisable = false;
    } else {
      this.clearDisable = true;
      if (this.clearFlag) {
        this.clearDisable = false;
        this.clearFlag = false;
      }
    }
  }

  isInsertableClear() {
    if (this.gltxnModel.accountCode && this.gltxnModel.cgnbtPayeeNameTextOne) {
      if (this.slashFlag) {
        this.savedisabled = true;
      } else {
        this.savedisabled = false;
      }
    } else {
      this.savedisabled = true;
    }
  }
}
