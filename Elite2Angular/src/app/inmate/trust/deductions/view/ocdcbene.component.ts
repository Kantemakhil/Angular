import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdcbeneService } from '@inmate/trust/deductions/service/ocdcbene.service';
import { VClearAccountPayables } from '@inmate/trust/deductions/beans/VClearAccountPayables';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { VClearAccountPayablesCommitBean } from '@inmate/trust/deductions/beans/VClearAccountPayablesCommitBean';

@Component({
    selector: 'app-ocdcbene',
    templateUrl: './ocdcbene.component.html'
})

export class OcdcbeneComponent implements OnInit {
    @ViewChild('grid', {static: true}) grid: any;
    msgs: any[] = [];
    payeeabData: VClearAccountPayables[] = [];
    payeeabDataTemp: VClearAccountPayables[] = [];
    payeeabModel: VClearAccountPayables = new VClearAccountPayables();
    payeeabCommitModel: VClearAccountPayablesCommitBean = new VClearAccountPayablesCommitBean();
    payeeabIndex = -1;
    payeeabInsertList: VClearAccountPayables[] = [];
    payeeabUpdateList: VClearAccountPayables[] = [];
    payeeabDeleteList: VClearAccountPayables[] = [];
    payeeAbColumnDef: any[];
    glTxn1ColumnDef: any[];
    benTxnColumnDef: any[];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    selectAllDisable: boolean;
    closedFlag: boolean;
    namesReadOnly: boolean;
    retriveDisable: boolean;
    clearDisable: boolean;
    accountCode: any;
    personId: any;
    corporateId: any;
    tableIndex = -1;
    valid: boolean;
    corporateName: string;
    constructor(private ocdcbeneFactory: OcdcbeneService,
        public translateService: TranslateService,
        private sessionManager: UserSessionManager,
        public dialogService: DialogService) {
        this.glTxn1ColumnDef = [];
        this.payeeAbColumnDef = [];
        this.benTxnColumnDef = [];
    }
    ngOnInit() {
        this.namesReadOnly = false;
        this.retriveDisable = false;
        this.clearDisable = true;
        this.valid = false;
        this.payeeabModel = new VClearAccountPayables();
        this.payeeabModel.caseloadId = this.sessionManager.currentCaseLoad;
        this.payeeAbColumnDef = [
            {
                fieldName: this.translateService.translate('common.clear'), field: 'cgnbtCaseloadId', datatype: 'checkbox',
                editable: true, width: 150
            },
            { fieldName: this.translateService.translate('ocdcbene.glcode'), field: 'accountCode', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.amount'), field: 'totalAmount', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.personid'), field: 'personId', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocdcbene.corporateid'), field: 'corporateId', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.name'), field: 'corporateName', editable: false, width: 150 },
            {
                fieldName: '', field: 'butDetails', datatype: 'launchbutton', link: '/OCDCBENEDIALOG', data: 'row',
                modal: true, dialogWidth: '80', updateField: 'row'
            },
        ];
        this.payeeabExecuteQuery();
    }

    payeeabExecuteQuery() {
        // this.payeeabModel.accountCode = this.accountCode;
        // this.payeeabModel.personId = this.personId;
        // this.payeeabModel.corporateId = this.corporateId;
        // this.payeeabModel.corporateName = this.corporateName;
        const payeeabResult = this.ocdcbeneFactory.payeeAbExecuteQuery(this.payeeabModel);
        payeeabResult.subscribe(payeeabResultList => {
            if (payeeabResultList.length === 0) {
                this.payeeabData = [];
                this.selectAllDisable = true;
                if (this.valid) {
                    this.valid = false;
                }
                this.retriveDisable = false;
                this.accountCode = undefined;
                this.personId = undefined;
                this.corporateId = undefined;
                this.corporateName = undefined;
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
                return;
            } else {
                for (let i = 0; i < payeeabResultList.length; i++) {
                    payeeabResultList[i].totalAmount = Number(payeeabResultList[i].totalAmount).toFixed(2);
                    payeeabResultList[i].butDetails = 'Details';
                    payeeabResultList[i].cgnbtCaseloadId = payeeabResultList[i].cgnbtCaseloadId === 'Y' ? true : false;
                }
                this.payeeabData = payeeabResultList;
                this.namesReadOnly = true;
                this.retriveDisable = true;
                this.clearDisable = false;
                this.selectAllDisable = false;
                this.tableIndex = 0;
            }
        });
    }
    clear() {
        this.payeeabData = [];
        this.payeeabModel = new VClearAccountPayables();
        this.namesReadOnly = false;
        this.retriveDisable = false;
        this.clearDisable = true;
        this.accountCode = null;
        this.personId = null;
        this.corporateId = null;
        this.corporateName = null;
        this.selectAllDisable = true;
    }
    isInsertable() {
        if (this.accountCode || this.personId || this.corporateId || this.accountCode === 0
            || this.personId === 0 || this.corporateId === 0 || this.corporateName) {
            this.clearDisable = false;
            this.retriveDisable = false;
        } else {
            this.clearDisable = true;
        }
    }
    onRowClickpayeeab(event) {
    }
    validateThepayeeabData = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        rowdata.validated = true;
        if (event.field === 'cgnbtCaseloadId' && this.payeeabData[index]['isFrmBtn']) {
            this.payeeabData[index]['isFrmBtn'] = false;
            return rowdata;
        }
        if (event.data.cgnbtCaseloadId && event.field === 'cgnbtCaseloadId') {
            if (event.data.totalAmount === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdcbene.cannotclearaccountbalance');
                this.show();
            }
            if (event.data.caseloadIdTemp === 'Y' && !event.data.isFrmBtn) {
                const data = {
                    label: this.translateService.translate('ocdcbene.cannotclearaccount'), yesBtn: true,
                    yesLabel: 'OK', noBtn: false
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                    if (result) {
                        event.data.cgnbtCaseloadId = false;
                        this.grid.setColumnData('cgnbtCaseloadId', index, false);
                        rowdata.validated = true;
                        return rowdata;
                    } else {
                        event.data.cgnbtCaseloadId = false;
                        this.grid.setColumnData('cgnbtCaseloadId', index, false);
                        rowdata.validated = true;
                        return rowdata;
                    }
                });
            } else if (event.data.totalAmount <= 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdcbene.cannotclearanegative');
                this.show();
                event.data.cgnbtCaseloadId = false;
                this.grid.setColumnData('cgnbtCaseloadId', index, false);
                rowdata.validated = true;
                return rowdata;
            } else if (event.data.minBalAmount > event.data.totalAmount) {
                const data = {
                    label: this.trMsg('ocdcbene.payeecurrentbalance').replace('%totalAmount%', event.data.totalAmount)
                        .replace('%minBalAmount%', event.data.minBalAmount)
                    , yesBtn: true, yesLabel: 'Yes', noBtn: true, noLabel: 'No'
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                    if (typeof result === 'boolean' && result) {
                    } else {
                        event.data.cgnbtCaseloadId = false;
                        this.grid.setColumnData('cgnbtCaseloadId', index, false);
                        rowdata.validated = true;
                        return rowdata;
                    }
                });
            }
        }

        return rowdata;
    }
    /**
     * event is fired when click on Select All button.
     */
    clickOnSelectButton() {
        const rowData = this.payeeabData;
        if (event) {
            for (let i = 0; i < rowData.length; i++) {
                if (rowData[i].totalAmount > 0 && rowData[i].cgnbtCaseloadId !== 'true') {
                    this.grid.setColumnData('cgnbtCaseloadId', i, true);
                    this.payeeabData[i]['isFrmBtn'] = true;
                }
            }
        }
        this.payeeabData = rowData;
    }
    /*
    * This method is used to show popup messages.
    */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    trMsg(msg) {
        return this.translateService.translate(msg);
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocdcbeneSavepayeeabForm(event) {
        this.payeeabInsertList = event.added;
        this.payeeabUpdateList = event.updated;
        this.payeeabDeleteList = event.removed;
        this.payeeabCommitModel.insertList = [];
        this.payeeabCommitModel.deleteList = [];
        this.payeeabCommitModel.updateList = this.payeeabData.filter(ele => {
            if (ele.cgnbtCaseloadId) {
                return true;
            }
        });
        if (this.payeeabInsertList.length > 0 || this.payeeabUpdateList.length > 0) {
            for (let i = 0; i < this.payeeabUpdateList.length; i++) {
                this.payeeabUpdateList[i].cgnbtCaseloadId = this.payeeabUpdateList[i].cgnbtCaseloadId ? 'Y' : 'N';
                this.payeeabCommitModel.updateList = this.payeeabUpdateList;
            }
        }
        const payeeabSaveData = this.ocdcbeneFactory.payeeAbCommit(this.payeeabCommitModel);
        payeeabSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.valid = true;
                this.clearDisable = true;
                this.retriveDisable = false;
                this.payeeabExecuteQuery();
                return;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                return;
            }
        });
    }
}
