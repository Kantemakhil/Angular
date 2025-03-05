import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OsunmemoService } from '../service/osunmemo.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { TagWorkflowBrowseQueue } from '@cm/teams-workflow/beans/TagWorkflowBrowseQueue';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { LovComponent } from '@core/ui-components/lov/lov.component';
// import required bean declarations

@Component({
    selector: 'app-osunmemo',
    templateUrl: './osunmemo.component.html'
})

export class OsunmemoComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    // Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    date: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    workItemReadOnly: boolean;
    buttonsReadOnly: boolean;
    rgworksRg: any[] = [];
    rgstaffRg: any[] = [];
    rgteamsRg: any[] = [];
    rgseverityRg: any[] = [];
    msglist = [];
    type = 'error';
    message = ' Invalid.';

    workType: string;
    workSubType: string;
    staffName: string;
    teamName: string;
    ackMemoSubject: string;
    severity: string;
    memoDetails: string;
    ackReq: boolean;
    ackSubReq: boolean;

    newMemoModel: TagWorkflowBrowseQueue = new TagWorkflowBrowseQueue();

    workLink: string;
    staffLink: string;
    teamLink: string;
    severityLink: string;


    workTitle = { description: this.translateService.translate('osunmemo.worktype'),
                workSubType: this.translateService.translate('osunmemo.worksubtype') };
    staffTittle = { description: this.translateService.translate('common.officer'),
                code: this.translateService.translate('osunmemo.staffid') };
    teamTittle = { description: this.translateService.translate('common.team'),
                    code: this.translateService.translate('osunmemo.teamcode') };
    severityTittle = { description: this.translateService.translate('common.description'),
                    code: this.translateService.translate('common.code') };

    offenderBookId: string;
    workId: string;
    workAndObId: string;
    staffWorkAndObId: string;
    staffId: string;
    autoPoplate: boolean;
    staffDisable: boolean;
    teamDisable: boolean;
    staffListType: any[];
    teamListType: any[];
    ackSubjectDisable: boolean;
    textDisable: boolean;
    checkDisabled: boolean;
    types: string;
    teamId: string;
    offName: string;
    teamMemberId: string;
    wType: string;


    @ViewChild('selwork_type') selwork_type: LovComponent;
    @ViewChild('selstaff_name') selstaff_name: LovComponent;
    @ViewChild('selteam_name') selteam_name: LovComponent;



       constructor(private osunmemoFactory: OsunmemoService , public translateService: TranslateService,
              public sessionManager: UserSessionManager, public dialogService: DialogService) {
    }
    ngOnInit() {
        this.severity = '';
    this.ackSubjectDisable = true;
    this.workLink = 'osunmemo/rgWorksRecordGroup';
    this.autoPoplate = true;
    this.textDisable = true;
    this.checkDisabled = true;
    this.staffDisable = true;
    this.teamDisable = true;
    this.ackSubReq = false;

    this.offenderBookId = this.dialog.data.offenderBookId;

    const disPlayOffender =  this.osunmemoFactory.getDisplayAuto(this.offenderBookId);
    disPlayOffender.subscribe(data => {
      if (data) {

        this.offName = data;

      }
    });


    }


    isInsertable() {

        if (this.ackReq) {
            this.ackSubjectDisable = false;
            this.ackSubReq = true;
          } else {
            this.ackSubjectDisable = true;
            this.ackMemoSubject = '';
            this.ackSubReq = false;
          }


    }
     show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    workTypeChange(event) {
        if (event) {
            this.types = event.workType;
            this.wType = event.description;
            this.ackSubjectDisable = true;
            this.textDisable = false;
            this.checkDisabled = false;
            this.workSubType = event.workSubType;
            this.workId = event.codes;
        }
        if (this.workType !== event.workType) {
            this.teamName = '';
            this.teamId = '';
            this.staffId = '';
            this.ackReq = false;
            this.ackMemoSubject = '';
            this.ackSubReq = false;
            this.memoDetails = '';

             }
        this.workAndObId = this.workId + '-' + this.offenderBookId;
        this.staffLink = 'osunmemo/rgStaffRecordGroup?workAndObId=' + this.workAndObId;

        this.staffLov();

        this.teamLink = 'osunmemo/rgTeamsRecordGroup?staffWorkAndObId=' + this.workAndObId;

        this.teamLov();
    }
    workBlured(event) {
        if (!this.workType) {
            this.workType = this.workType === '' ? undefined : '';
        }
    }
    staffBlured(event) {
        if (!this.staffName) {
            this.staffName = this.staffName === '' ? undefined : '';
        }
    }
    teamBlured(event) {
        if (!this.teamName) {
            this.teamName = this.teamName === '' ? undefined : '';
        }
    }

    clearFields() {
        this.workType = '';
        this.workSubType = '';
        this.staffName = '';
        this. teamName = '';
        this.ackReq = false;
        this.ackMemoSubject = '';
        this. memoDetails = '';
        this.date = undefined;
        this.selwork_type.inputControl.reset();
        this.selteam_name.inputControl.reset();
        this.selstaff_name.inputControl.reset();
        this.severity = '';
        this.ackSubReq = false;

        this.ackSubjectDisable = true;
        this.workLink = 'osunmemo/rgWorksRecordGroup';
        this.autoPoplate = true;
        this.textDisable = true;
        this.checkDisabled = true;
        this.staffDisable = true;
        this.teamDisable = true;

    }

    isClearDisabled() {
        if (this.workType ||
            this.workSubType ||
            this.staffName ||
            this.teamName ||
            this.memoDetails ||
            this.severity ||
            this.ackMemoSubject ||
            this.date) {
                return false;
            }
            return true;
    }

    teamLov() {
        const teamData =  this.osunmemoFactory.rgTeamsRecordGroup(this.workAndObId);

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


        const staffData =  this.osunmemoFactory.rgStaffRecordGroup(this.workAndObId);

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
        this.teamLink = 'osunmemo/rgTeamsRecordGroup?staffWorkAndObId=' + this.staffWorkAndObId;
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
                translate('osunmemo.duedate');
            this.show();
            /* event = undefined;
            this.date = undefined; */
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
            this.message = this.translateService.translate('osunmemo.memotypemsg');
            this.show();
            is.valid = false;
            return;
        }
        if ( ( (!this.staffName && !this.teamName) || !this.teamName)) {
            this.type = 'warn';
            this.message = this.translateService.translate('osunmemo.teammsg');
            this.show();
            is.valid = false;
            return;
        }
         if ((this.ackReq && !this.ackMemoSubject) || (!this.ackReq && this.ackMemoSubject)) {
            this.type = 'warn';
            this.message = this.translateService.translate('osunmemo.ackmsg');
            this.show();
            is.valid = false;
            return;
        }
        if (!this.memoDetails) {
            this.type = 'warn';
            this.message = this.translateService.translate('osunmemo.memodetmsg');
            this.show();
            is.valid = false;
            return;
        }
        if (!this.severity) {
            this.type = 'warn';
            this.message = this.translateService.translate('osunmemo.severityErr');
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
                    translate('osunmemo.duedate');
                this.show();
                // this.date = undefined;
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
                const teamIdValid = this.osunmemoFactory.getTeamemberId(this.teamMemberId);
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
            label: this.translateService.translate('osunmemo.popup').replace('%workType%', this.wType).
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
    this.newMemoModel.workType = this.wType;
    this.newMemoModel.workId = Number(this.workId);
    this.newMemoModel.offenderBookId = Number(this.offenderBookId);
    this.newMemoModel.teamId = Number(this.teamId);
    this.newMemoModel.staffId = Number(this.staffId);
    this.newMemoModel.firstName = this.offName;
    this.newMemoModel.messageText = this.memoDetails;
    this.newMemoModel.dueDate = this.date;
    this.newMemoModel.severityCode = this.severity;
    if (this.ackReq === true) {
        this.newMemoModel.acknowledgementRequired = 'Y';
    } else if (this.ackReq === false) {
        this.newMemoModel.acknowledgementRequired = 'N';

    }
    this.newMemoModel.acknowledgementSubject = this.ackMemoSubject;
    const submitAdhocSaveData = this.osunmemoFactory.submitAdhocWorkflow(this.newMemoModel);
    submitAdhocSaveData.subscribe(data => {
        if (data[0].functionType === '1') {
            this.type = 'success';
            this.message = this.translateService.translate('osunmemo.success').replace('%workType%', data[0].workType);
            this.show();
            this.clearFields();
            return;
        } else if (data[0].functionType === '2') {
            this.type = 'warn';
            this.message = this.translateService.translate('osunmemo.exception');
            this.show();
        }
    } ) ;

   }
}
