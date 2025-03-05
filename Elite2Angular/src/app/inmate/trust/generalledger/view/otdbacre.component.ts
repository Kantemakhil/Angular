import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtdbacreService } from '@inmate/trust/generalledger/service/otdbacre.service';
import { BankReconAudits } from '@inmate/trust/generalledger/beans/BankReconAudits';
import { BankClearReconcilesTmp } from '@inmate/trust/generalledger/beans/BankClearReconcilesTmp';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { SystemProfilesCommitBean } from '@saadminbeans/SystemProfilesCommitBean';
import { GlTransactions } from '@inmatetrustaccountsbeans/GlTransactions';
import { GlTransactionsCommitBean } from '@inmatetrustaccountsbeans/GlTransactionsCommitBean';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OtmalproService } from '@inmate/trust/deductions/deductionsmaintenance/service/otmalpro.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';
import { DialogService } from '@ui-components/dialog/dialog.service';
//  import required bean declarations

@Component({
    selector: 'app-otdbacre',
    templateUrl: './otdbacre.component.html'
})

export class OtdbacreComponent implements OnInit {
    reconDisable = true;
    checkFlag: boolean;

    @ViewChild('grid', {static: true}) grid: any;
    options: any[] = [];
    bcrtmpCommitModel: any;
    //  Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    gltxnData: GlTransactions[] = [];
    gltxnDataTemp: GlTransactions[] = [];
    //  TODO angular.copy(this.gltxnData, thisgltxnDataTemp);
    gltxnModel: GlTransactions = new GlTransactions();
    gltxnIndex = 0;
    gltxnInsertList: GlTransactions[] = [];
    gltxnUpdateList: GlTransactions[] = [];
    gltxnDeleteList: GlTransactions[] = [];
    bankrcData: BankReconAudits[] = [];
    bankrcDataTemp: BankReconAudits[] = [];
    //  TODO angular.copy(this.bankrcData, thisbankrcDataTemp);
    bankrcModel: BankReconAudits = new BankReconAudits();
    bankrcIndex = 0;
    bankrcInsertList: BankReconAudits[] = [];
    bankrcUpdatetList: BankReconAudits[] = [];
    bankrcDeleteList: BankReconAudits[] = [];
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    //  TODO angular.copy(this.syspflData, thissyspflDataTemp);
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex = 0;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdateList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    bcrtmpData: BankClearReconcilesTmp[] = [];
    bcrtmpDataTemp: BankClearReconcilesTmp[] = [];
    //  TODO angular.copy(this.bcrtmpData, thisbcrtmpDataTemp);
    bcrtmpModel: BankClearReconcilesTmp = new BankClearReconcilesTmp();
    bcrtmpIndex = 0;
    bcrtmpInsertList: BankClearReconcilesTmp[] = [];
    bcrtmpUpdateList: BankClearReconcilesTmp[] = [];
    bcrtmpDeleteList: BankClearReconcilesTmp[] = [];
    gltxn1Data: GlTransactions[] = [];
    gltxn1DataTemp: GlTransactions[] = [];
    //  TODO angular.copy(this.gltxn1Data, thisgltxn1DataTemp);
    gltxn1Model: GlTransactions = new GlTransactions();
    gltxn1Index = 0;
    gltxn1InsertList: GlTransactions[] = [];
    gltxn1UpdateList: GlTransactions[] = [];
    gltxn1DeleteList: GlTransactions[] = [];
    gltxn2Data: GlTransactions[] = [];
    gltxn2DataTemp: GlTransactions[] = [];
    //  TODO angular.copy(this.gltxn2Data, thisgltxn2DataTemp);
    gltxn2Model: GlTransactions = new GlTransactions();
    gltxn2Index = 0;
    gltxn2InsertList: GlTransactions[] = [];
    gltxn2UpdateList: GlTransactions[] = [];
    gltxn2DeleteList: GlTransactions[] = [];
    gltxn3Data: GlTransactions[] = [];
    gltxn3DataTemp: GlTransactions[] = [];
    //  TODO angular.copy(this.gltxn3Data, thisgltxn3DataTemp);
    gltxn3Model: GlTransactions = new GlTransactions();
    gltxn3Index = 0;
    gltxn3InsertList: GlTransactions[] = [];
    gltxn3UpdateList: GlTransactions[] = [];
    gltxn3DeleteList: GlTransactions[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    bcrTmpColumnDef: any[];
    cgfkGltxnaccountcodeRg: any[] = [];
    gltxnCommitModel: GlTransactionsCommitBean = new GlTransactionsCommitBean();
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    syspflCommitModel: SystemProfilesCommitBean = new SystemProfilesCommitBean();
    accCodeLink: any;
    all: string;
    plusTxnEntryAmount: number;
    minusTxnEntryAmount: number;
    selected = -1;
    checkedNumber = 0;
    checkedAmount: any;
    clearDeposits = 0;
    clearDepositsAmnt: any;
    lTotalBalance: number;
    plusComment: string;
    minusComment: string;
    trustbalance: number;
    isSaveDisabled: boolean;

    accountCode: number;
    bankStatemntDate: number;
    amountBankBal: number;
    amntAdjustMinus: number;
    amntAdjustPlus: number;
    isRetrieveDis: boolean;
    isClearDis: boolean;
    trustFlgBal: boolean;
    reconciledstmntbalance: any;

    bankrcBean: BankReconAudits = new BankReconAudits();
    constructor(private otdbacreFactory: OtdbacreService,
        public translateService: TranslateService,
        public dialogService: DialogService,
        public sessionManager: UserSessionManager, private otmalproFactory: OtmalproService,
        private amountFormat: AmountFormatUtil) {
        //  TODO initilize data members here..!
        this.bcrTmpColumnDef = [];
        this.options = [{ text: this.translateService.translate('otdbacre.all'), id: 'ALL' },
        { text: translateService.translate('otdbacre.cleared'), id: 'CLR' },
        { text: this.translateService.translate('otdbacre.notcleared'), id: 'NOT_CLR' }];
    }


    ngOnInit() {
        this.isSaveDisabled = true;
        this.trustFlgBal = false;
        this.isClearDis = true;
        this.all = 'ALL';
        this.clearDepositsAmnt = '0.00';
        this.checkedAmount = '0.00';
        this.reconciledstmntbalance = '0.00';
        this.bcrtmpModel.trustbalance = '0.00';
        this.bcrtmpModel.differenceBal = '0.00';
        this.accCodeLink = 'otdbacre/cgfkGlTxnAccountCodeRecordGroup?caseloadId='
            + this.sessionManager.currentCaseLoad + '&' + 'caseloadType=' + this.sessionManager.currentCaseLoadType;
        this.bcrTmpColumnDef = [
            { fieldName: this.translateService.translate('common.type'), field: 'txnPostUsage', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('common.date'), field: 'txnEntryDate', editable: false, width: 150,
                datatype: 'date'
            },
            { fieldName: this.translateService.translate('common.type'), field: 'referenceNoType', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.reference'), field: 'referenceNo', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('otdbacre.descriptionpayeename'), field: 'description', editable: false,
                width: 200
            },
            {
                fieldName: this.translateService.translate('common.amount'), field: 'txnEntryAmount', editable: false, width: 150,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99,
                strictFP: true, whole: true
            },
            {
                fieldName: this.translateService.translate('otdbacre.cleardate'), field: 'nbtBankStatementDate',
                editable: false, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('common.clear'), field: 'cgNbtDescription',
                editable: true, width: 150, datatype: 'checkbox'
            },
        ];
    }
    radioChanged(event) {
        if (this.bcrtmpDataTemp.length === 0) {
          return;
        }
        if (this.grid.updatedMap.size > 0) {
        const labdata = {
            label: this.translateService.translate('common.doyouwanttosavechanges'), yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', labdata, 50).subscribe(result => {
            if (result) {
                this.onSave();
            } else {
                if (event.value !== 'CLR') {
                this.ok();
                } else {
                    this.bcrtmpData = [];
                }
            }
        });
    } else {
        this.reconciledstmntbalance  = this.bcrtmpDataTemp[0].reconciledstmntbalance;
        const detl = { numOfCheck: 0, totAmt: 0 };
        if (event) {
            const data = this.bcrtmpDataTemp.filter(ele => {
                if (event.value === 'CLR' || event.value === 'ALL') {
                    if (ele['cgNbtDescription']) {
                        detl.numOfCheck++;
                        detl.totAmt += ele.txnEntryAmount ? Number(ele.txnEntryAmount) : 0;
                        return true;
                    }
                } else if (event.value === 'NOT_CLR') {
                    return !ele['cgNbtDescription'];
                } else {
                    return true;

                }

            });
            if (event.value === 'ALL') {
            this.bcrtmpData = this.bcrtmpDataTemp;
            } else {
                this.bcrtmpData = data;
            }
             this.checkedNumber = detl.numOfCheck;
            this.checkedAmount = detl.totAmt.toFixed(2);
            this.changedEvent(this.reconciledstmntbalance);
            // if (this.gltxnModel.txnEntryAmount) {
            //     this.changedNumber(this.gltxnModel.txnEntryAmount);
            // }
            //  if (this.plusTxnEntryAmount) {
            //     this.changedPlus(this.plusTxnEntryAmount);
            // }
            //  if (this.minusTxnEntryAmount) {
            //     this.changedMinus(this.minusTxnEntryAmount);
            // }
        }
    }
    }
    onRowClickbcrtmp(event) {
        if (event) {
            this.reconDisable = false;
            this.bcrtmpModel = event;
            if (this.reconciledstmntbalance && this.bcrtmpModel.trustbalance) {
            const differBal = Number(this.reconciledstmntbalance) - Number(this.bcrtmpModel.trustbalance);
            this.bcrtmpModel.differenceBal = differBal.toFixed(2);
        }
         this.changedEvent(this.reconciledstmntbalance);
        } else {
            this.bcrtmpModel = new BankClearReconcilesTmp();
            this.reconciledstmntbalance = undefined;
            this.reconDisable = true;
        }


    }
    validateRowData = (event) => {
        const detl = { numOfCheck: 0, totAmt: 0, totalCheckno: 0 };
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        this.changedEvent('grid', event.data);
        // if (this.all !== 'NOT_CLR') {
            this.checkedCount();
        //  } else {
        //      this.checkedNumber = 0;
        //      this.checkedAmount = '0.00';
        //      this.clearDeposits = 0;
        //      this.clearDepositsAmnt = '0.00';
        //  }

        if (event.field === 'cgNbtDescription') {
            this.isSaveDisabled = false;
            if (event.data.cgNbtDescription) {
                this.grid.setColumnData('nbtBankStatementDate', index, this.gltxnModel.cgnbtBankStatementDate);
                const cgnbtBankStatementDate = this.gltxnModel.cgnbtBankStatementDate.getTime();
                const chkVoidCheque = this.otdbacreFactory.getchcqueFlag(event.data.txnId, event.data.txnEntrySeq,
                    event.data.glEntrySeq, cgnbtBankStatementDate);
                chkVoidCheque.subscribe(vVoidChek => {
                    if ((event.data.nbtBankStatementDate > this.gltxnModel.cgnbtBankStatementDate) && vVoidChek === 'N') {
                        this.show(this.translateService.translate('otdbacre.transactiondateisgreater'));
                        this.grid.setColumnData('nbtBankStatementDate', index, null);

                    }
                });
            } else {
                this.grid.setColumnData('nbtBankStatementDate', index, null);
            }
        }
        //     if (event.data.cgNbtDescription) {
        //         if (this.gltxnModel.cgnbtBankStatementDate >= event.data.nbtBankStatementDate) {
        //             if (event.data.cgNbtDescription) {
        //                 if (event.data.txnPostUsage === 'DR') {
        //                     this.lTotalBalance = Number(this.reconciledstmntbalance) - Number(event.data.txnEntryAmount);
        //                     this.reconciledstmntbalance = this.lTotalBalance.toFixed(2);
        //                     this.clearDeposits = this.clearDeposits + 1;
        //                     this.clearDepositsAmnt = Number(this.clearDepositsAmnt) + Number(event.data.txnEntryAmount);
        //                     const amount = this.clearDepositsAmnt.toFixed(2);
        //                     this.clearDepositsAmnt = amount;

        //                 } else {
        //                     this.lTotalBalance = Number(this.reconciledstmntbalance) + event.data.txnEntryAmount;
        //                     this.reconciledstmntbalance = this.lTotalBalance.toFixed(2);
        //                     this.checkedNumber = Number(this.checkedNumber) + Number('1.00');
        //                     this.checkedAmount = Number(this.checkedAmount) + Number(event.data.txnEntryAmount);
        //                     const amount = this.checkedAmount.toFixed(2);
        //                     this.checkedAmount = amount;
        //                 }

        //             } else {

        //             }
        //         }

        //     } else {

        //         this.grid.setColumnData('nbtBankStatementDate', index, null);
        //         if (event.data.txnPostUsage === 'DR') {
        //             this.lTotalBalance = Number(this.reconciledstmntbalance) + Number(event.data.txnEntryAmount);
        //             this.clearDeposits = this.clearDeposits - 1;
        //             this.clearDepositsAmnt = this.clearDepositsAmnt - Number(event.data.txnEntryAmount);
        //             const amount = this.clearDepositsAmnt.toFixed(2);
        //             this.clearDepositsAmnt = amount;
        //             this.reconciledstmntbalance = this.lTotalBalance.toFixed(2);
        //             const diffBalDr = Number(this.reconciledstmntbalance) - Number(this.bcrtmpModel.differenceBal);
        //             this.bcrtmpModel.differenceBal = diffBalDr.toFixed(2);

        //         } else {
        //             this.lTotalBalance = Number(this.reconciledstmntbalance) - Number(event.data.txnEntryAmount);
        //             // this.lTotalBalance = this.lTotalBalance - Number(event.data.txnEntryAmount);
        //             this.reconciledstmntbalance = this.lTotalBalance.toFixed(2);
        //             this.checkedNumber = Number(this.checkedNumber) - 1;
        //             this.checkedAmount = Number(this.checkedAmount) - Number(event.data.txnEntryAmount);
        //             const amount = this.checkedAmount.toFixed(2);
        //             this.checkedAmount = amount;
        //         }
        //     }
        //     const diffBal = Number(this.reconciledstmntbalance) - Number(this.bcrtmpModel.trustbalance);
        //     this.bcrtmpModel.differenceBal = diffBal.toFixed(2);

        // }
        rowdata.validated = true;
        return rowdata;
    }


    onRowClickbankrc(event) {
    }
    onReconcileButclick() {
        if (!this.gltxnModel.accountCode) {
            this.show(this.translateService.translate('otdbacre.accountcodemustbe'));
            return;

        }
        if (!this.gltxnModel.cgnbtBankStatementDate) {
            this.show(this.translateService.translate('otdbacre.bankstatementmustbe'));
            return;

        }
        if (!this.gltxnModel.txnEntryAmount) {
            this.show(this.translateService.translate('otdbacre.balancemustbe'));
            return;

        }
        if (this.bcrtmpModel.differenceBal === '0.00') {
            this.validate(this.gltxnModel.cgnbtBankStatementDate);
            const bankStDate = DateFormat.format(this.gltxnModel.cgnbtBankStatementDate);
            const maxdate = DateFormat.format(this.gltxnModel.lastReconciledDate);
            const maxDate = this.otdbacreFactory.compareEffectiveDate(bankStDate, maxdate);
            maxDate.subscribe(val => {
                if (val === -1) {
                    this.show(this.translateService.translate('otdbacre.errorcannot'));
                    return;
                }
                if (maxdate && val === 0) {
                    this.bankrcBean = new BankReconAudits();
                    this.bankrcBean.caseloadId = this.sessionManager.currentCaseLoad;
                    this.bankrcBean.accountCode = Number(this.gltxnModel.accountCode);
                    this.bankrcBean.bankStatementDate = DateFormat.getDate(this.gltxnModel.cgnbtBankStatementDate);
                    this.bankrcBean.amntLessAdj = Number(this.minusTxnEntryAmount);
                    if (this.plusTxnEntryAmount) {
                        this.bankrcBean.amntPlusAdj = Number(this.plusTxnEntryAmount);
                    }
                    this.bankrcBean.amntPlusComment = this.plusComment;
                    this.bankrcBean.amntLessComment = this.minusComment;
                    this.bankrcBean.bankBalance = Number(this.gltxnModel.txnEntryAmount);
                    // this.accountCode = Number(this.gltxnModel.accountCode);
                    // this.bankStatemntDate = this.gltxnModel.cgnbtBankStatementDate.getTime();
                    // this.amountBankBal = Number(this.gltxnModel.txnEntryAmount);
                    // this.amntAdjustMinus = Number(this.minusTxnEntryAmount);
                    // if (this.plusTxnEntryAmount === undefined || this.plusTxnEntryAmount === null) {
                    //     this.amntAdjustPlus = 0;
                    // }
                    // if (this.plusTxnEntryAmount) {
                    // this.amntAdjustPlus = Number(this.plusTxnEntryAmount);
                    // }
                    // if (this.plusComment === undefined) {
                    //     this.plusComment = null;

                    // }
                    // if (this.minusComment === undefined) {
                    //     this.minusComment = null;

                    // }
                    const update = this.otdbacreFactory.updateBankReconAudits(this.bankrcBean);
                        update.subscribe(data => {
                            if (data === 1) {
                                this.show(this.translateService.translate('otdbacre.bankreconciliationsuccessfull'), 'success');
                                this.bcrtmpData = [];
                                this.gltxnModel = new GlTransactions();
                                this.plusTxnEntryAmount = null;
                                this.minusTxnEntryAmount = null;
                                this.plusComment = null;
                                this.minusComment = null;
                                this.clearDeposits = null;
                                this.clearDepositsAmnt = null;
                                this.checkedNumber = null;
                                this.checkedAmount = null;
                                this.all = 'ALL';
                                this.bcrtmpDataTemp = [];
                                this.reconciledstmntbalance = 0.00;
                                this.isRetrieveDis = false;
                            }

                        });

                } else {
                    this.bankrcBean = new BankReconAudits();
                    this.bankrcBean.caseloadId = this.sessionManager.currentCaseLoad;
                    this.bankrcBean.accountCode = Number(this.gltxnModel.accountCode);
                    this.bankrcBean.bankStatementDate = DateFormat.getDate(this.gltxnModel.cgnbtBankStatementDate);
                    this.bankrcBean.amntLessAdj = Number(this.minusTxnEntryAmount);
                    if (this.plusTxnEntryAmount) {
                        this.bankrcBean.amntPlusAdj = Number(this.plusTxnEntryAmount);
                    }
                    this.bankrcBean.amntPlusComment = this.plusComment;
                    this.bankrcBean.amntLessComment = this.minusComment;
                    this.bankrcBean.bankBalance = Number(this.gltxnModel.txnEntryAmount);
                    const insertBankRecon = this.otdbacreFactory.insertBankReconAudits(this.bankrcBean);
                    insertBankRecon.subscribe(data => {
                        if (data) {
                            this.show(this.translateService.translate('otdbacre.bankreconciliationsuccessfull'), 'success');
                            this.bcrtmpData = [];
                            this.gltxnModel = new GlTransactions();
                            this.plusTxnEntryAmount = null;
                            this.minusTxnEntryAmount = null;
                            this.plusComment = null;
                            this.minusComment = null;
                            this.all = 'ALL';
                            this.bcrtmpDataTemp = [];
                            this.reconciledstmntbalance = 0.00;
                            this.isRetrieveDis = false;
                        }

                    });
                }

            });


        } else {
            this.show(this.translateService.translate('otdbacre.cannotcontinue'));
            return;
        }
    }
    ok() {
        if (!this.gltxnModel.accountCode) {
            this.show(this.translateService.translate('otdbacre.accountcodemustbe'));
            return;

        }
        if (!this.gltxnModel.cgnbtBankStatementDate) {
            this.show(this.translateService.translate('otdbacre.bankstatementmustbe'));
            return;

        }
        if (!this.gltxnModel.txnEntryAmount) {
            this.show(this.translateService.translate('otdbacre.balancefrombankstatementmustbe'));
            return;

        }
        if (this.gltxnModel.accountCode && this.gltxnModel.cgnbtBankStatementDate ) {
            this.bcrtmpExecuteQuery();

        }
    }
    bcrtmpExecuteQuery() {
        this.bcrtmpData = [];
        const detl = { numOfCheck: 0, totAmt: 0 };
        const detk = { numOfClearCheck: 0, cleartotAmt: 0 };
        this.bcrtmpModel.cgNbtAccountCode = 'ALL';
        this.bcrtmpModel.plusTxnEntryAmount = undefined;
        this.bcrtmpModel.minusTxnEntryAmount = undefined;
        this.bcrtmpModel.txnEntryAmount = undefined;
        // this.bcrtmpModel.plusTxnEntryAmount = this.plusTxnEntryAmount;
        // this.bcrtmpModel.minusTxnEntryAmount = this.minusTxnEntryAmount;
        // this.bcrtmpModel.txnEntryAmount = this.gltxnModel.txnEntryAmount;
        this.bcrtmpModel.accountCode = this.gltxnModel.accountCode;
        this.bcrtmpModel.caseloadId = this.sessionManager.currentCaseLoad;
        this.bcrtmpModel.cgnbtBankStatementDate = this.gltxnModel.cgnbtBankStatementDate;
        this.bcrtmpModel.lastReconciledDate = this.gltxnModel.lastReconciledDate;
        const bcrtmpResult = this.otdbacreFactory.
            bcrTmpExecuteQuery(this.bcrtmpModel);
        bcrtmpResult.subscribe(bcrtmpResultList => {
            if (bcrtmpResultList.length === 0) {
                this.bcrtmpData = [];
                this.bcrtmpModel = new BankClearReconcilesTmp();
                this.minusTxnEntryAmount = null;
                this.show(this.translateService.translate('common.querycaused'));
                this.trustFlgBal = false;
                this.isSaveDisabled = true;
                this.isClearDis = false;
                this.reconciledstmntbalance = 0.00;
            } else {
                setTimeout(ele => {
                    this.reconciledstmntbalance = bcrtmpResultList[0].reconciledstmntbalance;
                }, 50);
                bcrtmpResultList.forEach(elem => {
                    elem.checkFlag = elem.checkFlag === 'Y' ? true : false;
                    if (elem.cgNbtDescription === 'Y' && elem.txnPostUsage === 'CR') {
                        detl.numOfCheck++;
                        detl.totAmt += elem.txnEntryAmount ? Number(elem.txnEntryAmount) : 0;
                        elem.cgNbtDescription = true;
                    } else if (elem.cgNbtDescription === 'Y' && elem.txnPostUsage === 'DR') {
                        detk.numOfClearCheck++;
                        detk.cleartotAmt += elem.txnEntryAmount ? Number(elem.txnEntryAmount) : 0;
                        elem.cgNbtDescription = true;
                    } else {
                        elem.cgNbtDescription = false;
                    }


                    if (elem.reconciledstmntbalance) {
                        elem.reconciledstmntbalance = elem.reconciledstmntbalance.toFixed(2);
                    }
                    if (elem.trustbalance) {
                        elem.trustbalance = elem.trustbalance.toFixed(2);
                    }
                    if (elem.differenceBal) {
                        elem.differenceBal = elem.differenceBal.toFixed(2);
                    }
                    if (elem.differenceBal === 0) {
                        elem.differenceBal = elem.differenceBal.toFixed(2);
                    }

                });
                if (this.all === 'ALL') {
                    this.bcrtmpData = bcrtmpResultList;
                    this.isRetrieveDis = true;
                } else {
                const data = bcrtmpResultList.filter(ele => {
                    if (this.all === 'CLR') {
                        if (ele['cgNbtDescription']) {
                            return true;
                        }
                    } else if (this.all === 'NOT_CLR') {
                        return !ele['cgNbtDescription'];
                    } else {
                        return true;
                    }
                });
                this.bcrtmpData = data;
                if (this.bcrtmpData.length === 0) {
                    this.show(this.translateService.translate('common.querycaused'));
                    this.reconciledstmntbalance = 0.00;
                    this.isRetrieveDis = false;
                } else {
                    this.isRetrieveDis = true;
                }
            }
                this.bcrtmpDataTemp = JSON.parse(JSON.stringify(bcrtmpResultList));
                this.selected = 0;
                this.checkedNumber = detl.numOfCheck;
                this.checkedAmount = detl.totAmt.toFixed(2);
                this.clearDeposits = detk.numOfClearCheck;
                this.clearDepositsAmnt = detk.cleartotAmt.toFixed(2);
                this.isClearDis = false;
                this.trustFlgBal = true;
                this.isSaveDisabled = true;
                // this.changedEvent(this.reconciledstmntbalance);
            }
        });
    }
    changed(num) {
        this.amountFormat.precisionFlot(num);
        if (!this.isNull(this.gltxnModel.txnEntryAmount)) {
            num.value = Number(this.gltxnModel.txnEntryAmount).toFixed(2);
            this.gltxnModel.txnEntryAmount = num.value;
            if (!this.trustFlgBal) {
                this.bcrtmpModel.trustbalance = '0.00';
                if (!this.gltxnModel.lastReconciledDate) {
                    const bal = Number(this.gltxnModel.txnEntryAmount) + Number(this.bcrtmpModel.trustbalance);
                    this.reconciledstmntbalance = bal.toFixed(2);
                    this.bcrtmpModel.differenceBal = bal.toFixed(2);
                } else {
                    if (this.gltxnModel.accountCode && this.sessionManager.currentCaseLoad) { }
                    const trustBal = this.otdbacreFactory.getTrustBal(this.gltxnModel.accountCode, this.sessionManager.currentCaseLoad);
                    trustBal.subscribe(trustBalance => {
                        this.trustbalance = trustBalance;
                        this.bcrtmpModel.trustbalance = this.trustbalance.toFixed(2);
                        const bal = Number(this.gltxnModel.txnEntryAmount) - Number(this.bcrtmpModel.trustbalance);
                        this.reconciledstmntbalance = Number(this.gltxnModel.txnEntryAmount).toFixed(2);
                        this.bcrtmpModel.differenceBal = bal.toFixed(2);

                    });
                }
            }

            if (this.trustFlgBal) {
                const balBank = Number(this.gltxnModel.txnEntryAmount) + Number(this.reconciledstmntbalance);
                this.reconciledstmntbalance = balBank.toFixed(2);
                const differBal = Number(this.reconciledstmntbalance) - Number(this.bcrtmpModel.trustbalance);
                this.bcrtmpModel.differenceBal = differBal.toFixed(2);
            }
        } else {
            this.reconciledstmntbalance = '0.00';
            this.bcrtmpModel.trustbalance = '0.00';
            this.bcrtmpModel.differenceBal = '0.00';
        }

    }
    changedPlus(amountPlus) {
        this.amountFormat.precisionFlot(amountPlus);
        if (this.plusTxnEntryAmount) {
            amountPlus = Number(this.plusTxnEntryAmount).toFixed(2);
            this.plusTxnEntryAmount = amountPlus;
        }
        if (this.plusTxnEntryAmount) {
            const plusBal = Number(this.plusTxnEntryAmount) + Number(this.reconciledstmntbalance);
            this.reconciledstmntbalance = plusBal.toFixed(2);
            const differBal = Number(this.reconciledstmntbalance) - Number(this.bcrtmpModel.trustbalance);
            this.bcrtmpModel.differenceBal = differBal.toFixed(2);
        }

    }
    changedMinus(amount) {
        this.amountFormat.precisionFlot(amount);
        if (this.minusTxnEntryAmount) {
            amount = Number(this.minusTxnEntryAmount).toFixed(2);
            this.minusTxnEntryAmount = amount;
        }
        if (this.minusTxnEntryAmount && this.reconciledstmntbalance) {
            const minusBal = Number(this.reconciledstmntbalance) - Number(this.minusTxnEntryAmount);
            this.reconciledstmntbalance = minusBal.toFixed(2);
            const differBal = Number(this.reconciledstmntbalance) - Number(this.bcrtmpModel.trustbalance);
            this.bcrtmpModel.differenceBal = differBal.toFixed(2);
        }
        if (this.minusTxnEntryAmount === null) {
            if (this.gltxnModel.txnEntryAmount && this.plusTxnEntryAmount) {
                const tot = Number(this.gltxnModel.txnEntryAmount) + Number(this.plusTxnEntryAmount);
                this.reconciledstmntbalance = tot.toFixed(2);
                this.bcrtmpModel.trustbalance = '0.00';
                const differBal = Number(this.reconciledstmntbalance) - Number(this.bcrtmpModel.trustbalance);
                this.bcrtmpModel.differenceBal = differBal.toFixed(2);

            }

        }

    }
    cancel() {
        this.bcrtmpModel = new BankClearReconcilesTmp();
        this.gltxnModel = new GlTransactions();
        this.bcrtmpData = [];
        this.bcrtmpDataTemp = [];
        this.isRetrieveDis = false;
        this.isClearDis = true;
        this.checkedNumber = null;
        this.checkedAmount = null;
        this.clearDeposits = null;
        this.clearDepositsAmnt = null;
        this.minusComment = null;
        this.plusComment = null;
        this.minusTxnEntryAmount = null;
        this.plusTxnEntryAmount = null;
        this.trustFlgBal = false;
        this.reconciledstmntbalance = undefined;
    }
    accCodeChangeEvent(event) {
        if (event) {
            const getResult = this.otdbacreFactory.
                getPmaxDate(this.sessionManager.currentCaseLoad, event.code);
            getResult.subscribe(result => {
                if (result.bankStatementDate) {
                    this.gltxnModel.lastReconciledDate = DateFormat.getDate(result.bankStatementDate);

                } else {
                    this.gltxnModel.lastReconciledDate = undefined;
                }
            });
        }
    }
    isNull(value) {
        return value === null || value === undefined || value === '';
    }
    validate(event) {
        if (event) {
            const effDate = DateFormat.format(this.gltxnModel.cgnbtBankStatementDate);
            const maxDate = DateFormat.format(this.gltxnModel.lastReconciledDate);
            const comapreValue = this.otdbacreFactory.compareEffectiveDate(effDate, maxDate);
            comapreValue.subscribe(value => {
                if (value === -1) {
                    this.show(this.translateService.translate('otdbacre.errorcannot'));
                    this.gltxnModel.cgnbtBankStatementDate = null;
                    return;

                }

            });

            if (effDate) {
                const effectiveDate = DateFormat.getDate(this.gltxnModel.cgnbtBankStatementDate);
                const currDate = DateFormat.getDate();
                if (DateFormat.compareDate(effectiveDate, currDate) === 1) {
                    this.show(this.translateService.translate('otdbacre.bankstatementdatecannotexceed'));
                    this.gltxnModel.cgnbtBankStatementDate = null;
                    return;

                }

            }
        }
    }
    /**
    * To display the messages
    */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    gltxnExecuteQuery() {
        const gltxnResult = this.otdbacreFactory.
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
    onSave() {
        if (!this.gltxnModel.accountCode) {
            this.show(this.translateService.translate('otdbacre.accountcodemustbe'));
            return;

        }
        if (!this.gltxnModel.cgnbtBankStatementDate) {
            this.show(this.translateService.translate('otdbacre.bankstatementmustbe'));
            return;

        }
        if (!this.gltxnModel.txnEntryAmount) {
            this.show(this.translateService.translate('otdbacre.balancemustbe'));
            return;

        }
        if (this.grid) {
            const event = { added: [], updated: [], removed: [] };
            const updated = [];
            this.grid.updatedMap.forEach((value) => { updated.push(value); });
            event.updated = updated;
            this.otdbacreSavegltxnForm(event);
        }
    }
    /**00
     *  This function will be executed when commit event is
    * fired
    */
    otdbacreSavegltxnForm(event) {
        //  TODO declare commit bean and add insert list to that object.
        this.gltxnInsertList = event.added;
        this.gltxnUpdateList = event.updated;
        this.gltxnDeleteList = event.removed;
        this.gltxnCommitModel.insertList = [];
        this.gltxnCommitModel.updateList = [];
        this.gltxnCommitModel.deleteList = [];
        if (this.gltxnInsertList.length > 0) {
            for (let i = 0; i < this.gltxnInsertList.length; i++) {
            }
            this.gltxnCommitModel.insertList = this.gltxnInsertList;
        }
        if (this.gltxnUpdateList.length > 0) {
            for (let i = 0; i < this.gltxnUpdateList.length; i++) {
                this.gltxnUpdateList[i].bankStatementDate = this.gltxnModel.cgnbtBankStatementDate;
                if (this.gltxnUpdateList[i]['cgNbtDescription']) {
                    this.gltxnModel.reconClearFlag = 'Y';
                    this.gltxnUpdateList[i].reconClearFlag = 'Y';
                } else {
                    this.gltxnModel.reconClearFlag = 'N';
                    this.gltxnUpdateList[i].reconClearFlag = 'N';
                    this.gltxnUpdateList[i].bankStatementDate = undefined;
                }
            }
            this.gltxnCommitModel.updateList = this.gltxnUpdateList;

        }
        if (this.gltxnDeleteList.length > 0) {
            for (let i = 0; i < this.gltxnDeleteList.length; i++) {
            }
            this.gltxnCommitModel.deleteList = this.gltxnDeleteList;
        }
        const gltxnSaveData = this.otdbacreFactory.glTxnCommit(this.gltxnCommitModel);
        gltxnSaveData.subscribe(data => {
            if (data === 1) {
                this.bcrtmpModel = new BankClearReconcilesTmp();
                this.all = 'ALL';
                this.bcrtmpExecuteQuery();
                this.show('common.addupdateremoverecordsuccess', 'success');
            } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
            }
        });
    }
    bankrcExecuteQuery() {
        const bankrcResult = this.otdbacreFactory.bankRcExecuteQuery(this.bankrcModel);
        bankrcResult.subscribe(bankrcResultList => {
            if (bankrcResultList.length === 0) {
                this.bankrcData = [];
            } else {
                this.bankrcData = bankrcResultList;
                this.bankrcModel = bankrcResultList[0];
            }
        });
    }
    syspflExecuteQuery() {
        const syspflResult = this.otdbacreFactory.
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
    /**
     *  This function will be executed when commit event is
    * fired
    */
    otdbacreSavesyspflForm(event) {
        //  TODO declare commit bean and add insert list to that object.
        this.syspflInsertList = event.added;
        this.syspflUpdateList = event.updated;
        this.syspflDeleteList = event.removed;
        this.syspflCommitModel.insertList = [];
        this.syspflCommitModel.updateList = [];
        this.syspflCommitModel.deleteList = [];
        if (this.syspflInsertList.length > 0 || this.syspflUpdateList.length > 0) {
            for (let i = 0; i < this.syspflInsertList.length; i++) {
            }
            for (let i = 0; i < this.syspflUpdateList.length; i++) {
            }
            this.syspflCommitModel.insertList = this.syspflInsertList;
            this.syspflCommitModel.updateList = this.syspflUpdateList;
        }
        if (this.syspflDeleteList.length > 0) {
            for (let i = 0; i < this.syspflDeleteList.length; i++) {
            }
            this.syspflCommitModel.deleteList = this.syspflDeleteList;
        }
        const syspflSaveData = this.otdbacreFactory.sysPflCommit(this.syspflCommitModel);
        syspflSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
            } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
            }
        });
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    otdbacreSavebcrtmpForm(event) {
        //  TODO declare commit bean and add insert list to that object.
        this.bcrtmpInsertList = event.added;
        this.bcrtmpUpdateList = event.updated;
        this.bcrtmpDeleteList = event.removed;
        this.bcrtmpCommitModel.insertList = [];
        this.bcrtmpCommitModel.updateList = [];
        this.bcrtmpCommitModel.deleteList = [];
        if (this.bcrtmpInsertList.length > 0 || this.bcrtmpUpdateList.length > 0) {
            for (let i = 0; i < this.bcrtmpInsertList.length; i++) {
            }

            this.bcrtmpCommitModel.insertList = this.bcrtmpInsertList;
        }
        if (this.bcrtmpUpdateList.length > 0) {
            for (let i = 0; i < this.bcrtmpUpdateList.length; i++) {
            }
            this.bcrtmpCommitModel.updateList = this.bcrtmpUpdateList;
        }
        if (this.bcrtmpDeleteList.length > 0) {
            for (let i = 0; i < this.bcrtmpDeleteList.length; i++) {
            }
            this.bcrtmpCommitModel.deleteList = this.bcrtmpDeleteList;
        }
        const bcrtmpSaveData = this.otdbacreFactory.bcrTmpCommit(this.bcrtmpCommitModel);
        bcrtmpSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
            } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
            }
        });
    }
    gltxn1ExecuteQuery() {
        const gltxn1Result = this.otdbacreFactory.
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
    gltxn2ExecuteQuery() {
        const gltxn2Result = this.otdbacreFactory.
            glTxn2ExecuteQuery(this.gltxn2Model);
        gltxn2Result.subscribe(gltxn2ResultList => {
            if (gltxn2ResultList.length === 0) {
                this.gltxn2Data = [];
            } else {
                this.gltxn2Data = gltxn2ResultList;
                this.gltxn2Model = gltxn2ResultList[0];
            }
        });
    }
    gltxn3ExecuteQuery() {
        const gltxn3Result = this.otdbacreFactory.
            glTxn3ExecuteQuery(this.gltxn3Model);
        gltxn3Result.subscribe(gltxn3ResultList => {
            if (gltxn3ResultList.length === 0) {
                this.gltxn3Data = [];
            } else {
                this.gltxn3Data = gltxn3ResultList;
                this.gltxn3Model = gltxn3ResultList[0];
            }
        });
    }
    amountKeyDown(event, amount) {
        if (!this.amountFormat.avoidKeys(event, this.plusTxnEntryAmount, false, 8)) {
            event.stopPropagation();
            return false;
           }
    }
    amountKeyDownMinus(event, amount) {
        if (!this.amountFormat.avoidKeys(event, this.minusTxnEntryAmount, false, 8)) {
            event.stopPropagation();
            return false;
           }
    }
    amountKeyDownBalance(event, amount) {
        if (!this.amountFormat.avoidKeys(event, this.gltxnModel.txnEntryAmount, false, 8)) {
            event.stopPropagation();
            return false;
           }
    }
    onAmountBlur(amount) {
        this.amountFormat.precisionFlot(amount);
    }
    onAmountBlurBal(amountBal) {
        this.amountFormat.precisionFlot(amountBal);
    }

    onAmountBlurPlus(amountPlus) {
        this.amountFormat.precisionFlot(amountPlus);
    }
    changedNumber(num) {
        this.amountFormat.precisionFlot(num);
        if (!this.isNull(this.gltxnModel.txnEntryAmount)) {
            num = Number(this.gltxnModel.txnEntryAmount).toFixed(2);
            this.gltxnModel.txnEntryAmount = num;
            if (!this.trustFlgBal) {
                this.bcrtmpModel.trustbalance = '0.00';
                if (!this.gltxnModel.lastReconciledDate) {
                    const bal = Number(this.gltxnModel.txnEntryAmount) + Number(this.bcrtmpModel.trustbalance);
                    this.reconciledstmntbalance = bal.toFixed(2);
                    this.bcrtmpModel.differenceBal = bal.toFixed(2);
                } else {
                    if (this.gltxnModel.accountCode && this.sessionManager.currentCaseLoad) { }
                    const trustBal = this.otdbacreFactory.getTrustBal(this.gltxnModel.accountCode, this.sessionManager.currentCaseLoad);
                    trustBal.subscribe(trustBalance => {
                        this.trustbalance = trustBalance;
                        this.bcrtmpModel.trustbalance = this.trustbalance.toFixed(2);
                        const bal = Number(this.gltxnModel.txnEntryAmount) - Number(this.bcrtmpModel.trustbalance);
                        this.reconciledstmntbalance = Number(this.gltxnModel.txnEntryAmount).toFixed(2);
                        this.bcrtmpModel.differenceBal = bal.toFixed(2);

                    });
                }
            }

            if (this.trustFlgBal) {
                const balBank = Number(this.gltxnModel.txnEntryAmount) + Number(this.reconciledstmntbalance);
                this.reconciledstmntbalance = balBank.toFixed(2);
                const differBal = Number(this.reconciledstmntbalance) - Number(this.bcrtmpModel.trustbalance);
                this.bcrtmpModel.differenceBal = differBal.toFixed(2);
            }
        } else {
            this.reconciledstmntbalance = '0.00';
            this.bcrtmpModel.trustbalance = '0.00';
            this.bcrtmpModel.differenceBal = '0.00';
        }
    }
    whenCheckCount(event) {
        if (event.txnPostUsage === 'DR') {
        this.lTotalBalance = Number(this.reconciledstmntbalance) - Number(event.txnEntryAmount);
        this.reconciledstmntbalance = this.lTotalBalance.toFixed(2);
        const diffBalDr = Number(this.reconciledstmntbalance) - Number(this.bcrtmpModel.trustbalance);
        this.bcrtmpModel.differenceBal = diffBalDr.toFixed(2);
        } else {
            this.lTotalBalance = Number(this.reconciledstmntbalance) + Number(event.txnEntryAmount);
            this.reconciledstmntbalance = this.lTotalBalance.toFixed(2);
            const diffBalDr = Number(this.reconciledstmntbalance) - Number(this.bcrtmpModel.trustbalance);
            this.bcrtmpModel.differenceBal = diffBalDr.toFixed(2);
        }
        // if (event.cgNbtDescription) {
        //     if (this.gltxnModel.cgnbtBankStatementDate >= event.nbtBankStatementDate) {
        //         if (event.cgNbtDescription) {
        //             if (event.txnPostUsage === 'DR') {
        //                 this.lTotalBalance = Number(this.reconciledstmntbalance) - Number(event.txnEntryAmount);
        //                 this.reconciledstmntbalance = this.lTotalBalance.toFixed(2);
        //                 // this.clearDeposits = this.clearDeposits + 1;
        //                 // this.clearDepositsAmnt = Number(this.clearDepositsAmnt) + Number(event.txnEntryAmount);
        //                 // const amount = this.clearDepositsAmnt.toFixed(2);
        //                 // this.clearDepositsAmnt = amount;
        //                 const diffBalDr = Number(this.reconciledstmntbalance) - Number(this.bcrtmpModel.trustbalance);
        //                 this.bcrtmpModel.differenceBal = diffBalDr.toFixed(2);

        //             } else {
        //                 this.lTotalBalance = Number(this.reconciledstmntbalance) + event.txnEntryAmount;
        //                 this.reconciledstmntbalance = this.lTotalBalance.toFixed(2);
        //                 // this.checkedNumber = Number(this.checkedNumber) + Number('1.00');
        //                 // this.checkedAmount = Number(this.checkedAmount) + Number(event.txnEntryAmount);
        //                 // const amount = this.checkedAmount.toFixed(2);
        //                 // this.checkedAmount = amount;
        //                 const diffBalDr = Number(this.reconciledstmntbalance) - Number(this.bcrtmpModel.trustbalance);
        //                 this.bcrtmpModel.differenceBal = diffBalDr.toFixed(2);
        //             }

        //         } else {

        //         }
        //     }

        // } else {
        //     if (event.txnPostUsage === 'DR') {
        //         this.lTotalBalance = Number(this.reconciledstmntbalance) + Number(event.txnEntryAmount);
        //         // this.clearDeposits = this.clearDeposits - 1;
        //         // this.clearDepositsAmnt = this.clearDepositsAmnt - Number(event.txnEntryAmount);
        //         // const amount = this.clearDepositsAmnt.toFixed(2);
        //         // this.clearDepositsAmnt = amount;
        //         this.reconciledstmntbalance = this.lTotalBalance.toFixed(2);
        //         const diffBalDr = Number(this.reconciledstmntbalance) - Number(this.bcrtmpModel.trustbalance);
        //         this.bcrtmpModel.differenceBal = diffBalDr.toFixed(2);

        //     } else {
        //         this.lTotalBalance = Number(this.reconciledstmntbalance) - Number(event.txnEntryAmount);
        //         this.reconciledstmntbalance = this.lTotalBalance.toFixed(2);
        //         // this.checkedNumber = Number(this.checkedNumber) - 1;
        //         // this.checkedAmount = Number(this.checkedAmount) - Number(event.txnEntryAmount);
        //         // const amount = this.checkedAmount.toFixed(2);
        //         // this.checkedAmount = amount;
        //         const diffBalDr = Number(this.reconciledstmntbalance) - Number(this.bcrtmpModel.trustbalance);
        //         this.bcrtmpModel.differenceBal = diffBalDr.toFixed(2);
        //     }
        // }
    }
        changedEvent(amt, event?) {
            if (amt !== 'grid') {
            this.amountFormat.precisionFlot(amt);
            }
            this.isClearDis = false;
            if (this.bcrtmpData.length === 0) {
               return;
            }
            if (this.bcrtmpDataTemp.length  > 0) {
            this.reconciledstmntbalance  = this.bcrtmpDataTemp[0].reconciledstmntbalance;
            } else {
                this.reconciledstmntbalance = 0.00;
            }
            if (this.gltxnModel.txnEntryAmount) {
                this.changedNumber(this.gltxnModel.txnEntryAmount);
            }
             if (this.plusTxnEntryAmount) {
                this.changedPlus(this.plusTxnEntryAmount);
            }
             if (this.minusTxnEntryAmount) {
                this.changedMinus(this.minusTxnEntryAmount);
            }
            if (amt === 'grid') {
            if (this.grid.updatedMap.size === 0) {
                this.whenCheckCount(event);
            } else if (this.grid.updatedMap.size > 0) {
                this.checkFlag = false;
                this.grid.updatedMap.forEach(
                    (v: any, k: number) => {
                        if (v.rowId === event.rowId  && v.checkFlag !== v.cgNbtDescription) {
                                this.whenCheckCount(event);
                                this.checkFlag = true;
                        } else if (v.checkFlag !== v.cgNbtDescription) {
                            this.whenCheckCount(v);
                        }
                    }
                );
                if (!this.checkFlag && event.checkFlag !== event.cgNbtDescription) {
                    this.whenCheckCount(event);
                }
            }
        } else {
            if (this.grid.updatedMap.size > 0) {
                this.grid.updatedMap.forEach(
                    (v: any, k: number) => {
                       if (v.checkFlag !== v.cgNbtDescription) {
                            this.whenCheckCount(v);
                        }
                    }
                );
            }
        }

    }
    onGridClear = () => {
        this.bcrtmpExecuteQuery();
      return true;
    }
    checkedCount() {
        const count = { numOfCheck: 0, totAmt: 0, depcheck: 0, depAmt: 0 };
        const datalist = this.bcrtmpData.filter(ele => {
            if (this.all === 'CLR' || this.all === 'ALL') {
                if (ele['cgNbtDescription']) {
                    if (ele['txnPostUsage'] === 'CR') {
                    count.numOfCheck++;
                    count.totAmt += ele.txnEntryAmount ? Number(ele.txnEntryAmount) : 0;
                    }
                    if (ele['txnPostUsage'] === 'DR') {
                        count.depcheck++;
                        count.depAmt += ele.txnEntryAmount ? Number(ele.txnEntryAmount) : 0;
                        }
                }
            }
        });
        this.checkedNumber = count.numOfCheck;
        this.checkedAmount = count.totAmt.toFixed(2);
        this.clearDeposits = count.depcheck;
        this.clearDepositsAmnt = count.depAmt.toFixed(2);
        }
}
