import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OffenderCaseNotes } from '@inst/casemanagement/beans/OffenderCaseNotes';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OffenderCaseNotesCommitBean } from '@inst/casemanagement/beans/OffenderCaseNotesCommitBean';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { Router } from '@angular/router';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { OcdclogsService } from '@iwp/service/ocdclogs.service';
import { OcdxprogService } from '../service/ocdxprog.service';
@Component({
    selector: 'app-ocdpnote',
    templateUrl: './ocdpnote.component.html'
})

export class OcdpnoteComponent implements OnInit {
    selectedCaseNote: OffenderCaseNotes = new OffenderCaseNotes();
    staffId: any;
    globalCaseLoadType: any;
    globalUserId: any;
    caseNoteText: string;
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('grid') grid: any;
    timeCreation: Date;
    dateCreation: Date;
    retriveDisable: boolean;
    clearDisable: boolean;
    index = -1;
    selected = -1;
    msgs: any[] = [];
    offendercasenotesData: any[] = [];
    offendercasenotesModel: OffenderCaseNotes = new OffenderCaseNotes();
    offendercasenotesInsertList: OffenderCaseNotes[] = [];
    offendercasenotesUpdatetList: OffenderCaseNotes[] = [];
    offendercasenotesDeleteList: OffenderCaseNotes[] = [];
    offendercasenotesCommitModel: OffenderCaseNotesCommitBean = new OffenderCaseNotesCommitBean();
    offenderCaseNotesColumnDef: any[];
    fromDate: Date;
    toDate: Date;
    type: string;
    message: any;
    msglist: any[];
    searchDisable = false;
    checkFlag = true;
    routerChild: any[] = [];
    constructor(private ocdxprogFactory: OcdxprogService,
        public translateService: TranslateService,
        private dialogService: DialogService,
        private router: Router, private ocdclogsService : OcdclogsService) {
        this.offenderCaseNotesColumnDef = [];
    }
    ngOnInit() {
        this.clearDisable = true;
        this.retriveDisable = false;
        this.caseNoteText = '';
        this.dateCreation = DateFormat.getDate();
        this.timeCreation = DateFormat.getDate();
        this.toDate = DateFormat.getDate();
        this.fromDate = DateFormat.getDate(DateFormat.getDate().setDate(DateFormat.getDate().getDate() - 90));

        this.offenderCaseNotesColumnDef = [
            {
                fieldName: this.translateService.translate('ocdpnote.date'), field: 'contactDate',
                datatype: 'date', editable: true, cellEditable: this.canEdit, width: 150
            },
            {
                fieldName: this.translateService.translate('ocdpnote.time'), field: 'contactTime',
                datatype: 'time', editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate('ocdpnote.source'), field: 'noteSourceCode',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ocdpnote.notetype'), field: 'caseNoteType',
                datatype: 'lov', domain: 'TASK_TYPE', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ocdpnote.notesubtype'), field: 'caseNoteSubType',
                datatype: 'lov', link: 'ocdpnote/rgSubTypeRecordGroup',domain:'TASK_SUBTYPE', editable: true, cellEditable: this.canEdit, width: 150
            },
            {
                fieldName: '', field: 'butIwp', datatype: 'launchbutton', editable: false, width: 150, link: '/OIUIWPVE', modal: true, data: 'row',
                isDisable: this.isDialogDisable, onLaunchClick: this.onDClick
            },
            {
                fieldName: '', field: 'butGo', datatype: 'launchbutton', editable: false, width: 150, modal: true, data: 'row',
                isDisable: this.isDialogDisable, onLaunchClick: this.onGClick
            },
            {
                fieldName: '', field: 'butR', datatype: 'launchbutton', link: '/OCUNOTCM', modal: true, data: 'row',
                editable: false, width: 150, isDisable: this.isDialogDisable, onLaunchClick: this.onRClick
            },
            {
                fieldName: '', field: 'butAmendment', datatype: 'launchbutton', link: '/ocucname', modal: true, data: 'row',
                editable: false, width: 150, isDisable: this.isDialogDisable, onLaunchClick: this.onAClick
            },
            {
                fieldName: this.translateService.translate('ocdpnote.amended'), field: 'amendmentFlag',
                datatype: 'checkbox', editable: false, width: 150
            },

            { fieldName: '', field: 'caseNoteText', hide: true },
        ];
        if (this.dialog.data) {
            this.offendercasenotesModel.objectType = 'OFF_PRGREF_ID';
            this.offendercasenotesModel.objectId = this.dialog.data.offPrgrefId;
            this.offendercasenotesModel.offenderBookId = this.dialog.data.offenderBookId;
        }
        this.ocdpnoteGlobalUserAndCaseloadtype();
        const routerComponets = this.router.config;
        this.routerChild = [];
        routerComponets.filter(ele => {
            if (ele.children && Array.isArray(ele.children)) {
                return true;
            } else {
                return false;
            }
        }).forEach(ele => ele.children.forEach(data => this.routerChild.push(data.path)));
    }

    onRowClickoffendercasenotes(event) {
        if (event) {
            const node = this.grid.gridOptions.api.getSelectedNodes().length && this.grid.gridOptions.api.getSelectedNodes()[0];
            this.index = node.rowIndex;
            this.caseNoteText = event.caseNoteText;
            if ( event.staffId) {
            this.staffId = String(event.staffId);
            }
            this.selectedCaseNote = event;
            if (event.caseNoteId) {
                this.dateCreation = event.contactDate;
                this.timeCreation = DateFormat.getDate(event.contactTime);
            } else {
                this.dateCreation = DateFormat.getDate();
                this.timeCreation = DateFormat.getDate();
                
            }
        }

    }

    cancel() {
        this.dialog.close(null);
    }
    isDialogDisable(data) {
        return !data.caseNoteId;
    }
    ocdpnoteGlobalUserAndCaseloadtype() {
        this.ocdxprogFactory.ocdpnoteGlobalUserAndCaseloadtype().subscribe(result => {
            if (result.length > 0) {
                this.globalUserId = result[0].code;
                this.globalCaseLoadType = result[0].description;
                this.staffId = this.globalUserId;
            }
            this.offendercasenotesExecuteQuery();
        });
    }


    offendercasenotesExecuteQuery() {


        this.offendercasenotesModel.fromDate = this.fromDate;
        this.offendercasenotesModel.toDate = this.toDate;
        this.offendercasenotesModel.caseNoteType = 'PROG_NOTE';
        const offendercasenotesResult = this.ocdxprogFactory.
            offenderCaseNotesExecuteQuery(this.offendercasenotesModel);
        offendercasenotesResult.subscribe(offendercasenotesResultList => {
            if (offendercasenotesResultList.length === 0) {
                this.offendercasenotesData = [];
                if (!this.checkFlag) {
                this.show(this.translateService.translate('common.querycaused'));
                }
                this.checkFlag = false;
            } else {
                this.checkFlag = false;
                this.searchDisable = true;
                offendercasenotesResultList.forEach(element => {
                    element.noteSourceCode = element.noteSourceCode === 'INST' ? 'INSTITUTION' :
                        element.noteSourceCode === 'COMM' ? 'COMMUNITY' : element.noteSourceCode;
                    element['butIwp'] = 'D';
                    element['butGo'] = 'Go';
                    element['butR'] = 'R';
                    element['butAmendment'] = 'A';
                    element.amendmentFlag = element.amendmentFlag !== 'Y' ? undefined : 'Y';
                    element.pModuleName = 'OCDPNOTE';
                    element.pObjectType = 'CNOTE';
                });
                this.offendercasenotesData = offendercasenotesResultList;
                this.selected = 0;
                this.clearDisable = false;
                this.retriveDisable = true;
            }
        });
    }

    offenderCaseNotesSearch(fromDate?, toDate?) {
        if (fromDate) {
            if (String(fromDate.lastValue).indexOf('_') >= 0 && fromDate.value === null) {
                this.type = 'info';
                this.message = this.translateService.translate('common.datemustbeentervalidformat');
                this.show(this.message, this.type);
                return;
            }
        }
        if (toDate) {
            if (String(toDate.lastValue).indexOf('_') >= 0 && toDate.value === null) {
                this.type = 'info';
                this.message = this.translateService.translate('common.datemustbeentervalidformat');
                this.show(this.message, this.type);
                return;
            }
        }
        if (!this.fromDate) {
            this.show(this.translateService.translate('ocdpnote.fromdatemustbeentered'));
            return;
        }
        if (this.fromDate && this.toDate) {
            if (DateFormat.compareDate(DateFormat.getDate(this.fromDate), DateFormat.getDate(this.toDate)) > 0) {
                this.show('ocdpnote.fromdatecannotbelater');
                return false;
            }
        }
        this.offendercasenotesExecuteQuery();


    }

    clear() {
        this.toDate = null;
        this.fromDate = null;
        this.offendercasenotesData = [];
        this.retriveDisable = false;
        this.clearDisable = true;
        this.searchDisable = false;
        this.caseNoteText = '';
        this.dateCreation = null;
        this.timeCreation = null;
        this.staffId = '';

    }
    get clrBtnFlag() {
        if (this.offendercasenotesData.length === 0 && !this.fromDate) {
            return true;
        } else {
            return false;
        }
    }
    onGridInsert = () => {
        if (!this.gridValidation(this.offendercasenotesData)) {
            return null;
        }
        const data = {};

        data['contactDate'] = DateFormat.getDate();
        data['contactTime'] = DateFormat.getDate();
        data['noteSourceCode'] = this.globalCaseLoadType === 'INST' ? 'INSTITUTION' :
            this.globalCaseLoadType === 'COMM' ? 'COMMUNITY' : this.globalCaseLoadType;
        data['caseNoteType'] = 'PROG_NOTE';
        data['nbtCaseNoteSubType'] = '';
        data['butIwp'] = 'D';
        data['butGo'] = 'Go';
        data['butR'] = 'R';
        data['butAmendment'] = 'A';
        data['amendmentFlag'] = false;
        data['staffId'] = this.globalUserId;
        data['pModuleName'] = 'OCDPNOTE';
        data['pObjectType'] = 'CNOTE';
        this.staffId = this.globalUserId;
        return data;
    }

    canEdit = (data: any, index: number, field: string): boolean => {
        if (!data.caseNoteId) {
            return true;
        } else {
            return false;
        }
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocdpnoteSaveoffendercasenotesForm(event) {
        if (!this.gridValidation(event.added)) {
            return false;
        }
        this.offendercasenotesInsertList = event.added;
        this.offendercasenotesUpdatetList = event.updated;
        this.offendercasenotesCommitModel.insertList = [];
        this.offendercasenotesInsertList.forEach(element => {
            element.timeCreation = this.timeCreation;
            element.dateCreation = this.dateCreation;
            element.offenderBookId = this.offendercasenotesModel.offenderBookId;
            element.objectId = this.offendercasenotesModel.objectId;
            element.contactDate = DateFormat.getDate(element.contactDate.setHours(0, 0, 0));

            if (element.contactTime && element.contactDate) {
                element.contactTime = DateFormat.getDate(element.contactTime);
                const strTimeValue = element.contactTime.getHours() + ':' + element.contactTime.getMinutes();
                element.contactTime = TimeFormat.parse(strTimeValue, element.contactDate);
            }
        });
        this.offendercasenotesUpdatetList.forEach(element => {
            if (element.contactTime && element.contactDate) {
                element.contactTime = DateFormat.getDate(element.contactTime);
                const strTimeValue = element.contactTime.getHours() + ':' + element.contactTime.getMinutes();
                element.contactTime = TimeFormat.parse(strTimeValue, element.contactDate);
            }
        });
        this.offendercasenotesCommitModel.insertList = this.offendercasenotesInsertList;
        this.offendercasenotesCommitModel.updateList = this.offendercasenotesUpdatetList;
        const offendercasenotesSaveData = this.ocdxprogFactory.offenderCaseNotesCommit(this.offendercasenotesCommitModel);
        offendercasenotesSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.offendercasenotesExecuteQuery();
            } else {
                this.show('common.addupdateremoverecordfailed', 'error');
            }
            
        });
    }
     

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }

    gridValidationRow = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();

        if (event.newValue) {
            if (event.field === 'contactDate') {
                if (event.newValue && DateFormat.compareDate(DateFormat.getDate(event.newValue), DateFormat.getDate()) > 0) {
                    this.show('ocdpnote.datecannotfuture');
                }
            }
            if (event.field === 'contactTime') {
                if ((event.data.contactDate && DateFormat.compareDate(DateFormat.getDate(event.data.contactDate),
                    DateFormat.getDate()) === 0) &&
                    (event.newValue && DateFormat.compareTime(DateFormat.getDate(event.newValue), DateFormat.getDate()) > 0)) {
                    this.show('ocdpnote.timecannotfuture');
                } else if (!event.data.caseNoteId) {
                    if(!event.data.contactTime){
                    this.grid.setColumnData('contactTime', rowIndex,
                        DateFormat.getDate());
                    }
                }
            }else if(event.field === 'caseNoteSubType'){
                if(event.data.caseNoteSubType){
                    this.ocdclogsService.caseNoteTextData(event.data).subscribe(data => {
                        this.caseNoteText = data;
                        this.grid.setColumnData('caseNoteText', rowIndex, data);
                    });
                }else{
                    this.caseNoteText = undefined;
                    this.grid.setColumnData('caseNoteText', rowIndex, undefined);
                }
            }
        } else {
            if (event.field === 'contactDate') {
            this.grid.setColumnData('contactTime', rowIndex,
            '');
            }
        }
        rowdata.validated = true;
        return rowdata;
    }



    onCaseNoteTextChange(event) {
        if (this.index > -1) {
            this.offendercasenotesData[this.index].caseNoteText = this.caseNoteText;

            this.grid.setColumnData('caseNoteText', this.index, this.caseNoteText);
        }
    }

    FromToDateValidation() {
        if (!this.fromDate) {
            this.fromDate = this.fromDate === undefined ? null : undefined;
        }
        if (!this.toDate) {
            this.toDate = this.toDate === undefined ? null : undefined;
        }
        if (this.fromDate && this.toDate) {
            if (DateFormat.compareDate(DateFormat.getDate(this.fromDate), DateFormat.getDate(this.toDate)) > 0) {
                this.show('ocdpnote.fromdatecannotbelater');
                return false;
            }
        }
        return true;
    }

    gridValidation(arrData: any[]) {
        if (!this.fromDate) {
            this.show('ocdpnote.fromdatemustbeentered');
            return false;
        }
        if (!this.FromToDateValidation()) {
            return false;
        }
        const validator = { valid: true };
        arrData.forEach(element => {
            if (!element.contactDate) {
                this.show('ocdpnote.datemandatory');
                validator.valid = false;
                return;
            }
            if (!element.contactTime) {
                this.show('ocdpnote.timemadatory');
                validator.valid = false;
                return;
            }
            if (element.contactDate && DateFormat.compareDate(DateFormat.getDate(element.contactDate), DateFormat.getDate()) > 0) {
                this.show('ocdpnote.datecannotfuture');
                validator.valid = false;
                return;
            }
            if ((element.contactDate && DateFormat.compareDate(DateFormat.getDate(element.contactDate), DateFormat.getDate()) === 0) &&
                (element.contactTime && DateFormat.compareTime(DateFormat.getDate(element.contactTime), DateFormat.getDate()) > 0)) {
                this.show('ocdpnote.timecannotfuture');
                validator.valid = false;
                return;
            }
            if (!element.caseNoteSubType) {
                this.show('ocdpnote.subtypemust');
                validator.valid = false;
                return;
            }
            if (!element.caseNoteText) {
                this.grid.btnSavebtnDisable = true;
                this.show('ocdpnote.textmust');
                validator.valid = false;
                return;
                
            }
        });
        return validator.valid;
    }
    onDClick = (data) => {
        if (data.caseNoteId && this.grid.addedMap.size === 0) {
            this.dialogService.openLinkDialog('/OIUIWPVE', data, 90).subscribe(result => {
                this.ocdpnoteGlobalUserAndCaseloadtype();
            });
        }
        return false;
    }
    onGClick = (data) => {
        if (data.caseNoteId && this.grid.addedMap.size === 0) {
            const offendercasenoteModule = this.ocdxprogFactory.getModuleName(data);
            offendercasenoteModule.subscribe(result => {
            if (result && result.moduleName) {
                this.onGClickLauncher (result) ;
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
        const suffix = this.routerChild.includes(data.moduleName) ? 'DIALOG' : '';
        if (suffix) {
            if (suffix !== 'DIALOG') {
            this.dialogService.openLinkDialog('modulename', data).subscribe(result => {
                this.ocdpnoteGlobalUserAndCaseloadtype();
            });
            } else {
                this.dialog.close(null);
                this.router.navigate(['/' + data.moduleName]);
            }
        }
        
        // this.router.navigate([modulename]);
        // this.dialogService.openLinkDialog('modulename', data).subscribe(result => {
        //     this.ocdpnoteGlobalUserAndCaseloadtype();
        // });
    }
    onRClick = (data) => {
        if (data.caseNoteId && this.grid.addedMap.size === 0) {
            this.dialogService.openLinkDialog('/OCUNOTCM', data, 90).subscribe(result => {
                this.ocdpnoteGlobalUserAndCaseloadtype();
            });
        }
        return false;
    }
    onAClick = (data) => {
        if (data.caseNoteId && this.grid.addedMap.size === 0) {
            this.dialogService.openLinkDialog('/ocucname', data, 90).subscribe(result => {
                this.ocdpnoteGlobalUserAndCaseloadtype();
            });
        }
        return false;
    }

}
