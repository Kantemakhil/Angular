import {
    Component, OnInit, AfterViewInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtdagjtrService } from '../service/otdagjtr.service';
import { GlTransactions } from '@inmate/trust/trustaccounts/beans/GlTransactions';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { GlTransactionsCommitBean } from '@inmate/trust/trustaccounts/beans/GlTransactionsCommitBean';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { ValidateRowReturn, GridComponent } from '@ui-components/grid/grid.component';

@Component({
    selector: 'app-otdagjtr',
    templateUrl: './otdagjtr.component.html',
    styleUrls: []
})

export class OtdagjtrComponent implements OnInit, AfterViewInit {
    @ViewChild('grid', {static: true}) grid: GridComponent;
    userId: string;
    lvChqpaytyp: string;
    lvChequeProdFlag: string;
    msgs: any[] = [];
    gltxnModel: GlTransactions = new GlTransactions();
    gltxnInsertList: GlTransactions[] = [];
    gltxnCommitModel: GlTransactionsCommitBean = new GlTransactionsCommitBean();
    gltxn1Data: any[] = [];
    glTxn1ColumnDef: any[];
    txnTypeLink: string;
    caseloadId: string;
    caseloadType: string;
    titles = { code: this.trMsg('ordrecei.txnId'), description: this.trMsg('common.description') };
    constructor(private otdagjtrFactory: OtdagjtrService,
        private sessionManager: UserSessionManager,
        private translateService: TranslateService,
        private dialogService: DialogService) {
        this.glTxn1ColumnDef = [];
    }
    ngOnInit() {
        this.gltxnModel.txnEntryDate = DateFormat.getDate();
        this.caseloadId = this.sessionManager.currentCaseLoad;
        this.caseloadType = this.sessionManager.currentCaseLoadType;
        this.userId = this.sessionManager.getId();
        this.txnTypeLink = `otdagjtr/cgfkGlTxnTxnTypeRecordGroup?caseloadId=${this.caseloadId}&caseloadType=${this.caseloadType}`;
        this.glTxn1ColumnDef = [
            { fieldName: this.trMsg('common.code'), field: 'accountCode', editable: false, width: 150 },
            { fieldName: this.trMsg('common.name'), field: 'dspAccountName', editable: false, width: 150 },
            { fieldName: this.trMsg('common.type'), field: 'dspTxnPostingType', editable: false, width: 150 },
            { fieldName: this.trMsg('common.balance'), field: 'nbtBalanceDisplay', editable: false, width: 150 },
            {
                fieldName: this.trMsg('common.amount', '*'), field: 'txnEntryAmount', editable: false, width: 150,
                cellEditable: this.canCellEdit, required: true, datatype: 'number', format: '1.2-2',
                 maxValue: 999999999.99, trictFP: true, whole: true,
            },
            { fieldName:  this.trMsg('common.comment', '*'), field: 'txnEntryDesc', editable: false, width: 150,
             cellEditable: this.canCellEdit },
        ];

    }
    ngAfterViewInit() {
        this.gltxn1Data = [];
    }
    allowNumbers(event) {
    }
    onRowClickgltxn1(event) {
    }
    ok() {
        this.gltxnExecuteQuery();
    }
    no() {
    }
    cancel() {
        this.gltxnModel = new GlTransactions();
        this.gltxn1Data = [];
        this.gltxnModel.txnEntryDate = DateFormat.getDate();
    }
    onOffenderChange(offender) {
    }
    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (!data.code) {
            return true;
        } else {
            return false;
        }
    }
    get personData(): any {
        const data = new Object();
        const person = {
            'pPersonId': this.gltxnModel.payeePersonId ? this.gltxnModel.payeePersonId : null,
            'pSearchType': this.gltxnModel.payeePersonId ? 'I' : 'N',
        };
        data['forwardToDialog'] = true;
        data['person'] = person;
        return data;
    }

    get corporateData(): any {
        const data = {corporateName: '', corporateId: null};
        if (this.gltxnModel.payeeCorporateId) {
            data.corporateId = this.gltxnModel.payeeCorporateId;
            if (this.gltxnModel.payeeNameText) {
                data.corporateName = this.gltxnModel.payeeNameText;
            }
        }
        return data;
    }
    afterPerDlgClosed(event) {
        if (event) {
        this.gltxnModel.payeeCorporateId = null;
        this.gltxnModel.payeePersonId = Number(event.personId);
        this.gltxnModel.payeeNameText = `${event.firstName} ${event.lastName}`;
        }
    }
    afterCorpDlgClosed(event) {
        if (event) {
            this.gltxnModel.payeePersonId = null;
            this.gltxnModel.payeeCorporateId = Number(event.corporateId);
            this.gltxnModel.payeeNameText = event.corpName ? event.corpName : event.corporateName;
        }
    }
    onPersonValidation = () => {
        if (!this.validateTxnModel(true)) {
            return false;
        }
        return true;
    }
    gltxnExecuteQuery() {
        if (!this.validateTxnModel()) {
            return false;
        }
        this.gltxnModel.caseloadId = this.caseloadId;
        this.gltxnModel.caseloadType = this.caseloadType;
        this.gltxnModel.createUserId = this.userId;
        this.otdagjtrFactory.prGetOffsetAccounts(this.gltxnModel)
            .subscribe(resData => {
                this.gltxn1Data = resData;
            });
    }
    onPersonBlur() {
        if (!this.personFlag) {
            if (!this.gltxnModel.payeePersonId) {
                this.gltxnModel.payeeNameText = null;
                return;
            }
        }
        this.otdagjtrFactory.cgfkGltxnpayeepersonidRecordGroup(this.gltxnModel.payeePersonId)
            .subscribe(resData => {
                if (resData && resData.length > 0) {
                    this.afterPerDlgClosed(resData[0]);
                } else {
                    this.show('otdagjtr.invalidvalueforpersonid');
                    this.gltxnModel.payeeNameText = null;
                    this.gltxnModel.payeePersonId = null;
                }
            });
    }
    onCorporateBlur() {
        if (!this.corporateFlag) {
            if (!this.gltxnModel.payeeCorporateId) {
                this.gltxnModel.payeeNameText = null;
                return;
            }
        }
        this.otdagjtrFactory.cgfkGltxnpayeecorporateidRecordGroup(this.gltxnModel.payeeCorporateId)
            .subscribe(resData => {
                if (resData && resData.length > 0) {
                    this.afterCorpDlgClosed(resData[0]);
                } else {
                    this.show('otdagjtr.invalidvaluecorporateid');
                    this.gltxnModel.payeeNameText = null;
                    this.gltxnModel.payeeCorporateId = null;
                }
            });
    }
    onDateBlur(event, num) {
        const date = {txnDate : event ? event : this.gltxnModel.txnEntryDate};
        if (num && !event) {
            date.txnDate = null;
        }
        if (!this.dateValidation(date.txnDate, num)) {
            return false;
        }
        if (event) {
            this.otdagjtrFactory.onTxnEntryDateBlur(this.caseloadId, date.txnDate.getTime())
                .subscribe(resData => {
                    if (resData && resData.error) {
                        this.show(resData.msg);
                        this.gltxnModel.txnEntryDate = null;
                    }
                });
        } else {
            this.gltxnModel = new GlTransactions();
        }
    }
    dateValidation(event?, num?) {
        const date = {txnDate : event ? event : this.gltxnModel.txnEntryDate};
        if (num && !event) {
            date.txnDate = null;
        }
        if (!date.txnDate) {
            this.gltxnModel.txnEntryDate = null;
            this.show('otdagjtr.pleaseenterthetransactiondate');
            return false;
        }
        if (DateFormat.compareDate(date.txnDate, DateFormat.getDate()) > 0) {
            this.show('otdagjtr.futurepostingarenotallowed');
            setTimeout(ele => {
                this.gltxnModel.txnEntryDate = null;
            }, 100);
            return false;
        }
        return true;
    }
    onDescriptionBlur() {
        if (!this.gltxnModel.txnEntryDesc && !this.acntDescFlag) {
            this.show('otdagjtr.transactionentrydescriptionmustbeentered');
            return false;
        }
        return true;
    }

    getFocus(event) {
        if (event && event.focus && typeof event.focus === 'function') {
            setTimeout(ele => {
                event.focus();
            }, 1000);
        }
    }

    txnTypeChangeEvent(event) {
        this.gltxnModel.dspTxnPostingType = null;
        this.gltxnModel.accountCode = null;
        this.gltxnModel.nbtTxnType = null;
        this.gltxnModel.nbtBalance = null;
        this.gltxnModel.dspAccountName = null;
        this.gltxnModel.txnPostUsage = null;
        this.gltxnModel.nbtBalanceDisplay = null;
        this.gltxnModel.payeeNameText = null;
        this.gltxnModel.payeeCorporateId = null;
        this.gltxnModel.payeePersonId = null;
        this.gltxnModel.txnEntryDesc = null;
        this.lvChequeProdFlag = '';
        this.lvChqpaytyp = '';
        if (event) {
            this.otdagjtrFactory.onTxnTypeValueChange(this.caseloadId, this.caseloadType, event.code)
                .subscribe(data => {
                    if (data) {
                        if (data.error) {
                            const error = {msg: data.msg};
                            if (data.codeOne) {
                                String(error.msg).replace('%codeOne%', data.codeOne);
                            }
                            this.show(error.msg);
                            this.gltxnModel.txnType = '';
                        } else {
                            this.gltxnModel.dspTxnPostingType = data.dspTxnPostingType;
                            this.gltxnModel.accountCode = data.accountCode;
                            this.gltxnModel.nbtTxnType = data.nbtTxnType;
                            this.gltxnModel.nbtBalance = data.nbtBalance;
                            this.gltxnModel.dspAccountName = data.dspAccountName;
                            this.gltxnModel.txnPostUsage = data.txnPostUsage;
                            this.lvChequeProdFlag = data.lvChequeProdFlag;
                            this.lvChqpaytyp = data.lvChqpaytyp;
                            if (this.gltxnModel.nbtBalance || this.gltxnModel.nbtBalance === 0) {
                            this.gltxnModel.nbtBalanceDisplay = this.gltxnModel.nbtBalance < 0 ?
                            `<${Math.abs(this.gltxnModel.nbtBalance).toFixed(2)}>` :
                            `${Math.abs(this.gltxnModel.nbtBalance).toFixed(2)}`;
                            }
                            if (data.lvChqpaytyp) {
                                if (data.lvChqpaytyp === 'T') {
                                    this.gltxnModel.payeeNameText = data.payeeNameText;
                                    if (data.payeeCorporateId) {
                                        this.gltxnModel.payeeCorporateId = data.payeeCorporateId;
                                    }
                                    if (data.payeePersonId) {
                                        this.gltxnModel.payeePersonId = data.payeePersonId;
                                    }
                                }
                            }
                        }
                    }
                });
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

    get personFlag(): boolean {
        if (this.gltxnModel.txnEntryDate && this.gltxnModel.txnType && this.lvChequeProdFlag === 'Y' &&
            (this.lvChqpaytyp === 'T' || this.lvChqpaytyp === 'N') && this.gltxnModel.txnEntryDesc) {
            return false;
        }
        return true;
    }

    get personBtnFlag(): boolean {
        if (this.gltxnModel.txnEntryDate && this.gltxnModel.txnType && this.lvChequeProdFlag === 'Y' &&
            (this.lvChqpaytyp === 'T' || this.lvChqpaytyp === 'N')) {
            return false;
        }
        return true;
    }

    get corporateFlag(): boolean {
        if (this.gltxnModel.txnEntryDate && this.gltxnModel.txnType && this.lvChequeProdFlag === 'Y' &&
            (this.lvChqpaytyp === 'T' || this.lvChqpaytyp === 'N') && this.gltxnModel.txnEntryDesc) {
            return false;
        }
        return true;
    }
    get corporateBtnFlag(): boolean {
        if (this.gltxnModel.txnEntryDate && this.gltxnModel.txnType && this.lvChequeProdFlag === 'Y' &&
            (this.lvChqpaytyp === 'T' || this.lvChqpaytyp === 'N')) {
            return false;
        }
        return true;
    }
    get payeeTextFlag(): boolean {
        if (this.gltxnModel.txnEntryDate && this.gltxnModel.txnType && this.lvChequeProdFlag === 'Y' &&
            this.lvChqpaytyp === 'F') {
            return false;
        }
        return true;
    }
    onGridCellClicked(event) {
        if (event && event.accountCode) {
            return;
        }

    }

    validateCommitRecord(listData: any[]) {
        if (!this.validateTxnModel()) {
            return false;
        }
        const valid = { isValid: true };
        const tot = { amt: 0 };
        if (listData != null && Array.isArray(listData)) {
            listData.forEach(data => {
                if (!data.txnEntryDesc || String(data.txnEntryDesc).trim() === '') {
                    this.show('otdagjtr.commentmustbeentered');
                    valid.isValid = false;
                    return false;
                }
                if (data.txnEntryAmount) {
                    tot.amt += Number(Number(data.txnEntryAmount).toFixed(2));
                }
            });
        }
        if (valid.isValid) {
            if (Number(tot.amt) !== Number(this.gltxnModel.txnEntryAmount)) {
                const diff = Number(Math.abs(Number(tot.amt) - Number(this.gltxnModel.txnEntryAmount))).toFixed(2);
                const message = this.trMsg('common.transactionisnotbalancedifferenceof', ` ${diff}`);
                this.show(message);
                valid.isValid = false;
                return false;
            }
        }
        return valid.isValid;
    }

    validateTxnModel(fromPerson?) {
        if (!this.dateValidation()) {
            return false;
        }
        if (!this.gltxnModel.txnType) {
            this.show('otdagjtr.txntypemustbeentered');
            return false;
        }
        if (!this.onDescriptionBlur()) {
            return false;
        }
        if (!fromPerson) {
        if (!this.gltxnModel.accountCode) {
            this.show('otdagjtr.amountmustbeentered');
            return false;
        }
        if (this.gltxnModel.nbtTxnType === 'Y' && String(this.gltxnModel.txnEntryAmount) === '0') {
            this.show('otdagjtr.amountmustbegreaterthanzero');
            return false;
        }
        if (!this.gltxnModel.txnEntryAmount) {
            this.show('otdagjtr.amountmustbeentered');
            return false;
        }
    }
        return true;
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    otdagjtrSavegltxnForm(event) {
        this.gltxnInsertList = [];
        if (!this.validateCommitRecord(this.gltxn1Data)) {
            return;
        }
        this.gltxnModel.reconClearFlag = 'N';
        this.gltxnModel.txnReversedFlag = 'N';
        this.gltxnModel.reversedTxnId = 99;
        this.gltxnModel.reversedGlEntrySeq = 99;
        this.gltxnModel.reversedTxnEntrySeq = 99;
        this.gltxnModel.listSeq = 99;

        this.gltxnInsertList.push(this.gltxnModel);
        this.gltxn1Data.forEach(ele => {
        ele.reconClearFlag = 'N';
        ele.txnReversedFlag = 'N';
        ele.reversedTxnId = 99;
        ele.reversedGlEntrySeq = 99;
        ele.reversedTxnEntrySeq = 99;
        ele.listSeq = 99;
        this.gltxnInsertList.push(ele);
        });
        this.gltxnCommitModel.insertList = [];
        this.gltxnCommitModel.updateList = [];
        this.gltxnCommitModel.deleteList = [];
        this.gltxnCommitModel.insertList = this.gltxnInsertList;
        const gltxnSaveData = this.otdagjtrFactory.glTxnCommit(this.gltxnCommitModel);
        gltxnSaveData.subscribe(data => {
            if (data !== 0) {
                this.gltxnModel.txnId = data;
                const dlgData = {
                    label: this.trMsg('common.addupdateremoverecordsuccess'),
                    yesBtn: true,
                    yesLabel: 'Ok'
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dlgData, 30)
                    .subscribe(resdata => {
                        this.gltxnModel = new GlTransactions();
                        this.gltxn1Data = [];
                        this.gltxnModel.txnEntryDate = DateFormat.getDate();
                    });
            } else {
                this.show('common.addupdateremoverecordfailed', 'error');
            }
        });
    }
    glTransGridValidate = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        if (event.field === 'txnEntryAmount') {
            if (event.newValue && Number(event.newValue) !== Number(event.oldValue)) {
                if (Number(event.data.txnEntryAmount) > 0) {
                    const tempDrCr = this.gltxnModel.txnPostUsage === 'DR' ? 'CR' : 'DR';
                    if (event.data.dspTxnPostingType !== tempDrCr) {
                        if (Number(event.data.nbtBalance) < Number(event.data.txnEntryAmount)) {
                            this.confirmDialogBox(index);
                        }
                    }
                }
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    amountKeyDown(event) {
        if ((event.keyCode >= 0 && event.keyCode <= 31) || (event.keyCode >= 112 && event.keyCode <= 123)) {
            return true;
        } else {
            if (/\d/.test(event.key) || event.key === '.') {
                if (this.gltxnModel.txnEntryAmount) {
                    if (String(this.gltxnModel.txnEntryAmount).includes('.')) {
                        if (event.key === '.') {
                            event.stopPropagation();
                            return false;
                        }
                        if (String(this.gltxnModel.txnEntryAmount).split('.').length >= 2) {
                            const floatingPoints = String(this.gltxnModel.txnEntryAmount).split('.')[1];
                            if (floatingPoints.length >= 2) {
                                event.stopPropagation();
                                return false;
                            }
                        }
                    } else if (String(this.gltxnModel.txnEntryAmount).length >= 9 && event.key !== '.') {
                        event.stopPropagation();
                        return false;
                    } else if (String(this.gltxnModel.txnEntryAmount).split('.').length >= 2) {
                        const floatingPoints = String(this.gltxnModel.txnEntryAmount).split('.')[1];
                        if (floatingPoints.length >= 2) {
                            event.stopPropagation();
                            return false;
                        }
                    }
                }
                return true;
            } else {
                event.stopPropagation();
                return false;
            }
        }
    }
    onTxnTypeBlur() {
        if (!this.gltxnModel.txnType && this.gltxnModel.txnType !== undefined) {
            this.gltxnModel.txnType = this.gltxnModel.txnType === undefined ? '' : undefined;
                this.show('otdagjtr.txntypemustbeentered');
        }
    }
    onAmountBlur(amount) {
        if (amount && (amount.innerValue || String(amount.innerValue) === '0')) {
            if (amount.innerValue === '.') {
                amount.value = '0.00';
            } else if (isNaN(Number(amount.innerValue))) {
                this.gltxnModel.txnEntryAmount = null;
            } else {
            amount.value = Number(amount.innerValue).toFixed(2);
            }
        }
        if (amount && amount.readonly) {
            return;
        }
        if (this.gltxnModel.dspTxnPostingType !== this.gltxnModel.txnPostUsage) {
            if (this.gltxnModel.nbtBalance < this.gltxnModel.txnEntryAmount) {
                this.confirmDialogBox(-2);
            }
        }
    }

    confirmDialogBox(index) {
        const code = index === -2 ? this.gltxnModel.accountCode : this.gltxn1Data[index].accountCode;
        const dlgData = {
            label: this.trMsg('otdagjtr.youareabouttooverdreaft').replace('%accountcode%', ` ${code}`),
            yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dlgData, 50)
            .subscribe(resdata => {
                if (!resdata) {
                    if (index === -2) {
                        this.gltxnModel.txnEntryAmount = null;
                    } else {
                        this.grid.setColumnData('txnEntryAmount', index, null);
                    }


                }
            });
    }
    gltxn1ExecuteQuery() {}
    /**
     *  This function will be executed when commit event is
    * fired
    */
    otdagjtrSavegltxn1Form(event) {}
    syspflExecuteQuery() {}
    /**
     *  This function will be executed when commit event is
    * fired
    */
    otdagjtrSavesyspflForm(event) {}

    get acntDescFlag(): boolean {
        if (this.gltxnModel.txnEntryDate && this.gltxnModel.txnType) {
            return false;
        }
        return true;
    }
    get retrieveFlag(): boolean {
        if (this.gltxn1Data && this.gltxn1Data.length > 0) {
            return true;
        }
        return false;
    }


}
