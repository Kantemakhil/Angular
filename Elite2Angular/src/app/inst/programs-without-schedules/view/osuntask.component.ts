import { LovComponent } from '@core/ui-components/lov/lov.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TagWorkflowBrowseQueue } from '@cm/teams-workflow/beans/TagWorkflowBrowseQueue';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { OsuntaskService } from '../service/osuntask.service';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';

@Component({
    selector: 'app-osuntask',
    templateUrl: './osuntask.component.html'
})

export class OsuntaskComponent implements OnInit {

    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean = true;
    workItemReadOnly: boolean = false;
    buttonsReadOnly: boolean = false;
    rgworksRg: any[] = [];
    rgstaffRg: any[] = [];
    rgteamsRg: any[] = [];
    msglist: any[];
    message: any;
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    msgType: any;
    workLink: string;
    workTitle = {
        description: this.translateService.translate('common.memotype'),
        workSubType: this.translateService.translate('osuntask.memosubtype')
    };
    staffTittle = {
        description: this.translateService.translate('common.officer'),
        code: this.translateService.translate('osuntask.staffid')
    };
    teamTittle = {
        description: this.translateService.translate('common.team'),
        code: this.translateService.translate('osuntask.teamcode')
    };

    offenderBookId: string;
    workId: string;
    workAndObId: string;
    staffWorkAndObId: string;
    staffId: string;
    autoPoplate: boolean;
    workSubType: any;
    staffLink: string;
    teamLink: string;
    workType: any;
    type: string;
    details: any;
    staffName: any;
    teamName: any;
    types: any;
    textDisable: boolean;
    teamListType: any[];
    staffDisable: boolean;
    teamDisable: boolean;
    staffListType: any[];
    offName: any;
    wType: any;
    teamId: string;
    date: any;
    teamMemberId: string;
    newTaskModel: TagWorkflowBrowseQueue = new TagWorkflowBrowseQueue();
    @ViewChild('selwork_type') selwork_type: LovComponent;
    @ViewChild('selstaff_name') selstaff_name: LovComponent;
    @ViewChild('selteam_name') selteam_name: LovComponent;
    offenderId: any;
    moduleName : string;
    constructor(private osuntaskFactory: OsuntaskService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, public dialogService: DialogService,) {
    }
    ngOnInit() {
        this.workLink = 'osuntask/rgWorksRecordGroup?caseloadType=' + this.sessionManager.currentCaseLoadType
        this.autoPoplate = true;
        this.textDisable = true;
        this.staffDisable = true;
        this.teamDisable = true;

        this.offenderBookId = this.dialog.data.offenderBookId;
        this.offenderId = this.dialog.data.offenderId;

        const disPlayOffender = this.osuntaskFactory.getDisplayAuto(this.offenderBookId);
        disPlayOffender.subscribe(data => {
            if (data) {

                this.offName = data;

            }
        });
    }


    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    moduleChange(event){
        if (event) {
            this.moduleName = event.code;
        }
    }

    workTypeChange(event) {
        if (event) {
            this.types = event.workType;
            this.wType = event.description;
            this.textDisable = false;
            this.workSubType = event.workSubType;
            this.workId = event.code;
        }
        if (!event) {
            this.teamName = '';
            this.teamId = '';
            this.staffId = '';
            this.details = '';
            this.workSubType = '';
            this.workId = '';

        }
        if (event && this.workType !== event.workType) {
            this.teamName = '';
            this.teamId = '';
            this.staffId = '';
            this.details = '';

        }
        this.workAndObId = this.workId + '-' + this.offenderBookId;
        this.staffLink = 'osuntask/rgStaffRecordGroup?workAndObId=' + this.workAndObId;

        this.staffLov();

        this.teamLink = 'osuntask/rgTeamsRecordGroup?staffWorkAndObId=' + this.workAndObId;

        this.teamLov();
    }
    workBlured(event) {
        if (!this.workType) {
            this.workType = this.workType === '' ? undefined : '';
            this.workId = ''; // Added for S4-6285
        }
    }
    staffBlured(event) {
        if (!this.staffName) {
            this.staffName = this.staffName === '' ? undefined : '';
            this.staffId = ''; // Added for S4-6285
        }
    }
    teamBlured(event) {
        if (!this.teamName) {
            this.teamName = this.teamName === '' ? undefined : '';
            this.teamId = ''; // Added for S4-6285
        }
    }
    clearFields() {
        this.workType = '';
        this.workSubType = '';
        this.staffName = '';
        this.teamName = '';
        this.details = '';
        this.moduleName='';
        this.date = undefined;
        this.selwork_type.inputControl.reset();
        this.selteam_name.inputControl.reset();
        this.selstaff_name.inputControl.reset();
        this.workLink = 'osuntask/rgWorksRecordGroup?caseloadType=' + this.sessionManager.currentCaseLoadType
        this.autoPoplate = true;
        this.textDisable = true;
        this.staffDisable = true;
        this.teamDisable = true;

    }
    isClearDisabled() {
        if (this.workType ||
            this.workSubType ||
            this.staffName ||
            this.teamName ||
            this.details ||
            this.date) {
            return false;
        }
        return true;
    }
    teamLov() {
        const teamData = this.osuntaskFactory.rgTeamsRecordGroup(this.workAndObId);

        teamData.subscribe(teamList => {
            if (teamList.length === 0) {
                this.teamListType = [];
                this.staffDisable = true;
                this.teamDisable = true;
            } else {
                this.teamName = '';
                this.staffDisable = false;
                this.teamDisable = false;
            }

        });
    }
    staffLov() {


        const staffData = this.osuntaskFactory.rgStaffRecordGroup(this.workAndObId);

        staffData.subscribe(staffList => {
            if (staffList.length === 0) {
                this.staffListType = [];
                this.staffDisable = true;
                this.teamDisable = true;
            } else {
                this.staffDisable = false;
                this.teamDisable = false;

            }

        });
    }

    staffTypeChange(event) {
        this.staffId = event.code;
        this.staffWorkAndObId = this.workId + '-' + this.offenderBookId + '-' + this.staffId;
        this.teamLink = 'osuntask/rgTeamsRecordGroup?staffWorkAndObId=' + this.staffWorkAndObId;
    }
    teamChange(event) {
        this.teamId = event.teamId;

    }
    onDateChange(event) {
        const currDate: Date = DateFormat.getDate();
        const selectedDate: Date = DateFormat.getDate(event);

        currDate.setHours(0);
        currDate.setMinutes(0);
        currDate.setSeconds(0);
        selectedDate.setHours(0);
        selectedDate.setMinutes(0);
        selectedDate.setSeconds(0);
        if (DateFormat.compareDateTime(selectedDate, currDate) === -1) {
            this.type = 'warn';
            this.message = this.translateService.
                translate('osuntask.duedate');
            this.show();
            return false;
        }
    }
    onButSave() {
        this.submitAdhocWorkflow();
    }
    onButExitclick() {
        this.dialog.close(null);
    }
    validateAdhocWorkFlow() {
        const is = { valid: true };
        if (!this.workType || !this.workSubType) {
            this.type = 'warn';
            this.message = this.translateService.translate('osuntask.tasktypemsg');
            this.show();
            is.valid = false;
            return;
        }
        if(!this.moduleName){
            this.type = 'warn';
            this.message = this.translateService.translate('osuntask.modulenamemust');
            this.show();
            is.valid = false;
            return;
        }
        if (((!this.staffName && !this.teamName) || !this.teamName) && this.teamDisable === false) {
            this.type = 'warn';
            this.message = this.translateService.translate('osuntask.teammsg');
            this.show();
            is.valid = false;
            return;
        }
        if (!this.details) {
            this.type = 'warn';
            this.message = this.translateService.translate('osuntask.detailsmsg');
            this.show();
            is.valid = false;
            return;
        }
        if ((!this.staffName && !this.teamName) || !this.teamName) {
            this.type = 'warn';
            this.message = this.translateService.translate('osuntask.teammsg');
            this.show();
            is.valid = false;
            return;
        } 
        if (this.date) {
            const currDate: Date = DateFormat.getDate();
            const selectedDate: Date = DateFormat.getDate(this.date);

            currDate.setHours(0);
            currDate.setMinutes(0);
            currDate.setSeconds(0);
            selectedDate.setHours(0);
            selectedDate.setMinutes(0);
            selectedDate.setSeconds(0);
            if (DateFormat.compareDateTime(selectedDate, currDate) === -1) {
                this.type = 'warn';
                this.message = this.translateService.
                    translate('osuntask.duedate');
                this.show();
                is.valid = false;
                return;
            }
        }
        return is.valid;
    }
    submitAdhocWorkflow() {

        if (!this.validateAdhocWorkFlow()) {
            return;
        } else {
            if (this.staffId && this.teamId) {
                this.teamMemberId = this.staffId + '-' + this.teamId;
                const teamIdValid = this.osuntaskFactory.getTeamemberId(this.teamMemberId);
                teamIdValid.subscribe(data => {
                    if (data === 0) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('osuntask.teamIdErr');
                        this.show();
                    } else {
                        this.showPopUp();
                    }
                });
            } else {
                this.showPopUp();
            }
        }


    }

    showPopUp() {
        const data = {

            label: this.translateService.translate('osuntask.popup').replace('%workType%', this.wType).
                replace('%workSubType%', this.workSubType),
            yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
            if (result) {

                this.createAdhocWorkflow();
            } else {
            }
        });

    }

    createAdhocWorkflow() {
        this.newTaskModel.workType = this.wType;
        this.newTaskModel.workId = Number(this.workId);
        this.newTaskModel.offenderBookId = Number(this.offenderBookId);
        this.newTaskModel.offenderId = Number(this.offenderId);
        if(this.teamId){
            this.newTaskModel.teamId = Number(this.teamId);
        }
        if(this.staffId){
            this.newTaskModel.staffId = Number(this.staffId);
        }
        this.newTaskModel.sourceName = this.moduleName;
        
        this.newTaskModel.firstName = this.offName;
        this.newTaskModel.messageText = this.details;
        this.newTaskModel.dueDate = this.date;
        this.newTaskModel.assignmentDate=new Date();
        this.newTaskModel.eventDate=new Date();
        this.newTaskModel.createUserId=this.sessionManager.getId();
        this.newTaskModel.completeUserId=this.staffName;
        const submitAdhocSaveData = this.osuntaskFactory.submitAdhocWorkflow(this.newTaskModel);
        submitAdhocSaveData.subscribe(data => {
            if (data[0].functionType === '1') {
                this.type = 'success';
                this.message = this.translateService.translate('osuntask.success').replace('%workType%', data[0].workType);
                this.show();
                this.clearFields();
                return;
            } else if (data[0].functionType === '2') {
                this.type = 'warn';
                this.message = this.translateService.translate('osuntask.exception');
                this.show();
            }
        });

    }
}
