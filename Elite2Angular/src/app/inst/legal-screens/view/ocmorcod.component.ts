import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OcmorcodService } from '@inst/legal-screens/service/ocmorcod.service';
import { OffenceResultCodes } from '@inst/legal-screens/beans/OffenceResultCodes';
import { OffenceResultCodesCommitBean } from '@inst/legal-screens/beans/OffenceResultCodesCommitBean';

@Component({
    selector: 'app-ocmorcod',
    templateUrl: './ocmorcod.component.html'
})

export class OcmorcodComponent implements OnInit {
    @ViewChild('grid') grid: any;
    msgs: any[] = [];
    rescodData: OffenceResultCodes[] = [];
    rescodModel: OffenceResultCodes = new OffenceResultCodes();
    rescodSearchModel: OffenceResultCodes = new OffenceResultCodes();
    rescodCommitModel: OffenceResultCodesCommitBean = new OffenceResultCodesCommitBean();
    rescodInsertList: OffenceResultCodes[] = [];
    rescodUpdatetList: OffenceResultCodes[] = [];
    rescodDeleteList: OffenceResultCodes[] = [];
    resCodColumnDef: any[];
    msglist: any[];
    message: any;
    type: any;
    enableGridInsert: boolean;
    retrievedisabled: boolean;
    clearDisabled: boolean;
    disableSearchFields: boolean;
    convictionFlag: boolean;
    activeFlag: boolean;
    tableIndex = -1;
    constructor(private ocmorcodFactory: OcmorcodService, public translateService:
        TranslateService, public sessionManager: UserSessionManager) {
        this.resCodColumnDef = [];
    }
    ngOnInit() {
        this.enableGridInsert = false;
        this.retrievedisabled = false;
        this.clearDisabled = true;
        this.disableSearchFields = false;
        this.resCodColumnDef = [
            {
                fieldName: this.translateService.translate('ocmorcod.resultCode') + '*', field: 'resultCode',
                editable: true, width: 150, datatype: 'text', uppercase: 'true', maxlength: 6
            },
            {
                fieldName: this.translateService.translate('common.description') + '*', field: 'description',
                editable: true, width: 150, datatype: 'text', uppercase: 'false', maxlength: 240
            },
            {
                fieldName: this.translateService.translate('ocmorcod.dispositionCode') + '*', field: 'dispositionCode',
                editable: true, width: 150, datatype: 'lov', domain: 'OFF_RESULT'
            },
            {
                fieldName: this.translateService.translate('ocmorcod.offensestatus') + '*', field: 'chargeStatus',
                editable: true, width: 150, datatype: 'lov', domain: 'CHARGE_STS'
            },
            {
                fieldName: this.translateService.translate('ocmorcod.sequence'), field: 'listSeq', editable: true, width: 150,
                maxValue: '999999', strictFP: true, whole: true, datatype: 'number'
            },
            {
                fieldName: this.translateService.translate('ocmorcod.conviction'), field: 'convictionFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
                editable: false, width: 150, datatype: 'date'
            },
        ];
        this.activeFlag = undefined;
        this.convictionFlag = undefined;
        this.rescodExecuteQuery();
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    cancel() {
        this.enableGridInsert = true;
        this.retrievedisabled = false;
        this.clearDisabled = true;
        this.disableSearchFields = false;
        this.rescodSearchModel = new OffenceResultCodes();
        this.rescodData = [];
        this.activeFlag = undefined;
        this.convictionFlag = undefined;
    }
    onGridClear = () => {
        this.rescodExecuteQuery();
        return true;
    }
    isInsertable(date?) {
        if (this.rescodSearchModel.resultCode || this.rescodSearchModel.description
            || this.rescodSearchModel.listSeq || this.rescodSearchModel.expiryDate
            || (this.rescodSearchModel.dispositionCode && this.rescodSearchModel.dispositionCode !== '') ||
            (this.rescodSearchModel.chargeStatus && this.rescodSearchModel.chargeStatus !== '') ||
            this.disableSearchFields) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
        if (date) {
            this.clearDisabled = false;
        }
    }
    onStatusBlur() {
        if (!this.rescodSearchModel.dispositionCode) {
            this.rescodSearchModel.dispositionCode = this.rescodSearchModel.dispositionCode === '' ? undefined : '';
        }
    }
    onRelationshipBlur() {
        if (!this.rescodSearchModel.chargeStatus) {
            this.rescodSearchModel.chargeStatus = this.rescodSearchModel.chargeStatus === '' ? undefined : '';
        }
    }
    rescodExecuteQuery(date?) {
        if (date) {
            if (date.lastValue === '0_/__/____') {
                this.type = 'warn';
                this.message = this.translateService.translate('common.leapyearnotallowed');
                this.show();
                this.clearDisabled = false;
                return;
            }
            if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.datemustbeentervalidformat');
                this.show();
                this.clearDisabled = false;
                return;
            }
        }
        if (this.activeFlag === true) {
            this.rescodSearchModel.activeFlag = 'Y';
        } else if (this.activeFlag === false) {
            this.rescodSearchModel.activeFlag = 'N';
        }
        if (this.convictionFlag === true) {
            this.rescodSearchModel.convictionFlag = 'Y';
        } else if (this.convictionFlag === false) {
            this.rescodSearchModel.convictionFlag = 'N';
        }
        const rescodResult = this.ocmorcodFactory.
            resCodExecuteQuery(this.rescodSearchModel);
        rescodResult.subscribe(rescodResultList => {
            if (rescodResultList.length === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycausedReEnter');
                this.show();
                this.rescodData = [];
                this.rescodSearchModel = new OffenceResultCodes();
                this.clearDisabled = true;
                return;
            } else {
                this.disableSearchFields = true;
                rescodResultList.forEach(element => {
                    element.convictionFlag = element.convictionFlag === 'Y' ? true : false;
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
                this.rescodData = rescodResultList;
                this.enableGridInsert = true;
                this.retrievedisabled = true;
                this.clearDisabled = false;
                this.tableIndex = 0;
            }
        });
    }
    /**
     *  This function will be executed when commit event is fired
    */
    ocmorcodSaverescodForm(event) {
        if (!this.ocmorcodValidations()) {
            return;
        }
        this.rescodInsertList = event.added;
        this.rescodUpdatetList = event.updated;
        this.rescodDeleteList = event.removed;
        this.rescodCommitModel.insertList = [];
        this.rescodCommitModel.updateList = [];
        this.rescodCommitModel.deleteList = [];
        if (this.rescodInsertList.length > 0 || this.rescodUpdatetList.length > 0) {
            for (let i = 0; i < this.rescodInsertList.length; i++) {
                this.rescodInsertList[i].convictionFlag = this.rescodInsertList[i].convictionFlag ? 'Y' : 'N';
                this.rescodInsertList[i].activeFlag = this.rescodInsertList[i].activeFlag ? 'Y' : 'N';
                this.rescodCommitModel.insertList = this.rescodInsertList;
            }
            for (let i = 0; i < this.rescodUpdatetList.length; i++) {
                this.rescodUpdatetList[i].convictionFlag = this.rescodUpdatetList[i].convictionFlag ? 'Y' : 'N';
                this.rescodUpdatetList[i].activeFlag = this.rescodUpdatetList[i].activeFlag ? 'Y' : 'N';
                this.rescodCommitModel.updateList = this.rescodUpdatetList;
            }
        }
        const rescodSaveData = this.ocmorcodFactory.resCodCommit(this.rescodCommitModel);
        rescodSaveData.subscribe(data => {
            if (String(data[0].errorMessage).indexOf('OFFENCE_RESULT_CODES_PK') > 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocmorcod.resultCodeAlreadyExists');
                this.show();
            } else if (data[0] && data[0].sealFlag === 'success') {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                setTimeout(ele => {
                    this.rescodData = [];
                    this.rescodSearchModel = new OffenceResultCodes();
                    this.rescodExecuteQuery();
                }, 5);
                return;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    ocmorcodValidations() {
        const is = { valid: true };
        this.rescodData.forEach(data => {
            if (is.valid) {
                if (!data.resultCode || !data.resultCode.trim()) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocmorcod.resultCodeMustBeEntered');
                    this.show();
                    is.valid = false;
                    return;
                }
                if (!data.description || !data.description.trim()) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.descriptionmustbeentered');
                    this.show();
                    is.valid = false;
                    return;
                }
                if (!data.dispositionCode) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocmorcod.dispositionMustBeEntered');
                    this.show();
                    is.valid = false;
                    return;
                }
                if (!data.chargeStatus) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocmorcod.offenseStatusMustBeEntered');
                    this.show();
                    is.valid = false;
                    return;
                }
            }
        });
        return is.valid;
    }
    onGridInsert = () => {
        for (let i = 0; i < this.rescodData.length; i++) {
            if (!this.rescodData[i].resultCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocmorcod.resultCodeMustBeEntered');
                this.show();
                return;
            }
            if (!this.rescodData[i].description) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.descriptionmustbeentered');
                this.show();
                return;
            }
            if (!this.rescodData[i].dispositionCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocmorcod.dispositionMustBeEntered');
                this.show();
                return;
            }
            if (!this.rescodData[i].chargeStatus) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocmorcod.offenseStatusMustBeEntered');
                this.show();
                return;
            }
        }
        return { activeFlag: true};
    }
    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag' || event.field === 'convictionFlag') {
            if (event.data.activeFlag) {
                this.grid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.grid.setColumnData('expiryDate', rowIndex,
                    DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'resultCode') {
            for (let i = 0; i < this.rescodData.length; i++) {
                for (let j = 0; j < this.rescodData.length; j++) {
                    if (i !== j && this.rescodData[i].resultCode === this.rescodData[j].resultCode) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocmorcod.resultCodeAlreadyExists');
                        this.show();
                        return;
                    }
                }
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
}
