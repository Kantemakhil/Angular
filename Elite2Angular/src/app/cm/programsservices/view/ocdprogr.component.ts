import {
    Component, OnInit, ViewChild, AfterViewInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdprogrService } from '../service/ocdprogr.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VOffenderPrgObligations } from '@cm/programsservices/beans/VOffenderPrgObligations';
import { VAcpProgress } from '@cm/programsservices/beans/VAcpProgress';
import { OffenderProgramProfiles } from '@instprogramswithoutschedulesbeans/OffenderProgramProfiles';
import { OffenderCourseAttendance } from '@cm/programsservices/beans/OffenderCourseAttendance';
import { VOffenderPrgObligationsCommitBean } from '@cm/programsservices/beans/VOffenderPrgObligationsCommitBean';
import { VAcpProgressCommitBean } from '@cm/programsservices/beans/VAcpProgressCommitBean';
import { OffenderProgramProfilesCommitBean } from '@instprogramswithoutschedulesbeans/OffenderProgramProfilesCommitBean';
import { OffenderCourseAttendancesCommitBean } from '@cm/programsservices/beans/OffenderCourseAttendancesCommitBean';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { OidpwaitService } from '@cm/programsservices/service/oidpwait.service';
import { Router } from '@angular/router';
import { OidononaService } from '@common/offender-records/service/oidonona.service';
import { OffenderNonAssociations } from '@common/beans/OffenderNonAssociations';
import { AppConstants } from '@core/classes/appConstants';
import { SchedulerService } from '@core/ui-components/schedule/scheduler.service';
// import required bean declarations
import { OnDestroy } from '@angular/core';

@Component({
    selector: 'app-ocdprogr',
    templateUrl: './ocdprogr.component.html'
})

export class OcdprogrComponent implements OnInit, AfterViewInit, OnDestroy {
    reqProp = false;
    schBtnEnable = false;
    modBtnEnable = false;
    voffPrgDelBtn = true;
    offpgmInsBtn = true;
    crsappInsbtn = true;
    modedata: { eventType: string; offenderBookId: number; agyLocId: string; programId: number; pOperation: string; bulkAssignData: any; moduleName: 'OCDPROGR' };
    backBtn = false;
    conflictFlag = false;
    outcomeLink: string;
    bkgStartDate: any;
    @ViewChild('progGrid', { static: true }) progGrid: any;
    @ViewChild('crsgrid', { static: true }) crsgrid: any;
    @ViewChild('offprggrid', { static: true }) offprggrid: any;
    intLocLink: string;
    launchBtndisable = true;
    progBlockUpd = true;
    assignBtnDisable = true;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    voffprgoblData: VOffenderPrgObligations[] = [];
    voffprgoblDataList: VOffenderPrgObligations[] = [];
    voffprgoblModel: VOffenderPrgObligations = new VOffenderPrgObligations();
    voffprgoblIndex = 0;
    voffprgoblInsertList: VOffenderPrgObligations[] = [];
    voffprgoblUpdatetList: VOffenderPrgObligations[] = [];
    voffprgoblDeleteList: VOffenderPrgObligations[] = [];
    vacpprogressData: VAcpProgress[] = [];
    vacpprogressDataTemp: VAcpProgress[] = [];
    vacpprogressModel: VAcpProgress = new VAcpProgress();
    vacpprogressIndex = 0;
    vacpprogressInsertList: VAcpProgress[] = [];
    vacpprogressUpdateList: VAcpProgress[] = [];
    vacpprogressDeleteList: VAcpProgress[] = [];
    offpgmprofData: OffenderProgramProfiles[] = [];
    offpgmprofDataTemp: OffenderProgramProfiles[] = [];
    offpgmprofModel: OffenderProgramProfiles = new OffenderProgramProfiles();
    offpgmprofBean: OffenderProgramProfiles = new OffenderProgramProfiles();
    offpgmprofModelData: OffenderProgramProfiles = new OffenderProgramProfiles();
    offpgmprofIndex = 0;
    offpgmprofInsertList: OffenderProgramProfiles[] = [];
    offpgmprofUpdateList: OffenderProgramProfiles[] = [];
    offpgmprofDeleteList: OffenderProgramProfiles[] = [];
    offcrsappData: OffenderCourseAttendance[] = [];
    offcrsappDataTemp: OffenderCourseAttendance[] = [];

    offcrsappDataTempOne: OffenderNonAssociations[] = [];

    offcrsappModel: OffenderCourseAttendance = new OffenderCourseAttendance();
    offcrsappBean: OffenderCourseAttendance = new OffenderCourseAttendance();
    offcrsappIndex = -1;
    offcrsappInsertList: OffenderCourseAttendance[] = [];
    offcrsappUpdateList: OffenderCourseAttendance[] = [];
    offcrsappDeleteList: OffenderCourseAttendance[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    vOffPrgOblColumnDef: any[];
    offCrsAppColumnDef: any[];
    vAcpProgressColumnDef: any[];
    offPgmProfColumnDef: any[];
    vOffPrgOblReadOnly = false;
    vAcpProgressReadOnly = false;
    offPgmProfReadOnly = false;
    allocCtrlReadOnly = false;
    offCrsAppReadOnly = false;
    pgmLocationReadOnly = false;
    rgoffprgstsRg: any[] = [];
    rgintlocationRg: any[] = [];
    rgprogramservicesRg: any[] = [];
    rgpsprgavailRg: any[] = [];
    rgoffendersentencesRg: any[] = [];
    rgeventsubtypesRg: any[] = [];
    rgoutcomereasonsRg: any[] = [];
    rgagylocidRg: any[] = [];
    rgphasesRg: any[] = [];
    rgmodulesRg: any[] = [];
    rgengagementRg: any[] = [];
    rgunderstandingRg: any[] = [];
    rgpsendallocRg: any[] = [];
    rgfutureattendanceRg: any[] = [];
    offcrsappCommitModel: OffenderCourseAttendancesCommitBean = new OffenderCourseAttendancesCommitBean();
    vacpprogressCommitModel: VAcpProgressCommitBean = new VAcpProgressCommitBean();
    voffprgoblCommitModel: VOffenderPrgObligationsCommitBean = new VOffenderPrgObligationsCommitBean();
    offpgmprofCommitModel: OffenderProgramProfilesCommitBean = new OffenderProgramProfilesCommitBean();
    selectedTabIndex = 0;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    oblSourceMap: Map<string, string> = new Map<string, string>();
    offpgmprofServiceBean: OffenderProgramProfiles = new OffenderProgramProfiles();
    fieldsDisbled = true;
    vOffPrgOblModel: VOffenderPrgObligations = new VOffenderPrgObligations();
    conflictFlagOne: boolean;
    rowsSelected: any;
    rowinsert: number;
    screenId='OCDPROGR';
    offcrsappBeanTemp: OffenderCourseAttendance = new OffenderCourseAttendance();
    constructor(private ocdprogrFactory: OcdprogrService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private offenderSearchService: OffenderSearchService, private oidononaFactory: OidononaService,
        public dialogService: DialogService, private oidpwaitFactory: OidpwaitService, private router: Router, private schedularService: SchedulerService) {
        // TODO initilize data members here..!
        this.vOffPrgOblColumnDef = [];
        this.offCrsAppColumnDef = [];
        this.vAcpProgressColumnDef = [];
        this.offPgmProfColumnDef = [];
    }
    ngOnInit() {
        if (this.sessionManager.currentCaseLoadType === 'COMM') {
            this.reqProp = true;
        } else {
            this.reqProp = false;
        }
        this.backBtn = false;
        if (this.oidpwaitFactory.exitFlag || this.schedularService.backBtnFlag) {
            this.vOffPrgOblModel = this.oidpwaitFactory.ocdprogrScreenObj;
            this.backBtn = true;
        }

        this.intLocLink = '';
        this.outcomeLink = '';
        this.bkgStartDate = undefined;
        this.vHeaderBlockModel = new VHeaderBlock();
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.show('common.pleasesearchforvalidoffender', 'warn');
        } else {
            this.vHeaderBlockModel = this.vHeaderBlockModel;
        }
        this.offpgmInsBtn = false
        this.crsappInsbtn = false;
        this.assignBtnDisable = true;
        this.schBtnEnable = true;
        this.modBtnEnable = true;
        this.vOffPrgOblColumnDef = [

            {
                fieldName: this.translateService.translate('common.program') + '*', field: 'programId', editable: true, width: 150,
                link: 'ocdprogr/rgProgramServicesRecordGroup', datatype: 'lov', source: 'OCMSERVI',
                titles: {
                    description: this.translateService.translate('common.description'),
                    programCode: this.translateService.translate('common.code')
                }, cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('ocdprogr.sentence'), field: 'sentenceDesc', width: 150, datatype: 'text'

            },
            {
                fieldName: '', field: 'button', datatype: 'hyperlink', displayas: 'href', dialogWidth: '80%',
                styleClass: 'search', link: '/OCDPROGRDIALOG', editable: true, width: 100, data: 'row', updateField: 'row',
                modal: true, height: 90, onLaunchClick: this.onDialogCick,
            },
            {
                fieldName: this.translateService.translate('ocdprogr.referraldate') + '*', field: 'referralDate', editable: true, width: 150,
                cellEditable: this.canCellEdit, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('ocdprogr.specificneeds'), field: 'specialNeedFlag', editable: true, width: 150, datatype: 'checkbox',
                cellEditable: this.canCellEdit
            },
            { fieldName: this.translateService.translate('common.source'), field: 'obligationSource', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocdprogr.court'), field: 'courtName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.category'), field: 'sentenceCategory', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocdprogr.sentenceexpirydate'), field: 'sentenceEndDate', editable: false, width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate('common.status'), field: 'statusDesc', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('ocdprogr.availability'), field: 'availabilityCode', editable: true, width: 150, datatype: 'lov',
                domain: 'PS_PRG_AVAIL', cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('common.comment'), field: 'commentText', editable: true, maxlength: 240, width: 150,
                cellEditable: this.canCellEdit, datatype: 'text'
            },
            {
				fieldName: this.translateService.translate('common.iwpdocument')
				, field: 'butIwp', datatype: 'hyperlink',link: '/EOFFENDER',
				editable: true, displayas: 'href', styleClass: 'file_copy',
				width: 50, data: 'row', updateField: 'row', modal: false,queryparam: 'SCREEN'
			},
            { fieldName: '', field: 'offenderBookId', hide: true, width: 150 },
            { fieldName: '', field: 'sentenceStartDate', hide: true, width: 150 },
            { fieldName: '', field: 'sentenceSeq', hide: true, width: 150 },
            { fieldName: '', field: 'orderType', hide: true },

        ];
        this.offCrsAppColumnDef = [
            { fieldName: this.translateService.translate('common.datemandatory'), field: 'eventDate', editable: true, width: 150, datatype: 'date', cellEditable: this.canCrsAppCellEdit },
            {
                fieldName: this.translateService.translate('common.startTime') + '*', field: 'startTime', editable: true, width: 150, datatype: 'time'
                , cellEditable: this.canCrsAppCellEdit
            },
            {
                fieldName: this.translateService.translate('common.endTime') + '*', field: 'endTime', editable: true, width: 150, datatype: 'time'
                , cellEditable: this.canCrsAppCellEdit
            },
            {
                fieldName: this.translateService.translate('common.type1'), field: 'eventSubType', editable: true, width: 150, datatype: 'lov',
                source: 'OCMEVENT', link: '/ocdprogr/rgEventSubTypesRecordGroup'
                , cellEditable: this.canCrsAppCellEdit
            },
            {
                fieldName: this.translateService.translate('common.location'), field: 'agyLocId', editable: true,
                width: 150, datatype: 'lov', cellEditable: this.canCrsAppCellEdit, source: 'OUMAGLOC',
                link: 'ocdprogr/rgAgyLocIdRecordGroup?caseloadId=', parentField: 'caseloadId', required: true
            },
            { fieldName: this.translateService.translate('common.staffname'), field: 'staffName', editable: false, width: 150 },
            {
                fieldName: '', field: 'staffButton', datatype: 'hyperlink', displayas: 'href', dialogWidth: '80%',
                styleClass: 'search', link: '/OCUAOFFI', editable: true, width: 100, data: 'row', updateField: 'row',
                modal: true, height: 90, onLaunchClick: this.onStaffCick, cellEditable: this.canCrsAppCellEdit
            },
            {
                fieldName: this.translateService.translate('ocdprogr.phase'), field: 'phaseId', editable: true, width: 150, parentField: 'programId',
                link: 'ocdprogr/rgPhasesRecordGroup?programId=', datatype: 'lov', source: 'OCMSVPHA', titles: {
                    description: this.translateService.translate('common.description'),
                    listSeq: this.translateService.translate('common.sequencename')
                }, cellEditable: this.canCrsAppCellEdit
            },
            {
                fieldName: this.translateService.translate('common.module'), field: 'moduleId', editable: true, width: 150, parentField: 'phaseId',
                link: 'ocdprogr/rgModulesRecordGroup?phaseId=', datatype: 'lov', source: 'OCMSVPHA', titles: {
                    description: this.translateService.translate('common.description'),
                    listSeq: this.translateService.translate('common.sequencename')
                }, cellEditable: this.canCrsAppCellEdit
            },
            {
                fieldName: this.translateService.translate('ocdprogr.session'), field: 'sessionNo', editable: true, width: 150, datatype: 'number', whole: true,
                cellEditable: this.canCrsAppCellEdit
            },
            {
                fieldName: this.translateService.translate('ocdprogr.confirmattendance'), field: 'eventOutcome', editable: true, width: 150, datatype: 'lov', source: 'OCMEVENT',
                parentField: 'parentField', link: 'ocdprogr/rgOutcomeReasonsRecordGroup?eventOutcomeDbVal='
                , cellEditable: this.canCrsAppCellEdit
            },
            {
				fieldName: '', field: 'reminderName', datatype: 'launchbutton', editable: true, 
				width: 100, data: 'row', updateField: 'row', modal: true, dialogWidth: 70, onLaunchClick: this.remindersLaunch,


			},
            { fieldName: '', field: 'programId', hide: true, width: 150 },
            { fieldName: '', field: 'parentField', hide: true, width: 150 },
            { fieldName: '', field: 'test', hide: true, width: 150 },
            { fieldName: '', field: 'caseloadId', hide: true, width: 150 },

        ];
        this.vAcpProgressColumnDef = [
            { fieldName: this.translateService.translate('ocdprogr.no'), field: 'programListSeq', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocdprogr.phase'), field: 'programDescription', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocdprogr.notneeded'), field: 'profileNeededFlag', editable: true, width: 150, datatype: 'checkbox' },
            { fieldName: this.translateService.translate('ocdprogr.completeddate'), field: 'profileCompletionDate', editable: true, width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate('common.comment'), field: 'profileCommentText', maxlength: 240, datatype: 'text', editable: true, width: 150 },
        ];
        this.offPgmProfColumnDef = [
            { fieldName: this.translateService.translate('ocdprogr.provider'), field: 'providerName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocdprogr.occurrencecode'), field: 'occuranceCode', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocdprogr.phase'), field: 'phaseDesc', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('common.startdatemandatory'), field: 'offenderStartDate', editable: false, width: 150, datatype: 'date'

            },
            {
                fieldName: '', field: 'schbutton', datatype: 'hyperlink', displayas: 'href',
                dialogWidth: '80%', styleClass: 'search', link: '/OCUSSESS', editable: true, width: 100,
                data: 'row', updateField: 'row', modal: true, height: 90, onLaunchClick: this.ocussessDlgCick
            },
            { fieldName: this.translateService.translate('ocdprogr.startsession'), field: 'startSessionNo', editable: false, width: 150 },
            { fieldName: this.translateService.translate('End Date'), field: 'offenderEndDate', editable: false, width: 150, datatype: 'date', cellEditable: this.canPgcmProfCellEdit },
            {
                fieldName: this.translateService.translate('common.statusmandatory'), field: 'offenderProgramStatus', editable: true, width: 150, datatype: 'lov', domain: 'OFF_PRG_STS'
                , cellEditable: this.canPgcmProfCellEdit,
                // link: 'ocdprogr/rgOffPrgStsRecordGroup'
            },
            {
                fieldName: this.translateService.translate('ocdprogr.earlyendReason'), field: 'offenderEndReason', editable: true, width: 150, datatype: 'lov',
                domain: 'PS_END_ALLOC', cellEditable: this.canPgcmProfCellEdit
            },
            { fieldName: this.translateService.translate('common.comment'), field: 'commentText', maxlength: 240, datatype: 'text', editable: true, width: 150, cellEditable: this.canPgcmProfCellEdit },
            { fieldName: '', field: 'crsActyId', hide: true, width: 150 },
            {
                fieldName: ' ', field: 'rembutton', datatype: 'launchbutton', editable: true, width: 100,
                data: 'row', updateField: 'row', modal: true, onLaunchClick: this.onConflictLaunchEdit
            }
        ];
        const serviceObject = this.ocdprogrFactory.
            rgObligationSource();
        serviceObject.subscribe(data => {
            if (data.length === 0) {
            } else {
                data.forEach(ele => {
                    this.oblSourceMap.set(ele.code, ele.description);
                });
            }
        });
        this.onOffenderChange(this.vHeaderBlockModel);
    }
    ngAfterViewInit() {
        // if (this.sessionManager.currentCaseLoadType === 'COMM') {
        //     this.progGrid.setColumnHeader('sentenceDesc', this.translateService.translate('ocdprogr.sentence') + '*');
        // }

    }
    disableCell = (data: any, index: number, field: string): boolean => {
        return false;

        // if (data.offenderPrgObligationId) {
        //     return true;
        // } else {
        //     return false;
        // }
    }
    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (data.offenderPrgObligationId && (field === 'programId' || field === 'button')) {
            return false;
        }
        if (field === 'referralDate') {
            if (data.obligationSource === 'ORDERED') {
                return false;
            } else {
                if (data.status === 'REF') {
                    return true;
                } else {
                    return false;
                }
            }
        }
        return true;
    }
    canCrsAppCellEdit = (data: any, index: number, field: string): boolean => {
        if ((field === 'eventDate' || field === 'startTime' || field === 'endTime') && data.eventId && data.eventOutcomeDbVal) {
            return false;
        }
        if (field === 'eventOutcome' && !data.eventId) {
            this.show(this.translateService.translate('ocdprogr.pleasesavethescheduleinformationbeforerecordingtheoutcome'), 'warn');
            return false;
        } else if (this.conflictFlag) {
            this.conflictEvent(data);
            return false;
        } else if (field === 'moduleId' && (!data.phaseId || data.phaseId === 'null')) {
            this.show(this.translateService.translate('ocdprogr.pleaseeneterphasefirst'), 'warn');
            return false;
        }
        return true;
    }
    canPgcmProfCellEdit = (data: any, index: number, field: string): boolean => {
        if (data.offPrgrefId && (data.offPrgStatusDbVal === 'END' || data.offPrgStatusDbVal === 'CANC')) {
            return false;
        }
        if (this.voffprgoblModel.status === 'ALLOC' || this.voffprgoblModel.status === 'REF' ||
            this.voffprgoblModel.status === 'SUSP' ||
            this.voffprgoblModel.status === '121') {
            if (field === 'offenderStartDate' && data.moduleFlag === 'Y' &&
                DateFormat.compareDate(DateFormat.getDate(data.offenderStartDate), DateFormat.getDate()) === 1) {
                return false;
            }
            if (field === 'offenderEndReason' || field === 'offenderEndDate') {
                if (!data.offenderProgramStatus) {
                    return false;
                } else if (data.offenderProgramStatus === 'END') {
                    return true;
                } else if (data.offenderProgramStatus === 'ALLOC') {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    }
    onDialogCick = (event) => {
        const index = this.voffprgoblData.indexOf(event);
        event['moduleName'] = 'OCDPROGR';
        if (event && event.obligationSource === 'COMM') {
            this.dialogService.openLinkDialog('/OCDPROGRDIALOG', event, 50).subscribe(result => {
                if (result) {
                    this.progGrid.setColumnData('sentenceDesc', index, result.sentenceDesc);
                    this.progGrid.setColumnData('referralDate', index, result.referralDate);
                    this.progGrid.setColumnData('courtName', index, result.courtName);
                    this.progGrid.setColumnData('sentenceCategory', index, result.sentenceCategory);
                    this.progGrid.setColumnData('sentenceEndDate', index, result.sentenceEndDate);
                    this.progGrid.setColumnData('sentenceStartDate', index, result.referralDate);
                    this.progGrid.setColumnData('orderType', index, result.orderType);
                    event.sentenceSeq = result.sentenceSeq;
                } else {

                }
            });
        }
    }
    onStaffCick = (event) => {
        const index = this.offcrsappData.indexOf(event);
        if (event.eventId && !event.agyLocId) {
            this.show(this.translateService.translate('ocdprogr.pleaseenterlocationfirst'), 'warn');
            return;
        } else if (event.eventId && event.eventOutcome) {
            this.show(this.translateService.translate('ocdprogr.staffnamecannotbechangedasaconfirmattendancehasbeenentered'), 'warn');
            return;
        }
        this.dialogService.openLinkDialog('/OCUAOFFI', event, 50).subscribe(result => {
            if (result) {
                event.supervisorStaffId = result.sacStaffId;
                this.crsgrid.setColumnData('staffName', index, result.lastName + ',' + result.firstName);
            } else {
            }
        });
    }
    ocussessDlgCick = (event) => {
        if (event.offPrgrefId && (event.offPrgStatusDbVal === 'END' || event.offPrgStatusDbVal === 'CANC')) {
            return false;
        }
        const index = this.offpgmprofData.indexOf(this.offpgmprofBean);
        if (event.moduleFlag === 'Y') {
            event.queryOnly = false;
            this.dialogService.openLinkDialog('/OCUSMODU', event, 80).subscribe(result => {
                if (result) {
                    this.offprggrid.setColumnData('startSessionNo', index, result.sessionNo);
                    this.offprggrid.setColumnData('offenderStartDate', index, result.scheduleDate);
                    this.offpgmprofBean.moduleFrom = result.moduleListSeq;
                    this.offpgmprofBean.moduleTo = result.moduleListSeq;
                } else {
                }

            });
        } else {
            this.dialogService.openLinkDialog('/OCUSSESS', event, 80).subscribe(result => {
                if (result) {
                    this.offprggrid.setColumnData('startSessionNo', index, result.sessionNo);
                    this.offprggrid.setColumnData('offenderStartDate', index, result.scheduleDate);
                } else {
                }
            });
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
    onRowClickvoffprgobl(event) {
        this.assignBtnDisable = true;
        this.schBtnEnable = true;
        this.modBtnEnable = true;
        if (event) {
            this.voffprgoblModel = event;
            if (this.voffprgoblModel.status === 'COMP') {
                this.progBlockUpd = false;
            } else {
                this.progBlockUpd = true;
            }
            this.offcrsappData = [];
            if (this.voffprgoblModel.offenderPrgObligationId) {
                this.vacpprogressExecuteQuery();
                this.offpgmprofExecuteQuery();
                this.offcrsappExecuteQuery();
                this.crsappInsbtn = true;
                this.voffPrgDelBtn = true;
                this.launchBtndisable = false;
                this.offpgmInsBtn = true;
                // this.assignBtnDisable = false;
                let bulkAssignData = [];
                let offenderModel = { offenderBookId: this.vHeaderBlockModel.offenderBookId, offenderId: this.vHeaderBlockModel.offenderId, offenderName: this.vHeaderBlockModel.lastName + ' ' + this.vHeaderBlockModel.firstName }
                bulkAssignData.push(offenderModel);
                this.modedata = {
                    eventType: 'ACP',
                    offenderBookId: this.vHeaderBlockModel.offenderBookId,
                    agyLocId: this.vHeaderBlockModel.agyLocId,
                    programId: Number(this.voffprgoblModel.programId),
                    pOperation: 'ALLOCATE',
                    bulkAssignData: bulkAssignData,
                    moduleName: 'OCDPROGR'
                };
            } else {
                this.vacpprogressData = [];
                this.vacpprogressModel = new VAcpProgress();
                this.offpgmprofData = [];
                this.offpgmprofModel = new OffenderProgramProfiles();
                this.offcrsappData = [];
                this.offcrsappModel = new OffenderCourseAttendance();
                this.offpgmInsBtn = false;
                this.crsappInsbtn = false;
                this.voffPrgDelBtn = false;
                this.launchBtndisable = true;
            }
            if (this.voffprgoblModel.status === 'ALLOC' || this.voffprgoblModel.status === 'REF' ||
                this.voffprgoblModel.status === 'SUSP' ||
                this.voffprgoblModel.status === '121') {
                // this.assignBtnDisable = false;
            } else {
                this.offpgmInsBtn = false;
                // this.assignBtnDisable = true;
            }
        } else {
            this.launchBtndisable = true;
            this.crsappInsbtn = false;
            this.offpgmInsBtn = false;
            this.progBlockUpd = false;
            this.vacpprogressData = [];
            this.vacpprogressModel = new VAcpProgress();
            this.offpgmprofData = [];
            this.offpgmprofModel = new OffenderProgramProfiles();
            this.offcrsappData = [];
            this.offcrsappModel = new OffenderCourseAttendance();
        }
    }
    allowNumbers(event) {
    }
    onRowClickvacpprogress(event) {
        if (event) {

        } else {

        }
    }
    onRowClickoffpgmprof(event) {
        if (event) {
            this.offpgmprofBean = event;
            this.offpgmprofBean.activityDescription = this.voffprgoblModel.activityDesc;
            let bulkAssignData = [];
            let offenderModel = { offenderBookId: this.vHeaderBlockModel.offenderBookId, offenderId: this.vHeaderBlockModel.offenderId, offenderName: this.vHeaderBlockModel.lastName + ' ' + this.vHeaderBlockModel.firstName }
            bulkAssignData.push(offenderModel);
            this.modedata = {
                eventType: 'ACP',
                offenderBookId: this.vHeaderBlockModel.offenderBookId,
                agyLocId: this.vHeaderBlockModel.agyLocId,
                programId: Number(this.voffprgoblModel.programId),
                pOperation: 'ALLOCATE',
                bulkAssignData: bulkAssignData,
                moduleName: 'OCDPROGR'
            };
            if (!this.offpgmprofBean.offPrgrefId && (this.voffprgoblModel.status === 'ALLOC' || this.voffprgoblModel.status === 'REF' ||
                this.voffprgoblModel.status === 'SUSP' ||
                this.voffprgoblModel.status === '121')) {
                this.assignBtnDisable = false;
            } else {
                this.assignBtnDisable = true;
            }
            if (this.offpgmprofBean.offPrgrefId && this.offpgmprofBean.moduleFlag === 'Y') {
                this.modBtnEnable = false;
            } else {
                this.modBtnEnable = true;
            }
            if (this.offpgmprofBean.offPrgrefId && this.offpgmprofBean.crsActyId) {
                this.schBtnEnable = false;
            } else {
                this.schBtnEnable = true;
            }
            if (this.voffprgoblModel.status === 'ALLOC' || this.voffprgoblModel.status === 'REF' ||
                this.voffprgoblModel.status === 'SUSP' ||
                this.voffprgoblModel.status === '121') {
                this.assignBtnDisable = false;
            } else {
                this.modBtnEnable = true;
                //this.schBtnEnable = true;
                this.assignBtnDisable = true;
            }
        } else {
            this.modBtnEnable = true;
            this.schBtnEnable = true;
            this.assignBtnDisable = true;
            //    this.launchBtndisable = true;
        }
        if (event.offenderProgramStatus === 'END') {
            this.offprggrid.requiredOn('offenderEndReason');
        } else {
            this.offprggrid.requiredOff('offenderEndReason');
        }
    }
    onAssigndialogClosed(event) {
        let index = this.offpgmprofData.indexOf(this.offpgmprofBean);
        if (this.rowinsert === 1) {
            var indexValue = this.offpgmprofData.length - 1;
            this.assignBtnDisable = false;
        }
        else {
            var indexValue = index;
            this.assignBtnDisable = true;
        }


        // var indexValue = index;
        // const data = {
        //     eventType: 'ACP',
        //     offenderBookId : this.vHeaderBlockModel.offenderBookId,
        //     agyLocId : this.vHeaderBlockModel.agyLocId,
        //     programId : Number(this.voffprgoblModel.programId),
        //     pOperation: 'ALLOCATE'
        // };
        // this.dialogService.openLinkDialog('/ociscatadialog', data, 80).subscribe(result => {
        if (event) {
            event.forEach(dataOne => {
                this.offpgmprofModelData = new OffenderProgramProfiles();
                this.offpgmprofModelData.offenderPrgObligationId = this.voffprgoblModel.offenderPrgObligationId;
                this.offpgmprofModelData.crsActyId = dataOne.coursePhaseId;
                //this.offpgmprofModelData.programId = this.voffprgoblModel.programId;
                const serviceObj = this.ocdprogrFactory.
                    checkAllocationExists(this.offpgmprofModelData);
                serviceObj.subscribe(data => {
                    if (data !== undefined && data.sealFlag === '2') {
                        this.show(this.translateService.translate('ocdprogr.acurrentallocationtooccurence') + ' ' +
                            data.courseActivity + ' ' + this.translateService.translate('ocdprogr.alreadyexists'), 'warn');
                        if (!this.offpgmprofData[this.offpgmprofData.length - 1].crsActyId) {
                            this.offpgmprofBean.crsActyId = undefined;
                        }
                    } else {
                        if (!this.offpgmprofData[this.offpgmprofData.length - 1].crsActyId) {
                            this.offprggrid.setColumnData('crsActyId', indexValue, dataOne.coursePhaseId);
                            this.offprggrid.setColumnData('providerName', indexValue, dataOne.providerName);
                            this.offprggrid.setColumnData('occuranceCode', indexValue, dataOne.courseActivityCode);
                            this.offprggrid.setColumnData('phaseDesc', indexValue, dataOne.phaseDesc);
                            this.offprggrid.setColumnData('offenderStartDate', indexValue, dataOne.scheduleStartDate);
                            this.offprggrid.setColumnData('offenderEndDate', indexValue, data.offenderEndDate);
                            this.offprggrid.setColumnData('startSessionNo', indexValue, dataOne.sessionNo);
                            this.offprggrid.setColumnData('offenderProgramStatus', indexValue, 'ALLOC');
                            this.offpgmprofData[indexValue].programId = data.programId;
                            this.offpgmprofData[indexValue].moduleFlag = data.moduleFlag;
                            if (this.offpgmprofBean.moduleFlag === 'Y' && dataOne.sessionNo !== null) {
                                this.offpgmprofBean.moduleFrom = data.moduleFrom;
                                this.offpgmprofBean.moduleTo = data.moduleTo;
                            }
                        } else {
                            this.offprggrid.addRecord();
                            indexValue = indexValue + 1;
                            this.offprggrid.setColumnData('crsActyId', indexValue, dataOne.coursePhaseId);
                            this.offprggrid.setColumnData('providerName', indexValue, dataOne.providerName);
                            this.offprggrid.setColumnData('occuranceCode', indexValue, dataOne.courseActivityCode);
                            this.offprggrid.setColumnData('phaseDesc', indexValue, dataOne.phaseDesc);
                            this.offprggrid.setColumnData('offenderStartDate', indexValue, dataOne.scheduleStartDate);
                            this.offprggrid.setColumnData('offenderEndDate', indexValue, data.offenderEndDate);
                            this.offprggrid.setColumnData('startSessionNo', indexValue, dataOne.sessionNo);
                            this.offprggrid.setColumnData('offenderProgramStatus', indexValue, 'ALLOC');
                            const rowid = indexValue;
                            this.offpgmprofData[rowid].programId = data.programId;
                            this.offpgmprofData[rowid].moduleFlag = data.moduleFlag;
                            if (data.moduleFlag === 'Y' && dataOne.sessionNo !== null) {
                                this.offpgmprofData[rowid].moduleFrom = data.moduleFrom;
                                this.offpgmprofData[rowid].moduleTo = data.moduleTo;
                            }
                        }
                        // this.offprggrid.prepareAgColumnDef();
                    }
                });
            });

        }
    }
    onButScheduleclick() {
    }
    onButLocationclick() {
    }
    onButAttendanceclick() {
    }
    onButAssignmentclick = () => {
        if (this.offprggrid.addedMap.size === 1 && this.offpgmprofData[this.offpgmprofData.length - 1].crsActyId) {
            this.show('ocdprogr.pleasesaveanychangesbeforecontinuing', 'warn');
            return false;
        }


        this.dialogService.openLinkDialog('/ociscatadialog', this.modedata, 80).subscribe(result => {
            if (result !== true) {
                this.onAssigndialogClosed(result);
            }

        });
        return true;
    }


    onButModDetailclick = () => {
        const index = this.offpgmprofData.indexOf(this.offpgmprofBean);
        this.offpgmprofBean.queryOnly = true;
        this.dialogService.openLinkDialog('/OCUSMODU', this.offpgmprofBean, 80).subscribe(result => {
            if (result) {

            }
        });
        return true;
    }
    onrowCrsApp(event) {
        if (event) {
            this.offcrsappBean = event;
            this.offcrsappBeanTemp = JSON.parse(JSON.stringify(event));
            this.intLocLink = '';
            if (this.offcrsappBean.eventId) {
                this.intLocLink = `ocdprogr/rgIntLocationRecordGroup?agyLocId=${this.offcrsappBean.agyLocId}`;
            }
            this.fieldsDisbled = false;
        } else {
            this.offcrsappBean = new OffenderCourseAttendance();
            this.offcrsappBeanTemp = new OffenderCourseAttendance();
            this.fieldsDisbled = true;
        }
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    get voffInsBtn() {
        if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId) {
            return true;
        }
        return false;
    }
    onOffenderChange(offender) {
        this.assignBtnDisable = true;
        this.schBtnEnable = true;
        this.modBtnEnable = true;
        this.offpgmInsBtn = false;
        this.crsappInsbtn = false;
        if (offender) {
            this.vHeaderBlockModel = offender;
            if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId) {
                this.ocdprogrexecuteQuery();
                this.getOffenderDates();
            }
        } else {
            this.launchBtndisable = true;
            this.vHeaderBlockModel = new VHeaderBlock();
            this.voffprgoblData = [];
            this.vacpprogressData = [];
            this.offpgmprofData = [];
            this.offcrsappData = [];
            this.bkgStartDate = undefined;
            this.assignBtnDisable = true;
            this.fieldsDisbled = true;
        }
    }
    getOffenderDates() {
        const getdate = this.ocdprogrFactory.getOffenderDates(this.vHeaderBlockModel.offenderBookId);
        getdate.subscribe(date => {
            if (date !== undefined) {
                this.bkgStartDate = date;
            } else {
                this.bkgStartDate = undefined;
            }
        });
    }
    whenTabChangedTrigger(event) {
        this.selectedTabIndex = event.index;
    }
    onGridInsert = () => {
        if (this.vHeaderBlockModel.statusDisplay == 'Inactive') {
            this.show(this.translateService.translate('ocdprogr.inactiveoffenderscannotbeassignedtoassignments'), 'warn');
            return;
        }
        this.offpgmInsBtn = false;
        if (this.sessionManager.currentCaseLoadType === 'INST') {
            return {
                referralDate: DateFormat.getDate(), statusDesc: 'Referred', status: 'REF',
                obligationSource: this.sessionManager.currentCaseLoadType,
                obligationSourceDesc: this.oblSourceMap.get(this.sessionManager.currentCaseLoadType)
            };
        } else {
            return {
                button: '', referralDate: DateFormat.getDate(), statusDesc: 'Referred', status: 'REF',
                obligationSource: this.sessionManager.currentCaseLoadType, offenderBookId: this.vHeaderBlockModel.offenderBookId,
                obligationSourceDesc: this.oblSourceMap.get(this.sessionManager.currentCaseLoadType)
            };
        }
    }
    onGridCrsAppInsert = () => {
        return {
            staffButton: '',
            programId: this.voffprgoblModel.programId,
            caseloadId: this.sessionManager.currentCaseLoad,
            reminderName: '',
        };
    }
    onGridInsertProgProf = () => {
        this.rowinsert = 1;
        this.schBtnEnable = true;
        if (this.rowinsert >= 1) {
            this.assignBtnDisable = false;
        } else {
            this.assignBtnDisable = true;
        }
        /* if(this.offprggrid.addedMap.size > 0) {
           return;
        } */

        return {
            schbutton: '',rembutton: ''
        };
    }
    /**
    * This function loads the data into the Master Record and its child records
    */
    ocdprogrexecuteQuery() {
        this.voffprgoblModel = new VOffenderPrgObligations();
        this.voffprgoblModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const serviceObj = this.ocdprogrFactory.
            vOffPrgOblExecuteQuery(this.voffprgoblModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.voffprgoblData = [];
                this.vacpprogressData = [];
                this.offpgmprofData = [];
                this.offcrsappData = [];
                this.launchBtndisable = true;
            } else {
                data.forEach(elemnt => {
                    if (this.sessionManager.currentCaseLoadType === AppConstants.COMMUNITY_CASELOAD) {
                        elemnt.button = '';
                    }
                    elemnt.programId = String(elemnt.programId);
                    elemnt.specialNeedFlag = elemnt.specialNeedFlag === 'Y' ? true : false;
                    elemnt['butIwp'] = '';
                    elemnt['SCREEN'] = this.screenId + "~" + "true" + "~" + elemnt['offenderPrgObligationId'];
                });
                this.voffprgoblDataList = JSON.parse(JSON.stringify(data));
                this.voffprgoblData = data;
                }
        });
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocdprogrSavevoffprgoblForm(event) {
        // TODO declare commit bean and add insert list to that object.
        this.voffprgoblInsertList = [];
        this.voffprgoblInsertList = event.added;
        this.voffprgoblUpdatetList = event.updated;
        this.voffprgoblDeleteList = event.removed;
        this.voffprgoblCommitModel.insertList = [];
        this.voffprgoblCommitModel.updateList = [];
        this.voffprgoblCommitModel.deleteList = [];
        if (this.voffprgoblInsertList.length > 0 || this.voffprgoblUpdatetList.length > 0) {
            for (let i = 0; i < this.voffprgoblInsertList.length; i++) {
                if (this.voffPrgOblValidations(this.voffprgoblInsertList[i])) {
                    return;
                }
                this.voffprgoblInsertList[i].specialNeedFlag = this.voffprgoblInsertList[i].specialNeedFlag ? 'Y' : 'N';
                this.voffprgoblInsertList[i].eventType = 'ACP';
                this.voffprgoblInsertList[i].programCategory = 'ACP';
                this.voffprgoblInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
            }
            for (let i = 0; i < this.voffprgoblUpdatetList.length; i++) {
                if (this.voffPrgOblValidations(this.voffprgoblUpdatetList[i])) {
                    return;
                }
                this.voffprgoblUpdatetList[i].specialNeedFlag = this.voffprgoblUpdatetList[i].specialNeedFlag ? 'Y' : 'N';
            }
            this.voffprgoblCommitModel.insertList = this.voffprgoblInsertList;
            this.voffprgoblCommitModel.updateList = this.voffprgoblUpdatetList;
        }
        if (this.voffprgoblDeleteList.length > 0) {
            for (let i = 0; i < this.voffprgoblDeleteList.length; i++) {
                if (this.voffprgoblDeleteList[i].status !== 'REF') {
                    this.show(this.translateService.translate('ocdprogr.youcannotdeleteprogrammewithstatusofotherthanreferred'), 'warn');
                    return;
                }
                if (this.voffprgoblDeleteList[i].obligationSource === 'ORDERED') {
                    this.show(this.translateService.translate('ocdprogr.youcannotdeleteprogrammewithsourceofcourt'), 'warn');
                    return;
                }
                if (this.voffprgoblDeleteList[i].courseProfile > 0) {
                    this.show(this.translateService.translate('ocdprogr.youcannotdeletethisprogrammeonceanallocationhasbeencreated',),
                        'warn');
                    return;
                }
                if (this.voffprgoblDeleteList[i].chkAppointment > 0) {
                    this.show(this.translateService.translate('ocdprogr.youcannotdeletethisprogrammeonceanappointmenthasbeencreated'), 'warn');
                    return;
                }
            }
            this.voffprgoblCommitModel.deleteList = this.voffprgoblDeleteList;
        }
        const voffprgoblSaveData = this.ocdprogrFactory.vOffPrgOblCommit(this.voffprgoblCommitModel);
        voffprgoblSaveData.subscribe(data => {
            if (data === 2) {
                this.show(this.translateService.translate('ocdprogr.anactiveobligationalreadyexistsforthisprogramme'), 'warn');
                return;
            } else if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.ocdprogrexecuteQuery();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
            }
        });
    }
    voffPrgOblValidations(event) {
        if (!event.programId) {
            this.show(this.translateService.translate('ocdprogr.programmustbeentered'), 'warn');
            return true;
        }
        // if (event.obligationSource === 'COMM' && !event.sentenceDesc) {
        //     this.show(this.translateService.translate('ocdprogr.sentencemustbeentered'), 'warn');
        //     return true;
        // }
        if (!event.referralDate) {
            this.show(this.translateService.translate('ocdprogr.referaldatemustbeentered'), 'warn');
            return true;
        }
        return false;
    }

    vacpprogressExecuteQuery() {
        this.vacpprogressModel = new VAcpProgress();
        this.vacpprogressModel.offenderPrgObligationId = this.voffprgoblModel.offenderPrgObligationId;
        const vacpprogressResult = this.ocdprogrFactory.
            vAcpProgressExecuteQuery(this.vacpprogressModel);
        vacpprogressResult.subscribe(vacpprogressResultList => {
            if (vacpprogressResultList.length === 0) {
                this.vacpprogressData = [];
                this.vacpprogressModel = new VAcpProgress();
            } else {
                vacpprogressResultList.forEach(elemnt => {
                    elemnt.profileNeededFlag = elemnt.profileNeededFlag === 'N' ? true : false;
                });
                this.vacpprogressData = vacpprogressResultList;
                this.vacpprogressModel = vacpprogressResultList[0];
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocdprogrSavevacpprogressForm(event) {
        // TODO declare commit bean and add insert list to that object.
        this.vacpprogressUpdateList = event.updated;
        this.vacpprogressCommitModel.updateList = [];
        if (this.vacpprogressUpdateList.length > 0) {
            for (let i = 0; i < this.vacpprogressUpdateList.length; i++) {
                this.vacpprogressUpdateList[i].profileNeededFlag = this.vacpprogressUpdateList[i].profileNeededFlag ? 'N' : 'Y';
            }
            this.vacpprogressCommitModel.updateList = this.vacpprogressUpdateList;
        }
        const vacpprogressSaveData = this.ocdprogrFactory.vAcpProgressCommit(this.vacpprogressCommitModel);
        vacpprogressSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.vacpprogressExecuteQuery();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
            }
        });
    }
    offpgmprofExecuteQuery() {
        this.offpgmprofModel = new OffenderProgramProfiles();
        this.offpgmprofModel.offenderPrgObligationId = this.voffprgoblModel.offenderPrgObligationId;
        const offpgmprofResult = this.ocdprogrFactory.
            offPgmProfExecuteQuery(this.offpgmprofModel);
        offpgmprofResult.subscribe(offpgmprofResultList => {
            if (offpgmprofResultList.length === 0) {
                this.offpgmprofData = [];
                this.offpgmprofModel = new OffenderProgramProfiles();
            } else {
                offpgmprofResultList.forEach(elemnt => {
                    elemnt.schbutton = '';
                    elemnt['rembutton'] = (this.sessionManager.currentCaseLoadType === 'COMM') ? (this.translateService.translate('ocdprogr.reminder')) : '';
                });
                this.offpgmprofDataTemp = JSON.parse(JSON.stringify(offpgmprofResultList));
                this.offpgmprofData = offpgmprofResultList;
                this.offpgmprofModel = offpgmprofResultList[0];
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocdprogrSaveoffpgmprofForm(event) {
        // TODO declare commit bean and add insert list to that object.
        this.offpgmprofInsertList = [];
        this.offpgmprofUpdateList = [];
        this.offpgmprofInsertList = event.added;
        this.offpgmprofUpdateList = event.updated;
        this.offpgmprofDeleteList = event.removed;
        this.offpgmprofCommitModel.insertList = [];
        this.offpgmprofCommitModel.updateList = [];
        this.offpgmprofCommitModel.deleteList = [];
        if (this.offpgmprofInsertList.length > 0 || this.offpgmprofUpdateList.length > 0) {
            for (let i = 0; i < this.offpgmprofInsertList.length; i++) {
                if (this.offpgmprofValidation(this.offpgmprofInsertList[i])) {
                    return;
                }
                this.offpgmprofInsertList[i].profileClass = 'CRS';
                this.offpgmprofInsertList[i].offenderProgramStatus = 'ALLOC';
                this.offpgmprofInsertList[i].nbtStatus = this.voffprgoblModel.status;
                //this.offpgmprofInsertList[i].programId = this.voffprgoblModel.programId;
                this.offpgmprofInsertList[i].offenderBookId = this.voffprgoblModel.offenderBookId;
                this.offpgmprofInsertList[i].offenderPrgObligationId = this.voffprgoblModel.offenderPrgObligationId;
                this.offpgmprofInsertList[i].sentenceSeq = this.voffprgoblModel.sentenceSeq;
                this.offpgmprofInsertList[i].offenderSentConditionId = this.voffprgoblModel.offenderSentConditionId;
                this.offpgmprofInsertList[i].suspendedFlag = 'N';
                this.offpgmprofInsertList[i].neededFlag = 'Y';
            }
            for (let i = 0; i < this.offpgmprofUpdateList.length; i++) {
                if (this.offpgmprofValidation(this.offpgmprofUpdateList[i])) {
                    return;
                }
                if (this.offpgmprofUpdateList[i].offenderProgramStatus !== 'ALLOC') {
                    this.offpgmprofUpdateList[i].smsFlag = 'N';
                    this.offpgmprofUpdateList[i].emailFlag = 'N';
                    this.offpgmprofUpdateList[i].smsScheduleHoursBefore = null;
                    this.offpgmprofUpdateList[i].emailScheduleHoursBefore = null;
                }
            }
            this.offpgmprofCommitModel.insertList = this.offpgmprofInsertList;
            this.offpgmprofCommitModel.updateList = this.offpgmprofUpdateList;
        }
        if (this.offpgmprofDeleteList.length > 0) {
            for (let i = 0; i < this.offpgmprofDeleteList.length; i++) {
            }
            this.offpgmprofCommitModel.deleteList = this.offpgmprofDeleteList;
        }
        const offpgmprofSaveData = this.ocdprogrFactory.offPgmProfCommit(this.offpgmprofCommitModel);
        offpgmprofSaveData.subscribe(data => {
            if (data !== undefined && data.sealFlag === '1') {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                //this.offpgmprofExecuteQuery();
                this.ocdprogrexecuteQuery();
            } else if (data !== undefined && data.sealFlag === '3') {
                const val = this.translateService.translate('ocdprogr.youcannotendthisallocationon')
                    + DateFormat.getDate(data.offenderEndDate) +
                    this.translateService.translate('ocdprogr.thereareoutcomesrecordedforattendancesbeyondthisdate');
                this.show(val, 'warn');
                this.offpgmprofExecuteQuery();
                return;
            } else if (data !== undefined && data.sealFlag === '2') {
                this.show(this.translateService.translate('ocdprogr.thisallocationincludesasessiontowhichtheoffenderhasalreadybeenallocated'), 'warn');
                this.offpgmprofExecuteQuery();
                return;
            } else if (data !== undefined && data.sealFlag === '4') {
                this.show(this.translateService.translate('ocdprogr.youcannotcancelthisallocatiothereareoutcomesrecordedforattendances'), 'warn');
                this.offpgmprofExecuteQuery();
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
            }
        });
    }

    checkInstNonAssociation() {

    }

    offpgmprofValidation(event) {
        if (!event.offenderStartDate) {
            this.show(this.translateService.translate('common.startdatemustbeentered'), 'warn');
            return true;
        }
        if (!event.offenderProgramStatus) {
            this.show(this.translateService.translate('common.statusmustbeentered'), 'warn');
            return true;
        }
        if (event.offenderProgramStatus === 'END' && !event.offenderEndReason) {
            this.show(this.translateService.translate('ocdprogr.earlyendreasonmustbeentered'), 'warn');
            return true;
        }
        if((!event.moduleFrom || !event.moduleTo) && event.moduleFlag === 'Y'){
            this.show('ocusmodu.nomoduleshaveselected', 'warn');
            return true;
        }
    }
    offcrsappExecuteQuery() {
        this.offcrsappModel = new OffenderCourseAttendance();
        this.offcrsappModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.offcrsappModel.offenderPrgObligationId = this.voffprgoblModel.offenderPrgObligationId;
        const offcrsappResult = this.ocdprogrFactory.
            offCrsAppExecuteQuery(this.offcrsappModel);
        offcrsappResult.subscribe(offcrsappResultList => {
            if (offcrsappResultList.length === 0) {
                this.offcrsappData = [];
                this.offcrsappModel = new OffenderCourseAttendance();
                this.offcrsappIndex = -1;
            } else {
                offcrsappResultList.forEach(elemnt => {
                    elemnt.programId = this.voffprgoblModel.programId;
                    elemnt.phaseId = String(elemnt.phaseId);
                    elemnt.moduleId = String(elemnt.moduleId);
                    elemnt.staffButton = '';
                    elemnt.caseloadId = this.sessionManager.currentCaseLoad;
                    elemnt['reminderName'] = (this.sessionManager.currentCaseLoadType === 'COMM') ?'Reminders': '';


                    // elemnt.eventOutcomeDbVal = elemnt.eventType + '-' + elemnt.eventSubType;
                    if (DateFormat.compareDate(DateFormat.getDate(elemnt.eventDate), DateFormat.getDate()) === 1) {
                        elemnt.parentField = 'futureAttendance';
                    } else {
                        elemnt.parentField = elemnt.eventType + '-' + elemnt.eventSubType;
                    }
                });
                this.offcrsappDataTemp = JSON.parse(JSON.stringify(offcrsappResultList));
                this.offcrsappData = offcrsappResultList;
                this.offcrsappModel = offcrsappResultList[0];
                this.offcrsappIndex = 0;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocdprogrSaveoffcrsappForm() {

        if (this.conflictFlag) {
            this.conflictEvent(this.offcrsappBean);
            return;
        }
        this.conflictFlagOne = false;

        // TODO declare commit bean and add insert list to that object.
        const offcrsappSaveData = this.ocdprogrFactory.offCrsAppCommit(this.offcrsappCommitModel);
        offcrsappSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.offcrsappExecuteQuery();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
            }
        });

    }
    courseAppValidations(event) {
        for (let i = 0; i < event.length; i++) {
            if (!event[i].eventDate) {
                this.show(this.translateService.translate('common.datemustbeentereddate'), 'warn');
                return true;
            }
            if (!event[i].startTime) {
                this.show(this.translateService.translate('ocdprogr.starttimemustbeentered'), 'warn');
                return true;
            }
            if (!event[i].endTime) {
                this.show(this.translateService.translate('ocdprogr.endtimemustbeentered'), 'warn');
                return true;
            }
            if (!event[i].eventSubType) {
                this.show(this.translateService.translate('common.typemustbeentereddot'), 'warn');
                return true;
            }
            if (!event[i].agyLocId) {
                this.show(this.translateService.translate('ocdprogr.locationmustbeentered'), 'warn');
                return true;
            }
            if (!event[i].programId) {
                this.show(this.translateService.translate('ocdprogr.insertofallocationmustincontextofprogramme'), 'warn');
                return true;
            }
        }
        return false;
    }
    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'referralDate') {
            if (event.data.obligationSource === 'INST') {
                // const date = DateFormat.getDate(this.voffprgoblDataList[rowIndex].referralDate);
                if ((event.data.offenderPrgObligationId && DateFormat.compareDate(
                    DateFormat.getDate(this.voffprgoblDataList[rowIndex].referralDate),
                    DateFormat.getDate(event.data.referralDate)) !== 0) || !event.data.offenderPrgObligationId) {
                    if (DateFormat.compareDate(DateFormat.getDate(event.data.referralDate),
                        DateFormat.getDate(this.bkgStartDate)) === -1) {
                        const val = this.translateService.translate('ocdprogr.referraldatecannotbebeforethebookingstartdate') +
                            '(' + DateFormat.format(this.bkgStartDate) + ')';
                        this.show(val, 'warn');
                        this.progGrid.setColumnData('referralDate', rowIndex, undefined);
                        rowdata.validated = true;
                        return rowdata;
                    }
                    if (DateFormat.compareDate(DateFormat.getDate(event.data.referralDate),
                        DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0))) === 1) {
                        this.show(this.translateService.translate('ocdprogr.referraldatedatecannotbelaterthanthecurrentdate'), 'warn');
                        this.progGrid.setColumnData('referralDate', rowIndex, undefined);
                        rowdata.validated = true;
                        return rowdata;
                    }
                }
            } else if (event.data.obligationSource === 'COMM') {
                if ((event.data.offenderPrgObligationId &&
                    DateFormat.compareDate(
                        DateFormat.getDate(this.voffprgoblDataList[rowIndex].referralDate),
                        DateFormat.getDate(event.data.referralDate)) !== 0) ||
                    !event.data.offenderPrgObligationId) {
                    // if (!event.data.sentenceDesc && !event.data.sentenceStartDate) {
                    //     this.show(this.translateService.translate('ocdprogr.youmustchoosethesentencebeforeupdatingthereferraldate'), 'warn');
                    //     this.progGrid.setColumnData('referralDate', rowIndex, undefined);
                    //     rowdata.validated = true;
                    //     return rowdata;
                    // }
                    if (event.data.referralDate && event.data.sentenceStartDate) {
                        if (DateFormat.compareDate(DateFormat.getDate(event.data.referralDate),
                            DateFormat.getDate(event.data.sentenceStartDate)) === -1) {
                            const val = this.translateService.translate('ocdprogr.Referraldatecannotbebeforethesentencestartdate') +
                                '(' + DateFormat.format(event.data.sentenceStartDate) + ')';
                            this.show(val, 'warn');
                            this.progGrid.setColumnData('referralDate', rowIndex, undefined);
                            rowdata.validated = true;
                            return rowdata;
                        }
                    }
                    if (DateFormat.compareDate(DateFormat.getDate(event.data.referralDate),
                        DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0))) === 1) {
                        this.show(this.translateService.translate('ocdprogr.referraldatedatecannotbelaterthanthecurrentdate'), 'warn');
                        this.progGrid.setColumnData('referralDate', rowIndex, undefined);
                        rowdata.validated = true;
                        return rowdata;
                    }
                }
            }
        }
        rowdata.validated = true;
        return rowdata;

    }
    onUpdbutLaunchClick = () => {
        if (this.voffprgoblModel.status === 'ALLOC' || this.voffprgoblModel.status === 'REF' ||
            this.voffprgoblModel.status === 'SUSP' ||
            this.voffprgoblModel.status === '121') {
            if (this.voffprgoblModel.allocCount > 0) {
                this.voffprgoblModel.pQueryOnly = 'Y';
            } else {
                this.voffprgoblModel.pQueryOnly = 'N';
            }
            this.dialogService.openLinkDialog('/OCUUPSTA', this.voffprgoblModel, 80).subscribe(result => {
                this.ocdprogrexecuteQuery();
            });
            return true;
        } else {
            this.show(this.translateService.translate('ocdprogr.youdonothavepermissiontoupdatethestatus'), 'warn');
            return false;
        }
    }
    get crsAppsavBtnflag() {
        /* if (this.offcrsappData.length !== 0) { */
        if (this.crsgrid.addedMap.size > 0 || this.crsgrid.updatedMap.size > 0) {
            return false;
        }

        return true;
    }
    appointmentsGridClear = () => {
        this.conflictFlag = false;
        this.offcrsappBean = new OffenderCourseAttendance();
        this.offcrsappExecuteQuery();
    } 
    onLovChange(event) {
        const index = this.offcrsappData.indexOf(this.offcrsappBean);
        if(this.offcrsappBeanTemp.toInternalLocationId != this.offcrsappBean.toInternalLocationId){
            if (event && event.code) {
                this.crsgrid.setColumnData('test', index, event.code);
            } else if (event === undefined) {
                this.crsgrid.setColumnData('test', index, '');
            }
        }
       
    }
    onUnderLovChange(event) {
        const index = this.offcrsappData.indexOf(this.offcrsappBean); 
        if(this.offcrsappBeanTemp.understandingCode != this.offcrsappBean.understandingCode){
            if (event && event.code) {
                this.crsgrid.setColumnData('test', index, event.code);
            } else if (event === undefined) {
                this.crsgrid.setColumnData('test', index, '');
            }
        }
    }
    onEngLovChange(event) {
        const index = this.offcrsappData.indexOf(this.offcrsappBean);
        if(this.offcrsappBeanTemp.engagementCode != this.offcrsappBean.engagementCode){
            if (event && event.code) {
                this.crsgrid.setColumnData('test', index, event.code);
            } else if (event === undefined) {
                this.crsgrid.setColumnData('test', index, '');
            }
        }
        
    }
    onKeyPressEvent() {
        const index = this.offcrsappData.indexOf(this.offcrsappBean);
        this.crsgrid.setColumnData('test', index, this.offcrsappBean.commentText);
    }
    validateCrsAppRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'agyLocId' && event.data.agyLocId) {
            this.intLocLink = `ocdprogr/rgIntLocationRecordGroup?agyLocId=${event.data.agyLocId}`;
        }
        if (!event.data.programId) {
            this.show(this.translateService.translate('ocdprogr.insertofallocationmustincontextofprogramme'), 'warn');
            rowdata.validated = true;
            return rowdata;
        }
        if (event.field === 'eventDate') {
            if (event.data.eventId &&
                DateFormat.compareDate(DateFormat.getDate(this.offcrsappDataTemp[rowIndex].eventDate), event.data.eventDate) !== 0) {
                this.conflictEvent(event.data);
                rowdata.validated = true;
                return rowdata;
            } else {
                this.conflictEvent(event.data);
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'startTime' && event.data.endTime && event.data.startTime) {
            if (DateFormat.compareTime(event.data.startTime, DateFormat.getDate(event.data.endTime)) === 1) {
                this.crsgrid.setColumnData('startTime', rowIndex, undefined);
                this.show(this.translateService.translate('ocdprogr.starttimecannotbelaterthanendtime'), 'warn');
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'endTime' && event.data.endTime && event.data.startTime) {
            if (DateFormat.compareTime( DateFormat.getDate(event.data.startTime), event.data.endTime) === 1) {
                this.crsgrid.setColumnData('endTime', rowIndex, undefined);
                this.show(this.translateService.translate('ocdprogr.endtimecannotbeearlierthantarttime'), 'warn');
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'phaseId') { //&& (!event.data.phaseId)
            this.crsgrid.setColumnData('moduleId', rowIndex, undefined);
        }
        if (event.field === 'eventOutcome' && this.sessionManager.currentCaseLoadType === 'COMM'
            && event.data.eventId && event.data.eventOutcome !== this.offcrsappDataTemp[rowIndex].eventOutcomeDbVal) {
            const schConflictServiceObj = this.ocdprogrFactory.checkUa(event.data);
            schConflictServiceObj.subscribe(data => {
                if (data.lvNewUa) {
                    event.data.unexcusedAbsenceFlag = 'Y';
                    if (data.lvMultipleFailure) {
                        this.dialogService.openLinkDialog('/OCUMULTI', event.data, 80).subscribe(result => {
                            if (result !== null) {
                                event.data.unexcusedAbsenceFlag = 'Y';
                            } else {
                                event.data.unexcusedAbsenceFlag = 'N';
                                this.crsgrid.setColumnData('eventOutcome', rowIndex, undefined)
                                rowdata.validated = true;
                                return rowdata;
                            }
                        });
                    }
                } else {
                    event.data.unexcusedAbsenceFlag = undefined;
                }
            });
        }
        rowdata.validated = true;
        return rowdata;

    }
    validateoffPrgRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'offenderEndDate' && event.data.offenderEndDate && event.data.offPrgrefId) {
            if (event.data.offenderProgramStatus === 'END' && event.data.offPrgStatusDbVal !== 'END') {
                if (DateFormat.compareDate(DateFormat.getDate(event.data.offenderEndDate), DateFormat.getDate()) === 1) {
                    this.show(this.translateService.translate('ocdprogr.theenddatecannotbeinthefuture'), 'warn');
                    this.offprggrid.setColumnData('offenderEndDate', rowIndex, undefined);
                    rowdata.validated = true;
                    return rowdata;
                }
                if (DateFormat.compareDate(DateFormat.getDate(event.data.offenderEndDate),
                    DateFormat.getDate(this.offpgmprofDataTemp[rowIndex].offenderEndDate)) === 1) {
                    let msg = this.translateService.translate('ocdprogr.theenddatemustbelessthanorequaltotheenddateofthecourse') +
                        DateFormat.format(this.offpgmprofDataTemp[rowIndex].offenderEndDate) + ')';
                    msg = String(msg);
                    this.show(msg, 'warn');
                    this.offprggrid.setColumnData('offenderEndDate', rowIndex, undefined);
                    rowdata.validated = true;
                    return rowdata;
                }
            }
            const allocDateObj = this.ocdprogrFactory.validAllocationEndDate(event.data);
            allocDateObj.subscribe(alDate => {
                if (!alDate) {
                    let msg = this.translateService.translate('ocdprogr.cannotspecifythisenddateasactiveattendancesexistbetween') +
                        DateFormat.format(event.data.offenderEndDate) + this.translateService.translate('ocdprogr.andtoday');
                    msg = String(msg);
                    this.show(msg, 'warn');
                    this.offprggrid.setColumnData('offenderEndDate', rowIndex, undefined);
                    rowdata.validated = true;
                    return rowdata;
                } else {

                }

            });
        }
        if (event.field === 'offenderProgramStatus' && event.data.offenderProgramStatus && event.data.offPrgrefId) {
            if (event.data.offenderProgramStatus === 'END') {
                this.offprggrid.requiredOn('offenderEndReason');
            } else {
                this.offprggrid.requiredOff('offenderEndReason');
            }
            if (event.data.offenderProgramStatus === 'END') {

                const resObj = this.ocdprogrFactory.checkAttendanceOutcomes(event.data);
                resObj.subscribe(result => {
                    if (!result) {
                        const data = {
                            label: this.translateService.translate('ocdprogr.associatedattendanceswithnooutcomesexistoktoproceed')
                            , yesBtn: true, noBtn: true
                        };
                        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                            if (result) {
                                rowdata.validated = true;
                                return rowdata;
                            } else {
                                this.offprggrid.setColumnData('offenderProgramStatus', rowIndex, event.data.offPrgStatusDbVal);
                                rowdata.validated = true;
                                return rowdata;
                            }
                        });
                    } else {
                        rowdata.validated = true;
                        return rowdata;
                    }
                });
                if (event.data.offenderEndDate &&
                    DateFormat.compareDate(event.data.offenderEndDate, DateFormat.getDate()) === -1) {
                    this.offprggrid.setColumnData('offenderEndDate', rowIndex, DateFormat.getDate());
                } else if (!event.data.offenderEndDate) {
                    this.offprggrid.setColumnData('offenderEndDate', rowIndex, DateFormat.getDate());
                }

                this.offprggrid.setColumnData('offenderEndReason', rowIndex, undefined);

            } else if (event.data.offenderProgramStatus === 'ALLOC') {
                this.offprggrid.setColumnData('offenderEndReason', rowIndex, undefined);
                this.offprggrid.setColumnData('offenderEndDate', rowIndex, event.data.offEndDate);
            } else if (event.data.offenderProgramStatus === 'CANC') {
                const data = {
                    label: this.translateService.translate('ocdprogr.areyousureyouwanttocancelthisallocationthisactioncannotbereversed')
                    , yesBtn: true, noBtn: true
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                    if (result) {
                        rowdata.validated = true;
                        return rowdata;
                    } else {
                        this.offprggrid.setColumnData('offenderProgramStatus', rowIndex, event.data.offPrgStatusDbVal);
                        rowdata.validated = true;
                        return rowdata;
                    }
                });
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    conflictEvent(event) {
        this.conflictFlag = false;
        event.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const schConflictServiceObj = this.ocdprogrFactory.checkScheduleConflict(event);
        schConflictServiceObj.subscribe(data => {
            if (data === 0) {
            } else {
                this.dialogService.openLinkDialog('/oiuscinq', event).subscribe(result => {
                    if (result !== null) {
                        this.conflictFlag = false;
                    } else {
                        this.conflictFlag = true;
                    }
                });
            }

        });
    }
    onbackBtnClick = () => {
        if (this.oidpwaitFactory.exitFlag) {
            this.oidpwaitFactory.exitFlag = false;
            this.backBtn = false;
            this.oidpwaitFactory.fromOcdprog = true;
            this.oidpwaitFactory.oidpwaitScreenObj = this.vOffPrgOblModel;
            window.history.back();
        }
        if(this.schedularService.backBtnFlag){
			this.schedularService.backBtnFlag = false;
			this.router.navigate(['/CALSCH']);
		}
    }

    onButScheduleClick = () => {
        const modelData = { crsActyId: this.offpgmprofBean.crsActyId, pQueryOnly: 'Y' };
        this.dialogService.openLinkDialog('/OCMSCHPR', modelData, 80).subscribe(result => {

        });
    }


    nonassEvent(event) {
        this.conflictFlagOne = false;
        event.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const schConflictServiceObj = this.oidononaFactory.offNaExecuteQuery(event);
        schConflictServiceObj.subscribe(data => {
            if (data === 0) {
            } else {
                //Not using
                this.dialogService.openLinkDialog('/ocdprogrpopup', event).subscribe(result => {
                    if (result !== null) {
                        this.conflictFlagOne = false;
                    } else {
                        this.conflictFlagOne = true;
                    }
                });
            }

        });
    }



    onPopup() {
        this.conflictFlagOne = false;
        if (this.courseAppValidations(this.offcrsappData)) {
            return;
        }
        const commstatus = this.createCourseActivitiesCommitBean();
        if (commstatus) {
            if (this.sessionManager.currentCaseLoad === 'CC' || this.sessionManager.currentCaseLoad === 'COMM') {
                const serviceObject = this.ocdprogrFactory.checkNonAssociations(this.offcrsappCommitModel);
                serviceObject.subscribe(data => {
                    if (data && data !== 'EMPTYDATA') {
                        const msgOne = this.translateService.translate('ocdprogr.nonassociationconflictmsg');
                        const msgTwo = this.translateService.translate('ocdprogr.doyouwanttocontinue');
                        data = data.replaceAll('ocdprogr.nonassociationconflictmsg', msgOne);
                        data = data.replaceAll('ocdprogr.doyouwanttocontinue', msgTwo);
                        const Dialogdata = {
                            label: data, yesBtn: true, noBtn: true, allowLineGap: true,
                            yesLabel: this.translateService.translate('Yes'),
                            noLabel: this.translateService.translate('No')
                        };
                        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', Dialogdata, 50).subscribe(result => {
                            if (result === true) {
                                this.conflictFlagOne = true;
                                this.ocdprogrSaveoffcrsappForm();
                                return;
                            } else {
                                return;
                            }
                        });
                    } else {
                        this.conflictFlagOne = true;
                        this.ocdprogrSaveoffcrsappForm();
                        return;
                    }
                });
            
             } else {
                this.ocdprogrFactory.checkInstNonAssociationsWhileScheduling(this.offcrsappCommitModel).subscribe(data => {
                    if (data && data !== 'EMPTYDATA') {
                        const msgOne = this.translateService.translate('ocdprogr.nonassociationconflictmsg');
                        const msgTwo = this.translateService.translate('ocdprogr.doyouwanttocontinue');
                        const msgThree = this.translateService.translate('ocdprogr.indinonassocconflict');
                        const msgFour = this.translateService.translate('ocdprogr.gangnonassocconflict');
                        data = data.replaceAll('ocdprogr.nonassociationconflictmsg', msgOne);
                        data = data.replaceAll('ocdprogr.doyouwanttocontinue', msgTwo);
                        data = data.replaceAll('ocdprogr.indinonassocconflict', msgThree);
                        data = data.replaceAll('ocdprogr.gangnonassocconflict', msgFour);
                        const Dialogdata = {
                            label: data, yesBtn: true, noBtn: true, allowLineGap: true,
                            yesLabel: this.translateService.translate('Yes'),
                            noLabel: this.translateService.translate('No')
                        };
                        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', Dialogdata, 50).subscribe(result => {
                            if (result === true) {
                                this.conflictFlagOne = true;
                                this.ocdprogrSaveoffcrsappForm();
                                return;
                            } else {
                                return;
                            }
                        });
                    } else {
                        this.conflictFlagOne = true;
                        this.ocdprogrSaveoffcrsappForm();
                        return;
                    }
                });

            }
        }
    }
    createCourseActivitiesCommitBean() {
        this.offcrsappInsertList = [];
        this.offcrsappUpdateList = [];
        this.offcrsappDeleteList = [];
        this.offcrsappCommitModel.insertList = [];
        this.offcrsappCommitModel.updateList = [];
        this.offcrsappCommitModel.deleteList = [];
        this.crsgrid.addedMap.forEach(
            (v: any, k: number) => {
                this.offcrsappInsertList.push(v);
            }
        );
        this.crsgrid.updatedMap.forEach(
            (v: any, k: number) => {
                this.offcrsappUpdateList.push(v);
            }
        );
        this.crsgrid.removedMap.forEach(
            (v: any, k: number) => {
                this.offcrsappDeleteList.push(v);
            }
        );
        if (this.offcrsappInsertList.length > 0 || this.offcrsappUpdateList.length > 0) {
            for (let i = 0; i < this.offcrsappInsertList.length; i++) {
                if (this.courseAppValidations(this.offcrsappInsertList[i])) {
                    return;
                }
                this.offcrsappInsertList[i].startTime = TimeFormat.parse(TimeFormat.format(this.offcrsappInsertList[i].startTime),
                    this.offcrsappInsertList[i].eventDate);
                this.offcrsappInsertList[i].endTime = TimeFormat.parse(TimeFormat.format(this.offcrsappInsertList[i].endTime),
                    this.offcrsappInsertList[i].eventDate);
                this.offcrsappInsertList[i].eventType = 'ACP';
                this.offcrsappInsertList[i].eventStatus = 'SCH';
                this.offcrsappInsertList[i].offenderPrgObligationId = this.voffprgoblModel.offenderPrgObligationId;
                this.offcrsappInsertList[i].offenderBookId = this.voffprgoblModel.offenderBookId;
                this.offcrsappInsertList[i].unexcusedAbsenceFlag = undefined;
                this.offcrsappInsertList[i].programId = this.voffprgoblModel.programId;
               // this.offcrsappInsertList[i].toInternalLocationId = this.voffprgoblModel.toInternalLocationId;
            }
            for (let i = 0; i < this.offcrsappUpdateList.length; i++) {
                if (this.courseAppValidations(this.offcrsappUpdateList[i])) {
                    return;
                }
                if (this.offcrsappUpdateList[i].eventOutcome) {
                    this.offcrsappUpdateList[i].eventStatus = 'COMP';
                } else {
                    this.offcrsappUpdateList[i].eventStatus = 'SCH';
                }
                this.offcrsappUpdateList[i].startTime = TimeFormat.parse(TimeFormat.format(this.offcrsappUpdateList[i].startTime),
                    this.offcrsappUpdateList[i].eventDate);
                this.offcrsappUpdateList[i].endTime = TimeFormat.parse(TimeFormat.format(this.offcrsappUpdateList[i].endTime),
                    this.offcrsappUpdateList[i].eventDate);
                this.offcrsappUpdateList[i].programId = this.voffprgoblModel.programId;
            }
            this.offcrsappCommitModel.insertList = this.offcrsappInsertList;
            this.offcrsappCommitModel.updateList = this.offcrsappUpdateList;
        }
        if (this.offcrsappDeleteList.length > 0) {
            for (let i = 0; i < this.offcrsappDeleteList.length; i++) {
            }
            this.offcrsappCommitModel.deleteList = this.offcrsappDeleteList;
        }
        return true;
    }

    offPgmProfGridClear = () => {
        this.offpgmprofExecuteQuery();
        this.rowinsert = undefined;
        if (this.rowinsert == undefined) {
            this.assignBtnDisable = true;
        } else {
            this.assignBtnDisable = false;
        }
        return true;

    }

    voffPrgOnDel = () => {
        if (this.voffprgoblData.length === 1) {
            this.onRowClickvoffprgobl(undefined);
        }
        return true;
    }

    ngOnDestroy() {
		this.schedularService.backBtnFlag = false;
	  }

      remindersLaunch = (data) => {

		const index = this.offcrsappData.indexOf(data);
		data['screenId'] = 'OCDPROGR';
        data['subType'] ='Appointment';
        if (data.eventDate && data.startTime) {
            let startHours = DateFormat.getDate(data.startTime).getHours();
            let startMinutes = DateFormat.getDate(data.startTime).getMinutes();
            const eventDate1 = DateFormat.getDate(DateFormat.getDate(data.eventDate).setHours(startHours, startMinutes, 0, 0));
            const eventDate2 = DateFormat.getDate(DateFormat.getDate().setHours(DateFormat.getDate().getHours(), DateFormat.getDate().getMinutes(), 0, 0));
            if (DateFormat.compareDateTime(eventDate1, eventDate2) === -1) {
              this.show(this.translateService.translate('ocdprogr.pastevents'), 'warn');
              return;
            }

		else if (!data.createDatetime && !data.eventId) {
			this.show (this.translateService.translate('ocdclogs.pleasesaverecordsbeforecontinuing '));
			return;
		} else {
			this.dialogService.openLinkDialog('/OCUREMIN', data, 25).subscribe(res => {
				if (res && Object.keys(res).length > 0) {
					this.offcrsappExecuteQuery();
				} else {
					this.offcrsappExecuteQuery();

				}
			});
		}
	}
      }
    onConflictLaunchEdit = (event) => {
        event.screenId = 'OCDPROGR';
        event.eventSubType = 'Assignment'

        if (event.programLastEventDate) {
            let startHours = DateFormat.getDate(event.programLastEventDate).getHours();
            let startMinutes = DateFormat.getDate(event.programLastEventDate).getMinutes();
            const eventDate1 = DateFormat.getDate(DateFormat.getDate(event.programLastEventDate).setHours(startHours, startMinutes, 0, 0));
            const eventDate2 = DateFormat.getDate(DateFormat.getDate().setHours(DateFormat.getDate().getHours(), DateFormat.getDate().getMinutes(), 0, 0));
            if (DateFormat.compareDateTime(eventDate1, eventDate2) === -1) {
                this.show(this.translateService.translate('ocdprogr.pastevents'), 'warn');
                return;
            }
        }
        if (event.offenderProgramStatus !== 'ALLOC') {
            this.show(this.translateService.translate('ocdprogr.cancelevents'), 'warn');
            return;
        }
        this.dialogService.openLinkDialog('/OCUREMIN', event, 25).subscribe(result => {
            if (result) {
                this.offpgmprofExecuteQuery()
            }
        });
    }

    }
