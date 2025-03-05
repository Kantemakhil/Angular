import {
    Component,
    OnInit,
    Output, EventEmitter
} from '@angular/core';
import { ViewChild } from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
import { OcucondiService } from '../service/ocucondi.service';
import { Condition } from '../beans/Condition';
import { BondType } from '../beans/BondType';
import { ConditionCommitBean } from '../beans/ConditionCommitBean';
import { ConditionTypes } from '../beans/ConditionTypes';
import { CommonLov } from '../beans/CommonLov';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { Router } from '@angular/router';
import { RedirectUtil } from '@core/classes/redirectUtil';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OffenderSentConditionsCommitBean } from '@inst/legal/beans/OffenderSentConditionsCommitBean';
import { OffenderSentConditions } from '@inst/legal/beans/OffenderSentConditions';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { AppConstants } from '@core/classes/appConstants';
@Component({
    selector: 'app-ocucondi',
    templateUrl: './ocucondi.component.html'
})

export class OcucondiComponent implements OnInit {
    defaultFlag = false;
    delFlag = false;
    @ViewChild('grid', { static: false }) grid: any;
    @ViewChild('typegrid', { static: false }) typegrid: any;
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    msgs: any[] = [];
    conditionTypeColumndef: any[];
    conDelBtn = false;
    getTypeGridParam: Condition = new Condition();
    typeGridData: Condition[] = [];
    typeGridValue: Condition[] = [];
    categoryTypeLov: BondType[] = [];
    conditionLov: BondType[] = [];
    prefetchConditionLov: CommonLov[] = [];
    urlCondition = '';
    conditionColumndef: any[];
    selectedCondition = '';
    selectedCatogry = '';
    insertedRecord: Condition[] = [];
    updatedRecord: Condition[] = [];
    deleteRecord: Condition[] = [];
    conditionCommitBean: ConditionCommitBean = new ConditionCommitBean();
    gridFormData: Condition = new Condition();
    getConditionTypes: ConditionTypes[] = [];
    selected = -1;
    orderTypeDesc: string;
    initialOrderType: string;
    getCondition: string;
    conditionAatFlag = false;
    disabled = false;
    sentConditionId: number;
    isProgram: boolean;
    isProhibited: boolean;
    isCurfew: boolean;
    isAmount: boolean;
    isAssociate: boolean;
    isAddress: boolean;
    selectedMethod: string = null;
    startDate: any;
    endDate: any;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    offcondIndex: number;
    offcondModel: OffenderSentConditions = new OffenderSentConditions();
    offcondBean: OffenderSentConditions = new OffenderSentConditions();
    offconditionBean: OffenderSentConditions = new OffenderSentConditions();
    offcondCommitModel: OffenderSentConditionsCommitBean = new OffenderSentConditionsCommitBean();
    typeInsertList: OffenderSentConditions[] = [];
    offSentinsertRecord: OffenderSentConditions[] = [];
    offSentupdatedRecord: OffenderSentConditions[] = [];
    offSentdeleteRecord: OffenderSentConditions[] = [];
    offTypedeleteRecord: OffenderSentConditions[] = [];
    offcondData: OffenderSentConditions[] = [];
    conditionGridData: OffenderSentConditions[] = [];
    conditionGridDataTemp: OffenderSentConditions[] = [];
    offSentConRowData: OffenderSentConditions[] = [];
    programIdMap: Map<string, number> = new Map<string, number>();
    @Output() addRecord: EventEmitter<any> = new EventEmitter<any>();
    constructor(public translateService: TranslateService,
        public sessionManager: UserSessionManager,
        private service: OcucondiService,
        private dialogService: DialogService,
        private redirectUtil: RedirectUtil,
        private router: Router) { }

    ngOnInit() {
        this.offcondModel = new OffenderSentConditions();
        if (this.router.url === '/OCDCCASE') {
            this.offcondModel.offenderBookId = this.dialog.data.offenderBookId;
            this.offcondModel.sentenceSeq = this.dialog.data.line;
            this.offcondModel.commConditionType = this.dialog.data.category;
            this.dialog.data.objectId = undefined;
            // this.dialog.data.category = undefined;
            // this.dialog.data.condition = this.dialog.data.category;
            const getcond = this.service.
            populateConditionType();
            getcond.subscribe(conddata => {
            if (conddata.length === 0) {
            } else {
                conddata.forEach(ele => {
                    if (ele.code === this.dialog.data.category) {
                        this.dialog.data.condition = ele.description;
                    }
                    this.programIdMap.set(ele.code, ele.id);
                });
            }
        });
        } else if (this.router.url === '/OIDRPLAN') {
            this.offcondModel.offenderBookId = this.dialog.data.offenderBookId;
            this.offcondModel.objectId = this.dialog.data.releasePlanId;
            this.offcondModel.objectType = 'RELEASE';
            this.dialog.data.category = 'RELEASE';
            this.dialog.data.condition = 'Release';
            this.dialog.data.objectId = this.dialog.data.releasePlanId;
        } else if (this.router.url === '/OIDPHDET') {
            this.offcondModel.offenderBookId = this.dialog.data.offenderBookId;
            this.offcondModel.objectId = this.dialog.data.hearingDetailId;
            this.offcondModel.objectType = 'PAROLE';
            this.dialog.data.category = 'PAROLE';
            this.dialog.data.condition = 'Parole';
            this.dialog.data.objectId = this.dialog.data.hearingDetailId;
        }
        this.getProgramId();
        this.getConditionTypeGrid();
        this.getConditionTypes = [];
        this.insertedRecord = [];
        this.updatedRecord = [];
        this.deleteRecord = [];
        this.orderTypeDesc = 'ocucondi/fetchOrderTypeDesc?condition=' + this.dialog.data.category;
        this.typeGridData = [];
        this.conditionGridData = [];
        this.conditionLov = [];
        this.categoryTypeLov = [];
        this.typeGridValue = [];
        this.prefetchConditionLov = [];

        this.getTypeGridParam.categoryTypeCode = this.dialog.data.category;

        this.conditionTypeColumndef = [
            {
                fieldName: this.translateService.translate('ocucondi.ordertype'),
                field: 'condition', editable: false, width: 300
            },
            {
                fieldName: this.translateService.translate('ocucondi.category'),
                field: 'categoryType', editable: true, width: 300, datatype: 'lov',domain:'COM_CON_CAT',
                titles: {
                    description: this.translateService.translate('common.description'),
                    code: this.translateService.translate('common.category')
                },
                // link: 'ocucondi/getCategory',
                 cellEditable: this.canCellEdit
            },
            { fieldName: '', field: 'exists', hide: true },
        ];
        this.getTypeGridParam.conditionTypeCode = this.dialog.data.category;
        this.urlCondition = 'ocucondi/getConditionsLov?condition=' + this.dialog.data.category + '&category=';
        this.conditionColumndef = [
            { fieldName: '', field: 'test', hide: true },
            {
                fieldName: this.translateService.translate('ocucondi.condition') + '*',
                titles: {
                    code: this.translateService.translate('common.code'),
                    description: this.translateService.translate('ocucondi.conditiondescription')
                },
                field: 'commConditionCode', editable: false, cellEditable: this.canCategoryEdit, width: 300, datatype: 'lov', parentField: 'categoryTypeCode', link: this.urlCondition,source:"OCMCONDI"
            },
            {
                fieldName: this.translateService.translate('ocucondi.length'), datatype: 'number',
                field: 'length', editable: true, width: 500, maxlength: 6
            },
            {
                fieldName: this.translateService.translate('ocucondi.unit'),
                field: 'lengthUnit', editable: true, width: 300, datatype: 'lov',domain:'COND_UNIT'/* link: 'ocucondi/getUnit'*/
            },
            {
                fieldName: this.translateService.translate('ocucondi.startdate') ,required : true,
                field: 'startDate', editable: true, width: 300, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('ocucondi.enddate'),
                field: 'expiryDate', editable: true, width: 300, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('ocucondi.status'),
                field: 'conditionStatus', editable: false, width: 500, datatype: 'lov', link: 'ocucondi/populateConditionStatus?orderType=COND',source:'OCMSTATS'
            },
            { fieldName: '', field: 'categoryTypeCode', hide: true },
            { fieldName: '', field: 'programMethod', hide: true },
            { fieldName: '', field: 'program', hide: true },
            { fieldName: '', field: 'nbtStatus', hide: true },
            { fieldName: '', field: 'copyFlag', hide: true },
        ];
    }
    getProgramId() {
        const serviceObj = this.service.
            getProgram();
        serviceObj.subscribe(data => {
            if (data.length === 0) {
            } else {
                data.forEach(ele => {
                    this.programIdMap.set(ele.code, ele.id);
                });
            }
        });
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    populateCategoryLovs() {
        this.service.populateCategoryLov().subscribe(data => {
            this.categoryTypeLov = data;
            if (this.categoryTypeLov.length > 0) {
                for (let j = 0; j < this.categoryTypeLov.length; j++) {
                    if (this.getConditionTypes.length > 0) {
                        for (let i = 0; i < this.getConditionTypes.length; i++) {
                            if (this.dialog.data.category === this.getConditionTypes[i].code) {
                                this.categoryTypeLov[j].condition = this.getConditionTypes[i].description;
                            }
                        }
                    }
                    this.categoryTypeLov[j].categoryTypeCode = this.categoryTypeLov[j].description;
                    this.categoryTypeLov[j].condition = this.dialog.data.category;
                }
            }
        });
    }


    populateTypeGrid(obj) {
        this.service.getTypeGrid(obj).subscribe(data => {
            this.typeGridData = data;
            for (let i = 0; i < this.typeGridData.length; i++) {
                if (this.getConditionTypes.length > 0) {
                    for (let j = 0; j < this.getConditionTypes.length; j++) {
                        if (this.typeGridData[i].conditionCode === this.getConditionTypes[j].code) {
                            this.typeGridData[i].conditionCode = this.getConditionTypes[i].description;
                        }
                    }
                }
            }
        });
    }

    populateConditionGrid(obj) {
        if (this.router.url === '/OCDCCASE') {
            obj.objectId = undefined;
            obj.objectType = undefined;
            obj.sentenceSeq = this.dialog.data.line;
        } else {
            obj.objectId = this.dialog.data.objectId;
            obj.objectType = this.dialog.data.category;
        }
        obj.sealFlag = 'Y';
        obj.offenderBookId = this.dialog.data.offenderBookId;
        obj.commConditionType = this.dialog.data.category;
        this.service.getConditionTypeGrid(obj).subscribe(data => {
            if (data.length === 0) {
                this.conditionGridData = [];
                this.selected = -1;
            } else {
                data.forEach(elemnt => {
                    elemnt.categoryTypeCode = this.offcondBean.categoryType;
                    elemnt.conditionTypeCode = elemnt.commConditionCode;
                    if (this.offcondBean.copyFlag) {
                        elemnt.copyFlag = true;
                    } else {
                        elemnt.copyFlag = false;
                    }
                });
                this.conditionGridDataTemp = JSON.parse(JSON.stringify(data));
                this.conditionGridData = data;
                this.selected = 0;
            }
        });
    }

    populateProgramComment(event) {
        this.gridFormData.curfewStartTime = DateFormat.getDate(event.curfewStartTime);
        this.gridFormData.curfewEndTime = DateFormat.getDate(event.curfewEndTime);
        this.gridFormData.commentText = event.commentText;
        this.gridFormData.program = event.program;
        this.gridFormData.nonAssociationText = event.nonAssociationText;
        this.gridFormData.prohibitedContact = event.prohibitedContact;
        this.gridFormData.sortComment = event.sortComment;
    }

    populateConditionGridlOV(obj) {
        this.service.getConditionGridLov(obj).subscribe(data => {
            this.prefetchConditionLov = data;
        });
    }


    onRowClickTypeGrid(event) {
        if (event) {
            this.isProgram = false;
            this.offcondBean = event;
            this.selectedCatogry = event.code;
            this.selectedCatogry = event.categoryType;
            this.getTypeGridParam.conditionTypeCode = this.dialog.data.category;
            this.getTypeGridParam.categoryTypeCode = this.selectedCatogry;
            this.conditionGridData = [];
            if (event.commConditionType && event.categoryType) {
                this.populateConditionGridlOV(this.getTypeGridParam);
                this.populateConditionGrid(event);
                this.getConditionsLov(event);
            } else {
                this.conditionGridData = [];
            }
        } else {
            this.conditionGridData = [];
        }
    }

    get typeInsBtn() {
        if (this.typegrid && this.typegrid.addedMap.size > 0) {
            return false;
        } else {
            return true;
        }
    }

    get conGridInsBtn() {
        if (this.offcondData.length > 0 && this.offcondBean && this.offcondBean.categoryType) {
            return true;
        } else {
            return false;
        }
    }

    onRowClickConditionGrid(event) {
        if (event) {
            this.isProgram = false;
            this.isAssociate = false;
            this.isProhibited = false;
            this.isAmount = false;
            this.isCurfew = false;
            this.isAddress = false;
            this.offconditionBean = event;
            if (this.offconditionBean.curfewStartTime) {
                this.offconditionBean.curfewStartTime = DateFormat.getDate(this.offconditionBean.curfewStartTime);
            }
            if (this.offconditionBean.curfewEndTime) {
                this.offconditionBean.curfewEndTime = DateFormat.getDate(this.offconditionBean.curfewEndTime);
            }
            if (event.offenderSentConditionId) {
                this.conDelBtn = true;
            } else {
                this.conDelBtn = false;
            }
            if (this.offconditionBean.programMethod === 'ACP' || this.offconditionBean.programMethod === 'UW') {
                this.isProgram = true;
            } else if (this.offconditionBean.programMethod === 'CUR') {
                this.isCurfew = true;
            } else if (this.offconditionBean.programMethod === 'PAC') {
                this.isProhibited = true;
            } else if (this.offconditionBean.programMethod === 'FIN') {
                const data = Number(this.offconditionBean.financialTotalAmount).toFixed(2);
                this.offconditionBean.financialTotalAmount = Number(data);
                this.isAmount = true;
            } else if (this.offconditionBean.programMethod === 'RES') {
                this.isAddress = true;
            } else if (this.offconditionBean.programMethod === 'NON') {
                this.isAssociate = true;
            }
            if (this.conditionGridData.length > 0) {
                for (let i = 0; i < this.conditionGridData.length; i++) {
                    this.conditionGridData[i].categoryTypeCode = this.selectedCatogry;
                }
            }
            this.sentConditionId = event.sentConditionId;
        } else {
            this.conDelBtn = false;
            this.isProgram = false;
            this.isAssociate = false;
            this.isProhibited = false;
            this.isAmount = false;
            this.isCurfew = false;
            this.isAddress = false;
            this.offconditionBean = new OffenderSentConditions();
        }
    }

    cancel(): void {
        if (this.conditionGridData.length > 0 && this.conditionGridData[0].offenderSentConditionId) {
            this.dialog.close(true);
        } else {
            this.dialog.close(false);
        }
    }

    onGridInsert = () => {
        if (!this.defaultFlag) {
            this.offSentConRowData = [];
            this.grid.addedMap.forEach(
                (v: any, k: number) => {
                    this.offSentConRowData.push(v);
                }
            );
            this.grid.updatedMap.forEach(
                (v: any, k: number) => {
                    this.offSentConRowData.push(v);
                }
            );
            for (let i = 0; i < this.offSentConRowData.length; i++) {
                if (this.validationsEvent(this.offSentConRowData[i])) {
                    return;
                }
            }
        } else {
            this.defaultFlag = false;
        }
        return {
            categoryType: this.offcondBean.categoryType,
            commConditionType: this.dialog.data.category,
            startDate: DateFormat.getDate(),
            endDate: this.dialog.data.expityDate,
            categoryTypeCode: this.offcondBean.categoryType
        };

    }
    onGridTypeInsert = () => {
        this.conditionGridData=[];
        return {
            condition: this.dialog.data.condition,
            exists: false
        };

    }
    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (data.commConditionType && data.exists) {
            return false;
        } else {
            return true;
        }
    }
    canCategoryEdit = (data: any, index: number, field: string): boolean => {
        if (this.offcondBean.count === 0) {
            return false;
        }
        if (data.offenderSentConditionId) {
            return false;
        } else {
            return true;
        }
    }
    openLinkDialog() {
        if (this.grid.addedMap.size > 0 || this.grid.updatedMap.size > 0 ||
            this.grid.removedMap.size > 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocucondi.pleasesavethechanges');
            this.show();
            return;
        }
        this.dialog.close(null);
        this.redirectUtil.redirectToAddress();
    }

    getConditionTypeGrid() {
        this.service.getConditionTypeGrid(this.offcondModel).subscribe(dataa => {
            if (dataa.length === 0) {
                this.offcondData = [];
                this.offcondIndex = -1;
            } else {
                dataa.forEach(elemnt => {
                    elemnt.condition = this.dialog.data.condition;
                    elemnt.exists = true;
                });
                this.offcondData = dataa;
                this.offcondIndex = 0;
                this.delFlag = false;
            }
        });
    }
    validateRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        if (event.field === 'categoryType') {
            if(event.data.categoryType){
                const result = this.offcondData.filter(ev=>ev.categoryType == event.data.categoryType);
                if(result.length > 1){
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocucondi.categoryalreadyexists')
                    this.show();
                    return rowdata;
                }
            }
            this.conditionGridData = [];
            event.data.categoryTypeCode = event.data.categoryType;
            this.selectedCatogry = event.data.categoryType;
            this.getTypeGridParam.categoryTypeCode = this.selectedCatogry;
            this.populateConditionGridlOV(this.getTypeGridParam);
            this.getDefaultConditions(event.data);
            this.getConditionsLov(event.data);
        }
        rowdata.validated = true;
        return rowdata;

    }
    getDefaultConditions(event) {
        event.offenderBookId = this.dialog.data.offenderBookId;
        event.commConditionType = this.dialog.data.category;
        const serviceObj = this.service.
            getDefaultConditions(event);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.selected = -1;
                this.defaultFlag = false;
            } else {
                data.forEach(ele => {
                    ele.program = undefined;
                    ele.programId = undefined;
                    ele.activityCode = undefined;
                    ele.curfewEndTime = undefined;
                    ele.curfewStartTime = undefined;
                    ele.commentText = undefined;
                    ele.financialTotalAmount = undefined;
                    ele.nonAssociationText = undefined;
                    ele.longCommentText = undefined;
                    ele.categoryTypeCode = this.offcondBean.categoryType;
                    ele.conditionTypeCode = ele.commConditionCode;
                    this.defaultFlag = true;
                    this.grid.addRecord();
                    this.grid.setColumnData('commConditionCode', this.conditionGridData.length - 1, ele.commConditionCode);
                    this.grid.setColumnData('length', this.conditionGridData.length - 1, ele.length);
                    this.grid.setColumnData('lengthUnit', this.conditionGridData.length - 1, ele.lengthUnit);
                    this.grid.setColumnData('startDate', this.conditionGridData.length - 1, ele.startDate);
                    this.grid.setColumnData('expiryDate', this.conditionGridData.length - 1, ele.endDate);
                    this.grid.setColumnData('conditionStatus', this.conditionGridData.length - 1, ele.conditionStatus);
                    this.grid.setColumnData('test', this.conditionGridData.length - 1, undefined);
                    this.grid.setColumnData('programMethod', this.conditionGridData.length - 1, ele.programMethod);
                    this.grid.setColumnData('copyFlag', this.conditionGridData.length - 1, true);
                    this.grid.setColumnData('nbtStatus', this.conditionGridData.length - 1, 'Default');
                    return;
                });
                this.selected = 0;
            }
        });
    }
    onSave() {
        if (this.typegrid.addedMap.size > 0 && this.grid.addedMap.size === 0) {
            this.typegrid.addedMap.forEach(
                (v: any, k: number) => {
                    this.typeInsertList.push(v);
                }
            );
            for (let i = 0; i < this.typeInsertList.length; i++) {
                if (!this.typeInsertList[i].condition) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocucondi.ordertypemustbeentered');
                    this.show();
                    return true;
                }
                if (!this.typeInsertList[i].categoryType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocucondi.categorymustbeentered');
                    this.show();
                    return true;
                }
            }
        }
        if (this.typegrid.addedMap.size > 0 && this.grid.addedMap.size === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocucondi.conditionmustbeentered');
            this.show();
            return true;
        }
        this.offSentinsertRecord = [];
        this.offSentupdatedRecord = [];
        this.offSentdeleteRecord = [];
        this.offTypedeleteRecord = [];
        this.grid.addedMap.forEach(
            (v: any, k: number) => {
                this.offSentinsertRecord.push(v);
            }
        );
        this.grid.updatedMap.forEach(
            (v: any, k: number) => {
                this.offSentupdatedRecord.push(v);
            }
        );
        this.grid.removedMap.forEach(
            (v: any, k: number) => {
                this.offSentdeleteRecord.push(v);
            }
        );
        this.typegrid.removedMap.forEach(
            (v: any, k: number) => {
                this.offTypedeleteRecord.push(v);
            }
        );
        if (this.offSentinsertRecord.length > 0) {
            for (let i = 0; i < this.offSentinsertRecord.length; i++) {
                if (this.validationsEvent(this.offSentinsertRecord[i])) {
                    return;
                }
                this.offSentinsertRecord[i].sentenceSeq = this.dialog.data.line;
                this.offSentinsertRecord[i].offenderBookId = this.dialog.data.offenderBookId;
                this.offSentinsertRecord[i].conditionAppliedFlag = 'N';
                // this.offSentinsertRecord[i].conditionStatus = 'A';
                this.offSentinsertRecord[i].objectId = this.dialog.data.objectId;
                this.offSentinsertRecord[i].objectType = this.dialog.data.category;
                if ((this.offSentinsertRecord[i].programMethod === 'ACP' || this.offconditionBean.programMethod === 'UW')
                    && this.offSentinsertRecord[i].program) {
                    this.offSentinsertRecord[i].programId = this.programIdMap.get(this.offSentinsertRecord[i].program);
                }
                this.offSentinsertRecord[i].caseloadId = this.sessionManager.currentCaseLoad;
            }
        }

        if (this.offSentupdatedRecord.length > 0) {
            for (let i = 0; i < this.offSentupdatedRecord.length; i++) {
                if (this.validationsEvent(this.offSentupdatedRecord[i])) {
                    return;
                }
                if ((this.offSentupdatedRecord[i].programMethod === 'ACP' || this.offconditionBean.programMethod === 'UW')
                    && this.offSentupdatedRecord[i].program) {
                    this.offSentupdatedRecord[i].programId = this.programIdMap.get(this.offSentupdatedRecord[i].program);
                }
            }
        }
        if (this.offTypedeleteRecord.length > 0) {
            for (let i = 0; i < this.offTypedeleteRecord.length; i++) {
                this.offTypedeleteRecord[i].offenderBookId = this.dialog.data.offenderBookId;
                if (this.dialog.data.objectId) {
                    this.offTypedeleteRecord[i].objectId = this.dialog.data.objectId;
                }
            }
        }
        this.offcondCommitModel.insertList = this.offSentinsertRecord;
        this.offcondCommitModel.updateList = this.offSentupdatedRecord;
        this.offcondCommitModel.deleteList = this.offSentdeleteRecord;
        this.offcondCommitModel.typedeleteList = this.offTypedeleteRecord;
        const affetedRows = this.service.offSentConCommit(this.offcondCommitModel);
        affetedRows.subscribe(data => {
            if (data && data === 'success') {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.type = 'success';
                this.show();
                this.getRowData();
            } else if (data && data === 2) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocucondi.thisprogramalreadyexists');
                this.show();
                this.getRowData();
            } else if (data && data === 'exception') {
                this.type = 'warn';
                this.message = this.translateService.translate('ocucondi.whencreatingcommunityconditiondeductions');
                this.show();
                setTimeout(() => {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                }, 10);
                this.getRowData();
            } else if (data && data === 'fail') {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.getRowData();
            } else {
                const msg = this.translateService.translate('ocucondi.recordcannotdeleted');
                this.message = String(msg).replace('%tablename%', data);
                this.type = 'warn';
                this.show();
                this.getRowData();
            }
        });
    }
    getRowData() {
        this.getConditionTypeGrid();
        return;
    }
    get savebtnDisable() {
        if (this.typegrid && (this.typegrid.addedMap.size > 0 || this.typegrid.removedMap.size > 0)) {
            return false;
        } else if (this.grid && (this.grid.addedMap.size > 0 || this.grid.updatedMap.size > 0 ||
            this.grid.removedMap.size > 0)) {
            return false;
        }
        return true;
    }
    validationsEvent(event) {
        if (!event.commConditionType) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocucondi.ordertypemustbeentered');
            this.show();
            return true;
        }
        if (!event.categoryType) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocucondi.categorymustbeentered');
            this.show();
            return true;
        }
        if (!event.commConditionCode) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocucondi.conditionmustbeentered');
            this.show();
            return true;
        }
        if (event.startDate && event.expiryDate) {
            if (DateFormat.compareDateTime(DateFormat.getDate(event.startDate)
                , DateFormat.getDate(event.expiryDate)) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocucondi.startdatecannotbe');
                this.show();
                return true;
            }
        }
        if ((event.programMethod === 'ACP' || this.offconditionBean.programMethod === 'UW') && !event.program) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocucondi.programmustbe');
            this.show();
            return true;
        } else if (event.programMethod === 'CUR') {
            if (!event.curfewStartTime || !event.curfewEndTime) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocucondi.curfewstarttotimemustbe');
                this.show();
                return true;
            } else if (event.curfewStartTime && event.curfewEndTime) {
                if (DateFormat.compareTime(DateFormat.getDate(event.curfewStartTime)
                    , DateFormat.getDate(event.curfewEndTime)) === 1) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocucondi.fromtimecannotbegreaterthantotime');
                    this.show();
                    return true;
                }
            }
        } else if (event.programMethod === 'PAC' && !event.activityCode) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocucondi.prohibitedactivitymustbe');
            this.show();
            return true;
        } else if (event.programMethod === 'FIN' && !event.financialTotalAmount) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocucondi.totalamountmustbeentered');
            this.show();
            return true;
        } else if (event.programMethod === 'NON' && !event.nonAssociationText) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocucondi.donotassociatewithmustbe');
            this.show();
            return true;
        }
    }
    validateCondRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        if(event.data.commConditionCode){
            const result = this.conditionGridData.filter(ev=>ev.commConditionCode == event.data.commConditionCode);
            if(result.length > 1){
                this.type = 'warn';
                this.message = this.translateService.translate('ocucondi.conditioncannotduplicate')
                this.show();
                return;
            }
        }
        if(!event.data.startDate){
            this.type = 'warn';
            this.message = this.translateService.translate('ocucondi.startdatemustbeenter');
            this.show();
            return;
         }
        if ( (event.data.startDate && event.data.expiryDate) && DateFormat.compareDate(DateFormat.getDate(event.data.expiryDate), DateFormat.getDate(event.data.startDate)) < 0){
            this.type = 'warn';
            this.message = this.translateService.translate('ocucondi.enddatevalidation');
            this.show();
            return;
        }
        if(event.data.startDate && DateFormat.compareDate(DateFormat.getDate(event.data.startDate), DateFormat.getDate()) <=0 && ((!event.data.expiryDate) 
        || (DateFormat.compareDate(DateFormat.getDate(event.data.expiryDate), DateFormat.getDate()) >=0))){
            this.grid.setColumnData('conditionStatus', index,AppConstants.ACTIVE);
        }
        if((event.data.startDate && event.data.expiryDate) && DateFormat.compareDate(DateFormat.getDate(event.data.expiryDate), DateFormat.getDate()) < 0){
            this.grid.setColumnData('conditionStatus', index,AppConstants.EXPIRED);
        }
        if(event.data.startDate && DateFormat.compareDate(DateFormat.getDate(event.data.startDate), DateFormat.getDate()) > 0 ){
            this.grid.setColumnData('conditionStatus',index,AppConstants.PENDING);
        }
        if (event.field === 'commConditionCode' && event.data.commConditionCode) {
            event.data.categoryTypeCode = event.data.categoryType;
            this.isProgram = false;
            this.isAssociate = false;
            this.isProhibited = false;
            this.isAmount = false;
            this.isCurfew = false;
            this.isAddress = false;
            if (this.prefetchConditionLov.length > 0) {
                if (!event.data.programMethod) {
                    for (let e = 0; e < this.prefetchConditionLov.length; e++) {
                        if (this.prefetchConditionLov[e].code === event.data.commConditionCode) {
                            this.offconditionBean.programMethod = this.prefetchConditionLov[e].method;
                            event.data.programMethod = this.prefetchConditionLov[e].method;
                        }
                    }
                }
                if (this.offconditionBean.programMethod === 'ACP' || this.offconditionBean.programMethod === 'UW') {
                    this.isProgram = true;
                } else if (this.offconditionBean.programMethod === 'CUR') {
                    this.isCurfew = true;
                } else if (this.offconditionBean.programMethod === 'PAC') {
                    this.isProhibited = true;
                } else if (this.offconditionBean.programMethod === 'FIN') {
                    this.isAmount = true;
                } else if (this.offconditionBean.programMethod === 'RES') {
                    this.isAddress = true;
                } else if (this.offconditionBean.programMethod === 'NON') {
                    this.isAssociate = true;
                }
            }
        }
        rowdata.validated = true;
        return rowdata;

    }
    onLovActChange(event) {
        const rowIndex = this.conditionGridData.indexOf(this.offconditionBean);
        if (this.offconditionBean.offenderSentConditionId && event.code !== this.conditionGridDataTemp[rowIndex].activityCode) {
            this.grid.setColumnData('test', rowIndex, event);
        } else if (!this.offconditionBean.offenderSentConditionId) {
            this.grid.setColumnData('test', rowIndex, event);
        }
    }
    onLovChange(event) {
        const rowIndex = this.conditionGridData.indexOf(this.offconditionBean);
        const prgValue = this.conditionGridDataTemp[rowIndex].program;
        if (this.offconditionBean.offenderSentConditionId && event.code !== this.conditionGridDataTemp[rowIndex].program) {
            if (this.offconditionBean.workflowId) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocucondi.youcannotupdatethisrecordasateamisassigned');
                this.show();
                this.offconditionBean.program = undefined;
                this.offconditionBean.program = prgValue;
                event.code = prgValue;
                event.id = this.programIdMap.get(prgValue);
                this.grid.setColumnData('program', rowIndex, prgValue);
                this.conditionGridData[rowIndex].program = prgValue;
                return;
            } else if (this.offconditionBean.courseProfilesActs) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocucondi.courseProfilesActs');
                this.show();
                this.offconditionBean.program = prgValue;
                return;
            } else if (this.offconditionBean.appointmentsActs) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocucondi.appointmentsActs');
                this.show();
                this.offconditionBean.program = prgValue;
                return;
            } else if (this.offconditionBean.appointmentsSa) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocucondi.appointmentsActs');
                this.show();
                this.offconditionBean.program = prgValue;
                return;
            }
            this.grid.setColumnData('test', rowIndex, event);
        } else if (!this.offconditionBean.offenderSentConditionId) {
            this.grid.setColumnData('test', rowIndex, event);
        }
    }
    onKeyUp(event) {
        const rowIndex = this.conditionGridData.indexOf(this.offconditionBean);
        this.grid.setColumnData('test', rowIndex, event);
    }
    onConGridDelete = () => {
        const index = this.conditionGridData.indexOf(this.offconditionBean);
        const typeIndex = this.offcondData.indexOf(this.offcondBean);
        if (this.conditionGridData.length === 1) {
            const data = {
                label: this.translateService.translate(
                    'ocucondi.warning')
                , yesBtn: true, noBtn: true
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                if (result) {
                    this.delFlag = true;
                    const res = this.grid.gridOptions.api.applyTransaction({ remove: [this.offconditionBean] });
                    this.grid.removedMap.set(index, this.offconditionBean);
                    const rest = this.typegrid.gridOptions.api.applyTransaction({ remove: [this.offcondBean] });
                    this.typegrid.removedMap.set(typeIndex, this.offcondBean);
                    return true;
                } else {
                    return false;
                }
            });
        } else {
            return true;
        }
    }
    onTypeGridClear = () => {
        if (this.offcondData.length === 1) {
            this.conditionGridData = [];
        }
        return true;
    }
    getConditionsLov(event) {
        const index = this.offcondData.indexOf(this.offcondBean);
        this.service.getConditionsLov(this.dialog.data.category, event.categoryType).subscribe(conditionData => {
            this.offcondBean.count = 0;
            conditionData.forEach(elemnt => {
                if (elemnt.activeFlag === 'Y') {
                    this.offcondBean.count = 1;
                }
            });
        });
    }
}
