import {
    Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcidoaccService } from '../service/ocidoacc.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderSubAccounts } from '@inmate/trust/trustaccounts/beans/OffenderSubAccounts';
import { VOffGroupedPaymentPlans } from '@cf/offendertransactions/beans/VOffGroupedPaymentPlans';
import { OffenderDeductions } from '@inmate/trust/trustaccounts/beans/OffenderDeductions';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { FeeAccountProfiles } from '@cf/deductions/beans/FeeAccountProfiles';
@Component({
    selector: 'app-ocidoacc',
    templateUrl: './ocidoacc.component.html'
})

export class OcidoaccComponent implements OnInit {
    caseloadFlag: false;
    msgs: any[] = [];
    offSubaData: OffenderSubAccounts[] = [];
    offSubaDataTemp: OffenderSubAccounts[] = [];
    offSubaModel: OffenderSubAccounts = new OffenderSubAccounts();
    offSubaModelBean: OffenderSubAccounts = new OffenderSubAccounts();
    offSubaIndex = 0;
    offSubaInsertList: OffenderSubAccounts[] = [];
    offSubaUpdatetList: OffenderSubAccounts[] = [];
    offSubaDeleteList: OffenderSubAccounts[] = [];
    paySchData: VOffGroupedPaymentPlans[] = [];
    paySchDataTemp: VOffGroupedPaymentPlans[] = [];
    paySchModel: VOffGroupedPaymentPlans = new VOffGroupedPaymentPlans();
    paySchIndex = 0;
    paySchInsertList: VOffGroupedPaymentPlans[] = [];
    paySchUpdatetList: VOffGroupedPaymentPlans[] = [];
    paySchDeleteList: VOffGroupedPaymentPlans[] = [];
    offBncData: OffenderDeductions[] = [];
    offBncDataTemp: OffenderDeductions[] = [];
    offBncModel: OffenderDeductions = new OffenderDeductions();
    offBncModelBean: OffenderDeductions = new OffenderDeductions();
    offBncIndex = 0;
    offBncInsertList: OffenderDeductions[] = [];
    offBncUpdatetList: OffenderDeductions[] = [];
    offBncDeleteList: OffenderDeductions[] = [];
    paySchColumnDef: any[];
    offBncColumnDef: any[];
    offSubaColumnDef: any[];
    offSubaReadOnly = false;
    paySchReadOnly = false;
    offBncReadOnly = false;
    vHeaderBlockModel: VTrustHeader = new VTrustHeader();
    bouncedFlag: boolean;
    closedAcFlag: boolean;
    offbncPinnedData: any[] = [];
    totalOrgAmount: number;
    totCollectedAmt: number;
    totalOwingAmount: number;
    totBillAmount: number;
    totpaiddAmt: number;
    totalAdjAmount: number;
    totalOwgAmount: number;
    totalBiAmount: number;
    totalBdAmount: number;
    offFeesColumnDef: any[] = [];
    offFeeModel: FeeAccountProfiles = new FeeAccountProfiles();
    offFeeData: FeeAccountProfiles[] = [];
    offFeeModelData: FeeAccountProfiles = new FeeAccountProfiles();
    offFeeIndex = -1;
    offFeePinnedData: any[] = [];
    constructor(private ocidoaccFactory: OcidoaccService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private offenderSearchService: OffenderSearchService) {
        this.paySchColumnDef = [];
        this.offBncColumnDef = [];
        this.offSubaColumnDef = [];
        this.offFeesColumnDef = [];
    }
    ngOnInit() {
        this.offFeeIndex = -1;
        this.vHeaderBlockModel = new VTrustHeader();
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        if (!this.offenderSearchService.selectedOffender || this.offenderSearchService.selectedOffender.offenderBookId === undefined) {
            this.show('common.pleasesearchforvalidoffender');
        }
        this.paySchColumnDef = [
            { fieldName: this.translateService.translate('ocidoacc.paymentplanfield'), field: 'paymentPlanId', editable: false,
             width: 150 },
            { fieldName: this.translateService.translate('common.caseinfo'), field: 'informationNumber', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocidoacc.grpid'), field: 'groupId', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.duedate'), field: 'dueDateValue', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.amount'), field: 'amount', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocidoacc.balanceowing'), field: 'balOwing', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocidoacc.arrears'), field: 'arrears', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocidoacc.dayslate'), field: 'daysLate', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.reason'), field: 'reason', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocidoacc.closed'), field: 'paymentClosedFlag', editable: false, width: 150,
             datatype: 'checkbox' },


        ];
        this.offBncColumnDef = [
            { fieldName: this.translateService.translate('common.obligationid'), field: 'offenderDeductionId',
             editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.type'), field: 'deductionType', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.description'), field: 'deductionDesc', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.date'), field: 'effectiveDate', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocidoacc.originalamount'), field: 'orgAmount', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.totalcollected'), field: 'totCollected', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.totalowing'), field: 'totalOwing', editable: false, width: 150 },
            { fieldName: '', field: 'but_ben', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocidoacc.tbd'), field: 'tbdFlag', editable: false, width: 150, datatype: 'checkbox' },
            { fieldName: this.translateService.translate('ocidoacc.collect'), field: 'collectAgencyFlag', editable: false,
             width: 150, datatype: 'checkbox' },
        ];
        this.offSubaColumnDef = [
            { fieldName: this.translateService.translate('common.accountcode'), field: 'trustAccountCode', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.type'), field: 'subAccountType', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.description'), field: 'description', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.balance'), field: 'balance', editable: false, width: 150 },
        ];
        this.offFeesColumnDef = [
            {
                fieldName: this.translateService.translate('ocidoacc.caseload'), field: 'code',
                editable: false, width: 150, datatype: 'text'
              },
            {
              fieldName: this.translateService.translate('ocidoacc.supervisionperiod'), field: 'supervisionPeriod',
              editable: false, width: 150, datatype: 'text',
            },
           
            {
              fieldName: this.translateService.translate('ocidoacc.feeid'), field: 'offenderFeeId', editable: false,
              datatype: 'number', width: 150
            },
            {
              fieldName: this.translateService.translate('ocidoacc.feecode'), field: 'nbtCode', editable: false,
              datatype: 'text', width: 150
            },
            {
              fieldName: this.translateService.translate('ocidoacc.amount'), field: 'amount', editable: false,
              datatype: 'number', width: 150
            },
            {
              fieldName: this.translateService.translate('ocidoacc.frequency'), field: 'frequencyTypeDesc', editable: false,
              datatype: 'text', width: 150
            },
            {
              fieldName: this.translateService.translate('ocidoacc.code'), field: 'nbtFrequency', editable: false, width: 150,
              maxlength: 240, datatype: 'text'
            },
            {
              fieldName: this.translateService.translate('ocidoacc.billingday'), field: 'dayOfMonth', editable: false,
              width: 150, datatype: 'number'
            },
            {
              fieldName: this.translateService.translate('ocidoacc.status'), field: 'feeActStatus', editable: false,
              width: 150
            },
            {
                fieldName: this.translateService.translate('ocidoacc.billeamount'), field: 'billAmount', editable: false,
                width: 150
              },
              {
                fieldName: this.translateService.translate('ocidoacc.billincrease'), field: 'billIncreaseAmount', editable: false,
                width: 150
              },
              {
                fieldName: this.translateService.translate('ocidoacc.billdecrease'), field: 'billDecreaseAmount', editable: false,
                width: 150
              },
            {
              fieldName: this.translateService.translate('ocidoacc.paidamount'), field: 'paidAmount', editable: false,
              width: 150
            },
            {
                fieldName: this.translateService.translate('ocidoacc.adjusted'), field: 'adjustAmount', editable: false,
                width: 150
              },
            {
              fieldName: this.translateService.translate('ocidoacc.owing'), field: 'owingAmount',
              width: 150
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
    onRowClickoffsuba(event) {
        if (event) {
            this.offSubaModelBean = event;
        }
    }
    onRowClickpaysch(event) {
        if (event) {
            this.paySchModel = event;
            this.offBncModel = new OffenderDeductions();
            this.offBncData = [];
            this.offBncModel.groupId = this.paySchModel.groupId;
            this.offBncModel.informationNumber = this.paySchModel.informationNumber;
            this.offSubaModel.informationNumber = this.paySchModel.informationNumber;
            this.offBncModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
            this.offBncExecuteQuery();
        } else {
            this.offBncModel = new OffenderDeductions();
            this.offBncData = [];
        }
    }
    onRowClickoffbnc(event) {
        if (event) {
            this.offBncModelBean = event;
        }
    }
    get disableLnchBtn() {
        if (!this.vHeaderBlockModel) {
            return true;
        } else {
            return false;
        }
    }
    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.offbncPinnedData = [];
            this.offSubaModel = new OffenderSubAccounts();
            this.offSubaData = [];
            this.paySchData = [];
            this.paySchModel = new VOffGroupedPaymentPlans();
            this.offSubaModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
            this.offSubaModel.caseloadId = this.sessionManager.currentCaseLoad;
            this.paySchModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
            this.offFeeData = [];
            this.offFeeModel = new FeeAccountProfiles();
            this.offFeePinnedData = [];
            this.offSubaExecuteQuery();
            this.paySchExecuteQuery();
            this.sysPflExecuteQuery();
            this.offFeeExecuteQuery();
        } else {
            this.offbncPinnedData = [];
            this.offSubaModel = new OffenderSubAccounts();
            this.offSubaData = [];
            this.paySchData = [];
            this.paySchModel = new VOffGroupedPaymentPlans();
            this.offBncData = [];
            this.offBncModel = new OffenderDeductions();
            this.bouncedFlag = false;
            this.closedAcFlag = false;
            this.offFeeData = [];
            this.offFeeModel = new FeeAccountProfiles();
            this.offFeePinnedData = [];
            this.offFeeModelData = new FeeAccountProfiles();
        }
    }
    sysPflExecuteQuery() {
        const sysPflResult = this.ocidoaccFactory.
            sysPflExecuteQuery(this.vHeaderBlockModel.rootOffenderId);
        sysPflResult.subscribe(result => {
            if (result > 0) {
                this.bouncedFlag = true;
            } else {
                this.bouncedFlag = false;
            }
        });
        const closeFlagResult = this.ocidoaccFactory.
            getActClosedFlag(this.vHeaderBlockModel.rootOffenderId, this.sessionManager.currentCaseLoad);
        closeFlagResult.subscribe(closeFlag => {
            if (closeFlag === 'Y') {
                this.closedAcFlag = true;
            } else {
                this.closedAcFlag = false;
            }
        });
    }
    offSubaExecuteQuery() {
        const offSubaResult = this.ocidoaccFactory.
            offSubaExecuteQuery(this.offSubaModel);
        offSubaResult.subscribe(offSubaResultList => {
            if (offSubaResultList.length === 0) {
                this.offSubaData = [];
            } else {
                offSubaResultList.forEach(element => {
                    if (element.balance || element.balance === 0 || element.balance === null) {
                        element.balance = Number(element.balance).toFixed(2);
                    }
                });
                this.offSubaData = offSubaResultList;
                this.offSubaModel = offSubaResultList[0];
            }
        });
    }

    // execute query
    paySchExecuteQuery() {
        const serviceObj = this.ocidoaccFactory.
            paySchExecuteQuery(this.paySchModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
            } else {
                data.forEach(element => {
                    element.paymentClosedFlag = element.paymentClosedFlag === 'Y' ? true : false;
                    if (element.dueDate) {
                        element.dueDateValue = DateFormat.formatMDY(DateFormat.getDate(element.dueDate));
                    }
                    if (element.amount || element.amount === 0 || element.amount === null) {
                        element.amount = Number(element.amount).toFixed(2);
                    }
                    if (element.balOwing || element.balOwing === 0 || element.balOwing === null) {
                        element.balOwing = Number(element.balOwing).toFixed(2);
                    }
                    if (element.arrears || element.arrears === 0 || element.arrears === null) {
                        element.arrears = Number(element.arrears).toFixed(2);
                    }
                });
                this.paySchData = data;
                this.paySchModel = this.paySchData[0];
            }
        });
    }

    offBncExecuteQuery() {
        const offBncResult = this.ocidoaccFactory.
            offBncExecuteQuery(this.offBncModel);
        offBncResult.subscribe(offBncResultList => {
            if (offBncResultList.length === 0) {
                this.offBncData = [];
            } else {
                this.totalOrgAmount = 0;
                this.totCollectedAmt = 0;
                this.totalOwingAmount = 0;
                offBncResultList.forEach(element => {
                    element.effectiveDate = DateFormat.format(element.effectiveDate);
                    element.tbdFlag = element.tbdFlag === 'Y' ? true : false;
                    element.collectAgencyFlag = element.collectAgencyFlag === 'Y' ? true : false;
                    if (element.totCollected || element.totCollected === 0 || element.totCollected === null) {
                        element.totCollected = Number(element.totCollected).toFixed(2);
                    }
                    if (element.orgAmount || element.orgAmount === 0 || element.orgAmount === null) {
                        element.orgAmount = Number(element.orgAmount).toFixed(2);
                    }
                    if (element.totalOwing || element.totalOwing === 0 || element.totalOwing === null) {
                        element.totalOwing = Number(element.totalOwing).toFixed(2);
                    }
                    if (element.unlimited === 'Unlimited') {
                        element.orgAmount = 'Unlimited';
                        element.totalOwing = 'Unlimited';
                    }
                    if (element.orgAmount) {
                        this.totalOrgAmount = Number(this.totalOrgAmount) + Number(element.orgAmount);
                    }
                    if (element.totCollected) {
                        this.totCollectedAmt = Number(this.totCollectedAmt) + Number(element.totCollected);
                    }
                    if (element.totalOwing) {
                        this.totalOwingAmount = Number(this.totalOwingAmount) + Number(element.totalOwing);
                    }
                    if (element.unlimited === 'Unlimited') {
                        const num = 0;
                        const alltot = {
                            effectiveDate: this.translateService.translate('common.totalss'),
                            orgAmount: Number(num).toFixed(2),
                            totCollected: Number(this.totCollectedAmt).toFixed(2),
                            totalOwing: Number(num).toFixed(2)
                        };
                        const totbal = [];
                        totbal.push(alltot);
                        this.offbncPinnedData = totbal;
                        if(this.offbncPinnedData.length>0){
                            this.offbncPinnedData.forEach(element => {
                                if(element.orgAmount === 'NaN'){
                                    element.orgAmount = 'Unlimited';
                                }
                                if(element.totalOwing === 'NaN'){
                                    element.totalOwing = 'Unlimited';
                                }
                            });
                        }
                    } else {
                    const alltot = {
                        effectiveDate: 'Totals',
                        orgAmount: Number(this.totalOrgAmount).toFixed(2),
                        totCollected: Number(this.totCollectedAmt).toFixed(2),
                        totalOwing: Number(this.totalOwingAmount).toFixed(2)
                    };
                    const totbal = [];
                    totbal.push(alltot);
                    this.offbncPinnedData = totbal;
                    if(this.offbncPinnedData.length>0){
                        this.offbncPinnedData.forEach(element => {
                            if(element.orgAmount === 'NaN'){
                                element.orgAmount = 'Unlimited';
                            }
                            if(element.totalOwing === 'NaN'){
                                element.totalOwing = 'Unlimited';
                            }
                        });
                    }
                }
                });
                this.offBncData = offBncResultList;
                this.offBncModel = offBncResultList[0];
            }
        });
    }
    afterCppClosedEvent() {
        this.offSubaExecuteQuery();
        this.paySchExecuteQuery();
        this.sysPflExecuteQuery();
    }
    offFeeExecuteQuery() {
        this.offFeeModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const offFeeResult = this.ocidoaccFactory.
            offFeeExecuteQuery(this.offFeeModel);
            offFeeResult.subscribe(offFeeResultList => {
            if (offFeeResultList.length === 0) {
                this.offFeeData = [];
                this.offFeeIndex = -1;
                this.offFeeModelData = new FeeAccountProfiles();
            } else {
                this.offFeeIndex = 0;
                this.totBillAmount = 0;
                this.totpaiddAmt = 0;
                this.totalAdjAmount = 0;
                this.totalOwgAmount = 0;
                this.totalBiAmount = 0;
                this.totalBdAmount = 0;
                offFeeResultList.forEach(element => {
                    element.supervisionPeriod = this.vHeaderBlockModel.bookingNo;
                    if (element.billAmount || element.billAmount === 0 || element.billAmount === null) {
                        element.billAmount = Number(element.billAmount).toFixed(2);
                    }
                    if (element.paidAmount || element.paidAmount === 0 || element.paidAmount === null) {
                        element.paidAmount = Number(element.paidAmount).toFixed(2);
                    }
                    if (element.adjustAmount || element.adjustAmount === 0 || element.adjustAmount === null) {
                        element.adjustAmount = Number(element.adjustAmount).toFixed(2);
                    }
                    if (element.owingAmount || element.owingAmount === 0 || element.owingAmount === null) {
                        element.owingAmount = Number(element.owingAmount).toFixed(2);
                    }
                    if (element.billIncreaseAmount || element.billIncreaseAmount === 0 || element.billIncreaseAmount === null) {
                        element.billIncreaseAmount = Number(element.billIncreaseAmount).toFixed(2);
                    }
                    if (element.billDecreaseAmount || element.billDecreaseAmount === 0 || element.billDecreaseAmount === null) {
                        element.billDecreaseAmount = Number(element.billDecreaseAmount).toFixed(2);
                    }
                   
                    if (element.billAmount) {
                        this.totBillAmount = Number(this.totBillAmount) + Number(element.billAmount);
                    }
                    if (element.paidAmount) {
                        this.totpaiddAmt = Number(this.totpaiddAmt) + Number(element.paidAmount);
                    }
                    if (element.adjustAmount) {
                        this.totalAdjAmount = Number(this.totalAdjAmount) + Number(element.adjustAmount);
                    }
                    if (element.owingAmount) {
                        this.totalOwgAmount = Number(this.totalOwgAmount) + Number(element.owingAmount);
                    }
                    if (element.billIncreaseAmount) {
                        this.totalBiAmount = Number(this.totalBiAmount) + Number(element.billIncreaseAmount);
                    }
                    if (element.billDecreaseAmount) {
                        this.totalBdAmount = Number(this.totalBdAmount) + Number(element.billDecreaseAmount);
                    }
                    const alltot = {
                        feeActStatus: 'Totals',
                        billAmount: Number(this.totBillAmount).toFixed(2),
                        billIncreaseAmount: Number(this.totalBiAmount).toFixed(2),
                        billDecreaseAmount: Number(this.totalBdAmount).toFixed(2),
                        paidAmount: Number(this.totpaiddAmt).toFixed(2),
                        adjustAmount: Number(this.totalAdjAmount).toFixed(2),
                        owingAmount: Number(this.totalOwgAmount).toFixed(2)
                    };
                    const totbal = [];
                    totbal.push(alltot);
                    this.offFeePinnedData = totbal;
                });
                this.offFeeData = offFeeResultList;
            }
        });
    }

    onRowClickoffFeeAcc (event) {
        if(event) {
         this.offFeeModelData = event;
        } else {
            this.offFeeModelData = new FeeAccountProfiles();
        }
    }
    get childButtonDisable() {
        if (this.offFeeModelData.feeCode) {            
              return false;
        }
       return true;
  }
}
