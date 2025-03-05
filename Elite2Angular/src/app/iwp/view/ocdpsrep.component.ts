import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';

import { UserSessionManager } from '@core/classes/userSessionManager';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { Orders } from '@cm/courtcasesandorders/maintenance/beans/Orders';
import { OrderProposals } from '@cm/courtcasesandorders/maintenance/beans/OrderProposals';
import { OrderProposalConditions } from '@cm/courtcasesandorders/maintenance/beans/OrderProposalConditions';
import { OrderPpslCondActivities } from '@cm/courtcasesandorders/maintenance/beans/OrderPpslCondActivities';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';

import { OrderProposalsCommitBean } from '@cm/courtcasesandorders/maintenance/beans/OrderProposalsCommitBean';
import { OrderProposalConditionsCommitBean } from '@cm/courtcasesandorders/maintenance/beans/OrderProposalConditionsCommitBean';
import { OrderPpslCondActivitiesCommitBean } from '@cm/courtcasesandorders/maintenance/beans/OrderPpslCondActivitiesCommitBean';
import { OrdersCommitBean } from '@cm/courtcasesandorders/maintenance/beans/OrdersCommitBean';
import { OcdpsrepService } from '../service/ocdpsrep.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { CourtReportCharges } from '../beans/CourtReportCharges';
import { CourtReportChargesCommitBean } from '../beans/CourtReportChargesCommitBean';
import { OcdchgsuService } from '@inst/legal/service/ocdchgsu.service';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ocdpsrep',
    templateUrl: './ocdpsrep.component.html',

})

export class OcdpsrepComponent implements OnInit {

    @ViewChild('proposalGrid', { static: true }) proposalGrid: any;
    @ViewChild('ordGrid', { static: true }) ordGrid: any;
    @ViewChild('proposalCondGrid', { static: true }) proposalCondGrid: any;
    @ViewChild('ordPpslCondActGrid', { static: true }) ordPpslCondActGrid: any;
    @ViewChild('chargesGrid', { static: true }) chargesGrid: any;
    msgs: any[] = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    ordsInsertList: Orders[] = [];
    ordsUpdateList: Orders[] = [];
    ordsCommitBean: OrdersCommitBean = new OrdersCommitBean();
    ordsData: Orders[] = [];

    selectedOrdModel: Orders;
    ordproposalsData: OrderProposals[] = [];
    selectedOrdproposalsModel: OrderProposals = new OrderProposals();
    selectedOrdproposalsModelLov: OrderProposals = new OrderProposals();
    selectedOrdPropCondsModel: OrderProposalConditions = new OrderProposalConditions();
    ordPropCondsModel: OrderProposalConditions = new OrderProposalConditions();
    ordPropCondsData: OrderProposalConditions[] = [];
    ordPpslCondActData: OrderPpslCondActivities[] = [];
    ordUpdateList: Orders[] = [];
    ordproposalsInsertList: OrderProposals[] = [];
    ordproposalsUpdatetList: OrderProposals[] = [];
    ordproposalsDeleteList: OrderProposals[] = [];
    ordProposalCommitBean: OrderProposalsCommitBean = new OrderProposalsCommitBean();
    ordpropcondsInsertList: OrderProposalConditions[] = [];
    ordpropcondsUpdatetList: OrderProposalConditions[] = [];
    ordpropcondsDeleteList: OrderProposalConditions[] = [];
    ordpropcondsCommitBean: OrderProposalConditionsCommitBean = new OrderProposalConditionsCommitBean();
    ordppslcondactInsertList: OrderPpslCondActivities[] = [];
    ordppslcondactUpdatetList: OrderPpslCondActivities[] = [];
    ordppslcondactDeleteList: OrderPpslCondActivities[] = [];
    ordppslcondactCommitBean: OrderPpslCondActivitiesCommitBean = new OrderPpslCondActivitiesCommitBean();
    ordPropCondsColumnDef: any[];
    ordProposalsColumnDef: any[];
    ordColumnDef: any[];
    ordPpslCondActColumnDef: any[];
    tableIndex: number;
    disableCell: any;
    ordProposalsInsert: boolean;
    ordPpslCondActInsert: boolean;
    sentenceCalcTypeLink: any;
    disabledsentenceCalcType: boolean;
    disabledsentenceCategory: boolean;
    commentTextChangeDisabled: boolean;
    msglist: any[];
    message: any;
    type: any;
    ordProposalsDelete: boolean;
    ordPropCondsDelete: boolean;
    ordPropCondActDelete: boolean;
    categoryLink = 'ocdpsrep/rgProposedCategoryRecordGroup';
    ordppslCondActModel: OrderPpslCondActivities;
    ordPpslCondActDelete: boolean;
    disablereportAuthor: boolean;
    onInsert: boolean;
    backupOrdsData: any;
    authSaveFlag: boolean;
    chargesColumnDef: any[];
    charges: CourtReportCharges[] = [];
    chargesTemp: CourtReportCharges[] = [];
    chargesData: CourtReportCharges[] = [];
    chargesDataTemp: CourtReportCharges[] = [];
    chargesInsertList: CourtReportCharges[] = [];
    chargesUpdatetList: CourtReportCharges[] = [];
    chargesDeleteList: CourtReportCharges[] = [];
    chargesCommitBean: CourtReportChargesCommitBean = new CourtReportChargesCommitBean();
    myJsonRowData = [];
    chargesInsert: boolean;
    chargesDelete: boolean;
    courtReportCharges: CourtReportCharges = new CourtReportCharges();
    chargeIndex: number;
    allOffences = [];
    conditionsInsertActivity: boolean;
    constructor(private ocdpsrepFactory: OcdpsrepService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private dialogService: DialogService, private ocdchgsuService: OcdchgsuService,
        private eoffenderService: EoffenderService,private router: Router) {
        this.chargesColumnDef = [];
        this.ordPropCondsColumnDef = [];
        this.ordProposalsColumnDef = [];
        this.ordPpslCondActColumnDef = [];
        this.ordColumnDef = [];

    }
    ngOnInit() {
        this.disablereportAuthor = true;
        this.disabledsentenceCategory = true;
        this.disabledsentenceCalcType = true;
        this.commentTextChangeDisabled = true;
        this.ordProposalsInsert = false;
        this.chargesInsert = false;
        this.onInsert = false;
        this.authSaveFlag = true;

        this.ordProposalsDelete = false;
        this.ordPropCondsDelete = false;
        this.ordPropCondActDelete = false;
        this.conditionsInsertActivity = false;
        this.chargesColumnDef = [
            {
                fieldName: this.translateService.translate('ocdpsrep.matter'), field: 'matter', editable: false, width: 150,
                datatype: 'text', maxlength: 100
            },

            {
                fieldName: '', field: 'chargesButton', datatype: 'hyperlink', displayas: 'image', dialogWidth: '80%',
                link: '/CHARGESDLG', editable: true, width: 100, data: 'row', updateField: 'row',
                modal: true, height: 90, onLaunchClick: this.onChargesDialogClick,
            },

            {
                fieldName: this.translateService.translate('ocdpsrep.description'), field: 'description', editable: false, width: 150,
                datatype: 'text', maxlength: 100
            },

            {
                fieldName: this.translateService.translate('ocdpsrep.code'), field: 'code', editable: false, width: 150,
                datatype: 'text', maxlength: 100
            },

            {
                fieldName: this.translateService.translate('ocdpsrep.act'), field: 'act', editable: false, width: 150,
                datatype: 'lov', link: 'ocmpconf/populateStatutes', source: 'OIMSTATU'
            },

            {
                fieldName: this.translateService.translate('ocdpsrep.outcome'), field: 'outcome', editable: false, width: 150,
                datatype: 'lov', link: 'ocmpconf/populateOutcome', source: 'OCMORCOD'
            },

            {
                fieldName: this.translateService.translate('ocdpsrep.details'), field: 'detailsButton', datatype: 'hyperlink', displayas: 'image', dialogWidth: '80%',
                link: '/OCDCHGDT', editable: true, width: 100, data: 'row', updateField: 'row', cellEditable: this.detailsEditable,
                modal: true, height: 90, onLaunchClick: this.onDetailsDialogClick,
            },

            {
                fieldName: '', field: 'offenderBookId', datatype: 'number', hide: true
            },

            {
                fieldName: '', field: 'orderId', datatype: 'number', hide: true
            },

            {
                fieldName: '', field: 'chargeId', datatype: 'number', hide: true
            },
        ]

        this.ordColumnDef = [
            {
                fieldName: this.translateService.translate('ocdpsrep.reportType'), field: 'orderType', editable: true, width: 150,
                datatype: 'lov', link: 'ocdpsrep/rgOrderTypeRecordGroup', source: 'OIMCRTOR', cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('ocdpsrep.court'), field: 'issuingAgyLocId', editable: true, cellEditable: this.canCellEdit,
                width: 150, datatype: 'lov', link: 'ocdpsrep/rgCourtAgyLocDescRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad, source: 'OUMAGLOC'
            },
            {
                fieldName: this.translateService.translate('ocdpsrep.dateRequested'),
                field: 'requestDate', editable: true, width: 150, datatype: 'date', cellEditable: this.canCellEdit
            },
            { fieldName: this.translateService.translate('ocdpsrep.dateDue'), field: 'dueDate', editable: true, width: 150, datatype: 'date', cellEditable: this.canCellEdit },

            {
                fieldName: this.translateService.translate('ocdpsrep.teamresponsible'), field: 'teamId', editable: true,
                width: 150, datatype: 'lov', link: 'ocdpsrep/rgTeamRecordGroup?offenderBookId=', parentField: 'offenderBookId', cellEditable: this.canCellEdit, source: 'OCMTEAMMAIN',
            },
            {
                fieldName: '', field: 'offenderBookId', hide: true
            },

            {
                fieldName: this.translateService.translate('ocdpsrep.reportauthor'), field: 'staffMemberId', editable: true, width: 150, datatype: 'lov',
                link: 'ocdpsrep/rgStaffMembersRecordGroup?caseLoadId=' + this.sessionManager.currentCaseLoad + '&teamId=', parentField: 'teamId', cellEditable: this.canCellEdit
            },

            { fieldName: this.translateService.translate('ocdpsrep.status'), field: 'orderStatus', cellEditable: this.canCellEdit, editable: true, width: 150, datatype: 'lov', domain: 'REP_REQ_STS', required: true },
            {
                fieldName: this.translateService.translate('ocdpsrep.statusdate'), field: 'statusDate',
                editable: false, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('ocdpsrep.interestedparties'),
                field: 'intParties', datatype: 'hyperlink', displayas: 'image', link: '/OCDINTPA',
                data: 'row', editable: false, modal: true, width: 50, queryparam: 'SCREEN',
                updateField: 'row', dialogWidth: '80%',suppressMenu: true, onLaunchClick: this.onLaunchClick
            },
            {
                fieldName: this.translateService.translate('ocdpsrep.iwp'),
                field: 'ordLaunchButton', datatype: 'hyperlink', displayas: 'href',onLaunchClick: this.onEoffenderClick,
                data: 'row', editable: false, modal: false, typeValue: 'actionProperty', width: 150, queryparam: 'SCREEN', styleClass: 'file_copy'

            },
            {
                fieldName: '', field: 'eliteDoc', hide: true
            },
            { fieldName: '', field: 'test', hide: true },
            { fieldName: '', field: 'commentText', hide: true },
        ];
        this.ordProposalsColumnDef = [
            {
                fieldName: this.translateService.translate('ocdpsrep.proposedDisposal'),
                field: 'orderProposalCode', cellEditable: this.orderProposalCodeEdit,
                width: 150, datatype: 'lov', source: 'OIMSREQS',
                link: 'ocdpsrep/rgReportProposalRecordGroup',
                required: true
            },
            { fieldName: this.translateService.translate('ocdpsrep.notSuitableFlag'), field: 'notSuitableFlag', datatype: 'checkbox', editable: true, width: 150 },
            { fieldName: this.translateService.translate('ocdpsrep.notSuitableReason'), field: 'notSuitableReason', datatype: 'lov' , domain: 'CRT_REP_UNS', editable: true, width: 150, cellEditable: this.canReasonSelect },
            { fieldName: this.translateService.translate('ocdpsrep.comment'), field: 'commentText', datatype: 'text' ,  editable: true, width: 150, maxlength: 240, uppercase: 'false' },
            { fieldName: '', field: 'sentenceCategory', hide: true },
            { fieldName: '', field: 'test', hide: true },
            { fieldName: '', field: 'sentenceCalcType', hide: true },
        ];



        this.ordPropCondsColumnDef = [
            {
                fieldName: this.translateService.translate('ocdpsrep.condition'),
                field: 'commConditionCode', patentField: 'parentSentenceCategory',
                cellEditable: this.conditionCellEdit, width: 180, datatype: 'lov',
                link: 'ocdpsrep/rgProposedRequirementRecordGroup?parentSentenceCategory=',
                source: 'OCMCONDI'
            },
            {
                fieldName: this.translateService.translate('ocdpsrep.length'),
                field: 'length', width: 180, cellEditable: this.updateCellEdit, datatype: 'number', maxValue: 9999, whole: true
            },
            {
                fieldName: this.translateService.translate('ocdpsrep.type'),
                field: 'lengthUnitCode', width: 180, cellEditable: this.updateCellEdit, datatype: 'lov', domain: 'UNIT'
            },
            {
                fieldName: this.translateService.translate('ocdpsrep.comment'),
                field: 'commentText', width: 180, cellEditable: this.updateCellEdit, datatype: 'text', maxlength: 240, link: 'ocdpsrep/rgAccreditedProgramsRecordGroup',
                uppercase: 'false'
            },

        ];

        this.ordPpslCondActColumnDef = [
            {
                fieldName: this.translateService.translate('ocdpsrep.proposedActivicty'), field: 'conditionActivityCode', cellEditable: this.updateCellOrderProposedCondDet,
                width: 150, datatype: 'lov', link: 'ocdpsrep/rgAccreditedProgramsRecordGroup', source: 'OCMSVACP', required: true

            },
            {
                fieldName: this.translateService.translate('ocdpsrep.comment'),
                field: 'commentText', cellEditable: this.updateCellOrderProposedCondDet, width: 150, datatype: 'text', maxlength: 240, uppercase: 'false'
            },
        ];

    }

    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (field === 'requestDate' && data.orderStatus !== 'UNALLOC') {
            return false;
        }
        if (!data.createDatetime && field === 'orderStatus') {
            return false;
        }
        if (field === 'orderStatus' && (this.selectedOrdModel && this.selectedOrdModel.orderStatus === "UNALLOC")) {
            return false;
        }
        if (this.selectedOrdModel && (this.selectedOrdModel.orderStatus === 'ALLOC' && field === 'orderType' && this.selectedOrdModel.createDatetime)) {
            return false;
        }
        return true;

    }

    updateCellOrderProposedCondDet = (data: any, index: number, field: string): boolean => {
        if (this.selectedOrdModel.orderStatus !== 'CLOSED') {
            return true;
        } else {
            return false;
        }
    }

    updateCellEdit = (data: any, index: number, field: string): boolean => {
        if (this.selectedOrdproposalsModel && this.selectedOrdproposalsModel.createDatetime && this.selectedOrdModel && this.selectedOrdModel.orderStatus !== 'CLOSED') {//this.selectedOrdproposalsModel.orderProposalCode === 'SENTENCE' &&
            return true;
        } else {
            return false;
        }

    }

    conditionCellEdit = (data: any, index: number, field: string): boolean => {
        if (this.selectedOrdproposalsModel && this.selectedOrdproposalsModel.createDatetime && this.selectedOrdModel && this.selectedOrdModel.orderStatus !== 'CLOSED'
            && this.selectedOrdPropCondsModel) {
            return true;
        } else {
            return false;
        }
    }


    orderProposalCodeEdit = (data: any, index: number, field: string): boolean => {
        if (this.selectedOrdModel && this.selectedOrdModel.orderStatus === 'CLOSED') {
            return false;
        }
        if ((this.selectedOrdModel && this.selectedOrdproposalsModel)
            || (this.selectedOrdModel && !this.selectedOrdproposalsModel)) {
            return true;
        } else {
            return false;
        }

    }

    onordProposalsDelete = () => {
        if (this.ordPropCondsData.length !== 0 || this.proposalCondGrid.removedMap.size > 0) {
            this.show(this.translateService.translate('common.cannotdeletemaster'), 'warn');
            return;
        }
        return true;
    }

    onordPropCondsDelete = () => {
        if (this.ordPpslCondActData.length !== 0 || this.ordPpslCondActGrid.removedMap.size > 0) {
            this.show(this.translateService.translate('common.cannotdeletemaster'), 'warn');
            return;
        }
        return true;
    }


    onOffenderChange(event) {
        this.ordsData = [];
        this.ordproposalsData = [];
        this.ordPropCondsData = [];
        this.ordPpslCondActData = [];
        this.vHeaderBlockModel = event;
        this.ordProposalsInsert = false;
        this.chargesInsert = false;
        this.commentTextChangeDisabled = true;
        this.disablereportAuthor = true;
        this.onInsert = false;
        this.chargesData = [];
        this.conditionsInsertActivity = false;
        if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId) {
            this.onInsert = true;

            this.ordExecuteQuery();
            this.getAllOffences();
        } else {
            this.ordsData = [];
        }
    }

    reportAuthorClick = () => {
        if ((this.ordGrid.updatedMap && this.ordGrid.updatedMap.size > 0) ||
            (this.proposalGrid.addedMap && this.proposalGrid.addedMap.size > 0) ||
            (this.proposalGrid.updatedMap && this.proposalGrid.updatedMap.size > 0) ||
            (this.proposalGrid.deletedMap && this.proposalGrid.deletedMap.size > 0) ||
            (this.proposalCondGrid.addedMap && this.proposalCondGrid.addedMap.size > 0) ||
            (this.proposalCondGrid.updatedMap && this.proposalCondGrid.updatedMap.size > 0) ||
            (this.proposalCondGrid.deletedMap && this.proposalCondGrid.deletedMap.size > 0) ||
            (this.ordPpslCondActGrid.addedMap && this.ordPpslCondActGrid.addedMap.size > 0) ||
            (this.ordPpslCondActGrid.updatedMap && this.ordPpslCondActGrid.updatedMap.size > 0) ||
            (this.ordPpslCondActGrid.deletedMap && this.ordPpslCondActGrid.deletedMap.size > 0)) {
            this.show(this.translateService.translate('ocdpsrep.saveanychangesbeforcontinuing'), 'warn');
            return;
        }
        this.dialogService.openLinkDialog('/OCDPSREPDIALOG', this.selectedOrdModel, 80).subscribe(result => {
        });
    }

    onRowClickOrds = (event) => {
        this.conditionsInsertActivity = event.orderId ? true : false;
        this.authSaveFlag = true;
        this.disablereportAuthor = false;
        this.selectedOrdModel = event;
       
        this.backupOrdsData.forEach(ele => {
            if (ele.orderId === event.orderId) {
                this.selectedOrdModel = ele;
                this.selectedOrdModel.commentText = event.commentText;
            }
        });
        if (!event.createDatetime) {
            this.disablereportAuthor = true;
        }
        if (this.selectedOrdModel && this.selectedOrdModel.createDatetime) {
            this.commentTextChangeDisabled = this.selectedOrdModel.orderStatus !== 'CLOSED' ? false : true;
            this.eoffenderService.selectedRowData = event;
            this.ordProposalExecuteQuery();
            this.ordPpslCondActExecuteQuery();
            this.getChargesData();


        } else {
            this.eoffenderService.selectedRowData = null;
            this.commentTextChangeDisabled = true;
            this.ordproposalsData = [];
            this.ordPropCondsData = [];
            this.ordPpslCondActData = [];
        }
        if (this.selectedOrdModel && this.selectedOrdModel.createDatetime && this.selectedOrdModel.orderStatus !== 'CLOSED') {
            this.ordProposalsInsert = true;
            this.chargesInsert = true;
        } else {
            this.ordProposalsInsert = false;
            this.chargesInsert = false;
        }
    }

    onRowClickordproposals = (event) => {
        this.selectedOrdproposalsModel = event;
        if(event.notSuitableFlag){
            this.proposalGrid.requiredOn('notSuitableReason');
        } else {
            this.proposalGrid.requiredOff('notSuitableReason');
        }
        if (this.selectedOrdproposalsModel && this.selectedOrdproposalsModel.createDatetime) {
            this.ordPropCondsExecuteQuery();
        } else {
            this.ordPropCondsData = [];
            this.ordPpslCondActInsert = false;
        }


        if (this.selectedOrdproposalsModel && this.selectedOrdproposalsModel.createDatetime &&
            this.selectedOrdModel && this.selectedOrdModel.orderStatus !== 'CLOSED') {
            this.ordProposalsDelete = true;
        } else {
            this.ordProposalsDelete = false;
        }
        if (this.selectedOrdproposalsModel &&
            this.selectedOrdModel && this.selectedOrdModel.orderStatus !== 'CLOSED') {
            this.sentenceCalcTypeLink = 'ocdpsrep/rgProposedSentenceRecordGroup?sentenceCategory=' + this.selectedOrdproposalsModel.sentenceCategory;
            this.disabledsentenceCategory = false;
            this.disabledsentenceCalcType = false;
        } else {
            this.disabledsentenceCalcType = true;
            this.disabledsentenceCategory = true;

        }

    }

    onRowClickordpropconds = (event) => {

        this.selectedOrdPropCondsModel = event;
        if (this.selectedOrdPropCondsModel && this.selectedOrdPropCondsModel.createDatetime) {
            this.getParentSentenceSeq(this.selectedOrdproposalsModel.sentenceCategory);
        } else {
            this.ordPpslCondActInsert = false;
        }
        if (this.selectedOrdPropCondsModel && this.selectedOrdPropCondsModel.createDatetime &&
            this.selectedOrdproposalsModel &&
            this.selectedOrdModel && this.selectedOrdModel.orderStatus !== 'CLOSED') {
            this.ordPpslCondActInsert = true;
            this.ordPropCondsDelete = true;
        } else {
            this.ordPpslCondActInsert = false;
            this.ordPropCondsDelete = false;
        }
    }

    onRowClickoppslCondAct = (event) => {
        this.ordppslCondActModel = event;
        if (this.ordppslCondActModel && this.ordppslCondActModel.createDatetime && this.selectedOrdproposalsModel &&
            this.selectedOrdModel && this.selectedOrdModel.orderStatus !== 'CLOSED') {
            this.ordPpslCondActDelete = true;
        } else {
            this.ordPpslCondActDelete = false;

        }
    }
    sentenceCategoryChange(event) {

        if (this.selectedOrdproposalsModel && this.selectedOrdproposalsModel.sentenceCategory && event &&
            event.code !== this.selectedOrdproposalsModel.sentenceCategoryTemp) {
            const index = this.ordproposalsData.indexOf(this.selectedOrdproposalsModel);
            this.proposalGrid.setColumnData('test', index, this.selectedOrdproposalsModel.sentenceCategory);
            this.proposalGrid.setColumnData('sentenceCategory', index, this.selectedOrdproposalsModel.sentenceCategory);
            this.getParentSentenceSeq(this.selectedOrdproposalsModel.sentenceCategory);
            this.sentenceCalcTypeLink = 'ocdpsrep/rgProposedSentenceRecordGroup?sentenceCategory=' +
                this.selectedOrdproposalsModel.sentenceCategory;
        }
    }

    sentenceCalcTypeChange(event) {

        if (event && this.selectedOrdproposalsModel && this.selectedOrdproposalsModel.sentenceCalcType &&
            event.code !== this.selectedOrdproposalsModel.sentenceCalcTypeTemp) {
            const index = this.ordproposalsData.indexOf(this.selectedOrdproposalsModel);
            this.proposalGrid.setColumnData('test', index, this.selectedOrdproposalsModel.sentenceCalcType);
            this.proposalGrid.setColumnData('sentenceCalcType', index, this.selectedOrdproposalsModel.sentenceCalcType);
        }
    }

    commentTextChange(event) {
        this.authSaveFlag = false;
        this.selectedOrdModel.commentText = event;
    }
    onGridClear = () => {
        this.ordExecuteQuery();
        return true;
    }

    ordLaunch = (event) => {
        let navDoc = 'OCDPSREP' + '~' + 'true' + this.selectedOrdModel.orderId;
        this.dialogService.openLinkDialog(navDoc, event, 80).subscribe(result => {
            if (result) {

            }
        });
    }

    onOrdProposalsInsert = () => {
        if (!this.ordProposalValidations()) {
            return;
        }
        this.selectedOrdproposalsModel = new OrderProposals();
        return {};
    }

    onOrdPropCondsInsert = () => {
        if (!this.ordPropCondsValidations()) {
            return;
        }
        this.selectedOrdPropCondsModel = new OrderProposalConditions();
        return { parentSentenceCategory: this.selectedOrdproposalsModel.sentenceCategory };
    }

    onOrdPpslCondActInsert = () => {
        if (this.ordPpslCondActData.length < 1) {
            return {};

        }

    }

    validateRowDataProposals = (event) => {
        const rowdata = new ValidateRowReturn();
        if (this.selectedOrdproposalsModel &&
            this.selectedOrdModel && this.selectedOrdModel.orderStatus !== 'CLOSED') {
            this.disabledsentenceCalcType = false;
            this.disabledsentenceCategory = false;
        } else {
            this.disabledsentenceCalcType = true;
            this.disabledsentenceCategory = true;
        }
        if(event.field == 'notSuitableFlag'){
            if(!event.newValue){
                this.proposalGrid.setColumnData('notSuitableReason',event.rowIndex, undefined);
                this.proposalGrid.requiredOff('notSuitableReason');
            } else {
                this.proposalGrid.requiredOn('notSuitableReason');
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    validateRowDataOrds = (event) => {
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        if (event.field === 'teamId') {
            event.data.staffMemberId = undefined;
            return rowdata;
        }
        if (event.field === 'orderStatus') {
            this.ordGrid.setColumnData('statusDate', event.rowIndex, DateFormat.getDate());
            if ((!event.newValue || event.newValue === 'UNALLOC')) {
                for (let i = 0; i < this.backupOrdsData.length; i++) {
                    if ((event.data.orderId === this.backupOrdsData[i].orderId && this.backupOrdsData[i].orderStatus === 'ALLOC')
                        || ((event.data.teamId && event.data.teamId !== null) || (event.data.staffMemberId && event.data.staffMemberId !== null))) {
                        this.show(this.translateService.translate('ocdpsrep.youcannotchangestatustounallocated'), 'warn');
                        this.ordGrid.setColumnData('orderStatus', event.rowIndex, undefined);
                        return rowdata;
                    }
                }
            }
            return rowdata;
        }
        if (this.selectedOrdModel && !this.selectedOrdModel.createDatetime) {
            this.ordProposalsInsert = false;
            this.chargesInsert = false;
            this.ordProposalsDelete = false;
            this.ordPropCondsDelete = false;
            this.ordPpslCondActInsert = false;
            this.ordPpslCondActDelete = false;
            this.disabledsentenceCategory = true;
            this.disabledsentenceCalcType = true;
        }
        return rowdata;
    }

    validateRowDataordPropCondAct() {
        if (this.ordppslCondActModel) {
            this.ordPpslCondActInsert = false;
        }
    }

    ordValidations() {
        const is = { valid: true };
        this.ordsData.forEach(data => {
            if (!data.orderType) {
                this.show(this.translateService.translate('ocdpsrep.reportTypeValidation'), 'warn');
                is.valid = false;
                return is.valid;
            }
            if (!data.orderStatus) {
                this.show(this.translateService.translate('ocdpsrep.pleaseenterstatus'), 'warn');
                is.valid = false;
                return is.valid;
            }

            if (!data.issuingAgyLocId) {
                this.show(this.translateService.translate('ocdpsrep.courtValidation'), 'warn');
                is.valid = false;
                return is.valid;
            }

            if (!data.requestDate) {
                this.show(this.translateService.translate('ocdpsrep.dateRequestedValidation'), 'warn');
                is.valid = false;
                return is.valid;
            }

            if (!data.dueDate) {
                this.show(this.translateService.translate('ocdpsrep.dateDueValidation'), 'warn');
                is.valid = false;
                return is.valid;
            }
            if (DateFormat.compareDate(DateFormat.getDate(data.requestDate), DateFormat.getDate(data.dueDate)) === 1) {
                this.show(this.translateService.translate('ocdpsrep.duedatemustbelaterthanrequestdate'), 'warn');
                is.valid = false;
                return is.valid;
            }

            if ((DateFormat.compareDate(DateFormat.getDate(data.completeDate), DateFormat.getDate(data.requestDate)) === -1)) {
                this.show(this.translateService.translate('ocdpsrep.dateOfCompletionvalidationWithRequestDate'), 'warn');
                is.valid = false;
                this.ordExecuteQuery();
                return is.valid;
            }

            if ((DateFormat.compareDate(DateFormat.getDate(data.completeDate), DateFormat.getDate()) === 1)) {
                this.show(this.translateService.translate('ocdpsrep.dateOfCompletionvalidation'), 'warn');
                is.valid = false;
                this.ordExecuteQuery();
                return is.valid;
            }

        });
        return is.valid;
    }

    ordProposalValidations() {
        const is = { valid: true };
        this.ordproposalsData.forEach(data => {
            const index = this.ordproposalsData.indexOf(data);
            if (!data.orderProposalCode) {
                this.show(this.translateService.translate('ocdpsrep.proposedDisposalValidation'), 'warn');
                is.valid = false;
                return is.valid;
            }
            if(data.notSuitableFlag && !data.notSuitableReason){
                this.show(this.translateService.translate('ocdpsrep.pleaseenternotsuitablereason'), 'warn');
                    is.valid = false;
                    return is.valid;
            }
            for (let i = 0; this.ordproposalsData.length > i; i++) {
                if (index !== i && this.ordproposalsData[i].orderProposalCode === data.orderProposalCode) {
                    this.show(this.translateService.translate('ocdpsrep.orderProposalDuplicate'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
            }

        });
        return is.valid;
    }

    ordPropCondsValidations() {
        const is = { valid: true };
        for (let j = 0; j < this.ordPropCondsData.length; j++) {
            const index = this.ordPropCondsData.indexOf(this.ordPropCondsData[j]);
            if (!this.ordPropCondsData[j].commConditionCode) {
                this.show(this.translateService.translate('ocdpsrep.conditionValidation'), 'warn');
                is.valid = false;
                return is.valid;
            }
            let dupCond = this.ordPropCondsData.filter(ele => ele.commConditionCode === this.ordPropCondsData[j].commConditionCode);
            if (dupCond.length > 1) {
                this.show(this.translateService.translate('ocdpsrep.conditionDuplicate'), 'warn');
                is.valid = false;
                return is.valid;
            }
        }
        return is.valid;
    }
    onGridClearPropCond = () => {
        this.ordPropCondsExecuteQuery();
        return true;
    }
    onGridClearOrdProp = () => {
        this.ordProposalExecuteQuery();
        return true;
    }

    getParentSentenceSeq(obj) {
        this.ordPropCondsColumnDef[0].link = 'ocdpsrep/rgProposedRequirementRecordGroup?parentSentenceCategory=' +
            this.selectedOrdproposalsModel.sentenceCategory;
    }

    ordExecuteQuery() {
        if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId) {
            const serviceObj = this.ocdpsrepFactory.
                ordExecuteQuery(this.vHeaderBlockModel.offenderBookId);
            serviceObj.subscribe(data => {
                if (data.length === 0) {
                    this.ordsData = [];
                    this.ordproposalsData = [];
                    this.ordPropCondsData = [];
                    this.ordPpslCondActData = [];
                } else {
                    data.forEach(element => {
                        element.nonReportFlag = element.nonReportFlag === 'Y' ? true : false;
                        element.commentTextTemp = element.commentText;
                        element.ordLaunchButton = 'D';
                        element.navEoffender = '/EOFFENDER';
                        element.SCREEN = 'OCDPSREP' + "~" + "true" + "~" + element.orderId;
                        element['intParties'] = "assets/images/legal-launch-btn-icon.png";
                    });
                    this.ordsData = data;
                    this.backupOrdsData = JSON.parse(JSON.stringify(this.ordsData));
                    this.tableIndex = 0;
                }
            });
        }

    }

    ordProposalExecuteQuery() {
        if (this.selectedOrdModel && this.selectedOrdModel.orderId) {
            const serviceObj = this.ocdpsrepFactory.
                ordProposalsExecuteQuery(this.selectedOrdModel.orderId);
            serviceObj.subscribe(data => {
                if (data.length === 0) {
                    this.ordproposalsData = [];
                    this.ordPropCondsData = [];
                } else {
                    data.forEach(element => {
                        element.sentenceCategoryTemp = element.sentenceCategory;
                        element.sentenceCalcTypeTemp = element.sentenceCalcType;
                        element.oldOrderProposalCode = element.orderProposalCode;
                        element.notSuitableFlag = element.notSuitableFlag == 'Y' ? true : false;
                    });
                    this.ordproposalsData = data;
                    this.tableIndex = 0;
                }
            });
        }

    }

    ordPropCondsExecuteQuery() {
        if (this.selectedOrdproposalsModel && this.selectedOrdproposalsModel.orderId) {
            const serviceObj = this.ocdpsrepFactory.
                ordPropCondsExecuteQuery(this.selectedOrdproposalsModel);
            serviceObj.subscribe(data => {
                if (data.length === 0) {
                    this.ordPropCondsData = [];
                } else {
                    data.forEach(element => {
                        element.commConditionType = this.selectedOrdproposalsModel.sentenceCategory;
                        element.parentSentenceCategory = this.selectedOrdproposalsModel.sentenceCategory;
                    });
                    this.ordPropCondsData = data;
                    this.tableIndex = 0;
                }
            });
        }
    }

    ordPpslCondActExecuteQuery() {
        if (this.selectedOrdModel && this.selectedOrdModel.orderId) {
            const serviceObj = this.ocdpsrepFactory.
                ordPpslCondActExecuteQuery(this.selectedOrdModel.orderId);
            serviceObj.subscribe(data => {
                if (data.length === 0) {
                    this.ordPpslCondActData = [];
                    this.ordPpslCondActInsert = true;
                } else {
                    this.ordPpslCondActData = data;
                    this.ordPpslCondActInsert = false;
                    this.tableIndex = 0;
                }
            });
        }
    }

    show(message, type) {
        this.msglist = [];
        this.msglist.push({ message: message, type: type });
        this.msgs = [...this.msglist];
    }

    saveOrd(event) {
        this.ordsCommitBean = new OrdersCommitBean();
        this.ordsInsertList = event.added;
        this.ordsUpdateList = event.updated;
        if (!this.ordValidations()) {
            return true;
        }
        if (this.ordsInsertList.length > 0) {
            this.ordsInsertList.forEach(element => {
                if ((element.teamId && element.teamId != null) || (element.staffMemberId && element.staffMemberId !== null)) {
                    element.orderStatus = 'ALLOC'
                    element.statusDate = DateFormat.getDate();
                } else {
                    element.orderStatus = 'UNALLOC'
                    element.statusDate = null;
                }
            });
        }
        if (this.ordsUpdateList.length > 0) {
            for (let i = 0; i < this.ordsUpdateList.length; i++) {
                if (this.ordsUpdateList[i].orderStatus === 'UNALLOC' && ((this.ordsUpdateList[i].teamId && this.ordsUpdateList[i].teamId !== null) || (this.ordsUpdateList[i].staffMemberId && this.ordsUpdateList[i].staffMemberId !== null))) {
                    this.ordsUpdateList[i].orderStatus = 'ALLOC';
                    this.ordsUpdateList[i].statusDate = DateFormat.getDate();
                }
                if ((!this.ordsUpdateList[i].teamId || this.ordsUpdateList[i].teamId === null) && (!this.ordsUpdateList[i].staffMemberId || this.ordsUpdateList[i].staffMemberId === null)) {
                    this.ordsUpdateList[i].orderStatus = 'UNALLOC';
                    this.ordsUpdateList[i].statusDate = null;
                }
                this.ordsUpdateList[i].courtDate = (this.ordsUpdateList[i].courtDate && this.ordsUpdateList[i].courtDate !== null) ? DateFormat.getDate(this.ordsUpdateList[i].courtDate) : null;
                this.ordsUpdateList[i].createDatetime = DateFormat.getDate(this.ordsUpdateList[i].createDatetime);
                this.ordsUpdateList[i].dueDate = DateFormat.getDate(this.ordsUpdateList[i].dueDate);
                this.ordsUpdateList[i].modifyDatetime = DateFormat.getDate(this.ordsUpdateList[i].modifyDatetime);
                this.ordsUpdateList[i].requestDate = DateFormat.getDate(this.ordsUpdateList[i].requestDate);
                this.ordsUpdateList[i].statusDate = (this.ordsUpdateList[i].statusDate && this.ordsUpdateList[i].statusDate !== null) ? DateFormat.getDate(this.ordsUpdateList[i].statusDate) : null;
            }
        }
        this.ordsCommitBean.insertList = this.ordsInsertList;
        this.ordsCommitBean.updateList = this.ordsUpdateList;
        this.ocdpsrepFactory.ordCommit(this.ordsCommitBean).subscribe(data => {
            if (data > 0) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.ordExecuteQuery();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.ordExecuteQuery();
            }
        });


    }

    saveOrdProposals(event) {
        this.ordProposalCommitBean = new OrderProposalsCommitBean();
        this.ordproposalsInsertList = event.added;
        this.ordproposalsUpdatetList = event.updated;
        this.ordproposalsDeleteList = event.removed;

        if (!this.ordProposalValidations()) {
            return;
        }

        if (this.ordproposalsInsertList.length > 0) {
            this.ordproposalsInsertList.forEach(data => {
                data.orderId = this.selectedOrdModel.orderId;
                data.notSuitableFlag = data.notSuitableFlag? 'Y':'N'
            });
            this.ordProposalCommitBean.insertList = this.ordproposalsInsertList;
        }
        if (this.ordproposalsUpdatetList.length > 0) {
            this.ordproposalsUpdatetList.forEach( ele => {
                ele.notSuitableFlag = ele.notSuitableFlag? 'Y':'N'
            })
            this.ordProposalCommitBean.updateList = this.ordproposalsUpdatetList;
        }

        if (this.ordproposalsDeleteList.length > 0) {
            this.ordproposalsDeleteList.forEach( ele => {
                ele.notSuitableFlag = ele.notSuitableFlag? 'Y':'N'
            })
            this.ordProposalCommitBean.deleteList = this.ordproposalsDeleteList;
        }


        const result = this.ocdpsrepFactory.ordProposalsCommit(this.ordProposalCommitBean);
        result.subscribe(data => {
            if (data === 2) {
                this.show(this.translateService.translate('ocdpsrep.duplicatekeyviolatesuniqueconstraint'), 'warn');
                this.ordProposalExecuteQuery();
                return;
            } else if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.ordProposalExecuteQuery();
                return;
            } else if (data === 3) {
                this.show(this.translateService.translate('ocdpsrep.cannotupdateforiegnkey'), 'warn');
                this.ordPropCondsExecuteQuery();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.ordProposalExecuteQuery();
                return;
            }
        });
    }

    saveOrdPropConds(event) {
        this.ordpropcondsCommitBean = new OrderProposalConditionsCommitBean();
        this.ordpropcondsInsertList = event.added;
        this.ordpropcondsUpdatetList = event.updated;
        this.ordpropcondsDeleteList = event.removed;

        if (!this.ordPropCondsValidations()) {
            return;
        }

        if (this.ordpropcondsInsertList.length > 0) {
            this.ordpropcondsInsertList.forEach(element => {
                element.commConditionType = this.selectedOrdproposalsModel.sentenceCategory;
                element.orderId = this.selectedOrdproposalsModel.orderId;
                element.orderProposalCode = this.selectedOrdproposalsModel.orderProposalCode;
                element.commConditionType = 'COMM';
            });
            this.ordpropcondsCommitBean.insertList = this.ordpropcondsInsertList;
        }
        if (this.ordpropcondsUpdatetList.length > 0) {
            this.ordpropcondsUpdatetList.forEach(element => {
                element.commConditionType = this.selectedOrdproposalsModel.sentenceCategory;
                element.orderProposalCode = this.selectedOrdproposalsModel.orderProposalCode;
                element.commConditionType = 'COMM';
            });
            this.ordpropcondsCommitBean.updateList = this.ordpropcondsUpdatetList;
        }

        if (this.ordpropcondsDeleteList.length > 0) {
            this.ordpropcondsCommitBean.deleteList = this.ordpropcondsDeleteList;
        }


        const result = this.ocdpsrepFactory.ordPropCondsCommit(this.ordpropcondsCommitBean);
        result.subscribe(data => {
            if (data > 0) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.ordPropCondsExecuteQuery();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.ordPropCondsExecuteQuery();
            }
        });


    }

    saveOrdPpsalCondAct(event) {
        this.ordppslcondactCommitBean = new OrderPpslCondActivitiesCommitBean();
        this.ordppslcondactInsertList = event.added;
        this.ordppslcondactUpdatetList = event.updated;
        this.ordppslcondactDeleteList = event.removed;
        if (this.ordppslcondactInsertList.length > 0) {

            for (let i = 0; i < this.ordppslcondactInsertList.length; i++) {
                if (!this.ordppslcondactInsertList[i].conditionActivityCode && !this.ordppslcondactInsertList[i].commentText) {
                    return;
                }
                this.ordppslcondactInsertList[i].orderId = this.selectedOrdModel.orderId;
            }

            this.ordppslcondactCommitBean.insertList = this.ordppslcondactInsertList;
        }
        if (this.ordppslcondactUpdatetList.length > 0) {
            this.ordppslcondactCommitBean.updateList = this.ordppslcondactUpdatetList;
        }
        if (this.ordppslcondactDeleteList.length > 0) {
            this.ordppslcondactCommitBean.deleteList = this.ordppslcondactDeleteList;
        }

        if (this.ordppslcondactCommitBean.insertList.length > 0 || this.ordppslcondactCommitBean.updateList.length > 0
            || this.ordppslcondactCommitBean.deleteList.length > 0) {
            const result = this.ocdpsrepFactory.ordPpslCondActCommit(this.ordppslcondactCommitBean);
            result.subscribe(data => {
                if (data > 0) {
                    this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                    this.ordPpslCondActExecuteQuery();
                } else {
                    this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                    this.ordPpslCondActExecuteQuery();
                }

            });

        }
    }

    onGridInsert = () => {
        this.ordProposalsInsert = false;
        this.chargesInsert = false;
        this.disablereportAuthor = true;
        this.conditionsInsertActivity = false;
        return {
            requestDate: DateFormat.getDate(),
            offenderBookId: this.vHeaderBlockModel.offenderBookId,
            orderStatus: 'UNALLOC'
        }
    }

    onAuthorsSave() {
        if (this.selectedOrdModel && this.selectedOrdModel.commentText) {
            const insertCommentBean = new Orders();
            insertCommentBean.orderId = this.selectedOrdModel.orderId;
            insertCommentBean.commentText = this.selectedOrdModel.commentText;
            this.ocdpsrepFactory.ordAuthorCommit(insertCommentBean).subscribe(data => {
                if (data > 0) {
                    this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                    this.ordExecuteQuery();
                } else {
                    this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                    this.ordExecuteQuery();
                }
                this.authSaveFlag = true;
            });
        }
    }


    loadJsonData() {
        const form_identifiers = {};
        form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
        const retData = {
            formName: 'ocdchgsu',
            searchString: JSON.stringify(form_identifiers)
        }
        this.ocdpsrepFactory.loadData(retData).subscribe((data: any) => {
            if (data && data.formInfoJson) {
                this.charges = [];
                const rowData = JSON.parse(data.formInfoJson);
                this.myJsonRowData = JSON.parse(JSON.stringify(rowData));
                this.myJsonRowData.forEach(element => {
                    var courtReportCharges = new CourtReportCharges();
                    courtReportCharges.matter = element.matter;
                    courtReportCharges.outcome = element.outcome;
                    courtReportCharges.chargeId = element.chargeId;
                    let selectOffence = this.allOffences.filter(i => i.offenceId == element.offenceId)[0];
                    courtReportCharges.description = selectOffence ? selectOffence.description : undefined;
                    courtReportCharges.code = selectOffence ? selectOffence.code : undefined;
                    courtReportCharges.act = selectOffence ? selectOffence.statuteCode : undefined;
                    this.charges.push(courtReportCharges);
                });
                this.chargesTemp = JSON.parse(JSON.stringify(this.charges));
            } else {
                this.myJsonRowData = [];
                this.charges = [];
                this.chargesTemp = [];
            }
        })
    }

    getChargesData() {
        this.chargesDataTemp = [];
        this.courtReportCharges = new CourtReportCharges();
        this.courtReportCharges.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.courtReportCharges.orderId = this.selectedOrdModel.orderId;
        this.ocdpsrepFactory.chargesExecuteQuery(this.courtReportCharges).subscribe((data: any) => {
            if (data.length === 0) {
                this.chargesData = [];
                this.chargeIndex = -1;
            } else {
                data.forEach(element => {
                    this.charges.forEach(charge => {
                        if (element.chargeId === charge.chargeId) {
                            charge.offenderBookId = element.offenderBookId;
                            charge.orderId = element.orderId;
                            charge.createDatetime = element.createDatetime;
                            charge.select = true;
                            charge['chargesButton'] = '';
                            charge['detailsButton'] = 'assets/images/legal-launch-btn-icon.png';
                            this.chargesDataTemp.push(charge);
                        }
                    });
                });
                this.chargesData = this.chargesDataTemp;
                this.chargeIndex = 0;
            }
        });
    }

    onRowClickcharges = (event) => {
        if (event.createDatetime != '' && event.createDatetime != undefined) {
            this.chargesDelete = true;
        } else {
            this.chargesDelete = false;
        }
    }

    onChargesInsert = () => {
        if (this.chargeValidate(this.chargesData)) {
            return {
                'chargesButton': 'assets/images/legal-launch-btn-icon.png'
            };
        } else {
            return;
        }
    }

    savecharges(event) {
        this.chargesCommitBean.insertList = [];
        this.chargesCommitBean.deleteList = [];
        this.chargesInsertList = event.added;
        this.chargesDeleteList = event.removed;
        if (this.chargesInsertList.length > 0) {
            if (!this.chargeValidate(this.chargesInsertList)) {
                return;
            }
            this.chargesCommitBean.insertList = this.chargesInsertList;
        }
        if (this.chargesDeleteList.length > 0) {
            this.chargesCommitBean.deleteList = this.chargesDeleteList;
        }
        const processSaveData = this.ocdpsrepFactory.chargesCommit(this.chargesCommitBean);
        processSaveData.subscribe(data => {
            if (data === 1) {
                this.getChargesData();
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
            }
        });
    }

    onChargesDialogClick = (event) => {
        let sampleList = []
        sampleList = JSON.parse(JSON.stringify(this.chargesTemp));
        if (this.chargesData.length > 0) {
            sampleList.forEach(charge => {
                this.chargesData.forEach(element => {
                    if (charge.chargeId === element.chargeId) {
                        charge.createDatetime = element.createDatetime;
                        charge.select = true;
                    }
                });
            });
        }
        const node = this.chargesGrid.gridOptions.api.getSelectedNodes().length && this.chargesGrid.gridOptions.api.getSelectedNodes()[0];
        let rowIndex = node.rowIndex;
        this.dialogService.openLinkDialog('/CHARGESDLG', sampleList, 50).subscribe(result => {
            if (result) {
                result.forEach((element, index) => {

                    this.chargesGrid.setColumnData('matter', rowIndex, element.matter);
                    this.chargesGrid.setColumnData('description', rowIndex, element.description);
                    this.chargesGrid.setColumnData('code', rowIndex, element.code);
                    this.chargesGrid.setColumnData('act', rowIndex, element.act);
                    this.chargesGrid.setColumnData('outcome', rowIndex, element.outcome);
                    this.chargesGrid.setColumnData('chargeId', rowIndex, element.chargeId);
                    this.chargesGrid.setColumnData('offenderBookId', rowIndex, this.vHeaderBlockModel.offenderBookId);
                    this.chargesGrid.setColumnData('orderId', rowIndex, this.selectedOrdModel.orderId);
                    if (result.length - 1 != index) {
                        this.chargesGrid.addRecord(null);
                    }
                    rowIndex++;
                });
            } else {

            }
        });
    }

    onDetailsDialogClick = (event) => {
        var chargeData = {};
        this.myJsonRowData.forEach(element => {
            if (element.chargeId == event.chargeId) {
                chargeData = element;
                chargeData['fromScreen'] = 'OCDPSREP';
                chargeData['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + "";
            }
        });
        this.dialogService.openLinkDialog('/OCDCHGDT', chargeData, 90).subscribe(charges => {
        });
    }

    detailsEditable = (data: any, index: number, field: string) => {
        if (data.createDatetime != '' && data.createDatetime != undefined) {
            return true;
        } else {
            return false;
        }
    }

    chargeValidate(chargesList: any) {
        try {
            chargesList.forEach((element) => {
                if (element.chargeId == '' || element.chargeId == undefined) {
                    this.show(this.translateService.translate('ocdpsrep.selectcharge'), 'warn');
                    throw new Error();
                }
            });
        } catch (e) {
            return false;
        }
        return true;
    }

    onChargeClear = () => {
        this.getChargesData();
        return true;
    }
    getAllOffences() {
        this.ocdchgsuService.getAllOffences().subscribe(data => {
            if (data.length > 0) {
                this.allOffences = data;
            }
            this.loadJsonData();
        });
    }

    get ordPropCondsInsert() {
        if (this.ordproposalsData.length === 0) {
            return false;
        }
        else if (this.ordproposalsData.length > 0 && ((this.proposalGrid.addedMap && this.proposalGrid.addedMap.size > 0) ||
            (this.proposalGrid.updatedMap && this.proposalGrid.updatedMap.size > 0) || (this.proposalGrid.deletedMap && this.proposalGrid.deletedMap.size > 0))) {
            return false;
        }
        else {
            return true;
        }
    }

    onLaunchClick = (event) => { 
        let inputData = {};
        inputData['recordId'] = event.orderId;
        inputData['recordType'] = 'CRTREP';
        inputData['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
        this.dialogService.openLinkDialog('/OCDINTPA', inputData, 50).subscribe(result => { 

        });
    }

    canReasonSelect = (data: any, index: number, field: string): boolean => {
        if(data && !data.notSuitableFlag){
            this.show(this.translateService.translate('ocdpsrep.checknotsuitablecheckbox'), 'warn');
            return false;
        }
        return true;
    }

    ngOnDestroy(){
        if(!this.router.url.includes('/EOFFENDER')){
            this.eoffenderService.selectedRowData=null;
        }
       
    }
    onEoffenderClick = (data) => {
        this.eoffenderService.selectedRowData=data;
        this.router.navigate( ['/EOFFENDER'], { queryParams: { ['SCREEN'] : data['SCREEN'] } } );
      }
}
