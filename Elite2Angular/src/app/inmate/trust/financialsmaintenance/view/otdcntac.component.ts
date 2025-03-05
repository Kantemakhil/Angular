import {
    Component,
    OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtdcntacService } from '../service/otdcntac.service';
import { OffenderTransactions } from '@inmate/trust/trustaccounts/beans/OffenderTransactions';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { OffenderTransactionsCommitBean } from '@inmate/trust/trustaccounts/beans/OffenderTransactionsCommitBean';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';

@Component({
    selector: 'app-otdcntac',
    templateUrl: './otdcntac.component.html'
})

export class OtdcntacComponent implements OnInit {
    offtxnCommitModel: OffenderTransactionsCommitBean = new OffenderTransactionsCommitBean();
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offtxnData: OffenderTransactions[] = [];
    offtxnDataTemp: OffenderTransactions[] = [];
    offtxnModel: OffenderTransactions = new OffenderTransactions();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
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
    offTxnReadOnly: boolean;
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
    sysPflReadOnly = false;
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    savedisabled: boolean;
    clearDisable: boolean;
    offenderIdDisplay: any;
    validCheck: boolean;
    insertAllowed: boolean;
    validateItem: boolean;
    constructor(private otdcntacFactory: OtdcntacService,
        public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService,
        private sessionManager: UserSessionManager,
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
        this.offTxnReadOnly = true;
        this.savedisabled = true;
        this.clearDisable = true;
        this.vHeaderBlockModel = new VHeaderBlock();
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        if (!this.vHeaderBlockModel) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }
    }
    onOffenderChange(offender) {
        this.offtxnData = [];
        this.offtxnModel = new OffenderTransactions();
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.validationCheck();
        } else {
            this.offenderIdDisplay = null;
            this.offtxnModel.txnEntryAmount = null;
            this.savedisabled = true;
            this.clearDisable = true;
            this.offTxnReadOnly = true;
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
    validationCheck() {
        this.offtxnModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
        this.offtxnModel.caseloadId = this.sessionManager.currentCaseLoad;
        this.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
        const offtxnResult = this.otdcntacFactory.checkAccountSatus(this.offtxnModel);
        offtxnResult.subscribe(offtxnResultList => {
            if (offtxnResultList !== 'X') {
                this.validCheck = true;
                this.offTxnReadOnly = true;
                this.savedisabled = true;
            } else {
                this.savedisabled = false;
                this.validCheck = false;
                this.offTxnReadOnly = false;
            }
        });
        const offGetPrieviligesResult = this.otdcntacFactory.getGroupPrivilege();
        offGetPrieviligesResult.subscribe(getPrieviligesResultList => {
            if (getPrieviligesResultList === 'A') {
                this.insertAllowed = true;
            } else {
                this.insertAllowed = false;
            }
        });
    }
    ok() {
    }
    no() {
    }
    validMsg(amount) {
        if (this.validCheck) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdcntac.accountin');
            this.message = String(this.message).replace('%offdisid%', this.offenderIdDisplay);
            this.message = String(this.message).replace('%csldid%', this.offtxnModel.caseloadId);
            this.show();
            this.vHeaderBlockModel = new VHeaderBlock();
            this.offenderSearchService.selectedOffender = null;
            this.validCheck = false;
            return;
        } else {
            if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && !amount.value) {
                amount.value = 0;
            }
            this.amountFormat.precisionFlot(amount);
        }
    }
    cancel() {
        this.clearDisable = true;
        this.offenderIdDisplay = null;
        this.offtxnModel.txnEntryAmount = null;
    }
    onAmountBlur(amount) {
        if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && !amount.value) {
            amount.value = 0;
        }
        this.amountFormat.precisionFlot(amount);
    }
    amountKeyDown(event, comp) {
        if (!this.amountFormat.avoidKeys(event, this.offtxnModel.txnEntryAmount)) {
              event.stopPropagation();
              return false;
        }
  }
    offtxnExecuteQuery() {
        const offtxnResult = this.otdcntacFactory.offTxnExecuteQuery(this.offtxnModel);
        offtxnResult.subscribe(offtxnResultList => {
            if (offtxnResultList.length === 0) {
                this.offtxnData = [];
            } else {
                this.offtxnData = offtxnResultList;
                this.savedisabled = false;
                this.clearDisable = true;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    onButSave() {
        this.offtxnInsertList = [];
        this.offtxnUpdateList = [];
        this.offtxnDeleteList = [];
        this.offtxnCommitModel.updateList = [];
        this.offtxnCommitModel.insertList = [];
        if (this.validateItem) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdcntac.mustbeinrangevalue');
            this.show();
            return;
        }
        if (!this.savedisabled) {
            if (this.offtxnModel && (!this.offtxnModel.txnEntryAmount && this.offtxnModel.txnEntryAmount !== 0)) {
                this.type = 'warn';
                this.message = this.translateService.translate('otdcntac.fieldmustentered');
                this.show();
                return;
            }
            if (this.offtxnModel.txnEntryAmount.toString().length > 13) {
                this.type = 'warn';
                this.message = this.translateService.translate('otdcntac.mustbeinrange');
                this.show();
                return;
            }
            if (this.vHeaderBlockModel && this.vHeaderBlockModel.rootOffenderId) {
                this.offtxnModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
            }
            if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId) {
                this.offtxnModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            }
            this.offtxnModel.caseloadId = this.sessionManager.currentCaseLoad;
            this.offtxnModel.txnPostingType = 'CR';
            this.offtxnModel.slipPrintedFlag = 'N';
            this.offtxnModel.receiptPrintedFlag = 'Y';
            this.offtxnModel.deductionFlag = 'Y';
            this.offtxnModel.txnAdjustedFlag = 'Y';
            this.offtxnModel.holdClearFlag = 'Y';
            this.offtxnModel.adjustTxnEntryId = 99;
            this.offtxnModel.txnEntryDate = DateFormat.getDate();
            this.offtxnModel.modifyDate = DateFormat.getDate();
            this.offtxnModel.createDateTime = DateFormat.getDate();
            this.offtxnModel.createUserId = this.sessionManager.getId();
            this.offtxnModel.modifyUserId = this.sessionManager.getId();
            this.offtxnInsertList.push(this.offtxnModel);
            this.offtxnCommitModel.insertList = this.offtxnInsertList;
            if (this.insertAllowed) {
                const offtxnSaveData = this.otdcntacFactory.offTxnCommit(this.offtxnCommitModel);
                offtxnSaveData.subscribe(offtxnSaveResult => {
                    if (offtxnSaveResult.sealFlag === '1') {
                        this.type = 'success';
                        this.message = this.translateService.translate('otdcntac.recordsaved');
                        this.message = String(this.message).replace('%txnId%', offtxnSaveResult.txnId);
                         this.offtxnModel.receiptNumber =   offtxnSaveResult.receiptNumber;  //  Modified By Yaseen
                         this.offtxnModel.txnId = offtxnSaveResult.txnId;                    // to Fetch Receipt Number & TXN_ID in HTML
                        this.show();
                        this.savedisabled = true;
                        this.clearDisable = true;
                        this.offTxnReadOnly = true;
                        setTimeout(ele => {
                            this.vHeaderBlockModel = new VHeaderBlock();
                            this.offenderSearchService.selectedOffender = null;
                        }, 5000);
                        return;
                    } else if (offtxnSaveResult.sealFlag === '2') {
                        this.type = 'warn';
                        this.message = this.translateService.translate('otdcntac.errorchkaccountstatus');
                        this.show();
                        return;
                    } else if (offtxnSaveResult.sealFlag === '3') {
                        this.type = 'warn';
                        this.message = this.translateService.translate('otdcntac.errortransactionoperations');
                        this.show();
                        return;
                    } else if (offtxnSaveResult.sealFlag === '4') {
                        this.type = 'warn';
                        this.message = this.translateService.translate('otdcntac.erroroffendersubaccount');
                        this.show();
                        return;
                    } else if (offtxnSaveResult.sealFlag === '5') {
                        this.type = 'warn';
                        this.message = this.translateService.translate('otdcntac.erroroffendertrustaccounts');
                        this.show();
                        return;
                    } else if (offtxnSaveResult.sealFlag === '6') {
                        this.type = 'warn';
                        this.message = this.translateService.translate('otdcntac.errorgltransactions');
                        this.show();
                        return;
                    } else if (offtxnSaveResult.sealFlag === '7') {
                        this.type = 'warn';
                        this.message = this.translateService.translate('otdcntac.errortransactionoperationtable');
                        this.show();
                        return;
                    } else if (offtxnSaveResult.sealFlag === '8') {
                        this.type = 'warn';
                        this.message = this.translateService.translate('otdcntac.error');
                        this.show();
                        return;
                    } else {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                        this.show();
                        return;
                    }
                });
            }
        }
    }
    syspflExecuteQuery() {
        const syspflResult = this.otdcntacFactory.
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
}
