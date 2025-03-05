import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';


@Component({
    selector: 'app-legaltext',
    templateUrl: './condLegalText.component.html'
})

export class CondLegalTextComponent implements OnInit {

    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    longCommentText: String;

    constructor(public translateService: TranslateService, public dialogService: DialogService) {
    }

    ngOnInit() {
        if (this.dialog && this.dialog.data) {
            this.longCommentText = this.dialog.data.longCommentText;
        } else {
            this.longCommentText = undefined;
        }
    }

    onButExitclick() {
        this.dialog.close(null);
    }

}
