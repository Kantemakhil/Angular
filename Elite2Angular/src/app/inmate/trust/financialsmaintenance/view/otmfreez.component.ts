import {
    Component, OnInit, Injectable, Pipe, PipeTransform, Directive,
    ElementRef,
    ViewChild
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { TranslateService } from '@common/translate/translate.service';
import { OtmfreezService } from '../service/otmfreez.service';
import { FreezeDisbursements } from '@inmate/trust/trustaccounts/beans/FreezeDisbursements';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { FreezeDisbursementsCommitBean } from '@inmate/trust/trustaccounts/beans/FreezeDisbursementsCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { AccountCodes } from '@inmate/trust/trustaccounts/beans/AccountCodes';
// import required bean declarations

@Component({
    selector: 'app-otmfreez',
    templateUrl: './otmfreez.component.html'
    // styleUrls: ['./otmfreez.component.css']
})

export class OtmfreezComponent implements OnInit {
    // Variable declaration
    @ViewChild('grid', { static: true }) grid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    fredisData: FreezeDisbursements[] = [];
    fredisDataTemp: FreezeDisbursements[] = [];
    fredisModel: FreezeDisbursements = new FreezeDisbursements();
    fredisInsertList: FreezeDisbursements[] = [];
    fredisUpdatetList: FreezeDisbursements[] = [];
    fredisDeleteList: FreezeDisbursements[] = [];
    fredisCommitModel: FreezeDisbursementsCommitBean = new FreezeDisbursementsCommitBean();
    VHeaderBlock: VHeaderBlock = new VHeaderBlock();
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    glTxn1ColumnDef: any[];
    offDedColumnDef: any[];
    offenderRestrictionColumnDef: any[];
    txnOperColumnDef: any[];
    salOrdColumnDef: any[];
    offSubaColumnDef: any[];
    freDisColumnDef: any[];
    omsMpColumnDef: any[];
    offDisColumnDef: any[];
    offTxnColumnDef: any[];
    visitorRestrictionsColumnDef: any[];
    cgfkFredistxntypeRg: any[] = [];
    cgfkFredisaccountcodeRg: any[] = [];
    accountTitle = { 'description': 'Account Code', 'subAccountType': 'Sub Account Type', 'code': 'Description' };
    txnTitles = { 'description': 'Txn Type', 'code': 'Description' };
    code: string;
    acCode: string;
    buttonRetrieve: boolean;
    buttonClear: boolean;
    caseloadType: string;
    selectIndex = -1;
    accountcodeLink: string;
    txnTypeLink: string;
    accountCode: string;
    txnCode: string;
    freezeFlag: string;
    freezeFlagBlue: string;
    acoountList: AccountCodes[] = [];
    accCode: string;
    accNum: number;
    count: number;
    duplicateFlag: boolean;
    constructor(private otmfreezFactory: OtmfreezService, private sessionManager: UserSessionManager,
        public translateService: TranslateService) {
        this.glTxn1ColumnDef = [];
        this.offDedColumnDef = [];
        this.offenderRestrictionColumnDef = [];
        this.txnOperColumnDef = [];
        this.salOrdColumnDef = [];
        this.offSubaColumnDef = [];
        this.freDisColumnDef = [];
        this.omsMpColumnDef = [];
        this.offDisColumnDef = [];
        this.offTxnColumnDef = [];
        this.visitorRestrictionsColumnDef = [];
    }
    ngOnInit() {
        this.accountcodeLink = 'otmfreez/cgfkFreDisAccountCodeRecordGroup?caseloadType=' + this.sessionManager.currentCaseLoadType;
        this.txnTypeLink = 'otmfreez/cgfkFreDisTxnTypeRecordGroup?caseloadType=' + this.sessionManager.currentCaseLoadType;
        this.buttonClear = true;
        this.accountCodeLov();
        this.freDisColumnDef = [
            {
                fieldName: this.translateService.translate('otmfreez.accountcode') + '*', field: 'acCode',
                editable: true, width: 150, datatype: 'lov',
                link: 'otmfreez/cgfkFreDisAccountCodeRecordGroup?caseloadType=' + this.sessionManager.currentCaseLoadType,
                titles: this.accountTitle, cellEditable: this.canOffInvEdit
            },
            {
                fieldName: this.translateService.translate('otmfreez.subaccounttype'), field: 'reg',
                editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('otmfreez.description'), field: 'accountName',
                editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('otmfreez.txntype') + '*', field: 'txnCode',
                editable: true, width: 150, datatype: 'lov',
                link: 'otmfreez/cgfkFreDisTxnTypeRecordGroup?caseloadType=' + this.sessionManager.currentCaseLoadType,
                titles: this.txnTitles, cellEditable: this.canOffInvEdit
            },
            {
                fieldName: this.translateService.translate('otmfreez.description'), field: 'txnDescription',
                editable: false, width: 150, datatype: 'text'
            },
            { fieldName: this.translateService.translate('otmfreez.txnusage'), field: 'txnUsage', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('otmfreez.freeze'), field: 'freezeFlag', editable: true,
                width: 150, datatype: 'checkbox'
            },


        ];
        this.fredisExecuteQuery();
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    canOffInvEdit = (data: any, index: number, field: string): boolean => {
        if (field === 'acCode' || field === 'txnCode') {
            if (!data.createDatetime) {
                return true;
            }
        }
        return false;
    }

    acctBlured(event) {
        if (!this.accountCode) {
            this.accountCode = this.accountCode === '' ? undefined : '';
        }
    }

    validateRowDisburse = (event) => {
        const rowIndex = event.rowIndex;
        const rowData = new ValidateRowReturn();
        if (event.field === 'acCode') {
            for (let i = 0; i < this.acoountList.length; i++) {
                if (this.acoountList[i].accountName === event.data.acCode) {
                    this.code = this.acoountList[i].subAccountType;
                    break;
                }
            }
            this.grid.setColumnData('reg', rowIndex, this.code);
            this.grid.setColumnData('accountName', rowIndex, event.data.acCode);
        } else {
            if (event.data.acCode=== undefined) {
                this.grid.setColumnData('reg', rowIndex, undefined);
                this.grid.setColumnData('accountName', rowIndex, undefined);
            }
        }
        if (event.field === 'txnCode' && event.newValue && event.newValue !== event.oldValue) {
            this.grid.setColumnData('txnDescription', rowIndex,
                event.data.txnCode);
            if (event.data.txnCode) {
                this.caseloadType = this.sessionManager.currentCaseLoadType;
                const txnUsageCode = this.otmfreezFactory.txnUsageCode(event.data.txnCode, this.caseloadType);
                txnUsageCode.subscribe(usageCode => {
                    if (usageCode) {
                        this.grid.setColumnData('txnUsage', rowIndex,
                            usageCode);
                    }
                });
            }
        }
        else{
            if(event.data.txnCode==undefined){
                this.grid.setColumnData('txnUsage', rowIndex, undefined);
                this.grid.setColumnData('txnDescription', rowIndex, undefined);
            }
        }
        rowData.validated = true;
        return rowData;

    }
    onRowClickfredis(event) {
        if (event) {
            this.fredisModel = event;
        }
    }
    clear() {
        this.buttonRetrieve = false;
        this.buttonClear = true;
        this.fredisData = [];
        this.accountCode = null;
        this.txnCode = null;
        this.freezeFlag = null;
        this.fredisModel = new FreezeDisbursements();
    }
    onOffenderChange(offender) {
    }
    fredisExecuteQuery() {
        this.fredisModel = new FreezeDisbursements();
        if (this.sessionManager.currentCaseLoadType) {
            this.fredisModel.caseloadType = this.sessionManager.currentCaseLoadType;
        }

        const fredisResult = this.otmfreezFactory.freDisExecuteQuery(this.fredisModel);
        fredisResult.subscribe(data => {
            if (data.length === 0) {
                this.fredisData = [];
                this.buttonRetrieve = false;
                this.buttonClear = false;
                this.show(this.translateService.translate('common.querycaused'), 'warn');
                return;
            } else {
                data.forEach(element => {
                    element.freezeFlag = element.freezeFlag === 'Y' ? true : false;
                    element.acCode = element.accountName;
                    element.txnCode = element.txnDescription;
                });
                this.fredisData = data;
                this.selectIndex = 0;
                this.buttonRetrieve = true;
                this.buttonClear = false;
                this.fredisModel = data[0];
            }
        });
    }
    onGridInsert = () => {
        if (this.fredisData.length > 0) {
            if (!this.fredisData[this.fredisData.length - 1].acCode) {
                this.show(this.translateService.translate('otmfreez.accountcodemust'));
                return;
            }
            if (!this.fredisData[this.fredisData.length - 1].txnCode) {
                this.show(this.translateService.translate('otmfreez.transactionmust'));
                return;
            }

        }

        return {
            accountCode: '', subAccountType: '', description: '', txnType: '', txnUsage: '', freezeFlag: ''
        };

    }

    accountCodeLov() {
        const accountCodeList = this.otmfreezFactory.accountCodeLov(this.sessionManager.currentCaseLoadType);
        accountCodeList.subscribe(data => {
            if (data) {
                this.acoountList = data;
            }
        });
    }


    /**
     *  This function will be executed when commit event is
    * fired
    */
    otmfreezSavefredisForm(event) {
        this.fredisInsertList = event.added;
        this.fredisUpdatetList = event.updated;
        this.fredisDeleteList = event.removed;
        this.fredisCommitModel.insertList = [];
        this.fredisCommitModel.updateList = [];
        this.fredisCommitModel.deleteList = [];
        for (let j = 0; j < this.fredisInsertList.length; j++) {
            for (let i = 0; i < this.acoountList.length; i++) {
                if (this.fredisInsertList[j].accountName === this.acoountList[i].accountName) {
                    this.fredisInsertList[j].accountCode = this.acoountList[i].accountCode;
                    break;
                }
            }
        }

    
        this.duplicateFlag = true;
        for (let i = 0; i < this.fredisData.length; i++) {

            for (let j = 0; j < this.fredisData.length; j++) {
                if (i !== j && this.fredisData[i].accountCode === this.fredisData[j].accountCode && this.fredisData[i].txnCode === this.fredisData[j].txnCode) {
                    this.duplicateFlag = false;
                    break;
                }
            }
            if (this.duplicateFlag === false) {
                break;
            }
        }

        if (this.duplicateFlag) {
            if (this.fredisInsertList.length > 0) {
                for (let i = 0; i < this.fredisInsertList.length; i++) {
                    if (!this.fredisInsertList[i].acCode) {
                        this.show(this.translateService.translate('otmfreez.accountcodemust'));
                        return;
                    }
                    if (!this.fredisInsertList[i].txnCode) {
                        this.show(this.translateService.translate('otmfreez.transactionmust'));
                        return;
                    }
                    this.fredisInsertList[i].caseloadType = this.sessionManager.currentCaseLoadType;

                    this.fredisInsertList[i].createDatetime = DateFormat.getDate();
                    if (this.fredisInsertList[i].freezeFlag === '') {
                        this.fredisInsertList[i].freezeFlag = 'N';
                    } else {
                        this.fredisInsertList[i].freezeFlag = 'Y';
                    }
                }
                this.fredisCommitModel.insertList = this.fredisInsertList;
            }
            if (this.fredisUpdatetList.length > 0) {
                for (let i = 0; i < this.fredisUpdatetList.length; i++) {
                    if (this.fredisUpdatetList[i].freezeFlag) {
                        this.fredisUpdatetList[i].freezeFlag = 'Y';
                    } else {
                        this.fredisUpdatetList[i].freezeFlag = 'N';
                    }
                }
                this.fredisCommitModel.updateList = this.fredisUpdatetList;
            }
            if (this.fredisDeleteList.length > 0) {
                for (let i = 0; i < this.fredisDeleteList.length; i++) {
                }
                this.fredisCommitModel.deleteList = this.fredisDeleteList;
            }

            const fredisSaveData = this.otmfreezFactory.freDisCommit(this.fredisCommitModel);
            fredisSaveData.subscribe(data => {
                if (data === 1) {
                    this.show('common.addupdateremoverecordsuccess', 'success');
                    this.fredisExecuteQuery();
                } else {
                    this.show('common.addupdateremoverecordfailed');
                    this.fredisExecuteQuery();
                }
            });

        }
        else{
            this.show(this.translateService.translate('otmfreez.txntypealready'));
            return;
        }
    }
}
