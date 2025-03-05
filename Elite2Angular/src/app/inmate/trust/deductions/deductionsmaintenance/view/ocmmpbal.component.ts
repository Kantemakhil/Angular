import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmmpbalService } from '../service/ocmmpbal.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { MinimumPayableBalances } from '@inmate/trust/deductions/deductionsmaintenance/beans/MinimumPayableBalances';
import { MinimumPayableBalancesCommitBean } from '@inmate/trust/deductions/deductionsmaintenance/beans/MinimumPayableBalancesCommitBean';
import { GridComponent, ValidateRowReturn } from '@ui-components/grid/grid.component';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';
import { AccountCodes } from '@inmate/trust/trustaccounts/beans/AccountCodes';

@Component({
    selector: 'app-ocmmpbal',
    templateUrl: './ocmmpbal.component.html'
    })

export class OcmmpbalComponent implements OnInit {
    glAccountTitles: { code: string; description: string; };
    glAccountTitle: { code: string; accountName: string; };
    codeLink: string;
    descLink: string;
   @ViewChild('grid', {static: true}) grid: GridComponent;
    msgs: any[] = [];
    caseloadType: string;
    userId: string;
    minpbData: MinimumPayableBalances [] = [];
    minpbModel: MinimumPayableBalances = new MinimumPayableBalances();
    minpbInsertList: MinimumPayableBalances[] = [];
    minpbUpdatetList: MinimumPayableBalances[] = [];
    minpbCommitModel: MinimumPayableBalancesCommitBean = new MinimumPayableBalancesCommitBean();
    minPbColumnDef: any[];
    accountCode: string;
    accountCodes: AccountCodes [] = [];
    constructor(private ocmmpbalFactory: OcmmpbalService,
                private translateService: TranslateService,
                private sessionManager: UserSessionManager,
                private amountFormat: AmountFormatUtil) {
    }

    ngOnInit() {
        this.caseloadType = this.sessionManager.currentCaseLoadType;
        this.userId  = this.sessionManager.getId();
        this.codeLink = `ocmmpbal/cgfkMinPbAccountCodeRecordGroup?caseloadType=${this.caseloadType}`;
        this.descLink = `ocmmpbal/minPbAccountCodeRecordGroup?caseloadType=${this.caseloadType}`;
        this.glAccountTitle = {code: this.trMsg('ocmmpbal.glaccount'), accountName: this.trMsg('common.description')};
        this.glAccountTitles = {code: this.trMsg('ocmmpbal.glaccount'), description: this.trMsg('common.description')};
    this.minPbColumnDef = [
        { fieldName: this.trMsg('ocmmpbal.glaccount', '*'), field: 'accountCode', datatype: 'lov', link: this.descLink,
         editable: true, width: 150, titles: this.glAccountTitle, cellEditable: this.canCellEdit,source:'OCMCOACT'},
        { fieldName: this.trMsg('common.description'), field: 'dspAccountName', editable: false, width: 150},
        { fieldName: this.trMsg('ocmmpbal.minimumpaybal', '*'), field: 'minPayAmount', editable: true, width: 150,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true },
    ];
   this.cgfkMinpbaccountcodeRecordGroup();
    this.minpbExecuteQuery();
    }
    onRowClickminpb(event) {
    }
     ok() {
        this.minpbExecuteQuery(true);
    }
     no() {
        this.minpbModel =  new MinimumPayableBalances();
        this.minpbData = [];
        this.accountCode = null;
    }
     cancel() {
    }
    amountKeyDown(event, amount) {
        if (!this.amountFormat.avoidKeys(event, this.minpbModel.minPayAmount)) {
            event.stopPropagation();
            return false;
           }
    }
    optionChange(event) {
        if (event && event.code) {
            this.minpbModel.accountCode = Number(event.code);
        } else {
            this.minpbModel.accountCode = null;
        }
    }
    onAmountBlur(amount) {
        this.amountFormat.precisionFlot(amount);
    }
    onAccCodeBlur() {
        if (!this.accountCode) {
            this.accountCode  = this.accountCode === undefined ? '' : undefined;
        }
    }
    get isRDnable(): boolean {
        if (this.minpbData && this.minpbData.length > 0) {
            return true;
        }
        return false;
    }
    get isCDnable(): boolean {
        if (this.minpbData.length <= 0 && !this.accountCode &&
             !(this.minpbModel.minPayAmount || String(this.minpbModel.minPayAmount) === '0')) {
                return true;
        }
        return false;
    }
    onOffenderChange(offender) {
    }
    minpbExecuteQuery(isRetreve?) {
        this.minpbModel = new MinimumPayableBalances();
        this.minpbModel.caseloadType = this.caseloadType;
                const qData = isRetreve ? this.minpbModel : {};
                 const minpbResult = this.ocmmpbalFactory.minPbExecuteQuery(this.minpbModel);
                     minpbResult.subscribe(minpbResultList => {
                    if (minpbResultList.length === 0) {
                            this.show('common.querycaused');
                        this.minpbData = [];
                    } else {
                        minpbResultList.forEach(ele => {
                                if (ele.accountCode) {
                                ele.accountCode = String(ele.accountCode);
                                }
                        });
                        this.minpbData = minpbResultList;
                        
                    }
                });
            }
    canCellEdit = (data: any, index: number, field: string) => {
       if (field === 'accountCode' && data.createDatetime) {
        return false;
       }
        return true;
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
    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocmmpbalSaveminpbForm(event) {
        if (!this.validDateRowData(this.minpbData)) {
            return;
        }
        this.minpbInsertList = event.added;
        this.minpbUpdatetList = event.updated;

        this.minpbCommitModel.insertList = [];
        this.minpbCommitModel.updateList = [];

        if (this.minpbInsertList && this.minpbInsertList.length > 0) {
            this.minpbCommitModel.insertList = this.minpbInsertList;
        }

        if (this.minpbUpdatetList && this.minpbUpdatetList.length > 0) {
            this.minpbCommitModel.updateList = this.minpbUpdatetList;
        }

        const minpbSaveData = this.ocmmpbalFactory.minPbCommit( this.minpbCommitModel );
        this.minpbModel = new MinimumPayableBalances();
        this.accountCode = '';
        minpbSaveData.subscribe( data => {
         if ( String(data) === '1' ) {
            this.show('common.addupdateremoverecordsuccess', 'success');
        } else {
            if (String(data).includes('MINIMUM_PAYABLE_BALANCES_PK')) {
                this.show('ocmmpbal.rowexistwithglaccount');
            } else {
            this.show('common.addupdateremoverecordfailed', 'error');
            }
        }
        this.minpbExecuteQuery();
            }, error => {
            this.show('common.addupdateremoverecordfailed', 'error');
            this.minpbExecuteQuery();
            });
        }

        validDateRowData(data: any[]) {
            const validate = {isValid: true};

            data.forEach(ele => {
                if (!ele.accountCode) {
                    this.show('ocmmpbal.glaccountmustbeenterd');
                    validate.isValid = false;
                    return;
                }
                if (!ele.minPayAmount && ele.minPayAmount !== 0) {
                    this.show('ocmmpbal.minimmpayablebalalanceentered');
                    validate.isValid = false;
                    return;
                }
                const repeatVal = this.minpbData.filter(dup => {
                    return Number(dup.accountCode) === Number(ele.accountCode);
                });
                if (repeatVal.length > 1) {
                    this.show('ocmmpbal.rowexistwithglaccount');
                    validate.isValid = false;
                    return;
                }
            });
            return validate.isValid;
        }

        onGridInsert = () => {
            return this.validDateRowData(this.minpbData) ? {} : null;
        }
    cgfkMinpbaccountcodeRecordGroup() {
        const obj = this.ocmmpbalFactory.cgfkMinpbaccountcodeRecordGroup(this.caseloadType);
        obj.subscribe(data => {
            if (data.length === 0)
                this.accountCodes = [];
            else
                this.accountCodes = data;
        });
    }
    validateRow = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        if (event.field === 'accountCode') {
            for (let i = 0; i < this.accountCodes.length; i++) {
                if (this.accountCodes[i].code === event.data.accountCode) {
                    this.grid.setColumnData('dspAccountName', index, this.accountCodes[i].accountName);
                }
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
}
