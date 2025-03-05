import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OffFeeBills } from '../beans/OffFeeBills';
import { OffFeeBillTransactions } from '../beans/OffFeeBillTransactions';
import { OcubadjsService } from '../service/ocubadjs.service';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';
import { OffFeeBillTransactionsCommitBean } from '../beans/OffFeeBillTransactionsCommitBean';
import { OcdreceiService } from '@cf/offendertransactions/service/ocdrecei.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { offBillingStatements } from '@cf/offendertransactions/beans/offBillingStatements';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
@Component({
    selector: 'app-ocubadjs',
    templateUrl: './ocubadjs.component.html'
})

export class OcubadjsComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    @ViewChild('fodGrid', { static: true }) fodGrid: any;
    msgs: any[] = [];
    feeOverdDetColumnDef: any[] = [];

    offFeeBillDetModel: OffFeeBillTransactions = new OffFeeBillTransactions();
    offFeeBillDetSearModel: OffFeeBillTransactions = new OffFeeBillTransactions();
    offFeeBillDetInputModel: OffFeeBillTransactions = new OffFeeBillTransactions();
    offFeeBillDetInputModelTemp: OffFeeBillTransactions = new OffFeeBillTransactions();
    offFeeBillTransSaveModel: OffFeeBillTransactions = new OffFeeBillTransactions();
    offdedData: OffFeeBillTransactions[] = [];
    fodIndex: number;
    txnType: string;
    amount: number;
    adjustAmount: any;
    vHeaderBlockModelData: VHeaderBlock = new VHeaderBlock();
    offFeeBillTransInsertList: OffFeeBillTransactions[] = [];
    offFeeBillTransUpdatetList: OffFeeBillTransactions[] = [];
    offFeeBillTransDeleteList: OffFeeBillTransactions[] = [];
    offFeeBillTransCommitModel: OffFeeBillTransactionsCommitBean = new OffFeeBillTransactionsCommitBean();
    billAdjInc= false;
    savedisabled: boolean;
    txnUsage: any;
    caseplanId: any;
    offBillStmtModel: offBillingStatements = new offBillingStatements();
    offBillStmtInsertlist: offBillingStatements[] = [];
    billEndDay: any;
    billingCycleEndDate: Date;
    billingCycleStartDate: Date;
    constructor(private ocubadjsFactory: OcubadjsService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private amountFormat: AmountFormatUtil, private ocdreceiFactory: OcdreceiService) {

    }
    ngOnInit() {
        this.adjustAmount = undefined;
        this.savedisabled = true;
        this.feeOverdDetColumnDef = [];
        this.feeOverdDetColumnDef = [
            {
                fieldName: this.translateService.translate('ocubadjs.billnumber'), datatype: 'text',
                field: 'billId', editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate('ocubadjs.adjustdate'), field: 'billTxnDatetime', editable: false, datatype: 'date',
                width: 150
            },

            {
                fieldName: this.translateService.translate('ocubadjs.billamount'), field: 'adjustmentAmountTot', editable: true,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true, rightAlign: true,
            },

            {
                fieldName: this.translateService.translate('ocubadjs.adjustamount'), field: 'billTxnAmount', editable: true,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, strictFP: true,  rightAlign: true,
            },
            {
                fieldName: this.translateService.translate('ocubadjs.adjustedbillamount'), field: 'billOverrideIncreaseDecAmount', editable: true,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true, rightAlign: true,
            },
            {
                fieldName: this.translateService.translate('ocubadjs.comments'), datatype: 'text',
                field: 'billTxnComment', editable: true, width: 150
            },

        ];
        this.getbillEndDayPfVal();
        this.getCasePlanId();
        this.billAdjustDetailsExecuteQuery();
    }




    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    isNull(value) {
        return value === null || value === undefined || value === '';
    }

    onRowClickFod(event) {
        if (event) {
            //this.fodModel = event;    
        }
    }


    billAdjustDetailsExecuteQuery() {
        if (this.dialog.data.billId) {
            this.offFeeBillDetSearModel = new OffFeeBillTransactions();
            this.offFeeBillDetSearModel.billId = this.dialog.data.billId;
            this.offFeeBillDetSearModel.adjustmentAmountTot = this.dialog.data.billGenerateAmount;
            const result = this.ocubadjsFactory.billAdjustDetailsExecuteQuery(this.offFeeBillDetSearModel);
            result.subscribe(data => {
                if (data.length === 0) {
                    this.offdedData = [];
                } else {
                    data.forEach(element => {
                        if(element.txnUsage == 'BD'){
                            element.billTxnAmount = -element.billTxnAmount;
                        }
                    });
                    this.offdedData = data;
                    this.offFeeBillDetModel = data[0];
                    this.offFeeBillDetInputModelTemp = data[data.length-1];
                    this.offFeeBillDetInputModel = new OffFeeBillTransactions();
                    this.adjustAmount = undefined;
                    // this.fodIndex = 0;
                }
            });
        }
    }

    amountKeyDown(event, comp) {
        if (!this.amountFormat.avoidKeys(event, this.adjustAmount)) {
            event.stopPropagation();
            return false;
        }
    }
    validMsg(amount) {
        if (!amount.value) {
            amount.value = 0;
        }
        // this.amountFormat.precisionFlot(amount);
        this.amountFormat.amountFormatEvent(amount);
        this.savedisabled = false;
    }

    

    saveBillAdjustdDetCommit = () => {
        this.offFeeBillTransInsertList  = [];
        this.offFeeBillTransUpdatetList = [];
        this.offFeeBillTransDeleteList  = [];
        this.offFeeBillTransCommitModel.insertList = [];
        if(!this.offFeeBillDetInputModel.adjustmentType){
            this.show(this.translateService.translate('ocubadjs.adjustmenttypemustbeentered'), 'warn');
            return;
        }
        if(!this.offFeeBillDetInputModel.adjustmentAmount){
            this.show(this.translateService.translate('ocubadjs.amountmustbeentered'), 'warn');
            return;
        }
        this.offFeeBillTransSaveModel.billTxnAmount = Number(this.offFeeBillDetInputModel.adjustmentAmount);
        this.offFeeBillTransSaveModel.billTxnType = this.offFeeBillDetInputModel.adjustmentType;
        this.offFeeBillTransSaveModel.billTxnComment = this.offFeeBillDetInputModel.billTxnComment;
        this.offFeeBillTransSaveModel.billId = this.dialog.data.billId;
        this.offFeeBillTransSaveModel.billStatus = this.dialog.data.billGenerateStatus;
        this.offFeeBillTransSaveModel.billTxnUser = this.sessionManager.getId();
 	if(this.offFeeBillDetInputModelTemp.billArDueDate){
        this.offFeeBillTransSaveModel.billArDueDate = DateFormat.getDate(this.offFeeBillDetInputModelTemp.billArDueDate);
  }
       if(this.offFeeBillDetInputModelTemp.billLdppStartDate){
            this.offFeeBillTransSaveModel.billLdppStartDate = DateFormat.getDate(this.offFeeBillDetInputModelTemp.billLdppStartDate);
        }
        if(this.offFeeBillDetInputModelTemp.billLdppEndDate){
            this.offFeeBillTransSaveModel.billLdppEndDate = DateFormat.getDate(this.offFeeBillDetInputModelTemp.billLdppEndDate);
        }
        this.offFeeBillTransSaveModel.balanceOwingAmount = this.offFeeBillDetInputModelTemp.balanceOwingAmount;
        this.offFeeBillTransInsertList.push(this.offFeeBillTransSaveModel);
        this.offFeeBillTransCommitModel.insertList = this.offFeeBillTransInsertList;

        if (this.caseplanId) {
            this.offBillStmtModel = new offBillingStatements();
            this.offBillStmtModel.rootOffenderId = this.dialog.data.rootOffenderId;
            if(this.billingCycleStartDate){
                this.offBillStmtModel.billingCycleStartDate = DateFormat.getDate(this.billingCycleStartDate);
            }
            if(this.billingCycleEndDate){
                this.offBillStmtModel.billingCycleEndDate = DateFormat.getDate(this.billingCycleEndDate);
            }
            this.offBillStmtModel.statementGenerateDatetime = DateFormat.getDate();
            this.offBillStmtModel.statementGenerateUser = this.sessionManager.getId();
            this.offBillStmtModel.beginingBalanceAmount = 0;
            this.offBillStmtModel.paymentsCreditsAmount = 0;
            this.offBillStmtModel.billingsAmount = Number(this.offFeeBillDetInputModel.adjustmentAmount);
            this.offBillStmtModel.endingBalanceAmount = 0;
            this.offBillStmtModel.offenderBookId = this.dialog.data.offenderBookId;
            this.offBillStmtModel.casePlanId = this.caseplanId;
            this.offBillStmtModel.billId = this.dialog.data.billId;
            this.offBillStmtModel.caseloadId = this.sessionManager.currentCaseLoad;
            this.offBillStmtInsertlist.push(this.offBillStmtModel);
        }
        this.offFeeBillTransCommitModel.stmtInsertList = this.offBillStmtInsertlist;
        const result = this.ocubadjsFactory.saveBillAdjustdDetCommit(this.offFeeBillTransCommitModel);
        result.subscribe(data => {
            if (data[0] && data[0].liReturn === 1) {
                this.savedisabled = true;
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.billAdjustDetailsExecuteQuery();
                return;
              }else if(data[0] && data[0].liReturn === 2){
                this.show(this.translateService.translate('ocubadjs.billcannotbeadjustedbelow'), 'warn');
                return;
              } else if (data[0] && data[0].liReturn === 3) {
                this.show(this.translateService.translate('ocubadjs.amountenteredcannotbegreaterthanthecurrentadjustedbillamount'), 'warn');
                return;
            }
              
              else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.billAdjustDetailsExecuteQuery();
                return;
              }
        });
    }

    

    onFodInsert = () => {
        return true;
    }

    onFodDelete = () => {
        return true;
    }

    onFodClear = () => {
        return true;
    }

    validateRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        return rowdata;
    }

    onAdjTypeChange(event) {
        const result = this.ocubadjsFactory.getSelectedOverrideType(this.offFeeBillDetInputModel);
        result.subscribe(data => {
            this.savedisabled = false;
            this.txnUsage = data;
            if (data === 'BI') {
                this.billAdjInc = true;
            } else {
                this.billAdjInc = false;
            }
            });
    }
    

    inInsertable() {
        if ( this.offFeeBillDetInputModel.adjustmentAmount || this.offFeeBillDetInputModel.billTxnComment) {
            this.savedisabled = false;
        } else {
            this.savedisabled = true;
        }
    }

    onAmountBlur(amount) {
        // this.amountFormat.precisionFlot(amount);
        this.amountFormat.amountFormatEvent(amount);
        this.offFeeBillDetInputModel.adjustmentAmount = JSON.parse(JSON.stringify(this.amountFormat.amountFormat(amount)));
        if(this.offFeeBillDetInputModel.adjustmentAmount) {
            this.savedisabled = false;
        }
    }

    onButExitclick() {
        this.dialog.close(null);
    }

    getCasePlanId() {
        this.vHeaderBlockModelData.offenderBookId = this.dialog.data.offenderBookId;
        const serviceObj = this.ocdreceiFactory.getCasePlanId(this.vHeaderBlockModelData);
        serviceObj.subscribe(data => {
            if (data === undefined || data === 0) {
                this.caseplanId = undefined;
            } else {
                this.caseplanId = data;
            }
        });
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
}
