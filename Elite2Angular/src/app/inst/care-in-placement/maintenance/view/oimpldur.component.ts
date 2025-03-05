import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OimpldurService } from '../service/oimpldur.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { PlacementDurations } from '../../beans/PlacementDurations';
import { PlacementDurationsCommitBean } from '../beans/PlacementDurationsCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';

@Component({
    selector: 'app-oimpldur',
    templateUrl: './oimpldur.component.html'
})

export class OimpldurComponent implements OnInit {
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    placementdurData: PlacementDurations[] = [];
    placementdurDataDetails: PlacementDurations[] = [];
    placementdurDataTemp: PlacementDurations[] = [];
    placementdurModel: PlacementDurations = new PlacementDurations();
    placementdurIndex: 0;
    placementdurInsertList: PlacementDurations[] = [];
    placementdurUpdatetList: PlacementDurations[] = [];
    placementdurDeleteList: PlacementDurations[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    placementDurColumnDefs: any[];
    placementDurReadOnly = false;
    rgdurationtypeRg: any[] = [];
    rgplacementtypeRg: any[] = [];
    placementDurCommitModel: PlacementDurationsCommitBean = new PlacementDurationsCommitBean();
    message: string;
    type: string;
    placementType: any;
    durationType: any;
    startingCode: boolean;
    namesReadOnly: boolean;
    retriveDisable: boolean;
    clearDisable: boolean;
    active: any;
    expiryDate: Date;
    listSeq: number;
    minimumDuration: number;
    maximumDuration: number;
    @ViewChild('grid') grid: any;
    placementdurInsert: boolean;
    tableIndex = -1;
    placementdurDelete: boolean;
    constructor(private oimpldurFactory: OimpldurService,
        public translateService: TranslateService, public sessionManager: UserSessionManager) {
        this.placementDurColumnDefs = [];
    }
    ngOnInit() {
        this.clearDisable = true;
        this.namesReadOnly = false;
        this.retriveDisable = false;
        this.placementdurInsert = true;
        this.placementdurDelete = false;
        this.placementDurColumnDefs = [
            {
                fieldName: this.translateService.translate('oimpldur.placementType') + '*', field: 'placementType', editable: true,
                width: 180, datatype: 'lov', domain: 'PLACE_TYPE', titles: { code: 'Type', description: 'Description' }
            },
            {
                fieldName: this.translateService.translate('oimpldur.durationType') + '*', field: 'durationType', editable: true,
                width: 180, datatype: 'lov', domain: 'CIP_DURATION', titles: { code: 'Type', description: 'Description' }
            },
            {
                fieldName: this.translateService.translate('oimpldur.minimum'), field: 'minimumDuration', editable: true, width: 130,
                minValue: '0', maxValue: '999999', strictFP: true, whole: true, datatype: 'number'
            },
            {
                fieldName: this.translateService.translate('oimpldur.maximum'), field: 'maximumDuration', editable: true, width: 130,
                minValue: '0', maxValue: '999999', strictFP: true, whole: true, datatype: 'number'
            },
            {
                fieldName: this.translateService.translate('oimpldur.seq'), field: 'listSeq', editable: true, width: 100,
                minValue: '0', maxValue: '999999', strictFP: true, whole: true, datatype: 'number'
            },
            {
                fieldName: this.translateService.translate('oimpldur.act'), field: 'activeFlag', editable: true,
                datatype: 'checkbox', width: 100
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
                editable: false, width: 150, datatype: 'date'
            },
        ];
        this.placementDurExecuteQuery();
    }
    onRowClickplacementdur(event) {
        if (event) {
            if (event.createDatetime) {
                this.placementdurDelete = true;
            } else {
                this.placementdurDelete = false;
            }
        }
    }
    clearQuery() {
        this.placementdurData = [];
        this.placementdurDataDetails = [];
        this.placementdurModel = new PlacementDurations();
        this.placementType = undefined;
        this.durationType = undefined;
        this.startingCode = false;
        this.retriveDisable = false;
        this.namesReadOnly = false;
        this.active = undefined;
        this.expiryDate = undefined;
        this.listSeq = undefined;
        this.minimumDuration = undefined;
        this.maximumDuration = undefined;
        this.clearDisable = true;
        this.placementdurDelete = false;
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    placementDurExecuteQuery(date?) {
        if (this.durationType) {
            this.placementdurModel.durationType = this.durationType;
        }
        if (this.placementType) {
            this.placementdurModel.placementType = this.placementType;
        }
        if (this.minimumDuration) {
            this.placementdurModel.minimumDuration = this.minimumDuration;
        }
        if (this.maximumDuration) {
            this.placementdurModel.maximumDuration = this.maximumDuration;
        }
        this.placementdurModel.activeFlag = this.active;
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
        if (this.expiryDate) {
            this.placementdurModel.expiryDate = this.expiryDate;
        }
        if (this.listSeq) {
            this.placementdurModel.listSeq = this.listSeq;
        }
        const placementdurResult = this.oimpldurFactory.placementDurExecuteQuery(this.placementdurModel);
        placementdurResult.subscribe(data => {
            if (data.length === 0) {
                this.show('common.querycaused');
                this.placementType = undefined;
                this.durationType = undefined;
                this.minimumDuration = undefined;
                this.maximumDuration = undefined;
                this.active = undefined;
                this.expiryDate = undefined;
                this.listSeq = undefined;
                this.placementdurData = [];
                this.placementdurModel = new PlacementDurations();
                return;
            } else {
                this.placementdurData = data;
                data.forEach(element => {
                    element.activeFlag = element.activeFlag !== 'Y' ? false : true;
                });
                this.clearDisable = false;
                this.namesReadOnly = true;
                this.retriveDisable = true;
                this.tableIndex = 0;
            }
        });
    }
    oimpldurSaveplacementdurForm(event) {
        if (!this.oimpldurValidations()) {
            return;
        }
        this.placementdurInsertList = event.added;
        this.placementdurUpdatetList = event.updated;
        this.placementdurDeleteList = event.removed;
        this.placementDurCommitModel.insertList = [];
        this.placementDurCommitModel.updateList = [];
        this.placementDurCommitModel.deleteList = [];
        if (this.placementdurInsertList.length > 0) {
            for (let i = 0; i < this.placementdurInsertList.length; i++) {
                this.placementdurInsertList[i].activeFlag = this.placementdurInsertList[i].activeFlag ? 'Y' : 'N';
                this.placementDurCommitModel.insertList = this.placementdurInsertList;
            }
        }
        if (this.placementdurUpdatetList.length > 0) {
            for (let i = 0; i < this.placementdurUpdatetList.length; i++) {
                this.placementdurUpdatetList[i].activeFlag = this.placementdurUpdatetList[i].activeFlag ? 'Y' : 'N';
                this.placementDurCommitModel.updateList = this.placementdurUpdatetList;
            }
        }
        if (this.placementdurDeleteList.length > 0) {
            for (let i = 0; i < this.placementdurDeleteList.length; i++) {
                this.placementdurDeleteList[i].activeFlag = this.placementdurDeleteList[i].activeFlag ? 'Y' : 'N';
                this.placementDurCommitModel.deleteList = this.placementdurDeleteList;
            }
        }
        const placementdurSaveData = this.oimpldurFactory.placementDurCommit(this.placementDurCommitModel);
        placementdurSaveData.subscribe(data => {
            if (String(data.errorMessage).indexOf('PLACEMENT_DURATIONS_PK') > 0) {
                this.show('oimpldur.instrRecordValidation');
                this.placementDurExecuteQuery();
                return;
            }
            if (String(data.errorMessage).indexOf('OFF_CIPD_PLA_DUR_FK1') > 0) {
                this.show('oimpldur.cannotdeletemaster', 'warn');
                this.placementDurExecuteQuery();
                return false;
            }
            if (data && data.sealFlag === '1') {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.placementDurExecuteQuery();
                return;
            } else if (data && data.sealFlag === '0') {
                this.show('common.addupdateremoverecordfailed');
                this.placementDurExecuteQuery();
                return;
            }
        });
    }
    onGridInsert = () => {
        if (!this.oimpldurValidations()) {
            return false;
        }
        return {
            activeFlag: true
        };
        
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
    oimpldurValidations() {
        const is = { valid: true };
        this.placementdurData.forEach(data => {
            if (is.valid) {
                if (!data.placementType) {
                    this.show('oimpldur.placementTypeMustbeEntered');
                    is.valid = false;
                    return;
                }
            }
            if (!data.durationType) {
                this.show('oimpldur.durationTypeMustBeEntered');
                is.valid = false;
                return;
            }
            for (let x = 0; x < this.placementdurData.length; x++) {
                for (let y = 0; y < this.placementdurData.length; y++) {
                    if (x !== y) {
                        if ((this.placementdurData[x].placementType ===
                            this.placementdurData[y].placementType) &&
                            (this.placementdurData[x].durationType ===
                                this.placementdurData[y].durationType)) {
                            this.show('oimpldur.instrRecordValidation');
                            is.valid = false;
                            return;
                        }
                    }
                }
            }
            if (data.minimumDuration !== null && data.maximumDuration !== null) {
            if ((data.minimumDuration && data.maximumDuration) ||
                (Number(data.minimumDuration) === 0 && Number(data.maximumDuration) === 0)) {
                if ((Number(data.minimumDuration) > Number(data.maximumDuration)) ||
                    (Number(data.minimumDuration) === 0 && Number(data.maximumDuration) === 0) ||
                    Number(data.minimumDuration) === Number(data.maximumDuration)) {
                    this.type = 'warn';
                    this.show('oimpldur.maxMinDurValidation');
                    is.valid = false;
                    return;
                }
            }
            }
        });
        return is.valid;
    }
    isInsertable(date?) {
        if (this.placementType || this.durationType || this.minimumDuration || this.maximumDuration
            || this.listSeq || this.active || this.expiryDate || this.namesReadOnly) {
            this.clearDisable = false;
        } else {
            this.clearDisable = true;
        }
        if (date) {
            this.clearDisable = false;
        }
    }
    onStatusBlur() {
        if (!this.placementType) {
            this.placementType = this.placementType === '' ? undefined : '';
        }
    }
    onRelationshipBlur() {
        if (!this.durationType) {
            this.durationType = this.durationType === '' ? undefined : '';
        }
    }
    onGridClear = () => {
        this.placementDurExecuteQuery();
        return true;
    }
}
