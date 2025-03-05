import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcunotcmService } from '@inst/casemanagement/service/ocunotcm.service';
import { OffCaseNoteRecipients } from '@instCaseManagementbeans/OffCaseNoteRecipients';
import { OffCaseNoteRecipientsCommitBean } from '@instCaseManagementbeans/OffCaseNoteRecipientsCommitBean';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { Router } from '@angular/router';
import { OidcnoteService } from '@inst/casemanagement/service/oidcnote.service';

@Component({
    selector: 'app-ocunotcm',
    templateUrl: './ocunotcm.component.html'
})

export class OcunotcmComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offcasenrData: OffCaseNoteRecipients[] = [];
    offcasenrDataTemp: OffCaseNoteRecipients[] = [];
    offcasenrModel: OffCaseNoteRecipients = new OffCaseNoteRecipients();
    offcasenrIndex: number;
    offcasenrInsertList: OffCaseNoteRecipients[] = [];
    offcasenrUpdatetList: OffCaseNoteRecipients[] = [];
    offcasenrDeleteList: OffCaseNoteRecipients[] = [];
    offcasenrCommitModel: OffCaseNoteRecipientsCommitBean = new OffCaseNoteRecipientsCommitBean();
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    offCaseNrColumnDef: any[];
    offCaseNrReadOnly: boolean;
    rgstaffdtlsRg: any[] = [];
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    staffTitle = { 'description': 'Staff Member', 'position': 'Position' };
    selected = -1;
    constructor(private ocunotcmFactory: OcunotcmService, public dialogService: DialogService, private router: Router,
        public translateService: TranslateService, private oidcnoteFactory: OidcnoteService) {
    }
    ngOnInit() {
        this.offcasenrExecuteQuery();
        this.offCaseNrColumnDef = [
            {
                fieldName: this.translateService.translate('ocunotcm.rcnteam') + '*', field: 'teamIdDesc', datatype: 'text',
                editable: false, width: 200
            },
            {
                fieldName: '', field: 'button', datatype: 'hyperlink', link: '/OCUTASAT',
                editable: true, displayas: 'href', dialogWidth: '80%', styleClass: 'search',
                updateField: 'row', modal: true, width: 150, data: 'row', onLaunchClick: this.asnLaunchClick
            },
            {
                fieldName: this.translateService.translate('ocunotcm.staffmember'), field: 'staffId', datatype: 'lov',
                link: 'ocunotcm/rgStaffDtlsRecordGroup?teamIdDesc=',
                parentField: 'teamIdDesc', titles: this.staffTitle, editable: true, width: 300, cellEditable: this.canOffInvEdit
            },
            {
                fieldName: this.translateService.translate('ocunotcm.comment'), field: 'commentText', uppercase: 'false', datatype: 'text',
                editable: true, width: 150,maxlength: '240',
                cellEditable: this.canOffInvEdit
            },
        ];
        this.selected = -1;
    }
    onGridInsert = () => {
        return {
            button: '..', teamIdDesc: ''
        };
    }
    onRowClickoffcasenr(event) {
        if (event) {
            this.offcasenrModel = new OffCaseNoteRecipients();
            this.offcasenrModel = event;
        }
    }
    canOffInvEdit = (data: any, index: number, field: string): boolean => {
        if (data.offCaseNoteRecipientId) {
            // this.type = 'info';
            // this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
            // this.show();
            return false;
        }
        return true;
    }
    cancel() {
        this.dialog.close(null);
    }
    asnLaunchClick = (event) => {
        if (event) {
            if (event.offCaseNoteRecipientId) {
                this.type = 'info';
                this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
                this.show();
                return false;
            } else {
                return true;
            }
        }
    }


    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    onOffenderChange(offender) {
    }
    offcasenrExecuteQuery() {
        this.offcasenrModel.caseNoteId = this.dialog.data.caseNoteId;
        const offcasenrResult = this.ocunotcmFactory.offCaseNrExecuteQuery(this.offcasenrModel);
        offcasenrResult.subscribe(data => {
            if (data.length === 0) {
                this.offcasenrData = [];
            } else {
                this.offcasenrData = data;
                for (let i = 0; i < this.offcasenrData.length; i++) {
                    this.offcasenrData[i].button = '..';
                    this.offcasenrModel = data;
                    this.selected = 0;
                }
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocunotcmSaveoffcasenrForm(event) {
        this.offcasenrInsertList = event.added;
        this.offcasenrUpdatetList = event.updated;
        this.offcasenrDeleteList = event.removed;
        this.offcasenrCommitModel.insertList = [];
        this.offcasenrCommitModel.updateList = [];
        this.offcasenrCommitModel.deleteList = [];
        if (this.offcasenrInsertList.length > 0) {
            for (let i = 0; i < this.offcasenrInsertList.length; i++) {
                if (!this.offcasenrInsertList[i].teamIdDesc) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocunotcm.receptiontteam');
                    this.show();
                    return;
                }
                this.offcasenrInsertList[i].teamId = this.offcasenrModel.teamId;
                this.offcasenrInsertList[i].caseNoteId = this.dialog.data.caseNoteId;
                this.offcasenrInsertList[i].createDatetime = this.dialog.data.createDatetime;
                this.offcasenrInsertList[i].createUserId = this.dialog.data.createUserId;
            }
            for (let i = 0; i < this.offcasenrUpdatetList.length; i++) {
            }
            this.offcasenrCommitModel.insertList = this.offcasenrInsertList;
            this.offcasenrCommitModel.updateList = this.offcasenrUpdatetList;
        }
        if (this.offcasenrDeleteList.length > 0) {
            for (let i = 0; i < this.offcasenrDeleteList.length; i++) {
            }
            this.offcasenrCommitModel.deleteList = this.offcasenrDeleteList;
        }
        const offcasenrSaveData = this.ocunotcmFactory.offCaseNrCommit(this.offcasenrCommitModel);
        offcasenrSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.offcasenrExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.offcasenrExecuteQuery();
            }
        });
    }
}

    