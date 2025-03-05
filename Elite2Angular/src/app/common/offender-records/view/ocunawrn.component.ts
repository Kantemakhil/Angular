import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
@Component({
    selector: 'app-ocunawrn',
    templateUrl: './ocunawrn.component.html'
})

export class OcunawarnComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    label: string;
    yasBtn: boolean;
    proceedWithNoConflictsBtn: boolean;
    yesLabel: string;
    proceedWithNoConflictsNoLabel: string;
    allowLineGap: boolean;
    cancelBtn: boolean;
    cancelLabel: string;
    proceedBtnDisabled : boolean = false;

    constructor(public translateService: TranslateService, public dialogService: DialogService) { }

    ngOnInit() {
        try {
            if (this.dialog.data.label) {
                this.label = this.addBeakLinke(this.dialog.data.label);
                // this.label = this.dialog.data.label;
            }
            if (this.dialog.data.yesBtn) {
                this.yasBtn = this.dialog.data.yesBtn;
            }
            if (this.dialog.data.proceedWithNoConflictsBtn) {
                this.proceedWithNoConflictsBtn = this.dialog.data.proceedWithNoConflictsBtn;
                if(this.dialog.data.proceedBtnDisabled){
                    this.proceedBtnDisabled = true;
                }
            }
            if (this.dialog.data.cancelBtn) {
                this.cancelBtn = this.dialog.data.cancelBtn;
            }
            if (this.dialog.data.allowLineGap) {
                this.allowLineGap = this.dialog.data.allowLineGap;
            }
            if (this.dialog.data.yesLabel) {
                this.yesLabel = this.dialog.data.yesLabel;
            } else {
                this.yesLabel = 'Proceed';
            }
            if (this.dialog.data.proceedWithNoConflictsNoLabel) {
                this.proceedWithNoConflictsNoLabel = this.dialog.data.proceedWithNoConflictsNoLabel;
            } else {
                this.proceedWithNoConflictsNoLabel = 'No';
            }
            if (this.dialog.data.cancelLabel) {
                this.cancelLabel = this.dialog.data.cancelLabel;
            } else {
                this.cancelLabel = 'Cancel';
            }
        } catch (e) {

        }

    }
    yes() {
        this.dialog.close(true);
    }
    proceedWithNoConflicts() {
        this.dialog.close("WITH_NO_CONFLICTS");
    }
    cancel() {
        this.dialog.close(null);
    }

    addBeakLinke(labelStr: string): string {
        const label = { msg: '' };
        // while (label.includes('\n')) {
        //   label.replace('\n', '<br/>');
        // }
        labelStr.split('').forEach(element => {
            if (element === '\n') {
                label.msg += '<br\>';
            } else {
                label.msg += element;
            }
        });
        return label.msg;
    }
}
