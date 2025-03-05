import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { GlTransactions } from '@inmate/trust/trustaccounts/beans/GlTransactions';
import { OtdglirtService } from '@inmate/trust/generalledger/service/otdglirt.service';
import { GlTransactionsCommitBean } from '@inmate/trust/trustaccounts/beans/GlTransactionsCommitBean';

@Component({
    selector: 'app-otdglirtdialog',
    templateUrl: './otdglirtdialog.component.html'
})

export class OtdglirtdialogComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    offTxnColumnDef: any[];
    gltxn2Data: GlTransactions[] = [];
    gltxn2Model: GlTransactions = new GlTransactions();
    gltxn2ModelTemp: GlTransactions = new GlTransactions();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    gltxn2InsertList: GlTransactions[] = [];
    gltxn2UpdateList: GlTransactions[] = [];
    gltxn2DeleteList: GlTransactions[] = [];
    gltxn2CommitModel: GlTransactionsCommitBean = new GlTransactionsCommitBean();
    msgs: any[] = [];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    offenderIdDisplay: any;
    bookingNo: any;
    lastFirstName: any;
    glTxn2ColumnDef: any[];
    reasonTitle = { 'Description': 'description', 'Reversal Reason': 'code' };
    savedisabled: boolean;
    buttonReadonly: boolean;
    clearDisable: boolean;
    offId: string;
    isLoading: boolean;
    constructor(private otdglirtFactory: OtdglirtService,
        public translateService: TranslateService,
        public dialogService: DialogService) {
        this.glTxn2ColumnDef = [];
    }
    ngOnInit() {
        this.buttonReadonly = true;
        this.glTxn2ColumnDef = [
            { fieldName: '', field: 'txnEntrySeq', editable: false, width: 150 },
            { fieldName: this.translateService.translate('otdglirt.post'), field: 'txnPostUsage', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.accountcode'), field: 'accountCode', editable: false, width: 150 },
            { fieldName: this.translateService.translate('otdglirt.accountname'), field: 'description', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.amount'), field: 'txnEntryAmount', editable: false, width: 150 },
        ];
        if (this.dialog.data && this.dialog.data) {
            this.gltxn2Model.txnEntryDate = this.dialog.data.txnEntryDate;
            this.gltxn2Model.accountCode = this.dialog.data.accountCode;
            this.gltxn2Model.txnId = this.dialog.data.txnId;
            this.gltxn2Model.txnEntrySeq = this.dialog.data.txnEntrySeq;
            this.gltxn2Model.offenderIdDisplay = this.dialog.data.offenderIdDisplay;
            this.gltxn2Model.txnEntryDescOne = this.dialog.data.txnEntryDescOne;
            this.gltxn2Model.txnEntryAmount = this.dialog.data.txnEntryAmount;
            this.gltxn2Model.txnType = this.dialog.data.txnType;
            this.gltxn2Model.deductionId = this.dialog.data.deductionId;
            this.gltxn2Model.caseloadId = this.dialog.data.caseloadId;
            this.gltxn2Model.offenderId = this.dialog.data.offenderId;
            this.gltxn2Model.txnReversedFlag = 'Y';
            this.gltxn2Model.offenderBookId =  this.dialog.data.offenderBookId;
            this.gltxnExecuteQuery();
        }
    }
    onRowClickOnOffenderTransactions(event) {
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    cancel() {
        this.gltxn2Model.txnEntryDescOne = null;
        this.gltxn2Model.reversalReasonCode = null;
        this.clearDisable = true;
    }
    gltxnExecuteQuery() {
        const gltxnResult = this.otdglirtFactory.glTxnOneExecuteQuery(this.gltxn2Model);
        gltxnResult.subscribe(gltxnResultList => {
            if (gltxnResultList.length === 0) {
                this.gltxn2Data = [];
            } else {
                gltxnResultList.forEach(element => {
                    if (element.txnEntryAmount !== null) {
                        element.txnEntryAmount = (element.txnEntryAmount).toFixed(2);
                    }
                });
                this.gltxn2Data = gltxnResultList;

            }
        });
    }
    /**
     * event is fired when click on Previous Page Button.
     */
    otdglirtDialogClose() {
        this.dialog.close(null);
    }

    setDescription(event) {
        this.dialog.close(null);
    }

    forValidation(event) {
        if (event) {
            this.buttonReadonly = true;
            this.clearDisable = false;
        } else {
            this.buttonReadonly = false;
        }
        if (!this.gltxn2Model.reversalReasonCode) {
            this.gltxn2Model.reversalReasonCode = this.gltxn2Model.reversalReasonCode === '' ? undefined : '';
        }
    }
    forCommentValidation(event) {
        if (event) {
            this.clearDisable = false;
        }
    }
    setValidation = () => {
        if (this.buttonReadonly) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdglirt.reasonmustbeentered');
            this.show();
            return false;
        } else {
            return true;
        }
    }
    onButSave() {
        this.gltxn2InsertList = [];
        this.gltxn2UpdateList = [];
        this.gltxn2DeleteList = [];
        this.gltxn2CommitModel.updateList = [];
        this.gltxn2CommitModel.insertList = [];
        if (!this.savedisabled && !this.isLoading) {
            this.isLoading = true;
            if (this.gltxn2Model && !this.gltxn2Model.reversalReasonCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('otdglirt.reasonmustbeentered');
                this.show();
                this.isLoading = false;
                return;
            }
            if (this.gltxn2Model && !this.gltxn2Model.txnEntryDescOne) {
                this.type = 'warn';
                this.message = this.translateService.translate('otdglirt.commentmustbeentered');
                this.show();
                this.isLoading = false;
                return;
            }
            this.gltxn2Model.txnEntryDesc = this.gltxn2Model.txnEntryDescOne;
            this.gltxn2InsertList.push(this.gltxn2Model);
            this.gltxn2CommitModel.insertList = this.gltxn2InsertList;
            const offtxnSaveData = this.otdglirtFactory.glTxnCommit(this.gltxn2CommitModel);
            offtxnSaveData.subscribe(offtxnSaveResult => {
                this.isLoading = false;
                if (offtxnSaveResult === 21) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdglirt.transactionisalreadyreversed');
                    this.show();
                    this.dialog.close(null);
                    return;
                } else if (offtxnSaveResult === 2) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdglirt.thegltransaction');
                    this.show();
                    this.dialog.close(null);
                    return;
                } else if (offtxnSaveResult === 3) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdglirt.transactioncannotbereversed');
                    this.show();
                    this.dialog.close(null);
                    return;
                } else if (offtxnSaveResult === 4) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdglirt.norecordsfound');
                    this.show();
                    this.dialog.close(null);
                    return;
                } else if (offtxnSaveResult === 5) {
                    this.type = 'warn';
                    this.message =
                        this.translateService.translate('otdglirt.thecurrentbalance');
                    this.show();
                    this.dialog.close(null);
                    return;
                } else if (offtxnSaveResult === 6) {
                    this.type = 'warn';
                    this.message =
                        this.translateService.translate('otdglirt.thecurrentbalance');
                    this.show();
                    this.dialog.close(null);
                    return;
                } else if (offtxnSaveResult === 7) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdglirt.codeaccount');
                    this.show();
                    this.dialog.close(null);
                    return;
                } else if (offtxnSaveResult === 8) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdglirt.cannotinsertrecord');
                    this.show();
                    this.dialog.close(null);
                    return;
                } else if (offtxnSaveResult === 9) {
                    this.type = 'warn';
                    this.offId = String(this.gltxn2Model.offenderId);
                    this.message =
                        this.translateService.translate('otdglirt.offenderhasclosed');
                    this.message = this.message.replace('%offenderId%', this.offId);
                    this.show();
                    this.dialog.close(null);
                    return;
                } else if (offtxnSaveResult === 10) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdglirt.offenderhasmultiple');
                    this.show();
                    this.dialog.close(null);
                    return;
                } else if (offtxnSaveResult === 11) {
                    this.type = 'warn';
                    this.offId = String(this.gltxn2Model.offenderId);
                    this.message = this.translateService.translate('otdglirt.offenderhasnotrustaccount');
                    this.message = this.message.replace('%offenderId%', this.offId);
                    this.show();
                    this.dialog.close(null);
                    return;
                } else if (offtxnSaveResult === 12) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdglirt.unabletoupdateoffendertransactions');
                    this.show();
                    this.dialog.close(null);
                    return;
                } else if (offtxnSaveResult === 13) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdglirt.cannotinsertintoofftrans');
                    this.show();
                    this.dialog.close(null);
                    return;
                } else if (offtxnSaveResult === 14) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdglirt.cannotupdateoffenderdeductions');
                    this.show();
                    this.dialog.close(null);
                    return;
                } else if (offtxnSaveResult === 15) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdglirt.cannotupdateoffenderdeductions');
                    this.show();
                    this.dialog.close(null);
                    return;
                } else if (offtxnSaveResult === 16) {
                    this.type = 'warn';
                    this.message =
                        this.translateService.translate('otdglirt.cannotupdateoffenderothersexception');
                    this.show();
                    this.dialog.close(null);
                    return;
                } else if (offtxnSaveResult === 17) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdglirt.unabletoreversebeneficiary');
                    this.show();
                    this.dialog.close(null);
                    return;
                } else if (offtxnSaveResult === 18) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdglirt.nodatafound');
                    this.show();
                    this.dialog.close(null);
                    return;
                } else if (offtxnSaveResult === 19) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdglirt.whenothersexception');
                    this.show();
                    this.dialog.close(null);
                    return;
                } else if (offtxnSaveResult === 20) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('otdglirt.unabletoupdategltransactions');
                    this.show();
                    return;
                } else {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    this.dialog.close(null);
                    return;
                }
            }, err => {
                this.isLoading = false;
            });
        }
    }

    clearBtnDisable() {
        if (this.gltxn2Model && (this.gltxn2Model.txnEntryDescOne || this.gltxn2Model.reversalReasonCode)) {
            return false;
        }
        return true;
    }
}
