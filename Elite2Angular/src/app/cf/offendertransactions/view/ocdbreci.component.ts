import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';
import { OffenderTransactions } from '@inmate/trust/trustaccounts/beans/OffenderTransactions';
import { OcdbreciService } from '@cf/offendertransactions/service/ocdbreci.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { OffenderTransactionsCommitBean } from '@inmate/trust/trustaccounts/beans/OffenderTransactionsCommitBean';
import { OmsRequests } from '@inmate/trust/trustaccounts/beans/OmsRequests';
import { OffFeeBillTransactions } from '@cf/deductions/beans/OffFeeBillTransactions';
import { FeeAccounts } from '../../maintenance/beans/FeeAccounts';
import { DateFormat } from '@ui-components/datepicker/dateFormat';

@Component({
    selector: 'app-ocdbreci',
    templateUrl: './ocdbreci.component.html'
})

export class OcdbreciComponent implements OnInit {
    selectedRow: OffenderTransactions = new OffenderTransactions();
    omsReqModel: OmsRequests = new OmsRequests();
    @ViewChild('grid', { static: true }) grid: any;
    @ViewChild('offFeeGrid', { static: false }) offFeeGrid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    selected = -1;
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offtxn1Data: OffenderTransactions[] = [];
    offtxn1DataTemp: OffenderTransactions[] = [];
    offtxn1Model: OffenderTransactions = new OffenderTransactions();
    offtxn1CommitModel: OffenderTransactionsCommitBean = new OffenderTransactionsCommitBean();
    offtxn2CommitModel: OffenderTransactionsCommitBean = new OffenderTransactionsCommitBean();
    offtxn1Index: number;
    offtxn1InsertList: OffenderTransactions[] = [];
    offtxn1UpdateList: OffenderTransactions[] = [];
    offtxn1DeleteList: OffenderTransactions[] = [];
    prepaidFeeAcntInsertList: OffenderTransactions[] = [];
    prepaidFeeAcctModel: OffenderTransactions = new OffenderTransactions();
    offFeeUpdateList: OffFeeBillTransactions[] = [];
    offtxnData: OffenderTransactions[] = [];
    offtxnDataReport: OffenderTransactions[] = [];
    offtxnDataTemp: OffenderTransactions[] = [];
    offtxnModel: OffenderTransactions = new OffenderTransactions();
    offtxnIndex: number;
    offtxnInsertList: OffenderTransactions[] = [];
    offtxnUpdatetList: OffenderTransactions[] = [];
    offtxnDeleteList: OffenderTransactions[] = [];
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex: number;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    minDate: Date;
    display: boolean;
    reciptBtn: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    offTxnColumnDef: any[];
    offFeesColumnDef: any[];
    offTxn1ReadOnly: boolean;
    offTxnReadOnly: boolean;
    sysPflReadOnly: boolean;
    cgfkOfftxn1txntypeRg: any[] = [];
    cgfkOfftxndspinformationnRg: any[] = [];
    txnEntryAmount: any;
    link: any;
    txnId: string;
    txnEntryDesc: string;
    txnType: string;
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    infoNumberLink: any;
    docketInfoNumber: boolean;
    deductionFlag: boolean;
    disableSavebutton: boolean;
    txnTypeFlag: boolean = false;
    commonCellEditDsbl: boolean = false;
    titles1 = { 'code': this.translateService.translate('ocdrecei.docket') };
    titlesLov = {
        'code': this.translateService.translate('ocdbreci.paymentmethod'),
        'description': this.translateService.translate('common.description')
    };
    editableData: boolean;
    printDisabled: boolean;
    adjustTxnEntryId: any;
    gridupdate: boolean;
    offFeeBillTranModel: OffFeeBillTransactions = new OffFeeBillTransactions();
    tableIndex = -1;
    offFeeData: OffFeeBillTransactions[] = [];
    btnFlag: any;
    moduleName: boolean;
    overrideobligati: boolean;
    btnFlagOne: boolean;
    printReportBtn: boolean;
    prepaidAcntModelTemp: FeeAccounts = new FeeAccounts();
    prepaidAcntSelectedFlag: boolean;
    offTxnInsert: boolean = true;
    tempOffenderBookId: Number;
    prodFlagDetails: OffenderTransactions = new OffenderTransactions();
    receiptProductionFlag: any;
    txnEntryAmountOne: any;
    constructor(private ocdbreciFactory: OcdbreciService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager,
        private amountFormat: AmountFormatUtil,
        private dialogService: DialogService) {
        this.offFeesColumnDef = [];
    }
    ngOnInit() {
        this.txnEntryAmountOne = undefined;
        this.printReportBtn = true;
        this.reciptBtn = true;
        this.disableSavebutton = true;
        this.systemProfileBtnDsbl();
        this.gridupdate = false;
        this.printDisabled = true;
        this.link = 'ocdbreci/cgfkOffTxn1TxnTypeRecordGroup';
        this.infoNumberLink = 'ocdbreci/cgfkOffTxnDspInformationNRecordGroup';
        this.editableData = false;
        this.offTxnColumnDef = [
            {
                fieldName: this.translateService.translate('system-profile.off-id-code') + '*', field: 'offenderIdDisplay',
                editable: false, width: 150, datatype: 'number', whole: true,
            },
            {
                fieldName: this.translateService.translate(''), field: 'butNameList', datatype: 'launchbutton', editable: false, width: 150,
                link: '/OTINAMESDIALOG', modal: true, updateField: 'row', isDisable: this.nameSearchDisable,
                data: 'row', onLaunchClick: this.offenderLaunchClick
            },
            { fieldName: this.translateService.translate('common.name'), field: 'txnEntryDesc', editable: false, width: 150 },
            {
                fieldName: '', field: 'offenderBookId', hide: true
            },
            {
                fieldName: this.translateService.translate('ocdbreci.docket'), field: 'infoNumber', editable: true,
                width: 150, datatype: 'lov', link: 'ocdbreci/cgfkOffTxnDspInformationNRecordGroup?offenderBookId=', parentField: 'offenderBookId', titles: this.titles1, cellEditable: this.canAlertEdit
            },
            {
                fieldName: this.translateService.translate('common.amountmandatory'), field: 'txnEntryAmount', editable: true, width: 150,
                datatype: 'number', format: '1.2-2', strictFP: true, whole: true, minValue: 0.00,
                 maxValue: 999999999.99, cellEditable: this.canAlertEditoffFees,rightAlign: true
            },
            {
                fieldName: this.translateService.translate('ocdbreci.reference'), field: 'txnReferenceNumber', editable: true,
                width: 150, datatype: 'text', maxlength: 12, cellEditable: this.canAlertEditoffFees, uppercase: 'false',
            },
            {
                fieldName: this.translateService.translate('ocdbreci.hasbouncedcheck'), field: 'deductionFlag', datatype: 'checkbox',
                editable: false, width: 150
            },
            { fieldName: this.translateService.translate('ocdbreci.longestsupervisionexpirydate'), field: 'billAgingEndDate', datatype: 'date', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('ocdbreci.prepaidfeeaccount'), field: 'feeCode', editable: true,
                width: 150, datatype: 'lov', link: 'ocdbreci/getFeeCodeRecordGroupOne', cellEditable: this.canAlertEditoffFees, source: 'OCMPFACC'
            },
            {
                fieldName: this.translateService.translate('ocdbreci.prepaidamount'), field: 'amount', editable: true, width: 150,
                datatype: 'number', format: '1.2-2', strictFP: true, whole: true, rightAlign: true,
                minValue: 0.00, maxValue: 999999999.99, cellEditable: this.canAlertEditoffFeesAmt,
            },
            { fieldName: this.translateService.translate('ocdbreci.receipt'), field: 'receiptNumber', editable: false, width: 150, datatype: 'text' },

            {
                fieldName: '', field: 'rootOffenderId', hide: true
            },
            {
                fieldName: '', field: 'feeCode', hide: true
            },
            {
                fieldName: '', field: 'amount', hide: true
            },
            {
                fieldName: '', field: 'flag', hide: true
            },
            {
                fieldName: '', field: 'count', hide: true
            },
            {
                fieldName: '', field: 'isSaved', hide: true
            },
        ];
        this.offFeesColumnDef = [
            {
                fieldName: this.translateService.translate('ocdbreci.supervisionperiod'), field: 'bookingNo', editable: false, width: 150,
                datatype: 'text',
            },
            {
                fieldName: this.translateService.translate('ocdbreci.caseload'), field: 'caseloadId', editable: false, width: 150,
                datatype: 'text',
            },
            {
                fieldName: this.translateService.translate('ocdbreci.feeid'), field: 'offenderFeeId', editable: false, width: 150,
                datatype: 'number',
            },
            {
                fieldName: this.translateService.translate('ocdbreci.feecode'), field: 'feeCode', editable: false, width: 150,
                datatype: 'text',
            },
            {
                fieldName: this.translateService.translate('ocdbreci.billnumber'), field: 'billId', editable: false, width: 150,
                datatype: 'text',
            },
            {
                fieldName: this.translateService.translate('ocdbreci.billdate'), field: 'billGenerateDatetime', editable: false, width: 150,
                datatype: 'date',
            },
            {
                fieldName: this.translateService.translate('ocdbreci.billstatus'), field: 'billStatus', editable: false, width: 150,
                datatype: 'text',
            },
            {
                fieldName: this.translateService.translate('ocdbreci.balance'), field: 'balance', editable: false, width: 150,
                datatype: 'number', format: '1.2-2', whole: true, strictFP: true,rightAlign: true
            },
            {
                fieldName: this.translateService.translate('ocdbreci.amount'), field: 'amount', editable: true, width: 150,
                datatype: 'number', format: '1.2-2', strictFP: true, whole: true, minValue: 0.00, maxValue: 999999999.99, cellEditable: this.canAlertEditoffFees
                ,rightAlign: true
            },


        ];
    }

    systemProfileBtnDsbl() {
        const saveObj = this.ocdbreciFactory.getProfileValueDisableBtn();
        saveObj.subscribe(data => {
            if (data && data === 'Y') {
                this.btnFlag = false;
                this.btnFlagOne = true;
                this.overrideobligati = true;
            } else {
                this.btnFlag = true;
                this.btnFlagOne = false;
                this.overrideobligati = true;
            }
        });
    }
    onRowClickofftxn(event) {
        if (event) {
            this.overrideobligati = false;
            if (event.feeCode) {
                this.grid.requiredOn('amount');
            } else {
                 this.grid.requiredOff('amount');
            } 
            if (event.offenderId) {
                this.paymentPlanDisableFun(event.offenderId);
                this.tempOffenderBookId = event.offenderId;
            } else {
                this.reciptBtn = true;
            }
            if (!this.commonCellEditDsbl) {
                this.disableSavebutton = false;
            } else {
                this.disableSavebutton = true;
            }
            this.selectedRow = event;
            if (this.selectedRow.offFeeBillList && this.selectedRow.offFeeBillList.length > 0 && !this.disableSavebuttonComon()) {
                this.offFeeData = this.selectedRow.offFeeBillList;
            }
            else{
                if (event.offenderBookId) {
                    this.offFeeBillTranModel.offenderBookId = event.offenderBookId;
                    this.offFeeExecuteQuery();
                }
            }
            if (event.offenderBookId) {
                this.offFeeBillTranModel.offenderBookId = event.offenderBookId;
            } else {
                this.offFeeData = [];
            }
        } else {
            this.selectedRow = new OffenderTransactions();
            this.gridupdate = false;
            this.offFeeData = [];
            this.disableSavebutton = true;
        }
    }

    updatedEvents(event) {
        this.offtxnData.forEach(e => {
            if (e.offenderBookId === event.updated.offenderBookId) {
                if (!e.eventUpdateList) {
                    e.eventUpdateList = [];
                }
                if (e.eventUpdateList.length > 0) {
                    e.eventUpdateList.forEach(ele => {
                        if (ele.offenderFeeId === event.updated.offenderFeeId) {
                            ele.billAgingEndDate = DateFormat.getDate(ele.billAgingEndDate);
                            ele.billGenerateDatetime = DateFormat.getDate(ele.billGenerateDatetime);
                            ele.billAgingStartDate=  DateFormat.getDate(ele.billAgingStartDate);
                            ele.billTxnDatetime=  DateFormat.getDate(ele.billTxnDatetime);
                        // e.billArDueDate =  DateFormat.getDate( e.billArDueDate);
                        // e.billLdppEndDate= DateFormat.getDate( e.billLdppEndDate);
                        // e.billLdppStartDate = DateFormat.getDate(e.billLdppStartDate);
                            ele = event.updated;

                        }
                    });
                } else {
                    e.eventUpdateList.push(event.updated);
                }
                e.offFeeBillList = this.offFeeData
            }
        });
    }
    offFeeExecuteQuery() {
        const serviceObj = this.ocdbreciFactory.offFeeExecuteQuery(this.offFeeBillTranModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.offFeeData = [];
                this.tableIndex = -1;
            } else {
                this.offFeeData = data;
                data.forEach(element => {
                       element.balance = element.balanceOwingAmount;
                       element.billTxnUser = this.sessionManager.getId();
                 });
                this.selectedRow.offFeeBillList = data;
                this.tableIndex = 0;
            }
        });
    }
    disableSavebuttonComon(){
        if(this.offtxnData.length>0 && this.commonCellEditDsbl!=true){
            return false;
        }else{
            return true;
        }
    }

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    showOne() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    amountChange(amount) {
        if (!amount) {
            this.txnType = null;
        }
    }
    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (data.count > 0 && this.commonCellEditDsbl != true) {
            return true
        }
        return false;
    }

    canAlertEditoffFees = (data: any, index: number, field: string): boolean => {
        if (field === 'amount' && data.caseloadId && this.sessionManager.currentCaseLoad !== data.caseloadId) {
            return false;
        }
        if (this.commonCellEditDsbl) {
            return false;
        }
        return true;
    }

    canAlertEditoffFeesAmt = (data: any, index: number, field: string): boolean => {
        if (this.commonCellEditDsbl) {
            return false;
        } else if (!this.commonCellEditDsbl && !data.feeCode) {
            return false;
        }
        return true;
    }

    nameSearchDisable = (data: any, index: number, field: string): boolean => {
        if (data.offenderIdDisplay) {
            return true;
        } else {
            return false;
        }
    }
    onStatusBlur() {
        if (!this.txnType) {
            this.txnType = this.txnType === '' ? undefined : '';
        }else{
            this.prodFlagDetails.txnType=this.txnType;
            this.prodFlagDetails.caseloadId=this.sessionManager.currentCaseLoad;
        }
    }

    ocdbreciSavealertForm(){
        setTimeout(() => {
        const obj=this.ocdbreciFactory.getProdFlagDetails(this.prodFlagDetails);
        obj.subscribe(e=>{
            this.receiptProductionFlag = e.receiptProductionFlag;
            if(e.checkInd || e.receiptProductionFlag){
                this.txnTypeFlag=false;
            }else{
                this.txnTypeFlag=true;
            }
            this.onSave();
        });
    }, 10);
    }

    offFeeGridGridClear = () => {
        this.offFeeExecuteQuery();
        return true;
    }

    validateRowData = (event) => {
        const index = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'feeCode') {
             if (event.data.feeCode) {
                this.grid.requiredOn('amount');
                rowdata.validated = true;
                return rowdata;
            } else {
                this.grid.requiredOff('amount');
                rowdata.validated = true;
                return rowdata;
            } 
        }
        if (event.field === 'offenderIdDisplay') {
            this.editableData = false;
            this.docketInfoNumber = false;
            if (!event.newValue) {
                this.grid.setColumnData('lastName', index, null);
                this.grid.setColumnData('txnEntryDesc', index, null);
                this.grid.setColumnData('rootOffenderId', index, null);
                this.grid.setColumnData('accountClosedFlag', index, null);
            } else if (event.newValue && Number(event.newValue) !== Number(event.oldValue)) {
                this.validateOffender(event.data, index, true);
            }
        }
        if ((event.field === 'infoNumber' || event.field === 'txnEntryAmount') && this.offtxnModel.offenderIdDisplay) {
            this.ocdbreciFactory.whenValidateItemAmountInfonumber(event.data).subscribe(resDataList => {
                if (resDataList.sealFlag === '8') {
                    this.show('ocdbreci.offenderuniqueobligationprofileoverrideobligationswindow');
                    return;
                }
                if (resDataList.sealFlag === '9') {
                    this.message = this.translateService.translate('ocdbreci.nopaymentplancreatedforoffender');
                    this.message = String(this.message).replace('&ID&', event.data.offenderIdDisplay);
                    this.message = String(this.message).replace('&INFO&', event.data.infoNumber);
                    const data = {
                        label: this.message, yesBtn: true, noBtn: true
                    };
                    this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                        if (result) {
                        } else {
                            this.grid.setColumnData('txnEntryAmount', index, null);
                        }
                    });
                }
                if (resDataList.sealFlag === '10') {
                    this.message = this.translateService.translate('ocdbreci.missingpaymentplanforoffender');
                    this.message = String(this.message).replace('&ID&', event.data.offenderIdDisplay);
                    const data = {

                        label: this.message, yesBtn: true, noBtn: true
                    };
                    this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                        if (result) {
                        } else {
                            this.grid.setColumnData('txnEntryAmount', index, null);
                        }
                    });
                }
            });
        }
        rowdata.validated = true;
        return rowdata;
    }

    offenderLaunchClick = (data) => {
        if (this.offtxnModel.txnId) {
            return;
        }
        const index = this.offtxnData.indexOf(data);
        const reqData = {
            'caseloadId': this.sessionManager.currentCaseLoad,
        };
        this.dialogService.openLinkDialog('/OTINAMESDIALOG', reqData, 80).subscribe(resData => {
            if (resData) {
                this.validateOffender(resData, index);
            }
        });
        return false;
    }

    supervisionExpiryDate(event, index) {
        const saveObj = this.ocdbreciFactory.supervisionExpiryDate(event);
        saveObj.subscribe(response => {
            this.grid.setColumnData('billAgingEndDate', index, response);
        });
    }

    dockerEnableDisable(event, index) {
        const result = this.ocdbreciFactory.cgfkOffTxnDspInformationNRecordGroupCount(event);
        result.subscribe(data => {
            if (data > 0) {
                this.grid.setColumnData('count', index, data);
            }
        });
    }
    validateOffender(data, index, isValidate?) {
        if (data && data.offenderIdDisplay) {
            this.docketInfoNumber = false;
            this.offtxnModel.offenderIdDisplay = data.offenderIdDisplay;
            this.offtxnModel.caseloadId = this.sessionManager.currentCaseLoad;
            this.ocdbreciFactory.whenValidateItem(this.offtxnModel).subscribe(resDataList => {
                if (resDataList.sealFlag === '1') {
                    this.show('ocdbreci.offendernotfoundpleaseclearthisrecordtoproceed');
                    this.grid.setColumnData('offenderIdDisplay', index, undefined);
                    this.editableData = false;
                    return;
                } else {
                    this.editableData = true;
                }
                if (resDataList.sealFlag === '2') {
                    this.show('ocdbreci.thisoffenderhaspreviouslybouncedcheck');
                    return;
                }
                if (resDataList.sealFlag === '3') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdbreci.erroroffenderhasaclosed');
                    this.message = String(this.message).replace('&ID&', this.offtxnModel.offenderIdDisplay);
                    this.showOne();
                    return;
                }
                if (resDataList.sealFlag === '4') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdbreci.erroroffenderhasnoaccount');
                    this.message = String(this.message).replace('&ID&', this.offtxnModel.offenderIdDisplay);
                    this.showOne();
                    return;
                }
                if (resDataList.sealFlag === '5') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdbreci.erroroffenderhasmultiple');
                    this.message = String(this.message).replace('&ID&', this.offtxnModel.offenderIdDisplay);
                    this.showOne();
                    return;
                }
                if (resDataList.sealFlag === '6') {
                    this.show('ocdbreci.othererrorindeductions');
                    return;
                }
                if (resDataList.sealFlag === '7') {
                    this.show('ocdbreci.oneormoredeductionofthisoffendersreceiptissuspended');
                    return;
                }
                if (resDataList.lastName) {
                    const resData = resDataList;
                    this.grid.setColumnData('offenderIdDisplay', index, this.offtxnModel.offenderIdDisplay);
                    if (resData.lastName) {
                        this.grid.setColumnData('txnEntryDesc', index, resData.lastName + ', ' + resData.firstName);
                    }
                    this.supervisionExpiryDate(resData.offenderBookId, index);
                    this.dockerEnableDisable(resData.offenderBookId, index);
                    this.offFeeBillTranModel.offenderBookId = resData.offenderBookId;
                    this.offFeeExecuteQuery();
                    this.grid.setColumnData('receiptNumber', index, resData.receiptNumber);
                    this.deductionFlag = resData.deductionFlag === 'Y' ? true : false;
                    this.grid.setColumnData('deductionFlag', index, this.deductionFlag);
                    this.grid.setColumnData('rootOffenderId', index, resData.rootOffenderId);
                    this.grid.setColumnData('offenderBookId', index, resData.offenderBookId);
                    this.offtxnData[index].offenderId = resData.rootOffenderId;
                    this.paymentPlanDisableFun(resData.rootOffenderId);
                    this.offtxnData[index].txnId = resData.txnId;
                    this.tempOffenderBookId = resData.offenderBookId;
                    this.offtxnData[index].offenderBookId = resData.offenderBookId;
                    this.offtxnData[index].receiptNumber = resData.receiptNumber;
                    this.getOffenderDeductionFlag(resData.rootOffenderId, this.sessionManager.currentCaseLoadType);
                    this.offFeeExecuteQuery();

                }
            });
        }
    }
    getOffenderDeductionFlag(offenderId, caseloadType) {
        const bean = {
            'offenderId': offenderId,
            'caseloadId': caseloadType,
            'txnType': this.txnType
        };
        this.ocdbreciFactory.csldDbenExecuteQuery(bean).subscribe(resDataList => {
            if (resDataList.length > 0) {
                this.docketInfoNumber = true;
            } else {
                this.docketInfoNumber = false;
            }
        });
    }
    onAmountBlurData(amount) {
         this.amountFormat.amountFormatEvent(amount);
        this.offtxnModel.txnEntryAmountOne = JSON.parse(JSON.stringify(this.amountFormat.amountFormat(amount)));
    }
    amountKeyDownData(event, comp) {
        if (!this.amountFormat.avoidKeys(event, this.txnEntryAmountOne)) {
            event.stopPropagation();
            return false;
        }
    }
    onGridInsert = () => {
        if (!this.offtxnModel.txnEntryAmountOne && this.offtxnModel.txnEntryAmountOne !== 0) {
            this.show('ordrecei.controltotalmustbeentered');
            return null;
        }
        if (Number(this.offtxnModel.txnEntryAmountOne) <= 0) {
            this.show('ordrecei.ctrtlshdbgrterthnzrodolr');
            return null;
        }
        if (!this.txnType) {
            this.show('ocdbreci.paymentmethodmustbeentered');
            return null;
        }
        const isValid = this.validateRowsData(this.offtxnData, true);
        if (!isValid) {
            return;
        }
        return {
            'caseloadId': this.sessionManager.currentCaseLoad,
            'txnType': this.txnType,
            'butNameList': '...',
        };
    }

    onGridClear = () => {
     /* if (this.offtxnData.length > 0) {
            this.disableSavebutton = false;
        } else {
            this.disableSavebutton = true;
        }  */
        this.overrideobligati = true;
        this.offFeeBillTranModel=new OffFeeBillTransactions();
        this.offFeeExecuteQuery();
        const res = this.grid.gridOptions.api.updateRowData({ remove: [this.selectedRow] });
        const index = this.offtxnData.indexOf(this.selectedRow);
        this.offtxnData.splice(index, 1);
        this.grid.btnSavebtnDisable = this.grid.isSaveDisabled();
        if (this.offtxnData.length === 0) {
            this.disableSavebutton = true;
            return true;
        } if (this.offtxnData[index]) {
            this.selected = index;
        } else {
            this.selected = index - 1;
        }
        return false;
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }

    offenderTxnDataInsert() {
        this.offtxn1InsertList = [];
        this.prepaidFeeAcntInsertList = [];
        this.grid.addedMap.forEach(
            (v: any, k: number) => {
                if (v.offenderIdDisplay) {
                    this.offtxn1InsertList.push(v);
                }
                if (v.feeCode || v.amount) {
                    this.prepaidFeeAcntInsertList.push(v);
                }
            }
        );
    }
    offenderTxnDataUpdate() {
        this.offtxn1UpdateList = [];
        this.grid.updatedMap.forEach(
            (v: any, k: number) => {
                if (v.offenderIdDisplay) {
                    this.offtxn1UpdateList.push(v);
                }
            }
        );
    }

    offenderFeeDataUpdate() {
        this.offFeeUpdateList = [];
        this.offtxnData.forEach(e => {
            if (e.eventUpdateList && e.eventUpdateList.length > 0) {
                e.eventUpdateList.forEach(ele => {
                    ele.billTxnType = e.txnType;
                    this.offFeeUpdateList.push(ele);
                });
            }
        });
    }

    validationMethodOne(inserList: any) {
        const is = { valid: true }
        if (inserList != null && inserList.length > 0) {
            for (let i = 0; i < inserList.length; i++) {
                if (inserList[i].feeCode && (inserList[i].amount<0 || inserList[i].amount==undefined)) {
                    this.type = 'warn';
                    this.message = this.trMsg('ocdbreci.prepaidamountmustbeentered');
                    this.show(this.message, this.type);
                    is.valid = false;
                    return is.valid;
                }
                //if Offender Fee and Prepaid Fee data not there 
                if ((inserList[i].offFeeBillList == undefined || inserList[i].offFeeBillList == null) && (inserList[i].amount == undefined || inserList[i].amount == null)) {
                    var amt = Number(inserList[i].txnEntryAmount);
                    this.type = 'warn';
                    this.message = this.trMsg('common.transactionisnotbalancedifferenceof', ` ${amt.toFixed(2)}`);
                    this.show(this.message, this.type);
                    is.valid = false;
                    return is.valid;
                }

                //if Offender Fee data not there & Prepaid Fee data there 
                if ((inserList[i].offFeeBillList == undefined || inserList[i].offFeeBillList == null) && (inserList[i].amount != undefined || inserList[i].amount != null)) {
                    if ((Number(inserList[i].amount) > Number(inserList[i].txnEntryAmount)) || (Number(inserList[i].amount) < Number(inserList[i].txnEntryAmount))) {
                        var amt = inserList[i].amount - inserList[i].txnEntryAmount;
                        if (Number(amt) < 0) {
                            amt = (Number(amt) * -1);
                        }
                        this.type = 'warn';
                        this.message = this.trMsg('common.transactionisnotbalancedifferenceof', ` ${amt.toFixed(2)}`);
                        this.show(this.message, this.type);
                        is.valid = false;
                        return is.valid;
                    }
                }

                //if Offender Fee data there & Prepaid Fee data not there 
                if ((inserList[i].offFeeBillList != undefined || inserList[i].offFeeBillList != null) && (inserList[i].amount == undefined || inserList[i].amount == null)) {
                    var offFeetotalAmt = 0;
                    for (let j = 0; j < inserList[i].offFeeBillList.length; j++) {
                        if (inserList[i].offFeeBillList[j].amount != null) {
                            if (Number(inserList[i].offFeeBillList[j].balance) <= 0 && Number(inserList[i].offFeeBillList[j].amount) >= 0) {
                                this.type = 'warn';
                                this.message = this.trMsg('ocdbreci.amountcannotbegreaterthanbalanceowing');
                                this.show(this.message, this.type);
                                is.valid = false;
                                return is.valid;
                            }
                            if (Number(inserList[i].offFeeBillList[j].balance) < Number(inserList[i].offFeeBillList[j].amount)) {
                                this.type = 'warn';
                                this.message = this.trMsg('ocdbreci.amountcannotbegreaterthanbalanceowing');
                                this.show(this.message, this.type);
                                is.valid = false;
                                return is.valid;
                            }
                            offFeetotalAmt = Number(offFeetotalAmt) + Number(inserList[i].offFeeBillList[j].amount);
                        }
                    }
                    if (Number(offFeetotalAmt) > Number(inserList[i].txnEntryAmount) || Number(offFeetotalAmt) < Number(inserList[i].txnEntryAmount)) {
                        var amt = offFeetotalAmt - Number(inserList[i].txnEntryAmount);
                        if (Number(amt) < 0) {
                            amt = (Number(amt) * -1);
                        }
                        this.type = 'warn';
                        this.message = this.trMsg('common.transactionisnotbalancedifferenceof', ` ${amt.toFixed(2)}`);
                        this.show(this.message, this.type);
                        is.valid = false;
                        return is.valid;
                    }
                }
                //if Offender Fee data there & Prepaid Fee data there
                if ((inserList[i].offFeeBillList != undefined || inserList[i].offFeeBillList != null) && (inserList[i].amount != undefined || inserList[i].amount != null)) {
                    var offFeetotalAmt = 0;
                    for (let j = 0; j < inserList[i].offFeeBillList.length; j++) {
                        if (inserList[i].offFeeBillList[j].amount != null) {
                            offFeetotalAmt = Number(offFeetotalAmt) + Number(inserList[i].offFeeBillList[j].amount);
                        }
                    }
                    offFeetotalAmt = Number(offFeetotalAmt) + Number(inserList[i].amount);
                    if ((Number(offFeetotalAmt) > inserList[i].txnEntryAmount) || (Number(offFeetotalAmt) < Number(inserList[i].txnEntryAmount))) {
                        var amt = offFeetotalAmt - Number(inserList[i].txnEntryAmount);
                        if (Number(amt) < 0) {
                            amt = (Number(amt) * -1);
                        }
                        this.type = 'warn';
                        this.message = this.trMsg('common.transactionisnotbalancedifferenceof', ` ${amt.toFixed(2)}`);
                        this.show(this.message, this.type);
                        is.valid = false;
                        return is.valid;
                    }
                }

            }
        }
        return is.valid;
    }
    onSave() { 
            if(this.txnTypeFlag){
                this.show(this.translateService.translate('ocdrecei.txntypenotdefined'));
                return;
            }
        if (this.offtxnData.length > 0) {
            for (let i = 0; i < this.offtxnData.length; i++) {
                let dupList = this.offtxnData.filter(x => x.offenderIdDisplay === this.offtxnData[i].offenderIdDisplay);
                if (dupList.length > 1) {
                    this.show(this.translateService.translate('common.rowalreadyexists'), 'warn');
                    return;
                }
            }
        }

        this.moduleName = false;
        const isValid = this.validateRowsData(this.offtxnData);
        if (!isValid) {
            return;
        }

        this.offenderTxnDataInsert();
        this.offenderTxnDataUpdate();
        if (this.btnFlag) {
            this.offenderFeeDataUpdate();
        }
        this.offtxn1CommitModel.insertList = [];
        this.offtxn1CommitModel.prepaidAcntInsertList = [];
        this.offtxn1CommitModel.offFeeUpdateList = [];
        this.offtxn1CommitModel.updateList = [];

        this.offtxn1CommitModel.insertList = this.offtxn1InsertList;
        this.offtxn1CommitModel.prepaidAcntInsertList = this.prepaidFeeAcntInsertList;
        this.offtxn1CommitModel.offFeeUpdateList = this.offFeeUpdateList;
        this.offtxn1CommitModel.updateList = this.offtxn1UpdateList;
        
        //validation
        if (this.btnFlag && !this.validationMethodOne(this.offtxn1InsertList)) {
            return;
        }
        if (this.offtxn1InsertList.length > 0 || this.offtxn1UpdateList.length > 0) {
            for (let i = 0; i < this.offtxn1InsertList.length; i++) {
                if (this.moduleName && this.offtxn1InsertList[i].receiptNumber) {
                    this.offtxn1InsertList[i].caseloadId = this.sessionManager.currentCaseLoad;
                    this.offtxn1InsertList[i].moduleName = 'OCDBRECI';
                    this.offtxn1CommitModel.omsReqBean.moduleName = 'OCDBRECI';
                    this.offtxn1InsertList[i].sessionId = this.sessionManager.randomid;
                } else if (this.moduleName && !this.offtxn1InsertList[i].receiptNumber) {
                    return;
                } else {
                    this.offtxn1CommitModel.omsReqBean = new OmsRequests();
                    this.offtxn1InsertList[i].moduleName = null;
                }
                this.offtxn1InsertList[i].txnEntryAmountOne = this.offtxnModel.txnEntryAmountOne;
                this.offtxn1InsertList[i].txnType = this.txnType;
                this.offtxn1InsertList[i].orgTxnType = this.txnType;
                if (this.offtxn1InsertList[i] && this.offtxn1InsertList[i].offFeeBillList && this.offtxn1InsertList[i].offFeeBillList.length > 0) {
                    this.offtxn1InsertList[i].offFeeBillList.forEach(e => {
                        e.billAgingEndDate = DateFormat.getDate(e.billAgingEndDate);
                        e.billGenerateDatetime = DateFormat.getDate(e.billGenerateDatetime);
                        e.billAgingStartDate=  DateFormat.getDate(e.billAgingStartDate);
                        e.billTxnDatetime=  DateFormat.getDate(e.billTxnDatetime);
                        e.offAdjCancRsn = undefined;
                        e.offAdjSubRsn = undefined;
                        e.offAdjTxnId = undefined;
                        e.offAdjRevRsn = undefined;
                        e.billTxnComment = undefined;
                        e.originalBillId = undefined;
                        e.originalBillTxnNo = undefined;
                        e.originalOffAdjTxnId = undefined;
                        // e.billArDueDate =  DateFormat.getDate( e.billArDueDate);
                        // e.billLdppEndDate= DateFormat.getDate( e.billLdppEndDate);
                        // e.billLdppStartDate = DateFormat.getDate(e.billLdppStartDate);
                        if (e.amount != null && e.amount > 0) {
                            e.balance = ( e.amount);
                        }
                    });
                }
                this.offtxn1CommitModel.insertList = this.offtxn1InsertList;
            }
        }
        this.offtxnDataTemp = JSON.parse(JSON.stringify(this.offtxnData));
        const offtxn1SaveData = this.ocdbreciFactory.offTxn1Commit(this.offtxn1CommitModel);
        offtxn1SaveData.subscribe(data => {
            this.adjustTxnEntryId = 0;
            if (data.length > 0 && data[0].report) {
                const base64pdf = 'data:application/pdf;base64,';
                const pdf = base64pdf + data[0].report;
                const win = window.open(pdf);
                win.document.writeln(`<iframe src="${pdf}" style="width:100%; height:100%"></iframe>`);
            }
            if (data[0] && data[0].sealFlag === '2') {
                this.show('ocdbreci.errorwhencheckingoffendertrustaccount');
                return;
            }
            if (data[0] && data[0].sealFlag === '3') {
                this.show('ocdbreci.offenderhasclosedtrustaccount');
                return;
            }
            if (data && data.sealFlag === '4') {
                this.show('ocdbreci.offenderhasnoactivetrust');
                return;
            }
            if (data[0] && data[0].sealFlag === '5') {
                this.show('ocdbreci.offenderhasmultipleaccountsat' + this.sessionManager.currentCaseLoad);
                return;
            }
            if (data && data.sealFlag === '6') {
                this.show('ocdbreci.transactiontypedoesnotexist');
                return;
            }
            if (data[0] && data[0].sealFlag === '7') {
                this.show('ocdbreci.errorunabletoinsertrecordoffendertransactions');
                return;
            }
            if (data[0] && data[0].sealFlag === '8') {
                this.show('ocdbreci.othererrorinprocessgltransnew');
                return;
            }
            if (data[0] && data[0].sealFlag === '9') {
                this.show('ocdbreci.othererrorindeductions');
                return;
            }
            if (data[0] && data[0].sealFlag === '10') {
                this.show('ocdbreci.transactioncannotbeprocessed');
                return;
            }
            if (data[0] && data[0].sealFlag === '11') {
                this.show('ocdbreci.amountcannotbegreaterthanbalanceowing');
                return;
            }
            if (data[0] && data[0].sealFlag === '1') {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].receiptNumber) {
                        this.grid.setColumnData('receiptNumber', i, data[i].receiptNumber);
                        this.txnId = data[i].txnId;
                        this.adjustTxnEntryId = data[i].adjustTxnEntryId;
                    }else{
                        this.txnId = data[i].txnId;
                        this.adjustTxnEntryId = data[i].adjustTxnEntryId;
                    }
                }
                //this.offtxnDataTemp = data;
                this.message = this.translateService.translate('ocdbreci.transactionidsuccess');
                this.message = String(this.message).replace('&TXNID&', this.txnId);
                this.message = String(this.message).replace('&TXNCOUNT&', this.adjustTxnEntryId);
                this.show(this.message, 'success');
                this.printReportBtn = false;
                this.disableSavebutton = true;
                this.printDisabled = false;
                this.txnEntryDesc = 'Processing record ' + this.adjustTxnEntryId;
                this.adjustTxnEntryId = 0;
                this.gridupdate = true;
                this.commonCellEditDsbl = true;
                this.offTxnReadOnly = true;
                //this.offtxnData = [];
                //this.offtxnData = data;
                this.offTxnInsert = false;
                this.offFeeExecuteQuery();
            }
        });
    }
    printReport() {

        if(this.btnFlag){
            if(!this.receiptProductionFlag || this.receiptProductionFlag === 'N'){
                this.show(this.translateService.translate('ocdbreci.printreceripvalidation'),'warn');
                return;
            }
            this.offtxnDataReport = this.offtxnData;
            this.offtxnDataReport.forEach(element => {
                element.moduleName = 'OCROBREC';
                element.sessionId = this.sessionManager.randomid;
                element.nbtModifyUserId = this.sessionManager.getId();
                element.caseloadId = this.sessionManager.currentCaseLoad;
                element.txnId = Number(this.txnId);
            });
            this.offtxn2CommitModel.insertList = this.offtxnDataReport;
            const offtxnSaveData = this.ocdbreciFactory.printReportSupv(this.offtxn2CommitModel);
            offtxnSaveData.subscribe(data => {
                if (data && data.length > 0) {
                    data.forEach(element => {
                        if (element.report) {
                            const base64pdf = 'data:application/pdf;base64,';
                            const pdf = base64pdf + element.report;
                            const win = window.open(pdf);
                            win.document.writeln(`<iframe src="${pdf}" style="width:100%; height:100%"></iframe>`);
                        }
                    });
                }
            });

        } else {
            if (this.offtxnData.length === 0) {
                this.printDisabled = true;
                this.gridupdate = false;
                return;
            }
            this.offtxnModel.moduleName = 'OCDBRECI';
            this.offtxn1CommitModel.omsReqBean.moduleName = 'OCDBRECI';
            this.offtxnModel.sessionId = this.sessionManager.randomid;
            this.offtxn1CommitModel.insertList = this.offtxnData;
            const offtxnSaveData = this.ocdbreciFactory.offTxnCommitRecipt(this.offtxn1CommitModel);
            offtxnSaveData.subscribe(data => {
                if (data && data.length > 0) {
                    data.forEach(element => {
                        if (element.report) {
                            const base64pdf = 'data:application/pdf;base64,';
                            const pdf = base64pdf + element.report;
                            const win = window.open(pdf);
                            win.document.writeln(`<iframe src="${pdf}" style="width:100%; height:100%"></iframe>`);
                        }
                    });
                }
            });
        }
    }
    validateRowsData(dataList: any[], addnew?): boolean {
        if (!this.offtxnModel.txnEntryAmountOne && this.offtxnModel.txnEntryAmountOne !== 0) {
            this.show('ordrecei.controltotalmustbeentered');
            return false;
        }
        if (Number(this.offtxnModel.txnEntryAmountOne) <= 0) {
            this.show('ordrecei.controltotalshouldbegreaterthanzerodollers');
            return false;
        }
        if (!this.txnType) {
            this.show('ocdbreci.paymentmethodmustbeentered');
            return false;
        }
        const validate = { isValid: true };
        const totAmount = { txnAmount: 0 };
        if (dataList && Array.isArray(dataList)) {
            if (dataList.length === 0) {
                return true;
            }
            for (const ele of dataList) {
                const index = this.offtxnData.indexOf(ele);
                if (!ele.offenderIdDisplay) {
                    this.show(this.translateService.translate('system-profile.off-id-code') + ' must be entered.');
                    validate.isValid = false;
                    break;
                }
                if (String(ele.txnEntryAmount) === '0') {
                    this.show('common.amtgrterthnzrodlrs');
                    validate.isValid = false;
                    break;
                }
                if (!ele.txnEntryAmount) {
                    this.show('ordrecei.amountmustbeentered');
                    validate.isValid = false;
                    break;
                } else {
                    totAmount.txnAmount = Number(totAmount.txnAmount) + Number(ele.txnEntryAmount);
                }
                if (!ele.txnEntryDesc) {
                    this.show(this.translateService.translate('system-profile.off-id-code') + ' must be entered.');
                    this.grid.setColumnData('offenderIdDisplay', index, undefined);
                    validate.isValid = false;
                    break;
                }
            }
        }
        if (validate.isValid) {
            totAmount.txnAmount = Number(Number(totAmount.txnAmount).toFixed(2));
            if (!addnew && Number(this.offtxnModel.txnEntryAmountOne) !== Number(totAmount.txnAmount)) {
                const tot = { amt: Number(this.offtxnModel.txnEntryAmountOne) - Number(totAmount.txnAmount) };
                tot.amt = Number(Number(tot.amt).toFixed(2));
                if (Number(tot.amt) < 0) {
                    tot.amt = (tot.amt * -1);
                }
                tot.amt = Number(tot.amt.toFixed(2));
                if (this.btnFlag) {
                    const message = this.trMsg('common.transactionisnotbalancedifferenceof', ` ${tot.amt.toFixed(2)}`);
                    this.show(message);
                } else {
                    const message = this.trMsg('common.transactionisnotbalancedifferenceof', ` ${tot.amt.toFixed(2)}`);
                    this.show(message);
                }
                validate.isValid = false;
                return;
            }
        } else {
            return false;
        }
        return validate.isValid;
    }
    onGeneratePayplnClick = () => {
        if (!this.selectedRow.offenderIdDisplay) {
            return;
        }
        if (!this.selectedRow.txnEntryAmount) {
            this.show('ordrecei.amountmustbeentered');
            return;
        }
        this.dialogService.openLinkDialog('/OCUPAYPL', this.selectedRow, 80).subscribe(result => {
        });
    }
    onGenerateOverRideClick = () => {
        if (!this.selectedRow.offenderIdDisplay) {
            return;
        }
        if (!this.selectedRow.txnEntryAmount) {
            this.show('ordrecei.amountmustbeentered');
            return;
        }
        this.dialogService.openLinkDialog('/OCUOVROB', this.selectedRow, 80).subscribe(result => {
        });
    }
    no() {
        this.reciptBtn = true;
        this.disableSavebutton = true;
        this.txnId = null;
        this.txnType = null;
        this.editableData = false;
        this.docketInfoNumber = false;
        this.offtxnModel = new OffenderTransactions();
        this.selectedRow = new OffenderTransactions();
        this.offtxnData = [];
        this.printDisabled = true;
        this.gridupdate = false;
        this.txnEntryDesc = null;
        this.offFeeData = [];
        this.printReportBtn = true;
        this.commonCellEditDsbl = false;
        this.offTxnReadOnly = false;
        this.offTxnInsert = true;
        this.overrideobligati = true;
        this.disableSavebutton = true;
        this.grid.requiredOff('amount');
        this.txnEntryAmountOne = undefined;
    }
    get rettBtnFlg() {
        if (this.offtxnModel.txnEntryAmountOne || this.txnType) {
            return false;
        } else {
            return true;
        }
    }

    paymentPlanDisableFun(offenderId: any) {
        const obj = this.ocdbreciFactory.getPaymentPlaneCount(offenderId);
        obj.subscribe(data => {
            if (data && data > 0) {
                this.reciptBtn = false;
            } else {
                this.reciptBtn = true;
            }
        });
    }


}
