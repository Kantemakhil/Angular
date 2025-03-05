import {
    Component,
    OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiihiscoService } from '../service/oiihisco.service';
import { AgencyCounts } from '@automatedbeans/AgencyCounts';
import { AgencyLocationCounts } from '@automatedbeans/AgencyLocationCounts';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';

@Component({
    selector: 'app-oiihisco',
    templateUrl: './oiihisco.component.html'
})

export class OiihiscoComponent implements OnInit {
    // Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    agencycountsData: AgencyCounts[] = [];
    agencycountsDataTemp: AgencyCounts[] = [];
    agencycountsModel: AgencyCounts = new AgencyCounts();
    histcntinqModel: AgencyCounts = new AgencyCounts();
    agencycountsIndex: number;
    agencycountsInsertList: AgencyCounts[] = [];
    agencycountsUpdatetList: AgencyCounts[] = [];
    agencycountsDeleteList: AgencyCounts[] = [];
    agencylocationcountsData: AgencyLocationCounts[] = [];
    agencylocationcountsDataTemp: AgencyLocationCounts[] = [];
    agencylocationcountsModel: AgencyLocationCounts = new AgencyLocationCounts();
    agencylocationcountsIndex: number;
    agencylocationcountsInsertList: AgencyLocationCounts[] = [];
    agencylocationcountsUpdatetList: AgencyLocationCounts[] = [];
    agencylocationcountsDeleteList: AgencyLocationCounts[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    vOffAuthVisColumnDef: any[];
    offCaseNrColumnDef: any[];
    offAuthVisitOffColumnDef: any[];
    teamsColumnDef: any[];
    offAuthVisitorsColumnDef: any[];
    agencyLocationCountsColumnDef: any[];
    perIdentColumnDef: any[];
    profilesColumnDef: any[];
    perEmpColumnDef: any[];
    agencyCountsColumnDef: any[];
    grieDetColumnDef: any[];
    offVisitRestColumnDef: any[];
    perAddrColumnDef: any[];
    offenderGrievancesColumnDef: any[];
    offenderGrievanceTxnsColumnDef: any[];
    offNotesColumnDef: any[];
    visitingMembersColumnDef: any[];
    visitingGroupsColumnDef: any[];
    offCntPerColumnDef: any[];
    bedAhColumnDef: any[];
    resBlColumnDef: any[];
    contactsColumnDef: any[];
    offCntPerReadOnly: boolean;
    perAddrReadOnly: boolean;
    perIdentReadOnly: boolean;
    perInfoReadOnly: boolean;
    perEmpReadOnly: boolean;
    vOffAuthVisReadOnly: boolean;
    contactsReadOnly: boolean;
    offCaseNoteReadOnly: boolean;
    amendNoteReadOnly: boolean;
    personsReadOnly: boolean;
    offCaseNrReadOnly: boolean;
    profilesReadOnly: boolean;
    srchCtrlReadOnly: boolean;
    teamsReadOnly: boolean;
    butCtrlReadOnly: boolean;
    crtMvTmpReadOnly: boolean;
    bedAhReadOnly: boolean;
    offNotesReadOnly: boolean;
    cntlReadOnly: boolean;
    vOffBkgReadOnly: boolean;
    sysPflReadOnly: boolean;
    offenderGrievancesReadOnly: boolean;
    offenderGrievanceTxnsReadOnly: boolean;
    subRemCntReadOnly: boolean;
    resBlReadOnly: boolean;
    offVisitRestReadOnly: boolean;
    offAuthVisitorsReadOnly: boolean;
    imageVisitReadOnly: boolean;
    offAuthVisitOffReadOnly: boolean;
    imagesOffReadOnly: boolean;
    nbtQueryBlkReadOnly: boolean;
    visitingGroupsReadOnly: boolean;
    visitingMembersReadOnly: boolean;
    grieInqReadOnly: boolean;
    grieDetReadOnly: boolean;
    histCntInqReadOnly: boolean;
    agencyCountsReadOnly: boolean;
    agencyLocationCountsReadOnly: boolean;
    cgfkAgylocidRg: any[] = [];
    cgfkCounttypesRg: any[] = [];
    cgfkSchtimeRg: any[] = [];
    agylocIdLink: string;
    locatioChangeLink: string;
    scheduleTimeChangeLink: string;
    agylocIdMap: Map<string, string> = new Map<string, string>();
    agylocId: string;
    counTypeId: string;
    scheduledTime: any;
    selected = -1;
    selectedCountDetail = -1;
     locationTitles = {'code': 'Count Code', 'description': 'Description'};
     countTitles = {'code': 'Count Code', 'description': 'Description'};
     timeTitles = {'countTypeCode': 'Count Code', 'scheduledTime': 'Description'};
    commonFlag: boolean;
    constructor(private oiihiscoFactory: OiihiscoService, private sessionManager: UserSessionManager,
        public translateService: TranslateService) {
        this.vOffAuthVisColumnDef = [];
        this.offCaseNrColumnDef = [];
        this.offAuthVisitOffColumnDef = [];
        this.teamsColumnDef = [];
        this.offAuthVisitorsColumnDef = [];
        this.agencyLocationCountsColumnDef = [];
        this.perIdentColumnDef = [];
        this.profilesColumnDef = [];
        this.perEmpColumnDef = [];
        this.agencyCountsColumnDef = [];
        this.grieDetColumnDef = [];
        this.offVisitRestColumnDef = [];
        this.perAddrColumnDef = [];
        this.offenderGrievancesColumnDef = [];
        this.offenderGrievanceTxnsColumnDef = [];
        this.offNotesColumnDef = [];
        this.visitingMembersColumnDef = [];
        this.visitingGroupsColumnDef = [];
        this.offCntPerColumnDef = [];
        this.bedAhColumnDef = [];
        this.resBlColumnDef = [];
        this.contactsColumnDef = [];
    }
    ngOnInit() {
        this.histcntinqModel.fromDate = DateFormat.getDate();
        this.histcntinqModel.toDate = DateFormat.getDate();
        this.commonFlag = false;
        this.agylocIdLink = 'oiihisco/cgfkAgyLocIdRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
        this.agencyCountsColumnDef = [
            { fieldName: this.translateService.translate('oiihisco.intiateddate'), field: 'createDatetime', editable: false, width: 150,
             datatype: 'date' },
            { fieldName: this.translateService.translate('oiihisco.startTime'), field: 'initiatedDate', editable: false, width: 150,
             datatype: 'time' },
            { fieldName: this.translateService.translate('common.location'), field: 'agyLocId', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiihisco.initiatingstaff'), field: 'conductedByUserid', editable: false,
             width: 150 },
            { fieldName: this.translateService.translate('oiihisco.counttype'), field: 'countTypeCode', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiihisco.scheduledTime'), field: 'schTime', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiihisco.actualtotal'), field: 'totalActual', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiihisco.submittedtotal'), field: 'totalReported', editable: false,
             width: 150 },
            { fieldName: this.translateService.translate('oiihisco.out'), field: 'outTotal', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiihisco.plusminus'), field: 'discrep', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiihisco.outcome'), field: 'outcome', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiihisco.completionTime'), field: 'completionDate', editable: false, width: 150,
             datatype: 'time' },
        ];
        this.agencyLocationCountsColumnDef = [
            { fieldName: this.translateService.translate('common.location'), field: 'location', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiihisco.conductedTime'), field: 'conductedDatetime', editable: false, width: 150,
             datatype: 'time' },
            { fieldName: this.translateService.translate('oiihisco.actualtotal'), field: 'actualCount', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiihisco.reportedtotal'), field: 'reportedCount', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiihisco.plusminus'), field: 'discrepTemp', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiihisco.rcntTime'), field: 'rcntDatetime', editable: false, width: 150, datatype: 'time' },
            { fieldName: this.translateService.translate('oiihisco.recounttotal'), field: 'recountTotal', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiihisco.plusminus'), field: 'discrep', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiihisco.submittedby'), field: 'enteredByUserid', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiihisco.conductedby'), field: 'conductedByUserid', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.comment'), field: 'commentText', editable: false, width: 150 },




        ];
        this.selected = -1;
        this.selectedCountDetail = -1;
    }
    onButRetvclick(fromDate?, toDate?) {
        this.agencycountsModel = new AgencyCounts();

        if (fromDate) {
            if (fromDate.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                return;
            }
            if (String(fromDate.lastValue).indexOf('_') >= 0 && fromDate.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                return;
            }
        }
        if (toDate) {
            if (toDate.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                return;
            }
            if (String(toDate.lastValue).indexOf('_') >= 0 && toDate.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                return;
            }
        }
        if (!this.histcntinqModel.fromDate) {
            this.show(this.translateService.translate('oidcnote.fromdatemustbeentered'), 'warn');
            return;
        }
        if (!this.histcntinqModel.toDate) {
            this.show(this.translateService.translate('oiihisco.todatemustbe'), 'warn');
            return;
        }
        if (this.histcntinqModel.fromDate && this.histcntinqModel.toDate) {
            if (DateFormat.compareDate(DateFormat.getDate(this.histcntinqModel.toDate),
                DateFormat.getDate() ) === 1) {
                this.show(this.translateService.translate('oiihisco.todatecannotbegreater'), 'warn');
                return;
            }
        }
        if (this.histcntinqModel.fromDate && this.histcntinqModel.toDate) {
            if (DateFormat.compareDate(DateFormat.getDate(this.histcntinqModel.toDate),
                DateFormat.getDate(this.histcntinqModel.fromDate) ) === - 1) {
                this.show(this.translateService.translate('oiihisco.todatecannotbeless'), 'warn');
                return;
            }
        }
        if (!this.agylocId) {
            this.show(this.translateService.translate('oiihisco.locationmustbe'), 'warn');
            return;
        }
        this.agencycountsModel.agylocId = this.agylocId;
        this.agencycountsModel.fromDate = this.histcntinqModel.fromDate;
        this.agencycountsModel.toDate = this.histcntinqModel.toDate;
        this.agencycountsModel.countTypeCode = this.counTypeId;
        this.agencycountsModel.scheduledTime = this.scheduledTime;
        const serviceObj = this.oiihiscoFactory. agencyCountsExecuteQuery(this.agencycountsModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.commonFlag = false;
                this.show(this.translateService.translate('common.querycaused'), 'warn');
            } else {
                this.agencycountsData = data;
                for (let i = 0; i < this.agencycountsData.length ; i++) {
                    this.agencycountsData[i].agyLocId = this.agylocId;
                }
                this.agencycountsModel = this.agencycountsData[0];
                this.selected = 0;
                this.onRowClickagencycounts(this.agencycountsModel);
                this.commonFlag = true;
            }
        });
    }
    show(vldmsg, type?) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    onRowClickagencycounts(event) {
        this.agencycountsModel = new AgencyCounts();
        if (event) {
        this.agencycountsModel = event;
        }
        this.oiihiscoPopulateDetails();
    }
    /**
    * This function loads the data into the Master Record and its child records
    */
    oiihiscoPopulateDetails() {
        this.agencylocationcountsModel = new AgencyLocationCounts();
        this.agencylocationcountsModel.reportingLocId = Number(this.agencycountsModel.reportingLocId);
        const serviceObj = this.oiihiscoFactory.agencyLocationCountsExecuteQuery(this.agencylocationcountsModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
            } else {
                this.agencylocationcountsData = data;
                this.agencylocationcountsModel = data;
                this.selectedCountDetail = 0;
            }
        });
    }
    onRowClickagencylocationcounts(event) {
    }
    onPrintCountclick() {
    }
    ok() {
    }
    no() {
    }
    clear() {
        this.counTypeId = undefined;
        this.scheduledTime = undefined;
        this.agylocId = undefined;
        this.agencycountsData = [];
        this.agencylocationcountsData = [];
        this.agencycountsModel = new  AgencyCounts();
        this.agencylocationcountsModel = new AgencyLocationCounts();
        this.commonFlag = false;
    }
    locationChange(event) {
        if (event) {
            this.agylocId = undefined;
            this.agylocId = event.agyLocId;
            this.locatioChangeLink = 'oiihisco/cgfkCountTypesRecordGroup?location=' + this.agylocId;
        }
    }
    scheduleTimeChange(event) {
        if (event) {
            this.counTypeId = event.code;
            this.scheduleTimeChangeLink = 'oiihisco/cgfkSchTimeRecordGroup?countTypeCode=' + this.counTypeId
                + '&agylocId=' + this.agylocId;
        } else {
            this.scheduledTime = undefined;
        }
    }
    getscheduleTime(event)  {
        if (event) {
            this.scheduledTime = event.scheduledTime;
        }
    }

    // execute query
    oiihiscoexecuteQuery() {
        const serviceObj = this.oiihiscoFactory. agencyCountsExecuteQuery(this.agencycountsModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
            } else if (data !== undefined && data.length > 0 && data.errorMessage.length > 0) {
            } else {
                this.agencycountsData = data;
                this.agencycountsModel = this.agencycountsData[0];
            }
        });
    }

    /*
    * This function converts the given date from MM/dd/yyyy to
    * yyyy/MM/dd format, If input data is not as expected
    * format then it will return input value
    */
    oiihiscodateFormat(dateValue) {
        if (dateValue !== undefined && dateValue.length > 0) {
            const newdate = dateValue.split('/');
            return newdate[2] + '-' + newdate[0] + '-' + newdate[1];
        } else {
            return dateValue;
        }
    }
    agencylocationcountsExecuteQuery() {
        const agencylocationcountsResult = this.oiihiscoFactory.agencyLocationCountsExecuteQuery(this.agencylocationcountsModel);
        agencylocationcountsResult.subscribe(data => {
            if (data.length === 0) {
                this.agencylocationcountsData = [];
            } else {
                this.agencylocationcountsData = data;
                this.agencylocationcountsModel = data[0];
            }
        });
    }
}

