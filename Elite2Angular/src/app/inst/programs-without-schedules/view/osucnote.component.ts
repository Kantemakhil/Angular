import { Component, OnInit, ViewChild} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OsucnoteService } from '../service/osucnote.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { TagWorkflowBrowseQueue } from '@cm/teams-workflow/beans/TagWorkflowBrowseQueue';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { OffenderBookings } from '@inst/demographics-biometrics/beans/OffenderBookings';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
// import required bean declarations

@Component({
    selector: 'app-osucnote',
    templateUrl: './osucnote.component.html'
})

export class OsucnoteComponent implements OnInit {
    // Variable declaration
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName:     string;
    lovModel:     any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: true;
    workItemReadOnly: false;
    buttonsReadOnly: false;
    rgworksRg:     any[] = [];
    msglist: any[];
    message: any;
    type: any;

    caseNoteModel: TagWorkflowBrowseQueue = new TagWorkflowBrowseQueue();
    offenderBookings: OffenderBookings = new OffenderBookings();
    caseNoteSubType: string;
    caseNoteType: string;
    details: string;
    caseNoteTypeDomain: string;
    caseNoteTypeLink: string;
    router: any;
    offName: string;
    detailsDis: boolean;

    caseNoteTitle = { description: this.translateService.translate('osucnote.worktype'),
        workSubType: this.translateService.translate('osucnote.worksubtype') };
    workId: string;
    offenderBookId: string;
    caseNoteId: string;
    cType: string;
    cSubType: string;

    constructor(private osucnoteFactory:     OsucnoteService , public translateService: TranslateService,
        public sessionManager: UserSessionManager, public dialogService: DialogService) {

    }
    ngOnInit() {
        this.detailsDis = true;

        this.caseNoteTypeLink = '/osucnote/rgWorksRecordGroup?caseLoadType=' + this.sessionManager.currentCaseLoadType;

        this.offenderBookId = this.dialog.data.offenderBookId;

    const disPlayOffender =  this.osucnoteFactory.getDisplayAuto(this.offenderBookId);
    disPlayOffender.subscribe(data => {
      if (data) {

        this.offName = data;

      }
    });
       

    }
     /**
      * This function displays the messages
      */
    show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
    }


    onButSave() {
        this.submitAdhocWorkflow();

    }
    onButExitclick() {
        this.dialog.close(null);
    }

    showPopUp() {
        const data = {
            label: this.translateService.translate('osucnote.popup').replace('%workType%', this.caseNoteType).
            replace('%workSubType%', this.caseNoteSubType),
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

        this.caseNoteModel.workType = this.cType;
        this.caseNoteModel.workSubType = this.cSubType;
        this.caseNoteModel.offenderBookId = Number(this.offenderBookId);
        this.caseNoteModel.firstName = this.offName;
        this.caseNoteModel.messageText = this.details;
        this.caseNoteModel.senderId = this.sessionManager.getId();
       // this.caseNoteModel.senderId = 'OMS_OWNER';
        this.caseNoteModel.msgId = this.sessionManager.currentCaseLoadType;

        const submitAdhocSaveData = this.osucnoteFactory.submitAdhocWorkflow(this.caseNoteModel);
        submitAdhocSaveData.subscribe(data => {
            if (data[0].functionType === '1') {
                this.type = 'success';
          this.message = this.translateService.translate('osucnote.success').
         replace('%workType%', this.caseNoteType + '/' + this.caseNoteSubType);
                this.show();
                this.clearFields();
                return;
            } else if (data[0].functionType === '2') {
                this.type = 'warn';
                this.message = this.translateService.translate('osucnote.exception');
                this.show();
            }
        } ) ;

            
    }
    clearFields() {
        this.caseNoteType = '';
        this.caseNoteSubType = '';
        this.details = '';
        this.detailsDis = true;
        this.caseNoteTypeLink = '/osucnote/rgWorksRecordGroup';
    }

    isClearDisabled() {
        if (this.caseNoteType ||
            this.caseNoteSubType ||
            this.details) {
                return false;
            }
            return true;
    }

    caseNoteChange(event) {
        if (event) {
            this.caseNoteSubType = event.workSubType;
            this.caseNoteId = event.code;
            this.caseNoteType = event.description;
            this.cType = event.workType;
            this.cSubType = event.codes;
    
            this.detailsDis = false;
            }
        if (!event) {
            this.caseNoteSubType = '';
            this.caseNoteId = '';
            this.caseNoteType = '';
            this.cType = '';
            this.cSubType = '';
    
            this.detailsDis = true;
        }
    }

    caseNoteBlured(event) {
        if (!this.caseNoteType) {
            this.caseNoteType = this.caseNoteType === '' ? undefined : '';
        }
    }

    validateAdhocWorkflow() {
        const is = { valid: true };
        if (!this.caseNoteId || !this.caseNoteSubType) {
            this.type = 'warn';
            this.message = this.translateService.translate('osucnote.caseNoteTypeMsg');
            this.show();
            is.valid = false;
            return;
        }
        if (!this.details) {
            this.type = 'warn';
            this.message = this.translateService.translate('osucnote.detailMsg');
            this.show();
            is.valid = false;
            return;
        }
        return is.valid;
    }

    submitAdhocWorkflow() {

        if (!this.validateAdhocWorkflow()) {
            return;
        } else {
            this.showPopUp();
        }

    }




}
