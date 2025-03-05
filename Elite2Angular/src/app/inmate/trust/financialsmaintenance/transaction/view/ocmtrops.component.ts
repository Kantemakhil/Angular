import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OcmtropsService } from '@inmate/trust/financialsmaintenance/transaction/service/ocmtrops.service';
import { TransactionOperation } from '@inmate/trust/trustaccounts/beans/TransactionOperation';
import { TransactionOperationCommitBean } from '@inmate/trust/trustaccounts/beans/TransactionOperationCommitBean';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Component({
    selector: 'app-ocmtrops',
    templateUrl: './ocmtrops.component.html'
})

export class OcmtropsComponent implements OnInit {
    @ViewChild('grid') grid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    txnoperData: TransactionOperation[] = [];
    txnoperModel: TransactionOperation = new TransactionOperation();
    txnoperModelTemp: TransactionOperation = new TransactionOperation();
    txnOperSelected: TransactionOperation = new TransactionOperation();
    txnoperCommitModel: TransactionOperationCommitBean = new TransactionOperationCommitBean();
    txnoperInsertList: TransactionOperation[] = [];
    txnoperUpdateList: TransactionOperation[] = [];
    txnoperDeleteList: TransactionOperation[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    txnOperColumnDefs: any[];
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    clearDisable: boolean;
    retriveDisable: boolean;
    tableIndex = -1;
    payeesIndex = -1;
    namesReadOnly: boolean;
    ckeckboxReadOnly: boolean;
    txnTypeLink: any;
    caseloadIdLink: any;
    moduleNameLink: any;
    drAccountCodeLink: any;
    crAccountCodeLink: any;
    bankDrAccountCodeLink: any;
    bankcrAccountCodeLink: any;
    txnOperationTypeLink: any;
    txnTypeTitle = { 'code': 'Trans Type', 'txnUsage': 'Description' };
    caseloadIdTitle = { 'code': 'Caseload', 'trustCaseloadId': 'Description' };
    moduleNameTitle = { 'code': 'Module Name', 'moduleType': 'Description' };
    drAccountCodeTitle = { 'code': 'Debit', 'txnPostingType': 'Account Name' };
    crAccountCodeTitle = { 'code': 'Credit', 'txnPostingType': 'Account Name' };
    bankDrAccountCodeTitle = { 'code': '(Dr)', 'txnPostingType': 'Account Name' };
    bankcrAccountCodeTitle = { 'code': '(Cr)', 'txnPostingType': 'Account Name' };
    txnOperationTypeTitle = { 'code': 'Opr Type', 'domain': 'Description' };
    txnTypeValid: boolean;
    saveFlag: boolean;
    constructor(private ocmtropsFactory: OcmtropsService,
        public translateService: TranslateService,
        private sessionManager: UserSessionManager) {
    }
    onGridReady(event) {
    }
    ngOnInit() {
        this.txnTypeLink = 'ocmtrops/cgfkTxnOperTxnTypeRecordGroup';
        this.caseloadIdLink = 'ocmtrops/cgfkTxnOperCaseloadIdRecordGroup';
        this.moduleNameLink = 'ocmtrops/cgfkTxnOperModuleNameRecordGroup';
        this.drAccountCodeLink = 'ocmtrops/cgfkTxnOperDrAccountCodeRecordGroup';
        this.crAccountCodeLink = 'ocmtrops/cgfkTxnOperCrAccountCodeRecordGroup';
        this.bankDrAccountCodeLink = 'ocmtrops/cgfkTxnOperBankDrAccountRecordGroup';
        this.bankcrAccountCodeLink = 'ocmtrops/cgfkTxnOperBankCrAccountRecordGroup';
        this.txnOperationTypeLink = 'ocmtrops/cgfkTxnOperTxnOperationTyRecordGroup';
        this.retriveDisable = false;
        this.namesReadOnly = false;
        this.ckeckboxReadOnly = false;
        this.saveFlag = false;
        this.txnOperColumnDefs = [
            {
                fieldName: this.translateService.translate('common.caseloadmandatory'), field: 'caseloadId', editable: true,
                datatype: 'lov', link: 'ocmtrops/cgfkTxnOperCaseloadIdRecordGroup', width: 180, maxlength: 12,source:'OUMACASE',
                titles: { code: 'Caseload', trustCaseloadId: 'Description' }, cellEditable: this.cancaseloadIdEdit, required: true,
            },
            {
                fieldName: this.translateService.translate('ocmtrops.modulenamemandatory'), field: 'moduleName', editable: true,
                datatype: 'lov', link: 'ocmtrops/cgfkTxnOperModuleNameRecordGroup', width: 180, maxlength: 20,source:'OUMASSMU',
                titles: { code: 'Module Name', moduleType: 'Description' }, cellEditable: this.cancaseloadIdEdit
            },
            {
                fieldName: this.translateService.translate('ocmtrops.transtypemandatory'), field: 'txnType', editable: true,
                datatype: 'lov', link: 'ocmtrops/cgfkTxnOperTxnTypeRecordGroup', width: 150, maxlength: 6,source:'OCMTRANS',
                titles: { code: 'Trans Type', txnUsage: 'Description' }, cellEditable: this.cancaseloadIdEdit
            },
            {
                fieldName: this.translateService.translate('ocmtrops.acctdebit'), field: 'drAccountCodeTemp',source:'OCMCOACT',
                datatype: 'lov', link: 'ocmtrops/cgfkTxnOperDrAccountCodeRecordGroup', width: 150, editable: true,
                titles: { code: 'Debit', txnPostingType: 'Account Name' }, maxlength: 7,
            },
            {
                fieldName: this.translateService.translate('ocmtrops.acctcredit'), field: 'crAccountCodeTemp', editable: true,
                datatype: 'lov', link: 'ocmtrops/cgfkTxnOperCrAccountCodeRecordGroup', width: 150,source:'OCMCOACT',
                titles: { code: 'Credit', txnPostingType: 'Account Name' }, maxlength: 7
            },
            {
                fieldName: this.translateService.translate('ocmtrops.acdrbank'), field: 'bankDrAccountCodeTemp', editable: true,
                datatype: 'lov', link: 'ocmtrops/cgfkTxnOperBankDrAccountRecordGroup', width: 150,source:'OCMCOACT',
                titles: { code: '(Dr)', txnPostingType: 'Account Name' }, maxlength: 7
            },
            {
                fieldName: this.translateService.translate('ocmtrops.accrbank'), field: 'bankCrAccountCodeTemp', editable: true,
                datatype: 'lov', link: 'ocmtrops/cgfkTxnOperBankCrAccountRecordGroup', width: 150,source:'OCMCOACT',
                titles: { code: '(Cr)', txnPostingType: 'Account Name' }, maxlength: 7
            },
            {
                fieldName: this.translateService.translate('ocmtrops.invact'), field: 'invalidAccountsFlag', editable: true,
                width: 150, datatype: 'checkbox'
            },
            {
                fieldName: '', field: 'goButton', datatype: 'launchbutton', link: '/OTUINVAC', modal: true,
                data: 'calaunchbutton', editable: true, dialogWidth: 80, onLaunchClick: this.caGoBtnClick
            },
            {
                fieldName: this.translateService.translate('ocmtrops.oprtype'), field: 'txnOperationType', editable: true,
                width: 150, datatype: 'lov', domain: 'TXN_OPER'/*link: 'ocmtrops/cgfkTxnOperTxnOperationTyRecordGroup'*/,
                titles: { code: 'Opr Type', domain: 'Description' }, maxlength: 12
            },
            {
                fieldName: this.translateService.translate('ocmtrops.oprsq'), field: 'txnOperationSeq', editable: true,
                minValue: '0', maxValue: '999', strictFP: true, datatype: 'number', whole: true, width: 120,
                cellEditable: this.cancaseloadIdEdit,
            },
            {
                fieldName: this.translateService.translate('ocmtrops.c'), field: 'chequeProductionFlag', editable: true,
                width: 100, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('ocmtrops.p'), field: 'chequePayeeType', editable: true,
                datatype: 'text', width: 120, maxlength: 12
            },
            {
                fieldName: this.translateService.translate('ocmtrops.r'), field: 'receiptProductionFlag', editable: true,
                width: 100, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('ocmtrops.lovseq'), field: 'listSeq', editable: true,
                minValue: '0', maxValue: '999', strictFP: true, whole: true, datatype: 'number', width: 120,
            },
            {
                fieldName: this.translateService.translate('ocmtrops.upd'), field: 'updateAllowedFlag', editable: true,
                width: 100, datatype: 'checkbox'
            },
        ];
        this.ocmtropsexecuteQuery();
    }
    ok(event?) {
        this.ocmtropsexecuteQuery();
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    onRowClicktxnoper(event) {
        if (event) {
            this.txnoperModelTemp = event;
            this.txnOperSelected = JSON.parse(JSON.stringify(this.txnoperModelTemp));
            if (this.txnoperModelTemp.modifyDate) {
                this.txnTypeValid = false;
            }
        } else {
            this.txnOperSelected = new TransactionOperation();
        }
    }
    onGridClear = () => {
        this.ocmtropsexecuteQuery();
        return true;
    }
    cancaseloadIdEdit = (data: any, index: number, field: string): boolean => {
        if (!data.modifyDate) {
            return true;
        } else {
            return false;
        }
    }
    caGoBtnClick = (event) => {
        if (event.invalidAccountsFlag === 'N') {
            return false;
        } else {
            return true;
        }
    }
    onGridInsert = () => {
        for (let i = 0; i < this.txnoperData.length; i++) {
            if (!this.txnoperData[i].caseloadId) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocmtrops.caseloadmustbeentered');
                this.show();
                return;
            }
            if (!this.txnoperData[i].moduleName) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.modulenamemustbeentered');
                this.show();
                return;
            }
            if (!this.txnoperData[i].txnType) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocmtrops.transtypemustbeentered');
                this.show();
                return;
            }
            if (!this.txnoperData[i].txnOperationSeq) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocmtrops.oprsqmustbeentered');
                this.show();
                return;
            }
        }
        return { listSeq: 99, updateAllowedFlag: true, txnOperationSeq: 99 ,drAccountCodeTemp:null,
            crAccountCodeTemp:null,bankDrAccountCodeTemp:null,bankCrAccountCodeTemp:null};
    }
    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        if (event.data.caseloadId && event.data.moduleName && event.data.txnType && event.data.txnOperationSeq) {
            const txntypeSaveData = this.ocmtropsFactory.txnTypeValidation(event.data.txnType,
                event.data.moduleName, event.data.caseloadId, event.data.txnOperationSeq);
            txntypeSaveData.subscribe(data => {
                if (data && data === 'Y') {
                    this.txnTypeValid = true;
                } else {
                    this.txnTypeValid = false;
                }
            });
        }
        if (event.field === 'chequePayeeType' && !(event.data.chequePayeeType === 'T' || event.data.chequePayeeType === 'F')) {
            this.grid.setColumnData('chequePayeeType', rowIndex, null);
            this.type = 'warn';
            this.message = this.translateService.translate('ocmtrops.allowedvaluesaretabledriven');
            this.show();
            return rowdata;
        }
        return rowdata;
    }
    ocmtropsexecuteQuery() {
        this.txnoperModel.caseloadType = this.sessionManager.currentCaseLoadType;
        const serviceObj = this.ocmtropsFactory.txnOprExecuteQuery(this.txnoperModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.txnoperData = [];
                this.saveFlag = false;
                this.clearDisable = false;
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
                return;
            } else {
                data.forEach(element => {
                    element['goButton'] = '..';
                    element['calaunchbutton'] = {
                        'type': 'TROPS', caseloadId: element.caseloadId, moduleName: element.moduleName,
                        txnType: element.txnType, txnOperationSeq: element.txnOperationSeq, invalidAccountsFlag: element.invalidAccountsFlag
                    };
                    element.invalidAccountsFlag = element.invalidAccountsFlag === 'Y' ? true : false;
                    element.chequeProductionFlag = element.chequeProductionFlag === 'Y' ? true : false;
                    element.receiptProductionFlag = element.receiptProductionFlag === 'Y' ? true : false;
                    element.updateAllowedFlag = element.updateAllowedFlag === 'Y' ? true : false;
                });
                this.txnoperData = data;
                this.txnoperModelTemp = this.txnoperData[0];
                this.retriveDisable = true;
                this.clearDisable = false;
                this.namesReadOnly = true;
                this.ckeckboxReadOnly = true;
                this.tableIndex = 0;
                this.saveFlag = true;
            }
        });
    }
    ocmtropsSaveoffmrForm(event) {
        // const validation = { repeat: 0, validate: true };
        // this.txnoperData.forEach(element => {
        //     validation.repeat = 0;
        //     this.txnoperData.forEach(data => {
        //         if (data.caseloadId === element.caseloadId && data.moduleName === element.moduleName
        //             && data.txnType === element.txnType && data.txnOperationSeq === element.txnOperationSeq) {
        //             validation.repeat++;
        //         }
        //         if (validation.repeat > 1) {
        //             validation.validate = false;
        //             return;
        //         }
        //     });
        // });
        // if (!validation.validate) {
        //     this.type = 'warn';
        //     this.message = this.translateService.translate('ocmtrops.rowexistsalready');
        //     this.show();
        //     return;
        // }
        this.txnoperInsertList = event.added;
        this.txnoperUpdateList = event.updated;
        this.txnoperDeleteList = event.removed;
        this.txnoperCommitModel.insertList = [];
        this.txnoperCommitModel.updateList = [];
        this.txnoperCommitModel.deleteList = [];
        if (this.txnoperInsertList.length > 0 || this.txnoperUpdateList.length > 0) {
            for (let i = 0; i < this.txnoperInsertList.length; i++) {
                for (let i = 0; i < this.txnoperInsertList.length; i++) {
                    for (let j = 0; j < this.txnoperInsertList.length; j++) {
                        if (i !== j && this.txnoperInsertList[i].caseloadId === this.txnoperInsertList[j].caseloadId
                            &&this.txnoperInsertList[i].moduleName === this.txnoperInsertList[j].moduleName 
                            &&this.txnoperInsertList[i].txnType === this.txnoperInsertList[j].txnType) {
                            this.type = 'warn';
                            this.message = this.translateService.translate('ocmtrops.rowealreadyexists');
                            this.show();
                            return;
                        }
                    }
                }
                if (!this.txnoperInsertList[i].caseloadId) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocmtrops.caseloadmustbeentered');
                    this.show();
                    return;
                }
                if (!this.txnoperInsertList[i].moduleName) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.modulenamemustbeentered');
                    this.show();
                    return;
                }
                if (!this.txnoperInsertList[i].txnType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocmtrops.transtypemustbeentered');
                    this.show();
                    return;
                }
                if (!this.txnoperInsertList[i].txnOperationSeq) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocmtrops.oprsqmustbeentered');
                    this.show();
                    return;
                }
                if(this.txnoperData.length>0){
                    let dupList = this.txnoperData.filter(x=>(x.caseloadId && x.moduleName && x.txnType && x.txnOperationSeq) && (this.txnoperInsertList[i].caseloadId === x.caseloadId &&  this.txnoperInsertList[i].moduleName === x.moduleName &&  this.txnoperInsertList[i].txnType === x.txnType &&  Number(this.txnoperInsertList[i].txnOperationSeq) === Number(x.txnOperationSeq)) );
                    if (dupList.length>1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocmtrops.rowexistsalready');
                        this.show();
                        return;
                    }
                }
                if (this.txnoperInsertList[i].drAccountCodeTemp) {
                    this.txnoperInsertList[i].drAccountCode =(this.txnoperInsertList[i].drAccountCodeTemp!==null && Number(this.txnoperInsertList[i].drAccountCodeTemp) !==0 ) ?  Number(this.txnoperInsertList[i].drAccountCodeTemp):null;
                }else{
                    this.txnoperInsertList[i].drAccountCode=null;
                }
                if (this.txnoperInsertList[i].crAccountCodeTemp) {
                    this.txnoperInsertList[i].crAccountCode=(this.txnoperInsertList[i].crAccountCodeTemp!==null && Number(this.txnoperInsertList[i].crAccountCodeTemp) !==0 ) ?  Number(this.txnoperInsertList[i].crAccountCodeTemp):null;
                }else{
                    this.txnoperInsertList[i].crAccountCode=null;
                }
                if (this.txnoperInsertList[i].bankDrAccountCodeTemp) {
                    this.txnoperInsertList[i].bankDrAccountCode=(this.txnoperInsertList[i].bankDrAccountCodeTemp!==null && Number(this.txnoperInsertList[i].bankDrAccountCodeTemp) !==0 ) ?  Number(this.txnoperInsertList[i].bankDrAccountCodeTemp):null;
                }else{
                    this.txnoperInsertList[i].bankDrAccountCode=null;
                }
                if (this.txnoperInsertList[i].bankCrAccountCodeTemp) {
                    this.txnoperInsertList[i].bankCrAccountCode=(this.txnoperInsertList[i].bankCrAccountCodeTemp!=null && Number(this.txnoperInsertList[i].bankCrAccountCodeTemp) !=0 ) ?  Number(this.txnoperInsertList[i].bankCrAccountCodeTemp):null;

                }else{
                    this.txnoperInsertList[i].bankCrAccountCode = null;
                 }
                this.txnoperInsertList[i].modifyDate = DateFormat.getDate();
                this.txnoperInsertList[i].createDatetime = DateFormat.getDate();
                this.txnoperInsertList[i].createUserId = this.sessionManager.getId();
                this.txnoperInsertList[i].modifyUserId = this.sessionManager.getId();
                this.txnoperCommitModel.insertList = this.txnoperInsertList;
            }
            for (let j = 0; j < this.txnoperUpdateList.length; j++) {

                if(this.txnoperData.length>0){
                    let dupList = this.txnoperData.filter(x=>(x.caseloadId && x.moduleName && x.txnType && x.txnOperationSeq) && (this.txnoperUpdateList[j].caseloadId === x.caseloadId &&  this.txnoperUpdateList[j].moduleName === x.moduleName &&  this.txnoperUpdateList[j].txnType === x.txnType &&  Number(this.txnoperUpdateList[j].txnOperationSeq) === Number(x.txnOperationSeq)) );
                    if (dupList.length>1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocmtrops.rowexistsalready');
                        this.show();
                        return;
                    }
                }

                this.txnoperUpdateList[j].modifyDate = DateFormat.getDate();
                this.txnoperUpdateList[j].modifyUserId = this.sessionManager.getId();
                if (this.txnoperUpdateList[j].drAccountCodeTemp !==null) {
                    this.txnoperUpdateList[j].drAccountCode = Number(this.txnoperUpdateList[j].drAccountCodeTemp)==0 ? null :Number(this.txnoperUpdateList[j].drAccountCodeTemp);
                }
                if (this.txnoperUpdateList[j].crAccountCodeTemp !==null) {
                    
                    this.txnoperUpdateList[j].crAccountCode = Number(this.txnoperUpdateList[j].crAccountCodeTemp)==0 ? null :Number(this.txnoperUpdateList[j].crAccountCodeTemp);
                }
                if (this.txnoperUpdateList[j].bankDrAccountCodeTemp !==null) {
                    this.txnoperUpdateList[j].bankDrAccountCode = Number(this.txnoperUpdateList[j].bankDrAccountCodeTemp)==0 ?null: Number(this.txnoperUpdateList[j].bankDrAccountCodeTemp);
                }
                if (this.txnoperUpdateList[j].bankCrAccountCodeTemp !==null) {
                    this.txnoperUpdateList[j].bankCrAccountCode = Number(this.txnoperUpdateList[j].bankCrAccountCodeTemp)==0 ? null :Number(this.txnoperUpdateList[j].bankCrAccountCodeTemp);
                }
                this.txnoperCommitModel.updateList = this.txnoperUpdateList;
            }
        }
        if (this.txnoperDeleteList.length > 0) {
            for (let i = 0; i < this.txnoperDeleteList.length; i++) {
                this.txnoperCommitModel.deleteList = this.txnoperDeleteList;
            }
        }
        const offmrSaveData = this.ocmtropsFactory.txnOperCommit(this.txnoperCommitModel);
        offmrSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                if (this.saveFlag) {
                    this.ocmtropsexecuteQuery();
                }
                return;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                if (this.saveFlag) {
                    this.ocmtropsexecuteQuery();
                }
                return;
            }
        });
    }
}
