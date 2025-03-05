import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidpawliService } from '@inst/institutional-activities/service/oidpawli.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderProgramProfiles } from '@instprogramswithoutschedulesbeans/OffenderProgramProfiles';
import { OffenderProgramProfilesCommitBean } from '@instprogramswithoutschedulesbeans/OffenderProgramProfilesCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OiinamesService } from '../../movement-external/service/oiinames.service';
import { VNameSearch } from '@common/beans/VNameSearch';
import { DialogService } from '@core/ui-components/dialog/dialog.service';

// import required bean declarations

@Component({
    selector: 'app-oidpawli',
    templateUrl: './oidpawli.component.html'
})

export class OidpawliComponent implements OnInit {
    // Variable declaration
    waitlistData: any[] = [];
    waitlistDataTemp: OffenderProgramProfiles[] = [];
    waitlistCommitModel: OffenderProgramProfilesCommitBean = new OffenderProgramProfilesCommitBean();
    waitlistModel: OffenderProgramProfiles = new OffenderProgramProfiles();
    waitlistModelTemp: OffenderProgramProfiles = new OffenderProgramProfiles();
    waitlistSearchModel: OffenderProgramProfiles = new OffenderProgramProfiles();
    waitlistTempModel: OffenderProgramProfiles = new OffenderProgramProfiles();
    checkWaitlistModel: OffenderProgramProfiles = new OffenderProgramProfiles();
    waitlistInsertList: OffenderProgramProfiles[] = [];
    waitlistUpdateList: OffenderProgramProfiles[] = [];
    waitlistDeleteList: OffenderProgramProfiles[] = [];
    waitlistColumnDef: any[];
    waitListDataTemp: OffenderProgramProfiles[] = [];
    namesrchModel: VNameSearch = new VNameSearch();
    namesrchData: VNameSearch[] = [];
    @ViewChild('grid', { static: true }) grid: any;
    msglist = [];
    msgs: any[] = [];
    type = 'error';
    message = ' Invalid.';

    btnAssingnDis: boolean;
    selectedRow: number;

    establishment: string;
    comments: string;
    offenderEndDate: string;
    offenderStartDate: string;
    rejectReason: string;
    rejectDate: string;
    service: string;
    facilityLink: string;
    serviceLink: string;
    agyLocId: string;
    programId: string;
    rejecReasonLink: string;
    priorityLink: string;
    decisionLink: string;
    retriveDisable: boolean;
    clearDisabledEvent: boolean;
    actDescLink: string;
    input: string;
    idCheckFag: boolean;
    actDesc: string;
    checkZero = 0;
    checkOne = 1;
    checkFive = 5;
    checkSix = 6;
    faciltyDesc: string;
    servicdDesc: string;
    listSize: number;
    referralDateTemp: Date;
    decisionCodeTemp: any;
    rejDateDisable: boolean;
    clearDisable: boolean;
    childAct: boolean;
    prgRefId: number;
    waitextSave: boolean;
    facilityDisable: boolean;
    serviceDisable: boolean;
    saveBtn: boolean;
    namesReadOnly: boolean;
    agyLocIdMap: Map<string, string> = new Map<string, string>();
    serviceMap: Map<string, string> = new Map<string, string>();
    readonlyDate: boolean;
    readonlyComent: boolean;
    waitmap: Map<number, number> = new Map<number, number>();
    names: string;
    caseLoadId: string;
    tempflag: boolean;
    retriveFlag: boolean;
    constructor(private oidpawliFactory: OidpawliService,
        public translateService: TranslateService,
        private oiinamesFactory: OiinamesService, public dialogService: DialogService, public sessionManager: UserSessionManager) {
        this.waitlistColumnDef = [];

    }
    ngOnInit() {
        this.clearDisable = true;
        this.retriveDisable = false;
        this.namesReadOnly = false;
        this.tempflag = false;
        this.retriveFlag = false;
        this.waitlistColumnDef = [
            {
                fieldName: this.translateService.translate('oidpawli.assign'), field: 'allocate',
                datatype: 'checkbox', editable: true, width: 150
            },


            {
                fieldName: this.translateService.translate('oidpawli.aos'), field: 'offenderIdDisplay',
                cellEditable: this.canAlertEdit, required: true, datatype: 'text', editable: true, width: 150
            },
            {
                fieldName: '', field: 'button', editable: true, width: 120, datatype: 'launchbutton', link: '/oiinamesdialog',
                data: 'row', updateField: 'row', modal: true, onLaunchClick: this.offenderLaunchClick
            },

            {
                fieldName: 'Name', field: 'lastName',
                cellEditable: this.canAlertEdit, editable: false, width: 150
            },

            {
                fieldName: this.translateService.translate('oidpawli.refDate'), field: 'referralDate',
                cellEditable: this.canAlertEdit, editable: true, datatype: 'date', width: 150
            },

            {
                fieldName: this.translateService.translate('oidpawli.priority'), field: 'referralPriority',
                cellEditable: this.canAlertEdit, domain: 'PS_PRIORITY'/* link: 'oidpawli/rgPriorityRecordGroup'*/, datatype: 'lov', editable: true, width: 150
            },

            {
                fieldName: this.translateService.translate('oidpawli.activityDescr'), field: 'activity',
                cellEditable: this.canAlertEdit, editable: true, width: 150, source: 'OIDACSEL'
            },
            {
                fieldName: '', field: 'buttonActivity', editable: this.childAct, width: 120, datatype: 'launchbutton', link: '/OIDACSEL',
                data: 'row', updateField: 'row', modal: true, dialogWidth: 80, onLaunchClick: this.asnLaunchClick,

            },

            {
                fieldName: this.translateService.translate('oidpawli.vacancy'), field: 'vacancy',
                cellEditable: this.canAlertEdit, editable: false, width: 150
            },

            { fieldName: '', field: 'input', hide: true },
            { fieldName: '', field: 'crsActyId', hide: true },
            { fieldName: '', field: 'programId', hide: true },
            { fieldName: '', field: 'agyLocId', hide: true },
            { fieldName: '', field: 'servicdDesc', hide: true },
            { fieldName: '', field: 'faciltyDesc', hide: true },
            { fieldName: '', field: 'offenderBookId', hide: true },
            { fieldName: '', field: 'offenderId', hide: true },
            { fieldName: '', field: 'referralCommentText', hide: true },
            { fieldName: '', field: 'rejectReasonCode', hide: true },
            { fieldName: '', field: 'rejectDate', hide: true },
            { fieldName: '', field: 'waiitext', hide: true },
            { fieldName: '', field: 'systemMode', hide: true },
            { fieldName: '', field: 'activityValidations', hide: true },




            {
                fieldName: this.translateService.translate('oidpawli.decision'), field: 'waitlistDecisionCode'
                , datatype: 'lov',
                cellEditable: this.canAlertEdit, editable: true, width: 150, domain: 'PS_ACT_DEC'
            },


        ];

        this.selectedRow = 0;
        this.btnAssingnDis = true;
        this.rejDateDisable = true;
        this.idCheckFag = true;
        this.facilityLink = 'oidpawli/rgEstablishmentRecordGroup?ageLocId=' + this.sessionManager.currentCaseLoad;
        this.rejecReasonLink = '/oidpawli/rgReasonRecordGroup';
        this.priorityLink = 'oidpawli/rgPriorityRecordGroup';
        this.decisionLink = 'oidpawli/rgDecisionRecordGroup?systemMode=' + 'ENTER-QUERY';


        const serviceObj = this.oidpawliFactory.
        rgEstablishmentRecordGroupOidpacti(this.sessionManager.currentCaseLoad);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
            } else {
                data.forEach(ele => {
                    this.agyLocIdMap.set(ele.code, ele.description);
                });
            }
        });
        const serviceObject = this.oidpawliFactory.
            getServices();
        serviceObject.subscribe(data => {
            if (data.length === 0) {
            } else {
                data.forEach(ele => {
                    this.serviceMap.set(ele.code, ele.description);
                });
            }
        });

    }

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    canAlertEdit = (data: any, index: number, field: string): boolean => {
        const indexVal = this.waitlistData.indexOf(data);
        if (data.decision === 'REJ' && data.offPrgrefId) {
            return false;
        }
        if (data.waitlistDecisionCode !== 'REJ' && (field === 'offenderIdDisplay' || field === 'lastName' ||
            field === 'vacancy') &&
            data.offPrgrefId && indexVal < this.listSize) {
            return false;
        }
        return true;
    }

    asnLaunchClick = (event) => {
        const index = this.waitlistData.indexOf(event);


        if (event) {
            event.programDescription = this.serviceMap.get(String(event.programId));
            event.facilityDescription = this.agyLocIdMap.get(event.agyLocId);
            if (event.waitlistDecisionCode === 'REJ' && event.offPrgrefId) {
                this.childAct = false;
            } else {
                this.grid.setColumnData('activityValidations', index, undefined);
                this.dialogService.openLinkDialog('/OIDACSEL', event, 80).subscribe(result => {
                    if (result) {
                        this.waitlistModel.crsActyId = result.crsActyId;
                    }

                    this.grid.setColumnData('activity', index, result.activity);
                });
            }

        } else {
            return;
        }
    }

    offenderLaunchClick = (event) => {
        const index = this.waitlistData.indexOf(event);

        if (event.offPrgrefId) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidpawli.offCannotUpdated');
            this.show();
            return false;
        } else {
            return true;
        }

    }

    priorityBlur() {
        if (!this.waitlistSearchModel.referralPriority) {
            this.waitlistSearchModel.referralPriority = this.waitlistSearchModel.referralPriority === '' ? undefined : '';
        }
    }


    decisionBlur() {
        if (!this.waitlistSearchModel.waitlistDecisionCode) {
            this.waitlistSearchModel.waitlistDecisionCode = this.waitlistSearchModel.waitlistDecisionCode === '' ? undefined : '';
        }
    }


    rejecBlur() {
        if (!this.waitlistSearchModel.rejectReasonCode) {
            this.waitlistSearchModel.rejectReasonCode = this.waitlistSearchModel.rejectReasonCode === '' ? undefined : '';
        }
    }

    saveBlur() {
        if (!this.waitlistModel.rejectReasonCode) {
            this.waitlistModel.rejectReasonCode = this.waitlistModel.rejectReasonCode === '' ? undefined : '';
        }

    }
    facilityChange(event) {
        if (event) {
            this.agyLocId = event.code;
            this.faciltyDesc = event.description;
        }

        this.waitlistSearchModel.agyLocId = this.agyLocId;
        this.serviceLink = 'oidpawli/rgServicesRecordGroup?ageLocId=' + this.agyLocId;
    }

    serviceChange(event) {
        if (event) {
            this.programId = event.programId;
            this.servicdDesc = event.description;
        } else {
            this.programId = null;
        }

        this.waitlistSearchModel.programId = Number(this.programId);
        this.waitlistTempModel = JSON.parse(JSON.stringify(this.waitlistSearchModel));

    }

    onRefCommentChange() {
        const rowIndex = this.waitlistData.indexOf(this.waitlistModel);
        if (this.waitlistModel.refCommentVal !== this.waitlistModel.referralCommentText) {
            this.waitextSave = true;
            this.grid.setColumnData('waiitext', rowIndex, this.waitlistModel.referralCommentText);
            this.grid.setColumnData('referralCommentText', rowIndex, this.waitlistModel.referralCommentText);
            this.tempflag = false;
        }
    }

    waitlistExecuteQuery() {
        this.waitlistSearchModel.programId = Number(this.programId);
        this.waitlistSearchModel.agyLocId = this.agyLocId;
        const waitlistResult = this.oidpawliFactory.waitlistExecuteQuery(this.waitlistSearchModel);
        waitlistResult.subscribe(data => {
            if (data.length === 0) {
                this.retriveDisable = false;
                const record = [{
                    button: '..', buttonActivity: '..', activity: '',
                    lastName: '', firstName: '', offenderIdDisplay: '',
                    referralDate: DateFormat.getDate(),
                    input: this.programId + '-' + this.agyLocId,
                }];
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
                this.waitlistData = [];
                this.tempflag = true;
                this.retriveFlag = false;
                this.clearDisable = false;
                this.btnAssingnDis = true;
            } else {
                data.forEach(element => {
                    if (element.referralDate) {
                        element.referralDate = DateFormat.formatMDY(DateFormat.getDate(element.referralDate));
                    }
                    element.programDescription = this.serviceMap.get(String(element.programId));
                    element['buttonActivity'] = '..';
                    element['button'] = '..';
                    element.input = this.programId + '-' + this.agyLocId;
                    element.allocate = false;
                    element.systemMode = '';

                });
                this.facilityDisable = true;
                this.serviceDisable = true;
                this.waitlistData = data;
                this.listSize = this.waitlistData.length;
                this.namesReadOnly = true;
                this.retriveDisable = true;
                this.clearDisable = false;
                this.selectedRow = 0;
                this.tempflag = true;
                this.retriveFlag = true;
                this.btnAssingnDis = true;
            }
        });


    }


    onRowClickwaitlist(event) {
        if (event) {

            this.rejDateDisable = true;

            this.waitlistModel = event;
            if (this.waitlistModel.decision === 'REJ') {
                this.readonlyDate = true;
                this.readonlyComent = true;
            } else {
                // this.readonlyDate = false;
                this.readonlyComent = false;
            }
            if (this.waitlistModel.allocate && this.waitlistModel.decision !== 'REJ' && (this.waitlistModel.waitlistDecisionCode === 'APP' ||
                this.waitlistModel.waitlistDecisionCode === 'ALL')) {
                this.readonlyDate = false;
            } else {
                this.readonlyDate = true;
            }
            this.decisionCodeTemp = event.waitlistDecisionCode;
            this.btnAssingnDis = (this.waitmap.size === 0) ? true : false;
        } else {
            this.btnAssingnDis = true;
            this.readonlyDate = true;
            this.readonlyComent = true;
        }
    }

    onGridInsert = () => {

        if (this.waitlistModel.waitlistDecisionCode) {

            if (!this.waitlistModel.offenderIdDisplay) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidpawli.mandatoryFileds');
                this.show();
                return;
            } else if (!this.waitlistModel.referralPriority) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidpawli.prityMust');
                this.show();
                return;
            }

        }


        this.childAct = true;
        this.tempflag = false;
        if (this.waitlistModel.decision && this.waitlistModel.offPrgrefId) {
            this.rejDateDisable = true;
        } else {
            this.rejDateDisable = false;
        }

        if (!this.programId && !this.agyLocId) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidpawli.serviceandFac');
            this.show();
            return;
        }
        if (!this.programId) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidpawli.serviceMust');
            this.show();
            return;
        }

        if (this.waitlistModel.allocate === 'Y') {

            if (this.waitlistModel.activity === undefined) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidpawli.checkAct');
                this.show();
                this.waitlistModel.allocate = 'N';
                return;

            }

        }

        const currDate: Date = DateFormat.getDate();
        currDate.setHours(0);
        currDate.setMinutes(0);
        currDate.setSeconds(0);
        this.referralDateTemp = currDate;
        this.grid.prepareAgColumnDef();
        return {
            button: '..', buttonActivity: '..', activity: '',
            lastName: '', firstName: '', offenderIdDisplay: '',
            referralDate: DateFormat.getDate(),
            input: this.programId + '-' + this.agyLocId,
            programId: this.waitlistSearchModel.programId,
            agyLocId: this.waitlistSearchModel.agyLocId,
            servicdDesc: this.servicdDesc,
            faciltyDesc: this.faciltyDesc,
            waitlistDecisionCode: 'PEN',
            systemMode: 'ENTER-QUERY',
        };
    }


    isInsertable() {
        if (this.waitlistSearchModel.referralDate || this.waitlistSearchModel.referralPriority ||
            this.waitlistSearchModel.waitlistDecisionCode || this.waitlistSearchModel.rejectReasonCode
            || this.waitlistSearchModel.rejectDate) {

            this.clearDisable = false;
        } else {
            this.clearDisable = true;
        }
    }



    onGridDelete = (event) => {
        this.waitlistModel.referralCommentText = undefined;
        this.waitlistModel.rejectReasonCode = undefined;
        this.waitlistModel.rejectDate = undefined;
        this.waitlistModel.offenderEndDate = undefined;
        this.waitlistModel.offenderStartDate = undefined;
        this.tempflag = false;
        return true;
    }

    onGridClear = () => {
        if (this.retriveFlag) {
            this.waitlistExecuteQuery();
        }
        this.waitlistModel.waitlistDecisionCode = undefined;
        return true;

    }


    clearNoGrid() {
        this.waitlistModel.referralCommentText = undefined;
        this.waitlistModel.rejectDate = undefined;
        this.waitlistModel.rejectReasonCode = undefined;
        this.tempflag = true;

    }
    waitListRetrive() {
        if (!this.agyLocId) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidpawli.facilitymust');
            this.show();
            return;
        }
        if (!this.programId) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidpawli.serviceMust');
            this.show();
            return;
        }
        this.retriveFlag = true;
        this.waitlistExecuteQuery();

    }

    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        this.waitmap = new Map<number, number>();
        for (let i = 0; i < this.waitlistData.length; i++) {
            if (this.waitlistData[i].allocate && this.waitlistData[i].waitlistDecisionCode === 'APP') {
                this.waitmap.set(i, i);
            }
        }
        if ((event.field !== 'offenderIdDisplay') && event.data.offenderIdDisplay) {
            this.namesrchModel.offenderIdDisplay = event.data.offenderIdDisplay;
        }

        if (event.field === 'offenderIdDisplay' && event.data.offenderIdDisplay && Number(event.oldValue) !== Number(event.newValue)) {
            this.caseLoadId = this.sessionManager.currentCaseLoad;
            this.namesrchModel.offenderIdDisplay = event.data.offenderIdDisplay;
            if (event.data.offenderIdDisplay === '0000000000') {
                this.grid.setColumnData('offenderIdDisplay', rowIndex, undefined);
                this.grid.setColumnData('lastName', rowIndex, undefined);
                event.data.offenderBookId = undefined;
                rowdata.validated = true;
                return rowdata;
            }
            const namesrchResult = this.oiinamesFactory.namesrchExecuteQuery(this.namesrchModel);
            namesrchResult.subscribe(data => {
                if (data.length === 0) {
                    this.idCheckFag = false;
                    this.namesrchData = [];
                    this.type = 'info';
                    this.message = this.namesrchModel.offenderIdDisplay + this.translateService.translate('oidpawli.dispalyValid') + this.caseLoadId;

                    this.show();
                    this.grid.setColumnData('offenderIdDisplay', rowIndex, undefined);
                    this.grid.setColumnData('lastName', rowIndex, undefined);
                    this.grid.setColumnData('offenderBookId', rowIndex, undefined);
                    this.grid.setColumnData('offenderId', rowIndex, undefined);

                    event.data.offenderBookId = undefined;
                } else {
                    this.idCheckFag = true;
                    this.names = data[0].lastName + ',' + data[0].firstName;
                    this.grid.setColumnData('offenderIdDisplay', rowIndex, data[0].offenderIdDisplay);
                    this.grid.setColumnData('lastName', rowIndex, this.names);
                    this.grid.setColumnData('offenderBookId', rowIndex, undefined);
                    this.grid.setColumnData('offenderId', rowIndex, undefined);
                    event.data.offenderBookId = data[0].offenderBookId;
                    event.data.offenderId = data[0].offenderId;

                    this.namesrchData = data;
                }
            });
            rowdata.validated = true;
        }

        if (event.field === 'referralDate') {
            const currDate: Date = DateFormat.getDate();
            const selectedDate: Date = DateFormat.getDate(event.data.referralDate);
            this.referralDateTemp = selectedDate;
            currDate.setHours(0);
            currDate.setMinutes(0);
            currDate.setSeconds(0);
            selectedDate.setHours(0);
            selectedDate.setMinutes(0);
            selectedDate.setSeconds(0);
            if (DateFormat.compareDateTime(selectedDate, currDate) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidpawli.reffralNotFuture');
                this.show();
                rowdata.validated = true;
                return rowdata;
            }
        }

        if (event.field === 'referralDate') {
            const offBkngDt = this.oidpawliFactory.getBookingDate(event.data.offenderBookId);
            offBkngDt.subscribe(data => {

                if (data) {
                    event.data.begngDate = DateFormat.getDate(data);
                    if (DateFormat.compareDate(event.data.begngDate, DateFormat.getDate(event.data.referralDate)) === 1) {
                    }
                }
            });
        } else if (!event.data.begngDate) {
            const offBkngDt = this.oidpawliFactory.getBookingDate(event.data.offenderBookId);
            offBkngDt.subscribe(data => {

                if (data) {
                    event.data.begngDate = DateFormat.getDate(data);
                }
            });

        }

        if (event.field === 'activity') {
            if (event.data) {
                this.waitlistModel.agyLocId = event.data.agyLocId;
                this.waitlistModel.programId = event.data.programId;
                this.waitlistModel.crsActyId = event.data.crsActyId;
                this.waitlistModel.referralDate = DateFormat.getDate(this.waitlistModel.referralDate);
                const offBkngDt = this.oidpawliFactory.getCourseActivity(this.waitlistModel);
                offBkngDt.subscribe(data => {

                    if (data) {
                        this.grid.setColumnData('vacancy', rowIndex, data.vacancy);
                        rowdata.validated = true;
                        return rowdata;
                    }
                });

                this.checkWaitList2();
            }

        }

        if (event.field === 'allocate') {
            if (event.data.allocate && event.data.activity === null) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidpawli.checkAct');
                this.show();
                return;
            }
        }

        if (event.field === 'allocate') {
            if (event.data.allocate && event.data.waitlistDecisionCode !== 'APP') {
                this.type = 'warn';
                this.message = this.translateService.translate('oidpawli.checkAppr');
                this.show();
                this.saveBtn = true;
                return;
            }
            if (event.data.allocate && event.data.decision !== 'REJ' && (event.data.waitlistDecisionCode === 'APP' ||
                event.data.waitlistDecisionCode === 'ALL')) {
                this.readonlyDate = false;
            } else {
                this.readonlyDate = true;
            }
        }


        if (event.field === 'waitlistDecisionCode') {
            if (event.data.waitlistDecisionCode === 'APP' || event.data.waitlistDecisionCode === 'REJ') {
                this.waitlistModel.rejectDate = DateFormat.getDate();
            }
            this.decisionCodeTemp = event.data.waitlistDecisionCode;
        }
        this.btnAssingnDis = (this.waitmap.size === 0) ? true : false;


        rowdata.validated = true;
        return rowdata;
    }


    onDateChange(event) {
        if (DateFormat.getDate(event) < this.referralDateTemp) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidpawli.decisionGreater');
            this.show();
            return;
        }
    }

    onStartDateChange(event) {
        if (this.waitlistModel.offenderEndDate) {
            if (DateFormat.getDate(event) > DateFormat.getDate(this.waitlistModel.offenderEndDate)) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidpawli.endDateGreater');
                this.show();
                return;
            }
        }

    }

    onEndDateChange(event) {
        if (DateFormat.getDate(event) < DateFormat.getDate(this.waitlistModel.offenderStartDate)) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidpawli.endDateGreater');
            this.show();
            return;
        }
    }

    rejReasonDisFun() {
        if (this.decisionCodeTemp !== 'REJ') {
            this.type = 'warn';
            this.message = this.translateService.translate('oidpawli.rejReasonValid');
            this.show();
        }
    }
    rejReasonDisFun1() {
        if ((this.decisionCodeTemp === 'REJ' && this.waitlistModel.rejectReasonCode) ||
            (this.decisionCodeTemp !== 'REJ' && !this.waitlistModel.rejectReasonCode)) {
            return true;
        } else {
            return false;
        }

    }

    clear() {
        this.retriveDisable = false;
        this.clearDisable = true;
        this.waitlistData = [];
        this.waitlistModel = new OffenderProgramProfiles();
        this.waitlistSearchModel = new OffenderProgramProfiles();
        this.facilityDisable = false;
        this.serviceDisable = false;
        this.namesReadOnly = false;
        this.establishment = undefined;
        this.service = undefined;
        this.programId = undefined;
        this.agyLocId = undefined;
        this.tempflag = false;
        this.retriveFlag = false;


    }

    onButAllocateclick(event) {
        if (!this.btnAssignValidations(event)) {
            return;
        } else {
            this.showPopUp();
        }
    }

    showPopUp() {
        const data = {
            label: this.translateService.translate('oidpawli.douWish'),
            yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
            if (result) {

                this.assignFunction();
            } else {
                this.waitlistExecuteQuery();
            }
        });

    }

    assignFunction() {



        if (this.waitlistModel.offenderStartDate) {
            this.waitlistModel.referralDate = DateFormat.getDate(this.waitlistModel.referralDate);
            const days = this.oidpawliFactory.futureDays(this.waitlistModel);
            days.subscribe(noOfDays => {
                if (noOfDays > 30) {

                    this.type = 'warn';
                    this.message = this.translateService.translate('oidpawli.days').replace('%noOfDays%', noOfDays);
                    this.show();
                }

                this.checkAssignConflict();
            });
        }


    }

    checkAssignConflict() {
        this.waitListDataTemp = [];
        this.waitlistData.forEach(e => {
            if (e.allocate) {
                e.referralDate = DateFormat.getDate(e.referralDate);
                e.offenderStartDate = this.waitlistModel.offenderStartDate;
                this.waitListDataTemp.push(e);
            }
        });

        this.oidpawliFactory.checkNonAssociations(this.waitListDataTemp).subscribe(data => {
            if (data) {
                this.externalNonAssocationByIngAndGangNew(data, 0, 0)
            } else {
                this.chkAllocated();

            }
        });

    }

    externalNonAssocationByIngAndGangNew(event, x, y) {
        let i = x;
        let j = y;
        if (i == event.length && this.waitListDataTemp && this.waitListDataTemp.length != 0) {
            this.chkAllocated();
        }
        if (i == j && i < event.length) {
            if (!event[i].nonAssocationByIngAndGang || event[i].nonAssocationByIngAndGang === 'EMPTYDATA') {
                j++;
                i++;
                this.externalNonAssocationByIngAndGangNew(event, i, j);
            } else {

                let msgOne = this.translateService.translate('oidpawli.nonassociationconflictmsg');
                let msgTwo = this.translateService.translate('oidpawli.doyouwanttocontinue');
                let msgThree = this.translateService.translate('oidpawli.indinonassocconflict');
                let msgFour = this.translateService.translate('oidpawli.gangnonassocconflict');
                let msgFive = ' ' + this.translateService.translate('oidpawli.waitlisted');


                event[i].nonAssocationByIngAndGang = event[i].nonAssocationByIngAndGang.replaceAll('oidpawli.nonassociationconflictmsg', msgOne);
                event[i].nonAssocationByIngAndGang = event[i].nonAssocationByIngAndGang.replaceAll('oidpawli.doyouwanttocontinue', msgTwo);
                event[i].nonAssocationByIngAndGang = event[i].nonAssocationByIngAndGang.replaceAll('oidpawli.indinonassocconflict', msgThree);
                event[i].nonAssocationByIngAndGang = event[i].nonAssocationByIngAndGang.replaceAll('oidpawli.gangnonassocconflict', msgFour);
                event[i].nonAssocationByIngAndGang = event[i].nonAssocationByIngAndGang.replaceAll('oidpawli.waitlisted', msgFive);
                const data = {
                    label: this.translateService.translate(event[i].nonAssocationByIngAndGang), yesBtn: true, proceedWithNoConflictsBtn: false, cancelBtn: true,
                    proceedBtnDisabled: true
                };
                j++;
                this.dialogService.openLinkDialog('/OCUNAWRN', data, 30).subscribe(result => {
                    if (result) {
                        i++;
                        if (i < event.length) {
                            this.externalNonAssocationByIngAndGangNew(event, i, j);
                        } else {
                            this.externalNonAssocationByIngAndGangNew(event, i, j);
                        }
                    } else {
                        this.waitlistData.forEach(e => {
                            if (e.offenderBookId === event[i].offenderBookId) {
                                const index = this.waitlistData.indexOf(e);
                                this.grid.setColumnData('allocate', index, false);
                            }
                        });
                        i++;
                        if (i < event.length) {
                            this.externalNonAssocationByIngAndGangNew(event, i, j);
                        } else {
                            this.externalNonAssocationByIngAndGangNew(event, i, j);
                        }
                    }
                });
            }
        }
    }



    chkAllocated() {

        const checkAlloacte = this.oidpawliFactory.chkAllocated(this.waitListDataTemp);
        checkAlloacte.subscribe(chkAlocation => {
            if (chkAlocation) {
                if (chkAlocation.RETURN_VALUE === 1) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidpawli.endDateNotReached');
                    this.show();
                    this.waitlistExecuteQuery();
                } else {
                    this.waitlistData.forEach(e => {
                        if (e.allocate) {
                            e.offenderProgramStatus = 'ALLOC';
                        }
                    });
                    this.saveData();
                }

            }

        });
    }


    checkWaitList2() {
        const index = this.waitlistData.indexOf(this.waitlistModel);
        this.grid.setColumnData('activityValidations', index, undefined);
        const checkWaitlist = this.oidpawliFactory.checkWaitList2(this.waitlistModel);

        checkWaitlist.subscribe(data => {
            if (data.P_EXISTS_ALLOC >= 1) {
                const dataa = {
                    label: this.translateService.translate('oidpacti.theoffenderhasalreadybeenassigned')
                    , yesBtn: true, noBtn: true
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dataa, 50).subscribe(result => {
                    if (result) {
                    } else {
                        this.grid.setColumnData('waitlistDecisionCode', index, 'PEN');
                        this.grid.setColumnData('vacancy', index, undefined);
                        this.grid.setColumnData('activity', index, undefined);
                        this.grid.setColumnData('crsActyId', index, undefined);
                        this.grid.setColumnData('rejectReasonCode', index, undefined);
                        this.grid.setColumnData('rejectDate', index, undefined);
                    }
                });
            }
            if (data.P_EXISTS_PEN >= 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidpawli.offenderexistsonwaitinglist');
                this.show();
                this.grid.setColumnData('activityValidations', index, 'Offender exists on waiting list for this activity.');
                return;
            }
            if (data.P_EXISTS_APP >= 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidpawli.offenderalreadyapproved');
                this.show();
                this.grid.setColumnData('activityValidations', index, 'Offender has already been approved for the activitiy.');
                return;
            }

        });
    }
    btnAssignValidations(event) {
        const is = { valid: true };

        for (let i = 0; i < this.waitlistData.length; i++) {
            for (let j = 1; j < this.waitlistData.length; j++) {
                if (this.waitlistData[i].allocate && this.waitlistData[j].allocate) {
                    if (this.waitlistData[i].activity != this.waitlistData[j].activity) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidpawli.mutlipleactivities');
                        this.show();
                        is.valid = false;
                        return
                    }
                }

            }

        }
        if (!this.waitlistModel.offenderStartDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidpawli.satrtDateAssgmnt');
            this.show();
            is.valid = false;
            return;
        }

        if (DateFormat.compareDate(DateFormat.getDate(this.waitlistModel.begngDate),
            DateFormat.getDate(this.waitlistModel.offenderStartDate)) === 1) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidpawli.agencyLoc');
            this.show();
            is.valid = false;
            return;
        }
        if (this.waitlistModel.offenderEndDate) {


            if (DateFormat.getDate(this.waitlistModel.offenderEndDate) < DateFormat.getDate(this.waitlistModel.offenderStartDate)) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidpawli.endDateGreater');
                this.show();
                is.valid = false;
                return;
            }
        }
        return is.valid;
    }

    validateWaitList(event) {
        const is = { valid: true };
        if (!event.offenderIdDisplay) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidpawli.pidmustbeenter');
            this.show();
            is.valid = false;
            return;
        }
        if (!event.referralDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidpawli.referralDatemustbeenter');
            this.show();
            is.valid = false;
            return;
        }
        if (!event.referralPriority) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidpawli.prityMust');
            this.show();
            is.valid = false;
            return;
        }
        if (!event.waitlistDecisionCode) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidpawli.Decisionmustbeenter');
            this.show();
            is.valid = false;
            return;
        }

        if (event.activityValidations) {
            this.type = 'warn';
            this.message = event.activityValidations;
            this.show();
            is.valid = false;
            return;
        }
        if (event.waitlistDecisionCode === 'REJ' && !this.waitlistModel.rejectReasonCode) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidpawli.rejReason');
            this.show();
            is.valid = false;
            return;

        }


        if (event.waitlistDecisionCode === 'APP' && event.crsActyId && event.activity === '') {
            this.type = 'warn';
            this.message = this.translateService.translate('oidpawli.approvedReferral');
            this.show();
            is.valid = false;
            return;

        }
        if (event.waitlistDecisionCode === 'APP' && !event.crsActyId) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidpawli.approvedReferral');
            this.show();
            is.valid = false;
            return;

        }

        if (event.waitlistDecisionCode === 'REJ' && !this.waitlistModel.rejectReasonCode) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidpawli.rejReason');
            this.show();
            is.valid = false;
            return;

        }

        if (DateFormat.getDate(this.waitlistModel.rejectDate) < event.referralDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidpawli.decisionDate');
            this.show();
            is.valid = false;
            return;
        }

        if (event.referralDate) {
            const currDate: Date = DateFormat.getDate();
            const selectedDate: Date = DateFormat.getDate(event.referralDate);
            currDate.setHours(0);
            currDate.setMinutes(0);
            currDate.setSeconds(0);
            selectedDate.setHours(0);
            selectedDate.setMinutes(0);
            selectedDate.setSeconds(0);
            if (DateFormat.compareDateTime(selectedDate, currDate) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidpawli.referralDate');
                this.show();
                is.valid = false;
                return;
            }
        }
        const offBkngDt = this.oidpawliFactory.getBookingDate(event.offenderBookId);
        offBkngDt.subscribe(data => {

            if (data) {
                if (event.referralDate < DateFormat.getDate(data)) {
                    is.valid = false;
                    return;
                }
            }
        });
        return is.valid;
    }

    get waitsavBtnflag() {
        if ((this.grid.addedMap.size > 0 || this.grid.updatedMap.size > 0 ||
            this.grid.removedMap.size > 0)) {
            return false;
        } else {
            return true;

        }

    }

    get noGridClear() {

        if (this.waitlistModel.referralCommentText || this.waitlistModel.rejectDate ||
            this.waitlistModel.rejectReasonCode) {
            return false;
        }
        return true;
    }

    saveData() {
        this.waitlistInsertList = [];
        this.waitlistUpdateList = [];
        this.waitlistDeleteList = [];
        this.grid.updatedMap.forEach(
            (v: any, k: number) => {
                if (v.allocate) {
                    this.waitlistUpdateList.push(v);
                }
            }
        );
        this.grid.removedMap.forEach(
            (v: any, k: number) => {
                this.waitlistDeleteList.push(v);
            }
        );
        this.grid.addedMap.forEach(
            (v: any, k: number) => {
                this.waitlistInsertList.push(v);
            }
        );
        this.waitlistCommitModel.insertList = [];
        this.waitlistCommitModel.updateList = [];
        this.waitlistCommitModel.deleteList = [];
        if (this.waitlistInsertList.length > 0) {
            for (let i = 0; i < this.waitlistInsertList.length; i++) {
                if (!this.validateWaitList(this.waitlistInsertList[i])) {
                    return;
                }
                this.waitlistInsertList[i].rejectReasonCode = this.waitlistModel.rejectReasonCode;
                this.waitlistInsertList[i].rejectDate = DateFormat.getDate(this.waitlistModel.rejectDate);
                this.waitlistInsertList[i].referralCommentText = this.waitlistModel.referralCommentText;
                this.waitlistInsertList[i].suspendedFlag = 'N';
                this.waitlistInsertList[i].holidayFlag = 'Y';
                this.waitlistInsertList[i].neededFlag = 'Y';
                this.waitlistInsertList[i].offenderProgramStatus = 'WAIT';
                this.waitlistInsertList[i].profileClass = 'PRG';
                this.waitlistInsertList[i].createUserId = this.sessionManager.getId();
                this.waitlistInsertList[i].modifyUserId = this.sessionManager.getId();
                this.waitlistInsertList[i].programId = Number(this.programId);
                this.waitlistInsertList[i].agyLocId = this.agyLocId;
                this.waitlistInsertList[i].crsActyId = this.waitlistModel.crsActyId;
            }

            this.waitlistCommitModel.insertList = this.waitlistInsertList;

        }

        if (this.waitlistUpdateList.length > 0) {
            for (let i = 0; i < this.waitlistUpdateList.length; i++) {
                this.waitlistUpdateList[i].referralDate = DateFormat.getDate(this.waitlistUpdateList[i].referralDate);
                if (!this.validateWaitList(this.waitlistUpdateList[i])) {
                    return;
                }

            }
            this.waitlistCommitModel.updateList = this.waitlistUpdateList;
        }
        if (this.waitlistDeleteList.length > 0) {
            for (let i = 0; i < this.waitlistDeleteList.length; i++) {
                this.waitlistDeleteList[i].referralDate = DateFormat.getDate(this.waitlistDeleteList[i].referralDate);
            }
            this.waitlistCommitModel.deleteList = this.waitlistDeleteList;
        }
        if (this.waitlistInsertList.length === 0 && this.waitlistUpdateList.length === 0 && this.waitlistDeleteList.length === 0 ) {
            return;
        }
        const waitlistSaveData = this.oidpawliFactory.waitlistCommits(this.waitlistCommitModel);
        waitlistSaveData.subscribe(data => {
            if (data[0] && data[0].sentenceSeq === this.checkFive) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidpawli.delete1');
                this.show();
                this.waitlistExecuteQuery();
            } else if (data[0] && data[0].sentenceSeq === this.checkSix) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidpawli.delete2');
                this.show();
                this.waitlistExecuteQuery();
            } else if (data[0] && data[0].sentenceSeq === 7) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidpawli.offenderexistsonwaitinglist');
                this.show();
                this.waitlistExecuteQuery();
            } else if (data[0] && data[0].sentenceSeq === 8) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidpawli.offenderalreadyapproved');
                this.show();
                this.waitlistExecuteQuery();
            } else if (data[0] && data[0].sentenceSeq === 9) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidpawli.offenderalreadyonwaitinglist');
                this.show();
                this.waitlistExecuteQuery();
            } else if (data[0] && data[0].sentenceSeq === this.checkOne) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.waitlistExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.waitlistExecuteQuery();
            }
        });
    }


    saveOffPrgwaitData() {
        this.waitlistInsertList = [];
        this.waitlistUpdateList = [];
        this.waitlistDeleteList = [];
        this.grid.updatedMap.forEach(
            (v: any, k: number) => {
                this.waitlistUpdateList.push(v);
            }
        );
        this.grid.removedMap.forEach(
            (v: any, k: number) => {
                this.waitlistDeleteList.push(v);
            }
        );
        this.grid.addedMap.forEach(
            (v: any, k: number) => {
                this.waitlistInsertList.push(v);
            }
        );
        this.waitlistCommitModel.insertList = [];
        this.waitlistCommitModel.updateList = [];
        this.waitlistCommitModel.deleteList = [];
        if (this.waitlistInsertList.length > 0) {
            for (let i = 0; i < this.waitlistInsertList.length; i++) {
                if (!this.validateWaitList(this.waitlistInsertList[i])) {
                    return;
                }
                this.waitlistInsertList[i].rejectReasonCode = this.waitlistModel.rejectReasonCode;
                this.waitlistInsertList[i].rejectDate = DateFormat.getDate(this.waitlistModel.rejectDate);
                this.waitlistInsertList[i].referralCommentText = this.waitlistModel.referralCommentText;
                this.waitlistInsertList[i].suspendedFlag = 'N';
                this.waitlistInsertList[i].holidayFlag = 'Y';
                this.waitlistInsertList[i].neededFlag = 'Y';
                this.waitlistInsertList[i].offenderProgramStatus = 'WAIT';
                this.waitlistInsertList[i].profileClass = 'PRG';
                this.waitlistInsertList[i].createUserId = this.sessionManager.getId();
                this.waitlistInsertList[i].modifyUserId = this.sessionManager.getId();
                this.waitlistInsertList[i].programId = Number(this.programId);
                this.waitlistInsertList[i].agyLocId = this.agyLocId;
                this.waitlistInsertList[i].crsActyId = this.waitlistModel.crsActyId;
            }

            this.waitlistCommitModel.insertList = this.waitlistInsertList;

        }

        if (this.waitlistUpdateList.length > 0) {
            for (let i = 0; i < this.waitlistUpdateList.length; i++) {
                this.waitlistUpdateList[i].referralDate = DateFormat.getDate(this.waitlistUpdateList[i].referralDate);
                if (!this.validateWaitList(this.waitlistUpdateList[i])) {
                    return;
                }

            }
            this.waitlistCommitModel.updateList = this.waitlistUpdateList;
        }
        if (this.waitlistDeleteList.length > 0) {
            for (let i = 0; i < this.waitlistDeleteList.length; i++) {
                this.waitlistDeleteList[i].referralDate = DateFormat.getDate(this.waitlistDeleteList[i].referralDate);
            }
            this.waitlistCommitModel.deleteList = this.waitlistDeleteList;
        }

        const waitlistSaveData = this.oidpawliFactory.waitlistCommits(this.waitlistCommitModel);
        waitlistSaveData.subscribe(data => {
            if (data[0] && data[0].sentenceSeq === this.checkFive) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidpawli.delete1');
                this.show();
                this.waitlistExecuteQuery();
            } else if (data[0] && data[0].sentenceSeq === this.checkSix) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidpawli.delete2');
                this.show();
                this.waitlistExecuteQuery();
            } else if (data[0] && data[0].sentenceSeq === 7) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidpawli.offenderexistsonwaitinglist');
                this.show();
                this.waitlistExecuteQuery();
            } else if (data[0] && data[0].sentenceSeq === 8) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidpawli.offenderalreadyapproved');
                this.show();
                this.waitlistExecuteQuery();
            } else if (data[0] && data[0].sentenceSeq === 9) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidpawli.offenderalreadyonwaitinglist');
                this.show();
                this.waitlistExecuteQuery();
            } else if (data[0] && data[0].sentenceSeq === this.checkOne) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.waitlistExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.waitlistExecuteQuery();
            }
        });
    }
    facEvent() {
        if (!this.agyLocId) {
            this.agyLocId = this.agyLocId === '' ? undefined : '';
        }
    }
    get gridInsBtn() {
        if (this.agyLocId && this.service) {
            return true;
        } else {
            return false;
        }
    }
    clearDisableOne() {
        if (this.agyLocId || this.service || this.waitlistData.length > 0) {
            return false;
        } else {
            return true;
        }
    }
}
