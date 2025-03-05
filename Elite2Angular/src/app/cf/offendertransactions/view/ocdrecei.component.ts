import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdreceiService } from '../service/ocdrecei.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderTransactions } from '@inmate/trust/trustaccounts/beans/OffenderTransactions';
import { OffenderTransactionsCommitBean } from '@inmate/trust/trustaccounts/beans/OffenderTransactionsCommitBean';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { OffFeeBillTransactions } from '@cf/deductions/beans/OffFeeBillTransactions';
import { FeeAccounts } from '../../maintenance/beans/FeeAccounts';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { offBillingStatements } from '@cf/offendertransactions/beans/offBillingStatements';
// import required bean declarations

@Component({
    selector: 'app-ocdrecei',
    templateUrl: './ocdrecei.component.html'
})

export class OcdreceiComponent implements OnInit {
    // Variable declaration
    @ViewChild('offFeeGrid', { static: false }) offFeeGrid: any;
    msgs: any[] = [];
    offtxnData: OffenderTransactions[] = [];
    offtxnModel: OffenderTransactions = new OffenderTransactions();
    offtxnCommitModel: OffenderTransactionsCommitBean = new OffenderTransactionsCommitBean();
    offtxnIndex = -1;
    offtxnInsertList: OffenderTransactions[] = [];
    offtxnUpdatetList: OffenderTransactions[] = [];
    offtxnDeleteList: OffenderTransactions[] = [];
    syspflData: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex = -1;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    cgfkOfftxndspinformationnRg: any[] = [];
    cgfkOfftxndspdescriptionRg: any[] = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    msglist: any[];
    message: any;
    type: any;
    paymentMethodLink: string;
    caseLoadId: string;
    caseLoadType: string;
    options: { code: string; description: string; }[];
    infoNumberLink: string;
    disabeTxnType: boolean;
    disabeTxnEntryAmount: boolean;
    chequeProductionFlag: boolean;
    disableTxnRefNum: boolean;
    disableInfoNumber: boolean;
    saveDisabled: boolean;
    clearDisabled: boolean;
    disableReportBtn: boolean;
    disablepaymentplan: boolean;
    offFeeData: OffFeeBillTransactions[] = [];
    offFeeDataTemp: OffFeeBillTransactions[] = [];
    offFeeInsertList: OffFeeBillTransactions[] = [];
    offFeeModel: OffFeeBillTransactions = new OffFeeBillTransactions();
    prepaidAccntModel: OffenderTransactions = new OffenderTransactions();
    prepaidAcntModel: FeeAccounts = new FeeAccounts();
    offBillStmtModel: offBillingStatements = new offBillingStatements();
    offBillStmtInsertlist: offBillingStatements[] = [];
    longestSupervisionExpireDate: any;
    offFeeColumnDef: any[];
    isOffenderFeeDisplay: boolean;
    PrepaidFeeAcntFlag: boolean
    lovTitles = {
        code: this.translateService.translate('ocdrecei.docket'),
    };
    showDocketValidation: boolean;
    saveStopValidation: string;
    OffFeeGridIndex: number;
    prepaidAcntSelectedFlag: boolean;
    isAmountFieldEdit: boolean = true;
    receiptNumber: any;
    prepaidAmntFlag: boolean = false;
    caseplanId: number;
    billingCycleEndDate: Date;
    billingCycleStartDate: Date;
    billEndDay: any;
    receiptProductionFlag: any;
    prepaidAmount: any;
    txnAmount: any;
    constructor(private ocdreceiFactory: OcdreceiService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private offenderSearchService: OffenderSearchService,
        private amountFormat: AmountFormatUtil, private dialogService: DialogService) {
        // TODO initilize data members here..!
        this.offFeeColumnDef = [];
    }
    ngOnInit() {
        // TODO all initializations here
        this.txnAmount = undefined;
        this.prepaidAmount = undefined;
        this.prepaidAcntSelectedFlag = false;
        this.isOffenderFeeDisplay = false;
        this.PrepaidFeeAcntFlag = true;
        this.getSystemProfileValue();
        this.getbillEndDayPfVal();
        this.disabeTxnType = true;
        this.disablepaymentplan = true;
        this.disabeTxnEntryAmount = true;
        this.disableTxnRefNum = true;
        this.disableInfoNumber = true;
        this.saveDisabled = true;
        this.disableReportBtn = true;
        this.showDocketValidation = false;
        this.clearDisabled = true;
        this.chequeProductionFlag = false;
        this.saveStopValidation = undefined;
        this.paymentMethodLink = 'ocdrecei/cgfkOffTxnTxnTypeRecordGroup';
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.caseLoadType = this.sessionManager.currentCaseLoadType;
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        if (!this.vHeaderBlockModel) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }

        this.offFeeColumnDef = [
            {
                fieldName: this.translateService.translate('ocdrecei.supervisionperiod'), field: 'bookingNo', editable: false, width: 150,
                datatype: 'text',
            },
            {
                fieldName: this.translateService.translate('ocdrecei.caseload'), field: 'caseloadId', editable: false, width: 150,
                datatype: 'text',
            },
            {
                fieldName: this.translateService.translate('ocdrecei.feeid'), field: 'offenderFeeId', editable: false, width: 150,
                datatype: 'number',
            },
            {
                fieldName: this.translateService.translate('ocdrecei.feecode'), field: 'feeCode', editable: false, width: 150,
                datatype: 'text',
            },
            {
                fieldName: this.translateService.translate('ocdrecei.billnumber'), field: 'billId', editable: false, width: 150,
                datatype: 'text',
            },
            {
                fieldName: this.translateService.translate('ocdrecei.billdate'), field: 'billGenerateDatetime', editable: false, width: 150,
                datatype: 'date',
            },
            {
                fieldName: this.translateService.translate('ocdrecei.billstatus'), field: 'billStatus', editable: false, width: 150,
                datatype: 'text',
            },
            {
                fieldName: this.translateService.translate('ocdrecei.balance'), field: 'balanceOwingAmount', editable: false, width: 150,
                datatype: 'number', format: '1.2-2', whole: true, strictFP: true, rightAlign: true,
            },
            {
                fieldName: this.translateService.translate('common.amount'), field: 'amount', editable: true, width: 150,rightAlign: true,
                datatype: 'number', format: '1.2-2',maxValue: 999999999.99, whole: true, strictFP: true, cellEditable: this.canCellEdit
            },
            { fieldName: this.translateService.translate(''), field: 'currentBalanceOwning', hide: true }
        ];
    }

    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (!this.isAmountFieldEdit || (data.caseloadId != this.sessionManager.currentCaseLoad)) {
            return false;
        }
        return true;
    }

    getSystemProfileValue() {
        const serviceObj = this.ocdreceiFactory.getSystemProfileValue();
        serviceObj.subscribe(data => {
            if (data && data == 'Y') {
                this.isOffenderFeeDisplay = true;
            } else {
                this.isOffenderFeeDisplay = false;

            }
        });
    }

    getLongestSupervisionExpireDate(data) {
        const serviceObj = this.ocdreceiFactory.getLongestSupervisionExpireDate(data);
        serviceObj.subscribe(data => {
            if (data) {
                this.longestSupervisionExpireDate = data;
            } else {
                this.longestSupervisionExpireDate = data;

            }
        });
    }

    getOffenederFeeSectionQuery(data) {
        const serviceObj = this.ocdreceiFactory.getOffenederFeeSectionQuery(String(data));
        serviceObj.subscribe(data => {
            if (data.length > 0) {
                data.forEach(e => {
                    e.currentBalanceOwning = e.balanceOwingAmount;
                });
                this.offFeeDataTemp = [];
                this.offFeeData = data;
                this.offFeeDataTemp = JSON.parse(JSON.stringify(this.offFeeData));
                this.OffFeeGridIndex = 0;
            } else {
                this.offFeeData = [];
                this.offFeeDataTemp = [];
            }
        });
    }

    onOffFeeGridRowClick(event) {
        this.offFeeModel = new OffFeeBillTransactions();
        if (event) {
            this.offFeeModel = event;
        }

    }

    /**
      * This function displays the messages
      */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    showOne(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    onOffenderChange(offender) {
        this.vHeaderBlockModel = new VHeaderBlock();
        this.offFeeDataTemp = [];
        this.clear();
        this.chequeProductionFlag = false;
        this.saveDisabled = true;
        this.disableReportBtn = true;
        this.showDocketValidation = false;
        this.saveStopValidation = undefined;
        this.offtxnData = [];
        this.txnAmount = undefined;
        this.prepaidAmount = undefined;
        if (offender) {
            if (offender.offenderBookId) {
                this.infoNumberLink = 'ocdrecei/cgfkOffTxnDspInformationNRecordGroup?offenderBookId=' + offender.offenderBookId
                this.getLongestSupervisionExpireDate(offender.offenderBookId);
                if (this.isOffenderFeeDisplay) {
                    this.getOffenederFeeSectionQuery(offender.offenderIdDisplay);
                }
            }
            // this.PrepaidFeeAcntFlag = false;
            this.disabeTxnType = false;
            this.disabeTxnEntryAmount = false;
            this.disableTxnRefNum = false;
            this.disableInfoNumber = false;
            // this.disableoverrideobli = false;
            this.vHeaderBlockModel = offender;
            this.offtxnModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.offtxnModel.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
            this.offtxnModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
            this.offtxnModel.caseloadId = this.caseLoadId;
            this.offtxnModel.caseloadType = this.sessionManager.currentCaseLoadType;
            this.getPaymentObligationCount();
            this.getCasePlanId();
        } else {
            this.vHeaderBlockModel = new VHeaderBlock();
            this.offFeeData = [];
            this.disabeTxnType = true;
            this.disabeTxnEntryAmount = true;
            this.disableTxnRefNum = true;
            this.disableInfoNumber = true;
            this.saveDisabled = true;
            this.disableReportBtn = true;
            this.clearDisabled = true;
            this.disablepaymentplan = true;
            this.PrepaidFeeAcntFlag = true;
            this.longestSupervisionExpireDate = undefined;
            this.txnAmount = undefined;
            this.prepaidAmount = undefined;
        }

    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocdreceiSaveofftxnForm() {
        // TODO declare commit bean and add insert list to that object.
        if (!this.offtxnModel.txnType) {
            this.showOne(this.translateService.translate('ocdrecei.enterpaymentmethod'));
            return;
        } else if (!this.offtxnModel.txnEntryAmount) {
            this.showOne(this.translateService.translate('ocdrecei.amountmustbeentered'));
            return;
        } else if (this.offtxnModel.txnEntryAmount <= 0) {
            this.showOne(this.translateService.translate('ocdrecei.reciptamounterror'));
            return;
        } else if (this.saveStopValidation) {
            this.showOne(this.saveStopValidation);
            return;
        }
        // } else if (this.prepaidAcntSelectedFlag && !this.prepaidAcntModel.amount) {
        //     this.showOne(this.translateService.translate('ocdrecei.prepaidamountmustbeentered'));
        //     return;
        // }
        // if (!this.prepaidAcntSelectedFlag && this.isOffenderFeeDisplay && Number(this.offtxnModel.txnEntryAmount) != this.calculateAmount) {
        //     const diffAmnt = Math.abs(Number(this.offtxnModel.txnEntryAmount) - Number(this.calculateAmount));
        //     const message = this.translateService.translate('common.transactionisnotbalancedifferenceof') + ` ${diffAmnt.toFixed(2)}`;
        //     this.showOne(message);
        //     return;
        // } else if (this.prepaidAcntSelectedFlag && (Number(this.calculateAmount) + Number(this.prepaidAcntModel.amount)) != Number(this.offtxnModel.txnEntryAmount)) {
        //     const diffAmnt = Math.abs(Number(this.offtxnModel.txnEntryAmount) - (Number(this.calculateAmount) + Number(this.prepaidAcntModel.amount)));
        //     const message = this.translateService.translate('common.transactionisnotbalancedifferenceof') + ` ${diffAmnt.toFixed(2)}`;
        //     this.showOne(message);
        //     return;
        // }
        this.saveDisabled = true;
        const offtxnSaveData = this.ocdreceiFactory.offTxnCommit(this.offtxnModel);
        offtxnSaveData.subscribe(resultData => {
            this.saveDisabled = false;
            if (resultData) {
                if (resultData.sealFlag) {
                    if (resultData.sealFlag === '1') {
                        this.showOne(this.translateService.translate('ocdrecei.errorinprecommit'));
                    } else if (resultData.sealFlag === '2') {
                        this.showOne(this.translateService.translate('ocdrecei.cardswipeerror'));
                    } else if (resultData.sealFlag === '3') {
                        const msg = this.translateService.translate('ocdrecei.missingpaymentplan');
                        const data = {
                            label: msg, yesBtn: true, noBtn: true
                        };
                        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                            if (result) {
                                this.offtxnModel.sealFlag = undefined;
                                this.ocdreceiSaveofftxnFormOne();
                            } else {
                                //  this.clear();
                            }
                        });
                    }
                } else {
                    this.ocdreceiSaveofftxnFormOne();
                }
            }
        });
    }

    whenValidateItem(event) {
        if (!event) {
            this.prepaidAcntModel = new FeeAccounts();
            this.prepaidAmount = undefined;
        }
        if (this.offtxnModel && this.offtxnModel.txnType) {
            if (event && event.description) {
                this.offtxnModel.txnEntryDesc = event.description;
            }
            if (this.offtxnModel.txnType === 'O_CD') {
                this.disableTxnRefNum = true;
                this.offtxnModel.txnEntryDesc = null;
            } else {
                this.disableTxnRefNum = false;
            }
            this.showDocketValidation = false;
            /* this.infoNumberLink = 'ocdrecei/cgfkOffTxnDspInformationNRecordGroup?offenderId=' + this.offtxnModel.rootOffenderId
                + '&caseloadType=' + this.sessionManager.currentCaseLoadType + '&txnType=' + this.offtxnModel.txnType; */
            this.getDocketLovData();
            this.offtxnModel.sealFlag = undefined;
            this.saveStopValidation = undefined;
            const syspflResult = this.ocdreceiFactory.whenValidateItem(this.offtxnModel);
            syspflResult.subscribe(data => {
                if (data) {
                    this.offtxnModel.receiptProductionFlag = data.receiptProductionFlag;
                    this.receiptProductionFlag = data.receiptProductionFlag;
                    this.offtxnModel.checkInd = data.checkInd;
                    this.offtxnModel.deductionFlag = data.deductionFlag;
                    if (data.chequeProductionFlag) {
                        this.offtxnModel.chequeProductionFlag = data.chequeProductionFlag;
                        if (data.chequeProductionFlag === 'Y') {
                            this.chequeProductionFlag = true;
                        } else {
                            this.chequeProductionFlag = false;
                        }
                    }
                    if (data.sealFlag) {
                        if (data.sealFlag === '1') {
                            this.saveStopValidation = this.translateService.translate('ocdrecei.txntypenotdefined');
                            this.showOne(this.saveStopValidation);
                        } else if (data.sealFlag === '2') {
                            this.saveStopValidation = this.translateService.translate('ocdrecei.errorcheckoffenderded');
                            this.showOne(this.saveStopValidation);
                        } else if (data.sealFlag === '3') {
                            this.saveStopValidation = this.translateService.translate('ocdrecei.reciptsuspended');
                            this.showOne(this.saveStopValidation);
                        } else if (data.sealFlag === '4') {
                            this.saveStopValidation = this.translateService.translate('ocdrecei.offenderbouncedcheckmsg');
                            this.showOne(this.saveStopValidation);
                        }
                    }
                }
            });
        }
    }

    onAmountBlur(amount) {
        this.amountFormat.amountFormatEvent(amount);
        this.offtxnModel.txnEntryAmount = JSON.parse(JSON.stringify(this.amountFormat.amountFormat(amount)));
    }
    onPrepaidAmountBlur(amount) {
        this.amountFormat.amountFormatEvent(amount);
        this.prepaidAcntModel.amount = JSON.parse(JSON.stringify(this.amountFormat.amountFormat(amount))); 
    }
    amountKeyDown(event, comp) {
        if (!this.amountFormat.avoidKeys(event, this.txnAmount)) {
            event.stopPropagation();
            return false;
        }
    }
    paymentPlanClick = () => {
        if (this.offtxnModel.rootOffenderId) {
            this.dialogService.openLinkDialog('/OCUPAYPL', this.offtxnModel, 80).subscribe(result => {

            });
        } else {
            this.type = 'warn';
            this.message = this.translateService.translate('payment plan fail');
            this.show();
            return;
        }

    }

    validateDspInfoNumber() {
        if (this.offtxnModel && this.offtxnModel.txnType) {
            const syspflResult = this.ocdreceiFactory.validateDspInfoNumber(this.offtxnModel);
            syspflResult.subscribe(data => {
                if (!data) {
                    const msgs = this.translateService.translate('ocdrecei.probationererror')
                        .replace('%txnType%', this.offtxnModel.txnType);
                    this.showOne(msgs);
                }
            });
        }
    }

    checkeDspInfoNumber(event) {
        if (event && event.innerOptions) {
            if (event.innerOptions.length === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.listofvalues');
                this.show();
                return;
            }
        }

        if (this.showDocketValidation) {
            const msgs = this.translateService.translate('ocdrecei.probationererror')
                .replace('%txnType%', this.offtxnModel.txnType);
            this.showOne(msgs);
        }
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocdreceiSaveofftxnFormOne() {
        //this.saveDisabled = true;
        this.offFeeInsertList = [];
        this.offtxnCommitModel.insertList = [];
        this.offtxnCommitModel.offFeeUpdateList = [];
        this.offtxnCommitModel.prepaidAcntInsertList = [];
        this.offBillStmtInsertlist = [];
        this.offtxnCommitModel.insertList.push(this.offtxnModel);
        if (this.prepaidAcntSelectedFlag) {
            this.prepaidAccntModel.caseloadId = this.offtxnModel.caseloadId;
            this.prepaidAccntModel.caseloadType = this.offtxnModel.caseloadType;
            this.prepaidAccntModel.chequeProductionFlag = this.offtxnModel.chequeProductionFlag;
            this.prepaidAccntModel.deductionFlag = this.offtxnModel.deductionFlag;
            this.prepaidAccntModel.offenderBookId = this.offtxnModel.offenderBookId;
            this.prepaidAccntModel.offenderId = this.offtxnModel.offenderId;
            this.prepaidAccntModel.rootOffenderId = this.offtxnModel.rootOffenderId;
            this.prepaidAccntModel.txnEntryDesc = this.offtxnModel.txnEntryDesc;
            this.prepaidAccntModel.txnType = 'OTC';
            this.prepaidAccntModel.txnEntryAmount = this.prepaidAcntModel.amount;
            this.prepaidAccntModel.subAccountType = this.prepaidAcntModel.feeCode;
            this.prepaidAccntModel.crAccountCode = this.prepaidAcntModel.accountCode;
            this.offtxnCommitModel.prepaidAcntInsertList.push(this.prepaidAccntModel);
        }
        // if (this.isOffenderFeeDisplay) {
        //     this.offFeeGrid.updatedMap.forEach(
        //         (v: any, k: number) => {
        //             if (v.amount && v.amount > 0) {
        //                 this.offFeeInsertList.push(v);
        //             }
        //         }
        //     );
        // }
        if (this.offFeeInsertList.length > 0) {
            for (let i = 0; i < this.offFeeInsertList.length; i++) {
                this.offFeeInsertList[i].billTxnType = this.offtxnModel.txnType;
                if ((Number(this.offFeeInsertList[i].currentBalanceOwning) - Number(this.offFeeInsertList[i].amount)) < 0) {
                    this.showOne(this.translateService.translate('ocdrecei.amountenteredcannotbegrtrthanbalanceowing'));
                    return;
                }
                // this.offFeeInsertList[i].billTxnAmount = (Number(this.offFeeInsertList[i].currentBalanceOwning) - Number(this.offFeeInsertList[i].amount));
                this.offFeeInsertList[i].billTxnAmount = Number(this.offFeeInsertList[i].amount);
                this.offFeeInsertList[i].billTxnUser = this.sessionManager.getId();
                this.offFeeInsertList[i].offAdjCancRsn = undefined;
                this.offFeeInsertList[i].offAdjSubRsn = undefined;
                this.offFeeInsertList[i].offAdjTxnId = undefined;
                this.offFeeInsertList[i].offAdjRevRsn = undefined;
                this.offFeeInsertList[i].billTxnComment = undefined;
                this.offFeeInsertList[i].originalBillId = undefined;
                this.offFeeInsertList[i].originalBillTxnNo = undefined;
                this.offFeeInsertList[i].originalOffAdjTxnId = undefined;
                // this.offFeeInsertList[i].billAgingEndDate = DateFormat.getDate(this.offFeeInsertList[i].billAgingEndDate);
                // this.offFeeInsertList[i].billGenerateDatetime = DateFormat.getDate(this.offFeeInsertList[i].billGenerateDatetime);
                // this.offFeeInsertList[i].billAgingStartDate=  DateFormat.getDate(this.offFeeInsertList[i].billAgingStartDate);
                // this.offFeeInsertList[i].billTxnDatetime=  DateFormat.getDate(this.offFeeInsertList[i].billTxnDatetime);

                // if (this.caseplanId) {
                //     this.offBillStmtModel = new offBillingStatements();
                //     this.offBillStmtModel.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
                //     this.offBillStmtModel.billingCycleStartDate = DateFormat.getDate(this.billingCycleStartDate);
                //     this.offBillStmtModel.billingCycleEndDate = DateFormat.getDate(this.billingCycleEndDate);
                //     this.offBillStmtModel.statementGenerateDatetime = DateFormat.getDate();
                //     this.offBillStmtModel.statementGenerateUser = this.sessionManager.getId();
                //     this.offBillStmtModel.beginingBalanceAmount = 0;
                //     this.offBillStmtModel.paymentsCreditsAmount = 0;
                //     this.offBillStmtModel.billingsAmount = this.offFeeInsertList[i].amount;
                //     this.offBillStmtModel.endingBalanceAmount = 0;
                //     this.offBillStmtModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                //     this.offBillStmtModel.casePlanId = this.caseplanId;
                //     this.offBillStmtModel.billId = this.offFeeInsertList[i].billId;
                //     this.offBillStmtModel.caseloadId = this.sessionManager.currentCaseLoad;
                //     this.offBillStmtModel.statementGenerateUser = this.sessionManager.getId();
                //     this.offBillStmtInsertlist.push(this.offBillStmtModel);
                // }
            }
        }
        //offFee Insert List
        this.offtxnCommitModel.offFeeUpdateList = this.offFeeInsertList;
        //Statement Insert List
        this.offtxnCommitModel.stmtInsertList = this.offBillStmtInsertlist;
        const offtxnSaveData = this.ocdreceiFactory.keyCommitTwo(this.offtxnCommitModel);
        offtxnSaveData.subscribe(resultData => {
            if (resultData) {
                this.saveDisabled = false;
                if (resultData && resultData.sealFlag) {
                    if (resultData.sealFlag === '4') {
                        this.showOne(this.translateService.translate('ocdrecei.printrecipterror'));
                    } else if (resultData.sealFlag === '5') {
                        this.showOne(this.translateService.translate('ocdrecei.errortrustchkaccountstatus'));
                    } else if (resultData.sealFlag === '6') {
                        this.showOne(this.translateService.translate('ocdrecei.errorinsubacctype'));
                    } else if (resultData.sealFlag === '7') {
                        this.showOne(this.translateService.translate('ocdrecei.txntypenotdefined'));
                    } else if (resultData.sealFlag === '8') {
                        this.showOne(this.translateService.translate('ocdrecei.othererrorgltrans'));
                    } else if (resultData.sealFlag === '9') {
                        this.showOne(this.translateService.translate('ocdrecei.othererrortrust'));
                    } else if (resultData.sealFlag === '10') {
                        this.showOne(this.translateService.translate('ocdrecei.othererrorfincanial'));
                    } else if (resultData.sealFlag === '11') {
                        this.showOne(this.translateService.translate('ocdrecei.errorchkaccountstatus'));
                    } else if (resultData.sealFlag === '0') {
                        this.showOne('common.addupdateremoverecordfailed');
                    }
                } else {
                    this.saveDisabled = true;
                    this.disableReportBtn = false;
                    this.disabeTxnType = true;
                    this.disabeTxnEntryAmount = true;
                    this.disableTxnRefNum = true;
                    this.disableInfoNumber = true;
                    this.PrepaidFeeAcntFlag = true;
                    this.isAmountFieldEdit = false;
                    this.offtxnModel.txnId = resultData.txnId;
                    this.offtxnModel.receiptNumber = resultData.receiptNumber;
                    this.receiptNumber = resultData.receiptNumber;
                    this.type = 'success';
                    this.message = this.translateService.translate('ocdrecei.transactioncomplete');
                    this.show();
                    this.getOffenederFeeSectionQuery(this.vHeaderBlockModel.offenderIdDisplay);
                }
            }
        });
    }

    clear() {
        this.clearDisabled = true;
        this.offtxnModel.txnType = undefined;
        this.offtxnModel.txnEntryAmount = undefined;
        this.offtxnModel.txnEntryDesc = undefined;
        this.offtxnModel.txnReferenceNumber = undefined;
        this.offtxnModel.infoNumber = undefined;
        this.offtxnModel.txnId = undefined;
        this.offtxnModel.receiptNumber = undefined;
        this.offtxnModel.sealFlag = undefined;
        this.disabeTxnType = false;
        this.disabeTxnEntryAmount = false;
        this.disableTxnRefNum = false;
        this.disableInfoNumber = false;
        this.PrepaidFeeAcntFlag = false;
        this.prepaidAccntModel = new OffenderTransactions();
        this.prepaidAcntModel = new FeeAccounts();
        this.prepaidAcntSelectedFlag = false;
        this.isAmountFieldEdit = true;
        this.prepaidAmntFlag = false;
        this.txnAmount = undefined;
        this.prepaidAmount = undefined;
        if(this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId){
            this.getOffenederFeeSectionQuery(this.vHeaderBlockModel.offenderIdDisplay);
        } 
        //this.OffFeeGridIndex = 0;
    }

    inInsertable() {
        if (this.offtxnModel.txnType || this.offtxnModel.txnEntryAmount || this.offtxnModel.txnReferenceNumber
            || this.offtxnModel.infoNumber) {
            this.clearDisabled = false;
            this.saveDisabled = false;
        } else {
            this.clearDisabled = true;
            this.saveDisabled = true;
        }
    }

    printReport() {
        if (this.isOffenderFeeDisplay) {
            if( !this.receiptProductionFlag ||  this.receiptProductionFlag === 'N'){
                this.showOne(this.translateService.translate('ocdrecei.printreceripvalidation'),'warn');
                return;
            }
            this.offtxnModel.moduleName = 'OCRORREC';
            this.offtxnModel.sessionId = this.sessionManager.randomid;
            this.offtxnModel.nbtModifyUserId = this.sessionManager.getId();
            this.offtxnModel.receiptNumber = this.receiptNumber;
            this.offtxnModel.caseloadId = this.caseLoadId;
            this.offtxnModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.offtxnModel.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
            const offtxnSaveData = this.ocdreceiFactory.printReportSupv(this.offtxnModel);
            offtxnSaveData.subscribe(data => {
                if (data && data.length > 0 && data[0].report) {
                    const base64pdf = 'data:application/pdf;base64,';
                    const pdf = base64pdf + data[0].report;
                    const win = window.open(pdf);
                    win.document.writeln(`<iframe src="${pdf}" style="width:100%; height:100%"></iframe>`);
                }
            });

        } else {
            this.offtxnModel.moduleName = 'OCDRECEI';
            this.offtxnModel.sessionId = this.sessionManager.randomid;
            const offtxnSaveData = this.ocdreceiFactory.printReport(this.offtxnModel);
            offtxnSaveData.subscribe(data => {
                if (data && data.length > 0 && data[0].report) {
                    const base64pdf = 'data:application/pdf;base64,';
                    const pdf = base64pdf + data[0].report;
                    const win = window.open(pdf);
                    win.document.writeln(`<iframe src="${pdf}" style="width:100%; height:100%"></iframe>`);
                }
            });
        }
    }

    getDocketLovData() {
        const getDocketData = this.ocdreceiFactory.getDocketLovData(this.offtxnModel);
        getDocketData.subscribe(data => {
            if (!(data && data.length > 0)) {
                this.showDocketValidation = true;
            }
        });
    }

    onGenerateOverRideClick = () => {
        if (!this.offtxnModel.rootOffenderId) {
            return;
        }
        if (!this.offtxnModel.txnEntryAmount) {
            this.showOne(this.translateService.translate('ocdrecei.lessthanzerovalidation'));
            return;
        }
        this.dialogService.openLinkDialog('/OCUOVROB', this.offtxnModel, 80).subscribe(result => {
        });
    }

    get calculateAmount(): Number {
        let amountTot = 0;
        if (this.offFeeData && this.offFeeData.length > 0) {
            this.offFeeData.filter(e => (e.amount = e.amount != null ? Number(e.amount) : 0) >= 0).forEach(obj => amountTot = amountTot + Number(obj.amount));
        }
        return amountTot;
    }

    getPaymentObligationCount() {
        const getPaymentObligationCount = this.ocdreceiFactory.getPaymentObligationCount(this.offtxnModel.offenderId);
        getPaymentObligationCount.subscribe(data => {
            if (data && data > 0) {
                this.disablepaymentplan = false;
            } else {
                this.disablepaymentplan = true;
            }
        });
    }

    get disableoverrideobli() {
        if (!this.isOffenderFeeDisplay && this.vHeaderBlockModel && this.vHeaderBlockModel.offenderId) {
            return false;
        } else {
            return true;
        }
    }

    PrepaidAcntChange(event) {
        if (event) {
            this.prepaidAmntFlag = true;
            this.prepaidAcntSelectedFlag = true;
            this.prepaidAcntModel.accountCode = event.accountCode;
        } else {
            this.prepaidAmntFlag = false;
            this.prepaidAcntSelectedFlag = false;
        }
    }

    prepaidAmountKeyDown(event, comp) {
        if (!this.amountFormat.avoidKeys(event, this.prepaidAmount)) {
            event.stopPropagation();
            return false;
        }
    }

    onOffFeeClear = () => {
        this.getOffenederFeeSectionQuery(this.vHeaderBlockModel.offenderIdDisplay);
        return true;
    }

    getbillEndDayPfVal() {
        const serviceObj = this.ocdreceiFactory.getbillEndDayPfVal();
        serviceObj.subscribe(data => {
            if (data === undefined || data === null) {
                this.billEndDay = undefined;
            } else {
                this.billEndDay = data;
                this.billingCycleEndDate = DateFormat.getDate();
                this.billingCycleEndDate = DateFormat.getDate(this.billingCycleEndDate.setDate(this.billEndDay));
                this.billingCycleStartDate = DateFormat.getDate();
                this.billingCycleStartDate = DateFormat.getDate(this.billingCycleStartDate.setDate(this.billEndDay + 1));
                this.billingCycleStartDate = DateFormat.getDate(this.billingCycleStartDate.setMonth(DateFormat.getDate().getMonth() - 1));
                if (DateFormat.getDate().getMonth() === 1) {
                    this.billingCycleStartDate = DateFormat.getDate(this.billingCycleStartDate.setFullYear(DateFormat.getDate().getFullYear() - 1))
                }
            }
        });
    }

    getCasePlanId() {
        const serviceObj = this.ocdreceiFactory.getCasePlanId(this.vHeaderBlockModel);
        serviceObj.subscribe(data => {
            if (data === undefined || data === 0) {
                this.caseplanId = undefined;
            } else {
                this.caseplanId = data;
            }
        });
    }
}
