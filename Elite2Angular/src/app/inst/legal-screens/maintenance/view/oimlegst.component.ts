import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OimlegstService } from '../service/oimlegst.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { LegalUpdateReasonsCommitBean } from '../beans/LegalUpdateReasonsCommitBean';
import { LegalUpdateReasons } from '../beans/LegalUpdateReasons';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';

@Component({
    selector: 'app-oimlegst',
    templateUrl: './oimlegst.component.html'
})

export class OimlegstComponent implements OnInit {
    @ViewChild('updateReasonGrid') updateReasonGrid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    updatereasonsData: LegalUpdateReasons[] = [];
    updatereasonsRowData: LegalUpdateReasons[] = [];
    updatereasonsDataTemp: LegalUpdateReasons[] = [];
    updatereasonsModel: LegalUpdateReasons = new LegalUpdateReasons();
    updatereasonsSearchModel: LegalUpdateReasons = new LegalUpdateReasons();
    updatereasonsInsertList: LegalUpdateReasons[] = [];
    updatereasonsUpdatetList: LegalUpdateReasons[] = [];
    updatereasonsDeleteList: LegalUpdateReasons[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    updateReasonsColumnDef: any[];
    rgcatRg: any[] = [];
    rgstatRg: any[] = [];
    updatereasonsCommitModel: LegalUpdateReasonsCommitBean = new LegalUpdateReasonsCommitBean();
    tableIndex: number;
    updResDeleteEnable: boolean;
    enableIfRowDatExist: boolean;
    countData: any;
    retriveDisabled: boolean;
    clearDisabled: boolean;
    namesReadOnly: boolean;
    expiryDate: any;
    effectiveDate: any;
    constructor(private oimlegstFactory: OimlegstService,
        public translateService: TranslateService, public sessionManager: UserSessionManager) {
        this.updateReasonsColumnDef = [];
    }
    ngOnInit() {
        this.updResDeleteEnable = false;
        this.enableIfRowDatExist = false;
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.namesReadOnly = false;
        this.updateReasonsColumnDef = [
            {
                fieldName: this.translateService.translate('oimlegst.reason') + '*',
                field: 'updateReasonCode', editable: true, width: 150, datatype: 'text',
                uppercase: true, maxlength: 12, cellEditable: this.canAlertEdit,
            },
            {
                fieldName: this.translateService.translate('common.description') + '*',
                field: 'description', editable: true, width: 150, datatype: 'text', uppercase: 'false', maxlength: 80,
            },
            {
                fieldName: this.translateService.translate('common.effectivedate') + '*',
                field: 'effectiveDate', editable: true, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('oimlegst.category') + '*',
                field: 'reasonCategory', editable: true, width: 150, datatype: 'lov', domain: 'LGL_RSN_CAT'
            },
            {
                fieldName: this.translateService.translate('oimlegst.resultingStatus') + '*',
                field: 'activeType', editable: true, width: 150, datatype: 'lov', domain: 'ACTIVE_TYPE'
            },
            {
                fieldName: this.translateService.translate('common.active'),
                field: 'activeFlag', editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.sequencename'),
                field: 'listSeq', editable: true, width: 150,
                maxValue: '999999', strictFP: true, whole: true, datatype: 'number'
            },
            {
                fieldName: this.translateService.translate('common.expirydate'),
                field: 'expiryDate', datatype: 'date', editable: false, width: 150
            },
             { fieldName: '', field: 'hideField', editable: true, hide: true, width: 150 },
        ];
        this.updatereasonsExecuteQuery(null);
    }
    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }
    validateRow = (event) => {
        const rowdata = new ValidateRowReturn();
        return rowdata;
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    onRowClickupdatereasons(event) {
        if (event) {
            this.updatereasonsModel = event;
        }
        if (this.updatereasonsModel.updateReasonCode) {
            this.keyDeleteRecordValidation();
        }
        if (this.updatereasonsModel.createDatetime) {
            this.updResDeleteEnable = true;
        } else {
            this.updResDeleteEnable = false;
        }
    }
    onGridReasonDelete = () => {
        if (this.countData > 0) {
            this.show('oimlegst.deleteornot', 'warn');
            return false;
        }
        return true;
    }
    isInsertable(date?) {
        if (this.updatereasonsSearchModel.updateReasonCode || this.updatereasonsSearchModel.description ||
            this.effectiveDate || this.updatereasonsSearchModel.reasonCategory ||
            this.updatereasonsSearchModel.activeType || this.updatereasonsSearchModel.activeFlag
            || this.updatereasonsSearchModel.listSeq || this.expiryDate || this.namesReadOnly) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
        if (date) {
            this.clearDisabled = false;
        }
    }
    clear() {
        this.updatereasonsData = [];
        this.updatereasonsSearchModel = new LegalUpdateReasons();
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.namesReadOnly = false;
        this.expiryDate = undefined;
        this.effectiveDate = undefined;
    }
    updatereasonsExecuteQuery(date?) {
        if (date) {
            if (date.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                return;
            }
            if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                return;
            }
        }
        if (this.expiryDate) {
            this.updatereasonsSearchModel.expiryDate = this.expiryDate;
        } else {
            this.updatereasonsSearchModel.expiryDate = null;
        }
        if (this.effectiveDate) {
            this.updatereasonsSearchModel.effectiveDate = this.effectiveDate;
        } else {
            this.updatereasonsSearchModel.effectiveDate = null;
        }
        const updatereasonsResult = this.oimlegstFactory.updateReasonsExecuteQuery(this.updatereasonsSearchModel);
        updatereasonsResult.subscribe(updatereasonsResultList => {
            updatereasonsResultList.forEach(element => {
                element.activeFlag = element.activeFlag === 'Y' ? true : false;
            });
            if (updatereasonsResultList.length === 0) {
                this.updatereasonsData = [];
                this.retriveDisabled = false;
                this.clearDisabled = true;
                this.namesReadOnly = false;
                this.show('common.querycaused');
                this.clear();
            } else {
                this.updatereasonsData = updatereasonsResultList;
                this.updatereasonsModel = updatereasonsResultList[0];
                this.tableIndex = 0;
                this.retriveDisabled = true;
                this.clearDisabled = false;
                this.namesReadOnly = true;
            }
        });
    }
    onGridInsert = () => {
        this.updatereasonsRowData = [];
        this.updateReasonGrid.addedMap.forEach(
            (v: any, k: number) => {
                this.updatereasonsRowData.push(v);
            }
        );
        this.updateReasonGrid.updatedMap.forEach(
            (v: any, k: number) => {
                this.updatereasonsRowData.push(v);
            }
        );
        for (let i = 0; i < this.updatereasonsRowData.length; i++) {
            if (!this.updateReasonValidations(this.updatereasonsRowData[i])) {
                return;
            }
        }
        return {
            activeFlag: true,
            effectiveDate: DateFormat.getDate()
        };
    }
    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.updateReasonGrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.updateReasonGrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'effectiveDate') {
            if (event.data.createDatetime &&
                 DateFormat.compareDate(DateFormat.getDate(event.oldValue) , DateFormat.getDate(event.newValue)) !== 0) {
                this.updateReasonGrid.setColumnData('hideField', rowIndex, true);
                const date = DateFormat.getDate(event.data.effectiveDate);
                if (DateFormat.compareDate(DateFormat.getDate(), date) === 1) {
                    this.show(this.translateService.translate('oimlegst.effectnotearly'), 'warn');
                    rowdata.validated = true;
                    return rowdata;
                }
            } else {
            this.updateReasonGrid.setColumnData('hideField', rowIndex, false);
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    onGridClear = () => {
        this.updatereasonsExecuteQuery(null);
        return true;
    }
    updateReasonValidations = (event) => {
        const is = { valid: true };
        // if (this.updatereasonsData && this.updatereasonsData) {
        // this.updatereasonsData.forEach(element => {
        if (event.updateReasonCode === undefined || !event.updateReasonCode.trim()) {
            this.show(this.translateService.translate('oimlegst.mandetoryUpdateReasonCode'), 'warn');
            is.valid = false;
            return is.valid;
        }
        if (event.description === undefined || !event.description.trim()) {
            this.show(this.translateService.translate('oimlegst.mandetoryDescription'), 'warn');
            is.valid = false;
            return is.valid;
        }
        if (!event.effectiveDate) {
            this.show(this.translateService.translate('oimlegst.mandetoryEffectiveDate'), 'warn');
            is.valid = false;
            return is.valid;
        }
        if (event.effectiveDate && !event.createDatetime) {
            if (DateFormat.compareDate(DateFormat.getDate(event.effectiveDate), DateFormat.getDate()) === -1) {
                this.show(this.translateService.translate('oimlegst.effectnotearly'), 'warn');
                is.valid = false;
                return is.valid;
            }
        } else  if (event.effectiveDate && event.createDatetime && event.hideField) {
            if (DateFormat.compareDate(DateFormat.getDate(event.effectiveDate), DateFormat.getDate()) === -1) {
                this.show(this.translateService.translate('oimlegst.effectnotearly'), 'warn');
                is.valid = false;
                return is.valid;
            }
        }
        if (!event.reasonCategory) {
            this.show(this.translateService.translate('oimlegst.mandetoryReasonCode'), 'warn');
            is.valid = false;
            return is.valid;
        }
        if (!event.activeType) {
            this.show(this.translateService.translate('oimlegst.mandetoryActiveType'), 'warn');
            is.valid = false;
            return is.valid;
        }
        return is.valid;
    }
    keyDeleteRecordValidation() {
        const serviceObj = this.oimlegstFactory.getDeleteRecordOrNot(this.updatereasonsModel);
        serviceObj.subscribe(data => {
            this.countData = data;
        });
    }
    onStatusBlur() {
        if (!this.updatereasonsSearchModel.reasonCategory) {
            this.updatereasonsSearchModel.reasonCategory = this.updatereasonsSearchModel.reasonCategory === '' ? undefined : '';
        }
    }
    onRelationshipBlur() {
        if (!this.updatereasonsSearchModel.activeType) {
            this.updatereasonsSearchModel.activeType = this.updatereasonsSearchModel.activeType === '' ? undefined : '';
        }
    }
    oimlegstSaveupdatereasonsForm(event) {
        this.updatereasonsInsertList = event.added;
        this.updatereasonsUpdatetList = event.updated;
        this.updatereasonsDeleteList = event.removed;
        this.updatereasonsCommitModel.insertList = [];
        this.updatereasonsCommitModel.updateList = [];
        this.updatereasonsCommitModel.deleteList = [];
        if (this.updatereasonsInsertList.length > 0 || this.updatereasonsUpdatetList.length > 0) {
            for (let i = 0; i < this.updatereasonsInsertList.length; i++) {
                if (!this.updateReasonValidations(this.updatereasonsInsertList[i])) {
                    return;
                }
                this.updatereasonsInsertList[i].activeFlag = this.updatereasonsInsertList[i].activeFlag ? 'Y' : 'N';
            }
            for (let i = 0; i < this.updatereasonsUpdatetList.length; i++) {
                if (!this.updateReasonValidations(this.updatereasonsUpdatetList[i])) {
                    return;
                }
                this.updatereasonsUpdatetList[i].activeFlag = this.updatereasonsUpdatetList[i].activeFlag ? 'Y' : 'N';
            }
            this.updatereasonsCommitModel.insertList = this.updatereasonsInsertList;
            this.updatereasonsCommitModel.updateList = this.updatereasonsUpdatetList;
        }
        if (this.updatereasonsDeleteList.length > 0) {
            for (let i = 0; i < this.updatereasonsDeleteList.length; i++) {
                this.updatereasonsCommitModel.deleteList = this.updatereasonsDeleteList;
            }
        }
        const updatereasonsSaveData = this.oimlegstFactory.updateReasonsCommit(this.updatereasonsCommitModel);
        updatereasonsSaveData.subscribe(data => {
            if (String(data[0].errorMessage).indexOf('LEGAL_UPDATE_REASONS_PK') > 0) {
                this.show(this.translateService.translate('oimlegst.primaryKeyViolation'), 'warn');
                this.updatereasonsExecuteQuery(null);
                return;
            }
            if (data[0] && data[0].returnValue === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.updatereasonsExecuteQuery(null);
                return;
            } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
                this.updatereasonsExecuteQuery(null);
                return;
            }
        });
    }
}
