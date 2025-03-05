import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { VHeaderBlock } from "@common/beans/VHeaderBlock";
import { OsiosearService } from "@common/offender-records/service/osiosear.service";
import { TranslateService } from '@common/translate/translate.service';
import { DateFormat } from "@core/ui-components/datepicker/dateFormat";
import { OffenderCaseNotes } from "@inst/casemanagement/beans/OffenderCaseNotes";
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OcicnsrcService } from '../service/ocicnsrc.service';
import { CheckBox } from "@syncfusion/ej2-buttons";
import { strings } from "@angular-devkit/core";

@Component({
    selector: 'app-ocicnsrc',
    templateUrl: './ocicnsrc.component.html'
})

export class OcicnsrcComponent implements OnInit {


    staffLovlink: String;
    facilitiesLovlink: string;
    caseNotesData: OffenderCaseNotes[] = [];
    offcaseNotesColumnDef: any[];
    tableIndex: number;
    msgs: any[] = [];
    VHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    offnotesModel: OffenderCaseNotes = new OffenderCaseNotes();
    offenderCaseNotes: OffenderCaseNotes = new OffenderCaseNotes();
    offnotefromdate: Date;
    currentDate: Date;
    offnotetodate: Date;
    offnotefromdateTemp: Date;
    staffNameDef: string;
    facilityData: string;
    namesReadOnly: boolean;
    type: any;
    message: any;
    msglist: any[];
    textcasenotetext: string;
    defaultStaffId: number;
    defaultStaffName: string;
    checkbox1: boolean;
    checkbox2: boolean;
    checkbox3: boolean;
    checkbox4: boolean;
    checkbox5: boolean;
    checkBoxDisable: boolean = true;
    searchButton: boolean = true;
    clearButton: boolean = true;
    num: any;
    staffNameVisible:boolean;

    constructor(public translateService: TranslateService, public osiosearService: OsiosearService, public sessionManager: UserSessionManager,
        public ocicnsrcService: OcicnsrcService) {
            this.offcaseNotesColumnDef = [];
    }

    ngOnInit(): void {
        this.getDefaultStaffId();
        this.checkPermisionForLov();
        this.offenderCaseNotes.caseLoadType =  this.sessionManager.currentCaseLoadType;
        this.staffLovlink = 'ocicnsrc/staffmembersRecordGroup?caseLoadType=' + this.sessionManager.currentCaseLoad;
        this.facilitiesLovlink = 'ocicnsrc/facilitiesList?caseLoadType=' + this.sessionManager.currentCaseLoad;
        this.offnotefromdate = DateFormat.getDate(DateFormat.getDate().setDate(DateFormat.getDate().getDate() - 3));
        this.offnotetodate = DateFormat.getDate();
        this.offenderCaseNotes.fromDate= this.offnotefromdate;
        this.offenderCaseNotes.toDate=this.offnotetodate;
        this.searchButton = false;
        this.offcaseNotesColumnDef = [
            { fieldName: this.translateService.translate('ocicnsrc.contactDate'), field: 'contactDate', editable: false, width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate('ocicnsrc.contactTime'), field: 'contactTime', editable: false, width: 150, datatype: 'time' },
            { fieldName: this.translateService.translate('ocicnsrc.noteSourceCode'), field: 'noteSourceCode', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocicnsrc.offenderIdDisplay'), field: 'offenderIdDisplay', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocicnsrc.lastName'), field: 'lastName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocicnsrc.firstName'), field: 'firstName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocicnsrc.caseNoteType'), field: 'caseNoteType', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocicnsrc.caseNoteSubType'), field: 'caseNoteSubType', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocicnsrc.staffName'), field: 'staffName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocicnsrc.amendmentFlag'), field: 'amendmentFlag', editable: false, width: 150, datatype: 'checkbox' }
        ];
    }

    facilityChange(event) {
        this.offenderCaseNotes.facility =this.facilityData;
        this.searchButton = false;
        this.clearButton = false;
    }
    offnotetodatechange(event) {
        this.offenderCaseNotes.toDate = event;
        this.searchButton = false;
        this.clearButton = false;
    }
    offnotefromdatechange(event) {
        this.offenderCaseNotes.fromDate = event;
        this.offnotefromdateTemp = DateFormat.getDate(DateFormat.getDate().setMonth(DateFormat.getDate().getMonth() - 6));
        this.searchButton = false;
        this.clearButton = false;
    }

    staffNameChange(event) {
        this.offenderCaseNotes.staffId = event.code;
        this.searchButton = false;
        this.clearButton = false;
    }
    onSearch() {
        if (this.offenderCaseNotes.staffId === null ||this.offenderCaseNotes.staffId=== undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocicnsrc.staffnamemustbeselect');
            this.show();
            return;
        }
        if (this.offnotefromdate === null || this.offnotefromdate === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocicnsrc.fromdatemust');
            this.show();
            return;
        }
        if (this.offnotetodate === null || this.offnotetodate === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocicnsrc.todatemust');
            this.show();
            return;
        }
        if (DateFormat.compareDate(DateFormat.getDate(this.offnotefromdate), DateFormat.getDate(this.offnotetodate)) === 1) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocicnsrc.fromdatecannotbelaterthantodate');
            this.show();
            return;
        }
        if (DateFormat.compareDate(DateFormat.getDate(this.offnotetodate), DateFormat.getDate()) > 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocicnsrc.todatecannotbefuture');
            this.show();
            return;
        }
        if (this.offnotefromdateTemp > this.offnotefromdate) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocicnsrc.fromdateshouldbe');
            this.show();
            return;
        }
        this.executeQuery();
    }
    getDefaultStaffId() {
        const id = this.ocicnsrcService.getstaffId();
        id.subscribe(data => {
            if (data) {
                this.defaultStaffId = data;
                this.staffNameDef=this.defaultStaffId.toString();
            }
        });

    }

    checkPermisionForLov() {
        const id = this.ocicnsrcService.checkPermisionForLov();
        id.subscribe(data => {
            if (data) {
                this.staffNameVisible=data;
            }
        });

    }

    executeQuery() {
        const obj = this.ocicnsrcService.casenoteexecuteQuery(this.offenderCaseNotes);
        obj.subscribe(bo => {
            if (bo.length === 0) {
                this.caseNotesData = [];
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
                this.namesReadOnly=false;
                this.searchButton = false;
            }
            else {
                bo.forEach(ele => {
                    ele.amendmentFlag = ele.amendmentFlag === 'Y' ? true : false;
                });
                this.caseNotesData = bo;
                this.searchButton = true;
                this.namesReadOnly=true;
            }
            
            this.clearButton = false;
        });

    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    clear() {
        this.offnotefromdate = undefined;
        this.offnotetodate = undefined;
        this.facilityData = undefined;
        this.textcasenotetext = undefined;
        this.checkbox1 = undefined;
        this.checkbox2 = undefined;
        this.checkbox3 = undefined;
        this.checkbox4 = undefined;
        this.checkbox5 = undefined;
        this.offenderCaseNotes.facility=undefined;
        if(!this.staffNameVisible){
            this.staffNameDef = undefined;
            this.offenderCaseNotes.staffId=undefined;
        }
        this.caseNotesData = [];
        this.searchButton = true;
        this.clearButton = true;
        this.namesReadOnly=false;
    }
    onRowClicked(event) {
        if (event) {
            this.textcasenotetext = event.caseNoteText;
            this.checkbox1 = event.checkBox1 === 'Y' ? true : false;
            this.checkbox2 = event.checkBox2 === 'Y' ? true : false;
            this.checkbox3 = event.checkBox3 === 'Y' ? true : false;
            this.checkbox4 = event.checkBox4 === 'Y' ? true : false;
            this.checkbox5 = event.checkBox5 === 'Y' ? true : false;
        }


    }
}
