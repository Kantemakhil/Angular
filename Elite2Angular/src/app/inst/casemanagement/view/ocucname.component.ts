import {
    Component, OnInit, Injectable, Pipe, PipeTransform, Directive,
    ElementRef, ViewChild
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { TranslateService } from '@common/translate/translate.service';
import { OcucnameService } from '@inst/casemanagement/service/ocucname.service';
import { OffenderCaseNotes } from '@instCaseManagementbeans/OffenderCaseNotes';
import { OffenderCaseNotesCommitBean } from '@instCaseManagementbeans/OffenderCaseNotesCommitBean';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';
//  import required bean declarations

@Component({
    selector: 'app-ocucname',
    templateUrl: './ocucname.component.html'
})

export class OcucnameComponent implements OnInit {
    //  Variable declaration
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offcasenoteData: OffenderCaseNotes[] = [];
    offcasenoteDataTemp: OffenderCaseNotes[] = [];
    offcasenoteModel: OffenderCaseNotes = new OffenderCaseNotes();
    offcasenoteIndex = 0;
    offcasenoteInsertList: OffenderCaseNotes[] = [];
    offcasenoteUpdatetList: OffenderCaseNotes[] = [];
    offcasenoteDeleteList: OffenderCaseNotes[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    offCaseNoteReadOnly = false;
    amendNoteReadOnly = false;
    checkAttempt: any;
    checkAnt: any;
    checkCase: any;
    checkCollateral: any;
    checkOther: any;
    offnotesCommitModel: OffenderCaseNotesCommitBean = new OffenderCaseNotesCommitBean();
    offnotesUpdatetList: OffenderCaseNotes[] = [];
    caseNoteTextValue: string;
    checkboxChangedMsg: string;
    casenoteLength: number;
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    saveFlag = false;
    caseNoteComment: string;
    checkAttemptTemp: boolean;
    checkAntTemp: boolean;
    checkCaseTemp: boolean;
    checkCollateralTemp: boolean;
    checkOtherTemp: boolean;
    checkBox1:any;
    checkBox2:any;
    checkBox3:any;
    checkBox4:any;
    checkBox5:any;
    maxCasenotetextLength:number;
    constructor(private ocucnameFactory: OcucnameService,
        public translateService: TranslateService,
        private sessionManager: UserSessionManager,
        public dialogService: DialogService) {
    }
    ngOnInit() {
        this.checkBox1 = this.translateService.translate(this.dialog.data.checkBox1);
        this.checkBox2 = this.translateService.translate(this.dialog.data.checkBox2);
        this.checkBox3 = this.translateService.translate(this.dialog.data.checkBox3);
        this.checkBox4 = this.translateService.translate(this.dialog.data.checkBox4);
        this.checkBox5 = this.translateService.translate(this.dialog.data.checkBox5);
        this.caseNoteComment = undefined;
        this.saveFlag = false;
        this.maxCasenotetextLength= (32000-this.dialog.data.caseNoteText.length-250)<0?0:(32000-this.dialog.data.caseNoteText.length-250);
        this.offcasenoteExecuteQuery();
    }
    /**
    * To display the messages
    */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];

    }
    allowNumbers(event) {
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }
    onCbChange(event) {
        this.saveFlag = true;
    }
    offcasenoteExecuteQuery() {
        this.offcasenoteModel = new OffenderCaseNotes();
        this.offcasenoteModel.offenderBookId = this.dialog.data.offenderBookId;
        this.offcasenoteModel.caseNoteId = this.dialog.data.caseNoteId;
        const offcasenoteResult = this.ocucnameFactory.
            offCaseNoteExecuteQuery(this.offcasenoteModel);
        offcasenoteResult.subscribe(offcasenoteResultList => {
            if (offcasenoteResultList.length === 0) {
                this.offcasenoteData = [];
            } else {
                this.offcasenoteData = offcasenoteResultList;
                this.offcasenoteModel = offcasenoteResultList[0];
                this.caseNoteComment = undefined;
                this.caseNoteComment = this.dialog.data.caseNoteText;
                this.checkAttempt = this.offcasenoteModel.checkBox1 === 'Y' ? true : false;
                this.checkAnt = this.offcasenoteModel.checkBox2 === 'Y' ? true : false;
                this.checkCase = this.offcasenoteModel.checkBox3 === 'Y' ? true : false;
                this.checkCollateral = this.offcasenoteModel.checkBox4 === 'Y' ? true : false;
                this.checkOther = this.offcasenoteModel.checkBox5 === 'Y' ? true : false;

                this.checkAttemptTemp = this.offcasenoteModel.checkBox1 === 'Y' ? true : false;
                this.checkAntTemp = this.offcasenoteModel.checkBox2 === 'Y' ? true : false;
                this.checkCaseTemp = this.offcasenoteModel.checkBox3 === 'Y' ? true : false;
                this.checkCollateralTemp = this.offcasenoteModel.checkBox4 === 'Y' ? true : false;
                this.checkOtherTemp = this.offcasenoteModel.checkBox5 === 'Y' ? true : false;
            }
        });
    }
    butSaveWhenButtonPressedTrigger() {
        this.offnotesCommitModel.insertList = [];
        this.offnotesCommitModel.updateList = [];
        this.offnotesCommitModel.deleteList = [];
        this.offnotesUpdatetList = [];
        
        this.offcasenoteModel.checkBox1 = this.checkAttempt;
        this.offcasenoteModel.checkBox2 = this.checkAnt;
        this.offcasenoteModel.checkBox3 = this.checkCase;
        this.offcasenoteModel.checkBox4 = this.checkCollateral;
        this.offcasenoteModel.checkBox5 = this.checkOther;
       
        this.caseNoteTextValue = undefined;
        this.checkboxChangedMsg = undefined;
        if (this.offcasenoteModel.amendNotecaseNoteText) {
            this.caseNoteTextValue = this.offcasenoteModel.amendNotecaseNoteText;
            this.offcasenoteModel.caseNoteText = this.caseNoteComment;

        if ((this.offcasenoteModel.checkBox1 !== this.dialog.data.checkBox1) && (String(this.checkAttempt) !== String(this.checkAttemptTemp))) {
            this.checkboxChangedMsg = this.translateService.translate('system-profile.casenoteflga') + ',';
        }
        if ((this.offcasenoteModel.checkBox2 !== this.dialog.data.checkBox2) && (String(this.checkAnt) !== String(this.checkAntTemp))) {
            if (this.checkboxChangedMsg) {
                this.checkboxChangedMsg = this.checkboxChangedMsg + this.translateService.translate('system-profile.casenoteflgb') + ',';
            } else {
                this.checkboxChangedMsg = this.translateService.translate('system-profile.casenoteflgb') + ',';
            }
        }
        if ((this.offcasenoteModel.checkBox3 !== this.dialog.data.checkBox3) && (String(this.checkCase) !== String(this.checkCaseTemp))) {
            if (this.checkboxChangedMsg) {
                this.checkboxChangedMsg = this.checkboxChangedMsg + this.translateService.translate('system-profile.casenoteflgc') + ',';
            } else {
                this.checkboxChangedMsg = this.translateService.translate('system-profile.casenoteflgc') + ',';
            }
        }
        if ((this.offcasenoteModel.checkBox4 !== this.dialog.data.checkBox4) && (String(this.checkCollateral) !== String(this.checkCollateralTemp))) {
            if (this.checkboxChangedMsg) {
                this.checkboxChangedMsg = this.checkboxChangedMsg + this.translateService.translate('system-profile.casenoteflgd') + ',';
            } else {
                this.checkboxChangedMsg = this.translateService.translate('system-profile.casenoteflgd') + ',';
            }
        }
        if ((this.offcasenoteModel.checkBox5 !== this.dialog.data.checkBox5) && (String(this.checkOther) !== String(this.checkOtherTemp))) {
            if (this.checkboxChangedMsg) {
                this.checkboxChangedMsg = this.checkboxChangedMsg + this.translateService.translate('system-profile.casenoteflge') + ',';
            } else {
                this.checkboxChangedMsg = this.translateService.translate('system-profile.casenoteflge');
            }
        }
        if (this.checkboxChangedMsg !== undefined) {
            if (this.checkboxChangedMsg.endsWith(',')) {
                this.checkboxChangedMsg = this.checkboxChangedMsg.substring(0, this.checkboxChangedMsg.length - 1);
            }
        }
        if (this.caseNoteTextValue === undefined && this.checkboxChangedMsg === undefined) {
            return;
        } else {
            this.offcasenoteModel.caseNoteText = this.offcasenoteModel.caseNoteText + ' ...[' + this.sessionManager.getId();
        }
        if (this.caseNoteTextValue !== undefined && this.checkboxChangedMsg !== undefined) {
            this.offcasenoteModel.caseNoteText = this.offcasenoteModel.caseNoteText + ' updated the case note and ' +
                this.checkboxChangedMsg + ' Flag(s) as part of this amendment on ' + DateFormat.updateServerDate() + '] ' +
                this.offcasenoteModel.amendNotecaseNoteText;
        } else if (this.caseNoteTextValue !== undefined && this.checkboxChangedMsg === undefined) {
            this.offcasenoteModel.caseNoteText = this.offcasenoteModel.caseNoteText + ' updated the case note on ' +
                DateFormat.updateServerDate() + '] ' + this.offcasenoteModel.amendNotecaseNoteText;
        } else if (this.caseNoteTextValue === undefined && this.checkboxChangedMsg !== undefined) {
            this.offcasenoteModel.caseNoteText = this.offcasenoteModel.caseNoteText + ' updated the ' +
                this.checkboxChangedMsg + ' Flag(s) on ' + DateFormat.updateServerDate() + '] ';
        }

        if (this.offcasenoteModel.amendNotecaseNoteText && this.offcasenoteModel.amendNotecaseNoteText.length > 32000) {
            this.casenoteLength = this.offcasenoteModel.amendNotecaseNoteText.length - 32000;
            this.type = 'warn';
            this.message = this.translateService.translate('ocucname.casenotelengthvalidation') + ' ' + this.casenoteLength
                + ' ' + this.translateService.translate('ocucname.charlength');
            this.show();
            return;
        }
    }

        if (this.checkAttempt) {
            this.offcasenoteModel.checkBox1 = 'Y';
        } else {
            this.offcasenoteModel.checkBox1 = 'N';
        }
        if (this.checkAnt) {
            this.offcasenoteModel.checkBox2 = 'Y';
        } else {
            this.offcasenoteModel.checkBox2 = 'N';
        }
        if (this.checkCase) {
            this.offcasenoteModel.checkBox3 = 'Y';
        } else {
            this.offcasenoteModel.checkBox3 = 'N';
        }
        if (this.checkCollateral) {
            this.offcasenoteModel.checkBox4 = 'Y';
        } else {
            this.offcasenoteModel.checkBox4 = 'N';
        }
        if (this.checkOther) {
            this.offcasenoteModel.checkBox5 = 'Y';
        } else {
            this.offcasenoteModel.checkBox5 = 'N';
        }

        

        this.offcasenoteModel.contactDate = DateFormat.getDate(this.offcasenoteModel.contactDate);
        this.offcasenoteModel.contactTime = DateFormat.getDate(this.offcasenoteModel.contactTime);
        this.offcasenoteModel.createDatetime = DateFormat.getDate(this.offcasenoteModel.createDatetime);
        this.offcasenoteModel.dateCreation = DateFormat.getDate(this.offcasenoteModel.dateCreation);
        this.offcasenoteModel.modifyDatetime = DateFormat.getDate(this.offcasenoteModel.modifyDatetime);
        this.offcasenoteModel.timeCreation = DateFormat.getDate(this.offcasenoteModel.timeCreation);

        this.offnotesUpdatetList.push(this.offcasenoteModel);
        this.offnotesCommitModel.updateList = this.offnotesUpdatetList;

        const offcasenoteSaveResult = this.ocucnameFactory.offCaseNoteCommit(this.offnotesCommitModel);
        offcasenoteSaveResult.subscribe(offcasenoteSaveResultList => {
            if (offcasenoteSaveResultList === 1) {
                this.saveFlag = false;
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.dialog.close({ contactDate: undefined, inserted: true });
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }

    butExitWhenButtonPressedTrigger() {
        if(this.offcasenoteModel.amendNotecaseNoteText === undefined ){
            this.dialog.close(null);
        }
        else if (this.offcasenoteModel.checkBox1 === this.dialog.data.checkBox1 && this.offcasenoteModel.checkBox2 === this.dialog.data.checkBox2
            && this.offcasenoteModel.checkBox3 === this.dialog.data.checkBox3 &&
            this.offcasenoteModel.checkBox4 === this.dialog.data.checkBox4 &&
            this.offcasenoteModel.checkBox5 === this.dialog.data.checkBox5) {
            this.dialog.close(null);
        } else {
            if (this.offcasenoteModel.amendNotecaseNoteText === undefined && (!this.saveFlag)) {
                this.dialog.close(null);
            } else {
                const data = {
                    label: this.translateService.translate('ocucname.exitbtnvalidation'), yesBtn: true, noBtn: true
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                    if (result) {
                        this.butSaveWhenButtonPressedTrigger();
                    } else {
                        this.dialog.close(null);
                    }
                });
            }
        }
    }

    get saveBtnDisable() {
        if (this.offcasenoteModel.amendNotecaseNoteText ||
            this.checkAttemptTemp !== this.checkAttempt ||
            this.checkCaseTemp !== this.checkCase ||
            this.checkOtherTemp !== this.checkOther ||
            this.checkAntTemp !== this.checkAnt ||
            this.checkCollateralTemp != this.checkCollateral) {
            return false;
        }
        return true;
    }
}
