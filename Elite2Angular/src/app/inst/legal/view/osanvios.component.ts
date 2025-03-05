import { Component, OnInit, ViewChild } from '@angular/core';
import { SentenceCalcTypes } from '@cm/courtcasesandorders/maintenance/beans/SentenceCalcTypes';
import { OimsreqsService } from '@cm/courtcasesandorders/maintenance/service/oimsreqs.service';
import { LoginService } from '@common/login/service/login.service';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { TimeFormat } from '@core/ui-components/time/timeFormat';
import { OidsiappService } from '@inst/schedules/service/oidsiapp.service';
import { CourtEvents } from '../../schedules/beans/CourtEvents';
import { CourtEventsCommitBean } from '../../schedules/beans/CourtEventsCommitBean';
import { VOffenderAllSchedules } from '../../schedules/beans/VOffenderAllSchedules';
import { CourtEvnetAppointmentOutcome } from '../beans/CourtEvnetAppointmentOutcome';
import { OffenderCommunitySentense } from '../beans/OffenderCommunitySentense';
import { OcdlegloService } from '../service/ocdleglo.service';
import { OsanviosService } from '../service/osanvios.service';
import { CourtEvnetAppointmentOutcomeCommitBean } from '../beans/CourtEvnetAppointmentOutcomeCommitBean';
import { json } from '@angular-devkit/core';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
import { Router } from '@angular/router';

// import required bean declarations

@Component({
    selector: 'app-osanvios',
    templateUrl: './osanvios.component.html'
})

export class OsanviosComponent implements OnInit {
    @ViewChild('courteventsgrid', { static: true }) courteventsgrid: any;
    @ViewChild('appointmentsgrid', { static: true }) appointmentsgrid: any;
    @ViewChild('prgoutcomegrid', { static: true }) prgoutcomegrid: any;
    @ViewChild('prgAppgrid', { static: true }) prgAppgrid: any;
    @ViewChild('comServicegrid', { static: true }) comServicegrid: any;
    msgs: { message: any; type: any; }[];
    offSentColumnDef: any[];
    offSentData: any[];
    offCourtEventsData: any[];
    offSentIndex: any;
    offCourtEventsIndex: any;
    offAppointOutcomeIndex: any;
    offCourtEventsColumnDef: any[];
    vHeaderBlockModel: any;
    courtEventsGridData: CourtEvents[] = [];
    courtEventsDataTemp1: CourtEvents[] = [];
    courtEventsGridDataTemp: CourtEvents[] = [];
    courtEventModel: CourtEvents = new CourtEvents();
    courtEventSearchModel: CourtEvents = new CourtEvents();
    crtEveInsertList: CourtEvents[] = [];
    crtEveUpdateList: CourtEvents[] = [];
    crtEveCommitModel: CourtEventsCommitBean = new CourtEventsCommitBean();
    isProceed: boolean = true;
    voffschModel: VOffenderAllSchedules = new VOffenderAllSchedules();
    offenderCommunitySentenseSaeach: OffenderCommunitySentense = new OffenderCommunitySentense();
    offenderCommunitySentense: OffenderCommunitySentense = new OffenderCommunitySentense();
    offenderCommunitySentenseData: OffenderCommunitySentense[] = [];
    offschIndex: any;
    datesFlag = false;
    myColDefs: any[];
    dataId: any;
    screenName = 'ocdleglo';
    selectedRow: number;
    initialOcdlegloGridData: any;
    previousCalculationReason: any;
    myJsonRowData: any[];
    myJsonRowDataOriginal: any[];
    currentOcdlegloGridData: any;
    sencalcSearchModel: SentenceCalcTypes = new SentenceCalcTypes();
    sencalcData: SentenceCalcTypes[] = [];
    selectedSentence: any;
    offAppointOutcomeColumnDef: any[];
    courtEvnetAppointmentOutcome: CourtEvnetAppointmentOutcome = new CourtEvnetAppointmentOutcome();
    offAppointOutcomeData: CourtEvnetAppointmentOutcome[] = [];

    crtEventAppointOutInsertList: CourtEvnetAppointmentOutcome[] = [];
    crtEventAppointOutUpdateList: CourtEvnetAppointmentOutcome[] = [];
    crtEventAppointOutCommitModel: CourtEvnetAppointmentOutcomeCommitBean = new CourtEvnetAppointmentOutcomeCommitBean();
    defaultCanReason: String;
    cancelFlagCheck: boolean;
    screenId = 'OSANVIOS';
    offProgOutcomeColumnDef: any[];
    offProgOutcomeIndex = -1;
    offProgOutcomeData: CourtEvnetAppointmentOutcome[] = [];
    offProgOutcomeModel: CourtEvnetAppointmentOutcome = new CourtEvnetAppointmentOutcome();
    offProgAppointmentColumnDef: any[];
    offProgAppointmentIndex = -1;
    offProgAppointmentData: CourtEvnetAppointmentOutcome[] = [];
    offProgAppointmentModel: CourtEvnetAppointmentOutcome = new CourtEvnetAppointmentOutcome();

    commServiceColumnDef: any[];
    commServiceIndex = -1;
    commServiceData: CourtEvnetAppointmentOutcome[] = [];
    commServiceModel: CourtEvnetAppointmentOutcome = new CourtEvnetAppointmentOutcome();
    recordtype: any;
    osanviosMatterText = '';
    isSingleSaveBtnDisable: boolean = true;
    constructor(private osanviosFactory: OsanviosService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private dialogService: DialogService, private oidsiappFactory: OidsiappService, public loginService: LoginService, private OcdlegloFactory: OcdlegloService,
        private oimsreqsFactory: OimsreqsService,private eoffenderService: EoffenderService,private router: Router) {
        this.myColDefs = [];
        this.offSentColumnDef = [];
        this.offCourtEventsColumnDef = [];
        this.offAppointOutcomeColumnDef = [];
    }
    ngOnInit() {
        this.getDefaultCancellationReason();
        this.loadColDefData();
        this.cancelFlagCheck = true;
        this.myJsonRowDataOriginal = [];
        this.offCourtEventsData = [];
        this.offAppointOutcomeData = [];
        this.offCourtEventsColumnDef = [

            {
                fieldName: this.translateService.translate('osanvios.hearingreason'), required: true, editable: true, link: 'osanvios/hearingreasonRecordGroup', source: 'OUMEMOVE',
                field: 'hearingReason', datatype: 'lov', width: 150
            },
            { fieldName: this.translateService.translate('osanvios.eventdate'), field: 'eventDate', editable: true, width: 150, datatype: 'date', required: true, cellEditable: this.commCellEditable, },
            { fieldName: this.translateService.translate('osanvios.time'), field: 'startTime', editable: true, width: 150, datatype: 'time', required: true },

            {
                fieldName: this.translateService.translate('osanvios.court'), required: true, source: 'OUMAGLOC',
                field: 'court', editable: true, width: 150, datatype: 'lov', link: 'osanvios/populateCourtData'
            },
            {
                fieldName: this.translateService.translate('osanvios.appearancetype'), required: true, editable: true, domain: 'CRT_APP_TYPE',
                field: 'appearanceType', datatype: 'lov', width: 130,
            },

            {
                fieldName: this.translateService.translate('osanvios.matters'), required: false, editable: true,
                field: 'matter', datatype: 'text', width: 130, maxlength: 150, uppercase: 'false', hide: true
            },
            {
                fieldName: this.translateService.translate('osanvios.comment'), uppercase: 'false',
                field: 'commentText', datatype: 'text', editable: true, width: 130, maxlength: 240
            },
            {
                fieldName: this.translateService.translate('osanvios.recommendedsanctioncount'), field: 'recommendedSanctionCount', editable: true, width: 150, datatype: 'number', minValue: '0',
                maxValue: '999999', strictFP: true, whole: true
            },
            {
                fieldName: this.translateService.translate('osanvios.recommendedrewardcount'), field: 'recommendedRewardCount', editable: true, width: 150, datatype: 'number', minValue: '0',
                maxValue: '999999', strictFP: true, whole: true
            },
            {
                fieldName: this.translateService.translate('osanvios.cancel'),
                field: 'cancelFlag', datatype: 'checkbox', width: 130, cellEditable: this.callEditableCancelField,
            },
            {
                fieldName: this.translateService.translate('osanvios.outcomeReason'),
                field: 'outcomeReasonCode', datatype: 'lov', width: 130, domain: 'CRT_CAN_RSN', cellEditable: this.cellEditableReason,
            },
            {
                fieldName: '', field: 'aButton', datatype: 'hyperlink', displayas: 'href',
                width: 150, data: 'row', updateField: 'row', modal: true, dialogWidth: 75,
                onLaunchClick: this.aLaunchClick, styleClass: 'edit', type: '',
            },
            {
                fieldName: this.translateService.translate('common.iwpdocument')
                , field: 'butIwp', datatype: 'hyperlink',onLaunchClick: this.onEoffenderClick,
                editable: true, displayas: 'href', styleClass: 'file_copy',
                width: 50, data: 'row', updateField: 'row', modal: false, queryparam: 'SCREEN'
            },
            {
                fieldName: '', field: 'commentText', hide: true
            },
            {
                fieldName: '', field: 'commentTextTemp', hide: true
            },
            {
                fieldName: '', field: 'eventStatus', hide: true
            },
            {
                fieldName: ' ', field: 'rembutton', datatype: 'launchbutton', editable: true, width: 100,
                data: 'row', updateField: 'row', modal: true, onLaunchClick: this.onConflictLaunchEdit
            }
        ];


        this.offAppointOutcomeColumnDef = [
            {
                fieldName: this.translateService.translate('osanvios.date'), field: 'eventDate', editable: false, width: 150, datatype: 'date'
            },
            { fieldName: this.translateService.translate('osanvios.starttime'), field: 'startTime', editable: false, width: 150, datatype: 'time' },
            { fieldName: this.translateService.translate('osanvios.endtime'), field: 'endTime', editable: false, width: 150, datatype: 'time' },
            {
                fieldName: this.translateService.translate('osanvios.location'), field: 'toAgyLocId', link: 'ocdclogs/rgLocationRecordGroup',
                editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('osanvios.scheduletype'), field: 'eventType', link: 'ocdclogs/rgScheduleTypeRecordGroup',
                editable: false, width: 150, datatype: 'lov',
            },
            {
                fieldName: this.translateService.translate('osanvios.schedulesubtype'), field: 'eventSubType',
                editable: false, width: 150, datatype: 'lov', link: 'ocdclogs/rgScheduleSubTypeRecordGroup?eventType=', parentField: 'eventType'
            },
            {
                fieldName: this.translateService.translate('osanvios.outcome'), field: 'eventOutcome', editable: false, width: 150, datatype: 'lov', link: 'ocdclogs/rgEventOutcomeRecordGroup?threeip=', parentField: 'threeip'
            },
            {
                fieldName: this.translateService.translate('osanvios.recsanctionsrewardscount'), field: 'recordSanctionRewardCount', editable: true, width: 150, datatype: 'number', minValue: '0',
                maxValue: '999999', strictFP: true, whole: true
            },
            {
                fieldName: this.translateService.translate('osanvios.counttype'), field: 'countType', editable: true, width: 150, datatype: 'lov', domain: 'COUNT_TYPE', cellEditable: this.canAlertEdit
            },
            {
                fieldName: this.translateService.translate('osanvios.linkcourtevent'), field: 'linkFlag', width: 150, datatype: 'checkbox', cellEditable: this.canAlertEdit
            },
            {
                fieldName: this.translateService.translate('osanvios.courteventdate'), field: 'courtEventDate', editable: false, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('osanvios.adjourned'), field: 'adjournedFlag', editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: '', field: 'aButton', datatype: 'hyperlink', displayas: 'href',
                width: 150, data: 'row', updateField: 'row', modal: true, dialogWidth: 75,
                onLaunchClick: this.bLaunchClick, styleClass: 'edit', type: '',
            },
            {
                fieldName: '', field: 'commentText', hide: true
            },
            {
                fieldName: '', field: 'commentTextTemp', hide: true
            },
        ];
        this.offProgOutcomeColumnDef = [
            {
                fieldName: this.translateService.translate('osanvios.program'), field: 'programDesc', editable: false, width: 150, datatype: 'text'
            },
            { fieldName: this.translateService.translate('osanvios.occurencecode'), field: 'activityDesc', editable: false, width: 150, datatype: 'text' },
            {
                fieldName: this.translateService.translate('osanvios.date'), field: 'eventDate', editable: false, width: 150, datatype: 'date'
            },
            { fieldName: this.translateService.translate('osanvios.starttime'), field: 'startTime', editable: false, width: 150, datatype: 'time' },
            { fieldName: this.translateService.translate('osanvios.endtime'), field: 'endTime', editable: false, width: 150, datatype: 'time' },


            {
                fieldName: this.translateService.translate('osanvios.attendance'), field: 'eventOutcome', editable: false, width: 150, datatype: 'lov', link: 'ocdclogs/rgEventOutcomeRecordGroup?threeip=', parentField: 'threeip'
            },
            {
                fieldName: this.translateService.translate('osanvios.recommendedsanctionsrewardscount'), field: 'recordSanctionRewardCount', editable: true, width: 150, datatype: 'number', minValue: '0',
                maxValue: '999999', strictFP: true, whole: true
            },
            {
                fieldName: this.translateService.translate('osanvios.counttype'), field: 'countType', editable: true, width: 150, datatype: 'lov', domain: 'COUNT_TYPE', cellEditable: this.canAlertEdit
            },
            {
                fieldName: this.translateService.translate('osanvios.linkcourtevent'), field: 'linkFlag', width: 150, datatype: 'checkbox', cellEditable: this.canAlertEdit
            },
            {
                fieldName: this.translateService.translate('osanvios.courteventdate'), field: 'courtEventDate', editable: false, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('osanvios.adjourned'), field: 'adjournedFlag', editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: '', field: 'commentText', hide: true
            },
            {
                fieldName: '', field: 'commentTextTemp', hide: true
            },

        ];
        this.offProgAppointmentColumnDef = [
            {
                fieldName: this.translateService.translate('osanvios.type'), field: 'programDesc', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('osanvios.date'), field: 'eventDate', editable: false, width: 150, datatype: 'date'
            },
            { fieldName: this.translateService.translate('osanvios.starttime'), field: 'startTime', editable: false, width: 150, datatype: 'time' },
            { fieldName: this.translateService.translate('osanvios.endtime'), field: 'endTime', editable: false, width: 150, datatype: 'time' },


            {
                fieldName: this.translateService.translate('osanvios.attendance'), field: 'eventOutcome', editable: false, width: 150, datatype: 'lov', link: 'ocdclogs/rgEventOutcomeRecordGroup?threeip=', parentField: 'threeip'
            },
            {
                fieldName: this.translateService.translate('osanvios.recommendedsanctionsrewardscount'), field: 'recordSanctionRewardCount', editable: true, width: 150, datatype: 'number', minValue: '0',
                maxValue: '999999', strictFP: true, whole: true
            },
            {
                fieldName: this.translateService.translate('osanvios.counttype'), field: 'countType', editable: true, width: 150, datatype: 'lov', domain: 'COUNT_TYPE', cellEditable: this.canAlertEdit
            },
            {
                fieldName: this.translateService.translate('osanvios.linkcourtevent'), field: 'linkFlag', width: 150, datatype: 'checkbox', cellEditable: this.canAlertEdit
            },
            {
                fieldName: this.translateService.translate('osanvios.courteventdate'), field: 'courtEventDate', editable: false, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('osanvios.adjourned'), field: 'adjournedFlag', editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: '', field: 'commentText', hide: true
            },
            {
                fieldName: '', field: 'commentTextTemp', hide: true
            },

        ];

        this.commServiceColumnDef = [
            {
                fieldName: this.translateService.translate('osanvios.projectdescription'), field: 'programDesc', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('osanvios.date'), field: 'eventDate', editable: false, width: 150, datatype: 'date'
            },
            { fieldName: this.translateService.translate('osanvios.starttime'), field: 'startTime', editable: false, width: 150, datatype: 'time' },
            { fieldName: this.translateService.translate('osanvios.endtime'), field: 'endTime', editable: false, width: 150, datatype: 'time' },


            {
                fieldName: this.translateService.translate('osanvios.attendance'), field: 'eventOutcome', editable: false, width: 150, datatype: 'lov', link: 'ocdclogs/rgEventOutcomeRecordGroup?threeip=', parentField: 'threeip'
            },
            {
                fieldName: this.translateService.translate('osanvios.recommendedsanctionsrewardscount'), field: 'recordSanctionRewardCount', editable: true, width: 150, datatype: 'number', minValue: '0',
                maxValue: '999999', strictFP: true, whole: true
            },
            {
                fieldName: this.translateService.translate('osanvios.counttype'), field: 'countType', editable: true, width: 150, datatype: 'lov', domain: 'COUNT_TYPE', cellEditable: this.canAlertEdit
            },
            {
                fieldName: this.translateService.translate('osanvios.linkcourtevent'), field: 'linkFlag', width: 150, datatype: 'checkbox', cellEditable: this.canAlertEdit
            },
            {
                fieldName: this.translateService.translate('osanvios.courteventdate'), field: 'courtEventDate', editable: false, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('osanvios.adjourned'), field: 'adjournedFlag', editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: '', field: 'commentText', hide: true
            },
            {
                fieldName: '', field: 'commentTextTemp', hide: true
            },

        ];

        const serviceObj = this.oimsreqsFactory.senCalcExecuteQuery(this.sencalcSearchModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.sencalcData = [];
                return;
            } else {
                data.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    element.sanctionsFlag = element.sanctionsFlag === 'Y' ? true : false;
                });
                this.sencalcData = data;

            }
            
        });
        
    }
    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (data.recordSanctionRewardCount === undefined || data.recordSanctionRewardCount === null) {
            return false;
        } else {
            return true;
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


    onOffenderChange(offender) {
        if (offender) {
            this.vHeaderBlockModel = offender;
            this.loadJsonData();

            //this.appointMentsData();
        } else {
            this.myJsonRowDataOriginal = [];
            this.offCourtEventsData = [];
            this.offAppointOutcomeData = [];
            this.courtEventModel = new CourtEvents();
            this.courtEvnetAppointmentOutcome = new CourtEvnetAppointmentOutcome();
            this.datesFlag = false;
            this.offProgAppointmentData = [];
            this.offProgOutcomeData = [];
            this.commServiceData = [];
            this.commServiceModel = new CourtEvnetAppointmentOutcome();
            this.offProgOutcomeModel = new CourtEvnetAppointmentOutcome();
            this.offProgAppointmentModel = new CourtEvnetAppointmentOutcome();
        }
    }


    loadColDefData() {
        const data = this.loginService.mainColDefData;
        let datatypeData = [];
        data.forEach(gridDef => {
            if (gridDef.grid_name == 'sanctions' && gridDef.module_name == 'OSANVIOS') {
                datatypeData = JSON.parse(gridDef.configData);
            }
        })
        this.myColDefs = [];
        this.prepareColDef(datatypeData).forEach(key => this.myColDefs.push(key));
    }


    prepareColDef(coldefJson) {
        let colDefs = [];
        coldefJson.forEach(type => {
            if (type.dataType === 'lov' && type.source === 'link') {
                let lovRendered = 'description';
                if (type.field == 'court') {
                    lovRendered = 'code'
                }
                colDefs.push({ datatype: type.dataType, lovRender: lovRendered, source: type.sourceType, suppressMenu: true, link: type.url, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required, parentFields: type.parentFields })
            }
            else if (type.dataType === 'lov' && type.source === 'domain') {
                colDefs.push({ datatype: type.dataType, domain: type.url, suppressMenu: true, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
            }
            else if (type.dataType === 'text') {
                colDefs.push({ datatype: type.dataType, wrapText: true, width: 80, suppressMenu: true, hide: type.hide, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
            }
            else if (type.dataType === 'number') {
                colDefs.push({ datatype: type.dataType, whole: type.whole ? type.whole : false, maxValue: type.maxValue ? type.maxValue : undefined, width: 40, suppressMenu: true, hide: type.hide, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
            }
            else if (type.dataType === 'launchbutton') {
                colDefs.push({ datatype: type.dataType, width: 100, parentField: type.parentField, suppressMenu: true, field: type.field, fieldName: '', required: type.required, link: type.link, updateField: 'row', modal: true, data: 'row', dialogWidth: '80%' })
            }
            else if (type.dataType === 'hyperlink') {

                colDefs.push({ datatype: 'hyperlink', width: 50, displayas: 'image', suppressMenu: true, parentField: type.parentField, required: type.required, fieldName: '', field: type.field, link: type.link, updateField: 'row', modal: true, data: 'row', dialogWidth: '80%' })
            }
            else if (type.dataType === 'date' && type.field === 'orderedDate') {
                colDefs.push({ datatype: type.dataType, field: type.field, fieldName: this.translateService.translate(type.fieldName), width: 100, suppressMenu: true, editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
            }
            else if (type.dataType === 'date') {
                colDefs.push({ datatype: type.dataType, suppressMenu: true, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
            }
            else if (type.dataType === 'checkbox') {
                colDefs.push({ datatype: type.dataType, width: 40, field: type.field, fieldName: this.translateService.translate(type.fieldName), suppressMenu: true, editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
            }
        });
        return colDefs;
    }


    onRowClickoffSent(event) {
        this.selectedSentence = event;
        this.offCourtEventsDataRetrieve();
    }


    offCourtEventsDataRetrieve() {
        if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && (this.selectedSentence && this.selectedSentence.orderNo && this.selectedSentence.sentenceCalcType)) {
            this.courtEventSearchModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.courtEventSearchModel.sentenseSeq = this.selectedSentence.orderNo;
            this.courtEventSearchModel.orderType = this.selectedSentence.sentenceCalcType;
            const objdata = this.osanviosFactory.offCourtEventsDataRetrieve(this.courtEventSearchModel);
            objdata.subscribe(data => {
                if (data) {
                    this.offCourtEventsData = data;
                    this.offCourtEventsData.forEach(obj => {
                        obj.cancelFlag = (obj.eventStatus === 'CANC') ? true : false;
                        obj.originalEventDate = obj.eventDate;
                        obj['aButton'] = '';
                        obj.commentTextTemp = obj.commentText;
                        obj.matter = obj.matter;
                        obj.additionalCountsCommentTemp = obj.additionalCountsComment;
                        obj['butIwp'] = '';
                        obj['SCREEN'] = this.screenId + "~" + "true" + "~" + obj['eventId'];
                        obj['rembutton'] = (this.sessionManager.currentCaseLoadType === 'COMM') ? (this.translateService.translate('osanvios.reminder')) : '';

                    })
                    this.courtEventsDataTemp1 = JSON.parse(JSON.stringify(data));
                    this.courtEventsGridDataTemp = JSON.parse(JSON.stringify(data));
                    this.courtEventModel = data[0];
                    this.offCourtEventsIndex = 0;
                } else {
                    this.offCourtEventsData = [];
                    this.courtEventsDataTemp1 = [];
                }
            })
        }
    }


    onRowClickoffCourtEvents(event) {
        if (event) {
            const selectedNode = this.courteventsgrid.gridOptions.api.getSelectedNodes()[0];
            this.offCourtEventsIndex = selectedNode.rowIndex;
            this.courtEventModel = event;
            this.eoffenderService.selectedRowData=event;
            this.appointMentsData();
            this.progOutcomeExecuteQuery();
            this.progAppointmentExecuteQuery();
            this.comserviceExecuteQuery();
            if (this.datesFlag) {
                this.show(this.translateService.translate('oidsiapp.eventdatevalidation'), 'warn');
                return false;
            }

            const node = this.courteventsgrid.gridOptions.api.getSelectedNodes().length && this.courteventsgrid.gridOptions.api.getSelectedNodes()[0];
            if (node) {
                if (!this.isProceed && this.offschIndex != node.childIndex) {
                    this.dialogService.openLinkDialog('/oiuscinq', this.voffschModel).subscribe(result => {
                        if (!result) {
                            this.isProceed = false;
                            return false;
                        } else {
                            this.isProceed = true;
                            return true;
                        }
                    });
                }
                if(node.data){
                    if(node.data.matter){
                        this.osanviosMatterText = node.data.matter;
                    } else if (!node.data.matter) {
                        this.osanviosMatterText = null;
                    }
                }
            }
        } else {
            this.offProgAppointmentData = [];
            this.offProgOutcomeData = [];
            this.commServiceData = [];
            this.eoffenderService.selectedRowData=null;
            this.commServiceModel = new CourtEvnetAppointmentOutcome();
            this.offProgOutcomeModel = new CourtEvnetAppointmentOutcome();
            this.offProgAppointmentModel = new CourtEvnetAppointmentOutcome();
        }
        if (this.isProceed) {
            if (event) {
                this.offschIndex = event.rowIndex;
                return true;
            }
        }


    }
    appointMentsData() {
        if (this.vHeaderBlockModel.offenderBookId && this.courtEventModel.eventDate) {
            this.courtEvnetAppointmentOutcome.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.courtEvnetAppointmentOutcome.courtEventDate = this.courtEventModel.eventDate;
            this.courtEvnetAppointmentOutcome.courtEventId = this.courtEventModel.eventId;
            this.osanviosFactory.appointMentsData(this.courtEvnetAppointmentOutcome).subscribe(data => {
                if (data.length > 0) {
                    data.forEach(element => {
                        element.threeip = element.eventType + ',' + element.eventSubType + ',' + element.unexcusedAbsenceFlag;
                        element.linkFlag = element.linkFlag === 'Y' ? true : false;
                        element.adjournedFlag = element.adjournedFlag === 'Y' ? true : false;
                        element['aButton'] = '';
                        element['commentTextTemp'] = element.commentText;
                        element.recordType = 'COMM_SCHD';
                        if(element.linkFlag){
                            element.courtEventDate = this.courtEventModel.eventDate;
                        }
                    });
                    this.offAppointOutcomeData = data;
                    this.courtEvnetAppointmentOutcome = data[0];
                    this.offAppointOutcomeIndex = 0;
                    this.cancelFlagCheck = true;
                    if (this.offAppointOutcomeData && this.offAppointOutcomeData.length > 0) {
                        for (let i = 0; i < this.offAppointOutcomeData.length; i++) {
                            if (this.offAppointOutcomeData[i].eventOutcome) {
                                this.cancelFlagCheck = false;
                                break;
                            }
                        }
                    }
                } else {
                    this.cancelFlagCheck = true;
                    this.offAppointOutcomeData = [];
                    this.courtEvnetAppointmentOutcome = new CourtEvnetAppointmentOutcome();
                }
            });
        }

    }
    onRowClickoffAppointOutcome(event) {
        if (event) {
            this.courtEvnetAppointmentOutcome = event;
        }
    }

    ocdenforSaveoffoffAppointOutcomeForm(event) {
        this.recordtype= undefined;
        this.crtEventAppointOutInsertList = [];
        this.crtEventAppointOutUpdateList = [];
        this.crtEventAppointOutCommitModel.insertList = [];
        this.crtEventAppointOutCommitModel.updateList = [];



        event.updated.forEach(element => {
            if (element.courtEvntSanctDtlId) {
                this.crtEventAppointOutUpdateList.push(element);
            } else {
                element.commentText = element.commentTextTemp;
                this.crtEventAppointOutInsertList.push(element);
            }
        });

        if (this.crtEventAppointOutInsertList.length > 0) {
            this.recordtype = this.crtEventAppointOutInsertList[0].recordType;
            for (let i = 0; i < this.crtEventAppointOutInsertList.length; i++) {
                if (this.crtEventAppointOutInsertList[i].linkFlag && (this.crtEventAppointOutInsertList[i].recordSanctionRewardCount === undefined || this.crtEventAppointOutInsertList[i].recordSanctionRewardCount === null)) {
                    this.show(this.translateService.translate('osanvios.recordsanctioncountmustentertolinkoutcome'), 'warn');
                    return false;
                }
                if(this.crtEventAppointOutInsertList[i].recordSanctionRewardCount && !this.crtEventAppointOutInsertList[i].countType){
                    this.show(this.translateService.translate('osanvios.counttypemustbeentered'), 'warn');
                    return false;
                }
                this.crtEventAppointOutInsertList[i].courtEventId = this.courtEventModel.eventId;
                this.crtEventAppointOutInsertList[i].sessionEventId = this.crtEventAppointOutInsertList[i].eventId;
                this.crtEventAppointOutInsertList[i].adjournedFlag = this.crtEventAppointOutInsertList[i].adjournedFlag ? 'Y' : 'N';
                this.crtEventAppointOutInsertList[i].linkFlag = this.crtEventAppointOutInsertList[i].linkFlag ? 'Y' : 'N';
            }
            this.crtEventAppointOutCommitModel.insertList = this.crtEventAppointOutInsertList;
        }
        if (this.crtEventAppointOutUpdateList.length > 0) {
            this.recordtype = this.crtEventAppointOutUpdateList[0].recordType;
            for (let i = 0; i < this.crtEventAppointOutUpdateList.length; i++) {

                if (this.crtEventAppointOutUpdateList[i].linkFlag && (this.crtEventAppointOutUpdateList[i].recordSanctionRewardCount === undefined || this.crtEventAppointOutUpdateList[i].recordSanctionRewardCount === null)) {
                    this.show(this.translateService.translate('osanvios.recordsanctioncountmustentertolinkoutcome'), 'warn');
                    return false;
                }
                if(this.crtEventAppointOutUpdateList[i].recordSanctionRewardCount && !this.crtEventAppointOutUpdateList[i].countType){
                    this.show(this.translateService.translate('osanvios.counttypemustbeentered'), 'warn');
                    return false;
                }
                this.crtEventAppointOutUpdateList[i].courtEventId = this.courtEventModel.eventId;
                this.crtEventAppointOutUpdateList[i].sessionEventId = this.crtEventAppointOutUpdateList[i].eventId;

                this.crtEventAppointOutUpdateList[i].adjournedFlag = this.crtEventAppointOutUpdateList[i].adjournedFlag ? 'Y' : 'N';
                this.crtEventAppointOutUpdateList[i].linkFlag = this.crtEventAppointOutUpdateList[i].linkFlag ? 'Y' : 'N';

            }
            this.crtEventAppointOutCommitModel.updateList = this.crtEventAppointOutUpdateList;
        }

        const crtEveSaveData = this.osanviosFactory.crtEventAppointmentCommit(this.crtEventAppointOutCommitModel);
        crtEveSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                if(this.recordtype === 'COMM_SCHD'){
                    this.appointMentsData();
                }else if(this.recordtype === 'COMM_PRG_APP'){
                    this.progAppointmentExecuteQuery();
                }else if(this.recordtype === 'COMM_PRG'){
                    this.progOutcomeExecuteQuery();
                }else if(this.recordtype === 'COMM_SRV'){
                    this.comserviceExecuteQuery();
                }
            }
            else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                if(data.recordType === 'COMM_SCHD'){
                    this.appointMentsData();
                }else if(data.recordType === 'COMM_PRG_APP'){
                    this.progAppointmentExecuteQuery();
                }else if(data.recordType === 'COMM_PRG'){
                    this.progOutcomeExecuteQuery();
                }else if(data.recordType === 'COMM_SRV'){
                    this.comserviceExecuteQuery();
                }
            }
        });

    }





    retriveSentenceData() {
        if (this.vHeaderBlockModel.offenderBookId) {
            this.offenderCommunitySentense.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.osanviosFactory.retriveSentenceData(this.vHeaderBlockModel).subscribe(data => {
                if (data && data.length > 0) {
                    this.offenderCommunitySentenseData = data;
                    this.offenderCommunitySentense = data[0];
                    this.offSentIndex = 0;
                } else {
                    this.offenderCommunitySentenseData = [];
                }
            });
        }
    }




    crtEventExtBtn() {
        this.crtEveCommitModel = new CourtEventsCommitBean();
        const crtEveEvent = { added: [], updated: [], removed: [] };
        if (this.courteventsgrid) {
            const added = [];
            this.courteventsgrid.addedMap.forEach(key => {
                added.push(key);
            });
            const updated = [];
            this.courteventsgrid.updatedMap.forEach(value => {
                updated.push(value);
            });
            const removed = [];
            this.courteventsgrid.removedMap.forEach((value, keys) => {
                removed.push(value);
            });
            crtEveEvent.added = JSON.parse(JSON.stringify(added));
            crtEveEvent.updated = JSON.parse(JSON.stringify(updated));
            crtEveEvent.removed = JSON.parse(JSON.stringify(removed));
        }
        
        if (crtEveEvent.added.length > 0 || crtEveEvent.updated.length > 0 || crtEveEvent.removed.length > 0) {
            this.ocdenforSaveoffoffCourtEventsForm(crtEveEvent);
        }

    }
    
    ocdenforSaveoffoffCourtEventsForm(event) {
        this.crtEveInsertList = [];
        this.crtEveUpdateList = [];
        this.crtEveCommitModel.insertList = [];
        this.crtEveCommitModel.updateList = [];
        this.crtEveUpdateList = event.updated;
        this.crtEveInsertList = event.added;
        if (!this.validateConflict()) {
            return;
        }
        if (!this.offdetValidate(this.crtEveUpdateList)) {
            return;
        }

        if (!this.offdetValidate(this.crtEveInsertList)) {
            return;
        }
        if (this.crtEveInsertList.length > 0) {
            for (let i = 0; i < this.crtEveInsertList.length; i++) {
                this.crtEveInsertList[i].eventStatus = 'SCH';
                this.crtEveInsertList[i].nextEventRequestFlag = 'N';
                this.crtEveInsertList[i].orderRequestedFlag = 'N';
                this.crtEveInsertList[i].directionCode = 'OUT';
                this.crtEveInsertList[i].holdFlag = 'N';
                this.crtEveInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.crtEveInsertList[i].courtEventType = this.sessionManager.currentCaseLoadType;
                this.crtEveInsertList[i].sentenseSeq = this.selectedSentence.orderNo;
                this.crtEveInsertList[i].orderType = this.selectedSentence.sentenceCalcType;
                this.crtEveInsertList[i].matter = this.osanviosMatterText;
                this.crtEveInsertList[i].commentText = this.crtEveInsertList[i].commentText;
                this.crtEveInsertList[i].additionalCountsComment = this.crtEveInsertList[i].additionalCountsCommentTemp;
                this.crtEveInsertList[i].startTime = TimeFormat.parse(TimeFormat.format(this.crtEveInsertList[i].startTime),
                    this.crtEveInsertList[i].eventDate);
            }
            this.crtEveCommitModel.insertList = this.crtEveInsertList;
        }
        if (this.crtEveUpdateList.length > 0) {
            for (let i = 0; i < this.crtEveUpdateList.length; i++) {
                this.crtEveUpdateList[i].matter = this.osanviosMatterText;
                this.crtEveUpdateList[i].commentText = this.crtEveUpdateList[i].commentText;
                this.crtEveUpdateList[i].startTime = TimeFormat.parse(TimeFormat.format(this.crtEveUpdateList[i].startTime),
                    this.crtEveUpdateList[i].eventDate);
            }
            this.crtEveCommitModel.updateList = this.crtEveUpdateList;
        }
        this.courtEventSave();

    }



    courtEventSave() {
        const crtEveSaveData = this.osanviosFactory.crtEveCommit(this.crtEveCommitModel);
        crtEveSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.offCourtEventsDataRetrieve();
            }
            else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.offCourtEventsDataRetrieve();
            }
        });
    }


    validateConflict() {
        if (!this.isProceed) {
            this.dialogService.openLinkDialog('/oiuscinq', this.voffschModel).subscribe(result => {
                if (!result) {
                    this.isProceed = false;
                    return false;
                } else {
                    this.isProceed = true;
                    return true;
                }
            });
        } else {
            return true;
        }
    }

    onCourtEventsGridInsert = () => {
        const node = this.courteventsgrid.gridOptions.api.getSelectedNodes()[0];
        if (node && this.offCourtEventsIndex){
          this.isSingleSaveBtnDisable = false;
          this.osanviosMatterText = null;
        }
        if (this.datesFlag) {
            this.show(this.translateService.translate('oidsiapp.eventdatevalidation'), 'warn');
            return false;
        }
        if (!this.isProceed) {
            this.dialogService.openLinkDialog('/oiuscinq', this.voffschModel).subscribe(result => {
                if (!result) {
                    this.isProceed = false;
                    return false;
                } else {
                    this.isProceed = true;
                    return {
                        'offenderBookId': this.vHeaderBlockModel.offenderBookId,
                        'rembutton': ''
                    }
                }
            });
        } else {
            return {
                'offenderBookId': this.vHeaderBlockModel.offenderBookId,
                'rembutton': ''
            }
        }

    }


    onValidateRow = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;
        if (this.datesFlag && this.offschIndex !== event.rowIndex) {
            this.show(this.translateService.translate('oidsiapp.eventdatevalidation'), 'warn');
            rowdata.data = {
                eventDate: event.data.eventDate, court: event.data.court,
                startTime: event.data.startTime,
                hearingReason: event.data.hearingReason, appearanceType: event.data.appearanceType,
                matter: event.data.matter,
                commentText: event.data.commentText, conflictFlag: event.data.conflictFlag, originalEventDate: event.data.originalEventDate
            };
            rowdata.validated = true;
            return rowdata;
        }

        if (event.field === 'eventDate') {
            if (event.data.eventDate) {
                if (DateFormat.compareDate(DateFormat.getDate(event.data.eventDate), DateFormat.getDate()) < 0) {
                    this.datesFlag = true;
                    this.isProceed = true;
                    this.offschIndex = event.rowIndex;
                    this.show(this.translateService.translate('oidsiapp.eventdatevalidation'), 'warn');
                    rowdata.data = {
                        eventDate: event.data.eventDate, court: event.data.court,
                        startTime: event.data.startTime,
                        hearingReason: event.data.hearingReason, appearanceType: event.data.appearanceType,
                        appearanceLocation: event.data.appearanceLocation, matter: event.data.matter,
                        commentText: event.data.commentText, conflictFlag: event.data.conflictFlag, originalEventDate: event.data.originalEventDate
                    };
                    rowdata.validated = true;
                    return rowdata;
                }

                if (!event.data.eventId ||
                    (DateFormat.compareDate(DateFormat.getDate(event.oldValue), DateFormat.getDate(event.newValue)) !== 0 && DateFormat.compareDate(DateFormat.getDate(event.data.originalEventDate), DateFormat.getDate(event.newValue)) !== 0)) {
                    this.voffschModel = new VOffenderAllSchedules();
                    this.offschIndex = event.rowIndex;
                    this.voffschModel.eventDate = event.data.eventDate;
                    this.voffschModel.offenderBookId = event.data.offenderBookId;
                    const offschCheckConflit = this.oidsiappFactory.checkScheduleConflict(this.voffschModel);
                    offschCheckConflit.subscribe(checkConflict => {
                        if (checkConflict > 0) {
                            this.dialogService.openLinkDialog('/oiuscinq', this.voffschModel).subscribe(result => {
                                if (!result) {
                                    this.isProceed = false;
                                    return false;
                                } else {
                                    this.isProceed = true;
                                }
                            });
                        } else {
                            this.isProceed = true;
                        }
                    });
                } else if ((DateFormat.compareDate(DateFormat.getDate(event.data.originalEventDate), DateFormat.getDate(event.newValue)) === 0)) {
                    this.isProceed = true;
                }
            }
        }

        if (event.field === 'cancelFlag') {
            if (event.data.cancelFlag && event.data.countOutcomeReason === 1) {
                this.courteventsgrid.setColumnData('cancelFlag', rowIndex, false);
                this.show(this.translateService.translate('osanvios.cannotCancelEvent'), 'warn');
                rowdata.validated = true;
                return rowdata;
            }
            else if (event.data.cancelFlag) {
                this.courteventsgrid.requiredOn('outcomeReasonCode');
                this.courteventsgrid.setColumnData('outcomeReasonCode', rowIndex, this.defaultCanReason !== null ? this.defaultCanReason : undefined);
                this.courteventsgrid.setColumnData('eventStatus', rowIndex, 'CANC');
            }
            else {
                this.courteventsgrid.requiredOff('outcomeReasonCode');
                this.courteventsgrid.setColumnData('outcomeReasonCode', rowIndex, undefined);
                this.courteventsgrid.setColumnData('eventStatus', rowIndex, 'SCH');
            }
        }
        if (event && event.field){
            if (event.data){
                this.isSingleSaveBtnDisable = false;
            } else {
                this.isSingleSaveBtnDisable = true;
            }
        }
        if (event.data){
            if (event.data.matter){
                this.osanviosMatterText = event.data.matter;
            } else {
                this.osanviosMatterText = '';
            }
        }

        this.datesFlag = false;
        rowdata.validated = true;
        return rowdata;
    }




    commCellEditable = (data: any, index: number, field: string): boolean => {
        if (field !== 'eventDate' || (field === 'eventDate' && this.offschIndex != index)) {
            if (this.datesFlag) {
                this.show(this.translateService.translate('oidsiapp.eventdatevalidation'), 'warn');
                return false;
            }
            if (!this.isProceed) {
                this.dialogService.openLinkDialog('/oiuscinq', this.voffschModel).subscribe(result => {
                    if (!result) {
                        this.isProceed = false;
                        return false;
                    } else {
                        this.isProceed = true;
                        return true;
                    }
                });
                return false;
            }
        }
        if (data) {
            if (data.eventId && DateFormat.compareDate(DateFormat.getDate(data.originalEventDate), DateFormat.getDate()) === 0) {
                return true;
            } else if ((data.eventId && DateFormat.compareDate(DateFormat.getDate(data.originalEventDate), DateFormat.getDate()) === 1) || !data.eventId && DateFormat.compareDate(DateFormat.getDate(data.eventDate), DateFormat.getDate()) === 1) {
                return true;
            } else if ((!data.eventId && DateFormat.compareDate(DateFormat.getDate(data.eventDate), DateFormat.getDate()) === -1) || (!data.eventId && DateFormat.compareDate(DateFormat.getDate(data.eventDate), DateFormat.getDate()) === 0)) {
                return true;
            }
        } else {
            return false;
        }
    }
    onClear = () => {
        this.isProceed = true;
        this.datesFlag = false;
        this.isSingleSaveBtnDisable = true;
        return true;
    }

    offdetValidate(courtEvents: any) {
        const is = { valid: true }
        for (let i = 0; i < courtEvents.length; i++) {

            if (!courtEvents[i].eventId && DateFormat.compareDate(DateFormat.getDate(courtEvents[i].eventDate), DateFormat.getDate()) === -1) {
                this.show(this.translateService.translate('oidcrtev.eventdatemustbefuture'), 'warn');
                is.valid = false;
                return is.valid;
            } else {
                for (let j = 0; j < this.courtEventsGridDataTemp.length; j++) {
                    if ((this.courtEventsGridDataTemp[j].eventId == courtEvents[i].eventId) && DateFormat.compareDate(DateFormat.getDate(courtEvents[i].eventDate), DateFormat.getDate(this.courtEventsGridDataTemp[j].eventDate)) != 0) {
                        if (DateFormat.compareDate(DateFormat.getDate(courtEvents[i].eventDate), DateFormat.getDate()) === -1) {
                            this.show(this.translateService.translate('oidcrtev.eventdatemustbefuture'), 'warn');
                            is.valid = false;
                            return is.valid;
                        }
                    }
                }

            }
            if (!courtEvents[i].eventDate) {
                this.show(this.translateService.translate('oidcrtev.eventdatemusteentered'), 'warn');
                is.valid = false;
                return is.valid;
            }
            if (!courtEvents[i].startTime) {
                this.show(this.translateService.translate('oidcrtev.timemusteentered'), 'warn');
                is.valid = false;
                return is.valid;
            }
            if (!courtEvents[i].court) {
                this.show(this.translateService.translate('oidcrtev.courtmusteentered'), 'warn');
                is.valid = false;
                return is.valid;
            }
            if (!courtEvents[i].hearingReason) {
                this.show(this.translateService.translate('oidcrtev.hearingreasonmusteentered'), 'warn');
                is.valid = false;
                return is.valid;
            }
            if (!courtEvents[i].appearanceType) {
                this.show(this.translateService.translate('oidcrtev.apperencetypemustentered'), 'warn');
                is.valid = false;
                return is.valid;
            }
            if (courtEvents[i].eventId && courtEvents[i].eventStatus === 'CANC' && !courtEvents[i].outcomeReasonCode) {
                this.show(this.translateService.translate('oidcrtev.reasonmustbeentered'), 'warn');
                is.valid = false;
                return is.valid;
            }
        }
        return is.valid;
    }

    onButAdjustCounterclick = () => {
        const retData = {
            offenderBookId: this.vHeaderBlockModel.offenderBookId,
            sentenceSeq: this.selectedSentence['orderNo'],
            screenName: 'OSANVIOS',
            orderType: this.selectedSentence.sentenceCalcType
        }
        this.dialogService.openLinkDialog('/OCUADJCR', retData, 80).subscribe(result => {
            if (result) {
                for (let i = 0; i < this.myJsonRowDataOriginal.length; i++) {
                    if (result.sentenceSeq === this.myJsonRowDataOriginal[i].orderNo) {
                        this.myJsonRowDataOriginal[i].sanctionCount = result.noOfUnexcusedAbsence;
                    }
                }
                this.onSaveApiCall();
            }
        });
    }

    modifyDataForTermTypeAndLength(apiData) {
        let returnApiData = [];
        for (let k = 0; k < apiData.length; k++) {
            let unchangedEveryData = { ...apiData[k] };
            this.sencalcData.forEach(element => {
                if ((unchangedEveryData["sentenceCalcType"] === element.sentenceCalcType) && element.sanctionsFlag) {
                    returnApiData.push(unchangedEveryData)
                }
            })

        }
        return returnApiData;
    }



    loadJsonData() {
        const form_identifiers = {};
        form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
        form_identifiers['orderType'] = 'NONCUST';
        const retData = {
            formName: this.screenName,
            id: this.dataId ? this.dataId : 0,
            searchString: JSON.stringify(form_identifiers)
        }
        this.OcdlegloFactory.loadData(retData).subscribe((data: any) => {
            if (data && data.formInfoJson) {
                //this.refreshDisabled = false;
                this.selectedRow = 0;
                this.myJsonRowData = (JSON.parse(data.formInfoJson).myJsonRowData);
                this.myJsonRowDataOriginal = (JSON.parse(data.formInfoJson).myJsonRowData);
                this.currentOcdlegloGridData = JSON.parse(JSON.stringify(this.myJsonRowData));
                this.initialOcdlegloGridData = JSON.parse(JSON.stringify(this.myJsonRowData));
                this.dataId = data.id;

            } else {
                this.myJsonRowData = [];
                this.initialOcdlegloGridData = [];
            }
        })

    }

    onSaveApiCall(calculationResult?) {
        var form_identifiers = {};
        for (let k = 0; k < this.myJsonRowData.length; k++) {
            let unchangedEveryData = { ...this.myJsonRowData[k] };
            for (let k = 0; k < this.myJsonRowDataOriginal.length; k++) {
                let changedEveryData = { ...this.myJsonRowDataOriginal[k] };
                if (unchangedEveryData["orderNo"] === changedEveryData["orderNo"]) {
                    this.myJsonRowData[k] = changedEveryData;
                }
            }
        }
        let finalObj = {
            'myJsonRowData': this.myJsonRowData,
            'calcReason': this.previousCalculationReason
        };
        var submitData = finalObj;
        form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
        form_identifiers['orderType'] = 'NONCUST';
        const submissionData = {
            formName: this.screenName,
            id: this.dataId ? this.dataId : 0,
            formInfoJson: JSON.stringify(submitData),
            formIdentifier: JSON.stringify(form_identifiers)
        }
        this.OcdlegloFactory.saveData(submissionData).subscribe(data => {
            if (data) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.loadJsonData();
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.loadJsonData();
                return;
            }
        });

    }

    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();

        if (event.field === 'linkFlag') {
            if (event.data.linkFlag) {
                this.appointmentsgrid.setColumnData('courtEventDate', rowIndex, DateFormat.getDate(this.courtEventModel.eventDate));
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.linkFlag) {
                this.appointmentsgrid.setColumnData('courtEventDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'recordSanctionRewardCount') {
            if (!event.data.recordSanctionRewardCount) {
                this.appointmentsgrid.setColumnData('linkFlag', rowIndex, false);
                this.appointmentsgrid.setColumnData('countType', rowIndex, undefined);
                this.appointmentsgrid.requiredOff('countType');
                rowdata.validated = true;
                return rowdata;
            } else {
                this.appointmentsgrid.requiredOn('countType');
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    get disableAdjustButton() {
        if (this.selectedSentence && this.selectedSentence.orderNo) {
            return false;
        } else {
            return true;
        }
    }

    get courtEventInsert() {
        if (this.selectedSentence && this.selectedSentence.orderNo) {
            return true;
        } else {
            return false;
        }
    }

    isInsertable(event) {
        const index = this.offAppointOutcomeData.indexOf(this.courtEvnetAppointmentOutcome);
        this.appointmentsgrid.setColumnData('commentText', index, event);
    }
    isMatterInsertable(event){
        const index = this.courtEventsGridData.indexOf(this.offCourtEventsIndex);
        this.courteventsgrid.setColumnData('matter', this.offCourtEventsIndex, event);
        this.isSingleSaveBtnDisable = false;
    }
    aLaunchClick = (event) => {
        const dialogData = {
            modelData: event,
            screenTitle: 'Amend Additional Counts Comment',
            placeHolderName: 'Additional Counts Comment',
            existingCommentTextDetails: 'Existing Additional Counts Comment',
            ammendCommentText: 'Amend Additional Counts Comment',
            gridName: 'COURT_EVENT_GRID'
        };
        this.dialogService.openLinkDialog('OSANVICOMMENT', dialogData).subscribe(resData => {
            if (resData) {
                this.offCourtEventsDataRetrieve();
            }
        });
    }

    bLaunchClick = (event) => {
        const dialogData = {
            modelData: event,
            screenTitle: 'Appointment Comment',
            placeHolderName: 'Appointment Comment',
            existingCommentTextDetails: 'Existing Appointment Comment',
            ammendCommentText: 'Amend Appointment Comment',
            gridName: 'APPOINTMENT_GRID',
            courtEventId: this.courtEventModel.eventId
        };
        this.dialogService.openLinkDialog('OSANVICOMMENT', dialogData).subscribe(resData => {
            if (resData) {
                this.appointMentsData();
            }
        });
    }

    callEditableCancelField = (data: any, index: number, field: string): boolean => {
        if (data && data.eventId) {
            return true
        } else {
            return false;
        }
    }

    cellEditableReason = (data: any, index: number, field: string): boolean => {
        return (data && data.cancelFlag) ? true : false;
    }

    getDefaultCancellationReason() {
        const canReason = this.osanviosFactory.getDefaultCancellationReason();
        canReason.subscribe(data => {
            this.defaultCanReason = data;
        });

    }
    onConflictLaunchEdit = (event) => {
        event.screenId = 'OSANVIOS';

        if (event.eventDate && event.startTime) {
            let startHours = DateFormat.getDate(event.startTime).getHours();
            let startMinutes = DateFormat.getDate(event.startTime).getMinutes();
            const eventDate1 = DateFormat.getDate(DateFormat.getDate(event.eventDate).setHours(startHours, startMinutes, 0, 0));
            const eventDate2 = DateFormat.getDate(DateFormat.getDate().setHours(DateFormat.getDate().getHours(), DateFormat.getDate().getMinutes(), 0, 0));
            if (DateFormat.compareDateTime(eventDate1, eventDate2) === -1) {
                this.show(this.translateService.translate('osanvios.pastevents'), 'warn');
                return;
            }
            else if (event.eventStatus === 'CANC') {
                this.show(this.translateService.translate('osanvios.cancelevents'), 'warn');
                return;
            }
        }
        this.dialogService.openLinkDialog('/OCUREMIN', event, 25).subscribe(result => {
            if (result) {
                this.offCourtEventsDataRetrieve();
            }
        });
    }
    progOutcomeExecuteQuery() {
        if (this.vHeaderBlockModel.offenderBookId && this.courtEventModel.eventDate) {
            this.offProgOutcomeModel = new CourtEvnetAppointmentOutcome();
            this.offProgOutcomeModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.offProgOutcomeModel.eventDate = this.courtEventModel.eventDate;
            this.offProgOutcomeModel.courtEventId = this.courtEventModel.eventId;
            this.osanviosFactory.progOutComeEecuteQuery(this.offProgOutcomeModel)
                .subscribe(data => {
                    if (data.length > 0) {
                        data.forEach(element => {
                            element.linkFlag = element.linkFlag === 'Y' ? true : false;
                            element.adjournedFlag = element.adjournedFlag === 'Y' ? true : false;
                            element.recordType = 'COMM_PRG';
                            if(element.linkFlag){
                                element.courtEventDate = this.courtEventModel.eventDate;
                            }
                        });
                        this.offProgOutcomeData = data;
                        this.offProgOutcomeModel = data[0];
                        this.offProgOutcomeIndex = 0;
                    } else {
                        this.cancelFlagCheck = true;
                        this.offProgOutcomeData = [];
                        this.offProgOutcomeModel = new CourtEvnetAppointmentOutcome();
                    }
                });
        }

    }
    onRowClickoffProgOutcome(event) {
        if (event) {
            this.offProgOutcomeModel = event;
            this.offProgOutcomeModel.commentTextTemp = JSON.parse(JSON.stringify(this.offProgOutcomeModel.commentText));
        } else {
            this.offProgOutcomeModel = new CourtEvnetAppointmentOutcome();
        }
    }
    isComment(event) {
        const index = this.offProgOutcomeData.indexOf(this.offProgOutcomeModel);
        this.prgoutcomegrid.setColumnData('commentText', index, this.offProgOutcomeModel.commentTextTemp);
    }
    validatePrgOutcomeRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();

        if (event.field === 'linkFlag') {
            if (event.data.linkFlag) {
                this.prgoutcomegrid.setColumnData('courtEventDate', rowIndex, DateFormat.getDate(this.courtEventModel.eventDate));
                rowdata.validated = true;
                return rowdata;
            } else  {
                this.prgoutcomegrid.setColumnData('courtEventDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'recordSanctionRewardCount') {
            if (!event.data.recordSanctionRewardCount) {
                this.prgoutcomegrid.setColumnData('linkFlag', rowIndex, false);
                this.prgoutcomegrid.setColumnData('countType', rowIndex, undefined);
                this.prgoutcomegrid.requiredOff('countType');
                rowdata.validated = true;
                return rowdata;
            } else {
                this.prgoutcomegrid.requiredOn('countType');
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    progAppointmentExecuteQuery() {
        if (this.vHeaderBlockModel.offenderBookId && this.courtEventModel.eventDate) {
            this.offProgAppointmentModel = new CourtEvnetAppointmentOutcome();
            this.offProgAppointmentModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.offProgAppointmentModel.eventDate = this.courtEventModel.eventDate;
            this.offProgAppointmentModel.courtEventId = this.courtEventModel.eventId;
            this.osanviosFactory.progAppointmentEecuteQuery(this.offProgAppointmentModel)
                .subscribe(data => {
                    if (data.length > 0) {
                        data.forEach(element => {
                            element.linkFlag = element.linkFlag === 'Y' ? true : false;
                            element.adjournedFlag = element.adjournedFlag === 'Y' ? true : false;
                            element.recordType = 'COMM_PRG_APP';
                            if(element.linkFlag){
                                element.courtEventDate = this.courtEventModel.eventDate;
                            }
                        });
                        this.offProgAppointmentData = data;
                        this.offProgAppointmentModel = data[0];
                        this.offProgAppointmentIndex = 0;
                    } else {
                        this.cancelFlagCheck = true;
                        this.offProgAppointmentData = [];
                        this.offProgAppointmentModel = new CourtEvnetAppointmentOutcome();
                    }
                });
        }

    }
    onRowClickoffProgAppointment(event) {
        if (event) {
            this.offProgAppointmentModel = event;
            this.offProgAppointmentModel.commentTextTemp = JSON.parse(JSON.stringify(this.offProgAppointmentModel.commentText));
        } else {
            this.offProgAppointmentModel = new CourtEvnetAppointmentOutcome();
        }
    }
    isAppComment(event) {
        const index = this.offProgAppointmentData.indexOf(this.offProgAppointmentModel);
        this.prgAppgrid.setColumnData('commentText', index, this.offProgAppointmentModel.commentTextTemp);
    }
    validatePrgAppRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();

        if (event.field === 'linkFlag') {
            if (event.data.linkFlag) {
                this.prgAppgrid.setColumnData('courtEventDate', rowIndex, DateFormat.getDate(this.courtEventModel.eventDate));
                rowdata.validated = true;
                return rowdata;
            } else  {
                this.prgAppgrid.setColumnData('courtEventDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'recordSanctionRewardCount') {
            if (!event.data.recordSanctionRewardCount) {
                this.prgAppgrid.setColumnData('linkFlag', rowIndex, false);
                this.prgAppgrid.setColumnData('countType', rowIndex, undefined);
                this.prgAppgrid.requiredOff('countType');
                rowdata.validated = true;
                return rowdata;
            } else {
                this.prgAppgrid.requiredOn('countType');
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    comserviceExecuteQuery() {
        if (this.vHeaderBlockModel.offenderBookId && this.courtEventModel.eventDate) {
            this.commServiceModel = new CourtEvnetAppointmentOutcome();
            this.commServiceModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.commServiceModel.eventDate = this.courtEventModel.eventDate;
            this.commServiceModel.courtEventId = this.courtEventModel.eventId;
            this.osanviosFactory.comServiceEecuteQuery(this.commServiceModel)
                .subscribe(data => {
                    if (data.length > 0) {
                        data.forEach(element => {
                            element.linkFlag = element.linkFlag === 'Y' ? true : false;
                            element.adjournedFlag = element.adjournedFlag === 'Y' ? true : false;
                            element.recordType = 'COMM_SRV';
                            if(element.linkFlag){
                                element.courtEventDate = this.courtEventModel.eventDate;
                            }
                        });
                        this.commServiceData = data;
                        this.commServiceModel = data[0];
                        this.commServiceIndex = 0;
                    } else {
                        this.cancelFlagCheck = true;
                        this.commServiceData = [];
                        this.commServiceModel = new CourtEvnetAppointmentOutcome();
                    }
                });
        }

    }
    onRowClickComService(event) {
        if (event) {
            this.commServiceModel = event;
            this.commServiceModel.commentTextTemp = JSON.parse(JSON.stringify(this.commServiceModel.commentText));
        } else {
            this.commServiceModel = new CourtEvnetAppointmentOutcome();
        }
    }
    isComAppComment(event) {
        const index = this.commServiceData.indexOf(this.commServiceModel);
        this.comServicegrid.setColumnData('commentText', index, this.commServiceModel.commentTextTemp);
    }
    validateCommRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();

        if (event.field === 'linkFlag') {
            if (event.data.linkFlag) {
                this.comServicegrid.setColumnData('courtEventDate', rowIndex, DateFormat.getDate(this.courtEventModel.eventDate));
                rowdata.validated = true;
                return rowdata;
            } else  {
                this.comServicegrid.setColumnData('courtEventDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'recordSanctionRewardCount') {
            if (!event.data.recordSanctionRewardCount) {
                this.comServicegrid.setColumnData('linkFlag', rowIndex, false);
                this.comServicegrid.setColumnData('countType', rowIndex, undefined);
                this.comServicegrid.requiredOff('countType');
                rowdata.validated = true;
                return rowdata;
            } else {
                this.comServicegrid.requiredOn('countType'); 
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    get prgOutComReadOnly() {
        if (this.offProgOutcomeModel.courtEvntSanctDtlId) {
            return false;
        }
        return true;
    }
    get prgAppComReadOnly() {
        if (this.offProgAppointmentModel.courtEvntSanctDtlId) {
            return false;
        }
        return true;
    }
    get commServiceComReadOnly() {
        if (this.commServiceModel.courtEvntSanctDtlId) {
            return false;
        }
        return true;
    }
    get appOutComReadOnly() {
        if (this.courtEvnetAppointmentOutcome.courtEvntSanctDtlId) {
            return true;
        }
        return false;
    }
    onEoffenderClick = (data) => {
        this.eoffenderService.selectedRowData=data;
        this.router.navigate( ['/EOFFENDER'], { queryParams: { ['SCREEN'] : data['SCREEN'] } } );
     }
    ngOnDestroy(){
        if(!this.router.url.includes('/EOFFENDER')){
            this.eoffenderService.selectedRowData=null;
        }
       
    }
}

