import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OimlegsuService } from '../service/oimlegsu.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { LegalUpdateUsages } from '../beans/LegalUpdateUsages';
import { LegalUpdateUsagesCommitBean } from '../beans/LegalUpdateUsagesCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';

@Component({
    selector: 'app-oimlegsu',
    templateUrl: './oimlegsu.component.html'
})

export class OimlegsuComponent implements OnInit {
    @ViewChild('grid') grid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    lglupdusagesData: LegalUpdateUsages[] = [];
    lglupdusagesDataTemp: LegalUpdateUsages[] = [];
    lglupdusagesModel: LegalUpdateUsages = new LegalUpdateUsages();
    lglupdusagesModelData: LegalUpdateUsages = new LegalUpdateUsages();
    lglupdusagesCommitModel: LegalUpdateUsagesCommitBean = new LegalUpdateUsagesCommitBean();
    lglupdusagesIndex: number;
    lglupdusagesInsertList: LegalUpdateUsages[] = [];
    lglupdusagesUpdateList: LegalUpdateUsages[] = [];
    lglupdusagesDeleteList: LegalUpdateUsages[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    lglUpdUsagesColumnDef: any[];
    lglUpdUsagesReadOnly: boolean;
    rglegalclassRg: any[] = [];
    rgupdatereasoncodeRg: any[] = [];
    legalClass: string;
    updateReasonCode: string;
    activeFlag: any;
    expiryDate: Date;
    tableIndex = -1;
    retriveDisable: boolean;
    clearDisable: boolean;
    namesReadOnly: boolean;
    ckeckboxReadOnly: boolean;
    enableInsert: boolean;
    enableDelete: boolean;
    keyDelRecData: boolean;
    message = ' Invalid.';
    clearData: boolean;
    constructor(private oimlegsuFactory: OimlegsuService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.lglUpdUsagesColumnDef = [];
    }
    ngOnInit() {
        this.retriveDisable = false;
        this.clearDisable = true;
        this.namesReadOnly = false;
        this.ckeckboxReadOnly = false;
        this.enableInsert = true;
        this.enableDelete = false;
        this.clearData = false;
        this.lglUpdUsagesColumnDef = [
            {
                fieldName: this.translateService.translate('oimlegsu.statusfor') + '*', field: 'legalClass', editable: true, width: 150,
                datatype: 'lov', domain: 'LEGAL_BLOCK', cellEditable: this.canAlertEdit
            },
            {
                fieldName: this.translateService.translate('common.reason') + '*', field: 'updateReasonCode', editable: true, width: 150,
                datatype: 'lov', link: 'oimlegsu/rgUpdateReasonCodeRecordGroup', cellEditable: this.canAlertEdit,source:'OIMLEGST'
            },
            { fieldName: this.translateService.translate('common.category'), field: 'reasonCategory', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oimlegsu.resultingstatus'), field: 'activeType', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 150,
                datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.sequencename'), field: 'listSeq', editable: true, width: 150,
                datatype: 'number', maxValue: '999999', strictFP: true, whole: true
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
                width: 150, datatype: 'date'
            },
        ];
    }
    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }
    onStatusBlur() {
        if (!this.legalClass) {
            this.legalClass = this.legalClass === '' ? undefined : '';
        }
    }
    onRelationshipBlur() {
        if (!this.updateReasonCode) {
            this.updateReasonCode = this.updateReasonCode === '' ? undefined : '';
        }
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
    onRowClicklglupdusages(event) {
        if (event) {
            this.lglupdusagesModelData = event;
            if (this.lglupdusagesModelData.createDatetime) {
                this.enableDelete = true;
                this.keyDelRec();
            } else {
                this.enableDelete = false;
            }
        }
    }
    keyDelRec() {
        const lglupdusagesResult = this.oimlegsuFactory.deleteKeyDelRec(this.lglupdusagesModelData);
        lglupdusagesResult.subscribe(data => {
            if (data > 0) {
                this.keyDelRecData = true;
            } else {
                this.keyDelRecData = false;
            }
        });
    }
    onGridDelete = () => {
        if (this.keyDelRecData) {
            this.show('oimlegsu.thisupdatereasoncannotbedeleted', 'warn');
            return false;
        }
        return true;
    }
    ok() {
    }
    no() {
    }
    cancel() {
        this.lglupdusagesData = [];
        this.lglupdusagesModel = new LegalUpdateUsages();
        this.lglupdusagesModelData = new LegalUpdateUsages();
        this.legalClass = null;
        this.updateReasonCode = null;
        this.activeFlag = null;
        this.expiryDate = undefined;
        this.retriveDisable = false;
        this.clearDisable = true;
        this.namesReadOnly = false;
        this.ckeckboxReadOnly = false;
        this.enableDelete = false;
        this.clearData = false;
    }
    lglupdusagesExecuteQuery(date?) {
        if (date) {
            if (date.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                this.clearDisable = false;
                return;
            }
            if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                this.clearDisable = false;
                return;
            }
        }
        if (this.legalClass) {
            this.lglupdusagesModel.legalClass = this.legalClass;
        }
        if (this.updateReasonCode) {
            this.lglupdusagesModel.updateReasonCode = this.updateReasonCode;
        }
        this.lglupdusagesModel.activeFlag = this.activeFlag;
        if (this.expiryDate) {
            this.lglupdusagesModel.expiryDate = this.expiryDate;
        }
        this.clearData = true;
        const lglupdusagesResult = this.oimlegsuFactory.lglUpdUsagesExecuteQuery(this.lglupdusagesModel);
        lglupdusagesResult.subscribe(data => {
            if (data.length === 0) {
                this.lglupdusagesData = [];
                this.lglupdusagesModel = new LegalUpdateUsages();
                this.legalClass = undefined;
                this.updateReasonCode = undefined;
                this.activeFlag = undefined;
                this.expiryDate = undefined;
                this.clearData = false;
                this.clearDisable = true;
                this.show('common.querycaused');
                return;
            } else {
                data.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
                this.lglupdusagesData = data;
                this.tableIndex = 0;
                this.retriveDisable = true;
                this.clearDisable = false;
                this.namesReadOnly = true;
                this.ckeckboxReadOnly = true;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oimlegsuSavelglupdusagesForm(event) {
        if (!this.updateReasonValidations()) {
            return false;
        }
        this.lglupdusagesInsertList = event.added;
        this.lglupdusagesUpdateList = event.updated;
        this.lglupdusagesDeleteList = event.removed;
        this.lglupdusagesCommitModel.insertList = [];
        this.lglupdusagesCommitModel.updateList = [];
        this.lglupdusagesCommitModel.deleteList = [];
        if (this.lglupdusagesInsertList.length > 0 || this.lglupdusagesUpdateList.length > 0) {
            for (let i = 0; i < this.lglupdusagesInsertList.length; i++) {
                this.lglupdusagesInsertList[i].activeFlag = this.lglupdusagesInsertList[i].activeFlag ? 'Y' : 'N';
                this.lglupdusagesCommitModel.insertList = this.lglupdusagesInsertList;
            }
            for (let i = 0; i < this.lglupdusagesUpdateList.length; i++) {
                this.lglupdusagesUpdateList[i].activeFlag = this.lglupdusagesUpdateList[i].activeFlag ? 'Y' : 'N';
                this.lglupdusagesCommitModel.updateList = this.lglupdusagesUpdateList;
            }
        }
        if (this.lglupdusagesDeleteList.length > 0) {
            for (let i = 0; i < this.lglupdusagesDeleteList.length; i++) {
                this.lglupdusagesDeleteList[i].activeFlag = this.lglupdusagesDeleteList[i].activeFlag ? 'Y' : 'N';
                this.lglupdusagesCommitModel.deleteList = this.lglupdusagesDeleteList;
            }
        }
        const lglupdusagesSaveData = this.oimlegsuFactory.lglUpdUsagesCommit(this.lglupdusagesCommitModel);
        lglupdusagesSaveData.subscribe(data => {
            if (String(data.errorMessage).indexOf('LEGAL_UPDATE_USAGES_PK') > 0) {
                this.show('oimlegsu.statusforwiththisreasoncodealreadyexists');
                return;
            }
            if (data && data.sealFlag === '1') {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.lglupdusagesExecuteQuery();
                return;
            } else if (data && data.sealFlag === '0') {
                this.show('common.addupdateremoverecordfailed', 'warn');
                this.lglupdusagesExecuteQuery();
                return;
            } else {
                this.message = this.translateService.translate('common.recordcannotbedeleted');
                this.message = String(this.message).replace('%tablename%', data.sealFlag);
                this.show(this.message, 'warn');
                this.lglupdusagesExecuteQuery();
                return;
            }
        });
    }
    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.grid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.grid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'updateReasonCode' && event.data.updateReasonCode) {
            const serviceObj = this.oimlegsuFactory.postQueryData(event.data.updateReasonCode);
            serviceObj.subscribe(data => {
                if (data != null) {
                    this.grid.setColumnData('activeType', rowIndex, data.activeType);
                    this.grid.setColumnData('reasonCategory', rowIndex, data.reasonCategory);
                    rowdata.validated = true;
                    return rowdata;
                }
            });
        }
        rowdata.validated = true;
        return rowdata;
    }
    onGridInsert = () => {
        if (!this.updateReasonValidations()) {
            return false;
        }
        return { activeFlag: true };
    }
    updateReasonValidations() {
        const is = { valid: true };
        this.lglupdusagesData.forEach(element => {
            if (!element.legalClass) {
                this.show('oimlegsu.statusformustbeentered', 'warn');
                is.valid = false;
                return is.valid;
            }
            if (!element.updateReasonCode) {
                this.show('common.reasonmustbeentered', 'warn');
                is.valid = false;
                return is.valid;
            }
            for (let i = 0; i < this.lglupdusagesData.length; i++) {
                for (let j = 0; j < this.lglupdusagesData.length; j++) {
                    if (i !== j && this.lglupdusagesData[i].legalClass === this.lglupdusagesData[j].legalClass &&
                        this.lglupdusagesData[i].updateReasonCode === this.lglupdusagesData[j].updateReasonCode) {
                        this.show('oimlegsu.statusforwiththisreasoncodealreadyexists');
                        is.valid = false;
                        return is.valid;
                    }
                }
            }
        });
        return is.valid;
    }
    isInsertable() {
        if (this.legalClass || this.updateReasonCode || this.activeFlag || this.expiryDate || this.namesReadOnly) {
            this.clearDisable = false;
        } else {
            this.clearDisable = true;
        }
    }
    onGridClear = () => {
        if (this.clearData) {
            this.lglupdusagesExecuteQuery();
        }
        return true;
    }
}
