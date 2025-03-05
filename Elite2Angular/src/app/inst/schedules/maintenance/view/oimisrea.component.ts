import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { InternalScheduleReasons } from '@inst/schedules/maintenance/beans/InternalScheduleReasons';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { InternalScheduleReasonsCommitBean } from '@inst/schedules/maintenance/beans/InternalScheduleReasonsCommitBean';
import { OimisreaService } from '@inst/schedules/maintenance/service/oimisrea.service';

@Component({
    selector: 'app-oimisrea',
    templateUrl: './oimisrea.component.html'
})

export class OimisreaComponent implements OnInit {
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    intsrData: InternalScheduleReasons[] = [];
    intsrDataTemp: InternalScheduleReasons[] = [];
    intsrModel: InternalScheduleReasons = new InternalScheduleReasons();
    intsrModelData: InternalScheduleReasons = new InternalScheduleReasons();
    intsrCommitModel: InternalScheduleReasonsCommitBean = new InternalScheduleReasonsCommitBean();
    intsrIndex = 0;
    intsrInsertList: InternalScheduleReasons[] = [];
    intsrUpdateList: InternalScheduleReasons[] = [];
    intsrDeleteList: InternalScheduleReasons[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    intSrColumnDef: any[];
    intSrReadOnly = false;
    rgintschrsnRg: any[] = [];
    rgintschtypeRg: any[] = [];
    msglist: any[];
    message: any;
    type: any;
    intsralertUpdateList: any;
    @ViewChild('grid', {static: true}) grid: any;
    tableIndex = -1;
    deleteEnable: boolean;
    contactTypeTitle = {
        'description': this.translateService.translate('common.description'),
        'code': this.translateService.translate('common.type'),
        'listSeq': ''
    };
    relationshipTypeTitle = {
        'description': this.translateService.translate('common.description'),
        'code': this.translateService.translate('common.reason'),
        'listSeq': ''
    };
    clearDisable: boolean;
    retriveDisable: boolean;
    namesReadOnly: boolean;
    internalScheduleType: any;
    internalScheduleRsnCode: any;
    description: any;
    listSeq: any;
    activeFlag: any;
    expiryDate: any;
    delValid: boolean;
    clearData: boolean;
    internalScheduleTypeLink: any;
    internalScheduleRsnCodeLink: any;
    constructor(private oimisreaFactory: OimisreaService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.intSrColumnDef = [];
    }
    ngOnInit() {
        this.retriveDisable = false;
        this.clearDisable = true;
        this.namesReadOnly = false;
        this.deleteEnable = false;
        this.internalScheduleTypeLink = 'oimisrea/rgIntSchTypeRecordGroup';
        this.internalScheduleRsnCodeLink = 'oimisrea/rgIntSchRsnRecordGroup';
        this.intSrColumnDef = [
            {
                fieldName: this.translateService.translate('common.type') + '*', field: 'internalScheduleType', editable: true,
                width: 150, datatype: 'lov', cellEditable: this.canAlertEdit,domain:'INT_SCH_TYPE',//link: this.internalScheduleTypeLink
                // titles: {
                //     description: this.translateService.translate('common.description'),
                //     code: this.translateService.translate('common.type'),
                //     listSeq: ''
                // }
            },
            {
                fieldName: this.translateService.translate('common.reason') + '*', field: 'internalScheduleRsnCode', editable: true,
                width: 150, datatype: 'lov',  cellEditable: this.canAlertEdit,domain:'INT_SCH_RSN',//link: this.internalScheduleRsnCodeLink
                // titles: {
                //     description: this.translateService.translate('common.description'),
                //     code: this.translateService.translate('common.reason'),
                //     listSeq: ''
                // }
            },
            {
                fieldName: this.translateService.translate('common.description') + '*', field: 'description', editable: true, width: 150,
                datatype: 'text', maxlength: 40, uppercase: 'false'
            },
            {
                fieldName: this.translateService.translate('common.sequencename'), field: 'listSeq', editable: true, width: 100,
                datatype: 'number', maxValue: '999', strictFP: true, whole: true
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true,
                datatype: 'checkbox', width: 100
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
                width: 150, datatype: 'date'
            },
        ];
        this.intsrExecuteQuery();
    }
    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }
    onGridClear = () => {
        if (this.clearData) {
            this.intsrExecuteQuery();
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
    intsrExecuteQuery(date?) {
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
        if (this.internalScheduleType) {
            this.intsrModel.internalScheduleType = this.internalScheduleType;
        }
        if (this.internalScheduleRsnCode) {
            this.intsrModel.internalScheduleRsnCode = this.internalScheduleRsnCode;
        }
        if (this.description) {
            this.intsrModel.description = this.description;
        }
        if (this.listSeq || this.listSeq === 0) {
            this.intsrModel.listSeq = this.listSeq;
        }
        if (this.activeFlag) {
            this.intsrModel.activeFlag = this.activeFlag;
        }
        if (this.expiryDate) {
            this.intsrModel.expiryDate = this.expiryDate;
        }
        this.clearData = true;
        const intsrResult = this.oimisreaFactory.intSrExecuteQuery(this.intsrModel);
        intsrResult.subscribe(data => {
            if (data.length === 0) {
                this.intsrData = [];
                this.intsrModel = new InternalScheduleReasons();
                this.intsrModelData = new InternalScheduleReasons();
                this.internalScheduleType = undefined;
                this.internalScheduleRsnCode = undefined;
                this.description = undefined;
                this.listSeq = undefined;
                this.activeFlag = undefined;
                this.expiryDate = undefined;
                this.clearData = false;
                this.show('common.querycaused');
                return;
            } else {
                data.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
                this.intsrData = data;
                this.retriveDisable = true;
                this.clearDisable = false;
                this.namesReadOnly = true;
                this.tableIndex = 0;
            }
        });
    }
    clearQuery() {
        this.intsrData = [];
        this.intsrModel = new InternalScheduleReasons();
        this.intsrModelData = new InternalScheduleReasons();
        this.retriveDisable = false;
        this.clearDisable = true;
        this.namesReadOnly = false;
        this.deleteEnable = false;
        this.internalScheduleType = undefined;
        this.internalScheduleRsnCode = undefined;
        this.description = undefined;
        this.listSeq = undefined;
        this.activeFlag = undefined;
        this.expiryDate = undefined;
        this.clearData = false;
    }
    onStatusBlur() {
        if (!this.internalScheduleType) {
            this.internalScheduleType = this.internalScheduleType === '' ? undefined : '';
        }
    }
    onRelationshipBlur() {
        if (!this.internalScheduleRsnCode) {
            this.internalScheduleRsnCode = this.internalScheduleRsnCode === '' ? undefined : '';
        }
    }
    onRowClickIntSr(event) {
        if (event) {
            this.intsrModelData = event;
            if (event.createDatetime) {
                this.deleteEnable = true;
            } else {
                this.deleteEnable = false;
            }
            this.deleteValidation();
        }
    }
    deleteValidation() {
        const intsrResult = this.oimisreaFactory.intSrKeyDelrec(this.intsrModelData);
        intsrResult.subscribe(data => {
            if (data === 0) {
                this.delValid = false;
            } else {
                this.delValid = true;
            }
        });
    }
    onGridDalete = () => {
        if (this.delValid) {
            this.show('oimisrea.deletenotaallowed', 'warn');
            return false;
        } else {
            return true;
        }
    }
    isInsertable() {
        if (this.internalScheduleType || this.internalScheduleRsnCode
            || this.description || this.listSeq || this.activeFlag
            || this.expiryDate || this.namesReadOnly) {
            this.clearDisable = false;
        } else {
            this.clearDisable = true;
        }
    }
    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
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
        this.intsrData.forEach(element => {
            if (!element.internalScheduleType) {
                this.show('common.typemustbeentereddot', 'warn');
                is.valid = false;
                return is.valid;
            }
            if (!element.internalScheduleRsnCode) {
                this.show('common.reasonmustbeentered', 'warn');
                is.valid = false;
                return is.valid;
            }
            if (!element.description || !element.description.trim()) {
                this.show('common.descriptionmustbeentereddot', 'warn');
                is.valid = false;
                return is.valid;
            }
            for (let i = 0; i < this.intsrData.length; i++) {
                for (let j = 0; j < this.intsrData.length; j++) {
                    if (i !== j && this.intsrData[i].internalScheduleType === this.intsrData[j].internalScheduleType &&
                        this.intsrData[i].internalScheduleRsnCode === this.intsrData[j].internalScheduleRsnCode) {
                        this.show('oimisrea.rowexistsalready');
                        is.valid = false;
                        return is.valid;
                    }
                }
            }
        });
        return is.valid;
    }

    /**
     *  This function will be executed when commit event is fired
    */
    oimisreaSaveintsrForm(event) {
        if (!this.updateReasonValidations()) {
            return false;
        }
        this.intsrInsertList = event.added;
        this.intsrUpdateList = event.updated;
        this.intsrDeleteList = event.removed;
        this.intsrCommitModel.insertList = [];
        this.intsrCommitModel.updateList = [];
        this.intsrCommitModel.deleteList = [];
        if (this.intsrInsertList.length > 0) {
            for (let i = 0; i < this.intsrInsertList.length; i++) {
                this.intsrInsertList[i].activeFlag = this.intsrInsertList[i].activeFlag ? 'Y' : 'N';
                this.intsrCommitModel.insertList = this.intsrInsertList;
            }
        }
        if (this.intsrUpdateList.length > 0) {
            for (let i = 0; i < this.intsrUpdateList.length; i++) {
                this.intsrUpdateList[i].activeFlag = this.intsrUpdateList[i].activeFlag ? 'Y' : 'N';
                this.intsrCommitModel.updateList = this.intsrUpdateList;
            }
        }
        if (this.intsrDeleteList.length > 0) {
            for (let i = 0; i < this.intsrDeleteList.length; i++) {
                this.intsrCommitModel.deleteList = this.intsrDeleteList;
            }
        }
        const intsrSaveData = this.oimisreaFactory.intSrCommit(this.intsrCommitModel);
        intsrSaveData.subscribe(data => {
            if (String(data.errorMessage).indexOf('INTERNAL_SCHEDULE_REASONS_PK') > 0) {
                this.show('oimisrea.rowexistsalready');
                return;
            }
            if (data.sealFlag === '1') {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.intsrExecuteQuery();
                return;
            } else if (data.sealFlag === '0') {
                this.show('common.addupdateremoverecordfailed');
                this.intsrExecuteQuery();
                return;
            }
        });
    }
}
