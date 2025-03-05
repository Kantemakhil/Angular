import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtdcrvoiService } from '@inmate/trust/checks/service/otdcrvoi.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { BankChequeRegisters } from '@inmate/trust/checks/beans/BankChequeRegisters';
import { BankChequeData } from '@inmate/trust/checks/beans/BankChequeData';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { BankChequeRegistersCommitBean } from '@inmate/trust/checks/beans/BankChequeRegistersCommitBean';

@Component({
    selector: 'app-otdcrvoi',
    templateUrl: './otdcrvoi.component.html'
})

export class OtdcrvoiComponent implements OnInit {
    @ViewChild('grid', {static: true}) grid: any;
    msgs: any[] = [];
    bankcrData: BankChequeRegisters[] = [];
    bankcrDataTemp: BankChequeRegisters[] = [];
    bankcrModel: BankChequeRegisters = new BankChequeRegisters();
    bankcrModelTemp: BankChequeRegisters = new BankChequeRegisters();
    bankcrIndex = -1;
    bankcrIndexTemp: number;
    bankChequeRegCommitModel: BankChequeRegistersCommitBean = new BankChequeRegistersCommitBean();
    bankcrInsertList: BankChequeRegisters[] = [];
    bankcrUpdatetList: BankChequeRegisters[] = [];
    bankcrDeleteList: BankChequeRegisters[] = [];
    bnkcdData: BankChequeData[] = [];
    bnkcdDataTemp: BankChequeData[] = [];
    bnkcdModel: BankChequeData = new BankChequeData();
    bnkcdIndex = -1;
    bankCrColumnDef: any[];
    cgfkBankcrchequestatusRg: any[] = [];
    cgfkBankcraccountcodeRg: any[] = [];
    txnEntryAmount: any;
    checkReasonFlag: boolean;
    isClearAvaliable: boolean;
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    codeLink: string;
    codeTitles: any;
    codeValue: any;
    statusTitles: any;

    constructor(private otdcrvoiFactory: OtdcrvoiService,
        public translateService: TranslateService,
        private sessionManager: UserSessionManager,
        public dialogService: DialogService) {
        this.bankCrColumnDef = [];
    }
    ngOnInit() {
        this.bankcrIndexTemp = undefined;
        this.txnEntryAmount = undefined;
        this.checkReasonFlag = false;
        this.isClearAvaliable = true;
        this.codeLink = `otdcrvoi/cgfkBankCrAccountCodeRecordGroup?caseloadId=${this.sessionManager.currentCaseLoad}`;
        this.codeTitles = { 'code': this.trMsg('common.code'), 'domain': this.trMsg('common.name') };
        this.statusTitles = { 'code': this.trMsg('common.status'), 'description': this.trMsg('common.description') };
        this.bankCrColumnDef = [
            {
                fieldName: this.translateService.translate('common.codemandatory'), field: 'accountCode', editable: false,
            },
            {
                fieldName: '', field: 'btn', datatype: 'launchbutton', link: '/OTUGLTRD', modal: true,
                updateField: 'row', onLaunchClick: this.offenderLaunchClick, data: 'row'
            },
            {
                fieldName: this.translateService.translate('otidtacc.check'), field: 'chequeNumber',
                editable: false,
            },
            {
                fieldName: this.translateService.translate('otdcrvoi.checkdate'), field: 'createDate', datatype: 'date',
                editable: false,
            },
            {
                fieldName: this.translateService.translate('otdcrvoi.trans'), field: 'txnId',
                editable: false
            },
            {
                fieldName: this.translateService.translate('common.statusmandatory'), field: 'chequeStatus',
                editable: true, datatype: 'lov', domain: 'CHEQUE_STS', cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('common.reason') + '*', field: 'reasonText', editable: true,
                cellEditable: this.canCellEdit, datatype: 'text', uppercase: 'false', maxlength: 40
            },
            { fieldName: '', field: 'enableReason', hide: true }
        ];
    }

    validateRecord(list: any[]): boolean {
        const is = { valid: true };
        if (list && Array.isArray(list)) {
            list.forEach(data => {
                if (!data.reasonText) {
                    this.show('otdcrvoi.reasonmustbeenterd');
                    is.valid = false;
                    return;
                }
            });
        }
        return is.valid;
    }

    onGridCommit(event) {
        if (event) {
            if (event.updated && Array.isArray(event.updated)) {
                if (!this.validateRecord(event.updated)) {
                    return;
                }
                const is = { closed: false, closeIndex: -1 };
                event.updated.forEach(ele => {
                    if (ele.closedFlag === 'Y') {
                        is.closed = true;
                        is.closeIndex = event.updated.indexOf(ele);
                        return;
                    }
                });
                if (is.closed) {
                    const dlgData = {
                        label: this.trMsg('otdcrvoi.doyouwishtoreopen'),
                        yesBtn: true, noBtn: true
                    };
                    this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dlgData, 40)
                        .subscribe(ele => {
                            if (ele) {
                                this.otdcrvoiSavebankcrForm(event);
                            } else {
                                this.ClearGridOnValidation(this.bankcrIndex);
                                if (event.updated[is.closeIndex]) {
                                    const cRecord = event.updated[is.closeIndex];
                                    const mssg = this.trMsg('otdcrvoi.tristacfprpffosclosed').replace('%offenderId%', cRecord.offenderId)
                                        .replace('%chequeNumber%', cRecord.chequeNumber);
                                    this.show(mssg);
                                }
                            }
                        });
                } else {
                    this.otdcrvoiSavebankcrForm(event);
                }
            }
        }
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    otdcrvoiSavebankcrForm(event) {
        this.bankcrUpdatetList = event.updated;
        this.bankChequeRegCommitModel.insertList = [];
        this.bankChequeRegCommitModel.updateList = [];
        this.bankChequeRegCommitModel.deleteList = [];
        if (this.bankcrUpdatetList.length > 0) {
            this.bankChequeRegCommitModel.updateList = this.bankcrUpdatetList;
        }
        const bankcrSaveData = this.otdcrvoiFactory.bankCrCommit(this.bankChequeRegCommitModel);
        bankcrSaveData.subscribe(data => {
            if (String(data) !== '0' && !isNaN(Number(data))) {
                const msgs = this.trMsg('otdcrvoi.transactionhasbeerevered').replace('%data%', data);
                this.show(msgs, 'success');
            } else {
                this.show(data, 'error');
            }
            this.bankCrExecuteQuery();
        });
    }
    /**
     * event is fired when try to edit the fields except status and reason fields in the grid.
     */
    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (field === 'chequeStatus') {
            if (data.nbtChequeStatus === 'PRINTED') {
                const chng = { index: -1 };
                this.bankcrData.forEach(ele => {
                    const actIndex = this.bankcrData.indexOf(ele);
                    if (ele.chequeStatus !== ele['nbtChequeStatus']) {
                        chng.index = actIndex;
                        return;
                    }
                });
                if (chng.index !== -1) {
                    if (index !== chng.index) {
                        const dlgData = {
                            label: this.trMsg('otdcrvoi.youhavetovoiddoyouwish'),
                            yesBtn: true, noBtn: true
                        };
                        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dlgData, 40)
                            .subscribe(ele => {
                                if (ele) {
                                    this.grid.onSave(null);
                                } else {
                                    this.ClearGridOnValidation(index);
                                }
                            });
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            }
        }

        if (field === 'reasonText') {
            if (data.enableReason === 'Y') {
                return true;
            }
        }


        return false;
    }
    /**
     * event is fired when click on Clear button.
     */
    clearTheRecords() {
        this.bankcrModelTemp = new BankChequeRegisters();
        this.codeValue = undefined;
        this.bankcrData = [];
        this.bnkcdModel = new BankChequeData();
        this.txnEntryAmount = undefined;
        this.bankcrModelTemp.chequeStatus = undefined;
        this.isClearAvaliable = true;
    }
    /**
     * event is fired when click on Retrieve button and displays the data in grid.
     */
    bankCrExecuteQuery(date?) {
        if (date) {
            if (date.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                return;
            }
            if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                return;
            }
        }
        this.checkReasonFlag = false;
        this.bankcrIndexTemp = undefined;
        this.bnkcdModel = new BankChequeData();
        this.txnEntryAmount = null;
        this.bankcrModel = new BankChequeRegisters();
        if (this.codeValue) {
            this.bankcrModel.accountCode = Number(this.codeValue);
        }
        if (this.bankcrModelTemp.chequeNumber || this.bankcrModelTemp.chequeNumber === 0) {
            this.bankcrModel.chequeNumber = this.bankcrModelTemp.chequeNumber;
        }
        if (this.bankcrModelTemp.createDate) {
            this.bankcrModel.createDate = this.bankcrModelTemp.createDate;
        }
        if (this.bankcrModelTemp.txnId || this.bankcrModelTemp.txnId === 0) {
            this.bankcrModel.txnId = this.bankcrModelTemp.txnId;
        }
        if (this.bankcrModelTemp.chequeStatus && this.bankcrModelTemp.chequeStatus.trim().length !== 0) {
            this.bankcrModel.chequeStatus = this.bankcrModelTemp.chequeStatus;
        }
        if (this.bankcrModelTemp.reasonText && this.bankcrModelTemp.reasonText.trim().length !== 0) {
            this.bankcrModel.reasonText = this.bankcrModelTemp.reasonText;
        }
        this.bankcrModel.caseLoadId = this.sessionManager.currentCaseLoad;
        const serviceObj = this.otdcrvoiFactory.
            bankCrExecuteQuery(this.bankcrModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.bankcrData = [];
                this.bankcrModelTemp = new BankChequeRegisters();
                this.codeValue = undefined;
                this.isClearAvaliable = true;
                this.show('common.querycaused');
            } else {
                this.bankcrData = [];
                data.forEach(ele => {
                    ele.nbtChequeStatus = ele.chequeStatus;
                    ele.btn = '...';
                });
                this.bankcrData = data;
                this.bankcrModel = this.bankcrData[0];
                this.bankcrIndex = 0;
                this.bnkcdModel = new BankChequeData();
                this.bnkcdModel.txnId = this.bankcrModel.txnId;
                this.isClearAvaliable = false;
            }
        });
    }
    /**
     * event is fired when change the value in the grid and validates the row data.
     */
    validateThebankcrData = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        if (event.field === 'chequeStatus') {
            if (event.newValue !== event.oldValue) {
                if (event.newValue === 'VOID') {
                    this.otdcrvoiFactory.whenValidatingItem(event.data.txnId)
                        .subscribe(data => {
                            if (data) {
                                if (data.errorCode) {
                                    this.show(data.errorMessage);
                                    this.ClearGridOnValidation(index);
                                } else {
                                    this.grid.setColumnData('reasonText', index, null);
                                    this.grid.setColumnData('enableReason', index, 'Y');
                                }
                            }
                        });

                } else {
                    this.show('otdcrvoi.chekstsnlytovoid');
                    this.ClearGridOnValidation(index);
                }
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    /**
     * event is fired when click on row in the grid.
     * @param event
     */
    onRowClickbankcr(event) {
        if (event) {
            const index = this.bankcrData.indexOf(event);
            this.bankcrModel = new BankChequeRegisters();
            this.bankcrModel = event;
            this.bnkcdModel = new BankChequeData();
            this.bnkcdModel.txnId = this.bankcrModel.txnId;
            this.bnkcdExecuteQuery(index);

        }
    }

    ClearGridOnValidation(index) {
        setTimeout(ele => {
            this.grid.clearRecords(this.grid.gridOptions);
            setTimeout(tme => {
                this.bankcrIndex = index;
            }, 100);
        }, 100);
    }

    /**
     * Method is used to shows the value for Payeename and Amount.
     */
    bnkcdExecuteQuery(index) {
        const bnkcdResult = this.otdcrvoiFactory.
            bnkCdExecuteQuery(this.bnkcdModel);
        bnkcdResult.subscribe(bnkcdResultList => {
            if (bnkcdResultList.length === 0) {
                this.bnkcdData = [];
                this.txnEntryAmount = undefined;
                this.bnkcdModel = new BankChequeData();
            } else {
                this.bnkcdData = [];
                this.bnkcdData = bnkcdResultList;
                this.bnkcdModel = this.bnkcdData[0];
                this.txnEntryAmount = undefined;
                this.txnEntryAmount = Number(this.bnkcdModel.txnEntryAmount).toFixed(2);
                this.bankcrData[index].offenderId = this.bnkcdModel.offenderId;
                this.bankcrData[index]['closedFlag'] = this.bnkcdModel['closedFlag'];
                this.bankcrData[index]['chequeFlag'] = this.bnkcdModel['chequeFlag'];
                this.bankcrData[index]['payeeNameText'] = this.bnkcdModel['payeeNameText'];
            }
        });
    }
    offenderLaunchClick = (data) => {
        const txnId = data.txnId ? data.txnId : '';
        this.otdcrvoiFactory.verifyTxnTypeCount(txnId).subscribe(dataList => {
            if (dataList && dataList.length > 0) {
                if (dataList.length === 1) {
                    this.dialogService.openLinkDialog('/OTUGLTRD', data, 50)
                        .subscribe(ele => { });
                } else {
                    const msgs = this.trMsg('otdcrvoi.tomnytypsretnfrmgl').replace('%txnId%', txnId);
                    this.show(msgs);
                }

            } else {
                this.show('otdcrvoi.ndtlavaingl');
            }
        });
        return false;
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
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }

    get isDataAvaliable(): boolean {
        if (this.bankcrData && this.bankcrData.length > 0) {
            return true;
        }
        return false;
    }
    onCodeBlur() {
        if (!this.codeValue) {
            this.codeValue = this.codeValue === '' ? undefined : '';
        }
    }
    
    onStatusBlur() {
         if (!this.bankcrModelTemp.chequeStatus) {
            this.bankcrModelTemp.chequeStatus = this.bankcrModelTemp.chequeStatus === '' ? undefined : '';
        }
    }
    
    isInsertable() {
         if (this.codeValue || this.bankcrModelTemp.chequeNumber || this.bankcrModelTemp.createDate || this.bankcrModelTemp.txnId
         || this.bankcrModelTemp.chequeStatus || this.bankcrModelTemp.chequeNumber === 0 || this.bankcrModelTemp.txnId === 0) {
             this.isClearAvaliable = false;
         } else {
             this.isClearAvaliable = true;
         }
    }
}
