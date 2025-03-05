import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtdholdtService } from '@inmate/trust/trustaccounts/service/otdholdt.service';
import { OffenderTransactions } from '@inmatetrustaccountsbeans/OffenderTransactions';
import { OffenderTransactionsCommitBean } from '@inmatetrustaccountsbeans/OffenderTransactionsCommitBean';
import { SystemProfiles } from '@common/beans/SystemProfiles';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { Offenders } from '@commonbeans/Offenders';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';
import { TextboxComponent } from '@ui-components/textbox/textbox.component';

@Component({
    selector: 'app-otdholdt',
    templateUrl: './otdholdt.component.html'
})

export class OtdholdtComponent implements OnInit {
    @ViewChild('amount') amount: TextboxComponent;
    isMsgShwn = false;
    isHeadAvail = false;
    isFirstSelected = true;
    nbtTxnEntryAmount2: string;
    isSaveProcess: boolean;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offtxnData: OffenderTransactions[] = [];
    offtxnDataTemp: OffenderTransactions[] = [];
    offtxnModel: OffenderTransactions = new OffenderTransactions();
    offtxnIndex = 0;
    offtxnInsertList: OffenderTransactions[] = [];
    offtxnUpdateList: OffenderTransactions[] = [];
    offtxnDeleteList: OffenderTransactions[] = [];
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex = 0;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    offTxnReadOnly = false;
    sysPflReadOnly = false;
    cgfkOfftxnsubaccounttypeRg: any[] = [];
    offtxnCommitModel: OffenderTransactionsCommitBean = new OffenderTransactionsCommitBean();
    subaccountTitles = { code: 'Sub Account', description: 'Description' };
    vHeaderBlockModel: VTrustHeader = new VTrustHeader();
    offenderObj: Offenders = new Offenders();
    vHeaderBlockOffender: VHeaderBlock = new VHeaderBlock();
    subaccountLink: any;
    caseLoadId: any;
    nbtExistingHoldAmount: any;
    clearFlag: boolean;
    holdAmount: any;
    entryAmount: any;
    entryAmountSplit: any;
    amountFlag: boolean;
    constructor(private otdholdtFactory: OtdholdtService, public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService, private sessionManager: UserSessionManager,
        private amountFormat: AmountFormatUtil) {
    }
    ngOnInit() {
        this.disabled = true;
        this.amountFlag = true;
        this.display = true;
        this.clearFlag = true;
        this.vHeaderBlockModel = new VTrustHeader();
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.subaccountLink = `otdholdt/cgfkOffTxnSubAccountTypeRecordGroup?caseLoadId=${this.caseLoadId}`;
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.show(this.translateService.translate('common.pleasesearchforvalidoffender'), 'warn');
        } else {
            this.isHeadAvail = true;
        }
    }
    allowNumbers(event) {
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
        if (offender && offender.rootOffenderId) {
            this.vHeaderBlockModel = offender;
             this.nbtExistingHoldAmount = undefined;
             this.holdAmount = undefined;
             this.offtxnModel = new OffenderTransactions();
             this.nbtTxnEntryAmount2 = null;
            this.offenderObj.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
            this.offenderObj.offenderId = this.vHeaderBlockModel.offenderId;
            this.offenderObj.caseloadType = this.caseLoadId;
            // this.offtxnExecuteQuery(offender);
            this.clearFlag = false;
            this.display = false;
            this.disabled = false;
            this.amountFlag = false;
        } else {
            if (!offender) {
            this.vHeaderBlockModel = new VTrustHeader();
            }
            this.nbtExistingHoldAmount = undefined;
            this.holdAmount = undefined;
            this.offtxnModel = new OffenderTransactions();
            this.nbtTxnEntryAmount2 = null;
            this.clearFlag = true;
            this.display = true;
            this.disabled = true;
            this.amountFlag = true;
        }
    }

    otdholdtWhenClearBlockTrigger() {
         if (this.offtxnModel.txnEntryDesc ) {
            this.holdAmount = 0;
            this.nbtExistingHoldAmount = null;
             this.offtxnModel = new OffenderTransactions();
            } else {
             this.offtxnModel = new OffenderTransactions();
             this.nbtTxnEntryAmount2 = null;
            }
           this.display = true;
           this.disabled = false;
           this.isSaveProcess = false;
    }
    onGridReady(event) {
    }
    onClickEvent(event) {
          if (!this.vHeaderBlockModel && !this.vHeaderBlockModel.offenderBookId) {
            return;
        }
        if (this.offtxnModel.txnEntryAmount) {
            this.checkEntryAmount();
        }
        if (!this.offtxnModel.subAccountType) {
            this.show(this.translateService.translate('otdholdt.subaccounttypemustbeentered'), 'warn');
            return false;
        }
        }

    keyPressTimes() {
    }
    show(vldmsg, type) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    checkEntryAmount() {
         if (this.offtxnModel.txnEntryAmount) {
            if (String(this.offtxnModel.txnEntryAmount).indexOf('.') < 0) {
                this.entryAmount = this.offtxnModel.txnEntryAmount  + '.00';
                this.offtxnModel.txnEntryAmount = this.entryAmount;
            } else if (this.offtxnModel.txnEntryAmount > 0 && this.offtxnModel.txnEntryAmount < 1 ) {
               const amount = String(this.offtxnModel.txnEntryAmount).split('.');
               if ( amount[1].length < 2) {
                this.entryAmount = '.' + amount[1] + '0';
               } else {
                this.entryAmount = '.' + amount[1];
               }
                this.offtxnModel.txnEntryAmount = this.entryAmount;
            } else {
                const amountSplit = String(this.offtxnModel.txnEntryAmount).split('.');
                if (amountSplit[1].length < 2) {
                    this.entryAmount =  this.offtxnModel.txnEntryAmount + '0';
                    this.offtxnModel.txnEntryAmount =  this.entryAmount;
                }
        }
        }
        if (this.offtxnModel.txnEntryAmount && this.offtxnModel.txnEntryAmount < 0) {
            this.show(this.translateService.translate('otdholdt.invalidamount'), 'warn');
            return false;
        } else if (this.offtxnModel.txnEntryAmount && (this.offtxnModel.txnEntryAmount > this.offtxnModel.nbtTxnEntryAmount2)) {
            this.show(this.translateService.translate('otdholdt.holdamountcannot'), 'warn');
            return false;
        }
        this.disabled = false;
    }
    isInsertable() {
        if (!this.vHeaderBlockModel && !this.vHeaderBlockModel.offenderBookId) {
            return;
        }
        if (!this.offtxnModel.txnEntryDesc && !this.nbtExistingHoldAmount) {
            if (this.holdAmount) {
                this.nbtExistingHoldAmount = Number(this.holdAmount).toFixed(2);
            } else {
                this.nbtExistingHoldAmount = '.00';
            }
        }
        if (this.offtxnModel.txnEntryAmount) {
            this.checkEntryAmount();
        }
    }
    holdDateValidation(event) {
        if (event) {
            if (this.offtxnModel.txnEntryAmount) {
                this.checkEntryAmount();
            }
         if (DateFormat.compareDate(DateFormat.getDate(event), DateFormat.getDate()) <= 0) {
                        this.show(this.translateService.translate('otdholdt.holduntildatemustbegreater'), 'warn');
                        return false;
                    }
            }
        }
    subAccountTypeWhenValidateItemTrigger(event?) {
        if (this.isHeadAvail && event && event.code) {
            setTimeout(ele => {
                this.isHeadAvail = false;
            }, 1000);
            setTimeout(ele => {
                this.offtxnModel.subAccountType = null;
            }, 1);

            return;
        }
        if (this.isFirstSelected && event && event.code && !(this.vHeaderBlockModel && this.vHeaderBlockModel.rootOffenderId)) {
            this.isFirstSelected = false;
            this.offtxnModel.subAccountType = null;
            return;
        }
        if (this.offtxnModel.subAccountType && this.vHeaderBlockModel && this.vHeaderBlockModel.rootOffenderId) {
            this.offenderObj.addInfoCode = this.offtxnModel.subAccountType;
            this.offtxnExecuteQuery(null);
            this.getSubAccBal();
            this.offtxnModel.txnEntryDesc = 'HOLD';
        } else {
            this.nbtExistingHoldAmount = null;
            this.offtxnModel.nbtTxnEntryAmount2 = null;
            this.nbtTxnEntryAmount2 = null;
            setTimeout(ele => {
                this.offtxnModel.subAccountType = null;
            }, 100);
        }
    }
    amountValidate(event) {
        if (event ) {
        if (!this.offtxnModel.subAccountType) {
             this.offtxnModel.txnEntryAmount = undefined;
             this.show(this.translateService.translate('otdholdt.subaccounttypemustbeentered'), 'warn');
             return false;
            }
            }
        }
        getSubAccBal() {
            const offtxnSubResult = this.otdholdtFactory.getSubAccountBalance(this.offenderObj);
            offtxnSubResult.subscribe(data => {
                if (data != null && data > 0) {
                    this.offtxnModel.nbtTxnEntryAmount2 = data;
                    this.nbtTxnEntryAmount2 = Number(data).toFixed(2);
                } else {
                    if (!this.offtxnModel.txnId) {
                        this.show(this.translateService.translate('otdholdt.thereisnobalance'), 'warn');
                        if (this.amount) {
                            this.amount.value = '0.00';
                        }
                        this.offtxnModel.subAccountType = '';
                    } else {
                        this.nbtTxnEntryAmount2 = '0.00';
                    }
                    return false;

                }
            });
        }
        amountKeyDown(event, comp) {
           if (!this.amountFormat.avoidKeys(event, this.offtxnModel.txnEntryAmount)) {
            event.stopPropagation();
            return false;
           }
        }

        onAmountBlur(amount) {
            this.amountFormat.precisionFlot(amount);
            if (String(this.offtxnModel.txnEntryAmount) === '0' || String(this.offtxnModel.txnEntryAmount) === '0.00') {
            } else if (!this.offtxnModel.txnEntryAmount) {
                this.show(this.translateService.translate('otdholdt.amounthastobeentered'), 'warn');
                this.isMsgShwn = true;
            } else if (isNaN(Number(this.offtxnModel.txnEntryAmount))) {
                this.show(this.translateService.translate('otdholdt.invalidamount'), 'warn');
                this.isMsgShwn = true;
            } else if (this.offtxnModel.txnEntryAmount && (this.offtxnModel.txnEntryAmount > this.offtxnModel.nbtTxnEntryAmount2)) {
                this.show(this.translateService.translate('otdholdt.holdamountcannot'), 'warn');
                this.isMsgShwn = true;
            }

            if (this.isMsgShwn) {
                setTimeout(ele => {
                    this.isMsgShwn = false;
                }, 3000);
                return false;
            }
            this.isMsgShwn = false;
            return true;
        }

    offtxnExecuteQuery(event) {
        const offtxnResult = this.otdholdtFactory.offTxnExecuteQuery(this.offenderObj);
        offtxnResult.subscribe(data => {
                this.offtxnExistingHoldAmountQuery();
        });
    }

    offtxnExistingHoldAmountQuery() {
        const offtxnResult = this.otdholdtFactory.getExistingHoldAmount(this.offenderObj);
        offtxnResult.subscribe(data => {
            if (typeof data === 'number' && data || data === 0) {
                this.holdAmount = data;
                if (this.holdAmount || this.holdAmount === 0) {
                    this.nbtExistingHoldAmount = Number(this.holdAmount).toFixed(2);
                } else {
                    if (this.offtxnModel.subAccountType) {
                    this.nbtExistingHoldAmount = '0.00';
                    }
                }
            } else {
                this.holdAmount = 0;
                this.nbtExistingHoldAmount = '0.00';
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    otdholdtSaveoffTxnForm() {
        if (this.isMsgShwn) {
            return false;
        }
        this.isSaveProcess = true;
        this.offtxnInsertList = [];
        this.offtxnUpdateList = [];
        this.offtxnDeleteList = [];
        this.offtxnCommitModel.insertList = [];
        this.offtxnCommitModel.updateList = [];
        this.offtxnCommitModel.deleteList = [];

        if (this.offtxnModel.holdUntilDate) {
            if (DateFormat.compareDate(DateFormat.getDate(this.offtxnModel.holdUntilDate), DateFormat.getDate()) <= 0) {
                this.show(this.translateService.translate('otdholdt.holduntildatemustbegreater'), 'warn');
                this.isSaveProcess = false;
                return false;
            }
        }

           if (!this.offtxnModel.subAccountType || !this.offtxnModel.txnEntryAmount || this.offtxnModel.txnEntryAmount <= 0) {
                 this.show(this.translateService.translate('otdholdt.mandatoryfields'), 'warn');
                 this.isSaveProcess = false;
                  return false;
               }
        if (!this.offtxnModel.subAccountType) {
            this.show(this.translateService.translate('otdholdt.subaccounttypemustbeentered'), 'warn');
            return false;
        }
        if (!this.offtxnModel.txnEntryDesc) {
            this.show(this.translateService.translate('otdholdt.description'), 'warn');
            this.isSaveProcess = false;
            return false;
        }
        if (!this.offtxnModel.nbtTxnEntryAmount2) {
            this.show(this.translateService.translate('otdholdt.thereisnobalance'), 'warn');
            this.isSaveProcess = false;
            return false;
        }

        if (this.offtxnModel.subAccountType && !this.offtxnModel.txnEntryAmount) {
            this.show(this.translateService.translate('otdholdt.amounthastobeentered'), 'warn');
            this.isSaveProcess = false;
            return false;
        } else if (!this.offtxnModel.subAccountType) {
            this.show(this.translateService.translate('otdholdt.subaccounttypemustbeentered'), 'warn');
            this.isSaveProcess = false;
            return false;
        }
          if (this.offtxnModel.txnEntryAmount) {
            if (!isNaN(Number(this.offtxnModel.txnEntryAmount)) && this.offtxnModel.txnEntryAmount < 0) {
                this.show(this.translateService.translate('otdholdt.invalidamount'), 'warn');
                this.isSaveProcess = false;
                return false;
            } else if (this.offtxnModel.txnEntryAmount && (this.offtxnModel.txnEntryAmount > this.offtxnModel.nbtTxnEntryAmount2)) {
                this.show(this.translateService.translate('otdholdt.holdamountcannot'), 'warn');
                this.isSaveProcess = false;
                return false;
            }
            this.amountFlag = false;
    }

        this.offtxnModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
        this.offtxnModel.caseloadId = this.caseLoadId;
        this.offtxnInsertList.push(this.offtxnModel);
        this.offtxnCommitModel.insertList = this.offtxnInsertList;
        const offtxnSaveData = this.otdholdtFactory.offTxnCommit(this.offtxnCommitModel);
        offtxnSaveData.subscribe(data => {
            if (data && data.returnVal === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.offtxnModel.txnId = data.txnId;
                this.offtxnModel.holdNumber = data.holdNumber;
                this.offtxnExecuteQuery(null);
                this.getSubAccBal();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
            }
        });
    }
    syspflExecuteQuery() {
        const syspflResult = this.otdholdtFactory.sysPflExecuteQuery(this.syspflModel);
        syspflResult.subscribe(syspflResultList => {
            if (syspflResultList.length === 0) {
                this.syspflData = [];
            } else {
                this.syspflData = syspflResultList;
                this.syspflModel = syspflResultList[0];
            }
        });
    }

    onSubAccountTypeBlur() {
        if (!this.offtxnModel.subAccountType) {
            this.offtxnModel.subAccountType = this.offtxnModel.subAccountType === '' ? undefined : '';
        }
    }

    get isOffenderAvaliable(): Boolean {
        if (this.vHeaderBlockModel && this.vHeaderBlockModel.rootOffenderId) {
        return false;
        }
        return true;
    }

get isClearEnable(): Boolean {
        if (this.offtxnModel.txnReferenceNumber || this.offtxnModel.holdUntilDate ||
            this.offtxnModel.txnEntryAmount || this.offtxnModel.subAccountType || this.offtxnModel.txnEntryDesc) {
            return false;
        }
        return true;
    }
}
