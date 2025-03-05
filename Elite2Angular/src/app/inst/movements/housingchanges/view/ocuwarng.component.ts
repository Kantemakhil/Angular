import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuwarngService } from '../service/ocuwarng.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { Router } from '@angular/router';
//  import required bean declarations

@Component({
    selector: 'app-ocuwarng',
    templateUrl: './ocuwarng.component.html',
    styleUrls: ['./ocuwarng.component.css']
})

export class OcuwarngComponent implements OnInit {
    //  Variable declaration
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    warningReadOnly = false;
    promptMsg: string;
    warningMsg: string;
    yesBtnDisabled = true;
    warnMsgLst: any[] = [];
    constructor(private ocuwarngFactory: OcuwarngService, public translateService: TranslateService,
        public dialogService: DialogService, private router: Router) {
    }
    ngOnInit() {
        this.warningMsg = this.replaceText(this.dialog.data.warningMsg, '\n', '<br/>');
        if (this.dialog.data.warnMsgLst) {
            this.warnMsgLst = this.dialog.data.warnMsgLst;
        }
        const warnServiceObj = this.ocuwarngFactory.allowOverrideQuery();
        warnServiceObj.subscribe(list => {
            if (list.length > 0) {
                this.yesBtnDisabled = false;
                this.promptMsg = this.dialog.data.warningPrompt;
            } else {
                this.yesBtnDisabled = true;
                this.promptMsg = this.translateService.translate('ocuwarng.promptmsg');
            }
        });
    }
    allowNumbers(event) {
    }
    onYesButtonclick() {
        this.dialog.close(true);
        // if (this.router.url === '/OIDRHLOC') {
        //       this.dialog.close({ sealFlag: true, offenderIdDisplay: undefined });
        // } else {
        //     this.dialog.close(true);
        // }
    }
    onNoButtonclick() {
        this.dialog.close(false);
    }
    replaceText(text, preText, postText) {
        while (String(text).includes(preText)) {
            text = String(text).replace(preText, postText);
        }
        return text;
    }
}
