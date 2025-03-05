import { AfterViewInit, Component, OnInit } from '@angular/core';

import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { TranslateService } from '@common/translate/translate.service';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderDeductions } from '@inmate/trust/trustaccounts/beans/OffenderDeductions';
import { OffenderSubAccounts } from '@inmate/trust/trustaccounts/beans/OffenderSubAccounts';
import { OffenderTransactions } from '../beans/OffenderTransactions';
import { OtidtaccService } from '../service/otidtacc.service';
@Component({
    selector: 'app-otidtacc',
    templateUrl: './otidtacc.component.html'
})

export class OtidtaccComponent implements OnInit, AfterViewInit {
    holdBalanceTemp = false;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    offtraData: OffenderTransactions [] = [];
    offtraModel: OffenderTransactions = new OffenderTransactions();
    offsubaData: OffenderSubAccounts [] = [];
    offsubaModel: OffenderSubAccounts = new OffenderSubAccounts();
    offsubaModelTemp: OffenderSubAccounts = new OffenderSubAccounts();
    offsubaIndex = -1;
    offDedColumnDef: any[];
    offSubaColumnDef: any[];
    offTxnColumnDef: any[];
    offdedData: OffenderDeductions [] = [];
    offdedModel: OffenderDeductions = new OffenderDeductions();
    offdedIndex = -1;
    calcaccountbalancesRg: any[] = [];
    offsubaPinnedData: any[] = [];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    creditTotal: any;
    creditPaid: any;
    creditWriteOff: any;
    creditOwing: any;
    fixedTotal: any;
    fixedPaid: any;
    fixedOwing: any;
    drvCurrentBal: number;
    drvCurrentBalTwo: number;
    drvCurrentBalThree: number;
    indigentFlag: any;
    accountClosedFlag: any;
    acntClosedFlag: any;
    nextPageDisable: boolean;
    drvBal: any;
    drvTwoBal: any;
    drvCurrentBalThreeAny: any;
    drvCurThree: string;
    constructor(private otidtaccFactory: OtidtaccService,
         public translateService: TranslateService,
         private offenderSearchService: OffenderSearchService,
         private sessionManager: UserSessionManager,
         private amountFormat: AmountFormatUtil) {
        this.offSubaColumnDef = [];
        this.offDedColumnDef = [];
        this.offTxnColumnDef = [];
    }
    ngOnInit() {
        this.nextPageDisable = true;
        this.drvCurrentBal = 0;
        this.drvCurrentBalTwo = 0;
        this.drvCurrentBalThree = 0;
        this.vHeaderBlockModel = new VHeaderBlock();
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.offSubaColumnDef = [
            { fieldName: this.translateService.translate('otidtacc.accountcode'), field: 'trustAccountCode', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.type'), field: 'subAccountType', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.description'), field: 'description', editable: false, width: 150 },
            { fieldName: this.translateService.translate('otidtacc.totalbalance'), field: 'drvAvailableBalance',
             editable: false, width: 150,datatype: 'number', format: '1.2-2' ,rightAlign: true},
            { fieldName: this.translateService.translate('otidtacc.availablebalance'), field: 'balance', editable: false, width: 150,datatype: 'number', format: '1.2-2' ,rightAlign: true},
            { fieldName: this.translateService.translate('otidtacc.balanceonhold'), field: 'holdBalance', editable: false, width: 150,datatype: 'number', format: '1.2-2',rightAlign: true,
             },
            { fieldName: this.translateService.translate('otidtacc.indigentsince'), field: 'indDate',
             datatype: 'date', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.daysremaining'), field: 'daysRemain', editable: false, width: 150 },
        ];
        this.offDedColumnDef = [
            { fieldName: this.translateService.translate('common.type'), field: 'deductionType', editable: false, width: 150 },
            { fieldName:  this.translateService.translate('common.description'), field: 'deductionDesc', editable: false, width: 150 },
            { fieldName: this.translateService.translate('otidtacc.created'), field: 'caseloadId', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.infonumber'), field: 'informationNumber', editable: false, width: 150 },
            { fieldName: this.translateService.translate('otidtacc.originalamt'), field: 'maxTotalAmount', editable: false, width: 150,datatype: 'number', format: '1.2-2',rightAlign: true },
            { fieldName: this.translateService.translate('otidtacc.totalpaid'), field: 'deductionAmount', editable: false, width: 150,datatype: 'number', format: '1.2-2',rightAlign: true },
            { fieldName: this.translateService.translate('otidtacc.writeoffamt'), field: 'adjustmentAmount', editable: false, width: 150,datatype: 'number', format: '1.2-2',rightAlign: true },
            { fieldName: this.translateService.translate('otidtacc.totalowing'), field: 'maxMonthlyAmount', editable: false, width: 150,datatype: 'number', format: '1.2-2',rightAlign: true },
            { fieldName: this.translateService.translate('otidtacc.fix'), field: 'fixedFlag', datatype: 'checkbox',
             editable: false, width: 150 },
            { fieldName: this.translateService.translate('otidtacc.mth'), field: 'mthFlag', datatype: 'checkbox',
             editable: false, width: 150 },
            { fieldName: this.translateService.translate('otidtacc.act'), field: 'actFlag', datatype: 'checkbox',
             editable: false, width: 150 },
             { fieldName: '', field: 'pButton', datatype: 'launchbutton', link: '/OTUPAYIN',
             editable: true, width: 150, data: 'row', updateField: 'row', modal: true, dialogWidth: 75}
        ];
        if ( !this.vHeaderBlockModel ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
            this.show();
        }
    }
    /**
     * method is used to show popup messages.
     */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    ngAfterViewInit() {
        this.setLeft('Indigent', 'Account', 'Disb');
    }
    setLeft(...ids) {
        for (const id of ids) {
            const element = document.getElementById(id);
            if (element) {
                const classes = element.getElementsByClassName('mat-checkbox-layout');
                if (classes && classes.length > 0) {
                    const cssClass = classes[0];
                    cssClass['style']['textAlign'] = 'left';
                }
            }
        }
    }
  /**
   * event is fired when click on row in the grid of Offender Sub Accounts Block.
   * @param event
   */
    onRowClickoffsuba(event) {
        if (event) {
            this.offsubaModel = new OffenderSubAccounts();
            this.offsubaModel = event;
        }
    }
    /**
     * event is fired when click on row in the grid of Offender Payables.
     * @param event
     */
    onRowClickoffded(event) {
        if (event) {
            this.offdedModel = new OffenderDeductions();
            this.offdedModel = event;

        }
    }
    /**
     * event is fired when search or row select in search block.
     * @param offender
     */
    onOffenderChange(offender) {
        if (offender) {
            this.vHeaderBlockModel = offender;
            if(this.vHeaderBlockModel.offenderBookId) {
            this.nextPageDisable = false;
            this.offsubaData = [];
            this.indigentFlag = undefined;
            this.accountClosedFlag = undefined;
            this.acntClosedFlag = undefined;
            this.offdedData = [];
            this.offsubaPinnedData = [];
            this.creditTotal = undefined;
            this.creditPaid = undefined;
            this.creditWriteOff = undefined;
            this.creditOwing = undefined;
            this.fixedTotal = undefined;
            this.fixedPaid = undefined;
            this.fixedOwing = undefined;
            this.vHeaderBlockModel = offender;
            this.offdedModel = new OffenderDeductions();
            this.offsubaModel = new OffenderSubAccounts();
            this.offsubaModelTemp = new OffenderSubAccounts();
            this.offtraModel = new OffenderTransactions();
            this.offdedModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
            this.offtraModel.txnType = this.vHeaderBlockModel.offenderIdDisplay;
            this.offtraModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
            this.offtraModel.receiptNumber = this.vHeaderBlockModel.bookingNo;
            this.offtraModel.sealFlag = this.vHeaderBlockModel.lastName + ', ' + this.vHeaderBlockModel.firstName;
            this.offtraModel.caseloadId = this.sessionManager.currentCaseLoad;
            this.offdedModel.caseloadId = this.sessionManager.currentCaseLoad;
            this.offdedModel.deductionType = this.sessionManager.currentCaseLoadType;
            this.offsubaModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
            this.offsubaModel.caseloadId = this.sessionManager.currentCaseLoad;
            this.offsubaModel.description = this.vHeaderBlockModel.agyLocId;
            this.offsubaModelTemp.offenderId = this.vHeaderBlockModel.rootOffenderId;
            this.offsubaModelTemp.caseloadId = this.vHeaderBlockModel.agyLocId;
            this.offsubaModelTemp.sealFlag = this.sessionManager.currentCaseLoad;
            this.populateCreditObligation();
            this.offDedExecuteQuery();
            this.offenderSubAccountsExecuteQuery();
            }
        } else {
            this.offsubaData = [];
            this.indigentFlag = undefined;
            this.accountClosedFlag = undefined;
            this.acntClosedFlag = undefined;
            this.offdedData = [];
            this.offsubaPinnedData = [];
            this.creditTotal = undefined;
            this.creditPaid = undefined;
            this.creditWriteOff = undefined;
            this.creditOwing = undefined;
            this.fixedTotal = undefined;
            this.fixedPaid = undefined;
            this.fixedOwing = undefined;
            this.nextPageDisable = true;
        }
    }
    /**
     * Method is used to get the data from DB.
     * param offsubaModelTemp.
     */
    populateCreditObligation() {
        const offTrustService = this.otidtaccFactory.populateCreditObligation(this.offsubaModelTemp);
        offTrustService.subscribe(offTrustData => {
            if (offTrustData) {
                this.indigentFlag = offTrustData.indigentFlag === 'Y' ? true : false;
                this.accountClosedFlag = offTrustData.accountClosedFlag === 'Y' ? true : false;
                this.acntClosedFlag = offTrustData.acntClosedFlag === 'Y' ? true : false;
                this.creditTotal = this.amountFormat.amountFormat(offTrustData.maxTotalAmount);
                this.creditPaid =  this.amountFormat.amountFormat(offTrustData.deductionAmount);
                this.creditWriteOff = this.amountFormat.amountFormat(offTrustData.adjustmentAmount);
                this.creditOwing = (offTrustData.maxTotalAmount - offTrustData.deductionAmount
                    - offTrustData.adjustmentAmount).toFixed(2);
                    if (this.creditOwing === '-0.00') {
                        this.creditOwing = '0.00';

                    }
                    this.creditOwing = this.amountFormat.amountFormat(this.creditOwing);
                this.fixedTotal = this.amountFormat.amountFormat(offTrustData.maxMonthlyAmount);
                this.fixedPaid = this.amountFormat.amountFormat(offTrustData.maxRecursiveAmount);
                this.fixedOwing = (offTrustData.maxMonthlyAmount - offTrustData.maxRecursiveAmount).toFixed(2);
                this.fixedOwing = this.amountFormat.amountFormat(this.fixedOwing);

            }

        });
    }
    /**
     * Method is used to get the data from DB and displays the data in the grid.
     */
    offDedExecuteQuery() {
             const offdedResult = this.otidtaccFactory.offDedExecuteQuery(this.offdedModel);
                 offdedResult.subscribe(offdedResultList => {
                if (offdedResultList.length === 0) {
                    this.offdedData = [];
                } else {
                    this.offdedData = [];
                    for (let i = 0; i < offdedResultList.length; i++) {
                        offdedResultList[i].fixedFlag  = offdedResultList[i].fixedFlag === 'Y' ? true : false;
                        offdedResultList[i].mthFlag  = offdedResultList[i].mthFlag === 'Y' ? true : false;
                        offdedResultList[i].actFlag  = offdedResultList[i].actFlag === 'Y' ? true : false;
                        offdedResultList[i].maxTotalAmount = offdedResultList[i].maxTotalAmount !== null ?
                         offdedResultList[i].maxTotalAmount.toFixed(2) : 0.00;
                         if (offdedResultList[i].maxTotalAmount === 0) {
                            offdedResultList[i].maxTotalAmount = null;

                         }
                        offdedResultList[i].deductionAmount = offdedResultList[i].deductionAmount !== null ?
                        offdedResultList[i].deductionAmount.toFixed(2) : 0.00;
                        offdedResultList[i].adjustmentAmount = offdedResultList[i].adjustmentAmount !== null ?
                         offdedResultList[i].adjustmentAmount.toFixed(2) : 0.00;
                        if (offdedResultList[i].unlimited === 'UNLIMITED') {
                            offdedResultList[i].maxMonthlyAmount =  'UNLIMITED';
                        } else {
                            offdedResultList[i].maxMonthlyAmount = offdedResultList[i].maxMonthlyAmount != null ?
                            offdedResultList[i].maxMonthlyAmount.toFixed(2) : 0.00;
                        }
                        offdedResultList[i].pButton = 'P';
                    }
                    this.offdedData = offdedResultList;
                    this.offdedModel = this.offdedData[0];
                    this.offdedIndex = 0;
                }
            });

    }
    /**
    * Method is used to get the data from DB and displays the data in the grid.
    */
    offenderSubAccountsExecuteQuery() {
        const serviceObj = this.otidtaccFactory.offSubaExecuteQuery(this.offsubaModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.offsubaData = [];
            } else {
                this.offsubaData = [];
                this.drvCurrentBal = 0;
                this.drvCurrentBalTwo = 0;
                this.drvCurrentBalThree = 0;
                this.holdBalanceTemp = false;
                for (let i = 0; i < data.length; i++) {
                    data[i].drvAvailableBalance = (data[i].balance + data[i].holdBalance).toFixed(2);
                    data[i].balance = data[i].balance !== null ? data[i].balance.toFixed(2) : undefined;
                    data[i].holdBalance = data[i].holdBalance !== null ? data[i].holdBalance.toFixed(2) : undefined;
                    this.drvCurrentBal = Number(this.drvCurrentBal) + Number(data[i].drvAvailableBalance);
                    this.drvCurrentBalTwo = Number(this.drvCurrentBalTwo) + Number(data[i].balance);
                    if (data[i].holdBalance) {
                        this.holdBalanceTemp = true;
                        this.drvCurrentBalThree = Number(this.drvCurrentBalThree) + Number(data[i].holdBalance);
                    }
                    if (String(data[i].holdBalance).startsWith('-')) {
                        data[i].holdBalance = '<' +   Math.abs(Number(data[i].holdBalance)).toFixed(2)  + '>';
                    }
                     if (String(this.drvCurrentBalThree).startsWith('-')) {
                        const drvBal =  '<' +   Math.abs(Number(this.drvCurrentBalThree)).toFixed(2)  + '>';
                        this.drvCurThree = drvBal;
                        if (this.drvCurThree === '0.00') {
                            this.drvCurThree = null;
                        }
                    } else {
                        if (data[i].holdBalance) {
                            this.drvCurThree = Number(this.drvCurrentBalThree).toFixed(2);

                        }
                    }
                    if (!data[i].indDate) {
                        data[i].daysRemain = undefined;
                    }
                    if (data[i].drvAvailableBalance < 0 && data[i].drvAvailableBalance !== 0) {
                        data[i].drvAvailableBalance = '<' +   Math.abs(Number(data[i].drvAvailableBalance)).toFixed(2)  + '>';

                    }
                    if (data[i].balance < 0 && data[i].balance !== 0) {
                        data[i].balance = '<' +   Math.abs(Number(data[i].balance)).toFixed(2)  + '>';

                    }
                }
                if (!this.holdBalanceTemp) {
                    this.drvCurrentBalThree = undefined;
                }
                if (this.drvCurrentBal < 0 && this.drvCurrentBal !== 0) {
                    this.drvBal = '<' +  Math.abs(Number(this.drvCurrentBal)).toFixed(2) + '>';
                    this.drvCurrentBal = this.drvBal;
                }
                if (this.drvCurrentBalTwo < 0 && this.drvCurrentBalTwo !== 0) {
                   this.drvTwoBal = '<' + Math.abs(Number(this.drvCurrentBalTwo)).toFixed(2) + '>';
                   this.drvCurrentBalTwo  = this.drvTwoBal;


                }
                const alltot = {
                    description: 'Totals',
                    drvAvailableBalance:  Number(this.drvCurrentBal).toFixed(2),
                    balance: Number(this.drvCurrentBalTwo).toFixed(2),
                    holdBalance: this.drvCurThree  ?
                    Number(this.drvCurThree).toFixed(2) : undefined
                };
                const totbal = [];
                totbal.push(alltot);
                this.offsubaPinnedData = totbal;
                this.offtraModel.currentBalance = Number(this.offsubaPinnedData[0].balance);
                this.offtraModel.holdNumber = this.offsubaPinnedData[0].holdBalance !== undefined ?
                 Number(this.offsubaPinnedData[0].holdBalance) : 0.00;
                this.offsubaData = data;
                this.offsubaModel = this.offsubaData[0];
                this.offsubaIndex = 0;
            }
        });
    }
}
