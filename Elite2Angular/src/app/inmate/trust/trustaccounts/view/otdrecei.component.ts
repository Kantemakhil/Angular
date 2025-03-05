import {
    Component, OnInit, ViewChild, AfterViewInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtdreceiService } from '../service/otdrecei.service';
import { OffenderTransactions } from '@inmate/trust/trustaccounts/beans/OffenderTransactions';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OtinamesService } from '@inmate/service/otinames.service';
import { OtmremitService } from '@inmate/trust/trustaccounts/service/otmremit.service';
import { OffenderTransactionsCommitBean } from '@inmate/trust/trustaccounts/beans/OffenderTransactionsCommitBean';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';

@Component({
    selector: 'app-otdrecei',
    templateUrl: './otdrecei.component.html'
})

export class OtdreceiComponent implements OnInit, AfterViewInit {
    selectedRow: OffenderTransactions = new OffenderTransactions();
    processDetail: string;
    receiptFlag: any;
    comment: any;
    allowDML = true;
    msgs: any[] = [];
    selected = -1;
    @ViewChild('grid', {static: true}) grid: any;
    offtxnModel: OffenderTransactions = new OffenderTransactions();
    offtxn1CommitModel: OffenderTransactionsCommitBean = new OffenderTransactionsCommitBean();
    offtxn1InsertList: OffenderTransactions[] = [];
    offtxnData: OffenderTransactions[] = [];
    offTxnColumnDef: any[];
    txntypeLink = '';
    titles = { code: this.trMsg('ordrecei.txnId'), description: this.trMsg('common.description') };
    constructor(private otdreceiFactory: OtdreceiService,
        private sessionManager: UserSessionManager,
        private translateService: TranslateService,
        private dialogService: DialogService,
        private otinamesService: OtinamesService,
        private otmremitService: OtmremitService,
        private amountFormat: AmountFormatUtil) {
        this.offTxnColumnDef = [];
    }
    ngOnInit() {
        this.txntypeLink = `otdrecei/cgfkOffTxn1TxnTypeRecordGroup?caseloadId=${this.sessionManager.currentCaseLoad}`;
        this.offTxnColumnDef = [
            {
                fieldName: this.trMsg('system-profile.off-id-code', '*'), field: 'offenderIdDisplay', datatype: 'text',
                length: 11, editable: true, width: 150
            },
            {
                fieldName: '', field: 'butNameList', datatype: 'launchbutton', editable: false, width: 150,
                link: '/OTINAMESDIALOG', modal: true, updateField: 'row', onLaunchClick: this.offenderLaunchClick,
                data: 'row'
            },
            { fieldName: this.trMsg('common.lastname'), field: 'lastName', editable: false, width: 150 },
            { fieldName: this.trMsg('common.firstname'), field: 'firstName', editable: false, width: 150 },
            { fieldName: this.trMsg('ordrecei.locn'), field: 'nbtOffenderId', editable: false, width: 150 },
            { fieldName: this.trMsg('ordrecei.receipt'), field: 'receiptNumber', editable: false, width: 150 },
            {
                fieldName: this.trMsg('common.amount', '*'), field: 'txnEntryAmount', editable: true, width: 150,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, required: true,
                strictFP: true, whole: true
            },
            {
                fieldName: 'D', field: 'butDeductionFlag', datatype: 'launchbutton', editable: false, width: 150,
                link: '/OCUOVROB', modal: true, updateField: 'row', onLaunchClick: this.deducLaunchClick,
                data: 'row'
            },
            { fieldName: this.trMsg('common.comment', '*'), field: 'txnEntryDesc', editable: true, width: 150,
            cellEditable: this.canCellEdit },
            {
                fieldName: this.trMsg('common.remitter'), field: 'remitterId', datatype: 'number', whole: true, editable: true, width: 150,
                cellEditable: this.canCellEdit, maxValue: 99999999
            },
            {
                fieldName: '', field: 'butRemId', datatype: 'launchbutton', link: '/OTMREMIT', data: 'row',
                updateField: 'row', modal: true, editable: false, width: 150, onLaunchClick: this.onremitterClick
            },
            { fieldName: 'Remitter Name', field: 'remitterName', editable: false, width: 150 },
            { fieldName: '', field: 'rootOffenderId', hide: true }
        ];
    }

    ngAfterViewInit() {
        const controlTotal = document.getElementById('texttxn_entry_amount');
        if (controlTotal) {
            const controlTotalChilds = controlTotal.getElementsByTagName('INPUT');
            if (controlTotalChilds && controlTotalChilds.length > 0) {
                const inputControlTotal = controlTotalChilds[0];
                if (inputControlTotal) {
                    inputControlTotal['focus'] = this.onControlTotalFocus;
                }
            }
        }
    }

    onControlTotalFocus = () => {
        if (this.offtxnModel.txnId) {
            this.offtxnData = [];
            this.allowDML = true;
            this.processDetail = '';
            this.offtxnModel.txnId = null;
        }
    }

    allowNumbers(event) {
    }

    onAmountBlur(amount) {
        this.amountFormat.precisionFlot(amount);
    }
    onremitterClick = (data) => {
        if (this.offtxnModel.txnId) {
            return;
        }
        const index = this.offtxnData.indexOf(data);
        if (data.offenderIdDisplay) {
            this.dialogService.openLinkDialog('/OTMREMIT', null, 80).subscribe(resData => {
                this.validateRemitter(resData, index);
            });
        } else {
            this.show('ordrecei.offendermustbe');
        }
    }

    validateRemitter(data, index) {
        const reqData = { remitterId: data.remitterId };
        this.otmremitService.remExecuteQuery(reqData).subscribe(resDataList => {
            if (resDataList && resDataList.length > 0) {
                const resData = resDataList[0];
                if (resData && resData.remitterId) {
                    this.grid.setColumnData('remitterId', index, resData.remitterId);
                    const remitterName = `${resData.lastName}, ${resData.firstName}`;
                    this.grid.setColumnData('remitterName', index, remitterName);
                } else {
                    this.grid.setColumnData('remitterId', index, null);
                }
            } else {
                const message = this.trMsg('ordrecei.remitteriddoesnotexist').replace('%remitterId%', reqData.remitterId);
                this.show(message);
                this.grid.setColumnData('remitterId', index, null);
                this.grid.setColumnData('remitterName', index, null);
            }
        });
    }

    amountKeyDown(event) {
        if (!this.amountFormat.avoidKeys(event, this.offtxnModel.txnEntryAmount)) {
            event.stopPropagation();
            return false;
           }
    }

    txnTypeBlur() {
        if (!this.offtxnModel.txnType) {
            this.offtxnModel.txnType = this.offtxnModel.txnType === undefined ? '' : undefined;
        }
    }

    onTxnTypeChange(event) {
        this.offtxnData = [];
        if (event) {
            this.allowDML = true;
            this.processDetail = '';
            this.offtxnModel.txnId = null;
            this.comment = event.description;
            this.chkReceiptFlag();
        } else {
            this.comment = '';
            this.receiptFlag = null;
        }
    }

    offenderLaunchClick = (event) => {
        if (this.offtxnModel.txnId) {
            return;
        }
       
        this.dialogService.openLinkDialog('/OTINAMESDIALOG', null, 80).subscribe(resData => {
            if (resData) {
                const index = this.offtxnData.indexOf(event);
                this.validateOffender(resData, index);
            }
        });
        return false;
    }
    validateOffender(data, index, isValidate?) {
        if (data && data.offenderIdDisplay) {
            const reqData = { offenderIdDisplay: data.offenderIdDisplay };
            /*while (reqData.offenderIdDisplay.length < 10) {
                reqData.offenderIdDisplay = '0' + reqData.offenderIdDisplay;
            }*/
            this.otinamesService.vThaExecuteQuery(reqData).subscribe(resDataList => {
                if (resDataList && resDataList.length > 0) {
                    const resData = resDataList[0];
                    if (resData.accountClosedFlag !== 'Y') {
                        this.grid.setColumnData('offenderIdDisplay', index, resData.offenderIdDisplay);
                        this.grid.setColumnData('lastName', index, resData.lastName);
                        this.grid.setColumnData('firstName', index, resData.firstName);
                        this.grid.setColumnData('nbtOffenderId', index, resData.agyLocId);
                        this.grid.setColumnData('rootOffenderId', index, resData.rootOffenderId);
                        this.offtxnData[index].offenderId = resData.rootOffenderId;
                        this.offtxnData[index].offenderBookId = resData.offenderBookId;
                        this.getOffenderDeductionFlag(resData, index);
                    } else {
                        if (isValidate) {
                        const dlgReqData = {
                            label: this.trMsg('otdrdtfu.closedoffendertrustaccount'),
                            yesBtn: true, noBtn: true
                        };
                        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dlgReqData, 40).subscribe(result => {
                            if (result) {
                                this.grid.setColumnData('offenderIdDisplay', index, resData.offenderIdDisplay);
                                this.grid.setColumnData('lastName', index, resData.lastName);
                                this.grid.setColumnData('firstName', index, resData.firstName);
                                this.grid.setColumnData('nbtOffenderId', index, resData.agyLocId);
                                this.grid.setColumnData('rootOffenderId', index, resData.rootOffenderId);
                                this.offtxnData[index]['accountClosedFlag'] = 'Y';
                                this.offtxnData[index].offenderId = resData.rootOffenderId;
                                this.offtxnData[index].offenderBookId = resData.offenderBookId;
                                this.getOffenderDeductionFlag(resData, index);
                            } else {
                                this.grid.setColumnData('offenderIdDisplay', index, null);
                                this.grid.setColumnData('lastName', index, null);
                                this.grid.setColumnData('firstName', index, null);
                                this.grid.setColumnData('nbtOffenderId', index, null);
                                this.grid.setColumnData('rootOffenderId', index, null);
                                this.grid.setColumnData('accountClosedFlag', index, null);

                            }
                        });
                    } else {
                        this.grid.setColumnData('offenderIdDisplay', index, resData.offenderIdDisplay);
                        this.grid.setColumnData('lastName', index, resData.lastName);
                        this.grid.setColumnData('firstName', index, resData.firstName);
                        this.grid.setColumnData('nbtOffenderId', index, resData.agyLocId);
                        this.grid.setColumnData('rootOffenderId', index, resData.rootOffenderId);
                        this.offtxnData[index]['accountClosedFlag'] = 'Y';
                        this.offtxnData[index].offenderId = resData.rootOffenderId;
                        this.offtxnData[index].offenderBookId = resData.offenderBookId;
                        this.getOffenderDeductionFlag(resData, index);
                    }
                    }
                } else {
                    const message = this.trMsg('ordrecei.offenderisnotin', ` ${this.sessionManager.currentCaseLoad}`);
                    this.show(message);
                    this.grid.setColumnData('offenderIdDisplay', index, null);
                    this.grid.setColumnData('lastName', index, null);
                    this.grid.setColumnData('firstName', index, null);
                    this.grid.setColumnData('nbtOffenderId', index, null);
                    this.grid.setColumnData('rootOffenderId', index, null);
                }
            });
        }
    }
    deducLaunchClick = (data) => {
        if (this.offtxnModel.txnId) {
            return;
        }
        if (data.offenderIdDisplay) {
            const index = this.offtxnData.indexOf(data);
            if (data && data.dedFlag && data.dedFlag === 'Y') {
                const reqData = {
                    'caseloadId': this.sessionManager.currentCaseLoad,
                    'moduleName': 'OTDRECEI',
                    'offenderId': data.rootOffenderId,
                    'txnType': this.offtxnModel.txnType,
                    'receiptAmount': data.txnEntryAmount,
                };
                this.dialogService.openLinkDialog('/OCUOVROB', reqData, 80).subscribe(resData => { });
            } else {
                this.show('ordrecei.thisoffenderhasnoobligation');
            }
        } else {
            this.show('ordrecei.offendermustbe');
        }
    }
    getOffenderDeductionFlag(data, index) {
        if (data && index >= 0) {
            this.otdreceiFactory.deductionsChkOffenderDeductions(this.sessionManager.currentCaseLoad,
                data.rootOffenderId, this.offtxnModel.txnType, 0).subscribe(ele => {
                    if (ele && typeof ele === 'string') {
                        this.offtxnData[index]['dedFlag'] = ele;
                    }
                });
                this.grid.gridOptions.api.clearFocusedCell();
                this.grid.gridOptions.api.startEditingCell({
                    rowIndex: index,
                    colKey: 'txnEntryAmount'
                });
        }
    }
    onOffenderInsert = () => {
        if (!this.offtxnModel.txnEntryAmount && this.offtxnModel.txnEntryAmount !== 0) {
            this.show('ordrecei.controltotalmustbeentered');
            return null;
        }
        if (Number(this.offtxnModel.txnEntryAmount) <= 0) {
            this.show('ordrecei.ctrtlshdbgrterthnzrodolr');
            return null;
        }
        if (!this.offtxnModel.txnType) {
            this.show('ordrecei.txntypemustbeenterd');
            return null;
        }
        const isValid = this.validateRowsData(this.offtxnData, true);
        if (!isValid) {
            return;
        }
        if (this.offtxnModel.txnEntryAmount && this.offtxnModel.txnEntryAmount > 0 && this.offtxnModel.txnType) {
            const data = {
                'butNameList': '...',
                'butDeductionFlag': 'D',
                'butRemId': '...',
                'offenderIdDisplay': '',
                'lastName': '',
                'firstName': '',
                'nbtOffenderId': '',
                'txnEntryDesc': this.comment,
                'caseloadId': this.sessionManager.currentCaseLoad,
                'txnType': this.offtxnModel.txnType,


            };
            return data;
        }
    }
    canCellEdit = (data: any, index: number, field: string) => {
        const fields = ['remitterId', 'txnEntryDesc'];
        if (!data.offenderIdDisplay && fields.includes(field)) {
            this.show('ordrecei.offendermustbe');
            return false;
        }
        return true;
    }
    onPrintBtnclick() {
    }
    onRowClickofftxn(event) {
        if (event) {
            this.selectedRow = event;
        } else {
            this.selectedRow = new OffenderTransactions();
        }

    }

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }
    transactionValidate = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        if (event.field === 'offenderIdDisplay') {
            if (!event.newValue) {
                this.grid.setColumnData('lastName', index, null);
                this.grid.setColumnData('firstName', index, null);
                this.grid.setColumnData('nbtOffenderId', index, null);
                this.grid.setColumnData('rootOffenderId', index, null);
                this.grid.setColumnData('accountClosedFlag', index, null);
            } else if (event.newValue && Number(event.newValue) !== Number(event.oldValue)) {
                this.validateOffender(event.data, index, true);
            }
        }
        if (event.field === 'remitterId') {
            if (event.newValue) {
                this.validateRemitter(event.data, index);
            }
        }
        if (event.field === 'txnEntryAmount' && !this.isNull(event.newValue)) {
            if (Number(event.newValue) === 0) {
                this.grid.setColumnData('txnEntryAmount', index, null);
                this.show('common.amtgrterthnzrodlrs');
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    chkReceiptFlag() {
        this.otdreceiFactory.otdreceiChkReceiptFlag(this.offtxnModel.txnType, this.sessionManager.currentCaseLoad)
            .subscribe(resData => {
                this.receiptFlag = resData;
                if (this.receiptFlag === 'Y') {
                    this.grid.requiredOn('remitterId');
                    this.grid.setColumnHeader('remitterId', this.trMsg('common.remitter', '*'));
                } else {
                    this.grid.requiredOff('remitterId');
                    this.grid.setColumnHeader('remitterId', this.trMsg('common.remitter'));
                }
            });
    }
    offtxn1ExecuteQuery() {
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    otdreceiSaveofftxn1Form(event) {
        const isValid = this.validateRowsData(this.offtxnData);
        if (!isValid) {
            return;
        }
        this.offtxn1CommitModel.insertList = [];
        this.offtxn1InsertList = this.offtxnData;
        this.offtxn1CommitModel.insertList = this.offtxn1InsertList;
        this.processDetail = `Processing record ${this.offtxn1InsertList.length}`;
        const offtxn1SaveData = this.otdreceiFactory.offTxn1Commit(this.offtxn1CommitModel);
        offtxn1SaveData.subscribe(data => {

            if (data && data.length > 0) {
                if (data[0].errorMessage) {
                    this.show(data[0].errorMessage);
                } else {
                    this.show('common.addupdateremoverecordsuccess', 'success');
                    this.offtxnData = data;
                    this.offtxnModel = new OffenderTransactions();
                    this.offtxnModel.txnId = data[0].txnId;
                    /* setTimeout(() => {
                        this.processDetail = undefined;
                        this.offtxnModel.txnId = undefined;
                    }, 3000); */
                }
            } else {
                this.show('common.addupdateremoverecordfailed', 'error');
            }
        });
    }
    validateRowsData(dataList: any[], addnew?): boolean {
        if (!this.offtxnModel.txnEntryAmount && this.offtxnModel.txnEntryAmount !== 0) {
            this.show('ordrecei.controltotalmustbeentered');
            return false;
        }
        if (Number(this.offtxnModel.txnEntryAmount) <= 0) {
            this.show('ordrecei.controltotalshouldbegreaterthanzerodollers');
            return false;
        }
        if (!this.offtxnModel.txnType) {
            this.show('ordrecei.txntypemustbeenterd');
            return false;
        }
        const validate = { isValid: true };
        const totAmount = { txnAmount: 0 };
        if (dataList && Array.isArray(dataList)) {
            if (dataList.length === 0) {
                return true;
            }
            for (const ele  of dataList) {
                if (!ele.offenderIdDisplay) {
                    this.show('ordrecei.offendermustbe');
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
                    this.show('ordrecei.cmtmstentr');
                    validate.isValid = false;
                    break;
                }
                if (this.receiptFlag === 'Y' && !ele.remitterId) {
                    this.show('ordrecei.remitterisrequried');
                    validate.isValid = false;
                    break;
                }
            }
        }
        if (validate.isValid) {
            totAmount.txnAmount = Number(Number(totAmount.txnAmount).toFixed(2));
            if (!addnew && Number(this.offtxnModel.txnEntryAmount) !== Number(totAmount.txnAmount)) {
                const tot = { amt: Number(this.offtxnModel.txnEntryAmount) - Number(totAmount.txnAmount) };
                tot.amt = Number(Number(tot.amt).toFixed(2));
                if (Number(tot.amt) < 0) {
                    tot.amt = (tot.amt * -1);
                }
                tot.amt = Number(tot.amt.toFixed(2));
                const message = this.trMsg('common.transactionisnotbalancedifferenceof', ` ${tot.amt}`);
                this.show(message);
                validate.isValid = false;
                return;
            }
        } else {
            return false;
        }
        return validate.isValid;
    }
    offtxnExecuteQuery() {
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    otdreceiSaveofftxnForm(event) {
    }
    syspflExecuteQuery() {
    }

    txnType2WhenButtonPressedTrigger() {
    }

    isNull(value) {
        return value === null || value === undefined || value === '';
  }

  onGridClear = () => {
    const res = this.grid.gridOptions.api.applyTransaction({ remove: [this.selectedRow]  });
    const index = this.offtxnData.indexOf(this.selectedRow);
    this.offtxnData.splice(index, 1);
    this.grid.btnSavebtnDisable = this.grid.isSaveDisabled();
    if (this.offtxnData.length === 0) {
        return true;
    } if (this.offtxnData[index]) {
        this.selected = index;
    } else {
        this.selected = index - 1;
    }
    return false;
  }


}
