import {
    Component, OnInit, Injectable, Pipe, PipeTransform, Directive,
    ElementRef
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { TranslateService } from '@common/translate/translate.service';
import { OtdcloseService } from '../service/otdclose.service';
import { OffenderSubAccounts } from '@inmate/trust/trustaccounts/beans/OffenderSubAccounts';
import { OffenderTransactions } from '@inmatetrustaccountsbeans/OffenderTransactions';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { SystemProfilesCommitBean } from '@saadminbeans/SystemProfilesCommitBean';
import { OffenderTransactionsCommitBean } from '@inmatetrustaccountsbeans/OffenderTransactionsCommitBean';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';

@Component({
    selector: 'app-otdclose',
    templateUrl: './otdclose.component.html'
})

export class OtdcloseComponent implements OnInit {
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offsubaData: OffenderSubAccounts[] = [];
    offsubaModel: OffenderSubAccounts = new OffenderSubAccounts();
    offsubaIndex = 0;
    offsubaInsertList: OffenderSubAccounts[] = [];
    offsubaUpdateList: OffenderSubAccounts[] = [];
    offsubaDeleteList: OffenderSubAccounts[] = [];
    offtxnData: OffenderTransactions[] = [];
    offtxnModel: OffenderTransactions = new OffenderTransactions();
    offtxnModelData: OffenderTransactions = new OffenderTransactions();
    offtxnIndex = 0;
    offtxnInsertList: OffenderTransactions[] = [];
    offtxnUpdateList: OffenderTransactions[] = [];
    offtxnDeleteList: OffenderTransactions[] = [];
    syspflData: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex = 0;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    cmAcCodeColumnDef: any[];
    reconTxnColumnDef: any[];
    benTxnColumnDef: any[];
    reconsBlockColumnDef: any[];
    csldAlColumnDef: any[];
    bcrTmpColumnDef: any[];
    offOblHtyColumnDef: any[];
    securityThreatGroupsColumnDef: any[];
    bankRcColumnDef: any[];
    offTracColumnDef: any[];
    livUnitColumnDef: any[];
    glTxn1ColumnDef: any[];
    perColumnDef: any[];
    offBncColumnDef: any[];
    vCorpColumnDef: any[];
    vBcBenColumnDef: any[];
    vOffBkgColumnDef: any[];
    glTxnReadOnly = false;
    glTxn1ReadOnly = false;
    sysPflReadOnly = false;
    offTxnReadOnly = false;
    offBncReadOnly = false;
    vCorpReadOnly = false;
    perReadOnly = false;
    offOblHtyReadOnly = false;
    benTxnReadOnly = false;
    vBcBenReadOnly = false;
    cg$ctrlReadOnly = false;
    csldAlReadOnly = false;
    vOffBkgReadOnly = false;
    livUnitReadOnly = false;
    securityThreatGroupsReadOnly = false;
    cmAcCodeReadOnly = false;
    ctrlBlockReadOnly = false;
    reconsBlockReadOnly = false;
    statusBlockReadOnly = false;
    reconTxnReadOnly = false;
    bcrTmpReadOnly = false;
    glTxn2ReadOnly = false;
    glTxn3ReadOnly = false;
    bankRcReadOnly = false;
    offTracReadOnly = false;
    cgfkOfftxnpayeecodeRg: any[] = [];
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    payeeCodeLink: any;
    offtxnCommitModel: OffenderTransactionsCommitBean = new OffenderTransactionsCommitBean();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    accountNameValid: string;
    totalAmount: number;
    closedFlag: boolean;
    offenderId: number;
    chkAccuntClosedFlag: boolean;
    chkSubAcnt: boolean;
    pTxnType: string;
    freezDisburseFlag: boolean;
    clearFlag: boolean;
    saveFlag: boolean;
    readOnlyFlag: boolean;
    subReadOnly: boolean;
    personReadOnly: boolean;
    corporateReadOnly: boolean;
    perOnlyFlag: boolean;
    corpOnlyFlag: boolean;
    nbtAmountOnlyFlag: boolean;
    checkPayeeBlur: any;
    payeeReadOnly: boolean;
    txnId: any;
    adjustTxnId: any;
    payeeCodeTitle = {
        'code': this.translateService.translate('otdclose.whoispayee'),
        'description': this.translateService.translate('common.description')
    };
    constructor(private otdcloseFactory: OtdcloseService,
        public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService,
        public sessionManager: UserSessionManager,
        private amountFormat: AmountFormatUtil) {
        this.cmAcCodeColumnDef = [];
        this.reconTxnColumnDef = [];
        this.benTxnColumnDef = [];
        this.reconsBlockColumnDef = [];
        this.csldAlColumnDef = [];
        this.bcrTmpColumnDef = [];
        this.offOblHtyColumnDef = [];
        this.securityThreatGroupsColumnDef = [];
        this.bankRcColumnDef = [];
        this.offTracColumnDef = [];
        this.livUnitColumnDef = [];
        this.glTxn1ColumnDef = [];
        this.perColumnDef = [];
        this.offBncColumnDef = [];
        this.vCorpColumnDef = [];
        this.vBcBenColumnDef = [];
        this.vOffBkgColumnDef = [];
    }
    ngOnInit() {
        this.saveFlag = true;
        this.clearFlag = true;
        this.readOnlyFlag = true;
        this.subReadOnly = true;
        this.personReadOnly = true;
        this.corporateReadOnly = true;
        this.perOnlyFlag = true;
        this.corpOnlyFlag = true;
        this.nbtAmountOnlyFlag = true;
        this.payeeReadOnly = true;
        this.adjustTxnId = null;
        this.payeeCodeLink = 'otdclose/cgfkOffTxnPayeeCodeRecordGroup';
        this.vHeaderBlockModel = new VHeaderBlock();
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }
        const cgfkOfftxnpayeecodeServiceObj = this.otdcloseFactory.
            cgfkOfftxnpayeecodeRecordGroup();
        cgfkOfftxnpayeecodeServiceObj.subscribe(cgfkOfftxnpayeecodelist => {
            if (cgfkOfftxnpayeecodelist.length === 0) {
                this.cgfkOfftxnpayeecodeRg = [];
            } else {
                for (let i = 0; i < cgfkOfftxnpayeecodelist.length; i++) {
                    this.cgfkOfftxnpayeecodeRg.push({
                        'text': cgfkOfftxnpayeecodelist[i].code + ' - ' +
                            cgfkOfftxnpayeecodelist[i].description, 'id': cgfkOfftxnpayeecodelist[i].code
                    });
                }
            }
        });
        this.accountName();
    }
    onOffenderChange(offender) {
        this.adjustTxnId = null;
        this.offtxnModel = new OffenderTransactions();
        this.offtxnModelData = new OffenderTransactions();
        this.offtxnData = [];
        if (offender) {
            this.vHeaderBlockModel = offender;
            this.readOnlyFlag = false;
            if (this.vHeaderBlockModel.rootOffenderId) {
                this.offtxnModelData.offenderId = this.vHeaderBlockModel.rootOffenderId;
                this.offtxnModelData.caseloadId = this.sessionManager.currentCaseLoad;
                this.offtxnModelData.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
                this.offtxnModelData.lastName = this.vHeaderBlockModel.lastName;
                this.offtxnModelData.firstName = this.vHeaderBlockModel.firstName;
                this.offtxnModelData.middleName = this.vHeaderBlockModel.middleName;
                this.chkAccountClosed();
                this.freezDisbursements();
                this.saveFlag = false;
                this.clearFlag = false;
                this.subReadOnly = false;
                this.checkPayeeBlur = true;
            }
        } else {
            this.vHeaderBlockModel = new VHeaderBlock();
            this.offtxnModel = new OffenderTransactions();
            this.offtxnModelData = new OffenderTransactions();
            this.saveFlag = true;
            this.clearFlag = true;
            this.readOnlyFlag = true;
            this.subReadOnly = true;
            this.personReadOnly = true;
            this.corporateReadOnly = true;
            this.perOnlyFlag = true;
            this.corpOnlyFlag = true;
            this.subReadOnly = true;
            this.personReadOnly = true;
            this.corporateReadOnly = true;
            this.checkPayeeBlur = false;
        }
    }
    chkAccountClosed() {
        if (this.offtxnModelData && this.offtxnModelData.offenderId) {
            const closedFlagResult = this.otdcloseFactory.accountClosedFlagValidation(this.offtxnModelData.offenderId,
                this.sessionManager.currentCaseLoad);
            closedFlagResult.subscribe(closedFlag => {
                if (closedFlag === 'Y') {
                    this.closedFlag = true;
                    this.saveFlag = true;
                } else {
                    this.closedFlag = false;
                    this.saveFlag = false;
                }
            });
            const chkAccountClosedFlagResult = this.otdcloseFactory.chkAccountClosedFlag(this.offtxnModelData.offenderId,
                this.sessionManager.currentCaseLoad);
            chkAccountClosedFlagResult.subscribe(chkAccountFlag => {
                if (chkAccountFlag === 1) {
                    this.chkAccuntClosedFlag = true;
                } else {
                    this.chkAccuntClosedFlag = false;
                }
            });
            const chkSubAccountFlagResult = this.otdcloseFactory.chkSubAccountFlag(this.offtxnModelData.offenderId,
                this.sessionManager.currentCaseLoad);
            chkSubAccountFlagResult.subscribe(chkSubAccountFlag => {
                if (chkSubAccountFlag === 1) {
                    this.chkSubAcnt = true;
                } else {
                    this.chkSubAcnt = false;
                }
            });
        }
    }
    freezDisbursements() {
        if (this.sessionManager.currentCaseLoadType === 'INST') {
            this.pTxnType = 'CLC';
        } else {
            this.pTxnType = 'CL';
        }
        const subaccResult = this.otdcloseFactory.freezDisbursement(this.sessionManager.currentCaseLoad, this.offtxnModelData.offenderId,
            this.pTxnType, this.sessionManager.currentCaseLoadType);
        subaccResult.subscribe(result => {
            if (result === 'Y') {
                this.freezDisburseFlag = true;
            } else {
                this.freezDisburseFlag = false;
            }
        });
    }
    accountName() {
        const subaccResult = this.otdcloseFactory.accountNameForValidation();
        subaccResult.subscribe(result => {
            if (result.length > 0) {
                result.forEach(element => {
                    if (element.accountName) {
                        this.accountNameValid = element.accountName;
                    }
                });
            }
        });
    }
    onButListSeqclick() {
    }
    allowNumbers(event) {
    }
    ok() {
    }
    no() {
    }
    cancel() {
        this.offtxnModel = new OffenderTransactions();
        this.offtxnModel.payeeCode = '';
        this.corporateReadOnly = true;
        this.corpOnlyFlag = true;
        this.personReadOnly = true;
        this.perOnlyFlag = true;
        this.nbtAmountOnlyFlag = true;
        this.checkPayeeBlur = false;
        this.payeeReadOnly = true;
        this.readOnlyFlag = false;
        this.txnId = null;
        this.adjustTxnId = null;
        if (this.closedFlag) {
            this.clearFlag = false;
            this.saveFlag = true;
        } else {
            this.clearFlag = true;
            this.saveFlag = false;
        }
    }
    /**
     *  This function will be executed when we change the Offender in search block
    */
    subAccBalChangeEvent(event) {
        if (event) {
            if (this.closedFlag) {
                this.type = 'warn';
                this.message = this.translateService.translate('otdclose.thisaccountcloseddot');
                this.show();
            } else if (this.chkAccuntClosedFlag) {
                this.type = 'warn';
                this.message = this.translateService.translate('otdclose.thisaccountcannotbeclosed');
                this.show();
            } else if (this.chkSubAcnt) {
                this.type = 'warn';
                this.message = this.translateService.translate('otdclose.oneormoresubaccounts');
                this.message = String(this.message).replace('%accountName%', this.accountNameValid);
                this.show();
            } else if (this.freezDisburseFlag) {
                this.type = 'warn';
                this.message = this.translateService.translate('otdclose.transactioncannotproceed');
                this.show();
            }
            this.offenderId = this.vHeaderBlockModel.rootOffenderId;
            this.offtxnModel = new OffenderTransactions();
            const subaccResult = this.otdcloseFactory.
                getRegBal(this.offenderId, this.sessionManager.currentCaseLoad);
            subaccResult.subscribe(result => {
                if (result) {
                    this.offtxnModel.currentBalance = result.toFixed(2);
                    this.nbtAmountOnlyFlag = false;
                } else {
                    this.offtxnModel.currentBalance = result.toFixed(2);
                    this.offtxnModel.txnEntryAmount = result.toFixed(2);
                    this.nbtAmountOnlyFlag = true;
                }
            });
            if (this.checkPayeeBlur) {
                this.offtxnModel.payeeCode = 'IND';
                this.offtxnModel.payeeNameText = this.vHeaderBlockModel.firstName + ' ' + this.vHeaderBlockModel.lastName;
            }
            if (event.code) {
                this.offtxnModel.payeeCode = event.code;
            }
            if ((event && event.code === 'IND')) {
                this.offtxnModel.payeeNameText = this.vHeaderBlockModel.firstName + ' ' + this.vHeaderBlockModel.lastName;
            } else {
                this.offtxnModel.payeeNameText = undefined;
            }
            if (event && (event.code === 'COR' || event.code === 'PER')) {
                if (event.code === 'COR') {
                    this.corporateReadOnly = false;
                    this.corpOnlyFlag = false;
                    this.perOnlyFlag = true;
                    this.personReadOnly = true;
                } else {
                    this.perOnlyFlag = false;
                    this.personReadOnly = false;
                    this.corporateReadOnly = true;
                    this.corpOnlyFlag = true;
                }
                this.payeeReadOnly = false;
            } else {
                this.corporateReadOnly = true;
                this.corpOnlyFlag = true;
                this.perOnlyFlag = true;
                this.personReadOnly = true;
                this.payeeReadOnly = true;
            }
        }
    }
    cashBlur(txnEntryAmount) {
        this.amountFormat.precisionFlot(txnEntryAmount);
        if (txnEntryAmount || txnEntryAmount === 0) {
           if (String(Number(this.offtxnModel.txnEntryAmount).toString()).length > 13) {
                this.type = 'warn';
                this.message = this.translateService.translate('otdcntac.mustbeinrange');
                this.show();
            }
        }
    }
    cashKeyDown(event) {
        if (!this.amountFormat.avoidKeys(event, this.offtxnModel.txnEntryAmount)) {
            event.stopPropagation();
            return false;
      }
    }
    checkBlur(txnEntryAmountTwo) {
        this.amountFormat.precisionFlot(txnEntryAmountTwo);
        if (txnEntryAmountTwo || txnEntryAmountTwo === 0) {
            if (String(Number(this.offtxnModel.txnEntryAmount).toString()).length > 13) {
                this.type = 'warn';
                this.message = this.translateService.translate('otdcntac.mustbeinrange');
                this.show();
            }
        }
    }
    checkKeyDown(event) {
        if (!this.amountFormat.avoidKeys(event, this.offtxnModel.nbtTxnEntryAmount2)) {
            event.stopPropagation();
            return false;
      }
    }
    checkPayee() {
        if (this.checkPayeeBlur) {
            this.offtxnModel.payeeCode = 'IND';
            this.subAccBalChangeEvent(event);
            this.checkPayeeBlur = false;
        }
    }
    /**
   * To display the messages
   */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];

    }
    offsubaExecuteQuery() {
        const offsubaResult = this.otdcloseFactory.
            offSubaExecuteQuery(this.offsubaModel);
        offsubaResult.subscribe(offsubaResultList => {
            if (offsubaResultList.length === 0) {
                this.offsubaData = [];
            } else {
                this.offsubaData = offsubaResultList;
                this.offsubaModel = offsubaResultList[0];
            }
        });
    }
    /**
	 *  This function will be executed when commit event is
	* fired
	*/
    offtxnExecuteQuery() {
        const offtxnResult = this.otdcloseFactory.
            offTxnExecuteQuery(this.offtxnModel);
        offtxnResult.subscribe(offtxnResultList => {
            if (offtxnResultList.length === 0) {
                this.offtxnData = [];
            } else {
                this.offtxnData = offtxnResultList;
                this.offtxnModel = offtxnResultList[0];
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    otdcloseSaveofftxnForm() {
        this.offtxnInsertList = [];
        this.offtxnUpdateList = [];
        this.offtxnDeleteList = [];
        this.offtxnCommitModel.insertList = [];
        this.offtxnCommitModel.updateList = [];
        this.offtxnCommitModel.deleteList = [];
        if (this.closedFlag) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdclose.thisaccountclosed');
            this.show();
            return;
        } else if (this.chkAccuntClosedFlag) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdclose.thisaccountcannotbeclosed');
            this.show();
            return;
        } else if (this.chkSubAcnt) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdclose.oneormoresubaccounts');
            this.message = String(this.message).replace('%accountName%', this.accountNameValid);
            this.show();
            return;
        }
        this.offtxnModel.nbtModifyUserId = 'Y';
        if (!this.offtxnModel.payeePersonId && !this.offtxnModel.payeeCorporateId && !this.offtxnModel.payeeNameText) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdclose.payeeinformation');
            this.show();
            return;
        }
        this.offtxnModel.caseloadId = this.vHeaderBlockModel.caseLoadId;
        this.offtxnModel.caseloadType = this.sessionManager.currentCaseLoadType;
        this.offtxnModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
        this.offtxnModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.offtxnInsertList.push(this.offtxnModel);
        this.offtxnCommitModel.insertList = this.offtxnInsertList;
        const offtxnSaveData = this.otdcloseFactory.offTxnCommit(this.offtxnCommitModel);
        offtxnSaveData.subscribe(data => {
            if (data) {
                if (data.offenderBookId === 5) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.thisaccountclosed');
                    this.show();
                    return;
                } else if (data.offenderBookId === 2) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.oneormoresubaccounts');
                    this.message = String(this.message).replace('%accountName%', this.accountNameValid);
                    this.show();
                    return;
                } else if (data.offenderBookId === 29) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.cannotleavebothcashcheck');
                    this.show();
                    return;
                } else if (data.offenderBookId === 30) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.sumofthecashcheck');
                    this.show();
                    return;
                } else if (data.offenderBookId === 3) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.transactionoftypecash');
                    this.show();
                    return;
                } else if (data.offenderBookId === 4) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.transactionoftypecheck');
                    this.show();
                    return;
                } else if (data.offenderBookId === 6) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.sumofcashcheck');
                    this.show();
                    return;
                } else if (data.offenderBookId === 7) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.cannotcloseaccount');
                    this.show();
                    return;
                } else if (data.offenderBookId === 8) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.offendersforeigncurrency');
                    this.show();
                    return;
                } else if (data.offenderBookId === 9) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.trustaccounthasanoutstanding');
                    this.show();
                    return;
                } else if (data.offenderBookId === 10) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.erroradr');
                    this.show();
                    return;
                } else if (data.offenderBookId === 11) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.errorbcr');
                    this.show();
                    return;
                } else if (data.offenderBookId === 12) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.errorcdr');
                    this.show();
                    return;
                } else if (data.offenderBookId === 13) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.errordzero');
                    this.show();
                    return;
                } else if (data.offenderBookId === 14) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.erroredr');
                    this.show();
                    return;
                } else if (data.offenderBookId === 15) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.errorfnew');
                    this.show();
                    return;
                } else if (data.offenderBookId === 16) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.errorgzeroamount');
                    this.show();
                    return;
                } else if (data.offenderBookId === 17) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.payeecodecannot');
                    this.show();
                    return;
                } else if (data.offenderBookId === 18) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.errorhofftxn');
                    this.show();
                    return;
                } else if (data.offenderBookId === 19) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.errorinew');
                    this.show();
                    return;
                } else if (data.offenderBookId === 20) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.errorjofftxn');
                    this.show();
                    return;
                } else if (data.offenderBookId === 21) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.errorknew');
                    this.show();
                    return;
                } else if (data.offenderBookId === 22) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.errorlchequedata');
                    this.show();
                    return;
                } else if (data.offenderBookId === 23) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.errormofftxn');
                    this.show();
                    return;
                } else if (data.offenderBookId === 24) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.errornnew');
                    this.show();
                    return;
                } else if (data.offenderBookId === 25) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.erroroofftxn');
                    this.show();
                    return;
                } else if (data.offenderBookId === 26) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.errorpnew');
                    this.show();
                    return;
                } else if (data.offenderBookId === 27) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.errorqzeroamount');
                    this.show();
                    return;
                } else if (data.offenderBookId === 28) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.errorrmaxtxnid');
                    this.show();
                    return;
                } else if (data.offenderBookId === 31) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdclose.errinsrtofftxn');
                    this.show();
                    return;
                } else if (data.offenderBookId === 1) {
                    if (data.txnId) {
                        this.txnId = data.txnId;
                    }
                    if (data.adjustTxnId) {
                        this.adjustTxnId = data.adjustTxnId;
                    }
                    this.offtxnModel = new OffenderTransactions();
                    this.corporateReadOnly = true;
                    this.corpOnlyFlag = true;
                    this.personReadOnly = true;
                    this.perOnlyFlag = true;
                    this.nbtAmountOnlyFlag = true;
                    this.checkPayeeBlur = false;
                    this.payeeReadOnly = true;
                    this.readOnlyFlag = true;
                    this.clearFlag = false;
                    this.saveFlag = true;
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    return;
                }
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                return;
            }
        });
    }
    syspflExecuteQuery() {
        const syspflResult = this.otdcloseFactory.
            sysPflExecuteQuery(this.syspflModel);
        syspflResult.subscribe(syspflResultList => {
            if (syspflResultList.length === 0) {
                this.syspflData = [];
            } else {
                this.syspflData = syspflResultList;
                this.syspflModel = syspflResultList[0];
            }
        });
    }
    afterPerDlgClosed(event) {
        if (event.personId) {
            this.offtxnModel.payeePersonId = event.personId;
            this.offtxnModel.payeeName = event.lastName + ' ' + event.firstName;
            this.perOnlyFlag = true;
        } else {
            this.offtxnModel.payeePersonId = undefined;
            this.offtxnModel.payeeName = undefined;
        }
    }
    afterCorpDlgClosed(event) {
        if (event.corporateId) {
            this.offtxnModel.payeeCorporateId = event.corporateId;
            this.offtxnModel.payeeCorporateName = event.corpName;
            this.corpOnlyFlag = true;
        } else {
            this.offtxnModel.payeeCorporateId = undefined;
            this.offtxnModel.payeeCorporateName = undefined;
        }
    }
    birthDateKeyListvalTrigger() {
    }
    isInsertable() {
        if (this.offtxnModel.currentBalance || this.offtxnModel.payeeCode || this.offtxnModel.payeePersonId
            || this.offtxnModel.payeeName || this.offtxnModel.payeeCorporateId || this.offtxnModel.txnEntryAmount
            || this.offtxnModel.nbtTxnEntryAmount2) {
            this.clearFlag = false;
        } else {
            this.clearFlag = true;
        }
    }
}
