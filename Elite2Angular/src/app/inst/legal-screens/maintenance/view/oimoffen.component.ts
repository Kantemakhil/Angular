import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OimoffenService } from '../service/oimoffen.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Offences } from '@inst/legal-screens/maintenance/beans/Offences';
import { Statutes } from '@inst/legal-screens/beans/Statutes';
import { OffenceIndicators } from '@inst/legal-screens/maintenance/beans/OffenceIndicators';
import { AllowableOffenceTypes } from '@inst/legal-screens/maintenance/beans/AllowableOffenceTypes';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OffenceIndicatorCommitBean } from '@inst/legal-screens/maintenance/beans/OffenceIndicatorCommitBean';
import { AllowableOffenceTypesCommitBean } from '@inst/legal-screens/maintenance/beans/AllowableOffenceTypesCommitBean';
import { OffencesCommitBean } from '@inst/legal-screens/maintenance/beans/OffencesCommitBean';

@Component({
    selector: 'app-oimoffen',
    templateUrl: './oimoffen.component.html'
})

export class OimoffenComponent implements OnInit {
    actionName: string;
    @ViewChild('grid') grid: any;
    @ViewChild('offindgrid') offindgrid: any;
    @ViewChild('ofngrid') ofngrid: any;
    msgs: any[] = [];
    statData: Statutes[] = [];
    statDataTemp: Statutes[] = [];
    statModel: Statutes = new Statutes();
    statIndex: number;
    statInsertList: Statutes[] = [];
    statUpdatetList: Statutes[] = [];
    statDeleteList: Statutes[] = [];
    ofnData: Offences[] = [];
    ofnDataTemp: Offences[] = [];
    ofnModel: Offences = new Offences();
    ofnIndex: number;
    ofnInsertList: Offences[] = [];
    ofnUpdatetList: Offences[] = [];
    ofnDeleteList: Offences[] = [];
    alwotData: AllowableOffenceTypes[] = [];
    alwotDataTemp: AllowableOffenceTypes[] = [];
    alwotModel: AllowableOffenceTypes = new AllowableOffenceTypes();
    alwotIndex: number;
    alwotInsertList: AllowableOffenceTypes[] = [];
    alwotUpdatetList: AllowableOffenceTypes[] = [];
    alwotDeleteList: AllowableOffenceTypes[] = [];
    offindData: OffenceIndicators[] = [];
    offindDataTemp: OffenceIndicators[] = [];
    offindModel: OffenceIndicators = new OffenceIndicators();
    offindIndex: number;
    offindInsertList: OffenceIndicators[] = [];
    offindUpdatetList: OffenceIndicators[] = [];
    offindDeleteList: OffenceIndicators[] = [];
    display: boolean;
    errorMessage: string;
    disabled: boolean;
    editable: boolean;
    ofnColumnDef: any[];
    offIndColumnDef: any[];
    alwotColumnDef: any[];
    ofnReadOnly: boolean;
    alwOtReadOnly: boolean;
    offIndReadOnly: boolean;
    ofnhooffsubclRg: any[] = [];
    statstatutescodeRg: any[] = [];
    rghocodeRg: any[] = [];
    offindCommitModel: OffenceIndicatorCommitBean = new OffenceIndicatorCommitBean();
    alwotCommitModel: AllowableOffenceTypesCommitBean = new AllowableOffenceTypesCommitBean();
    ofnCommitModel: OffencesCommitBean = new OffencesCommitBean;
    legislatingBodyCodelink: any;
    legislatingBodyCodeTitles = { 'code': this.trMsg('oimoffen.statuteid'), 'description': this.trMsg('common.description') };
    retriveDisabled: boolean;
    clearDisabled: boolean;
    statutecoderead: boolean;
    allowableoffenceinsert: boolean;
    offenceinsert: boolean;
    indicatorinsert: boolean;
    legislatingReadonly: boolean;
    tableIndex = -1;
    enableDelete: boolean;
    index: any;
    nextReadOnly: boolean;
    previousReadOnly: boolean;
    description: any;
    offenceCode: any;
    severitytitles = { 'code': this.trMsg('oimoffen.severity'), 'description': this.trMsg('common.description') };
    categorytitles = { 'code': this.trMsg('oimoffen.class'), 'description': this.trMsg('common.description') };
    indicatorCodetitles = { 'code': this.trMsg('oimoffen.indicatorcode'), 'description': this.trMsg('common.description') };
    offenceTypetitles = { 'code': this.trMsg('oimoffen.offencetype'), 'description': this.trMsg('common.description') };
    enableDeleteOne: boolean;
    enableDeleteTwo: boolean;
    deleteValidone: boolean;
    deleteValidTwo: boolean;
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    statutesData: Statutes[] = [];
    statofnColumnDef: any[];
    statTableIndex: number;
    offenceIndex = -1;
    deleteList: any;
    constructor(private oimoffenFactory: OimoffenService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.ofnColumnDef = [];
        this.offIndColumnDef = [];
        this.alwotColumnDef = [];
        this.statofnColumnDef = [];
    }
    ngOnInit() {
        this.previousReadOnly = true;
        this.nextReadOnly = true;
        this.legislatingReadonly = true;
        this.offenceinsert = false;
        this.allowableoffenceinsert = false;
        this.indicatorinsert = false;
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.enableDelete = false;
        this.enableDeleteOne = false;
        this.enableDeleteTwo = false;
        this.deleteValidone = false;
        this.deleteValidTwo = false;
        this.ofnColumnDef = [
            {
                fieldName: this.translateService.translate('common.code') + '*', field: 'offenceCode', editable: true, width: 150,
                cellEditable: this.canCellEdit, datatype: 'text', maxlength: '25'
            },
            {
                fieldName: this.translateService.translate('oimoffen.longdescription') + '*', field: 'description',
                editable: true, width: 150, datatype: 'text', maxlength: '1000', uppercase: 'false'
            },
            {
                fieldName: this.translateService.translate('common.category'), field: 'hoCode', editable: true, width: 150,
                datatype: 'lov', link: 'oimoffen/rgHoCodeRecordGroup', titles: this.categorytitles,source:'OUMHOCOD'
            },
            {
                fieldName: this.translateService.translate('oimoffen.severity'), field: 'severityRanking', editable: true, width: 150,
                datatype: 'lov', domain: 'SEVERE_RANK', titles: this.severitytitles
            },
            {
                fieldName: this.translateService.translate('common.sequencename'), field: 'listSeq', editable: true, width: 150,
                datatype: 'number', minValue: '-999', maxValue: '999', strictFP: true, whole: true,
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true,
                width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
                editable: false, width: 150, datatype: 'date'
            },
        ];
        this.alwotColumnDef = [
            {
                fieldName: this.translateService.translate('oimoffen.offencetype'), field: 'offenceType', editable: true, width: 150,
                datatype: 'lov', domain: 'OFFENCE_TYPE', titles: this.offenceTypetitles
            },
            {
                fieldName: this.translateService.translate('oimoffen.bail'), field: 'bailAllowedFlag', editable: true, width: 150,
                datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('oimoffen.bailschedule'), field: 'recommendedBailAmount',
                editable: true, width: 150, datatype: 'number', format: '1.2-2', maxValue: '99999999.90',
                strictFP: true, whole: true, cellEditable: this.canAlertEdit
            },
        ];
        this.offIndColumnDef = [
            {
                fieldName: this.translateService.translate('oimoffen.indicatorcode'), field: 'indicatorCode', editable: true, width: 100,
                datatype: 'lov', domain: 'OFFENCE_IND', titles: this.indicatorCodetitles
            },
        ];
        this.statofnColumnDef = [
            {
                fieldName: this.translateService.translate('oimoffen.statuteid'), field: 'statuteCode', editable: false, width: 100,
                datatype: 'lov', link:'oimoffen/statStatutesCodeRecordGroup', titles: this.legislatingBodyCodeTitles, source:"OIMSTATU"
            },
            {
                fieldName: this.translateService.translate('oimoffen.legislatingid'), field: 'sealFlag', editable: false, width: 100,
                datatype: 'text'
            }
        ];
        this.retriveBtn();
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
    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (data.bailAllowedFlag) {
            return true;
        } else {
            return false;
        }
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }
    onRowClickstat(event){
        if(event){
            this.statModel = event;
            this.oimoffenExecuteQuery();
        }
    }
    onRowClickofn(event) {
        if (event) {
            this.ofnModel = event;
            this.alwotModel = new AllowableOffenceTypes();
            this.offindModel = new OffenceIndicators();
            if (this.ofnModel.offenceCode) {
                this.alwotExecuteQuery();
                this.offindExecuteQuery();
                this.deleteValidation();
            } else {
            }
            if (this.ofnModel.createDatetime) {
                this.enableDelete = true;
                this.allowableoffenceinsert = true;
                this.indicatorinsert = true;
            } else {
                this.enableDelete = false;
                this.allowableoffenceinsert = false;
                this.indicatorinsert = false;
                this.alwotModel = new AllowableOffenceTypes();
                this.offindModel = new OffenceIndicators();
                this.alwotData = [];
                this.offindData = [];
            }
        } else {
            this.alwotData = [];
            this.offindData = [];
            this.enableDelete = false;
            this.alwotModel = new AllowableOffenceTypes();
            this.offindModel = new OffenceIndicators();
            this.allowableoffenceinsert = false;
            this.indicatorinsert = false;
            this.deleteValidone = false;
            this.deleteValidTwo = false;
        }
    }
    deleteValidation() {
        const serviceObj = this.oimoffenFactory.oimoffenStatOncheckdeletemasterOffences(this.ofnModel);
        serviceObj.subscribe(data => {
            if (data && data.maxSentenceLength > 0) {
                this.deleteValidone = true;
            } else {
                this.deleteValidone = false;
            }
            if (data && data.listSeq > 0) {
                this.deleteValidTwo = true;
            } else {
                this.deleteValidTwo = false;
            }
        });
    }
    alwotRowClick(event) {
        if (event) {
            this.alwotModel = event;
            if (this.alwotModel.createDatetime) {
                this.enableDeleteOne = true;
            } else {
                this.enableDeleteOne = false;
            }
        } else {
            this.enableDeleteOne = false;
        }
    }
    offindRowClick(event) {
        if (event) {
            this.offindModel = event;
            if (this.offindModel.createDatetime) {
                this.enableDeleteTwo = true;
            } else {
                this.enableDeleteTwo = false;
            }
        } else {
            this.enableDeleteTwo = false;
        }
    }
    previousRecord() {
        this.index--;
        if (this.index >= 0) {
            this.ofnModel = new Offences();
            this.ofnModel.statuteCode = this.statData[this.index].statuteCode;
            this.statModel = this.statData[this.index];
            this.oimoffenExecuteQuery();
            this.nextReadOnly = false;
            if (!this.ofnModel.offenceCode) {
                this.alwotData = [];
                this.alwotModel = new AllowableOffenceTypes();
                this.offindData = [];
                this.offindModel = new OffenceIndicators();
            }
        } else {
            this.index = 0;
            this.previousReadOnly = true;
            this.show('common.atfirstrecord');
            return;
        }
    }
    nextRecord() {
        this.index++;
        if (this.index < this.statData.length) {
            this.ofnModel = new Offences();
            this.ofnModel.statuteCode = this.statData[this.index].statuteCode;
            this.statModel = this.statData[this.index];
            this.oimoffenExecuteQuery();
            this.previousReadOnly = false;
            if (!this.ofnModel.offenceCode) {
                this.alwotData = [];
                this.alwotModel = new AllowableOffenceTypes();
                this.offindData = [];
                this.offindModel = new OffenceIndicators();
            }
        } else {
            this.index = this.statData.length - 1;
            this.nextReadOnly = true;
            this.show('common.lastrecordofquery');
            return;
        }
    }
    isInsertable() {
        if (this.ofnModel.offenceCode || this.ofnModel.description) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
    }
    retriveBtn() {
        this.offenexecuteQuery();
        this.statutecoderead = true;
    }
    onGridInsert = () => {
        if (!this.Oimoffencevalidations()) {
            return false;
        }
        return { activeFlag: true };
    }
    onGridInsertOne = () => {
        if (!this.alwotValidations()) {
            return false;
        }
        return {};
    }
    onGridInserttwo = () => {
        if (!this.offindValidations()) {
            return false;
        } else {
            return {};
        }
    }
    onGridClear = () => {
        this.oimoffenExecuteQuery();
        return true;
    }
    onGridClearOne = () => {
        this.alwotExecuteQuery();
        return true;
    }
    onGridDelete = (row) => {
        if (this.alwotData.length > 0) {
            this.show('oimoffen.cannotdeletemasterrecordexistallowableoffences');
            return false;
        }
        if (this.offindData.length > 0) {
            this.show('oimoffen.cannotdeletemasterrecordexistinindicators');
            return false;
        }
        if (this.deleteValidone) {
            this.show('oimoffen.matchingdetailrecordsexistinoffenderlegalcharges');
            return false;
        }
        if (this.deleteValidTwo) {
            this.show('oimoffen.cannotdeletemastermatchingdetailrecordsexist');
            return false;
        }
        this.oimoffenFactory.isChgDependOnOffences(row[0].offenceId).subscribe(data => {
            if(!data){
                this.ofngrid.gridOptions.api.applyTransaction({ remove: row });
                const index = this.ofnData.indexOf(row[0]);
                this.ofnData.splice(index, 1);
                this.deleteList.push(row[0]);
                this.ofngrid.btnClearbtnDisable = false;
                this.ofngrid.btnSavebtnDisable = false;
                if(this.ofnData.length == 0){
                    this.ofngrid.btnDeletedDisabled = true;
                }
            } else {
                this.show('oimoffen.cannotdeletelinkedwithcharges');
                if (this.deleteList.length > 0) {
                    this.ofngrid.btnClearbtnDisable = false;
                    this.ofngrid.btnSavebtnDisable = false;
                }
                return false;
            }
        });
        return false;
    }
    cancel() {
        this.ofnData = [];
        this.ofnModel = new Offences();
        this.alwotData = [];
        this.alwotModel = new AllowableOffenceTypes();
        this.offindData = [];
        this.offindModel = new OffenceIndicators();
        this.statData = [];
        this.statModel = new Statutes();
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.statutecoderead = false;
        this.offenceinsert = false;
        this.allowableoffenceinsert = false;
        this.indicatorinsert = false;
        this.previousReadOnly = true;
        this.nextReadOnly = true;
        this.deleteValidone = false;
        this.deleteValidTwo = false;
    }
    validateRowDataOne = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;
        if (event.field === 'bailAllowedFlag') {
            if (!event.data.bailAllowedFlag && event.data.recommendedBailAmount) {
                this.grid.setColumnData('recommendedBailAmount', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    validateRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.ofngrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.ofngrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    offenexecuteQuery() {
        if (this.statModel.statuteCode) {
            this.previousReadOnly = true;
            this.nextReadOnly = true;
        } else {
            this.previousReadOnly = true;
            this.nextReadOnly = false;
            this.statModel.statuteCode = undefined;
        }
        const serviceObj = this.oimoffenFactory.statExecuteQuery(this.statModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.show('common.querycaused');
                this.statData = [];
                this.statutesData = [];
                this.offenceinsert = false;
            } else {
                this.statutesData = data;
                this.statData = data;
                this.statModel = this.statData[0];
                this.index = 0;
                this.offenceinsert = true;
                this.statTableIndex = 0;
                /* if (this.statModel.statuteCode) {
                    this.oimoffenExecuteQuery();
                } else {
                } */
            }
        });
    }
    onStatusBlur() {
        if (!this.statModel.statuteCode) {
          this.statModel.statuteCode = this.statModel.statuteCode === '' ? undefined : '';
        }
      }
    canCellEdit = (data: any, index: number, field: string) => {
        if (data.createDatetime) {
            return false;
        }
        return true;
    }
    Oimoffencevalidations() {
        const is = { valid: true };
        this.ofnData.forEach(data => {
            if (is.valid) {
                if (!data.offenceCode || !data.offenceCode.trim()) {
                    this.show('common.codemustbeentered');
                    is.valid = false;
                    return;
                }
                if (!data.description || !data.description.trim()) {
                    this.show('oimoffen.longdescriptionmustbeentered');
                    is.valid = false;
                    return;
                }
            }
        });
        for (let i = 0; i < this.ofnData.length; i++) {
            for (let j = 0; j < this.ofnData.length; j++) {
                if (i !== j && this.ofnData[i].offenceCode === this.ofnData[j].offenceCode && this.ofnData[i].description === this.ofnData[j].description) {
                    this.show('oimoffen.rowexistswithsameoffencecode');
                    is.valid = false;
                    return is.valid;
                }
            }
        }
        return is.valid;
    }
    /**
     *  This function will be executed when commit event is fired
    */
    oimoffenSaveofnForm(event) {
        if (!this.Oimoffencevalidations()) {
            return;
        }
        this.ofnInsertList = event.added;
        this.ofnUpdatetList = event.updated;
        this.ofnDeleteList = this.deleteList;
        this.ofnCommitModel.insertList = [];
        this.ofnCommitModel.updateList = [];
        this.ofnCommitModel.deleteList = [];
        if (this.ofnInsertList.length > 0) {
            for (let i = 0; i < this.ofnInsertList.length; i++) {
                this.ofnInsertList[i].statuteCode = this.statModel.statuteCode;
                this.ofnInsertList[i].offenceId = this.ofnModel.offenceId;
                this.ofnInsertList[i].hoCode = this.ofnModel.hoCode;
                this.ofnInsertList[i].updateAllowedFlag = this.ofnInsertList[i].updateAllowedFlag ? 'Y' : 'N';
                this.ofnInsertList[i].createDate = DateFormat.getDate();
                this.ofnInsertList[i].createDatetime = DateFormat.getDate();
                this.ofnInsertList[i].createUserId = this.sessionManager.getId();
                this.ofnInsertList[i].activeFlag = this.ofnInsertList[i].activeFlag ? 'Y' : 'N';
                this.ofnCommitModel.insertList = this.ofnInsertList;
            }
        }
        if (this.ofnUpdatetList.length > 0) {
            for (let i = 0; i < this.ofnUpdatetList.length; i++) {
                this.ofnUpdatetList[i].statuteCode = this.statModel.statuteCode;
                this.ofnUpdatetList[i].updateAllowedFlag = this.ofnModel.updateAllowedFlag ? 'Y' : 'N';
                this.ofnUpdatetList[i].activeFlag = this.ofnUpdatetList[i].activeFlag ? 'Y' : 'N';
            }
            this.ofnCommitModel.updateList = this.ofnUpdatetList;
        }
        if (this.ofnDeleteList.length > 0) {
            for (let i = 0; i < this.ofnDeleteList.length; i++) {
                this.ofnDeleteList[i].statuteCode = this.statModel.statuteCode;
               // this.ofnDeleteList[i].offenceCode = this.ofnModel.offenceCode;
                this.ofnDeleteList[i].hoCode = this.ofnModel.hoCode;
                this.ofnDeleteList[i].updateAllowedFlag = this.ofnDeleteList[i].updateAllowedFlag ? 'Y' : 'N';
                this.ofnDeleteList[i].activeFlag = this.ofnDeleteList[i].activeFlag ? 'Y' : 'N';
            }
            this.ofnCommitModel.deleteList = this.ofnDeleteList;
        }
        const ofnSaveData = this.oimoffenFactory.ofnCommit(this.ofnCommitModel);
        ofnSaveData.subscribe(data => {
            if (data && data.sealFlag === '1') {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.oimoffenExecuteQuery();
                return;
            } else if (data && data.sealFlag === '0') {
                this.show('common.addupdateremoverecordfailed');
                this.oimoffenExecuteQuery();
                return;
            } else if (data && data.sealFlag && data.listSeq === 2292) {
                this.message = this.translateService.translate('common.recordcannotbedeleted');
                this.message = String(this.message).replace('%tablename%', data.sealFlag);
                this.show(this.message, 'warn');
                this.oimoffenExecuteQuery();
                return;
            } else if (data && data.sealFlag && data.listSeq === 2291) {
                this.message = this.translateService.translate('common.recordcannotbedeletedparent');
                this.message = String(this.message).replace('%tablename%', data.sealFlag);
                this.show(this.message, 'warn');
                this.oimoffenExecuteQuery();
                return;
            }
        });
    }
    oimoffenExecuteQuery() {
        this.deleteList = [];
        if (this.offenceCode) {
            this.ofnModel.offenceCode = this.offenceCode;
        }
        if (this.description) {
            this.ofnModel.description = this.description;
        }
        this.ofnModel.statuteCode = this.statModel.statuteCode;
        const serviceObj = this.oimoffenFactory.ofnExecuteQuery(this.ofnModel);
        serviceObj.subscribe(ofnResultList => {
            if (ofnResultList.length === 0) {
                this.ofnData = [];
                this.clearDisabled = false;
            } else {
                ofnResultList.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
                this.ofnData = ofnResultList;
                this.ofnModel = ofnResultList[0];
                this.retriveDisabled = true;
                this.offenceIndex = 0;
            }
        });
    }
    alwotValidations(event?) {
        const is = { valid: true };
        this.alwotData.forEach(ele => {
            if (!ele.offenceType) {
                is.valid = false;
                return;
            }
        });
        for (let i = 0; i < this.alwotData.length; i++) {
            for (let j = 0; j < this.alwotData.length; j++) {
                if (i !== j && (this.alwotData[i].offenceType === this.alwotData[j].offenceType)) {
                    this.show('oimoffen.rowexistsalreadywiththesameoffencecodeandoffencetype');
                    is.valid = false;
                    return;
                }
            }
        }
        return is.valid;
    }
    offindValidations() {
        const is = { valid: true };
        this.offindData.forEach(element => {
            if (!element.indicatorCode) {
                is.valid = false;
                return;
            }
        });
        for (let i = 0; i < this.offindData.length; i++) {
            for (let j = 0; j < this.offindData.length; j++) {
                if (i !== j && this.offindData[i].indicatorCode === this.offindData[j].indicatorCode) {
                    this.show('oimoffen.rowexistsalreadywiththesameoffencecodeandindicatorcode');
                    is.valid = false;
                    return;
                }
            }
        }
        return is.valid;
    }
    alwotExecuteQuery() {
        this.alwotModel = new AllowableOffenceTypes();
        this.alwotModel.offenceCode = this.ofnModel.offenceCode;
        this.alwotModel.statuteCode = this.ofnModel.statuteCode;
        this.alwotModel.offenceId = this.ofnModel.offenceId;
        const alwotResult = this.oimoffenFactory.alwOtExecuteQuery(this.alwotModel);
        alwotResult.subscribe(alwotResultList => {
            if (alwotResultList.length === 0) {
                this.alwotData = [];
                this.clearDisabled = false;
            } else {
                alwotResultList.forEach(element => {
                    element.bailAllowedFlag = element.bailAllowedFlag === 'Y' ? true : false;
                });
                this.clearDisabled = false;
                this.alwotData = alwotResultList;
                this.alwotModel = alwotResultList[0];
                this.tableIndex = 0;
            }
        });
    }
    /**
     *  This function will be executed when commit event is fired
    */
    oimoffenSavealwotForm(event) {
        if (!this.alwotValidations()) {
            return;
        }
        this.alwotInsertList = event.added;
        this.alwotUpdatetList = event.updated;
        this.alwotDeleteList = event.removed;
        this.alwotCommitModel.insertList = [];
        this.alwotCommitModel.updateList = [];
        this.alwotCommitModel.deleteList = [];
        if (this.alwotInsertList.length > 0) {
            for (let i = 0; i < this.alwotInsertList.length; i++) {
                this.alwotInsertList[i].offenceCode = this.ofnModel.offenceCode;
                this.alwotInsertList[i].offenceId = this.ofnModel.offenceId;
                this.alwotInsertList[i].statuteCode = this.statModel.statuteCode;
                this.alwotInsertList[i].bailAllowedFlag = this.alwotInsertList[i].bailAllowedFlag ? 'Y' : 'N';
                this.alwotInsertList[i].createDatetime = DateFormat.getDate();
                this.alwotInsertList[i].createUserId = this.sessionManager.getId();
            }
            this.alwotCommitModel.insertList = this.alwotInsertList;
        }
        if (this.alwotUpdatetList.length > 0) {
            for (let i = 0; i < this.alwotUpdatetList.length; i++) {
                this.alwotUpdatetList[i].bailAllowedFlag = this.alwotUpdatetList[i].bailAllowedFlag ? 'Y' : 'N';
            }
            this.alwotCommitModel.updateList = this.alwotUpdatetList;
        }
        if (this.alwotDeleteList.length > 0) {
            for (let i = 0; i < this.alwotDeleteList.length; i++) {
                this.alwotDeleteList[i].offenceId = this.ofnModel.offenceId;
            }
            this.alwotCommitModel.deleteList = this.alwotDeleteList;
        }
        const alwotSaveData = this.oimoffenFactory.alwOtCommit(this.alwotCommitModel);
        alwotSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.alwotExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed');
                this.alwotExecuteQuery();
                return;
            }
        });
    }
    offindExecuteQuery() {
        this.offindModel = new OffenceIndicators();
        this.offindModel.offenceCode = this.ofnModel.offenceCode;
        this.offindModel.statuteCode = this.ofnModel.statuteCode;
        this.offindModel.offenceId = this.ofnModel.offenceId;
        const offindResult = this.oimoffenFactory.offIndExecuteQuery(this.offindModel);
        offindResult.subscribe(offindResultList => {
            if (offindResultList.length === 0) {
                this.offindData = [];
                this.clearDisabled = false;
            } else {
                this.offindData = offindResultList;
                this.offindModel = offindResultList[0];
                this.tableIndex = 0;
                this.clearDisabled = false;
            }
        });
    }
    /**
     *  This function will be executed when commit event is fired
    */
    oimoffenSaveoffindForm(event) {
        if (!this.offindValidations()) {
            return;
        }
        this.offindInsertList = event.added;
        this.offindUpdatetList = event.updated;
        this.offindDeleteList = event.removed;
        this.offindCommitModel.insertList = [];
        this.offindCommitModel.updateList = [];
        this.offindCommitModel.deleteList = [];
        if (this.offindInsertList.length > 0) {
            for (let i = 0; i < this.offindInsertList.length; i++) {
                this.offindInsertList[i].offenceId = this.ofnModel.offenceId;
                this.offindInsertList[i].offenceCode = this.ofnModel.offenceCode;
                this.offindInsertList[i].statuteCode = this.statModel.statuteCode;
                const offenceIndicatorId = this.offindModel.offenceIndicatorId;
                this.offindInsertList[i].offenceIndicatorId = offenceIndicatorId;
                this.offindInsertList[i].createDatetime = DateFormat.getDate();
                this.offindInsertList[i].createUserId = this.sessionManager.getId();
            }
            this.offindCommitModel.insertList = this.offindInsertList;
        }
        if (this.offindUpdatetList.length > 0) {
            for (let i = 0; i < this.offindUpdatetList.length; i++) {
                this.offindUpdatetList[i].indicatorCode = this.offindModel.indicatorCode;
            }
            this.offindCommitModel.updateList = this.offindUpdatetList;
        }
        if (this.offindDeleteList.length > 0) {
            for (let i = 0; i < this.offindDeleteList.length; i++) {
                this.offindDeleteList[i].indicatorCode = this.offindModel.indicatorCode;
            }
            this.offindCommitModel.deleteList = this.offindDeleteList;
        }
        const offindSaveData = this.oimoffenFactory.offIndCommit(this.offindCommitModel);
        offindSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.offindExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed');
                this.offindExecuteQuery();
                return;
            }
        });
    }
}
