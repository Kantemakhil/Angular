import {
        Component,
        OnInit,
        ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtdmgjtrService } from '../service/otdmgjtr.service';
import { GlTransactions } from '@inmate/trust/trustaccounts/beans/GlTransactions';
import { GlTransactionsCommitBean } from '@inmate/trust/trustaccounts/beans/GlTransactionsCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { AccountCodes } from '@inmate/trust/trustaccounts/beans/AccountCodes';
import { DialogService } from '@ui-components/dialog/dialog.service';

@Component({
        selector: 'app-otdmgjtr',
        templateUrl: './otdmgjtr.component.html'
})

export class OtdmgjtrComponent implements OnInit {
        @ViewChild('grid', {static: true}) grid: any;
        [x: string]: any;
        gltxn1UpdateList: any;
        actionName: string;
        lovModel: any[];
        msgs: any[] = [];
        nameOfLovPage: string;
        listToCompare: any[] = [];
        gltxnData: GlTransactions[] = [];
        gltxnDataTemp: GlTransactions[] = [];
        gltxnModel: GlTransactions = new GlTransactions();
        accountsModel: AccountCodes = new AccountCodes();
        gltxnIndex: number;
        gltxnCommitModel: GlTransactionsCommitBean = new GlTransactionsCommitBean();
        gltxnInsertList: GlTransactions[] = [];
        gltxnUpdatetList: GlTransactions[] = [];
        gltxnDeleteList: GlTransactions[] = [];
        gltxn1Data: GlTransactions[] = [];
        gltxn1DataTemp: GlTransactions[] = [];
        gltxn1Model: GlTransactions = new GlTransactions();
        gltxn1Index: number;
        gltxn1InsertList: GlTransactions[] = [];
        gltxn1UpdatetList: GlTransactions[] = [];
        gltxn1DeleteList: GlTransactions[] = [];
        minDate: Date;
        display: boolean;
        errorMessage: string;
        headerMessage: string;
        disabled: boolean;
        editable: boolean;
        glTxn1ColumnDef: any[];
        salOrdColumnDef: any[];
        omsMpColumnDef: any[];
        offTxnColumnDef: any[];
        cg$ctrlReadOnly: boolean;
        salOrdReadOnly: boolean;
        omsRequestReadOnly: boolean;
        omsMpReadOnly: boolean;
        offTxn1ReadOnly: boolean;
        offTxnReadOnly: boolean;
        sysPflReadOnly: boolean;
        glTxnReadOnly: boolean;
        glTxn1ReadOnly: boolean;
        cgfkGltxnpayeecorporateidRg: any[] = [];
        cgfkGltxn1accountcodeRg: any[] = [];
        cgfkGltxnaccountcodeRg: any[] = [];
        cgfkGltxnpayeepersonidRg: any[] = [];
        accountLink: any;
        caseloadType: string;
        caseloadId: string;
        accountName: string;
        txnPostingType: string;
        code: string;
        txnPostUsageDr: string;
        txnPostUsageCr: string;
        payeePerson: boolean;
        osipsearButton: boolean;
        otucpayeButton: boolean;
        lvlastClosedPeriod: any;
        lvallowedreopenPeriod: any;
        insertFlag: boolean;
        acntTitles = { 'code': 'Account', 'description': 'Name', 'txnPostingType': 'Acct Type' };
        accountCode: string;
        lventerAccountPeriodId: number;
        isPeriodValid: number;
        lBal: number;
        constructor(private otdmgjtrFactory: OtdmgjtrService, public translateService: TranslateService,
                private sessionManager: UserSessionManager, private dialogService: DialogService) {
        }
        ngOnInit() {
                this.osipsearButton = true;
                this.otucpayeButton = true;
                this.txnPostUsageDr = 'Y';
                this.payeePerson = true;
                this.caseloadType = this.sessionManager.currentCaseLoadType;
                this.caseloadId = this.sessionManager.currentCaseLoad;
                this.gltxnModel.txnEntryDate = DateFormat.getDate();
                this.accountLink = 'otdmgjtr/cgfkGlTxn1AccountCodeRecordGroup?caseloadType=' + this.caseloadType
                        + '&caseloadId=' + this.caseloadId;
                this.glTxn1ColumnDef = [
                        {
                                fieldName: this.translateService.translate('otdmgjtr.account') + '*', field: 'accountCode', editable: true,
                                width: 150, datatype: 'lov', link: 'otdmgjtr/cgfkGlTxn1AccountCodeRecordGroup?caseloadType='
                                        + this.caseloadType
                                        + '&caseloadId=' + this.caseloadId, titles: this.acntTitles,source:'OCMCOACT'
                        },
                        {
                                fieldName: this.translateService.translate('otdmgjtr.accttype'), field: 'dspTxnPostingType', editable: false,
                                width: 150
                        },
                        {
                                fieldName: this.translateService.translate('otdmgjtr.amount') + '*', field: 'txnEntryAmount',
                                datatype: 'number',
                                format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true, editable: true
                        },
                ];

        }

        changeTheValueOfType(event) {
                if (event) {
                        this.accountName = event.description;
                        this.txnPostingType = event.txnPostingType;
                        if (this.gltxnModel.checkProduceFlag && this.txnPostUsageCr === 'CR') {
                                const isAccountchecking = this.otdmgjtrFactory.isAccountchecking(this.caseloadId,
                                        this.gltxnModel.accountCode);
                                isAccountchecking.subscribe(data => {
                                        if (data <= 0) {
                                                this.show(this.translateService.translate('otdmgjtr.accountcode') +
                                                        this.gltxnModel.accountCode + ' '  +
                                                        this.translateService.translate('otdmgjtr.isnotachecking'));
                                                        this.gltxnModel.accountCode = null;
                                                        this.txnPostingType = null;
                                                return;
                                        }
                                });

                        }
                }

        }
        drCheckBox(event) {
                if (event) {
                        if (event.checked === true) {
                                this.txnPostUsageCr = null;
                                this.txnPostUsageDr = 'Y';
                                if (this.txnPostUsageDr === 'Y') {
                                        this.txnPostUsageDr = 'DR';
                                        this.gltxnModel.txnPostUsage = 'DR';
                                }
                        } else {
                                this.txnPostUsageDr = null;
                        }

                }

        }
        crCheckBox(event) {
                if (event) {
                        if (event.checked === true) {
                                this.txnPostUsageDr = null;
                                this.txnPostUsageCr = 'Y';
                                if (this.txnPostUsageCr === 'Y') {
                                        this.txnPostUsageCr = 'CR';
                                        this.gltxnModel.txnPostUsage = 'CR';
                                }

                        } else {
                                this.txnPostUsageCr = null;
                        }

                }

        }
        amountChanged(num) {
                if (this.sessionManager.currentCaseLoad && this.gltxnModel.accountCode) {
                        if (this.txnPostUsageCr === 'Y' || this.txnPostUsageCr === 'CR') {
                        const bal = this.otdmgjtrFactory.getCurrentBalance(this.sessionManager.currentCaseLoad,
                                this.gltxnModel.accountCode);
                                bal.subscribe(lbalance => {
                                        if (lbalance) {
                                                this.lBal = lbalance;

                                        }
                                        if (this.gltxnModel.dspTxnPostingType !== this.gltxnModel.txnPostUsage) {
                                                if (this.lBal < this.gltxnModel.txnEntryAmount) {
                                                       this.confirmDialogBox(-2);
                                        }
                                }

                        });
                }

                }
                if (num && num.value && this.gltxnModel.txnEntryAmount) {
                        num.value = Number(this.gltxnModel.txnEntryAmount).toFixed(2);
                }
                if (this.gltxnModel.txnEntryAmount < 0) {
                        this.show(this.translateService.translate('otdmgjtr.amountcannotbenegative'), 'warn');
                }
                if (this.gltxnModel.checkProduceFlag && this.gltxnModel.txnEntryAmount === 0) {
                        this.show(this.translateService.translate('otdmgjtr.amountmustbegreaterzerocheck'), 'warn');

                }

        }

        confirmDialogBox(index) {
                const code = index === -2 ? this.gltxnModel.accountCode : null;
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

        bedDetails(event) {
                if (event) {
                        this.gltxnModel.payeePersonId = event.personId;
                        this.gltxnModel.payeeNameText = event.lastName + ', ' + event.firstName;
                        this.gltxnModel.payeeCorporateId = null;
                }

        }
        butPayeeDetails(event) {
                if (event) {
                        this.gltxnModel.payeeCorporateId = event.corporateId;
                        this.gltxnModel.payeeNameText = event.corpName;
                        this.gltxnModel.payeePersonId = null;
                }


        }
        changeCheckProduce(event) {
                if (event) {
                        if (event.checked === true) {
                                this.gltxnModel.checkProduceFlag = 'Y';
                                this.payeePerson = false;
                                this.osipsearButton = false;
                                this.otucpayeButton = false;
                                this.txnPostUsageCr = 'Y';
                                this.txnPostUsageCr = 'CR';
                                this.txnPostUsageDr = null;
                        } else {
                                this.payeePerson = true;
                                this.osipsearButton = true;
                                this.otucpayeButton = true;
                                this.txnPostUsageDr = 'Y';
                                this.txnPostUsageDr = 'DR';
                                this.txnPostUsageCr = null;
                        }
                }

        }

        onRowClickgltxn1(event) {
                if (event) {
                        this.gltxn1Model = event;
                        } else {
                           this.gltxn1Model = new GlTransactions();
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
        changeColumn(event) {
                if (event) {
                        if (!event) {
                                this.show(this.translateService.translate('otdmgjtr.transactionmust'), 'warn');
                                return;
                        }
                        if (event) {
                                if (DateFormat.compareDate(event, DateFormat.getDate()) > 0) {
                                        this.show(this.translateService.translate('otdmgjtr.futurepostings'), 'warn');
                                        return;
                                }
                                this.accountsModel.caseloadId = this.sessionManager.currentCaseLoad;
                                this.accountsModel.txnEntryDate = this.gltxnModel.txnEntryDate;


                                const cStatus = this.otdmgjtrFactory.lvAccountStatus(this.accountsModel);
                                cStatus.subscribe(list => {
                                        if (list) {
                                                this.lvAccountStatus = list.lvAccountStatus;
                                                this.lventerAccountPeriodId = list.lvEnteraccountPeriodId;
                                                this.lvallowedreopenPeriod = list.lvallowedreopenPeriod;
                                                this.lvAccountStatus = list.accountPeriodStatus;
                                                this.lvlastClosedPeriod = list.lvlastClosedPeriod;

                                                if (this.lvAccountStatus === 'R' || this.lvAccountStatus === 'O') {
                                                        return;
                                                } else {
                                                        if (this.lventerAccountPeriodId >= this.lvallowedreopenPeriod &&
                                                                this.lventerAccountPeriodId <= this.lvlastClosedPeriod) {
                                                                const periodStartDate = this.otdmgjtrFactory
                                                                        .getPeriodStartDate(this.lventerAccountPeriodId);
                                                                periodStartDate.subscribe(periodStartdate => {
                                                                        if (periodStartdate) {
                                                                                this.periodStartdate = periodStartdate;

                                                                        }

                                                                });
                                                                const periodEndDate = this.otdmgjtrFactory
                                                                        .getperiodEndDate(this.lvlastClosedPeriod);
                                                                periodEndDate.subscribe(periodendDate => {
                                                                        if (periodendDate) {
                                                                                this.periodendDate = periodendDate;
                                                                        }
                                                                });
                                                                if (this.lventerAccountPeriodId >= this.lvallowedreopenPeriod &&
                                                                        this.lventerAccountPeriodId <= this.lvlastClosedPeriod) {
                                                                        this.show(this.translateService.translate('otdmgjtr.thisposting')
                                                                                + this.periodStartdate + this.translateService.translate('otdmgjtr.to') +
                                                                                this.periodendDate, 'warn');
                                                                        return;
                                                                }

                                                        }
                                                }
                                        }
                                        const isPeriodValid = this.otdmgjtrFactory
                                                .isPeriodValid(this.caseloadId, this.lventerAccountPeriodId);
                                        isPeriodValid.subscribe(isperiodValid => {
                                                if (isperiodValid < 0) {
                                                        this.show(this.translateService.translate('otdmgjtr.theaccountperiodof'),
                                                                'warn');
                                                        return;
                                                } else {
                                                        this.isPeriodValid = isperiodValid;
                                                }
                                        });
                                });

                                const againGetacntPeriod = this.otdmgjtrFactory.
                                        lvEnteraccountPeriodId(DateFormat.getDate(event));
                                againGetacntPeriod.subscribe(againgetacntPeriod => {
                                        if (againgetacntPeriod && this.lventerAccountPeriodId) {
                                                if (againgetacntPeriod < this.lventerAccountPeriod) {
                                                        this.show(this.translateService.translate('otdmgjtr.thecurrentaccountperiodof'),
                                                                'warn');
                                                        return;
                                                }
                                        }
                                });

                                if (this.lvallowedreopenPeriod) {
                                        if (this.lventerAccountPeriod < this.lventerAccountPeriodId) {
                                                this.show(this.translateService.translate('otdmgjtr.backdating')
                                                        , 'warn');
                                                return;

                                        }

                                }





                        }

                }
        }
        onGlTranasactionsValidate = (event) => {
                const rowdata = new ValidateRowReturn();
                const index = event.rowIndex;
                if (event.field = 'accountCode' && event.data && event.newValue) {
                        this.code = event.data.accountCode;
                        const descandType = this.otdmgjtrFactory.getDescandType(this.code, this.caseloadType);
                        descandType.subscribe(data => {
                                if (data) {
                                        this.grid.setColumnData('dspTxnPostingType', index, data[0].txnPostingType);
                                       // this.grid.setColumnData('dspAccountName', index, data[0].accountName);
                                       

                                }

                        });
                        if (event.data.accountCode && event.data.accountCode === this.gltxnModel.accountCode) {
                                this.show(this.translateService.translate('otdmgjtr.creditanddebit'));

                        }
                        rowdata.validated = true;
                }
                rowdata.validated = true;
                return rowdata;
        }
        gltxnExecuteQuery() {
                const gltxnResult = this.otdmgjtrFactory.gltxnExecuteQuery(this.gltxnModel);
                gltxnResult.subscribe(data => {
                        if (data.length === 0) {
                                this.gltxnData = [];
                        } else {
                                this.gltxnData = data;
                                this.gltxnModel = data[0];
                        }
                });
        }
        whenValidateAccountCode(event) {
                if (event) {

                }

        }
        /**
         *  This function will be executed when commit event is
        * fired
        */
        otdmgjtrSavegltxnForm(event) {
                this.gltxnInsertList = [];
                this.gltxnUpdatetList = event.updated;
                this.gltxnDeleteList = event.removed;
                this.gltxnCommitModel.insertList = [];
                this.gltxnCommitModel.updateList = [];
                this.gltxnCommitModel.deleteList = [];
                this.gltxnInsertList = this.gltxn1Data;
                if (this.gltxnInsertList.length > 0) {
                        for (let i = 0; i < this.gltxnInsertList.length; i++) {
                                if (!this.gltxnModel.txnEntryDate) {
                                        this.show(this.translateService.translate('otdmgjtr.transactionmust'), 'warn');
                                        return;
                                }
                                if (!this.gltxnModel.accountCode) {
                                        this.show(this.translateService.translate('otdmgjtr.acntcodeisnull'), 'warn');
                                        return;
                                }
                                if (!this.gltxnModel.txnEntryDesc) {
                                        this.show(this.translateService.translate('otdmgjtr.descriptionmust'), 'warn');
                                        return;
                                }
                                if (!this.gltxnModel.txnEntryAmount) {
                                        this.show(this.translateService.translate('otdmgjtr.amountmustbeentered'), 'warn');
                                        return;
                                }
                                if (!this.gltxnInsertList[i].txnEntryAmount) {
                                        this.show(this.translateService.translate('otdmgjtr.amountmustbeentered'), 'warn');
                                        return;
                                }
                                if (!this.gltxnInsertList[i].accountCode && this.gltxnModel.accountCode) {
                                        this.show(this.translateService.translate('otdmgjtr.acntcodeisnulloffset'), 'warn');
                                        return;
                                }
                                if (!this.gltxnInsertList[i].accountCode) {
                                        this.show(this.translateService.translate('otdmgjtr.acntcodeisnulloffsetclear'), 'warn');
                                        return;
                                }
                                if (this.gltxnInsertList[i].accountCode) {
                                        if (this.gltxnInsertList[i].accountCode === this.gltxnModel.accountCode) {
                                                this.show(this.translateService.translate('otdmgjtr.creditanddebit'));
                                                return;

                                        }
                                }
                                const tot = { amount: 0 };
                                this.gltxnInsertList.forEach(ele => {
                                        tot.amount += Number(ele.txnEntryAmount);
                                });
                                if (Number(tot.amount) !== Number(this.gltxnModel.txnEntryAmount)) {
                                        const amt = Math.abs(Number(tot.amount) - Number(this.gltxnModel.txnEntryAmount)).toFixed(2);
                                        const amntOne = this.translateService.translate('otdmgjtr.transactionisnotbalance');
                                        this.show(`${amntOne}  ${amt}`);
                                        return;
                                }
                        }
                        this.gltxnInsertList = [];
                        this.gltxnModel.txnType = 'GJ';
                        this.gltxnModel.createDate = DateFormat.getDate(this.gltxnModel.txnEntryDate);
                        if (this.txnPostUsageCr === 'Y' || this.txnPostUsageCr === 'CR') {
                                this.gltxnModel.txnPostUsage = 'CR';
                                this.gltxnModel.txnPostUsageCr = 'ÇR';
                        }
                        if (this.txnPostUsageDr === 'Y') {
                                this.gltxnModel.txnPostUsage = 'DR';
                        }
                        if (this.gltxnModel.checkProduceFlag === 'Y') {
                                this.gltxnModel.checkProduceFlag = 'Y';
                        }
                        this.gltxnModel.payeePersonId = this.gltxnModel.payeePersonId;
                        this.gltxnModel.payeeCorporateId = this.gltxnModel.payeeCorporateId;
                        this.gltxnModel.payeeNameText = this.gltxnModel.payeeNameText;
                        this.gltxnInsertList.push(this.gltxnModel);
                        this.gltxnInsertList.push(...this.gltxn1Data);
                        const rowData = this.gltxn1Data;
                        this.gltxnInsertList.forEach(ele => {
                                ele.caseloadId = this.caseloadId;
                                ele.txnEntryDesc = this.gltxnModel.txnEntryDesc;
                                ele.accountPeriodId = this.lventerAccountPeriodId;
                               ele.txnEntryDate = this.gltxnModel.txnEntryDate;
                                ele.createDatetime = DateFormat.getDate();
                                 const date = DateFormat.getDate();
                               ele.createDate = DateFormat.getDate(date);
                                ele.accountCodeOne = this.gltxnModel.accountCode;
                                ele.accountCodeTwo = Number(this.code);
                                ele.payeePersonId = this.gltxnModel.payeePersonId;
                                ele.payeeCorporateId = this.gltxnModel.payeeCorporateId;
                                ele.payeeNameText = this.gltxnModel.payeeNameText;
                                ele.txnType = 'GJ';
                                ele.txnPostUsageGrid = ele.dspTxnPostingType;
                                ele.txnPostUsageCr = this.gltxnModel.txnPostUsageCr;
                                ele.txnEntryTime =  DateFormat.getDate();
                                ele.listSeq =  99;
                                ele.reconClearFlag = 'N';
                                ele.txnReversedFlag = 'N';
                                ele.reversedTxnId = 99;
                                ele.reversedTxnEntrySeq = 99;
                                ele.reversedGlEntrySeq = 99;


                        });

                        this.gltxnCommitModel.insertList = this.gltxnInsertList;
                }

                const gltxnSaveData = this.otdmgjtrFactory.glTxnCommit(this.gltxnCommitModel);
                gltxnSaveData.subscribe(txnId => {
                        if (txnId === -1) {
                                this.show(this.translateService.translate('otdmgjtr.accountcode') + this.accountCode
                                        + this.translateService.translate('otdmgjtr.ingeneralblock'), 'warn');
                                return;
                        }
                        if (txnId === -2) {
                                this.show(this.translateService.translate('otdmgjtr.accountcode') + this.accountCode
                                        + this.translateService.translate('otdmgjtr.inoffset'), 'warn');
                                return;
                        }
                        if (txnId === 1) {
                                this.show('common.addupdateremoverecordsuccess', 'success');
                                this.gltxnModel = new GlTransactions();
                                this.gltxn1Data = [];
                                this.txnPostingType = null;
                                this.gltxnModel.txnEntryDate = DateFormat.getDate();
                                return;
                        } if (txnId === txnId) {
                                this.gltxnModel.txnId = txnId;
                                const dlgData = {
                                        label: this.trMsg('common.addupdateremoverecordsuccess'),
                                        yesBtn: true,
                                        yesLabel: 'Ok'
                                };
                                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dlgData, 20)
                                        .subscribe(resdata => {
                                                this.gltxnModel = new GlTransactions();
                                                this.txnPostingType = null;
                                                this.gltxn1Data = [];
                                                this.gltxnModel.txnEntryDate = DateFormat.getDate();
                                        });
                                return;
                        } else {
                                this.show('common.addupdateremoverecordfailed', 'warn');
                                return;
                        }
                });
        }
        gltxn1ExecuteQuery() {
                const gltxn1Result = this.otdmgjtrFactory.gltxn1ExecuteQuery(this.gltxn1Model);
                gltxn1Result.subscribe(data => {
                        if (data.length === 0) {
                                this.gltxn1Data = [];
                        } else {
                                this.gltxn1Data = data;
                                this.gltxn1Model = data[0];
                        }
                });
        }
        onOffsetInsert = () => {
                if (!this.gltxnModel.txnEntryDate) {
                        this.show(this.translateService.translate('otdmgjtr.pleaseentertransdate'), 'warn');
                        return;

                }
                if (this.gltxnModel.txnEntryDate) {
                        if (DateFormat.compareDate(this.gltxnModel.txnEntryDate, DateFormat.getDate()) === 1) {
                                this.show(this.translateService.translate('otdmgjtr.futurepostings'), 'warn');
                                return;

                        }
                }
                if (!this.gltxnModel.txnEntryDesc) {
                        this.show(this.translateService.translate('otdmgjtr.descriptionmust'), 'warn');
                        return;

                }
                if (!this.gltxnModel.accountCode) {
                        this.show(this.translateService.translate('otdmgjtr.accountmustbeentered'), 'warn');
                        return;

                }
                if (!this.gltxnModel.txnEntryAmount) {
                        this.show(this.translateService.translate('otdmgjtr.amountmustbeentered'), 'warn');
                        return;

                }
                if (this.gltxn1Data.length > 0) {
                        if (!this.gltxn1Data[this.gltxn1Data.length - 1].accountCode) {
                                this.show(this.translateService.translate('otdmgjtr.accountmustbeentered'), 'warn');
                                return false;
                        }
                        if (!this.gltxn1Data[this.gltxn1Data.length - 1].txnEntryAmount) {
                                this.show(this.translateService.translate('otdmgjtr.amountmustbeentered'), 'warn');
                                return false;
                        }
                }
                if (this.gltxnModel.checkProduceFlag) {
                        if (!this.gltxnModel.payeePersonId && !this.gltxnModel.payeeCorporateId && !this.gltxnModel.payeeNameText) {
                                this.show(this.translateService.translate('otdmgjtr.pleaseenterpayee'), 'warn');
                                return;

                        }

                }



                return {
                        txnEntryAmount: ''
                };
        }

}

