import {
    Component, OnInit, ViewChild, AfterViewInit
} from '@angular/core';
import { Renderer2 } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OtddisbuService } from '@inmate/trust/trustaccounts/service/otddisbu.service';
import { OffenderTransactions } from '@inmatetrustaccountsbeans/OffenderTransactions';
import { GridComponent, ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OtinamesService } from '@inmate/service/otinames.service';
import { OffenderTransactionsCommitBean } from '@inmate/trust/trustaccounts/beans/OffenderTransactionsCommitBean';
import { OsipsearService } from '@inst/visits-management/service/osipsear.service';
import { OtucpayeService } from '@inmate/trust/trustaccounts/service/otucpaye.service';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';

@Component({
    selector: 'app-otddisbu',
    templateUrl: './otddisbu.component.html'
})
export class OtddisbuComponent implements OnInit, AfterViewInit {
    vProFlag: any;
    allowDML = true;
    processDetail: string;
    comment: any;
    @ViewChild('grid', {static: true}) grid: GridComponent;
    msgs: any[] = [];
    offtxnData: any[] = [];
    VHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    offtxn1Model: OffenderTransactions = new OffenderTransactions();
    insertData: OffenderTransactions[] = [];
    commitBean: OffenderTransactionsCommitBean = new OffenderTransactionsCommitBean();
    txnType: string;
    caseloadType: string;
    caseloadId: string;
    offtxnColumnDefs: any[];
    txCode: string;
    checkProductionFlag: string;
    fieldsEnabled: boolean;
    txnreadOnly: boolean;
    txnEntryAmount: string;
    cropId: string;
    selectedRow: OffenderTransactions = new OffenderTransactions();
    selected = -1;
    cropTitles = { 'code': this.trMsg('common.corporate'), 'domain': this.trMsg('common.corpName') };
    txntypeTitles = {code: 'Txn Type', description: this.trMsg('common.description')};

    constructor(private otddisbuFactory: OtddisbuService,
        private offenderSearchService: OffenderSearchService,
        public translateService: TranslateService,
        private renderer: Renderer2,
        private sessionManager: UserSessionManager,
        private dialogService: DialogService,
        private otinamesService: OtinamesService,
        private osipseraservice: OsipsearService,
        private otucpayeService: OtucpayeService,
        private amountFormat: AmountFormatUtil) {
    }

    ngOnInit() {
        this.txnreadOnly = true;
        this.caseloadType = this.sessionManager.currentCaseLoadType;
        this.offtxnColumnDefs = [
            { fieldName: this.trMsg('system-profile.off-id-code', '*'), field: 'offenderIdDisplay', datatype: 'text',
            editable: true, maxlength: 11 },
            {
                fieldName: '', field: 'idButton', datatype: 'launchbutton',
                updateField: 'row', modal: true, link: '/OTINAMESDIALOG', data: 'row', width: 150,
                onLaunchClick: this.offenderLaunchClick
            },
            { fieldName: this.trMsg('common.lastname'), field: 'lastName', datatype: 'text' },
            { fieldName: this.trMsg('common.firstname'), field: 'firstName', datatype: 'text' },
            { fieldName: this.trMsg('otddisbu.acbal'), field: 'offbal', datatype: '', editable: false },
            {
                fieldName: this.trMsg('otddisbu.ref'), field: 'txnReferenceNumber', uppercase: 'false', datatype: 'text',
                maxlength: 12, editable: true
            },
            {
                fieldName: this.trMsg('common.amount', '*'), field: 'txnEntryAmount', datatype: 'number',
                format: '1.2-2', maxValue: 999999999.99,
                strictFP: true, whole: true, editable: true, cellEditable: this.canCellEdit
            },
            { fieldName: this.trMsg('otddisbu.crdtelgl'), field: 'nbtSlipPrintedFlag', datatype: 'checkbox', eidtable: false },
            {
                fieldName: this.trMsg('common.comment', '*'), field: 'txnEntryDesc', uppercase: 'false', datatype: 'text',
                maxlength: 40, editable: true
            },
        ];
        this.txnType = 'otddisbu/cgfkOffTxn1TxnTypeRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad
        + '&caseloadType=' + this.caseloadType;
        this.getVProValue();
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
        if (this.offtxn1Model.txnId) {
            this.offtxnData = [];
            this.allowDML = true;
            this.processDetail = '';
            this.offtxn1Model.txnId = null;
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
    entervalues(event) {
        if (event) {
            if (event === this.offtxn1Model.txnEntryAmount) {
                this.txnEntryAmount = '';
                if (String(event).indexOf('.') < 0) {
                    this.txnEntryAmount = event + '.00';
                } else {
                    this.txnEntryAmount = event;
                }
                this.offtxn1Model.txnEntryAmount = Number(this.txnEntryAmount);
                return this.offtxn1Model.txnEntryAmount;
            }
           }
    }

    clickTxnType(event) {
        if (!this.offtxn1Model.txnEntryAmount) {
            this.show('otddisbu.ctrlmstbentr');
            return;
        }
    }
    transactionType(event) {
        this.offtxn1Model.payeePersonId = null;
        this.offtxn1Model.payeeCorporateId = null;
        this.offtxn1Model.payeeNameText = null;
        this.offtxnData = [];
        if (event) {
            this.txCode = event.code;
            this.comment = event.description;
            this.offtxn1Model.description = event.description;
            const serviceObj = this.otddisbuFactory.checkProductionFlag(this.txCode, this.sessionManager.currentCaseLoad);
            serviceObj.subscribe(checkFlag => {
                this.checkProductionFlag = checkFlag;
            });
        }
        if (this.checkProductionFlag) {
            if (this.checkProductionFlag === 'Y') {
                this.fieldsEnabled = false;

            }
            if (this.checkProductionFlag === 'N') {
                this.fieldsEnabled = true;
            }
        }

    }
    onRowClickofftxn(event) {
        if (event) {
            this.selectedRow = event;
        } else {
            this.selectedRow = new OffenderTransactions();
        }
     }

    onGridInsert = () => {
        const isValidate = this.validateTransactionData(this.offtxnData, true);
        if (!isValidate) {
            return null;
        }
        const data = {
            offenderIdDisplay: '',
            idButton: '...',
            lastName: '',
            firstName: '',
            offbal: null,
            receiptNumber: null,
            txnEntryAmount: null,
            nbtSlipPrintedFlag: null,
            txnEntryDesc: this.comment,
            txnType: this.offtxn1Model.txnType,
            caseloadId: this.sessionManager.currentCaseLoad,
        };
        return data;
    }
    offenderLaunchClick = (data) => {
        const index = this.offtxnData.indexOf(data);
        this.dialogService.openLinkDialog('/OTINAMESDIALOG', null, 80).subscribe(resData => {
            if (resData) {
                this.validateOffender(resData, index);
            }
        });
        return false;
    }
    validateOffender(data, index) {
        if (data && data.offenderIdDisplay) {
            const reqData = { offenderIdDisplay: data.offenderIdDisplay };
            if (this.vProFlag === 'Y') {
            while (reqData.offenderIdDisplay.length < 10) {
                reqData.offenderIdDisplay = '0' + reqData.offenderIdDisplay;
            }
        }
            this.otinamesService.vThaExecuteQuery(reqData).subscribe(resDataList => {
                if (resDataList && resDataList.length > 0) {
                    const resData = resDataList[0];
                    if (resData.accountClosedFlag !== 'Y') {
                        const freezeDisbursementData = {
                            pCsldId: this.sessionManager.currentCaseLoad,
                            pOffId: resData.rootOffenderId,
                            pTxnType: this.offtxn1Model.txnType,
                            pAcntCode: null,
                            pCsldType: this.sessionManager.currentCaseLoadType,
                            pModuleName: 'OTDDISBU',
                            pDate: null,
                        };
                this.otddisbuFactory.chkDisbursementFreeze(freezeDisbursementData).subscribe(frzData => {
                    if (frzData) {
                        if (frzData.frzFlag === 'Y') {
                            this.show('otddisbu.transcntprcddue');
                            this.grid.setColumnData('offenderIdDisplay', index, null);
                            this.grid.setColumnData('lastName', index, null);
                            this.grid.setColumnData('firstName', index, null);
                            this.offtxnData[index].offenderId = null;
                            this.grid.setColumnData('rootOffenderId', index, null);
                            this.grid.setColumnData('offbal', index, null);
                        } else {
                            this.grid.setColumnData('offenderIdDisplay', index, resData.offenderIdDisplay);
                            this.grid.setColumnData('lastName', index, resData.lastName);
                            this.grid.setColumnData('firstName', index, resData.firstName);
                            this.offtxnData[index].offenderId = resData.rootOffenderId;
                            this.offtxnData[index].offenderBookId = resData.offenderBookId;
                            this.getOffenderSependableBalance(resData, index);
                        }
                    }
                });
                    } else {
                        const msg = this.trMsg('otddisbu.offdrhsclsdac').replace('%offId%', resData.offenderIdDisplay);
                        this.show(msg);
                        this.grid.setColumnData('offenderIdDisplay', index, null);
                        this.grid.setColumnData('lastName', index, null);
                        this.grid.setColumnData('firstName', index, null);
                        this.offtxnData[index].offenderId = null;
                        this.grid.setColumnData('rootOffenderId', index, null);
                        this.grid.setColumnData('offbal', index, null);
                    }
                } else {
                    const msg = this.trMsg('otddisbu.offdrntncsl').replace('%caseload%', this.sessionManager.currentCaseLoad);
                    this.show(msg);
                    this.grid.setColumnData('offenderIdDisplay', index, null);
                    this.grid.setColumnData('lastName', index, null);
                    this.grid.setColumnData('firstName', index, null);
                    this.grid.setColumnData('offbal', index, null);
                }
            });
        }
    }
    getOffenderSependableBalance(data, index) {
        this.otddisbuFactory.getOffenderSependableBalance(data.rootOffenderId, this.sessionManager.currentCaseLoad,
            this.offtxn1Model.txnType).subscribe(resData => {
                if (resData || Number(resData) === 0) {
                    this.grid.setColumnData('offbal', index, Number(resData).toFixed(2));
                }
            });
    }
    transactionValidate = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        if (event.field === 'offenderIdDisplay' && Number(event.newValue) !== Number(event.oldValue)) {
            this.grid.setColumnData('txnEntryAmount', index, null);
            if (event.newValue) {
                this.validateOffender(event.data, index);
            } else {
                this.grid.setColumnData('offenderIdDisplay', index, null);
                this.grid.setColumnData('lastName', index, null);
                this.grid.setColumnData('firstName', index, null);
                this.grid.setColumnData('offbal', index, null);
                this.offtxnData[index].offenderId = null;
            }
        }
        if (event.field === 'txnEntryAmount') {
            if (!this.isNull(event.newValue)) {
                if (Number(event.newValue) <= 0) {
                    this.show('otddisbu.amtmstbgrtrzro');
                    this.grid.setColumnData('nbtSlipPrintedFlag', index, null);
                    this.grid.setColumnData('txnEntryAmount', index, null);
                } else {
                const getCreditEligibility = this.otddisbuFactory.getCreditEligibility(event.data);
                getCreditEligibility.subscribe(resData => {
                    if (resData) {
                        this.offtxnData[index].totTxnFee = resData.nbtPreWithholdAmount2;
                        if (resData.error) {
                            if (event.data.offbal !== event.data.txnEntryAmount) {
                                this.show(resData.error);
                                this.grid.setColumnData('txnEntryAmount', index, null);
                            }
                        }
                        if (resData.nbtSlipPrintedFlag === 'Y') {
                            this.grid.setColumnData('nbtSlipPrintedFlag', index, 'Y');
                        } else {
                            this.grid.setColumnData('nbtSlipPrintedFlag', index, null);
                        }
                    }
                });
            }
            } else {
                this.grid.setColumnData('nbtSlipPrintedFlag', index, null);
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    onTranactionCommit(event) {
        this.insertData = [];
        this.commitBean.insertList = [];
        this.commitBean.updateList = [];
        this.commitBean.deleteList = [];
        if (this.offtxnData && this.offtxnData.length > 0) {
            const validate = this.validateTransactionData(this.offtxnData);
            if (!validate) {
                return;
            }
            this.insertData = this.offtxnData;
            if (this.insertData) {
                this.insertData.forEach(ele => {
                    if (this.checkProductionFlag === 'Y') {
                        if (this.offtxn1Model.payeePersonId) {
                            ele.payeePersonId = this.offtxn1Model.payeePersonId;
                        }
                        if (this.offtxn1Model.payeeCorporateId) {
                            ele.payeeCorporateId = this.offtxn1Model.payeeCorporateId;
                        }
                        if (this.offtxn1Model.payeeNameText) {
                            ele.payeeNameText = this.offtxn1Model.payeeNameText;
                        }
                    }
                });
                this.commitBean.insertList = this.insertData;
                this.otddisbuFactory.offTxn1Commit(this.commitBean)
                    .subscribe(data => {
                        if (data && data.length > 0) {
                            this.processDetail = `Processed Records ${data.length}`;
                            this.offtxn1Model = new OffenderTransactions();
                            this.cropId = null;
                            // this.offtxnData = data;
                            this.checkProductionFlag = null;
                            this.offtxn1Model.txnId = data[0].txnId;
                            this.show('common.addupdateremoverecordsuccess', 'success');
                                this.allowDML = true;
                                 this.offtxn1Model.txnId =null;
                                 this.processDetail = null;
                        } else {
                            this.show('common.addupdateremoverecordfailed', 'error');
                        }
                    });
            }


        }
    }
    validateTransactionData(dataList: any[], addnew?) {
        if (typeof this.offtxn1Model.txnEntryAmount === 'number' && this.offtxn1Model.txnEntryAmount <= 0) {
            this.show('otddisbu.ctrltotcnnotless');
            return false;
        }
        if (!this.offtxn1Model.txnEntryAmount) {
            this.show('otddisbu.ctrlmstbentr');
            return false;
        }
        if (!this.offtxn1Model.txnType) {
            this.show('otddisbu.txntypmtentr');
            return false;
        }
        if (this.checkProductionFlag === 'Y') {
            if (!this.offtxn1Model.payeeNameText && !(this.offtxn1Model.payeePersonId || this.offtxn1Model.payeeCorporateId)) {
                this.show('otddisbu.pyenmententr');
                return false;
            }
        }

        const validate = { isValid: true };
        const totAmount = { txnAmount: 0 };
        if (dataList && Array.isArray(dataList)) {
            if (dataList.length === 0) {
                return true;
            }
            dataList.forEach(ele => {
                if (!ele.offenderId) {
                    this.show('otddisbu.ofdrmstbentr');
                    validate.isValid = false;
                    return;
                }
                if (Number(ele.txnEntryAmount) === 0) {
                    this.show('otddisbu.amtmstbgrtrzro');
                }
                if (!ele.txnEntryAmount) {
                    this.show('otddisbu.amtmstbeentr');
                    validate.isValid = false;
                    return;
                } else {
                    totAmount.txnAmount = Number(totAmount.txnAmount) + Number(ele.txnEntryAmount);
                }
                if (!ele.txnEntryDesc) {
                    this.show('otddisbu.cmtmstentr');
                    validate.isValid = false;
                    return;
                }

            });
        }
        if (validate.isValid) {
            totAmount.txnAmount = Number(Number(totAmount.txnAmount).toFixed(2));
            if (!addnew && Number(this.offtxn1Model.txnEntryAmount) !== Number(totAmount.txnAmount)) {
                const tot = { amt: Number(this.offtxn1Model.txnEntryAmount) - Number(totAmount.txnAmount) };
                tot.amt = Number(Number(tot.amt).toFixed(2));
                if (Number(tot.amt) < 0) {
                    tot.amt = (tot.amt * -1);
                }
                tot.amt = Number(tot.amt.toFixed(2));
                const msg = this.trMsg('otddisbu.trnsnotbal').replace('%amt%', String(tot.amt));
                this.show(msg);
                validate.isValid = false;
                return;
            }
        } else {
            return false;
        }
        return validate.isValid;
    }
    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (!data.offenderId) {
            this.show('otddisbu.offdrmstentr');
            return false;
        }
        return true;
    }
    afterPerDlgClosed(event) {
        this.offtxn1Model.payeePersonId = Number(event.personId);
        this.offtxn1Model.payeeNameText = `${event.firstName} ${event.lastName}`;
    }
    get personData(): any {
        const data = new Object();
        const person = {
            'pPersonId': this.offtxn1Model.payeePersonId ? this.offtxn1Model.payeePersonId : null,
            'pSearchType': this.offtxn1Model.payeePersonId ? 'I' : 'N',
        };
        data['forwardToDialog'] = true;
        data['person'] = person;
        return data;
    }
    onCropChange(event) {
        if (event) {
            this.offtxn1Model.payeeCorporateId = Number(event.code);
            this.offtxn1Model.payeeNameText = event.domain;
        } else {
            this.offtxn1Model.payeeCorporateId = null;
            this.offtxn1Model.payeeNameText = null;
        }
    }

    onPersonIdBlur() {
        if (!this.offtxn1Model.payeePersonId && !this.personFlag) {
            this.offtxn1Model.payeeNameText = null;
        } else {
            if (this.offtxn1Model.payeePersonId) {
                this.offtxn1Model.payeeCorporateId = null;
                this.cropId = null;
            } else {
                this.offtxn1Model.payeePersonId = null;
                return;
            }
            const person = {
                'pSearchType': 'I',
                'pPersonId': this.offtxn1Model.payeePersonId,
            };
            this.osipseraservice.personsExecuteQuery(person).subscribe(resPerson => {
                if (resPerson && resPerson.length > 0) {
                    this.afterPerDlgClosed(resPerson[0]);
                } else {
                    this.show('otddisbu.invldprsn');
                    this.offtxn1Model.payeeNameText = null;
                    this.offtxn1Model.payeePersonId = null;
                }
            });
        }


    }

    afterCorpDlgClosed(event) {
        if (event) {
            this.offtxn1Model.payeeCorporateId = Number(event.corporateId);
            this.cropId = String(event.corporateId);
            this.offtxn1Model.payeeNameText = event.corpName ? event.corpName : event.corporateName;
        }
    }

    get personFlag(): boolean {
        if (this.checkProductionFlag === 'Y') {
            if (!this.offtxn1Model.payeeCorporateId) {
                return false;
            }
        }
        return true;
    }
    get corporateFlag(): boolean {
        if (this.checkProductionFlag === 'Y') {
            if (!this.offtxn1Model.payeePersonId) {
                return false;
            }
        }
        return true;
    }

    onTxnTypeBlur() {
        if (!this.offtxn1Model.txnType) {
            this.offtxn1Model.txnType = this.offtxn1Model.txnType === '' ? undefined : '';
            this.checkProductionFlag = null;
        }
    }
    onCorporateBlur() {
        if (this.offtxn1Model.payeeCorporateId || this.offtxn1Model.payeeCorporateId === 0) {
            const reqData = {'corporateId': this.offtxn1Model.payeeCorporateId };
            this.otucpayeService.corpExecuteQuery(reqData).subscribe(resData => {
                if (resData && resData.length > 0) {
                this.afterCorpDlgClosed(resData[0]);
                } else {
                    this.show('otddisbu.invldpcrpid');
                    this.offtxn1Model.payeeCorporateId = null;
                    this.offtxn1Model.payeeNameText = null;
                }
            });
        } else {
            if (!this.corporateFlag) {
            this.offtxn1Model.payeeNameText = null;
            }
        }

    }
    amountKeyDown(event) {
        if (!this.amountFormat.avoidKeys(event, this.offtxn1Model.txnEntryAmount)) {
            event.stopPropagation();
            return false;
           }
    }
    onAmountBlur(amount) {
        this.amountFormat.precisionFlot(amount);
    }
    getVProValue() {
        this.otddisbuFactory.getVProValue().subscribe(data => {
            if (data) {
                this.vProFlag = data;
            }
        });
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
