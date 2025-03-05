import {
    Component, OnInit, Injectable, Pipe, PipeTransform, Directive,
    ElementRef,
    ViewChild,
    OnDestroy
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderPrgObligations } from '@instprogramswithoutschedulesbeans/OffenderPrgObligations';
import { OffenderProgramProfiles } from '@instprogramswithoutschedulesbeans/OffenderProgramProfiles';
import { OffenderCaseNotes } from '@inst/casemanagement/beans/OffenderCaseNotes';
import { VOffenderCourseEvents } from '@inst/institutional-activities/beans/VOffenderCourseEvents';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OffenderPrgObligationsCommitBean } from '@instprogramswithoutschedulesbeans/OffenderPrgObligationsCommitBean';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { OidowrelService } from '../service/oidowrel.service';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { OffenderProgramProfilesCommitBean } from '@instprogramswithoutschedulesbeans/OffenderProgramProfilesCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OffenderCaseNotesCommitBean } from '@inst/casemanagement/beans/OffenderCaseNotesCommitBean';
import { VOffenderCourseEventsCommitBean } from '@inst/institutional-activities/beans/VOffenderCourseEventsCommitBean';
import { SchedulerService } from '@core/ui-components/schedule/scheduler.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-oidowrel',
    templateUrl: './oidowrel.component.html',
})

export class OidowrelComponent implements OnInit, OnDestroy {
    // Variable declaration
    @ViewChild('offprgprofiles', { static: true }) offprgprofiles: any;
    @ViewChild('offworkrefferal', { static: true }) offworkrefferal: any;
    @ViewChild('prgrsnotes', { static: true }) prgrsnotes: any;
    @ViewChild('offschegrid', { static: true }) offschegrid: any;


    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offprgobligationsData: OffenderPrgObligations[] = [];
    tabIndex: number;
    offprgobligationsCommitModel: OffenderPrgObligationsCommitBean = new OffenderPrgObligationsCommitBean();
    type: string;
    message: string;
    enableInsert: boolean;
    enableInsertTwo: boolean;
    updatePrmStatusDisabled: boolean;
    offprgobligationsInsertList: OffenderPrgObligations[] = [];
    offprgobligationsUpdatetList: OffenderPrgObligations[] = [];
    offprgobligationsDeleteList: OffenderPrgObligations[] = [];
    offprogramprofilesModel: OffenderProgramProfiles = new OffenderProgramProfiles();
    offprogramprofilesData: OffenderProgramProfiles[] = [];
    commentTextTemp: string;
    offprogramprofilesInsertList: OffenderProgramProfiles[] = [];
    offprogramprofilesUpdatetList: OffenderProgramProfiles[] = [];
    offprogramprofilesDeleteList: OffenderProgramProfiles[] = [];
    offdrProgramProfCommtBeanModel: OffenderProgramProfilesCommitBean = new OffenderProgramProfilesCommitBean();
    offprgobligationsModel: OffenderPrgObligations = new OffenderPrgObligations();
    offprogramprofilesDataTemp: OffenderProgramProfiles[] = [];
    offprgobligationsModelTemp: OffenderPrgObligations = new OffenderPrgObligations();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    viewLink: string;
    viewRedOnly: boolean;
    viewtitle: {};
    nbtView: string;
    offendercasenotesInsertList: OffenderCaseNotes[] = [];
    offendercasenotesUpdatetList: OffenderCaseNotes[] = [];
    offendercasenotesDeleteList: OffenderCaseNotes[] = [];
    offenderCaseNotesCommtBeanModel: OffenderCaseNotesCommitBean = new OffenderCaseNotesCommitBean();
    offprgobligationsModelTempOne: OffenderProgramProfiles = new OffenderProgramProfiles();
    caseLoadTypeTemp: string;
    staffName: string;
    placementReadOnly: boolean;
    progLocationDisable: boolean;
    vOffenderCourseEventsCommitBean: VOffenderCourseEventsCommitBean = new VOffenderCourseEventsCommitBean();
    offprgobligationsDataTemp: OffenderPrgObligations[] = [];
    offprgobligationsIndex: number = 0;
    offprogramprofilesIndex: number = 0;
    voffendercourseeventsData: VOffenderCourseEvents[] = [];
    voffendercourseeventsDataTemp: VOffenderCourseEvents[] = [];
    voffendercourseeventsModel: VOffenderCourseEvents = new VOffenderCourseEvents();
    voffendercourseeventsIndex: number = 0;
    voffendercourseeventsInsertList: VOffenderCourseEvents[] = [];
    voffendercourseeventsUpdatetList: VOffenderCourseEvents[] = [];
    voffendercourseeventsDeleteList: VOffenderCourseEvents[] = [];
    offendercasenotesData: OffenderCaseNotes[] = [];
    offendercasenotesDataTemp: OffenderCaseNotes[] = [];
    offendercasenotesModel: OffenderCaseNotes = new OffenderCaseNotes();
    offendercasenotesModelTemp: OffenderCaseNotes = new OffenderCaseNotes();
    offendercasenotesIndex: number = 0;
    vOffenderCourseEventsCommitBeanModel: VOffenderCourseEventsCommitBean = new VOffenderCourseEventsCommitBean();
    vOffenderCourseEventsColumnDef: any[];
    offPrgObligationsColumnDef: any[];
    offprogramprofilesColumnDefs: any[];
    offenderCaseNotesColumnDef: any[];
    backButton: Boolean;
    constructor(public translateService: TranslateService,
        public sessionManager: UserSessionManager,
        public oidowrelService: OidowrelService,
        private dialogService: DialogService, private schedularService: SchedulerService,private router: Router) {
        this.vOffenderCourseEventsColumnDef = [];
        this.offPrgObligationsColumnDef = [];
        this.offprogramprofilesColumnDefs = [];
        this.offenderCaseNotesColumnDef = [];
    }
    ngOnInit() {
        if (this.schedularService.backBtnFlag) {
			this.backButton = true;
		 } else {
			this.backButton = false;
		 }
        this.caseLoadTypeTemp = this.sessionManager.currentCaseLoadType;
        this.enableInsert = false;
        this.enableInsertTwo = false;
        this.updatePrmStatusDisabled = true;
        this.viewtitle = { description: 'View' };
        this.viewLink = 'oidowrel/viewLink';
        this.placementReadOnly = true;
        this.progLocationDisable = true;
        this.viewRedOnly = true;

        this.offPrgObligationsColumnDef = [
            { fieldName: this.translateService.translate('oidowrel.program'), field: 'programId', editable: true, datatype: 'lov', required: true, width: 150, link: 'oidowrel/rgProgramRecordGroup', cellEditable: this.programCellEdit },
            { fieldName: this.translateService.translate('oidowrel.referraldate'), field: 'referralDate', editable: false, width: 150, required: true, datatype: 'date' },
            { fieldName: this.translateService.translate('oidowrel.priority'), field: 'referralPriority', editable: true, width: 150, datatype: 'lov', domain: 'PS_PRIORITY', cellEditable: this.programCellEdit },
            { fieldName: this.translateService.translate('oidowrel.comment'), field: 'commentText', editable: true, width: 150, datatype: 'text', uppercase: 'false', cellEditable: this.programCellEdit },
            { fieldName: this.translateService.translate('oidowrel.status'), field: 'status', editable: false, width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('oidowrel.decisiondate'), field: 'decisionDate', editable: false, width: 150, datatype: 'date' },
        ];

        this.offprogramprofilesColumnDefs = [
            { fieldName: this.translateService.translate('oidowrel.projectcode'), field: 'projectCode', editable: false, width: 150, required: true, datatype: 'text' },
            {
                fieldName: '', field: 'btn', width: 150, datatype: 'hyperlink', editable: true,
                displayas: 'href', dialogWidth: '80%', styleClass: 'search', onLaunchClick: this.viewLaunchClick,
                modal: true, data: 'row', updateField: 'row'
            },
            { fieldName: this.translateService.translate('oidowrel.provider'), field: 'providerName', editable: false, width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('oidowrel.offenderstartdate'), field: 'offenderStartDate', editable: true, width: 150, required: true, datatype: 'date' },
            { fieldName: this.translateService.translate('oidowrel.enddate'), field: 'offenderEndDate', editable: true, width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate('oidowrel.endreason'), field: 'offenderEndReason', editable: true, width: 150, datatype: 'lov', domain: 'WR_OUTCOMES' },
            { fieldName: '', field: 'programId', hide: true },
            { fieldName: '', field: 'crsActyId', hide: true },
            { fieldName: '', field: 'commentText', hide: true },
        ];

        this.vOffenderCourseEventsColumnDef = [
            { fieldName: this.translateService.translate('oidowrel.eventdate'), field: 'eventDate', editable: false, width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate('oidowrel.outtime'), field: 'startTime', editable: false, width: 150, datatype: 'time' },
            { fieldName: this.translateService.translate('oidowrel.intime'), field: 'endTime', editable: false, width: 150, datatype: 'time' },
            { fieldName: this.translateService.translate('oidowrel.type'), field: 'eventType', editable: false, width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('oidowrel.providertype'), field: 'providerName', editable: false, width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('oidowrel.outtimesec'), field: 'extMoveOutTime', editable: false, width: 150, datatype: 'time' },
            { fieldName: this.translateService.translate('oidowrel.intimesec'), field: 'extMoveInTime', editable: false, width: 150, datatype: 'time' },
            { fieldName: this.translateService.translate('oidowrel.cancelreason'), field: 'outcomeReasonCode', editable: true, width: 150, datatype: 'lov', domain: 'WR_OUTCOMES' },
            { fieldName: this.translateService.translate('oidowrel.comment'), field: 'commentText', editable: true, width: 150 },
        ];

        this.offenderCaseNotesColumnDef = [
            { fieldName: this.translateService.translate('oidowrel.contactdate'), field: 'contactDate', editable: true, width: 150, required: true, datatype: 'date' },
            { fieldName: this.translateService.translate('oidowrel.contacttime'), field: 'contactTime', editable: true, width: 150, required: true, datatype: 'time' },
            { fieldName: this.translateService.translate('oidowrel.type'), field: 'caseNoteType', editable: false, width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('oidowrel.subtype'), field: 'caseNoteSubType', editable: true, width: 150, required: true, datatype: 'lov', domain: 'TASK_SUBTYPE', cellEditable: this.caseNoteCellEdit },
            { fieldName: this.translateService.translate('oidowrel.notetext'), field: 'caseNoteText', editable: true, width: 150, datatype: 'text', cellEditable: this.caseNoteCellEdit, maxlength: '11' },
            { fieldName: '', field: 'butIwp', datatype: 'launchbutton', editable: false, width: 150, link: '/OIUIWPVE', modal: true, data: 'row', isDisable: this.isDialogDisable, onLaunchClick: this.onDClick },
            { fieldName: '', field: 'butGo', datatype: 'launchbutton', editable: false, width: 150, modal: true, data: 'row', isDisable: this.isDialogDisable, onLaunchClick: this.onGClick }, { fieldName: '', field: 'butR', datatype: 'launchbutton', link: '/OCUNOTCM', modal: true, data: 'row', editable: false, width: 150, isDisable: this.isDialogDisable, onLaunchClick: this.onRClick },
            { fieldName: '', field: 'butAmendment', datatype: 'launchbutton', link: '/ocucname', modal: true, data: 'row', editable: false, width: 150, isDisable: this.isDialogDisable, onLaunchClick: this.onAClick },
            { fieldName: this.translateService.translate('ocdpnote.amended'), field: 'amendmentFlag', datatype: 'checkbox', editable: true, width: 150 },
            { fieldName: '', field: 'dateCreation', hide: true },
            { fieldName: '', field: 'timeCreation', hide: true },
            { fieldName: '', field: 'staffName', hide: true },
        ];
    }

    programCellEdit = (data: any, index: number, field: string): boolean => {
        if (data.offenderPrgObligationId) {
            return false;
        }
        return true;
    }

    caseNoteCellEdit = (data: any, index: number, field: string): boolean => {
        if (data.caseNoteId) {
            return false;
        }
        return true;
    }
    isDialogDisable(data) {
        return !data.caseNoteId;
    }

    onOffenderChange(offender) {
        this.vHeaderBlockModel = new VHeaderBlock();
        if (offender) {
            this.vHeaderBlockModel = offender;
            if (this.vHeaderBlockModel.offenderBookId) {
                this.offprogramprofilesModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.offprogramprofilesModel.offenderId = this.vHeaderBlockModel.offenderId;
                this.voffendercourseeventsData = [];
                this.offendercasenotesData = [];
                this.offprgobligationsData = [];
                this.offprogramprofilesData = [];
                this.exceuteQueryGridOne();
                this.enableInsert = true;
                this.enableInsertTwo = false;
                this.offprogramprofilesData = [];
                this.offprgobligationsModelTemp = new OffenderPrgObligations();
                this.voffendercourseeventsModel = new VOffenderCourseEvents();
                this.nbtView = '2';
                this.offendercasenotesModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.commentTextTemp = undefined;
                this.offendercasenotesModelTemp = new OffenderCaseNotes();
                this.offcasenotesExecuteQuery();
                this.staffExcecuteQuery();
                this.viewRedOnly = false;
                this.progLocationDisable = true;
            }
        } else {
            this.enableInsert = false;
            this.updatePrmStatusDisabled = true;
            this.offprgobligationsModelTemp = new OffenderPrgObligations();
            this.enableInsertTwo = false;
            this.viewRedOnly = true;
            this.voffendercourseeventsModel = new VOffenderCourseEvents();
            this.voffendercourseeventsData = [];
            this.offendercasenotesData = [];
            this.offprgobligationsData = [];
            this.offprogramprofilesData = [];
            this.nbtView = undefined;
            this.offendercasenotesModel = new OffenderCaseNotes();
            this.commentTextTemp = undefined;
            this.offendercasenotesModelTemp = new OffenderCaseNotes();
            this.offcasenotesExecuteQuery();
            this.staffName = undefined;
            this.progLocationDisable = true;
            this.voffendercourseeventsModel.view = '2';
        }
    }

    staffExcecuteQuery() {
        const obj = this.oidowrelService.staffNameExcecuteQuery();
        obj.subscribe(data => {
            this.staffName = data;
        })
    }

    exceuteQueryGridOne() {
        const obj = this.oidowrelService.offPrgObligationsExecuteQuery(this.offprogramprofilesModel);
        obj.subscribe(data => {
            if (data && data.length > 0) {
                data.forEach(e => {
                    e.programId = String(e.programId);
                });
                this.offprgobligationsData = data;
                this.tabIndex = 0;
                this.updatePrmStatusDisabled = false;
            } else {
                this.offprgobligationsData = [];
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show(this.message, this.type);
                this.tabIndex = -1;
                this.updatePrmStatusDisabled = true;
            }
        });

    }


    gridOnRowClickOne(event) {
        if (event && event.offenderPrgObligationId) {
            this.offprgobligationsModelTemp = event;
            this.updatePrmStatusDisabled = false
            this.enableInsertTwo = true;
        } else {
            this.updatePrmStatusDisabled = true
            this.offprgobligationsModelTemp = new OffenderPrgObligations();
            this.enableInsertTwo = false;
            this.progLocationDisable = true;
        }
        this.exceuteQueryGridTwo();
    }

    validateRowDataOne = (event) => {
        const rowdata = new ValidateRowReturn();

        rowdata.validated = true;
        return rowdata;
    }


    onGridInsertOne = () => {
        return { status: 'Referred', referralDate: DateFormat.getDate() };
    }

    saveOne(event) {
        this.offprgobligationsInsertList = event.added
        this.offprgobligationsUpdatetList = event.updated
        this.offprgobligationsDeleteList = event.removed

        this.offprgobligationsCommitModel.insertList = [];
        this.offprgobligationsCommitModel.updateList = [];
        this.offprgobligationsCommitModel.deleteList = [];

        if (!this.validationMethodOne(this.offprgobligationsInsertList)) {
            return;
        }
        if (!this.validationMethodOne(this.offprgobligationsUpdatetList)) {
            return;
        }
        if (this.offprgobligationsInsertList.length > 0 || this.offprgobligationsUpdatetList.length > 0 || this.offprgobligationsDeleteList.length > 0) {
            for (let i = 0; i < this.offprgobligationsInsertList.length; i++) {
                this.offprgobligationsInsertList[i].eventType = 'WR';
                this.offprgobligationsInsertList[i].eventSubType = 'WR';
                this.offprgobligationsInsertList[i].obligationSource = 'INST';
                this.offprgobligationsInsertList[i].offenderBookId = this.offprogramprofilesModel.offenderBookId;
                this.offprgobligationsInsertList[i].status = 'REF';
                this.offprgobligationsCommitModel.insertList = this.offprgobligationsInsertList;
            }
            for (let i = 0; i < this.offprgobligationsUpdatetList.length; i++) {
                this.offprgobligationsUpdatetList[i].eventType = 'WR';
                this.offprgobligationsUpdatetList[i].eventSubType = 'WR';
                this.offprgobligationsUpdatetList[i].obligationSource = 'INST';
                this.offprgobligationsUpdatetList[i].offenderBookId = this.offprogramprofilesModel.offenderBookId;
                this.offprgobligationsCommitModel.updateList = this.offprgobligationsUpdatetList;
            }
            for (let i = 0; i < this.offprgobligationsDeleteList.length; i++) {
                this.offprgobligationsDeleteList[i].offenderBookId = this.offprogramprofilesModel.offenderBookId;
                this.offprgobligationsCommitModel.deleteList = this.offprgobligationsDeleteList;
            }
        }

        const offprgobligationsSaveData = this.oidowrelService.offPrgObligationsCommit(this.offprgobligationsCommitModel);
        offprgobligationsSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show(this.message, this.type);
                this.exceuteQueryGridOne();
            } else if (data == 3) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidowrel.Cannotdeletemasterrecordwhenmatchingdetailrecordsexist');
                this.show(this.message, this.type);
            }
            else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show(this.message, this.type);
                this.exceuteQueryGridOne();
            }
        });
    }

    validationMethodOne(inserList: any) {
        const is = { valid: true }
        for (let i = 0; i < inserList.length; i++) {
            if (!inserList[i].programId) {
                this.message = this.translateService.translate('oidowrel.programmustbeentered');
                this.show(this.message, 'warn');
                is.valid = false;
                return is.valid;
            }
            if (!inserList[i].referralDate) {
                this.message = this.translateService.translate('oidowrel.referraldatemustbeentered');
                this.show(this.message, 'warn');
                is.valid = false;
                return is.valid;
            }
        }
        return is.valid;
    }

    onRowClickoffprogramprofiles(event) {
        if (event) {
            this.voffendercourseeventsModel.view = this.nbtView;
            this.voffendercourseeventsModel.offPrgrefId = event.offPrgrefId;
            this.offprgobligationsModelTempOne = event;
        } else {
            this.voffendercourseeventsModel.offPrgrefId = undefined;
            this.offprgobligationsModelTempOne = new OffenderProgramProfiles();
        }
        if (event && event.commentText) {
            this.commentTextTemp = event.commentText;
        } else {
            this.commentTextTemp = undefined;
        }
        if (event.createDatetime) {
            this.placementReadOnly = true;
            this.progLocationDisable = false;
        } else {
            this.placementReadOnly = false;
            this.progLocationDisable = true;
        }
        this.offScheduleExceQuery();
    }

    setDescription(event) {
        this.exceuteQueryGridOne();
    }

    updatePrmStatus = () => {
        this.dialogService.openLinkDialog('/OCUUPSTA', this.offprgobligationsModelTemp, 80).subscribe(result => {
            this.exceuteQueryGridOne();
        });
    }
    viewLaunchClick = (event) => {
        const data = {
            eventType: 'WR',
            offenderBookId: this.vHeaderBlockModel.offenderBookId,
            agyLocId: this.vHeaderBlockModel.agyLocId,
            pOperation: 'ALLOCATE',
            moduleName: 'OIDOWREL',
            programId: Number(this.offprgobligationsModelTemp.programId),
        };
        this.dialogService.openLinkDialog('ociscatadialog', data).subscribe(result => {
            if (result && result.length > 0) {
                result.forEach(e => {
                    const index = this.offprogramprofilesData.indexOf(event);
                    this.offprgprofiles.setColumnData('projectCode', index, e.courseActivityCode);
                    this.offprgprofiles.setColumnData('providerName', index, e.providerName);
                    this.offprgprofiles.setColumnData('offenderStartDate', index, DateFormat.getDate(e.scheduleStartDate));
                    this.offprgprofiles.setColumnData('programId', index, e.programId);
                    this.offprgprofiles.setColumnData('crsActyId', index, e.crsActyId);
                    this.offprgprofiles.setColumnData('offenderEndDate', index, e.scheduleEndDate);
                    //this.offprgprofiles.setColumnData('projectDescription', index, e.courseActivityDesc);
                });

            }
        });

    }

    onGridInsertTwo = () => {
        if (this.offprgobligationsModelTemp && this.offprgobligationsModelTemp.status != 'Accepted') {
            this.message = this.translateService.translate('oidowrel.offenderisnotyetacceptedfortheprogram');
            this.show(this.message, 'warn');
            return;
        }
        this.placementReadOnly = false;
        this.progLocationDisable = true;
        return {
            'btn': '...',
            'offenderStartDate': DateFormat.getDate()
        };
    }

    onGridInsertThree = () => {
        return {
            'caseNoteType': 'Work Release', 'contactDate': DateFormat.getDate(),
            'contactTime': DateFormat.getDate(), 'dateCreation': DateFormat.getDate(),
            'timeCreation': DateFormat.getDate(), 'staffName': this.staffName,
            'butIwp': 'D', 'butGo': 'Go', 'butR': 'R', 'butAmendment': 'A',
        };
    }

    saveTwo(event) {
        this.offprogramprofilesInsertList = event.added
        this.offprogramprofilesUpdatetList = event.updated
        this.offprogramprofilesDeleteList = event.removed

        this.offdrProgramProfCommtBeanModel.insertList = [];
        this.offdrProgramProfCommtBeanModel.updateList = [];
        this.offdrProgramProfCommtBeanModel.deleteList = [];

        if (this.offprogramprofilesInsertList.length > 0 || this.offprogramprofilesUpdatetList.length > 0) {
            if (!this.validationMethodTwo(this.offprogramprofilesInsertList)) {
                return;
            }
            if (!this.validationMethodTwo(this.offprogramprofilesUpdatetList)) {
                return;
            }
            for (let i = 0; i < this.offprogramprofilesInsertList.length; i++) {
                if (this.offprogramprofilesInsertList[i].offenderEndDate) {
                    this.offprogramprofilesInsertList[i].offenderProgramStatus = 'END'
                } else {
                    this.offprogramprofilesInsertList[i].offenderProgramStatus = 'ALLOC'
                }
                this.offprogramprofilesInsertList[i].offenderBookId = this.offprgobligationsModelTemp.offenderBookId;
                this.offprogramprofilesInsertList[i].referralDate = this.offprgobligationsModelTemp.referralDate;
                this.offprogramprofilesInsertList[i].referralPriority = this.offprgobligationsModelTemp.referralPriority;
                this.offprogramprofilesInsertList[i].referralCommentText = this.offprgobligationsModelTemp.commentText;
                this.offprogramprofilesInsertList[i].offenderPrgObligationId = this.offprgobligationsModelTemp.offenderPrgObligationId;
                this.offprogramprofilesInsertList[i].profileClass = 'PRG';
                this.offprogramprofilesInsertList[i].offenderId = this.vHeaderBlockModel.offenderId;
                this.offprogramprofilesInsertList[i].agyLocId = this.vHeaderBlockModel.agyLocId;
                this.offdrProgramProfCommtBeanModel.insertList = this.offprogramprofilesInsertList;
            }
            for (let i = 0; i < this.offprogramprofilesUpdatetList.length; i++) {
                if (this.offprogramprofilesUpdatetList[i].offenderEndDate) {
                    this.offprogramprofilesUpdatetList[i].offenderProgramStatus = 'END'
                } else {
                    this.offprogramprofilesUpdatetList[i].offenderProgramStatus = 'ALLOC'
                }
                this.offprogramprofilesUpdatetList[i].offenderBookId = this.offprgobligationsModelTemp.offenderBookId;
                this.offprogramprofilesUpdatetList[i].referralDate = this.offprgobligationsModelTemp.referralDate;
                this.offprogramprofilesUpdatetList[i].referralPriority = this.offprgobligationsModelTemp.referralPriority;
                this.offprogramprofilesUpdatetList[i].referralCommentText = this.offprgobligationsModelTemp.commentText;
                this.offprogramprofilesUpdatetList[i].offenderPrgObligationId = this.offprgobligationsModelTemp.offenderPrgObligationId;
                this.offprogramprofilesUpdatetList[i].profileClass = 'PRG';
                this.offprogramprofilesUpdatetList[i].offenderId = this.vHeaderBlockModel.offenderId;
                this.offdrProgramProfCommtBeanModel.updateList = this.offprogramprofilesUpdatetList;
            }
        }
        const offprogramprofilesSaveData = this.oidowrelService.offProgramProfilesCommit(this.offdrProgramProfCommtBeanModel);
        offprogramprofilesSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show(this.message, this.type);
                this.exceuteQueryGridTwo();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show(this.message, this.type);
            }
        });
    }

    validationMethodTwo(inserList: any) {
        const is = { valid: true }
        for (let i = 0; i < inserList.length; i++) {
            if (inserList[i] && inserList[i].offenderStartDate && inserList[i].offenderEndDate) {
                if (DateFormat.compareDate(DateFormat.getDate(inserList[i].offenderStartDate), DateFormat.getDate(inserList[i].offenderEndDate)) === 1) {
                    this.message = this.translateService.translate('oidowrel.enddatecannotbelessthanstartdate');
                    this.show(this.message, 'warn');
                    is.valid = false;
                    return is.valid;
                }
            }
            if (inserList[i].projectCode) {
                let dupList = this.offprogramprofilesData.filter(x => x.projectCode === inserList[i].projectCode);
                if (dupList.length > 1) {
                    this.message = this.translateService.translate('oidowrel.sameprojectcodeisalreadyallocated');
                    this.show(this.message, 'warn');
                    is.valid = false;
                    return is.valid;
                }
            } else {
                this.message = this.translateService.translate('oidowrel.projectcodemustbeentered');
                this.show(this.message, 'warn');
                is.valid = false;
                return is.valid;
            }
            if (inserList[i].offenderEndDate && !inserList[i].offenderEndReason) {
                this.message = this.translateService.translate('oidowrel.endreasonmustbeentered');
                this.show(this.message, 'warn');
                is.valid = false;
                return is.valid;
            }

            if (!inserList[i].offenderEndDate && inserList[i].offenderEndReason) {
                this.message = this.translateService.translate('oidowrel.enddatemustbeentered');
                this.show(this.message, 'warn');
                is.valid = false;
                return is.valid;
            }
        }
        return is.valid;
    }

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    exceuteQueryGridTwo() {
        const obj = this.oidowrelService.offProgramProfilesExecuteQuery(this.offprgobligationsModelTemp);
        obj.subscribe(data => {
            if (data && data.length > 0) {
                this.offprogramprofilesData = data;
            } else {
                this.offprogramprofilesData = [];
                this.commentTextTemp = undefined;
                this.progLocationDisable = true;
            }
        });
    }

    validateRowDataTwo = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = this.offprogramprofilesData.indexOf(event.data);
        if (event.field === 'offenderEndReason') {
            if (!event.data.offenderEndDate) {
                this.message = this.translateService.translate('oidowrel.pleaseentertheenddatefirst');
                this.offprgprofiles.setColumnData('offenderEndReason', rowIndex, undefined);
                this.show(this.message, 'warn');
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    gridOnRowClickOffSchedleMov(event) {

    }

    validateRowDataOffScheMov = (event) => {
        const rowdata = new ValidateRowReturn();

        rowdata.validated = true;
        return rowdata;
    }

    gridOnRowClickCaseNotes(event) {
        if (event) {
            this.offendercasenotesModelTemp = event;
        } else {
            this.offendercasenotesModelTemp = new OffenderCaseNotes();
        }
    }

    validateRowDataCaseNotes = (event) => {
        const rowdata = new ValidateRowReturn();

        rowdata.validated = true;
        return rowdata;
    }

    onViewChange(event) {
        if (event && event.code) {
            this.nbtView = event.code;
            this.voffendercourseeventsModel.view = event.code;
            this.offScheduleExceQuery();
        } else {
            this.voffendercourseeventsData = [];
        }
    }

    ngAfterViewInit(): void {
        this.voffendercourseeventsModel.view = '2';
    }

    offScheduleExceQuery() {
        this.voffendercourseeventsModel.eventOutcomeDbVal = this.nbtView;
        const obj = this.oidowrelService.vOffenderCourseEventsExecuteQuery(this.voffendercourseeventsModel);
        obj.subscribe(data => {
            if (data && data.length > 0) {
                data.forEach(e => {
                    e.eventType = 'Work Release';
                });
                this.voffendercourseeventsData = data;
            } else {
                this.voffendercourseeventsData = [];
            }
        })
    }


    offcasenotesExecuteQuery() {
        const obj = this.oidowrelService.offenderCaseNotesExecuteQuery(this.offendercasenotesModel);
        obj.subscribe(data => {
            if (data && data.length > 0) {
                data.forEach(e => {
                    e.caseNoteType = 'Work Release';
                    e.dateCreation = DateFormat.getDate(e.dateCreation);
                    e.timeCreation = DateFormat.getDate(e.timeCreation);
                    e.butIwp = 'D';
                    e.butGo = 'Go';
                    e.butR = 'R';
                    e.butAmendment = 'A';
                    e.amendmentFlag = e.amendmentFlag == 'Y' ? true : false;
                });
                this.offendercasenotesData = data;
            } else {
                this.offendercasenotesData = [];
            }
        })
    }

    saveCaseNote(event) {
        this.offendercasenotesInsertList = event.added
        this.offendercasenotesUpdatetList = event.updated
        this.offendercasenotesDeleteList = event.removed

        this.offenderCaseNotesCommtBeanModel.insertList = [];
        this.offenderCaseNotesCommtBeanModel.updateList = [];
        this.offenderCaseNotesCommtBeanModel.deleteList = [];

        if (!this.validationMethodCaseNotes(this.offendercasenotesInsertList)) {
            return;
        }
        if (!this.validationMethodCaseNotes(this.offendercasenotesUpdatetList)) {
            return;
        }

        if (this.offendercasenotesInsertList.length > 0 || this.offendercasenotesUpdatetList.length > 0 || this.offendercasenotesDeleteList.length > 0) {
            for (let i = 0; i < this.offendercasenotesInsertList.length; i++) {
                this.offendercasenotesInsertList[i].caseNoteType = 'WR';
                this.offendercasenotesInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                if (this.offendercasenotesInsertList[i].amendmentFlag) {
                    this.offendercasenotesInsertList[i].amendmentFlag = 'Y';
                } else {
                    this.offendercasenotesInsertList[i].amendmentFlag = 'N';
                }
                if (this.offendercasenotesInsertList[i].iwpFlag) {
                    this.offendercasenotesInsertList[i].iwpFlag = 'Y';
                } else {
                    this.offendercasenotesInsertList[i].iwpFlag = 'N';
                }
                if (this.offendercasenotesInsertList[i].checkBox1) {
                    this.offendercasenotesInsertList[i].checkBox1 = 'Y';
                } else {
                    this.offendercasenotesInsertList[i].checkBox1 = 'N';
                }
                if (this.offendercasenotesInsertList[i].checkBox2) {
                    this.offendercasenotesInsertList[i].checkBox2 = 'Y';
                } else {
                    this.offendercasenotesInsertList[i].checkBox2 = 'N';
                }
                if (this.offendercasenotesInsertList[i].checkBox3) {
                    this.offendercasenotesInsertList[i].checkBox3 = 'Y';
                } else {
                    this.offendercasenotesInsertList[i].checkBox3 = 'N';
                }
                if (this.offendercasenotesInsertList[i].checkBox4) {
                    this.offendercasenotesInsertList[i].checkBox4 = 'Y';
                } else {
                    this.offendercasenotesInsertList[i].checkBox4 = 'N';
                }
                if (this.offendercasenotesInsertList[i].checkBox5) {
                    this.offendercasenotesInsertList[i].checkBox5 = 'Y';
                } else {
                    this.offendercasenotesInsertList[i].checkBox5 = 'N';
                }
                this.offendercasenotesInsertList[i].caseLoadType = this.caseLoadTypeTemp;
                this.offenderCaseNotesCommtBeanModel.insertList = this.offendercasenotesInsertList;
            }
            for (let i = 0; i < this.offendercasenotesUpdatetList.length; i++) {
                if (this.offendercasenotesUpdatetList[i].amendmentFlag) {
                    this.offendercasenotesUpdatetList[i].amendmentFlag = 'Y';
                } else {
                    this.offendercasenotesUpdatetList[i].amendmentFlag = 'N';
                }
                this.offendercasenotesUpdatetList[i].caseNoteType = 'WR';
                this.offendercasenotesUpdatetList[i].caseLoadType = this.caseLoadTypeTemp;
                this.offenderCaseNotesCommtBeanModel.updateList = this.offendercasenotesUpdatetList;
            }

            for (let i = 0; i < this.offendercasenotesDeleteList.length; i++) {
                this.offenderCaseNotesCommtBeanModel.deleteList = this.offendercasenotesDeleteList;
            }

            const offendercasenotesSaveData = this.oidowrelService.offenderCaseNotesCommit(this.offenderCaseNotesCommtBeanModel);
            offendercasenotesSaveData.subscribe(data => {
                if (data === 1) {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show(this.message, this.type);
                    this.offcasenotesExecuteQuery();
                } else if (data === 3) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidowrel.youcannotdeletethisrecord');
                    this.show(this.message, this.type);
                } else {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show(this.message, this.type);
                }
            });
        }
    }

    isDataEntery(event) {
        const index = this.offprogramprofilesData.indexOf(this.offprgobligationsModelTempOne);
        this.offprgprofiles.setColumnData('commentText', index, event);
    }

    onDClick = (data) => {
        if (data.caseNoteId && this.prgrsnotes.addedMap.size === 0) {
            this.dialogService.openLinkDialog('/OIUIWPVE', data, 90).subscribe(result => {
                this.offcasenotesExecuteQuery();
            });
        }
        return false;
    }

    onGClick = (data) => {
        if (data.caseNoteId && this.prgrsnotes.addedMap.size === 0) {
            const offendercasenoteModule = this.oidowrelService.getModuleName(data);
            offendercasenoteModule.subscribe(result => {
                if (result && result.moduleName) {
                    this.onGClickLauncher(result);
                } else {
                    this.show('ocdpnote.gobuttonerror');
                }
            });
        }
        return false;
    }
    onGClickLauncher(data) {
        const modulename = '/' + data.moduleName;
        if (data.moduleName === 'OCDPNOTE') {
            return;
        }
    }


    onAClick = (data) => {
        if (data.caseNoteId && this.prgrsnotes.addedMap.size === 0) {
            this.dialogService.openLinkDialog('/ocucname', data, 90).subscribe(result => {
                this.offcasenotesExecuteQuery();
            });
        }
        return false;
    }

    onRClick = (data) => {
        if (data.caseNoteId && this.prgrsnotes.addedMap.size === 0) {
            this.dialogService.openLinkDialog('/OCUNOTCM', data, 90).subscribe(result => {
                this.offcasenotesExecuteQuery();
            });
        }
        return false;
    }

    onPrgrmLocationClick = () => {
        if (!this.offprgobligationsModelTempOne.crsActyId) {
            return;
        }
        this.dialogService.openLinkDialog('/OIUVLCTE', this.offprgobligationsModelTempOne, 80).subscribe(result => {
        });
    }

    onScheduleClick = () => {
        this.offprgobligationsModelTempOne.programDescription = 'WR';
        this.dialogService.openLinkDialog('/OCUOSCPV', this.offprgobligationsModelTempOne, 50).subscribe(result => {

        });
    }


    saveThree(event) {
        this.voffendercourseeventsUpdatetList = event.updated
        this.voffendercourseeventsDeleteList = event.removed

        this.vOffenderCourseEventsCommitBeanModel.updateList = [];
        this.vOffenderCourseEventsCommitBeanModel.deleteList = [];


        for (let i = 0; i < this.voffendercourseeventsUpdatetList.length; i++) {
            if (this.voffendercourseeventsUpdatetList[i].eventStatus === 'EXP') {
                this.voffendercourseeventsUpdatetList[i].eventOutcome = 'CANC';
            } else if (this.voffendercourseeventsUpdatetList[i].eventStatus === 'SCH' && this.voffendercourseeventsUpdatetList[i].outcomeReasonCode != undefined) {
                this.voffendercourseeventsUpdatetList[i].eventStatus = 'CANC';
                this.voffendercourseeventsUpdatetList[i].eventOutcome = 'CANC';
                this.voffendercourseeventsUpdatetList[i].directionCode = null;

            } else if (this.voffendercourseeventsUpdatetList[i].eventStatus === 'CANC' &&
                DateFormat.compareDate(this.voffendercourseeventsUpdatetList[i].eventDate, DateFormat.getDate()) === 1 &&
                !this.voffendercourseeventsUpdatetList[i].outcomeReasonCode) {

                this.voffendercourseeventsUpdatetList[i].outcomeReasonCode = null;
                this.voffendercourseeventsUpdatetList[i].eventOutcome = null;
                this.voffendercourseeventsUpdatetList[i].eventStatus = 'SCH';
                this.voffendercourseeventsUpdatetList[i].directionCode = 'OUT';
            }
            if (this.voffendercourseeventsUpdatetList[i].eventStatus === 'EXP' && !this.voffendercourseeventsUpdatetList[i].outcomeReasonCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidowrel.cancelreasonmustbeenteredforexpiredschedules');
                this.show(this.message, this.type);
                return;
            }
            this.vOffenderCourseEventsCommitBean.updateList = this.voffendercourseeventsUpdatetList;
        }


        const offprogramprofilesSaveData = this.oidowrelService.vOffenderCourseEventsCommit(this.vOffenderCourseEventsCommitBean);
        offprogramprofilesSaveData.subscribe(data => {
            if (data >= 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show(this.message, this.type);
                this.offScheduleExceQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show(this.message, this.type);
            }
        });
    }

    validationMethodCaseNotes(inserList: any) {
        const is = { valid: true }
        for (let i = 0; i < inserList.length; i++) {
            if (!inserList[i].contactDate) {
                this.message = this.translateService.translate('oidowrel.datemustbeentered');
                this.show(this.message, 'warn');
                is.valid = false;
                return is.valid;
            }
            if (!inserList[i].contactTime) {
                this.message = this.translateService.translate('oidowrel.timemustbeentered');
                this.show(this.message, 'warn');
                is.valid = false;
                return is.valid;
            }

            if (DateFormat.compareDate(DateFormat.getDate(inserList[i].contactDate), DateFormat.getDate()) === 1) {
                this.message = this.translateService.translate('oidowrel.datecannotbefuturedate');
                this.show(this.message, 'warn');
                is.valid = false;
                return is.valid;
            }

            if (DateFormat.compareDateTime(DateFormat.getDate(inserList[i].contactTime), DateFormat.getDate()) === 1) {
                this.message = this.translateService.translate('oidowrel.timecannotbefuturedate');
                this.show(this.message, 'warn');
                is.valid = false;
                return is.valid;
            }
        }
        return is.valid;
    }

    getFromOffenderSchMargin() {
        let fromOffenderMargin = 0;
        if ( this.offschegrid.agcoldefs ) {
            this.offschegrid.agcoldefs.forEach( obj => {
                if ( ['eventDate','startTime'].includes(obj.field) ) {
                    fromOffenderMargin += obj.width;
                }
            });
        }
        return fromOffenderMargin -= 40;
    }

    getToOffenderSchMargin(){
        let toOffenderMargin = 0;
        if ( this.offschegrid.agcoldefs ) {
            this.offschegrid.agcoldefs.forEach( obj => {
                if (['eventType', 'providerName','extMoveOutTime','extMoveInTime'].includes(obj.field) ) {
                    toOffenderMargin += obj.width;
                }
            });
        }
        if ( toOffenderMargin ) {
            toOffenderMargin -= 145;
        }
        return toOffenderMargin;

    }

    onClear = () => {
        this.offendercasenotesModelTemp = new OffenderCaseNotes();
        return true;
    }


    onBack() {
		if(this.schedularService.backBtnFlag){
			this.schedularService.backBtnFlag = false;
			this.router.navigate(['/CALSCH']);
		} 
	}
    ngOnDestroy(): void {
        this.schedularService.backBtnFlag = false;
    }
}

