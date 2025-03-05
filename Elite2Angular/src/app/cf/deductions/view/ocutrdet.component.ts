import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { FeeAccountProfiles } from '../beans/FeeAccountProfiles';
import { OffFeeBills } from '../beans/OffFeeBills';
import { OcutrdetService } from '../service/ocutrdet.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OffFeeBillTransactions } from '../beans/OffFeeBillTransactions';
import { OffFeeBillsCommitBean } from '../beans/OffFeeBillsCommitBean';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';
import { SystemProfiles } from '@common/beans/SystemProfiles';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
@Component({
    selector: 'app-ocutrdet',
    templateUrl: './ocutrdet.component.html'
})

export class OcutrdetComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    @ViewChild('billDetailsGrid', { static: true }) billDetailsGrid: any;
    @ViewChild('billTransDetGrid', { static: true }) billTransDetGrid: any;
    billDetTotalData: any[] = [];
    billTransDetTotalData: any[] = [];
    msgs: any[] = [];
    billDetailsColumnDef: any[] = [];
    billTransDetailsColumnDef = [];
    feeActProfiles: FeeAccountProfiles = new FeeAccountProfiles();
    feeActProfInput: FeeAccountProfiles = new FeeAccountProfiles();
    billDetailsData: OffFeeBills[] = [];
    billDetailsModel: OffFeeBills = new OffFeeBills();
    billDetailsInputModel: OffFeeBills = new OffFeeBills();
    billDetailsTempModel: OffFeeBills = new OffFeeBills();
    billTransactionDetTempModel: OffFeeBillTransactions = new OffFeeBillTransactions();
    fodIndex: number;
    billTransactDetailsData: OffFeeBillTransactions[] = [];
    billTransactionDetModel: OffFeeBillTransactions = new OffFeeBillTransactions();
    billTransactionDetSearchModel: OffFeeBillTransactions = new OffFeeBillTransactions();
    billTransactionTotalDetModel: OffFeeBillTransactions = new OffFeeBillTransactions();
    chkExtotAll: boolean;
    billAmountSum: number;
    billOverrideIncreaseAmount: number;
    billOverrideDecreaseAmount: number;
    billTotAmount: number;
    billTransIndex: number;
    billTxnAmountTot: number;
    paymentAmountTot: number;
    adjustmentAmountTot: number;
    balanceOwingAmountTot: number;
    offFeeBillsCommitBean: OffFeeBillsCommitBean = new OffFeeBillsCommitBean();
    OffFeeBillsInsertList: OffFeeBills[] = [];
    OffFeeBillsUpdatedList: OffFeeBills[] = [];
    OffFeeBillsDeleteList: OffFeeBills[] = [];
    systemProfBillStaModel: SystemProfiles = new SystemProfiles();
    amount: void;
    launchEnable: boolean;
    statusFieldEnable: boolean;
    constructor(private ocutrdetFactory: OcutrdetService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, public dialogService: DialogService, private amountFormat: AmountFormatUtil) {

    }
    ngOnInit() {

        this.billDetailsColumnDef = [];
        this.billTransDetailsColumnDef = [];
        this.launchEnable = false;
        this.statusFieldEnable = false;
        this.billDetailsColumnDef = [
            {
                fieldName: this.translateService.translate('ocutrdet.billnumber'), field: 'billId', datatype: 'text', uppercase: 'false', width: 150,
            },
            {
                fieldName: this.translateService.translate('ocutrdet.billdate'), datatype: 'date',
                field: 'billDate', width: 150
            },

            {
                fieldName: this.translateService.translate('ocutrdet.billstatus'), field: 'billGenerateStatus',
                editable: true, width: 150, datatype: 'lov', domain: 'BILL_STATUS', cellEditable: this.canAlertEdit
            },
            {
                fieldName: this.translateService.translate('ocutrdet.user'), field: 'userId',
                width: 150,
            },
            {
                fieldName: this.translateService.translate('ocutrdet.datetimemodified'), field: 'billGenerateDatetime', editable: false, datatype: 'dateTime',
                width: 150
            },

            {
                fieldName: this.translateService.translate('ocutrdet.billamount'), field: 'billGenerateAmount', editable: false,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true,rightAlign: true
            },

            {
                fieldName: this.translateService.translate('ocutrdet.billoverrideincrease'), field: 'billOverrideIncreaseAmount', editable: false,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true,rightAlign: true
            },
            {
                fieldName: '', field: 'button', datatype: 'launchbutton', editable: true,
                width: 100, data: 'row', updateField: 'row', modal: true, onLaunchClick: this.caGoBtnClick

            },

            {
                fieldName: this.translateService.translate('ocutrdet.billoverridedecrease'), field: 'billOverrideDecreaseAmount', editable: false,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true,rightAlign: true
            },

            {
                fieldName: this.translateService.translate('ocutrdet.billtotal'), field: 'billTotalAmount', editable: false,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true,rightAlign: true
            },
            {
                fieldName: this.translateService.translate('ocutrdet.comments'), datatype: 'text',
                field: 'billTxnComment', editable: false, width: 150
            },
            // { fieldName: this.translateService.translate('common.select'), field: 'chkSelect', editable: true, width: 150, datatype: 'checkbox' },
        ];

        this.billTransDetailsColumnDef = [
            {
                fieldName: this.translateService.translate('ocutrdet.transactiondate'), field: 'billTxnDatetime', editable: true,
                datatype: 'date', uppercase: 'false', width: 150,
            },
            {
                fieldName: this.translateService.translate('ocutrdet.bill'), datatype: 'text',
                field: 'billId', editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate('ocutrdet.description'), datatype: 'text',
                field: 'description', editable: true, width: 150
            },

            {
                fieldName: this.translateService.translate('ocutrdet.billstatus'), field: 'billStatus',
                editable: true, width: 150, datatype: 'text',
            },


            {
                fieldName: this.translateService.translate('ocutrdet.transaction'), datatype: 'text',
                field: 'billTxnNoTemp', editable: true, width: 150
            },

            {
                fieldName: this.translateService.translate('ocutrdet.receipt'), datatype: 'text',
                field: 'originalBillId', editable: true, width: 150
            },

            {
                fieldName: this.translateService.translate('ocutrdet.document'), datatype: 'text',
                field: 'txnReferenceNumber', editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate('ocutrdet.user'), field: 'billTxnUser',
                width: 150, 
            },
            {
                fieldName: this.translateService.translate('ocutrdet.datetimemodified'), field: 'billTxnDatetime', editable: false, datatype: 'dateTime',
                width: 150
            },
            {
                fieldName: this.translateService.translate('ocutrdet.billamount'), field: 'billTxnAmount', editable: true,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true,rightAlign: true
            },
            {
                fieldName: this.translateService.translate('ocutrdet.paymentamount'), field: 'paymentAmount', editable: true,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true,rightAlign: true
            },
            {
                fieldName: this.translateService.translate('ocutrdet.adjustmentamount'), field: 'adjustmentAmount', editable: true,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true,rightAlign: true
            },

            {
                fieldName: this.translateService.translate('ocutrdet.balanceowing'), field: 'balanceOwingAmount', editable: true,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true,rightAlign: true
            },

            {
                fieldName: this.translateService.translate('ocutrdet.comments'), datatype: 'text',
                field: 'billTxnComment', editable: true, width: 150
            },
            {
                fieldName: '', datatype: 'number',
                field: 'billTxnNo', hide: true, 
            }


        ];
        this.feeActProfInput.feeCode = this.dialog.data.feeCode;
        this.feeActProfInput.frequencyCode = this.dialog.data.frequencyCode;
        this.feeActProfInput.caseloadId = this.dialog.data.caseloadId;
        this.feeActProfInput.amount = this.dialog.data.amount;
        this.feeActProfInput.offenderFeeId = this.dialog.data.offenderFeeId;
        if(this.dialog.data.startDate){
            this.feeActProfInput.startDate = DateFormat.getDate(this.dialog.data.startDate);
        }
        if(this.dialog.data.effectiveDate){
        this.feeActProfInput.effectiveDate = DateFormat.getDate(this.dialog.data.effectiveDate);
        }
        if(this.dialog.data.expiryDate){
            this.feeActProfInput.expiryDate = DateFormat.getDate(this.dialog.data.expiryDate);
        }
        this.feeActProfInput.feeActStatus = this.dialog.data.feeActStatus;
        this.feeActProfInput.frequencyType = this.dialog.data.frequencyType;
        this.feeActProfiles.amount = this.dialog.data.amount;
        //  this.sysPflExecuteQuery();
        this.sysPflBillAdjusExecuteQuery();
        this.sysPflBillStatusExecuteQuery();
        this.feeActExecuteQuery();
        this.billDetailsExecuteQuery();
    }

    disableCell = (data: any, index: number): boolean => {
        if (this.launchEnable) {
            return false;
        } else {
            return true;
        }
    }


    amountKeyDown(event, comp) {
        if (!this.amountFormat.avoidKeys(event, this.feeActProfiles.amount)) {
            event.stopPropagation();
            return false;
        }
    }

    sysPflBillAdjusExecuteQuery() {
        this.ocutrdetFactory.sysPflBillAdjusExecuteQuery().subscribe(data => {
            if (data > 0) {
                this.launchEnable = true;
            } else {
                this.launchEnable = false;
            }

        });
    }

    sysPflBillStatusExecuteQuery() {
        this.ocutrdetFactory.sysPflBillStatusExecuteQuery().subscribe(data => {
            if (data > 0) {
                this.statusFieldEnable = true;
            } else {
                this.statusFieldEnable = false;
            }

        });
    }

    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if ((data.billGenerateStatus === 'LD_DOR' || data.billGenerateStatus === 'LD_PCF' || data.billGenerateStatus === 'LD_WO' || data.billGenerateStatus === 'LD_WO_RDOR') && this.statusFieldEnable) {
            return true;

        } else {
            return false;
        }
    }

    extOtChkboxChange(event) {
        if (event) {
            if (event.checked) {
                this.billTransTotalExecuteQuery();
                this.chkExtotAll = true;
            } else {
                this.billDetailsExecuteQuery();
            }

        }
    }
    caGoBtnClick = (data) => {
        if (data) {
            this.billDetailsInputModel = data;
            this.billDetailsInputModel.offenderBookId = this.dialog.data.offenderBookId;
            this.billDetailsInputModel.rootOffenderId = this.dialog.data.rootOffenderId;
            if (this.launchEnable) {
                this.dialogService.openLinkDialog('/OCUBADJS', this.billDetailsInputModel, 80).subscribe(res => {
                    if (res) {
                        this.feeActExecuteQuery();
                        this.billDetailsExecuteQuery();
                    } else {
                        this.feeActExecuteQuery();
                        this.billDetailsExecuteQuery();
                    }
                });
            } else {
                this.show(this.translateService.translate('ocutrdet.userhasnopermissiontoaccessthisscreen'), 'warn');
                return;
            }
        }
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

    onRowClickBillDet(event) {
        if (event) {
            this.billDetailsModel = event;
            if (this.billDetailsModel.createDatetime) {
                if(this.chkExtotAll){
                    this.billTransTotalExecuteQuery();
                } else {
                    this.billTransDetailsExecuteQuery();
                }
            } else {
                this.billTransactDetailsData = [];
            }
            //this.fodModel = event;    
        }
    }
    onRowClickBillTransDet(event) {
        if (event) {
            this.billTransactionDetModel = event;
        }
    }

    feeActExecuteQuery() {
        const result = this.ocutrdetFactory.feeActExecuteQuery(this.feeActProfInput);
        result.subscribe(data => {
            if (data.length === 0) {
                this.feeActProfiles = new FeeAccountProfiles();
            } else {
                this.feeActProfiles = data;
                // this.feeActProfiles.currentBalance = String(this.amountFormat.amountFormat(this.feeActProfiles.currentBalance));;
                this.feeActProfiles.amountString = String(this.amountFormat.amountFormat(this.dialog.data.amount));
            }
        });
    }

    billDetailsExecuteQuery() {
        this.billDetailsModel =new OffFeeBills();
        this.billDetailsModel.offenderFeeId = this.feeActProfInput.offenderFeeId;
        const result = this.ocutrdetFactory.billDetailsExecuteQuery(this.billDetailsModel);
        result.subscribe(data => {
            if (data.length === 0) {
                this.billDetailsData = [];
                this.billDetTotalData = [];
            } else {
                this.billAmountSum = 0;
                this.billOverrideIncreaseAmount = 0;
                this.billOverrideDecreaseAmount = 0;
                this.billTotAmount = 0;
                data.forEach(element => {
                    // element.billOverrideIncreaseAmount = element.billGenerateAmount;
                    // element.billOverrideDecreaseAmount = element.billGenerateAmount;
                    element['button'] = 'Adjust Bill';
                    this.billAmountSum = this.billAmountSum + element.billGenerateAmount;
                    this.billOverrideIncreaseAmount = this.billOverrideIncreaseAmount + element.billOverrideIncreaseAmount;
                    this.billOverrideDecreaseAmount = this.billOverrideDecreaseAmount + element.billOverrideDecreaseAmount;
                    this.billTotAmount = this.billTotAmount + element.billTotalAmount;
                })
                this.billDetailsData = data;
                this.billDetailsModel = data[0];


                //this.feeActProfiles.amount = this.dialog.data.amount;
                this.fodIndex = 0;

                this.billDetailsTempModel = new OffFeeBills();
                this.billDetailsTempModel = data;
                this.billDetailsTempModel['userId'] = 'Totals';
                this.billDetailsTempModel['billGenerateAmount'] = this.billAmountSum;
                this.billDetailsTempModel['billOverrideIncreaseAmount'] = this.billOverrideIncreaseAmount;
                this.billDetailsTempModel['billOverrideDecreaseAmount'] = this.billOverrideDecreaseAmount;
                this.billDetailsTempModel['billTotalAmount'] = this.billTotAmount;
                const totalData = [];
                totalData.push(this.billDetailsTempModel);
                this.billDetTotalData = totalData;

                // this.calculateTotals();
            }
        });
    }
    calculateTotals() {

    }

    billTransDetailsExecuteQuery() {
        this.billTransactionDetSearchModel.billId = this.billDetailsModel.billId;
        this.billTransactionDetSearchModel.adjustmentAmountTot = this.feeActProfiles.amount;
        const result = this.ocutrdetFactory.billTransDetailsExecuteQuery(this.billTransactionDetSearchModel);
        result.subscribe(data => {
            if (data.length === 0) {
                this.billTransactDetailsData = [];
                this.billTransDetTotalData = [];
            } else {
                this.billTxnAmountTot = 0;
                this.paymentAmountTot = 0;
                this.adjustmentAmountTot = 0;
                this.balanceOwingAmountTot = 0;
                data.forEach(element => {
                    if(element.txnUsage === 'B' || element.txnUsage === 'BI' ) {
                        this.billTxnAmountTot = this.billTxnAmountTot + element.billTxnAmount;
                    } else  if(element.txnUsage === 'BD' ) {
                        this.billTxnAmountTot = this.billTxnAmountTot - element.billTxnAmount;
                        element.billTxnAmount = -element.billTxnAmount;
                    }
                    // this.billTxnAmountTot = this.billTxnAmountTot + element.billTxnAmount;
                   
                    // this.balanceOwingAmountTot = this.balanceOwingAmountTot + element.balanceOwingAmount;
                    if( element.originalBillId && element.txnUsage === 'R' ){
                        element.paymentAmount = -element.paymentAmount;
                    }
                    if(element.offAdjTxnId && element.originalBillId){
                        element.adjustmentAmount = -element.adjustmentAmount;
                    }
                    if(element.offAdjTxnId && element.billTxnNo){
                        element.billTxnNoTemp = 'A' + element.billTxnNo;
                    }else{
                        element.billTxnNoTemp = element.billTxnNo;
                    }
                    this.paymentAmountTot = this.paymentAmountTot + element.paymentAmount;
                    this.adjustmentAmountTot = this.adjustmentAmountTot + element.adjustmentAmount;
                })
                this.balanceOwingAmountTot = data[0].balanceOwingAmount;
                this.feeActProfiles.currentBalance =  String(this.amountFormat.amountFormat(data[0].balanceOwingAmount));
                //this.feeActProfiles.amount = this.dialog.data.amount;
                this.fodIndex = 0;

                this.billDetailsTempModel = new OffFeeBills();
                this.billDetailsTempModel = data;
                this.billDetailsTempModel['userId'] = 'Totals';
                if (this.billTxnAmountTot !== 0) {
                    this.billDetailsTempModel['billTxnAmount'] = this.billTxnAmountTot;
                } else {
                    this.billDetailsTempModel['billTxnAmount'] = '0.00';
                }

                if (this.paymentAmountTot !== 0) {
                    this.billDetailsTempModel['paymentAmount'] = this.paymentAmountTot;
                } else {
                    this.billDetailsTempModel['paymentAmount'] = '0.00';
                }

                if (this.adjustmentAmountTot !== 0) {
                    this.billDetailsTempModel['adjustmentAmount'] = this.adjustmentAmountTot;
                } else {
                    this.billDetailsTempModel['adjustmentAmount'] = '0.00';
                }

                if (this.balanceOwingAmountTot !== 0) {
                    this.billDetailsTempModel['balanceOwingAmount'] = this.balanceOwingAmountTot;
                } else {
                    this.billDetailsTempModel['balanceOwingAmount'] = '0.00';
                }



                const totalDataOne = [];
                totalDataOne.push(this.billDetailsTempModel);
                this.billTransDetTotalData = totalDataOne;


                this.billTransactDetailsData = data;
                this.billTransactionDetModel = data[0];
                //this.feeActProfiles.amount = this.dialog.data.amount;
                this.billTransIndex = 0;

            }
        });
        this.billTransDetGrid.prepareAgColumnDef();
    }

    billTransTotalExecuteQuery() {
        this.billTransactionTotalDetModel.offenderFeeId = this.feeActProfInput.offenderFeeId;
        const result = this.ocutrdetFactory.billTransTotalExecuteQuery(this.billTransactionTotalDetModel);
        result.subscribe(data => {
            if (data.length === 0) {
                this.billTransactDetailsData = [];
            } else {
                this.billTxnAmountTot = 0;
                this.paymentAmountTot = 0;
                this.adjustmentAmountTot = 0;
                this.balanceOwingAmountTot = 0;
                data.forEach(element => {
                    if(element.txnUsage === 'B' || element.txnUsage === 'BI' ) {
                        this.billTxnAmountTot = this.billTxnAmountTot + element.billTxnAmount;
                    } else  if(element.txnUsage === 'BD' ) {
                        this.billTxnAmountTot = this.billTxnAmountTot - element.billTxnAmount;
                        element.billTxnAmount = -element.billTxnAmount;
                    }
                    // this.billTxnAmountTot = this.billTxnAmountTot + element.billTxnAmount;
                   
                    // this.balanceOwingAmountTot = this.balanceOwingAmountTot + element.balanceOwingAmount;
                    if( element.originalBillId && element.txnUsage === 'R' ){
                        element.paymentAmount = -element.paymentAmount;
                    }
                    if(element.offAdjTxnId && element.originalBillId){
                        element.adjustmentAmount = -element.adjustmentAmount;
                    }
                    if(element.offAdjTxnId && element.billTxnNo){
                        element.billTxnNoTemp = 'A' + element.billTxnNo;
                    }else{
                        element.billTxnNoTemp = element.billTxnNo;
                    }
                    this.paymentAmountTot = this.paymentAmountTot + element.paymentAmount;
                    this.adjustmentAmountTot = this.adjustmentAmountTot + element.adjustmentAmount;
                   
                   // this.balanceOwingAmountTot = this.balanceOwingAmountTot + element.currentBalanceOwning;
                })
                this.balanceOwingAmountTot = data[0].balanceOwingAmount;
                this.feeActProfiles.currentBalance =  String(this.amountFormat.amountFormat(data[0].balanceOwingAmount));
                //this.feeActProfiles.amount = this.dialog.data.amount;
                this.fodIndex = 0;

                this.billDetailsTempModel = new OffFeeBills();
                this.billDetailsTempModel = data;
                this.billDetailsTempModel['userId'] = 'Totals';
                if (this.billTxnAmountTot !== 0) {
                    this.billDetailsTempModel['billTxnAmount'] = this.billTxnAmountTot;
                } else {
                    this.billDetailsTempModel['billTxnAmount'] = undefined;
                }

                if (this.paymentAmountTot !== 0) {
                    this.billDetailsTempModel['paymentAmount'] = this.paymentAmountTot;
                } else {
                    this.billDetailsTempModel['paymentAmount'] = undefined;
                }

                if (this.adjustmentAmountTot !== 0) {
                    this.billDetailsTempModel['adjustmentAmount'] = this.adjustmentAmountTot;
                } else {
                    this.billDetailsTempModel['adjustmentAmount'] = undefined;
                }

                if (Number(this.feeActProfiles.currentBalance) !== 0) {
                    this.billDetailsTempModel['balanceOwingAmount'] = Number(this.feeActProfiles.currentBalance);
                } else {
                    this.billDetailsTempModel['balanceOwingAmount'] = '0.00';
                }

                const totalDataOne = [];
                totalDataOne.push(this.billDetailsTempModel);
                this.billTransDetTotalData = totalDataOne;

                this.billTransactDetailsData = data;
                this.billTransactionDetModel = data[0];
                //this.feeActProfiles.amount = this.dialog.data.amount;
                this.billTransIndex = 0;
            }
        });
        this.billTransDetGrid.prepareAgColumnDef();
    }


    saveFeeOverdDet = () => {
        return true;
    }

    onFodInsert = () => {
        return {
            button: '..',
        };
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


    onButExitclick() {
        this.dialog.close(null);
    }



    offFeeBillsCommit(event) {
        this.OffFeeBillsInsertList = event.added;
        this.OffFeeBillsUpdatedList = event.updated;
        this.OffFeeBillsDeleteList = event.removed;
        this.offFeeBillsCommitBean.insertList = [];
        this.offFeeBillsCommitBean.updateList = [];
        this.offFeeBillsCommitBean.deleteList = [];
        if (this.OffFeeBillsInsertList.length > 0 || this.OffFeeBillsUpdatedList.length > 0) {
            for (let i = 0; i < this.OffFeeBillsInsertList.length; i++) {
                this.offFeeBillsCommitBean.insertList = this.OffFeeBillsInsertList;
            }
            for (let i = 0; i < this.OffFeeBillsUpdatedList.length; i++) {
                this.OffFeeBillsUpdatedList[i].userId = this.sessionManager.getId();
                this.offFeeBillsCommitBean.updateList = this.OffFeeBillsUpdatedList;
            }
        }
        if (this.OffFeeBillsDeleteList.length > 0) {
            for (let i = 0; i < this.OffFeeBillsDeleteList.length; i++) {
                this.offFeeBillsCommitBean.deleteList = this.OffFeeBillsDeleteList;
            }
        }
        const sencalcSaveData = this.ocutrdetFactory.offFeeBillsCommit(this.offFeeBillsCommitBean);
        sencalcSaveData.subscribe(data => {
            if (data > 0) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                return;
            }

        });
    }



    get selectAllDisable() {
        if (this.billDetailsData.length > 1) {
              return false;
        }
        return true;
  }
}
