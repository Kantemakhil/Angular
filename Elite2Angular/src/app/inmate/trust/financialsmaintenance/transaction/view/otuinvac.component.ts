import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtuinvacService } from '../service/otuinvac.service';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { TxnOpsInvalidAccounts } from '@inmate/trust/financialsmaintenance/transaction/beans/TxnOpsInvalidAccounts';
import { TxnOpsInvalidAccountsCommitBean } from '@inmate/trust/financialsmaintenance/transaction/beans/TxnOpsInvalidAccountsCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Component({
    selector: 'app-otuinvac',
    templateUrl: './otuinvac.component.html'
})

export class OtuinvacComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    txninvData: TxnOpsInvalidAccounts[] = [];
    txninvModel: TxnOpsInvalidAccounts = new TxnOpsInvalidAccounts();
    txninvCommitModel: TxnOpsInvalidAccountsCommitBean = new TxnOpsInvalidAccountsCommitBean();
    txninvIndex: number;
    txninvInsertList: TxnOpsInvalidAccounts[] = [];
    txninvUpdateList: TxnOpsInvalidAccounts[] = [];
    txninvDeleteList: TxnOpsInvalidAccounts[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    txninvColumnDefs: any[];
    offDedColumnDef: any[];
    offenderRestrictionColumnDef: any[];
    txnOperColumnDef: any[];
    salOrdColumnDef: any[];
    offSubaColumnDef: any[];
    omsMpColumnDef: any[];
    txnInvColumnDef: any[];
    glTxnColumnDef: any[];
    offDisColumnDef: any[];
    offTxnColumnDef: any[];
    visitorRestrictionsColumnDef: any[];
    cgfkTxninvinvalidaccountcRg: any[] = [];
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    tableIndex = -1;
    constructor(private otuinvacFactory: OtuinvacService,
        public translateService: TranslateService,
        private sessionManager: UserSessionManager) {
        this.txninvColumnDefs = [];
        this.offDedColumnDef = [];
        this.offenderRestrictionColumnDef = [];
        this.txnOperColumnDef = [];
        this.salOrdColumnDef = [];
        this.offSubaColumnDef = [];
        this.omsMpColumnDef = [];
        this.txnInvColumnDef = [];
        this.glTxnColumnDef = [];
        this.offDisColumnDef = [];
        this.offTxnColumnDef = [];
        this.visitorRestrictionsColumnDef = [];
    }
    ngOnInit() {
        this.txninvColumnDefs = [
            { fieldName: this.translateService.translate('otuinvac.nameofmodule'), field: 'moduleName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('otuinvac.trnstype'), field: 'txnType', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('otuinvac.acntcode'), field: 'invalidAccountCode', editable: false,
                width: 150, datatype: 'lov', link: 'otuinvac/cgfkTxnInvInvalidAccountCRecordGroup',
                titles: { code: 'Acnt Code', txnPostingType: 'Account Name' },
                cellEditable: this.cancaseloadIdEdit, maxlength: 7
            },
            { fieldName: this.translateService.translate('otuinvac.lovseq'), field: 'listSeq', editable: true, width: 150,
              minValue: '0', maxValue: '999', strictFP: true, whole: true, datatype: 'number'  
            },
        ];
        this.txninvExecuteQuery();
    }
    onButExitClick() {
        this.dialog.close(null);
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    onRowClicktxninv(event) {
        if (event) {
            this.txninvModel = event;
        } else {
            this.txninvModel = new TxnOpsInvalidAccounts();
        }
    }
    cancaseloadIdEdit = (data: any, index: number, field: string): boolean => {
        if (!data.modifyDate) {
            return true;
        } else {
            return false;
        }
    }
    onGridInsert = () => {
        for (let i = 0; i < this.txninvData.length; i++) {
            if (!this.txninvData[i].invalidAccountCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocmtrops.fieldmustentered');
                this.show();
                return;
            }
        }
        return { moduleName: this.dialog.data.moduleName, txnType: this.dialog.data.txnType, listSeq: this.dialog.data.txnOperationSeq };
    }
    txninvExecuteQuery() {
        if (this.dialog) {
            this.txninvModel.txnType = this.dialog.data.txnType;
            this.txninvModel.moduleName = this.dialog.data.moduleName;
        }
        const txninvResult = this.otuinvacFactory.txnInvExecuteQuery(this.txninvModel);
        txninvResult.subscribe(data => {
            if (data.length === 0) {
                this.txninvData = [];
            } else {
                data.forEach(element => {
                    if (element && element.invalidAccountCode) {
                        element.invalidAccountCode = String(element.invalidAccountCode);
                    }
                });
                this.txninvData = data;
                this.txninvModel = data[0];
                this.tableIndex = 0;
            }
        });
    }
    otuinvacSavetxninvForm(event) {
        const validation = { repeat: 0, validate: true };
        this.txninvData.forEach(element => {
            validation.repeat = 0;
            this.txninvData.forEach(data => {
                if (data.invalidAccountCode === element.invalidAccountCode && data.moduleName === element.moduleName
                    && data.txnType === element.txnType) {
                    validation.repeat++;
                }
                if (validation.repeat > 1) {
                    validation.validate = false;
                    return;
                }
            });
        });
        if (!validation.validate) {
            this.type = 'warn';
            this.message = this.translateService.translate('otuinvac.rowexistsalready');
            this.show();
            return;
        }
        this.txninvInsertList = event.added;
        this.txninvUpdateList = event.updated;
        this.txninvDeleteList = event.removed;
        this.txninvCommitModel.insertList = [];
        this.txninvCommitModel.updateList = [];
        this.txninvCommitModel.deleteList = [];
        if (this.txninvInsertList.length > 0) {
            for (let i = 0; i < this.txninvInsertList.length; i++) {
                if (!this.txninvInsertList[i].invalidAccountCode) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocmtrops.fieldmustentered');
                    this.show();
                    return;
                }
                if (this.txninvInsertList[i].invalidAccountCode) {
                    this.txninvInsertList[i].invalidAccountCode = Number(this.txninvInsertList[i].invalidAccountCode);
                }
                this.txninvInsertList[i].modifyDate = DateFormat.getDate();
                this.txninvInsertList[i].createDatetime = DateFormat.getDate();
                this.txninvInsertList[i].createUserId = this.sessionManager.getId();
                this.txninvInsertList[i].modifyUserId = this.sessionManager.getId();
                this.txninvCommitModel.insertList = this.txninvInsertList;
            }
        }
        if (this.txninvUpdateList.length > 0) {
            for (let i = 0; i < this.txninvUpdateList.length; i++) {
                this.txninvCommitModel.updateList = this.txninvUpdateList;
            }
        }
        if (this.txninvDeleteList.length > 0) {
            for (let i = 0; i < this.txninvDeleteList.length; i++) {
            }
            this.txninvCommitModel.deleteList = this.txninvDeleteList;
        }
        const txninvSaveData = this.otuinvacFactory.txnInvCommit(this.txninvCommitModel);
        txninvSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.txninvExecuteQuery();
                return;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.txninvExecuteQuery();
                return;
            }
        });
    }

}
